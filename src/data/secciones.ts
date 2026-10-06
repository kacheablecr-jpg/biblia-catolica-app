import personajes from './personajesDatos.json'
import { TEXTOS_PERSONAJES } from './personajesTextos'
import { PALABRAS_VIDA } from './palabrasVida'

/**
 * "Palabras de vida" y "Personajes de la Biblia" comparten las mismas dos pantallas (lista y ficha).
 * Aquí se describe lo que cambia de una sección a otra: sus textos y sus fichas.
 */
export type ClaveSeccion = 'palabras' | 'personajes'

export interface FichaLista {
  id: string
  titulo: string
  /** Solo personajes: quién es, para distinguir a los que comparten nombre */
  subtitulo?: string
  /** Solo personajes: el nombre que comparte con otros de la lista (José, Juan, María…) */
  grupo?: string
  puesto: number
  veces: number
  versiculos: number
  libros: number
  libroTop: string
  versiculosLibroTop: number
  /** Solo palabras: las formas de la misma raíz que se contaron */
  formas: string[]
  /** Cada cita en un número: libro × 1.000.000 + capítulo × 1.000 + versículo */
  citas: number[]
  texto1: string
  texto2: string
}

export interface Seccion {
  clave: ClaveSeccion
  emoji: string
  titulo: string
  intro: string
  placeholder: string
  /** "palabra" / "nombre": para los mensajes del buscador */
  cosa: string
  etiquetaTexto1: string
  etiquetaTexto2: string
  /** Cómo se contó, bajo "Dónde aparece" */
  comoSeConto: (ficha: FichaLista) => string
  fichas: FichaLista[]
}

interface DatosPersonaje {
  id: string; nombre: string; quien: string; puesto: number; veces: number; versiculos: number
  libros: number; libroTop: string; versiculosLibroTop: number; grupo?: string; citas: number[]
}

export const SECCIONES: Record<ClaveSeccion, Seccion> = {
  palabras: {
    clave: 'palabras',
    emoji: '💬',
    titulo: 'Palabras de vida',
    intro: 'Las 100 palabras con mensaje para la vida que más se repiten en la Biblia, de la más a la menos repetida. Toque una para ver qué significa, qué nos dice hoy y dónde aparece.',
    placeholder: 'Escriba cualquier palabra o frase...',
    cosa: 'palabra',
    etiquetaTexto1: '📖  Qué significa',
    etiquetaTexto2: '💬  Mensaje para hoy',
    comoSeConto: ficha => ` Se cuentan la palabra y las de su misma raíz: ${ficha.formas.join(', ')}…`,
    fichas: PALABRAS_VIDA.map(p => ({ ...p, titulo: p.palabra, texto1: p.significado, texto2: p.mensaje })),
  },
  personajes: {
    clave: 'personajes',
    emoji: '👥',
    titulo: 'Personajes de la Biblia',
    intro: 'Las personas de la Biblia, de la más a la menos nombrada. A las que comparten nombre se las distingue (José hijo de Jacob, José esposo de María…). Toque una para ver quién fue, qué nos enseña y dónde aparece.',
    placeholder: 'Escriba un nombre...',
    cosa: 'nombre',
    etiquetaTexto1: '👤  Quién fue',
    etiquetaTexto2: '💬  Qué nos enseña',
    comoSeConto: () => ' Se cuentan las veces que se le nombra. A quienes comparten nombre se les separa por el libro y el contexto: es una aproximación cuidadosa.',
    fichas: (personajes as DatosPersonaje[]).map(p => ({
      ...p, titulo: p.nombre, subtitulo: p.quien, formas: [],
      texto1: TEXTOS_PERSONAJES[p.id]?.quienFue ?? '',
      texto2: TEXTOS_PERSONAJES[p.id]?.ensenanza ?? '',
    })),
  },
}
