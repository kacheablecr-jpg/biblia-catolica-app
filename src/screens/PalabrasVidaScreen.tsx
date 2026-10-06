import React, { useMemo, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PALABRAS_VIDA, PalabraVida, numero } from '../data/palabrasVida'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#f472b6', borde: '#334155' }
const MAXIMO = PALABRAS_VIDA[0].veces

const sinTildes = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Las 100 palabras que más se repiten en la Biblia, de la más a la menos repetida */
export default function PalabrasVidaScreen() {
  const nav = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [busqueda, setBusqueda] = useState('')

  const palabras = useMemo(() => {
    const termino = sinTildes(busqueda.trim())
    return termino ? PALABRAS_VIDA.filter(p => sinTildes(p.palabra).includes(termino)) : PALABRAS_VIDA
  }, [busqueda])

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
              placeholder="Buscar una palabra..."
              placeholderTextColor={C.subTexto}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
        }
        ListEmptyComponent={<Text style={s.vacio}>Esa palabra no está entre las 100.</Text>}
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
  vacio:      { color: C.subTexto, textAlign: 'center', marginTop: 30, fontSize: 15 },
})
