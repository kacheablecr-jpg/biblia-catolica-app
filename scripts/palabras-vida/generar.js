/**
 * Genera los datos de "Palabras de vida" a partir de la Biblia de la app (assets/db/biblia.db).
 *
 *   node scripts/palabras-vida/generar.js            → escribe src/data/palabrasVidaDatos.json
 *   node scripts/palabras-vida/generar.js --revisar  → solo muestra el conteo y las formas que entran
 *
 * Salida por palabra: veces que aparece, en cuántos versículos, en qué libro aparece más y la
 * lista de citas (cada una en un número: libro × 1.000.000 + capítulo × 1.000 + versículo). Se toman las 100 palabras más repetidas.
 * Requiere Node 22.5+ (node:sqlite).
 */
const fs = require('fs')
const path = require('path')
const { DatabaseSync } = require('node:sqlite')
const FAMILIAS = require('./familias')

const RAIZ = path.join(__dirname, '..', '..')
const TOTAL = 100
const LETRA = '[a-záéíóúüñ]'

const db = new DatabaseSync(path.join(RAIZ, 'assets', 'db', 'biblia.db'), { readOnly: true })
const versiculos = db.prepare('SELECT libro_id, capitulo, versiculo, texto FROM versiculos ORDER BY libro_id, capitulo, versiculo').all()
const libros = new Map(db.prepare('SELECT id, nombre FROM libros').all().map(l => [l.id, l.nombre]))

// \w de JavaScript no incluye tildes ni ñ: se cambia por las letras del español
const familias = FAMILIAS.map(([id, palabra, patrones, excluidas]) => ({
  id, palabra, excluidas: new Set(excluidas),
  patrones: patrones.map(p => new RegExp(p.source.replace(/\\w/g, LETRA))),
  veces: 0, formas: new Map(), porLibro: new Map(), citas: [],
}))

for (const v of versiculos) {
  const palabras = v.texto.toLowerCase().match(/[a-záéíóúüñ]+/g) ?? []
  for (const f of familias) {
    let enVersiculo = 0
    for (const w of palabras) {
      if (f.excluidas.has(w) || !f.patrones.some(p => p.test(w))) continue
      enVersiculo++
      f.formas.set(w, (f.formas.get(w) ?? 0) + 1)
    }
    if (!enVersiculo) continue
    f.veces += enVersiculo
    f.porLibro.set(v.libro_id, (f.porLibro.get(v.libro_id) ?? 0) + 1)
    // Una cita = un número: libro × 1.000.000 + capítulo × 1.000 + versículo
    f.citas.push(v.libro_id * 1000000 + v.capitulo * 1000 + v.versiculo)
  }
}

familias.sort((a, b) => b.veces - a.veces)
const ordenFormas = f => [...f.formas.entries()].sort((a, b) => b[1] - a[1])

if (process.argv.includes('--revisar')) {
  familias.forEach((f, i) => {
    const corte = i === TOTAL ? '\n──────── fuera de las 100 ────────\n' : ''
    console.log(`${corte}${String(i + 1).padStart(3)}. ${f.palabra.padEnd(20)} ${String(f.veces).padStart(5)} | ${ordenFormas(f).map(x => x.join(' ')).join(', ')}`)
  })
  process.exit(0)
}

const datos = familias.slice(0, TOTAL).map((f, i) => {
  const [libroTopId, versiculosLibroTop] = [...f.porLibro.entries()].sort((a, b) => b[1] - a[1])[0]
  return {
    id: f.id, palabra: f.palabra, puesto: i + 1, veces: f.veces, versiculos: f.citas.length,
    libros: f.porLibro.size, libroTop: libros.get(libroTopId), versiculosLibroTop,
    formas: ordenFormas(f).slice(0, 6).map(x => x[0]),
    citas: f.citas,
  }
})
const salida = path.join(RAIZ, 'src', 'data', 'palabrasVidaDatos.json')
fs.writeFileSync(salida, JSON.stringify(datos))
console.log(`${datos.length} palabras → ${salida} (${Math.round(fs.statSync(salida).size / 1024)} KB)`)
datos.forEach(d => console.log(`${String(d.puesto).padStart(3)}. ${d.id.padEnd(16)} ${String(d.veces).padStart(5)} veces · ${d.versiculos} versículos · más en ${d.libroTop}`))
