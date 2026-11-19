/* Puerto Palabra · Ampliación de contenidos (3 actividades nuevas por curso).
   - tildes: «Operación Tilde» (Academia de las Tildes). 1.er ciclo: sílabas; 2.º y 3.er ciclo: sílaba tónica,
     agudas / llanas / esdrújulas y tilde; 3.er ciclo además hiatos, sobresdrújulas y tilde diacrítica.
     Referencia: Decreto 211/2022, Bloque IV de saberes (1.er ciclo: sonidos y letras, palabras; 2.º y 3.er ciclo:
     «observación y formulación de generalizaciones sobre la acentuación y otras normas ortográficas»).
   - clasificador: «La cinta clasificadora» (Almacén de Palabras). Clases de palabras EN CONTEXTO, con palabras
     de «doble cara». Bloque IV: «distintos tipos de palabras» y sus relaciones.
   - guion: «El guion secreto» (Cine Atlántico). Texto original + preguntas literales, inferenciales y críticas.
     Criterio 4.1 (1.er ciclo: interpretación literal; 2.º y 3.er: inferencias) y 4.2 (análisis y valoración).
   En «tildes», s = sílabas tal y como se escriben; t = posición (desde 0) de la sílaba tónica.
   Todos los textos son originales; los lugares y personas de las noticias son ficticios. */
window.PP = window.PP || {};
PP.CONTENIDO = PP.CONTENIDO || {};

PP.CATEGORIAS = {
  sustantivo:   { n: "Sustantivo",   d: "nombra personas, animales, cosas o ideas", color: "#3a86ff" },
  adjetivo:     { n: "Adjetivo",     d: "dice cómo es o cómo está algo",            color: "#06d6a0" },
  verbo:        { n: "Verbo",        d: "dice qué se hace o qué pasa",              color: "#ff4f7b" },
  determinante: { n: "Determinante", d: "acompaña al sustantivo y lo concreta",     color: "#ffbe0b" },
  pronombre:    { n: "Pronombre",    d: "sustituye a un sustantivo",                color: "#8338ec" },
  adverbio:     { n: "Adverbio",     d: "dice cómo, cuándo, dónde o cuánto",        color: "#fb5607" }
};

