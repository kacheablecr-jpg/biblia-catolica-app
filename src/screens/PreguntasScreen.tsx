import React, { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Speech from 'expo-speech'

const C = {
  fondo:   '#0f172a',
  card:    '#1e293b',
  texto:   '#f1f5f9',
  sub:     '#94a3b8',
  acento:  '#fbbf24',
  borde:   '#334155',
  bg:      '#451a03',
  bgLight: '#78350f',
}

interface Punto {
  titulo: string
  texto:  string
  cita?:  string
}

interface Pregunta {
  id:        string
  emoji:     string
  categoria: string
  pregunta:  string
  intro:     string
  puntos:    Punto[]
  conclusion:string
  mensaje:   string
}

const PREGUNTAS: Pregunta[] = [
  {
    id:        '1',
    emoji:     '👨‍👩‍👧‍👦',
    categoria: 'Génesis y Creación',
    pregunta:  '¿Cómo somos todos descendientes de Adán y Eva si solo ellos existían?',
    intro:
      'Es una de las preguntas más frecuentes sobre el Génesis. La respuesta está en el mismo texto bíblico, aunque muchos no conocen este detalle clave.',
    puntos: [
      {
        titulo: 'Adán y Eva tuvieron muchos más hijos',
        texto:
          'La mayoría conoce a Caín y Abel, y luego a Set. Pero el Génesis dice claramente que Adán y Eva tuvieron muchos más hijos e hijas a lo largo de sus vidas.',
        cita: '«Después del nacimiento de Set, Adán vivió 800 años más y tuvo otros hijos e hijas.»\n— Génesis 5:4',
      },
      {
        titulo: 'Caín ya temía a otras personas',
        texto:
          'Después de matar a Abel, Caín le dijo a Dios que tenía miedo de que lo mataran. Si solo existían Adán y Eva, ¿a quién le tenía miedo? A sus propios hermanos y sobrinos que ya habían nacido.',
        cita: '«Cualquiera que me encuentre me matará.»\n— Génesis 4:14',
      },
      {
        titulo: 'Caín tomó esposa en la tierra de Nod',
        texto:
          'Cuando Caín fue desterrado y llegó a la tierra de Nod, "conoció a su mujer". Esa mujer no vino de la nada — era una hermana o sobrina suya, hija también de Adán y Eva.',
        cita: '«Caín conoció a su mujer, la cual concibió y dio a luz a Enoc.»\n— Génesis 4:17',
      },
      {
        titulo: '¿Por qué los hermanos se casaron entre sí?',
        texto:
          'En las primeras generaciones fue la única posibilidad para poblar la tierra. Más tarde, en la Ley de Moisés (Levítico 18), Dios prohibió estas uniones — para ese entonces ya había suficiente población y las mutaciones genéticas acumuladas hacían esas uniones peligrosas.',
      },
      {
        titulo: 'El mensaje central del Génesis',
        texto:
          'El libro del Génesis no pretende ser un registro genealógico completo. Su mensaje central es que toda la humanidad tiene un origen común y que todos somos iguales en dignidad ante Dios. Ese es el punto teológico, no el mecanismo biológico.',
      },
    ],
    conclusion:
      'En resumen: Adán y Eva tuvieron decenas de hijos e hijas (Gén 5:4). Las primeras generaciones se emparejaron entre hermanos y primos por necesidad. Con el tiempo la población creció, y Dios luego prohibió esas uniones en la Ley de Moisés. La Biblia no contradice la pregunta — la responde.',
    mensaje:
      'Todos somos hijos del mismo Padre. La Biblia no habla de un origen biológico solamente — habla de dignidad compartida. Detrás de esta pregunta está la verdad más profunda del Génesis: no importa la raza, el origen ni la cultura, todos llevamos la misma imagen de Dios. Somos familia.',
  },
  {
    id:        '2',
    emoji:     '🐋',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿Realmente estuvo Jonás tres días dentro de un pez?',
    intro:
      'El relato de Jonás es uno de los más conocidos y también de los más cuestionados. ¿Qué dice realmente la Biblia y qué nos quiere enseñar?',
    puntos: [
      {
        titulo: 'Lo que dice el texto',
        texto:
          'El libro de Jonás narra que el profeta intentó huir de Dios en barco. Una tormenta sacudió la nave y Jonás fue arrojado al mar. Allí, "el Señor preparó un gran pez" que lo tragó.',
        cita: '«El Señor preparó un gran pez para que se tragara a Jonás, y Jonás estuvo en el vientre del pez tres días y tres noches.»\n— Jonás 1:17',
      },
      {
        titulo: 'Jesús mismo lo tomó como real',
        texto:
          'Lo más significativo es que Jesús citó el signo de Jonás como profecía de su propia resurrección: tres días en el sepulcro, igual que Jonás en el pez. Esto da al relato una importancia teológica enorme.',
        cita: '«Así como Jonás estuvo tres días y tres noches en el vientre del gran pez, así también el Hijo del Hombre estará tres días y tres noches en el corazón de la tierra.»\n— Mateo 12:40',
      },
      {
        titulo: 'El mensaje más allá del pez',
        texto:
          'El libro de Jonás enseña que la misericordia de Dios no tiene límites — ni de raza ni de pueblo. Los ninivitas, enemigos de Israel, se convirtieron y Dios los perdonó. Jonás se enojó con eso, y Dios le preguntó: ¿no debería compadecer a esa gran ciudad? El pez es el vehículo; la misericordia universal es el mensaje.',
        cita: '«¿Y no habré yo de tener lástima de Nínive, aquella gran ciudad donde hay más de ciento veinte mil personas?»\n— Jonás 4:11',
      },
    ],
    conclusion:
      'La fe cristiana ha leído el relato de Jonás tanto como historia real como como signo profético de la resurrección. Jesús lo tomó en serio. Más allá del debate sobre el pez, el mensaje es poderoso: nadie escapa a la misericordia de Dios, y esa misericordia es para todos los pueblos.',
    mensaje:
      'Nadie está tan lejos de Dios que no pueda ser encontrado. Jonás huyó, se hundió en el fondo del mar, y Dios lo buscó allí. Si hoy sientes que estás demasiado lejos, demasiado caído o demasiado perdido — el mismo Dios que preparó un pez para Jonás te está buscando a ti.',
  },
  {
    id:        '3',
    emoji:     '🖊️',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia acerca de los tatuajes?',
    intro:
      'Hay un solo versículo en toda la Biblia que menciona los tatuajes directamente. Pero para entenderlo bien hay que conocer su contexto histórico y qué dice el Nuevo Testamento sobre el tema.',
    puntos: [
      {
        titulo: 'El único versículo directo',
        texto:
          'En todo el texto bíblico solo hay un lugar que prohíbe explícitamente los tatuajes. Está en Levítico, el libro de las leyes que Dios dio al pueblo de Israel.',
        cita: '«No se hagan heridas en el cuerpo por causa de los muertos, ni se hagan tatuajes. Yo soy el Señor.»\n— Levítico 19:28',
      },
      {
        titulo: '¿Por qué esa ley? El contexto lo cambia todo',
        texto:
          'Los pueblos vecinos de Israel (egipcios, cananeos) usaban cortes en la piel y tatuajes como parte de rituales de luto y de adoración a ídolos. Dios le decía a Israel: "No hagan lo que hacen esos pueblos en su religión pagana." La prohibición no era sobre el arte corporal en general, sino sobre imitar prácticas de idolatría.',
      },
      {
        titulo: '¿Esa ley sigue vigente para los cristianos?',
        texto:
          'Levítico 19 también prohíbe mezclar semillas en un mismo campo, cortar el cabello en las sienes y usar ropa de dos telas distintas. Los cristianos no siguen esas leyes ceremoniales porque Jesús vino a cumplir la Ley, no a imponerla como condición de salvación. El Nuevo Testamento enseña que ya no estamos bajo esa tutela.',
        cita: '«Cristo nos redimió de la maldición de la ley.»\n— Gálatas 3:13',
      },
      {
        titulo: 'Lo que sí aplica hoy: tu cuerpo es templo',
        texto:
          'Aunque la ley ceremonial no aplica igual, el Nuevo Testamento sí enseña que el creyente debe honrar a Dios con su cuerpo. Esta es la pregunta relevante hoy: ¿el tatuaje que quiero hacerme glorifica a Dios o lo contradice? ¿Cuál es mi motivo?',
        cita: '«¿O no saben que su cuerpo es templo del Espíritu Santo, que está en ustedes? Por lo tanto, honren a Dios con su cuerpo.»\n— 1 Corintios 6:19-20',
      },
      {
        titulo: '¿Es pecado hacerse un tatuaje?',
        texto:
          'La Biblia no lo condena directamente en el contexto cristiano. La mayoría de teólogos y la Iglesia Católica no prohíben los tatuajes como tal. Lo que sí importa es el contenido (¿qué representa?), el motivo (¿vanidad extrema, presión social, o algo significativo?) y si en tu conciencia lo sientes como algo que honra o deshonra a Dios.',
        cita: '«Todo me es permitido, pero no todo conviene.»\n— 1 Corintios 10:23',
      },
    ],
    conclusion:
      'La Biblia tiene un versículo contra los tatuajes (Lev 19:28), pero estaba dirigido a prácticas de idolatría pagana específicas de esa época. En el Nuevo Testamento no hay prohibición explícita. La pregunta cristiana relevante hoy es: ¿glorifica esto a Dios? El contenido, el motivo y la conciencia son lo que más importa.',
    mensaje:
      'Dios no está mirando tu piel — está mirando tu corazón. La pregunta que la Biblia nos invita a hacernos no es "¿me condena este tatuaje?" sino "¿con qué propósito vivo mi vida?" Tu cuerpo es templo del Espíritu Santo no por lo que tiene en la piel, sino por Aquel que vive adentro.',
  },
  {
    id:        '4',
    emoji:     '🔥',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre la impureza sexual?',
    intro:
      'La Biblia no menciona explícitamente el placer solitario por su nombre, pero sí habla con claridad sobre la pureza del corazón, los deseos y el dominio propio. Aquí está lo que los textos realmente dicen.',
    puntos: [
      {
        titulo: 'El caso de Onán — el versículo más citado',
        texto:
          'En Génesis 38, Onán derramó su semilla en tierra para no dar descendencia a su hermano muerto, según la ley del levirato. Dios lo castigó. Pero el pecado de Onán no fue el acto en sí — fue su desobediencia a la ley de dar descendencia al hermano muerto. Usarlo como condena directa al placer solitario saca el texto de contexto.',
        cita: '«Lo que hizo fue malo ante los ojos del Señor, y también a él le dio muerte.»\n— Génesis 38:10',
      },
      {
        titulo: 'Jesús habló del deseo desordenado',
        texto:
          'Jesús dejó claro que el problema no es solo el acto externo, sino el deseo que lo acompaña. Si el placer solitario va acompañado de fantasías con otras personas, entra en la categoría que Jesús llama lujuria — un deseo que cosifica al otro.',
        cita: '«Pero yo les digo que cualquiera que mira a una mujer con deseo lujurioso ya ha cometido adulterio con ella en su corazón.»\n— Mateo 5:28',
      },
      {
        titulo: 'Pablo y el dominio propio',
        texto:
          'Pablo no menciona el tema directamente, pero sí enseña que el creyente debe controlar su propio cuerpo con santidad y honor, no dejándose llevar por la pasión descontrolada.',
        cita: '«Que cada uno de ustedes sepa controlar su propio cuerpo de una manera santa y honrosa, sin dejarse llevar por los malos deseos.»\n— 1 Tesalonicenses 4:4-5',
      },
      {
        titulo: '¿Es pecado o no?',
        texto:
          'Los teólogos están divididos. Algunos lo consideran moralmente neutro si no va acompañado de lujuria. Otros, como la postura católica tradicional, lo consideran contrario al fin natural de la sexualidad. Lo que sí es claro en la Biblia es que la sexualidad humana tiene un propósito sagrado y que el dominio propio es un fruto del Espíritu.',
        cita: '«El fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, dominio propio.»\n— Gálatas 5:22-23',
      },
      {
        titulo: 'La gracia es más grande',
        texto:
          'La Biblia nunca presenta la pureza como algo que se alcanza por fuerza de voluntad sola. La enseñanza central es que donde hay lucha sincera y humilde, hay gracia. Dios no condena al que lucha — condena al que no quiere luchar.',
        cita: '«Poderoso es Dios para guardaros sin caída.»\n— Judas 1:24',
      },
    ],
    conclusion:
      'La Biblia no condena el placer solitario por su nombre, pero sí establece que la sexualidad humana es sagrada y que el dominio propio es parte de la vida cristiana. Lo más relevante no es el acto aislado sino el estado del corazón: ¿hay lujuria hacia otra persona? ¿Hay esclavitud a un hábito que daña? Ahí es donde la enseñanza bíblica aplica con más fuerza.',
    mensaje:
      'La pureza no es un logro de fuerza de voluntad — es un camino de gracia. La Biblia no llama al creyente a una vida perfecta por esfuerzo propio, sino a una vida de dependencia honesta de Dios. Donde hay lucha sincera y humilde, hay misericordia. Dios no condena al que lucha — acompaña al que no se rinde.',
  },
  {
    id:        '5',
    emoji:     '🚢',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿Noé realmente metió a todos los animales del mundo en un arca?',
    intro:
      'El relato del arca de Noé es uno de los más cuestionados de la Biblia. ¿Cómo caben millones de especies en un barco? La respuesta depende de cómo se lee el texto.',
    puntos: [
      {
        titulo: 'Lo que dice el texto exactamente',
        texto:
          'El Génesis dice que Dios mandó llevar al arca "de todo ser viviente, de toda carne, dos de cada especie". Pero el texto hebreo usa "min", que puede traducirse como "tipo" o "clase", no necesariamente cada especie biológica como la entendemos hoy.',
        cita: '«De todo lo que vive, de toda carne, harás entrar en el arca dos de cada especie.»\n— Génesis 6:19',
      },
      {
        titulo: '¿Flood local o universal?',
        texto:
          'Muchos teólogos y estudiosos bíblicos sostienen que el diluvio fue un evento regional catastrófico en el Cercano Oriente, no literalmente global. En hebreo, "eretz" (traducido como "tierra") puede referirse también a "la región" o "el territorio conocido". Un diluvio que destruyó toda la civilización conocida de Noé concordaría con el texto.',
      },
      {
        titulo: 'El tamaño del arca no era insignificante',
        texto:
          'El arca medía según el texto 300 codos de largo, 50 de ancho y 30 de alto — aproximadamente 135 metros de largo. Investigadores han calculado que podría albergar miles de "tipos" básicos de animales si el relato se lee con "tipos" en vez de "especies biológicas".',
        cita: '«La longitud del arca será de trescientos codos, su anchura de cincuenta codos y su altura de treinta codos.»\n— Génesis 6:15',
      },
      {
        titulo: 'El mensaje que no depende del debate',
        texto:
          'La pregunta literalista a veces oscurece el mensaje central del relato: la obediencia de Noé en medio de un mundo corrompido, la gracia de Dios que preserva la vida, y el arcoíris como señal de alianza eterna. Ese mensaje es poderoso independientemente de cómo se resuelva la logística del arca.',
        cita: '«Estableceré mi pacto con ustedes. Nunca más serán destruidos por las aguas del diluvio.»\n— Génesis 9:11',
      },
    ],
    conclusion:
      'El relato del arca puede leerse literalmente o como un evento regional de gran escala. Lo que sí es claro es que el texto no requiere millones de especies modernas — habla de "tipos" de animales. Pero más allá del debate logístico, el mensaje del diluvio es teológico: Dios juzga la maldad, pero preserva al justo y renueva su alianza con la humanidad.',
    mensaje:
      'Dios siempre preserva. En medio del juicio más devastador, Noé encontró gracia. El arcoíris no es solo un fenómeno atmosférico — es la firma de un Dios que hace pacto con su creación y no la abandona. En los momentos más oscuros de tu vida, esa misma promesa sigue en pie.',
  },
  {
    id:        '6',
    emoji:     '☀️',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿El sol realmente se detuvo en la batalla de Josué?',
    intro:
      'En Josué 10 hay uno de los relatos más asombrosos del Antiguo Testamento: el sol y la luna se detuvieron durante casi un día completo para que Israel ganara la batalla. ¿Qué está diciendo realmente el texto?',
    puntos: [
      {
        titulo: 'Lo que dice el texto',
        texto:
          'Josué oró pidiendo que el sol se detuviera sobre Gabaón y la luna sobre el valle de Ayalón, para que Israel tuviera tiempo de terminar la batalla antes de que cayera la noche.',
        cita: '«Sol, detente sobre Gabaón; y tú, luna, sobre el valle de Ayalón. Y el sol se detuvo y la luna se paró.»\n— Josué 10:12-13',
      },
      {
        titulo: 'El texto cita un poema antiguo',
        texto:
          'El mismo texto bíblico dice que esto está escrito en el "Libro del Justo", una colección poética antigua. Eso sugiere que el autor de Josué estaba citando lenguaje poético o litúrgico, no necesariamente un informe científico de astronomía.',
        cita: '«¿No está escrito esto en el libro del Justo?»\n— Josué 10:13',
      },
      {
        titulo: 'Interpretaciones posibles',
        texto:
          'Algunas interpretaciones: (1) Milagro literal — Dios alteró el movimiento de los cuerpos celestes. (2) Fenómeno atmosférico — una tormenta de granizo (mencionada justo antes) prolongó la oscuridad útil para Israel. (3) Lenguaje poético hiperbólico — como cuando decimos "el tiempo se detuvo" para describir un momento intenso.',
        cita: '«El Señor arrojó desde el cielo grandes piedras de granizo sobre ellos... y murieron más por el granizo que por la espada.»\n— Josué 10:11',
      },
      {
        titulo: 'Lo que no cambia',
        texto:
          'Todas las interpretaciones coinciden en lo central: Dios intervino a favor de Israel en esa batalla de una manera extraordinaria. El "cómo" es lo que se debate; el "quién actuó" es lo que el texto afirma con fuerza.',
      },
    ],
    conclusion:
      'El texto de Josué 10 proviene de un poema antiguo y está enmarcado en un contexto de milagro divino en batalla. Puede leerse como un evento literal, como lenguaje poético de victoria, o como una intervención natural extraordinaria. Lo que el texto quiere afirmar es claro: Dios peleó por Israel ese día.',
    mensaje:
      'Dios pelea por los suyos. No necesitas entender el mecanismo del milagro para confiar en que el Dios que detuvo el tiempo para Josué también puede intervenir en las batallas de tu vida. La pregunta no es "¿cómo lo hizo?" sino "¿sigo creyendo que puede hacerlo?"',
  },
  {
    id:        '7',
    emoji:     '👴',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿Realmente vivió Matusalén 969 años?',
    intro:
      'Las edades de los patriarcas en Génesis 5 son de las más desconcertantes del Antiguo Testamento. Adán vivió 930 años, Noé 950, Matusalén 969. ¿Cómo se explica esto?',
    puntos: [
      {
        titulo: 'Las edades en el texto hebreo',
        texto:
          'En Génesis 5, los patriarcas antediluvianos tienen vidas extraordinariamente largas. Matusalén es el récord con 969 años. Esta lista es muy similar a las listas de reyes sumerios en la antigua Mesopotamia, donde los reyes antes del diluvio también tenían reinados de miles de años.',
        cita: '«Todos los días de Matusalén fueron novecientos sesenta y nueve años, y murió.»\n— Génesis 5:27',
      },
      {
        titulo: 'Teoría 1: Las edades son literales',
        texto:
          'Algunos creen que antes del diluvio las condiciones de la tierra eran distintas (atmósfera, radiación, dieta) y permitían una longevidad extrema. La Biblia no explica el mecanismo — simplemente lo narra como un hecho.',
      },
      {
        titulo: 'Teoría 2: Los números tienen otro significado',
        texto:
          'En las culturas del antiguo Cercano Oriente, los números grandes en genealogías servían para expresar honor, importancia y distancia mítica en el tiempo — no conteos literales de años. Una larga vida era símbolo de bendición divina.',
      },
      {
        titulo: 'Teoría 3: El año era más corto',
        texto:
          'Algunos estudiosos sugieren que lo que se llama "año" en esos textos podría referirse a ciclos lunares más cortos o a unidades de tiempo diferentes. Bajo ese cálculo, las edades serían más parecidas a las actuales.',
      },
      {
        titulo: 'Lo que sí es claro',
        texto:
          'Los textos bíblicos muestran una tendencia clara: las edades van disminuyendo progresivamente después del diluvio. Abraham vivió 175 años, Moisés 120, David 70. El Salmo 90 dice: "Los días de nuestra vida son setenta años." Hay una trayectoria narrativa intencional.',
        cita: '«Los días de nuestra vida son setenta años, u ochenta si hay fortaleza.»\n— Salmo 90:10',
      },
    ],
    conclusion:
      'Las edades de los patriarcas son una de las partes más discutidas del Génesis. Pueden leerse literalmente, como símbolos de honor y antigüedad, o como unidades de tiempo diferentes. No existe consenso definitivo. Lo que sí revela el texto es una teología clara: Dios bendice con larga vida, y esa vida va siendo más limitada conforme la humanidad se aleja del Edén.',
    mensaje:
      'Nuestra vida es breve, y eso no es una maldición — es una invitación. El Salmo 90 dice: "Enséñanos a contar bien nuestros días, para que nuestro corazón adquiera sabiduría." Matusalén vivió 969 años; la pregunta que Dios nos hace no es cuántos años viviste, sino cómo los viviste.',
  },
  {
    id:        '8',
    emoji:     '🧬',
    categoria: 'Fe y ciencia',
    pregunta:  '¿La Biblia contradice la evolución?',
    intro:
      'Esta es una de las tensiones más debatidas entre fe y ciencia. ¿Son incompatibles el relato del Génesis y la teoría evolutiva? Depende de cómo se lea cada uno.',
    puntos: [
      {
        titulo: 'El Génesis no fue escrito como un libro de ciencias',
        texto:
          'Los primeros capítulos del Génesis responden preguntas teológicas: ¿quién creó el mundo? ¿Por qué existe el mal? ¿Cuál es la dignidad del ser humano? No responden preguntas científicas sobre el mecanismo de la creación. Leerlo como un manual de biología es un error de género literario.',
        cita: '«En el principio, Dios creó los cielos y la tierra.»\n— Génesis 1:1',
      },
      {
        titulo: 'La Iglesia Católica y la evolución',
        texto:
          'El Papa Pío XII en 1950 (Encíclica Humani Generis) y Juan Pablo II en 1996 afirmaron que la evolución biológica es compatible con la fe católica, siempre que se reconozca que Dios creó el alma humana de manera especial. La Iglesia no condena la evolución.',
      },
      {
        titulo: 'Creacionismo vs. Evolución teísta',
        texto:
          'El creacionismo literalista sostiene que Génesis 1 describe seis días literales de 24 horas. La evolución teísta sostiene que Dios usó el proceso evolutivo como su método de creación. Millones de cristianos sinceros ocupan ambas posiciones.',
      },
      {
        titulo: 'Lo que la Biblia sí afirma con claridad',
        texto:
          'Independientemente del mecanismo, la Biblia afirma: (1) Dios es el origen de todo. (2) El ser humano tiene una dignidad especial y única. (3) Fuimos creados con propósito, no por accidente. Esas verdades no dependen del debate sobre el proceso.',
        cita: '«Dios creó al ser humano a su imagen, a imagen de Dios lo creó; hombre y mujer los creó.»\n— Génesis 1:27',
      },
    ],
    conclusion:
      'La Biblia y la evolución no son necesariamente contradictorias si se entiende que hablan de cosas diferentes: la Biblia habla del "por qué" y del "quién", la ciencia habla del "cómo". La Iglesia Católica acepta la evolución biológica mientras afirma que Dios es el creador y que el alma humana tiene un origen especial. El conflicto real es entre el ateísmo y la fe, no entre la biología y la Biblia.',
    mensaje:
      'Dios no compite con la ciencia — Él es el autor del universo que la ciencia estudia. La fe no teme las preguntas, las abraza. Si el mecanismo de la creación fue la evolución o algo distinto, lo que nunca cambia es esto: fuiste creado con propósito, por un Dios personal, que te conoce por nombre.',
  },
  {
    id:        '9',
    emoji:     '📅',
    categoria: 'Fe y ciencia',
    pregunta:  '¿En cuántos días creó Dios el mundo realmente?',
    intro:
      'Génesis 1 describe la creación en seis días. Pero ¿son días de 24 horas o algo diferente? Esta pregunta ha dividido a teólogos y creyentes durante siglos.',
    puntos: [
      {
        titulo: 'La palabra hebrea "yom"',
        texto:
          'La palabra hebrea traducida como "día" es "yom". En el Antiguo Testamento, "yom" puede significar: un día de 24 horas, un período indefinido de tiempo ("el día del Señor"), o una era geológica. El contexto determina cuál.',
        cita: '«Llamó Dios a la luz Día, y a las tinieblas llamó Noche.»\n— Génesis 1:5',
      },
      {
        titulo: 'El sol no apareció hasta el cuarto día',
        texto:
          'Un detalle que muchos pasan por alto: el sol y la luna fueron creados en el cuarto día. Pero los primeros tres días ya tenían mañana y tarde. ¿Cómo hay días de 24 horas sin sol? Esto sugiere que "día" en Génesis 1 puede tener un significado diferente al astronómico.',
        cita: '«Y fue la tarde y fue la mañana: día primero.»\n— Génesis 1:5',
      },
      {
        titulo: 'El séptimo día no tiene fin',
        texto:
          'Algo muy revelador: los primeros seis días terminan con "fue la tarde y fue la mañana". El séptimo día, el de descanso de Dios, no tiene esa fórmula de cierre. Muchos teólogos interpretan esto como que el séptimo "día" del descanso de Dios aún continúa — lo que haría cada "día" un período más amplio.',
        cita: '«Bendijo Dios el día séptimo y lo santificó, porque en él reposó de toda su obra.»\n— Génesis 2:3',
      },
      {
        titulo: 'Las principales posiciones',
        texto:
          'Las posiciones más respetadas son: (1) Días literales de 24h — creacionismo joven. (2) Días-era — cada día representa millones de años. (3) Marco literario — los días son una estructura narrativa y pedagógica, no una secuencia temporal exacta. Las tres tienen defensores serios dentro del cristianismo.',
      },
    ],
    conclusion:
      'La Biblia no da una respuesta científica sobre la duración exacta de la creación. El relato del Génesis usa un lenguaje estructurado y poético. Lo que afirma con certeza es que Dios creó todo, que fue bueno, y que el ser humano ocupa un lugar especial en esa creación. El debate sobre los días refleja cuánto más profundo es el texto de lo que parece a primera vista.',
    mensaje:
      'Al final del sexto día, Dios miró todo lo que había creado y dijo que era "muy bueno". Tú eres parte de esa creación. No importa cuántos días tomó — lo que importa es que Dios te miró a ti y dijo que eras bueno. Eso no ha cambiado.',
  },
  {
    id:        '10',
    emoji:     '🧑‍🤝‍🧑',
    categoria: 'Fe y ciencia',
    pregunta:  '¿Existieron Adán y Eva como personas reales?',
    intro:
      'Esta pregunta toca tanto la fe como la genética moderna. ¿Hubo dos personas específicas al inicio de la humanidad, o son personajes simbólicos del Génesis?',
    puntos: [
      {
        titulo: 'La posición tradicional: personas históricas',
        texto:
          'La lectura tradicional cristiana — católica y protestante — sostuvo durante siglos que Adán y Eva fueron personas históricas reales, los primeros padres de la humanidad. Pablo en sus cartas los trata como figuras históricas al compararlos con Cristo.',
        cita: '«Así como en Adán todos mueren, también en Cristo todos serán vivificados.»\n— 1 Corintios 15:22',
      },
      {
        titulo: 'La genética y el "Adán cromosómico"',
        texto:
          'La genética moderna identificó un "Adán cromosómico Y" y una "Eva mitocondrial" — ancestros comunes de todos los humanos vivos. Pero no vivieron al mismo tiempo ni en el mismo lugar. Esto no descarta un origen común, pero complica la lectura de dos personas simultáneas.',
      },
      {
        titulo: 'La posición del poligenismo',
        texto:
          'Algunos teólogos y científicos católicos proponen que "Adán" representa un grupo de homínidos donde Dios infundió el alma de manera especial, no necesariamente una sola pareja. El Papa Pío XII pidió cautela con esta posición pero no la prohibió definitivamente.',
      },
      {
        titulo: 'Lo que la Biblia no puede negociar',
        texto:
          'Independientemente del debate histórico, la teología bíblica insiste en tres puntos irrenunciables: (1) La humanidad tiene un origen unitario — todos somos iguales en dignidad. (2) Hubo una caída real — algo cambió en la relación entre el hombre y Dios. (3) Necesitamos redención — y eso apunta a Cristo.',
        cita: '«Por tanto, así como el pecado entró en el mundo por un hombre...»\n— Romanos 5:12',
      },
    ],
    conclusion:
      'Si Adán y Eva fueron una pareja histórica literal o el nombre colectivo de los primeros humanos en recibir el alma, es algo que el texto bíblico solo no resuelve con certeza. Lo que la fe cristiana no puede abandonar es que el ser humano fue creado a imagen de Dios, que hubo una ruptura real con Él, y que esa ruptura necesitaba ser restaurada por Cristo.',
    mensaje:
      'Llevas en ti la imagen de Dios. Ese es el dato más importante de toda la Biblia sobre el ser humano. No importa cómo llegaste al mundo, dónde creciste ni qué has hecho — la imagen de Dios en ti no puede ser borrada. Y Cristo vino a restaurar lo que el pecado intentó romper.',
  },
  {
    id:        '11',
    emoji:     '🍷',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre el alcohol?',
    intro:
      'La Biblia habla del vino cientos de veces — a veces como bendición, a veces como advertencia. No condena el alcohol en sí, pero sí advierte con claridad sobre sus peligros.',
    puntos: [
      {
        titulo: 'El vino como bendición',
        texto:
          'En la Biblia, el vino es frecuentemente símbolo de alegría, bendición y celebración. Jesús convirtió agua en vino en Caná, y usó el vino en la Última Cena como símbolo de su sangre.',
        cita: '«El vino alegra el corazón del hombre.»\n— Salmo 104:15',
      },
      {
        titulo: 'Jesús bebió vino',
        texto:
          'Jesús mismo bebía vino — sus enemigos lo criticaban por eso. No era jugo de uva fermentado de manera distinta; era vino real. Eso hace imposible sostener que la Biblia prohíbe el alcohol de manera absoluta.',
        cita: '«Vino el Hijo del Hombre, que come y bebe, y dicen: He aquí un hombre comilón y bebedor de vino.»\n— Mateo 11:19',
      },
      {
        titulo: 'La advertencia clara: la embriaguez',
        texto:
          'Lo que la Biblia condena con fuerza no es el alcohol en sí, sino la embriaguez. Perder el control de uno mismo por el vino aparece como señal de necedad, pecado y destrucción en decenas de textos.',
        cita: '«No se emborrachen con vino, que lleva a la depravación. Al contrario, sean llenos del Espíritu.»\n— Efesios 5:18',
      },
      {
        titulo: 'El principio del dominio propio',
        texto:
          'El Nuevo Testamento enseña que el creyente debe tener dominio propio. Si el alcohol lleva a alguien a perder ese control, o si su consumo hace tropezar a un hermano más débil, la sabiduría cristiana dice que es mejor abstenerse.',
        cita: '«Todo me es permitido, pero no todo conviene; todo me es permitido, pero no todo edifica.»\n— 1 Corintios 10:23',
      },
    ],
    conclusion:
      'La Biblia no prohíbe el alcohol — lo condena cuando lleva a la embriaguez y a la pérdida del dominio propio. Jesús mismo bebió vino. El principio bíblico no es la abstinencia total obligatoria, sino la moderación, el dominio propio y la consideración de cómo nuestra conducta afecta a los demás.',
    mensaje:
      'La libertad cristiana no es permiso para todo — es la capacidad de elegir lo que edifica. El dominio propio no es una cadena; es la forma más alta de libertad. Un creyente libre no necesita el vino para alegrarse, porque su alegría viene de una fuente que nunca se agota.',
  },
  {
    id:        '12',
    emoji:     '💍',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Está prohibido el sexo premarital en la Biblia?',
    intro:
      'La Biblia no usa la frase "sexo premarital" directamente, pero sí habla con claridad sobre la fornicación, la porneia y el diseño de Dios para la sexualidad humana.',
    puntos: [
      {
        titulo: 'La palabra griega "porneia"',
        texto:
          'El Nuevo Testamento usa la palabra griega "porneia" para referirse a toda actividad sexual fuera del matrimonio. Aparece decenas de veces. Jesús, Pablo y otros la mencionan como algo que contamina al creyente y debe evitarse.',
        cita: '«Huyan de la inmoralidad sexual (porneia). Todos los demás pecados que una persona comete están fuera del cuerpo, pero el que peca sexualmente peca contra su propio cuerpo.»\n— 1 Corintios 6:18',
      },
      {
        titulo: 'El diseño original: una sola carne',
        texto:
          'Desde el Génesis, Dios diseñó la unión sexual como el sello de un pacto de por vida entre hombre y mujer. La intimidad física en la Biblia no es solo un acto físico — es la consumación de un pacto.',
        cita: '«Por eso el hombre deja a su padre y a su madre y se une a su mujer, y los dos se funden en un solo ser.»\n— Génesis 2:24',
      },
      {
        titulo: 'Pablo: el cuerpo no es para la fornicación',
        texto:
          'Pablo es el más directo: el cuerpo del creyente es templo del Espíritu Santo. Usarlo en relaciones fuera del matrimonio contradice ese propósito sagrado.',
        cita: '«¿No saben que sus cuerpos son miembros de Cristo mismo? ¿Tomaré acaso los miembros de Cristo para unirlos con una prostituta? ¡Jamás!»\n— 1 Corintios 6:15',
      },
      {
        titulo: 'No es solo una regla — es una visión',
        texto:
          'La razón bíblica no es solo "porque Dios lo prohíbe". Es porque Dios diseñó la sexualidad para ser el lenguaje de un amor total, exclusivo y permanente. El sexo fuera del matrimonio trata esa intimidad como algo menos de lo que fue diseñado para ser.',
      },
    ],
    conclusion:
      'La Biblia es clara: la sexualidad fue diseñada para el matrimonio. La "porneia" — toda actividad sexual fuera del matrimonio — es mencionada repetidamente como algo que el creyente debe evitar. No como una regla arbitraria, sino porque el diseño de Dios para la sexualidad humana apunta a algo más profundo: la imagen de un amor de pacto total e incondicional.',
    mensaje:
      'La sexualidad no es un tabú ni un instinto que reprimir — es un don sagrado. Dios la diseñó para ser el lenguaje del amor más total: entrega completa, exclusiva y permanente. Cuando la Biblia protege esa frontera, no está quitándote algo — está cuidando algo precioso que a veces nosotros mismos no sabemos valorar.',
  },
  {
    id:        '13',
    emoji:     '💔',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre el divorcio y volver a casarse?',
    intro:
      'Pocas preguntas tocan tan profundamente la vida real de tantas personas. Jesús habló del divorcio, Pablo también. Sus palabras son exigentes — y también llenas de matices importantes.',
    puntos: [
      {
        titulo: 'Lo que Jesús dijo',
        texto:
          'Jesús dijo que quien se divorcia y se vuelve a casar comete adulterio, excepto en caso de "porneia" (infidelidad). Esta excepción, conocida como la "cláusula de excepción", está en Mateo pero no en Marcos ni Lucas, lo que ha generado debate teológico.',
        cita: '«Todo el que repudie a su mujer, salvo en caso de fornicación, y se case con otra, adultera.»\n— Mateo 19:9',
      },
      {
        titulo: 'El contexto: Jesús elevó el estándar',
        texto:
          'En el tiempo de Jesús, los rabinos debatían si un hombre podía divorciarse de su esposa por cualquier motivo menor. Jesús no estaba creando una nueva ley para todos los casos — estaba elevando el estándar para proteger a la mujer, que en esa cultura quedaba desprotegida tras un divorcio.',
        cita: '«Moisés les permitió divorciarse de sus esposas por la dureza del corazón de ustedes, pero al principio no fue así.»\n— Mateo 19:8',
      },
      {
        titulo: 'Pablo y el abandono',
        texto:
          'Pablo añade otro caso: si el cónyuge no creyente abandona al creyente, este "no está bajo servidumbre" — una frase que muchos teólogos interpretan como libertad para volver a casarse.',
        cita: '«Pero si el no creyente se separa, que se separe. En tales casos el hermano o la hermana no está bajo servidumbre.»\n— 1 Corintios 7:15',
      },
      {
        titulo: 'La gracia es más grande que el fracaso',
        texto:
          'La Biblia también está llena de personas que fracasaron en sus relaciones y fueron restauradas. David, Rahab, la mujer samaritana. La enseñanza bíblica sobre el matrimonio es un ideal elevado — y la gracia de Dios alcanza a los que no pudieron mantenerlo.',
        cita: '«El Señor es compasivo y misericordioso, lento para la ira y lleno de amor.»\n— Salmo 103:8',
      },
    ],
    conclusion:
      'Jesús estableció un estándar alto para el matrimonio: fue diseñado para ser permanente. Pero reconoció la realidad del pecado y del corazón duro. Pablo añadió el caso del abandono. Las iglesias interpretan estos textos de diferente manera. Lo que nunca cambia es que Dios diseñó el matrimonio para reflejar su amor de pacto, y que su gracia alcanza a todos los que han fallado.',
    mensaje:
      'Dios no abandona a los que han fallado en el matrimonio. La Biblia está llena de personas rotas que fueron restauradas. Si has pasado por el dolor de una separación, Dios no te mira con condena — te mira con el mismo amor con que corrió hacia el hijo pródigo. Su gracia es más grande que tu fracaso más grande.',
  },
  {
    id:        '14',
    emoji:     '✝️',
    categoria: 'Jesús',
    pregunta:  '¿Jesús realmente existió históricamente?',
    intro:
      'Aunque es una pregunta que sorprende a muchos creyentes, la existencia histórica de Jesús está entre los hechos mejor documentados de la antigüedad. No solo la Biblia lo confirma.',
    puntos: [
      {
        titulo: 'Fuentes no cristianas del siglo I y II',
        texto:
          'El historiador romano Tácito (año 116 d.C.) menciona a "Cristo" ejecutado por Poncio Pilato. El historiador judío Flavio Josefo (año 93 d.C.) lo menciona dos veces. Plinio el Joven (año 112 d.C.) describe a los primeros cristianos adorando a Cristo como a un dios.',
        cita: '«Cristo, de quien toma su nombre, fue ejecutado durante el reinado de Tiberio por el procurador Poncio Pilato.»\n— Tácito, Anales XV.44',
      },
      {
        titulo: 'El consenso de los historiadores',
        texto:
          'Prácticamente todos los historiadores seculares modernos — creyentes y no creyentes — aceptan que Jesús de Nazaret existió como persona histórica en el siglo I. El debate académico no es "¿existió?" sino "¿quién fue?".',
      },
      {
        titulo: 'Las cartas de Pablo son las más antiguas',
        texto:
          'Las cartas de Pablo (escritas 15-25 años después de la crucifixión) mencionan haber conocido personalmente a Santiago, hermano de Jesús, y a Pedro. No son leyendas tardías — son documentos de primera generación.',
        cita: '«Después subí a Jerusalén para visitar a Pedro, y me quedé con él quince días. No vi a ningún otro de los apóstoles, solo a Santiago, el hermano del Señor.»\n— Gálatas 1:18-19',
      },
      {
        titulo: 'Lo que la historia no puede confirmar',
        texto:
          'La historia puede confirmar que Jesús existió, que fue bautizado por Juan, que reunió discípulos, que fue crucificado bajo Pilato y que sus seguidores creían que había resucitado. Si realmente resucitó es una pregunta de fe, no solo de historia.',
      },
    ],
    conclusion:
      'La existencia histórica de Jesús no es cuestión de debate serio entre los académicos. Fuentes romanas, judías y cristianas del siglo I y II lo confirman. La pregunta que la historia no puede resolver sola es la más importante: quién era realmente y si su resurrección fue real. Esa es la pregunta de fe.',
    mensaje:
      'La pregunta más importante no es "¿existió Jesús?" — esa está resuelta. La pregunta que cambia vidas es: "¿quién es Jesús para mí?" La historia lo confirma como persona real. La fe lo reconoce como Señor y Salvador. Esa segunda respuesta es la que Jesús mismo te pregunta hoy.',
  },
  {
    id:        '15',
    emoji:     '👦',
    categoria: 'Jesús',
    pregunta:  '¿Tuvo Jesús hermanos?',
    intro:
      'Los evangelios mencionan a "los hermanos de Jesús" varias veces. Esto plantea una pregunta importante sobre la virginidad perpetua de María y sobre la familia de Jesús.',
    puntos: [
      {
        titulo: 'Lo que dicen los evangelios',
        texto:
          'Marcos, Mateo y Juan mencionan a "los hermanos" de Jesús. Marcos incluso los nombra: Jacobo, José, Judas y Simón, y habla de "hermanas".',
        cita: '«¿No es este el carpintero, hijo de María, hermano de Jacobo, José, Judas y Simón? ¿No están sus hermanas aquí entre nosotros?»\n— Marcos 6:3',
      },
      {
        titulo: 'Posición católica: primos o medios hermanos',
        texto:
          'La Iglesia Católica sostiene la virginidad perpetua de María. Explica que en el hebreo y arameo de la época, la misma palabra ("ah") se usaba tanto para "hermano" como para "primo" o "pariente cercano". Los "hermanos de Jesús" serían primos o hijos de José de un matrimonio anterior.',
      },
      {
        titulo: 'Posición protestante: hijos de María y José',
        texto:
          'Muchas iglesias protestantes interpretan "hermanos" en sentido literal: hijos biológicos de María y José, nacidos después de Jesús. Citan Mateo 1:25 — "no la conoció hasta que dio a luz a su hijo primogénito" — como implicando que hubo hijos después.',
        cita: '«Pero no la conoció hasta que ella dio a luz a su hijo primogénito.»\n— Mateo 1:25',
      },
      {
        titulo: 'Santiago, el hermano del Señor',
        texto:
          'Lo que sí es claro es que Santiago (Jacobo) era llamado "el hermano del Señor" y se convirtió en líder de la iglesia en Jerusalén. Si era hermano literal o primo, fue una figura clave del cristianismo primitivo.',
        cita: '«¿No es este el hermano del Señor?»\n— Gálatas 1:19',
      },
    ],
    conclusion:
      'Los evangelios mencionan a los "hermanos de Jesús" en varios pasajes. Si eran hermanos biológicos, primos o hijos de un matrimonio previo de José depende de la tradición teológica. La Iglesia Católica y Ortodoxa defienden la virginidad perpetua de María; la mayoría de las iglesias protestantes los consideran hijos de María y José. Ambas posiciones tienen argumentos serios.',
    mensaje:
      'Independientemente de si eran primos o hermanos, Jesús vino a hacer de nosotros su familia. Él mismo dijo: "Mi madre y mis hermanos son los que oyen la Palabra de Dios y la ponen en práctica." La familia más importante no es la biológica — es la que se forma alrededor de Él.',
  },
  {
    id:        '16',
    emoji:     '📖',
    categoria: 'Jesús',
    pregunta:  '¿Por qué hay 4 evangelios y no uno solo?',
    intro:
      'Mateo, Marcos, Lucas y Juan cuentan la historia de Jesús desde perspectivas distintas, con diferencias entre sí. ¿Por qué cuatro versiones? ¿No generan contradicción?',
    puntos: [
      {
        titulo: 'Cuatro retratos de la misma persona',
        texto:
          'Los cuatro evangelios no son cuatro versiones contradictorias — son cuatro retratos complementarios. Mateo escribe para una audiencia judía y enfatiza el cumplimiento de las profecías. Marcos es el más breve y dinámico, escrito para romanos. Lucas es el médico griego que destaca la humanidad de Jesús y su misericordia. Juan es el más teológico y profundo.',
      },
      {
        titulo: '¿Por qué diferencias entre ellos?',
        texto:
          'Las diferencias entre los evangelios (orden de eventos, detalles distintos) se explican por sus audiencias y propósitos diferentes, no por contradicción. Ningún testigo de un evento lo cuenta exactamente igual que otro — eso no significa que mientan, sino que son testigos independientes.',
        cita: '«Muchos han intentado hacer una relación ordenada de las cosas que se han cumplido entre nosotros.»\n— Lucas 1:1',
      },
      {
        titulo: '¿Por qué no uno solo?',
        texto:
          'Un solo evangelio habría dado la impresión de una versión oficial controlada. Cuatro evangelios independientes, con sus diferencias, son en realidad evidencia de autenticidad histórica. En el tribunal, cuatro testigos que coinciden en lo esencial pero difieren en detalles menores son más creíbles que cuatro que repiten exactamente lo mismo.',
      },
      {
        titulo: 'El propósito declarado de Juan',
        texto:
          'El evangelio de Juan declara explícitamente por qué fue escrito. No para ser un registro histórico exhaustivo, sino para generar fe.',
        cita: '«Estas cosas se han escrito para que crean que Jesús es el Cristo, el Hijo de Dios, y para que, creyendo, tengan vida en su nombre.»\n— Juan 20:31',
      },
    ],
    conclusion:
      'Los cuatro evangelios son cuatro perspectivas complementarias sobre Jesús, no cuatro versiones contradictorias. Cada uno fue escrito para una audiencia específica con un énfasis teológico propio. Sus diferencias son evidencia de independencia y autenticidad — cuatro testigos distintos que coinciden en lo esencial: Jesús vivió, murió y resucitó.',
    mensaje:
      'Cuatro personas distintas, cuatro perspectivas diferentes, un solo Señor. Los evangelios nos enseñan que el encuentro con Jesús es personal y único para cada uno. Mateo lo vio de un modo, Juan de otro. ¿Cómo lo has encontrado tú? Esa es la pregunta que los cuatro evangelios te devuelven.',
  },
  {
    id:        '17',
    emoji:     '💀',
    categoria: 'El más allá',
    pregunta:  '¿Qué pasa cuando uno muere según la Biblia?',
    intro:
      'La muerte es la pregunta más universal de la humanidad. La Biblia no da una respuesta en un solo versículo — su enseñanza sobre la muerte y el más allá se desarrolla a lo largo de todo el texto.',
    puntos: [
      {
        titulo: 'El Antiguo Testamento: el Seol',
        texto:
          'En el Antiguo Testamento, los muertos van al "Seol" — un lugar de sombras donde los difuntos existen de manera disminuida. No es el infierno de castigo, sino simplemente el reino de los muertos. La esperanza de resurrección aparece pero de manera gradual.',
        cita: '«¿Acaso en la muerte se te recuerda? ¿Quién te alaba en el Seol?»\n— Salmo 6:5',
      },
      {
        titulo: 'Jesús y el paraíso inmediato',
        texto:
          'Jesús prometió al ladrón crucificado que ese mismo día estaría con él en el paraíso. Esto sugiere una presencia consciente con Dios inmediatamente después de la muerte, antes de la resurrección final.',
        cita: '«De cierto te digo que hoy estarás conmigo en el paraíso.»\n— Lucas 23:43',
      },
      {
        titulo: 'Pablo: estar con Cristo',
        texto:
          'Pablo describe la muerte como partir para estar con Cristo, algo que considera "muchísimo mejor". No describe un sueño o un estado de inconsciencia, sino una comunión con Cristo.',
        cita: '«Para mí el vivir es Cristo y el morir es ganancia... tengo el deseo de partir y estar con Cristo, que es muchísimo mejor.»\n— Filipenses 1:21-23',
      },
      {
        titulo: 'La resurrección final',
        texto:
          'La enseñanza central del Nuevo Testamento no es "el alma va al cielo para siempre" — es la resurrección del cuerpo al final de los tiempos. El cuerpo importa. El destino final del creyente es un cuerpo resucitado en una tierra renovada.',
        cita: '«El Señor mismo descenderá del cielo, y los muertos en Cristo resucitarán primero.»\n— 1 Tesalonicenses 4:16',
      },
    ],
    conclusion:
      'La Biblia enseña que al morir, el creyente entra en una comunión con Cristo (el "paraíso" de Lucas 23, el "estar con Cristo" de Pablo). Esto es el estado intermedio. Al final de los tiempos, habrá una resurrección del cuerpo y un juicio. El destino último del creyente no es un alma flotando en el cielo, sino un cuerpo resucitado en la creación renovada de Dios.',
    mensaje:
      'La muerte para el creyente no es el final — es una puerta. Pablo lo dijo sin rodeos: "Para mí el vivir es Cristo y el morir es ganancia." Si Jesús venció la muerte, entonces la muerte ya no tiene la última palabra sobre ninguno de los que están en Él. No hay nada que temer del otro lado.',
  },
  {
    id:        '18',
    emoji:     '🔥',
    categoria: 'El más allá',
    pregunta:  '¿Existe realmente el infierno?',
    intro:
      'El infierno es uno de los temas más incómodos de la Biblia. Jesús habló de él más que ningún otro autor bíblico. Pero ¿qué dice exactamente y qué tan literal debemos tomarlo?',
    puntos: [
      {
        titulo: 'Jesús habló del infierno más que nadie',
        texto:
          'Lo paradójico es que el maestro del amor y la misericordia es también quien con más frecuencia advierte sobre el juicio eterno. Jesús usó la imagen del "Gehenna" — el basurero de Jerusalén donde el fuego no se apagaba — como metáfora del destino de los que rechazan a Dios.',
        cita: '«No teman a los que matan el cuerpo pero no pueden matar el alma. Teman más bien al que puede destruir alma y cuerpo en el infierno.»\n— Mateo 10:28',
      },
      {
        titulo: '¿Fuego literal o simbólico?',
        texto:
          'Los teólogos debaten si el fuego del infierno es literal o simbólico. Curiosamente, el mismo texto describe el infierno a la vez como "fuego" y como "tinieblas exteriores" — dos imágenes incompatibles si son literales. Muchos concluyen que son metáforas de una realidad terrible que el lenguaje humano no puede describir con exactitud.',
        cita: '«Entonces dirá a los que están a su izquierda: Apártense de mí, malditos, al fuego eterno preparado para el diablo y sus ángeles.»\n— Mateo 25:41',
      },
      {
        titulo: 'Tres posiciones dentro del cristianismo',
        texto:
          'Las posiciones principales son: (1) Infierno eterno consciente — la posición tradicional católica y protestante. (2) Aniquilacionismo — los condenados son destruidos, no torturados eternamente (algunos evangélicos). (3) Universalismo — eventualmente todos serán salvados (minoritario, no es la posición oficial de ninguna iglesia principal).',
      },
      {
        titulo: 'Lo que no se puede ignorar',
        texto:
          'Independientemente de los debates sobre su naturaleza, Jesús habló del juicio eterno como una realidad seria. La separación de Dios — que es la fuente de todo bien, amor y vida — es en sí misma la mayor pérdida imaginable.',
        cita: '«Y estos irán al castigo eterno, pero los justos a la vida eterna.»\n— Mateo 25:46',
      },
    ],
    conclusion:
      'La Biblia — y especialmente Jesús — habla del infierno como una realidad seria. Su naturaleza exacta es debatida: ¿fuego literal o metafórico? ¿Eterno o con final? Lo que ninguna posición cristiana seria puede ignorar es la advertencia de Jesús: hay consecuencias eternas de las decisiones de esta vida, y la separación definitiva de Dios es la mayor tragedia posible.',
    mensaje:
      'El infierno no fue creado para los seres humanos — fue preparado para el diablo y sus ángeles. Dios no quiere que nadie vaya allí, y por eso envió a su propio Hijo. La advertencia de Jesús sobre el juicio no es para asustar — es para despertar. El mismo Jesús que habló del infierno es el que abrió la puerta del cielo.',
  },
  {
    id:        '19',
    emoji:     '🌟',
    categoria: 'El más allá',
    pregunta:  '¿Se puede saber si alguien que murió está en el cielo?',
    intro:
      'Cuando perdemos a un ser querido, la pregunta natural es: ¿dónde está ahora? ¿Está bien? La Biblia da principios claros, aunque no una respuesta definitiva sobre personas específicas.',
    puntos: [
      {
        titulo: 'Solo Dios conoce el corazón',
        texto:
          'La Biblia enseña consistentemente que el juicio final pertenece a Dios, no a los seres humanos. Solo Dios conoce el corazón de cada persona con toda profundidad — incluyendo los últimos momentos de su vida.',
        cita: '«No juzguen, para que no sean juzgados.»\n— Mateo 7:1',
      },
      {
        titulo: 'El ladrón en la cruz: esperanza para los últimos momentos',
        texto:
          'Uno de los textos más consoladores es el del ladrón crucificado junto a Jesús. No había sido bautizado, no tenía obras, no había ido a la iglesia. En sus últimos momentos se dirigió a Jesús con fe — y Jesús le prometió el paraíso. Esto da esperanza sobre lo que puede pasar en los últimos instantes de una vida.',
        cita: '«De cierto te digo que hoy estarás conmigo en el paraíso.»\n— Lucas 23:43',
      },
      {
        titulo: 'La misericordia de Dios es más grande que nuestros juicios',
        texto:
          'La Biblia describe a un Dios que no quiere que nadie perezca, que busca la oveja perdida, que corre hacia el hijo pródigo. Este Dios es perfectamente justo y perfectamente misericordioso al mismo tiempo. No podemos saber exactamente qué pasó en el corazón de alguien antes de morir.',
        cita: '«El Señor no quiere que ninguno perezca, sino que todos procedan al arrepentimiento.»\n— 2 Pedro 3:9',
      },
      {
        titulo: 'La oración por los difuntos',
        texto:
          'La Iglesia Católica y las Iglesias Ortodoxas oran por los difuntos, encomendándolos a la misericordia de Dios. Esta práctica refleja confianza en que Dios puede alcanzar a las personas incluso en el proceso de su muerte y más allá de nuestra comprensión.',
      },
    ],
    conclusion:
      'La Biblia nos prohíbe hacer juicios definitivos sobre el destino eterno de personas específicas — eso pertenece únicamente a Dios. Lo que sí nos revela es un Dios cuya misericordia es más grande de lo que podemos imaginar, que conoce cada corazón con perfecta profundidad, y que no quiere que nadie se pierda. La respuesta correcta ante la muerte de un ser querido es confiar en ese Dios, no intentar usurpar su juicio.',
    mensaje:
      'Encomienda a tus seres queridos que partieron a la misericordia de Dios. Él los conoce mejor de lo que tú los conoces, y los ama más de lo que tú puedes amarlos. La fe no te pide certezas que no tienes — te pide que descanses en Aquel que sí las tiene. Y ese Dios es bueno.',
  },
  {
    id:        '20',
    emoji:     '🙏',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Cómo tener fe y cómo aumentarla?',
    intro:
      'La fe es el corazón de la vida cristiana. Pero muchos creyentes tienen una pregunta sincera: ¿tengo poca fe, cómo la obtengo, cómo la hago crecer? La Biblia tiene respuestas concretas, no solo inspiracionales.',
    puntos: [
      {
        titulo: '¿Qué es la fe según la Biblia?',
        texto:
          'La fe no es un sentimiento de seguridad ni una emoción positiva. La Biblia la define como convicción profunda de realidades que no se ven. Es apostar la vida a que Dios es quien dice ser.',
        cita: '«La fe es la certeza de lo que se espera, la convicción de lo que no se ve.»\n— Hebreos 11:1',
      },
      {
        titulo: 'La fe viene de oír la Palabra',
        texto:
          'La ruta más directa para que la fe crezca es la más simple: escuchar y leer la Biblia. No como ejercicio intelectual, sino como alimento. Cada vez que la Palabra entra, la fe tiene más dónde crecer.',
        cita: '«La fe es por el oír, y el oír, por la palabra de Dios.»\n— Romanos 10:17',
      },
      {
        titulo: 'La fe crece en las dificultades',
        texto:
          'Paradójicamente, las pruebas no destruyen la fe — la fortalecen. La fe que solo funciona cuando todo va bien no es fe todavía. Las dificultades son el entrenamiento que convierte la creencia en convicción.',
        cita: '«Tened por sumo gozo cuando os encontréis en diversas pruebas, sabiendo que la prueba de vuestra fe produce paciencia.»\n— Santiago 1:2-3',
      },
      {
        titulo: 'La oración honesta: "¡Ayuda mi incredulidad!"',
        texto:
          'Un padre desesperado le pidió a Jesús que sanara a su hijo. Jesús le dijo que todo es posible al que cree. El hombre respondió con una de las oraciones más honestas de la Biblia: "Creo, pero ayúdame en mi poca fe." Jesús no lo rechazó — sanó a su hijo.',
        cita: '«Creo; ayuda mi incredulidad.»\n— Marcos 9:24',
      },
      {
        titulo: 'La fe se ejercita con acción',
        texto:
          'La fe no crece solo meditando — crece actuando. Cada vez que obedeces aunque no entiendes, cada vez que confías aunque tienes miedo, cada vez que das aunque te cuesta, la fe se fortalece. La inacción la atrofia.',
        cita: '«La fe sin obras está muerta.»\n— Santiago 2:17',
      },
    ],
    conclusion:
      'La fe no es un sentimiento que llega de repente ni un don que algunos tienen y otros no. Es una convicción que se alimenta con la Palabra, se prueba en las dificultades, se expresa en oración honesta y se fortalece con cada acto de obediencia. No hay atajos — pero sí hay un camino claro.',
    mensaje:
      'No esperes tener más fe para empezar a actuar. Actúa con la fe que tienes y verás cómo crece. El padre del niño enfermo tenía fe mezclada con dudas — y Jesús actuó igual. Lo que Dios pide no es fe perfecta, sino fe honesta.',
  },
  {
    id:        '21',
    emoji:     '⚖️',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Cuál es la diferencia entre pecar a sabiendas y pecar por ignorancia?',
    intro:
      '¿Tiene el mismo peso moral hacer algo malo sabiendo que está mal, que hacerlo sin saber que lo es? La Biblia tiene una respuesta sorprendentemente clara — y más matizada de lo que parece.',
    puntos: [
      {
        titulo: 'El Antiguo Testamento distinguía ambos casos',
        texto:
          'La Ley de Moisés tenía ofrendas distintas para los pecados involuntarios. Para el que pecaba "con soberbia" (a sabiendas), no había expiación disponible en el mismo nivel — era una ofensa directa contra Dios.',
        cita: '«El alma que pecare por ignorancia ofrecerá... para ser perdonada. Mas la persona que hiciera algo con soberbia, al Señor provoca; esa persona será cortada de en medio de su pueblo.»\n— Números 15:27-30',
      },
      {
        titulo: 'Jesús: la responsabilidad es proporcional al conocimiento',
        texto:
          'Jesús enseñó que quien conoce la voluntad de Dios y no la hace recibirá más corrección que quien actuó sin saber. El conocimiento trae responsabilidad. Esto no es injusto — es coherente con cualquier sistema de justicia.',
        cita: '«Aquel siervo que conociendo la voluntad de su señor, no se preparó, ni hizo conforme a su voluntad, recibirá muchos azotes. Mas el que sin conocerla hizo cosas dignas de azotes, recibirá pocos.»\n— Lucas 12:47-48',
      },
      {
        titulo: 'Santiago: saber y no hacer ya es pecado',
        texto:
          'Santiago va más lejos: el que sabe lo que debe hacer y no lo hace, comete pecado de omisión. El conocimiento nos quita la excusa de la ignorancia.',
        cita: '«Al que sabe hacer lo bueno, y no lo hace, le es pecado.»\n— Santiago 4:17',
      },
      {
        titulo: 'La ignorancia invencible vs. la ignorancia culpable',
        texto:
          'La teología moral distingue dos tipos: la ignorancia invencible (genuinamente no podías saber, no tuviste acceso a la información) reduce la culpa moral. La ignorancia culpable (no quisiste saber para no rendir cuentas) no exime — aumenta la responsabilidad.',
      },
      {
        titulo: 'La misericordia de Dios alcanza a ambos',
        texto:
          'Jesús en la cruz oró: "Padre, perdónalos, porque no saben lo que hacen." La ignorancia genuina puede ser objeto de misericordia divina. Pero no es una salida que se pueda fabricar artificialmente.',
        cita: '«Padre, perdónalos, porque no saben lo que hacen.»\n— Lucas 23:34',
      },
    ],
    conclusion:
      'Pecar a sabiendas tiene mayor peso moral que pecar por ignorancia — la Biblia lo enseña con claridad. Pero la ignorancia no elimina automáticamente la responsabilidad: depende de si fue honesta o si fue buscada para no rendir cuentas. El conocimiento de Dios y su voluntad es un don que viene con responsabilidad.',
    mensaje:
      'El conocimiento es responsabilidad. Cuanto más sabes de Dios y de su voluntad, más se te pedirá. Eso no debería asustarte — debería motivarte a actuar con lo que ya sabes hoy, sin esperar saber todo para empezar a obedecer.',
  },
  {
    id:        '22',
    emoji:     '💑',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre la unión libre?',
    intro:
      'En muchos países la mayoría de las parejas conviven antes de casarse o en lugar de casarse. ¿Qué dice la Biblia al respecto? La respuesta va más al fondo de lo que parece.',
    puntos: [
      {
        titulo: 'El diseño original: una sola carne con pacto',
        texto:
          'Desde el Génesis, la Biblia no separa la unión sexual del pacto matrimonial. "Dejará el hombre a su padre y a su madre" implica un acto público de compromiso. "Se unirá a su mujer" implica fidelidad. "Serán una sola carne" implica intimidad total. Los tres elementos van juntos.',
        cita: '«Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.»\n— Génesis 2:24',
      },
      {
        titulo: 'Hebreos 13:4 — el lecho matrimonial',
        texto:
          'El Nuevo Testamento es directo: el matrimonio es honorable y el lecho sin mancha — pero a quienes no están en ese marco les espera el juicio de Dios. La distinción bíblica no es entre parejas estables e inestables, sino entre matrimonio y todo lo demás.',
        cita: '«Honroso sea en todos el matrimonio, y el lecho sin mancilla; pero a los fornicarios y a los adúlteros los juzgará Dios.»\n— Hebreos 13:4',
      },
      {
        titulo: 'La palabra "porneia"',
        texto:
          'El Nuevo Testamento usa el término griego "porneia" para referirse a toda actividad sexual fuera del matrimonio — incluyendo la convivencia sin compromiso formal. Aparece en los evangelios, en Pablo y en el Apocalipsis como algo que el creyente debe evitar.',
        cita: '«Huyan de la inmoralidad sexual (porneia). Todos los demás pecados que una persona comete están fuera del cuerpo, pero el que peca sexualmente peca contra su propio cuerpo.»\n— 1 Corintios 6:18',
      },
      {
        titulo: 'La mujer samaritana — verdad y gracia',
        texto:
          'Jesús habló con una mujer que había tenido cinco maridos y vivía con alguien sin casarse. No la condenó — la trató con plena dignidad. Pero sí nombró la realidad tal como era. Le ofreció agua de vida. Verdad y gracia juntas: eso es el estilo de Jesús.',
        cita: '«Bien has dicho: No tengo marido; porque cinco maridos has tenido, y el que ahora tienes no es tu marido.»\n— Juan 4:17-18',
      },
    ],
    conclusion:
      'La Biblia es clara: el diseño de Dios para la unión sexual es el matrimonio — un pacto público, exclusivo y permanente. La unión libre no cumple ese estándar según la enseñanza bíblica. El tono, sin embargo, no es de condena sino de invitación: a un amor más profundo, más comprometido y más parecido al amor de Dios.',
    mensaje:
      'Dios no inventó el matrimonio para complicarte la vida — lo inventó porque sabe que el amor verdadero pide entrega total. El compromiso no limita el amor, lo libera. Cuando dices "para siempre", estás imitando la forma en que Dios te ama a ti.',
  },
  {
    id:        '23',
    emoji:     '🌍',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre las demás religiones?',
    intro:
      '¿Reconoce la Biblia otras religiones? ¿Pueden ser válidas? ¿Puede alguien salvarse fuera del cristianismo? Estas preguntas tocan uno de los debates más profundos de la fe y merecen una respuesta honesta.',
    puntos: [
      {
        titulo: 'Jesús: "Yo soy el camino"',
        texto:
          'Esta es la declaración más exclusiva de Jesús. No dice que sea uno de varios caminos posibles. Dice que nadie llega al Padre sino por Él. Esta exclusividad es parte central del mensaje cristiano — no se puede suavizar sin cambiar lo que Jesús dijo.',
        cita: '«Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.»\n— Juan 14:6',
      },
      {
        titulo: 'Hechos 4:12 — un solo nombre',
        texto:
          'Pedro ante el Sanedrín fue igualmente directo: no hay otro nombre en el cielo ni en la tierra por el cual los seres humanos puedan ser salvos. El apóstol no estaba siendo arrogante — estaba siendo fiel a lo que había visto y vivido.',
        cita: '«Y en ningún otro hay salvación; porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos.»\n— Hechos 4:12',
      },
      {
        titulo: 'Pablo en Atenas — Dios y los que buscan',
        texto:
          'En Hechos 17, Pablo no condena a los griegos por adorar dioses distintos. Empieza reconociendo su búsqueda: "Al Dios no conocido que adoráis, yo os lo anuncio." Ve en ellos una búsqueda sincera. Dios está cerca de quienes le buscan, aunque aún no lo conozcan por nombre.',
        cita: '«Porque en él vivimos, y nos movemos, y somos; como algunos de vuestros propios poetas también han dicho: Porque linaje suyo somos.»\n— Hechos 17:28',
      },
      {
        titulo: 'Romanos 2 — la ley escrita en el corazón',
        texto:
          'Pablo enseña que personas que nunca oyeron el Evangelio tienen la ley moral escrita en el corazón. Esto abre espacio teológico para pensar en cómo Dios puede alcanzar a quienes genuinamente no tuvieron acceso a Cristo — sin cancelar la exclusividad de la salvación en Él.',
        cita: '«Porque cuando los gentiles que no tienen ley, hacen por naturaleza lo que es de la ley... mostrando la obra de la ley escrita en sus corazones.»\n— Romanos 2:14-15',
      },
    ],
    conclusion:
      'La Biblia afirma que Jesús es el único camino al Padre — eso es central al cristianismo y no puede suavizarse. Pero también muestra un Dios que ve la búsqueda sincera del corazón humano. Los límites exactos de la salvación los pone Dios, no nosotros. Lo que sí es claro es que el cristiano está llamado a compartir esa fe con amor y respeto, no con arrogancia ni desprecio.',
    mensaje:
      'La exclusividad de Cristo no es arrogancia — es el amor de Dios que no quiso dejarnos con un mapa incompleto. Él no dijo "hay muchos caminos y espero que encuentres uno." Dijo "Yo soy el camino" — y vino personalmente a buscarte.',
  },
  {
    id:        '24',
    emoji:     '⛪',
    categoria: 'Jesús',
    pregunta:  '¿Cómo saber que la religión católica es la correcta?',
    intro:
      'En un mundo con miles de denominaciones y religiones, ¿cómo puede alguien saber cuál es la verdadera? Esta pregunta merece una respuesta seria, histórica y bíblica — no solo emocional.',
    puntos: [
      {
        titulo: 'Jesús fundó una Iglesia con liderazgo visible',
        texto:
          'Jesús no solo dejó un libro — fundó una comunidad con estructura de liderazgo visible. Eligió a los doce apóstoles, y a Pedro le dio un papel especial. La Iglesia Católica reclama ser esa comunidad por continuidad directa e ininterrumpida con Pedro.',
        cita: '«Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella.»\n— Mateo 16:18',
      },
      {
        titulo: 'La sucesión apostólica',
        texto:
          'La Iglesia Católica puede trazar una línea ininterrumpida de obispos desde los apóstoles hasta hoy. Ninguna iglesia protestante puede hacerlo — todas tienen una fecha de fundación en los siglos XVI al XX. Lutero en 1517, Calvino en 1536, Wesley en 1738. La continuidad histórica es un argumento poderoso.',
      },
      {
        titulo: 'Juan 6 — la Eucaristía como criterio',
        texto:
          'Jesús dijo "mi carne es verdadera comida y mi sangre es verdadera bebida" en Juan 6. Los primeros cristianos creían en la presencia real de Cristo en la Eucaristía — Ignacio de Antioquía (año 107) y Justino Mártir (año 150) lo confirman. La Iglesia Católica preservó esa fe sin interrupción.',
        cita: '«El que come mi carne y bebe mi sangre, en mí permanece, y yo en él.»\n— Juan 6:56',
      },
      {
        titulo: 'La Biblia existe gracias a la Iglesia Católica',
        texto:
          'El canon bíblico — qué libros están en la Biblia y cuáles no — fue definido por concilios de la Iglesia Católica en los siglos IV y V (Hipona 393, Cartago 397). Quienes usan solo la Biblia para rechazar a la Iglesia Católica están usando un libro que esa misma Iglesia compiló y canonizó.',
      },
      {
        titulo: 'No es solo institución — es encuentro personal',
        texto:
          'Al final, ningún argumento histórico o bíblico puede reemplazar el encuentro personal con Cristo dentro de la Iglesia. La pregunta no es solo "¿cuál es verdadera?" sino "¿dónde encuentro a Dios vivo en mi vida?" La fe nace cuando los argumentos se convierten en experiencia.',
        cita: '«Venid y ved.»\n— Juan 1:39',
      },
    ],
    conclusion:
      'La Iglesia Católica tiene argumentos históricos, bíblicos y teológicos sólidos para su reclamo de continuidad con la Iglesia fundada por Cristo. La sucesión apostólica, la Eucaristía y la canonización de la Biblia son los pilares más fuertes. Pero la fe no se agota en argumentos — culmina en un encuentro personal con Cristo.',
    mensaje:
      'La fe no es el resultado de ganar un debate — es el resultado de encontrarte con Cristo. La Iglesia Católica es la más antigua, la más documentada y la más extendida de la historia. Pero lo más importante no es tener razón sobre la institución — es conocer al Señor que la fundó y que te busca a ti.',
  },
  {
    id:        '25',
    emoji:     '📿',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre repetir oraciones como el rosario?',
    intro:
      'Una crítica frecuente al rosario es que viola Mateo 6:7, donde Jesús habla de no usar vanas repeticiones. Pero leer el texto completo — y ver cómo ora la Biblia misma — cambia completamente la imagen.',
    puntos: [
      {
        titulo: 'El versículo que se cita — en su contexto exacto',
        texto:
          'Mateo 6:7 dice: "No uséis vanas repeticiones, como los gentiles, que piensan que por su mucha palabrería serán oídos." La palabra griega es "battalogeo" — repetir palabras sin sentido, como un mantra mágico para manipular a un dios. El problema no es la repetición — es la vaciedad. "Vana" es la palabra decisiva.',
        cita: '«Y orando, no uséis vanas repeticiones, como los gentiles, que piensan que por su mucha palabrería serán oídos.»\n— Mateo 6:7',
      },
      {
        titulo: 'Jesús mismo repitió sus oraciones',
        texto:
          'En Getsemaní, la noche antes de su muerte, Jesús oró y fue a ver a sus discípulos, volvió a orar, y luego fue otra vez por tercera vez "diciendo las mismas palabras". Si repetir oraciones fuera pecado, Jesús habría pecado en el momento más sagrado de su vida.',
        cita: '«Y dejándolos, se fue de nuevo y oró por tercera vez, diciendo las mismas palabras.»\n— Mateo 26:44',
      },
      {
        titulo: 'Los Salmos están llenos de repetición',
        texto:
          'El Salmo 136 repite la frase "porque para siempre es su misericordia" exactamente 26 veces — una por cada versículo. El Salmo 150 es una letanía repetida de alabanzas. La repetición litúrgica y orante es un patrón profundamente bíblico, no una práctica pagana.',
        cita: '«Alabad al Señor, porque él es bueno; porque para siempre es su misericordia.»\n— Salmo 136:1',
      },
      {
        titulo: 'El Apocalipsis — repetición eterna ante el trono',
        texto:
          'En Apocalipsis 4:8, los cuatro seres vivientes alrededor del trono de Dios "no cesaban de decir día y noche: Santo, santo, santo es el Señor Dios Todopoderoso." La repetición incesante no es vaciedad — en ese contexto es la forma más elevada de adoración.',
        cita: '«Y los cuatro seres vivientes... no cesaban de decir: Santo, santo, santo es el Señor Dios Todopoderoso.»\n— Apocalipsis 4:8',
      },
      {
        titulo: 'El rosario — meditación con texto bíblico',
        texto:
          'El Ave María está tomada directamente de la Biblia: el saludo del ángel (Lucas 1:28) y las palabras de Isabel (Lucas 1:42). El rosario no es adorar a María — es meditar en los misterios de la vida de Cristo mientras se repite una oración bíblica. La repetición es el ritmo que libera la mente para meditar.',
        cita: '«Alégrate, muy favorecida, el Señor es contigo.»\n— Lucas 1:28',
      },
    ],
    conclusion:
      'La Biblia prohíbe las "vanas repeticiones" — palabras vacías sin fe ni sentido. No prohíbe la repetición orante. El mismo Jesús repitió sus oraciones. Los Salmos repiten frases decenas de veces. El Apocalipsis muestra seres celestiales que repiten sin cesar. Lo que importa no es cuántas veces se dice algo, sino si el corazón está presente y la oración tiene contenido real.',
    mensaje:
      'La oración no se mide en palabras originales — se mide en corazón presente. Puedes repetir "te amo" a Dios mil veces y cada vez ser más verdad. La vaciedad no está en la repetición — está en la ausencia de fe. Cuando el corazón está vuelto hacia Dios, incluso la oración más sencilla y repetida es profunda.',
  },
  {
    id:        '26',
    emoji:     '🙌',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Por qué la Iglesia pide dinero en misa y qué dice la Biblia?',
    intro:
      'A muchas personas les incomoda la colecta durante la misa. Algunos la ven como negocio. La Biblia tiene mucho que decir sobre la ofrenda — y casi nada de lo que dice se parece a lo que la cultura popular imagina.',
    puntos: [
      {
        titulo: 'El diezmo en el Antiguo Testamento',
        texto:
          'La práctica de dar a Dios una porción de los ingresos viene del Antiguo Testamento. El diezmo — el 10% — sostenía el Templo, los sacerdotes y a los pobres. No era un impuesto religioso arbitrario — era un acto de adoración que reconocía que todo proviene de Dios.',
        cita: '«Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto.»\n— Malaquías 3:10',
      },
      {
        titulo: '2 Corintios 9 — la actitud que importa',
        texto:
          'El Nuevo Testamento no fija un porcentaje obligatorio. Lo que sí fija es la actitud: dar voluntariamente, con alegría y sin presión. "Dios ama al dador alegre" es el principio central. La ofrenda forzada o resentida pierde su sentido de adoración.',
        cita: '«Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.»\n— 2 Corintios 9:7',
      },
      {
        titulo: 'La ofrenda sostenía a la comunidad',
        texto:
          'En la iglesia primitiva, la práctica era radical: vendían sus propiedades y compartían con todos según la necesidad. La ofrenda sostenía a los pobres, a los ministros que predicaban y al culto. Era economía comunitaria fundada en la generosidad, no recaudación institucional.',
        cita: '«No había entre ellos ningún necesitado... lo ponían a los pies de los apóstoles, y se repartía a cada uno según su necesidad.»\n— Hechos 4:34-35',
      },
      {
        titulo: 'La crítica legítima que la Biblia también hace',
        texto:
          'La Biblia condena enérgicamente el mal uso del dinero sagrado. Malaquías condena a los sacerdotes que se quedaban con lo mejor. Jesús expulsó a los comerciantes del Templo. La crítica al enriquecimiento personal a costa de las ofrendas tiene base bíblica sólida — y la Iglesia debe rendir cuentas de lo que recibe.',
        cita: '«Y les dijo: Escrito está: Mi casa, casa de oración será llamada; mas vosotros la habéis hecho cueva de ladrones.»\n— Mateo 21:13',
      },
      {
        titulo: 'El principio más profundo: todo es de Dios',
        texto:
          'David, al recibir ofrendas para el Templo, oró: "¿Quiénes somos nosotros para poder ofrecer voluntariamente cosas semejantes? Tuyo es todo, y de lo recibido de tu mano te damos." La ofrenda no es darle a Dios algo que le falta — es reconocer que todo lo que tienes viene de Él.',
        cita: '«Tuyo es todo, y de lo recibido de tu mano te damos.»\n— 1 Crónicas 29:14',
      },
    ],
    conclusion:
      'La Biblia sustenta la ofrenda como práctica de adoración, sostenimiento comunitario y reconocimiento de que todo viene de Dios. No como obligación bajo presión, sino como decisión libre y alegre. La crítica válida no es que la Iglesia pida — sino exigir que lo recibido se use para lo que la Biblia manda: sostener el culto, pagar justamente a los ministros y servir a los pobres.',
    mensaje:
      'Cuando das con alegría, no estás perdiendo algo — estás practicando la mayor libertad posible: la libertad de no estar atado a lo material. El dador alegre no es el que tiene más, sino el que confía más. Dar es un acto de fe: creer que Dios proveerá lo que necesitas aunque hayas dado lo que tenías.',
  },
  {
    id:        '27',
    emoji:     '🔗',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Heredamos los pecados de generaciones pasadas?',
    intro:
      'Hay versículos que parecen decir que sí, y versículos que parecen decir que no. La tensión entre Éxodo 20:5 y Ezequiel 18:20 ha desconcertado a lectores durante siglos. La respuesta depende de una distinción crucial que la misma Biblia hace.',
    puntos: [
      {
        titulo: 'El versículo que asusta — Éxodo 20:5',
        texto:
          'Cuando Dios dio los Diez Mandamientos, añadió que visitará la maldad de los padres sobre los hijos hasta la tercera y cuarta generación. Suena a que los hijos pagan por los pecados del padre. Pero el mismo contexto dice "de los que me aborrecen" — es decir, de los que continúan el camino del padre, no de cualquier descendiente.',
        cita: '«...visitando la maldad de los padres sobre los hijos hasta la tercera y cuarta generación de los que me aborrecen.»\n— Éxodo 20:5',
      },
      {
        titulo: 'Ezequiel lo aclara con fuerza',
        texto:
          'Ezequiel 18 es uno de los capítulos más explícitos sobre la responsabilidad moral individual. Dios dice claramente que el hijo no cargará con la iniquidad del padre, ni el padre con la del hijo. Cada persona responde por sus propias acciones.',
        cita: '«El alma que pecare, esa morirá; el hijo no llevará el pecado del padre, ni el padre llevará el pecado del hijo.»\n— Ezequiel 18:20',
      },
      {
        titulo: 'Jesús habló directamente del tema',
        texto:
          'Cuando los discípulos vieron a un ciego de nacimiento le preguntaron: ¿quién pecó, él o sus padres? Jesús rechazó ambas opciones. La condición de ese hombre no era castigo por pecados de generaciones anteriores — era una oportunidad para que se manifestara la obra de Dios.',
        cita: '«No es que pecó éste, ni sus padres, sino para que las obras de Dios se manifiesten en él.»\n— Juan 9:3',
      },
      {
        titulo: 'Lo que sí heredamos — el pecado original',
        texto:
          'La Biblia sí enseña que heredamos algo de Adán: no la culpa de su acto específico, sino una naturaleza humana herida. Somos propensos al error, débiles para el bien, inclinados al mal. Eso no es castigo — es la condición en que nacemos todos, y de la cual Cristo vino a liberarnos.',
        cita: '«Por tanto, así como el pecado entró en el mundo por un hombre... la muerte pasó a todos los hombres, por cuanto todos pecaron.»\n— Romanos 5:12',
      },
      {
        titulo: 'La distinción clave: consecuencias vs. culpa',
        texto:
          'Hay una diferencia importante entre heredar las consecuencias de los pecados de tus padres (patrones de conducta, traumas, vulnerabilidades emocionales) y cargar con la culpa moral de lo que ellos hicieron. Lo primero es real y hay que trabajarlo. Lo segundo no existe — Dios juzga a cada persona por sus propias acciones.',
      },
    ],
    conclusion:
      'La Biblia distingue claramente entre consecuencias heredadas y culpa heredada. Heredamos una naturaleza humana inclinada al mal (pecado original) y podemos cargar con consecuencias de patrones familiares. Pero Dios juzga a cada persona por sus propias obras — no por las de sus padres. Ezequiel 18 y Juan 9 lo dejan sin ambigüedad.',
    mensaje:
      'No cargas el peso de lo que hicieron tus padres o abuelos. Su culpa es de ellos; la tuya es tuya. Pero más importante aún: en Cristo, incluso lo tuyo puede ser limpiado. No hay cadena generacional que la gracia de Dios no pueda romper. Si hay patrones dañinos en tu familia, el ciclo puede terminar contigo.',
  },
  {
    id:        '28',
    emoji:     '📉',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Dice la Biblia que el mundo se iría degradando moralmente?',
    intro:
      'Antes ciertas cosas eran consideradas graves y hoy se normalizan. ¿Hay algo en la Biblia sobre esta progresiva inversión de valores? La respuesta es sí — y es sorprendentemente específica.',
    puntos: [
      {
        titulo: '2 Timoteo 3 — el diagnóstico más detallado',
        texto:
          'Pablo describe los "tiempos peligrosos" de los últimos días con una lista que suena asombrosamente contemporánea: amadores de sí mismos, amadores del dinero, jactanciosos, soberbios, desobedientes a los padres, ingratos, impíos, sin amor natural. Y añade algo clave: tendrán apariencia de piedad, pero negarán la eficacia de ella.',
        cita: '«En los postreros días vendrán tiempos peligrosos. Porque habrá hombres amadores de sí mismos... tendrán apariencia de piedad, pero negarán la eficacia de ella.»\n— 2 Timoteo 3:1-5',
      },
      {
        titulo: 'Romanos 1 — el mecanismo de la degradación',
        texto:
          'Pablo no solo describe el fenómeno, sino el proceso: cuando la humanidad rechazó a Dios y cambió la verdad por la mentira, Dios los entregó a la degradación de sus propios deseos. La degradación moral no es solo un problema cultural — es la consecuencia de alejar a Dios del centro de la vida.',
        cita: '«Y como ellos no aprobaron tener en cuenta a Dios, Dios los entregó a una mente reprobada, para hacer cosas que no convienen.»\n— Romanos 1:28',
      },
      {
        titulo: 'Isaías 5:20 — llamar bien al mal',
        texto:
          'Isaías describe algo que resuena con fuerza hoy: el momento en que una cultura invierte los valores y llama al mal bien y al bien mal. No es solo que el mal existe — es que se celebra y se institucionaliza, y quien señala que es mal queda como el problema.',
        cita: '«¡Ay de los que llaman al mal bien, y al bien mal; que hacen de la luz tinieblas, y de las tinieblas luz!»\n— Isaías 5:20',
      },
      {
        titulo: 'Jesús lo anticipó',
        texto:
          'Jesús mismo dijo que en los últimos tiempos, por el aumento de la maldad, el amor de muchos se enfriaría. No como fatalismo, sino como descripción honesta del mundo sin Dios en el centro. Y a pesar de eso, añadió que el que persevere hasta el fin será salvo.',
        cita: '«Y por haberse multiplicado la maldad, el amor de muchos se enfriará. Mas el que persevere hasta el fin, este será salvo.»\n— Mateo 24:12-13',
      },
      {
        titulo: 'La respuesta: no juzgar, sino ser diferente',
        texto:
          'La Biblia no llama al creyente a indignarse ni a condenar al mundo. Lo llama a ser sal y luz. Sal que no se ha vuelto insípida. Luz que alumbra en la oscuridad. La forma de responder a la degradación moral no es la queja — es la vida distinta.',
        cita: '«Ustedes son la sal de la tierra... Ustedes son la luz del mundo.»\n— Mateo 5:13-14',
      },
    ],
    conclusion:
      'La Biblia sí describe una degradación moral progresiva, especialmente en los textos proféticos y en las cartas de Pablo. No es pesimismo — es diagnóstico. Y el diagnóstico tiene también el remedio: el que permanece en Cristo no es arrastrado por esa corriente. El mundo se puede estar oscureciendo; eso solo hace más necesaria la luz.',
    mensaje:
      'Vivir en un mundo que cambia sus valores no te hace obsoleto — te hace necesario. La sal no se queja del podrido; lo preserva. La luz no lamenta la oscuridad; la ilumina. Si el mundo se degrada moralmente, la pregunta no es "¿qué está pasando?" sino "¿cómo vivo yo diferente?"',
  },
  {
    id:        '29',
    emoji:     '💬',
    categoria: 'Sacramentos',
    pregunta:  '¿Qué dice la Biblia sobre confesarse con un sacerdote?',
    intro:
      'La confesión sacramental es una de las prácticas más incomprendidas del catolicismo. ¿Tiene base bíblica? ¿Puede un sacerdote perdonar pecados? ¿Por qué no confesarse directamente con Dios? Las respuestas dependen de varios textos que vale conocer.',
    puntos: [
      {
        titulo: 'Jesús dio el poder de perdonar a los apóstoles',
        texto:
          'La noche de la resurrección, Jesús se apareció a los apóstoles, sopló sobre ellos y les dijo: "Recibid el Espíritu Santo. A quienes perdonéis los pecados, les serán perdonados." Este texto es la base bíblica directa del sacramento: no es el sacerdote el que perdona por su propia autoridad, sino en nombre de Cristo.',
        cita: '«Recibid el Espíritu Santo. A quienes remitiereis los pecados, les son remitidos; y a quienes se los retuviereis, les son retenidos.»\n— Juan 20:22-23',
      },
      {
        titulo: 'Santiago: "Confesaos unos a otros"',
        texto:
          'Santiago 5:16 habla de confesar los pecados unos a otros en el contexto de oración por la sanación. Es la práctica de confesar ante otro ser humano — no solo internamente ante Dios. Esto muestra que la dimensión comunitaria de la confesión tiene base bíblica.',
        cita: '«Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados.»\n— Santiago 5:16',
      },
      {
        titulo: 'El sacerdocio como instrumento de reconciliación',
        texto:
          'En el Antiguo Testamento, la expiación por los pecados se realizaba mediante sacrificios ante el sacerdote. El Nuevo Testamento afirma que Cristo es el Sumo Sacerdote definitivo, y que los ministros de la Iglesia participan de ese ministerio de reconciliación en su nombre.',
        cita: '«Porque no tenemos un Sumo Sacerdote que no pueda compadecerse de nuestras debilidades.»\n— Hebreos 4:15',
      },
      {
        titulo: 'David se confesó directamente con Dios',
        texto:
          'El Salmo 51 es la confesión directa de David a Dios tras su pecado. No hay sacerdote en ese texto. La confesión personal y directa con Dios es bíblica, poderosa y válida. La Iglesia Católica también la enseña — la confesión sacramental no la reemplaza sino que la complementa con la certeza del perdón declarado.',
        cita: '«Contra ti, contra ti solo he pecado, y he hecho lo malo delante de tus ojos.»\n— Salmo 51:4',
      },
      {
        titulo: 'El valor de escuchar el perdón dicho en voz alta',
        texto:
          'El ser humano no solo necesita saber que Dios perdona — a veces necesita escucharlo dicho con palabras claras. La confesión sacramental no añade nada al perdón de Dios, pero lo hace audible y concreto. "Tus pecados te son perdonados" — Jesús lo dijo en voz alta a las personas que lo necesitaban.',
        cita: '«Entonces Jesús le dijo: Tus pecados te son perdonados.»\n— Lucas 7:48',
      },
    ],
    conclusion:
      'La confesión sacramental tiene base bíblica sólida: Juan 20:22-23 da el poder de perdonar directamente a los apóstoles; Santiago 5:16 habla de confesar ante otros; el sacerdocio del AT prefigura el ministerio cristiano. La confesión directa a Dios (Sal 51) también es bíblica. Las dos coexisten; la sacramental añade la certeza de escuchar el perdón declarado en nombre de Cristo.',
    mensaje:
      'Dios perdonó a David cuando confesó en soledad. Jesús perdonó a la mujer en público. El arrepentimiento sincero nunca queda sin respuesta, sin importar dónde ni cómo se haga. Si dudas sobre la confesión, recuerda: lo que importa no es el método — es el corazón que se vuelve a Dios con verdad.',
  },
  {
    id:        '30',
    emoji:     '🛡️',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre tener armas para defenderse?',
    intro:
      'La Biblia contiene tanto "pon la otra mejilla" como "quien no tenga espada, que compre una". La tensión es real, y resolverla bien depende de entender a quién le habla Jesús en cada texto y qué tipo de situación está describiendo.',
    puntos: [
      {
        titulo: 'Jesús mismo ordenó comprar espadas',
        texto:
          'La noche antes de su arresto, Jesús le dijo a sus discípulos que quien no tuviera espada vendiera su manto y comprara una. Cuando le mostraron dos espadas, dijo "basta". No fue una orden de violencia — fue una provisión para un viaje peligroso. Jesús no era un pacifista absoluto que prohibiera toda defensa.',
        cita: '«El que no tiene espada, venda su capa y compre una.»\n— Lucas 22:36',
      },
      {
        titulo: 'El Antiguo Testamento permite defender el hogar',
        texto:
          'La Ley de Moisés deja claro que quien sorprende a un ladrón forzando su casa de noche y lo hiere, no es culpable de homicidio. La protección del hogar y la familia es reconocida como un derecho en la misma Biblia.',
        cita: '«Si el ladrón fuere hallado forzando una casa... y fuere herido y muriere, el que lo hirió no será culpado de su muerte.»\n— Éxodo 22:2',
      },
      {
        titulo: 'Nehemías — trabajar y estar armado a la vez',
        texto:
          'Cuando los enemigos amenazaron a los que reconstruían el muro de Jerusalén, Nehemías no organizó un ayuno en lugar de una defensa — organizó ambas cosas. Los trabajadores tenían una mano en la herramienta y otra en el arma. Fe y prudencia no se contradicen.',
        cita: '«Cada uno de los que edificaban tenía su espada ceñida a sus lomos mientras edificaba.»\n— Nehemías 4:18',
      },
      {
        titulo: '"Pon la otra mejilla" — ¿qué significa realmente?',
        texto:
          'En el Sermón del Monte, Jesús habla de no devolver mal por mal en el contexto de insultos y afrentas personales — no de defensa ante un ataque mortal. La "mejilla" en la cultura judía era un insulto de honor, no una amenaza de muerte. Jesús enseñaba a no buscar venganza personal, no a dejar que maten a tus hijos.',
        cita: '«Al que te hiera en la mejilla derecha, vuélvele también la otra.»\n— Mateo 5:39',
      },
      {
        titulo: 'La distinción clave: venganza personal vs. protección de inocentes',
        texto:
          'La Biblia y la teología moral distinguen con claridad dos cosas distintas: la venganza personal (prohibida — "no os venguéis vosotros mismos", Ro 12:19) y la legítima defensa de uno mismo y de quienes están bajo tu cuidado (permitida). Un padre que defiende a su familia de un agresor no está desobedeciendo a Jesús.',
        cita: '«No os venguéis vosotros mismos... Mía es la venganza, yo pagaré, dice el Señor.»\n— Romanos 12:19',
      },
    ],
    conclusion:
      'La Biblia no prohíbe la legítima defensa. Distingue entre la venganza personal — que condena — y la protección de la vida inocente — que permite. El Antiguo Testamento lo reconoce explícitamente, Jesús mandó llevar espadas y Nehemías armó a sus trabajadores. Lo que sí condena es buscar hacer daño por rencor, orgullo o venganza.',
    mensaje:
      'Proteger a quien amas no es falta de fe — puede ser un acto de amor. Pero la Biblia también advierte: quien vive por la espada, por la espada morirá. El arma más poderosa que tiene un creyente no es la que carga en la mano, sino la que guarda en el corazón: la confianza en Dios que no paraliza, sino que da sabiduría para actuar.',
  },
  {
    id:        '31',
    emoji:     '🌏',
    categoria: 'Misión y testimonio',
    pregunta:  '¿Quiénes podemos evangelizar y de qué formas?',
    intro:
      'Muchos creen que evangelizar es tarea de sacerdotes, pastores o misioneros. La Biblia dice algo muy diferente: la misión de compartir el Evangelio fue dada a todos los creyentes, sin excepción — y hay más formas de hacerlo de lo que parece.',
    puntos: [
      {
        titulo: 'La Gran Comisión — para todos',
        texto:
          'Las últimas palabras de Jesús registradas en Mateo no fueron para los apóstoles solamente — fueron para todos los que le siguen. "Id y haced discípulos a todas las naciones" es una orden colectiva. No hay creyente exento de la misión.',
        cita: '«Id y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, del Hijo y del Espíritu Santo.»\n— Mateo 28:19',
      },
      {
        titulo: 'El evangelio es para toda criatura',
        texto:
          'Marcos lo dice con la fórmula más universal posible: "toda criatura". No hay grupo humano excluido, no hay país que no cuente, no hay persona demasiado alejada o demasiado perdida para recibir la Buena Nueva. La pregunta no es "¿a quién puedo evangelizar?" sino "¿a quién tengo cerca?"',
        cita: '«Id por todo el mundo y predicad el evangelio a toda criatura.»\n— Marcos 16:15',
      },
      {
        titulo: 'La forma más poderosa: tu propia vida',
        texto:
          'Pedro enseña que los creyentes deben estar siempre listos para dar razón de la esperanza que hay en ellos — con mansedumbre y respeto. El primer paso no es un sermón sino una vida que genere la pregunta. Cuando alguien te ve y quiere saber qué tienes tú que no tiene él, ya empezó la evangelización.',
        cita: '«Estad siempre preparados para presentar defensa... de la esperanza que hay en vosotros, pero hacedlo con gentileza y respeto.»\n— 1 Pedro 3:15',
      },
      {
        titulo: 'Las palabras en el momento justo',
        texto:
          'Pablo instruye a los colosenses a aprovechar cada oportunidad con quienes están fuera de la fe. Las palabras deben ser "con gracia, sazonadas con sal" — no agresivas ni impuestas, sino sabrosas, pertinentes y personales. El evangelio se comparte mejor en conversación que en discurso.',
        cita: '«Que vuestras palabras sean siempre con gracia, sazonadas con sal, para que sepáis cómo debéis responder a cada uno.»\n— Colosenses 4:6',
      },
      {
        titulo: 'Hacerse todo para todos — el método de Pablo',
        texto:
          'Pablo describe su estrategia misionera con una frase que lo dice todo: "Me he hecho todo para todos." Con judíos como judío, con los débiles como débil. Evangelizar no es imponer tu cultura o tu estilo — es hablar el idioma del otro para que pueda escuchar a Dios. Eso lo puede hacer cualquier creyente en su propio entorno.',
        cita: '«Me he hecho todo para todos, para que de todos modos salve a algunos.»\n— 1 Corintios 9:22',
      },
    ],
    conclusion:
      'La evangelización es tarea de todos los bautizados, no solo del clero. Se puede evangelizar con la vida (testimonio), con las palabras (conversación), con el servicio (obras), con la oración (intercesión) y con cualquier medio disponible. El campo es todo el mundo; el método es adaptarse al otro con amor; la fuerza no viene de uno sino del Espíritu Santo.',
    mensaje:
      'No necesitas ordenación ni título para evangelizar — necesitas haber encontrado a Cristo y no poder callarlo. El testimonio más poderoso no es el del que sabe más teología, sino el del que dice con convicción: "Yo estaba perdido, y fui encontrado." Esa historia nadie te la puede quitar, y nadie puede decir que no le aplica.',
  },
  {
    id:        '32',
    emoji:     '✨',
    categoria: 'Dios y la Trinidad',
    pregunta:  '¿Quién es Dios? ¿Cómo se vería, dónde está y cómo actúa?',
    intro:
      'La Biblia habla de Dios desde la primera página hasta la última. No lo describe como una idea abstracta ni como una fuerza impersonal — lo describe como un ser real, presente y activo. Pero también deja en claro que Dios es radicalmente diferente a todo lo que conocemos.',
    puntos: [
      {
        titulo: '¿Cómo es Dios? — Espíritu, no materia',
        texto:
          'Jesús dijo que "Dios es espíritu". No tiene cuerpo físico, no ocupa un lugar en el espacio, no se puede ver con los ojos humanos. Cuando la Biblia describe a Dios con brazos, ojos o manos, usa lenguaje figurado para comunicar su poder y su cuidado — no una descripción literal de su forma.',
        cita: '«Dios es espíritu, y quienes lo adoran deben adorarlo en espíritu y en verdad.»\n— Juan 4:24',
      },
      {
        titulo: '¿Se puede ver a Dios?',
        texto:
          'La Biblia dice que nadie puede ver el rostro de Dios y vivir — su gloria es demasiado para que un ser humano la soporte. Pero varios personajes bíblicos tuvieron visiones de Él: Isaías lo vio en un trono alto y sublime, rodeado de serafines. Daniel lo vio como un "Anciano de Días" con ropas blancas y cabello como lana pura. Estas son visiones adaptadas a la capacidad humana, no la descripción completa de lo que Dios es.',
        cita: '«Vi al Señor sentado en un trono alto y sublime; los pliegues de su manto llenaban el templo.»\n— Isaías 6:1',
      },
      {
        titulo: '¿Dónde está Dios?',
        texto:
          'En todos lados al mismo tiempo. El Salmo 139 es el texto más claro: si subes al cielo, allí está; si desciendes al abismo, allí está; si vuelas al extremo del mar, allí también. No hay lugar donde Dios no esté presente. Y al mismo tiempo, Jeremías dice que Dios llena el cielo y la tierra. No está "en algún lugar" — está en todos.',
        cita: '«¿A dónde podría alejarme de tu Espíritu? ¿A dónde podría huir de tu presencia?»\n— Salmo 139:7',
      },
      {
        titulo: '¿Cómo actúa Dios en el mundo?',
        texto:
          'La Biblia muestra a un Dios que actúa constantemente. Creó el universo (Génesis 1). Liberó a un pueblo esclavo (Éxodo). Habló por los profetas. Se hizo hombre en Jesús. Resucitó a su Hijo. Derrama su Espíritu. Y Pablo dice que Dios trabaja en todas las cosas para el bien de quienes le aman — no es un Dios que creó el mundo y se fue.',
        cita: '«Sabemos que Dios dispone todas las cosas para el bien de quienes lo aman.»\n— Romanos 8:28',
      },
      {
        titulo: '¿Cómo es su carácter?',
        texto:
          'El Salmo 103 da el retrato más completo: compasivo y clemente, lento para la ira, grande en amor. Perdona, sana, rescata, corona de amor y compasión. No trata al ser humano como merecen sus pecados. Su amor es tan alto como el cielo sobre la tierra, y aleja los pecados tan lejos como el oriente del occidente.',
        cita: '«El Señor es clemente y compasivo, lento para la ira y grande en amor.»\n— Salmo 103:8',
      },
    ],
    conclusion:
      'Dios es espíritu — no tiene forma física. No se puede ver directamente, aunque la Biblia recoge visiones que intentan comunicar su gloria. Está en todas partes al mismo tiempo. Y actúa constantemente en la historia, en la naturaleza y en la vida de las personas. No es una fuerza impersonal ni un Dios lejano — es un Dios presente, personal y activo.',
    mensaje:
      'No puedes ver a Dios con los ojos, pero sí puedes conocerlo. Lo conociste cuando alguien te perdonó sin motivo, cuando saliste de algo que te tenía atrapado, cuando sentiste que no estabas solo en la oscuridad. Eso no fue casualidad — fue Dios actuando como siempre ha actuado: en silencio, en lo cotidiano, de manera que solo quien busca puede reconocer.',
  },
  {
    id:        '33',
    emoji:     '✝️',
    categoria: 'Dios y la Trinidad',
    pregunta:  '¿Quién es Jesús según la Biblia?',
    intro:
      'Jesús es el personaje más influyente de la historia humana — pero la Biblia presenta una imagen de Él que va mucho más allá de un buen maestro o un profeta. El Nuevo Testamento hace afirmaciones sobre Jesús que son únicas y que cambian todo.',
    puntos: [
      {
        titulo: 'Es Dios hecho hombre',
        texto:
          'El evangelio de Juan abre con una afirmación que lo dice todo: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." Y luego: "el Verbo se hizo carne y habitó entre nosotros." Jesús no es una criatura que llegó a ser divina — es el Dios eterno que asumió naturaleza humana.',
        cita: '«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios... Y el Verbo se hizo carne y habitó entre nosotros.»\n— Juan 1:1,14',
      },
      {
        titulo: 'Existió antes de nacer en Belén',
        texto:
          'En una discusión con los fariseos, Jesús dijo algo que los dejó sin palabras: "Antes que Abraham fuese, yo soy." Usó el nombre sagrado de Dios — el mismo con el que Dios se identificó ante Moisés. No dijo "yo era", sino "yo soy" — afirmando existencia eterna y naturaleza divina.',
        cita: '«En verdad les digo que antes que Abraham naciera, yo soy.»\n— Juan 8:58',
      },
      {
        titulo: 'Completamente humano al mismo tiempo',
        texto:
          'La Biblia no romantiza la humanidad de Jesús. Tuvo hambre, se cansó, lloró, sintió miedo en Getsemaní, fue tentado en todo como nosotros — pero sin pecar. Hebreos dice que por esto puede compadecerse de nuestra debilidad: no habla de lejos. Vivió lo que vivimos.',
        cita: '«Porque no tenemos un Sumo Sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado.»\n— Hebreos 4:15',
      },
      {
        titulo: 'Su misión: buscar y salvar lo que se había perdido',
        texto:
          'Jesús describió su misión con claridad: vino a buscar y a salvar lo perdido. No llegó para los que ya estaban bien — llegó para los rotos, los excluidos, los que habían fallado. Y el método no fue condenarlos sino acercarse a ellos.',
        cita: '«El Hijo del hombre vino a buscar y a salvar lo que se había perdido.»\n— Lucas 19:10',
      },
      {
        titulo: 'La única salida — y el camino que nadie esperaba',
        texto:
          'Jesús dijo que Él mismo es el camino, la verdad y la vida — no una filosofía ni un sistema religioso. Y el camino fue inesperado: una cruz, una muerte, una resurrección. No salvó al mundo desde el poder sino desde la entrega total. Ese es el Dios que revela la Biblia: uno que salva muriendo.',
        cita: '«Yo soy el camino, la verdad y la vida. Nadie viene al Padre sino por mí.»\n— Juan 14:6',
      },
    ],
    conclusion:
      'Según la Biblia, Jesús es Dios eterno que se hizo hombre sin dejar de ser Dios. Existió antes de la creación, nació de una virgen, vivió completamente humano, murió en la cruz, resucitó al tercer día y volverá. No es solo un modelo moral ni un profeta más — es el centro de toda la historia humana y la respuesta de Dios a la condición humana.',
    mensaje:
      'La pregunta que Jesús hizo a sus discípulos sigue siendo la pregunta más importante: "¿Y vosotros, quién decís que soy yo?" No "¿qué saben los teólogos?" ni "¿qué dice la tradición?" — sino "vos, ¿quién decís que soy?" La respuesta a esa pregunta cambia cómo vivís, cómo morís y qué esperás después.',
  },
  {
    id:        '34',
    emoji:     '🕊️',
    categoria: 'Dios y la Trinidad',
    pregunta:  '¿Quién es el Espíritu Santo según la Biblia?',
    intro:
      'El Espíritu Santo es la persona de la Trinidad que más confusión genera. Algunos lo ven como una fuerza o una energía. La Biblia lo presenta de manera diferente: como una persona divina, igual al Padre y al Hijo, activa en el mundo desde la creación.',
    puntos: [
      {
        titulo: 'Es Dios — no una fuerza impersonal',
        texto:
          'En Hechos 5, Pedro le dice a Ananías que ha mentido al Espíritu Santo y luego añade que ha mentido a Dios. Los dos son lo mismo. El Espíritu Santo tiene atributos que solo Dios tiene: omnipresencia (Salmo 139:7), omnisciencia (1 Corintios 2:10), eternidad (Hebreos 9:14). No es un poder que uno usa — es una persona que actúa.',
        cita: '«¿Por qué llenó Satanás tu corazón para que mintieras al Espíritu Santo?... No has mentido a los hombres, sino a Dios.»\n— Hechos 5:3-4',
      },
      {
        titulo: 'Cómo se manifiesta — distintas formas',
        texto:
          'La Biblia muestra al Espíritu Santo de maneras distintas según el momento. En el bautismo de Jesús, descendió visible como una paloma. En Pentecostés, llegó como viento recio y lenguas de fuego. Jesús dijo que es como el viento: oyes su sonido pero no sabes de dónde viene ni adónde va. No se lo puede controlar ni predecir — actúa donde quiere.',
        cita: '«El viento sopla donde quiere, y oyes su sonido, mas ni sabes de dónde viene, ni a dónde va; así es todo aquel que es nacido del Espíritu.»\n— Juan 3:8',
      },
      {
        titulo: 'Su obra en el creyente',
        texto:
          'El Espíritu Santo hace varias cosas en quien cree: convence de pecado, guía hacia la verdad, intercede por nosotros cuando no sabemos qué pedir, produce frutos de carácter (amor, gozo, paz, paciencia), da dones para servir a la iglesia y da la certeza de que somos hijos de Dios.',
        cita: '«El Espíritu mismo da testimonio a nuestro espíritu de que somos hijos de Dios.»\n— Romanos 8:16',
      },
      {
        titulo: 'El Paráclito — el que camina al lado',
        texto:
          'Jesús llamó al Espíritu Santo "Paráclito" — palabra griega que significa "el que es llamado al lado de uno", un abogado defensor, un consolador. Prometió que el Padre enviaría a otro como Él para estar con los discípulos para siempre. No es un sustituto menor de Jesús — es la presencia continua de Dios en el mundo después de la Ascensión.',
        cita: '«Y yo rogaré al Padre, y os dará otro Consolador, para que esté con vosotros para siempre.»\n— Juan 14:16',
      },
      {
        titulo: 'Puede ser entristecido — señal de que es una persona',
        texto:
          'Pablo escribe "no entristezcáis al Espíritu Santo de Dios". Solo una persona puede ser entristecida — una fuerza no siente. Esto confirma que el Espíritu Santo no es una energía ni un fluido espiritual: tiene emociones, voluntad y relaciones. Se puede ofender, se puede resistir, se puede apagar.',
        cita: '«No entristezcáis al Espíritu Santo de Dios, con el cual fuisteis sellados para el día de la redención.»\n— Efesios 4:30',
      },
    ],
    conclusion:
      'El Espíritu Santo es la tercera persona de la Trinidad: completamente Dios, igual al Padre y al Hijo. No es una fuerza ni una energía — es una persona con inteligencia, voluntad y emociones. Actúa en la creación, en la historia y en cada creyente. Su obra es hacer real en la vida del ser humano lo que el Padre planeó y el Hijo realizó.',
    mensaje:
      'El Espíritu Santo no es algo que se busca en experiencias extraordinarias. Está en lo cotidiano: en la paz que te llega después de orar, en el impulso de hacer bien cuando podías no hacerlo, en la voz interna que te llama a algo mejor. Eso no es psicología — es la persona de Dios caminando al lado tuyo.',
  },
  {
    id:        '35',
    emoji:     '🔺',
    categoria: 'Dios y la Trinidad',
    pregunta:  '¿Qué es la Trinidad? ¿Cómo puede Dios ser uno y tres a la vez?',
    intro:
      'La Trinidad es el misterio central del cristianismo. La palabra no aparece en la Biblia, pero el concepto está en cada página. Y la pregunta es legítima: ¿cómo puede Dios ser uno y tres al mismo tiempo? La respuesta honesta tiene dos partes: la Biblia enseña ambas cosas, y ninguna analogía humana puede explicar del todo algo que está más allá de la mente humana.',
    puntos: [
      {
        titulo: 'La Biblia enseña que Dios es UNO',
        texto:
          'El Shemá — la oración central del judaísmo — comienza con "Escucha, Israel: el Señor nuestro Dios, el Señor uno es." Jesús mismo la citó como el primer mandamiento. No hay dos dioses ni tres dioses — hay un solo Dios. El monoteísmo es el fundamento irrenunciable de toda la Biblia.',
        cita: '«El Señor nuestro Dios, el Señor uno es. Amarás al Señor tu Dios con todo tu corazón.»\n— Deuteronomio 6:4-5',
      },
      {
        titulo: 'La Biblia también enseña que son TRES personas distintas',
        texto:
          'En el bautismo de Jesús, las tres personas aparecen simultáneamente: el Hijo siendo bautizado, el Espíritu descendiendo como paloma, la voz del Padre desde el cielo. No son el mismo actuando en papeles distintos — son tres que actúan a la vez, cada uno de manera diferente.',
        cita: '«Y Jesús, después de ser bautizado, subió del agua... y vio al Espíritu de Dios descender como paloma... Y hubo una voz del cielo: Este es mi Hijo amado.»\n— Mateo 3:16-17',
      },
      {
        titulo: 'La Gran Comisión — los tres en un solo nombre',
        texto:
          'Jesús mandó bautizar "en el nombre" (singular) del Padre, del Hijo y del Espíritu Santo. No dijo "en los nombres" (plural) — dijo "en el nombre" como si los tres tuvieran un solo nombre. Esta tensión entre la unidad y la pluralidad es precisamente lo que la doctrina de la Trinidad intenta expresar.',
        cita: '«Id y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.»\n— Mateo 28:19',
      },
      {
        titulo: '¿Por qué no se puede explicar del todo?',
        texto:
          'Ninguna analogía funciona perfectamente: el agua que es hielo, líquido y vapor (tres estados, pero no tres personas). El hombre que es hijo, padre y esposo (tres roles, una sola persona). El trébol de tres hojas. Todas fallan en algún punto porque pretenden reducir a Dios a algo del mundo creado. Dios es la fuente de toda realidad — no puede ser completamente explicado con categorías de esa misma realidad.',
        cita: '«Porque mis pensamientos no son vuestros pensamientos, ni vuestros caminos mis caminos, dice el Señor.»\n— Isaías 55:8',
      },
      {
        titulo: 'Lo que la Trinidad revela sobre el amor',
        texto:
          'La Trinidad explica algo que ningún otro monoteísmo puede explicar: por qué Dios es amor desde la eternidad. Si Dios fuera absolutamente solitario antes de la creación, ¿a quién amaba? La Trinidad dice que dentro de Dios mismo hay una comunión de amor eterno entre el Padre, el Hijo y el Espíritu. El amor no comenzó cuando Dios creó — el amor es lo que Dios es.',
        cita: '«El que no ama no ha conocido a Dios, porque Dios es amor.»\n— 1 Juan 4:8',
      },
    ],
    conclusion:
      'La Trinidad no es una contradicción lógica sino un misterio que supera la lógica humana. Dios es un solo ser divino que existe en tres personas eternas y distintas: Padre, Hijo y Espíritu Santo. Cada uno es plenamente Dios. Los tres son un solo Dios. La Biblia no lo explica con filosofía — lo muestra en acción en la historia de la salvación.',
    mensaje:
      'No necesitás entender la Trinidad para relacionarte con Dios — igual que no necesitás entender cómo funciona el amor para amar. Pero cuando empezás a entenderla, algo cambia: Dios deja de ser una fuerza solitaria en el cielo y se convierte en una comunidad de amor que te invita adentro. Esa es la invitación más extraordinaria que existe.',
  },
  {
    id:        '36',
    emoji:     '🛡️',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre cómo el diablo puede influenciarnos?',
    intro:
      'La Biblia no ignora al diablo ni lo exagera. Le da un nombre, una estrategia y un límite. Entender cómo actúa no es para tenerle miedo — es para no ser sorprendido.',
    puntos: [
      {
        titulo: 'Tienta usando lo que ya está en nosotros',
        texto:
          'En el desierto, el diablo tentó a Jesús tres veces: con hambre, con orgullo y con poder. En el Génesis, tentó a Eva distorsionando lo que Dios había dicho: "¿Conque Dios os ha dicho...?" La tentación siempre empieza como una pregunta, una duda, una posibilidad. No crea el deseo desde cero — lo amplifica, lo disfraza, lo hace parecer razonable.',
        cita: '«Cuando alguno es tentado, no diga que es tentado de parte de Dios... sino que cada uno es tentado cuando de su propia concupiscencia es atraído.»\n— Santiago 1:13-14',
      },
      {
        titulo: 'Miente y falsifica la realidad',
        texto:
          'Jesús lo llama "mentiroso y padre de mentira" y dice que "no hay verdad en él". El diablo no necesita inventar cosas completamente falsas — le basta con mezclar verdad con mentira, exagerar un miedo, minimizar una consecuencia. Su mentira más efectiva puede ser hacerte creer que eres lo peor, que no hay perdón, que Dios no te escucha.',
        cita: '«El diablo... ha sido homicida desde el principio y no ha permanecido en la verdad.»\n— Juan 8:44',
      },
      {
        titulo: 'Acusa sin parar',
        texto:
          'El nombre "Satanás" en hebreo significa "el acusador". En Job aparece ante Dios acusando al hombre. Esta es la voz interior que repite: "No vales nada", "Eso que hiciste no tiene perdón", "Dios no puede amarte así". La acusación busca paralizar, no corregir. Dios convence para el bien; el diablo acusa para destruir.',
        cita: '«El acusador de nuestros hermanos... los acusaba delante de nuestro Dios día y noche.»\n— Apocalipsis 12:10',
      },
      {
        titulo: 'Se disfraza de algo bueno',
        texto:
          'Uno de los pasajes más importantes y menos conocidos: "el mismo Satanás se disfraza como ángel de luz". No siempre llega como tentación obvia. A veces llega disfrazado de filosofía razonable, de religiosidad vacía, de "amor propio" que en realidad es orgullo. Por eso la Biblia insiste en discernir y probar los espíritus.',
        cita: '«El mismo Satanás se disfraza como ángel de luz.»\n— 2 Corintios 11:14',
      },
      {
        titulo: 'Ciega la mente para que no vea la verdad',
        texto:
          'Pablo dice que "el dios de este siglo cegó el entendimiento de los incrédulos". No necesita convertirte en malvado — le basta con mantenerte distraído, ocupado, indiferente. La ceguera espiritual no duele como un pecado grave; es silenciosa: simplemente no ves la realidad de Dios aunque esté frente a ti.',
        cita: '«El dios de este siglo cegó el entendimiento de los incrédulos, para que no les resplandezca la luz del evangelio.»\n— 2 Corintios 4:4',
      },
      {
        titulo: 'Busca el momento de debilidad',
        texto:
          '"Como león rugiente, anda alrededor buscando a quien devorar." Un león no ataca de frente a una manada — espera al que se alejó, al que está solo, al que está herido. El diablo actúa igual: en el cansancio, el dolor, el aislamiento. No es casualidad que las mayores tentaciones lleguen cuando estamos solos o agotados.',
        cita: '«Sed sobrios y velad; porque vuestro adversario el diablo, como león rugiente, anda alrededor buscando a quien devorar.»\n— 1 Pedro 5:8',
      },
      {
        titulo: 'Pero tiene límites que no puede cruzar sin permiso',
        texto:
          'El libro de Job lo muestra claramente: el diablo no puede tocar a Job sin autorización expresa de Dios. En Lucas 22:31, Jesús dice a Pedro: "Satanás os ha pedido para zarandearos." Pedir permiso implica que no tiene poder absoluto. Y Jesús ya lo venció: "El príncipe de este mundo ha sido juzgado." La cruz fue su derrota definitiva.',
        cita: '«Resistid al diablo, y huirá de vosotros.»\n— Santiago 4:7',
      },
    ],
    conclusion:
      'El diablo no crea nada nuevo — distorsiona, miente, acusa, ciega y espera el momento débil. Actúa desde las sombras, no desde el poder. Pero tiene un límite claro: no puede forzar. Solo puede sugerir. Y ya fue vencido por Cristo en la cruz. El cristiano no pelea para ganar — pelea desde una victoria ya ganada.',
    mensaje:
      'El miedo al diablo es exactamente lo que él quiere. La Biblia no lo pinta como omnipotente — lo pinta como vencido. "Mayor es el que está en vosotros que el que está en el mundo" (1Jn 4:4). Conocer sus estrategias no es paranoia — es no ser ingenuo. Y la respuesta de la Biblia es sencilla: resistid, y huirá.',
  },
  {
    id:        '37',
    emoji:     '🍷',
    categoria: 'Liturgia y sacramentos',
    pregunta:  '¿Por qué solo nos dan la hostia y no el vino si Jesús dijo "beban mi sangre"?',
    intro:
      'En Juan 6, Jesús dijo claramente: "Beban mi sangre." Pero en la mayoría de las misas el pueblo recibe solo la hostia. ¿Es esto una contradicción o una incomplitud?',
    puntos: [
      {
        titulo: 'La doctrina de la concomitancia',
        texto:
          'La Iglesia Católica enseña que cuando el sacerdote consagra la hostia, esta se convierte en Cristo completo: cuerpo, sangre, alma y divinidad — no solo en su "cuerpo". Lo mismo ocurre con el vino. Esto significa que al recibir la hostia sola ya se recibe al Cristo entero, incluyendo su sangre.',
        cita: '«El que come mi carne y bebe mi sangre tiene vida eterna.»\n— Juan 6:54',
      },
      {
        titulo: 'Juan 6:51 — solo el pan ya da vida eterna',
        texto:
          'En el mismo capítulo donde Jesús exige beber su sangre, también dice: "Si alguien come de este pan, vivirá para siempre." Jesús mismo presenta el pan solo como suficiente para la vida eterna. La Iglesia interpreta esto a la luz de la concomitancia: bajo cada especie está el Cristo entero.',
        cita: '«Yo soy el pan vivo que bajó del cielo. Si alguien come de este pan, vivirá para siempre.»\n— Juan 6:51',
      },
      {
        titulo: 'Historia: la Iglesia primitiva sí daba los dos',
        texto:
          'En los primeros siglos, los fieles recibían tanto el pan como el vino. Con el tiempo, por razones prácticas — riesgo de derramar la Sangre consagrada, higiene, dificultad logística con grandes congregaciones — la Iglesia occidental fue reservando el cáliz solo para el sacerdote.',
      },
      {
        titulo: 'El sacerdote siempre comulga bajo las dos especies',
        texto:
          'En cada misa, el sacerdote consagra y recibe tanto el pan como el vino. El signo completo de la Eucaristía siempre está presente en el altar. El pueblo recibe a Cristo entero en la hostia; el sacerdote hace visible el signo completo de las dos especies.',
      },
      {
        titulo: 'El Vaticano II restauró la comunión del cáliz',
        texto:
          'El Concilio Vaticano II (años 60) recuperó la opción de dar el cáliz a los fieles en celebraciones especiales: bodas, bautismos, primera comunión, Vigilia Pascual. En muchas parroquias del mundo se ofrece el cáliz regularmente. No es una práctica prohibida — es una opción litúrgica.',
      },
    ],
    conclusion:
      'No recibir el vino no significa recibir una Eucaristía incompleta. La doctrina de la concomitancia enseña que el Cristo entero — cuerpo y sangre — está presente bajo cada especie. El signo completo siempre está en el altar en la persona del sacerdote. El Vaticano II reintrodujo la opción del cáliz para los fieles, y hoy se usa en muchas celebraciones.',
    mensaje:
      'Cuando recibes la hostia, no recibes una parte de Cristo — lo recibes a Él completo. La Eucaristía no es un símbolo dividido en dos piezas: es una persona. Y esa persona te recibe a ti entero también: con tus dudas, tus heridas y tu historia.',
  },
  {
    id:        '38',
    emoji:     '🌌',
    categoria: 'Fe y ciencia',
    pregunta:  '¿Dice la Biblia algo sobre vida en otros planetas?',
    intro:
      'Con miles de millones de galaxias y planetas en el universo, la pregunta sobre vida extraterrestre es inevitable. ¿Qué dice — o qué calla — la Biblia sobre esto?',
    puntos: [
      {
        titulo: 'La Biblia no lo menciona directamente',
        texto:
          'En toda la Biblia no hay un solo versículo que hable de seres inteligentes en otros planetas. El texto bíblico está centrado en la relación entre Dios y la humanidad en la Tierra. Su silencio sobre vida extraterrestre no es una negación — simplemente no es el tema.',
      },
      {
        titulo: 'El universo como declaración de la gloria de Dios',
        texto:
          'El Salmo 19 dice que los cielos proclaman la gloria de Dios. El universo entero — con sus cientos de miles de millones de galaxias — es presentado en la Biblia como obra de las manos de Dios, no como escenario accidental. Si existe vida en otros lugares, sería también obra suya.',
        cita: '«Los cielos cuentan la gloria de Dios, el firmamento proclama la obra de sus manos.»\n— Salmo 19:1',
      },
      {
        titulo: 'Colosenses 1:16 — todo fue creado por Cristo',
        texto:
          'Pablo escribe que en Cristo fueron creadas "todas las cosas, tanto en los cielos como en la tierra, visibles e invisibles." Si existen formas de vida en otros lugares del universo, también habrían sido creadas por Aquel en quien existe todo.',
        cita: '«Porque en él fueron creadas todas las cosas, las que hay en los cielos y las que hay en la tierra.»\n— Colosenses 1:16',
      },
      {
        titulo: '"Otras ovejas que no son de este redil"',
        texto:
          'Jesús dijo: "Tengo otras ovejas que no son de este redil." La frase se refiere principalmente a los gentiles (no judíos), pero algunos teólogos han señalado que abre la posibilidad de que el plan redentor de Dios sea más vasto de lo que imaginamos.',
        cita: '«Tengo además otras ovejas que no son de este redil; aquellas también debo traer.»\n— Juan 10:16',
      },
      {
        titulo: 'El silencio bíblico no es negación',
        texto:
          'La Biblia no habla de electrones, de bacterias ni de galaxias espirales, y nadie concluye de eso que no existen. El texto sagrado no es un libro de astronomía ni de biología — es la historia de la relación de Dios con la humanidad. Su silencio sobre vida extraterrestre no la descarta.',
      },
    ],
    conclusion:
      'La Biblia no confirma ni niega la existencia de vida en otros planetas. Simplemente no es su tema. Lo que sí afirma es que todo lo que existe fue creado por Dios y para Dios. Si hay vida inteligente en otros rincones del universo, también sería obra del mismo Creador. La fe cristiana no necesita que la Tierra sea el único planeta con vida para ser verdad.',
    mensaje:
      'El universo tiene cientos de miles de millones de galaxias, y en cada una de ellas Dios es Señor. Lo que la Biblia afirma no es que la Tierra es el centro del universo — es que tú eres el centro de su amor. Frente a toda esa inmensidad, Dios te conoce por nombre.',
  },
  {
    id:        '39',
    emoji:     '✨',
    categoria: 'Fe y ciencia',
    pregunta:  '¿Qué dice la Biblia sobre el universo, los planetas y las galaxias?',
    intro:
      'La Biblia fue escrita mucho antes de que existieran los telescopios. Pero habla del cosmos con una perspectiva que sigue siendo asombrosa.',
    puntos: [
      {
        titulo: 'Génesis 1:1 — "los cielos y la tierra"',
        texto:
          'La primera frase de la Biblia usa la expresión hebrea "shamayim va\'aretz" — los cielos y la tierra — que en el idioma original es una forma de decir "todo lo que existe", el equivalente de lo que hoy llamamos el universo. La Biblia no dice que Dios creó solo la Tierra: dice que creó todo.',
        cita: '«En el principio, Dios creó los cielos y la tierra.»\n— Génesis 1:1',
      },
      {
        titulo: 'Salmo 8 — la inmensidad del cosmos y la pequeñez del hombre',
        texto:
          'El Salmo 8 es quizás la reflexión más profunda de la Biblia sobre la relación entre el ser humano y el cosmos. El salmista mira los cielos, la luna y las estrellas, y se pregunta: ¿por qué Dios se acuerda del hombre frente a tanta inmensidad? Y la respuesta que da es sorprendente: porque lo coronó de gloria.',
        cita: '«Cuando contemplo tus cielos, la luna y las estrellas que tú pusiste, ¿qué es el hombre para que tengas de él memoria?»\n— Salmo 8:3-4',
      },
      {
        titulo: 'Isaías 40:26 — Dios cuenta las estrellas',
        texto:
          'Isaías describe a un Dios que conoce cada estrella por nombre. Hoy sabemos que existen aproximadamente 200 mil millones de estrellas solo en nuestra galaxia, y hay cientos de miles de millones de galaxias. El texto no es astronomía — es asombro teológico.',
        cita: '«Levanten los ojos y miren: ¿quién creó todo esto? Él saca y cuenta su ejército de estrellas; a todas las llama por nombre.»\n— Isaías 40:26',
      },
      {
        titulo: 'Job 38 — Dios pregunta desde el cosmos',
        texto:
          'En Job 38, Dios le responde a Job desde un torbellino y le hace preguntas sobre la creación: "¿Dónde estabas cuando puse los fundamentos de la tierra? ¿Puedes atar las Pléyades o soltar el cinturón de Orión?" El cosmos es presentado como argumento de la grandeza de Dios.',
        cita: '«¿Puedes atar las cadenas de las Pléyades, o soltar el cinturón de Orión?»\n— Job 38:31',
      },
      {
        titulo: 'El universo no es el fin — es el escenario',
        texto:
          'Para la Biblia, el universo no existe para ser adorado ni es el fin último de nada — es el escenario donde Dios despliega su gloria y donde los seres humanos son llamados a relacionarse con Él. El cosmos no es rival de Dios: es su obra.',
        cita: '«Los cielos son los cielos del Señor; pero la tierra la dio a los hijos de los hombres.»\n— Salmo 115:16',
      },
    ],
    conclusion:
      'La Biblia no explica la física del cosmos ni la formación de galaxias — ese no es su propósito. Pero sí habla del universo como creación de Dios, como declaración de su grandeza, y como contexto donde el ser humano — pequeño frente a la inmensidad — es sin embargo lo más amado. La Biblia no teme la enormidad del cosmos: la celebra como firma del Creador.',
    mensaje:
      'Frente a un universo de 93 mil millones de años luz de diámetro, la Biblia dice algo radical: Dios te conoce a ti. Cada estrella de Isaías 40 tiene nombre, y el tuyo también lo sabe. La inmensidad del cosmos no te hace insignificante — hace más asombroso que seas amado.',
  },
  {
    id:        '40',
    emoji:     '💍',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre usar anillos, esclavas y cadenas?',
    intro:
      'Las joyas y adornos aparecen en la Biblia más veces de lo que mucha gente cree. La respuesta no es una prohibición simple — es mucho más matizada.',
    puntos: [
      {
        titulo: 'Las joyas en el Antiguo Testamento: símbolo de honor',
        texto:
          'En el Génesis, el siervo de Abraham le regaló a Rebeca una argolla de oro para la nariz y brazaletes como señal de honor. En la parábola del hijo pródigo, el padre corre hacia su hijo y le pone un anillo — símbolo de restauración de dignidad. Las joyas en la Biblia frecuentemente representan honor, amor y pertenencia.',
        cita: '«El hombre sacó un pendiente de oro que pesaba medio siclo, y dos brazaletes para ella.»\n— Génesis 24:22',
      },
      {
        titulo: 'Ezequiel 16 — Dios mismo adorna a Israel con joyas',
        texto:
          'En una de las imágenes más sorprendentes del profeta Ezequiel, Dios describe cómo adornó a Israel con pulseras, collares y corona de oro. Las joyas son el lenguaje del amor de Dios hacia su pueblo. No hay condena implícita en el adorno en sí.',
        cita: '«Te adornaste con oro y plata; tus vestidos eran de lino fino, seda y bordado.»\n— Ezequiel 16:13',
      },
      {
        titulo: 'La advertencia del Nuevo Testamento: no sea lo exterior lo principal',
        texto:
          'Pablo y Pedro no prohíben las joyas, pero sí advierten contra hacer del adorno externo la fuente de identidad o valor. La belleza que importa para Dios no es la que se compra en una joyería.',
        cita: '«Vuestro atavío no sea el externo: peinados ostentosos, adornos de oro o vestidos lujosos. Sino el interno, el del corazón.»\n— 1 Pedro 3:3-4',
      },
      {
        titulo: 'Santiago 5 — advertencia contra el lujo ostentoso',
        texto:
          'Santiago sí reprende el lujo acumulado por los ricos que oprimen a otros. No es una condena de las joyas como objeto, sino de la acumulación injusta y del uso del adorno como símbolo de poder sobre el pobre.',
        cita: '«Vosotros los ricos, llorad y aullad por las miserias que os vendrán... vuestro oro y plata están enmohecidos.»\n— Santiago 5:1-3',
      },
      {
        titulo: '¿Es pecado usar joyas?',
        texto:
          'La Biblia no lo condena. Lo que sí pregunta es: ¿de dónde viene tu valor? ¿Del anillo que llevas o de la persona que eres? El adorno externo no es malo; convertirlo en tu identidad sí lo es. La distinción bíblica no es entre con joyas y sin joyas — es entre corazón centrado en Dios y corazón centrado en la apariencia.',
      },
    ],
    conclusion:
      'La Biblia no prohíbe los anillos, las esclavas ni las cadenas. Las joyas aparecen como símbolo de honor, amor y dignidad en el Antiguo Testamento. El Nuevo Testamento advierte que la belleza exterior no debe ser lo que define a la persona — pero eso es muy diferente a una prohibición. Lo que importa es el corazón, no el adorno.',
    mensaje:
      'Puedes usar o no usar joyas con plena libertad cristiana. Lo que Dios mira no es tu muñeca ni tu cuello — es tu corazón. La pregunta bíblica no es "¿llevas pulsera?" sino "¿qué te hace sentir valioso?" Si la respuesta no es el amor de Dios, eso sí merece reflexión.',
  },
  {
    id:        '41',
    emoji:     '⚡',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre usar símbolos nórdicos como el Mjölnir, runas o el Valknut?',
    intro:
      'El martillo de Thor, las runas vikingas y el Valknut son cada vez más comunes como accesorios o tatuajes. ¿Qué dice la Biblia sobre usarlos? La respuesta depende de una distinción importante.',
    puntos: [
      {
        titulo: 'El contexto bíblico: advertencia contra los símbolos de otros dioses',
        texto:
          'El Deuteronomio y varios profetas advierten reiteradamente contra adoptar las prácticas religiosas de otros pueblos — incluyendo sus símbolos sagrados. La preocupación no era cultural sino espiritual: que el corazón se fuera detrás de otros dioses.',
        cita: '«No harás como hacen en Egipto... ni como hacen en la tierra de Canaán.»\n— Levítico 18:3',
      },
      {
        titulo: 'La distinción clave: ¿símbolo cultural o símbolo religioso?',
        texto:
          'El Mjölnir era originalmente un símbolo religioso vikingo — el martillo del dios Thor, asociado a la protección y al poder divino pagano. Hoy, mucha gente lo usa como símbolo cultural, estético o de herencia nórdica, sin ninguna intención espiritual. La Biblia no prohíbe la cultura nórdica — advierte contra la adoración a otros dioses.',
      },
      {
        titulo: 'El principio de la conciencia — 1 Corintios 8',
        texto:
          'Pablo abordó una situación similar con la carne sacrificada a ídolos. Su principio: el ídolo no es nada, pero si al usarlo tu conciencia te dice que estás honrando algo que no es Dios — o si tu ejemplo lleva a otro a hacer eso — entonces vale más abstenerse. La conciencia es el árbitro, no la forma del objeto.',
        cita: '«Pero no en todos hay este conocimiento; algunos... comen como si fuera sacrificado a ídolos, y su conciencia, siendo débil, se contamina.»\n— 1 Corintios 8:7',
      },
      {
        titulo: 'El Valknut — un caso más delicado',
        texto:
          'El Valknut (tres triángulos entrelazados) está específicamente asociado en la mitología nórdica con Odín y con los muertos en batalla. A diferencia del Mjölnir, que muchos usan sin connotación religiosa, el Valknut tiene una asociación espiritual más directa con la muerte y el mundo de los espíritus. Aquí la prudencia bíblica pediría más reflexión.',
      },
      {
        titulo: '¿A quién sirve tu corazón?',
        texto:
          'La pregunta más honesta no es "¿está prohibido este símbolo?" sino "¿a quién sirve mi corazón cuando lo uso?" Si el símbolo es puramente estético y tu fe está firme en Cristo, la Biblia da libertad. Si genera confusión en otros sobre tu fe, o si en tu propia conciencia hay alguna lealtad mezclada, eso merece atención.',
        cita: '«Todo lo que no proviene de fe, es pecado.»\n— Romanos 14:23',
      },
    ],
    conclusion:
      'La Biblia no menciona el Mjölnir ni las runas, pero sí da principios claros: evitar lo que es explícitamente religioso hacia otros dioses, y dejarse guiar por la conciencia cuando el uso es cultural. La distinción entre símbolo cultural y símbolo espiritual es real y relevante. Lo que la Biblia siempre pregunta es: ¿a quién sirves?',
    mensaje:
      'La libertad cristiana es real — puedes vivir en el mundo sin huirle a su cultura. Pero esa libertad tiene una brújula: ¿sirve esto a mi fe o la confunde? La pregunta no es "¿está en la lista de cosas prohibidas?" sino "¿señala hacia Cristo o me aleja de Él?"',
  },
]

function buildTexto(p: Pregunta): string {
  const partes: string[] = [p.pregunta, '. ', p.intro]
  p.puntos.forEach((pt, i) => {
    partes.push(` Punto ${i + 1}: ${pt.titulo}. ${pt.texto}`)
    if (pt.cita) {
      // quitar el guión de referencia (— Libro X:Y) para que suene natural
      const soloTexto = pt.cita.split('\n')[0].replace(/[«»]/g, '')
      partes.push(` ${soloTexto}`)
    }
  })
  partes.push(` En resumen: ${p.conclusion}`)
  partes.push(` El verdadero mensaje: ${p.mensaje}`)
  return partes.join('')
}

export default function PreguntasScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [abierto, setAbierto] = useState<string | null>(null)
  const [leyendo, setLeyendo] = useState<string | null>(null)

  useEffect(() => () => { Speech.stop() }, [])

  const toggle = (id: string) => {
    if (abierto === id) {
      Speech.stop()
      setLeyendo(null)
    }
    setAbierto(prev => (prev === id ? null : id))
  }

  const escuchar = (p: Pregunta) => {
    if (leyendo === p.id) {
      Speech.stop()
      setLeyendo(null)
      return
    }
    Speech.stop()
    setLeyendo(p.id)
    Speech.speak(buildTexto(p), {
      language: 'es-ES',
      rate: 0.9,
      onDone:  () => setLeyendo(null),
      onError: () => setLeyendo(null),
    })
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.back} activeOpacity={0.7}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>🤔 Preguntas Bíblicas</Text>
        <Text style={s.subtitulo}>Respuestas que la Biblia tiene — aunque no siempre se enseñan</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}>
        {PREGUNTAS.map(p => {
          const estaAbierto = abierto === p.id
          return (
            <View key={p.id} style={s.card}>
              {/* Pregunta — toca para abrir/cerrar */}
              <TouchableOpacity onPress={() => toggle(p.id)} activeOpacity={0.8} style={s.cardHeader}>
                <Text style={s.emoji}>{p.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.categoria}>{p.categoria}</Text>
                  <Text style={s.preguntaTxt}>{p.pregunta}</Text>
                </View>
                <Text style={[s.chevron, estaAbierto && s.chevronAbierto]}>›</Text>
              </TouchableOpacity>

              {/* Respuesta expandible */}
              {estaAbierto && (
                <View style={s.respuesta}>
                  <View style={s.separador} />

                  {/* Botón audio */}
                  <TouchableOpacity
                    style={[s.audioBtn, leyendo === p.id && s.audioBtnActivo]}
                    onPress={() => escuchar(p)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.audioBtnIcon}>{leyendo === p.id ? '⏹' : '🔊'}</Text>
                    <Text style={[s.audioBtnTxt, leyendo === p.id && s.audioBtnTxtActivo]}>
                      {leyendo === p.id ? 'Detener audio' : 'Escuchar respuesta'}
                    </Text>
                  </TouchableOpacity>

                  {/* Intro */}
                  <Text style={s.introTxt}>{p.intro}</Text>

                  {/* Puntos */}
                  {p.puntos.map((punto, i) => (
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

                  {/* Conclusión */}
                  <View style={s.conclusionBox}>
                    <Text style={s.conclusionLabel}>💡 En resumen</Text>
                    <Text style={s.conclusionTxt}>{p.conclusion}</Text>
                  </View>

                  {/* Mensaje verdadero */}
                  <View style={s.mensajeBox}>
                    <Text style={s.mensajeLabel}>✝ El verdadero mensaje</Text>
                    <Text style={s.mensajeTxt}>{p.mensaje}</Text>
                  </View>
                </View>
              )}
            </View>
          )
        })}

        <Text style={s.nota}>Más preguntas próximamente ✝</Text>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.fondo },
  header:         { backgroundColor: C.bg, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  back:           { marginBottom: 12 },
  backTxt:        { color: C.acento, fontSize: 15 },
  titulo:         { color: C.texto, fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitulo:      { color: '#fde68a', fontSize: 13, lineHeight: 18 },

  card:           { backgroundColor: C.card, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: C.borde, overflow: 'hidden' },
  cardHeader:     { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  emoji:          { fontSize: 28, marginTop: 2 },
  categoria:      { color: C.acento, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  preguntaTxt:    { color: C.texto, fontSize: 15, fontWeight: '600', lineHeight: 21 },
  chevron:        { color: C.sub, fontSize: 26, marginLeft: 4, transform: [{ rotate: '0deg' }] },
  chevronAbierto: { transform: [{ rotate: '90deg' }] },

  respuesta:      { paddingHorizontal: 16, paddingBottom: 16 },
  separador:      { height: 1, backgroundColor: C.borde, marginBottom: 14 },
  audioBtn:       { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0f2d1a', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 14, borderWidth: 1, borderColor: '#166534' },
  audioBtnActivo: { backgroundColor: '#1a0a0a', borderColor: '#991b1b' },
  audioBtnIcon:   { fontSize: 16 },
  audioBtnTxt:    { color: '#4ade80', fontSize: 14, fontWeight: '600' },
  audioBtnTxtActivo: { color: '#f87171' },
  introTxt:       { color: C.sub, fontSize: 14, lineHeight: 21, marginBottom: 16, fontStyle: 'italic' },

  punto:          { marginBottom: 16 },
  puntoTitulo:    { color: C.acento, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  puntoTexto:     { color: C.texto, fontSize: 14, lineHeight: 22 },
  citaBox:        { backgroundColor: '#1c1917', borderLeftWidth: 3, borderLeftColor: C.acento, borderRadius: 8, padding: 12, marginTop: 8 },
  citaTxt:        { color: '#fde68a', fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  conclusionBox:  { backgroundColor: '#1c1412', borderRadius: 12, padding: 14, marginTop: 4, borderWidth: 1, borderColor: C.bgLight },
  conclusionLabel:{ color: C.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  conclusionTxt:  { color: C.texto, fontSize: 14, lineHeight: 21 },

  mensajeBox:    { backgroundColor: '#0f172a', borderRadius: 12, padding: 14, marginTop: 10, borderWidth: 1, borderColor: '#4338ca', borderLeftWidth: 4 },
  mensajeLabel:  { color: '#a5b4fc', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  mensajeTxt:    { color: '#e0e7ff', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },

  nota:           { color: C.sub, fontSize: 13, textAlign: 'center', marginTop: 8, marginBottom: 4 },
})
