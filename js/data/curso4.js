/* Puerto Palabra · Contenidos de 4.º de Primaria (segundo ciclo). Textos originales;
   la leyenda de Guayota es una versión adaptada de la tradición guanche de Tenerife. */
window.PP = window.PP || {}; PP.CONTENIDO = PP.CONTENIDO || {};
PP.CONTENIDO[4] = {
  turistas: {
    id: "turistas4", titulo: "En el muelle", consigna: "Ayuda a Andrea (de Venezuela) y a Uxía (de Galicia). Compara cómo hablamos en distintos lugares.",
    npcs: {
      a: { nombre: "Andrea", rol: "Turista de Venezuela", piel: "morena", pelo: "#2b1d14", peinado: "rizado", ropa: "#fab005", fondo: "#fff3bf", pendientes: true },
      b: { nombre: "Uxía", rol: "Turista de Galicia", piel: "clara", pelo: "#c0712f", peinado: "coleta", ropa: "#1971c2", fondo: "#d0ebff" }
    },
    nodos: [
      { quien: "a", habla: "¡Qué casualidad! En Venezuela también decimos «cotufas». ¿Por qué será?", opciones: [
        { t: "Porque muchos canarios emigraron a Venezuela y a Cuba, y sus palabras viajaron con ellos.", ok: true, fb: "Exacto: la historia de las personas explica muchas palabras compartidas." },
        { t: "Por pura casualidad, no tiene explicación.", ok: false, fb: "Sí tiene explicación: la emigración canaria a América." },
        { t: "Porque sí.", ok: 0.5, fb: "Piensa en los canarios que se fueron a vivir a América." } ] },
      { quien: "b", habla: "En Galicia hablamos gallego y castellano. ¿Aquí habláis otra lengua?", opciones: [
        { t: "En Canarias hablamos español, con su variedad canaria. Y en La Gomera existe el silbo gomero, un lenguaje silbado.", ok: true, fb: "Muy bien: el español de Canarias es una variedad del español, y el silbo gomero es parte de nuestro patrimonio." },
        { t: "Aquí hablamos canario, que es otra lengua distinta.", ok: false, fb: "El habla canaria no es otra lengua: es una variedad del español." },
        { t: "No lo sé.", ok: 0.5, fb: "En Canarias se habla español, con rasgos propios." } ] },
      { quien: "b", habla: "Me he fijado en que aquí la «z» suena como una «s». ¿Lo pronunciáis mal?", opciones: [
        { t: "No. Se llama seseo y es correcto: también se da en América y en parte de Andalucía.", ok: true, fb: "Exacto: el seseo es una pronunciación normal en millones de hablantes." },
        { t: "Sí, es un fallo que hay que corregir.", ok: false, fb: "No es un fallo: es un rasgo de nuestra variedad." },
        { t: "Será por el acento.", ok: 0.5, fb: "Se llama seseo, y es correcto." } ] },
      { quien: "a", habla: "¿Nos recomiendas algún sitio para comer algo típico?", opciones: [
        { t: "¡Claro! En el Mercado del Puerto pueden probar papas arrugadas con mojo y queso. ¡Les va a encantar!", ok: true, crit: "3.2", fb: "Respuesta amable, concreta y adaptada a lo que piden." },
        { t: "Yo qué sé.", ok: false, crit: "3.2", fb: "Es una respuesta descortés." },
        { t: "En el mercado.", ok: 0.5, crit: "3.2", fb: "Es correcta pero muy escueta." } ] }
    ]
  },
  variantes: {
    titulo: "Diccionario del muelle", consigna: "Une cada palabra que usamos en Canarias con la que se usa en otros lugares.", izq: "En Canarias decimos", der: "En otros lugares se dice",
    pares: [
      ["guagua", "autobús", "También se dice guagua en Cuba y Puerto Rico.", "Transporte público."],
      ["papa", "patata", "«Papa» viene del quechua, una lengua de América.", "Tubérculo que se come arrugado."],
      ["cotufas", "palomitas", "También se dice en Venezuela.", "Se comen en el cine."],
      ["baifo", "cabrito", "Es una palabra de origen guanche.", "Cría de la cabra."],
      ["cholas", "chanclas", "¡Calzado de playa!", "Se llevan en los pies."],
      ["queque", "bizcocho", "«Queque» procede del inglés «cake».", "Dulce horneado."]
    ]
  },
  mediacion: {
    id: "mediacion4", titulo: "Lío en el grupo de clase", consigna: "En el grupo de mensajes de clase alguien está usando las palabras para hacer daño. Intervén con respeto.",
    npcs: {
      a: { nombre: "Jonathan", rol: "Compañero de clase", piel: "clara", pelo: "#3b2416", peinado: "corto", ropa: "#e03131", fondo: "#ffe3e3", edad: "nino", sombrero: "gorra", colorSombrero: "#212529" },
      b: { nombre: "Saúl", rol: "Compañero de clase", piel: "morena", pelo: "#1c1c1c", peinado: "rizado", ropa: "#5c7cfa", fondo: "#dbe4ff", edad: "nino", gafas: true }
    },
    nodos: [
      { quien: "a", narra: "En el grupo de mensajes de la clase, Jonathan publica un mote para Saúl.", habla: "Jajaja, a partir de hoy Saúl se llama «Cuatro Ojos». ¡Que lo pongan todos!", opciones: [
        { t: "Jonathan, los motes hacen daño. Saúl se llama Saúl. Yo no lo voy a poner.", ok: true, fb: "Rechazas una burla con calma y te niegas a participar." },
        { t: "¡Jajaja, Cuatro Ojos!", ok: false, fb: "Repetir el mote hace que el daño sea mayor." },
        { t: "(No dices nada.)", ok: 0.5, fb: "No participas, que ya es algo, pero tu voz podría ayudar a Saúl." } ] },
      { quien: "b", habla: "Me da mucha vergüenza venir mañana a clase…", animo: "triste", opciones: [
        { t: "Saúl, no estás solo. Si quieres, lo hablamos mañana con la tutora.", ok: true, fb: "Muestras empatía y propones buscar ayuda de un adulto." },
        { t: "No es para tanto, es una broma.", ok: false, fb: "Si a alguien le duele, no es una broma." },
        { t: "Ya se les pasará.", ok: 0.5, fb: "Puede que sí, pero Saúl necesita apoyo ahora." } ] },
      { quien: "a", habla: "¡Si solo era una broma! Sois unos exagerados.", opciones: [
        { t: "Una broma tiene gracia para todos. Si a alguien le hace daño, es mejor pedir perdón y borrarla.", ok: true, fb: "Explicas sin atacar y propones una reparación." },
        { t: "¡Pues tú eres un idiota!", ok: false, fb: "Insultar convierte el problema en otro problema." },
        { t: "Bueno, vale.", ok: 0.5, fb: "Puedes explicar por qué no es una broma." } ] },
      { quien: "a", narra: "Jonathan se queda pensando un rato.", habla: "Vale… Perdona, Saúl. Ahora lo borro.", animo: "normal", opciones: [
        { t: "Gracias, Jonathan. Así el grupo vuelve a ser un sitio para todos.", ok: true, fb: "Reconoces el gesto y cierras el conflicto." },
        { t: "¡Ya era hora!", ok: false, fb: "Puede volver a encender la discusión." },
        { t: "Ok.", ok: 0.5, fb: "Bien, aunque puedes valorar su gesto." } ] }
    ]
  },
  caza: [
    { instruccion: "Recoge 5 palabras del español de Canarias.", explica: "Recuerda: algunas vienen del portugués, del inglés o de los guanches.", objetivo: 5, fbBien: "es una palabra canaria.",
      buenas: ["guagua", "millo", "baifo", "cotufas", "gofio", "perenquén", "fisco", "magua", "tenderete", "queque"],
      malas: ["autobús|Se usa más en la Península; aquí decimos guagua.", "palomitas|En Canarias decimos cotufas.", "patata|En Canarias decimos papa.", "maíz|En Canarias decimos millo.", "chanclas|En Canarias decimos cholas.", "vosotros|En Canarias usamos «ustedes»."] },
    { instruccion: "Recoge 5 verbos.", explica: "Los verbos expresan acciones o estados y cambian según la persona y el tiempo: canto, cantaré, cantábamos…", objetivo: 5, fbBien: "es un verbo.",
      buenas: ["correr", "escribimos", "nadaba", "leerán", "cantas", "jugó", "salta", "vivimos"],
      malas: ["rápido|Es un adjetivo: dice cómo es algo.", "mesa|Es un sustantivo.", "nosotros|Es un pronombre personal.", "despacio|Es un adverbio.", "feliz|Es un adjetivo.", "canción|Es un sustantivo."] }
  ],
  radio: {
    emisora: "Radio Onda Volcán 98.4", locutor: "Yurena Martín",
    texto: "Buenas tardes, Puerto Palabra. Les habla Yurena Martín. La exposición de fotografías del volcán que estaba prevista en el Teatro de la Luna no podrá celebrarse allí, porque el teatro está en obras. La organización ha buscado una sala oscura con una gran pantalla, donde normalmente se proyectan películas. Así, las fotos se verán en tamaño gigante. La exposición empieza a las seis y media. Y una curiosidad: todas las fotos las han hecho niños y niñas de los colegios de la ciudad. ¡No se la pierdan!",
    destino: "cine", distractores: ["teatro", "museo"],
    fbMal: "El teatro está en obras. Busca una sala oscura con gran pantalla donde se proyectan películas.", fbBien: "¡En el cine se proyectan películas en una gran pantalla!",
    preguntas: [
      { p: "¿Por qué no se celebra la exposición en el teatro?", o: ["Porque está en obras", "Porque está cerrado los domingos", "Porque es muy pequeño", "Porque no tiene luz"], c: 0, fb: "El teatro está en obras.", pista: "Escucha el principio del boletín." },
      { p: "¿Qué ventaja tiene el nuevo lugar?", o: ["Las fotos se verán en tamaño gigante", "Es gratis", "Está junto al mar", "Tiene más sillas"], c: 0, fb: "La gran pantalla permite ver las fotos en tamaño gigante." },
      { p: "¿Quién ha hecho las fotos?", o: ["Niños y niñas de los colegios", "Fotógrafos famosos", "La locutora", "Los volcanólogos"], c: 0, fb: "Es la curiosidad del final." },
      { p: "¿Qué quiere conseguir la locutora con «¡No se la pierdan!»?", o: ["Animar a la gente a ir", "Que la gente se quede en casa", "Contar un chiste", "Dar una orden obligatoria"], c: 0, fb: "Es una invitación para animar al público." }
    ]
  },
  chismografo: {
    consigna: "Lee cada mensaje: ¿es un dato fiable, un bulo o una opinión? Después, elige la pista que te lo indica.",
    posts: [
      { autor: "Ayuntamiento de Puerto Palabra", usuario: "@aytoPuertoPalabra", verificado: true, hace: "hace 2 h", color: "#1d4e89", texto: "Desde el lunes habrá nuevos contenedores para reciclar aceite usado en la Plaza Mayor y en el Mercado.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Fuente oficial y datos concretos." },
      { autor: "VerdadOculta", usuario: "@verdad_oculta", hace: "hace 3 min", color: "#e03131", texto: "¡¡ATENCIÓN!! Si tiras una botella de plástico al mar, se convierte en un pez en una semana. ¡Compártelo!", tipo: "bulo", pistas: ["exagera", "alarma", "cadena"], fb: "Afirma algo imposible y pide compartirlo." },
      { autor: "Elsa", usuario: "@elsa_surf", hace: "ayer", color: "#ae3ec9", texto: "En mi opinión, la playa más bonita de la isla es Playa Chica.", tipo: "opinion", pistas: ["opinion"], fb: "«En mi opinión» y «la más bonita» indican una opinión." },
      { autor: "Club de Ciencia", usuario: "@clubciencia_pp", verificado: true, hace: "hoy", color: "#2f9e44", texto: "Según el Museo del Mar, una botella de plástico tarda cientos de años en degradarse. Por eso es tan importante reciclar.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Cita de dónde sale la información." },
      { autor: "Anónimo", usuario: "@anonimo_123", hace: "hace 1 h", color: "#868e96", texto: "Me han dicho que mañana cierran todos los colegios. Pásalo.", tipo: "bulo", pistas: ["sinfuente", "cadena"], fb: "«Me han dicho» no es una fuente." }
    ]
  },
  entrevista: {
    id: "entrevista4", titulo: "Entrevista a la volcanóloga", consigna: "Entrevista a la doctora Nira Delgado, que estudia el volcán. Usa un registro adecuado.",
    npcs: { a: { nombre: "Dra. Nira Delgado", rol: "Volcanóloga", piel: "morena", pelo: "#1c1c1c", peinado: "coleta", ropa: "#f76707", fondo: "#ffe8cc", gafas: true } },
    nodos: [
      { quien: "a", habla: "Buenos días. Me dijeron que querías hacerme unas preguntas.", opciones: [
        { t: "Buenos días, doctora. Soy reportero de El Eco. Gracias por atenderme. ¿Le parece que empecemos?", ok: true, fb: "Registro formal y cortés, adecuado para una entrevista." },
        { t: "¡Ey, qué pasa! Cuéntame cosas del volcán.", ok: false, fb: "El registro es demasiado informal para esta situación." },
        { t: "Sí, unas preguntas.", ok: 0.5, fb: "Falta saludar y presentarte." } ] },
      { quien: "a", habla: "Adelante.", opciones: [
        { t: "¿Cómo saben ustedes si un volcán puede entrar en erupción?", ok: true, fb: "Pregunta abierta y relacionada con su trabajo." },
        { t: "¿El volcán va a explotar mañana y vamos a morir todos?", ok: false, fb: "La pregunta exagera y busca alarmar." },
        { t: "¿Le gustan los volcanes?", ok: 0.5, fb: "Se responde con «sí» y no aporta información." } ] },
      { quien: "a", habla: "Medimos los pequeños terremotos, los gases y si el suelo se hincha. Ahora mismo todo está tranquilo.", opciones: [
        { t: "Entonces, si lo he entendido bien, vigilan los terremotos, los gases y el suelo. ¿Y cada cuánto lo miden?", ok: true, fb: "Resumes con tus palabras y repreguntas." },
        { t: "¿Y cuál es su comida favorita?", ok: false, fb: "Cambias de tema justo en lo importante." },
        { t: "Vale.", ok: 0.5, fb: "Podías aprovechar para preguntar más." } ] },
      { quien: "a", habla: "Todos los días, a todas horas. ¿Algo más?", opciones: [
        { t: "Nada más, doctora. Muchas gracias por su tiempo y por explicarlo tan claro.", ok: true, fb: "Despedida formal y agradecida." },
        { t: "Chao, ¡nos vemos!", ok: 0.5, fb: "Es demasiado informal para una entrevista." },
        { t: "(Te vas sin despedirte.)", ok: false, fb: "Siempre hay que despedirse." } ] }
    ]
  },
  escritura: {
    titular: { titulo: "Escribe el titular", tipo: "titular", consigna: "Escribe el titular de la entrevista: breve, claro y que llame la atención.", modelo: "Los científicos vigilan el volcán a todas horas", min: 5, maxPalabras: 14, max: 120, incluir: ["volcán"], punto: false, evaluarFormato: true, boton: "Publicar titular" },
    verso: { titulo: "Tus propios versos", tipo: "verso", consigna: "Escribe una estrofa de dos o cuatro versos sobre el volcán o el mar, con rima.", modelo: "Duerme el volcán gigante / bajo su manta de nieve, / y sueña que el mar lo mueve / con su canto susurrante.", min: 8, max: 300, filas: 4, sello: "¡QUÉ POEMA!", boton: "Guardar poema" },
    recomendacion: { titulo: "Tu recomendación", tipo: "recomendacion", consigna: "Escribe una recomendación del libro que has elegido: por qué te apetece leerlo y a quién se lo recomendarías.", modelo: "Me apetece leer este libro porque…", min: 12, max: 450, filas: 4, punto: true, boton: "Compartir" },
    portada: { titulo: "La portada", tipo: "portada", consigna: "Escribe el gran titular de la portada sobre la captura del Borrón.", modelo: "Las fotos de una reportera llevan a la captura del Borrón", min: 5, maxPalabras: 14, max: 120, incluir: ["Borrón"], punto: false, evaluarFormato: true, sello: "¡A IMPRENTA!", boton: "Enviar a imprenta" }
  },
  grabacion: { consigna: "Graba una crónica de radio de 30 segundos sobre lo que te explicó la volcanóloga.", guion: ["Saluda y presenta la noticia.", "Explica cómo se vigila el volcán.", "Despídete de los oyentes."], segundos: 35 },
  cartel: {
    formato: "cartel", etiqueta: "RECETA", titulo: "Mojo verde de la abuela Pino",
    lineas: ["Ingredientes: cilantro, 3 dientes de ajo, comino, sal, aceite de oliva, un chorrito de vinagre y medio pimiento verde.", "1. Pela los ajos.", "2. Machácalos en el mortero con la sal y el comino.", "3. Añade el cilantro y el pimiento picados y sigue machacando.", "4. Echa el aceite poco a poco y un chorrito de vinagre.", "5. Mezcla bien y sírvelo con papas arrugadas."],
    pie: "Compra los ingredientes frescos en el lugar donde los agricultores y pescadores venden sus productos cada mañana. ¡Y pide ayuda a una persona adulta!",
    destino: "mercado", distractores: ["estacion", "fabrica"], consignaIr: "¿Adónde hay que ir a comprar los ingredientes? Conduce hasta allí.",
    fbMal: "Relee el final: el lugar donde agricultores y pescadores venden sus productos.", fbBien: "¡En el mercado se venden productos frescos!",
    preguntas: [
      { p: "¿Qué ingrediente da al mojo su color verde?", o: ["El cilantro", "El comino", "La sal", "El vinagre"], c: 0, crit: "4.1", fb: "El cilantro (y el pimiento verde)." },
      { p: "¿Qué se hace justo después de machacar los ajos?", o: ["Añadir el cilantro y el pimiento", "Pelar los ajos", "Echar el aceite", "Servirlo"], c: 0, crit: "4.1", fb: "Es el paso 3." },
      { p: "¿Para qué sirven los números del texto?", o: ["Para indicar el orden de los pasos", "Para contar los ingredientes", "Para decir cuánto cuesta", "Para adornar"], c: 0, crit: "4.2", fb: "Los textos instructivos numeran los pasos." },
      { p: "¿Qué tipo de texto es?", o: ["Instructivo: una receta", "Narrativo: un cuento", "Poético: un poema", "Informativo: una noticia"], c: 0, crit: "4.2", fb: "Explica cómo hacer algo paso a paso." }
    ]
  },
  historia: {
    titulo: "Guayota y el Teide", fuente: "Leyenda guanche tradicional de Tenerife. Versión adaptada para Puerto Palabra.",
    consigna: "Ordena las páginas de la leyenda.", pista: "Planteamiento, nudo y desenlace: ¿quién es el malvado?, ¿qué problema causa?, ¿cómo se resuelve?",
    piezas: [
      { t: "Cuentan los guanches, los antiguos habitantes de Tenerife, que en el interior de la gran montaña, a la que llamaban Echeyde, vivía Guayota, un ser malvado que odiaba la luz.", etiqueta: "Planteamiento" },
      { t: "Una noche, Guayota salió de su escondite, atrapó a Magec, el dios del sol, y lo encerró dentro de la montaña. La isla quedó a oscuras y el frío lo cubrió todo.", etiqueta: "Nudo" },
      { t: "Los guanches, asustados, encendieron hogueras y pidieron ayuda a Achamán, el dios del cielo, para que les devolviera la luz.", etiqueta: "Nudo" },
      { t: "Achamán escuchó sus súplicas, bajó hasta la montaña, venció a Guayota y liberó a Magec, que volvió a iluminar el cielo.", etiqueta: "Desenlace" },
      { t: "Después encerró a Guayota en el fondo del volcán y tapó el cráter con un tapón de piedra. Dicen que ese tapón es el pico del Teide y que, cuando la montaña ruge, es Guayota intentando salir.", etiqueta: "Desenlace" }
    ],
    preguntas: [
      { p: "¿Cómo llamaban los guanches al Teide?", o: ["Echeyde", "Magec", "Achamán", "Guayota"], c: 0, crit: "4.1", fb: "Echeyde." },
      { p: "¿Por qué la isla se quedó a oscuras?", o: ["Porque Guayota encerró al sol", "Porque hubo una tormenta", "Porque llegó el invierno", "Porque se apagaron las hogueras"], c: 0, crit: "4.1", fb: "Guayota encerró a Magec, el sol." },
      { p: "¿Qué fenómeno natural intenta explicar esta leyenda?", o: ["La forma y los ruidos del volcán", "Las mareas", "La lluvia", "El arcoíris"], c: 0, crit: "8.1", fb: "Muchas leyendas explican fenómenos de la naturaleza." },
      { p: "¿Qué papel tiene Achamán en la historia?", o: ["Es quien resuelve el problema", "Es el malvado", "Es un guanche asustado", "Es el narrador"], c: 0, crit: "8.1", fb: "Achamán es quien devuelve la luz." }
    ]
  },
  rimas: {
    poeta: { nombre: "Olga, la poeta del barrio", piel: "clara", pelo: "#9e9e9e", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor" },
    items: [
      { v1: "Navega el barco velero", v2: "con su bandera y su ___", o: ["marinero", "capitán", "vela"], c: 0, fb: "Velero… marinero: rima consonante." },
      { v1: "Sobre la playa dorada", v2: "duerme la ola ___", o: ["cansada", "azul", "tranquila"], c: 0, fb: "Dorada… cansada: rima consonante." },
      { v1: "Un timple suena en la plaza", v2: "y la fiesta se ___", o: ["enlaza", "acaba", "anima"], c: 0, fb: "Plaza… enlaza: rima consonante." },
      { v1: "Por la noche, la luna llena", v2: "pinta de plata la ___", o: ["arena", "playa", "montaña"], c: 0, fb: "Llena… arena: rima consonante." }
    ]
  },
  biblioteca: {
    libros: [
      { titulo: "El enigma del drago", autor: "Marta Afonso", genero: "Misterio", sinopsis: "Alguien está dejando mensajes secretos en el tronco del drago más viejo del parque. ¿Quién será?", color: "#2f9e44" },
      { titulo: "Animales de Canarias", autor: "Rubén Quintana", genero: "Libro informativo", sinopsis: "Lagartos gigantes, pinzones azules, tortugas… Fichas y fotos de los animales de las islas.", color: "#1971c2" },
      { titulo: "La isla del tesoro", autor: "Robert Louis Stevenson", genero: "Novela clásica de aventuras", sinopsis: "Jim Hawkins encuentra un mapa del tesoro y se embarca en un viaje lleno de piratas. Versión adaptada.", color: "#495057" },
      { titulo: "Poemas de mar y volcán", autor: "Elena Cabrera", genero: "Poesía", sinopsis: "Poemas para leer en voz alta sobre las islas, el mar y los volcanes.", color: "#ae3ec9" },
      { titulo: "Mi abuela es astronauta", autor: "Daniel Ojeda", genero: "Humor", sinopsis: "La abuela de Lía dice que fue astronauta… y nadie la cree. Hasta que encuentran su traje.", color: "#fab005" },
      { titulo: "El diario de Saúl", autor: "Lola Perera", genero: "Novela realista", sinopsis: "Saúl empieza en un colegio nuevo y escribe en su diario cómo aprende a hacer amigos.", color: "#e64980" }
    ],
    perfiles: [
      { nombre: "Tamara", pide: "Tengo que hacer un trabajo sobre la fauna de las islas.", ok: [1], retrato: { piel: "clara", pelo: "#3b2416", peinado: "coleta", ropa: "#1971c2", fondo: "#d0ebff", edad: "nino" }, fb: "Para un trabajo, un libro informativo es lo más útil." },
      { nombre: "Acerina", pide: "Me encantan los libros de piratas y de barcos, sobre todo los clásicos.", ok: [2], retrato: { piel: "morena", pelo: "#1c1c1c", peinado: "largo", ropa: "#495057", fondo: "#e9ecef", edad: "nino" }, fb: "«La isla del tesoro» es un clásico de piratas." },
      { nombre: "Abuelo Pedro", pide: "A mi nieto le gusta resolver misterios. ¿Qué le compro?", ok: [0], retrato: { piel: "media", pelo: "#ddd", peinado: "calvo", ropa: "#2f9e44", fondo: "#d3f9d8", edad: "mayor", barba: true }, fb: "¡Un misterio en el parque! Perfecto." }
    ]
  },
  taller: {
    consigna: "Monta la palabra: usa prefijos, sufijos o une palabras. Fíjate en el significado de cada pieza.",
    items: [
      { def: "Lugar donde se guardan y se prestan libros.", piezas: ["bibliot", "-eca", "-ero", "-ería"], sol: ["bibliot", "-eca"], res: "biblioteca", fb: "El sufijo -teca significa «lugar donde se guarda algo» (biblioteca, discoteca).", pista: "Termina como «discoteca»." },
      { def: "Persona que trabaja en un barco.", piezas: ["marin", "-ero", "-ería", "sub-"], sol: ["marin", "-ero"], res: "marinero", fb: "El sufijo -ero indica oficio.", pista: "Como cocinero o panadero." },
      { def: "Que no se puede creer.", piezas: ["in-", "creíble", "des-", "re-"], sol: ["in-", "creíble"], res: "increíble", fb: "In- significa «no».", pista: "Como «imposible»." },
      { def: "Transporte que va por debajo del agua.", piezas: ["sub-", "marino", "re-", "des-"], sol: ["sub-", "marino"], res: "submarino", fb: "Sub- significa «debajo de».", pista: "¿Qué prefijo significa «debajo»?" },
      { def: "Casa muy grande (aumentativo).", piezas: ["cas", "-ona", "-ita", "-ero"], sol: ["cas", "-ona"], res: "casona", fb: "-ona/-ón forman aumentativos.", pista: "Lo contrario de «casita»." },
      { def: "Perro pequeño (diminutivo).", piezas: ["perr", "-ito", "-azo", "-era"], sol: ["perr", "-ito"], res: "perrito", fb: "-ito forma diminutivos.", pista: "Muy pequeñito…" },
      { def: "Paraguas para el sol.", piezas: ["para", "sol", "agua"], sol: ["para", "sol"], res: "parasol", fb: "Compuesta: para + sol.", pista: "Como paraguas." }
    ]
  },
  corrector: {
    titulo: "Imprenta sin borrones", titular: "Gran éxito de la feria del libro",
    texto: "El sábado se celebró la feria del libro en la {plaza mayor|Plaza Mayor|Los nombres propios de lugares llevan mayúscula.}. Había puestos de libros y cuentos, y {musica|música|«Música» es esdrújula: todas las esdrújulas llevan tilde.} en directo. Los niños {bailavan|bailaban|Los verbos terminados en -aba se escriben con b.} al ritmo del timple, y una escritora {firmo|firmó|«Firmó» es aguda acabada en vocal: lleva tilde.} sus libros durante toda la tarde. Al final, todos {dijieron|dijeron|El pasado de «decir» es «dijeron», sin i.} que querían repetir."
  },
  autopista: [
    { p: "«Árbol» lleva tilde porque es ___.", o: ["llana acabada en l", "aguda", "esdrújula"], c: 0, fb: "Las llanas que no acaban en vocal, n ni s llevan tilde." },
    { p: "Ayer el ferry ___ tarde.", o: ["llegó", "llego", "llegará"], c: 0, fb: "«Ayer» pide pasado; «llegó» es aguda acabada en vocal: lleva tilde." },
    { p: "Compré manzanas, peras ___ plátanos.", o: [", y", "y", ", "], c: 1, fb: "En una enumeración, antes de la «y» final no se pone coma." },
    { p: "___ niñas juegan en la playa.", o: ["Las", "La", "El"], c: 0, fb: "Determinante y sustantivo concuerdan: las niñas." },
    { p: "Ellos ___ muy contentos.", o: ["estaban", "estábamos", "estaba"], c: 0, fb: "«Ellos» pide tercera persona del plural." },
    { p: "Nosotros ___ al museo el lunes pasado.", o: ["fuimos", "iremos", "vamos"], c: 0, fb: "«El lunes pasado» indica pasado." },
    { p: "Vivo en la isla de ___.", o: ["La Palma", "la palma", "La palma"], c: 0, fb: "Los nombres propios de lugar llevan mayúscula en cada palabra principal." },
    { p: "Mi hermana ___ la guitarra.", o: ["toca", "tocan", "tocamos"], c: 0, fb: "«Mi hermana» es singular: toca." },
    { p: "«Pájaro» es una palabra ___.", o: ["esdrújula", "llana", "aguda"], c: 0, fb: "PÁ-ja-ro: la sílaba tónica es la antepenúltima." },
    { p: "Antes ___ un cine en esta calle.", o: ["había", "abía", "avía"], c: 0, fb: "«Había», del verbo haber: con h y con b." },
    { p: "El contrario de «posible» es ___.", o: ["imposible", "inposible", "desposible"], c: 0, fb: "Antes de p se escribe m: imposible." }
  ],
  noticia: {
    id: "noticia4", titulo: "Ordena la noticia", consigna: "Ordena la noticia como en un periódico: titular, entradilla y cuerpo (de lo más importante a los detalles).", pista: "La entradilla resume la noticia; el cuerpo da los detalles en orden.",
    fb: "¡Estructura de noticia perfecta!",
    piezas: [
      { t: "¡Capturada la Banda del Borrón!", etiqueta: "Titular" },
      { t: "Las fotos de un reportero de El Eco permiten detener a la banda que borraba las palabras de la ciudad.", etiqueta: "Entradilla" },
      { t: "Los hechos ocurrieron ayer, cuando el reportero siguió la furgoneta morada del Borrón hasta la autopista.", etiqueta: "Cuerpo" },
      { t: "Con las imágenes, la policía local localizó el almacén donde la banda escondía las letras robadas.", etiqueta: "Cuerpo" },
      { t: "Desde esta mañana, los carteles, los libros y la radio vuelven a funcionar con normalidad.", etiqueta: "Cierre" }
    ]
  }
};