(function () {
  const C = PP.CONTENIDO;
  const add = (n, o) => { C[n] = C[n] || {}; Object.assign(C[n], o); };
  const it = (f, w, c, fb, doble) => ({ f, w, c, fb, doble: !!doble });

  // =========================== 1.º ===========================
  add(1, {
    tildes: { modo: "silabas", titulo: "Palmadas de sílabas", items: [
      { p: "casa", s: ["ca", "sa"] }, { p: "pelota", s: ["pe", "lo", "ta"] }, { p: "sol", s: ["sol"] },
      { p: "mariposa", s: ["ma", "ri", "po", "sa"] }, { p: "gofio", s: ["go", "fio"] }, { p: "guagua", s: ["gua", "gua"] },
      { p: "playa", s: ["pla", "ya"] }, { p: "tomate", s: ["to", "ma", "te"] }, { p: "mar", s: ["mar"] },
      { p: "perro", s: ["pe", "rro"] }, { p: "chocolate", s: ["cho", "co", "la", "te"] }, { p: "luna", s: ["lu", "na"] }
    ] },
    clasificador: { categorias: ["sustantivo", "adjetivo", "verbo"], items: [
      it("El perro corre por la playa.", "perro", "sustantivo", "«perro» nombra un animal."),
      it("El perro corre por la playa.", "corre", "verbo", "«corre» dice lo que hace el perro."),
      it("La guagua grande ya llega.", "grande", "adjetivo", "«grande» dice cómo es la guagua."),
      it("Nayra salta a la comba.", "salta", "verbo", "«salta» dice lo que hace Nayra."),
      it("El sol brilla en el cielo.", "sol", "sustantivo", "«sol» nombra una cosa."),
      it("Tengo un baifo pequeño.", "pequeño", "adjetivo", "«pequeño» dice cómo es el baifo."),
      it("Los niños cantan en el patio.", "cantan", "verbo", "«cantan» dice lo que hacen los niños."),
      it("Mi abuela hace un gofio rico.", "gofio", "sustantivo", "«gofio» nombra un alimento."),
      it("El mar está azul.", "azul", "adjetivo", "«azul» dice cómo está el mar."),
      it("La playa está limpia.", "limpia", "adjetivo", "Aquí «limpia» dice cómo está la playa.", true),
      it("Ana limpia la mesa.", "limpia", "verbo", "Aquí «limpia» dice lo que hace Ana. ¡La misma palabra cambia según la frase!", true),
      it("Me gusta el canto de los pájaros.", "canto", "sustantivo", "Aquí «canto» nombra algo: el canto (va con «el»).", true),
      it("Yo canto en el coro.", "canto", "verbo", "Aquí «canto» dice lo que hago yo: es un verbo.", true)
    ] },
    guion: { titulo: "El baifo dormilón", tipo: "Cuento", parrafos: [
      "Lía vive en un pueblo de Fuerteventura. Tiene un baifo blanco que se llama Chispa.",
      "Una mañana, Chispa no está en el corral. Lía lo busca en la huerta y en la playa, pero no lo encuentra.",
      "De pronto, oye un «¡beee!» debajo de la higuera. ¡Chispa está dormido a la sombra!",
      "Lía le da un abrazo y le pone agua fresca."
    ], preguntas: [
      { p: "¿Cómo se llama el baifo?", o: ["Chispa", "Lía", "Higuera"], c: 0, nivel: "literal", par: 0, fb: "Se llama Chispa: lo dice el primer párrafo." },
      { p: "¿Dónde busca Lía a Chispa?", o: ["En la huerta y en la playa", "En el colegio", "En la guagua"], c: 0, nivel: "literal", par: 1, fb: "Lo busca en la huerta y en la playa." },
      { p: "¿Dónde estaba Chispa?", o: ["Debajo de la higuera", "En la playa", "Dentro de casa"], c: 0, nivel: "literal", par: 2, fb: "¡Estaba dormido debajo de la higuera!" },
      { p: "¿Qué tipo de texto es?", o: ["Un cuento", "Una receta", "Una noticia"], c: 0, nivel: "critica", crit: "4.2", fb: "Es un cuento: tiene personajes y cuenta algo que les pasa." }
    ] }
  });

  // =========================== 2.º ===========================
  add(2, {
    tildes: { modo: "silabas", titulo: "Palmadas de sílabas", items: [
      { p: "camiseta", s: ["ca", "mi", "se", "ta"] }, { p: "plátano", s: ["plá", "ta", "no"] }, { p: "tren", s: ["tren"] },
      { p: "bicicleta", s: ["bi", "ci", "cle", "ta"] }, { p: "ratón", s: ["ra", "tón"] }, { p: "escuela", s: ["es", "cue", "la"] },
      { p: "flor", s: ["flor"] }, { p: "dinosaurio", s: ["di", "no", "sau", "rio"] }, { p: "barco", s: ["bar", "co"] },
      { p: "lápiz", s: ["lá", "piz"] }, { p: "cangrejo", s: ["can", "gre", "jo"] }, { p: "timple", s: ["tim", "ple"] }
    ] },
    clasificador: { categorias: ["sustantivo", "adjetivo", "verbo"], items: [
      it("Las papas arrugadas están ricas.", "papas", "sustantivo", "«papas» nombra un alimento."),
      it("Las papas arrugadas están ricas.", "arrugadas", "adjetivo", "«arrugadas» dice cómo son las papas."),
      it("Mi hermana dibuja un volcán.", "dibuja", "verbo", "«dibuja» dice lo que hace mi hermana."),
      it("El dibujo es precioso.", "dibujo", "sustantivo", "Aquí «dibujo» nombra una cosa: el dibujo.", true),
      it("Yo dibujo un drago.", "dibujo", "verbo", "Aquí «dibujo» dice lo que hago yo.", true),
      it("El timple suena alegre.", "suena", "verbo", "«suena» dice lo que pasa con el timple."),
      it("El timple suena alegre.", "alegre", "adjetivo", "«alegre» dice cómo suena: cómo es su música."),
      it("La niña valiente subió a la montaña.", "valiente", "adjetivo", "«valiente» dice cómo es la niña."),
      it("La cometa vuela muy alto.", "vuela", "verbo", "«vuela» dice lo que hace la cometa."),
      it("Las cholas nuevas son cómodas.", "cholas", "sustantivo", "«cholas» nombra una cosa (así llamamos en Canarias a las chanclas)."),
      it("Ellos nadan en el charco.", "nadan", "verbo", "«nadan» dice lo que hacen ellos."),
      it("El juego termina pronto.", "juego", "sustantivo", "Aquí «juego» nombra algo: el juego.", true),
      it("Yo juego con mi primo.", "juego", "verbo", "Aquí «juego» dice lo que hago yo.", true),
      it("La fruta está madura.", "madura", "adjetivo", "«madura» dice cómo está la fruta.")
    ] },
    guion: { titulo: "La merienda de Tito", tipo: "Cuento", parrafos: [
      "Tito es un lagarto pequeño que vive en un muro de piedra del colegio. Todas las tardes sale a tomar el sol.",
      "Un día, unos niños dejaron en el patio un trozo de plátano. Tito lo vio y bajó despacito por el muro.",
      "Pero llegó una gaviota muy grande. Tito se escondió entre las piedras sin hacer ruido.",
      "Cuando la gaviota se fue, Tito salió y se comió un fisco de plátano. ¡Qué merienda tan rica!"
    ], preguntas: [
      { p: "¿Dónde vive Tito?", o: ["En un muro de piedra del colegio", "En la playa", "En una casa del pueblo"], c: 0, nivel: "literal", par: 0, fb: "Vive en un muro de piedra del colegio." },
      { p: "¿Qué dejaron los niños en el patio?", o: ["Un trozo de plátano", "Un bocadillo", "Una manzana"], c: 0, nivel: "literal", par: 1, fb: "Dejaron un trozo de plátano." },
      { p: "¿Qué animal llegó?", o: ["Una gaviota", "Un perro", "Un gato"], c: 0, nivel: "literal", par: 2, fb: "Llegó una gaviota muy grande." },
      { p: "¿Por qué se escondió Tito?", o: ["Porque tenía miedo de la gaviota", "Porque tenía sueño", "Porque estaba jugando"], c: 0, nivel: "inferencial", par: 2, fb: "El texto no lo dice con esas palabras, pero lo deducimos: la gaviota era muy grande y Tito se escondió sin hacer ruido." },
      { p: "¿Por qué la última frase lleva ¡ !?", o: ["Para mostrar alegría", "Porque es una pregunta", "Porque es el título"], c: 0, nivel: "critica", crit: "4.2", par: 3, fb: "Los signos de exclamación muestran una emoción: aquí, alegría." }
    ] }
  });

  // =========================== 3.º ===========================
  add(3, {
    tildes: { modo: "acento", titulo: "Operación Tilde", items: [
      { p: "canción", s: ["can", "ción"], t: 1 }, { p: "reloj", s: ["re", "loj"], t: 1 }, { p: "papel", s: ["pa", "pel"], t: 1 },
      { p: "sofá", s: ["so", "fá"], t: 1 }, { p: "mesa", s: ["me", "sa"], t: 0 }, { p: "árbol", s: ["ár", "bol"], t: 0 },
      { p: "lápiz", s: ["lá", "piz"], t: 0 }, { p: "zapato", s: ["za", "pa", "to"], t: 1 }, { p: "pájaro", s: ["pá", "ja", "ro"], t: 0 },
      { p: "música", s: ["mú", "si", "ca"], t: 0 }, { p: "examen", s: ["e", "xa", "men"], t: 1 }, { p: "teléfono", s: ["te", "lé", "fo", "no"], t: 1 },
      { p: "volcán", s: ["vol", "cán"], t: 1 }, { p: "ciudad", s: ["ciu", "dad"], t: 1 }
    ] },
    clasificador: { categorias: ["sustantivo", "adjetivo", "verbo", "determinante"], items: [
      it("Este volcán es muy alto.", "Este", "determinante", "«Este» acompaña a «volcán» y señala cuál: es un determinante."),
      it("Este volcán es muy alto.", "alto", "adjetivo", "«alto» dice cómo es el volcán."),
      it("Mi abuelo pesca en el muelle.", "Mi", "determinante", "«Mi» acompaña a «abuelo» y dice de quién es."),
      it("Mi abuelo pesca en el muelle.", "pesca", "verbo", "Aquí «pesca» dice lo que hace el abuelo.", true),
      it("La pesca de hoy fue buena.", "pesca", "sustantivo", "Aquí «pesca» nombra algo y va con «la».", true),
      it("Unos turistas miran el mar.", "Unos", "determinante", "«Unos» acompaña a «turistas»."),
      it("Las tuneras tienen flores amarillas.", "tuneras", "sustantivo", "«tuneras» nombra unas plantas."),
      it("Las tuneras tienen flores amarillas.", "amarillas", "adjetivo", "«amarillas» dice cómo son las flores."),
      it("Compré tres mangos maduros.", "tres", "determinante", "«tres» acompaña a «mangos» y dice cuántos: es un determinante numeral."),
      it("El mercado abre temprano.", "abre", "verbo", "«abre» dice lo que pasa con el mercado."),
      it("Aquellas montañas parecen azules.", "Aquellas", "determinante", "«Aquellas» acompaña a «montañas» y dice cuáles."),
      it("El vuelo llegó a su hora.", "vuelo", "sustantivo", "Aquí «vuelo» nombra algo: el vuelo.", true),
      it("Yo vuelo en mis sueños.", "vuelo", "verbo", "Aquí «vuelo» dice lo que hago yo.", true)
    ] },
    guion: { titulo: "El drago, un árbol canario", tipo: "Texto informativo", parrafos: [
      "El drago es un árbol muy especial que crece en Canarias y en otras islas del Atlántico. Su tronco es grueso y sus ramas terminan en ramilletes de hojas largas y puntiagudas.",
      "Crece muy despacio: puede tardar muchos años en tener sus primeras ramas. Por eso, los dragos con muchas ramas son muy viejos.",
      "Cuando se corta su corteza, sale una resina que se vuelve roja. La gente la llama «sangre de drago».",
      "En Icod de los Vinos, en Tenerife, hay un drago enorme que visitan personas de todo el mundo. Es uno de los símbolos de la isla."
    ], preguntas: [
      { p: "¿Dónde está el drago enorme del que habla el texto?", o: ["En Icod de los Vinos (Tenerife)", "En Las Palmas de Gran Canaria", "En La Gomera"], c: 0, nivel: "literal", par: 3, fb: "Está en Icod de los Vinos, en Tenerife." },
      { p: "¿Cómo llaman a la resina roja del drago?", o: ["Sangre de drago", "Savia azul", "Miel de palma"], c: 0, nivel: "literal", par: 2, fb: "La llaman «sangre de drago»." },
      { p: "¿Por qué un drago con muchas ramas es muy viejo?", o: ["Porque crece muy despacio", "Porque tiene la resina roja", "Porque vive en una isla"], c: 0, nivel: "inferencial", par: 1, fb: "Si tarda muchos años en echar ramas, uno con muchas ramas ha vivido muchísimo tiempo." },
      { p: "¿Qué quiere decir que el drago es «uno de los símbolos de la isla»?", o: ["Que representa a Tenerife", "Que es el árbol más pequeño", "Que solo crece en el colegio"], c: 0, nivel: "inferencial", par: 3, fb: "Un símbolo representa algo: el drago representa a la isla." },
      { p: "¿Qué tipo de texto es y para qué sirve?", o: ["Informativo: explica cómo es el drago", "Un cuento: inventa una aventura", "Una receta: enseña a cocinar"], c: 0, nivel: "critica", crit: "4.2", fb: "Es un texto informativo: da datos sobre el drago." }
    ] }
  });

  // =========================== 4.º ===========================
  add(4, {
    tildes: { modo: "acento", titulo: "Operación Tilde", items: [
      { p: "autobús", s: ["au", "to", "bús"], t: 2 }, { p: "café", s: ["ca", "fé"], t: 1 }, { p: "jardín", s: ["jar", "dín"], t: 1 },
      { p: "feliz", s: ["fe", "liz"], t: 1 }, { p: "ordenador", s: ["or", "de", "na", "dor"], t: 3 }, { p: "azúcar", s: ["a", "zú", "car"], t: 1 },
      { p: "fácil", s: ["fá", "cil"], t: 0 }, { p: "joven", s: ["jo", "ven"], t: 0 }, { p: "dibujo", s: ["di", "bu", "jo"], t: 1 },
      { p: "lunes", s: ["lu", "nes"], t: 0 }, { p: "murciélago", s: ["mur", "cié", "la", "go"], t: 1 }, { p: "brújula", s: ["brú", "ju", "la"], t: 0 },
      { p: "sábado", s: ["sá", "ba", "do"], t: 0 }, { p: "estación", s: ["es", "ta", "ción"], t: 2 }
    ] },
    clasificador: { categorias: ["sustantivo", "adjetivo", "verbo", "determinante"], items: [
      it("Nuestra clase prepara una obra de teatro.", "Nuestra", "determinante", "«Nuestra» acompaña a «clase» y dice de quién es."),
      it("Nuestra clase prepara una obra de teatro.", "prepara", "verbo", "«prepara» dice lo que hace la clase."),
      it("Varios delfines saltaban junto al barco.", "Varios", "determinante", "«Varios» acompaña a «delfines» e indica una cantidad."),
      it("Varios delfines saltaban junto al barco.", "saltaban", "verbo", "«saltaban» dice lo que hacían los delfines."),
      it("El cielo nocturno de La Palma es famoso.", "nocturno", "adjetivo", "«nocturno» dice cómo es el cielo (de noche)."),
      it("El cielo nocturno de La Palma es famoso.", "cielo", "sustantivo", "«cielo» nombra una cosa."),
      it("Esas sandalias son de mi prima.", "Esas", "determinante", "«Esas» acompaña a «sandalias» y señala cuáles."),
      it("El paseo por la costa fue largo.", "paseo", "sustantivo", "Aquí «paseo» nombra algo: el paseo.", true),
      it("Los domingos paseo con mi abuela.", "paseo", "verbo", "Aquí «paseo» dice lo que hago yo.", true),
      it("La tarta tenía un sabor dulce.", "dulce", "adjetivo", "«dulce» dice cómo era el sabor."),
      it("Muchos vecinos limpiaron la playa.", "Muchos", "determinante", "«Muchos» acompaña a «vecinos» e indica cantidad."),
      it("La luz entra por la ventana.", "luz", "sustantivo", "«luz» nombra una cosa."),
      it("Mi primo cocina un potaje delicioso.", "delicioso", "adjetivo", "«delicioso» dice cómo es el potaje.")
    ] },
    guion: { titulo: "Excursión al bosque de laurisilva", tipo: "Texto instructivo (normas)", parrafos: [
      "El viernes visitaremos el bosque de laurisilva del Monte de las Brumas. Saldremos en guagua a las 8:30 desde la puerta del colegio y volveremos a las 14:00.",
      "Qué debes llevar: mochila pequeña, agua, bocadillo, chubasquero y calzado cómodo. En el bosque hay mucha humedad y a menudo cae una lluvia fina.",
      "Normas del bosque: camina siempre por el sendero, no arranques plantas ni musgo, no grites para no asustar a los animales y guarda tu basura en la mochila hasta volver.",
      "Si pierdes de vista al grupo, quédate quieto donde estás y espera: el profesorado te encontrará."
    ], preguntas: [
      { p: "¿A qué hora sale la guagua?", o: ["A las 8:30", "A las 14:00", "A las 9:00"], c: 0, nivel: "literal", par: 0, fb: "Sale a las 8:30 desde la puerta del colegio." },
      { p: "¿Qué hay que hacer con la basura?", o: ["Guardarla en la mochila hasta volver", "Dejarla junto al sendero", "Enterrarla en el bosque"], c: 0, nivel: "literal", par: 2, fb: "Se guarda en la mochila hasta volver." },
      { p: "¿Por qué hay que llevar chubasquero aunque haga sol en el colegio?", o: ["Porque en el bosque suele caer una lluvia fina", "Porque en la guagua hace frío", "Porque lo pide el conductor"], c: 0, nivel: "inferencial", par: 1, fb: "El texto dice que en el bosque hay humedad y cae una lluvia fina: el chubasquero sirve para eso." },
      { p: "¿Cuánto durará la excursión, más o menos?", o: ["Unas cinco horas y media", "Unas dos horas", "Todo el día y la noche"], c: 0, nivel: "inferencial", par: 0, fb: "De las 8:30 a las 14:00 hay cinco horas y media." },
      { p: "¿Para qué está escrito este texto?", o: ["Para dar instrucciones y normas de la excursión", "Para contar una leyenda del bosque", "Para anunciar mochilas"], c: 0, nivel: "critica", crit: "4.2", fb: "Es un texto instructivo: dice qué llevar y cómo comportarse." },
      { p: "¿Por qué el texto está dividido en partes (qué llevar, normas…)?", o: ["Para encontrar la información más fácilmente", "Para que parezca más largo", "Porque es un poema"], c: 0, nivel: "critica", crit: "4.2", fb: "Organizar el texto en partes ayuda a encontrar cada información." }
    ] }
  });

  // =========================== 5.º ===========================
  add(5, {
    tildes: { modo: "acento", titulo: "Operación Tilde", sobres: true, items: [
      { p: "camión", s: ["ca", "mión"], t: 1 }, { p: "compás", s: ["com", "pás"], t: 1 }, { p: "difícil", s: ["di", "fí", "cil"], t: 1 },
      { p: "césped", s: ["cés", "ped"], t: 0 }, { p: "volumen", s: ["vo", "lu", "men"], t: 1 }, { p: "relámpago", s: ["re", "lám", "pa", "go"], t: 1 },
      { p: "cuéntaselo", s: ["cuén", "ta", "se", "lo"], t: 0 }, { p: "día", s: ["dí", "a"], t: 0, hiato: true }, { p: "baúl", s: ["ba", "úl"], t: 1, hiato: true },
      { p: "búho", s: ["bú", "ho"], t: 0, hiato: true }, { p: "frío", s: ["frí", "o"], t: 0, hiato: true }, { p: "cuaderno", s: ["cua", "der", "no"], t: 1 },
      { p: "huerta", s: ["huer", "ta"], t: 0 }, { p: "dímelo", s: ["dí", "me", "lo"], t: 0 }
    ], diacriticas: [
      { f: "___ hermano juega al fútbol.", o: ["Tu", "Tú"], c: 0, fb: "«Tu» sin tilde acompaña a un sustantivo (tu hermano): es posesivo." },
      { f: "¿Vienes ___ también a la playa?", o: ["tu", "tú"], c: 1, fb: "«Tú» con tilde es pronombre personal: se refiere a una persona." },
      { f: "___ trajo el gofio para todos.", o: ["El", "Él"], c: 1, fb: "«Él» con tilde es pronombre personal (él trajo…)." },
      { f: "Quiero ___ agua, por favor.", o: ["más", "mas"], c: 0, fb: "«Más» con tilde indica cantidad." },
      { f: "Le pregunté si venía y me dijo que ___.", o: ["si", "sí"], c: 1, fb: "«Sí» con tilde es afirmación." },
      { f: "Este regalo es para ___.", o: ["mi", "mí"], c: 1, fb: "«Mí» con tilde es pronombre (para mí)." }
    ] },
    clasificador: { categorias: ["sustantivo", "adjetivo", "verbo", "determinante", "pronombre", "adverbio"], items: [
      it("Ella escribe muy bien.", "Ella", "pronombre", "«Ella» sustituye el nombre de una persona."),
      it("Ella escribe muy bien.", "bien", "adverbio", "«bien» dice cómo escribe."),
      it("Ella escribe muy bien.", "muy", "adverbio", "«muy» dice cuánto: intensifica a «bien»."),
      it("Este cuaderno es mío; ese es tuyo.", "Este", "determinante", "«Este» acompaña a «cuaderno»: es determinante."),
      it("Este cuaderno es mío; ese es tuyo.", "ese", "pronombre", "«ese» no acompaña a ningún sustantivo: lo sustituye (ese cuaderno). Es pronombre."),
      it("Mañana iremos al Roque Nublo.", "Mañana", "adverbio", "Aquí «mañana» dice cuándo: es adverbio.", true),
      it("La mañana era fresca.", "mañana", "sustantivo", "Aquí «mañana» va con «la» y nombra una parte del día.", true),
      it("Nosotros llegamos tarde al concierto.", "Nosotros", "pronombre", "«Nosotros» sustituye a los nombres de las personas."),
      it("Nosotros llegamos tarde al concierto.", "tarde", "adverbio", "Aquí «tarde» dice cuándo llegamos.", true),
      it("La tarde fue tranquila.", "tarde", "sustantivo", "Aquí «tarde» va con «la» y nombra una parte del día.", true),
      it("Los alumnos leyeron atentamente el poema.", "atentamente", "adverbio", "«atentamente» dice cómo leyeron."),
      it("Le regalé un libro antiguo.", "Le", "pronombre", "«Le» sustituye a la persona que recibe el regalo."),
      it("Aquí vive mi tía Candelaria.", "Aquí", "adverbio", "«Aquí» dice dónde."),
      it("Aquí vive mi tía Candelaria.", "mi", "determinante", "«mi» acompaña a «tía» y dice de quién es.")
    ] },
    guion: { titulo: "Una tortuga boba vuelve al mar tras recuperarse", tipo: "Noticia", entradilla: "La tortuga, llamada Lola, fue rescatada hace tres meses enredada en los restos de una red de pesca.", parrafos: [
      "PUERTO PALABRA. Decenas de vecinos aplaudieron ayer en la playa de Las Arenas la suelta de Lola, una tortuga boba que llegó al centro de recuperación de fauna con una aleta herida.",
      "Según el equipo veterinario, la tortuga apareció flotando a dos millas de la costa, atrapada en un trozo de red de pesca abandonada. «Si no la llegan a encontrar a tiempo, no habría sobrevivido», explicó la veterinaria Ana Rodríguez.",
      "Durante su recuperación, Lola recibió curas diarias y volvió a practicar la natación en una piscina. Antes de la suelta, el equipo le colocó un pequeño dispositivo para seguir su viaje por el océano.",
      "El centro recuerda que los plásticos y las redes abandonadas son uno de los mayores peligros para las tortugas marinas, y pide a la población que avise a los servicios de emergencia si encuentra un animal marino herido."
    ], preguntas: [
      { p: "¿Qué le pasaba a Lola cuando la encontraron?", o: ["Estaba atrapada en una red y tenía una aleta herida", "Se había perdido en una piscina", "Estaba dormida en la playa"], c: 0, nivel: "literal", par: 1, fb: "Estaba atrapada en una red abandonada y tenía una aleta herida." },
      { p: "¿Quién es Ana Rodríguez?", o: ["Una veterinaria del centro", "Una vecina de la playa", "La directora del periódico"], c: 0, nivel: "literal", par: 1, fb: "Es la veterinaria que explica el rescate." },
      { p: "¿Qué quiere decir la veterinaria con su frase entre comillas?", o: ["Que la rescataron justo a tiempo", "Que la tortuga ya estaba curada", "Que nadie la buscó"], c: 0, nivel: "inferencial", par: 1, fb: "Si la hubieran encontrado más tarde, habría muerto: llegaron justo a tiempo." },
      { p: "¿Por qué crees que Lola tuvo que practicar natación en una piscina?", o: ["Porque había pasado tiempo herida y sin nadar en el mar", "Porque las tortugas no saben nadar", "Porque la piscina era su casa"], c: 0, nivel: "inferencial", par: 2, fb: "Tras meses herida, necesitaba recuperar fuerza antes de volver al mar." },
      { p: "¿Qué parte de la noticia resume lo más importante?", o: ["El titular y la entradilla", "El último párrafo", "El nombre del periódico"], c: 0, nivel: "critica", crit: "4.2", fb: "En una noticia, el titular y la entradilla resumen lo esencial." },
      { p: "Un lector escribe un comentario. ¿Cuál de estas frases es una OPINIÓN?", o: ["«Es la noticia más bonita del año»", "«La tortuga fue rescatada hace tres meses»", "«Le colocaron un dispositivo»"], c: 0, nivel: "critica", crit: "4.2", fb: "«La más bonita del año» es una valoración personal; las otras son datos que se pueden comprobar." }
    ] }
  });

  // =========================== 6.º ===========================
  add(6, {
    tildes: { modo: "acento", titulo: "Operación Tilde", sobres: true, items: [
      { p: "periódico", s: ["pe", "rió", "di", "co"], t: 1 }, { p: "carácter", s: ["ca", "rác", "ter"], t: 1 }, { p: "huésped", s: ["hués", "ped"], t: 0 },
      { p: "dirección", s: ["di", "rec", "ción"], t: 2 }, { p: "ciempiés", s: ["ciem", "piés"], t: 1 }, { p: "exámenes", s: ["e", "xá", "me", "nes"], t: 1 },
      { p: "jóvenes", s: ["jó", "ve", "nes"], t: 0 }, { p: "cómpramelo", s: ["cóm", "pra", "me", "lo"], t: 0 }, { p: "raíz", s: ["ra", "íz"], t: 1, hiato: true },
      { p: "reír", s: ["re", "ír"], t: 1, hiato: true }, { p: "geografía", s: ["ge", "o", "gra", "fí", "a"], t: 3, hiato: true }, { p: "huevo", s: ["hue", "vo"], t: 0 },
      { p: "imagen", s: ["i", "ma", "gen"], t: 1 }, { p: "imágenes", s: ["i", "má", "ge", "nes"], t: 1 }
    ], diacriticas: [
      { f: "¿___ hora es?", o: ["Que", "Qué"], c: 1, fb: "«Qué» lleva tilde cuando pregunta o exclama." },
      { f: "Creo ___ mañana lloverá.", o: ["que", "qué"], c: 0, fb: "Aquí «que» une dos partes de la frase: no pregunta, no lleva tilde." },
      { f: "Llámame ___ llegues a casa.", o: ["cuando", "cuándo"], c: 0, fb: "Aquí «cuando» no pregunta: indica un momento." },
      { f: "No ___ la respuesta.", o: ["se", "sé"], c: 1, fb: "«Sé» con tilde es del verbo saber (yo sé)." },
      { f: "¿Quieres un ___ con leche?", o: ["te", "té"], c: 1, fb: "«Té» con tilde es la bebida." },
      { f: "Ojalá me ___ una pista.", o: ["de", "dé"], c: 1, fb: "«Dé» con tilde es del verbo dar." }
    ] },
    clasificador: { categorias: ["sustantivo", "adjetivo", "verbo", "determinante", "pronombre", "adverbio"], items: [
      it("Nadie sabía la respuesta.", "Nadie", "pronombre", "«Nadie» funciona como pronombre: se refiere a personas sin nombrarlas."),
      it("Los científicos estudiaron el volcán durante meses.", "estudiaron", "verbo", "«estudiaron» dice lo que hicieron los científicos."),
      it("Aquel faro guía a los barcos.", "Aquel", "determinante", "«Aquel» acompaña a «faro» y señala cuál."),
      it("Aquel faro guía a los barcos.", "guía", "verbo", "Aquí «guía» dice lo que hace el faro.", true),
      it("La guía del museo nos explicó la exposición.", "guía", "sustantivo", "Aquí «guía» va con «la» y nombra a una persona.", true),
      it("La guía del museo nos explicó la exposición.", "nos", "pronombre", "«nos» sustituye a nosotros."),
      it("Habló claramente ante la asamblea.", "claramente", "adverbio", "«claramente» dice cómo habló."),
      it("Algunos alumnos prefieren leer cómics.", "Algunos", "determinante", "«Algunos» acompaña a «alumnos»."),
      it("Algunos prefieren los cómics; otros, las novelas.", "otros", "pronombre", "«otros» no acompaña a un sustantivo: lo sustituye. Es pronombre."),
      it("Todavía no ha llegado la guagua.", "Todavía", "adverbio", "«Todavía» dice cuándo."),
      it("El viento sopla fuerte en Fuerteventura.", "sopla", "verbo", "«sopla» dice lo que hace el viento."),
      it("La isla tiene un paisaje lunar.", "lunar", "adjetivo", "Aquí «lunar» dice cómo es el paisaje (parecido a la Luna).", true),
      it("Tiene un lunar en la mejilla.", "lunar", "sustantivo", "Aquí «lunar» va con «un» y nombra una mancha de la piel.", true),
      it("El poema era breve e intenso.", "intenso", "adjetivo", "«intenso» dice cómo era el poema.")
    ] },
    guion: { titulo: "Debate en El Eco: ¿móviles en el recreo?", tipo: "Texto de opinión", parrafos: [
      "La asamblea del Colegio La Laja debate si se debe permitir usar el móvil en el recreo. Publicamos dos opiniones del alumnado de 6.º.",
      "Opinión de Daniel: «Yo creo que el recreo es para jugar y hablar cara a cara. Cuando alguien está con el móvil, no participa en los juegos. Además, en una encuesta de nuestra clase, 18 de 25 compañeros dijeron que juegan más cuando no hay pantallas».",
      "Opinión de Yaiza: «No estoy de acuerdo con prohibirlo del todo. A veces necesitamos el móvil para avisar a la familia o para buscar información de un trabajo. Propongo un rincón digital con normas: solo diez minutos y siempre con permiso».",
      "La asamblea votará la próxima semana. ¿Y tú qué opinas? Envía tu opinión a la Redacción de El Eco."
    ], preguntas: [
      { p: "¿Qué propone Yaiza?", o: ["Un rincón digital con normas", "Prohibir el móvil en todo el colegio", "Usar el móvil todo el recreo"], c: 0, nivel: "literal", par: 2, fb: "Propone un rincón digital: diez minutos y con permiso." },
      { p: "¿Qué dato usa Daniel para apoyar su opinión?", o: ["Una encuesta de su clase (18 de 25)", "La opinión de la directora", "Un estudio de otro país"], c: 0, nivel: "literal", par: 1, fb: "Usa la encuesta de su clase." },
      { p: "¿En qué están de acuerdo Daniel y Yaiza?", o: ["En que el móvil no debe usarse sin límites en el recreo", "En que hay que prohibir el móvil del todo", "En que el recreo es para estudiar"], c: 0, nivel: "inferencial", par: 2, fb: "Daniel quiere quitarlo y Yaiza quiere ponerle normas: ninguno defiende usarlo sin límites." },
      { p: "¿Qué significa que la asamblea «votará la próxima semana»?", o: ["Que todavía no se ha tomado la decisión", "Que ya se ha prohibido el móvil", "Que Yaiza ha ganado el debate"], c: 0, nivel: "inferencial", par: 3, fb: "Si aún hay que votar, la decisión no está tomada." },
      { p: "¿Cuál de estas frases es un HECHO y no una opinión?", o: ["«18 de 25 compañeros dijeron que juegan más sin pantallas»", "«Yo creo que el recreo es para jugar»", "«No estoy de acuerdo con prohibirlo del todo»"], c: 0, nivel: "critica", crit: "4.2", fb: "El resultado de una encuesta se puede comprobar; las otras dos frases expresan lo que piensa cada uno." },
      { p: "¿Por qué el periódico publica las dos opiniones?", o: ["Para que el lector conozca los dos puntos de vista y piense el suyo", "Para demostrar que Daniel tiene razón", "Para llenar la página"], c: 0, nivel: "critica", crit: "4.2", fb: "Mostrar varias opiniones ayuda a formarse una propia." }
    ] }
  });
})();
