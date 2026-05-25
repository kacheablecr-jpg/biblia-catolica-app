import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, StatusBar,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Speech from 'expo-speech'
import { getVersiculos, Versiculo } from '../db/database'
import { useProgress } from '../hooks/useProgress'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155', audioActivo: '#22c55e' }

export default function LecturaScreen() {
  const nav    = useNavigation<any>()
  const route  = useRoute<any>()
  const { libro, capitulo: capInicial, modoAudio: audioInicial = false, versiculoInicio, versiculoFin } = route.params

  const [versiculos, setVersiculos] = useState<Versiculo[]>([])
  const [loading, setLoading]       = useState(true)
  const [capitulo, setCapitulo]     = useState<number>(capInicial)
  const [totalCaps, setTotalCaps]   = useState<number>(capInicial)
  const [audioActivo, setAudioActivo] = useState(false)
  const [audioIdx, setAudioIdx]     = useState(0)
  const [fontSize, setFontSize]     = useState(18)
  const insets = useSafeAreaInsets()
  const listRef = useRef<FlatList>(null)
  const { guardar } = useProgress()
  const audioIdxRef = useRef(0)
  const versRef     = useRef<Versiculo[]>([])

  useEffect(() => {
    setLoading(true)
    Speech.stop()
    setAudioActivo(false)
    setAudioIdx(0)
    audioIdxRef.current = 0
    getVersiculos(libro.id, capitulo).then(data => {
      setVersiculos(data)
      versRef.current = data
      if (data.length > 0) setTotalCaps(Math.max(totalCaps, capitulo))
      setLoading(false)
      if (audioInicial) {
        setTimeout(() => iniciarAudio(data, 0), 500)
      } else if (versiculoInicio != null) {
        const idx = data.findIndex(v => v.versiculo === versiculoInicio)
        if (idx > 0) setTimeout(() => listRef.current?.scrollToIndex({ index: idx, animated: true, viewPosition: 0.2 }), 400)
      }
    })
    return () => { Speech.stop() }
  }, [capitulo])

  const leerVersiculo = useCallback((vers: Versiculo[], idx: number) => {
    if (idx >= vers.length) {
      setAudioActivo(false)
      return
    }
    audioIdxRef.current = idx
    setAudioIdx(idx)
    guardar({
      libroId: libro.id, libroNombre: libro.nombre,
      capitulo, versiculo: vers[idx].versiculo,
      modo: 'audio', fecha: new Date().toISOString(),
    })
    listRef.current?.scrollToIndex({ index: idx, animated: true, viewPosition: 0.3 })
    Speech.speak(vers[idx].texto, {
      language: 'es-ES',
      rate: 0.9,
      onDone: () => leerVersiculo(versRef.current, audioIdxRef.current + 1),
      onError: () => leerVersiculo(versRef.current, audioIdxRef.current + 1),
    })
  }, [capitulo, libro])

  const iniciarAudio = useCallback((vers: Versiculo[], desde: number) => {
    Speech.stop()
    versRef.current = vers
    setAudioActivo(true)
    leerVersiculo(vers, desde)
  }, [leerVersiculo])

  const toggleAudio = () => {
    if (audioActivo) {
      Speech.stop()
      setAudioActivo(false)
    } else {
      iniciarAudio(versiculos, audioIdx)
    }
  }

  const irCapitulo = (nueva: number) => {
    if (nueva < 1) return
    Speech.stop()
    setAudioActivo(false)
    setCapitulo(nueva)
    guardar({
      libroId: libro.id, libroNombre: libro.nombre,
      capitulo: nueva, versiculo: 1,
      modo: 'lectura', fecha: new Date().toISOString(),
    })
  }

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0 && !audioIdxRef.current) {
      const v = viewableItems[0].item as Versiculo
      guardar({
        libroId: libro.id, libroNombre: libro.nombre,
        capitulo, versiculo: v.versiculo,
        modo: 'lectura', fecha: new Date().toISOString(),
      })
    }
  })

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

      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => { Speech.stop(); nav.goBack() }} style={s.backBtn}>
          <Text style={s.backTxt}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTitulo} numberOfLines={1}>{libro.nombre}</Text>
          <Text style={s.headerCap}>Capítulo {capitulo}</Text>
        </View>
        <View style={s.headerAcciones}>
          <TouchableOpacity onPress={() => setFontSize(f => Math.max(14, f - 2))} style={s.iconBtn}>
            <Text style={s.iconTxt}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSize(f => Math.min(28, f + 2))} style={s.iconBtn}>
            <Text style={s.iconTxt}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Versículos */}
      <FlatList
        ref={listRef}
        data={versiculos}
        keyExtractor={v => v.id.toString()}
        contentContainerStyle={s.lista}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => { Speech.stop(); iniciarAudio(versiculos, index) }}
            activeOpacity={0.7}
            style={[
              s.vers,
              versiculoInicio != null && item.versiculo >= versiculoInicio && item.versiculo <= versiculoFin && s.versDestacado,
              audioActivo && audioIdx === index && s.versActivo,
            ]}
          >
            <Text style={[s.versNum, { fontSize: fontSize - 4 }]}>{item.versiculo}</Text>
            <Text style={[s.versTexto, { fontSize }]}>{item.texto.replace(/^\d+(\s*\(\d+\))?\s+/, '')}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Controles de navegación y audio */}
      <View style={[s.controles, { paddingBottom: insets.bottom + 14 }]}>
        <TouchableOpacity
          style={[s.navBtn, capitulo <= 1 && s.navBtnDis]}
          onPress={() => irCapitulo(capitulo - 1)}
          disabled={capitulo <= 1}
        >
          <Text style={s.navTxt}>‹ Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[s.audioBtn, audioActivo && s.audioBtnActivo]} onPress={toggleAudio}>
          <Text style={s.audioBtnTxt}>{audioActivo ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.navBtn} onPress={() => irCapitulo(capitulo + 1)}>
          <Text style={s.navTxt}>Siguiente ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.fondo },
  center:         { justifyContent: 'center', alignItems: 'center' },
  header:         { flexDirection: 'row', alignItems: 'center', paddingBottom: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: C.borde },
  backBtn:        { padding: 8 },
  backTxt:        { color: C.acento, fontSize: 28 },
  headerCenter:   { flex: 1, paddingHorizontal: 8 },
  headerTitulo:   { color: C.texto, fontSize: 16, fontWeight: '700' },
  headerCap:      { color: C.subTexto, fontSize: 13 },
  headerAcciones: { flexDirection: 'row', gap: 4 },
  iconBtn:        { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: C.card, borderRadius: 8, borderWidth: 1, borderColor: C.borde },
  iconTxt:        { color: C.texto, fontSize: 13, fontWeight: '700' },
  lista:          { paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 100 },
  vers:           { flexDirection: 'row', marginBottom: 16, gap: 10 },
  versActivo:     { backgroundColor: '#1e3a2f', borderRadius: 10, padding: 8, marginHorizontal: -8 },
  versDestacado:  { backgroundColor: '#1e1b4b', borderRadius: 10, padding: 8, marginHorizontal: -8, borderLeftWidth: 3, borderLeftColor: '#818cf8' },
  versNum:        { color: C.acento, fontWeight: '700', minWidth: 24, marginTop: 3 },
  versTexto:      { color: C.texto, lineHeight: 28, flex: 1 },
  controles:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderTopWidth: 1, borderColor: C.borde, backgroundColor: C.card },
  navBtn:         { paddingHorizontal: 16, paddingVertical: 10 },
  navBtnDis:      { opacity: 0.3 },
  navTxt:         { color: C.acento, fontSize: 15, fontWeight: '600' },
  audioBtn:       { width: 56, height: 56, borderRadius: 28, backgroundColor: C.acento, alignItems: 'center', justifyContent: 'center', shadowColor: C.acento, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 },
  audioBtnActivo: { backgroundColor: C.audioActivo },
  audioBtnTxt:    { fontSize: 22, color: '#fff' },
})
