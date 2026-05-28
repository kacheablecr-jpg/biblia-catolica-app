import React, { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Speech from 'expo-speech'

const C = {
  fondo:  '#0f172a',
  card:   '#1e293b',
  texto:  '#f1f5f9',
  sub:    '#94a3b8',
  acento: '#c084fc',
  borde:  '#334155',
  bgH:    '#2e1065',
  bgHL:   '#4c1d95',
}

const VEREDICTO_COLORES: Record<string, { bg: string; text: string; borde: string }> = {
  'MITO':           { bg: '#450a0a', text: '#fca5a5', borde: '#7f1d1d' },
  'VERDAD A MEDIAS':{ bg: '#451a03', text: '#fcd34d', borde: '#78350f' },
  'MALENTENDIDO':   { bg: '#0c1a40', text: '#93c5fd', borde: '#1e3a7a' },
}

interface Punto {
  titulo: string
  texto:  string
  cita?:  string
}

interface Mito {
  id:        string
  emoji:     string
  mito:      string
  veredicto: 'MITO' | 'VERDAD A MEDIAS' | 'MALENTENDIDO'
  intro:     string
  puntos:    Punto[]
  conclusion:string
}

const MITOS: Mito[] = [
  {
    id:        '1',
    emoji:     '👿',
    mito:      'El 666 es el número del diablo',
    veredicto: 'MALENTENDIDO',
    intro:
      'Pocas referencias bíblicas generan más miedo popular que el 666. Aparece en películas de terror, tatuajes y supersticiones — pero lo que el texto original dice es completamente diferente a lo que la cultura popular enseña.',
    puntos: [
      {
        titulo: 'Lo que dice la Biblia exactamente',
        texto:
          'Apocalipsis 13:18 dice: "El que tenga entendimiento, calcule el número de la bestia, pues es número de hombre." Nota algo clave: la Biblia dice explícitamente que es número de hombre — no del diablo.',
        cita: '«Aquí hay sabiduría. El que tiene entendimiento, cuente el número de la bestia, pues es número de hombre: su número es seiscientos sesenta y seis.»\n— Apocalipsis 13:18',
      },
      {
        titulo: 'La gematría — el código que lo explica todo',
        texto:
          'En la antigüedad, cada letra tenía un valor numérico (gematría en hebreo, isopsephia en griego). 666 es el valor exacto de "Nerón César" escrito en letras hebreas. Esto lo confirma un detalle contundente: algunos manuscritos antiguos traen 616 en vez de 666 — que es el mismo nombre en su versión latina. Dos ortografías, mismo resultado. No es coincidencia.',
      },
      {
        titulo: 'La bestia = el Imperio Romano / Nerón',
        texto:
          'Apocalipsis fue escrito durante la persecución romana a los cristianos. "La bestia" representa al Imperio Romano y específicamente a Nerón — el primer emperador en perseguir masivamente a los creyentes. Había un mito popular en la época llamado "Nero redivivus": que Nerón resucitaría y volvería a aterrorizar al mundo.',
      },
      {
        titulo: 'El diablo es un personaje diferente en el mismo libro',
        texto:
          'En el Apocalipsis hay tres figuras distintas: el dragón (Satanás), la bestia del mar (el poder político imperial, el 666) y la bestia de la tierra (el sistema religioso que impone el culto al emperador). El número 666 no le pertenece al diablo — le pertenece a un poder humano que se pone en el lugar de Dios.',
      },
    ],
    conclusion:
      'El 666 no es el número del diablo. La Biblia misma dice que es "número de hombre". Los estudiosos lo identifican con Nerón César mediante gematría, confirmado por la variante 616 en manuscritos antiguos. La cultura popular tomó el número, sacó al diablo del mismo libro y los fusionó. Es uno de los malentendidos bíblicos más difundidos del mundo.',
  },
  {
    id:        '2',
    emoji:     '🍎',
    mito:      'La fruta prohibida del Edén era una manzana',
    veredicto: 'MITO',
    intro:
      'Prácticamente toda representación artística del Edén muestra una manzana. Pero la Biblia nunca dice eso. ¿De dónde salió la manzana?',
    puntos: [
      {
        titulo: 'Lo que dice el texto',
        texto:
          'Génesis 3 habla únicamente de "el fruto del árbol". No hay manzana, naranja, higo ni ninguna fruta específica mencionada. El texto hebreo usa "peri" — fruto genérico.',
        cita: '«Vio la mujer que el árbol era bueno para comer, y que era agradable a los ojos, y árbol codiciable para alcanzar la sabiduría; y tomó de su fruto, y comió.»\n— Génesis 3:6',
      },
      {
        titulo: 'El origen: un juego de palabras en latín',
        texto:
          'La Biblia fue traducida al latín (la Vulgata) alrededor del año 400 d.C. En latín, "malum" significa dos cosas a la vez: manzana y mal. Ese juego de palabras — comer el "malum" (la manzana / el mal) — fue demasiado tentador para los predicadores medievales. La palabra se volvió imagen.',
      },
      {
        titulo: 'Miguel Ángel lo hizo permanente',
        texto:
          'Los artistas del Renacimiento, especialmente Miguel Ángel en la Capilla Sixtina, pintaron la escena con una manzana. Esas imágenes se grabaron en la memoria colectiva de la humanidad. No como teología — como arte. Pero el arte terminó enseñando más que los textos.',
      },
      {
        titulo: 'Algunos dicen que era un higo',
        texto:
          'Curiosamente, el primer objeto que Adán y Eva usaron después de comer el fruto fueron hojas de higuera para cubrirse. Algunos teólogos especulan que el árbol era una higuera. Pero es solo especulación — la Biblia no lo dice.',
        cita: '«Entonces fueron abiertos los ojos de ambos, y conocieron que estaban desnudos; entonces cosieron hojas de higuera, y se hicieron delantales.»\n— Génesis 3:7',
      },
    ],
    conclusion:
      'La manzana del Edén es un mito nacido de un juego de palabras en latín y consolidado por el arte renacentista. La Biblia solo dice "fruto". No hay ninguna fruta específica mencionada en el texto original hebreo. Es quizás el detalle más famoso de la Biblia que la Biblia misma no dice.',
  },
  {
    id:        '3',
    emoji:     '💪',
    mito:      '"Dios no te da más de lo que puedes soportar"',
    veredicto: 'MITO',
    intro:
      'Es una de las frases más repetidas para consolar a alguien que sufre. El problema es que no está en la Biblia — y el versículo que la gente cita dice algo completamente diferente.',
    puntos: [
      {
        titulo: 'El versículo que realmente existe',
        texto:
          'La frase viene de 1 Corintios 10:13. Pero el contexto es la tentación al pecado, no el sufrimiento general de la vida. Pablo dice que Dios no permitirá que seas tentado más allá de lo que puedes resistir, y que siempre proveerá una salida.',
        cita: '«No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir, sino que dará también juntamente con la tentación la salida.»\n— 1 Corintios 10:13',
      },
      {
        titulo: 'La diferencia que lo cambia todo',
        texto:
          'Hay una diferencia enorme entre tentación y sufrimiento. El texto habla de no ceder al pecado — tiene una salida. Pero aplicarlo al dolor, la enfermedad, la pérdida de un hijo o la depresión severa es forzar el texto. La Biblia está llena de personas que se sintieron completamente desbordadas: Job, Elías, Jeremías, el mismo Jesús en Getsemaní.',
        cita: '«Mi alma está muy triste, hasta la muerte.»\n— Mateo 26:38',
      },
      {
        titulo: 'Lo que la Biblia sí dice sobre el sufrimiento',
        texto:
          'En vez de prometer que Dios calibra el dolor a tu capacidad, la Biblia dice algo más honesto y más poderoso: que Dios acompaña en el sufrimiento aunque sea insoportable. "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo."',
        cita: '«Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.»\n— Salmo 23:4',
      },
    ],
    conclusion:
      '"Dios no te da más de lo que puedes cargar" no está en la Biblia. El versículo que la gente cita habla de tentación al pecado, no de sufrimiento general. Decírsela a alguien que está al límite puede sonar a acusación — "si no aguantas, es que tienes poca fe". La promesa bíblica real es diferente y más honesta: Dios no te abandona en el dolor aunque sea insoportable.',
  },
  {
    id:        '4',
    emoji:     '☀️',
    mito:      'Lucifer es el nombre del diablo',
    veredicto: 'MALENTENDIDO',
    intro:
      'En películas, libros y sermones se usa "Lucifer" como otro nombre para Satanás. Pero la palabra aparece una sola vez en la Biblia — y estaba dirigida a un rey humano, no al diablo.',
    puntos: [
      {
        titulo: 'El único versículo con la palabra',
        texto:
          'Isaías 14:12 dice "¡Cómo caíste del cielo, Lucifer, hijo de la aurora!" — pero el capítulo entero es un poema de burla dirigido al rey de Babilonia. El contexto lo dice explícitamente en el versículo 4: "pronunciarás este proverbio contra el rey de Babilonia".',
        cita: '«¡Cómo caíste del cielo, oh Lucero, hijo de la aurora! Cortado fuiste por tierra, tú que debilitabas a las naciones.»\n— Isaías 14:12',
      },
      {
        titulo: 'Lucifer no es un nombre — es una descripción',
        texto:
          '"Lucifer" es latín y significa "portador de luz" o "estrella de la mañana" (el planeta Venus al amanecer). En hebreo el texto dice "Helel ben Shachar" — Lucero, hijo del alba. Era una metáfora de la arrogancia del rey de Babilonia que creía brillar sobre todos y cayó.',
      },
      {
        titulo: '¿Cómo se aplicó al diablo?',
        texto:
          'Los Padres de la Iglesia, especialmente Orígenes y Tertuliano (siglos II-III), empezaron a aplicar este texto a la caída de Satanás, interpretándolo como una referencia más amplia al origen del mal. Esa interpretación se volvió dominante en la teología cristiana medieval y llegó hasta hoy.',
      },
      {
        titulo: 'La Biblia sí describe la caída de Satanás — pero sin llamarlo Lucifer',
        texto:
          'Jesús dijo: "Yo veía a Satanás caer del cielo como un rayo." Ezequiel 28 tiene un texto similar al de Isaías que algunos aplican al diablo. Pero en ninguno de esos textos aparece la palabra "Lucifer". El nombre es una importación latina, no un nombre bíblico original.',
        cita: '«Él les dijo: Yo veía a Satanás caer del cielo como un rayo.»\n— Lucas 10:18',
      },
    ],
    conclusion:
      '"Lucifer" aparece una sola vez en la Biblia, en un poema dirigido al rey de Babilonia. Es una palabra latina que significa "estrella de la mañana". Los Padres de la Iglesia la aplicaron al diablo siglos después. No es el nombre de Satanás en la Biblia — es una interpretación teológica tardía que se convirtió en cultura popular.',
  },
  {
    id:        '5',
    emoji:     '👑',
    mito:      'Tres Reyes Magos visitaron a Jesús en el pesebre',
    veredicto: 'VERDAD A MEDIAS',
    intro:
      'La escena del nacimiento de Jesús con tres reyes magos arrodillados en el pesebre es una de las más reconocidas del mundo. Casi todo en esa imagen está mezclado o inventado.',
    puntos: [
      {
        titulo: 'No eran reyes',
        texto:
          'La Biblia los llama "magoi" en griego — astrólogos o sabios de Oriente, estudiosos de las estrellas. En ningún momento los llama reyes. El título de "reyes" fue añadido por la Iglesia medieval, basándose en el Salmo 72:10 ("Los reyes de Tarsis y de las costas le ofrecerán presentes") que se interpretó como profecía.',
        cita: '«Unos magos venidos del oriente se presentaron en Jerusalén preguntando: ¿Dónde está el rey de los judíos que ha nacido?»\n— Mateo 2:1-2',
      },
      {
        titulo: 'No eran tres',
        texto:
          'Mateo no dice cuántos eran. El número tres viene de los tres tipos de regalos: oro, incienso y mirra. La tradición siríaca antigua decía que eran doce. La Iglesia occidental fue adoptando el número tres gradualmente hasta que quedó fijado.',
      },
      {
        titulo: 'No estaban en el pesebre',
        texto:
          'Lucas describe el pesebre con los pastores. Mateo describe a los magos llegando a una "casa" donde encontraron al niño con María. Para ese entonces Jesús probablemente tenía entre uno y dos años — por eso Herodes mandó matar a los niños menores de dos años.',
        cita: '«Al entrar en la casa, vieron al niño con su madre María, y postrándose lo adoraron.»\n— Mateo 2:11',
      },
      {
        titulo: 'Lo que sí es real',
        texto:
          'Sí llegaron sabios del oriente a buscar al rey recién nacido. Sí le dieron regalos de oro, incienso y mirra. Sí Herodes intentó usarlos para encontrar al niño. Esa parte es el texto. Todo lo demás — nombres, número, momento, coronas — es tradición posterior.',
      },
    ],
    conclusion:
      'Los "Reyes Magos" eran astrólogos, no reyes. La Biblia no dice cuántos eran — el número tres viene de los regalos. No estaban en el pesebre la noche del nacimiento sino que llegaron meses o hasta dos años después a una casa. Es quizás el relato navideño más decorado con detalles que el texto bíblico nunca tuvo.',
  },
  {
    id:        '6',
    emoji:     '💰',
    mito:      '"El dinero es el mal" — lo dice la Biblia',
    veredicto: 'MITO',
    intro:
      'Es una de las citas bíblicas más malinterpretadas de la historia. Millones de personas creen que la Biblia condena el dinero. El texto original dice algo muy diferente.',
    puntos: [
      {
        titulo: 'Lo que dice el versículo exacto',
        texto:
          'El texto de 1 Timoteo 6:10 dice: "el amor al dinero es raíz de toda clase de males." No el dinero — el amor al dinero. La diferencia es radical. Uno es un objeto; el otro es una actitud del corazón.',
        cita: '«Porque raíz de todos los males es el amor al dinero, el cual codiciando algunos, se extraviaron de la fe, y fueron traspasados de muchos dolores.»\n— 1 Timoteo 6:10',
      },
      {
        titulo: 'Personajes bíblicos ricos — y bendecidos',
        texto:
          'Abraham era muy rico. Job era el hombre más próspero de su región. Salomón tenía una riqueza sin igual. José de Arimatea, que donó su tumba para Jesús, era un hombre adinerado. La Biblia nunca presenta la riqueza en sí misma como pecado — presenta el corazón que se aferra a ella por encima de Dios.',
        cita: '«Abraham era riquísimo en ganado, en plata y en oro.»\n— Génesis 13:2',
      },
      {
        titulo: 'El rico joven — mal interpretado también',
        texto:
          'Jesús le dijo al joven rico "vende todo y sígueme" — pero no era una regla para todos. Era un diagnóstico personal: ese hombre específico tenía el corazón atado a su riqueza. A Zaqueo, otro rico, Jesús no le pidió que vendiera todo — lo llamó por nombre y fue a cenar a su casa.',
        cita: '«Jesús le dijo: Si quieres ser perfecto, anda, vende lo que tienes y dalo a los pobres, y tendrás tesoro en el cielo.»\n— Mateo 19:21',
      },
      {
        titulo: 'El verdadero problema',
        texto:
          'El problema bíblico no es tener dinero sino lo que el dinero hace con tu corazón. ¿Confías en Dios o en tu cuenta bancaria? ¿El dinero te sirve a ti para hacer el bien, o tú le sirves al dinero? Esa es la pregunta real.',
        cita: '«No podéis servir a Dios y a las riquezas.»\n— Mateo 6:24',
      },
    ],
    conclusion:
      'La Biblia no condena el dinero — condena el amor desordenado al dinero. Hay personajes bíblicos ricos que son presentados positivamente. El texto original de 1 Timoteo 6:10 tiene una palabra que hace toda la diferencia: "el amor al dinero." Quitar esa palabra cambia completamente el mensaje.',
  },
  {
    id:        '7',
    emoji:     '👩',
    mito:      'María Magdalena era prostituta',
    veredicto: 'MITO',
    intro:
      'Por siglos la Iglesia enseñó que María Magdalena era una mujer de vida licenciosa. La propia Iglesia tuvo que corregirlo oficialmente en el siglo XX.',
    puntos: [
      {
        titulo: 'Lo que la Biblia dice sobre ella',
        texto:
          'Los cuatro evangelios mencionan a María Magdalena como una discípula cercana de Jesús de quien había expulsado siete demonios, que estuvo presente en la crucifixión y fue la primera persona en ver a Jesús resucitado. Nada en el texto la describe como prostituta.',
        cita: '«María Magdalena fue y dio las nuevas a los discípulos, diciendo: He visto al Señor.»\n— Juan 20:18',
      },
      {
        titulo: 'El origen del error: el Papa Gregorio I',
        texto:
          'En el año 591 d.C., el Papa Gregorio I predicó un sermón donde fusionó a tres mujeres distintas del Nuevo Testamento: María Magdalena, la mujer pecadora que ungió los pies de Jesús en Lucas 7, y María de Betania. Sin base textual, concluyó que las tres eran la misma persona — y que era una pecadora sexual.',
      },
      {
        titulo: 'La corrección oficial',
        texto:
          'En 1969, la Iglesia Católica revisó su calendario litúrgico y separó oficialmente a las tres mujeres que Gregorio había fusionado. En 2016, el Papa Francisco elevó la festividad de María Magdalena al mismo rango que el de los apóstoles, llamándola "apóstol de los apóstoles". La rehabilitación fue completa.',
      },
      {
        titulo: 'Quién era realmente',
        texto:
          'Era una mujer de Magdala (Galilea), seguidora de Jesús, que lo financiaba junto con otras mujeres, que estuvo al pie de la cruz cuando los apóstoles huyeron, y que fue elegida para ser la primera testigo de la resurrección. En el contexto bíblico, ese rol de testigo primordial era extraordinariamente significativo.',
        cita: '«Le seguían Simón llamado Pedro, y sus hermanos; y muchas mujeres que le habían seguido desde Galilea, ministrándole.»\n— Mateo 27:55',
      },
    ],
    conclusion:
      'María Magdalena nunca fue llamada prostituta en ningún texto bíblico. La confusión fue creada por el Papa Gregorio I en el año 591 al fusionar tres personajes distintos. La Iglesia Católica corrigió el error en 1969 y en 2016 la elevó al rango de "apóstol de los apóstoles". Es uno de los errores más largos y dañinos de la historia de la interpretación bíblica.',
  },
  {
    id:        '8',
    emoji:     '👼',
    mito:      'Los ángeles son seres con alas blancas y aureola dorada',
    veredicto: 'VERDAD A MEDIAS',
    intro:
      'La imagen del ángel rubio con alas blancas y halo dorado es universal. La Biblia describe algo bastante diferente — y en la mayoría de los casos, mucho más humano.',
    puntos: [
      {
        titulo: 'Los ángeles que nadie reconoce',
        texto:
          'La carta a los Hebreos dice algo sorprendente: algunos han hospedado ángeles sin saberlo. Eso implica que se veían como personas comunes. Abraham recibió a tres visitantes que parecían hombres. Lot fue visitado por dos seres que los habitantes de Sodoma quisieron agredir, creyendo que eran personas.',
        cita: '«No os olvidéis de la hospitalidad, porque por ella algunos, sin saberlo, hospedaron ángeles.»\n— Hebreos 13:2',
      },
      {
        titulo: 'Seres con alas — pero no son los ángeles comunes',
        texto:
          'Los seres con alas en la Biblia son los querubines (con cuatro alas y cuatro rostros, Ezequiel 1) y los serafines (con seis alas, Isaías 6). Son seres específicos alrededor del trono de Dios — no el tipo general de ángel mensajero. La Biblia los describe de maneras que no se parecen en nada a los ángeles de las pinturas.',
        cita: '«Cada uno tenía seis alas: con dos cubrían sus rostros, con dos cubrían sus pies, y con dos volaban.»\n— Isaías 6:2',
      },
      {
        titulo: 'La reacción ante los ángeles: terror, no ternura',
        texto:
          'Cada vez que un ángel aparece en la Biblia, la primera reacción humana es el miedo. Por eso siempre comienzan con "No temas." Un ser con halo y alas de paloma raramente aterraría a alguien. La aparición bíblica de ángeles era evidentemente algo muy distinto a un bebé con alas.',
        cita: '«Pero el ángel le dijo: No temas, Zacarías, porque tu oración ha sido escuchada.»\n— Lucas 1:13',
      },
      {
        titulo: 'De dónde vienen las alas y el halo',
        texto:
          'El arte grecorromano representaba a los dioses y mensajeros divinos con alas — Hermes, Eros, Nike. Cuando el cristianismo se extendió por el mundo greco-romano, los artistas usaron ese lenguaje visual. El halo viene del arte imperial romano, donde se usaba para representar la divinidad del emperador. Eran herramientas artísticas, no descripciones teológicas.',
      },
    ],
    conclusion:
      'La Biblia describe dos tipos de seres celestiales muy diferentes: los ángeles mensajeros, que aparecen como hombres normales y causan terror; y los querubines y serafines, que sí tienen alas pero lucen completamente distintos a los ángeles del arte popular. La imagen del ángel rubio con alas y halo es arte greco-romano, no teología bíblica.',
  },
  {
    id:        '9',
    emoji:     '✝️',
    mito:      '"Cristo" es el apellido de Jesús',
    veredicto: 'MITO',
    intro:
      'Millones de personas dicen "Jesucristo" como si fuera nombre y apellido. "Cristo" no es apellido — es un título con un significado teológico enorme.',
    puntos: [
      {
        titulo: 'Lo que significa "Cristo"',
        texto:
          '"Cristo" viene del griego "Christos", que es la traducción exacta del hebreo "Mashiach" — Mesías. Ambas palabras significan "el ungido". En el Antiguo Testamento, se ungía con aceite a los reyes, sacerdotes y profetas como señal de que eran elegidos por Dios para un rol específico.',
        cita: '«Le preguntaron: ¿Eres tú el Cristo, el Hijo de Dios bendito? Jesús dijo: Yo soy.»\n— Marcos 14:61-62',
      },
      {
        titulo: 'Su nombre real',
        texto:
          'Su nombre en hebreo/arameo era "Yeshua" — una forma del nombre "Josué" que significa "Dios salva". Lo llamaban "Yeshua bar Yosef" (Jesús hijo de José) o "Yeshua HaNatzrat" (Jesús el Nazareno). "Jesús" es la transliteración griega de "Yeshua".',
      },
      {
        titulo: 'Por qué importa la diferencia',
        texto:
          'Decir "Jesús es el Cristo" es hacer la declaración central de la fe cristiana: que Jesús de Nazaret es el Mesías prometido en el Antiguo Testamento. No es una descripción de su identidad administrativa — es una proclamación de fe. Pedro lo descubrió por revelación divina, no por deducción.',
        cita: '«Tú eres el Cristo, el Hijo del Dios viviente.»\n— Mateo 16:16',
      },
      {
        titulo: 'Los primeros creyentes lo entendían así',
        texto:
          'El término "cristiano" — los seguidores del Cristo — nació en Antioquía (Hechos 11:26). No significaba "seguidor de alguien llamado Cristo". Significaba "seguidor del Mesías", con toda la carga de cumplimiento de profecías y expectativa mesiánica que eso tenía en el contexto judío.',
        cita: '«Y a los discípulos se les llamó cristianos por primera vez en Antioquía.»\n— Hechos 11:26',
      },
    ],
    conclusion:
      '"Cristo" no es apellido — es el título más importante de la fe cristiana. Significa "el Ungido", en hebreo "Mesías". Su nombre completo era Yeshua (Jesús) de Nazaret, hijo de José. Decir "Jesucristo" es en realidad una declaración de fe: "Jesús es el Mesías prometido." Cada vez que usamos esa expresión, sin saberlo, estamos haciendo la afirmación central del cristianismo.',
  },
  {
    id:        '10',
    emoji:     '🐍',
    mito:      'La serpiente del Edén era el diablo disfrazado',
    veredicto: 'VERDAD A MEDIAS',
    intro:
      'Es una de las conexiones más automáticas en la tradición cristiana: serpiente del Edén = Satanás. Pero el texto original del Génesis no lo dice así, y la conexión fue hecha mucho después.',
    puntos: [
      {
        titulo: 'Lo que dice Génesis exactamente',
        texto:
          'Génesis 3:1 dice simplemente: "La serpiente era más astuta que todos los animales del campo que Dios el Señor había hecho." La describe como un animal, el más inteligente de los animales — no como un ser espiritual ni como el diablo. El texto no hace esa identificación.',
        cita: '«La serpiente era más astuta que todos los animales del campo que Dios el Señor había hecho.»\n— Génesis 3:1',
      },
      {
        titulo: 'La conexión viene del Apocalipsis — escrito siglos después',
        texto:
          'La identificación explícita de la serpiente con Satanás aparece en Apocalipsis 12:9: "la serpiente antigua, que se llama diablo y Satanás". Eso fue escrito aproximadamente 1,000 años después del Génesis. La conexión es teológicamente válida dentro del canon bíblico, pero no estaba en el texto original.',
        cita: '«Y fue lanzado fuera el gran dragón, la serpiente antigua, que se llama diablo y Satanás.»\n— Apocalipsis 12:9',
      },
      {
        titulo: 'La tradición judía antigua no la identificaba así',
        texto:
          'Los escritores judíos antiguos del período intertestamentario (entre el Antiguo y Nuevo Testamento) tenían diferentes interpretaciones de la serpiente. Algunos la veían como un ángel caído, otros como un símbolo de deseo desordenado, otros como literalmente una serpiente especialmente inteligente. La identificación directa con Satanás es principalmente una lectura cristiana.',
      },
      {
        titulo: '¿Quién tentó a Jesús entonces?',
        texto:
          'En los evangelios, el que tienta a Jesús en el desierto es explícitamente el diablo (Mateo 4). Ahí sí hay identidad clara. El Nuevo Testamento presenta a Satanás como un ser real y personal. Lo que no hace el texto del Génesis es llamar "diablo" a la serpiente del jardín.',
        cita: '«Jesús fue llevado por el Espíritu al desierto para ser tentado por el diablo.»\n— Mateo 4:1',
      },
    ],
    conclusion:
      'La identificación de la serpiente del Edén con el diablo es teológicamente aceptable dentro del canon bíblico completo — Apocalipsis la hace explícitamente. Pero el texto original de Génesis no lo dice. La serpiente es descrita como un animal astuto, no como Satanás. La conexión fue construida progresivamente a lo largo de los siglos bíblicos y teológicos.',
  },
  {
    id:        '11',
    emoji:     '✂️',
    mito:      'La fuerza de Sansón estaba en su cabello',
    veredicto: 'VERDAD A MEDIAS',
    intro:
      'Todos conocen la historia: Dalila le cortó el cabello a Sansón y perdió su fuerza sobrenatural. Pero la Biblia explica que el cabello no era la fuente — era el símbolo de algo más profundo.',
    puntos: [
      {
        titulo: 'El voto nazareo — la clave real',
        texto:
          'Sansón era un nazareo de nacimiento — una persona consagrada a Dios desde el vientre materno según el voto de Números 6. Una de las condiciones del voto nazareo era no cortar el cabello. El cabello no guardaba la fuerza como si fuera magia — era el signo visible de un pacto con Dios.',
        cita: '«No pasará navaja sobre su cabeza, porque el niño será nazareo de Dios desde el vientre de su madre.»\n— Jueces 13:5',
      },
      {
        titulo: 'Lo que pasó cuando le cortaron el cabello',
        texto:
          'El texto es muy claro: cuando Dalila le cortó el cabello, "Dios se apartó de él." No fue el cabello en sí lo que perdió — fue la presencia de Dios. Al revelar el secreto de su consagración y permitir que se lo cortaran, rompió su pacto. Dios retiró su presencia y con ella la fuerza.',
        cita: '«Y él le dijo todo su corazón. Entonces ella hizo que un hombre rasurara los siete cabellos de su cabeza... y el Señor se apartó de él.»\n— Jueces 16:17-20',
      },
      {
        titulo: 'Sansón no era un superhéroe físico',
        texto:
          'La fuerza de Sansón nunca fue muscular — era sobrenatural. Él mismo lo reconocía. Por eso cuando el pelo creció de nuevo en la cárcel, la fuerza regresó — no por magia capilar sino porque el tiempo en la oscuridad fue un período de regreso a Dios. El texto muestra que él oró antes de derribar el templo.',
        cita: '«Entonces clamó Sansón a Jehová, y dijo: Señor Dios, acuérdate ahora de mí.»\n— Jueces 16:28',
      },
    ],
    conclusion:
      'La fuerza de Sansón no estaba en el cabello — estaba en el pacto con Dios que el cabello representaba. Cuando reveló el secreto y dejó que lo cortaran, quebró ese pacto y Dios se apartó de él. La historia de Sansón no es sobre superpoderes físicos ni sobre cabello mágico — es sobre las consecuencias de traicionar una consagración y la posibilidad de ser restaurado.',
  },
  {
    id:        '12',
    emoji:     '🤝',
    mito:      '"Ayúdate que Dios te ayudará" es una frase bíblica',
    veredicto: 'MITO',
    intro:
      'Es una de las frases más repetidas en contextos religiosos, especialmente en Latinoamérica. La gente la cita como si fuera un proverbio bíblico. No está en ninguna parte de la Biblia — y la Biblia dice básicamente lo contrario.',
    puntos: [
      {
        titulo: '¿De dónde viene realmente?',
        texto:
          'La frase es atribuida a Benjamín Franklin, quien la publicó en el "Poor Richard\'s Almanack" en 1736: "God helps those who help themselves." También aparece en fábulas atribuidas a Esopo. Es un principio de filosofía práctica occidental — no es teología bíblica.',
      },
      {
        titulo: 'Lo que la Biblia dice — que es casi lo opuesto',
        texto:
          'Jesús dijo: "Separados de mí, nada podéis hacer." No "poco podéis hacer" ni "ayúdense un poco". Nada. El principio bíblico central no es la autosuficiencia complementada por Dios — es la dependencia radical de Dios como fuente de toda capacidad.',
        cita: '«Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto; porque separados de mí nada podéis hacer.»\n— Juan 15:5',
      },
      {
        titulo: 'Los héroes bíblicos — cuando "se ayudaron" salió mal',
        texto:
          'Abraham intentó "ayudar" al plan de Dios tomando a Agar y nació Ismael — el conflicto que dura hasta hoy. Pedro intentó defender a Jesús con una espada en Getsemaní. Moisés "se ayudó" matando al egipcio y tuvo que huir 40 años. El patrón bíblico es que la autosuficiencia religiosa generalmente genera problemas.',
      },
      {
        titulo: 'El principio bíblico real',
        texto:
          'Proverbios 3:5-6 lo dice bien: "Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos y él enderezará tus sendas." El énfasis está en confiar en Dios, no en confiar en ti mismo con Dios como apoyo secundario.',
        cita: '«Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia.»\n— Proverbios 3:5',
      },
    ],
    conclusion:
      '"Ayúdate que Dios te ayudará" es de Benjamín Franklin, no de la Biblia. El principio bíblico central va en dirección opuesta: la dependencia de Dios, no la autosuficiencia. Eso no significa pasividad — significa hacer las cosas en conexión con Dios en vez de hacerlas con Dios como respaldo de último recurso.',
  },
]

function buildTexto(m: Mito): string {
  const partes: string[] = [`Mito: ${m.mito}. Veredicto: ${m.veredicto}. `, m.intro]
  m.puntos.forEach((pt, i) => {
    partes.push(` Punto ${i + 1}: ${pt.titulo}. ${pt.texto}`)
    if (pt.cita) {
      const soloTexto = pt.cita.split('\n')[0].replace(/[«»]/g, '')
      partes.push(` ${soloTexto}`)
    }
  })
  partes.push(` Conclusión: ${m.conclusion}`)
  return partes.join('')
}

export default function MitosScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [abierto, setAbierto] = useState<string | null>(null)
  const [leyendo, setLeyendo] = useState<string | null>(null)

  useEffect(() => () => { Speech.stop() }, [])

  const toggle = (id: string) => {
    if (abierto === id) { Speech.stop(); setLeyendo(null) }
    setAbierto(prev => (prev === id ? null : id))
  }

  const escuchar = (m: Mito) => {
    if (leyendo === m.id) { Speech.stop(); setLeyendo(null); return }
    Speech.stop()
    setLeyendo(m.id)
    Speech.speak(buildTexto(m), {
      language: 'es-ES', rate: 0.9,
      onDone: () => setLeyendo(null),
      onError: () => setLeyendo(null),
    })
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.back} activeOpacity={0.7}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>🔍 Mitos de la Biblia</Text>
        <Text style={s.subtitulo}>Lo que la gente cree que dice la Biblia — y lo que realmente dice</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}>
        {MITOS.map(m => {
          const abierto_ = abierto === m.id
          const vc = VEREDICTO_COLORES[m.veredicto]
          return (
            <View key={m.id} style={s.card}>
              <TouchableOpacity onPress={() => toggle(m.id)} activeOpacity={0.8} style={s.cardHeader}>
                <Text style={s.emoji}>{m.emoji}</Text>
                <View style={{ flex: 1, gap: 6 }}>
                  <View style={[s.veredictoTag, { backgroundColor: vc.bg, borderColor: vc.borde }]}>
                    <Text style={[s.veredictoTxt, { color: vc.text }]}>{m.veredicto}</Text>
                  </View>
                  <Text style={s.mitoTxt}>{m.mito}</Text>
                </View>
                <Text style={[s.chevron, abierto_ && s.chevronAbierto]}>›</Text>
              </TouchableOpacity>

              {abierto_ && (
                <View style={s.respuesta}>
                  <View style={s.separador} />

                  <TouchableOpacity
                    style={[s.audioBtn, leyendo === m.id && s.audioBtnActivo]}
                    onPress={() => escuchar(m)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.audioBtnIcon}>{leyendo === m.id ? '⏹' : '🔊'}</Text>
                    <Text style={[s.audioBtnTxt, leyendo === m.id && s.audioBtnTxtActivo]}>
                      {leyendo === m.id ? 'Detener audio' : 'Escuchar'}
                    </Text>
                  </TouchableOpacity>

                  <Text style={s.introTxt}>{m.intro}</Text>

                  {m.puntos.map((punto, i) => (
                    <View key={i} style={s.punto}>
                      <Text style={s.puntoTitulo}>{i + 1}. {punto.titulo}</Text>
                      <Text style={s.puntoTexto}>{punto.texto}</Text>
                      {punto.cita && (
                        <View style={s.citaBox}>
                          <Text style={s.citaTxt}>{punto.cita}</Text>
                        </View>
                      )}
                    </View>
                  ))}

                  <View style={s.conclusionBox}>
                    <Text style={s.conclusionLabel}>💡 Conclusión</Text>
                    <Text style={s.conclusionTxt}>{m.conclusion}</Text>
                  </View>
                </View>
              )}
            </View>
          )
        })}

        <Text style={s.nota}>Más mitos próximamente ✝</Text>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.fondo },
  header:          { backgroundColor: C.bgH, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  back:            { marginBottom: 12 },
  backTxt:         { color: C.acento, fontSize: 15 },
  titulo:          { color: C.texto, fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitulo:       { color: '#e9d5ff', fontSize: 13, lineHeight: 18 },

  card:            { backgroundColor: C.card, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: C.borde, overflow: 'hidden' },
  cardHeader:      { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  emoji:           { fontSize: 28, marginTop: 2 },
  veredictoTag:    { alignSelf: 'flex-start', borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  veredictoTxt:    { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  mitoTxt:         { color: C.texto, fontSize: 15, fontWeight: '600', lineHeight: 21 },
  chevron:         { color: C.sub, fontSize: 26, marginLeft: 4 },
  chevronAbierto:  { transform: [{ rotate: '90deg' }] },

  respuesta:       { paddingHorizontal: 16, paddingBottom: 16 },
  separador:       { height: 1, backgroundColor: C.borde, marginBottom: 14 },
  audioBtn:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1a0a3a', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 14, borderWidth: 1, borderColor: '#4c1d95' },
  audioBtnActivo:  { backgroundColor: '#1a0a0a', borderColor: '#991b1b' },
  audioBtnIcon:    { fontSize: 16 },
  audioBtnTxt:     { color: C.acento, fontSize: 14, fontWeight: '600' },
  audioBtnTxtActivo: { color: '#f87171' },
  introTxt:        { color: C.sub, fontSize: 14, lineHeight: 21, marginBottom: 16, fontStyle: 'italic' },

  punto:           { marginBottom: 16 },
  puntoTitulo:     { color: C.acento, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  puntoTexto:      { color: C.texto, fontSize: 14, lineHeight: 22 },
  citaBox:         { backgroundColor: '#1c1917', borderLeftWidth: 3, borderLeftColor: C.acento, borderRadius: 8, padding: 12, marginTop: 8 },
  citaTxt:         { color: '#e9d5ff', fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  conclusionBox:   { backgroundColor: '#1a0a3a', borderRadius: 12, padding: 14, marginTop: 4, borderWidth: 1, borderColor: C.bgHL },
  conclusionLabel: { color: C.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  conclusionTxt:   { color: C.texto, fontSize: 14, lineHeight: 21 },

  nota:            { color: C.sub, fontSize: 13, textAlign: 'center', marginTop: 8, marginBottom: 4 },
})
