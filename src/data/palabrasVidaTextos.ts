/**
 * Significado y mensaje de cada palabra de la sección "Palabras de vida".
 * La clave es el id de la palabra en palabrasVidaDatos.json (lo genera scripts/palabras-vida/generar.js).
 * significado = qué quiere decir en la Biblia; mensaje = qué nos dice hoy.
 */
export interface TextoPalabra { significado: string; mensaje: string }

export const TEXTOS_PALABRAS: Record<string, TextoPalabra> = {
  senor: {
    significado: 'Es el nombre con que la Biblia llama a Dios como dueño y guía de todo lo que existe. Decirle "Señor" es reconocer que la vida le pertenece a Él y no a nosotros.',
    mensaje: 'No estás solo ni a la deriva: tu vida tiene un Señor que te conoce por tu nombre. Ponlo de primero en tus decisiones y todo lo demás encontrará su lugar.',
  },
  dios: {
    significado: 'Es el Creador de todo, el Padre que hizo al ser humano por amor y lo busca siempre. La Biblia entera es la historia de Dios saliendo al encuentro de su pueblo.',
    mensaje: 'Dios no es una idea lejana: es Alguien que te espera. Háblale hoy con tus propias palabras; Él ya te estaba escuchando.',
  },
  hijo: {
    significado: 'En la Biblia los hijos son bendición y herencia de Dios. Jesús es el Hijo único del Padre, y por Él todos somos adoptados como hijos.',
    mensaje: 'Tu primer título no es lo que haces ni lo que tienes: es ser hijo de Dios. Nadie te lo puede quitar. Vive con esa dignidad y trata a los demás como hijos del mismo Padre.',
  },
  vida: {
    significado: 'Es el primer regalo de Dios. La Biblia habla de la vida de cada día y también de la vida plena y eterna que Jesús vino a darnos.',
    mensaje: 'Tu vida vale, incluso en los días en que no lo sientes. Cuídala, agradécela y gástala en lo que de verdad importa: amar y servir.',
  },
  muerte: {
    significado: 'Es el final de la vida terrena y la consecuencia del pecado. Pero en la Biblia no tiene la última palabra: Cristo la venció con su resurrección.',
    mensaje: 'Recordar que la vida es corta no es para asustarse, sino para vivir mejor. Reconcíliate hoy, ama hoy: la muerte es un paso, no el final.',
  },
  maldad: {
    significado: 'Es todo lo que daña al ser humano y lo aleja de Dios: la injusticia, la crueldad, el egoísmo. La Biblia la nombra sin disimulo para que aprendamos a rechazarla.',
    mensaje: 'El mal existe, pero no es más fuerte que el bien. No lo devuelvas: vence el mal haciendo el bien, empezando por tu propia casa.',
  },
  jesus: {
    significado: 'Su nombre significa "Dios salva". Es el Hijo de Dios hecho hombre, que vivió entre nosotros, murió en la cruz y resucitó para salvarnos.',
    mensaje: 'Jesús no es solo un personaje del pasado: está vivo y camina contigo. Conócelo en los evangelios y déjate encontrar por Él.',
  },
  padre: {
    significado: 'Es quien da la vida, cuida y enseña. Jesús nos reveló que Dios es Padre y nos enseñó a llamarlo así, con confianza de hijos.',
    mensaje: 'Si tuviste un buen padre, agradécelo; si no, recuerda que tienes un Padre que nunca abandona. Y si eres padre, sé reflejo de esa ternura.',
  },
  poder: {
    significado: 'En la Biblia el verdadero poder es de Dios, el Todopoderoso. Lo usa para crear, liberar y salvar, nunca para aplastar.',
    mensaje: 'El poder que Dios da es para servir, no para dominar. Usa lo que tienes —autoridad, dinero, influencia— para levantar a otros.',
  },
  servicio: {
    significado: 'Es ponerse a disposición de Dios y de los demás. Jesús mismo se llamó siervo y lavó los pies de sus discípulos.',
    mensaje: 'La grandeza se mide por cuánto sirves, no por cuántos te sirven. Hoy haz algo por alguien sin esperar nada a cambio.',
  },
  pecado: {
    significado: 'Es decirle "no" a Dios: romper la relación con Él, con los demás y con uno mismo. La Biblia lo toma en serio porque hiere a quien lo comete.',
    mensaje: 'Reconocer tu pecado no te hunde, te libera. No te quedes en la culpa: acércate al perdón de Dios, que es más grande que cualquier caída.',
  },
  ofrenda: {
    significado: 'Es lo que se le presenta a Dios en señal de gratitud y entrega. En la Biblia vale más por el corazón con que se da que por su tamaño.',
    mensaje: 'Dios no necesita tus cosas, te quiere a ti. Ofrécele tu tiempo, tu trabajo y tus cansancios: eso también es ofrenda.',
  },
  hermano: {
    significado: 'Son los de la propia sangre y también los de la misma fe. Para Jesús, hermano es todo el que hace la voluntad del Padre.',
    mensaje: 'Nadie se salva solo. Busca a ese hermano con quien estás distanciado: la paz con él también es paz con Dios.',
  },
  bondad: {
    significado: 'Es la cualidad de Dios, que es bueno y hace el bien. El ser humano, hecho a su imagen, está llamado a ser bueno con todos.',
    mensaje: 'La bondad nunca pasa de moda ni se pierde. Un gesto bueno hoy puede cambiarle el día —o la vida— a alguien.',
  },
  tiempo: {
    significado: 'Es el espacio que Dios nos regala para vivir, crecer y convertirnos. La Biblia enseña que hay un tiempo para cada cosa bajo el cielo.',
    mensaje: 'El tiempo no vuelve. No lo gastes todo en lo urgente: deja espacio para Dios, para tu familia y para descansar.',
  },
  cielo: {
    significado: 'Es la morada de Dios y el destino al que nos llama: la vida plena junto a Él, donde ya no habrá llanto ni dolor.',
    mensaje: 'Fuiste hecho para algo más grande que este mundo. Vive con los pies en la tierra y el corazón en el cielo.',
  },
  enviar: {
    significado: 'Dios envía: a los profetas, a su Hijo, al Espíritu y a cada creyente. Ser enviado es recibir una misión que viene de Él.',
    mensaje: 'Tú también eres enviado, allí donde estás: a tu casa, a tu trabajo, a tu barrio. No tienes que ir lejos para llevar a Dios.',
  },
  fuerza: {
    significado: 'Es el vigor que viene de Dios para resistir y seguir adelante. La Biblia repite que el Señor es la fortaleza de los que confían en Él.',
    mensaje: 'Cuando sientas que ya no puedes, no te apoyes solo en ti. Pide fuerza a Dios: Él la da a los cansados.',
  },
  enemigo: {
    significado: 'Son los que hacen daño o se oponen. Jesús cambió la manera de mirarlos: mandó amarlos y orar por ellos.',
    mensaje: 'El rencor te amarra a quien te hirió. Reza por esa persona, aunque cueste: es el primer paso para quedar libre.',
  },
  ley: {
    significado: 'Es la enseñanza que Dios dio a su pueblo para que viviera en libertad y justicia. Jesús la resumió en amar a Dios y al prójimo.',
    mensaje: 'La ley de Dios no es una jaula, es un camino seguro. Lo que Dios pide siempre es para tu bien.',
  },
  salvacion: {
    significado: 'Es la obra de Dios que rescata al ser humano del pecado y de la muerte. Se cumple plenamente en Jesús, el Salvador.',
    mensaje: 'No tienes que salvarte a punta de esfuerzo: déjate salvar. Abre la mano y recibe lo que Dios quiere darte gratis.',
  },
  cumplimiento: {
    significado: 'Es llevar a la práctica lo que Dios manda, y también que Dios realice lo que prometió. En la Biblia, Dios siempre cumple su palabra.',
    mensaje: 'La fe se demuestra cumpliendo, no solo hablando. Y cuando dudes, recuerda: lo que Dios promete, lo cumple.',
  },
  amor: {
    significado: 'Es la esencia misma de Dios: "Dios es amor". No es solo un sentimiento, es entregarse por el bien del otro, como Jesús en la cruz.',
    mensaje: 'Al final de la vida solo quedará lo que amaste. Ama con hechos, empezando por los que tienes más cerca.',
  },
  justicia: {
    significado: 'Es dar a cada uno lo que le corresponde y vivir rectamente delante de Dios. La Biblia defiende sobre todo al pobre y al débil.',
    mensaje: 'No basta con no hacer el mal: hay que ser justo. Paga lo justo, habla con verdad y ponte del lado del que no tiene voz.',
  },
  agua: {
    significado: 'Es signo de vida y de purificación. Dios da agua en el desierto, y Jesús se presenta como el agua viva que quita la sed para siempre.',
    mensaje: 'Hay una sed que ninguna cosa de este mundo sacia. Vuelve a la fuente: la oración, la Palabra, los sacramentos.',
  },
  cristo: {
    significado: 'Significa "Ungido", lo mismo que Mesías: el Salvador esperado por Israel. Los cristianos creemos que es Jesús.',
    mensaje: 'Ser cristiano es ser de Cristo: pensar, amar y perdonar como Él. Que se note a quién le perteneces.',
  },
  camino: {
    significado: 'Es la manera de vivir. La Biblia habla de dos caminos, el del bien y el del mal, y Jesús dice de sí mismo: "Yo soy el camino".',
    mensaje: 'Nunca es tarde para cambiar de rumbo. Si te desviaste, vuelve: Dios no mira cuánto te alejaste, sino hacia dónde caminas hoy.',
  },
  santidad: {
    significado: 'Santo es lo que pertenece a Dios. Él es el Santo, y llama a su pueblo a parecérsele: "Sean santos, porque yo soy santo".',
    mensaje: 'La santidad no es para unos pocos: es para ti, en tu vida de todos los días. Empieza haciendo bien y con amor lo pequeño.',
  },
  sabiduria: {
    significado: 'Es saber vivir según Dios: distinguir lo que conviene y actuar bien. La Biblia dice que comienza por respetar al Señor.',
    mensaje: 'Saber mucho no es lo mismo que ser sabio. Antes de decidir, detente, pide luz a Dios y escucha un buen consejo.',
  },
  palabra: {
    significado: 'Es Dios que habla y actúa: con su palabra creó el mundo. Jesús es la Palabra hecha carne, y la Biblia es Palabra de Dios escrita.',
    mensaje: 'Dios tiene algo que decirte hoy. Lee un pasaje despacio y quédate con una frase para todo el día.',
  },
  alegria: {
    significado: 'Es el gozo profundo que nace de saberse amado por Dios. No depende de que todo salga bien, sino de quién va con uno.',
    mensaje: 'La alegría cristiana se puede vivir aun en medio de los problemas. Búscala en lo sencillo y compártela: se multiplica.',
  },
  honor: {
    significado: 'Es el reconocimiento y respeto que se debe a Dios en primer lugar, y también a los padres y a toda persona.',
    mensaje: 'Honra a Dios con tu vida y a tus padres con tu cuidado. Y no busques el aplauso: el honor que vale viene de Dios.',
  },
  conocimiento: {
    significado: 'En la Biblia conocer es mucho más que saber datos: es tratar de cerca, tener una relación viva con alguien. Dios nos conoce así.',
    mensaje: 'Dios te conoce por dentro y aun así te ama. Dedica tiempo a conocerlo a Él: no se ama lo que no se conoce.',
  },
  sacrificio: {
    significado: 'Es lo que se entrega a Dios renunciando a algo propio. Todos los sacrificios antiguos anuncian el de Cristo, que se dio por nosotros.',
    mensaje: 'Amar siempre cuesta algo. Lo que hoy sacrificas por tu familia o por otros, ofrecido a Dios, tiene un valor enorme.',
  },
  fe: {
    significado: 'Es fiarse de Dios y de su palabra, aunque no se vea. También es fidelidad: mantenerse firme con Él en las buenas y en las malas.',
    mensaje: 'La fe no quita los problemas, pero cambia la manera de atravesarlos. Aunque sea pequeña como una semilla, úsala.',
  },
  espiritu: {
    significado: 'Es el aliento de vida que Dios da, y es también el Espíritu Santo, la presencia de Dios que guía, consuela y fortalece.',
    mensaje: 'Tienes un huésped dentro: el Espíritu de Dios. Pídele luz antes de hablar, de decidir y de actuar.',
  },
  mundo: {
    significado: 'Es la creación que Dios hizo buena y a la humanidad que tanto amó. A veces también designa lo que se opone a Dios.',
    mensaje: 'Dios amó tanto al mundo que le dio a su Hijo. Ama tú también este mundo cuidándolo y haciéndolo un poco mejor.',
  },
  ayuda: {
    significado: 'Es el auxilio que Dios da a los suyos y el que nos pide darnos unos a otros. "Nuestra ayuda viene del Señor".',
    mensaje: 'Pedir ayuda no es debilidad, es humildad. Y cuando puedas ayudar, hazlo: tal vez seas la respuesta a la oración de alguien.',
  },
  castigo: {
    significado: 'Es la consecuencia del mal y la corrección de Dios. En la Biblia Dios corrige como un padre: para que su hijo vuelva y viva.',
    mensaje: 'Dios no se goza en castigar, quiere que cambies y vivas. Lo que hoy te duele puede ser un llamado a enderezar el camino.',
  },
  creer: {
    significado: 'Es aceptar como verdad lo que Dios dice y apoyar la vida en ello. En los evangelios, creer en Jesús es el comienzo de la vida nueva.',
    mensaje: 'Creer es una decisión que se renueva cada día. Dile hoy: "Creo, Señor, pero ayuda mi poca fe".',
  },
  busqueda: {
    significado: 'Es el deseo de encontrar a Dios, y también Dios buscando al ser humano, como el pastor que sale tras la oveja perdida.',
    mensaje: 'Quien busca a Dios de corazón, lo encuentra. Y recuerda: antes de que tú lo buscaras, Él ya te estaba buscando.',
  },
  pensamiento: {
    significado: 'Es lo que el ser humano planea y guarda en su interior. La Biblia recuerda que los pensamientos de Dios están muy por encima de los nuestros.',
    mensaje: 'Lo que piensas termina siendo lo que vives. Cuida lo que dejas entrar a tu mente y llénala de lo que es bueno y verdadero.',
  },
  escucha: {
    significado: 'Es atender con el corazón, no solo con los oídos. La gran oración de Israel empieza así: "Escucha, Israel".',
    mensaje: 'Antes de pedir, escucha. Apaga un rato el ruido: Dios habla en el silencio y también en las personas que tienes cerca.',
  },
  trabajo: {
    significado: 'Es la tarea que Dios confió al ser humano para cuidar la creación y ganarse el pan. Jesús mismo trabajó con sus manos.',
    mensaje: 'Tu trabajo, por sencillo que sea, tiene dignidad. Hazlo bien y con honradez: así también se sirve a Dios.',
  },
  libertad: {
    significado: 'Es el don de Dios, que sacó a su pueblo de la esclavitud. Cristo nos libera de la peor de todas: la del pecado.',
    mensaje: 'Ser libre no es hacer lo que quieras, sino poder elegir el bien. Pregúntate qué te tiene atado y pídele a Dios soltarlo.',
  },
  bendicion: {
    significado: 'Es el bien que Dios derrama sobre las personas y las cosas. Bendecir es "decir bien": desear y pedir ese bien para otro.',
    mensaje: 'Ya has sido bendecido más de lo que crees. Cuenta tus bendiciones y sé tú bendición para los demás con tus palabras.',
  },
  fuego: {
    significado: 'Es signo de la presencia de Dios, que purifica y da calor: la zarza ardiente, la columna de fuego, las llamas de Pentecostés.',
    mensaje: 'Que no se apague el fuego de tu fe. Se aviva con la oración y se contagia: un corazón encendido enciende a otros.',
  },
  reino: {
    significado: 'Es Dios reinando: allí donde se hace su voluntad hay paz, justicia y amor. Jesús lo anunció como algo que ya está entre nosotros.',
    mensaje: 'El Reino empieza en lo pequeño, como una semilla. Cada vez que perdonas, compartes o dices la verdad, lo haces presente.',
  },
  miedo: {
    significado: 'Es el temor ante el peligro o lo desconocido. Por eso, una de las frases que más repite Dios en la Biblia es "No tengas miedo".',
    mensaje: 'El miedo es mal consejero. No decide Dios desde el miedo, y tú tampoco deberías: Él va contigo.',
  },
  alabanza: {
    significado: 'Es reconocer con palabras y cantos lo grande y bueno que es Dios. Los Salmos son la gran escuela de alabanza.',
    mensaje: 'Alaba a Dios también en los días difíciles. La alabanza no cambia a Dios: te cambia a ti y te devuelve la paz.',
  },
  fiesta: {
    significado: 'Es celebrar juntos lo que Dios ha hecho. Israel tenía fiestas para recordar su liberación, y Jesús compara el Reino con un banquete.',
    mensaje: 'La fe también se celebra. Hazle fiesta a Dios el domingo y celebra en familia las cosas buenas de la vida.',
  },
  guerra: {
    significado: 'Es la violencia entre pueblos, fruto del pecado. La Biblia la cuenta sin esconderla, y sueña con el día en que las espadas se vuelvan arados.',
    mensaje: 'La guerra empieza en el corazón: en el orgullo y en el odio. Sé constructor de paz donde te toque vivir.',
  },
  juicio: {
    significado: 'Es Dios poniendo cada cosa en su lugar con verdad y justicia. Al final, seremos examinados sobre el amor que dimos.',
    mensaje: 'Deja el juicio a Dios, que conoce los corazones. Tú mide a los demás con la misericordia con que quieres ser medido.',
  },
  corazon: {
    significado: 'Es el centro de la persona: donde se piensa, se decide y se ama. Dios mira el corazón, no las apariencias.',
    mensaje: 'Cuida tu corazón más que cualquier otra cosa, porque de él brota la vida. Pídele a Dios un corazón nuevo cada mañana.',
  },
  mensaje: {
    significado: 'Es lo que Dios comunica a su pueblo por medio de profetas, ángeles y apóstoles. El gran mensaje es la Buena Noticia de Jesús.',
    mensaje: 'Tú también llevas un mensaje, aunque no digas una palabra: tu manera de vivir. Que hable bien de Dios.',
  },
  esposos: {
    significado: 'Es la unión del hombre y la mujer querida por Dios desde el principio. La Biblia la usa para explicar el amor fiel de Dios por su pueblo.',
    mensaje: 'El matrimonio se cuida todos los días con detalles, perdón y diálogo. Reza por tu esposo o esposa, y recen juntos.',
  },
  esperanza: {
    significado: 'Es aguardar con confianza lo que Dios ha prometido. No es un simple optimismo: se apoya en que Dios es fiel.',
    mensaje: 'No todo está perdido mientras Dios esté de tu lado. Espera en Él: después de la noche más larga también amanece.',
  },
  promesa: {
    significado: 'Es la palabra que Dios empeña con su pueblo: una tierra, una descendencia, un Salvador. Toda la Biblia es promesa y cumplimiento.',
    mensaje: 'Las promesas de Dios siguen en pie para ti. Apóyate en ellas cuando falten las fuerzas, y cumple tú también la palabra que das.',
  },
  oveja: {
    significado: 'Es la imagen del pueblo que Dios cuida como un pastor. Jesús es el Buen Pastor que conoce a cada una y da la vida por ellas.',
    mensaje: 'No eres un número: Dios te conoce por tu nombre. Si te sientes perdido, déjate encontrar y cargar en sus hombros.',
  },
  verdad: {
    significado: 'Es lo firme y confiable, lo que no engaña. Jesús dijo: "Yo soy la verdad", y prometió que la verdad nos hará libres.',
    mensaje: 'Vive en la verdad aunque cueste: contigo mismo, con Dios y con los demás. La mentira ata; la verdad libera.',
  },
  gloria: {
    significado: 'Es el resplandor de la presencia y la grandeza de Dios. Dar gloria a Dios es reconocer que todo lo bueno viene de Él.',
    mensaje: 'No vivas para tu propia gloria, que pasa pronto. Haz las cosas para la gloria de Dios y encontrarás paz.',
  },
  familia: {
    significado: 'Es la primera comunidad querida por Dios, donde se recibe la vida y se aprende a amar. Jesús quiso nacer y crecer en una.',
    mensaje: 'Ninguna familia es perfecta, pero es tu primer lugar para amar. Dedícale tiempo: es lo que más vas a agradecer.',
  },
  riqueza: {
    significado: 'Son los bienes materiales. La Biblia no los condena, pero advierte del peligro de poner en ellos el corazón.',
    mensaje: 'Nada de lo que tienes te lo llevarás. Usa tus bienes para hacer el bien: la verdadera riqueza es lo que das.',
  },
  entendimiento: {
    significado: 'Es la capacidad de comprender lo que Dios quiere y de ver las cosas como son. Es un don que la Biblia invita a pedir.',
    mensaje: 'Antes de discutir, trata de entender. Pídele a Dios inteligencia para ver con sus ojos lo que hoy no comprendes.',
  },
  confianza: {
    significado: 'Es apoyarse en Dios con seguridad, como un niño en brazos de su madre. Es lo contrario de querer controlarlo todo.',
    mensaje: 'Haz tu parte y deja lo demás en manos de Dios. Suelta la angustia: Él sabe lo que necesitas.',
  },
  eleccion: {
    significado: 'Es Dios escogiendo a personas y a un pueblo, no por sus méritos sino por amor, para confiarles una misión en favor de todos.',
    mensaje: 'Dios te eligió antes de que hicieras nada para merecerlo. No te compares con nadie: tienes una misión que es solo tuya.',
  },
  angel: {
    significado: 'Son mensajeros de Dios, espíritus que le sirven y que cuidan a los seres humanos. Aparecen en los momentos decisivos de la salvación.',
    mensaje: 'Dios cuida de ti más de lo que imaginas. Y tú puedes ser "ángel" para alguien llevándole una buena noticia.',
  },
  oracion: {
    significado: 'Es el diálogo del ser humano con Dios: alabar, agradecer, pedir perdón y pedir ayuda. Jesús oraba y enseñó a orar.',
    mensaje: 'Orar no es decir muchas palabras, es estar con Quien te ama. Empieza con cinco minutos al día y sé constante.',
  },
  ensenanza: {
    significado: 'Es la instrucción que Dios da para vivir bien. Jesús fue llamado Maestro y enseñaba con autoridad y con el ejemplo.',
    mensaje: 'Nunca dejes de aprender, y enseña con tu vida antes que con sermones. Los hijos aprenden más de lo que ven.',
  },
  sufrimiento: {
    significado: 'Es el dolor del cuerpo y del alma, que forma parte de la vida. La Biblia no lo esconde: Cristo mismo sufrió y lo llenó de sentido.',
    mensaje: 'Tu dolor no es un castigo ni un olvido de Dios. Únelo a la cruz de Cristo: Él sufre contigo y no te suelta.',
  },
  obediencia: {
    significado: 'Es escuchar a Dios y hacer lo que pide, por confianza y no por miedo. Jesús obedeció al Padre hasta la cruz.',
    mensaje: 'Obedecer a Dios es confiar en que Él sabe más. Empieza por lo pequeño que ya sabes que te está pidiendo.',
  },
  pureza: {
    significado: 'Es la limpieza del corazón que permite acercarse a Dios. Jesús enseñó que lo que mancha no es lo de afuera, sino lo que sale de adentro.',
    mensaje: '"Dichosos los limpios de corazón, porque verán a Dios." Cuida lo que miras, lo que dices y la intención con que haces las cosas.',
  },
  recuerdo: {
    significado: 'Es mantener presente lo que Dios ha hecho. Israel recordaba su liberación, y Jesús pidió: "Hagan esto en memoria mía".',
    mensaje: 'Cuando te falte la fe, haz memoria: recuerda las veces que Dios te sacó adelante. El que recuerda, agradece y confía.',
  },
  llanto: {
    significado: 'Es la expresión del dolor humano. La Biblia no lo desprecia: Jesús lloró, y Dios promete enjugar toda lágrima.',
    mensaje: 'Llorar no es falta de fe. Llora delante de Dios lo que te duele: ninguna lágrima se le pierde.',
  },
  amistad: {
    significado: 'Es el afecto fiel entre personas. La Biblia dice que quien encuentra un amigo fiel encuentra un tesoro, y Jesús nos llamó amigos.',
    mensaje: 'Cuida a tus amigos de verdad y sé tú uno de ellos. Y no olvides que tienes en Jesús al amigo que nunca falla.',
  },
  anuncio: {
    significado: 'Es proclamar lo que Dios ha hecho y hará. Los profetas anunciaron al Salvador, y la Iglesia anuncia que ya vino.',
    mensaje: 'Lo que has recibido no es para guardarlo. Cuéntale a alguien lo que Dios ha hecho en tu vida.',
  },
  cuerpo: {
    significado: 'Es parte de la persona, creada buena por Dios. San Pablo lo llama templo del Espíritu Santo y compara a la Iglesia con un cuerpo.',
    mensaje: 'Tu cuerpo es un regalo: cuídalo, respétalo y respeta el de los demás. Y recuerda que formas parte de un cuerpo más grande, la Iglesia.',
  },
  alianza: {
    significado: 'Es el pacto de amor que Dios hace con su pueblo: "Yo seré su Dios y ustedes serán mi pueblo". Jesús selló la nueva alianza con su sangre.',
    mensaje: 'Dios se comprometió contigo y no se echa atrás. Renueva tú también tu compromiso con Él, sobre todo cuando has fallado.',
  },
  canto: {
    significado: 'Es la oración hecha música. El pueblo de Dios canta para agradecer, para pedir y para celebrar; los Salmos son sus cantos.',
    mensaje: 'Canta, aunque no tengas buena voz: quien canta, ora dos veces. La música buena levanta el ánimo y acerca a Dios.',
  },
  perdon: {
    significado: 'Es Dios borrando la culpa y devolviendo la amistad. Jesús perdonó desde la cruz y pidió que perdonemos como somos perdonados.',
    mensaje: 'Perdonar no es olvidar ni decir que no dolió: es soltar. Pide perdón sin orgullo y dalo sin condiciones; el primero en descansar eres tú.',
  },
  madre: {
    significado: 'Es quien da la vida y la cuida con ternura. La Biblia compara el amor de Dios con el de una madre, y nos da a María como madre.',
    mensaje: 'Agradece a tu madre mientras puedas, con palabras y con hechos. Y acude a María: es madre tuya también.',
  },
  paz: {
    significado: 'Es mucho más que ausencia de guerra: es la plenitud que Dios da, estar bien con Él, con los demás y con uno mismo.',
    mensaje: 'La paz empieza por dentro. No te acuestes con rencor ni con la conciencia inquieta: haz hoy las paces.',
  },
  mandamiento: {
    significado: 'Son las indicaciones de Dios para vivir bien. Jesús dejó uno nuevo que los resume todos: "Ámense como yo los he amado".',
    mensaje: 'Los mandamientos no son un peso, son las señales del camino. Repásalos de vez en cuando: te dicen por dónde vas.',
  },
  adoracion: {
    significado: 'Es reconocer a Dios como Dios y postrarse solo ante Él. La Biblia insiste en que no se adore a nada ni a nadie más.',
    mensaje: 'Todos adoramos algo: el dinero, el éxito, la imagen. Devuélvele a Dios el primer lugar; solo Él no decepciona.',
  },
  eternidad: {
    significado: 'Es la vida sin fin que solo Dios tiene y que comparte con nosotros. "Su amor es eterno" es la frase que más repiten los Salmos.',
    mensaje: 'Lo que hagas con amor no se pierde: tiene valor de eternidad. Elige hoy lo que dura para siempre.',
  },
  esclavitud: {
    significado: 'Es la falta de libertad. Dios liberó a Israel de Egipto, y Jesús enseña que el pecado también esclaviza al que lo comete.',
    mensaje: 'Hay cadenas que no se ven: vicios, deudas, rencores, el qué dirán. Ponle nombre a la tuya y pídele a Dios que te libere.',
  },
  pan: {
    significado: 'Es el alimento de cada día, don de Dios. Jesús multiplicó los panes y se entregó Él mismo como Pan de vida en la Eucaristía.',
    mensaje: 'Agradece el pan de tu mesa y compártelo con el que no tiene. Y no dejes de alimentar el alma: acércate a la Eucaristía.',
  },
  sangre: {
    significado: 'En la Biblia la sangre es la vida misma. Por eso sella las alianzas, y la sangre de Cristo, derramada en la cruz, nos reconcilia con Dios.',
    mensaje: 'Costaste mucho: fuiste rescatado con la sangre de Cristo. No te trates ni trates a nadie como si valiera poco.',
  },
  luz: {
    significado: 'Es la primera obra de la creación y signo de Dios, de la verdad y de la vida. Jesús dijo: "Yo soy la luz del mundo".',
    mensaje: 'No estás hecho para vivir a oscuras ni a escondidas. Deja que la luz de Cristo entre en lo tuyo, y sé luz para tu casa.',
  },
  nino: {
    significado: 'Son signo de sencillez y confianza. Jesús los abrazó y dijo que el Reino de Dios es de los que se hacen como ellos.',
    mensaje: 'Cuida y respeta a los niños: te fueron confiados. Y aprende de ellos a confiar, a perdonar rápido y a asombrarte.',
  },
  anciano: {
    significado: 'Son los que han vivido mucho y guardan la memoria y la sabiduría del pueblo. La Biblia manda respetarlos y escucharlos.',
    mensaje: 'No dejes solos a tus mayores. Visítalos, escúchalos, ten paciencia: lo que haces por ellos, algún día lo harán por ti.',
  },
  cuidado: {
    significado: 'Es la atención amorosa con que Dios vela por sus criaturas, y la que nos pide tener con los demás y con uno mismo.',
    mensaje: 'Dios cuida de los pájaros y de las flores: mucho más de ti. Descansa en eso, y cuida tú de quien te fue encomendado.',
  },
  joven: {
    significado: 'Es la etapa de la fuerza y de las grandes decisiones. La Biblia cuenta de muchos jóvenes a quienes Dios confió misiones enormes.',
    mensaje: 'Si eres joven, no esperes a ser mayor para tomarte en serio a Dios. Si ya no lo eres, anima y confía en los jóvenes.',
  },
  enojo: {
    significado: 'Es la reacción ante lo que se siente como una ofensa. La Biblia no prohíbe sentirlo, pero advierte: "Si se enojan, no pequen".',
    mensaje: 'Antes de hablar con cólera, respira y espera. Lo que se dice con enojo casi siempre se lamenta después.',
  },
  voz: {
    significado: 'Es la manera en que Dios se hace oír. Sus ovejas reconocen su voz, que a veces llega como una brisa suave.',
    mensaje: 'Hay muchas voces que gritan a tu alrededor. Aprende a distinguir la de Dios: es la que da paz y lleva al bien.',
  },
  caridad: {
    significado: 'Es conmoverse ante el dolor del otro y actuar. Es lo que siente Dios por su pueblo y lo que movió a Jesús a sanar y dar de comer.',
    mensaje: 'No pases de largo. La compasión verdadera se detiene, se acerca y hace algo, como el buen samaritano.',
  },
  idolatria: {
    significado: 'Es todo lo que ocupa el lugar que solo le corresponde a Dios. Antes eran estatuas; hoy pueden ser el dinero, el poder o uno mismo.',
    mensaje: 'Revisa en qué pones tu seguridad y tu tiempo: ahí está tu dios. Lo que no es Dios, tarde o temprano falla.',
  },
  proteccion: {
    significado: 'Es Dios defendiendo y guardando a los suyos. Los Salmos lo llaman escudo, roca y refugio.',
    mensaje: 'Ponte cada mañana bajo la protección de Dios, y a tu familia también. No te ahorra las pruebas, pero no te deja solo en ellas.',
  },
  suplica: {
    significado: 'Es pedirle a Dios con insistencia y humildad, sabiendo que escucha. Jesús invita: "Pidan y se les dará".',
    mensaje: 'No te canses de pedir. Dios no siempre da lo que pides, pero siempre da lo que necesitas.',
  },
  presencia: {
    significado: 'Es Dios estando con su pueblo. Es la promesa que atraviesa toda la Biblia: "Yo estaré contigo".',
    mensaje: 'Dios está aquí, ahora, donde estás. Acostúmbrate a vivir en su presencia: cambia la manera de hacer todo.',
  },
}
