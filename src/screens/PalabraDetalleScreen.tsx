import React, { useEffect, useMemo, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Share, ActivityIndicator,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getLibros, Libro } from '../db/database'
import { PALABRAS_VIDA, leerCita, numero } from '../data/palabrasVida'
import { buscarEnBiblia, limpiarTermino, ModoBusqueda, VersiculoDestacado } from '../data/buscarPalabra'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#f472b6', borde: '#334155' }

interface CapituloCitas { capitulo: number; versiculos: number[] }
interface LibroCitas { libroId: number; total: number; capitulos: CapituloCitas[] }

/** Lo que se muestra de una palabra, venga de las 100 o de una búsqueda en toda la Biblia */
interface Ficha {
  palabra: string
  /** Solo las 100 palabras tienen puesto, significado y mensaje */
  puesto?: number
  significado?: string
  mensaje?: string
  veces: number
  versiculos: number
  libros: number
  libroTop: string
  versiculosLibroTop: number
  formas: string[]
  citas: number[]
  destacados?: VersiculoDestacado[]
}

const MODOS: { modo: ModoBusqueda; titulo: string }[] = [
  { modo: 'exacta', titulo: 'Palabra exacta' },
  { modo: 'contiene', titulo: 'Que la contenga' },
]

/**
 * Significado, mensaje y todas las citas de una palabra, agrupadas por libro y capítulo.
 * Con `id` muestra una de las 100 palabras; con `termino` busca esa palabra o frase en toda la Biblia.
 */
