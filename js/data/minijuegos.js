/* Puerto Palabra · Minijuegos (atracciones de la ciudad).
   Cada minijuego integra una decisión de Lengua en su mecánica. Solo se evalúa esa decisión
   (primer intento): la puntería, la potencia o los saltos nunca cuentan como error de Lengua.
   Se guardan aparte de las misiones (progreso.minijuegos) para no alterar el contador de misiones,
   el desbloqueo de la edición final ni los códigos de partida.
   mundo:true → necesita conducir por la ciudad (solo en la Aventura libre). */
window.PP = window.PP || {};

PP.MINIJUEGOS = [
  { id: "J1", mini: true, icono: "golf", barrio: "puerto", lugar: "museo", off: [-1.4, 0], titulo: "Golf del Malpaís",
    resumen: "Hoyos junto al volcán: cada bandera lleva una palabra. Apunta a la que responde bien y calcula la fuerza del golpe.",
    criterios: ["1.1"], pasos: [{ tipo: "golf", ref: "variantes", crit: "1.1" }] },

  { id: "J2", mini: true, icono: "balon", barrio: "onda", lugar: "radio", off: [-1.4, 0], titulo: "Penaltis contra el Borrón",
    resumen: "Lee el mensaje y chuta a la portería correcta: dato fiable, bulo u opinión. ¡El Borrón está bajo los palos!",
    criterios: ["6.1"], pasos: [{ tipo: "penaltis", ref: "chismografo", crit: "6.1" }] },

  { id: "J3", mini: true, icono: "salto", barrio: "literario", lugar: "teatro", off: [0, 0], titulo: "Saltarrimas",
    resumen: "Corre y salta por el bosque de laurisilva. Golpea desde abajo el bloque con la palabra que completa la rima.",
    criterios: ["8.2"], pasos: [{ tipo: "plataformas", ref: "rimas", crit: "8.2" }] },

  { id: "J4", mini: true, icono: "canasta", barrio: "taller", lugar: "colegio", off: [0, 0], titulo: "Canastas de palabras",
    resumen: "En la feria del colegio: lanza cada palabra a la canasta de su clase (sustantivo, adjetivo, verbo…).",
    criterios: ["9.1"], pasos: [{ tipo: "canastas", ref: "clasificador", crit: "9.1" }] },

  { id: "J5", mini: true, mundo: true, icono: "carrera", barrio: "onda", lugar: "plaza", off: [-1.4, 0], titulo: "Carrera de pistas",
    resumen: "Lee la pista, deduce a qué lugar de la ciudad se refiere y llega antes que la furgoneta del Borrón.",
    criterios: ["4.1"], pasos: [{ tipo: "carrera", crit: "4.1" }] },

  { id: "J6", mini: true, mundo: true, icono: "silabas", barrio: "taller", lugar: "almacen", off: [-1.4, 0], titulo: "Sílabas al viento",
    resumen: "El Borrón ha esparcido sílabas por el Taller de la Lengua. Recógelas en orden para recomponer cada palabra.",
    criterios: ["9.1"], pasos: [{ tipo: "busqueda", ref: "tildes", crit: "9.1" }] }
];

/** Busca una misión o un minijuego por su código */
PP.buscarReto = function (id) { return (PP.MISIONES || []).find((m) => m.id === id) || (PP.MINIJUEGOS || []).find((m) => m.id === id) || null; };

/* Pistas de la «Carrera de pistas» (criterio 4.1). Ningún texto nombra el lugar:
   c1 = localización de información literal sencilla (1.er ciclo);
   c2 = inferencia a partir de una situación (2.º y 3.er ciclo). */
PP.PISTAS_LUGARES = {
  radio:        { c1: "Ve al sitio donde se habla por un micrófono y se oye en todas las casas.", c2: "Quiero dar un aviso que escuche toda la ciudad a la vez, sin papel ni pantalla. ¿Adónde voy?" },
  periodico:    { c1: "Ve al sitio donde se escriben las noticias del periódico.", c2: "Tengo una foto de una exclusiva y quiero que salga mañana en primera página. ¿Dónde la entrego?" },
  ayuntamiento: { c1: "Ve al edificio donde trabaja la alcaldesa.", c2: "Queremos pedir que pongan un paso de peatones delante del colegio. ¿Dónde se presenta la solicitud?" },
  plaza:        { c1: "Ve al sitio con una fuente grande en el centro de la ciudad.", c2: "Hemos quedado «donde el agua salta delante del edificio de los concejales». ¿Dónde es?" },
  cine:         { c1: "Ve al sitio donde se ven películas en una pantalla enorme.", c2: "Llevo palomitas, apagan la luz y empieza el tráiler. ¿Dónde estoy?" },
  casaPoeta:    { c1: "Ve a la casa de la señora que escribe poemas.", c2: "Necesito a alguien que me ayude a encontrar una palabra que rime con «volcán». ¿A qué casa voy?" },
  parque:       { c1: "Ve al parque de los árboles llamados dragos.", c2: "Quiero ver de cerca los árboles cuya savia se vuelve roja y que se llaman como un animal de leyenda." },
  biblioteca:   { c1: "Ve al sitio donde puedes llevarte libros prestados.", c2: "Tengo que devolver dos libros antes del viernes o me quedaré sin carné. ¿Adónde voy?" },
  teatro:       { c1: "Ve al sitio donde los actores actúan en un escenario.", c2: "Esta noche sube el telón y la compañía estrena una obra con mucho público aplaudiendo. ¿Dónde es?" },
  colegio:      { c1: "Ve al sitio donde los niños y las niñas van a clase.", c2: "Suena el timbre, se acaba el recreo y hay que volver al aula. ¿Dónde estamos?" },
  imprenta:     { c1: "Ve al sitio donde se imprimen papeles con tinta.", c2: "Necesitamos cien carteles en papel para la fiesta del barrio y el ordenador de casa no da para tanto." },
  taller:       { c1: "Ve al sitio donde arreglan y pintan motos.", c2: "Mi moto hace un ruido raro y además quiero cambiarle el color. ¿Adónde la llevo?" },
  fabrica:      { c1: "Ve a la fábrica de la ciudad.", c2: "Allí trabajan máquinas enormes y salen cajas y cajas de productos nuevos cada día. ¿Qué lugar es?" },
  circuito:     { c1: "Ve a la entrada de la autopista.", c2: "Quiero salir de la ciudad por la carretera rápida de varios carriles. ¿Por dónde entro?" },
  mercado:      { c1: "Ve al sitio donde se compra pescado y fruta en puestos.", c2: "Para el almuerzo necesito vieja fresca, papas y unos plátanos. ¿Dónde lo compro todo junto?" },
  estacion:     { c1: "Ve al sitio donde se cogen las guaguas.", c2: "Llevo maleta, tengo billete para la línea 7 y no quiero perder la salida de las 19:15. ¿Adónde voy?" },
  museo:        { c1: "Ve al sitio donde se guardan barcos antiguos y conchas.", c2: "Quiero ver el ancla de un barco de hace cien años sin mojarme y con una guía que me lo explique." },
  academia:     { c1: "Ve a la escuela donde se aprende a poner tildes.", c2: "Siempre dudo si «camion» lleva acento. Quiero ir al lugar donde enseñan las reglas de acentuación." },
  almacen:      { c1: "Ve al almacén donde se guardan cajas llenas de palabras.", c2: "Las palabras llegan en cajas por una cinta transportadora y allí las clasifican antes de repartirlas." }
};
