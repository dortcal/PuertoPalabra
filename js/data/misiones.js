/* Puerto Palabra · Plantilla de misiones (idéntica para 1.º a 6.º).
   Cada curso aporta su propio contenido en js/data/cursoN.js; aquí solo se define
   la estructura jugable: barrio, lugar, pasos y criterios de evaluación implicados.
   El criterio de cada evidencia se decide en el paso (o en el propio ítem si lo indica). */
window.PP = window.PP || {};

PP.BARRIOS = {
  puerto:    { nombre: "Puerto de las Lenguas", bloque: "I",   color: "#ffb547", musica: "puerto" },
  onda:      { nombre: "Distrito Onda",         bloque: "II",  color: "#3fd0e0", musica: "onda" },
  literario: { nombre: "Barrio Literario",      bloque: "III", color: "#c48cff", musica: "literario" },
  taller:    { nombre: "Taller de la Lengua",   bloque: "IV",  color: "#ff7a45", musica: "taller" }
};

PP.MISIONES = [
  { id: "P1", barrio: "puerto", lugar: "muelle", titulo: "Turistas en el muelle",
    resumen: "Un crucero acaba de llegar y nadie se entiende. Ayuda a turistas y vecinos a comunicarse.",
    criterios: ["1.1", "3.2"],
    pasos: [ { tipo: "dialogo", ref: "turistas", crit: "1.1" }, { tipo: "parejas", ref: "variantes", crit: "1.1" } ] },

  { id: "P2", barrio: "puerto", lugar: "estacion", titulo: "Lío en la guagua",
    resumen: "En la estación de guaguas hay una discusión. Usa las palabras para arreglarlo, no para empeorarlo.",
    criterios: ["10.1", "1.1"],
    pasos: [ { tipo: "dialogo", ref: "mediacion", crit: "10.1" } ] },

  { id: "P3", barrio: "puerto", lugar: "mercado", titulo: "Palabras del puerto",
    resumen: "El Borrón ha soltado palabras por las calles del puerto. Recoge solo las que te piden.",
    criterios: ["1.1"],
    pasos: [ { tipo: "caza", ref: "caza.0", crit: "1.1" } ] },

  { id: "O1", barrio: "onda", lugar: "radio", titulo: "Radio Onda Volcán",
    resumen: "Escucha el boletín de la radio y ve al lugar exacto donde está la noticia.",
    criterios: ["2.1"],
    pasos: [ { tipo: "radio", ref: "radio", crit: "2.1" }, { tipo: "ir", ref: "radio", crit: "2.1" }, { tipo: "preguntas", ref: "radio", crit: "2.1" } ] },

  { id: "O2", barrio: "onda", lugar: "periodico", titulo: "Cazabulos",
    resumen: "El Chismógrafo, la red social de la ciudad, se ha llenado de mensajes raros. ¿Cuáles son de fiar?",
    criterios: ["6.1", "4.2"],
    pasos: [ { tipo: "chismografo", ref: "chismografo", crit: "6.1" } ] },

  { id: "O3", barrio: "onda", lugar: "plaza", titulo: "Exclusiva en directo",
    resumen: "Tienes una entrevista en la Plaza Mayor. Pregunta bien, escucha y escribe el titular.",
    criterios: ["3.2", "5.1", "3.1"],
    pasos: [ { tipo: "dialogo", ref: "entrevista", crit: "3.2" }, { tipo: "escritura", ref: "escritura.titular", crit: "5.1" }, { tipo: "grabacion", ref: "grabacion", crit: "3.1" } ] },

  { id: "O4", barrio: "onda", lugar: "ayuntamiento", titulo: "El cartel misterioso",
    resumen: "Han colgado un aviso en el Ayuntamiento. Léelo con atención: esconde un destino.",
    criterios: ["4.1", "4.2"],
    pasos: [ { tipo: "cartel", ref: "cartel", crit: "4.1" }, { tipo: "ir", ref: "cartel", crit: "4.1" }, { tipo: "preguntas", ref: "cartel", crit: "4.1" } ] },

  { id: "L1", barrio: "literario", lugar: "biblioteca", titulo: "Páginas al viento",
    resumen: "El Borrón ha esparcido las páginas de una leyenda. Recógelas, ordénalas y descubre la historia.",
    criterios: ["8.1", "4.1"],
    pasos: [ { tipo: "paginas", ref: "historia" }, { tipo: "ordenar", ref: "historia", crit: "8.1" }, { tipo: "lectura", ref: "historia" }, { tipo: "preguntas", ref: "historia", crit: "8.1" } ] },

  { id: "L2", barrio: "literario", lugar: "casaPoeta", titulo: "Poeta sin rima",
    resumen: "A la poeta del barrio le han borrado las rimas. Ayúdala y escribe tus propios versos.",
    criterios: ["8.2"],
    pasos: [ { tipo: "rimas", ref: "rimas", crit: "8.2" }, { tipo: "escritura", ref: "escritura.verso", crit: "8.2" } ] },

  { id: "L3", barrio: "literario", lugar: "parque", titulo: "Club de lectura",
    resumen: "El club de lectura del Parque de los Dragos necesita a alguien que recomiende libros.",
    criterios: ["7.1", "7.2"],
    pasos: [ { tipo: "biblioteca", ref: "biblioteca", crit: "7.1" }, { tipo: "escritura", ref: "escritura.recomendacion", crit: "7.2" } ] },

  { id: "T1", barrio: "taller", lugar: "taller", titulo: "Taller de tuneo",
    resumen: "En este taller no se tunean coches: se tunean palabras. Monta piezas y crea palabras nuevas.",
    criterios: ["9.1"],
    pasos: [ { tipo: "taller", ref: "taller", crit: "9.1" } ] },

  { id: "T2", barrio: "taller", lugar: "imprenta", titulo: "Imprenta sin borrones",
    resumen: "La primera página del periódico está llena de errores. Encuéntralos antes de que se imprima.",
    criterios: ["9.2"],
    pasos: [ { tipo: "corrector", ref: "corrector", crit: "9.2" } ] },

  { id: "T3", barrio: "taller", lugar: "fabrica", titulo: "Caza gramatical",
    resumen: "La Fábrica de Palabras se ha averiado y las palabras corren por la calle. Atrapa las que te piden.",
    criterios: ["9.1"],
    pasos: [ { tipo: "caza", ref: "caza.1", crit: "9.1" } ] },

  { id: "T4", barrio: "taller", lugar: "circuito", titulo: "Autopista del Borrón",
    resumen: "¡La furgoneta del Borrón huye por la autopista! Elige el carril correcto para alcanzarla.",
    criterios: ["9.1"],
    pasos: [ { tipo: "autopista", ref: "autopista", crit: "9.1" } ] },

  { id: "F", barrio: "onda", lugar: "periodico", titulo: "Edición especial", final: true, requiere: 10,
    resumen: "Ha llegado el momento: persigue al Borrón, fotografíalo y publica la gran noticia.",
    criterios: ["5.1"],
    pasos: [ { tipo: "persecucion" }, { tipo: "ordenar", ref: "noticia", crit: "5.1" }, { tipo: "escritura", ref: "escritura.portada", crit: "5.1" } ] },

  // ---- Ampliación (añadidas al final para no alterar los códigos de partida guardados) ----
  { id: "T5", barrio: "taller", lugar: "academia", titulo: "Sílabas y tildes",
    resumen: "En la Academia de las Tildes, el Borrón ha desordenado las sílabas y ha robado las tildes. Devuélvelas a su sitio.",
    criterios: ["9.1"],
    pasos: [ { tipo: "tildes", ref: "tildes", crit: "9.1" } ] },

  { id: "T6", barrio: "taller", lugar: "almacen", titulo: "La cinta clasificadora",
    resumen: "En el Almacén de Palabras se han mezclado todas las cajas. Clasifica cada palabra según lo que hace en su frase.",
    criterios: ["9.1"],
    pasos: [ { tipo: "clasificador", ref: "clasificador", crit: "9.1" } ] },

  { id: "O5", barrio: "onda", lugar: "cine", titulo: "El guion secreto",
    resumen: "El Borrón ha encerrado el guion de la película del Cine Atlántico en una caja fuerte. Lee con atención para descubrir la combinación.",
    criterios: ["4.1", "4.2"],
    pasos: [ { tipo: "guion", ref: "guion", crit: "4.1" } ] }
];

