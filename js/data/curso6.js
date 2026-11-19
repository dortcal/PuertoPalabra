/* Puerto Palabra · Contenidos de 6.º de Primaria (tercer ciclo). Textos originales;
   la historia del jardín de las Hespérides es una versión adaptada de la mitología griega vinculada a Canarias. */
window.PP = window.PP || {}; PP.CONTENIDO = PP.CONTENIDO || {};
PP.CONTENIDO[6] = {
  turistas: {
    id: "turistas6", titulo: "En el muelle", consigna: "Iker (de Bilbao) y Sofía (de Montevideo) tienen preguntas sobre las lenguas. Responde con precisión y respeto.",
    npcs: {
      a: { nombre: "Iker", rol: "Turista del País Vasco", piel: "clara", pelo: "#3b2416", peinado: "corto", ropa: "#2f9e44", fondo: "#d3f9d8", barba: true },
      b: { nombre: "Sofía", rol: "Turista de Uruguay", piel: "media", pelo: "#5a3825", peinado: "largo", ropa: "#74c0fc", fondo: "#d0ebff", pendientes: true }
    },
    nodos: [
      { quien: "a", habla: "¡Kaixo! En el País Vasco hablamos euskera y castellano. ¿Qué lenguas se hablan en España?", opciones: [
        { t: "El castellano o español en todo el país; además, el catalán, el gallego y el euskera son cooficiales en sus comunidades.", ok: true, fb: "Correcto: España es un país plurilingüe." },
        { t: "Solo el español; lo demás son dialectos.", ok: false, fb: "El catalán, el gallego y el euskera son lenguas, no dialectos del español." },
        { t: "Español e inglés.", ok: 0.5, fb: "El inglés no es lengua oficial en España. Piensa en las lenguas cooficiales." } ] },
      { quien: "b", habla: "Vos sabés que en Uruguay decimos «vos» en lugar de «tú». ¿Eso está mal?", opciones: [
        { t: "No: se llama voseo y es una forma correcta del español en países como Uruguay o Argentina.", ok: true, fb: "Exacto: el voseo es una norma propia de esas variedades." },
        { t: "Sí, lo correcto es decir «tú».", ok: false, fb: "No hay una única forma correcta: el voseo es correcto en su variedad." },
        { t: "No lo sé.", ok: 0.5, fb: "Se llama voseo y es correcto en esas zonas." } ] },
      { quien: "a", habla: "¿Y por qué en Canarias hay palabras que vienen del portugués, como «millo»?", opciones: [
        { t: "Porque tras la conquista llegaron muchos portugueses a vivir y trabajar en las islas, y su lengua dejó huella.", ok: true, fb: "Bien: la historia de un lugar explica su vocabulario." },
        { t: "Porque Canarias perteneció a Portugal.", ok: false, fb: "No es así: las palabras llegaron con las personas portuguesas que se instalaron aquí." },
        { t: "Por casualidad.", ok: 0.5, fb: "No es casualidad: tiene una explicación histórica." } ] },
      { quien: "b", habla: "¿Nos podrías explicar qué es el silbo gomero?", opciones: [
        { t: "Es un lenguaje silbado de La Gomera que reproduce el español con silbidos. La UNESCO lo declaró Patrimonio Cultural Inmaterial de la Humanidad en 2009.", ok: true, crit: "3.2", fb: "Explicación clara, precisa y bien organizada." },
        { t: "Es silbar canciones.", ok: false, crit: "3.2", fb: "Es mucho más: un sistema para comunicarse a distancia." },
        { t: "Es silbar.", ok: 0.5, crit: "3.2", fb: "La explicación es muy pobre para quien no lo conoce." } ] }
    ]
  },
  variantes: {
    titulo: "Palabras viajeras", consigna: "Une cada palabra del español de Canarias con su significado. Fíjate en su origen.", izq: "Palabra canaria", der: "Significa",
    pares: [
      ["millo", "maíz", "Viene del portugués «milho».", "Cereal amarillo."],
      ["queque", "bizcocho", "Viene del inglés «cake».", "Dulce horneado."],
      ["naife", "cuchillo canario", "Viene del inglés «knife».", "Sirve para cortar."],
      ["fechar", "cerrar con llave", "Viene del portugués «fechar».", "Se hace con una llave."],
      ["gofio", "harina de cereal tostado", "Es una palabra de origen guanche.", "Se toma con leche o caldo."],
      ["papa", "patata", "Viene del quechua, una lengua de América.", "Tubérculo."]
    ]
  },
  mediacion: {
    id: "mediacion6", titulo: "Asamblea de clase", consigna: "La clase decide adónde ir de excursión. Ayuda a que se debata con argumentos y respeto.",
    npcs: {
      a: { nombre: "Bruno", rol: "Delegado de clase", piel: "clara", pelo: "#c0712f", peinado: "corto", ropa: "#1971c2", fondo: "#d0ebff", edad: "nino" },
      b: { nombre: "Yaiza", rol: "Compañera de clase", piel: "morena", pelo: "#2b1d14", peinado: "coleta", ropa: "#2f9e44", fondo: "#d3f9d8", edad: "nino" }
    },
    nodos: [
      { quien: "a", habla: "Como soy el delegado, decido yo: vamos al parque acuático y punto.", animo: "enfadado", opciones: [
        { t: "Ser delegado es representar a la clase, no decidir solo. Propongo que cada grupo defienda su opción con argumentos y votemos.", ok: true, fb: "Detectas un abuso de poder y propones un procedimiento justo." },
        { t: "Pues yo no voy y punto.", ok: false, fb: "Responder con otra imposición bloquea el diálogo." },
        { t: "Vale, tú mandas.", ok: 0.5, fb: "Aceptas una decisión que no se ha debatido." } ] },
      { quien: "b", habla: "Yo prefiero el Parque Nacional, pero me da corte hablar.", animo: "triste", opciones: [
        { t: "Tu opinión cuenta igual que la de los demás. ¿Qué razones tienes?", ok: true, fb: "Das la palabra y pides argumentos." },
        { t: "Si te da corte, mejor no hables.", ok: false, fb: "Así se silencia a quien piensa distinto." },
        { t: "Bueno.", ok: 0.5, fb: "Puedes animarla a participar." } ] },
      { quien: "a", habla: "Jajaja, Yaiza habla como su abuela de La Gomera. ¡Suena a campo!", opciones: [
        { t: "Burlarse del habla de alguien es un prejuicio y no rebate sus argumentos. Escuchemos sus razones.", ok: true, fb: "Rechazas el prejuicio y devuelves el debate a los argumentos." },
        { t: "Jaja, es verdad.", ok: false, fb: "Reírse del habla de alguien es discriminatorio." },
        { t: "No te pases.", ok: 0.5, fb: "Bien, pero puedes explicar por qué no está bien." } ] },
      { quien: "b", habla: "Mis razones: es gratis, aprendemos sobre la laurisilva y está más cerca.", animo: "feliz", opciones: [
        { t: "Son buenos argumentos. Ahora que conocemos las dos opciones, votemos y aceptemos el resultado.", ok: true, fb: "Deliberación argumentada y decisión democrática." },
        { t: "Da igual lo que digas: iremos al parque acuático.", ok: false, fb: "Ignorar los argumentos de otra persona impide el acuerdo." },
        { t: "Ya veremos.", ok: 0.5, fb: "Puedes proponer un cierre claro: votar." } ] }
    ]
  },
  caza: [
    { instruccion: "Recoge 5 palabras del español de Canarias que proceden de otras lenguas.", explica: "Hay palabras de origen portugués, inglés, guanche o americano.", objetivo: 5, fbBien: "es una palabra viajera del español de Canarias.",
      buenas: ["millo", "queque", "naife", "gofio", "baifo", "fechar", "papa", "tabaiba"],
      malas: ["mesa|Viene del latín y se usa en todo el español: no es propia de Canarias.", "ordenador|Se usa en toda España.", "patata|Es la forma peninsular; aquí decimos papa.", "palomitas|Es la forma peninsular; aquí decimos cotufas.", "bocadillo|Se usa en todo el español de España.", "escuela|Se usa en todo el español."] },
    { instruccion: "Recoge 5 preposiciones.", explica: "Las preposiciones relacionan palabras: a, ante, bajo, con, contra, de, desde, en, entre, hacia, hasta, para, por, según, sin, sobre, tras…", objetivo: 5, fbBien: "es una preposición.",
      buenas: ["desde", "hacia", "entre", "según", "sobre", "sin", "hasta", "contra"],
      malas: ["aquí|Es un adverbio de lugar.", "pero|Es una conjunción.", "nosotros|Es un pronombre personal.", "rápidamente|Es un adverbio.", "camino|Es un sustantivo (o una forma del verbo caminar).", "y|Es una conjunción."] }
  ],
  radio: {
    emisora: "Radio Onda Volcán 98.4", locutor: "Yurena Martín",
    texto: "Buenas tardes, Puerto Palabra. Comenzamos con la noticia del día: el nuevo carril bici del centro será una realidad. Los vecinos podrán dar su opinión en una asamblea que se celebrará esta tarde, a las siete, en el edificio donde trabajan la alcaldesa y los concejales. Recuerden llevar sus propuestas por escrito. Y ahora, publicidad: Refrescos Volcán, ¡el único refresco que te hace correr más rápido que nadie! Volvemos con la información: el ferry de La Gomera recupera su horario habitual. Esto ha sido Radio Onda Volcán.",
    destino: "ayuntamiento", distractores: ["plaza", "periodico"],
    fbMal: "La asamblea es «en el edificio donde trabajan la alcaldesa y los concejales».", fbBien: "La alcaldesa y los concejales trabajan en el Ayuntamiento.",
    preguntas: [
      { p: "¿Cuál es la noticia principal del boletín?", o: ["El nuevo carril bici y la asamblea vecinal", "El anuncio de refrescos", "El horario del ferry", "El tiempo para mañana"], c: 0, fb: "Es «la noticia del día»." },
      { p: "¿Qué tienen que llevar los vecinos a la asamblea?", o: ["Sus propuestas por escrito", "Una bicicleta", "Un refresco", "El DNI"], c: 0, fb: "Lo dice expresamente." },
      { p: "¿Por qué no es fiable lo que dice el anuncio?", o: ["Promete algo exagerado sin ninguna prueba", "Porque lo dice la radio", "Porque habla de un refresco canario", "Porque es muy corto"], c: 0, fb: "La publicidad busca convencer y puede exagerar." },
      { p: "¿Qué elemento indica que cambia el tipo de texto dentro del boletín?", o: ["La frase «Y ahora, publicidad»", "El saludo inicial", "La hora de la asamblea", "El nombre de la emisora"], c: 0, fb: "Esa frase marca el paso de la información a la publicidad." }
    ]
  },
  chismografo: {
    consigna: "Analiza cada mensaje: ¿dato fiable, bulo u opinión? Después, identifica la pista que lo demuestra.",
    posts: [
      { autor: "Diario El Eco", usuario: "@diarioeleco", verificado: true, hace: "hace 3 h", color: "#212529", texto: "El Cabildo aprueba el carril bici del centro. Según el acta de la sesión, publicada en su web, las obras empezarán en marzo.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Cita una fuente comprobable y da datos concretos." },
      { autor: "AlertaVolcán", usuario: "@alerta_volcan_ya", hace: "publicado hace 4 años", color: "#e03131", texto: "¡¡ÚLTIMA HORA!! ¡¡El volcán va a entrar en erupción esta noche!! ¡¡Todos a casa!!", tipo: "bulo", pistas: ["fecha", "alarma"], fb: "Es un mensaje antiguo que vuelve a circular y busca asustar." },
      { autor: "Eli Viajera", usuario: "@eli_viajera", hace: "ayer", color: "#ae3ec9", texto: "Sinceramente, el carril bici es la mejor idea que ha tenido nunca el Ayuntamiento.", tipo: "opinion", pistas: ["opinion"], fb: "«Sinceramente» y «la mejor idea» expresan una valoración personal." },
      { autor: "FotosImpactantes", usuario: "@fotos_impactantes", hace: "hace 20 min", color: "#f76707", texto: "Mira esta foto: ¡un tiburón nadando por la Plaza Mayor después de la lluvia!", imagen: "[Foto con el tiburón recortado y pegado: los bordes no encajan]", tipo: "bulo", pistas: ["exagera", "sinfuente"], fb: "La imagen está manipulada y nadie identifica de dónde sale." },
      { autor: "Agencia de Meteorología", usuario: "@meteo_oficial", verificado: true, hace: "hace 1 h", color: "#1971c2", texto: "Aviso amarillo por viento mañana entre las 12:00 y las 20:00 en las cumbres de la isla.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Fuente oficial con datos precisos." },
      { autor: "BuenaSuerte", usuario: "@buena_suerte", hace: "hace 5 min", color: "#868e96", texto: "Si no reenvías este mensaje a 10 personas, tendrás mala suerte durante un año.", tipo: "bulo", pistas: ["cadena", "exagera"], fb: "Es una cadena: busca que se reenvíe usando el miedo." }
    ]
  },
  entrevista: {
    id: "entrevista6", titulo: "Entrevista a la alcaldesa", consigna: "Entrevista a la alcaldesa sobre el carril bici. Usa un registro formal y contrasta opiniones con respeto.",
    npcs: { a: { nombre: "Sra. Domínguez", rol: "Alcaldesa de Puerto Palabra", piel: "media", pelo: "#3b2416", peinado: "mono", ropa: "#343a40", fondo: "#e9ecef", gafas: true, pendientes: true } },
    nodos: [
      { quien: "a", habla: "Buenas tardes. Tengo diez minutos antes del pleno.", opciones: [
        { t: "Buenas tardes, señora alcaldesa. Soy reportera de El Eco. Le agradezco mucho que nos atienda.", ok: true, fb: "Registro formal y fórmula de cortesía adecuadas." },
        { t: "¡Hola! Vamos al lío.", ok: false, fb: "Demasiado informal para esta situación comunicativa." },
        { t: "Hola, soy de El Eco.", ok: 0.5, fb: "Correcto, pero puedes ser más formal y agradecer su tiempo." } ] },
      { quien: "a", habla: "Usted dirá.", opciones: [
        { t: "¿Qué cambios supondrá el carril bici para los vecinos del centro?", ok: true, fb: "Pregunta abierta y de interés público." },
        { t: "¿Va a hacer el carril bici?", ok: 0.5, fb: "Pregunta cerrada y ya conocida." },
        { t: "¿Por qué siempre hace las cosas mal?", ok: false, fb: "Es una pregunta ofensiva que no busca información." } ] },
      { quien: "a", habla: "Habrá menos coches en el centro y más seguridad para quienes van en bicicleta o a pie.", opciones: [
        { t: "Algunos comerciantes temen perder clientes por tener menos aparcamiento. ¿Qué les responde?", ok: true, fb: "Contrastas con otra perspectiva de forma respetuosa: buen periodismo." },
        { t: "Usted miente.", ok: false, fb: "Acusar sin pruebas no es contrastar: es atacar." },
        { t: "Ah, muy bien.", ok: 0.5, fb: "Escuchas, pero no profundizas ni contrastas." } ] },
      { quien: "a", habla: "Habilitaremos un aparcamiento cerca del mercado. Y ahora tengo que irme.", opciones: [
        { t: "Muchas gracias por sus respuestas, señora alcaldesa. Que tenga un buen pleno.", ok: true, fb: "Cierre formal y cortés." },
        { t: "Venga, chao.", ok: 0.5, fb: "Despedida demasiado informal para el contexto." },
        { t: "(Te vas sin despedirte.)", ok: false, fb: "Hay que despedirse." } ] }
    ]
  },
  cartel: {
    formato: "cartel", etiqueta: "CONCURSO", titulo: "Concurso de microrrelatos «Islas de palabras»", subtitulo: "Bases",
    lineas: ["1. Participantes: alumnado de 5.º y 6.º de Primaria.", "2. Extensión máxima: 100 palabras.", "3. Tema: el mar o los volcanes de Canarias.", "4. Plazo: hasta el 15 de diciembre.", "5. Entrega: en el taller donde se imprimen los periódicos y los libros de la ciudad."],
    pie: "El jurado valorará la originalidad y la corrección ortográfica.",
    destino: "imprenta", distractores: ["biblioteca", "colegio"], consignaIr: "¿Dónde se entregan los microrrelatos? Conduce hasta allí.",
    fbMal: "Las bases dicen: «en el taller donde se imprimen los periódicos y los libros».", fbBien: "En la imprenta se imprimen periódicos y libros.",
    preguntas: [
      { p: "Lucas tiene 13 años y estudia 1.º de ESO. ¿Puede participar?", o: ["No, solo puede participar alumnado de 5.º y 6.º de Primaria", "Sí, porque le gusta escribir", "Sí, si entrega antes del plazo", "No, porque es demasiado joven"], c: 0, crit: "4.1", fb: "Lo dice la base 1." },
      { p: "Un microrrelato de 150 palabras sobre el Teide… ¿cumple las bases?", o: ["No: supera las 100 palabras", "Sí: el tema es correcto", "Sí: los volcanes están permitidos", "No: el tema no es válido"], c: 0, crit: "4.1", fb: "El tema vale, pero la extensión no." },
      { p: "¿Qué función tienen las bases de un concurso?", o: ["Establecer las reglas que deben cumplir los participantes", "Contar una historia", "Expresar una opinión", "Anunciar un producto"], c: 0, crit: "4.2", fb: "Es un texto normativo." },
      { p: "¿Por qué crees que el jurado valora la corrección ortográfica?", o: ["Porque un texto bien escrito se entiende mejor y muestra cuidado", "Porque es lo único importante", "Porque así hay menos participantes", "Porque no les gustan los textos largos"], c: 0, crit: "4.2", fb: "La corrección facilita la comprensión y la calidad del texto." }
    ]
  },
  historia: {
    titulo: "El jardín de las Hespérides", fuente: "Mitología griega relacionada tradicionalmente con Canarias. Versión adaptada para Puerto Palabra.",
    consigna: "Ordena las páginas del relato.", pista: "Sigue el orden lógico: el lugar, el guardián, el héroe, la consecuencia y la relación con Canarias.",
    piezas: [
      { t: "Los antiguos griegos contaban que, más allá del estrecho donde terminaba el mundo conocido, en medio del océano, existía un jardín maravilloso: el jardín de las Hespérides.", etiqueta: "Planteamiento" },
      { t: "En él crecía un árbol que daba manzanas de oro. Lo cuidaban las Hespérides, unas ninfas que cantaban al atardecer, y lo vigilaba Ladón, un dragón que nunca dormía.", etiqueta: "Planteamiento" },
      { t: "Uno de los doce trabajos del héroe Heracles, al que los romanos llamaron Hércules, consistía en conseguir aquellas manzanas. Tras un largo viaje, logró su objetivo.", etiqueta: "Nudo" },
      { t: "Cuenta la tradición que, cuando el dragón fue vencido, de su sangre derramada brotaron unos árboles extraños, de tronco grueso y savia roja: los dragos.", etiqueta: "Desenlace" },
      { t: "Muchos autores identificaron aquel jardín con las Islas Canarias. Por eso, cuando la corteza de un drago se hiere y brota su savia roja, todavía la llamamos «sangre de drago».", etiqueta: "Desenlace" }
    ],
    preguntas: [
      { p: "¿Quién vigilaba el árbol de las manzanas de oro?", o: ["Ladón, un dragón que nunca dormía", "Las Hespérides", "Heracles", "Un guanche"], c: 0, crit: "4.1", fb: "Las Hespérides lo cuidaban; Ladón lo vigilaba." },
      { p: "¿Qué explica el relato sobre los dragos?", o: ["Un origen mítico para su savia roja", "Cómo se plantan", "Por qué viven tantos años", "Dónde se venden"], c: 0, crit: "8.1", fb: "Los mitos ofrecen explicaciones fantásticas de la naturaleza." },
      { p: "El poeta canario Tomás Morales tituló un libro «Las Rosas de Hércules». ¿Con qué personaje del relato se relaciona ese título?", o: ["Con Heracles o Hércules", "Con Ladón", "Con las Hespérides", "Con el drago"], c: 0, crit: "8.1", fb: "Es una relación entre este mito y la literatura canaria." },
      { p: "¿Qué tipo de texto es este relato?", o: ["Un mito: explica el mundo con dioses, héroes y seres fantásticos", "Una noticia", "Una receta", "Una carta"], c: 0, crit: "8.1", fb: "Los mitos son relatos tradicionales con héroes y seres fantásticos." }
    ]
  },
  rimas: {
    poeta: { nombre: "Olga, la poeta del barrio", piel: "clara", pelo: "#9e9e9e", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor" },
    items: [
      { v1: "El Teide, abuelo dormido,", v2: "vigila el mar ___", o: ["encendido", "azul", "tranquilo", "salado"], c: 0, fb: "Rima consonante (-ido). Además, «abuelo dormido» es una personificación." },
      { v1: "Las olas, caballos de espuma,", v2: "galopan entre la ___", o: ["bruma", "arena", "noche", "orilla"], c: 0, fb: "Rima consonante (-uma). «Caballos de espuma» es una metáfora." },
      { v1: "Tu risa es como el sol de verano:", v2: "ilumina el camino ___", o: ["temprano", "oscuro", "largo", "entero"], c: 0, fb: "Rima consonante (-ano). «Como el sol» es una comparación." },
      { v1: "Duerme la isla en el agua", v2: "bajo una manta de ___", o: ["plata", "nubes", "sal", "estrellas"], c: 0, fb: "Rima asonante: coinciden solo las vocales a-a (Agua / plAtA)." }
    ]
  },
  biblioteca: {
    libros: [
      { titulo: "Las Rosas de Hércules", autor: "Tomás Morales", genero: "Poesía", sinopsis: "Obra del poeta modernista Tomás Morales, nacido en Moya (Gran Canaria). Incluye poemas dedicados al mar y al puerto.", color: "#c2255c" },
      { titulo: "Manolito Gafotas", autor: "Elvira Lindo", genero: "Humor", sinopsis: "Manolito cuenta con mucha gracia su vida en el barrio de Carabanchel, en Madrid, con su familia y sus amigos.", color: "#fab005" },
      { titulo: "Platero y yo", autor: "Juan Ramón Jiménez", genero: "Prosa poética (clásico)", sinopsis: "El autor conversa con Platero, su burro, mientras recorren los paisajes de Moguer.", color: "#868e96" },
      { titulo: "Guía de los espacios naturales de Canarias", autor: "Rubén Quintana", genero: "Libro informativo", sinopsis: "Rutas, mapas y fichas de parques nacionales, laurisilva y espacios protegidos de las islas.", color: "#2f9e44" },
      { titulo: "El código secreto del silbo", autor: "Marta Afonso", genero: "Aventura y misterio", sinopsis: "Una niña de La Gomera descubre un mensaje silbado que solo ella puede descifrar.", color: "#1971c2" },
      { titulo: "Robots en el instituto", autor: "Daniel Ojeda", genero: "Ciencia ficción", sinopsis: "Un grupo de estudiantes programa un robot que empieza a tomar decisiones por su cuenta.", color: "#495057" }
    ],
    perfiles: [
      { nombre: "Dácil", pide: "Quiero leer poesía de un poeta canario.", ok: [0], retrato: { piel: "morena", pelo: "#2b1d14", peinado: "largo", ropa: "#c2255c", fondo: "#ffdeeb", edad: "nino" }, fb: "Tomás Morales es uno de los grandes poetas canarios del modernismo." },
      { nombre: "Eloy", pide: "Me apetece algo de humor sobre la vida de un niño en su barrio.", ok: [1], retrato: { piel: "clara", pelo: "#5a3825", peinado: "corto", ropa: "#fab005", fondo: "#fff3bf", edad: "nino", gafas: true }, fb: "Manolito Gafotas es un clásico del humor infantil." },
      { nombre: "Profe Luis", pide: "Busco un libro para preparar una excursión a la naturaleza de las islas.", ok: [3], retrato: { piel: "media", pelo: "#3b2416", peinado: "calvo", ropa: "#2f9e44", fondo: "#d3f9d8", barba: true }, fb: "Un libro informativo con rutas y mapas es lo más útil." }
    ]
  },
  taller: {
    consigna: "Forma palabras con composición, derivación, siglas o acrónimos. Fíjate en el significado de cada pieza.",
    items: [
      { def: "Acrónimo de Organización Nacional de Ciegos Españoles (se lee como una palabra).", piezas: ["O", "N", "C", "E", "S"], sol: ["O", "N", "C", "E"], res: "ONCE", fb: "Acrónimo: se forma con iniciales y se lee como una palabra.", pista: "Toma la inicial de las palabras principales." },
      { def: "Edificio altísimo que parece «rascar» el cielo.", piezas: ["rasca", "cielos", "nubes", "-dor"], sol: ["rasca", "cielos"], res: "rascacielos", fb: "Palabra compuesta: verbo + sustantivo.", pista: "Verbo + sustantivo." },
      { def: "Que se puede reciclar.", piezas: ["recicl", "-able", "-aje", "-ción"], sol: ["recicl", "-able"], res: "reciclable", fb: "El sufijo -able significa «que se puede».", pista: "Como «lavable»." },
      { def: "Acción de reciclar.", piezas: ["recicl", "-aje", "-able", "-ero"], sol: ["recicl", "-aje"], res: "reciclaje", fb: "El sufijo -aje forma sustantivos de acción.", pista: "Como «aterrizaje»." },
      { def: "Época anterior a la historia escrita.", piezas: ["pre-", "historia", "post-", "sub-"], sol: ["pre-", "historia"], res: "prehistoria", fb: "Pre- significa «antes de».", pista: "¿Qué prefijo significa «antes»?" },
      { def: "Volver a utilizar.", piezas: ["re-", "utilizar", "des-", "in-"], sol: ["re-", "utilizar"], res: "reutilizar", fb: "Re- significa «otra vez».", pista: "Como «releer»." },
      { def: "Sigla de Unidad de Cuidados Intensivos.", piezas: ["U", "C", "I", "D"], sol: ["U", "C", "I"], res: "UCI", fb: "Sigla formada con las iniciales de las palabras principales.", pista: "Unidad, Cuidados, Intensivos." }
    ]
  },
  corrector: {
    titulo: "Imprenta sin borrones", titular: "Luz verde al carril bici del centro",
    texto: "El Cabildo {aprovó|aprobó|«Aprobar» se escribe con b.} ayer el nuevo carril bici. La alcaldesa explicó que la obra {tardara|tardará|«Tardará» es aguda acabada en vocal: lleva tilde.} unos meses y que, {aun|aún|«Aún» lleva tilde cuando equivale a «todavía».} así, los comercios podrán abrir con normalidad. «No {se|sé|«Sé», del verbo saber, lleva tilde diacrítica.} cuándo terminará exactamente, pero queremos que {halla|haya|«Haya» es del verbo haber; «halla» es del verbo hallar (encontrar).} menos coches», afirmó. Muchos vecinos se preguntan {porqué|por qué|En las preguntas indirectas se escribe «por qué».} no se hizo antes. El {dia|día|«Día» lleva tilde por el hiato: la i tónica va junto a la a.} de la inauguración habrá una marcha ciclista."
  },
  autopista: [
    { p: "¿___ vienes a la fiesta?", o: ["Cuándo", "Cuando"], c: 0, fb: "Los interrogativos llevan tilde." },
    { p: "No ___ si podré ir.", o: ["sé", "se"], c: 0, fb: "«Sé» del verbo saber lleva tilde diacrítica." },
    { p: "Quiero ___ papas, por favor.", o: ["más", "mas"], c: 0, fb: "«Más» (cantidad) lleva tilde; «mas» equivale a «pero»." },
    { p: "___ no ha llegado el ferry.", o: ["Aún", "Aun"], c: 0, fb: "«Aún» = todavía: lleva tilde." },
    { p: "Espero que no ___ mucho tráfico.", o: ["haya", "halla", "aya"], c: 0, fb: "«Haya» es del verbo haber." },
    { p: "Mi madre ___ un trabajo nuevo el año pasado.", o: ["tuvo", "tubo"], c: 0, fb: "«Tuvo» (tener) con v; un «tubo» es un objeto." },
    { p: "Los alumnos ___ que estaban cansados.", o: ["dijeron", "dijieron"], c: 0, fb: "El pasado de «decir» es «dijeron»." },
    { p: "Sujeto de «Los barcos llegaron al puerto»: ___", o: ["Los barcos", "llegaron", "al puerto"], c: 0, fb: "El sujeto concuerda con el verbo: los barcos llegaron." },
    { p: "Predicado de «Mi abuela cocina papas»: ___", o: ["cocina papas", "Mi abuela", "papas"], c: 0, fb: "El predicado es el verbo y sus complementos." },
    { p: "Cuando llegué, el ferry ya ___.", o: ["había salido", "sale", "saldrá"], c: 0, fb: "Correlación temporal: una acción anterior a otra pasada." },
    { p: "«Wifi» y «selfi» son ___.", o: ["extranjerismos adaptados", "palabras compuestas", "siglas"], c: 0, fb: "Son préstamos del inglés adaptados al español." },
    { p: "«Habían salido» está en ___.", o: ["pretérito pluscuamperfecto", "presente", "futuro simple"], c: 0, fb: "Haber en imperfecto + participio." },
    { p: "Necesito ___ para la excursión.", o: ["agua, gorra y crema", "agua gorra y crema", "agua, gorra, y, crema"], c: 0, fb: "En las enumeraciones se separan los elementos con comas, salvo antes de la «y» final." }
  ],
  noticia: {
    id: "noticia6", titulo: "Ordena la noticia", consigna: "Ordena la noticia según la pirámide invertida: de lo más importante a lo menos importante.", pista: "Titular, entradilla (qué, quién, cuándo, dónde), y después cómo, por qué y las declaraciones.",
    fb: "¡Pirámide invertida perfecta!",
    piezas: [
      { t: "Desarticulada la Banda del Borrón", etiqueta: "Titular" },
      { t: "La policía local detuvo ayer en Puerto Palabra a la banda que borraba las palabras de la ciudad, gracias a las fotos de una reportera de El Eco.", etiqueta: "Entradilla" },
      { t: "La reportera siguió la furgoneta morada del Borrón desde la Fábrica de Palabras hasta la autopista y logró fotografiarla tres veces.", etiqueta: "Cuerpo: cómo" },
      { t: "Las imágenes permitieron localizar un almacén junto al faro donde la banda escondía miles de letras robadas.", etiqueta: "Cuerpo: consecuencias" },
      { t: "«Sin palabras no hay ciudad», declaró la alcaldesa, que agradeció la colaboración de los vecinos.", etiqueta: "Declaraciones" },
      { t: "Desde esta mañana, carteles, libros y emisoras funcionan con normalidad.", etiqueta: "Cierre" }
    ]
  }
};