export default function PalabraDetalleScreen() {
  const nav = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const termino: string | undefined = route.params.termino
  const predefinida = useMemo(() => PALABRAS_VIDA.find(p => p.id === route.params.id), [route.params.id])

  const [modo, setModo] = useState<ModoBusqueda>('exacta')
  const [buscada, setBuscada] = useState<Ficha | null>(null)
  const [buscando, setBuscando] = useState(false)
  const [nombres, setNombres] = useState<Map<number, string>>(new Map())
  const [abierto, setAbierto] = useState<number | null>(null)

  useEffect(() => {
    getLibros().then((libros: Libro[]) => setNombres(new Map(libros.map(l => [l.id, l.nombre])))).catch(() => undefined)
  }, [])

  useEffect(() => {
    if (!termino) return
    let vigente = true
    setBuscando(true); setAbierto(null)
    buscarEnBiblia(termino, modo)
      .then(r => { if (vigente) setBuscada({ palabra: termino.trim(), ...r }) })
      .catch(() => undefined)
      .finally(() => { if (vigente) setBuscando(false) })
    return () => { vigente = false }
  }, [termino, modo])

  const ficha: Ficha | null = predefinida ?? buscada
  // Una frase no tiene "palabras que la contengan": solo se busca tal cual
  const esFrase = termino ? limpiarTermino(termino).includes(' ') : false

  // Las citas ya vienen en el orden de la Biblia: se agrupan por libro y, dentro, por capítulo
  const libros = useMemo(() => {
    const grupos: LibroCitas[] = []
    for (const codigo of ficha?.citas ?? []) {
      const { libroId, capitulo, versiculo } = leerCita(codigo)
      let libro = grupos[grupos.length - 1]
      if (!libro || libro.libroId !== libroId) { libro = { libroId, total: 0, capitulos: [] }; grupos.push(libro) }
      let cap = libro.capitulos[libro.capitulos.length - 1]
      if (!cap || cap.capitulo !== capitulo) { cap = { capitulo, versiculos: [] }; libro.capitulos.push(cap) }
      cap.versiculos.push(versiculo)
      libro.total++
    }
    return grupos
  }, [ficha])

  const nombreLibro = (id: number) => nombres.get(id) ?? '…'

  const abrir = (libroId: number, capitulo: number, versiculo: number) => nav.navigate('Lectura', {
    libro: { id: libroId, nombre: nombreLibro(libroId) },
    capitulo,
    modoAudio: false,
    versiculoInicio: versiculo,
    versiculoFin: versiculo,
  })

  const compartir = () => {
    if (!ficha) return
    const cuerpo = ficha.significado
      ? `${ficha.significado}\n\n💬 ${ficha.mensaje}`
      : (ficha.destacados ?? []).map(d => `«${d.texto}»\n— ${nombreLibro(d.libroId)} ${d.capitulo}:${d.versiculo}`).join('\n\n')
    Share.share({ message: `✝ *${ficha.palabra}* — aparece ${numero(ficha.veces)} veces en la Biblia\n\n${cuerpo}\n\n— Palabra Viva` })
  }

  const renderLibro = ({ item }: { item: LibroCitas }) => {
    const expandido = abierto === item.libroId
    return (
      <View style={s.libroCard}>
        <TouchableOpacity style={s.libroFila} onPress={() => setAbierto(expandido ? null : item.libroId)} activeOpacity={0.8}>
          <Text style={s.libroNombre}>{nombreLibro(item.libroId)}</Text>
          <Text style={s.libroCuenta}>{numero(item.total)} {item.total === 1 ? 'versículo' : 'versículos'}</Text>
          <Text style={s.libroFlecha}>{expandido ? '⌄' : '›'}</Text>
        </TouchableOpacity>
        {expandido && item.capitulos.map(cap => (
          <View key={cap.capitulo} style={s.capFila}>
            <Text style={s.capTitulo}>Cap. {cap.capitulo}</Text>
            <View style={s.versiculos}>
              {cap.versiculos.map(v => (
                <TouchableOpacity key={v} style={s.chip} onPress={() => abrir(item.libroId, cap.capitulo, v)} activeOpacity={0.7}>
                  <Text style={s.chipTxt}>{cap.capitulo}:{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }

  const encabezado = (
    <View style={{ paddingTop: insets.top + 16 }}>
      <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
        <Text style={s.backTxt}>‹ Palabras de vida</Text>
      </TouchableOpacity>
      <Text style={s.puesto}>{ficha?.puesto ? `N.º ${ficha.puesto} de 100` : 'Búsqueda en toda la Biblia'}</Text>
      <Text style={s.titulo}>{ficha?.palabra ?? termino}</Text>

      {termino && !esFrase && (
        <View style={s.modos}>
          {MODOS.map(m => (
            <TouchableOpacity key={m.modo} style={[s.modo, modo === m.modo && s.modoActivo]} onPress={() => setModo(m.modo)} activeOpacity={0.8}>
              <Text style={[s.modoTxt, modo === m.modo && s.modoTxtActivo]}>{m.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {buscando || !ficha ? (
        <View style={s.cargando}>
          <ActivityIndicator size="large" color={C.acento} />
          <Text style={s.nota}>Buscando en los 75 libros…</Text>
        </View>
      ) : ficha.veces === 0 ? (
        <View style={s.bloque}>
          <Text style={s.bloqueTxt}>
            No aparece en esta Biblia (Dios Habla Hoy). Pruebe con otra forma de la palabra
            {esFrase ? ' o con menos palabras' : ' o con "Que la contenga"'}.
          </Text>
        </View>
      ) : (
        <>
          <View style={s.cifras}>
            <View style={s.cifra}>
              <Text style={s.cifraNum}>{numero(ficha.veces)}</Text>
              <Text style={s.cifraTxt}>{ficha.veces === 1 ? 'vez' : 'veces'}</Text>
            </View>
            <View style={s.cifra}>
              <Text style={s.cifraNum}>{numero(ficha.versiculos)}</Text>
              <Text style={s.cifraTxt}>{ficha.versiculos === 1 ? 'versículo' : 'versículos'}</Text>
            </View>
            <View style={s.cifra}>
              <Text style={s.cifraNum}>{ficha.libros}</Text>
              <Text style={s.cifraTxt}>de 75 libros</Text>
            </View>
          </View>

          {ficha.significado ? (
            <>
              <Text style={s.seccion}>📖  Qué significa</Text>
              <View style={s.bloque}>
                <Text style={s.bloqueTxt}>{ficha.significado}</Text>
              </View>
              <Text style={s.seccion}>💬  Mensaje para hoy</Text>
              <View style={[s.bloque, s.bloqueMensaje]}>
                <Text style={s.bloqueTxt}>{ficha.mensaje}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={s.seccion}>✨  Versículos destacados</Text>
              {(ficha.destacados ?? []).map(d => (
                <TouchableOpacity key={`${d.libroId}-${d.capitulo}-${d.versiculo}`} style={[s.bloque, s.destacado]}
                  onPress={() => abrir(d.libroId, d.capitulo, d.versiculo)} activeOpacity={0.8}>
                  <Text style={s.bloqueTxt}>«{d.texto}»</Text>
                  <Text style={s.destacadoRef}>{nombreLibro(d.libroId)} {d.capitulo}:{d.versiculo}  ›</Text>
                </TouchableOpacity>
              ))}
              <Text style={s.nota}>
                Esta palabra no está entre las 100 que traen significado y mensaje: aquí se muestra tal como aparece en la Biblia.
              </Text>
            </>
          )}

          <TouchableOpacity style={s.compartirBtn} onPress={compartir} activeOpacity={0.8}>
            <Text style={s.compartirTxt}>Compartir</Text>
          </TouchableOpacity>

          <Text style={s.seccion}>📍  Dónde aparece</Text>
          <Text style={s.nota}>
            Donde más aparece es en <Text style={s.negrita}>{ficha.libroTop}</Text> ({numero(ficha.versiculosLibroTop)} {ficha.versiculosLibroTop === 1 ? 'versículo' : 'versículos'}).
            {ficha.puesto
              ? ` Se cuentan la palabra y las de su misma raíz: ${ficha.formas.join(', ')}…`
              : ficha.formas.length > 1 ? ` Formas encontradas: ${ficha.formas.join(', ')}…` : ''}
          </Text>
          <Text style={s.nota}>Toque un libro para ver sus capítulos y versículos, y un versículo para leerlo.</Text>
        </>
      )}
    </View>
  )

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />
      <FlatList
        data={buscando ? [] : libros}
        keyExtractor={l => l.libroId.toString()}
        renderItem={renderLibro}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 16 }]}
        ListHeaderComponent={encabezado}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container:     { flex: 1, backgroundColor: C.fondo },
  lista:         { paddingHorizontal: 16, gap: 8 },
  backBtn:       { marginBottom: 8 },
  backTxt:       { color: C.acento, fontSize: 16 },
  puesto:        { color: C.acento, fontSize: 13, fontWeight: '700', marginTop: 6 },
  titulo:        { fontSize: 32, fontWeight: '800', color: C.texto },
  modos:         { flexDirection: 'row', gap: 8, marginTop: 12 },
  modo:          { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: C.borde, backgroundColor: C.card },
  modoActivo:    { borderColor: C.acento, backgroundColor: C.acento + '26' },
  modoTxt:       { color: C.subTexto, fontSize: 14, fontWeight: '600' },
  modoTxtActivo: { color: C.acento },
  cargando:      { alignItems: 'center', gap: 12, marginTop: 40 },
  cifras:        { flexDirection: 'row', gap: 8, marginTop: 14 },
  cifra:         { flex: 1, backgroundColor: C.card, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: C.borde },
  cifraNum:      { color: C.texto, fontSize: 20, fontWeight: '800' },
  cifraTxt:      { color: C.subTexto, fontSize: 12, marginTop: 2 },
  seccion:       { color: C.texto, fontSize: 16, fontWeight: '700', marginTop: 22, marginBottom: 8 },
  bloque:        { backgroundColor: C.card, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.borde, marginTop: 4 },
  bloqueMensaje: { borderColor: C.acento + '80', backgroundColor: '#2a1626' },
  bloqueTxt:     { color: C.texto, fontSize: 16, lineHeight: 24 },
  destacado:     { marginBottom: 8 },
  destacadoRef:  { color: C.acento, fontSize: 14, fontWeight: '700', marginTop: 10 },
  compartirBtn:  { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: C.acento },
  compartirTxt:  { color: C.acento, fontWeight: '700', fontSize: 15 },
  nota:          { color: C.subTexto, fontSize: 13, lineHeight: 19, marginBottom: 8 },
  negrita:       { color: C.texto, fontWeight: '700' },
  libroCard:     { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.borde, overflow: 'hidden' },
  libroFila:     { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  libroNombre:   { flex: 1, color: C.texto, fontSize: 15, fontWeight: '600' },
  libroCuenta:   { color: C.subTexto, fontSize: 13 },
  libroFlecha:   { color: C.acento, fontSize: 20, width: 16, textAlign: 'center' },
  capFila:       { paddingHorizontal: 14, paddingBottom: 12 },
  capTitulo:     { color: C.subTexto, fontSize: 12, fontWeight: '700', marginBottom: 6 },
  versiculos:    { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip:          { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: C.acento + '22' },
  chipTxt:       { color: C.acento, fontSize: 13, fontWeight: '600' },
})
