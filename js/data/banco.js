/* Puerto Palabra · Bancos ampliados de contenido (todos los cursos).
   Los contenidos de cada curso (curso1.js … curso6.js y ampliacion.js) se amplían aquí con más retos.
   En cada partida el juego elige un subconjunto distinto y no repite hasta agotar el banco
   (ver PP.Util.muestra). Todos los textos son originales; los datos curriculares no cambian:
   cada reto sigue asociado al mismo criterio de evaluación que su mecánica.
   Formato abreviado: A = autopista, Q = pregunta, T/T2 = taller, R = rima, P = mensaje del chismógrafo, it = clasificador. */
window.PP = window.PP || {};
PP.CONTENIDO = PP.CONTENIDO || {};
(function () {
  const A = (p, bien, mals, fb) => ({ p, o: [bien].concat(mals), c: 0, fb });
  const Q = (p, bien, mals, fb, crit, pista) => { const q = { p, o: [bien].concat(mals), c: 0, fb }; if (crit) q.crit = crit; if (pista) q.pista = pista; return q; };
  const T = (def, piezas, sol, pista) => ({ def, piezas, sol, res: sol.join(""), fb: sol.join(" + ") + " = " + sol.join(""), pista: pista || "Empieza por «" + sol[0] + "»." });
  const T2 = (def, piezas, sol, res, fb, pista) => ({ def, piezas, sol, res, fb, pista });
  const R = (v1, v2, bien, mals, fb) => ({ v1, v2, o: [bien].concat(mals), c: 0, fb });
  const COL = ["#2f9e44", "#7048e8", "#1d4e89", "#f76707", "#ae3ec9", "#0b7285", "#c2255c"];
  let ci = 0;
  const P = (autor, usuario, tipo, texto, fb, pistas, verificado, hace) => { const p = { autor, usuario, hace: hace || "hoy", color: COL[ci++ % COL.length], texto, tipo, fb }; if (verificado) p.verificado = true; if (pistas) p.pistas = pistas; return p; };
  const it = (f, w, c, fb, doble) => ({ f, w, c, fb, doble: !!doble });
  const S = (p, s, t, extra) => Object.assign({ p, s, t }, extra || {});
  const retrato = (piel, pelo, peinado, ropa, fondo, edad, gafas) => { const r = { piel, pelo, peinado, ropa, fondo, edad }; if (gafas) r.gafas = true; return r; };
  const L = (titulo, autor, genero, sinopsis, color) => ({ titulo, autor, genero, sinopsis, color });
  const F = (nombre, pide, okT, ret, fb) => ({ nombre, pide, okT, retrato: ret, fb });
  const G = (p, bien, mals, nivel, par, fb, crit) => { const q = { p, o: [bien].concat(mals), c: 0, nivel, fb }; if (par != null) q.par = par; if (crit) q.crit = crit; return q; };

  const BANCO = {};

  // ================================= 1.º =================================
  BANCO[1] = {
    autopista: [
      A("___ luna brilla.", "La", ["El"], "Decimos «la luna»."),
      A("Una ___ roja.", "flor", ["flores"], "Es una sola: flor."),
      A("Mi mamá se llama ___.", "Rosa", ["rosa"], "Los nombres de personas empiezan con mayúscula."),
      A("Quiero un ___ de agua.", "vaso", ["baso"], "Vaso se escribe con v."),
      A("Los niños ___ en el patio.", "juegan", ["juega"], "Son muchos niños: juegan."),
      A("___ pelota es azul.", "La", ["El"], "Decimos «la pelota»."),
      A("Mi ___ se llama Pepa.", "abuela", ["abuelo"], "Pepa es un nombre de mujer: abuela."),
      A("El ___ nada en el mar.", "pez", ["peces"], "Es uno solo: pez."),
      A("La ___ tiene el cuello largo.", "jirafa", ["girafa"], "Jirafa se escribe con j."),
      A("Tengo tres ___.", "gatos", ["gato"], "Son tres: gatos.")
    ],
    taller: [
      T("Animal que ladra.", ["pe", "rro", "to"], ["pe", "rro"]),
      T("Lo usamos para beber agua.", ["va", "so", "re"], ["va", "so"]),
      T("Brilla en el cielo de noche.", ["lu", "na", "to"], ["lu", "na"]),
      T("Vuela y tiene alas de colores.", ["ma", "ri", "po", "sa", "to"], ["ma", "ri", "po", "sa"], "Tiene cuatro sílabas."),
      T("Vehículo de dos ruedas con motor.", ["mo", "to", "pa"], ["mo", "to"]),
      T("Fruta roja y pequeña, con muchas pepitas.", ["fre", "sa", "po"], ["fre", "sa"])
    ],
    rimas: [
      R("Tengo un gato muy bonito", "que se llama ___", "Pepito", ["Luna", "Bruno"], "Bonito… Pepito: ¡riman!"),
      R("En el espejo me miro", "y me hago un ___", "suspiro", ["dibujo", "beso"], "Miro… suspiro: ¡riman!"),
      R("La luna sale de noche", "y yo me voy en mi ___", "coche", ["casa", "cama"], "Noche… coche: ¡riman!"),
      R("Este payaso con su nariz", "siempre está ___", "feliz", ["triste", "enfadado"], "Nariz… feliz: ¡riman!")
    ],
    pares: [
      ["baifo", "cabrito", "¡Sí! Baifo y cabrito son lo mismo.", "Es la cría de la cabra."],
      ["cholas", "chanclas", "¡Sí! Cholas y chanclas son lo mismo.", "Las llevamos en la playa."],
      ["fisco", "poquito", "¡Sí! Fisco y poquito son lo mismo.", "Es una cantidad muy pequeña."],
      ["bubango", "calabacín", "¡Sí! Bubango y calabacín son lo mismo.", "Es verde y alargado, y se come cocinado."]
    ],
    caza: [
      { buenas: ["cholas", "fisco", "perenquén", "tunera"], malas: ["chanclas|En Canarias decimos cholas.", "poquito|En Canarias decimos fisco.", "cabrito|En Canarias decimos baifo."] },
      { buenas: ["mula", "mochila", "madera", "mariposa"], malas: ["vaso|Empieza por V: vvv… vaso.", "casa|Empieza por C: c… casa.", "tigre|Empieza por T: t… tigre.", "fresa|Empieza por F: fff… fresa."] }
    ],
    posts: [
      P("Colegio La Laja", "@colegiolalaja", "fiable", "El jueves vamos de excursión a la playa. Llevad gorra y agua.", "Lo dice el colegio, que organiza la excursión.", null, true),
      P("Ayuntamiento", "@ayuntamiento", "fiable", "Hoy cierran la calle del mercado de 10 a 12 por unas obras.", "Lo dice el Ayuntamiento y da la hora.", null, true),
      P("Dibujos_Mágicos", "@dibujos_magicos", "bulo", "¡¡Esta noche los perros hablan!! ¡Escúchalos y cuéntaselo a todos!", "Los perros no hablan. Es un bulo.", null, false, "hace 4 min"),
      P("Regalos Ya", "@regalosya", "bulo", "¡Dale a compartir y mañana tendrás mil euros!", "Nadie da dinero por compartir un mensaje. Es un bulo.", null, false, "hace 9 min"),
      P("Mateo", "@mateo", "opinion", "Las papas arrugadas con mojo son lo más rico.", "Es lo que piensa Mateo. A otra persona le puede gustar otra comida.", null, false, "ayer"),
      P("Aitana", "@aitana", "opinion", "El payaso del circo es muy gracioso.", "Es lo que piensa Aitana: a otra persona puede no gustarle.", null, false, "ayer")
    ],
    libros: [
      L("Los colores del arcoíris", "Marta Gil", "Libro de colores", "Aprende los colores con ejemplos y dibujos.", "#e8590c"),
      L("Chistes para reír", "Pablo Ruiz", "Chistes y adivinanzas", "Muchos chistes y adivinanzas para reírte con tu familia.", "#f08c00"),
      L("Mi gran libro del mar", "Inés Mora", "Libro para aprender", "Conoce a los peces, las ballenas y las tortugas.", "#1971c2")
    ],
    perfiles: [
      F("Sara", "Me gustan los animales del mar. Quiero saber cómo viven.", ["Mi gran libro del mar"], retrato("clara", "#8a5a2b", "coleta", "#1971c2", "#d0ebff", "nino"), "Es un libro para aprender sobre el mar."),
      F("Hugo", "Quiero un libro para reírme mucho con adivinanzas.", ["Chistes para reír"], retrato("media", "#2b1d14", "corto", "#f08c00", "#fff3bf", "nino"), "¡Chistes y adivinanzas para reír!"),
      F("Valeria", "Me encanta pintar y quiero aprender los colores.", ["Los colores del arcoíris"], retrato("morena", "#2b1d14", "coleta", "#e8590c", "#ffe8cc", "nino"), "Es un libro de colores."),
      F("Tío Pedro", "Busco historias de piratas y tesoros.", ["El barco pirata"], retrato("media", "#5a3825", "corto", "#364fc7", "#dbe4ff", "adulto"), "Un barco pirata y un tesoro: ¡aventura!")
    ],
    radio: [
      Q("¿Quién habla en la radio?", "Yurena, de Radio Onda Volcán", ["Un niño de la fiesta", "El maestro"], "Habla Yurena, de Radio Onda Volcán."),
      Q("¿Para quién es la fiesta?", "Para los niños y las niñas", ["Solo para los abuelos", "Para los perros"], "La fiesta es para todos los niños y niñas."),
      Q("¿Por qué hay que llevar gorra y crema?", "Porque hace sol", ["Porque llueve", "Porque hace frío"], "Hay que llevar gorra y crema para protegerse del sol.")
    ],
    cartel: [
      Q("¿A qué hora es?", "A las once", ["A las cinco", "A las diez"], "A las once.", "4.1"),
      Q("¿Dónde vamos a ver los barcos?", "Donde llegan los barcos grandes", ["En el colegio", "En una casa"], "En el sitio donde llegan los barcos grandes.", "4.1"),
      Q("¿Cómo termina el cartel?", "Con «¡Te esperamos!»", ["Con «¡Adiós!»", "Con un dibujo"], "Termina con «¡Te esperamos!».", "4.2")
    ],
    historia: [
      Q("¿Dónde vivía Pinto?", "En lo alto de una montaña", ["En la playa", "En el mar"], "Pinto vivía en lo alto de una montaña.", "4.1"),
      Q("¿Cómo es el mar según la gaviota?", "Azul y enorme", ["Rojo y pequeño", "Verde y frío"], "La gaviota dice que el mar es azul, enorme y canta.", "4.1"),
      Q("¿Qué hicieron las olas?", "Cantaban", ["Se durmieron", "Se fueron"], "Las olas cantaban.", "4.1"),
      Q("¿Qué hizo Pinto al llegar al mar?", "Se mojó las patas", ["Se fue a dormir", "Se comió un helado"], "Pinto se mojó las patas y se rio.", "8.1")
    ],
    guion: [
      G("¿En qué isla vive Lía?", "En Fuerteventura", ["En Tenerife", "En La Palma"], "literal", 0, "Lía vive en un pueblo de Fuerteventura."),
      G("¿Qué le da Lía a Chispa?", "Agua fresca", ["Un helado", "Pan"], "literal", 3, "Lía le da un abrazo y le pone agua fresca."),
      G("¿Por qué estaba Chispa debajo de la higuera?", "Porque quería estar a la sombra", ["Porque tenía miedo del mar", "Porque quería jugar a la pelota"], "inferencial", 2, "Chispa estaba dormido a la sombra del árbol."),
      G("¿Cómo se siente Lía al final?", "Contenta", ["Enfadada", "Aburrida"], "inferencial", 3, "Lía abraza a Chispa: está contenta de haberlo encontrado.")
    ],
    tildes: [
      S("ventana", ["ven", "ta", "na"]), S("caballo", ["ca", "ba", "llo"]), S("conejo", ["co", "ne", "jo"]), S("pan", ["pan"]),
      S("zapato", ["za", "pa", "to"]), S("helado", ["he", "la", "do"]), S("bicicleta", ["bi", "ci", "cle", "ta"]), S("ojo", ["o", "jo"]), S("flor", ["flor"])
    ],
    clasificador: [
      it("La niña come una manzana.", "niña", "sustantivo", "«niña» nombra a una persona."),
      it("La niña come una manzana.", "come", "verbo", "«come» dice lo que hace la niña."),
      it("El árbol es muy alto.", "árbol", "sustantivo", "«árbol» nombra una cosa."),
      it("El árbol es muy alto.", "alto", "adjetivo", "«alto» dice cómo es el árbol."),
      it("Mi gato duerme en la cama.", "duerme", "verbo", "«duerme» dice lo que hace el gato."),
      it("Mi gato duerme en la cama.", "cama", "sustantivo", "«cama» nombra una cosa."),
      it("La flor amarilla huele bien.", "amarilla", "adjetivo", "«amarilla» dice cómo es la flor."),
      it("La flor amarilla huele bien.", "huele", "verbo", "«huele» dice lo que hace la flor."),
      it("Un perro pequeño ladra.", "ladra", "verbo", "«ladra» dice lo que hace el perro."),
      it("Un perro pequeño ladra.", "pequeño", "adjetivo", "«pequeño» dice cómo es el perro.")
    ]
  };

  // ================================= 2.º =================================
  BANCO[2] = {
    autopista: [
      A("El ___ vuela en el cielo.", "avión", ["abión"], "Avión se escribe con v."),
      A("___ Qué día más bonito!", "¡", ["¿"], "Es una exclamación: empieza con ¡."),
      A("Mis ___ son azules.", "zapatos", ["zapato"], "Son varios: zapatos."),
      A("Ayer ___ al parque con mi tío.", "fui", ["voy"], "Ayer ya pasó: fui."),
      A("Una ___ de agua.", "gota", ["gotas"], "Es una sola: una gota."),
      A("El ___ vive en un castillo.", "gigante", ["jigante"], "Gi se escribe con g: gigante."),
      A("Los ___ juegan al fútbol.", "niños", ["niño"], "Son varios: niños."),
      A("Quiero ___ naranja.", "una", ["un"], "Naranja es femenina: una naranja."),
      A("Mi hermano ___ el tren.", "coge", ["cogen"], "Es una sola persona: coge."),
      A("La ___ es muy dulce.", "miel", ["mel"], "Se escribe miel, con ie.")
    ],
    taller: [
      T("Se pone en la cabeza para el sol.", ["go", "rra", "pi"], ["go", "rra"]),
      T("Donde llevo los libros al cole.", ["mo", "chi", "la", "te"], ["mo", "chi", "la"]),
      T("Animal con caparazón que va despacio.", ["tor", "tu", "ga", "ri"], ["tor", "tu", "ga"]),
      T("Instrumento canario de cuerdas.", ["tim", "ple", "ca"], ["tim", "ple"]),
      T("Se usan para cortar el papel.", ["ti", "je", "ras", "pa"], ["ti", "je", "ras"]),
      T("Pan relleno de jamón o queso.", ["bo", "ca", "di", "llo", "ma"], ["bo", "ca", "di", "llo"])
    ],
    rimas: [
      R("El sol me da calor", "y yo canto con ___", "amor", ["alegría", "ganas"], "Calor… amor: ¡riman!"),
      R("En el cielo flota una nube", "y mi globo también ___", "sube", ["vuela", "baja"], "Nube… sube: ¡riman!"),
      R("Mi perro es muy travieso", "y se ha comido un ___", "queso", ["pan", "pez"], "Travieso… queso: ¡riman!"),
      R("Cuando llega el verano", "me baño con mi ___", "hermano", ["gato", "perro"], "Verano… hermano: ¡riman!")
    ],
    pares: [
      ["baifo", "cabrito", "¡Sí! Baifo y cabrito son lo mismo.", "Es la cría de la cabra."],
      ["bubango", "calabacín", "¡Sí! Bubango y calabacín son lo mismo.", "Es una verdura verde y alargada."],
      ["fisco", "poquito", "¡Sí! Fisco y poquito son lo mismo.", "Es una cantidad muy pequeña."]
    ],
    caza: [
      { buenas: ["bubango", "fisco", "tabaiba", "tunera"], malas: ["calabacín|En Canarias decimos bubango.", "poquito|En Canarias decimos fisco.", "cabrito|En Canarias decimos baifo."] },
      { buenas: ["cabra", "paloma", "cangrejo", "delfín", "pulpo"], malas: ["rojo|Dice cómo es algo.", "silla|Es una cosa, no un animal.", "cantar|Es una acción.", "ventana|Es una cosa."] }
    ],
    posts: [
      P("Policía Local", "@policialocal", "fiable", "Mañana a las 9:00 cortaremos la calle de la playa para la carrera infantil.", "Lo dice la Policía Local y da la hora y el lugar.", null, true),
      P("Museo del Mar", "@museodelmar", "fiable", "Este sábado hay un taller de dibujo a las 11:00. La entrada es gratis.", "Lo dice el museo, que organiza el taller.", null, true),
      P("Mundo Raro", "@mundoraro", "bulo", "¡¡Esta noche el mar se hace de chocolate!! Corre a verlo y avisa a todos.", "El mar no se hace de chocolate. Es un bulo.", null, false, "hace 3 min"),
      P("Sorteos Ya", "@sorteosya", "bulo", "Si mandas este mensaje a 5 amigos, ¡ganas un patinete!", "Nadie regala un patinete por reenviar un mensaje.", null, false, "hace 10 min"),
      P("Noa", "@noa_dibuja", "opinion", "Las películas de dragones son las mejores del mundo.", "Es lo que piensa Noa; otras personas pensarán otra cosa.", null, false, "ayer"),
      P("Samuel", "@samu", "opinion", "El gofio con leche es el mejor desayuno.", "Es una opinión de Samuel.", null, false, "ayer")
    ],
    libros: [
      L("El gran libro de los volcanes", "Eva Núñez", "Libro para aprender", "Descubre cómo nacen los volcanes y por qué echan fuego.", "#c92a2a"),
      L("Mi primer libro de recetas", "Ana Pino", "Libro de cocina", "Recetas fáciles de hacer con ayuda de una persona mayor.", "#e67700")
    ],
    perfiles: [
      F("Bruno", "Quiero saber cómo nacen los volcanes.", ["El gran libro de los volcanes"], retrato("clara", "#5a3825", "corto", "#c92a2a", "#ffe3e3", "nino"), "Es un libro para aprender sobre volcanes."),
      F("Alba", "Quiero cocinar un pastel con mi abuela.", ["Mi primer libro de recetas"], retrato("morena", "#2b1d14", "coleta", "#e67700", "#fff4e6", "nino"), "Un libro de recetas es lo que necesita."),
      F("Lía", "Me gustan los acertijos para pensar.", ["Adivina, adivinanza"], retrato("media", "#8a5a2b", "coleta", "#7048e8", "#e5dbff", "nino"), "Las adivinanzas son acertijos.")
    ],
    radio: [
      Q("¿De qué color es el perro?", "Marrón", ["Blanco", "Negro"], "Es un perro pequeño de color marrón."),
      Q("¿Dónde lo vieron por última vez?", "Junto a los puestos de fruta y de pescado", ["En la playa", "En el colegio"], "Lo vieron junto a los puestos de fruta y de pescado."),
      Q("¿Qué tienes que hacer si lo encuentras?", "Avisar a su dueña, Carmen", ["Quedártelo", "Llevarlo al colegio"], "Hay que avisar a su dueña, Carmen.")
    ],
    cartel: [
      Q("¿Dónde está la pista 1?", "En el sitio donde se guardan muchos libros", ["En la playa", "En el mercado"], "La pista 1 está donde se guardan muchos libros.", "4.1"),
      Q("¿Qué te darán en ese sitio?", "La pista 2", ["Un libro", "Un helado"], "Allí te darán la pista 2.", "4.1"),
      Q("¿Quién firma el cartel?", "La Banda de las Letras", ["El colegio", "La biblioteca"], "El cartel lo firma la Banda de las Letras.", "4.2")
    ],
    historia: [
      Q("¿Quiénes tenían sed?", "La gente de la isla", ["Los barcos", "Los pájaros"], "La gente de la isla tenía mucha sed.", "4.1"),
      Q("¿Dónde se llenaban los pozos de agua?", "Debajo del árbol", ["En la playa", "En el mar"], "Los pozos estaban debajo del árbol.", "4.1"),
      Q("¿Qué ocurría cada mañana con las nubes?", "Se enredaban en las hojas del árbol", ["Se iban al mar", "Se convertían en piedras"], "Las nubes se enredaban en las hojas y el árbol se llenaba de gotitas.", "8.1")
    ],
    guion: [
      G("¿Qué hace Tito todas las tardes?", "Sale a tomar el sol", ["Va al cole", "Nada en el mar"], "literal", 0, "Todas las tardes sale a tomar el sol."),
      G("¿Qué se comió Tito?", "Un fisco de plátano", ["Una manzana", "Un pez"], "literal", 3, "Se comió un fisco de plátano."),
      G("¿Por qué bajó Tito despacito por el muro?", "Para ir con cuidado", ["Porque no tenía hambre", "Porque quería dormir"], "inferencial", 1, "Bajó despacito para ir con cuidado."),
      G("¿Cómo se siente Tito al final?", "Contento", ["Enfadado", "Asustado"], "inferencial", 3, "Dice «¡Qué merienda tan rica!»: está contento.")
    ],
    tildes: [
      S("tortuga", ["tor", "tu", "ga"]), S("ventana", ["ven", "ta", "na"]), S("caracol", ["ca", "ra", "col"]), S("estrella", ["es", "tre", "lla"]),
      S("naranja", ["na", "ran", "ja"]), S("cuaderno", ["cua", "der", "no"]), S("elefante", ["e", "le", "fan", "te"]), S("ordenador", ["or", "de", "na", "dor"]), S("pan", ["pan"])
    ],
    clasificador: [
      it("El mar azul brilla al sol.", "mar", "sustantivo", "«mar» nombra una cosa."),
      it("El mar azul brilla al sol.", "azul", "adjetivo", "«azul» dice cómo es el mar."),
      it("El mar azul brilla al sol.", "brilla", "verbo", "«brilla» dice lo que hace el mar."),
      it("Mi hermana pequeña dibuja flores.", "pequeña", "adjetivo", "«pequeña» dice cómo es mi hermana."),
      it("Mi hermana pequeña dibuja flores.", "dibuja", "verbo", "«dibuja» dice lo que hace mi hermana."),
      it("Mi hermana pequeña dibuja flores.", "flores", "sustantivo", "«flores» nombra cosas."),
      it("La sopa caliente huele muy bien.", "caliente", "adjetivo", "«caliente» dice cómo es la sopa."),
      it("La sopa caliente huele muy bien.", "huele", "verbo", "«huele» dice lo que hace la sopa."),
      it("El riego de las papas es importante.", "riego", "sustantivo", "Aquí «riego» nombra una acción como cosa: es sustantivo.", true),
      it("Yo riego las plantas.", "riego", "verbo", "Aquí «riego» dice lo que hago yo: es verbo.", true)
    ]
  };

  // ================================= 3.º =================================
  BANCO[3] = {
    autopista: [
      A("Ayer mi madre ___ pescado.", "compró", ["compra"], "Ayer ya pasó: compró."),
      A("Un lápiz, dos ___.", "lápices", ["lápizes"], "La z cambia a c en el plural: lápices."),
      A("Los niños ___ al colegio.", "van", ["va"], "Son varios niños: van."),
      A("Una vez, muchas ___.", "veces", ["vezes"], "La z cambia a c en el plural: veces."),
      A("La palabra «canción» es ___.", "aguda", ["llana"], "Es aguda: la sílaba fuerte es la última (can-CIÓN)."),
      A("Mañana ___ la fiesta del barrio.", "será", ["fue"], "Mañana todavía no ha pasado: será."),
      A("La palabra «mesa» es ___.", "llana", ["aguda"], "Es llana: la sílaba fuerte es la penúltima (ME-sa)."),
      A("Hay muchos ___ en el mar.", "peces", ["pezes"], "La z cambia a c en el plural: peces."),
      A("Tengo que ___ la tarea.", "hacer", ["aser"], "Hacer se escribe con h y con c."),
      A("Mi hermana ___ muy alta.", "es", ["son"], "Es una sola persona: es.")
    ],
    taller: [
      T2("Persona que cocina.", ["cocin", "-ero", "-dor", "re-"], ["cocin", "-ero"], "cocinero", "El sufijo -ero indica un oficio.", "Piensa en «pastelero»."),
      T2("Tienda donde se venden zapatos.", ["zapat", "-ería", "-ero", "re-"], ["zapat", "-ería"], "zapatería", "El sufijo -ería indica tienda.", "Como frutería."),
      T2("Hacer lo contrario de «hacer».", ["des-", "hacer", "in-", "re-"], ["des-", "hacer"], "deshacer", "El prefijo des- significa lo contrario.", "Como desatar."),
      T2("Que se puede lavar.", ["lav", "-able", "-ero", "des-"], ["lav", "-able"], "lavable", "El sufijo -able significa «que se puede».", "Como comestible… ¡o como «lavable»!"),
      T2("Persona que juega.", ["jug", "-ador", "-ería", "re-"], ["jug", "-ador"], "jugador", "El sufijo -ador indica quién hace la acción.", "Como nadador o pescador.")
    ],
    rimas: [
      R("En la playa hay un cangrejo", "que se mira en el ___", "espejo", ["mar", "sol"], "Cangrejo… espejo: ¡riman!"),
      R("Mi abuela cuenta un cuento", "mientras sopla el ___", "viento", ["mar", "sol"], "Cuento… viento: ¡riman!"),
      R("En el huerto crece el trigo", "y yo juego con mi ___", "amigo", ["gato", "tío"], "Trigo… amigo: ¡riman!"),
      R("Desde la cumbre del monte", "veo el mar en el ___", "horizonte", ["cielo", "fondo"], "Monte… horizonte: ¡riman!")
    ],
    pares: [
      ["cholas", "chanclas", "En Canarias llamamos cholas a las chanclas.", "Se llevan en la playa."],
      ["bubango", "calabacín", "«Bubango» es el calabacín en Canarias.", "Es una verdura verde y alargada."],
      ["queque", "bizcocho", "«Queque» es el bizcocho en Canarias.", "Es dulce y se hace en el horno."]
    ],
    caza: [
      { buenas: ["bubango", "queque", "tabaiba"], malas: ["bizcocho|En Canarias decimos queque.", "calabacín|En Canarias decimos bubango."] },
      { buenas: ["pequeño", "rápido", "frío", "dulce"], malas: ["saltar|Es un verbo.", "puerto|Es un sustantivo.", "nunca|Es un adverbio.", "ellos|Es un pronombre."] }
    ],
    posts: [
      P("Museo del Mar", "@museodelmar", "fiable", "La exposición de conchas abre el martes a las 17:00 en la sala 2. Entrada gratuita.", "Cuenta oficial que da fecha, hora y lugar.", ["fuente", "datos"], true),
      P("Centro de Salud", "@centrodesalud", "fiable", "Mañana, de 9:00 a 11:00, vacunación infantil en el centro de salud. Pide cita en recepción.", "Fuente oficial con horario y lugar.", ["fuente", "datos"], true),
      P("Premios_Hoy", "@premioshoy", "bulo", "¡¡CORRE!! Los 50 primeros en reenviar este mensaje ganan un viaje gratis. ¡¡Solo hoy!!", "Mayúsculas, prisas y un premio increíble a cambio de reenviar.", ["alarma", "cadena", "exagera"], false, "hace 3 min"),
      P("Rumores", "@rumores", "bulo", "Mi primo me ha dicho que mañana no habrá colegio en toda la isla. Pásalo.", "«Mi primo me ha dicho» no es una fuente comprobable.", ["sinfuente", "cadena"], false, "hace 20 min"),
      P("Daniel", "@dani_lee", "opinion", "Creo que el mejor deporte del mundo es el baloncesto.", "«Creo que» y «el mejor» indican una opinión.", ["opinion"], false, "ayer"),
      P("Irene", "@irene_musica", "opinion", "Para mí, el timple suena más bonito que la guitarra.", "«Para mí» indica una opinión personal.", ["opinion"], false, "ayer")
    ],
    libros: [
      L("Mi primer atlas de aves", "Rocío Marín", "Libro informativo", "Fichas con dibujos para reconocer las aves de las islas.", "#2b8a3e"),
      L("Ana y el robot", "Sergio Pardo", "Ciencia ficción", "Una niña repara un robot que viene de otro planeta.", "#364fc7"),
      L("Cuentos de miedo suave", "Nuria Vera", "Cuentos de miedo", "Historias con fantasmas simpáticos para leer con la luz encendida.", "#5f3dc4")
    ],
    perfiles: [
      F("Álvaro", "Quiero reconocer los pájaros que veo en el parque.", ["Mi primer atlas de aves"], retrato("clara", "#5a3825", "corto", "#2b8a3e", "#d3f9d8", "nino"), "Un atlas de aves sirve para reconocerlas."),
      F("Noelia", "Me gustan las historias de robots y de otros planetas.", ["Ana y el robot"], retrato("morena", "#2b1d14", "coleta", "#364fc7", "#dbe4ff", "nino"), "Es ciencia ficción: robots y otros planetas."),
      F("Marcos", "Quiero un libro con fantasmas, pero que no dé mucho miedo.", ["Cuentos de miedo suave"], retrato("media", "#2b1d14", "corto", "#5f3dc4", "#e5dbff", "nino"), "Son cuentos de miedo, pero suave.")
    ],
    radio: [
      Q("¿Cuánto costará la entrada a la exposición?", "Nada: la entrada es libre", ["Dos euros", "Cinco euros"], "La entrada es libre."),
      Q("¿Qué habrá el sábado?", "Una limpieza de la playa", ["Una fiesta", "Una carrera"], "El sábado hay limpieza de la playa."),
      Q("¿Cuánto retraso llevará el ferry?", "Media hora", ["Una hora", "Diez minutos"], "El ferry llegará con media hora de retraso."),
      Q("¿Por qué crees que la exposición se hace donde se guardan barcos antiguos y conchas?", "Porque encaja con el tema: la historia del mar", ["Porque es el único edificio libre", "Porque está lejos de la playa"], "Es un lugar con objetos del mar y encaja con la exposición.")
    ],
    cartel: [
      Q("¿Dónde es el concurso de cometas?", "En el Mirador del Volcán", ["En la Plaza Mayor", "En el Paseo Marítimo"], "El concurso de cometas es en el Mirador del Volcán.", "4.1"),
      Q("¿Cuál es la primera actividad del día?", "La carrera de sacos", ["La verbena", "El taller de timple"], "A las 10:00 es la carrera de sacos.", "4.1"),
      Q("¿A qué hora empieza la verbena?", "A las 21:00", ["A las 12:00", "A las 17:00"], "La verbena es a las 21:00.", "4.1"),
      Q("¿Qué actividad elegirías para estar al aire libre con viento?", "El concurso de cometas", ["El taller de timple", "La verbena"], "Las cometas se vuelan al aire libre con el viento.", "4.2")
    ],
    historia: [
      Q("¿Qué mostraba el reflejo del agua de la fuente?", "El futuro", ["El pasado", "El mar"], "Decían que el reflejo mostraba el futuro.", "4.1"),
      Q("¿Cómo cruzó Jonay el mar para buscar a Gara?", "A nado", ["En barco", "Volando"], "Jonay cruzó el mar a nado.", "4.1"),
      Q("¿Qué empezó a echar fuego?", "El Teide", ["El mar", "La fuente"], "En ese momento, el Teide empezó a echar fuego.", "4.1"),
      Q("¿Cómo crees que se sentían Gara y Jonay al tener que separarse?", "Tristes, porque se querían", ["Contentos", "Aburridos"], "Se habían enamorado: separarse les daba mucha pena.", "8.1")
    ],
    guion: [
      G("¿Cómo es el tronco del drago?", "Grueso", ["Muy fino", "Hueco"], "literal", 0, "Su tronco es grueso."),
      G("¿De qué color se vuelve la resina al cortar la corteza?", "Roja", ["Azul", "Blanca"], "literal", 2, "La resina se vuelve roja."),
      G("¿Por qué crees que tanta gente visita el drago de Icod?", "Porque es enorme y muy importante para la isla", ["Porque es muy pequeño", "Porque está dentro del mar"], "inferencial", 3, "Es enorme y es uno de los símbolos de la isla."),
      G("¿Para qué sirve este texto?", "Para informar sobre cómo es el drago", ["Para contar un cuento", "Para pedir ayuda"], "critica", null, "Da datos sobre el drago: sirve para informar.", "4.2")
    ],
    tildes: [
      S("jardín", ["jar", "dín"], 1), S("ratón", ["ra", "tón"], 1), S("azúcar", ["a", "zú", "car"], 1), S("cárcel", ["cár", "cel"], 0), S("fácil", ["fá", "cil"], 0),
      S("cámara", ["cá", "ma", "ra"], 0), S("camino", ["ca", "mi", "no"], 1), S("lunes", ["lu", "nes"], 0), S("corazón", ["co", "ra", "zón"], 2), S("feliz", ["fe", "liz"], 1),
      S("autobús", ["au", "to", "bús"], 2), S("sábado", ["sá", "ba", "do"], 0), S("ordenador", ["or", "de", "na", "dor"], 3)
    ],
    clasificador: [
      it("Esa montaña es muy alta.", "Esa", "determinante", "«Esa» acompaña a «montaña» y la señala."),
      it("Esa montaña es muy alta.", "montaña", "sustantivo", "«montaña» nombra una cosa."),
      it("Esa montaña es muy alta.", "alta", "adjetivo", "«alta» dice cómo es la montaña."),
      it("Nuestros amigos nadan en el mar.", "Nuestros", "determinante", "«Nuestros» acompaña a «amigos» y dice de quién son."),
      it("Nuestros amigos nadan en el mar.", "nadan", "verbo", "«nadan» dice lo que hacen los amigos."),
      it("Una gaviota blanca vuela sobre el puerto.", "Una", "determinante", "«Una» acompaña a «gaviota»."),
      it("Una gaviota blanca vuela sobre el puerto.", "blanca", "adjetivo", "«blanca» dice cómo es la gaviota."),
      it("Una gaviota blanca vuela sobre el puerto.", "vuela", "verbo", "«vuela» dice lo que hace la gaviota."),
      it("La siembra de papas empieza hoy.", "siembra", "sustantivo", "Aquí «siembra» nombra una actividad: es sustantivo.", true),
      it("Ella siembra papas en su huerto.", "siembra", "verbo", "Aquí «siembra» dice lo que hace ella: es verbo.", true)
    ]
  };

  // ================================= 4.º =================================
  BANCO[4] = {
    autopista: [
      A("«Corazón» lleva tilde porque es ___.", "aguda", ["esdrújula"], "Es aguda y termina en n: lleva tilde."),
      A("Mañana ___ a la playa con mis primos.", "iremos", ["fuimos"], "Mañana todavía no ha pasado: iremos."),
      A("Hay ___ niños en el patio.", "muchos", ["mucho"], "Concuerda con «niños»: muchos."),
      A("Esas ___ son mías.", "cosas", ["cosa"], "Son varias: cosas."),
      A("«Teléfono» es una palabra ___.", "esdrújula", ["llana"], "Es esdrújula: la sílaba fuerte es la antepenúltima (te-LÉ-fo-no)."),
      A("Ellos ___ la tarea ayer.", "hicieron", ["hizo"], "Con «ellos»: hicieron."),
      A("Voy ___ la playa en guagua.", "a", ["ha"], "Voy «a» la playa: preposición."),
      A("Mi abuela ___ muy contenta.", "estaba", ["estava"], "Los verbos en -aba se escriben con b."),
      A("El contrario de «feliz» es ___.", "infeliz", ["desfeliz"], "Se forma con in-: infeliz."),
      A("Tengo que ___ el libro a la biblioteca.", "devolver", ["debolver"], "Devolver se escribe con v.")
    ],
    taller: [
      T2("Tienda donde se venden pasteles.", ["pastel", "-ería", "-ero", "-ito"], ["pastel", "-ería"], "pastelería", "El sufijo -ería indica tienda.", "Como panadería."),
      T2("Persona que toca la guitarra.", ["guitarr", "-ista", "-ero", "-ería"], ["guitarr", "-ista"], "guitarrista", "El sufijo -ista indica una profesión o actividad.", "Como pianista."),
      T2("Casa pequeña.", ["cas", "-ita", "-ona", "-ero"], ["cas", "-ita"], "casita", "El sufijo -ita indica algo pequeño o cariñoso.", "Como perrito."),
      T2("Lo contrario de «legal».", ["i-", "legal", "in-", "des-"], ["i-", "legal"], "ilegal", "El prefijo i- (variante de in-) indica negación.", "Delante de l se usa i-."),
      T2("Volver a construir.", ["re-", "construir", "des-", "pre-"], ["re-", "construir"], "reconstruir", "El prefijo re- significa «otra vez».", "Como rehacer.")
    ],
    rimas: [
      R("Sobre la roca del faro", "se posa un pájaro ___", "raro", ["blanco", "pequeño"], "Faro… raro: ¡riman!"),
      R("La pastora lleva el rebaño", "y lo cuida todo el ___", "año", ["día", "mes"], "Rebaño… año: ¡riman!"),
      R("Zarpa el barco de la bahía", "con la luz del nuevo ___", "día", ["mar", "sol"], "Bahía… día: ¡riman!"),
      R("Las olas besan la arena", "y el viento canta una ___", "cantilena", ["canción", "historia"], "Arena… cantilena: ¡riman!")
    ],
    pares: [
      ["millo", "maíz", "«Millo» es maíz en Canarias.", "Es un cereal amarillo."],
      ["fisco", "pizca", "«Fisco» es una cantidad muy pequeña.", "Muy poquito."],
      ["bubango", "calabacín", "«Bubango» es el calabacín en Canarias.", "Verdura verde y alargada."],
      ["jeito", "maña, habilidad", "«Tener jeito» es tener maña.", "Se dice de quien hace algo con habilidad."]
    ],
    caza: [
      { buenas: ["bubango", "jeito", "tabaiba"], malas: ["calabacín|Aquí decimos bubango.", "bizcocho|Aquí decimos queque."] },
      { buenas: ["pintaré", "trabajaban", "saltamos", "escribe"], malas: ["lento|Es un adjetivo.", "puerto|Es un sustantivo.", "entonces|Es un adverbio.", "tuyo|Es un pronombre o determinante."] }
    ],
    posts: [
      P("Cabildo de la isla", "@cabildo", "fiable", "Desde el lunes habrá una nueva línea de guagua al aeropuerto. El horario está en la web oficial.", "Fuente oficial con datos y remite a su web.", ["fuente", "datos"], true),
      P("Biblioteca Insular", "@bibliotecainsular", "fiable", "El taller de cuentacuentos será el jueves a las 17:30 en la sala infantil. Plazas limitadas.", "Cuenta oficial con día, hora y lugar.", ["fuente", "datos"], true),
      P("Gran Sorteo", "@gransorteo", "bulo", "¡¡FELICIDADES!! Has ganado un móvil nuevo. Entra YA en este enlace y da tus datos.", "Premio increíble, prisas y petición de datos: es un bulo.", ["exagera", "alarma"], false, "hace 5 min"),
      P("Alerta Total", "@alertatotal", "bulo", "Mi vecino ha leído que mañana no habrá agua en toda la isla. ¡Llena la bañera y pásalo!", "No cita ninguna fuente fiable y pide reenviar.", ["sinfuente", "cadena"], false, "hace 40 min"),
      P("Sofía", "@sofiacomic", "opinion", "En mi opinión, los cómics son más divertidos que las películas.", "«En mi opinión» indica una opinión.", ["opinion"], false, "ayer"),
      P("Marcos", "@marcosfut", "opinion", "Pienso que el mejor equipo de la isla es el de mi barrio.", "«Pienso que» y «el mejor» indican opinión.", ["opinion"], false, "ayer")
    ],
    libros: [
      L("Atlas de las estrellas", "Julia Ferrer", "Libro informativo (astronomía)", "Mapas del cielo con las constelaciones y sus historias.", "#1c7ed6"),
      L("La liga de los robots", "Raúl Ortega", "Ciencia ficción", "Un grupo de amigos descubre que su colegio lo dirigen robots del futuro.", "#d9480f"),
      L("Cuentos de miedo para valientes", "Elena Quintana", "Cuentos de miedo", "Seis historias de misterio para leer con la luz apagada… ¡si te atreves!", "#5f3dc4")
    ],
    perfiles: [
      F("Nayra", "Me apasiona mirar el cielo de noche. Quiero reconocer las constelaciones.", ["Atlas de las estrellas"], retrato("morena", "#2b1d14", "coleta", "#1c7ed6", "#d0ebff", "nino"), "Un atlas de estrellas muestra las constelaciones."),
      F("Jonay", "Me gustan las historias de robots y de futuro.", ["La liga de los robots"], retrato("media", "#5a3825", "corto", "#d9480f", "#ffe8cc", "nino"), "Robots y futuro: ciencia ficción."),
      F("Carla", "Quiero un libro de miedo, de los que se leen con ganas de más.", ["Cuentos de miedo para valientes"], retrato("clara", "#8a5a2b", "coleta", "#5f3dc4", "#e5dbff", "nino"), "Son cuentos de miedo para valientes.")
    ],
    radio: [
      Q("¿A qué hora empieza la exposición?", "A las seis y media", ["A las siete", "A las cinco y media"], "Empieza a las seis y media."),
      Q("¿Qué quiere decir que las fotos se verán «en tamaño gigante»?", "Que se proyectan en una pantalla enorme", ["Que son muy pequeñas", "Que se imprimen en papel"], "Se proyectan en una gran pantalla."),
      Q("¿Qué lugar crees que han elegido para la exposición?", "Un cine", ["Una biblioteca", "Una playa"], "Una sala oscura con una gran pantalla es un cine."),
      Q("¿Qué dato curioso da la locutora al final?", "Que las fotos las han hecho niñas y niños de los colegios", ["Que la entrada cuesta dos euros", "Que el teatro es muy antiguo"], "Todas las fotos las han hecho niños y niñas de los colegios.")
    ],
    cartel: [
      Q("¿Con qué se acompaña el mojo verde?", "Con papas arrugadas", ["Con pan", "Con pescado frito"], "Se sirve con papas arrugadas.", "4.1"),
      Q("¿Cuántos dientes de ajo lleva?", "Tres", ["Dos", "Cinco"], "Lleva 3 dientes de ajo.", "4.1"),
      Q("¿Qué se echa poco a poco?", "El aceite", ["El vinagre", "La sal"], "El aceite se echa poco a poco.", "4.1"),
      Q("¿Por qué crees que el aceite se echa poco a poco?", "Para que se mezcle bien con el resto", ["Para que no se derrame la sal", "Para que huela mejor el ajo"], "Echarlo poco a poco ayuda a que se mezcle bien.", "4.2")
    ],
    historia: [
      Q("¿Quién era Magec?", "El dios del sol", ["Un guanche", "El dios del cielo"], "Magec era el dios del sol.", "4.1"),
      Q("¿Quién venció a Guayota?", "Achamán, el dios del cielo", ["Los guanches", "Magec"], "Achamán bajó a la montaña y venció a Guayota.", "4.1"),
      Q("¿Qué hicieron los guanches para pedir ayuda?", "Encender hogueras y rezar a Achamán", ["Esconderse", "Huir en barco"], "Encendieron hogueras y pidieron ayuda a Achamán.", "8.1"),
      Q("¿Cómo explica la leyenda el pico del Teide?", "Como un tapón de piedra sobre el cráter", ["Como un castillo", "Como una isla"], "Dicen que ese tapón es el pico del Teide.", "8.1")
    ],
    guion: [
      G("¿A qué hora volverá el grupo al colegio?", "A las 14:00", ["A las 8:30", "A las 15:00"], "literal", 0, "Volveremos a las 14:00."),
      G("¿Qué hay que hacer si pierdes de vista al grupo?", "Quedarte quieto donde estás y esperar", ["Seguir caminando", "Gritar mucho"], "literal", 3, "Hay que quedarse quieto y esperar."),
      G("¿Por qué crees que hay que guardar la basura en la mochila?", "Para no ensuciar ni dañar el bosque", ["Para pesar menos", "Porque no hay papeleras en el colegio"], "inferencial", 2, "Se guarda la basura para cuidar el bosque."),
      G("¿Qué puede ocurrir si no se siguen las normas del bosque?", "Que se dañe el bosque o se pierda alguien del grupo", ["Nada", "Que acabe antes la excursión"], "inferencial", 2, "Las normas protegen el bosque y al grupo.")
    ],
    tildes: [
      S("pared", ["pa", "red"], 1), S("sillón", ["si", "llón"], 1), S("mármol", ["már", "mol"], 0), S("pétalo", ["pé", "ta", "lo"], 0), S("médico", ["mé", "di", "co"], 0),
      S("plátano", ["plá", "ta", "no"], 0), S("bondad", ["bon", "dad"], 1), S("mamá", ["ma", "má"], 1), S("pirámide", ["pi", "rá", "mi", "de"], 1), S("lámpara", ["lám", "pa", "ra"], 0), S("colegio", ["co", "le", "gio"], 1)
    ],
    clasificador: [
      it("Mi vecina riega sus plantas verdes.", "Mi", "determinante", "«Mi» acompaña a «vecina» y dice de quién es."),
      it("Mi vecina riega sus plantas verdes.", "riega", "verbo", "«riega» dice lo que hace la vecina."),
      it("Mi vecina riega sus plantas verdes.", "verdes", "adjetivo", "«verdes» dice cómo son las plantas."),
      it("Aquel barco antiguo llega mañana.", "Aquel", "determinante", "«Aquel» acompaña a «barco» y lo señala."),
      it("Aquel barco antiguo llega mañana.", "barco", "sustantivo", "«barco» nombra una cosa."),
      it("Aquel barco antiguo llega mañana.", "antiguo", "adjetivo", "«antiguo» dice cómo es el barco."),
      it("Tres niñas leen un libro divertido.", "Tres", "determinante", "«Tres» acompaña a «niñas» y dice cuántas."),
      it("Tres niñas leen un libro divertido.", "leen", "verbo", "«leen» dice lo que hacen las niñas."),
      it("La ducha es rápida.", "ducha", "sustantivo", "Aquí «ducha» nombra algo: es sustantivo.", true),
      it("Ella ducha al perro.", "ducha", "verbo", "Aquí «ducha» dice lo que hace ella: es verbo.", true)
    ]
  };

  // ================================= 5.º =================================
  BANCO[5] = {
    autopista: [
      A("¿___ es tu cumpleaños?", "Cuándo", ["Cuando"], "Los interrogativos llevan tilde: cuándo."),
      A("Esta carta es para ___.", "mí", ["mi"], "«Mí» con tilde es pronombre: para mí."),
      A("Quiero que ___ vengas conmigo.", "tú", ["tu"], "«Tú» con tilde es el pronombre: tú vienes."),
      A("Dime ___ vas a hacer.", "qué", ["que"], "En una pregunta indirecta, «qué» lleva tilde."),
      A("Mi hermano ___ el piano muy bien.", "toca", ["tocan"], "Es una sola persona: toca."),
      A("Nosotros ___ al faro ayer.", "fuimos", ["fueron"], "Con «nosotros»: fuimos."),
      A("Compré té y ___ galletas.", "unas", ["una"], "Concuerda con «galletas»: unas."),
      A("«Camión» lleva tilde porque es ___.", "aguda", ["llana"], "Es aguda y acaba en n: lleva tilde."),
      A("Pregúntaselo a ___ madre.", "tu", ["tú"], "Aquí «tu» acompaña a «madre»: no lleva tilde."),
      A("«Árbol» lleva tilde porque es ___.", "llana", ["aguda"], "Es llana y no acaba en n, s ni vocal: lleva tilde.")
    ],
    taller: [
      T2("Persona que toca el piano.", ["pian", "-ista", "-ero", "-ería"], ["pian", "-ista"], "pianista", "Sufijo -ista: profesión o actividad.", "Como «guitarrista»."),
      T2("Que no se puede creer.", ["in-", "creíble", "des-", "re-"], ["in-", "creíble"], "increíble", "Prefijo in-: negación.", "Como «imposible»."),
      T2("Palabra compuesta: lo que sirve para abrir latas.", ["abre", "latas", "-dor", "des-"], ["abre", "latas"], "abrelatas", "Compuesta: verbo + sustantivo.", "Une dos palabras que ya existen."),
      T2("Siglas de la Organización de las Naciones Unidas.", ["O", "N", "U", "S"], ["O", "N", "U"], "ONU", "Sigla: iniciales de las palabras principales.", "Toma las iniciales."),
      T2("Tienda donde se vende pescado.", ["pescad", "-ería", "-ero", "-al"], ["pescad", "-ería"], "pescadería", "Sufijo -ería: lugar donde se vende.", "Como «frutería».")
    ],
    rimas: [
      R("El faro mira a lo lejos", "y le habla al mar con ___", "reflejos", ["silencio", "luz"], "Lejos… reflejos: riman en -ejos."),
      R("En la ladera del monte", "se oculta el sol en el ___", "horizonte", ["cielo", "mar"], "Monte… horizonte: riman en -onte."),
      R("Las gaviotas en la bahía", "dan la bienvenida al ___", "día", ["sol", "mar"], "Bahía… día: riman en -ía."),
      R("La luna sube despacio", "y se mira en el ___", "espacio", ["mar", "cielo"], "Despacio… espacio: riman en -acio.")
    ],
    pares: [
      ["cotufas", "palomitas", "En Canarias se llaman cotufas.", "Se comen en el cine."],
      ["papas", "patatas", "En Canarias decimos papas.", "Se comen arrugadas."],
      ["cholas", "chanclas", "En Canarias, cholas.", "Se llevan en la playa."],
      ["magua", "tristeza o añoranza", "«Magua» es una pena o añoranza.", "Es un sentimiento."]
    ],
    caza: [
      { buenas: ["cotufas", "magua", "tenderete", "perenquén"], malas: ["palomitas|En Canarias decimos cotufas.", "lagartija|Aquí decimos perenquén.", "ordenador|Se usa en toda España.", "mesa|Es común a todo el español."] },
      { buenas: ["despacio", "ayer", "muy", "cerca"], malas: ["casa|Es un sustantivo.", "rápido|Es un adjetivo.", "cantar|Es un verbo.", "ellos|Es un pronombre."] }
    ],
    posts: [
      P("Protección Civil", "@proteccioncivil", "fiable", "Aviso: mañana, viento fuerte entre las 12:00 y las 18:00. Eviten pasear por la costa. Más información en la web oficial.", "Fuente oficial con horario y recomendación.", ["fuente", "datos"], true),
      P("Servicio de Guaguas", "@guaguasisla", "fiable", "Desde el lunes, la línea 7 cambia su horario: primera salida a las 6:30, última a las 22:00. Consulta la web.", "Cuenta oficial con datos concretos.", ["fuente", "datos"], true),
      P("Viral Total", "@viraltotal", "bulo", "¡URGENTE! Los móviles dejarán de funcionar mañana a las 12:00. Reenvíalo a 10 personas o perderás todo.", "Urgencia, cadena y miedo sin ninguna fuente.", ["alarma", "cadena", "sinfuente"], false, "hace 8 min"),
      P("Remedios Mágicos", "@remediosmagicos", "bulo", "Este té cura cualquier enfermedad en un día. Los médicos no quieren que lo sepas.", "Promete lo imposible y desconfía de los médicos.", ["exagera", "sinfuente"], false, "hace 1 h"),
      P("Alba", "@alba_lee", "opinion", "Para mí, los libros de misterio son los más emocionantes.", "«Para mí» y «los más» indican una opinión.", ["opinion"], false, "ayer"),
      P("Iván", "@ivan_peli", "opinion", "Creo que la versión antigua de la película era mucho mejor.", "«Creo que» y «mucho mejor» indican una opinión.", ["opinion"], false, "ayer")
    ],
    libros: [
      L("Cartas desde el faro", "Lía Santana", "Aventura y misterio", "Una niña descubre mensajes escondidos en un faro abandonado.", "#1971c2"),
      L("Planeta Cero", "Pablo Rivero", "Ciencia ficción", "Un grupo de jóvenes viaja a un planeta donde no existe el tiempo.", "#6741d9"),
      L("Versos para la guagua", "Elena Pino", "Poesía", "Poemas breves sobre el mar, el volcán y la vida en las islas.", "#d6336c")
    ],
    perfiles: [
      F("Yaiza", "Me encantan los enigmas y los misterios. Quiero resolver un caso.", ["Cartas desde el faro"], retrato("media", "#2b1d14", "coleta", "#1971c2", "#d0ebff", "nino"), "Es una aventura de misterio con mensajes escondidos."),
      F("Adal", "Me gustan los viajes espaciales y los mundos del futuro.", ["Planeta Cero"], retrato("clara", "#5a3825", "corto", "#6741d9", "#e5dbff", "nino"), "Viaje a otro planeta: ciencia ficción."),
      F("Dácil", "Quiero leer algo corto, con ritmo, que hable del mar.", ["Versos para la guagua"], retrato("morena", "#2b1d14", "largo", "#d6336c", "#ffdeeb", "nino"), "Poemas breves: ritmo y mar.")
    ],
    radio: [
      Q("¿Dónde se celebrará finalmente el concierto?", "Junto al faro", ["En la Plaza Mayor", "En el teatro"], "Se celebra junto al faro, el edificio con la luz que gira."),
      Q("¿Qué amplía la biblioteca?", "Su horario de los sábados", ["Su número de libros", "Su tamaño"], "La biblioteca amplía su horario los sábados."),
      Q("¿Cómo sabes que el edificio es un faro?", "Porque tiene una luz que gira para guiar a los barcos", ["Porque es muy alto y blanco", "Porque está en la plaza"], "La luz que gira para guiar barcos es la pista."),
      Q("¿Cómo se despide la locutora?", "Con el nombre de la emisora y su lema", ["Con una canción", "Con un chiste"], "Se despide: «Radio Onda Volcán, la radio que no se borra».")
    ],
    cartel: [
      Q("¿A qué hora sale la guagua al Mirador del Volcán?", "A las 19:15", ["A las 18:30", "A las 20:00"], "La salida al Mirador del Volcán es a las 19:15.", "4.1"),
      Q("¿Cuál es el destino más corto en tiempo de viaje?", "El Mercado del Puerto", ["El Museo del Mar", "El Teatro de la Luna"], "El Mercado del Puerto tarda 10 minutos.", "4.1"),
      Q("¿Cuántos minutos más tarda el viaje al Mirador que al Museo del Mar?", "20 minutos", ["10 minutos", "35 minutos"], "35 - 15 = 20 minutos.", "4.1"),
      Q("¿Qué dato falta en el cartel para decidir cómo ir?", "El precio del billete", ["El nombre de la parada", "La hora de salida"], "No aparece el precio del billete.", "4.2")
    ],
    historia: [
      Q("¿Qué guardó Iballa en su barca?", "Gofio, agua y una vela de repuesto", ["Una red y un mapa", "Un tesoro"], "Guardó gofio, agua y una vela de repuesto.", "4.1"),
      Q("¿Qué encontró flotando Iballa cuando se fue la niebla?", "La rama de un árbol desconocido", ["Una barca", "Una red"], "Solo flotaba la rama de un árbol desconocido.", "4.1"),
      Q("¿Dónde se cuenta esta leyenda?", "Entre los marineros de La Palma, La Gomera y El Hierro", ["En Lanzarote", "En Madrid"], "La contaban marineros de esas tres islas.", "8.1"),
      Q("¿Qué tipo de elemento es la niebla en la historia?", "Un obstáculo para el personaje", ["Un personaje", "El final feliz"], "La niebla impide que Iballa llegue: es el obstáculo (nudo).", "8.1")
    ],
    guion: [
      G("¿Dónde se soltó a la tortuga Lola?", "En la playa de Las Arenas", ["En el puerto", "En un río"], "literal", 0, "Se soltó en la playa de Las Arenas."),
      G("¿Qué le pusieron a Lola antes de la suelta?", "Un dispositivo para seguir su viaje", ["Una etiqueta de colores", "Una cadena"], "literal", 2, "Le colocaron un dispositivo para seguirla."),
      G("¿Por qué se cita a la veterinaria en la noticia?", "Para dar una fuente fiable que lo explique", ["Para dar su opinión personal", "Para entretener"], "inferencial", 1, "Una experta aporta datos fiables."),
      G("¿Qué intención tiene el último párrafo?", "Pedir a la gente que avise si encuentra un animal herido", ["Contar un chiste", "Describir la playa"], "inferencial", 3, "Pide que se avise a emergencias."),
      G("¿Cuál de estas frases es una OPINIÓN?", "«La suelta de Lola fue lo más bonito del año»", ["«Lola llegó con una aleta herida»", "«La tortuga fue rescatada hace tres meses»"], "critica", null, "«Lo más bonito» es una valoración personal.", "4.2")
    ],
    tildes: [
      S("canción", ["can", "ción"], 1), S("lápiz", ["lá", "piz"], 0), S("árbol", ["ár", "bol"], 0), S("balcón", ["bal", "cón"], 1), S("fácil", ["fá", "cil"], 0),
      S("sofá", ["so", "fá"], 1), S("ratón", ["ra", "tón"], 1), S("público", ["pú", "bli", "co"], 0), S("María", ["Ma", "rí", "a"], 1, { hiato: true }),
      S("país", ["pa", "ís"], 1, { hiato: true }), S("ríe", ["rí", "e"], 0, { hiato: true }), S("maíz", ["ma", "íz"], 1, { hiato: true }), S("dímelo", ["dí", "me", "lo"], 0)
    ],
    clasificador: [
      it("Nosotros cantamos muy bien.", "Nosotros", "pronombre", "«Nosotros» sustituye al nombre de las personas."),
      it("Nosotros cantamos muy bien.", "bien", "adverbio", "«bien» dice cómo cantamos."),
      it("Aquel marinero habla despacio.", "despacio", "adverbio", "«despacio» dice cómo habla."),
      it("Aquel marinero habla despacio.", "Aquel", "determinante", "«Aquel» acompaña a «marinero» y lo señala."),
      it("Ellos llegarán mañana.", "Ellos", "pronombre", "«Ellos» sustituye a personas."),
      it("Ellos llegarán mañana.", "mañana", "adverbio", "«mañana» dice cuándo llegarán."),
      it("Mis amigos vienen aquí.", "aquí", "adverbio", "«aquí» dice dónde vienen."),
      it("Mis amigos vienen aquí.", "Mis", "determinante", "«Mis» acompaña a «amigos»."),
      it("La llama del volcán es roja.", "llama", "sustantivo", "Aquí «llama» va con «la» y nombra el fuego: sustantivo.", true),
      it("Ella llama a su abuela.", "llama", "verbo", "Aquí «llama» dice lo que hace ella: verbo.", true)
    ]
  };

  // ================================= 6.º =================================
  BANCO[6] = {
    autopista: [
      A("¿___ vienes a la fiesta?", "Cuándo", ["Cuando"], "Los interrogativos llevan tilde."),
      A("No ___ qué hacer.", "sé", ["se"], "«Sé» del verbo saber lleva tilde diacrítica."),
      A("Quiero que me ___ la tarea.", "expliques", ["esplikes"], "Explicar se escribe con x y c."),
      A("Ellos ___ visto el volcán.", "han", ["a"], "«Han» es del verbo haber: han visto."),
      A("Me gusta el té, ___ no el café.", "pero", ["peros"], "«Pero» es una conjunción y no cambia."),
      A("Si ___ vienes, no empezamos.", "tú", ["tu"], "«Tú» es el pronombre sujeto: lleva tilde."),
      A("Hemos ___ la solución.", "hallado", ["allado"], "«Hallar» (encontrar) se escribe con h."),
      A("Hoy ___ una fiesta en el barrio.", "hay", ["ay"], "«Hay» es del verbo haber."),
      A("Pregunta ___ lo hizo.", "quién", ["quien"], "En una pregunta indirecta lleva tilde: quién."),
      A("Estoy aquí ___ una hora.", "desde hace", ["desde a"], "Se dice «desde hace una hora».")
    ],
    taller: [
      T2("Persona que estudia el mar.", ["ocean", "-ógrafo", "-ero", "-ista"], ["ocean", "-ógrafo"], "oceanógrafo", "Sufijo -ógrafo: persona que estudia o describe.", "Como «geógrafo»."),
      T2("Lo contrario de «posible».", ["im-", "posible", "des-", "re-"], ["im-", "posible"], "imposible", "Delante de p se usa im-.", "Antes de p y b: im-."),
      T2("Persona que repara coches.", ["mecán", "-ico", "-ero", "-ista"], ["mecán", "-ico"], "mecánico", "Sufijo -ico: relativo a una profesión.", "Como «electricista»."),
      T2("Acrónimo: Organización de Países Exportadores de Petróleo.", ["O", "P", "E", "P"], ["O", "P", "E", "P"], "OPEP", "Acrónimo: se lee como una palabra.", "Toma las iniciales."),
      T2("Palabra compuesta: lo que sirve para guardar paraguas.", ["para", "guas", "-ero", "des-"], ["para", "guas", "-ero"], "paragüero", "Compuesta + sufijo: para + aguas + -ero.", "Piensa en «paraguas».")
    ],
    rimas: [
      R("Las olas, soldados de plata,", "avanzan sobre la ___", "mata", ["arena", "orilla"], "Plata… mata: rima consonante en -ata."),
      R("Si el viento fuese un poeta,", "escribiría en la ___", "veleta", ["nube", "ola"], "Poeta… veleta: rima en -eta."),
      R("El faro, centinela del mar,", "no deja de ___", "vigilar", ["dormir", "brillar"], "Mar… vigilar: rima en -ar."),
      R("Tu voz es como la brisa:", "me trae la ___", "sonrisa", ["calma", "luz"], "Brisa… sonrisa: rima en -isa. Es una comparación.")
    ],
    pares: [
      ["queque", "bizcocho", "«Queque» viene del inglés «cake».", "Se hornea."],
      ["naife", "cuchillo", "«Naife» viene del inglés «knife».", "Sirve para cortar."],
      ["fechar", "cerrar con llave", "«Fechar» es cerrar con llave.", "Se hace con la puerta."],
      ["guagua", "autobús", "«Guagua» se usa en Canarias y en el Caribe.", "Transporte público."]
    ],
    caza: [
      { buenas: ["queque", "naife", "fechar", "tabaiba"], malas: ["bizcocho|Es la forma peninsular; aquí queque.", "cuchillo|Es la forma peninsular; aquí naife.", "mesa|Es común a todo el español.", "libro|Es común a todo el español."] },
      { buenas: ["con", "sobre", "entre", "hacia"], malas: ["lento|Es un adjetivo.", "montaña|Es un sustantivo.", "ellos|Es un pronombre.", "correr|Es un verbo."] }
    ],
    posts: [
      P("Cabildo", "@cabildo", "fiable", "El plazo para inscribirse en las ayudas al comedor termina el 30 de noviembre. Información en la sede electrónica del Cabildo.", "Fuente oficial con fecha límite y remite a su web.", ["fuente", "datos"], true),
      P("Meteorología", "@meteoisla", "fiable", "Aviso amarillo por oleaje desde las 15:00. Olas de hasta 3 metros en la costa norte. Datos en la web oficial.", "Organismo oficial con datos medibles.", ["fuente", "datos"], true),
      P("Noticias Ya", "@noticiasya", "bulo", "Un estudio secreto demuestra que el 99 % de la gente nunca duerme. ¡No salgas a la calle!", "No cita estudio ni autor y exagera.", ["sinfuente", "exagera", "alarma"], false, "hace 4 min"),
      P("TodoGratis", "@todogratis", "bulo", "Reenvía esto a 20 contactos y tendrás datos gratis para toda la vida.", "Cadena que promete un premio imposible.", ["cadena", "exagera"], false, "hace 30 min"),
      P("Noa", "@noa_cine", "opinion", "En mi opinión, las series son más entretenidas que los libros.", "«En mi opinión» y «más entretenidas» indican valoración.", ["opinion"], false, "ayer"),
      P("Leo", "@leo_sports", "opinion", "Me parece que el atletismo es el deporte más completo.", "«Me parece que» y «más completo» indican opinión.", ["opinion"], false, "ayer")
    ],
    libros: [
      L("Las islas del silbo", "Marta Ojeda", "Aventura y misterio", "Dos amigos descifran un código de silbidos para salvar la isla.", "#2b8a3e"),
      L("Mundo 2090", "Álex Roca", "Ciencia ficción", "En el futuro, un adolescente descubre que su ciudad está gobernada por una IA.", "#1971c2"),
      L("Guía de aves del Teide", "Ismael Rodríguez", "Libro informativo", "Fichas y mapas para identificar las aves de la alta montaña.", "#e8590c")
    ],
    perfiles: [
      F("Gara", "Quiero un libro de aventuras con un código secreto y mucho suspense.", ["Las islas del silbo"], retrato("morena", "#2b1d14", "largo", "#2b8a3e", "#d3f9d8", "nino"), "Aventura y misterio con un código secreto."),
      F("Pablo", "Me interesa cómo será el futuro con la inteligencia artificial.", ["Mundo 2090"], retrato("media", "#5a3825", "corto", "#1971c2", "#d0ebff", "nino"), "Futuro e IA: ciencia ficción."),
      F("Cristina", "Voy de excursión al Teide y quiero reconocer los pájaros.", ["Guía de aves del Teide"], retrato("clara", "#8a5a2b", "coleta", "#e8590c", "#ffe8cc", "nino"), "Una guía de aves ayuda a reconocerlas.")
    ],
    radio: [
      Q("¿Qué recuperará su horario habitual?", "El ferry de La Gomera", ["El carril bici", "El autobús"], "El ferry de La Gomera recupera su horario habitual."),
      Q("¿A qué hora será la asamblea?", "A las siete de la tarde", ["A las cinco", "A las nueve"], "La asamblea es a las siete."),
      Q("¿Cuál es la intención del anuncio de Refrescos Volcán?", "Convencer de comprar el refresco", ["Informar de un cambio de horario", "Explicar la asamblea"], "Un anuncio busca persuadir para comprar."),
      Q("¿Dónde será la asamblea?", "En el edificio donde trabajan la alcaldesa y los concejales", ["En la biblioteca", "En el puerto"], "Es en el ayuntamiento.")
    ],
    cartel: [
      Q("¿Hasta cuándo se puede entregar el microrrelato?", "Hasta el 15 de diciembre", ["Hasta el 15 de enero", "Hasta el 1 de diciembre"], "El plazo termina el 15 de diciembre.", "4.1"),
      Q("¿Qué extensión máxima puede tener?", "100 palabras", ["50 palabras", "200 palabras"], "La extensión máxima es de 100 palabras.", "4.1"),
      Q("¿Sobre qué temas se puede escribir?", "El mar o los volcanes de Canarias", ["Cualquier tema", "Los deportes"], "El tema es el mar o los volcanes de Canarias.", "4.1"),
      Q("¿Por qué crees que se limita a 100 palabras?", "Para que sean textos breves y bien pensados", ["Para que cueste menos imprimirlos", "Porque no hay más papel"], "Un microrrelato es breve por definición.", "4.2")
    ],
    historia: [
      Q("¿Qué daba el árbol del jardín?", "Manzanas de oro", ["Higos", "Dátiles"], "En él crecía un árbol de manzanas de oro.", "4.1"),
      Q("¿Cómo llamaron los romanos a Heracles?", "Hércules", ["Zeus", "Atlas"], "Los romanos lo llamaron Hércules.", "4.1"),
      Q("¿De qué nacieron los dragos, según la tradición?", "De la sangre derramada del dragón", ["De una semilla", "De la lluvia"], "De la sangre del dragón brotaron los dragos.", "8.1"),
      Q("¿Para qué sirve este relato?", "Para explicar el origen de la «sangre de drago»", ["Para dar una receta", "Para anunciar un viaje"], "Explica por qué la savia roja se llama sangre de drago.", "8.1")
    ],
    guion: [
      G("¿Quién propone un rincón digital?", "Yaiza", ["Daniel", "La asamblea"], "literal", 2, "Es Yaiza quien lo propone."),
      G("¿Qué opina Daniel del móvil en el recreo?", "Que quita ganas de jugar con los demás", ["Que es imprescindible", "Que ayuda a estudiar"], "literal", 1, "Daniel piensa que no se participa en los juegos."),
      G("¿Por qué crees que Yaiza pone límites de diez minutos?", "Para que el uso sea responsable y no domine el recreo", ["Porque no tiene batería", "Porque no le gusta jugar"], "inferencial", 2, "Los límites buscan un uso responsable."),
      G("¿Qué intención tiene el último párrafo?", "Invitar a los lectores a participar enviando su opinión", ["Dar la razón a Daniel", "Anunciar una fiesta"], "inferencial", 3, "Pide a los lectores que envíen su opinión."),
      G("¿Cuál de estas frases es una OPINIÓN?", "«Propongo un rincón digital con normas»", ["«La asamblea votará la próxima semana»", "«Respondieron 25 compañeros»"], "critica", null, "Proponer es defender una postura personal.", "4.2")
    ],
    tildes: [
      S("periódico", ["pe", "rió", "di", "co"], 1), S("cárcel", ["cár", "cel"], 0), S("camión", ["ca", "mión"], 1), S("lápices", ["lá", "pi", "ces"], 0), S("estación", ["es", "ta", "ción"], 2),
      S("héroe", ["hé", "ro", "e"], 0), S("sábado", ["sá", "ba", "do"], 0), S("sábelo", ["sá", "be", "lo"], 0), S("cántaro", ["cán", "ta", "ro"], 0),
      S("raíces", ["ra", "í", "ces"], 1, { hiato: true }), S("oído", ["o", "í", "do"], 1, { hiato: true }), S("baúl", ["ba", "úl"], 1, { hiato: true }), S("Tenerife", ["Te", "ne", "ri", "fe"], 2),
      S("dígamelo", ["dí", "ga", "me", "lo"], 0)
    ],
    clasificador: [
      it("Ellos siempre llegan pronto.", "Ellos", "pronombre", "«Ellos» sustituye a los nombres de personas."),
      it("Ellos siempre llegan pronto.", "siempre", "adverbio", "«siempre» dice cuándo llegan."),
      it("Ellos siempre llegan pronto.", "pronto", "adverbio", "«pronto» dice cuándo llegan."),
      it("Ese cuaderno es mío.", "mío", "pronombre", "«mío» sustituye a «mi cuaderno»."),
      it("Ese cuaderno es mío.", "Ese", "determinante", "«Ese» acompaña a «cuaderno»."),
      it("Hablaron claramente.", "claramente", "adverbio", "«claramente» dice cómo hablaron."),
      it("Lo vimos allí.", "Lo", "pronombre", "«Lo» sustituye a lo que vimos."),
      it("Lo vimos allí.", "allí", "adverbio", "«allí» dice dónde."),
      it("La cura del paciente fue rápida.", "cura", "sustantivo", "Aquí «cura» nombra el tratamiento: sustantivo.", true),
      it("El médico cura la herida.", "cura", "verbo", "Aquí «cura» dice lo que hace el médico: verbo.", true)
    ]
  };


  /* ---- Mezcla de los bancos con el contenido de cada curso ----
     Añade los elementos del banco a PP.CONTENIDO[n] (sin duplicar), de modo que cada
     misión pueda elegir con U.muestra un subconjunto distinto en cada partida. */
  function mezclar() {
    const C = PP.CONTENIDO || {};
    const dedup = (dst, src, clave) => {
      const vistos = new Set(dst.map(clave));
      src.forEach(x => { const k = clave(x); if (!vistos.has(k)) { vistos.add(k); dst.push(x); } });
    };
    Object.keys(BANCO).forEach(n => {
      const b = BANCO[n], c = C[n];
      if (!c) return;
      if (c.autopista) dedup(c.autopista, b.autopista || [], x => x.p);
      if (c.taller && c.taller.items) dedup(c.taller.items, b.taller || [], x => x.res);
      if (c.rimas && c.rimas.items) dedup(c.rimas.items, b.rimas || [], x => x.v1);
      if (c.variantes && c.variantes.pares) dedup(c.variantes.pares, b.pares || [], x => x[0]);
      if (c.caza) (b.caza || []).forEach((g, i) => {
        const d = c.caza[i]; if (!d) return;
        dedup(d.buenas, g.buenas || [], x => x);
        dedup(d.malas, g.malas || [], x => x.split("|")[0]);
      });
      if (c.chismografo && c.chismografo.posts) dedup(c.chismografo.posts, b.posts || [], x => x.texto);
      if (c.biblioteca) {
        const bib = c.biblioteca;
        dedup(bib.libros, b.libros || [], x => x.titulo);
        (b.perfiles || []).forEach(f => {
          if (bib.perfiles.some(p => p.nombre === f.nombre)) return;
          const ok = (f.okT || []).map(t => bib.libros.findIndex(l => l.titulo === t)).filter(i => i >= 0);
          if (!ok.length) return;
          const p = Object.assign({}, f, { ok }); delete p.okT; bib.perfiles.push(p);
        });
      }
      [["radio"], ["cartel"], ["historia"], ["guion"]].forEach(([k]) => {
        if (c[k] && c[k].preguntas) dedup(c[k].preguntas, b[k] || [], x => x.p);
      });
      if (c.tildes && c.tildes.items) dedup(c.tildes.items, b.tildes || [], x => x.p);
      if (c.clasificador && c.clasificador.items) dedup(c.clasificador.items, b.clasificador || [], x => x.f + "#" + x.w);
    });
  }
  PP.mezclarBanco = mezclar;
  mezclar();
  PP.BANCO = BANCO;
  PP.BancoUtil = { A, Q, T, T2, R, P, it, S, retrato, L, F, G };
})();
