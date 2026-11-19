/* Puerto Palabra · Contenidos de 5.º de Primaria (tercer ciclo).
   Textos originales escritos para el juego. Las leyendas son versiones adaptadas de la tradición oral canaria. */
window.PP = window.PP || {}; PP.CONTENIDO = PP.CONTENIDO || {};
PP.CONTENIDO[5] = {
  turistas: {
    id: "turistas5", titulo: "En el muelle", consigna: "Ayuda a los turistas y a los vecinos a entenderse. Elige la mejor respuesta.",
    npcs: {
      a: { nombre: "Valentina", rol: "Turista de Buenos Aires", piel: "clara", pelo: "#3b2416", peinado: "largo", ropa: "#74c0fc", fondo: "#d0ebff", gafas: true },
      b: { nombre: "Don Paco", rol: "Pescador del muelle", piel: "morena", pelo: "#cfcfcf", peinado: "calvo", ropa: "#1d4e89", fondo: "#fff3bf", edad: "mayor", sombrero: "panama", barba: true },
      c: { nombre: "Jordi", rol: "Turista de Barcelona", piel: "media", pelo: "#5a3825", peinado: "corto", ropa: "#ff8787", fondo: "#ffe3e3" }
    },
    nodos: [
      { quien: "a", habla: "¡Hola! ¿Sabés dónde puedo tomar el colectivo para ir al centro?", opciones: [
        { t: "¿El colectivo? Aquí lo llamamos guagua. Sale de la Estación de Guaguas, muy cerca.", ok: true, fb: "Has relacionado «colectivo» (Argentina) con «guagua» (Canarias) y has respondido con amabilidad." },
        { t: "Eso no se dice así. Se dice guagua; hable bien.", ok: false, fb: "Corregir con desprecio es un prejuicio lingüístico: «colectivo» es tan correcto como «guagua»." },
        { t: "No sé qué es un colectivo.", ok: 0.5, fb: "Podías deducirlo por el contexto: en Argentina, «colectivo» es el autobús." } ] },
      { quien: "c", narra: "Don Paco saluda: «¡Chacho! ¿Ustedes vienen a ver la regata?». Jordi te pregunta en voz baja:", habla: "¿Por qué ese señor nos dice «ustedes» y no «vosotros», si somos amigos?", opciones: [
        { t: "En Canarias, como en América, se usa «ustedes» también entre amigos. Es un rasgo de nuestra variedad.", ok: true, fb: "Exacto: el uso de «ustedes» en lugar de «vosotros» es un rasgo del español de Canarias y de América." },
        { t: "Porque en Canarias se habla peor.", ok: false, fb: "Eso es un prejuicio. Ninguna variedad del español es peor que otra." },
        { t: "Porque os está tratando con mucho respeto.", ok: 0.5, fb: "En Canarias «ustedes» se usa en todas las situaciones, no solo para mostrar respeto." } ] },
      { quien: "c", habla: "Y cuando dice «zapato», la z le suena como una s. ¿Lo pronuncia mal?", opciones: [
        { t: "No. Se llama seseo: en Canarias, en parte de Andalucía y en casi toda América la z suena como s. Es correcto.", ok: true, fb: "Muy bien. El seseo es una pronunciación normal y correcta en muchas zonas hispanohablantes." },
        { t: "Sí, la z siempre debe sonar distinta de la s.", ok: false, fb: "No es así: millones de hispanohablantes sesean y hablan correctamente." },
        { t: "Da igual, todos hablamos raro.", ok: false, fb: "Ninguna forma de hablar es «rara»: cada variedad tiene sus propias normas." } ] },
      { quien: "b", habla: "Muchacho, ayúdame a explicarles qué son las papas arrugadas, que no me entienden.", opciones: [
        { t: "Claro, don Paco. Son papas pequeñas cocidas con mucha sal que se comen con mojo. ¡Tienen que probarlas!", ok: true, crit: "3.2", fb: "Respondes con cortesía y das información clara y suficiente." },
        { t: "Que lo busquen en internet.", ok: false, crit: "3.2", fb: "Esa respuesta corta la conversación y no ayuda a nadie." },
        { t: "Son patatas.", ok: 0.5, crit: "3.2", fb: "Es verdad, pero la explicación es muy pobre. Añade detalles y amabilidad." } ] }
    ]
  },
  variantes: {
    titulo: "Diccionario del muelle", consigna: "Une cada palabra que usamos en Canarias con la forma que se usa en otros lugares.", izq: "En Canarias decimos", der: "En otros lugares se dice",
    pares: [
      ["guagua", "autobús (Península)", "En Cuba y Puerto Rico también se dice guagua.", "Es un vehículo de transporte público."],
      ["papa", "patata (Península)", "«Papa» viene del quechua, una lengua de América.", "Se come arrugada, con mojo."],
      ["millo", "maíz", "«Millo» viene del portugués «milho».", "Es un cereal amarillo."],
      ["cotufas", "palomitas (Península)", "En Venezuela también se dice cotufas.", "Se comen en el cine."],
      ["ustedes", "vosotros (Península)", "En Canarias y en América «ustedes» se usa también con amigos.", "Es un pronombre de segunda persona del plural."],
      ["queque", "bizcocho", "«Queque» procede del inglés «cake».", "Es un dulce que se hornea."]
    ]
  },
  mediacion: {
    id: "mediacion5", titulo: "Lío en la estación", consigna: "Usa las palabras para calmar el conflicto, no para empeorarlo.",
    npcs: {
      a: { nombre: "Doña Fefa", rol: "Viajera", piel: "media", pelo: "#e9ecef", peinado: "mono", ropa: "#e64980", fondo: "#ffdeeb", edad: "mayor", gafas: true },
      b: { nombre: "Kevin", rol: "Chico con altavoz", piel: "morena", pelo: "#1c1c1c", peinado: "corto", ropa: "#2b8a3e", fondo: "#d3f9d8", sombrero: "gorra", colorSombrero: "#212529" },
      c: { nombre: "Aisha", rol: "Pasajera", piel: "oscura", pelo: "#111", peinado: "rizado", ropa: "#f59f00", fondo: "#fff3bf", pendientes: true }
    },
    nodos: [
      { quien: "a", narra: "En la estación, un chico escucha música muy alta y una señora se enfada.", habla: "¡Esta juventud no tiene educación! ¡Apaga eso ya, maleducado!", animo: "enfadado", opciones: [
        { t: "Señora, entiendo que le moleste. Kevin, ¿podrías bajar el volumen o usar auriculares, por favor?", ok: true, fb: "Reconoces cómo se siente cada persona y propones una solución concreta. Eso es mediar." },
        { t: "¡Eh, no grite! La maleducada es usted.", ok: false, fb: "Responder con otro insulto hace el conflicto más grande." },
        { t: "Yo no me meto.", ok: 0.5, fb: "A veces no intervenir es prudente, pero aquí podías ayudar con palabras respetuosas." } ] },
      { quien: "b", habla: "Vale, lo bajo… Pero es que todos los mayores se quejan de todo.", opciones: [
        { t: "Generalizar no es justo, igual que no lo es decir que todos los jóvenes son maleducados. Gracias por bajarlo.", ok: true, fb: "Detectas el estereotipo en los dos lados y agradeces el gesto." },
        { t: "Tienes razón, los mayores son unos pesados.", ok: false, fb: "Eso es un estereotipo: juzga a todo un grupo por una persona." },
        { t: "Pues sí, pero bájalo.", ok: 0.5, fb: "Consigues que lo baje, pero das por buena una generalización injusta." } ] },
      { quien: "c", narra: "Llega Aisha, que también habla wolof, la lengua de su familia de Senegal. Alguien en la cola se ríe de su acento.", habla: "Perdone, ¿la guagua para el Faro sale de aquí?", opciones: [
        { t: "Sí, Aisha, sale del andén 3. Y ustedes, reírse de un acento no tiene gracia: hablar varias lenguas es una riqueza.", ok: true, fb: "Ayudas a Aisha y rechazas con respeto la burla. ¡Muy bien!" },
        { t: "No te entiendo, habla bien.", ok: false, fb: "Aisha habla perfectamente. Rechazar un acento es un prejuicio lingüístico." },
        { t: "(Te ríes también.)", ok: false, fb: "Reírse de cómo habla alguien hace daño y excluye." } ] },
      { quien: "a", habla: "Bueno… Perdona, Kevin, por llamarte maleducado.", animo: "normal", opciones: [
        { t: "Gracias a los dos. Así esperamos la guagua tranquilos: música bajita y sin gritos.", ok: true, fb: "Cierras el conflicto con un acuerdo que respeta a todos." },
        { t: "¡Ya era hora!", ok: false, fb: "Esa respuesta puede volver a encender la discusión." },
        { t: "Vale.", ok: 0.5, fb: "Bien, aunque podrías reforzar el acuerdo al que han llegado." } ] }
    ]
  },
  caza: [
    { instruccion: "Recoge 5 palabras propias del español de Canarias.", explica: "Busca las palabras que usamos aquí, aunque en otros lugares digan otras.", objetivo: 5, fbBien: "es una palabra muy canaria.",
      buenas: ["guagua", "millo", "baifo", "cotufa", "gofio", "perenquén", "fisco", "magua", "tenderete", "cholas"],
      malas: ["autobús|Se usa sobre todo en la Península; en Canarias decimos guagua.", "palomitas|En Canarias decimos cotufas.", "patata|En Canarias decimos papa.", "maíz|En Canarias decimos millo.", "chanclas|En Canarias decimos cholas.", "vosotros|En Canarias usamos «ustedes»."] },
    { instruccion: "Recoge 5 adverbios.", explica: "Los adverbios dicen cómo, cuándo, dónde o cuánto ocurre algo, y no cambian de forma.", objetivo: 5, fbBien: "es un adverbio.",
      buenas: ["rápidamente", "ayer", "aquí", "nunca", "despacio", "cerca", "siempre", "también", "quizá", "lejos"],
      malas: ["camino|Es un sustantivo (o una forma del verbo caminar).", "bonito|Es un adjetivo: dice cómo es un nombre.", "correr|Es un verbo en infinitivo.", "nosotros|Es un pronombre personal.", "volcán|Es un sustantivo.", "hacia|Es una preposición."] }
  ],
  radio: {
    emisora: "Radio Onda Volcán 98.4", locutor: "Yurena Martín",
    texto: "Buenas tardes, Puerto Palabra. Les habla Yurena Martín con el boletín de las cinco. Atención: el concierto de timple que estaba previsto en la Plaza Mayor se ha trasladado por culpa del viento. La organización ha decidido celebrarlo junto al edificio más alto de la costa, ese que tiene una luz que gira por las noches para guiar a los barcos. El concierto empezará a las siete y será gratuito. Si van a ir, recuerden llevar ropa de abrigo, porque junto al mar refresca. Y una última noticia: la biblioteca amplía su horario los sábados. Esto ha sido Radio Onda Volcán, la radio que no se borra.",
    destino: "faro", distractores: ["plaza", "muelle"],
    fbMal: "El concierto ya no es en la Plaza Mayor. ¿Qué edificio tiene una luz que gira para guiar a los barcos?", fbBien: "El faro es el edificio con una luz giratoria que guía a los barcos.",
    preguntas: [
      { p: "¿Por qué se ha cambiado el lugar del concierto?", o: ["Por el viento", "Porque llovía", "Porque la plaza estaba cerrada", "Porque no había público"], c: 0, fb: "La locutora dice que se traslada «por culpa del viento».", pista: "Escucha la frase en la que se habla del traslado." },
      { p: "¿A qué hora empieza el concierto?", o: ["A las siete", "A las cinco", "A las ocho", "No lo dice"], c: 0, fb: "A las siete. Las cinco es la hora del boletín.", pista: "No confundas la hora del boletín con la del concierto." },
      { p: "¿Por qué aconseja llevar ropa de abrigo?", o: ["Porque junto al mar refresca", "Porque va a nevar", "Porque el concierto dura toda la noche", "Porque lo exige la organización"], c: 0, fb: "Lo explica con «porque junto al mar refresca»." },
      { p: "¿Cuál es la intención principal del boletín?", o: ["Informar de que el concierto cambia de lugar", "Convencer de que el timple es el mejor instrumento", "Contar un cuento", "Anunciar un producto"], c: 0, fb: "Es un texto informativo: su propósito es avisar de un cambio." }
    ]
  },
  chismografo: {
    posts: [
      { autor: "Ayuntamiento de Puerto Palabra", usuario: "@aytoPuertoPalabra", verificado: true, hace: "hace 2 h", color: "#1d4e89", texto: "Mañana, de 9:00 a 14:00, la calle del Mercado estará cortada por obras. Las guaguas de la línea 3 se desviarán por el Paseo Marítimo.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Lo publica una cuenta oficial y da datos concretos que se pueden comprobar." },
      { autor: "Superofertas777", usuario: "@superofertas777", hace: "hace 5 min", color: "#e03131", texto: "¡¡URGENTE!! Regalamos móviles a los 100 primeros que compartan este mensaje. ¡¡CORRE, QUEDAN POCOS!!", tipo: "bulo", pistas: ["alarma", "exagera", "cadena"], fb: "Mayúsculas, prisas, un premio increíble y la orden de compartir: señales típicas de bulo." },
      { autor: "Lucía_lee", usuario: "@lucia_lee", hace: "ayer", color: "#ae3ec9", texto: "Creo que «La isla que se escondía» es el mejor libro de la biblioteca. ¡Me encantó el final!", tipo: "opinion", pistas: ["opinion"], fb: "«Creo» y «el mejor» indican una opinión: es lo que piensa Lucía, no un dato." },
      { autor: "NoticiasYa", usuario: "@noticias_ya_ya", hace: "hace 1 h", color: "#868e96", texto: "Dicen que han visto un dinosaurio en el volcán. Lo ha contado el primo de un amigo. ¡Reenvíalo a todos tus contactos!", tipo: "bulo", pistas: ["sinfuente", "cadena", "exagera"], fb: "«Dicen» y «el primo de un amigo» no son fuentes. Además, pide reenviarlo." },
      { autor: "Museo del Mar", usuario: "@museodelmar", verificado: true, hace: "hace 3 h", color: "#0b7285", texto: "Hoy cumplimos 25 años. La entrada será gratuita hasta las 20:00. Más información en nuestra página web oficial.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Fuente oficial, fecha, hora y un lugar donde comprobarlo." },
      { autor: "AlertaTotal", usuario: "@alerta_total", hace: "hace 10 min", color: "#f76707", texto: "OJO: beber agua con limón cura TODAS las enfermedades. Los médicos no quieren que lo sepas. ¡Compártelo!", tipo: "bulo", pistas: ["exagera", "sinfuente", "alarma", "cadena"], fb: "Promete algo imposible, no cita ninguna fuente y usa el miedo y las prisas." }
    ]
  },
  entrevista: {
    id: "entrevista5", titulo: "Entrevista en la Plaza Mayor", consigna: "Haz una buena entrevista: saluda, pregunta bien, escucha y despídete.",
    npcs: { a: { nombre: "Mayra", rol: "Socorrista de Playa Chica", piel: "morena", pelo: "#2b1d14", peinado: "coleta", ropa: "#e03131", fondo: "#ffe8cc", sombrero: "gorra", colorSombrero: "#ffd43b" } },
    nodos: [
      { quien: "a", habla: "Hola, ¿eres del periódico El Eco? Tengo cinco minutos antes de volver a la playa.", opciones: [
        { t: "Buenas tardes, soy reportero de El Eco. Gracias por atenderme. ¿Puedo hacerle unas preguntas?", ok: true, fb: "Saludas, te presentas y pides permiso: así empieza una buena entrevista." },
        { t: "Rápido, cuénteme todo lo del Borrón.", ok: false, fb: "Sin saludo ni cortesía, la persona entrevistada se siente incómoda." },
        { t: "Hola.", ok: 0.5, fb: "Saludas, pero falta presentarte y explicar para qué es la entrevista." } ] },
      { quien: "a", habla: "Claro, pregunta lo que quieras.", opciones: [
        { t: "¿Qué vio exactamente esta mañana en la playa?", ok: true, fb: "Es una pregunta abierta y concreta: invita a contar mucho." },
        { t: "¿Vio algo?", ok: 0.5, fb: "Es una pregunta cerrada: se puede responder solo «sí» o «no»." },
        { t: "¿Verdad que el Borrón da muchísimo miedo?", ok: false, fb: "Esa pregunta empuja a responder lo que tú quieres oír." } ] },
      { quien: "a", habla: "Vi una furgoneta morada que dejaba manchas de tinta en los carteles. ¡Las palabras desaparecían!", animo: "sorpresa", opciones: [
        { t: "Entonces, si lo he entendido bien, la furgoneta borraba los carteles. ¿Hacia dónde se fue?", ok: true, fb: "Resumes lo que has oído (escucha activa) y repreguntas." },
        { t: "Ah. ¿Y a usted le gusta su trabajo?", ok: false, fb: "Cambias de tema justo cuando la información es importante: no has escuchado." },
        { t: "¡Qué fuerte!", ok: 0.5, fb: "Muestras interés, pero no aprovechas para conseguir más información." } ] },
      { quien: "a", habla: "Se fue hacia la Fábrica de Palabras. ¿Algo más?", opciones: [
        { t: "Nada más. Muchísimas gracias por su tiempo; nos ha ayudado mucho.", ok: true, fb: "Una despedida amable y agradecida cierra bien la entrevista." },
        { t: "(Te vas sin decir nada.)", ok: false, fb: "Irse sin despedirse es descortés." },
        { t: "Vale, adiós.", ok: 0.5, fb: "Te despides, pero podrías agradecer su tiempo." } ] }
    ]
  },
  escritura: {
    titular: { titulo: "Escribe el titular", tipo: "titular", consigna: "Escribe el titular de la noticia de la entrevista. Debe ser breve, claro y decir qué ha pasado.", modelo: "Una socorrista descubre al Borrón borrando carteles en la playa", min: 5, maxPalabras: 14, max: 120, incluir: ["Borrón"], punto: false, evaluarFormato: true, boton: "Publicar titular" },
    verso: { titulo: "Tus propios versos", tipo: "verso", consigna: "Escribe dos versos que rimen sobre el mar, el volcán o tu barrio (un pareado).", modelo: "En la orilla de la playa / una ola azul se desmaya.", min: 6, max: 240, filas: 3, sello: "¡QUÉ POEMA!", boton: "Guardar poema" },
    recomendacion: { titulo: "Tu recomendación", tipo: "recomendacion", consigna: "Escribe una recomendación para el club de lectura: ¿por qué te apetece leer el libro que has elegido y a quién se lo recomendarías?", modelo: "Me apetece leer «La isla que se escondía» porque me encantan los misterios. Se lo recomendaría a quien disfrute con las aventuras en el mar.", min: 14, max: 500, filas: 4, punto: true, boton: "Compartir en el club" },
    portada: { titulo: "La portada de la edición especial", tipo: "portada", consigna: "Escribe el gran titular de la portada sobre la captura del Borrón.", modelo: "Las fotos de El Eco permiten capturar a la Banda del Borrón", min: 5, maxPalabras: 14, max: 120, incluir: ["Borrón"], punto: false, evaluarFormato: true, sello: "¡A IMPRENTA!", boton: "Enviar a imprenta" }
  },
  grabacion: { consigna: "Graba una crónica de radio (máximo 40 segundos) contando lo que te explicó la socorrista. Tu docente podrá escucharla.", guion: ["Saluda y di quién eres.", "Cuenta qué pasó, dónde y cuándo.", "Termina con una frase de despedida."], segundos: 40 },
  cartel: {
    formato: "horario", etiqueta: "AVISO", titulo: "Línea 7 · Noche de las Letras", subtitulo: "Salidas desde la Estación de Guaguas",
    tabla: { cab: ["Salida", "Parada final", "Duración"], filas: [["18:00", "Mercado del Puerto", "10 min"], ["18:30", "Teatro de la Luna", "20 min"], ["19:15", "Mirador del Volcán", "35 min"], ["20:00", "Museo del Mar", "15 min"]] },
    pie: "Esta noche, el taller de poesía empieza a las 19:00 en el edificio donde se representan obras. Elige la guagua que te deje allí antes de que empiece.",
    destino: "teatro", distractores: ["mirador", "museo"], consignaIr: "¿Dónde es el taller de poesía? Conduce hasta allí.",
    fbMal: "Relee la nota: el taller es «en el edificio donde se representan obras».", fbBien: "En un teatro se representan obras.",
    preguntas: [
      { p: "¿Qué guagua tienes que coger para llegar al taller antes de las 19:00?", o: ["La de las 18:30", "La de las 19:15", "La de las 20:00", "La de las 18:00"], c: 0, crit: "4.1", fb: "Sale a las 18:30 y tarda 20 minutos: llega a las 18:50.", pista: "Suma la duración del viaje a la hora de salida." },
      { p: "¿Qué parada es la más lejana, según el tiempo de viaje?", o: ["Mirador del Volcán", "Mercado del Puerto", "Museo del Mar", "Teatro de la Luna"], c: 0, crit: "4.1", fb: "Es la que más tarda: 35 minutos." },
      { p: "¿Para qué sirve la tabla del cartel?", o: ["Para organizar los horarios y leerlos de un vistazo", "Para adornar el cartel", "Para contar una historia", "Para dar una opinión"], c: 0, crit: "4.2", fb: "Las tablas ordenan datos para encontrarlos con facilidad." },
      { p: "¿Qué información NO aparece en el cartel?", o: ["El precio del billete", "La hora de salida", "La duración del viaje", "La parada final"], c: 0, crit: "4.2", fb: "El cartel no dice cuánto cuesta el billete." }
    ]
  },
  historia: {
    titulo: "San Borondón, la isla que se esconde", fuente: "Leyenda tradicional canaria. Versión adaptada para Puerto Palabra.",
    consigna: "Ordena las páginas de la leyenda para que la historia tenga sentido.", pista: "Piensa en el orden de una narración: planteamiento, nudo y desenlace.",
    piezas: [
      { t: "Hace muchos siglos, los marineros de La Palma, La Gomera y El Hierro contaban algo asombroso: algunos días, al atardecer, aparecía en el horizonte una isla que nadie había pisado nunca.", etiqueta: "Planteamiento" },
      { t: "Una joven pescadora llamada Iballa decidió que algún día llegaría hasta ella. Preparó su barca, guardó gofio, agua y una vela de repuesto, y esperó a que la isla volviera a asomarse.", etiqueta: "Planteamiento" },
      { t: "Una mañana de calma, la isla apareció muy cerca. Iballa remó durante horas, pero cuando ya distinguía los árboles de la orilla, una niebla espesa cubrió el mar y no pudo ver ni la punta de sus remos.", etiqueta: "Nudo" },
      { t: "Cuando la niebla se disipó, la isla había desaparecido. En el agua solo flotaba la rama de un árbol que Iballa no había visto jamás. La guardó como un tesoro y volvió a casa sin saber si había soñado.", etiqueta: "Nudo" },
      { t: "Desde entonces se dice en las islas que San Borondón se esconde de quien la busca y se deja ver por quien no la espera. Y todavía hoy, cuando el horizonte se llena de nubes, alguien la señala y sonríe.", etiqueta: "Desenlace" }
    ],
    preguntas: [
      { p: "¿Quién es la protagonista de la leyenda?", o: ["Iballa, una joven pescadora", "Un monje irlandés", "Un pescador de El Hierro", "Una niña de Tenerife"], c: 0, crit: "8.1", fb: "Iballa es la protagonista: la historia gira en torno a su viaje." },
      { p: "¿Qué impide que Iballa llegue a la isla?", o: ["Una niebla espesa", "Una tormenta", "Un monstruo marino", "Se le acaba el gofio"], c: 0, crit: "4.1", fb: "La niebla cubre el mar justo cuando está a punto de llegar.", pista: "Busca en la página del nudo." },
      { p: "¿Qué significa «se esconde de quien la busca y se deja ver por quien no la espera»?", o: ["Que la isla es un misterio que no se puede encontrar a propósito", "Que la isla está debajo del mar", "Que solo la ven los niños", "Que todos los marineros mienten"], c: 0, crit: "8.1", fb: "Es una forma poética de decir que la isla es misteriosa." },
      { p: "¿Por qué este texto es una leyenda?", o: ["Cuenta un hecho extraordinario ligado a un lugar real y se transmite de generación en generación", "Explica cómo hacer algo paso a paso", "Informa de una noticia de ayer", "Da la opinión de un experto"], c: 0, crit: "8.1", fb: "Las leyendas mezclan lugares reales con hechos fantásticos y se cuentan de padres a hijos." }
    ]
  },
  rimas: {
    poeta: { nombre: "Olga, la poeta del barrio", piel: "clara", pelo: "#9e9e9e", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor", pendientes: true },
    items: [
      { v1: "El volcán se ha despertado", v2: "y ha soltado humo ___", o: ["colorado", "negro", "de repente", "gris"], c: 0, fb: "Rima consonante: despert-ADO / color-ADO." },
      { v1: "Las olas cantan bajito", v2: "y el mar se queda ___", o: ["quietito", "dormido", "en calma", "azul"], c: 0, fb: "Rima consonante: baj-ITO / quiet-ITO." },
      { v1: "Se escapó la guagua amarilla", v2: "y la esperé sentada en la ___", o: ["orilla", "parada", "acera", "calle"], c: 0, fb: "Rima consonante: amar-ILLA / or-ILLA." },
      { v1: "La niebla cubre la cumbre", v2: "y el pinar se vuelve ___", o: ["dulce", "verde", "oscuro", "grande"], c: 0, fb: "Rima asonante: solo coinciden las vocales (cUmbrE / dUlcE)." }
    ]
  },
  biblioteca: {
    libros: [
      { titulo: "La isla que se escondía", autor: "Marta Afonso", genero: "Aventura y misterio", sinopsis: "Tres amigos encuentran un mapa antiguo que señala una isla que aparece y desaparece en el mar. ¿Se atreverán a buscarla?", color: "#1971c2" },
      { titulo: "El club de los cohetes", autor: "Rubén Quintana", genero: "Ciencia ficción", sinopsis: "Leo construye un cohete con su abuela para llegar a la Luna… y lo consigue, aunque no como esperaba.", color: "#495057" },
      { titulo: "Recetas de la abuela Pino", autor: "Pino Santana", genero: "Libro informativo (cocina)", sinopsis: "Aprende a preparar papas arrugadas, mojo y otros platos canarios paso a paso, con ilustraciones.", color: "#e8590c" },
      { titulo: "Poemas para leer en la guagua", autor: "Elena Cabrera", genero: "Poesía", sinopsis: "Versos cortos y divertidos sobre los viajes, el mar y la gente que conocemos por el camino.", color: "#ae3ec9" },
      { titulo: "El perro que hablaba con las estrellas", autor: "Daniel Ojeda", genero: "Novela de amistad", sinopsis: "Un perro abandonado y una niña que acaba de mudarse se vuelven inseparables. Juntos aprenden a no tener miedo.", color: "#2f9e44" },
      { titulo: "Marianela", autor: "Benito Pérez Galdós", genero: "Novela clásica", sinopsis: "Novela del escritor grancanario Benito Pérez Galdós, publicada en 1878. Cuenta la amistad entre Marianela, una joven humilde, y Pablo, un muchacho ciego al que sirve de guía.", color: "#862e9c" }
    ],
    perfiles: [
      { nombre: "Ancor", pide: "Me encantan los misterios y las aventuras en el mar. ¡Quiero un libro que me tenga en vilo!", ok: [0], retrato: { piel: "morena", pelo: "#1c1c1c", peinado: "corto", ropa: "#1971c2", fondo: "#d0ebff", edad: "nino" }, fb: "El género y la contracubierta encajan con lo que busca Ancor." },
      { nombre: "Sara", pide: "Quiero aprender a cocinar algo típico de Canarias para la fiesta del colegio.", ok: [2], retrato: { piel: "clara", pelo: "#c0712f", peinado: "coleta", ropa: "#e8590c", fondo: "#ffe8cc", edad: "nino" }, fb: "Para aprender a hacer algo, lo mejor es un texto informativo con instrucciones." },
      { nombre: "Don Isidro", pide: "Busco una novela clásica de un autor nacido en Gran Canaria.", ok: [5], retrato: { piel: "media", pelo: "#ddd", peinado: "calvo", ropa: "#495057", fondo: "#e9ecef", edad: "mayor", gafas: true }, fb: "Benito Pérez Galdós nació en Las Palmas de Gran Canaria en 1843." }
    ]
  },
  taller: {
    consigna: "Monta la palabra que corresponde a cada definición. Usa composición, derivación o siglas.",
    items: [
      { def: "Utensilio que sirve para sacar los corchos.", piezas: ["saca", "corchos", "-dor", "des-"], sol: ["saca", "corchos"], res: "sacacorchos", fb: "Palabra compuesta: verbo + sustantivo.", pista: "Une dos palabras que ya existen." },
      { def: "Persona que hace o vende pan.", piezas: ["pan", "-adero", "-ería", "em-"], sol: ["pan", "-adero"], res: "panadero", fb: "Derivación: el sufijo -ero indica oficio.", pista: "Los oficios suelen terminar en -ero." },
      { def: "Tienda donde se venden libros.", piezas: ["libr", "-ería", "-ero", "-eta"], sol: ["libr", "-ería"], res: "librería", fb: "El sufijo -ería indica tienda o lugar.", pista: "Piensa en frutería, panadería…" },
      { def: "Hacer lo contrario de «hacer»: volver a dejar algo como estaba.", piezas: ["des-", "hacer", "re-", "-ción"], sol: ["des-", "hacer"], res: "deshacer", fb: "El prefijo des- significa lo contrario.", pista: "¿Qué prefijo significa «lo contrario»?" },
      { def: "Volver a escribir.", piezas: ["re-", "escribir", "des-", "sub-"], sol: ["re-", "escribir"], res: "reescribir", fb: "El prefijo re- significa «otra vez».", pista: "Releer, rehacer, re…" },
      { def: "Sombrilla que protege del sol.", piezas: ["para", "sol", "agua", "-ito"], sol: ["para", "sol"], res: "parasol", fb: "Compuesta: «para» + «sol», como paraguas.", pista: "Se parece a «paraguas»." },
      { def: "Sigla de la Organización de las Naciones Unidas.", piezas: ["O", "N", "U", "E"], sol: ["O", "N", "U"], res: "ONU", fb: "Las siglas se forman con las iniciales.", pista: "Toma la inicial de cada palabra importante." }
    ]
  },
  corrector: {
    titulo: "Imprenta sin borrones", titular: "Los vecinos del puerto recuperan las palabras perdidas",
    texto: "Ayer por la tarde, los vecinos del puerto se reunieron en la plaza para {haber|a ver|«A ver» (a + ver) es mirar o comprobar; «haber» es un verbo.} qué podían hacer contra el Borrón. «{Tu|Tú|«Tú» lleva tilde cuando es pronombre personal.} tienes que ayudarnos», le dijo una vecina a la alcaldesa. Ella respondió que {havía|había|Las formas del verbo «haber» se escriben con h y con b.} un plan: «Al lado del faro {ay|hay|«Hay» es del verbo haber; «ay» expresa dolor o sorpresa.} un almacén lleno de letras». Nadie sabía {porque|por qué|En las preguntas indirectas se escribe «por qué», separado y con tilde.} el Borrón las escondía allí. Esta mañana, las letras ya {bolvían|volvían|«Volver» se escribe con v.} a los carteles del puerto."
  },
  autopista: [
    { p: "¿___ es tu libro favorito?", o: ["Cuál", "Cual"], c: 0, fb: "Los interrogativos llevan tilde: qué, cuál, dónde, cómo…" },
    { p: "Esa mochila es para ___.", o: ["mí", "mi"], c: 0, fb: "«Mí» con tilde es pronombre (para mí); «mi» acompaña a un nombre (mi mochila)." },
    { p: "No sé ___ ha llegado tarde.", o: ["por qué", "porque", "porqué"], c: 0, fb: "Es una pregunta indirecta: «por qué», separado y con tilde." },
    { p: "Llegué tarde ___ perdí la guagua.", o: ["porque", "por qué", "porqué"], c: 0, fb: "«Porque», junto y sin tilde, explica la causa." },
    { p: "Mañana ___ una fiesta en la plaza.", o: ["habrá", "abrá", "havrá"], c: 0, fb: "Futuro del verbo «haber»: con h y con b." },
    { p: "Vamos ___ qué pasa en el puerto.", o: ["a ver", "haber"], c: 0, fb: "«A ver» = preposición «a» + verbo «ver»." },
    { p: "Mira, el gato está ___, debajo del coche.", o: ["ahí", "hay", "ay"], c: 0, fb: "«Ahí» es un adverbio de lugar." },
    { p: "¡___, me he pillado el dedo!", o: ["Ay", "Hay", "Ahí"], c: 0, fb: "«Ay» es una interjección de dolor o sorpresa." },
    { p: "Los alumnos ___ el examen ayer.", o: ["aprobaron", "aprovaron"], c: 0, fb: "«Aprobar» se escribe con b." },
    { p: "Las olas del mar ___ muy altas.", o: ["estaban", "estaba"], c: 0, fb: "El verbo concuerda con el sujeto «las olas» (plural)." },
    { p: "Ayer nosotros ___ al museo.", o: ["fuimos", "iremos", "vamos"], c: 0, fb: "«Ayer» pide un verbo en pasado." },
    { p: "___ hermana toca el timple.", o: ["Tu", "Tú"], c: 0, fb: "«Tu» sin tilde es un posesivo: tu hermana." },
    { p: "ONU es una ___.", o: ["sigla", "palabra compuesta", "palabra derivada"], c: 0, fb: "Se forma con las iniciales de Organización de las Naciones Unidas." }
  ],
  noticia: {
    id: "noticia5", titulo: "Ordena la noticia", consigna: "Ordena la noticia de la portada: del titular a los detalles, como en un periódico de verdad.", pista: "Una noticia empieza por el titular, sigue con la entradilla (un resumen) y termina con los detalles.",
    fb: "¡Estructura de noticia perfecta: titular, entradilla y cuerpo!",
    piezas: [
      { t: "¡Capturada la Banda del Borrón!", etiqueta: "Titular" },
      { t: "Puerto Palabra recupera sus colores tras la detención de la banda que borraba las palabras de la ciudad.", etiqueta: "Entradilla" },
      { t: "Los hechos ocurrieron ayer por la tarde, cuando un reportero de El Eco fotografió la furgoneta morada del Borrón cerca de la autopista.", etiqueta: "Cuerpo" },
      { t: "Gracias a las fotos, la policía local localizó el almacén donde la banda escondía miles de letras robadas.", etiqueta: "Cuerpo" },
      { t: "Hoy, los carteles, los libros y la radio vuelven a funcionar con normalidad.", etiqueta: "Cierre" }
    ]
  }
};
