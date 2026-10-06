import React, { useEffect, useMemo, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Share,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getLibros, Libro } from '../db/database'
import { PALABRAS_VIDA, leerCita, numero } from '../data/palabrasVida'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#f472b6', borde: '#334155' }

interface CapituloCitas { capitulo: number; versiculos: number[] }
interface LibroCitas { libroId: number; total: number; capitulos: CapituloCitas[] }

/** Significado, mensaje y todas las citas de una palabra, agrupadas por libro y capítulo */
export default function PalabraDetalleScreen() {
  const nav = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const palabra = PALABRAS_VIDA.find(p => p.id === route.params.id)!
  const [nombres, setNombres] = useState<Map<number, string>>(new Map())
  const [abierto, setAbierto] = useState<number | null>(null)

  useEffect(() => {
    getLibros().then((libros: Libro[]) => setNombres(new Map(libros.map(l => [l.id, l.nombre])))).catch(() => undefined)
  }, [])

  // Las citas ya vienen en el orden de la Biblia: se agrupan por libro y, dentro, por capítulo
  const libros = useMemo(() => {
    const grupos: LibroCitas[] = []
    for (const codigo of palabra.citas) {
      const { libroId, capitulo, versiculo } = leerCita(codigo)
      let libro = grupos[grupos.length - 1]
      if (!libro || libro.libroId !== libroId) { libro = { libroId, total: 0, capitulos: [] }; grupos.push(libro) }
      let cap = libro.capitulos[libro.capitulos.length - 1]
      if (!cap || cap.capitulo !== capitulo) { cap = { capitulo, versiculos: [] }; libro.capitulos.push(cap) }
      cap.versiculos.push(versiculo)
      libro.total++
    }
    return grupos
  }, [palabra])

  const nombreLibro = (id: number) => nombres.get(id) ?? '…'

  const abrir = (libroId: number, capitulo: number, versiculo: number) => nav.navigate('Lectura', {
    libro: { id: libroId, nombre: nombreLibro(libroId) },
    capitulo,
    modoAudio: false,
    versiculoInicio: versiculo,
    versiculoFin: versiculo,
  })

  const compartir = () => Share.share({
    message:
      `✝ *${palabra.palabra}* — aparece ${numero(palabra.veces)} veces en la Biblia\n\n` +
      `${palabra.significado}\n\n` +
      `💬 ${palabra.mensaje}\n\n` +
      '— Palabra Viva',
  })

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

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />
      <FlatList
        data={libros}
        keyExtractor={l => l.libroId.toString()}
        renderItem={renderLibro}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 16 }]}
        ListHeaderComponent={
          <View style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
              <Text style={s.backTxt}>‹ Palabras de vida</Text>
            </TouchableOpacity>
            <Text style={s.puesto}>N.º {palabra.puesto} de 100</Text>
            <Text style={s.titulo}>{palabra.palabra}</Text>

            <View style={s.cifras}>
              <View style={s.cifra}>
                <Text style={s.cifraNum}>{numero(palabra.veces)}</Text>
                <Text style={s.cifraTxt}>veces</Text>
              </View>
              <View style={s.cifra}>
                <Text style={s.cifraNum}>{numero(palabra.versiculos)}</Text>
                <Text style={s.cifraTxt}>versículos</Text>
              </View>
              <View style={s.cifra}>
                <Text style={s.cifraNum}>{palabra.libros}</Text>
                <Text style={s.cifraTxt}>de 75 libros</Text>
              </View>
            </View>

            <Text style={s.seccion}>📖  Qué significa</Text>
            <View style={s.bloque}>
              <Text style={s.bloqueTxt}>{palabra.significado}</Text>
            </View>

            <Text style={s.seccion}>💬  Mensaje para hoy</Text>
            <View style={[s.bloque, s.bloqueMensaje]}>
              <Text style={s.bloqueTxt}>{palabra.mensaje}</Text>
            </View>

            <TouchableOpacity style={s.compartirBtn} onPress={compartir} activeOpacity={0.8}>
              <Text style={s.compartirTxt}>Compartir este mensaje</Text>
            </TouchableOpacity>

            <Text style={s.seccion}>📍  Dónde aparece</Text>
            <Text style={s.nota}>
              Donde más aparece es en <Text style={s.negrita}>{palabra.libroTop}</Text> ({numero(palabra.versiculosLibroTop)} versículos).
              Se cuentan la palabra y las de su misma raíz: {palabra.formas.join(', ')}…
            </Text>
            <Text style={s.nota}>Toque un libro para ver sus capítulos y versículos, y un versículo para leerlo.</Text>
          </View>
        }
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
  cifras:        { flexDirection: 'row', gap: 8, marginTop: 14 },
  cifra:         { flex: 1, backgroundColor: C.card, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: C.borde },
  cifraNum:      { color: C.texto, fontSize: 20, fontWeight: '800' },
  cifraTxt:      { color: C.subTexto, fontSize: 12, marginTop: 2 },
  seccion:       { color: C.texto, fontSize: 16, fontWeight: '700', marginTop: 22, marginBottom: 8 },
  bloque:        { backgroundColor: C.card, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.borde },
  bloqueMensaje: { borderColor: C.acento + '80', backgroundColor: '#2a1626' },
  bloqueTxt:     { color: C.texto, fontSize: 16, lineHeight: 24 },
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
