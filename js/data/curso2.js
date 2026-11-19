/* Puerto Palabra · Contenidos de 2.º de Primaria (primer ciclo). Textos originales;
   la leyenda del Garoé es una versión adaptada de la tradición de El Hierro. */
window.PP = window.PP || {}; PP.CONTENIDO = PP.CONTENIDO || {};
PP.CONTENIDO[2] = {
  turistas: {
    id: "turistas2", titulo: "En el muelle", consigna: "Ayuda a Diego, que viene de México. Elige la mejor respuesta.",
    npcs: {
      a: { nombre: "Diego", rol: "Turista de México", piel: "morena", pelo: "#1c1c1c", peinado: "corto", ropa: "#e8590c", fondo: "#ffe8cc", sombrero: "gorra", colorSombrero: "#2f9e44" },
      b: { nombre: "Doña Pino", rol: "Vecina del puerto", piel: "media", pelo: "#e9ecef", peinado: "mono", ropa: "#7048e8", fondo: "#e5dbff", edad: "mayor", gafas: true }
    },
    nodos: [
      { quien: "a", habla: "¡Hola! ¿Dónde tomo el camión para ir a la playa?", opciones: [
        { t: "¿El camión? Aquí lo llamamos guagua. Sale de la estación, ¡muy cerca!", ok: true, fb: "¡Bien! En México al autobús le dicen camión, y aquí guagua." },
        { t: "¡Un camión es para llevar cosas, no personas!", ok: false, fb: "En México «camión» también es el autobús. No es un error." },
        { t: "No entiendo.", ok: 0.5, fb: "Piensa: quiere ir a la playa en algo que lleva personas." } ] },
      { quien: "a", habla: "Tengo hambre. ¿Me recomiendas algo típico de aquí?", opciones: [
        { t: "Prueba las papas arrugadas con mojo. Las papas son las patatas.", ok: true, fb: "¡Muy bien explicado! En México también dicen papa." },
        { t: "Come lo que quieras.", ok: false, fb: "Diego te ha pedido ayuda. ¡Recomiéndale algo!" },
        { t: "Papas.", ok: 0.5, fb: "Bien, pero explica un poco más." } ] },
      { quien: "b", narra: "Doña Pino saluda: «¡Ay, mi niño, qué guapo vienes!». Diego te pregunta:", habla: "¿Por qué me dice «mi niño» si no soy su hijo?", opciones: [
        { t: "En Canarias decimos «mi niño» o «mi niña» con cariño, a cualquier persona.", ok: true, fb: "¡Exacto! Es una forma cariñosa muy canaria." },
        { t: "Porque se ha equivocado.", ok: false, fb: "No se ha equivocado: es una forma de hablar con cariño." },
        { t: "No sé.", ok: 0.5, fb: "Es una expresión cariñosa que usamos en Canarias." } ] },
      { quien: "a", habla: "¡Muchas gracias por tu ayuda!", opciones: [
        { t: "¡De nada, Diego! Si necesitas algo más, pregúntame.", ok: true, crit: "3.2", fb: "¡Qué amable!" },
        { t: "(Te das la vuelta sin contestar.)", ok: false, crit: "3.2", fb: "Cuando nos dan las gracias, contestamos." },
        { t: "Vale.", ok: 0.5, crit: "3.2", fb: "Contestas, pero puedes ser más amable." } ] }
    ]
  },
  variantes: {
    titulo: "Palabras amigas", consigna: "Une cada palabra de Canarias con la palabra que dicen en otros sitios.", izq: "En Canarias decimos", der: "En otros sitios dicen",
    pares: [
      ["guagua", "autobús", "En Canarias y en Cuba decimos guagua.", "Lleva a muchas personas."],
      ["papa", "patata", "En Canarias y en América decimos papa.", "Se come con mojo."],
      ["millo", "maíz", "¡Millo y maíz son lo mismo!", "Es amarillo."],
      ["cotufas", "palomitas", "¡Cotufas y palomitas son lo mismo!", "Las comemos en el cine."],
      ["cholas", "chanclas", "¡Cholas y chanclas son lo mismo!", "Las llevamos en los pies en la playa."]
    ]
  },
  mediacion: {
    id: "mediacion2", titulo: "Lío en la plaza", consigna: "Ayuda a que todos puedan jugar. Elige la mejor respuesta.",
    npcs: {
      a: { nombre: "Rayco", rol: "Niño del barrio", piel: "morena", pelo: "#2b1d14", peinado: "corto", ropa: "#1971c2", fondo: "#d0ebff", edad: "nino" },
      b: { nombre: "Nerea", rol: "Niña del barrio", piel: "clara", pelo: "#f2c14e", peinado: "coleta", ropa: "#e64980", fondo: "#ffdeeb", edad: "nino" },
      c: { nombre: "Daniel", rol: "Niño que quiere jugar", piel: "media", pelo: "#5a3825", peinado: "rizado", ropa: "#2f9e44", fondo: "#d3f9d8", edad: "nino", gafas: true }
    },
    nodos: [
      { quien: "a", narra: "En la plaza, unos niños juegan. Daniel, que va en silla de ruedas, quiere jugar.", habla: "¡No, tú no juegas, que eres muy lento!", animo: "enfadado", opciones: [
        { t: "Rayco, eso hace daño. Podemos cambiar las reglas para que juguemos todos.", ok: true, fb: "¡Muy bien! Buscas un juego en el que todos puedan participar." },
        { t: "Es verdad, que no juegue.", ok: false, fb: "Dejar fuera a alguien hace daño. Todos tenemos derecho a jugar." },
        { t: "Haced lo que queráis.", ok: 0.5, fb: "Puedes ayudar a que Daniel también juegue." } ] },
      { quien: "a", habla: "Vale… ¿Y qué reglas ponemos?", opciones: [
        { t: "Juguemos a pasarnos la pelota con las manos. ¡Así podemos todos!", ok: true, fb: "¡Genial! Una regla nueva para que nadie se quede fuera." },
        { t: "Las que diga yo, que soy el jefe.", ok: false, fb: "Las reglas se deciden entre todos." },
        { t: "Me da igual.", ok: 0.5, fb: "Propón una idea: ¡puedes ayudar mucho!" } ] },
      { quien: "b", habla: "¡Pues los niños siempre mandan en el juego!", opciones: [
        { t: "Aquí mandamos todos por igual: decidimos juntos.", ok: true, fb: "¡Bien! Niñas y niños deciden igual." },
        { t: "Sí, porque los niños juegan mejor.", ok: false, fb: "No es verdad. Niñas y niños juegan igual de bien." },
        { t: "Ya.", ok: 0.5, fb: "Puedes decir que todos deciden juntos." } ] },
      { quien: "c", habla: "¡Gracias por ayudarme a jugar!", animo: "feliz", opciones: [
        { t: "¡Gracias a ti! Así es más divertido.", ok: true, fb: "¡Qué bien! Daniel es uno más del equipo." },
        { t: "De nada, pobrecito.", ok: false, fb: "Hablar con pena puede hacer sentir mal. Daniel es uno más." },
        { t: "Vale.", ok: 0.5, fb: "¡Puedes decirle algo más amable!" } ] }
    ]
  },
  caza: [
    { instruccion: "Recoge 5 palabras que decimos en Canarias.", explica: "Por ejemplo: guagua, papa, millo, cotufas…", objetivo: 5, fbBien: "¡es una palabra canaria!",
      buenas: ["guagua", "papa", "millo", "gofio", "cotufas", "baifo", "cholas", "perenquén"],
      malas: ["autobús|En Canarias decimos guagua.", "patata|En Canarias decimos papa.", "maíz|En Canarias decimos millo.", "palomitas|En Canarias decimos cotufas.", "chanclas|En Canarias decimos cholas."] },
    { instruccion: "Recoge 5 palabras que nombran animales.", explica: "Busca nombres de animales: perro, gaviota…", objetivo: 5, fbBien: "¡es un animal!",
      buenas: ["perro", "baifo", "gaviota", "lagarto", "perenquén", "pez", "tortuga", "burro"],
      malas: ["corre|Es algo que se hace (una acción).", "grande|Dice cómo es algo.", "mesa|Es un nombre, pero no de animal.", "azul|Es un color.", "salta|Es una acción."] }
  ],
  radio: {
    emisora: "Radio Onda Volcán 98.4", locutor: "Yurena",
    texto: "Buenas tardes, Puerto Palabra. Aquí Radio Onda Volcán con un aviso importante. Se ha perdido un perro pequeño de color marrón. Se llama Chispa y lleva un collar rojo. Lo vieron por última vez junto a los puestos de fruta y de pescado, donde la gente hace la compra. Si lo encuentras, avisa a su dueña, Carmen. ¡Muchas gracias!",
    destino: "mercado", distractores: ["parque", "playa"],
    fbMal: "La radio dice que lo vieron donde la gente hace la compra, junto a la fruta y el pescado.", fbBien: "¡En el mercado se compran fruta y pescado!",
    preguntas: [
      { p: "¿Cómo se llama el perro?", o: ["Chispa", "Carmen", "Collar"], c: 0, fb: "Se llama Chispa." },
      { p: "¿De qué color es su collar?", o: ["Rojo", "Marrón", "Azul"], c: 0, fb: "El collar es rojo." },
      { p: "¿Quién es Carmen?", o: ["La dueña del perro", "La locutora", "Una vendedora de fruta"], c: 0, fb: "Carmen es la dueña." },
      { p: "¿Para qué se da este aviso por la radio?", o: ["Para ayudar a encontrar al perro", "Para vender perros", "Para contar un chiste"], c: 0, fb: "Para que entre todos encontremos a Chispa." }
    ]
  },
  chismografo: {
    posts: [
      { autor: "Ayuntamiento", usuario: "@aytoPuertoPalabra", verificado: true, hace: "hoy", color: "#1d4e89", texto: "El domingo, en la Plaza Mayor, habrá juegos para niños de 10:00 a 13:00.", tipo: "fiable", fb: "Lo dice el Ayuntamiento y da el día, el lugar y la hora." },
      { autor: "MegaRegalos", usuario: "@megaregalos", hace: "hace 5 min", color: "#e03131", texto: "¡¡Comparte esto y te regalamos una bicicleta!! ¡¡Solo hoy!!", tipo: "bulo", fb: "Nadie regala bicicletas por compartir un mensaje." },
      { autor: "Ruth", usuario: "@ruth_pinta", hace: "ayer", color: "#ae3ec9", texto: "Pintar con acuarelas es lo más divertido del mundo.", tipo: "opinion", fb: "Es lo que piensa Ruth. ¡A otras personas les gustan otras cosas!" },
      { autor: "Rumores", usuario: "@rumores", hace: "hace 1 h", color: "#868e96", texto: "Dicen que en el volcán vive un dragón. ¡Pásalo!", tipo: "bulo", fb: "«Dicen» no es una fuente. Y los dragones no existen." },
      { autor: "Museo del Mar", usuario: "@museodelmar", verificado: true, hace: "hoy", color: "#0b7285", texto: "El sábado, la entrada al museo es gratis para los niños.", tipo: "fiable", fb: "Lo dice el propio museo: es un dato fiable." }
    ]
  },
  entrevista: {
    id: "entrevista2", titulo: "Entrevista en la plaza", consigna: "Entrevista a la capitana del ferry. Elige lo mejor.",
    npcs: { a: { nombre: "Capitana Ana", rol: "Capitana del ferry", piel: "clara", pelo: "#3b2416", peinado: "coleta", ropa: "#1c3d6e", fondo: "#d0ebff", sombrero: "gorra", colorSombrero: "#ffffff" } },
    nodos: [
      { quien: "a", habla: "¡Buenas! ¿Me buscabas?", opciones: [
        { t: "Buenas tardes, soy reportero de El Eco. ¿Puedo hacerle unas preguntas, por favor?", ok: true, fb: "¡Muy bien! Saludas, te presentas y pides permiso." },
        { t: "¡Conteste rápido!", ok: false, fb: "Así no se habla. Hay que pedir las cosas con educación." },
        { t: "Hola.", ok: 0.5, fb: "Saludas, pero falta decir quién eres." } ] },
      { quien: "a", habla: "¡Claro! Pregunta lo que quieras.", opciones: [
        { t: "¿Cuántas personas caben en su barco?", ok: true, fb: "¡Buena pregunta!" },
        { t: "¿Su barco es feo?", ok: false, fb: "Esa pregunta no es respetuosa." },
        { t: "¿Le gusta el mar?", ok: 0.5, fb: "Puede responder solo «sí». Pregunta algo que tenga que explicar." } ] },
      { quien: "a", habla: "¡Caben trescientas personas y muchos coches!", animo: "feliz", opciones: [
        { t: "¡Trescientas! ¿Y a qué islas viaja?", ok: true, fb: "¡Escuchas y haces otra pregunta!" },
        { t: "(Bostezas.)", ok: false, fb: "Bostezar parece que no te interesa." },
        { t: "Vale.", ok: 0.5, fb: "Puedes aprovechar para preguntar más." } ] },
      { quien: "a", habla: "Voy a La Gomera y a El Hierro. ¿Algo más?", opciones: [
        { t: "Nada más. ¡Muchas gracias, capitana! ¡Buen viaje!", ok: true, fb: "¡Qué buena despedida!" },
        { t: "(Te vas corriendo.)", ok: false, fb: "Hay que despedirse." },
        { t: "Adiós.", ok: 0.5, fb: "¡Da también las gracias!" } ] }
    ]
  },
  cartel: {
    formato: "nota", etiqueta: "JUEGO", titulo: "Búsqueda del tesoro",
    lineas: ["Pista 1: ve al sitio donde se guardan muchos libros.", "Allí te darán la pista 2.", "Hora: a las cinco y media.", "Equipo: tú y un amigo o amiga."],
    firma: "La Banda de las Letras",
    destino: "biblioteca", distractores: ["mercado", "cine"], consignaIr: "¿Adónde te manda la pista 1? Conduce hasta allí.",
    fbMal: "La pista dice: «el sitio donde se guardan muchos libros».", fbBien: "¡En la biblioteca hay muchísimos libros!",
    preguntas: [
      { p: "¿A qué hora es la búsqueda del tesoro?", o: ["A las cinco y media", "A las tres", "A las doce"], c: 0, crit: "4.1", fb: "A las cinco y media." },
      { p: "¿Con quién tienes que ir?", o: ["Con un amigo o amiga", "Solo", "Con toda la clase"], c: 0, crit: "4.1", fb: "Es un juego por parejas." },
      { p: "¿Qué tipo de texto es?", o: ["Unas instrucciones para un juego", "Un cuento", "Un poema"], c: 0, crit: "4.2", fb: "Dice lo que hay que hacer para jugar." }
    ]
  },
  historia: {
    titulo: "El Garoé, el árbol que daba agua", fuente: "Leyenda tradicional de El Hierro. Versión adaptada para Puerto Palabra.",
    consigna: "Ordena las páginas de la leyenda.", pista: "¿Qué problema había al principio? ¿Cómo se solucionó?",
    piezas: [
      { t: "Hace mucho tiempo, en la isla de El Hierro casi nunca llovía. La gente tenía mucha sed.", etiqueta: "Principio" },
      { t: "Pero en lo alto del monte había un árbol muy especial: el Garoé.", etiqueta: "Principio" },
      { t: "Cada mañana, las nubes se enredaban en sus hojas y el árbol se llenaba de gotitas de agua.", etiqueta: "Medio" },
      { t: "Las gotas caían y llenaban unos pozos que había debajo del árbol.", etiqueta: "Medio" },
      { t: "Así, la gente de la isla siempre tuvo agua. Por eso al Garoé lo llamaban «el árbol santo».", etiqueta: "Final" }
    ],
    preguntas: [
      { p: "¿En qué isla estaba el Garoé?", o: ["En El Hierro", "En Tenerife", "En La Palma"], c: 0, crit: "4.1", fb: "En El Hierro." },
      { p: "¿De dónde sacaba el agua el árbol?", o: ["De las nubes", "De un río", "De un grifo"], c: 0, crit: "4.1", fb: "Las nubes se enredaban en sus hojas." },
      { p: "¿Quién es el protagonista de esta leyenda?", o: ["Un árbol, el Garoé", "Un niño", "Un pez"], c: 0, crit: "8.1", fb: "El Garoé es el protagonista." },
      { p: "¿Por qué lo llamaban «el árbol santo»?", o: ["Porque daba agua a la gente", "Porque era muy alto", "Porque tenía flores"], c: 0, crit: "8.1", fb: "Era muy importante: ¡daba agua a toda la isla!" }
    ]
  },
  rimas: {
    poeta: { nombre: "Olga, la poeta", piel: "clara", pelo: "#9e9e9e", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor" },
    items: [
      { v1: "Un perenquén en la pared", v2: "se esconde porque tiene ___", o: ["sed", "frío", "miedo"], c: 0, fb: "Pared… sed: ¡riman!" },
      { v1: "El barco sale del puerto", v2: "con el capitán ___", o: ["despierto", "dormido", "contento"], c: 0, fb: "Puerto… despierto: ¡riman!" },
      { v1: "La luna sale de noche", v2: "y se esconde detrás de un ___", o: ["coche", "árbol", "barco"], c: 0, fb: "Noche… coche: ¡riman!" },
      { v1: "Salta y salta el baifito", v2: "por la montaña ___", o: ["solito", "verde", "alta"], c: 0, fb: "Baifito… solito: ¡riman!" }
    ]
  },
  biblioteca: {
    libros: [
      { titulo: "Pip, el perenquén aventurero", autor: "Nira Hernández", genero: "Aventura de animales", sinopsis: "Pip sale de su pared para recorrer la isla y conoce a muchos amigos.", color: "#2f9e44" },
      { titulo: "Chistes para reír sin parar", autor: "Pepe Risas", genero: "Humor", sinopsis: "Cien chistes de animales, de colegio y de piratas para reír con tu familia.", color: "#fab005" },
      { titulo: "¿Por qué brillan las estrellas?", autor: "Laura Medina", genero: "Libro para aprender (ciencia)", sinopsis: "Descubre qué son las estrellas y por qué brillan por la noche.", color: "#364fc7" },
      { titulo: "Cuentos para soñar", autor: "Carmen Suárez", genero: "Cuentos cortos", sinopsis: "Cuentos tranquilos para leer antes de dormir.", color: "#7048e8" },
      { titulo: "El tesoro del capitán Sardina", autor: "Tomás Quintero", genero: "Aventura de piratas", sinopsis: "Un pirata despistado ha perdido el mapa de su tesoro. ¿Lo ayudas a encontrarlo?", color: "#c92a2a" },
      { titulo: "Adivina, adivinanza", autor: "Elena Cabrera", genero: "Adivinanzas", sinopsis: "Adivinanzas con rima sobre animales, frutas y cosas de casa.", color: "#ae3ec9" }
    ],
    perfiles: [
      { nombre: "Mencey", pide: "Quiero un libro que me haga reír mucho.", ok: [1], retrato: { piel: "morena", pelo: "#1c1c1c", peinado: "rizado", ropa: "#fab005", fondo: "#fff3bf", edad: "nino" }, fb: "¡Un libro de humor es perfecto para reír!" },
      { nombre: "Laura", pide: "Me encanta mirar el cielo por la noche. Quiero saber más de las estrellas.", ok: [2], retrato: { piel: "clara", pelo: "#c0712f", peinado: "largo", ropa: "#364fc7", fondo: "#dbe4ff", edad: "nino" }, fb: "Para saber más, lo mejor es un libro para aprender." },
      { nombre: "Tía Olga", pide: "Busco un libro de piratas para mi sobrino.", ok: [4], retrato: { piel: "media", pelo: "#3b2416", peinado: "mono", ropa: "#c92a2a", fondo: "#ffe3e3", gafas: true }, fb: "¡Aventura de piratas! Le encantará." }
    ]
  },
  taller: {
    consigna: "Toca las piezas en orden para formar la palabra.",
    items: [
      { def: "Lo usamos cuando llueve.", piezas: ["para", "guas", "sol"], sol: ["para", "guas"], res: "paraguas", fb: "para + aguas: ¡una palabra hecha con dos!", pista: "Nos protege del agua." },
      { def: "Sirve para abrir las latas.", piezas: ["abre", "latas", "puertas"], sol: ["abre", "latas"], res: "abrelatas", fb: "abre + latas = abrelatas", pista: "¿Qué abre?" },
      { def: "Sirve para sacar punta a los lápices.", piezas: ["saca", "puntas", "corchos"], sol: ["saca", "puntas"], res: "sacapuntas", fb: "saca + puntas = sacapuntas", pista: "¿Qué saca?" },
      { def: "Flor amarilla que gira mirando al sol.", piezas: ["gira", "sol", "luna"], sol: ["gira", "sol"], res: "girasol", fb: "gira + sol = girasol", pista: "Gira y mira al…" },
      { def: "Cría de la cabra (en Canarias).", piezas: ["bai", "fo", "ca"], sol: ["bai", "fo"], res: "baifo", fb: "bai + fo = baifo", pista: "Empieza por «bai»." },
      { def: "Animalito que sube por las paredes de las casas canarias.", piezas: ["pe", "ren", "quén", "ta"], sol: ["pe", "ren", "quén"], res: "perenquén", fb: "pe + ren + quén = perenquén", pista: "Tiene tres sílabas." }
    ]
  },
  corrector: {
    titulo: "Imprenta sin borrones", titular: "Un sábado en el parque",
    texto: "El sábado fuimos al {parke|parque|Con e, i se escribe qu: que, qui.} de los Dragos. Mi hermano se {kayó|cayó|Con a, o, u se escribe c: ca, co, cu.} jugando, pero no le pasó nada. Mi abuela tocó la {gitarra|guitarra|Para que suene «gui» se escribe gui.} y cantamos todos. Al volver vimos un {caro|carro|Entre vocales, el sonido fuerte de la r se escribe rr.} lleno de papas y cruzamos el {canpo|campo|Antes de p y b se escribe m.} lleno de flores."
  },
  autopista: [
    { p: "Me gusta el ___.", o: ["queso", "keso"], c: 0, fb: "que, qui se escriben con qu." },
    { p: "Mi tío toca la ___.", o: ["guitarra", "gitarra"], c: 0, fb: "Para que suene «gui» se escribe gui." },
    { p: "El ___ corre mucho.", o: ["perro", "pero"], c: 0, fb: "Entre vocales, el sonido fuerte se escribe rr." },
    { p: "Vamos al ___.", o: ["campo", "canpo"], c: 0, fb: "Antes de p se escribe m." },
    { p: "___Qué hora es?", o: ["¿", "¡"], c: 0, fb: "Las preguntas empiezan con ¿." },
    { p: "___Qué bonito!", o: ["¡", "¿"], c: 0, fb: "Las exclamaciones empiezan con ¡." },
    { p: "Las niñas son ___.", o: ["altas", "alta"], c: 0, fb: "Las niñas (muchas) son altas." },
    { p: "Mi amiga se llama ___.", o: ["Nayra", "nayra"], c: 0, fb: "Los nombres empiezan con mayúscula." },
    { p: "Hay muchas ___ en el cielo.", o: ["nubes", "nuves"], c: 0, fb: "«Nube» se escribe con b." },
    { p: "El ___ es mi postre favorito.", o: ["helado", "elado"], c: 0, fb: "«Helado» se escribe con h." }
  ],
  noticia: {
    id: "noticia2", titulo: "Ordena la noticia", consigna: "Ordena la noticia: primero el título, después lo que pasó y al final cómo terminó.", pista: "El título va arriba. Después, lo que pasó en orden.",
    fb: "¡Muy bien ordenada!",
    piezas: [
      { t: "¡Atrapada la Banda del Borrón!", etiqueta: "Título" },
      { t: "Ayer por la tarde, un reportero vio la furgoneta morada del Borrón.", etiqueta: "Qué pasó" },
      { t: "La siguió por toda la ciudad y le hizo tres fotos.", etiqueta: "Qué pasó" },
      { t: "Con las fotos, la policía encontró las letras robadas.", etiqueta: "Qué pasó" },
      { t: "Hoy Puerto Palabra tiene otra vez todos sus colores.", etiqueta: "Final" }
    ]
  }
};
