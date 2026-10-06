import React, { useEffect, useMemo, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, TextInput, ActivityIndicator,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { numero } from '../data/palabrasVida'
import { ClaveSeccion, FichaLista, SECCIONES } from '../data/secciones'
import { buscarEnBiblia, limpiarTermino, normalizar, ResultadoBusqueda } from '../data/buscarPalabra'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#f472b6', borde: '#334155' }

/** Un renglón de la lista: una ficha o el encabezado de un nombre compartido */
type Fila = FichaLista | { id: string; encabezado: string; cuantos: number }

/** Mínimo de letras para buscar en toda la Biblia (con menos, casi todo calza) */
const MINIMO_BUSQUEDA = 3
/** Espera a que la persona deje de escribir antes de buscar */
const ESPERA_MS = 450

/**
 * Lista de una sección ("Palabras de vida" o "Personajes de la Biblia"), de lo más a lo menos repetido.
 * El buscador filtra la lista y, si lo escrito no está en ella, lo busca solo en toda la Biblia.
 */
export default function PalabrasVidaScreen() {
  const nav = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const [busqueda, setBusqueda] = useState('')
  const [soloCompartidos, setSoloCompartidos] = useState(false)
  const seccion = SECCIONES[(route.params?.seccion ?? 'palabras') as ClaveSeccion]
  const maximo = seccion.fichas[0].veces
  const total = seccion.fichas.length

  const termino = limpiarTermino(busqueda)
  // Calza con el título o con alguna de sus formas (buscar "amado" encuentra "Amor")
  const palabras = useMemo(() => (
    termino
      ? seccion.fichas.filter(p => normalizar(p.titulo).includes(termino) || p.formas.some(f => normalizar(f) === termino))
      : seccion.fichas
  ), [termino, seccion])
  // Nombres que llevan varias personas: se muestran juntos, cada nombre con quién es quién
  const hayCompartidos = seccion.fichas.some(p => p.grupo)
  const compartidos = useMemo(() => {
    const filas: Fila[] = []
    const nombres = [...new Set(seccion.fichas.filter(p => p.grupo).map(p => p.grupo!))].sort((a, b) => a.localeCompare(b, 'es'))
    for (const nombre of nombres) {
      const personas = seccion.fichas.filter(p => p.grupo === nombre)
      filas.push({ id: `grupo-${nombre}`, encabezado: nombre, cuantos: personas.length }, ...personas)
    }
    return filas
  }, [seccion])
  const mostrandoCompartidos = soloCompartidos && !termino
  const filas: Fila[] = mostrandoCompartidos ? compartidos : palabras

  const yaEstaEnLaLista = palabras.some(p => normalizar(p.titulo) === termino)
  const puedeBuscar = termino.length >= MINIMO_BUSQUEDA && !yaEstaEnLaLista
  const buscarEnTodaLaBiblia = () => nav.navigate('PalabraDetalle', { seccion: seccion.clave, termino: busqueda.trim() })

  // Resultado de buscar lo escrito en toda la Biblia (null = todavía buscando)
  const [resultado, setResultado] = useState<{ termino: string; datos: ResultadoBusqueda } | null>(null)
  useEffect(() => {
    if (!puedeBuscar) return
    let vigente = true
    const espera = setTimeout(() => {
      buscarEnBiblia(termino, 'exacta')
        .then(datos => { if (vigente) setResultado({ termino, datos }) })
        .catch(() => undefined)
    }, ESPERA_MS)
    return () => { vigente = false; clearTimeout(espera) }
  }, [termino, puedeBuscar])
  const encontrado = resultado?.termino === termino ? resultado.datos : null

  const renderPalabra = ({ item }: { item: Fila }) => 'encabezado' in item ? (
    <Text style={s.grupo}>{item.encabezado} · {item.cuantos} personas</Text>
  ) : (
    <TouchableOpacity style={s.card} onPress={() => nav.navigate('PalabraDetalle', { seccion: seccion.clave, id: item.id })} activeOpacity={0.8}>
      <View style={s.puestoBox}>
        <Text style={s.puestoTxt}>{item.puesto}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.palabra}>{item.titulo}</Text>
        {!!item.subtitulo && <Text style={s.quien}>{item.subtitulo}</Text>}
        <Text style={s.cuenta}>{numero(item.veces)} {item.veces === 1 ? 'vez' : 'veces'} · {numero(item.versiculos)} {item.versiculos === 1 ? 'versículo' : 'versículos'}</Text>
        <View style={s.barraFondo}>
          <View style={[s.barra, { width: `${Math.max(3, Math.sqrt(item.veces / maximo) * 100)}%` }]} />
        </View>
      </View>
      <Text style={s.flecha}>›</Text>
    </TouchableOpacity>
  )

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />
      <FlatList
        data={filas}
        keyExtractor={p => p.id}
        renderItem={renderPalabra}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 16 }]}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={{ paddingTop: insets.top + 16, marginBottom: 6 }}>
            <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
              <Text style={s.backTxt}>‹ Inicio</Text>
            </TouchableOpacity>
            <Text style={s.emoji}>{seccion.emoji}</Text>
            <Text style={s.titulo}>{seccion.titulo}</Text>
            <Text style={s.subtitulo}>{seccion.intro}</Text>
            <TextInput
              style={s.buscar}
              placeholder={seccion.placeholder}
              placeholderTextColor={C.subTexto}
              value={busqueda}
              onChangeText={setBusqueda}
              returnKeyType="search"
              onSubmitEditing={() => { if (puedeBuscar) buscarEnTodaLaBiblia() }}
            />
            {hayCompartidos && !termino && (
              <TouchableOpacity style={[s.filtro, soloCompartidos && s.filtroActivo]} onPress={() => setSoloCompartidos(v => !v)} activeOpacity={0.8}>
                <Text style={[s.filtroTxt, soloCompartidos && s.filtroTxtActivo]}>
                  {soloCompartidos ? '✓  Nombres que comparten varias personas' : 'Nombres que comparten varias personas  ›'}
                </Text>
                <Text style={s.cuenta}>
                  {soloCompartidos ? 'Toque otra vez para volver a la lista completa.' : 'José, Juan, María, Judas… y quién es quién.'}
                </Text>
              </TouchableOpacity>
            )}
            {puedeBuscar && (
              !encontrado ? (
                <View style={s.buscarBiblia}>
                  <ActivityIndicator color={C.acento} />
                  <Text style={[s.cuenta, { flex: 1, marginTop: 0 }]}>Buscando «{busqueda.trim()}» en toda la Biblia…</Text>
                </View>
              ) : encontrado.veces === 0 ? (
                <View style={s.buscarBiblia}>
                  <Text style={s.buscarBibliaIcono}>🔎</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.buscarBibliaTitulo}>«{busqueda.trim()}» no aparece en la Biblia</Text>
                    <Text style={s.cuenta}>No está en esta lista de {total} ni en el resto del texto. Pruebe escribirlo de otra forma.</Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={s.buscarBiblia} onPress={buscarEnTodaLaBiblia} activeOpacity={0.8}>
                  <View style={s.puestoBox}>
                    <Text style={s.buscarBibliaIcono}>🔎</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.palabra}>{busqueda.trim()}</Text>
                    <Text style={s.cuenta}>
                      {numero(encontrado.veces)} {encontrado.veces === 1 ? 'vez' : 'veces'} · {numero(encontrado.versiculos)} {encontrado.versiculos === 1 ? 'versículo' : 'versículos'} · {encontrado.libros} {encontrado.libros === 1 ? 'libro' : 'libros'}
                    </Text>
                    <Text style={s.cuenta}>No está en esta lista de {total}: se buscó en toda la Biblia. Toque para ver dónde aparece.</Text>
                  </View>
                  <Text style={s.flecha}>›</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        }
        ListEmptyComponent={puedeBuscar ? null : <Text style={s.vacio}>Escriba al menos {MINIMO_BUSQUEDA} letras.</Text>}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: C.fondo },
  lista:      { paddingHorizontal: 16, gap: 10 },
  backBtn:    { marginBottom: 8 },
  backTxt:    { color: C.acento, fontSize: 16 },
  emoji:      { fontSize: 36, marginBottom: 6 },
  titulo:     { fontSize: 24, fontWeight: '700', color: C.texto },
  subtitulo:  { color: C.subTexto, fontSize: 14, marginTop: 4, lineHeight: 20 },
  buscar:     { backgroundColor: C.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, color: C.texto, fontSize: 15, borderWidth: 1, borderColor: C.borde, marginTop: 14 },
  card:       { backgroundColor: C.card, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: C.borde },
  puestoBox:  { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: C.acento + '26' },
  puestoTxt:  { color: C.acento, fontWeight: '700', fontSize: 15 },
  palabra:    { color: C.texto, fontSize: 17, fontWeight: '700' },
  quien:      { color: C.acento, fontSize: 13, marginTop: 1 },
  grupo:      { color: C.texto, fontSize: 18, fontWeight: '800', marginTop: 14 },
  filtro:          { marginTop: 10, backgroundColor: C.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.borde },
  filtroActivo:    { borderColor: C.acento, backgroundColor: C.acento + '1f' },
  filtroTxt:       { color: C.texto, fontSize: 15, fontWeight: '700' },
  filtroTxtActivo: { color: C.acento },
  cuenta:     { color: C.subTexto, fontSize: 13, marginTop: 2 },
  barraFondo: { height: 4, borderRadius: 2, backgroundColor: C.borde, marginTop: 8, overflow: 'hidden' },
  barra:      { height: 4, borderRadius: 2, backgroundColor: C.acento },
  flecha:     { color: C.acento, fontSize: 22 },
  buscarBiblia:       { marginTop: 10, backgroundColor: '#2a1626', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: C.acento },
  buscarBibliaIcono:  { fontSize: 20 },
  buscarBibliaTitulo: { color: C.texto, fontSize: 15, fontWeight: '700' },
  vacio:      { color: C.subTexto, textAlign: 'center', marginTop: 30, fontSize: 15 },
})
