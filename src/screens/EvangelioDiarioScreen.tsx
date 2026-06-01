import React, { useEffect, useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Speech from 'expo-speech'
import { getDb } from '../db/database'
import { getGospelForDate, type GospelEntry } from '../data/lectionary2026'

const C = {
  fondo:   '#0f172a',
  card:    '#1e293b',
  borde:   '#334155',
  texto:   '#f1f5f9',
  sub:     '#94a3b8',
  acento:  '#818cf8',
  verde:   '#4ade80',
  bgH:     '#1e1b4b',
}

function getTodayStr(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function EvangelioDiarioScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [entry,    setEntry]    = useState<GospelEntry | null>(null)
  const [versos,   setVersos]   = useState<string[]>([])
  const [loading,  setLoading]  = useState(true)
  const [leyendo,  setLeyendo]  = useState(false)

  const today = getTodayStr()

  useEffect(() => {
    async function load() {
      setLoading(true)
      const gospel = getGospelForDate(today)
      if (!gospel) { setLoading(false); return }
      setEntry(gospel)

      try {
        const db = await getDb()
        const rows = await db.getAllAsync<{ texto: string }>(
          `SELECT texto FROM versiculos
           WHERE libro_id = ? AND capitulo = ? AND versiculo BETWEEN ? AND ?
           ORDER BY versiculo`,
          [gospel.libroId, gospel.capitulo, gospel.inicio, gospel.fin]
        )
        setVersos(rows.map(r => r.texto))
      } catch { setVersos([]) }
      setLoading(false)
    }
    load()
    return () => { Speech.stop() }
  }, [today])

  const escuchar = () => {
    if (leyendo) { Speech.stop(); setLeyendo(false); return }
    if (!entry || versos.length === 0) return
    const texto = `${entry.libroNombre} capítulo ${entry.capitulo}. ${versos.join(' ')} --- Reflexión: ${entry.explicacion}`
    setLeyendo(true)
    Speech.speak(texto, {
      language: 'es-ES', rate: 0.9,
      onDone:  () => setLeyendo(false),
      onError: () => setLeyendo(false),
    })
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => { Speech.stop(); nav.goBack() }} style={s.back}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>✝ Evangelio del día</Text>
        <Text style={s.fecha}>{today}</Text>
      </View>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={C.acento} />
        </View>
      ) : !entry ? (
        <View style={s.center}>
          <Text style={s.noDisp}>No hay evangelio configurado para hoy.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 24 }]}>

          {/* Título litúrgico */}
          <View style={s.tituloBox}>
            <Text style={s.tituloFiesta}>{entry.titulo}</Text>
            <Text style={s.referencia}>
              {entry.libroNombre} {entry.capitulo},{entry.inicio}-{entry.fin}
            </Text>
          </View>

          {/* Botón escuchar */}
          <TouchableOpacity
            style={[s.audioBtn, leyendo && s.audioBtnActivo]}
            onPress={escuchar}
            activeOpacity={0.8}
          >
            <Text style={s.audioIcon}>{leyendo ? '⏹' : '🔊'}</Text>
            <Text style={[s.audioTxt, leyendo && s.audioTxtActivo]}>
              {leyendo ? 'Detener audio' : 'Escuchar evangelio'}
            </Text>
          </TouchableOpacity>

          {/* Texto del evangelio */}
          <View style={s.gospelCard}>
            <Text style={s.gospelLabel}>📖 Texto del Evangelio</Text>
            {versos.length > 0 ? (
              versos.map((v, i) => (
                <Text key={i} style={s.verso}>
                  <Text style={s.versoNum}>{entry.inicio + i}. </Text>{v}
                </Text>
              ))
            ) : (
              <Text style={s.sub}>Texto no disponible offline para este pasaje.</Text>
            )}
          </View>

          {/* Reflexión */}
          <View style={s.reflexionCard}>
            <Text style={s.reflexionLabel}>💡 Reflexión del día</Text>
            <Text style={s.reflexionTxt}>{entry.explicacion}</Text>
          </View>

        </ScrollView>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container:      { flex:1, backgroundColor:C.fondo },
  header:         { backgroundColor:C.bgH, paddingHorizontal:20, paddingBottom:20, borderBottomLeftRadius:24, borderBottomRightRadius:24, marginBottom:16 },
  back:           { marginBottom:10 },
  backTxt:        { color:C.acento, fontSize:15 },
  titulo:         { color:C.texto, fontSize:22, fontWeight:'800', marginBottom:4 },
  fecha:          { color:C.sub, fontSize:13 },
  center:         { flex:1, alignItems:'center', justifyContent:'center' },
  noDisp:         { color:C.sub, fontSize:15, textAlign:'center', padding:24 },
  content:        { paddingHorizontal:16, gap:14 },
  tituloBox:      { backgroundColor:C.card, borderRadius:16, padding:18, borderWidth:1, borderColor:C.borde, alignItems:'center' },
  tituloFiesta:   { color:C.acento, fontSize:17, fontWeight:'700', textAlign:'center', marginBottom:6 },
  referencia:     { color:C.sub, fontSize:13 },
  audioBtn:       { flexDirection:'row', alignItems:'center', gap:10, backgroundColor:'#0f1e36', borderRadius:12, paddingVertical:12, paddingHorizontal:16, borderWidth:1, borderColor:C.acento+'55' },
  audioBtnActivo: { backgroundColor:'#1a0a0a', borderColor:'#991b1b' },
  audioIcon:      { fontSize:18 },
  audioTxt:       { color:C.acento, fontSize:14, fontWeight:'600' },
  audioTxtActivo: { color:'#f87171' },
  gospelCard:     { backgroundColor:C.card, borderRadius:16, padding:18, borderWidth:1, borderColor:C.borde },
  gospelLabel:    { color:C.acento, fontSize:12, fontWeight:'700', textTransform:'uppercase', letterSpacing:1, marginBottom:12 },
  verso:          { color:C.texto, fontSize:15, lineHeight:24, marginBottom:6 },
  versoNum:       { color:C.sub, fontSize:13 },
  reflexionCard:  { backgroundColor:'#1e1b4b', borderRadius:16, padding:18, borderWidth:1, borderColor:C.acento+'33' },
  reflexionLabel: { color:C.acento, fontSize:12, fontWeight:'700', textTransform:'uppercase', letterSpacing:1, marginBottom:10 },
  reflexionTxt:   { color:'#c7d2fe', fontSize:14, lineHeight:22, fontStyle:'italic' },
  sub:            { color:C.sub, fontSize:14 },
})
