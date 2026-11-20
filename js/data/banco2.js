/* Puerto Palabra · Segundo banco de contenidos (variedad).
   Añade, para cada curso:
   - correctores: textos alternativos para «Imprenta sin borrones» (la misión elige uno distinto cada vez);
   - tildes: más palabras para «Operación Tilde» y «Sílabas al viento»;
   - rimas: más versos para «Rimas del teatro».
   Formato de los correctores: texto normal con marcas {escrito mal|forma correcta|explicación}.
   Todos los textos son originales y mantienen el criterio de evaluación de su mecánica. */
window.PP = window.PP || {};
(function () {
  const { S, R } = PP.BancoUtil;
  const Z = (titular, texto) => ({ titulo: "Imprenta sin borrones", titular, texto });
  const BANCO2 = {};

  // ================================= 1.º =================================
  BANCO2[1] = {
    correctores: [
      Z("Mi gato Luis", "{hoy|Hoy|Al empezar a escribir se pone mayúscula.} mi gato {luis|Luis|Los nombres de los animales empiezan con mayúscula.} saltó al sofá. Comió pescado y bebió mucha {leche|leche.|Al final de la frase se pone un punto.} {luego|Luego|Después de un punto va mayúscula.} se durmió en la {kama|cama|«Cama» se escribe con c: ca, co, cu.}."),
      Z("Una tarde en el parque", "{ayer|Ayer|Al empezar a escribir se pone mayúscula.} {maría|María|Los nombres de las personas empiezan con mayúscula.} y yo fuimos al parque. Jugamos con una {pelota|pelota.|Al final de la frase se pone un punto.} {vimos|Vimos|Después de un punto va mayúscula.} un {pero|perro|«Perro» se escribe con rr: pe-rro.} muy grande. Luego tomamos un {elado|helado|«Helado» se escribe con h al principio.}."),
      Z("Mi cumpleaños", "{mañana|Mañana|Al empezar a escribir se pone mayúscula.} es mi cumpleaños. Vendrá mi amigo {pablo|Pablo|Los nombres de las personas empiezan con mayúscula.} con mucha alegría. Habrá muchos {globoz|globos|«Globos» se escribe con s al final: glo-bos.} de colores. Cantaremos una {kanción|canción|«Canción» se escribe con c: ca, co, cu.} y comeremos {pastel|pastel.|Al final de la frase se pone un punto.}")
    ],
    tildes: [
      S("sapo", ["sa", "po"]), S("nube", ["nu", "be"]), S("mesa", ["me", "sa"]), S("gato", ["ga", "to"]), S("rana", ["ra", "na"]),
      S("libro", ["li", "bro"]), S("camisa", ["ca", "mi", "sa"]), S("tijeras", ["ti", "je", "ras"]), S("mono", ["mo", "no"]),
      S("cometa", ["co", "me", "ta"]), S("paraguas", ["pa", "ra", "guas"]), S("mochila", ["mo", "chi", "la"]), S("manzana", ["man", "za", "na"]),
      S("pez", ["pez"]), S("tren", ["tren"]), S("bolsa", ["bol", "sa"]), S("cuchara", ["cu", "cha", "ra"]), S("tambor", ["tam", "bor"]),
      S("cangrejo", ["can", "gre", "jo"]), S("gallina", ["ga", "lli", "na"]), S("pelo", ["pe", "lo"]), S("pato", ["pa", "to"])
    ],
    rimas: [
      R("En la playa hay un cangrejo", "que se mira en el ___", "espejo", ["mar", "sol"], "Cangrejo… espejo: ¡riman!"),
      R("Mi mamá me da un abrazo", "y me pone un gran ___", "lazo", ["peine", "beso"], "Abrazo… lazo: ¡riman!"),
      R("El payaso está contento", "y se ríe con el ___", "viento", ["sol", "circo"], "Contento… viento: ¡riman!"),
      R("La tortuga va despacio", "por el campo y el ___", "palacio", ["mar", "río"], "Despacio… palacio: ¡riman!")
    ]
  };

  // ================================= 2.º =================================
  BANCO2[2] = {
    correctores: [
      Z("Una excursión al Teide", "El sábado {biajamos|viajamos|«Viajar» se escribe con v.} en guagua hasta el {teide|Teide|Los nombres de lugares empiezan con mayúscula.}. Allí {izo|hizo|«Hizo» (del verbo hacer) se escribe con h.} mucho frío y nos pusimos la {chaketa|chaqueta|«Chaqueta» se escribe con qu: cha-que-ta.}. Desde arriba se {beía|veía|«Veía» (del verbo ver) se escribe con v.} todo el mar. Fue un día {inolbidable|inolvidable|«Inolvidable» se escribe con v: in-ol-vi-da-ble.}."),
      Z("En la cocina de mi tía", "Esta mañana mi tía {ase|hace|«Hace» (del verbo hacer) se escribe con h.} una sopa de {berduras|verduras|«Verduras» se escribe con v.}. Yo le {alludé|ayudé|«Ayudé» se escribe con y: a-yu-dé.} a pelar las papas y a batir un {huebo|huevo|«Huevo» se escribe con v: hue-vo.}. Al mediodía llegó mucha {jente|gente|«Gente» se escribe con g: ge, gi.} a comer."),
      Z("El cumpleaños de Lucía", "{lucía|Lucía|Los nombres de las personas empiezan con mayúscula.} cumplió ocho años y {bino|vino|«Vino» (del verbo venir) se escribe con v.} toda su familia a la fiesta. {Ubo|Hubo|«Hubo» (del verbo haber) se escribe con h.} una tarta enorme y muchos juegos. Todos {ablamos|hablamos|«Hablamos» se escribe con h al principio.} y reímos hasta la {noche|noche.|Al final de la frase se pone un punto.}")
    ],
    tildes: [
      S("cocodrilo", ["co", "co", "dri", "lo"]), S("mariquita", ["ma", "ri", "qui", "ta"]), S("pingüino", ["pin", "güi", "no"]),
      S("escalera", ["es", "ca", "le", "ra"]), S("calcetín", ["cal", "ce", "tín"]), S("hormiga", ["hor", "mi", "ga"]),
      S("murciélago", ["mur", "cié", "la", "go"]), S("volcán", ["vol", "cán"]), S("queso", ["que", "so"]), S("jirafa", ["ji", "ra", "fa"]),
      S("ballena", ["ba", "lle", "na"]), S("limonero", ["li", "mo", "ne", "ro"]), S("teclado", ["te", "cla", "do"]), S("periódico", ["pe", "rió", "di", "co"]),
      S("tractor", ["trac", "tor"]), S("astronauta", ["as", "tro", "nau", "ta"]), S("tiburón", ["ti", "bu", "rón"]), S("dragón", ["dra", "gón"]),
      S("plátano", ["plá", "ta", "no"]), S("castillo", ["cas", "ti", "llo"]), S("guitarra", ["gui", "ta", "rra"])
    ],
    rimas: [
      R("Un pirata en su velero", "busca un cofre de ___", "dinero", ["oro", "perlas"], "Velero… dinero: ¡riman!"),
      R("La mariposa en la flor", "baila con mucho ___", "color", ["viento", "brillo"], "Flor… color: ¡riman!"),
      R("Brilla el sol en la mañana", "y despierta a mi ___", "hermana", ["gato", "perro"], "Mañana… hermana: ¡riman!"),
      R("Sube la luna a la torre", "mientras la brisa ___", "corre", ["duerme", "canta"], "Torre… corre: ¡riman!")
    ]
  };

  // ================================= 3.º =================================
  BANCO2[3] = {
    correctores: [
      Z("La tarde del mercadillo", "El domingo fuimos al mercadillo de {la laguna|La Laguna|Los nombres propios de lugares empiezan con mayúscula.}. {Ay|Hay|«Hay» (del verbo haber) se escribe con h.} puestos de fruta, de ropa y de juguetes. Mi madre compró {berduras|verduras|«Verduras» se escribe con v.} y mi padre {conpró|compró|Antes de p y b se escribe m.} un queso fresco. Había mucha {jente|gente|«Gente» se escribe con g: ge, gi.} y nos costó caminar."),
      Z("Un partido en el colegio", "El viernes jugamos un partido de {boleibol|voleibol|«Voleibol» se escribe con v.} contra otro colegio. Mi amiga {luisa|Luisa|Los nombres de las personas empiezan con mayúscula.} saltó muy alto y {izo|hizo|«Hizo» (del verbo hacer) se escribe con h.} el último punto. Al final {emos|hemos|«Hemos» (del verbo haber) se escribe con h.} ganado por dos puntos y todos gritamos que somos {kampeones|campeones|«Campeones» se escribe con c: ca, co, cu.}."),
      Z("El huerto de la escuela", "En el huerto de la escuela cuidamos las {ortalizas|hortalizas|«Hortalizas» se escribe con h al principio.}. Cada mañana {rregamos|regamos|Al principio de palabra, el sonido fuerte de la r se escribe con una sola r.} las lechugas y los {jirasoles|girasoles|«Girasoles» se escribe con g: ge, gi.}. Mi maestra dice que en {berano|verano|«Verano» se escribe con v.} tendremos tomates para todos. Mañana {boy|voy|«Voy» (del verbo ir) se escribe con v.} a traer semillas de casa.")
    ],
    tildes: [
      S("camión", ["ca", "mión"], 1), S("jardín", ["jar", "dín"], 1), S("corazón", ["co", "ra", "zón"], 2), S("azúcar", ["a", "zú", "car"], 1),
      S("césped", ["cés", "ped"], 0), S("sillón", ["si", "llón"], 1), S("balcón", ["bal", "cón"], 1), S("plátano", ["plá", "ta", "no"], 0),
      S("médico", ["mé", "di", "co"], 0), S("ratón", ["ra", "tón"], 1), S("mamá", ["ma", "má"], 1), S("papá", ["pa", "pá"], 1),
      S("pared", ["pa", "red"], 1), S("camello", ["ca", "me", "llo"], 1), S("dátil", ["dá", "til"], 0), S("botón", ["bo", "tón"], 1),
      S("hospital", ["hos", "pi", "tal"], 2), S("tortuga", ["tor", "tu", "ga"], 1), S("sábado", ["sá", "ba", "do"], 0), S("domingo", ["do", "min", "go"], 1),
      S("miércoles", ["miér", "co", "les"], 0), S("limón", ["li", "món"], 1)
    ],
    rimas: [
      R("Por el monte va el pastor", "con su cayado y su ___", "tambor", ["rebaño", "perro"], "Pastor… tambor: ¡riman!"),
      R("Cae la lluvia en el tejado", "y deja el patio ___", "mojado", ["seco", "lleno"], "Tejado… mojado: ¡riman!"),
      R("El volcán empieza a rugir", "y la gente quiere ___", "huir", ["bailar", "comer"], "Rugir… huir: ¡riman!"),
      R("Una estrella en el cielo", "me da luz y ___", "consuelo", ["frío", "sueño"], "Cielo… consuelo: ¡riman!")
    ]
  };

  // ================================= 4.º =================================
  BANCO2[4] = {
    correctores: [
      Z("Concurso de cometas en la playa", "El domingo se celebró un concurso de cometas en la playa de {las teresitas|Las Teresitas|Los nombres propios de lugares llevan mayúscula.}. Había cometas con forma de {pajaros|pájaros|«Pájaros» es esdrújula: todas las esdrújulas llevan tilde.}, de peces y de dragones que parecían {bolar|volar|«Volar» se escribe con v.} sobre el mar. El jurado {elijió|eligió|«Elegir» se escribe con g: eligió.} la cometa más original y {ademas|además|«Además» es aguda acabada en s: lleva tilde.} regaló un diploma a todos los participantes."),
      Z("Se estrena la biblioteca del barrio", "La nueva biblioteca del barrio abrió ayer sus puertas. Los {abitantes|habitantes|«Habitantes» se escribe con h al principio.} de la zona hicieron cola para sacar su carné. En las estanterías {ay|hay|«Hay» (del verbo haber) se escribe con h; «ay» expresa dolor o sorpresa.} cuentos, novelas y libros sobre {canarias|Canarias|Los nombres propios de lugares llevan mayúscula.}. Los lectores {estan|están|«Están» es aguda acabada en n: lleva tilde.} invitados a los talleres de escritura que se {haran|harán|«Harán» es aguda acabada en n: lleva tilde.} cada jueves."),
      Z("Los voluntarios limpian la costa", "Más de cincuenta voluntarios limpiaron ayer la costa de {la graciosa|La Graciosa|Los nombres propios de lugares llevan mayúscula.}. {Recojieron|Recogieron|«Recoger» se escribe con g: recogieron.} bolsas llenas de {vasuras|basuras|«Basuras» se escribe con b.} y mucho {plastico|plástico|«Plástico» es esdrújula: todas las esdrújulas llevan tilde.}. Una vecina dijo que la playa {esta|está|«Está» (del verbo estar) lleva tilde porque es aguda acabada en vocal.} ya mucho más limpia.")
    ],
    tildes: [
      S("cárcel", ["cár", "cel"], 0), S("lámpara", ["lám", "pa", "ra"], 0), S("bolígrafo", ["bo", "lí", "gra", "fo"], 1), S("difícil", ["di", "fí", "cil"], 1),
      S("fácil", ["fá", "cil"], 0), S("interés", ["in", "te", "rés"], 2), S("estación", ["es", "ta", "ción"], 2), S("cántaro", ["cán", "ta", "ro"], 0),
      S("melón", ["me", "lón"], 1), S("pirámide", ["pi", "rá", "mi", "de"], 1), S("océano", ["o", "cé", "a", "no"], 1), S("capitán", ["ca", "pi", "tán"], 2),
      S("caracol", ["ca", "ra", "col"], 2), S("cohete", ["co", "he", "te"], 1), S("león", ["le", "ón"], 1), S("bebé", ["be", "bé"], 1),
      S("lagarto", ["la", "gar", "to"], 1), S("tráfico", ["trá", "fi", "co"], 0), S("ángel", ["án", "gel"], 0), S("héroe", ["hé", "ro", "e"], 0),
      S("murciélago", ["mur", "cié", "la", "go"], 1), S("lunes", ["lu", "nes"], 0)
    ],
    rimas: [
      R("Soñé con un dragón", "que vivía en un ___", "balcón", ["jardín", "castillo"], "Dragón… balcón: ¡riman!"),
      R("La brisa mueve las ramas", "y el gato duerme en las ___", "camas", ["mesas", "tazas"], "Ramas… camas: ¡riman!"),
      R("Ayer comí un pastel", "con mi amigo ___", "Manuel", ["Pedro", "Luis"], "Pastel… Manuel: ¡riman!"),
      R("Cuando el viento se levanta", "la vela del barco ___", "canta", ["calla", "duerme"], "Levanta… canta: ¡riman!")
    ]
  };

  // ================================= 5.º =================================
  BANCO2[5] = {
    correctores: [
      Z("El Cabildo abre el plazo para las becas", "El Cabildo abrió ayer el plazo para pedir las becas de comedor. Las familias deben entregar la solicitud antes del viernes, {sino|si no|«Si no» se escribe separado cuando equivale a «en caso de que no».} perderán la ayuda. La consejera aseguró que ya se ha {echo|hecho|«Hecho» (de hacer) se escribe con h; «echo» es del verbo echar.} un gran esfuerzo para atender a todos. {Mas|Más|«Más» lleva tilde cuando indica cantidad.} de mil niños podrán beneficiarse. Los colegios recibirán la lista {asia|hacia|«Hacia» es una preposición y se escribe con h.} el lunes. Los interesados {tambien|también|«También» es aguda acabada en n: lleva tilde.} pueden consultar la web."),
      Z("Récord de visitantes en el Parque Nacional", "El Parque Nacional del {teide|Teide|Los nombres propios empiezan con mayúscula.} recibió el año pasado más de tres millones de visitantes. Los guías recuerdan que no se puede subir {asta|hasta|«Hasta» se escribe con h al principio.} la cima sin permiso. «Mucha gente no sabe {cuando|cuándo|En las preguntas indirectas, «cuándo» lleva tilde.} florecen los tajinastes», explicó una bióloga. Ella invita {ha|a|«A» es una preposición; «ha» es una forma del verbo haber.} todos a cuidar las plantas. Los visitantes valoran de forma {exelente|excelente|«Excelente» se escribe con xc: ex-ce-len-te.} la atención recibida."),
      Z("Nace un club de lectura en el colegio", "Un grupo de alumnos de quinto ha creado un club de lectura en su {colejio|colegio|«Colegio» se escribe con g: ge, gi.}. Se reúnen cada miércoles para comentar un libro. «No {ace|hace|«Hace» (del verbo hacer) se escribe con h.} falta ser un experto; todo el que quiera es {bienbenido|bienvenido|«Bienvenido» se escribe con v: bien-ve-ni-do.}», dice la maestra. Este mes leen una novela de aventuras que les permite {imajinar|imaginar|«Imaginar» se escribe con g: ge, gi.} mundos nuevos y, {sobretodo|sobre todo|«Sobre todo» se escribe en dos palabras.}, divertirse.")
    ],
    tildes: [
      S("América", ["A", "mé", "ri", "ca"], 1), S("gramática", ["gra", "má", "ti", "ca"], 1), S("matemáticas", ["ma", "te", "má", "ti", "cas"], 2),
      S("ortografía", ["or", "to", "gra", "fí", "a"], 3), S("biblioteca", ["bi", "blio", "te", "ca"], 2), S("carácter", ["ca", "rác", "ter"], 1),
      S("volcánico", ["vol", "cá", "ni", "co"], 1), S("paraguas", ["pa", "ra", "guas"], 1), S("dominó", ["do", "mi", "nó"], 2),
      S("camaleón", ["ca", "ma", "le", "ón"], 3), S("huésped", ["hués", "ped"], 0), S("decisión", ["de", "ci", "sión"], 2),
      S("día", ["dí", "a"], 0), S("país", ["pa", "ís"], 1), S("maíz", ["ma", "íz"], 1), S("baúl", ["ba", "úl"], 1), S("tío", ["tí", "o"], 0),
      S("continúa", ["con", "ti", "nú", "a"], 2), S("murciélago", ["mur", "cié", "la", "go"], 1)
    ],
    rimas: [
      R("El Teide mira hacia el mar", "y el sol lo hace ___", "brillar", ["dormir", "correr"], "Mar… brillar: ¡riman!"),
      R("Con tinta de mil colores", "escribo versos de ___", "amores", ["mares", "nubes"], "Colores… amores: ¡riman!"),
      R("Cuando llega el carnaval", "hay música en el ___", "portal", ["balcón", "parque"], "Carnaval… portal: ¡riman!"),
      R("Sopla el viento en el pinar", "y las hojas van a ___", "volar", ["caer", "dormir"], "Pinar… volar: ¡riman!")
    ]
  };

  // ================================= 6.º =================================
  BANCO2[6] = {
    correctores: [
      Z("Paneles solares en los colegios", "El Ayuntamiento instalará paneles solares en seis colegios del municipio. Según el concejal, con esa energía se {ahorrara|ahorrará|«Ahorrará» es aguda acabada en vocal: lleva tilde.} una parte importante de la factura de la luz. «{Hubieron|Hubo|El verbo «haber» como impersonal va siempre en singular: hubo.} muchas dudas al principio, pero ahora el proyecto cuenta con el apoyo de todos», comentó. Las obras empezarán en septiembre, {sino|si no|«Si no» se escribe separado cuando equivale a «en caso de que no».} surge ningún imprevisto. Las familias {podran|podrán|«Podrán» es aguda acabada en vocal: lleva tilde.} visitar las instalaciones el día de la inauguración. «Es un {exelente|excelente|«Excelente» se escribe con xc: ex-ce-len-te.} ejemplo para el resto de la isla», añadió."),
      Z("Campaña para salvar a la tortuga boba", "Un grupo de voluntarios protege cada verano los nidos de la tortuga boba en las playas de {fuerteventura|Fuerteventura|Los nombres propios de lugares llevan mayúscula.}. Cada noche cuentan {cuantos|cuántos|En las preguntas indirectas, «cuántos» lleva tilde.} huevos hay y vigilan que ninguna {enbarcación|embarcación|Antes de b se escribe m: embarcación.} se acerque demasiado. Los biólogos explican que la especie es muy {debil|débil|«Débil» es llana acabada en l: lleva tilde.} y que, {sino|si no|«Si no» se escribe separado cuando equivale a «en caso de que no».} se protege, podría desaparecer."),
      Z("Los alumnos de sexto estrenan su radio escolar", "Los alumnos de sexto estrenaron ayer su radio escolar. Los {jovenes|jóvenes|«Jóvenes» es esdrújula: todas las esdrújulas llevan tilde.} locutores {tubieron|tuvieron|«Tuvieron» (del verbo tener) se escribe con v.} que practicar durante semanas delante del {microfono|micrófono|«Micrófono» es esdrújula: todas las esdrújulas llevan tilde.}. El programa, que se emite {através|a través|«A través» se escribe en dos palabras.} de internet, incluyó noticias, entrevistas y música. «Esperamos que todo el colegio {valla|vaya|«Vaya» es del verbo ir; «valla» es una cerca o un cartel publicitario.} a escucharnos», dijo la directora.")
    ],
    tildes: [
      S("además", ["a", "de", "más"], 2), S("también", ["tam", "bién"], 1), S("después", ["des", "pués"], 1), S("periódico", ["pe", "rió", "di", "co"], 1),
      S("habitación", ["ha", "bi", "ta", "ción"], 3), S("estómago", ["es", "tó", "ma", "go"], 1), S("heroína", ["he", "ro", "í", "na"], 2),
      S("fotografía", ["fo", "to", "gra", "fí", "a"], 3), S("sílaba", ["sí", "la", "ba"], 0), S("tónica", ["tó", "ni", "ca"], 0), S("diptongo", ["dip", "ton", "go"], 1),
      S("esdrújulas", ["es", "drú", "ju", "las"], 1), S("lámina", ["lá", "mi", "na"], 0), S("carnaval", ["car", "na", "val"], 2), S("recién", ["re", "cién"], 1),
      S("autobús", ["au", "to", "bús"], 2), S("huérfano", ["huér", "fa", "no"], 0), S("rápido", ["rá", "pi", "do"], 0), S("pingüino", ["pin", "güi", "no"], 1),
      S("mamífero", ["ma", "mí", "fe", "ro"], 1), S("cómico", ["có", "mi", "co"], 0)
    ],
    rimas: [
      R("Ni la lluvia ni el calor", "apagan nuestro ___", "valor", ["miedo", "ánimo"], "Calor… valor: ¡riman!"),
      R("Cuenta el abuelo una historia", "que guarda en la ___", "memoria", ["cabeza", "mente"], "Historia… memoria: ¡riman!"),
      R("Cada verso es un tesoro", "más valioso que el ___", "oro", ["mar", "cobre"], "Tesoro… oro: ¡riman!"),
      R("Una gota de rocío", "brilla sobre el ___", "río", ["campo", "pétalo"], "Rocío… río: ¡riman!")
    ]
  };

  /** Mezcla el segundo banco con el contenido de cada curso (sin duplicar). */
  function mezclar2() {
    const C = PP.CONTENIDO || {};
    const dedup = (dst, src, clave) => { const vistos = new Set(dst.map(clave)); src.forEach((x) => { const k = clave(x); if (!vistos.has(k)) { vistos.add(k); dst.push(x); } }); };
    Object.keys(BANCO2).forEach((n) => {
      const b = BANCO2[n], c = C[n]; if (!c) return;
      if (c.corrector) { c.corrector.alternativas = c.corrector.alternativas || []; dedup(c.corrector.alternativas, b.correctores || [], (x) => x.texto); }
      if (c.tildes && c.tildes.items) dedup(c.tildes.items, b.tildes || [], (x) => x.p);
      if (c.rimas && c.rimas.items) dedup(c.rimas.items, b.rimas || [], (x) => x.v1);
    });
  }
  PP.BANCO2 = BANCO2;
  PP.mezclarBanco2 = mezclar2;
  mezclar2();
})();
