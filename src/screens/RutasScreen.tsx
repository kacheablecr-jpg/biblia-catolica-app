import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155' }

export interface Ruta {
  id: string
  titulo: string
  descripcion: string
  emoji: string
  color: string
  pasajes: { libroId: number; libroNombre: string; capitulo: number; descripcion: string; versiculoInicio?: number; versiculoFin?: number }[]
}

const SECCIONES: { titulo: string; rutas: Ruta[] }[] = [
  {
    titulo: '✝️  Vida de Jesús',
    rutas: [
      {
        id: 'vida_jesus',
        titulo: 'Vida de Jesús',
        descripcion: 'Del nacimiento a la ascensión, en orden cronológico',
        emoji: '✝️',
        color: '#4f46e5',
        pasajes: [
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 1,  descripcion: 'El anuncio del ángel a María' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 2,  descripcion: 'El nacimiento de Jesús' },
          { libroId: 49, libroNombre: 'San Mateo',  capitulo: 2,  descripcion: 'La visita de los Magos' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 3,  descripcion: 'El bautismo de Jesús' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 4,  descripcion: 'Las tentaciones en el desierto' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 2,  descripcion: 'Las bodas de Caná — primer milagro' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 3,  descripcion: 'Conversación con Nicodemo' },
          { libroId: 49, libroNombre: 'San Mateo',  capitulo: 5,  descripcion: 'El Sermón del Monte' },
          { libroId: 49, libroNombre: 'San Mateo',  capitulo: 6,  descripcion: 'El Padre Nuestro' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 15, descripcion: 'Parábola del hijo pródigo' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 11, descripcion: 'Resurrección de Lázaro' },
          { libroId: 49, libroNombre: 'San Mateo',  capitulo: 21, descripcion: 'Entrada en Jerusalén' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 13, descripcion: 'La Última Cena — lavatorio de pies' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 22, descripcion: 'La Última Cena y la oración en el huerto' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 23, descripcion: 'La Pasión y muerte de Jesús' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 24, descripcion: 'La Resurrección' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 20, descripcion: 'Jesús se aparece a los discípulos' },
          { libroId: 53, libroNombre: 'Hechos',     capitulo: 1,  descripcion: 'La Ascensión al cielo' },
        ],
      },
      {
        id: 'parabolas',
        titulo: 'Parábolas de Jesús',
        descripcion: 'Las enseñanzas de Jesús a través de historias',
        emoji: '📖',
        color: '#0891b2',
        pasajes: [
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 13, descripcion: 'El sembrador' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 10, descripcion: 'El buen samaritano' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 15, descripcion: 'La oveja perdida' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 15, descripcion: 'El hijo pródigo' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 20, descripcion: 'Los trabajadores de la viña' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 25, descripcion: 'Las diez vírgenes' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 16, descripcion: 'El rico y Lázaro' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 18, descripcion: 'El siervo que no perdonó' },
        ],
      },
      {
        id: 'milagros',
        titulo: 'Milagros de Jesús',
        descripcion: 'Señales del poder de Dios',
        emoji: '✨',
        color: '#059669',
        pasajes: [
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 2,  descripcion: 'El agua convertida en vino' },
          { libroId: 49, libroNombre: 'San Mateo',  capitulo: 8,  descripcion: 'Curación del leproso' },
          { libroId: 49, libroNombre: 'San Mateo',  capitulo: 14, descripcion: 'Multiplicación de los panes' },
          { libroId: 50, libroNombre: 'San Marcos', capitulo: 4,  descripcion: 'Calma la tempestad' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 9,  descripcion: 'Curación del ciego de nacimiento' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 11, descripcion: 'Resurrección de Lázaro' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 17, descripcion: 'Los diez leprosos' },
        ],
      },
      {
        id: 'pasion',
        titulo: 'Pasión y Resurrección',
        descripcion: 'Los últimos días de Jesús',
        emoji: '🕊️',
        color: '#dc2626',
        pasajes: [
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 26, descripcion: 'La Última Cena y Getsemaní' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 27, descripcion: 'La crucifixión' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 28, descripcion: 'La resurrección' },
          { libroId: 52, libroNombre: 'San Juan',  capitulo: 18, descripcion: 'El prendimiento' },
          { libroId: 52, libroNombre: 'San Juan',  capitulo: 19, descripcion: 'La crucifixión según Juan' },
          { libroId: 52, libroNombre: 'San Juan',  capitulo: 20, descripcion: 'El sepulcro vacío' },
          { libroId: 52, libroNombre: 'San Juan',  capitulo: 21, descripcion: 'Aparición en el mar de Tiberíades' },
        ],
      },
    ],
  },
  {
    titulo: '💫  Devocionales',
    rutas: [
      {
        id: 'maria',
        titulo: 'María, Madre de Dios',
        descripcion: 'La vida y misión de la Virgen María',
        emoji: '🌹',
        color: '#7c3aed',
        pasajes: [
          { libroId: 51, libroNombre: 'San Lucas',    capitulo: 1,  descripcion: 'La Anunciación y el Magnificat' },
          { libroId: 51, libroNombre: 'San Lucas',    capitulo: 2,  descripcion: 'El nacimiento y presentación de Jesús' },
          { libroId: 52, libroNombre: 'San Juan',     capitulo: 2,  descripcion: 'Las bodas de Caná — la intercesión de María' },
          { libroId: 52, libroNombre: 'San Juan',     capitulo: 19, descripcion: 'María al pie de la Cruz' },
          { libroId: 53, libroNombre: 'Hechos',       capitulo: 1,  descripcion: 'María con los apóstoles en Pentecostés' },
          { libroId: 75, libroNombre: 'Apocalipsis',  capitulo: 12, descripcion: 'La mujer vestida de sol' },
        ],
      },
      {
        id: 'amor',
        titulo: 'El amor según la Biblia',
        descripcion: 'El amor de Dios y el amor entre las personas',
        emoji: '❤️',
        color: '#e11d48',
        pasajes: [
          { libroId: 55, libroNombre: '1 Corintios', capitulo: 13, descripcion: 'El himno al amor — "el amor es paciente, es bondadoso"' },
          { libroId: 52, libroNombre: 'San Juan',     capitulo: 13, descripcion: 'El mandamiento nuevo: amaos los unos a los otros' },
          { libroId: 71, libroNombre: '1 Juan',       capitulo: 4,  descripcion: 'Dios es amor — "el que no ama no conoce a Dios"' },
          { libroId: 54, libroNombre: 'Romanos',      capitulo: 8,  descripcion: 'Nada nos separará del amor de Dios' },
          { libroId: 49, libroNombre: 'San Mateo',    capitulo: 22, descripcion: 'El mandamiento del amor — amar a Dios y al prójimo' },
          { libroId: 22, libroNombre: 'Cantares',     capitulo: 2,  descripcion: 'El amor humano como reflejo del amor divino' },
        ],
      },
      {
        id: 'salmos_consolacion',
        titulo: 'Salmos de consolación',
        descripcion: 'Los salmos más amados en los momentos difíciles',
        emoji: '🕊️',
        color: '#0d9488',
        pasajes: [
          { libroId: 19, libroNombre: 'Salmos', capitulo: 23,  descripcion: 'El Señor es mi pastor — nada me faltará' },
          { libroId: 19, libroNombre: 'Salmos', capitulo: 27,  descripcion: 'El Señor es mi luz y mi salvación' },
          { libroId: 19, libroNombre: 'Salmos', capitulo: 34,  descripcion: 'El Señor libra de todos los temores' },
          { libroId: 19, libroNombre: 'Salmos', capitulo: 46,  descripcion: 'Dios es nuestro refugio y fortaleza' },
          { libroId: 19, libroNombre: 'Salmos', capitulo: 91,  descripcion: 'Bajo la sombra del Altísimo' },
          { libroId: 19, libroNombre: 'Salmos', capitulo: 121, descripcion: 'El Señor es tu guardián' },
          { libroId: 19, libroNombre: 'Salmos', capitulo: 139, descripcion: 'Señor, tú me examinas y me conoces' },
        ],
      },
      {
        id: 'oraciones',
        titulo: 'Oraciones bíblicas',
        descripcion: 'Las grandes oraciones de la Biblia',
        emoji: '🙏',
        color: '#b45309',
        pasajes: [
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 6,   descripcion: 'El Padre Nuestro — la oración que Jesús nos enseñó' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 1,   descripcion: 'El Magnificat — oración de María' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 2,   descripcion: 'El Nunc Dimittis — oración de Simeón' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 17,  descripcion: 'La oración sacerdotal de Jesús' },
          { libroId: 19, libroNombre: 'Salmos',     capitulo: 51,  descripcion: 'El Miserere — oración de perdón de David' },
          { libroId: 19, libroNombre: 'Salmos',     capitulo: 103, descripcion: 'Alaba, alma mía, al Señor' },
        ],
      },
    ],
  },
  {
    titulo: '📜  Antiguo Testamento',
    rutas: [
      {
        id: 'profecias_mesias',
        titulo: 'Los profetas anuncian al Mesías',
        descripcion: 'Profecías del AT que se cumplen en Jesús',
        emoji: '⭐',
        color: '#9333ea',
        pasajes: [
          { libroId: 23, libroNombre: 'Isaías',   capitulo: 7,  descripcion: '"La virgen concebirá y dará a luz un hijo"' },
          { libroId: 23, libroNombre: 'Isaías',   capitulo: 9,  descripcion: '"Un niño nos ha nacido, un hijo nos ha sido dado"' },
          { libroId: 23, libroNombre: 'Isaías',   capitulo: 53, descripcion: 'El siervo sufriente — profecía de la Pasión' },
          { libroId: 33, libroNombre: 'Miqueas',  capitulo: 5,  descripcion: '"De ti, Belén, saldrá el gobernante de Israel"' },
          { libroId: 38, libroNombre: 'Zacarías', capitulo: 9,  descripcion: '"Tu rey viene a ti, humilde, montado en un asno"' },
          { libroId: 19, libroNombre: 'Salmos',   capitulo: 22, descripcion: '"Dios mío, ¿por qué me has abandonado?" — Salmo mesiánico' },
          { libroId: 24, libroNombre: 'Jeremías', capitulo: 31, descripcion: 'La nueva alianza anunciada' },
        ],
      },
      {
        id: 'figuras_israel',
        titulo: 'Grandes figuras de Israel',
        descripcion: 'Los hombres y mujeres que marcaron al pueblo de Dios',
        emoji: '⚔️',
        color: '#c2410c',
        pasajes: [
          { libroId: 1,  libroNombre: 'Génesis',   capitulo: 12, descripcion: 'La llamada de Abraham — padre de la fe' },
          { libroId: 1,  libroNombre: 'Génesis',   capitulo: 22, descripcion: 'Abraham y el sacrificio de Isaac' },
          { libroId: 2,  libroNombre: 'Éxodo',     capitulo: 3,  descripcion: 'La zarza ardiente — la llamada de Moisés' },
          { libroId: 2,  libroNombre: 'Éxodo',     capitulo: 14, descripcion: 'El paso del Mar Rojo' },
          { libroId: 9,  libroNombre: '1 Samuel',  capitulo: 17, descripcion: 'David y Goliat' },
          { libroId: 11, libroNombre: '1 Reyes',   capitulo: 18, descripcion: 'Elías y los profetas de Baal en el Carmelo' },
          { libroId: 41, libroNombre: 'Judit',     capitulo: 13, descripcion: 'Judit libera a su pueblo' },
          { libroId: 17, libroNombre: 'Ester',     capitulo: 4,  descripcion: 'Ester intercede valientemente por su pueblo' },
        ],
      },
      {
        id: 'sabiduria',
        titulo: 'Sabiduría para la vida',
        descripcion: 'Los libros sapienciales con consejos para vivir bien',
        emoji: '📜',
        color: '#0369a1',
        pasajes: [
          { libroId: 20, libroNombre: 'Proverbios',    capitulo: 3,  descripcion: '"Confía en el Señor de todo corazón, no en tu propia inteligencia"' },
          { libroId: 18, libroNombre: 'Job',            capitulo: 1,  descripcion: 'La prueba de Job — fe inquebrantable en el sufrimiento' },
          { libroId: 18, libroNombre: 'Job',            capitulo: 38, descripcion: 'Dios responde a Job desde el torbellino' },
          { libroId: 45, libroNombre: 'Eclesiástico',   capitulo: 3,  descripcion: 'Honra a tu padre y a tu madre' },
          { libroId: 45, libroNombre: 'Eclesiástico',   capitulo: 2,  descripcion: 'Confía en Dios en medio de la prueba' },
          { libroId: 46, libroNombre: 'Sabiduría',      capitulo: 3,  descripcion: '"Las almas de los justos están en las manos de Dios"' },
          { libroId: 20, libroNombre: 'Proverbios',     capitulo: 31, descripcion: 'La persona íntegra' },
        ],
      },
    ],
  },
  {
    titulo: '📅  Año litúrgico',
    rutas: [
      {
        id: 'adviento',
        titulo: 'Adviento',
        descripcion: 'Tiempo de espera y preparación para la venida del Señor',
        emoji: '🕯️',
        color: '#4338ca',
        pasajes: [
          { libroId: 23, libroNombre: 'Isaías',   capitulo: 9,  descripcion: '"El pueblo que andaba en tinieblas vio una gran luz"' },
          { libroId: 23, libroNombre: 'Isaías',   capitulo: 11, descripcion: '"Saldrá un retoño del tronco de Jesé"' },
          { libroId: 23, libroNombre: 'Isaías',   capitulo: 40, descripcion: '"Preparen el camino del Señor"' },
          { libroId: 39, libroNombre: 'Malaquías', capitulo: 3,  descripcion: '"Yo envío mi mensajero delante de mí"' },
          { libroId: 51, libroNombre: 'San Lucas', capitulo: 1,  descripcion: 'La Anunciación — María recibe la Buena Nueva' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 1,  descripcion: 'El anuncio del ángel a José' },
        ],
      },
      {
        id: 'cuaresma',
        titulo: 'Cuaresma',
        descripcion: 'Cuarenta días de conversión y renovación interior',
        emoji: '🌿',
        color: '#7f1d1d',
        pasajes: [
          { libroId: 29, libroNombre: 'Joel',      capitulo: 2,  descripcion: '"Conviértanse a mí de todo corazón"' },
          { libroId: 23, libroNombre: 'Isaías',    capitulo: 58, descripcion: 'El ayuno verdadero que agrada a Dios' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 4,  descripcion: 'Las tentaciones de Jesús en el desierto' },
          { libroId: 50, libroNombre: 'San Marcos', capitulo: 9, descripcion: 'La Transfiguración' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 15, descripcion: 'El hijo pródigo — modelo de conversión' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 5,  descripcion: 'Las Bienaventuranzas' },
        ],
      },
      {
        id: 'pentecostes',
        titulo: 'Pentecostés y la Iglesia naciente',
        descripcion: 'El nacimiento de la Iglesia y los primeros cristianos',
        emoji: '🔥',
        color: '#ea580c',
        pasajes: [
          { libroId: 53, libroNombre: 'Hechos',   capitulo: 2,  descripcion: 'La venida del Espíritu Santo en Pentecostés' },
          { libroId: 53, libroNombre: 'Hechos',   capitulo: 4,  descripcion: 'La primera comunidad cristiana' },
          { libroId: 53, libroNombre: 'Hechos',   capitulo: 9,  descripcion: 'La conversión de Pablo en el camino a Damasco' },
          { libroId: 53, libroNombre: 'Hechos',   capitulo: 10, descripcion: 'Pedro y Cornelio — la fe abierta a todos' },
          { libroId: 53, libroNombre: 'Hechos',   capitulo: 15, descripcion: 'El Concilio de Jerusalén' },
          { libroId: 54, libroNombre: 'Romanos',  capitulo: 12, descripcion: 'El cuerpo de Cristo — dones y servicio' },
        ],
      },
    ],
  },
  {
    titulo: '🌿  Para la vida',
    rutas: [
      {
        id: 'sacramentos',
        titulo: 'Los 7 Sacramentos en la Biblia',
        descripcion: 'Las raíces bíblicas de los sacramentos de la Iglesia Católica',
        emoji: '⛪',
        color: '#0f766e',
        pasajes: [
          { libroId: 52, libroNombre: 'San Juan',  capitulo: 3,  descripcion: 'Bautismo — "nacer del agua y del Espíritu"' },
          { libroId: 53, libroNombre: 'Hechos',    capitulo: 2,  descripcion: 'Confirmación — el don del Espíritu Santo' },
          { libroId: 51, libroNombre: 'San Lucas',  capitulo: 22, descripcion: 'Eucaristía — la Última Cena' },
          { libroId: 52, libroNombre: 'San Juan',  capitulo: 20, descripcion: 'Reconciliación — "a quienes perdonen los pecados"' },
          { libroId: 68, libroNombre: 'Santiago',  capitulo: 5,  descripcion: 'Unción de enfermos — oración y sanación' },
          { libroId: 49, libroNombre: 'San Mateo', capitulo: 19, descripcion: 'Matrimonio — "lo que Dios unió, que no lo separe el hombre"' },
          { libroId: 50, libroNombre: 'San Marcos', capitulo: 3, descripcion: 'Orden Sacerdotal — Jesús llama y envía a los Doce' },
        ],
      },
      {
        id: 'consejos_jovenes',
        titulo: 'Consejos para los jóvenes',
        descripcion: 'Palabras de Dios para los que están comenzando su camino',
        emoji: '🌱',
        color: '#16a34a',
        pasajes: [
          { libroId: 51, libroNombre: 'San Lucas',     capitulo: 2,  descripcion: 'Jesús joven en el Templo — crecer en sabiduría y gracia' },
          { libroId: 21, libroNombre: 'Eclesiastés',   capitulo: 12, descripcion: '"Acuérdate de tu Creador en los días de tu juventud"' },
          { libroId: 20, libroNombre: 'Proverbios',    capitulo: 4,  descripcion: 'El padre enseña al hijo — busca la sabiduría por encima de todo' },
          { libroId: 63, libroNombre: '1 Timoteo',     capitulo: 4,  descripcion: '"No dejes que nadie te menosprecie por ser joven"' },
          { libroId: 45, libroNombre: 'Eclesiástico',  capitulo: 6,  descripcion: 'La verdadera amistad y el valor de la sabiduría' },
          { libroId: 54, libroNombre: 'Romanos',       capitulo: 12, descripcion: '"No os conforméis a este siglo, sino transformaos"' },
          { libroId: 19, libroNombre: 'Salmos',        capitulo: 25, descripcion: '"A ti, Señor, elevo mi alma" — guía para quien busca el camino' },
        ],
      },
      {
        id: 'promesas',
        titulo: 'Promesas de Dios',
        descripcion: 'Las grandes promesas que Dios cumplió y cumplirá',
        emoji: '🌈',
        color: '#065f46',
        pasajes: [
          { libroId: 1,  libroNombre: 'Génesis',    capitulo: 12, descripcion: 'La promesa a Abraham — padre de todas las naciones' },
          { libroId: 1,  libroNombre: 'Génesis',    capitulo: 15, descripcion: 'La alianza con Abraham sellada por Dios' },
          { libroId: 10, libroNombre: '2 Samuel',   capitulo: 7,  descripcion: 'La promesa a David — un descendiente eterno' },
          { libroId: 24, libroNombre: 'Jeremías',   capitulo: 31, descripcion: 'La nueva alianza escrita en el corazón' },
          { libroId: 52, libroNombre: 'San Juan',   capitulo: 14, descripcion: '"Voy a prepararles un lugar... volveré"' },
          { libroId: 75, libroNombre: 'Apocalipsis', capitulo: 21, descripcion: '"Un cielo nuevo y una tierra nueva... enjugará toda lágrima"' },
        ],
      },
    ],
  },
]

