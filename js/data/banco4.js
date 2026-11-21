/* Puerto Palabra · Cuarto banco de contenidos.
   - autopista: 14-15 frases más por curso (Autopista del Borrón, criterio de su misión).
   - clasificador: 14 palabras más por curso (Cinta clasificadora).
   - biblioteca: 3 libros nuevos y 5 lectores nuevos por curso (Club de lectura).
   - rimas: 4 versos más por curso y PP.POETAS, personajes que presentan «Rimas perdidas».
   Todos los textos y personajes son originales. */
window.PP = window.PP || {};
(function () {
  const { A, R, it, L, F, retrato } = PP.BancoUtil;
  const B4 = {};

  /** Poetas de «Rimas perdidas»: cada partida sale uno (además de la poeta del curso) */
  PP.POETAS = [
    { nombre: "Don Rimón, el pirata rimador", saludo: "¡Arrr! Soy Don Rimón y rimo hasta con el timón. Ayúdame a terminar mis versos, grumete.",
      bien: ["¡Arrr, eso rima de maravilla!", "¡Al abordaje, que rima!", "¡Por mil sardinas, qué oído tienes!"], mal: "¡Por mil sardinas! Eso no suena igual al final, grumete.",
      r: { nombre: "Don Rimón", piel: "media", pelo: "#3b2416", peinado: "rizado", ropa: "#1d3557", fondo: "#a8dadc", sombrero: "panama", colorSombrero: "#14213d", edad: "mayor" } },
    { nombre: "Tía Chacha, la del timple", saludo: "¡Ay, mi niño! Las rimas suenan como mi timple: tin, tin, tin. ¡A ver si las afinamos!",
      bien: ["¡Tin, tin! ¡Afinadísimo!", "¡Eso suena mejor que una isa!", "¡Ay, qué rima más bonita, mi niño!"], mal: "Uy, esa nota desafina. Escucha cómo termina el primer verso.",
      r: { nombre: "Tía Chacha", piel: "morena", pelo: "#ddd", peinado: "mono", ropa: "#e63946", fondo: "#ffd6a5", pendientes: true, edad: "mayor" } },
    { nombre: "Profesor Patapalabra", saludo: "¡Eureka! He inventado la máquina de rimar, pero le faltan piezas. ¿Me ayudas a encontrarlas?",
      bien: ["¡Eureka! Rima detectada.", "¡Experimento superado!", "¡Mi máquina echa chispas de alegría!"], mal: "¡Error en la máquina! Esa palabra no comparte el sonido final.",
      r: { nombre: "Profesor Patapalabra", piel: "clara", pelo: "#bbb", peinado: "calvo", ropa: "#f1faee", fondo: "#caf0f8", gafas: true, edad: "mayor" } },
    { nombre: "DJ Verso", saludo: "¡Hey! Soy DJ Verso. Mis canciones necesitan palabras que suenen igual al final. ¡Dale ritmo!",
      bien: ["¡Eso tiene ritmo!", "¡Sube el volumen, que rima!", "¡Temazo!"], mal: "Mmm, se cae el ritmo. Repite el primer verso en voz alta.",
      r: { nombre: "DJ Verso", piel: "oscura", pelo: "#111", peinado: "corto", ropa: "#7209b7", fondo: "#f7d6ff", sombrero: "gorra", colorSombrero: "#ff9f1c" } },
    { nombre: "Abuela Cuentacuentos", saludo: "Siéntate, que te cuento: mis poemas se quedaron a medias cuando pasó El Borrón. ¿Los terminamos?",
      bien: ["¡Así, así, como en mis tiempos!", "¡Qué rima tan redonda!", "¡Eso me lo apunto en mi libreta!"], mal: "Casi, casi. Fíjate en las últimas letras del primer verso.",
      r: { nombre: "Abuela Cuentacuentos", piel: "media", pelo: "#eee", peinado: "largo", ropa: "#6a994e", fondo: "#e9f5db", gafas: true, edad: "mayor", pendientes: true } }
  ];

  // ================================= 1.º =================================
  B4[1] = {
    autopista: [
      A("___ sol calienta mucho.", "El", ["La"], "Decimos «el sol»."),
      A("___ playa está llena.", "La", ["El"], "Decimos «la playa»."),
      A("Tengo tres ___.", "gatos", ["gato"], "Si son tres, decimos «gatos»."),
      A("Veo una ___.", "estrella", ["estrellas"], "«Una» va con una sola: estrella."),
      A("Los niños ___ al fútbol.", "juegan", ["juega"], "Ellos juegan."),
      A("Mi perro ___ mucho.", "ladra", ["ladran"], "Un perro ladra."),
      A("Mi ___ se llama Pancho.", "perro", ["pero"], "«Perro» se escribe con rr."),
      A("Ayer ___ al parque.", "fui", ["iré"], "«Ayer» ya pasó: fui."),
      A("Mañana ___ a la playa.", "iré", ["fui"], "«Mañana» todavía no ha pasado: iré."),
      A("Mi casa es muy ___.", "bonita", ["bonito"], "Decimos «la casa bonita»."),
      A("Las ___ son rojas.", "fresas", ["fresa"], "«Las» va con varias: fresas."),
      A("___ se llama Lucía.", "Mi hermana", ["mi hermana"], "Al empezar a escribir se pone mayúscula."),
      A("El pez ___ en el agua.", "nada", ["nadan"], "Un pez nada."),
      A("Me lavo los dientes con el ___.", "cepillo", ["peine"], "Los dientes se lavan con el cepillo.")
    ],
    clasificador: [
      it("El perro corre por la playa.", "perro", "sustantivo", "«perro» nombra un animal."),
      it("El perro corre por la playa.", "corre", "verbo", "«corre» dice lo que hace el perro."),
      it("Tengo una pelota roja.", "roja", "adjetivo", "«roja» dice cómo es la pelota."),
      it("Tengo una pelota roja.", "pelota", "sustantivo", "«pelota» nombra una cosa."),
      it("Mi abuela canta en la cocina.", "canta", "verbo", "«canta» dice lo que hace la abuela."),
      it("Mi abuela canta en la cocina.", "cocina", "sustantivo", "«cocina» nombra un lugar."),
      it("El gato gordo duerme.", "gordo", "adjetivo", "«gordo» dice cómo es el gato."),
      it("El gato gordo duerme.", "duerme", "verbo", "«duerme» dice lo que hace el gato."),
      it("La flor es amarilla.", "amarilla", "adjetivo", "«amarilla» dice cómo es la flor."),
      it("Los niños saltan en el patio.", "saltan", "verbo", "«saltan» dice lo que hacen los niños."),
      it("Los niños saltan en el patio.", "patio", "sustantivo", "«patio» nombra un lugar."),
      it("El agua está fría.", "fría", "adjetivo", "«fría» dice cómo está el agua."),
      it("Ana come una manzana.", "Ana", "sustantivo", "«Ana» es el nombre de una persona."),
      it("El coche grande pita.", "grande", "adjetivo", "«grande» dice cómo es el coche.")
    ],
    libros: [
      L("Viaje a la Luna", "Carlos Medina", "Libro para aprender", "Cohetes, astronautas y planetas: descubre cómo se viaja al espacio.", "#1d3557"),
      L("Las recetas de Tita", "Pino Suárez", "Libro de cocina", "Recetas fáciles para cocinar con mayores: bocadillos, batidos y galletas.", "#e76f51"),
      L("¿Qué quieres ser de mayor?", "Ana Díaz", "Libro para aprender", "Bomberas, médicos, panaderos y pilotos te cuentan cómo es su trabajo.", "#d62828")
    ],
    perfiles: [
      F("Lucas", "Quiero saber cómo viajan los astronautas.", ["Viaje a la Luna"], retrato("clara", "#d9b26f", "corto", "#1d3557", "#d0e1ff", "nino"), "El libro habla de cohetes y astronautas."),
      F("Mamá de Iballa", "Quiero cocinar galletas con mi hija.", ["Las recetas de Tita"], retrato("media", "#3b2416", "largo", "#e76f51", "#ffe3d6"), "Es un libro de recetas fáciles para cocinar con mayores."),
      F("Daniel", "De mayor quiero ser bombero. ¿Hay algún libro de trabajos?", ["¿Qué quieres ser de mayor?"], retrato("morena", "#1c1c1c", "rizado", "#d62828", "#ffd6d6", "nino"), "El libro explica distintos trabajos, también el de bombero."),
      F("Maestra Rosa", "Busco poemas cortos para jugar con las palabras en clase.", ["Poemas para jugar"], retrato("clara", "#8a4b2a", "mono", "#7048e8", "#e5dbff"), "Es un libro de poesía para jugar."),
      F("Ainhoa", "Me gustan los planetas y las estrellas.", ["Viaje a la Luna"], retrato("oscura", "#111", "coleta", "#3a86ff", "#dbe9ff", "nino"), "El libro habla del espacio y los planetas.")
    ],
    rimas: [
      R("Mi gatito se llama Bigote", "y duerme dentro de un ___", "bote", ["caja", "cesta"], "Bigote… bote: ¡riman!"),
      R("El ratón come queso", "y me manda un ___", "beso", ["saludo", "abrazo"], "Queso… beso: ¡riman!"),
      R("La rana salta en el charco", "y se sube a un ___", "barco", ["árbol", "coche"], "Charco… barco: ¡riman!"),
      R("Mi abuela hace un pastel", "con azúcar y con ___", "miel", ["leche", "harina"], "Pastel… miel: ¡riman!")
    ]
  };

  // ================================= 2.º =================================
  B4[2] = {
    autopista: [
      A("Las ___ vuelan alto.", "gaviotas", ["gaviota"], "«Las» va con varias: gaviotas."),
      A("Ayer mi abuelo me ___ un cuento.", "contó", ["contará"], "«Ayer» pide pasado: contó."),
      A("Mañana ___ al cine.", "iremos", ["fuimos"], "«Mañana» pide futuro: iremos."),
      A("El niño ___ muy contento.", "estaba", ["estaban"], "Un niño: estaba."),
      A("Vivo en ___.", "Tenerife", ["tenerife"], "Los nombres de islas llevan mayúscula."),
      A("El contrario de «alto» es ___.", "bajo", ["grande", "largo"], "Alto es lo contrario de bajo."),
      A("Para comer sopa uso una ___.", "cuchara", ["cuchillo", "tijera"], "La sopa se come con cuchara."),
      A("La ___ de mi casa es azul.", "puerta", ["puerto"], "Hablamos de la puerta de la casa."),
      A("Hoy ___ mucho viento.", "hace", ["ace"], "«Hace» se escribe con h."),
      A("Mi amiga y yo ___ a las cartas.", "jugamos", ["juego", "juegan"], "Mi amiga y yo somos nosotras: jugamos."),
      A("El ___ de mi madre se llama Luis.", "hermano", ["ermano"], "«Hermano» se escribe con h."),
      A("Esta guitarra es ___.", "nueva", ["nuevo"], "Decimos «la guitarra nueva»."),
      A("Una palabra que rima con «ratón» es ___.", "balcón", ["mesa", "gato"], "Ratón… balcón: ¡riman!"),
      A("Hay que ___ el papel en el contenedor azul.", "reciclar", ["resiclar"], "«Reciclar» se escribe con c.")
    ],
    clasificador: [
      it("La gaviota vuela sobre el mar.", "gaviota", "sustantivo", "«gaviota» nombra un animal."),
      it("La gaviota vuela sobre el mar.", "vuela", "verbo", "«vuela» dice lo que hace la gaviota."),
      it("Mi tío tiene un barco blanco.", "blanco", "adjetivo", "«blanco» dice cómo es el barco."),
      it("Mi tío tiene un barco blanco.", "tiene", "verbo", "«tiene» es lo que hace el tío."),
      it("Los plátanos maduros son dulces.", "maduros", "adjetivo", "«maduros» dice cómo son los plátanos."),
      it("Los plátanos maduros son dulces.", "dulces", "adjetivo", "«dulces» dice cómo son los plátanos."),
      it("Los plátanos maduros son dulces.", "plátanos", "sustantivo", "«plátanos» nombra una fruta."),
      it("Ayer pintamos un mural enorme.", "pintamos", "verbo", "«pintamos» dice lo que hicimos."),
      it("Ayer pintamos un mural enorme.", "enorme", "adjetivo", "«enorme» dice cómo es el mural."),
      it("Ayer pintamos un mural enorme.", "mural", "sustantivo", "«mural» nombra una cosa."),
      it("El canto de los pájaros me despierta.", "canto", "sustantivo", "Aquí «canto» nombra algo: es sustantivo.", true),
      it("Yo canto en el coro del colegio.", "canto", "verbo", "Aquí «canto» es lo que hago yo: es verbo.", true),
      it("La guagua llega tarde.", "llega", "verbo", "«llega» dice lo que hace la guagua."),
      it("Mi amiga Dácil es muy simpática.", "simpática", "adjetivo", "«simpática» dice cómo es Dácil.")
    ],
    libros: [
      L("El gran libro de los dinosaurios", "Óscar León", "Libro para aprender", "Cómo eran, qué comían y cómo desaparecieron los dinosaurios, con dibujos enormes.", "#5c940d"),
      L("Lola, la vaca futbolista", "Marta Peña", "Cuento de deportes", "Una vaca sueña con jugar en el equipo de fútbol del pueblo y entrena cada día hasta conseguirlo.", "#f08c00"),
      L("Manualidades con papel", "Irene Sosa", "Libro de manualidades", "Aprende a hacer barcos, aviones, máscaras y cometas de papel paso a paso.", "#1098ad")
    ],
    perfiles: [
      F("Ayoze", "Quiero saber qué comían los dinosaurios.", ["El gran libro de los dinosaurios"], retrato("media", "#2b1d14", "corto", "#5c940d", "#e9fac8", "nino"), "El libro explica cómo eran y qué comían."),
      F("Nerea", "Me encanta el fútbol. ¿Hay algún cuento sobre eso?", ["Lola, la vaca futbolista"], retrato("clara", "#c0712f", "coleta", "#f08c00", "#fff4e6", "nino"), "Es un cuento sobre una vaca que juega al fútbol."),
      F("Abuelo Pepe", "Quiero hacer barcos de papel con mi nieto.", ["Manualidades con papel"], retrato("morena", "#ddd", "calvo", "#1098ad", "#d0f0f5", "mayor"), "El libro enseña a hacer barcos de papel paso a paso."),
      F("Iván", "Quiero un cuento cortito para leer en la cama.", ["Cuentos para soñar"], retrato("oscura", "#111", "rizado", "#7048e8", "#e5dbff", "nino"), "Son cuentos cortos para soñar."),
      F("Saray", "Me gustan los animales valientes que viven aventuras.", ["Pip, el perenquén aventurero"], retrato("media", "#3b2416", "largo", "#2f9e44", "#d3f9d8", "nino"), "Pip es un perenquén que vive aventuras.")
    ],
    rimas: [
      R("El caracol va despacito", "y se esconde muy ___", "quietito", ["rápido", "contento"], "Despacito… quietito: ¡riman!"),
      R("Un pulpo con ocho brazos", "reparte muchos ___", "abrazos", ["besos", "regalos"], "Brazos… abrazos: ¡riman!"),
      R("La jirafa es tan alta", "que por encima de todos ___", "salta", ["corre", "mira"], "Alta… salta: ¡riman!"),
      R("Hice una cometa de papel", "y la pinté de color ___", "miel", ["rojo", "azul"], "Papel… miel: ¡riman!")
    ]
  };

  // ================================= 3.º =================================
  B4[3] = {
    autopista: [
      A("Mis primos ___ en Lanzarote.", "viven", ["vive", "vivimos"], "Mis primos son ellos: viven."),
      A("Ayer ___ una tormenta muy fuerte.", "hubo", ["ubo", "hubieron"], "«Hubo» se escribe con h y va en singular."),
      A("«Camión» lleva tilde porque es ___.", "aguda acabada en n", ["esdrújula", "llana"], "Ca-MIÓN: aguda acabada en n."),
      A("El plural de «pez» es ___.", "peces", ["pezes", "pezs"], "La z cambia a c delante de e: peces."),
      A("El plural de «lápiz» es ___.", "lápices", ["lápizes", "lápiz"], "Lápiz → lápices."),
      A("Un sinónimo de «contento» es ___.", "alegre", ["triste", "enfadado"], "Contento y alegre significan lo mismo."),
      A("El antónimo de «subir» es ___.", "bajar", ["salir", "correr"], "Subir es lo contrario de bajar."),
      A("Nosotras ___ un mural en el colegio.", "pintamos", ["pintan", "pinto"], "Nosotras: pintamos."),
      A("Me he comprado una ___ para la lluvia.", "chaqueta", ["chaketa", "chaquetta"], "Se escribe con qu: cha-que-ta."),
      A("El perro ___ su hueso en el jardín.", "escondió", ["escondieron", "escondí"], "Un perro: escondió."),
      A("Los ___ trabajan en el huerto.", "agricultores", ["agricultor"], "«Los» pide plural."),
      A("Es mejor ___ agua todos los días.", "beber", ["vever"], "«Beber» se escribe con b."),
      A("La palabra «girasol» se forma con ___.", "gira y sol", ["gira y solar", "gis y sol"], "Gira + sol: es una palabra compuesta."),
      A("___ es tu color favorito?", "¿Cuál", ["Cuál", "¿Cual"], "Las preguntas empiezan con ¿ y «cuál» lleva tilde."),
      A("Las hojas del árbol se ___ en otoño.", "caen", ["cae", "caemos"], "Las hojas: caen.")
    ],
    clasificador: [
      it("Estos zapatos son nuevos.", "Estos", "determinante", "«Estos» acompaña al sustantivo «zapatos»."),
      it("Estos zapatos son nuevos.", "nuevos", "adjetivo", "«nuevos» dice cómo son los zapatos."),
      it("Un lagarto tomaba el sol en la roca.", "Un", "determinante", "«Un» acompaña a «lagarto»."),
      it("Un lagarto tomaba el sol en la roca.", "tomaba", "verbo", "«tomaba» es la acción del lagarto."),
      it("Un lagarto tomaba el sol en la roca.", "roca", "sustantivo", "«roca» nombra una cosa."),
      it("Mi bicicleta tiene el sillín roto.", "Mi", "determinante", "«Mi» acompaña a «bicicleta» y dice de quién es."),
      it("Mi bicicleta tiene el sillín roto.", "roto", "adjetivo", "«roto» dice cómo está el sillín."),
      it("Tres cometas volaban en la playa.", "Tres", "determinante", "«Tres» es un numeral que acompaña a «cometas»."),
      it("Tres cometas volaban en la playa.", "volaban", "verbo", "«volaban» es la acción de las cometas."),
      it("El baile de la fiesta fue divertido.", "baile", "sustantivo", "Aquí «baile» nombra algo: sustantivo."),
      it("Yo bailo isa en la fiesta.", "bailo", "verbo", "«bailo» es lo que hago yo."),
      it("Aquella montaña parece un gigante dormido.", "Aquella", "determinante", "«Aquella» acompaña a «montaña»."),
      it("Aquella montaña parece un gigante dormido.", "dormido", "adjetivo", "«dormido» dice cómo es el gigante."),
      it("La maestra explica la lección.", "explica", "verbo", "«explica» es lo que hace la maestra.")
    ],
    libros: [
      L("El gran libro del cuerpo humano", "Elena Castro", "Libro informativo", "Huesos, músculos y corazón: descubre cómo funciona tu cuerpo por dentro.", "#c2255c"),
      L("Los Supertildes", "Javi Peña", "Cómic", "Tres amigos con superpoderes salvan las palabras de la ciudad en viñetas llenas de acción.", "#f08c00"),
      L("Manual del pequeño jardinero", "Carmen Rivero", "Libro informativo", "Cómo plantar, regar y cuidar un huerto en casa o en el colegio.", "#2b8a3e")
    ],
    perfiles: [
      F("Rayco", "Para el proyecto de Ciencias necesito saber cómo funciona el corazón.", ["El gran libro del cuerpo humano"], retrato("morena", "#1c1c1c", "corto", "#c2255c", "#ffdeeb", "nino"), "El libro explica cómo funciona el cuerpo por dentro."),
      F("Iris", "Me cansan los textos largos. Me gustan las historias con viñetas y bocadillos.", ["Los Supertildes"], retrato("clara", "#d9b26f", "coleta", "#f08c00", "#fff4e6", "nino"), "Un cómic cuenta la historia en viñetas."),
      F("Abuela Chona", "Quiero plantar tomates con mis nietos en el patio.", ["Manual del pequeño jardinero"], retrato("media", "#ddd", "mono", "#2b8a3e", "#d3f9d8", "mayor"), "El libro enseña a plantar y cuidar un huerto."),
      F("Pablo", "Quiero reírme con una historia divertida de animales.", ["Diario de una baifa"], retrato("oscura", "#111", "rizado", "#1971c2", "#d0ebff", "nino"), "Es un libro de humor protagonizado por una baifa."),
      F("Tania", "Me encanta la poesía.", ["Versos de sal"], retrato("media", "#3b2416", "largo", "#7048e8", "#e5dbff", "nino"), "Es un libro de poesía.")
    ],
    rimas: [
      R("En la cumbre hay un pinar", "donde el viento va a ___", "cantar", ["dormir", "llover"], "Pinar… cantar: ¡riman!"),
      R("Las olas llegan a la orilla", "y mojan mi ___", "sombrilla", ["toalla", "mochila"], "Orilla… sombrilla: ¡riman!"),
      R("El lagarto toma el sol", "sobre un viejo ___", "farol", ["muro", "coche"], "Sol… farol: ¡riman!"),
      R("Mi hermano toca el tambor", "con muchísimo ___", "humor", ["ruido", "ritmo"], "Tambor… humor: ¡riman!")
    ]
  };

  // ================================= 4.º =================================
  B4[4] = {
    autopista: [
      A("«Lápiz» lleva tilde porque es ___.", "llana acabada en z", ["aguda", "esdrújula"], "LÁ-piz: llana que no acaba en n, s ni vocal."),
      A("«Sofá» lleva tilde porque es ___.", "aguda acabada en vocal", ["llana", "esdrújula"], "So-FÁ: aguda acabada en vocal."),
      A("«Murciélago» es una palabra ___.", "esdrújula", ["llana", "aguda"], "Mur-CIÉ-la-go: esdrújula."),
      A("Ayer ___ muchas personas en la playa.", "había", ["habían", "abía"], "«Haber» con este sentido va en singular: había."),
      A("Mañana ___ al Museo de la Naturaleza.", "iremos", ["fuimos", "íbamos"], "«Mañana» pide futuro."),
      A("Ellas ___ la canción con el timple.", "cantaron", ["cantó", "canté"], "Ellas: cantaron."),
      A("¿___ vienes a la fiesta?", "Cuándo", ["Cuando", "cuándo"], "Al empezar la pregunta: mayúscula y tilde."),
      A("El ___ de los Dragos es muy antiguo.", "parque", ["parke", "parqe"], "Se escribe con qu."),
      A("Un sinónimo de «rápido» es ___.", "veloz", ["lento", "fuerte"], "Rápido y veloz significan lo mismo."),
      A("El antónimo de «ordenado» es ___.", "desordenado", ["inordenado", "antiordenado"], "Se forma con el prefijo des-."),
      A("La palabra «panadería» es ___.", "derivada", ["compuesta", "simple"], "Se forma añadiendo un sufijo a «pan»: es derivada."),
      A("Los alumnos ___ atentos a la explicación.", "estaban", ["estaba", "estábamos"], "Los alumnos: estaban."),
      A("«Árbol», «cárcel» y «fácil» son palabras ___.", "llanas", ["agudas", "esdrújulas"], "Las tres tienen la fuerza en la penúltima sílaba."),
      A("___ un libro encima de la mesa.", "Hay", ["Ay", "Ahí"], "«Hay» es del verbo haber.")
    ],
    clasificador: [
      it("Algunas tortugas nadan cerca de la costa.", "Algunas", "determinante", "«Algunas» acompaña a «tortugas»."),
      it("Algunas tortugas nadan cerca de la costa.", "nadan", "verbo", "«nadan» es la acción de las tortugas."),
      it("Algunas tortugas nadan cerca de la costa.", "costa", "sustantivo", "«costa» nombra un lugar."),
      it("Vuestro equipo jugó un partido magnífico.", "Vuestro", "determinante", "«Vuestro» es un posesivo que acompaña a «equipo»."),
      it("Vuestro equipo jugó un partido magnífico.", "magnífico", "adjetivo", "«magnífico» dice cómo fue el partido."),
      it("Vuestro equipo jugó un partido magnífico.", "jugó", "verbo", "«jugó» es la acción del equipo."),
      it("Bastantes turistas visitan el Roque Nublo.", "Bastantes", "determinante", "«Bastantes» acompaña a «turistas»."),
      it("Bastantes turistas visitan el Roque Nublo.", "visitan", "verbo", "«visitan» es la acción de los turistas."),
      it("El vuelo a Lanzarote salió puntual.", "vuelo", "sustantivo", "Aquí «vuelo» nombra un viaje en avión: sustantivo.", true),
      it("Yo vuelo mi cometa en la playa.", "vuelo", "verbo", "Aquí «vuelo» es lo que hago yo: verbo.", true),
      it("El vuelo a Lanzarote salió puntual.", "puntual", "adjetivo", "«puntual» dice cómo salió el vuelo."),
      it("Aquel volcán estuvo activo hace siglos.", "Aquel", "determinante", "«Aquel» acompaña a «volcán»."),
      it("Aquel volcán estuvo activo hace siglos.", "activo", "adjetivo", "«activo» dice cómo estuvo el volcán."),
      it("La brisa trae olor a sal.", "brisa", "sustantivo", "«brisa» nombra algo.")
    ],
    libros: [
      L("Ajedrez para todos", "María Ojeda", "Libro de juegos", "Las reglas del ajedrez, las primeras jugadas y trucos para ganar tus primeras partidas.", "#343a40"),
      L("Cocina canaria fácil", "Pino Déniz", "Libro de cocina", "Papas arrugadas, mojo, potaje y bienmesabe explicados paso a paso.", "#e8590c"),
      L("La historia de los guanches", "Tomás Bethencourt", "Libro informativo (historia)", "Cómo vivían los antiguos habitantes de Canarias: sus casas, su comida y sus costumbres.", "#7950f2")
    ],
    perfiles: [
      F("Abuelo Tinguaro", "Quiero aprender a jugar al ajedrez con mi nieto.", ["Ajedrez para todos"], retrato("morena", "#ccc", "calvo", "#343a40", "#e9ecef", "mayor"), "El libro explica las reglas y las primeras jugadas."),
      F("Sonia", "Para el Día de Canarias quiero preparar un plato típico.", ["Cocina canaria fácil"], retrato("media", "#3b2416", "largo", "#e8590c", "#fff0e6"), "Es un libro de recetas canarias."),
      F("Bentor", "Tengo que hacer un trabajo sobre los primeros habitantes de las islas.", ["La historia de los guanches"], retrato("oscura", "#111", "corto", "#7950f2", "#e5dbff", "nino"), "El libro cuenta cómo vivían los guanches."),
      F("Elena", "Me gustan los poemas que hablan del mar y de las islas.", ["Poemas de mar y volcán"], retrato("clara", "#c0712f", "coleta", "#1c7ed6", "#d0ebff", "nino"), "Es un libro de poemas sobre el mar y el volcán."),
      F("Óscar", "Quiero una novela sobre la vida de un chico de mi edad, con sus problemas de verdad.", ["El diario de Saúl"], retrato("media", "#4a3020", "rizado", "#2f9e44", "#d3f9d8", "nino"), "Es una novela realista contada por un chico.")
    ],
    rimas: [
      R("La guagua sale a las tres", "y llega al centro ___", "después", ["tarde", "pronto"], "Tres… después: ¡riman!"),
      R("El viejo faro del puerto", "vigila el mar ___", "despierto", ["dormido", "tranquilo"], "Puerto… despierto: ¡riman!"),
      R("Entre plátanos y palmeras", "pasan las ___", "primaveras", ["semanas", "tardes"], "Palmeras… primaveras: ¡riman!"),
      R("Un pescador muy contento", "sacó un pez de ___", "cuento", ["mar", "oro"], "Contento… cuento: ¡riman!")
    ]
  };

  // ================================= 5.º =================================
  B4[5] = {
    autopista: [
      A("No sé ___ llegó tan tarde.", "por qué", ["porque", "porqué"], "Pregunta indirecta: «por qué», separado y con tilde."),
      A("Llegó tarde ___ perdió la guagua.", "porque", ["por qué", "porqué"], "Explica la causa: «porque», junto y sin tilde."),
      A("Ya he ___ los deberes.", "hecho", ["echo", "hechado"], "«Hecho» es del verbo hacer."),
      A("Siempre ___ un poco de sal a la ensalada.", "echo", ["hecho"], "«Echo» es del verbo echar."),
      A("Este regalo es para ___.", "ti", ["tí", "tu"], "«Ti» nunca lleva tilde."),
      A("___ hermano juega al baloncesto.", "Tu", ["Tú"], "«Tu» sin tilde acompaña a un nombre."),
      A("¿___ vas a venir?", "Cómo", ["Como"], "En las preguntas, «cómo» lleva tilde."),
      A("Las montañas ___ cubiertas de nieve el invierno pasado.", "estuvieron", ["estuvo", "estarán"], "Las montañas, en pasado: estuvieron."),
      A("Si ___ tiempo, iríamos a la playa.", "tuviéramos", ["tendremos", "tenemos"], "Condición que no se cumple: si tuviéramos…, iríamos."),
      A("El texto que explica cómo hacer una receta es ___.", "instructivo", ["narrativo", "poético"], "Da instrucciones: texto instructivo."),
      A("«Mesa», «cama» y «flor» son sustantivos ___.", "comunes", ["propios", "abstractos"], "Nombran cosas en general: comunes."),
      A("En «La niña corre», el sujeto es ___.", "la niña", ["corre", "la"], "Quien realiza la acción: la niña."),
      A("Un sinónimo de «enorme» es ___.", "gigantesco", ["diminuto", "pequeño"], "Enorme y gigantesco significan lo mismo."),
      A("En «Mis amigas bailan isa», el verbo está en ___.", "presente", ["pasado", "futuro"], "«Bailan» ocurre ahora: presente.")
    ],
    clasificador: [
      it("Nosotros llegamos temprano al concierto.", "Nosotros", "pronombre", "«Nosotros» sustituye a los nombres de quienes hablan."),
      it("Nosotros llegamos temprano al concierto.", "temprano", "adverbio", "«temprano» indica cuándo llegamos."),
      it("Nosotros llegamos temprano al concierto.", "llegamos", "verbo", "«llegamos» es la acción."),
      it("Le regalé un libro a mi hermana.", "Le", "pronombre", "«Le» se refiere a «mi hermana»."),
      it("Le regalé un libro a mi hermana.", "regalé", "verbo", "«regalé» es la acción."),
      it("El barco navegaba lentamente.", "lentamente", "adverbio", "«lentamente» indica cómo navegaba."),
      it("Cerca del muelle hay un faro.", "Cerca", "adverbio", "«Cerca» indica dónde."),
      it("Esta noche veremos las estrellas.", "Esta", "determinante", "«Esta» acompaña a «noche»."),
      it("Ese dibujo es tuyo y este es de Iván.", "este", "pronombre", "Aquí «este» no acompaña a un sustantivo: lo sustituye (este dibujo).", true),
      it("Este dibujo es precioso.", "Este", "determinante", "Aquí «Este» acompaña a «dibujo»: es determinante.", true),
      it("Alguien llamó a la puerta.", "Alguien", "pronombre", "«Alguien» se refiere a una persona sin decir quién."),
      it("Mañana iremos al Jardín Botánico.", "Mañana", "adverbio", "Aquí «Mañana» indica cuándo: es adverbio.", true),
      it("La mañana era soleada.", "mañana", "sustantivo", "Aquí «mañana» nombra una parte del día: sustantivo.", true),
      it("La mañana era soleada.", "soleada", "adjetivo", "«soleada» dice cómo era la mañana.")
    ],
    libros: [
      L("Atlas de los océanos", "Nayra Betancor", "Libro informativo", "Corrientes, mareas, arrecifes y especies del Atlántico explicados con mapas y fotografías.", "#1864ab"),
      L("Agustín de Betancourt, el ingeniero", "Luis Perera", "Biografía", "La vida del ingeniero nacido en Tenerife que diseñó puentes, canales y máquinas hace más de doscientos años.", "#5f3dc4"),
      L("Ajedrez para principiantes", "María Ojeda", "Libro de juegos", "Las reglas del ajedrez, las primeras jugadas y trucos para ganar tus primeras partidas.", "#343a40")
    ],
    perfiles: [
      F("Echedey", "Tengo que hacer un trabajo sobre las corrientes marinas del Atlántico.", ["Atlas de los océanos"], retrato("morena", "#1c1c1c", "corto", "#1864ab", "#d0ebff", "nino"), "El atlas explica las corrientes con mapas."),
      F("Ruth", "Quiero conocer la vida de un inventor o ingeniero canario.", ["Agustín de Betancourt, el ingeniero"], retrato("clara", "#8a4b2a", "largo", "#5f3dc4", "#e5dbff", "nino"), "Una biografía cuenta la vida de una persona real."),
      F("Abuelo Tinguaro", "Quiero aprender a jugar al ajedrez con mi nieto.", ["Ajedrez para principiantes"], retrato("morena", "#ccc", "calvo", "#343a40", "#e9ecef", "mayor"), "El libro explica las reglas y las primeras jugadas."),
      F("Lara", "Busco una novela sobre la amistad que me emocione.", ["El perro que hablaba con las estrellas"], retrato("media", "#3b2416", "coleta", "#e64980", "#ffdeeb", "nino"), "Es una novela de amistad."),
      F("Miguel", "Me encantan las historias de naves espaciales y del futuro.", ["El club de los cohetes", "Planeta Cero"], retrato("oscura", "#111", "rizado", "#0b7285", "#c5f6fa", "nino"), "Los dos libros de ciencia ficción encajan con lo que busca.")
    ],
    rimas: [
      R("Sobre el mar de nubes blanco", "me siento en un ___", "banco", ["sillón", "barco"], "Blanco… banco: ¡riman!"),
      R("La palabra es una llave", "y el poema, una ___", "nave", ["puerta", "caja"], "Llave… nave: ¡riman!"),
      R("Escribo con mi lapicero", "un poema ___", "verdadero", ["bonito", "largo"], "Lapicero… verdadero: ¡riman!"),
      R("El silbo cruza el barranco", "como un pájaro ___", "blanco", ["negro", "rápido"], "Barranco… blanco: ¡riman!")
    ]
  };

  // ================================= 6.º =================================
  B4[6] = {
    autopista: [
      A("Ayer ___ muchas quejas en la asamblea.", "hubo", ["hubieron", "habían"], "«Haber» impersonal va en singular: hubo."),
      A("No vino a clase, ___ que se quedó en casa.", "sino", ["si no"], "«Sino» indica oposición: no esto, sino aquello."),
      A("___ estudias, no aprobarás.", "Si no", ["Sino"], "«Si no» equivale a «en caso de que no»."),
      A("¿___ vais de excursión?", "Adónde", ["A donde", "Adonde"], "Pregunta de dirección: «adónde», con tilde."),
      A("Quiero saber ___ es tu opinión.", "cuál", ["cual"], "En la pregunta indirecta, «cuál» lleva tilde."),
      A("___ llueva, iremos al teatro.", "Aunque", ["A un que", "Aun que"], "«Aunque» se escribe junto."),
      A("Un texto que explica cómo se forman los volcanes es ___.", "expositivo", ["narrativo", "argumentativo"], "Explica un fenómeno: texto expositivo."),
      A("En «El jurado premió a la escritora», el complemento directo es ___.", "a la escritora", ["el jurado", "premió"], "Lo premiado es «a la escritora»."),
      A("La palabra «sordomudo» es ___.", "compuesta", ["derivada", "simple"], "Sordo + mudo: palabra compuesta."),
      A("«Inmóvil» se forma con el prefijo ___.", "in-", ["des-", "anti-"], "In- + móvil: que no se mueve."),
      A("Cuando ___ el examen, avísame.", "acabes", ["acabarás", "acabas"], "Tras «cuando» con valor de futuro va el subjuntivo: acabes."),
      A("Los turistas ___ encantados con el paisaje.", "quedaron", ["quedó", "quedamos"], "Los turistas: quedaron."),
      A("«Aún» lleva tilde cuando significa ___.", "todavía", ["incluso", "también"], "«Aún» = todavía; «aun» = incluso."),
      A("En «Tus ojos son dos luceros», los ojos se comparan con ___.", "estrellas", ["faros de coche", "ojos de gato"], "Un lucero es una estrella brillante: es una metáfora.")
    ],
    clasificador: [
      it("Nos explicaron el experimento detalladamente.", "Nos", "pronombre", "«Nos» se refiere a las personas que hablan."),
      it("Nos explicaron el experimento detalladamente.", "detalladamente", "adverbio", "«detalladamente» indica cómo lo explicaron."),
      it("Nos explicaron el experimento detalladamente.", "experimento", "sustantivo", "«experimento» nombra algo."),
      it("Cualquier persona puede participar en el debate.", "Cualquier", "determinante", "«Cualquier» acompaña a «persona»."),
      it("Ninguno de los finalistas se rindió.", "Ninguno", "pronombre", "«Ninguno» sustituye a un sustantivo (ningún finalista)."),
      it("Quizá llueva esta tarde en el norte.", "Quizá", "adverbio", "«Quizá» es un adverbio de duda."),
      it("La exposición resultó sorprendentemente breve.", "sorprendentemente", "adverbio", "«sorprendentemente» modifica al adjetivo «breve»."),
      it("La exposición resultó sorprendentemente breve.", "breve", "adjetivo", "«breve» dice cómo resultó la exposición."),
      it("Las olas golpeaban con fuerza el acantilado.", "golpeaban", "verbo", "«golpeaban» es la acción de las olas."),
      it("Las olas golpeaban con fuerza el acantilado.", "acantilado", "sustantivo", "«acantilado» nombra un lugar."),
      it("Mi primo toca el bajo en una banda.", "bajo", "sustantivo", "Aquí «bajo» nombra un instrumento: sustantivo.", true),
      it("Habla bajo para no despertar al bebé.", "bajo", "adverbio", "Aquí «bajo» indica cómo habla: adverbio.", true),
      it("El muro del patio es bajo.", "bajo", "adjetivo", "Aquí «bajo» dice cómo es el muro: adjetivo.", true),
      it("Os esperamos en la entrada del auditorio.", "Os", "pronombre", "«Os» se refiere a vosotros.")
    ],
    libros: [
      L("Historia del silbo gomero", "Fátima Morales", "Libro informativo (historia)", "Cómo nació el lenguaje silbado de La Gomera, cómo funciona y por qué es Patrimonio de la Humanidad.", "#2b8a3e"),
      L("Diario de una programadora", "Clara Sosa", "Novela realista", "Lucía, de once años, crea su primer videojuego mientras descubre quiénes son sus verdaderos amigos.", "#d6336c"),
      L("El misterio de la momia guanche", "Héctor Ramos", "Novela de misterio", "Durante una visita al museo desaparece una pieza valiosa y dos primos deciden investigar.", "#5c3d2e")
    ],
    perfiles: [
      F("Iballa", "Me interesa cómo se comunicaban silbando en La Gomera.", ["Historia del silbo gomero"], retrato("media", "#3b2416", "largo", "#2b8a3e", "#d3f9d8", "nino"), "El libro explica el silbo gomero."),
      F("Nico", "Me gusta programar y quiero una novela que hable de eso.", ["Diario de una programadora"], retrato("clara", "#d9b26f", "corto", "#d6336c", "#ffdeeb", "nino"), "La protagonista crea su propio videojuego."),
      F("Abuela Mercedes", "A mi nieta le encantan los misterios en museos. ¿Qué le regalo?", ["El misterio de la momia guanche"], retrato("morena", "#eee", "mono", "#5c3d2e", "#f1e3d3", "mayor"), "Es una novela de misterio en un museo."),
      F("Saúl", "Busco un libro de humor sobre la vida de un niño en su barrio.", ["Manolito Gafotas"], retrato("oscura", "#111", "rizado", "#f08c00", "#fff4e6", "nino"), "Manolito Gafotas es humor sobre un niño y su barrio."),
      F("Profe Marta", "Quiero un clásico en prosa poética para leer en voz alta.", ["Platero y yo"], retrato("clara", "#8a4b2a", "coleta", "#7048e8", "#e5dbff"), "Platero y yo es un clásico de prosa poética.")
    ],
    rimas: [
      R("La luna, faro del cielo,", "alumbra al mar con ___", "desvelo", ["calma", "luz"], "Cielo… desvelo: ¡riman!"),
      R("Las palabras que se callan", "en el silencio ___", "estallan", ["duermen", "viven"], "Callan… estallan: ¡riman!"),
      R("Mi verso es barco de vela", "y deja en el mar su ___", "estela", ["huella", "marca"], "Vela… estela: ¡riman!"),
      R("El drago milenario sueña", "con la tierra ___", "isleña", ["canaria", "lejana"], "Sueña… isleña: ¡riman!")
    ]
  };

  /** Mezcla el cuarto banco con el contenido de cada curso (sin duplicar). */
  function mezclar4() {
    const C = PP.CONTENIDO || {};
    const dedup = (dst, src, clave) => { const vistos = new Set(dst.map(clave)); src.forEach((x) => { const k = clave(x); if (!vistos.has(k)) { vistos.add(k); dst.push(x); } }); };
    Object.keys(B4).forEach((n) => {
      const b = B4[n], c = C[n]; if (!c) return;
      if (c.autopista) dedup(c.autopista, b.autopista || [], (x) => x.p);
      if (c.clasificador && c.clasificador.items) dedup(c.clasificador.items, b.clasificador || [], (x) => x.f + "#" + x.w);
      if (c.rimas && c.rimas.items) dedup(c.rimas.items, b.rimas || [], (x) => x.v1);
      if (c.biblioteca) {
        const bib = c.biblioteca;
        dedup(bib.libros, b.libros || [], (x) => x.titulo);
        (b.perfiles || []).forEach((f) => {
          if (bib.perfiles.some((p) => p.nombre === f.nombre && p.pide === f.pide)) return;
          const ok = (f.okT || []).map((t) => bib.libros.findIndex((l) => l.titulo === t)).filter((i) => i >= 0);
          if (ok.length !== (f.okT || []).length) { if (window.console) console.warn("Perfil sin libro:", f.nombre); return; }
          const p = Object.assign({}, f, { ok }); delete p.okT; bib.perfiles.push(p);
        });
      }
    });
  }
  PP.BANCO4 = B4;
  mezclar4();
})();
