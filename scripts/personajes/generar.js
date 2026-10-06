/**
 * Genera los datos de "Personajes de la Biblia" a partir de la Biblia de la app (assets/db/biblia.db).
 *
 *   node scripts/personajes/generar.js            → escribe src/data/personajesDatos.json
 *   node scripts/personajes/generar.js --revisar  → solo muestra el conteo y en qué libros cae cada uno
 *
 * Salida por personaje: veces que se le nombra, en cuántos versículos, en qué libro aparece más y
 * la lista de citas (cada una en un número: libro × 1.000.000 + capítulo × 1.000 + versículo).
 * Entran todos los personajes definidos, del más al menos nombrado. Requiere Node 22.5+ (node:sqlite).
 */
const fs = require('fs')
const path = require('path')
const { DatabaseSync } = require('node:sqlite')
const PERSONAJES = require('./personajes')

const GRUPO = new Map(Object.entries(PERSONAJES.COMPARTEN).flatMap(([nombre, ids]) => ids.map(id => [id, nombre])))
const RAIZ = path.join(__dirname, '..', '..')

const db = new DatabaseSync(path.join(RAIZ, 'assets', 'db', 'biblia.db'), { readOnly: true })
const versiculos = db.prepare('SELECT libro_id, capitulo, versiculo, texto FROM versiculos ORDER BY libro_id, capitulo, versiculo').all()
const libros = new Map(db.prepare('SELECT id, nombre FROM libros').all().map(l => [l.id, l.nombre]))

const personajes = PERSONAJES.map(p => ({
  ...p,
  partes: p.partes.map(parte => ({ nombres: new Set(parte.nombres), donde: parte.donde ?? (() => true) })),
  veces: 0, porLibro: new Map(), citas: [],
}))

for (const fila of versiculos) {
  const v = { libro: fila.libro_id, cap: fila.capitulo, vers: fila.versiculo, texto: fila.texto }
  // Los nombres se buscan con su mayúscula y sus tildes, tal como están escritos
  const palabras = fila.texto.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) ?? []
  for (const p of personajes) {
    let enVersiculo = 0
    for (const parte of p.partes) {
      if (!parte.donde(v)) continue
      for (const w of palabras) if (parte.nombres.has(w)) enVersiculo++
    }
    if (!enVersiculo) continue
    p.veces += enVersiculo
    p.porLibro.set(v.libro, (p.porLibro.get(v.libro) ?? 0) + 1)
    p.citas.push(v.libro * 1000000 + v.cap * 1000 + v.vers)
  }
}

personajes.sort((a, b) => b.veces - a.veces)

if (process.argv.includes('--revisar')) {
  personajes.forEach((p, i) => {
    const reparto = [...p.porLibro.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7).map(([id, n]) => `${libros.get(id)} ${n}`).join(', ')
    console.log(`${String(i + 1).padStart(3)}. ${(p.nombre + ', ' + p.quien).slice(0, 58).padEnd(58)} ${String(p.veces).padStart(5)} | ${reparto}`)
  })
  process.exit(0)
}

const datos = personajes.map((p, i) => {
  const [libroTopId, versiculosLibroTop] = [...p.porLibro.entries()].sort((a, b) => b[1] - a[1])[0]
  return {
    id: p.id, nombre: p.nombre, quien: p.quien, puesto: i + 1, veces: p.veces, versiculos: p.citas.length,
    libros: p.porLibro.size, libroTop: libros.get(libroTopId), versiculosLibroTop,
    // Nombre que comparte con otros personajes de la lista (si lo comparte)
    ...(GRUPO.has(p.id) ? { grupo: GRUPO.get(p.id) } : {}),
    citas: p.citas,
  }
})
const salida = path.join(RAIZ, 'src', 'data', 'personajesDatos.json')
fs.writeFileSync(salida, JSON.stringify(datos))
console.log(`${datos.length} personajes → ${salida} (${Math.round(fs.statSync(salida).size / 1024)} KB)`)
datos.forEach(d => console.log(`${String(d.puesto).padStart(3)}. ${d.id.padEnd(20)} ${String(d.veces).padStart(5)} veces · ${d.versiculos} versículos · más en ${d.libroTop}`))
