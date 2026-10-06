import datos from './palabrasVidaDatos.json'
import { TEXTOS_PALABRAS } from './palabrasVidaTextos'

/**
 * Las 100 palabras con mensaje para la vida que más se repiten en la Biblia de la app.
 * Los números salen del texto bíblico (ver scripts/palabras-vida); los textos se escriben a mano.
 */
export interface PalabraVida {
  id: string
  palabra: string
  /** Lugar en el orden de más a menos repetida */
  puesto: number
  /** Veces que aparece la palabra y las de su misma raíz (amor, amar, amado…) */
  veces: number
  /** Versículos distintos en que aparece */
  versiculos: number
  /** En cuántos de los 75 libros aparece */
  libros: number
  libroTop: string
  versiculosLibroTop: number
  /** Las formas más frecuentes que se contaron */
  formas: string[]
  /** Cada cita en un número: libro × 1.000.000 + capítulo × 1.000 + versículo */
  citas: number[]
  significado: string
  mensaje: string
}

export interface Cita { libroId: number; capitulo: number; versiculo: number }

export const PALABRAS_VIDA: PalabraVida[] = (datos as Omit<PalabraVida, 'significado' | 'mensaje'>[]).map(d => ({
  ...d,
  significado: TEXTOS_PALABRAS[d.id]?.significado ?? '',
  mensaje: TEXTOS_PALABRAS[d.id]?.mensaje ?? '',
}))

export const leerCita = (codigo: number): Cita => ({
  libroId: Math.floor(codigo / 1000000),
  capitulo: Math.floor((codigo % 1000000) / 1000),
  versiculo: codigo % 1000,
})

export const numero = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
