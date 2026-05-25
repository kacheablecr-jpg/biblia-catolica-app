import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system/legacy'
import { Asset } from 'expo-asset'

export interface Libro {
  id: number
  usfm: string
  nombre: string
  testamento: 'AT' | 'NT'
  totalCapitulos?: number
}

export interface Versiculo {
  id: number
  libro_id: number
  capitulo: number
  versiculo: number
  texto: string
}

let db: SQLite.SQLiteDatabase | null = null

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db

  const dbPath = FileSystem.documentDirectory + 'SQLite/biblia.db'
  const dbDir  = FileSystem.documentDirectory + 'SQLite'

  const dirInfo = await FileSystem.getInfoAsync(dbDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true })
  }

  const fileInfo = await FileSystem.getInfoAsync(dbPath)
  if (!fileInfo.exists) {
    const asset = Asset.fromModule(require('../../assets/db/biblia.db'))
    await asset.downloadAsync()
    await FileSystem.copyAsync({ from: asset.localUri!, to: dbPath })
  }

  db = await SQLite.openDatabaseAsync('biblia.db')
  return db
}

export async function getLibros(): Promise<Libro[]> {
  const db = await getDb()
  const rows = await db.getAllAsync<Libro & { totalCapitulos: number }>(
    `SELECT l.id, l.usfm, l.nombre, l.testamento,
            MAX(v.capitulo) as totalCapitulos
     FROM libros l
     JOIN versiculos v ON v.libro_id = l.id
     GROUP BY l.id
     ORDER BY l.id`
  )
  return rows
}

export async function getCapitulos(libroId: number): Promise<number[]> {
  const db = await getDb()
  const rows = await db.getAllAsync<{ capitulo: number }>(
    `SELECT DISTINCT capitulo FROM versiculos
     WHERE libro_id = ? ORDER BY capitulo`,
    [libroId]
  )
  return rows.map(r => r.capitulo)
}

export async function getVersiculos(libroId: number, capitulo: number): Promise<Versiculo[]> {
  const db = await getDb()
  return db.getAllAsync<Versiculo>(
    `SELECT * FROM versiculos
     WHERE libro_id = ? AND capitulo = ?
     ORDER BY versiculo`,
    [libroId, capitulo]
  )
}

export async function buscarVersiculos(query: string): Promise<(Versiculo & { libro_nombre: string })[]> {
  const db = await getDb()
  return db.getAllAsync<Versiculo & { libro_nombre: string }>(
    `SELECT v.*, l.nombre as libro_nombre
     FROM versiculos v
     JOIN libros l ON l.id = v.libro_id
     WHERE v.texto LIKE ?
     ORDER BY v.libro_id, v.capitulo, v.versiculo
     LIMIT 100`,
    [`%${query}%`]
  )
}
