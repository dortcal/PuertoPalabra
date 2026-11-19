/* Puerto Palabra · Contenidos de 1.º de Primaria (primer ciclo).
   Frases cortas, mucha narración en voz alta y apoyos visuales. Textos originales. */
window.PP = window.PP || {}; PP.CONTENIDO = PP.CONTENIDO || {};
PP.CONTENIDO[1] = {
  turistas: {
    id: "turistas1", titulo: "En el muelle", consigna: "Ayuda a Pablo, que viene de Madrid. Elige la mejor respuesta.",
    npcs: {
      a: { nombre: "Pablo", rol: "Niño de Madrid", piel: "clara", pelo: "#c0712f", peinado: "corto", ropa: "#4dabf7", fondo: "#d0ebff", edad: "nino" },
      b: { nombre: "Doña Candelaria", rol: "Vecina del puerto", piel: "morena", pelo: "#dee2e6", peinado: "mono", ropa: "#f06595", fondo: "#ffdeeb", edad: "mayor", pendientes: true }
    },
    nodos: [
      { quien: "a", habla: "¡Hola! ¿Dónde está la parada del autobús?", opciones: [
        { t: "¿El autobús? Aquí lo llamamos guagua. ¡Ven, te enseño la parada!", ok: true, fb: "¡Muy bien! En Canarias decimos guagua y en Madrid dicen autobús." },
        { t: "¡Eso no se dice así!", ok: false, fb: "«Autobús» también está bien dicho. Solo es otra forma de decirlo." },
        { t: "No sé.", ok: 0.5, fb: "Pablo busca la guagua. ¡Puedes ayudarle!" } ] },
      { quien: "a", habla: "¡Qué hambre! ¿Qué son esas patatas tan arrugadas?", opciones: [
        { t: "Son papas arrugadas. En Canarias a las patatas las llamamos papas.", ok: true, fb: "¡Eso es! Papa y patata son la misma cosa." },
        { t: "No te lo digo.", ok: false, fb: "Así no ayudas a Pablo. ¡Explícale qué son!" },
        { t: "Son patatas.", ok: 0.5, fb: "Bien, pero puedes decirle que aquí las llamamos papas." } ] },
      { quien: "b", habla: "¡Hola, mi niño! ¿Quieres un poquito de gofio?", narra: "Doña Candelaria se acerca. Pablo te mira sin entender.", opciones: [
        { t: "Pablo, el gofio es una harina de cereales tostados. ¡Está muy rico!", ok: true, fb: "¡Genial! Le has explicado una palabra muy canaria." },
        { t: "Pablo, eso es una cosa rara.", ok: false, fb: "El gofio no es raro: es una comida típica de Canarias." },
        { t: "Comida.", ok: 0.5, fb: "Sí, es comida, pero puedes explicar un poco más." } ] },
      { quien: "a", habla: "¡Muchas gracias por ayudarme! Me tengo que ir.", opciones: [
        { t: "¡De nada, Pablo! ¡Que lo pases muy bien en Canarias!", ok: true, crit: "3.2", fb: "¡Qué amable! Te despides con cariño." },
        { t: "(No le dices nada.)", ok: false, crit: "3.2", fb: "Cuando alguien se despide, le contestamos." },
        { t: "Vale.", ok: 0.5, crit: "3.2", fb: "Contestas, pero puedes ser más amable." } ] }
    ]
  },
  variantes: {
    titulo: "Palabras amigas", consigna: "Une cada palabra de Canarias con la palabra que dicen en otros sitios.", izq: "En Canarias decimos", der: "En otros sitios dicen",
    pares: [
      ["guagua", "autobús", "¡Sí! Guagua y autobús son lo mismo.", "Llevan a muchas personas por la calle."],
      ["papa", "patata", "¡Sí! Papa y patata son lo mismo.", "Se come arrugada con mojo."],
      ["millo", "maíz", "¡Sí! Millo y maíz son lo mismo.", "Es amarillo y crece en una mazorca."],
      ["cotufas", "palomitas", "¡Sí! Cotufas y palomitas son lo mismo.", "Las comemos en el cine."]
    ]
  },
  mediacion: {
    id: "mediacion1", titulo: "Lío en la guagua", consigna: "Ayuda a que todos se lleven bien. Elige la mejor respuesta.",
    npcs: {
      a: { nombre: "Nico", rol: "Niño en la guagua", piel: "media", pelo: "#3b2416", peinado: "corto", ropa: "#40c057", fondo: "#d3f9d8", edad: "nino" },
      b: { nombre: "Lía", rol: "Niña en la guagua", piel: "oscura", pelo: "#111", peinado: "rizado", ropa: "#fab005", fondo: "#fff3bf", edad: "nino" }
    },
    nodos: [
      { quien: "a", narra: "En la guagua, Nico y Lía quieren el mismo asiento.", habla: "¡Quítate, que el asiento es mío!", animo: "enfadado", opciones: [
        { t: "Nico, hay otro asiento libre al lado. ¿Os sentáis juntos?", ok: true, fb: "¡Muy bien! Propones una solución para los dos." },
        { t: "¡Grítale más fuerte, Lía!", ok: false, fb: "Gritar hace que el enfado sea más grande." },
        { t: "Me da igual.", ok: 0.5, fb: "Puedes ayudar a que se pongan de acuerdo." } ] },
      { quien: "b", habla: "Es que Nico siempre me grita.", animo: "triste", opciones: [
        { t: "Nico, ¿puedes pedírselo sin gritar? Por ejemplo: «¿Me dejas sentarme, por favor?».", ok: true, fb: "¡Eso es! Le enseñas a pedir las cosas con amabilidad." },
        { t: "Nico es malo.", ok: false, fb: "Insultar no ayuda. Mejor hablamos de lo que pasa." },
        { t: "Pues vale.", ok: 0.5, fb: "Lía está triste. Puedes ayudarla." } ] },
      { quien: "a", habla: "Además, las niñas no saben jugar al fútbol.", opciones: [
        { t: "Eso no es verdad. Niñas y niños pueden jugar a lo que quieran.", ok: true, fb: "¡Muy bien! Todas las personas pueden jugar a lo que les guste." },
        { t: "Es verdad.", ok: false, fb: "No es verdad. Esa frase deja fuera a las niñas." },
        { t: "Bueno…", ok: 0.5, fb: "Puedes decirle a Nico que eso no es justo." } ] },
      { quien: "b", narra: "Nico y Lía se miran.", habla: "Perdona, Nico. ¿Nos sentamos juntos?", animo: "feliz", opciones: [
        { t: "¡Genial! Así da gusto viajar en guagua.", ok: true, fb: "¡Lo habéis arreglado hablando!" },
        { t: "¡Ya era hora!", ok: false, fb: "Así se pueden volver a enfadar." },
        { t: "Vale.", ok: 0.5, fb: "Bien, ¡pero puedes celebrarlo con ellos!" } ] }
    ]
  },
  caza: [
    { instruccion: "Recoge 4 palabras que decimos en Canarias.", explica: "Por ejemplo: guagua, papa, millo…", objetivo: 4, fbBien: "¡es una palabra canaria!",
      buenas: ["guagua", "papa", "millo", "gofio", "cotufas", "baifo"],
      malas: ["autobús|En Canarias decimos guagua.", "patata|En Canarias decimos papa.", "maíz|En Canarias decimos millo.", "palomitas|En Canarias decimos cotufas."] },
    { instruccion: "Recoge 4 palabras que empiezan por la letra M.", explica: "Escucha el primer sonido: mmm… mar.", objetivo: 4, fbBien: "¡empieza por M!",
      buenas: ["mar", "mesa", "mono", "moto", "mamá", "miel", "mapa"],
      malas: ["sol|Empieza por S: sss… sol.", "pato|Empieza por P: p… pato.", "luna|Empieza por L: lll… luna.", "nube|Empieza por N: nnn… nube.", "dedo|Empieza por D: d… dedo."] }
  ],
  radio: {
    emisora: "Radio Onda Volcán 98.4", locutor: "Yurena",
    texto: "¡Hola, Puerto Palabra! Soy Yurena, de Radio Onda Volcán. Hoy hay una fiesta para todos los niños y niñas. La fiesta es en la arena, al lado del mar. ¡Lleven gorra y crema para el sol! La fiesta empieza a las cinco. ¡Los esperamos!",
    destino: "playa", distractores: ["mercado", "biblioteca"],
    fbMal: "La fiesta es en la arena, al lado del mar. ¿Dónde hay arena?", fbBien: "¡La playa tiene arena y está al lado del mar!",
    preguntas: [
      { p: "¿Dónde es la fiesta?", o: ["En la playa", "En el colegio", "En la biblioteca"], c: 0, fb: "En la arena, al lado del mar: ¡en la playa!" },
      { p: "¿Qué hay que llevar?", o: ["Gorra y crema para el sol", "Un paraguas", "Un libro"], c: 0, fb: "Gorra y crema, porque hace sol." },
      { p: "¿A qué hora empieza la fiesta?", o: ["A las cinco", "A las tres", "A las ocho"], c: 0, fb: "¡A las cinco!" }
    ]
  },
  chismografo: {
    posts: [
      { autor: "Colegio La Laja", usuario: "@colegiolalaja", verificado: true, hace: "hoy", color: "#2f9e44", texto: "Mañana es la fiesta del colegio. Empieza a las diez.", tipo: "fiable", fb: "Lo dice el colegio, que sabe cuándo es la fiesta." },
      { autor: "Pepito123", usuario: "@pepito123", hace: "hace 5 min", color: "#e03131", texto: "¡¡Mañana van a llover caramelos en todo el pueblo!! ¡Cuéntaselo a todos!", tipo: "bulo", fb: "¡Los caramelos no llueven del cielo! Es un bulo." },
      { autor: "Lucía", usuario: "@lucia", hace: "ayer", color: "#ae3ec9", texto: "El helado de fresa es el más rico del mundo.", tipo: "opinion", fb: "Es lo que piensa Lucía. A otras personas les gusta más otro sabor." },
      { autor: "Biblioteca Municipal", usuario: "@biblioteca", verificado: true, hace: "hoy", color: "#7048e8", texto: "La biblioteca abre el lunes a las cuatro de la tarde.", tipo: "fiable", fb: "Lo dice la biblioteca: es un dato." },
      { autor: "Superjuguetes", usuario: "@super_juguetes", hace: "hace 1 h", color: "#f76707", texto: "¡Si compartes esto, te regalamos un perro robot!", tipo: "bulo", fb: "Nadie regala cosas por compartir un mensaje. Es un bulo." }
    ]
  },
  entrevista: {
    id: "entrevista1", titulo: "Entrevista en la plaza", consigna: "Haz una entrevista a Doña Rosa, la panadera. Elige lo mejor.",
    npcs: { a: { nombre: "Doña Rosa", rol: "Panadera", piel: "media", pelo: "#5a3825", peinado: "mono", ropa: "#ffffff", fondo: "#fff4e6", edad: "mayor", sombrero: "gorra", colorSombrero: "#ffffff" } },
    nodos: [
      { quien: "a", habla: "¡Hola! ¿Qué quieres?", opciones: [
        { t: "Buenos días. Soy reportera de El Eco. ¿Puedo hacerle unas preguntas, por favor?", ok: true, fb: "¡Muy bien! Saludas, dices quién eres y pides permiso." },
        { t: "¡Dame pan!", ok: false, fb: "Así no se habla. Hay que saludar y pedir las cosas por favor." },
        { t: "Hola.", ok: 0.5, fb: "Saludas, ¡bien! Ahora explica para qué vienes." } ] },
      { quien: "a", habla: "¡Claro que sí! Pregunta.", opciones: [
        { t: "¿A qué hora empieza a hacer el pan?", ok: true, fb: "¡Buena pregunta! Así sabremos mucho." },
        { t: "¿Por qué su pan es tan feo?", ok: false, fb: "Esa pregunta puede hacer daño." },
        { t: "¿Le gusta el pan?", ok: 0.5, fb: "Puede contestar solo «sí». Mejor pregunta algo que tenga que explicar." } ] },
      { quien: "a", habla: "A las cinco de la mañana, cuando todos duermen.", opciones: [
        { t: "¡Qué temprano! ¿Y qué pan le gusta más hacer?", ok: true, fb: "¡Has escuchado bien y haces otra pregunta!" },
        { t: "(Te pones a jugar con el móvil.)", ok: false, fb: "Si no escuchas, la persona se siente mal." },
        { t: "Ah.", ok: 0.5, fb: "Escuchas, pero puedes preguntar algo más." } ] },
      { quien: "a", habla: "¡El pan de millo!", animo: "feliz", opciones: [
        { t: "¡Muchas gracias por su tiempo, Doña Rosa!", ok: true, fb: "¡Qué bien te despides!" },
        { t: "(Te vas sin decir nada.)", ok: false, fb: "Hay que despedirse y dar las gracias." },
        { t: "Adiós.", ok: 0.5, fb: "Te despides. ¡Puedes dar también las gracias!" } ] }
    ]
  },
  cartel: {
    formato: "cartel", etiqueta: "INVITACIÓN", titulo: "¡Ven a ver los barcos!",
    lineas: ["Día: el sábado", "Hora: a las once", "Lugar: donde llegan los barcos grandes", "Trae: un dibujo de un barco"],
    pie: "¡Te esperamos!",
    destino: "muelle", distractores: ["teatro", "parque"], consignaIr: "¿Adónde hay que ir? Conduce hasta allí.",
    fbMal: "Piensa: ¿dónde llegan los barcos grandes?", fbBien: "¡Los barcos grandes llegan al muelle!",
    preguntas: [
      { p: "¿Qué día es?", o: ["El sábado", "El lunes", "El domingo"], c: 0, crit: "4.1", fb: "¡El sábado!" },
      { p: "¿Qué tienes que llevar?", o: ["Un dibujo de un barco", "Una pelota", "Un bocadillo"], c: 0, crit: "4.1", fb: "Un dibujo de un barco." },
      { p: "¿Para qué sirve este cartel?", o: ["Para invitar a ver los barcos", "Para contar un cuento", "Para vender barcos"], c: 0, crit: "4.2", fb: "Es una invitación." }
    ]
  },
  historia: {
    titulo: "El baifo que quería ver el mar", fuente: "Cuento original ambientado en Canarias.",
    consigna: "Ordena las páginas del cuento.", pista: "¿Qué pasa primero? ¿Y al final?",
    piezas: [
      { t: "En lo alto de una montaña vivía Pinto, un baifo muy curioso.", etiqueta: "Principio" },
      { t: "Un día, una gaviota le dijo: «El mar es azul, enorme y canta». Pinto quiso verlo.", etiqueta: "Principio" },
      { t: "Bajó por el camino, pasó junto a un drago y una tunera, y llegó a la playa.", etiqueta: "Medio" },
      { t: "¡El mar era azul y enorme, y las olas cantaban! Pinto se mojó las patas y se rio.", etiqueta: "Final" }
    ],
    preguntas: [
      { p: "¿Qué animal es Pinto?", o: ["Un baifo, una cabrita", "Un perro", "Una gaviota"], c: 0, crit: "8.1", fb: "Pinto es un baifo: así llamamos en Canarias a la cría de la cabra." },
      { p: "¿Quién le habló del mar?", o: ["Una gaviota", "Su mamá", "Un pez"], c: 0, crit: "4.1", fb: "¡La gaviota!" },
      { p: "¿Cómo se sintió Pinto al final?", o: ["Contento", "Triste", "Enfadado"], c: 0, crit: "8.1", fb: "Se rio: ¡estaba contento!" }
    ]
  },
  rimas: {
    poeta: { nombre: "Olga, la poeta", piel: "clara", pelo: "#9e9e9e", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor" },
    items: [
      { v1: "Mi gata se llama Rosa", v2: "y es muy ___", o: ["hermosa", "bonita", "grande"], c: 0, fb: "Rosa… hermosa: ¡suenan igual al final!" },
      { v1: "El pez nada en el mar", v2: "y no para de ___", o: ["saltar", "comer", "dormir"], c: 0, fb: "Mar… saltar: ¡riman!" },
      { v1: "En la guagua amarilla", v2: "me siento en la ___", o: ["silla", "ventana", "puerta"], c: 0, fb: "Amarilla… silla: ¡riman!" },
      { v1: "El sol sale por la mañana", v2: "y entra por mi ___", o: ["ventana", "casa", "puerta"], c: 0, fb: "Mañana… ventana: ¡riman!" }
    ]
  },
  biblioteca: {
    libros: [
      { titulo: "El baifo que quería volar", autor: "Ana Delgado", genero: "Cuento de animales", sinopsis: "Un baifo sueña con volar como las gaviotas. ¿Lo conseguirá?", color: "#2f9e44" },
      { titulo: "Mi primer libro de dinosaurios", autor: "Luis Ramos", genero: "Libro para aprender", sinopsis: "Descubre cómo eran los dinosaurios, qué comían y cuánto medían.", color: "#e8590c" },
      { titulo: "Cuentos para dormir", autor: "Carmen Suárez", genero: "Cuentos cortos", sinopsis: "Cuentos tranquilos para leer en la cama antes de dormir.", color: "#364fc7" },
      { titulo: "Poemas para jugar", autor: "Elena Cabrera", genero: "Poesía", sinopsis: "Poemas cortitos para cantar, saltar y reír.", color: "#ae3ec9" },
      { titulo: "El barco pirata", autor: "Tomás Quintero", genero: "Aventura", sinopsis: "Un barco pirata busca un tesoro en una isla.", color: "#c92a2a" }
    ],
    perfiles: [
      { nombre: "Iker", pide: "Me encantan los dinosaurios. ¡Quiero aprender cosas sobre ellos!", ok: [1], retrato: { piel: "clara", pelo: "#5a3825", peinado: "corto", ropa: "#e8590c", fondo: "#ffe8cc", edad: "nino" }, fb: "Para aprender cosas, un libro para aprender es perfecto." },
      { nombre: "Laura", pide: "Me gustan mucho los cuentos de animales.", ok: [0], retrato: { piel: "morena", pelo: "#2b1d14", peinado: "coleta", ropa: "#2f9e44", fondo: "#d3f9d8", edad: "nino" }, fb: "¡Un cuento de un baifo! Le encantará." },
      { nombre: "Abuelo Juan", pide: "Quiero un libro para leer con mi nieta antes de dormir.", ok: [2], retrato: { piel: "media", pelo: "#ddd", peinado: "calvo", ropa: "#364fc7", fondo: "#dbe4ff", edad: "mayor", gafas: true }, fb: "Los cuentos para dormir son ideales por la noche." }
    ]
  },
  taller: {
    consigna: "Toca las sílabas en orden para formar la palabra.",
    items: [
      { def: "Animal que dice «miau».", piezas: ["ga", "to", "pa"], sol: ["ga", "to"], res: "gato", fb: "ga + to = gato", pista: "Empieza por «ga»." },
      { def: "Fruta amarilla y alargada que se cultiva en Canarias.", piezas: ["plá", "ta", "no", "ma"], sol: ["plá", "ta", "no"], res: "plátano", fb: "plá + ta + no = plátano", pista: "Tiene tres sílabas." },
      { def: "Va por el mar y lleva personas.", piezas: ["bar", "co", "ca"], sol: ["bar", "co"], res: "barco", fb: "bar + co = barco", pista: "Empieza por «bar»." },
      { def: "Lo abrimos para leer cuentos.", piezas: ["li", "bro", "ma"], sol: ["li", "bro"], res: "libro", fb: "li + bro = libro", pista: "Empieza por «li»." },
      { def: "En Canarias llamamos así al autobús.", piezas: ["gua", "gua", "ta"], sol: ["gua", "gua"], res: "guagua", fb: "gua + gua = guagua", pista: "Se repite la misma sílaba." },
      { def: "Casa de los pájaros en el árbol.", piezas: ["ni", "do", "sa"], sol: ["ni", "do"], res: "nido", fb: "ni + do = nido", pista: "Empieza por «ni»." }
    ]
  },
  corrector: {
    titulo: "Imprenta sin borrones", titular: "Un día en la playa",
    texto: "{ayer|Ayer|Al empezar a escribir se pone mayúscula.} fui a la playa con mi abuela. Vimos un barco muy {grande|grande.|Al final de la frase se pone un punto.} {mi|Mi|Después de un punto va mayúscula.} perro {toby|Toby|Los nombres empiezan con mayúscula.} corrió por la arena. Luego volvimos a {kasa|casa|«Casa» se escribe con c: ca, co, cu.}."
  },
  autopista: [
    { p: "___ casa es grande.", o: ["La", "El"], c: 0, fb: "Decimos «la casa»." },
    { p: "Tengo dos ___.", o: ["perros", "perro"], c: 0, fb: "Si son dos, decimos perros." },
    { p: "___ barco navega.", o: ["El", "La"], c: 0, fb: "Decimos «el barco»." },
    { p: "Me llamo ___.", o: ["Ana", "ana"], c: 0, fb: "Los nombres empiezan con mayúscula." },
    { p: "La ___ es roja.", o: ["casa", "kasa"], c: 0, fb: "ca, co, cu se escriben con c." },
    { p: "Me gusta el ___.", o: ["queso", "keso"], c: 0, fb: "que, qui se escriben con qu." },
    { p: "Las flores son ___.", o: ["bonitas", "bonita"], c: 0, fb: "Muchas flores: bonitas." },
    { p: "Un ___ vuela alto.", o: ["pájaro", "pájaros"], c: 0, fb: "Un pájaro: solo uno." },
    { p: "___ niño juega.", o: ["El", "La"], c: 0, fb: "Decimos «el niño»." }
  ],
  noticia: {
    id: "noticia1", titulo: "Ordena la noticia", consigna: "Ordena la noticia: primero el título y después lo que pasó.", pista: "El título va arriba. Luego, lo que pasó en orden.",
    fb: "¡Muy bien! Primero el título y luego lo que pasó.",
    piezas: [
      { t: "¡Atrapado el Borrón!", etiqueta: "Título" },
      { t: "Ayer, una reportera vio la furgoneta del Borrón.", etiqueta: "Qué pasó" },
      { t: "Le hizo tres fotos.", etiqueta: "Qué pasó" },
      { t: "Ahora la ciudad tiene sus colores otra vez.", etiqueta: "Final" }
    ]
  }
};
