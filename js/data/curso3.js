/* Puerto Palabra · Contenidos de 3.º de Primaria (segundo ciclo). Textos originales;
   la leyenda de Gara y Jonay es una versión adaptada de la tradición de La Gomera. */
window.PP = window.PP || {}; PP.CONTENIDO = PP.CONTENIDO || {};
PP.CONTENIDO[3] = {
  turistas: {
    id: "turistas3", titulo: "En el muelle", consigna: "Ayuda a Lupita (de México) y a Álex (de Madrid) a entender cómo hablamos en Canarias.",
    npcs: {
      a: { nombre: "Lupita", rol: "Turista de México", piel: "morena", pelo: "#1c1c1c", peinado: "largo", ropa: "#e64980", fondo: "#ffdeeb", pendientes: true },
      b: { nombre: "Álex", rol: "Turista de Madrid", piel: "clara", pelo: "#5a3825", peinado: "corto", ropa: "#1971c2", fondo: "#d0ebff", gafas: true }
    },
    nodos: [
      { quien: "a", habla: "¡Hola! Se me acabó la batería del celular. ¿Dónde lo puedo cargar?", opciones: [
        { t: "¿El celular? En España solemos decir móvil. Puedes cargarlo en la cafetería del muelle.", ok: true, fb: "Has entendido que «celular» y «móvil» son la misma cosa y has ayudado." },
        { t: "Eso no se dice así: se dice móvil.", ok: false, fb: "«Celular» es tan correcto como «móvil»: es la forma de México y de otros países." },
        { t: "No sé qué es eso.", ok: 0.5, fb: "Por el contexto podías deducirlo: quiere cargar su teléfono." } ] },
      { quien: "b", habla: "Oye, ¿por qué aquí dicen «guagua» y no «autobús»?", opciones: [
        { t: "Porque cada lugar tiene sus palabras. En Canarias y en el Caribe se dice guagua; las dos formas son correctas.", ok: true, fb: "¡Muy bien comparado! Las dos palabras son correctas." },
        { t: "Porque en Canarias no saben decir «autobús».", ok: false, fb: "Eso es un prejuicio: «guagua» es una palabra tan buena como «autobús»." },
        { t: "Porque sí.", ok: 0.5, fb: "Puedes explicarlo mejor: es una palabra propia de Canarias y del Caribe." } ] },
      { quien: "b", habla: "Y tu amiga dice «ustedes» cuando nos habla a nosotros dos. ¡Qué gracioso!", opciones: [
        { t: "No es gracioso ni raro: en Canarias y en América se dice «ustedes» en lugar de «vosotros».", ok: true, fb: "Exacto. Es un rasgo del español de Canarias y de América." },
        { t: "Sí, habla fatal.", ok: false, fb: "Habla perfectamente. Burlarse de cómo habla alguien es un prejuicio." },
        { t: "Jaja.", ok: 0.5, fb: "Podías aprovechar para explicar este rasgo de nuestra forma de hablar." } ] },
      { quien: "a", habla: "¿Me puedes decir cómo llego al faro, por favor?", opciones: [
        { t: "¡Claro! Sigue el paseo marítimo hacia el este y lo verás al final del espigón.", ok: true, crit: "3.2", fb: "Respuesta amable, clara y útil." },
        { t: "Búscalo tú.", ok: false, crit: "3.2", fb: "Esa respuesta es descortés." },
        { t: "Por ahí.", ok: 0.5, crit: "3.2", fb: "Es poco clara: da más detalles." } ] }
    ]
  },
  variantes: {
    titulo: "Diccionario del muelle", consigna: "Une cada palabra que usamos en Canarias con la que se usa en otros lugares.", izq: "En Canarias decimos", der: "En otros lugares se dice",
    pares: [
      ["guagua", "autobús", "En Canarias y en el Caribe decimos guagua.", "Transporte público."],
      ["papa", "patata", "En Canarias y en América decimos papa.", "Se come arrugada."],
      ["millo", "maíz", "«Millo» viene del portugués.", "Cereal amarillo."],
      ["cotufas", "palomitas", "En Venezuela también se dice cotufas.", "Se comen en el cine."],
      ["baifo", "cabrito", "«Baifo» es una palabra de origen guanche.", "Es la cría de la cabra."],
      ["fisco", "trocito, pizca", "«Dame un fisco» = «dame un poquito».", "Una cantidad muy pequeña."]
    ]
  },
  mediacion: {
    id: "mediacion3", titulo: "Lío en el equipo", consigna: "En el equipo del periódico escolar hay un conflicto. Ayuda a resolverlo hablando.",
    npcs: {
      a: { nombre: "Iriome", rol: "Compañero de equipo", piel: "media", pelo: "#2b1d14", peinado: "corto", ropa: "#c92a2a", fondo: "#ffe3e3", edad: "nino" },
      b: { nombre: "Sofía", rol: "Compañera de equipo", piel: "clara", pelo: "#f2c14e", peinado: "largo", ropa: "#2f9e44", fondo: "#d3f9d8", edad: "nino" }
    },
    nodos: [
      { quien: "a", narra: "El equipo prepara el periódico escolar. Iriome quiere decidirlo todo.", habla: "¡Yo escribo la portada y vosotros os calláis!", animo: "enfadado", opciones: [
        { t: "Iriome, todos queremos participar. ¿Qué tal si cada uno propone una idea y votamos?", ok: true, fb: "Propones una forma justa de decidir: escuchar y votar." },
        { t: "¡Cállate tú, mandón!", ok: false, fb: "Insultar empeora el conflicto." },
        { t: "Bueno, haz lo que quieras.", ok: 0.5, fb: "Así evitas la discusión, pero el resto no participa." } ] },
      { quien: "b", narra: "Sofía no ha dicho nada en toda la reunión.", habla: "Yo… no sé si mi idea es buena.", animo: "triste", opciones: [
        { t: "Cuéntanosla, Sofía. Todas las ideas merecen ser escuchadas.", ok: true, fb: "Animas a participar a quien se siente insegura." },
        { t: "Si no sabes, mejor no hables.", ok: false, fb: "Esa frase hace que Sofía se sienta peor y no participe." },
        { t: "Vale.", ok: 0.5, fb: "Puedes animarla a compartir su idea." } ] },
      { quien: "a", habla: "Bah, el deporte es cosa de chicos. La sección de deportes la hago yo.", opciones: [
        { t: "El deporte es de todas las personas. Sofía también puede escribir esa sección si le gusta.", ok: true, fb: "Rechazas un estereotipo de género con respeto." },
        { t: "Es verdad, las chicas no saben de deporte.", ok: false, fb: "Eso es un estereotipo: los gustos no dependen de ser chico o chica." },
        { t: "Como quieras.", ok: 0.5, fb: "No has respondido a una frase que excluye a las chicas." } ] },
      { quien: "b", habla: "¡Mi idea es una entrevista a la farera! ¿Os gusta?", animo: "feliz", opciones: [
        { t: "¡Es genial! Iriome, ¿la escribís juntos?", ok: true, fb: "Cierras con un acuerdo que une al equipo." },
        { t: "Mmm, prefiero la mía.", ok: 0.5, fb: "Puedes decirlo, pero valora también la idea de los demás." },
        { t: "Qué aburrida.", ok: false, fb: "Despreciar una idea hace que la gente deje de participar." } ] }
    ]
  },
  caza: [
    { instruccion: "Recoge 5 palabras propias del español de Canarias.", explica: "Algunas vienen del portugués (millo), otras de los guanches (gofio, baifo).", objetivo: 5, fbBien: "es una palabra canaria.",
      buenas: ["guagua", "millo", "baifo", "cotufas", "gofio", "perenquén", "fisco", "cholas", "tenderete"],
      malas: ["autobús|Se usa sobre todo en la Península; aquí decimos guagua.", "palomitas|En Canarias decimos cotufas.", "patata|En Canarias decimos papa.", "maíz|En Canarias decimos millo.", "chanclas|En Canarias decimos cholas.", "cabrito|En Canarias decimos baifo."] },
    { instruccion: "Recoge 5 adjetivos.", explica: "Los adjetivos dicen cómo es un sustantivo: un mar azul, una casa vieja.", objetivo: 5, fbBien: "es un adjetivo.",
      buenas: ["alto", "verde", "salado", "divertido", "enorme", "tranquila", "valiente", "suave"],
      malas: ["correr|Es un verbo: indica una acción.", "mesa|Es un sustantivo: nombra un objeto.", "ayer|Es un adverbio de tiempo.", "nosotros|Es un pronombre.", "playa|Es un sustantivo.", "cantan|Es un verbo."] }
  ],
  radio: {
    emisora: "Radio Onda Volcán 98.4", locutor: "Yurena Martín",
    texto: "Buenas tardes desde Radio Onda Volcán. Primera noticia: el ferry Isla Bonita llegará con media hora de retraso por el fuerte viento. Segunda noticia: esta tarde se inaugura una exposición de fotos del volcán y de los peces de nuestras costas. Será en el edificio donde se guardan barcos antiguos, redes y conchas, para que todos conozcamos la historia del mar. La exposición abrirá a las seis y la entrada es libre. Y no se olviden: el sábado hay limpieza de la playa. ¡Hasta mañana!",
    destino: "museo", distractores: ["muelle", "cine"],
    fbMal: "La exposición es «en el edificio donde se guardan barcos antiguos, redes y conchas». ¿Qué lugar es?", fbBien: "El Museo del Mar guarda objetos de la historia del mar.",
    preguntas: [
      { p: "¿Por qué llegará tarde el ferry?", o: ["Por el fuerte viento", "Por una avería", "Porque hay niebla", "No lo dice"], c: 0, fb: "La locutora dice que es por el viento.", pista: "Es la primera noticia." },
      { p: "¿A qué hora abre la exposición?", o: ["A las seis", "A las cinco", "A las ocho", "Por la mañana"], c: 0, fb: "A las seis." },
      { p: "¿Qué crees que se puede ver en la exposición?", o: ["Fotos del volcán y de peces", "Películas de piratas", "Coches antiguos", "Cuadros de flores"], c: 0, fb: "Fotos del volcán y de los peces de nuestras costas." },
      { p: "¿Cuántas noticias principales da el boletín, sin contar el recordatorio final?", o: ["Dos", "Una", "Cuatro", "Cinco"], c: 0, fb: "Dos noticias: el ferry y la exposición; luego un recordatorio." }
    ]
  },
  chismografo: {
    consigna: "Lee cada mensaje: ¿es un dato fiable, un bulo o una opinión? Después, elige la pista que te lo indica.",
    posts: [
      { autor: "Ayuntamiento de Puerto Palabra", usuario: "@aytoPuertoPalabra", verificado: true, hace: "hace 1 h", color: "#1d4e89", texto: "El sábado a las 10:00 haremos una limpieza de Playa Chica. Traed guantes y gorra.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "Cuenta oficial con fecha, hora y lugar." },
      { autor: "Ofertas_Locas", usuario: "@ofertaslocas", hace: "hace 2 min", color: "#e03131", texto: "¡¡ÚLTIMA HORA!! Regalamos una consola a todos los que reenvíen este mensaje. ¡¡CORRE!!", tipo: "bulo", pistas: ["alarma", "cadena", "exagera"], fb: "Mayúsculas, prisas y un regalo increíble a cambio de reenviar." },
      { autor: "Marcos", usuario: "@marcos_lee", hace: "ayer", color: "#ae3ec9", texto: "Me parece que el mejor sitio para ver la puesta de sol es el mirador.", tipo: "opinion", pistas: ["opinion"], fb: "«Me parece» y «el mejor» indican una opinión." },
      { autor: "Misterios", usuario: "@misterios", hace: "hace 1 h", color: "#868e96", texto: "Un vecino dice que el agua del mar se ha vuelto de color rosa. Compártelo con todos.", tipo: "bulo", pistas: ["sinfuente", "cadena"], fb: "«Un vecino dice» no es una fuente comprobable." },
      { autor: "Biblioteca Municipal", usuario: "@biblioteca_pp", verificado: true, hace: "hoy", color: "#7048e8", texto: "Desde este mes, abrimos también los sábados de 10:00 a 13:00.", tipo: "fiable", pistas: ["fuente", "datos"], fb: "La propia biblioteca da el horario." }
    ]
  },
  entrevista: {
    id: "entrevista3", titulo: "Entrevista a la farera", consigna: "Entrevista a Carmela, la farera. Saluda, pregunta bien, escucha y despídete.",
    npcs: { a: { nombre: "Carmela", rol: "Farera de la Punta", piel: "morena", pelo: "#7a7a7a", peinado: "coleta", ropa: "#1c3d6e", fondo: "#e7f5ff", edad: "mayor", gafas: true } },
    nodos: [
      { quien: "a", habla: "Hola, ¿vienes por lo del periódico?", opciones: [
        { t: "Buenas tardes, soy reportera de El Eco. Muchas gracias por recibirme. ¿Empezamos?", ok: true, fb: "Saludas, te presentas y agradeces." },
        { t: "Sí. Hable rápido, que tengo prisa.", ok: false, fb: "Es descortés con quien te dedica su tiempo." },
        { t: "Sí.", ok: 0.5, fb: "Falta saludar y presentarte." } ] },
      { quien: "a", habla: "Cuando quieras.", opciones: [
        { t: "¿Para qué sirve un faro y qué hace usted cada noche?", ok: true, fb: "Pregunta abierta: invita a explicar." },
        { t: "¿Trabaja en el faro?", ok: 0.5, fb: "Ya sabes la respuesta y se contesta con «sí»." },
        { t: "¿Verdad que es un trabajo muy aburrido?", ok: false, fb: "Esa pregunta empuja la respuesta y puede molestar." } ] },
      { quien: "a", habla: "El faro avisa a los barcos de dónde está la costa. Yo reviso que la luz funcione toda la noche.", opciones: [
        { t: "O sea, que gracias a la luz los barcos no chocan con las rocas. ¿Ha visto alguna vez una tormenta muy fuerte?", ok: true, fb: "Resumes lo que has oído y repreguntas: ¡escucha activa!" },
        { t: "¿Y le gusta el fútbol?", ok: false, fb: "Cambias de tema: parece que no has escuchado." },
        { t: "Ah, vale.", ok: 0.5, fb: "Escuchas, pero no aprovechas la respuesta." } ] },
      { quien: "a", habla: "¡Muchas! Pero esa es otra historia. ¿Algo más?", animo: "feliz", opciones: [
        { t: "Nada más. Ha sido un placer. ¡Muchas gracias, Carmela!", ok: true, fb: "Despedida amable y agradecida." },
        { t: "(Te vas sin decir nada.)", ok: false, fb: "Siempre hay que despedirse." },
        { t: "Chao.", ok: 0.5, fb: "Es una despedida muy informal para una entrevista." } ] }
    ]
  },
  cartel: {
    formato: "horario", etiqueta: "FIESTAS", titulo: "Fiestas del barrio · Sábado", subtitulo: "Programa de actividades",
    tabla: { cab: ["Hora", "Actividad", "Lugar"], filas: [["10:00", "Carrera de sacos", "Plaza Mayor"], ["12:00", "Taller de timple", "Casa de la Poeta"], ["17:00", "Concurso de cometas", "Mirador del Volcán"], ["21:00", "Verbena", "Paseo Marítimo"]] },
    pie: "A Irene le encanta tocar instrumentos canarios. Llévala a su actividad favorita.",
    destino: "casaPoeta", distractores: ["plaza", "mirador"], consignaIr: "¿Adónde llevarías a Irene? Conduce hasta allí.",
    fbMal: "Piensa: a Irene le encanta tocar instrumentos canarios. ¿Qué actividad tiene un instrumento canario?", fbBien: "¡El timple es un instrumento canario!",
    preguntas: [
      { p: "¿A qué hora es el taller de timple?", o: ["A las 12:00", "A las 10:00", "A las 17:00", "A las 21:00"], c: 0, crit: "4.1", fb: "A las doce." },
      { p: "¿Qué actividad se celebra por la noche?", o: ["La verbena", "La carrera de sacos", "El concurso de cometas", "El taller de timple"], c: 0, crit: "4.1", fb: "La verbena, a las 21:00." },
      { p: "¿Por qué elegiste el taller de timple para Irene?", o: ["Porque el timple es un instrumento canario", "Porque es por la mañana", "Porque es en la playa", "Porque es gratis"], c: 0, crit: "4.1", fb: "Lo has deducido: el texto no lo dice directamente." },
      { p: "¿Qué tipo de texto es?", o: ["Un programa de actividades", "Una carta", "Un cuento", "Una receta"], c: 0, crit: "4.2", fb: "Organiza actividades por horas en una tabla." }
    ]
  },
  historia: {
    titulo: "Gara y Jonay", fuente: "Leyenda tradicional de La Gomera. Versión adaptada para Puerto Palabra.",
    consigna: "Ordena las páginas de la leyenda.", pista: "Planteamiento: quiénes son. Nudo: el problema. Desenlace: cómo termina.",
    piezas: [
      { t: "Hace muchos siglos, en la isla de La Gomera, vivía Gara, una joven que cuidaba una fuente mágica. Decían que el reflejo de su agua mostraba el futuro.", etiqueta: "Planteamiento" },
      { t: "Un día llegó desde Tenerife Jonay, hijo de un jefe de aquella isla, para asistir a unas fiestas. Gara y Jonay se conocieron y se enamoraron.", etiqueta: "Planteamiento" },
      { t: "Pero el agua de la fuente había mostrado un presagio: el fuego y el agua no podían unirse. En ese momento, el Teide empezó a echar fuego.", etiqueta: "Nudo" },
      { t: "Las familias, asustadas, prohibieron que estuvieran juntos. Jonay tuvo que volver a Tenerife, pero cruzó el mar a nado para buscar a Gara.", etiqueta: "Nudo" },
      { t: "Los dos subieron al monte más alto de la isla y decidieron no separarse jamás. Desde entonces, esa montaña se llama Garajonay, con sus dos nombres unidos.", etiqueta: "Desenlace" }
    ],
    preguntas: [
      { p: "¿Quiénes son los protagonistas?", o: ["Gara y Jonay", "Gara y su padre", "Jonay y el Teide", "Dos pescadores"], c: 0, crit: "8.1", fb: "La historia gira en torno a los dos jóvenes." },
      { p: "¿De qué isla era Jonay?", o: ["De Tenerife", "De La Gomera", "De El Hierro", "De La Palma"], c: 0, crit: "4.1", fb: "Llegó desde Tenerife." },
      { p: "¿Qué explica la leyenda al final?", o: ["El origen del nombre Garajonay", "Cómo se forma un volcán", "Por qué hay fuentes", "Cómo se nada en el mar"], c: 0, crit: "8.1", fb: "Garajonay une los nombres de Gara y Jonay." },
      { p: "¿Por qué crees que las familias se asustaron?", o: ["Porque creyeron que el fuego del Teide anunciaba desgracias", "Porque Jonay no sabía nadar", "Porque Gara no cuidaba la fuente", "Porque no les gustaban las fiestas"], c: 0, crit: "8.1", fb: "El fuego coincidió con el presagio de la fuente." }
    ]
  },
  rimas: {
    poeta: { nombre: "Olga, la poeta del barrio", piel: "clara", pelo: "#9e9e9e", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor" },
    items: [
      { v1: "En la cumbre del volcán", v2: "las nubes vienen y ___", o: ["van", "vuelven", "llegan"], c: 0, fb: "Volcán… van: ¡riman!" },
      { v1: "La gaviota vuela alto", v2: "y da en el aire un gran ___", o: ["salto", "giro", "vuelo"], c: 0, fb: "Alto… salto: ¡riman!" },
      { v1: "Mi abuelo toca el tambor", v2: "y mi abuela canta con ___", o: ["amor", "alegría", "ganas"], c: 0, fb: "Tambor… amor: ¡riman!" },
      { v1: "El perenquén sube y baja", v2: "y duerme dentro de una ___", o: ["caja", "casa", "cama"], c: 0, fb: "Baja… caja: ¡riman!" }
    ]
  },
  biblioteca: {
    libros: [
      { titulo: "El misterio del faro apagado", autor: "Marta Afonso", genero: "Misterio", sinopsis: "Una noche, el faro se apaga y un barco se pierde. Dos hermanos investigan qué ha pasado.", color: "#1971c2" },
      { titulo: "Atlas de los volcanes", autor: "Rubén Quintana", genero: "Libro informativo", sinopsis: "Mapas, fotos y explicaciones sobre cómo nacen y funcionan los volcanes del mundo.", color: "#c92a2a" },
      { titulo: "La vuelta al mundo en ochenta días", autor: "Julio Verne", genero: "Novela clásica de aventuras", sinopsis: "Phileas Fogg apuesta a que es capaz de dar la vuelta al mundo en solo ochenta días. Versión adaptada.", color: "#495057" },
      { titulo: "Cuentos de las Islas Afortunadas", autor: "Varios autores", genero: "Leyendas de Canarias", sinopsis: "Leyendas tradicionales de las siete islas: el Garoé, Gara y Jonay, San Borondón y muchas más.", color: "#2f9e44" },
      { titulo: "Diario de una baifa", autor: "Lola Perera", genero: "Humor", sinopsis: "Una baifa muy despistada cuenta en su diario sus aventuras en la granja.", color: "#fab005" },
      { titulo: "Versos de sal", autor: "Elena Cabrera", genero: "Poesía", sinopsis: "Poemas sobre el mar, las barcas y la gente del puerto.", color: "#ae3ec9" }
    ],
    perfiles: [
      { nombre: "Carla", pide: "Quiero leer leyendas de Canarias.", ok: [3], retrato: { piel: "media", pelo: "#3b2416", peinado: "coleta", ropa: "#2f9e44", fondo: "#d3f9d8", edad: "nino" }, fb: "El género y la sinopsis lo dicen: son leyendas canarias." },
      { nombre: "Hugo", pide: "Necesito saber cómo funcionan los volcanes para un trabajo de clase.", ok: [1], retrato: { piel: "clara", pelo: "#5a3825", peinado: "corto", ropa: "#c92a2a", fondo: "#ffe3e3", edad: "nino", gafas: true }, fb: "Para hacer un trabajo, lo mejor es un libro informativo." },
      { nombre: "Profe Ana", pide: "Busco una novela clásica de aventuras y viajes.", ok: [2], retrato: { piel: "morena", pelo: "#2b1d14", peinado: "largo", ropa: "#495057", fondo: "#e9ecef", gafas: true }, fb: "Es una novela clásica de Julio Verne sobre un gran viaje." }
    ]
  },
  taller: {
    consigna: "Monta la palabra que corresponde a cada definición: añade prefijos y sufijos o une palabras.",
    items: [
      { def: "Persona que pesca.", piezas: ["pesca", "-dor", "-dería", "des-"], sol: ["pesca", "-dor"], res: "pescador", fb: "El sufijo -dor indica quién hace la acción.", pista: "Piensa en «jugador», «nadador»…" },
      { def: "Tienda donde se venden frutas.", piezas: ["frut", "-ería", "-ero", "-al"], sol: ["frut", "-ería"], res: "frutería", fb: "El sufijo -ería indica tienda.", pista: "Como panadería o librería." },
      { def: "Lo contrario de «ordenado».", piezas: ["des-", "ordenado", "in-", "re-"], sol: ["des-", "ordenado"], res: "desordenado", fb: "El prefijo des- significa lo contrario.", pista: "Como deshacer, desatar…" },
      { def: "Volver a leer.", piezas: ["re-", "leer", "des-", "pre-"], sol: ["re-", "leer"], res: "releer", fb: "El prefijo re- significa «otra vez».", pista: "Como rehacer." },
      { def: "Árbol que da limones.", piezas: ["limon", "-ero", "-ada", "-ería"], sol: ["limon", "-ero"], res: "limonero", fb: "El sufijo -ero también forma nombres de árboles: limonero, naranjero…", pista: "Como «naranjero»." },
      { def: "Lo contrario de «feliz».", piezas: ["in-", "feliz", "des-", "re-"], sol: ["in-", "feliz"], res: "infeliz", fb: "El prefijo in- también significa lo contrario.", pista: "No es «des-»." },
      { def: "Sirve para sacar punta al lápiz.", piezas: ["saca", "puntas", "corchos"], sol: ["saca", "puntas"], res: "sacapuntas", fb: "Palabra compuesta: verbo + sustantivo.", pista: "Une dos palabras." }
    ]
  },
  corrector: {
    titulo: "Imprenta sin borrones", titular: "Recuerdos de la abuela",
    texto: "Cuando mi abuela era pequeña, {jugava|jugaba|Los verbos terminados en -aba se escriben con b.} todos los días en una playa de {tenerife|Tenerife|Los nombres de lugares empiezan con mayúscula.}. Me cuenta que allí no {abía|había|«Había» es del verbo haber y se escribe con h.} edificios, solo casas pequeñas y barcas. Su padre le {enseñava|enseñaba|Los verbos terminados en -aba se escriben con b.} a pescar y ella {acía|hacía|El verbo «hacer» se escribe con h.} collares con conchas."
  },
  autopista: [
    { p: "Ayer yo ___ al parque.", o: ["fui", "iré", "voy"], c: 0, fb: "«Ayer» pide pasado: fui." },
    { p: "Mañana ___ a la playa.", o: ["iremos", "fuimos"], c: 0, fb: "«Mañana» pide futuro: iremos." },
    { p: "Antes mi abuelo ___ en el campo.", o: ["trabajaba", "trabajava"], c: 0, fb: "Los verbos en -aba se escriben con b." },
    { p: "¿___ hay para comer?", o: ["Qué", "Que"], c: 0, fb: "En las preguntas, «qué» lleva tilde." },
    { p: "Un pez, dos ___.", o: ["peces", "pezes"], c: 0, fb: "La z cambia a c delante de e: pez, peces." },
    { p: "Una luz, muchas ___.", o: ["luces", "luzes"], c: 0, fb: "Luz, luces: la z cambia a c." },
    { p: "___ que estudiar mucho.", o: ["Hay", "Ay"], c: 0, fb: "«Hay» es del verbo haber." },
    { p: "Vivo en ___.", o: ["Lanzarote", "lanzarote"], c: 0, fb: "Los nombres de lugares van con mayúscula." },
    { p: "«Camión» lleva tilde porque es ___.", o: ["aguda acabada en n", "llana", "esdrújula"], c: 0, fb: "Las agudas acabadas en vocal, n o s llevan tilde." },
    { p: "Los niños ___ en el patio.", o: ["juegan", "juega"], c: 0, fb: "«Los niños» es plural: juegan." },
    { p: "Ahora ella ___ un libro.", o: ["lee", "leyó", "leerá"], c: 0, fb: "«Ahora» pide presente: lee." }
  ],
  noticia: {
    id: "noticia3", titulo: "Ordena la noticia", consigna: "Ordena la noticia como en un periódico: titular, entradilla y después los detalles.", pista: "La entradilla resume la noticia en una frase; después vienen los detalles.",
    fb: "¡Estructura de noticia perfecta!",
    piezas: [
      { t: "¡Capturada la Banda del Borrón!", etiqueta: "Titular" },
      { t: "Puerto Palabra recupera sus colores gracias a las fotos de El Eco.", etiqueta: "Entradilla" },
      { t: "Ayer por la tarde, una reportera persiguió la furgoneta morada del Borrón por toda la ciudad.", etiqueta: "Cuerpo" },
      { t: "Gracias a sus fotos, la policía encontró el almacén donde la banda escondía las letras.", etiqueta: "Cuerpo" },
      { t: "Hoy los carteles, los libros y la radio vuelven a funcionar.", etiqueta: "Cierre" }
    ]
  }
};
