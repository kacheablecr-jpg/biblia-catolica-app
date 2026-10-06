/**
 * Quién fue y qué nos enseña cada personaje de la sección "Personajes de la Biblia".
 * La clave es el id del personaje en personajesDatos.json (lo genera scripts/personajes/generar.js).
 */
export interface TextoPersonaje { quienFue: string; ensenanza: string }

export const TEXTOS_PERSONAJES: Record<string, TextoPersonaje> = {
  // ── Jesús y su familia ──
  jesus: {
    quienFue: 'El Hijo de Dios hecho hombre. Nació en Belén, creció en Nazaret, anunció el Reino de Dios, murió en la cruz y resucitó al tercer día. "Cristo" significa Ungido, el Mesías esperado.',
    ensenanza: 'Todo en la Biblia conduce a Él. Conocerlo no es saber datos de su vida, sino dejarse encontrar y seguirlo. Sigue vivo y camina contigo.',
  },
  maria_madre: {
    quienFue: 'Una joven de Nazaret elegida por Dios para ser la madre de Jesús. Dijo "sí" al anuncio del ángel, lo acompañó hasta la cruz y oró con los apóstoles en Pentecostés. Los evangelios la nombran pocas veces, pero está en los momentos decisivos.',
    ensenanza: 'María enseña a confiar sin entenderlo todo: "Hágase en mí según tu palabra". Es madre nuestra también; acude a ella con confianza.',
  },
  jose_esposo: {
    quienFue: 'Carpintero de Nazaret, descendiente de David, esposo de María y padre adoptivo de Jesús. Obedeció en silencio lo que Dios le pidió en sueños y protegió a su familia.',
    ensenanza: 'José no dice una sola palabra en la Biblia: habla con sus obras. Enseña a cuidar, trabajar y obedecer a Dios sin buscar protagonismo.',
  },
  maria_magdalena: {
    quienFue: 'Mujer de Magdala a quien Jesús liberó. Lo siguió, estuvo al pie de la cruz y fue la primera en ver al Resucitado, quien la envió a anunciarlo a los apóstoles.',
    ensenanza: 'El pasado no define a nadie cuando se encuentra con Jesús. Quien lo busca con amor, lo encuentra, y sale a contarlo.',
  },
  maria_betania: {
    quienFue: 'Hermana de Marta y de Lázaro. Se sentó a los pies de Jesús a escucharlo y, poco antes de su pasión, le ungió los pies con un perfume muy caro.',
    ensenanza: 'Escuchar a Jesús es "la mejor parte". Antes de correr a hacer cosas por Dios, siéntate un rato con Él.',
  },
  marta: {
    quienFue: 'Hermana de María y de Lázaro, dueña de casa en Betania. Servía con afán a Jesús y fue quien le dijo: "Yo creo que tú eres el Mesías, el Hijo de Dios".',
    ensenanza: 'Servir es bueno, pero sin perder la paz. Y aun en el duelo, Marta enseña a decirle a Jesús lo que duele y a seguir creyendo.',
  },
  lazaro: {
    quienFue: 'Amigo de Jesús, hermano de Marta y María. Murió y, cuatro días después, Jesús lo llamó fuera del sepulcro y le devolvió la vida.',
    ensenanza: 'Jesús llora con los que lloran y tiene poder sobre la muerte. No hay situación tan cerrada que Él no pueda abrir.',
  },
  isabel: {
    quienFue: 'Esposa de Zacarías y pariente de María. Ya anciana y sin hijos, concibió a Juan el Bautista. Al recibir a María exclamó: "Bendita tú entre las mujeres".',
    ensenanza: 'Para Dios no hay nada imposible ni es demasiado tarde. Y enseña a alegrarse de corazón por el bien que Dios hace en otros.',
  },
  zacarias_padre: {
    quienFue: 'Sacerdote del templo, esposo de Isabel. Dudó del anuncio del ángel y quedó mudo hasta que nació su hijo Juan; entonces alabó a Dios con el cántico del "Bendito".',
    ensenanza: 'Hasta los más fieles dudan. Dios no lo desechó: cumplió su promesa y convirtió su silencio en alabanza.',
  },
  jose_arimatea: {
    quienFue: 'Miembro respetado del Consejo judío y discípulo de Jesús en secreto. Tras la crucifixión pidió el cuerpo a Pilato y lo puso en su propio sepulcro nuevo.',
    ensenanza: 'Llega un momento en que hay que dar la cara. José arriesgó su posición cuando todos habían huido.',
  },

  // ── Juan el Bautista y los apóstoles ──
  juan_bautista: {
    quienFue: 'Hijo de Zacarías e Isabel, pariente de Jesús. Predicó en el desierto la conversión, bautizó en el Jordán y señaló a Jesús como el Cordero de Dios. Murió decapitado por orden de Herodes.',
    ensenanza: '"Es necesario que Él crezca y que yo disminuya." Enseña a decir la verdad aunque cueste y a no ponerse uno mismo en el centro.',
  },
  juan_apostol: {
    quienFue: 'Pescador, hijo de Zebedeo y hermano de Santiago. Uno de los tres más cercanos a Jesús, estuvo al pie de la cruz y recibió a María como madre. La tradición le atribuye el cuarto evangelio, tres cartas y el Apocalipsis.',
    ensenanza: 'El que fue llamado "hijo del trueno" terminó siendo el apóstol del amor. Estar cerca de Jesús transforma el carácter.',
  },
  pedro: {
    quienFue: 'Simón, pescador de Galilea. Jesús lo llamó Pedro ("piedra") y lo puso al frente de los apóstoles. Lo negó tres veces, lloró, fue perdonado y dio la vida por Él en Roma.',
    ensenanza: 'Pedro cayó y se levantó. Dios no elige a los perfectos: perdona, vuelve a confiar y saca fuerza de la debilidad.',
  },
  pablo: {
    quienFue: 'Saulo de Tarso, fariseo que perseguía a los cristianos. Camino de Damasco se encontró con Cristo resucitado y se convirtió en el gran misionero de los pueblos no judíos. Escribió buena parte de las cartas del Nuevo Testamento.',
    ensenanza: 'Nadie está demasiado lejos para Dios: el perseguidor llegó a ser apóstol. Lo que eras no decide lo que puedes llegar a ser.',
  },
  santiago_mayor: {
    quienFue: 'Pescador, hijo de Zebedeo y hermano de Juan. Con Pedro y Juan presenció la transfiguración y la agonía en el huerto. Fue el primer apóstol mártir, por orden de Herodes Agripa.',
    ensenanza: 'Pidió un puesto de honor y recibió una misión de servicio. Seguir a Jesús es beber su cáliz, no buscar privilegios.',
  },
  santiago_justo: {
    quienFue: 'Pariente de Jesús, llamado "el hermano del Señor". Dirigió la Iglesia de Jerusalén y tuvo un papel decisivo en el primer concilio. Se le atribuye la carta de Santiago.',
    ensenanza: 'Insistió en que la fe se demuestra con obras: de nada sirve decir "creo" si no se ayuda al hermano necesitado.',
  },
  andres: {
    quienFue: 'Pescador, hermano de Simón Pedro. Fue discípulo de Juan el Bautista y de los primeros en seguir a Jesús; enseguida fue a buscar a su hermano para llevárselo.',
    ensenanza: 'Andrés es el que presenta a otros a Jesús. No hace falta ser el más famoso: basta con llevar a uno.',
  },
  felipe_apostol: {
    quienFue: 'Apóstol nacido en Betsaida. Jesús le dijo "Sígueme" y él fue a buscar a Natanael. En la última cena pidió: "Señor, muéstranos al Padre".',
    ensenanza: 'Su invitación sigue siendo la mejor: "Ven y lo verás". La fe no se impone, se propone.',
  },
  felipe_diacono: {
    quienFue: 'Uno de los siete elegidos para atender a los pobres de la primera comunidad. Predicó en Samaria y bautizó a un funcionario etíope a quien explicó las Escrituras en el camino.',
    ensenanza: 'Se acercó, preguntó "¿entiendes lo que lees?" y acompañó. Evangelizar es caminar al lado del otro.',
  },
  tomas: {
    quienFue: 'Apóstol que no creyó en la resurrección hasta ver y tocar las llagas de Jesús. Al verlo exclamó: "¡Señor mío y Dios mío!".',
    ensenanza: 'Dudar no es pecado; quedarse en la duda sí empobrece. Jesús no lo rechazó: salió a su encuentro. "Dichosos los que creen sin haber visto."',
  },
  mateo: {
    quienFue: 'Cobrador de impuestos, mal visto por su pueblo, también llamado Leví. Jesús lo miró y le dijo "Sígueme"; él lo dejó todo. La tradición le atribuye el primer evangelio.',
    ensenanza: 'Jesús llama a quien nadie esperaría. Una mirada suya basta para empezar de nuevo.',
  },
  judas_iscariote: {
    quienFue: 'Uno de los doce apóstoles, encargado de la bolsa común. Entregó a Jesús por treinta monedas de plata y, desesperado, se quitó la vida.',
    ensenanza: 'Estar cerca de Jesús no basta si el corazón se va por otro lado. Y su tragedia final fue no creer en el perdón: Pedro también falló, pero volvió.',
  },
  bernabe: {
    quienFue: 'Levita de Chipre cuyo nombre significa "el que anima". Vendió su campo para la comunidad, respaldó a Pablo recién convertido y lo acompañó en su primer viaje misionero.',
    ensenanza: 'Bernabé creyó en Pablo cuando todos le temían. Animar y dar una segunda oportunidad puede cambiar una vida.',
  },
  timoteo: {
    quienFue: 'Joven discípulo de padre griego y madre judía, formado en la fe por su madre y su abuela. Fue el colaborador de más confianza de Pablo, quien le escribió dos cartas.',
    ensenanza: '"Que nadie te desprecie por ser joven." La fe que se siembra en casa da fruto, y la juventud no es excusa para no servir.',
  },
  tito: {
    quienFue: 'Colaborador griego de Pablo, a quien encargó misiones delicadas y la organización de la Iglesia en Creta. Recibió una de sus cartas.',
    ensenanza: 'Hay tareas difíciles que alguien tiene que asumir con paciencia. Tito enseña a ser digno de confianza.',
  },
  esteban: {
    quienFue: 'Uno de los siete servidores de la primera comunidad, lleno de fe y del Espíritu Santo. Fue apedreado por anunciar a Cristo y murió perdonando a quienes lo mataban. Es el primer mártir.',
    ensenanza: 'Murió como su Maestro: orando y perdonando. La fe verdadera se nota en cómo se trata a quien hace daño.',
  },
  silas: {
    quienFue: 'Profeta de la Iglesia de Jerusalén y compañero de Pablo en su segundo viaje. Encarcelados en Filipos, cantaban himnos a medianoche cuando un terremoto abrió las puertas.',
    ensenanza: 'Cantar en la cárcel: alabar a Dios en medio de la prueba abre puertas que parecían cerradas.',
  },
  marcos: {
    quienFue: 'Juan Marcos, primo de Bernabé. Abandonó a Pablo en el primer viaje, pero más tarde fue su ayudante y el de Pedro. La tradición le atribuye el segundo evangelio.',
    ensenanza: 'Empezó fallando y terminó siendo evangelista. Un mal comienzo no impide un buen final.',
  },
  apolo: {
    quienFue: 'Judío de Alejandría, elocuente y conocedor de las Escrituras. Predicó en Éfeso y en Corinto después de ser instruido mejor por Priscila y Aquila.',
    ensenanza: 'Siendo brillante, se dejó enseñar. Y Pablo recuerda: uno siembra, otro riega, pero es Dios quien hace crecer.',
  },
  nicodemo: {
    quienFue: 'Fariseo y jefe judío que fue a ver a Jesús de noche. Escuchó que hay que "nacer de nuevo", lo defendió ante el Consejo y ayudó a sepultarlo.',
    ensenanza: 'Su fe empezó a escondidas y fue creciendo hasta mostrarse. Dios respeta el ritmo de quien busca con sinceridad.',
  },
  zaqueo: {
    quienFue: 'Jefe de cobradores de impuestos de Jericó, rico y de baja estatura. Se subió a un árbol para ver a Jesús, quien se invitó a su casa; prometió devolver lo robado y dar la mitad a los pobres.',
    ensenanza: 'Quien quiere ver a Jesús encuentra la manera, y Jesús lo ve primero. La conversión de verdad llega hasta el bolsillo.',
  },
  cornelio: {
    quienFue: 'Centurión romano de Cesarea, hombre piadoso y generoso. Guiado por un ángel mandó llamar a Pedro y fue bautizado con toda su casa: el primer pagano en entrar a la Iglesia.',
    ensenanza: 'Dios no hace diferencia entre personas. El Evangelio es para todos, sin importar el origen.',
  },

  // ── Autoridades del tiempo de Jesús ──
  pilato: {
    quienFue: 'Gobernador romano de Judea. Reconoció que Jesús era inocente, pero cedió a la presión de la multitud, se lavó las manos y lo mandó crucificar.',
    ensenanza: 'Saber lo que es justo y no hacerlo por miedo también es culpa. Lavarse las manos no deja limpia la conciencia.',
  },
  herodes_grande: {
    quienFue: 'Rey de Judea al nacer Jesús. Al oír de los magos que había nacido un rey, mandó matar a los niños de Belén para eliminarlo.',
    ensenanza: 'El miedo a perder el poder vuelve cruel. Quien pone su trono por encima de todo acaba haciendo daño a los inocentes.',
  },
  herodes_antipas: {
    quienFue: 'Hijo de Herodes el Grande, gobernante de Galilea. Encarceló y mandó decapitar a Juan el Bautista por un juramento imprudente, y se burló de Jesús durante la pasión.',
    ensenanza: 'Por no quedar mal ante sus invitados, mató a un justo. Cuidado con las promesas hechas por orgullo.',
  },
  caifas: {
    quienFue: 'Sumo sacerdote que presidió el Consejo que condenó a Jesús. Dijo que convenía que un solo hombre muriera por el pueblo.',
    ensenanza: 'Se puede defender la religión y cerrarse a Dios al mismo tiempo. El cargo no garantiza tener la razón.',
  },
  barrabas: {
    quienFue: 'Preso acusado de rebelión y homicidio. La multitud pidió a Pilato que lo soltara a él y crucificara a Jesús.',
    ensenanza: 'El culpable quedó libre y el inocente murió en su lugar. En Barrabás estamos todos: Cristo ocupó nuestro sitio.',
  },

  // ── Los orígenes y los patriarcas ──
  adan: {
    quienFue: 'El primer ser humano, formado por Dios del polvo de la tierra y puesto en el jardín del Edén. Desobedeció a Dios y con él entraron el pecado y la muerte.',
    ensenanza: 'Somos barro con aliento de Dios: frágiles y a la vez muy valiosos. Y Dios, aun después de la caída, sale a buscar: "¿Dónde estás?".',
  },
  eva: {
    quienFue: 'La primera mujer, compañera de Adán y "madre de todos los que viven". Cedió a la tentación de la serpiente y comió del fruto prohibido.',
    ensenanza: 'La tentación siempre promete más de lo que da. Pero Dios no la abandonó: allí mismo anunció una victoria futura sobre el mal.',
  },
  cain: {
    quienFue: 'Hijo mayor de Adán y Eva, labrador. Por envidia mató a su hermano Abel y luego respondió a Dios: "¿Acaso soy yo el guardián de mi hermano?".',
    ensenanza: 'La envidia que no se frena termina en violencia. Y la respuesta a su pregunta es sí: somos responsables unos de otros.',
  },
  abel: {
    quienFue: 'Segundo hijo de Adán y Eva, pastor. Ofreció a Dios lo mejor de su rebaño y fue asesinado por su hermano Caín. Es el primer justo que muere en la Biblia.',
    ensenanza: 'Dios mira el corazón con que se le ofrece algo. La sangre del inocente no queda olvidada delante de Él.',
  },
  noe: {
    quienFue: 'Hombre justo en medio de una generación corrompida. Por orden de Dios construyó el arca y salvó a su familia y a los animales del diluvio. Dios hizo con él una alianza, sellada con el arco iris.',
    ensenanza: 'Obedeció cuando aún no caía una gota. La fe es hacer hoy lo que Dios pide, aunque los demás se burlen.',
  },
  abraham: {
    quienFue: 'Dios lo llamó a dejar su tierra y le prometió una descendencia tan numerosa como las estrellas. Creyó siendo anciano y sin hijos, y estuvo dispuesto a entregar a Isaac. Judíos, cristianos y musulmanes lo reconocen como padre en la fe.',
    ensenanza: 'Salió sin saber adónde iba, fiándose de Dios. La fe es ponerse en camino con una promesa en la mano.',
  },
  sara_abraham: {
    quienFue: 'Esposa de Abraham. Estéril y ya anciana, se rió cuando oyó que tendría un hijo; al año dio a luz a Isaac, cuyo nombre significa "risa".',
    ensenanza: 'Dios convirtió su risa de incredulidad en risa de alegría. Nada es demasiado difícil para el Señor.',
  },
  lot: {
    quienFue: 'Sobrino de Abraham. Eligió vivir en la fértil llanura de Sodoma y fue rescatado por los ángeles antes de que la ciudad fuera destruida; su esposa miró atrás y quedó convertida en estatua de sal.',
    ensenanza: 'Elegir solo por conveniencia puede salir caro. Y cuando Dios saca de algo, no hay que mirar atrás.',
  },
  agar: {
    quienFue: 'Esclava egipcia de Sara y madre de Ismael, hijo de Abraham. Dos veces en el desierto, sola y sin salida, Dios la vio y la socorrió.',
    ensenanza: 'Ella llamó a Dios "el que me ve". Nadie es invisible para Él, ni siquiera el más despreciado.',
  },
  ismael: {
    quienFue: 'Hijo de Abraham y de Agar. Fue enviado al desierto con su madre, pero Dios oyó su llanto, lo protegió y prometió hacer de él una gran nación.',
    ensenanza: 'Su nombre significa "Dios escucha". Dios oye el llanto de los que quedan fuera.',
  },
  melquisedec: {
    quienFue: 'Rey de Salem y sacerdote del Dios Altísimo. Salió al encuentro de Abraham, ofreció pan y vino y lo bendijo. La carta a los Hebreos ve en él una figura de Cristo sacerdote.',
    ensenanza: 'Aparece un momento y deja pan, vino y bendición: un anuncio de la Eucaristía muchos siglos antes.',
  },
  isaac: {
    quienFue: 'El hijo de la promesa, nacido de Abraham y Sara en su vejez. Estuvo a punto de ser sacrificado en el monte Moria; fue esposo de Rebeca y padre de Esaú y Jacob.',
    ensenanza: 'Isaac es la prueba de que Dios cumple. Y en el monte, Dios mismo proveyó: lo que Él pide, Él lo da.',
  },
  rebeca: {
    quienFue: 'Esposa de Isaac, elegida junto a un pozo por su generosidad al dar de beber a un forastero y a sus camellos. Madre de los gemelos Esaú y Jacob.',
    ensenanza: 'Un gesto sencillo de servicio le cambió la vida. Pero su preferencia por un hijo dividió a la familia: el favoritismo hiere.',
  },
  jacob: {
    quienFue: 'Hijo de Isaac y hermano gemelo de Esaú, a quien arrebató la bendición con engaño. Luchó con Dios y recibió el nombre de Israel; de sus doce hijos nacieron las doce tribus. Por eso su nombre designa también a todo el pueblo.',
    ensenanza: 'Dios trabajó con un tramposo hasta hacerlo padre de un pueblo. Nadie está tan torcido que Dios no pueda enderezarlo.',
  },
  esau: {
    quienFue: 'Hermano gemelo de Jacob, cazador. Vendió sus derechos de hijo mayor por un plato de lentejas y perdió la bendición; años después recibió a su hermano con un abrazo.',
    ensenanza: 'No cambies lo que vale mucho por un gusto del momento. Y su abrazo enseña que el rencor se puede soltar.',
  },
  laban: {
    quienFue: 'Hermano de Rebeca y padre de Lía y Raquel. Hizo trabajar a Jacob catorce años por sus hijas y le cambió el salario muchas veces.',
    ensenanza: 'El que engaña termina encontrando quien lo engañe. La astucia sin honradez no da paz a nadie.',
  },
  raquel: {
    quienFue: 'Hija menor de Labán y esposa amada de Jacob, quien trabajó catorce años por ella. Tardó en tener hijos; fue madre de José y murió al dar a luz a Benjamín.',
    ensenanza: 'El amor verdadero sabe esperar. Y su larga espera recuerda que los hijos son un don, no un derecho.',
  },
  lia: {
    quienFue: 'Hija mayor de Labán y primera esposa de Jacob, dada a él con engaño. Menos amada que su hermana, fue madre de seis de las doce tribus, entre ellas Judá, de la que nacería el Mesías.',
    ensenanza: 'Dios vio que no era amada y la bendijo. De la que nadie eligió salió la línea del Salvador.',
  },
  jose_patriarca: {
    quienFue: 'Hijo preferido de Jacob. Sus hermanos, por envidia, lo vendieron como esclavo; en Egipto fue encarcelado injustamente y llegó a ser gobernador. Durante la gran hambre salvó a su familia y perdonó a sus hermanos.',
    ensenanza: '"Ustedes pensaron hacerme mal, pero Dios lo cambió en bien." Dios escribe derecho en renglones torcidos, y perdonar libera.',
  },
  juda_patriarca: {
    quienFue: 'Cuarto hijo de Jacob y Lía. Propuso vender a José en vez de matarlo y, años después, se ofreció como esclavo en lugar de su hermano Benjamín. De su tribu nacieron David y Jesús.',
    ensenanza: 'El que antes vendió a un hermano terminó dando la vida por otro. Las personas pueden cambiar.',
  },
  benjamin_patriarca: {
    quienFue: 'El hijo menor de Jacob y de Raquel, que murió al darlo a luz. Fue muy protegido por su padre y pieza clave en el reencuentro de José con sus hermanos.',
    ensenanza: 'Cuidar del más pequeño fue la prueba que mostró que los hermanos habían cambiado.',
  },
  ruben: {
    quienFue: 'El hijo mayor de Jacob. Intentó salvar a José de sus hermanos, pero no tuvo la firmeza para impedir que lo vendieran, y perdió el lugar de primogénito por una falta grave.',
    ensenanza: 'Las buenas intenciones a medias no alcanzan. Hacer el bien pide decisión.',
  },

  // ── El éxodo y la conquista ──
  moises: {
    quienFue: 'Hebreo criado en el palacio del faraón. Dios lo llamó desde una zarza ardiente para liberar a Israel de la esclavitud de Egipto; cruzó el mar Rojo, recibió los Diez Mandamientos en el Sinaí y guió al pueblo cuarenta años por el desierto.',
    ensenanza: 'Puso excusas ("no sé hablar") y Dios lo usó igual. Dios no llama a los capaces: capacita a los que llama.',
  },
  aaron: {
    quienFue: 'Hermano mayor de Moisés y su portavoz ante el faraón. Fue el primer sumo sacerdote de Israel, aunque cedió ante el pueblo y fabricó el becerro de oro.',
    ensenanza: 'Por quedar bien con la gente, hizo lo que sabía que estaba mal. Hasta los líderes necesitan ser perdonados.',
  },
  miriam: {
    quienFue: 'Hermana de Moisés y de Aarón (en esta Biblia se la llama María). De niña vigiló la canasta de su hermano en el río; después del paso del mar Rojo dirigió el canto y la danza de las mujeres.',
    ensenanza: 'Su canto es de los más antiguos de la Biblia: después de la liberación viene la alabanza.',
  },
  josue: {
    quienFue: 'Ayudante de Moisés y uno de los dos exploradores que confiaron en Dios. Tras la muerte de Moisés, hizo cruzar el Jordán al pueblo, tomó Jericó y repartió la tierra prometida.',
    ensenanza: '"Sé fuerte y valiente, porque el Señor tu Dios estará contigo." Y su decisión: "Mi familia y yo serviremos al Señor".',
  },
  caleb: {
    quienFue: 'Uno de los doce exploradores enviados a Canaán. Solo él y Josué confiaron en que Dios les daría la tierra; a los ochenta y cinco años pidió conquistar la montaña que se le había prometido.',
    ensenanza: 'Mientras los demás veían gigantes, él veía a Dios. La edad no jubila la fe.',
  },
  eleazar: {
    quienFue: 'Hijo de Aarón y su sucesor como sumo sacerdote. Acompañó a Moisés y luego a Josué, y ayudó a repartir la tierra entre las tribus.',
    ensenanza: 'Sirvió con constancia al lado de dos grandes líderes. La fidelidad discreta también sostiene a un pueblo.',
  },
  finees: {
    quienFue: 'Nieto de Aarón, sacerdote celoso de la fidelidad a Dios. Su intervención detuvo una plaga que castigaba la idolatría del pueblo.',
    ensenanza: 'Tomarse en serio a Dios cuando todos lo toman a la ligera. Hoy ese celo se vive con la palabra y el ejemplo.',
  },
  balaam: {
    quienFue: 'Adivino extranjero contratado por el rey de Moab para maldecir a Israel. Su burra vio al ángel antes que él, y cada vez que abrió la boca solo pudo bendecir.',
    ensenanza: 'Nadie puede maldecir lo que Dios bendice. Y a veces Dios habla por donde menos se espera.',
  },
  core: {
    quienFue: 'Levita que encabezó una rebelión contra Moisés y Aarón, reclamando para sí el sacerdocio. La tierra se abrió y se lo tragó con sus seguidores.',
    ensenanza: 'La ambición disfrazada de justicia divide y destruye. Cada uno tiene su lugar y su tarea.',
  },
  rahab: {
    quienFue: 'Mujer de mala fama que vivía en la muralla de Jericó. Escondió a los espías de Israel porque creyó en su Dios, y fue salvada con su familia. Aparece entre los antepasados de Jesús.',
    ensenanza: 'Dios no mira el pasado de quien confía en Él. Una mujer despreciada entró en la familia del Salvador.',
  },

  // ── Los jueces ──
  debora: {
    quienFue: 'Profetisa y jueza de Israel, que resolvía los pleitos del pueblo bajo una palmera. Animó al general Barac y condujo a Israel a la victoria sobre los cananeos.',
    ensenanza: 'Dios confía misiones grandes a quien Él quiere. Su valor contagió a un ejército que tenía miedo.',
  },
  gedeon: {
    quienFue: 'Campesino del clan más pobre, a quien Dios llamó mientras trillaba a escondidas. Con solo trescientos hombres, antorchas y trompetas, derrotó al enorme ejército de Madián.',
    ensenanza: 'Dios redujo su ejército para que quedara claro quién daba la victoria. Lo poco, en manos de Dios, alcanza.',
  },
  abimelec_gedeon: {
    quienFue: 'Hijo de Gedeón. Ambicioso, mató a sus hermanos para hacerse rey de Siquem, gobernó tres años con violencia y murió cuando una mujer le lanzó una piedra de molino.',
    ensenanza: 'El poder que se toma con sangre termina mal. El que a hierro mata, a hierro muere.',
  },
  jefte: {
    quienFue: 'Hijo rechazado por su familia, que vivía como jefe de una banda. El pueblo lo buscó para que lo defendiera y fue juez de Israel; hizo un voto precipitado que le costó muy caro.',
    ensenanza: 'Dios se vale de los rechazados. Pero ojo con las promesas hechas a la carrera: hay que pensar antes de jurar.',
  },
  sanson: {
    quienFue: 'Juez consagrado a Dios desde antes de nacer, de fuerza extraordinaria. Se dejó seducir por Dalila, perdió su fuerza y la vista, y murió derribando el templo de los filisteos.',
    ensenanza: 'Tenía un don enorme y poco dominio de sí mismo. La fuerza sin disciplina se pierde; aun así, Dios escuchó su última oración.',
  },
  dalila: {
    quienFue: 'Mujer filistea amada por Sansón. Sobornada por los jefes de su pueblo, insistió hasta arrancarle el secreto de su fuerza y lo entregó.',
    ensenanza: 'No todo el que dice querer, quiere bien. Hay que cuidar a quién se le abre el corazón.',
  },
  rut: {
    quienFue: 'Mujer moabita, viuda joven, que no quiso abandonar a su suegra Noemí: "Tu pueblo será mi pueblo y tu Dios será mi Dios". Se casó con Booz y fue bisabuela del rey David.',
    ensenanza: 'La lealtad de una extranjera la hizo parte de la historia de la salvación. El amor fiel nunca es en vano.',
  },
  noemi: {
    quienFue: 'Mujer de Belén que emigró por el hambre y perdió en tierra extranjera a su esposo y a sus dos hijos. Volvió amargada, pero acompañada por su nuera Rut, y terminó con un nieto en los brazos.',
    ensenanza: 'Creyó que Dios la había dejado vacía y Él le tenía preparada una alegría. No des la historia por terminada.',
  },
  booz: {
    quienFue: 'Hombre rico y recto de Belén. Protegió a Rut cuando recogía espigas en su campo, la trató con respeto y se casó con ella. Fue bisabuelo de David.',
    ensenanza: 'Usó su riqueza y su posición para proteger, no para aprovecharse. Así se reconoce a un hombre bueno.',
  },
  eli: {
    quienFue: 'Sacerdote del santuario de Siló y maestro del niño Samuel. Fue un hombre bueno, pero no corrigió a sus hijos, que abusaban de su cargo.',
    ensenanza: 'Enseñó a Samuel a decir "Habla, Señor, que tu siervo escucha". Pero callar ante las faltas de los hijos no es amor.',
  },
  ana_samuel: {
    quienFue: 'Mujer estéril que lloraba y oraba en el santuario pidiendo un hijo. Dios le concedió a Samuel, y ella, cumpliendo su promesa, lo entregó al servicio del Señor.',
    ensenanza: 'Derramó su alma ante Dios sin disimulos, y supo devolverle lo que recibió. Así se ora y así se agradece.',
  },
  samuel: {
    quienFue: 'Hijo de Ana, criado en el santuario. Escuchó la voz de Dios siendo niño, fue profeta y el último juez de Israel, y ungió a los dos primeros reyes: Saúl y David.',
    ensenanza: '"Habla, Señor, que tu siervo escucha." Y la lección que recibió al elegir a David: Dios no mira las apariencias, mira el corazón.',
  },

  // ── Los reyes ──
  saul: {
    quienFue: 'El primer rey de Israel, alto y apuesto, ungido por Samuel. Empezó bien, pero desobedeció a Dios, se llenó de envidia hacia David y lo persiguió durante años. Murió en batalla.',
    ensenanza: 'Empezar bien no garantiza terminar bien. La envidia y la desobediencia le quitaron todo lo que tenía.',
  },
  jonatan_saul: {
    quienFue: 'Hijo del rey Saúl y heredero del trono. Fue amigo íntimo de David, lo defendió ante su padre y le salvó la vida, aun sabiendo que David sería rey en su lugar.',
    ensenanza: 'El modelo de la amistad verdadera: alegrarse del bien del amigo, aunque uno pierda con ello.',
  },
  david: {
    quienFue: 'El menor de los hijos de Jesé, pastor de Belén. Venció a Goliat, fue el gran rey de Israel, hizo de Jerusalén su capital y compuso muchos salmos. Cometió pecados graves, se arrepintió de corazón, y Dios le prometió que de su descendencia nacería el Mesías.',
    ensenanza: 'No fue grande por no caer, sino por saber volver a Dios. "Crea en mí, oh Dios, un corazón puro."',
  },
  goliat: {
    quienFue: 'Guerrero filisteo de enorme estatura que desafió durante cuarenta días al ejército de Israel. Cayó derribado por la piedra de la honda de un muchacho llamado David.',
    ensenanza: 'Los gigantes que asustan a todos caen ante quien confía en Dios. No midas el problema: mide a tu Dios.',
  },
  jese: {
    quienFue: 'Hombre de Belén, nieto de Rut y padre de ocho hijos. Presentó a siete ante Samuel y se olvidó del menor, David, que cuidaba las ovejas.',
    ensenanza: 'Al que su propio padre no tomó en cuenta, Dios lo eligió. De su tronco brotaría el Mesías.',
  },
  abner: {
    quienFue: 'Primo de Saúl y jefe de su ejército. Tras la muerte del rey sostuvo a su hijo en el trono y luego pactó con David, pero fue asesinado a traición por Joab.',
    ensenanza: 'Las venganzas personales envenenan hasta los acuerdos de paz.',
  },
  joab: {
    quienFue: 'Sobrino de David y jefe de su ejército. Valiente y eficaz, pero violento y sin escrúpulos: mató a sus rivales y ejecutó la orden contra Urías.',
    ensenanza: 'Ser capaz no es lo mismo que ser justo. El fin no justifica los medios.',
  },
  absalon: {
    quienFue: 'Hijo de David, apuesto y ambicioso. Se ganó al pueblo con halagos, se rebeló contra su padre y murió colgado de un árbol por su cabellera. David lloró: "¡Hijo mío Absalón!".',
    ensenanza: 'El dolor de un padre por el hijo que se pierde es imagen del corazón de Dios, que nunca deja de amar.',
  },
  betsabe: {
    quienFue: 'Esposa de Urías. David la tomó y mandó matar a su marido. Más tarde fue esposa del rey y madre de Salomón, y aparece entre los antepasados de Jesús.',
    ensenanza: 'De una historia de pecado y dolor, Dios sacó un futuro. Él puede rehacer lo que el mal rompió.',
  },
  urias: {
    quienFue: 'Soldado hitita, leal a David y a sus compañeros. No quiso descansar en su casa mientras el ejército estaba en campaña. David lo envió al frente para que muriera.',
    ensenanza: 'El hombre más recto de esta historia fue la víctima. Dios no olvida al inocente ni deja pasar la injusticia.',
  },
  natan: {
    quienFue: 'Profeta de la corte de David. Le anunció que su dinastía duraría para siempre y, tras su pecado, lo enfrentó con una parábola: "Ese hombre eres tú".',
    ensenanza: 'Hace falta valor para decirle la verdad a un poderoso, y humildad para recibirla. Un amigo de verdad no adula.',
  },
  sadoc: {
    quienFue: 'Sacerdote fiel a David durante la rebelión de Absalón. Ungió rey a Salomón y sus descendientes sirvieron en el templo.',
    ensenanza: 'Permaneció leal cuando era más fácil cambiar de bando.',
  },
  salomon: {
    quienFue: 'Hijo de David y Betsabé. Pidió a Dios sabiduría en vez de riquezas y fue famoso por ella; construyó el templo de Jerusalén. Al final, sus muchas esposas extranjeras desviaron su corazón hacia otros dioses.',
    ensenanza: 'Pedir sabiduría antes que cualquier otra cosa. Y ni el más sabio está a salvo si descuida su corazón.',
  },
  roboam: {
    quienFue: 'Hijo y sucesor de Salomón. Despreció el consejo de los ancianos, trató al pueblo con dureza y provocó que diez tribus se separaran: el reino quedó dividido.',
    ensenanza: 'La soberbia de un momento rompió lo que costó generaciones construir. Escucha a quien tiene experiencia.',
  },
  jeroboam: {
    quienFue: 'Funcionario de Salomón que se convirtió en primer rey del reino del norte. Para que el pueblo no fuera a Jerusalén, hizo dos becerros de oro y llevó a Israel a la idolatría.',
    ensenanza: 'Usar la religión para asegurar el propio poder es un pecado que arrastra a muchos.',
  },
  asa: {
    quienFue: 'Rey de Judá que quitó los ídolos y buscó al Señor de corazón. En su vejez confió más en alianzas y en médicos que en Dios.',
    ensenanza: 'La fe hay que cuidarla hasta el final: empezar confiando en Dios y terminar confiando solo en uno mismo es un riesgo real.',
  },
  josafat: {
    quienFue: 'Rey de Judá, hijo de Asá. Mandó enseñar la ley de Dios por todo el país y, ante un ejército enorme, oró: "No sabemos qué hacer, pero nuestros ojos están puestos en ti".',
    ensenanza: 'Cuando no sepas qué hacer, mira a Dios. La batalla no es tuya, sino de Él.',
  },
  ahab: {
    quienFue: 'Rey de Israel, casado con Jezabel. Promovió el culto a Baal, persiguió a los profetas y se quedó con la viña de Nabot después de que lo mataran. El profeta Elías lo enfrentó.',
    ensenanza: 'Se dejó llevar por malas compañías y por el capricho. Lo que se obtiene con injusticia no trae paz.',
  },
  jezabel: {
    quienFue: 'Princesa fenicia, esposa del rey Ahab. Impuso el culto a Baal, mandó matar a los profetas del Señor y tramó la muerte de Nabot para robarle su viña.',
    ensenanza: 'Su nombre quedó como símbolo de la maldad que manipula. El poder sin temor de Dios no respeta nada.',
  },
  jehu: {
    quienFue: 'Oficial ungido rey de Israel por orden del profeta Eliseo. Acabó con la familia de Ahab y con el culto a Baal, pero con mucha violencia y sin corregir del todo la idolatría.',
    ensenanza: 'Hacer la obra de Dios a medias y con crueldad no es obedecerle. El celo sin misericordia se desvía.',
  },
  ezequias: {
    quienFue: 'Rey de Judá que renovó el culto y confió en Dios cuando el ejército asirio rodeó Jerusalén. Enfermo de muerte, oró llorando y Dios le concedió quince años más.',
    ensenanza: 'Llevó al templo la carta de amenaza y la extendió delante del Señor. Así se enfrentan los problemas: primero, orando.',
  },
  josias: {
    quienFue: 'Rey de Judá desde los ocho años. Al encontrarse en el templo el libro de la ley, rasgó sus vestidos, renovó la alianza y limpió el país de ídolos.',
    ensenanza: 'Redescubrir la Palabra de Dios puede cambiar un pueblo entero. Nunca es tarde para una renovación.',
  },
  sedequias: {
    quienFue: 'Último rey de Judá. Consultaba en secreto al profeta Jeremías, pero por miedo a sus ministros no le hizo caso. Vio caer Jerusalén y fue llevado preso a Babilonia.',
    ensenanza: 'Sabía lo que debía hacer y no se atrevió. El miedo al qué dirán puede costar todo.',
  },

  // ── Los profetas ──
  elias: {
    quienFue: 'Profeta del reino del norte en tiempos de Ahab. Desafió a los profetas de Baal en el monte Carmelo, fue alimentado en el desierto y encontró a Dios en una brisa suave. Fue llevado al cielo en un carro de fuego.',
    ensenanza: 'Hasta el más valiente se desanima: pidió morirse y Dios le dio pan y descanso. Dios habla en el silencio, no en el estruendo.',
  },
  eliseo: {
    quienFue: 'Labrador que dejó sus bueyes para seguir a Elías y heredó su espíritu. Hizo numerosos milagros: multiplicó aceite y panes, devolvió la vida a un niño y sanó de lepra a Naamán.',
    ensenanza: 'Dios actúa en lo cotidiano y cuida de los pobres. Y a Naamán le bastó algo simple: obedecer y bañarse en el río.',
  },
  isaias: {
    quienFue: 'Profeta de Jerusalén que vio la santidad de Dios y respondió: "Aquí estoy, envíame". Anunció al Emmanuel, "Dios con nosotros", y al Siervo que carga con nuestros dolores.',
    ensenanza: 'Es el profeta de la esperanza: el pueblo que caminaba en tinieblas vio una gran luz. Dios consuela a su pueblo.',
  },
  jeremias: {
    quienFue: 'Profeta llamado muy joven, a quien Dios dijo: "Antes de formarte en el vientre te conocí". Anunció durante cuarenta años la caída de Jerusalén; fue rechazado, encarcelado y arrojado a un pozo.',
    ensenanza: 'Ser fiel no siempre trae aplausos. Y aun así anunció una alianza nueva, escrita en el corazón.',
  },
  baruc: {
    quienFue: 'Secretario y amigo fiel de Jeremías. Puso por escrito sus profecías y volvió a escribirlas cuando el rey quemó el rollo. Un libro de la Biblia lleva su nombre.',
    ensenanza: 'La Palabra de Dios no se quema: lo que el rey destruyó, se volvió a escribir. Servir detrás de otro también es misión.',
  },
  ezequiel: {
    quienFue: 'Sacerdote y profeta entre los desterrados de Babilonia. Tuvo visiones grandiosas, como la del valle de huesos secos que vuelven a la vida.',
    ensenanza: 'Donde solo se ven huesos secos, Dios puede dar vida. "Les daré un corazón nuevo y un espíritu nuevo."',
  },
  daniel: {
    quienFue: 'Joven judío llevado cautivo a Babilonia, que sirvió en la corte sin renunciar a su fe. Interpretó sueños de reyes y salió ileso del foso de los leones por seguir orando a su Dios.',
    ensenanza: 'Se puede vivir en un ambiente contrario a la fe sin perderla. La fidelidad en lo pequeño prepara para la prueba grande.',
  },
  jonas: {
    quienFue: 'Profeta enviado a predicar a Nínive, capital enemiga. Huyó en un barco, pasó tres días en el vientre de un gran pez y, cuando por fin predicó, la ciudad se convirtió… y él se enojó.',
    ensenanza: 'No se puede huir de Dios. Y su misericordia es más grande que nuestros rencores: también ama a los que no queremos.',
  },
  job: {
    quienFue: 'Hombre justo y rico que lo perdió todo: bienes, hijos y salud. Discutió con sus amigos y se quejó ante Dios sin dejar de creer en Él. Al final, Dios le respondió y lo restableció.',
    ensenanza: 'El sufrimiento no siempre es castigo. Se le puede reclamar a Dios y seguir confiando: "El Señor me lo dio, el Señor me lo quitó".',
  },

  // ── Destierro, regreso y últimos libros ──
  nabucodonosor: {
    quienFue: 'Rey de Babilonia que conquistó Jerusalén, destruyó el templo y llevó al pueblo al destierro. Según el libro de Daniel, fue humillado hasta reconocer que solo Dios reina.',
    ensenanza: 'Los imperios más poderosos pasan. Ningún orgullo humano se sostiene delante de Dios.',
  },
  ciro: {
    quienFue: 'Rey de Persia que venció a Babilonia y permitió a los judíos volver a su tierra y reconstruir el templo. El profeta Isaías lo llama "ungido" del Señor.',
    ensenanza: 'Dios puede servirse hasta de quien no lo conoce para cumplir sus planes.',
  },
  dario: {
    quienFue: 'Rey de Persia. Confirmó el permiso de reconstruir el templo de Jerusalén y, en el libro de Daniel, pasó la noche en vela esperando que Dios lo salvara de los leones.',
    ensenanza: 'Aun quien firma una orden injusta puede reconocer al Dios vivo.',
  },
  artajerjes: {
    quienFue: 'Rey de Persia. Autorizó a Esdras a enseñar la ley en Jerusalén y a Nehemías, su copero, a reconstruir las murallas de la ciudad.',
    ensenanza: 'Dios abre puertas por medio de autoridades que uno no esperaría. Hay que atreverse a pedir.',
  },
  zorobabel: {
    quienFue: 'Descendiente de David y gobernador de los que volvieron del destierro. Dirigió la reconstrucción del templo en medio de la oposición y el desánimo.',
    ensenanza: '"No con ejército ni con fuerza, sino con mi Espíritu." Lo que empieza pequeño no hay que despreciarlo.',
  },
  esdras: {
    quienFue: 'Sacerdote y maestro de la ley que volvió de Babilonia. Leyó la Palabra de Dios ante todo el pueblo reunido, que lloraba al escucharla.',
    ensenanza: 'Un pueblo se reconstruye volviendo a la Palabra. "La alegría del Señor es nuestra fuerza."',
  },
  nehemias: {
    quienFue: 'Copero del rey de Persia. Al saber que Jerusalén estaba en ruinas lloró, oró, pidió permiso y reconstruyó las murallas en cincuenta y dos días, pese a burlas y amenazas.',
    ensenanza: 'Orar y trabajar: con una mano la herramienta y con la otra la defensa. La oración bien hecha termina en acción.',
  },
  ester: {
    quienFue: 'Joven judía huérfana que llegó a ser reina de Persia. Arriesgó su vida al presentarse ante el rey sin ser llamada para impedir el exterminio de su pueblo.',
    ensenanza: '"¿Quién sabe si para un momento como este llegaste a ser reina?" Tu lugar y tu momento no son casualidad.',
  },
  mardoqueo: {
    quienFue: 'Judío que crió a su prima Ester como a una hija. Se negó a arrodillarse ante Amán y animó a Ester a interceder por su pueblo.',
    ensenanza: 'No doblar la rodilla ante lo que no es Dios, cueste lo que cueste.',
  },
  aman: {
    quienFue: 'Primer ministro del rey de Persia. Por orgullo herido tramó el exterminio de todos los judíos y terminó colgado en la horca que había preparado para Mardoqueo.',
    ensenanza: 'El odio se vuelve contra quien lo alimenta. El que cava un hoyo para otro, cae en él.',
  },
  asuero: {
    quienFue: 'Rey de Persia, esposo de Ester. Firmó sin pensar el decreto contra los judíos y luego, al conocer la verdad, lo revirtió.',
    ensenanza: 'Las decisiones tomadas a la ligera pueden costar vidas. Hay que escuchar antes de firmar.',
  },
  tobit: {
    quienFue: 'Israelita piadoso desterrado en Nínive. Enterraba a los muertos de su pueblo arriesgando la vida; quedó ciego y pobre, pero siguió fiel, y Dios le devolvió la vista.',
    ensenanza: 'Hacer el bien aunque nadie lo agradezca. Dios ve las obras de misericordia hechas a escondidas.',
  },
  tobias: {
    quienFue: 'Hijo de Tobit. Viajó acompañado por el ángel Rafael, a quien no reconoció; se casó con Sara y, al volver, curó la ceguera de su padre.',
    ensenanza: 'Dios acompaña el camino aunque no se note. Y enseña a empezar el matrimonio orando juntos.',
  },
  sara_tobias: {
    quienFue: 'Joven que había perdido a siete maridos la noche de bodas y era insultada por ello. Desesperada, oró a Dios, y Él le envió a Tobías como esposo.',
    ensenanza: 'Su oración y la de Tobit subieron al cielo al mismo tiempo. Dios escucha a los que ya no pueden más.',
  },
  judit: {
    quienFue: 'Viuda hermosa y creyente de la ciudad de Betulia. Cuando los jefes ya querían rendirse, entró en el campamento enemigo y venció al general Holofernes, salvando a su pueblo.',
    ensenanza: 'Cuando todos se dan por vencidos, la fe de una sola persona puede cambiar la historia.',
  },
  holofernes: {
    quienFue: 'General del ejército de Nabucodonosor, enviado a someter a los pueblos. Sitió Betulia y murió a manos de Judit después de un banquete.',
    ensenanza: 'La soberbia y el exceso hacen bajar la guardia. El poderoso cayó por manos de quien despreciaba.',
  },
  susana: {
    quienFue: 'Mujer justa acusada falsamente de adulterio por dos jueces ancianos a quienes había rechazado. Iba a morir cuando el joven Daniel desenmascaró a los calumniadores.',
    ensenanza: 'Prefirió arriesgar la vida antes que pecar. Dios defiende al inocente y la verdad termina saliendo a la luz.',
  },
  matatias: {
    quienFue: 'Sacerdote de Modín. Se negó a ofrecer sacrificios a los ídolos como ordenaba el rey griego y, con sus cinco hijos, inició la resistencia del pueblo judío.',
    ensenanza: '"Yo y mis hijos seguiremos la alianza de nuestros padres." La fe se transmite con el ejemplo.',
  },
  judas_macabeo: {
    quienFue: 'Hijo de Matatías, apodado "Macabeo" (martillo). Dirigió la lucha contra los reyes griegos que prohibían la fe judía, recuperó Jerusalén y purificó el templo.',
    ensenanza: 'Defendió la libertad de adorar a Dios. Y oró por sus soldados caídos: de ahí aprendemos a rezar por los difuntos.',
  },
  jonatan_macabeo: {
    quienFue: 'Hermano de Judas Macabeo, a quien sucedió como jefe del pueblo y sumo sacerdote. Combinó la lucha con la diplomacia, hasta que fue capturado a traición.',
    ensenanza: 'Defender al pueblo exige también prudencia y negociación, no solo valentía.',
  },
  simon_macabeo: {
    quienFue: 'El último de los hermanos Macabeos. Logró la independencia de su pueblo y un tiempo de paz en que "cada uno se sentaba bajo su parra y su higuera".',
    ensenanza: 'La paz es el fruto por el que valió la pena tanto sacrificio. Hay que saber construirla y cuidarla.',
  },
  antioco: {
    quienFue: 'Nombre de varios reyes griegos de Siria. El más recordado, Antíoco IV Epífanes, profanó el templo de Jerusalén y prohibió bajo pena de muerte practicar la fe judía.',
    ensenanza: 'Ningún poder tiene derecho a obligar a alguien a renegar de su fe. La conciencia solo le pertenece a Dios.',
  },
  nicanor: {
    quienFue: 'General de los reyes de Siria enviado contra Judas Macabeo. Amenazó con destruir el templo y murió derrotado en batalla.',
    ensenanza: 'Quien se burla de lo sagrado no tiene la última palabra.',
  },
}
