import React, { useEffect, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, StatusBar,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getCapitulos } from '../db/database'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155' }

export default function CapitulosScreen() {
  const nav  = useNavigation<any>()
  const route = useRoute<any>()
  const { libro } = route.params
  const insets = useSafeAreaInsets()
  const [capitulos, setCapitulos] = useState<number[]>([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    getCapitulos(libro.id).then(data => { setCapitulos(data); setLoading(false) })
  }, [libro.id])

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={C.acento} />
      </View>
    )
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
          <Text style={s.backTxt}>‹ Libros</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>{libro.nombre}</Text>
        <Text style={s.subtitulo}>{capitulos.length} capítulos</Text>
      </View>

      <FlatList
        data={capitulos}
        keyExtractor={c => c.toString()}
        numColumns={5}
        columnWrapperStyle={s.fila}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 16 }]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.capBtn}
            onPress={() => nav.navigate('Lectura', { libro, capitulo: item, modoAudio: false })}
            activeOpacity={0.7}
          >
            <Text style={s.capNum}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.fondo },
  center:    { justifyContent: 'center', alignItems: 'center' },
  header:    { paddingBottom: 20, paddingHorizontal: 20 },
  backBtn:   { marginBottom: 8 },
  backTxt:   { color: C.acento, fontSize: 16 },
  titulo:    { fontSize: 26, fontWeight: '700', color: C.texto },
  subtitulo: { color: C.subTexto, fontSize: 14, marginTop: 4 },
  lista:     { padding: 12 },
  fila:      { gap: 10, marginBottom: 10 },
  capBtn:    { flex: 1, aspectRatio: 1, backgroundColor: C.card, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.borde },
  capNum:    { color: C.texto, fontSize: 18, fontWeight: '600' },
})
