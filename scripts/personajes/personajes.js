/**
 * Personajes de la sección "Personajes de la Biblia".
 *
 * Cada entrada: { id, nombre, quien, partes }.
 * - `quien` distingue a los que comparten nombre ("hijo de Jacob", "esposo de María").
 * - `partes`: una o varias reglas { nombres, donde }. Se cuenta cada vez que uno de los `nombres`
 *   aparece en un versículo que cumple `donde` (sin `donde`, en toda la Biblia).
 *
 * Muchos nombres los llevan varias personas (José, Juan, María, Judas, Simón, Santiago…). Se separan
 * por el libro, el capítulo o las palabras que los acompañan en el versículo. Es una aproximación
 * cuidadosa, no una lectura versículo por versículo: cada regla dice qué se decidió y por qué.
 *
 * Libros: 1 Génesis … 39 Malaquías, 40 Tobit, 41 Judit, 42 Ester (dc), 43-44 Macabeos, 45 Eclesiástico,
 * 46 Sabiduría, 47 Baruc, 48 Daniel (dc), 49 Mateo, 50 Marcos, 51 Lucas, 52 Juan, 53 Hechos, 54… cartas.
 */
const MT = 49, MC = 50, LC = 51, JN = 52, HCH = 53
const AT = v => v.libro <= 48
const NT = v => v.libro >= 49
const evangelios = v => v.libro >= MT && v.libro <= JN
const libros = (...ids) => v => ids.includes(v.libro)
const entre = (a, b) => v => v.libro >= a && v.libro <= b
/** Capítulos por libro: caps({ 49: [1, 2], 51: [1, 2] }) */
const caps = mapa => v => (mapa[v.libro] ?? []).includes(v.cap)
const tiene = patron => v => patron.test(v.texto)
const y = (...f) => v => f.every(x => x(v))
const o = (...f) => v => f.some(x => x(v))
const no = f => v => !f(v)

const uno = (id, nombre, quien, nombres, donde) => ({ id, nombre, quien, partes: [{ nombres, donde }] })

