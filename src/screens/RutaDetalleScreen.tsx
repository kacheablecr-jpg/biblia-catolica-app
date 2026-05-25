import React from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ruta } from './RutasScreen'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155' }

export default function RutaDetalleScreen() {
  const nav   = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const ruta: Ruta = route.params.ruta

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { borderLeftColor: ruta.color, borderLeftWidth: 4, paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
          <Text style={s.backTxt}>‹ Rutas</Text>
        </TouchableOpacity>
        <Text style={s.emoji}>{ruta.emoji}</Text>
        <Text style={s.titulo}>{ruta.titulo}</Text>
        <Text style={s.subtitulo}>{ruta.descripcion}</Text>
      </View>

      <FlatList
        data={ruta.pasajes}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 16 }]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={s.pasajeCard}
            onPress={() => nav.navigate('Lectura', {
              libro: { id: item.libroId, nombre: item.libroNombre },
              capitulo: item.capitulo,
              modoAudio: false,
              versiculoInicio: item.versiculoInicio,
              versiculoFin: item.versiculoFin,
            })}
            activeOpacity={0.8}
          >
            <View style={[s.numBox, { backgroundColor: ruta.color + '33' }]}>
              <Text style={[s.numTxt, { color: ruta.color }]}>{index + 1}</Text>
            </View>
            <View style={s.pasajeInfo}>
              <Text style={s.pasajeTitulo}>{item.descripcion}</Text>
              <Text style={s.pasajeRef}>
                {item.libroNombre} {item.capitulo}
                {item.versiculoInicio != null
                  ? item.versiculoInicio === item.versiculoFin
                    ? `:${item.versiculoInicio}`
                    : `:${item.versiculoInicio}-${item.versiculoFin}`
                  : ''}
              </Text>
            </View>
            <Text style={s.flecha}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: C.fondo },
  header:       { paddingBottom: 20, paddingHorizontal: 20, paddingLeft: 16, marginLeft: 0 },
  backBtn:      { marginBottom: 8 },
  backTxt:      { color: C.acento, fontSize: 16 },
  emoji:        { fontSize: 36, marginBottom: 6 },
  titulo:       { fontSize: 24, fontWeight: '700', color: C.texto },
  subtitulo:    { color: C.subTexto, fontSize: 14, marginTop: 4 },
  lista:        { padding: 16, gap: 10 },
  pasajeCard:   { backgroundColor: C.card, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: C.borde },
  numBox:       { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  numTxt:       { fontWeight: '700', fontSize: 15 },
  pasajeInfo:   { flex: 1 },
  pasajeTitulo: { color: C.texto, fontSize: 15, fontWeight: '600' },
  pasajeRef:    { color: C.subTexto, fontSize: 13, marginTop: 3 },
  flecha:       { color: C.acento, fontSize: 22 },
})