/* Palabras doradas: coleccionables escondidos por la ciudad (vocabulario del español de Canarias).
   Definiciones redactadas para el juego a partir del uso común en Canarias. */
PP.PALABRAS_DORADAS = [
  { p: "guagua", d: "Autobús. En Canarias y en el Caribe se dice guagua." },
  { p: "papa", d: "Patata. En Canarias y en América se dice papa." },
  { p: "millo", d: "Maíz. Las rosetas de millo son un tentempié muy canario." },
  { p: "gofio", d: "Harina de cereales tostados, muy típica de Canarias." },
  { p: "baifo", d: "Cría de la cabra (cabrito)." },
  { p: "cotufa", d: "Palomita de maíz." },
  { p: "fisco", d: "Un trocito o una pizca de algo: «dame un fisco»." },
  { p: "perenquén", d: "Pequeño reptil que sube por las paredes (salamanquesa)." },
  { p: "magua", d: "Pena que se siente por no haber podido hacer o tener algo." },
  { p: "fleje", d: "Gran cantidad: «había un fleje de gente»." },
  { p: "cholas", d: "Chanclas." },
  { p: "tenderete", d: "Fiesta popular con música y baile." },
  { p: "timple", d: "Pequeño instrumento de cuerda típico de Canarias." },
  { p: "naife", d: "Cuchillo tradicional canario." },
  { p: "mojo", d: "Salsa típica canaria; puede ser verde o rojo (picón)." },
  { p: "tunera", d: "Planta de las chumberas; su fruto es el tuno." }
];