module.exports = [
  // ── Jesús y su familia ──
  { id: 'jesus', nombre: 'Jesús', quien: 'el Hijo de Dios, el Cristo', partes: [{ nombres: ['Jesús', 'Jesucristo', 'Cristo'], donde: NT }] },
  // Mateo 1-2 y 13, Marcos 6, Lucas 1-2 y Hechos 1: la madre de Jesús (Juan nunca la nombra)
  uno('maria_madre', 'María', 'madre de Jesús', ['María'], caps({ [MT]: [1, 2, 13], [MC]: [6], [LC]: [1, 2], [HCH]: [1] })),
  // Mateo 1-2, Lucas 1-4 y Juan 1 y 6. En Mateo 13:55 "José" es un pariente de Jesús, no su padre
  uno('jose_esposo', 'José', 'esposo de María', ['José'], caps({ [MT]: [1, 2], [LC]: [1, 2, 3, 4], [JN]: [1, 6] })),
  uno('maria_magdalena', 'María Magdalena', 'discípula y primera testigo de la resurrección', ['María'], o(tiene(/Magdalena/), caps({ [JN]: [20] }))),
  uno('maria_betania', 'María de Betania', 'hermana de Marta y de Lázaro', ['María'], caps({ [LC]: [10], [JN]: [11, 12] })),
  uno('marta', 'Marta', 'hermana de María y de Lázaro', ['Marta']),
  uno('lazaro', 'Lázaro', 'el amigo que Jesús resucitó', ['Lázaro'], libros(JN)),
  uno('isabel', 'Isabel', 'madre de Juan el Bautista', ['Isabel'], libros(LC)),
  uno('zacarias_padre', 'Zacarías', 'padre de Juan el Bautista', ['Zacarías'], caps({ [LC]: [1, 3] })),
  // José de Arimatea: capítulos de la sepultura. Se excluye "María, la madre de Santiago y de José"
  uno('jose_arimatea', 'José de Arimatea', 'el que sepultó a Jesús', ['José'], y(caps({ [MT]: [27], [MC]: [15], [LC]: [23], [JN]: [19] }), no(tiene(/madre de/)))),

  // ── Juan el Bautista y los apóstoles ──
  // En el evangelio de Juan todo "Juan" es el Bautista (salvo "Simón, hijo de Juan"). En los otros tres,
  // el apóstol va casi siempre junto a Pedro, Santiago o Zebedeo; lo demás es el Bautista.
  { id: 'juan_bautista', nombre: 'Juan el Bautista', quien: 'el precursor de Jesús', partes: [
    { nombres: ['Juan'], donde: y(libros(JN), no(tiene(/hijo de Juan/))) },
    { nombres: ['Juan'], donde: y(entre(MT, LC), no(tiene(/Santiago|Pedro|Zebedeo|Andrés/)), no(caps({ [MC]: [9] })), no(y(libros(LC), v => v.cap === 9 && v.vers >= 28))) },
    { nombres: ['Juan'], donde: y(libros(HCH), tiene(/bautismo|bautiz/)) },
  ] },
  { id: 'juan_apostol', nombre: 'Juan', quien: 'apóstol, hijo de Zebedeo', partes: [
    { nombres: ['Juan'], donde: y(entre(MT, LC), o(tiene(/Santiago|Pedro|Zebedeo|Andrés/), caps({ [MC]: [9] }), y(libros(LC), v => v.cap === 9 && v.vers >= 28))) },
    { nombres: ['Juan'], donde: y(libros(HCH), tiene(/Pedro|Santiago/), no(tiene(/bautismo|bautiz|Marcos/))) },
    { nombres: ['Juan'], donde: libros(57, 75) },
  ] },
  // "Simón" es Pedro en los evangelios salvo cuando el versículo dice que es otro (el zelote, el leproso,
  // el de Cirene, el padre de Judas…) y en Lucas 7 (Simón el fariseo). En Hechos solo se cuenta "Pedro".
  { id: 'pedro', nombre: 'Pedro', quien: 'Simón Pedro, apóstol', partes: [
    { nombres: ['Pedro', 'Cefas'], donde: NT },
    { nombres: ['Simón'], donde: y(evangelios, no(tiene(/Pedro|celote|zelote|cananeo|leproso|fariseo|Cirene|Iscariote|patriota|hermanos? de Jesús|José/)), no(caps({ [LC]: [7] }))) },
  ] },
  { id: 'pablo', nombre: 'Pablo', quien: 'Saulo de Tarso, apóstol de los gentiles', partes: [{ nombres: ['Pablo', 'Saulo'], donde: NT }] },
  // Santiago, hijo de Zebedeo: los evangelios (menos "el menor", "hijo de Alfeo" y las listas de parientes) y Hechos 12:2
  uno('santiago_mayor', 'Santiago', 'apóstol, hijo de Zebedeo', ['Santiago'],
    o(y(evangelios, no(tiene(/Alfeo|menor|madre de Santiago|hijo de Santiago|hermano de Santiago|José/))), v => v.libro === HCH && v.cap === 12 && v.vers === 2)),
  uno('santiago_justo', 'Santiago', '"el hermano del Señor", guía de la Iglesia de Jerusalén', ['Santiago'],
    o(libros(55, 57, 68, 74), caps({ [HCH]: [15, 21] }), v => v.libro === HCH && v.cap === 12 && v.vers === 17)),
  uno('andres', 'Andrés', 'apóstol, hermano de Pedro', ['Andrés']),
  uno('felipe_apostol', 'Felipe', 'apóstol', ['Felipe'], o(evangelios, caps({ [HCH]: [1] }))),
  uno('felipe_diacono', 'Felipe', 'uno de los siete, evangelizador de Samaria', ['Felipe'], caps({ [HCH]: [6, 8, 21] })),
  uno('tomas', 'Tomás', 'apóstol', ['Tomás']),
  // "Leví" es Mateo solo en Marcos 2 y Lucas 5 (en el resto es la tribu o un antepasado)
  { id: 'mateo', nombre: 'Mateo', quien: 'apóstol y evangelista (también llamado Leví)', partes: [{ nombres: ['Mateo'], donde: NT }, { nombres: ['Leví'], donde: caps({ [MC]: [2], [LC]: [5] }) }] },
  // Judas Iscariote: evangelios (menos Tadeo, "no el Iscariote" y las listas de parientes) y Hechos 1
  uno('judas_iscariote', 'Judas Iscariote', 'el apóstol que entregó a Jesús', ['Judas'],
    y(o(evangelios, caps({ [HCH]: [1] })), no(tiene(/Tadeo|no el Iscariote|hijo de Santiago|hermano de Santiago|Simón y Judas|José/)))),
  uno('bernabe', 'Bernabé', 'compañero de misión de Pablo', ['Bernabé']),
  uno('timoteo', 'Timoteo', 'discípulo y colaborador de Pablo', ['Timoteo'], NT),
  uno('tito', 'Tito', 'colaborador de Pablo', ['Tito'], NT),
  uno('esteban', 'Esteban', 'primer mártir', ['Esteban']),
  uno('silas', 'Silas', 'compañero de Pablo', ['Silas', 'Silvano']),
  uno('marcos', 'Marcos', 'Juan Marcos, evangelista', ['Marcos']),
  uno('apolo', 'Apolo', 'predicador de Alejandría', ['Apolo'], NT),
  uno('nicodemo', 'Nicodemo', 'fariseo que buscó a Jesús de noche', ['Nicodemo']),
  uno('zaqueo', 'Zaqueo', 'el cobrador de impuestos de Jericó', ['Zaqueo'], libros(LC)),
  uno('cornelio', 'Cornelio', 'centurión romano, primer pagano bautizado', ['Cornelio']),

  // ── Autoridades del tiempo de Jesús ──
  uno('pilato', 'Pilato', 'gobernador romano que condenó a Jesús', ['Pilato']),
  uno('herodes_grande', 'Herodes', 'el Grande, rey cuando nació Jesús', ['Herodes'], caps({ [MT]: [2], [LC]: [1] })),
  uno('herodes_antipas', 'Herodes', 'Antipas, el que mandó matar al Bautista', ['Herodes'], o(y(evangelios, no(caps({ [MT]: [2], [LC]: [1] }))), caps({ [HCH]: [4, 13] }))),
  uno('caifas', 'Caifás', 'sumo sacerdote en el juicio de Jesús', ['Caifás']),
  uno('barrabas', 'Barrabás', 'el preso liberado en lugar de Jesús', ['Barrabás']),

  // ── Los orígenes y los patriarcas ──
  uno('adan', 'Adán', 'el primer hombre', ['Adán']),
  uno('eva', 'Eva', 'la primera mujer', ['Eva']),
  uno('cain', 'Caín', 'hijo de Adán, mató a su hermano', ['Caín'], libros(1, 46, 67, 71, 74)),
  uno('abel', 'Abel', 'hijo de Adán, el justo', ['Abel'], o(libros(1), NT)),
  uno('noe', 'Noé', 'el del arca y el diluvio', ['Noé']),
  { id: 'abraham', nombre: 'Abraham', quien: 'padre de los creyentes (antes Abram)', partes: [{ nombres: ['Abraham', 'Abram'] }] },
  uno('sara_abraham', 'Sara', 'esposa de Abraham', ['Sara', 'Sarai'], libros(1, 23, 54, 57, 67, 69)),
  uno('lot', 'Lot', 'sobrino de Abraham', ['Lot']),
  uno('agar', 'Agar', 'esclava de Sara, madre de Ismael', ['Agar']),
  uno('ismael', 'Ismael', 'hijo de Abraham y Agar', ['Ismael'], libros(1)),
  uno('melquisedec', 'Melquisedec', 'rey y sacerdote que bendijo a Abraham', ['Melquisedec']),
  uno('isaac', 'Isaac', 'hijo de Abraham', ['Isaac']),
  uno('rebeca', 'Rebeca', 'esposa de Isaac', ['Rebeca']),
  uno('jacob', 'Jacob', 'hijo de Isaac, padre de las doce tribus', ['Jacob']),
  uno('esau', 'Esaú', 'hermano de Jacob', ['Esaú']),
  uno('laban', 'Labán', 'tío y suegro de Jacob', ['Labán']),
  uno('raquel', 'Raquel', 'esposa de Jacob', ['Raquel']),
  uno('lia', 'Lía', 'esposa de Jacob', ['Lía']),
  // José, hijo de Jacob: todo el Antiguo Testamento, Juan 4, Hechos 7, Hebreos 11 y Apocalipsis 7
  uno('jose_patriarca', 'José', 'hijo de Jacob, el vendido por sus hermanos', ['José'], o(AT, caps({ [JN]: [4], [HCH]: [7], 67: [11], 75: [7] }))),
  uno('juda_patriarca', 'Judá', 'hijo de Jacob', ['Judá'], libros(1)),
  uno('benjamin_patriarca', 'Benjamín', 'hijo menor de Jacob', ['Benjamín'], libros(1)),
  uno('ruben', 'Rubén', 'hijo mayor de Jacob', ['Rubén'], libros(1)),

  // ── El éxodo y la conquista ──
  uno('moises', 'Moisés', 'el que sacó a Israel de Egipto', ['Moisés']),
  uno('aaron', 'Aarón', 'hermano de Moisés, primer sumo sacerdote', ['Aarón']),
  // En esta traducción la hermana de Moisés se llama "María"
  uno('miriam', 'María (Miriam)', 'hermana de Moisés', ['María'], AT),
  uno('josue', 'Josué', 'sucesor de Moisés, conquistó la tierra', ['Josué'], no(libros(15, 16, 37, 38))),
  uno('caleb', 'Caleb', 'el explorador fiel', ['Caleb']),
  uno('eleazar', 'Eleazar', 'hijo de Aarón, sumo sacerdote', ['Eleazar'], entre(2, 7)),
  uno('finees', 'Finees', 'nieto de Aarón', ['Finees'], entre(2, 7)),
  uno('balaam', 'Balaam', 'el adivino que terminó bendiciendo a Israel', ['Balaam']),
  uno('core', 'Coré', 'el que se rebeló contra Moisés', ['Coré'], libros(4, 45, 74)),
  uno('rahab', 'Rahab', 'la mujer de Jericó que ayudó a Israel', ['Rahab'], o(libros(6), NT)),

  // ── Los jueces ──
  uno('debora', 'Débora', 'jueza y profetisa', ['Débora'], libros(7)),
  uno('gedeon', 'Gedeón', 'juez que venció con trescientos hombres', ['Gedeón']),
  uno('abimelec_gedeon', 'Abimélec', 'hijo de Gedeón', ['Abimélec'], libros(7, 10)),
  uno('jefte', 'Jefté', 'juez de Israel', ['Jefté']),
  uno('sanson', 'Sansón', 'el juez de la gran fuerza', ['Sansón']),
  uno('dalila', 'Dalila', 'la que traicionó a Sansón', ['Dalila']),
  uno('rut', 'Rut', 'la extranjera fiel, bisabuela de David', ['Rut']),
  uno('noemi', 'Noemí', 'suegra de Rut', ['Noemí']),
  uno('booz', 'Booz', 'esposo de Rut', ['Booz']),
  uno('eli', 'Elí', 'sacerdote de Siló', ['Elí'], libros(9, 11)),
  uno('ana_samuel', 'Ana', 'madre de Samuel', ['Ana'], libros(9)),
  uno('samuel', 'Samuel', 'profeta y último juez', ['Samuel']),

  // ── Los reyes ──
  uno('saul', 'Saúl', 'primer rey de Israel', ['Saúl'], o(entre(9, 14), libros(19, 23, 43, HCH))),
  uno('jonatan_saul', 'Jonatán', 'hijo de Saúl, amigo de David', ['Jonatán'], libros(9, 10, 13)),
  uno('david', 'David', 'el rey pastor', ['David']),
  uno('goliat', 'Goliat', 'el gigante filisteo', ['Goliat']),
  uno('jese', 'Jesé', 'padre de David', ['Jesé']),
  uno('abner', 'Abner', 'jefe del ejército de Saúl', ['Abner']),
  uno('joab', 'Joab', 'jefe del ejército de David', ['Joab']),
  uno('absalon', 'Absalón', 'hijo de David que se rebeló', ['Absalón']),
  uno('betsabe', 'Betsabé', 'madre de Salomón', ['Betsabé']),
  uno('urias', 'Urías', 'el hitita, esposo de Betsabé', ['Urías'], libros(10, 11, 13, MT)),
  uno('natan', 'Natán', 'el profeta que corrigió a David', ['Natán'], libros(10, 11, 13, 14, 19, 45)),
  uno('sadoc', 'Sadoc', 'sacerdote de David y Salomón', ['Sadoc'], libros(10, 11, 13, 14)),
  uno('salomon', 'Salomón', 'hijo de David, el rey sabio', ['Salomón']),
  uno('roboam', 'Roboam', 'hijo de Salomón; con él se dividió el reino', ['Roboam']),
  // Jeroboam I. Se excluyen 2 Reyes 13-15, Oseas y Amós, que hablan de Jeroboam II
  uno('jeroboam', 'Jeroboam', 'primer rey del reino del norte', ['Jeroboam'], no(o(libros(28, 30), caps({ 12: [13, 14, 15] })))),
  uno('asa', 'Asá', 'rey de Judá', ['Asá']),
  uno('josafat', 'Josafat', 'rey de Judá', ['Josafat'], libros(11, 12, 14, MT)),
  uno('ahab', 'Ahab', 'rey de Israel, esposo de Jezabel', ['Ahab'], libros(11, 12, 14, 33)),
  uno('jezabel', 'Jezabel', 'reina que persiguió a los profetas', ['Jezabel']),
  uno('jehu', 'Jehú', 'rey de Israel', ['Jehú'], libros(11, 12, 14, 28)),
  uno('ezequias', 'Ezequías', 'rey fiel de Judá', ['Ezequías']),
  uno('josias', 'Josías', 'rey que renovó la fe de Judá', ['Josías']),
  uno('sedequias', 'Sedequías', 'último rey de Judá', ['Sedequías'], libros(12, 13, 14, 24, 47)),

  // ── Los profetas ──
  uno('elias', 'Elías', 'el profeta del fuego', ['Elías']),
  uno('eliseo', 'Eliseo', 'profeta, sucesor de Elías', ['Eliseo']),
  // En Crónicas, Esdras y Nehemías hay levitas llamados Isaías: no se cuentan
  uno('isaias', 'Isaías', 'profeta', ['Isaías'], o(libros(12, 14, 23, 45), NT)),
  uno('jeremias', 'Jeremías', 'profeta', ['Jeremías'], no(libros(12, 13, 16))),
  uno('baruc', 'Baruc', 'secretario de Jeremías', ['Baruc'], libros(24, 47)),
  uno('ezequiel', 'Ezequiel', 'profeta del destierro', ['Ezequiel']),
  uno('daniel', 'Daniel', 'el profeta del foso de los leones', ['Daniel'], no(libros(13, 15, 16))),
  uno('jonas', 'Jonás', 'el profeta que huyó de Dios', ['Jonás'], no(tiene(/hijo de Jonás/))),
  uno('job', 'Job', 'el justo probado por el sufrimiento', ['Job'], no(libros(1))),

  // ── Destierro, regreso y últimos libros ──
  uno('nabucodonosor', 'Nabucodonosor', 'rey de Babilonia', ['Nabucodonosor']),
  uno('ciro', 'Ciro', 'rey de Persia que dejó volver a los judíos', ['Ciro']),
  uno('dario', 'Darío', 'rey de Persia', ['Darío']),
  uno('artajerjes', 'Artajerjes', 'rey de Persia', ['Artajerjes']),
  uno('zorobabel', 'Zorobabel', 'gobernador que reconstruyó el templo', ['Zorobabel']),
  uno('esdras', 'Esdras', 'sacerdote y maestro de la ley', ['Esdras']),
  uno('nehemias', 'Nehemías', 'el que reconstruyó las murallas', ['Nehemías']),
  uno('ester', 'Ester', 'la reina que salvó a su pueblo', ['Ester']),
  uno('mardoqueo', 'Mardoqueo', 'primo y tutor de Ester', ['Mardoqueo'], libros(17, 42, 44)),
  uno('aman', 'Amán', 'el enemigo de los judíos', ['Amán', 'Amam', 'Hamán'], libros(17, 42)),
  uno('asuero', 'Asuero', 'rey de Persia, esposo de Ester', ['Asuero']),
  uno('tobit', 'Tobit', 'el padre ciego y fiel', ['Tobit']),
  uno('tobias', 'Tobías', 'hijo de Tobit', ['Tobías'], libros(40)),
  uno('sara_tobias', 'Sara', 'esposa de Tobías', ['Sara'], libros(40)),
  uno('judit', 'Judit', 'la viuda que salvó a su ciudad', ['Judit'], libros(41)),
  uno('holofernes', 'Holofernes', 'general enemigo vencido por Judit', ['Holofernes']),
  uno('susana', 'Susana', 'la inocente acusada falsamente', ['Susana'], libros(48)),
  uno('matatias', 'Matatías', 'sacerdote que inició la rebelión macabea', ['Matatías'], libros(43, 44)),
  uno('judas_macabeo', 'Judas Macabeo', 'jefe de la rebelión contra los reyes griegos', ['Judas', 'Macabeo'], libros(43, 44)),
  uno('jonatan_macabeo', 'Jonatán', 'hermano de Judas Macabeo', ['Jonatán'], libros(43, 44)),
  uno('simon_macabeo', 'Simón', 'hermano de Judas Macabeo', ['Simón'], libros(43)),
  uno('antioco', 'Antíoco', 'reyes de Siria que persiguieron a los judíos', ['Antíoco'], libros(43, 44)),
  uno('nicanor', 'Nicanor', 'general enemigo de los Macabeos', ['Nicanor'], libros(43, 44)),
]

/**
 * Nombres que llevan varias personas de la lista. La app los muestra juntos, bajo cada nombre,
 * en "Nombres que comparten varias personas".
 */
module.exports.COMPARTEN = {
  'José': ['jose_patriarca', 'jose_esposo', 'jose_arimatea'],
  'Juan': ['juan_bautista', 'juan_apostol'],
  'María': ['maria_madre', 'maria_magdalena', 'maria_betania', 'miriam'],
  'Judas': ['judas_macabeo', 'judas_iscariote'],
  'Simón': ['pedro', 'simon_macabeo'],
  'Jonatán': ['jonatan_saul', 'jonatan_macabeo'],
  'Santiago': ['santiago_mayor', 'santiago_justo'],
  'Herodes': ['herodes_antipas', 'herodes_grande'],
  'Sara': ['sara_abraham', 'sara_tobias'],
  'Felipe': ['felipe_diacono', 'felipe_apostol'],
}
