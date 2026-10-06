import React, { useEffect, useMemo, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, TextInput, ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PALABRAS_VIDA, PalabraVida, numero } from '../data/palabrasVida'
import { buscarEnBiblia, limpiarTermino, normalizar, ResultadoBusqueda } from '../data/buscarPalabra'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#f472b6', borde: '#334155' }
const MAXIMO = PALABRAS_VIDA[0].veces

/** Mínimo de letras para buscar en toda la Biblia (con menos, casi todo calza) */
const MINIMO_BUSQUEDA = 3
/** Espera a que la persona deje de escribir antes de buscar */
const ESPERA_MS = 450

/**
 * Las 100 palabras que más se repiten en la Biblia, de la más a la menos repetida.
 * El buscador filtra las 100 y, si lo escrito no es una de ellas, lo busca solo en toda la Biblia.
 */
export default function PalabrasVidaScreen() {
  const nav = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [busqueda, setBusqueda] = useState('')

  const termino = limpiarTermino(busqueda)
  // Calza con el nombre de la palabra o con alguna de sus formas (buscar "amado" encuentra "Amor")
  const palabras = useMemo(() => (
    termino
      ? PALABRAS_VIDA.filter(p => normalizar(p.palabra).includes(termino) || p.formas.some(f => normalizar(f) === termino))
      : PALABRAS_VIDA
  ), [termino])
  const yaEstaEntreLas100 = palabras.some(p => normalizar(p.palabra) === termino)
  const puedeBuscar = termino.length >= MINIMO_BUSQUEDA && !yaEstaEntreLas100
  const buscarEnTodaLaBiblia = () => nav.navigate('PalabraDetalle', { termino: busqueda.trim() })

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

  const renderPalabra = ({ item }: { item: PalabraVida }) => (
    <TouchableOpacity style={s.card} onPress={() => nav.navigate('PalabraDetalle', { id: item.id })} activeOpacity={0.8}>
      <View style={s.puestoBox}>
        <Text style={s.puestoTxt}>{item.puesto}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.palabra}>{item.palabra}</Text>
        <Text style={s.cuenta}>{numero(item.veces)} veces · {numero(item.versiculos)} versículos</Text>
        <View style={s.barraFondo}>
          <View style={[s.barra, { width: `${Math.max(3, Math.sqrt(item.veces / MAXIMO) * 100)}%` }]} />
        </View>
      </View>
      <Text style={s.flecha}>›</Text>
    </TouchableOpacity>
  )

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />
      <FlatList
        data={palabras}
        keyExtractor={p => p.id}
        renderItem={renderPalabra}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 16 }]}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={{ paddingTop: insets.top + 16, marginBottom: 6 }}>
            <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
              <Text style={s.backTxt}>‹ Inicio</Text>
            </TouchableOpacity>
            <Text style={s.emoji}>💬</Text>
            <Text style={s.titulo}>Palabras de vida</Text>
            <Text style={s.subtitulo}>
              Las 100 palabras con mensaje para la vida que más se repiten en la Biblia, de la más a la menos repetida.
              Toque una para ver qué significa, qué nos dice hoy y dónde aparece.
            </Text>
            <TextInput
              style={s.buscar}
              placeholder="Escriba cualquier palabra o frase..."
              placeholderTextColor={C.subTexto}
              value={busqueda}
              onChangeText={setBusqueda}
              returnKeyType="search"
              onSubmitEditing={() => { if (puedeBuscar) buscarEnTodaLaBiblia() }}
            />
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
                    <Text style={s.cuenta}>No está entre las 100 ni en el resto del texto. Pruebe con otra forma de la palabra.</Text>
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
                    <Text style={s.cuenta}>No está entre las 100: se buscó en toda la Biblia. Toque para ver dónde aparece.</Text>
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
  cuenta:     { color: C.subTexto, fontSize: 13, marginTop: 2 },
  barraFondo: { height: 4, borderRadius: 2, backgroundColor: C.borde, marginTop: 8, overflow: 'hidden' },
  barra:      { height: 4, borderRadius: 2, backgroundColor: C.acento },
  flecha:     { color: C.acento, fontSize: 22 },
  buscarBiblia:       { marginTop: 10, backgroundColor: '#2a1626', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: C.acento },
  buscarBibliaIcono:  { fontSize: 20 },
  buscarBibliaTitulo: { color: C.texto, fontSize: 15, fontWeight: '700' },
  vacio:      { color: C.subTexto, textAlign: 'center', marginTop: 30, fontSize: 15 },
})