export const RUTAS: Ruta[] = SECCIONES.flatMap(s => s.rutas)

export default function RutasScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>Rutas temáticas</Text>
        <Text style={s.subtitulo}>Recorridos guiados por la Biblia</Text>
      </View>

      <ScrollView contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 20 }]}>
        {SECCIONES.map(seccion => (
          <View key={seccion.titulo}>
            <Text style={s.seccionLabel}>{seccion.titulo}</Text>
            {seccion.rutas.map(ruta => (
              <TouchableOpacity
                key={ruta.id}
                style={[s.rutaCard, { borderLeftColor: ruta.color, borderLeftWidth: 4 }]}
                onPress={() => nav.navigate('RutaDetalle', { ruta })}
                activeOpacity={0.8}
              >
                <Text style={s.rutaEmoji}>{ruta.emoji}</Text>
                <View style={s.rutaInfo}>
                  <Text style={s.rutaTitulo}>{ruta.titulo}</Text>
                  <Text style={s.rutaDesc}>{ruta.descripcion}</Text>
                  <Text style={[s.rutaPasajes, { color: ruta.color }]}>{ruta.pasajes.length} pasajes</Text>
                </View>
                <Text style={s.flecha}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: C.fondo },
  header:       { paddingBottom: 20, paddingHorizontal: 20 },
  backBtn:      { marginBottom: 8 },
  backTxt:      { color: C.acento, fontSize: 16 },
  titulo:       { fontSize: 26, fontWeight: '700', color: C.texto },
  subtitulo:    { color: C.subTexto, fontSize: 14, marginTop: 4 },
  lista:        { paddingHorizontal: 16, paddingTop: 8 },
  seccionLabel: { fontSize: 12, fontWeight: '700', color: C.subTexto, textTransform: 'uppercase', letterSpacing: 1, marginTop: 16, marginBottom: 8 },
  rutaCard:     { backgroundColor: C.card, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1, borderColor: C.borde, marginBottom: 10 },
  rutaEmoji:    { fontSize: 28 },
  rutaInfo:     { flex: 1 },
  rutaTitulo:   { color: C.texto, fontSize: 16, fontWeight: '700' },
  rutaDesc:     { color: C.subTexto, fontSize: 13, marginTop: 3 },
  rutaPasajes:  { fontSize: 12, marginTop: 6, fontWeight: '600' },
  flecha:       { color: C.acento, fontSize: 24 },
})
