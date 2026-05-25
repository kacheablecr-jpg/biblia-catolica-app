import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback } from 'react'

export interface ProgresoCita {
  libroId: number
  libroNombre: string
  capitulo: number
  versiculo: number
  modo: 'lectura' | 'audio'
  fecha: string
}

const KEY = 'progreso_lectura'

export function useProgress() {
  const guardar = useCallback(async (p: ProgresoCita) => {
    try {
      const raw = await AsyncStorage.getItem(KEY)
      const todos: ProgresoCita[] = raw ? JSON.parse(raw) : []
      const filtrado = todos.filter(x => x.modo !== p.modo)
      const actualizado = [p, ...filtrado].slice(0, 10)
      await AsyncStorage.setItem(KEY, JSON.stringify(actualizado))
    } catch {}
  }, [])

  const obtener = useCallback(async (modo: 'lectura' | 'audio'): Promise<ProgresoCita | null> => {
    try {
      const raw = await AsyncStorage.getItem(KEY)
      if (!raw) return null
      const todos: ProgresoCita[] = JSON.parse(raw)
      return todos.find(x => x.modo === modo) ?? null
    } catch {
      return null
    }
  }, [])

  return { guardar, obtener }
}
