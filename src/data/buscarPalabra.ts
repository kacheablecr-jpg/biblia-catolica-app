import { getLibros, getTodosLosVersiculos } from '../db/database'

/**
 * Buscador de "Palabras de vida": cuenta cualquier palabra o frase en toda la Biblia de la app,
 * sin internet, y devuelve lo mismo que tienen las 100 palabras (veces, versículos, libros, citas).
 */
export type ModoBusqueda = 'exacta' | 'contiene'

export interface VersiculoDestacado { libroId: number; capitulo: number; versiculo: number; texto: string }

export interface ResultadoBusqueda {
  veces: number
  versiculos: number
  libros: number
  libroTop: string
  versiculosLibroTop: number
  /** Palabras completas que calzaron, de la más a la menos frecuente */
  formas: string[]
  /** Cada cita en un número: libro × 1.000.000 + capítulo × 1.000 + versículo */
  citas: number[]
  destacados: VersiculoDestacado[]
}

/** Minúsculas y sin tildes, pero conservando la ñ ("ano" y "año" no son lo mismo) */
export const normalizar = (texto: string) =>
  texto.toLowerCase().replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u')

export const limpiarTermino = (texto: string) => normalizar(texto).replace(/[^a-zñ0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()

const LETRA = 'a-zñ'
const escapar = (texto: string) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

let textosNormalizados: string[] | null = null

export async function buscarEnBiblia(termino: string, modo: ModoBusqueda): Promise<ResultadoBusqueda> {
  const buscado = limpiarTermino(termino)
  const [versiculos, libros] = await Promise.all([getTodosLosVersiculos(), getLibros()])
  if (!textosNormalizados) textosNormalizados = versiculos.map(v => normalizar(v.texto))

  // "exacta": la palabra o frase completa; "contiene": también dentro de otras palabras (perdon → perdonar)
  const patron = modo === 'exacta'
    ? new RegExp(`(^|[^${LETRA}])(${escapar(buscado)})(?![${LETRA}])`, 'g')
    : new RegExp(`[${LETRA}]*${escapar(buscado)}[${LETRA}]*`, 'g')

  let veces = 0
  const citas: number[] = []
  const porLibro = new Map<number, number>()
  const formas = new Map<string, number>()
  const candidatos: VersiculoDestacado[] = []

  for (let i = 0; i < versiculos.length; i++) {
    const texto = textosNormalizados[i]
    if (!texto.includes(buscado)) continue
    const v = versiculos[i]
    const original = v.texto.toLowerCase()
    let enVersiculo = 0
    patron.lastIndex = 0
    for (let hallado = patron.exec(texto); hallado; hallado = patron.exec(texto)) {
      enVersiculo++
      // El texto normalizado tiene el mismo largo que el original: la forma se toma con sus tildes
      const inicio = hallado.index + (modo === 'exacta' ? hallado[1].length : 0)
      const forma = original.slice(inicio, hallado.index + hallado[0].length)
      formas.set(forma, (formas.get(forma) ?? 0) + 1)
    }
    if (!enVersiculo) continue
    veces += enVersiculo
    citas.push(v.libro_id * 1000000 + v.capitulo * 1000 + v.versiculo)
    porLibro.set(v.libro_id, (porLibro.get(v.libro_id) ?? 0) + 1)
    // Para destacar se prefieren versículos que se lean solos: ni muy cortos ni muy largos
    if (v.texto.length >= 50 && v.texto.length <= 190) {
      candidatos.push({ libroId: v.libro_id, capitulo: v.capitulo, versiculo: v.versiculo, texto: v.texto })
    }
  }

  const [libroTopId, versiculosLibroTop] = [...porLibro.entries()].sort((a, b) => b[1] - a[1])[0] ?? [0, 0]
  return {
    veces,
    versiculos: citas.length,
    libros: porLibro.size,
    libroTop: libros.find(l => l.id === libroTopId)?.nombre ?? '',
    versiculosLibroTop,
    formas: [...formas.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(f => f[0]),
    citas,
    destacados: repartir(candidatos, 3),
  }
}

/** Toma `cantidad` elementos repartidos a lo largo de la lista (inicio, medio y final de la Biblia) */
function repartir<T>(lista: T[], cantidad: number): T[] {
  if (lista.length <= cantidad) return lista
  return Array.from({ length: cantidad }, (_, i) => lista[Math.floor(((i + 0.5) * lista.length) / cantidad)])
}
