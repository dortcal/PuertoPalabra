/* Puerto Palabra · Tercer banco de contenidos (variedad del Chismógrafo y de Radio Onda Volcán).
   - posts: 15 mensajes más por curso (5 datos fiables, 5 bulos y 5 opiniones). Criterio 6.1 (y 4.2 en la pista).
   - boletines: 2 boletines de radio más por curso, cada uno con su lugar de destino y sus preguntas
     (criterio 2.1). La misión elige un boletín distinto en cada partida (ver resolverRef en main.js).
   En «pistas», la primera es la más clara; todas deben estar realmente en el mensaje.
   Claves de pista: fuente, datos, sinfuente, alarma, opinion, cadena, exagera, fecha.
   Todos los textos son originales. */
window.PP = window.PP || {};
(function () {
  const { P } = PP.BancoUtil;
  const Q = (p, bien, mals, fb, pista) => { const q = { p, o: [bien].concat(mals), c: 0, fb }; if (pista) q.pista = pista; return q; };
  const BOL = (texto, destino, distractores, fbMal, fbBien, preguntas, extra) => Object.assign({ texto, destino, distractores, fbMal, fbBien, preguntas }, extra || {});
  const B3 = {};

  // ================================= 1.º =================================
  B3[1] = {
    posts: [
      P("Colegio La Laja", "@colegiolalaja", "fiable", "El viernes no hay clase por la fiesta del barrio. Volvemos el lunes.", "Lo dice el colegio y da el día.", ["fuente", "datos"], true),
      P("Biblioteca Municipal", "@biblio_pp", "fiable", "Hoy, a las cinco, cuentacuentos para niños y niñas. ¡Entrada libre!", "Lo dice la biblioteca y da la hora.", ["fuente", "datos"], true),
      P("Ayuntamiento", "@aytoPuertoPalabra", "fiable", "El parque de los Dragos tiene columpios nuevos desde hoy.", "Lo cuenta el Ayuntamiento, que puso los columpios.", ["fuente", "datos"], true),
      P("Guaguas de Puerto Palabra", "@guaguas_pp", "fiable", "Mañana la guagua del colegio sale a las ocho, como siempre.", "Lo dice la empresa de guaguas.", ["fuente", "datos"], true),
      P("Mercado del Puerto", "@mercado_pp", "fiable", "Hoy el mercado cierra a las dos de la tarde.", "Lo dice el propio mercado.", ["fuente", "datos"], true),
      P("SuperNoticias", "@super_noticias", "bulo", "¡¡Los gatos de la ciudad han aprendido a hablar!! ¡Pásalo!", "Los gatos no hablan. ¡Es inventado!", ["exagera", "cadena", "alarma"]),
      P("Mensaje misterioso", "@misterio123", "bulo", "Si comes muchas zanahorias, mañana podrás volar. ¡Cuéntaselo a todos!", "Nadie puede volar. ¡Es un bulo!", ["exagera", "cadena"]),
      P("Alguien", "@alguien_x", "bulo", "¡Mañana no habrá colegio nunca más! Me lo ha dicho un amigo.", "Lo dice «un amigo» que no sabemos quién es.", ["sinfuente", "exagera"]),
      P("ChisteLoco", "@chiste_loco", "bulo", "¡¡El mar se va a volver de chocolate esta noche!! ¡Compártelo!", "Eso es imposible: es un bulo.", ["exagera", "cadena", "alarma"]),
      P("Regalos YA", "@regalos_ya", "bulo", "¡Comparte este mensaje y te llegará una bici a casa!", "Nadie regala bicis por compartir un mensaje.", ["cadena", "exagera"]),
      P("Iballa", "@iballa_7", "opinion", "Creo que el recreo debería durar mucho más.", "«Creo que…» es lo que piensa Iballa.", ["opinion"]),
      P("Dácil", "@dacil_baila", "opinion", "La canción de la fiesta es la más bonita del mundo.", "Es lo que piensa Dácil.", ["opinion"]),
      P("Jonay", "@jonay_futbol", "opinion", "Me parece que el fútbol es el juego más divertido.", "«Me parece» indica opinión.", ["opinion"]),
      P("Abuela Pino", "@abuela_pino", "opinion", "Para mí, el gofio con leche es el mejor desayuno.", "«Para mí» indica opinión.", ["opinion"]),
      P("Ancor", "@ancor_mar", "opinion", "Pienso que los perros son más simpáticos que los gatos.", "«Pienso que» indica opinión.", ["opinion"])
    ],
    boletines: [
      BOL("¡Hola, Puerto Palabra! Soy Yurena, de Radio Onda Volcán. Hoy hay cuentacuentos en el sitio donde se prestan libros. La abuela Candelaria contará un cuento de un barco pirata. Empieza a las cuatro. ¡Traigan un cojín para sentarse en el suelo!",
        "biblioteca", ["cine", "mercado"], "El cuentacuentos es donde se prestan libros. ¿Qué sitio es?", "¡En la biblioteca se prestan libros!", [
          Q("¿Dónde es el cuentacuentos?", "En la biblioteca", ["En la playa", "En el cine"], "Es donde se prestan libros: la biblioteca."),
          Q("¿Quién cuenta el cuento?", "La abuela Candelaria", ["Yurena", "Un pirata"], "Lo cuenta la abuela Candelaria."),
          Q("¿De qué trata el cuento?", "De un barco pirata", ["De un dragón", "De una princesa"], "Es un cuento de un barco pirata."),
          Q("¿A qué hora empieza?", "A las cuatro", ["A las diez", "A las ocho"], "Empieza a las cuatro."),
          Q("¿Qué hay que llevar?", "Un cojín", ["Un paraguas", "Una pelota"], "Un cojín para sentarse en el suelo.")
        ]),
      BOL("¡Buenos días! Aquí Radio Onda Volcán. Hoy llega un barco nuevo a Puerto Palabra. Se llama Gaviota y es blanco y azul. Llegará al sitio donde paran los barcos, en el muelle, a las diez de la mañana. ¡Traigan una bandera para saludar!",
        "muelle", ["parque", "colegio"], "El barco llega donde paran los barcos. ¿Cómo se llama ese sitio?", "¡Los barcos paran en el muelle!", [
          Q("¿Cómo se llama el barco?", "Gaviota", ["Delfín", "Volcán"], "El barco se llama Gaviota."),
          Q("¿De qué colores es el barco?", "Blanco y azul", ["Rojo y verde", "Negro"], "Es blanco y azul."),
          Q("¿Adónde llega el barco?", "Al muelle", ["Al parque", "Al colegio"], "Llega al muelle, donde paran los barcos."),
          Q("¿A qué hora llega?", "A las diez de la mañana", ["A las cinco de la tarde", "Por la noche"], "A las diez de la mañana."),
          Q("¿Para qué hay que llevar una bandera?", "Para saludar al barco", ["Para jugar al fútbol", "Para pintar"], "La bandera es para saludar.")
        ])
    ]
  };

  // ================================= 2.º =================================
  B3[2] = {
    posts: [
      P("Colegio La Laja", "@colegiolalaja", "fiable", "El martes vamos al Museo del Mar. Salimos a las nueve y volvemos a la una.", "Lo dice el colegio y da la hora de salida y de vuelta.", ["fuente", "datos"], true),
      P("Ayuntamiento", "@aytoPuertoPalabra", "fiable", "Este sábado la piscina municipal abre gratis de diez a dos.", "Fuente oficial y horario concreto.", ["fuente", "datos"], true),
      P("Biblioteca Municipal", "@biblio_pp", "fiable", "Ya tenemos 20 libros nuevos de animales. Puedes llevarte dos cada semana.", "Lo dice la biblioteca y da cifras.", ["fuente", "datos"], true),
      P("Radio Onda Volcán", "@ondavolcan", "fiable", "Mañana habrá sol y algo de viento por la tarde. Llevad gorra.", "Lo dice la radio, que informa del tiempo.", ["fuente", "datos"], true),
      P("Club de Lucha Canaria", "@lucha_pp", "fiable", "Las clases de lucha canaria empiezan el lunes a las seis en el pabellón.", "Lo dice el club y da día, hora y lugar.", ["fuente", "datos"], true),
      P("NoticiasLocas", "@noticias_locas", "bulo", "¡¡ATENCIÓN!! Han visto un pulpo gigante paseando por la plaza. ¡Pásalo rápido!", "Un pulpo no pasea por la plaza. Usa mayúsculas y pide pasarlo.", ["exagera", "alarma", "cadena"]),
      P("Desconocido", "@x_x_x", "bulo", "Dicen que si te lavas los dientes con refresco, se ponen más blancos.", "«Dicen» no es una fuente. Y es falso.", ["sinfuente", "exagera"]),
      P("SorpresaTotal", "@sorpresa_total", "bulo", "¡Reenvía esto a diez amigos y mañana te tocará un perrito!", "Ningún perrito llega por reenviar mensajes.", ["cadena", "exagera"]),
      P("UltimaHora", "@ultima_hora_ya", "bulo", "¡¡URGENTE!! Los libros de la biblioteca se borran solos por la noche.", "Los libros no se borran solos. Quiere asustar.", ["alarma", "exagera", "sinfuente"]),
      P("Un vecino", "@vecino_anonimo", "bulo", "Me han contado que en el volcán vive un dragón que come papas. ¡Cuéntalo!", "«Me han contado» no dice quién. Es inventado.", ["sinfuente", "exagera", "cadena"]),
      P("Nayra", "@nayra_dibuja", "opinion", "Creo que dibujar es lo más divertido del colegio.", "«Creo que» indica opinión.", ["opinion"]),
      P("Airam", "@airam_surf", "opinion", "Para mí, Playa Chica es la playa más bonita de la isla.", "«Para mí» y «la más bonita» indican opinión.", ["opinion"]),
      P("Tía Carmen", "@tia_carmen", "opinion", "Me encanta el invierno porque podemos tomar chocolate caliente.", "Es lo que siente la tía Carmen.", ["opinion"]),
      P("Yeray", "@yeray_lee", "opinion", "Pienso que los cuentos de miedo son los mejores.", "«Pienso que» indica opinión.", ["opinion"]),
      P("Elsa", "@elsa_canta", "opinion", "La película de ayer me pareció muy aburrida.", "«Me pareció» indica opinión.", ["opinion"])
    ],
    boletines: [
      BOL("Buenas tardes desde Radio Onda Volcán. El sábado hay un concurso de cometas. Será en el parque donde están los árboles llamados dragos. Empieza a las once de la mañana. Cada niño o niña debe traer una cometa hecha en casa. La cometa más original ganará un libro. Si llueve, el concurso será el domingo.",
        "parque", ["playa", "plaza"], "El concurso es «en el parque donde están los árboles llamados dragos».", "¡En el Parque de los Dragos!", [
          Q("¿Dónde es el concurso de cometas?", "En el Parque de los Dragos", ["En la playa", "En la plaza"], "Donde están los árboles llamados dragos."),
          Q("¿Qué día es el concurso?", "El sábado", ["El lunes", "El viernes"], "Es el sábado."),
          Q("¿Cómo tiene que ser la cometa?", "Hecha en casa", ["Comprada en la tienda", "De color rojo"], "Hay que traer una cometa hecha en casa."),
          Q("¿Qué premio gana la cometa más original?", "Un libro", ["Una bici", "Una pelota"], "Gana un libro."),
          Q("¿Qué pasa si llueve?", "El concurso será el domingo", ["No hay concurso nunca", "Se hace en la biblioteca"], "Si llueve, se pasa al domingo.", "Escucha el final del boletín.")
        ]),
      BOL("Radio Onda Volcán con un aviso para las familias. Por unas obras en la calle del colegio, la guagua escolar ya no saldrá de la puerta del colegio. Durante una semana, saldrá del sitio donde esperan todas las guaguas de la ciudad. La salida será a las ocho en punto. ¡No se olviden de llevar el bono!",
        "estacion", ["mercado", "colegio"], "La guagua sale «del sitio donde esperan todas las guaguas». ¿Qué lugar es?", "¡En la Estación de Guaguas esperan todas las guaguas!", [
          Q("¿Por qué cambia la parada de la guagua?", "Por unas obras en la calle", ["Porque llueve", "Porque la guagua está rota"], "Hay obras en la calle del colegio."),
          Q("¿Desde dónde saldrá la guagua?", "Desde la Estación de Guaguas", ["Desde el colegio", "Desde el mercado"], "Saldrá del sitio donde esperan todas las guaguas."),
          Q("¿Durante cuánto tiempo?", "Durante una semana", ["Para siempre", "Solo un día"], "Será durante una semana."),
          Q("¿A qué hora sale?", "A las ocho en punto", ["A las nueve", "A las doce"], "A las ocho en punto."),
          Q("¿Qué no hay que olvidar?", "El bono de la guagua", ["El bocadillo", "La mochila de natación"], "Hay que llevar el bono.")
        ])
    ]
  };

  // ================================= 3.º =================================
  B3[3] = {
    posts: [
      P("Ayuntamiento de Puerto Palabra", "@aytoPuertoPalabra", "fiable", "Del 1 al 15 de marzo, la Plaza Mayor tendrá una pista de patinaje. Horario: de 17:00 a 20:00.", "Fuente oficial con fechas y horario.", ["fuente", "datos"], true, "hace 1 h"),
      P("Museo del Mar", "@museodelmar", "fiable", "Nueva sala dedicada a los barcos de vela. Abierta de martes a domingo, de 10:00 a 18:00.", "Lo dice el museo y da días y horas.", ["fuente", "datos"], true),
      P("Protección Civil", "@proteccioncivil_pp", "fiable", "Mañana, oleaje de hasta 3 metros en la costa norte. No os bañéis en las playas sin vigilancia.", "Organismo oficial con datos concretos.", ["fuente", "datos"], true),
      P("Colegio La Laja", "@colegiolalaja", "fiable", "La reunión de familias será el jueves 12 a las 16:30 en el salón de actos.", "Lo dice el colegio, con fecha, hora y lugar.", ["datos", "fuente"], true),
      P("Club de Ciencia", "@clubciencia_pp", "fiable", "Según el Instituto de Astrofísica de Canarias, el martes por la noche se verá una lluvia de estrellas.", "Cita la fuente de la información.", ["fuente", "datos"], true),
      P("AlertaYa", "@alerta_ya", "bulo", "¡¡URGENTE!! Mañana se acaba el agua en toda la isla. ¡Llena todas las botellas y avisa a todos!", "Quiere asustar, no da fuente y pide avisar a todos.", ["alarma", "cadena", "sinfuente"]),
      P("Curiosidades100", "@curiosidades100", "bulo", "Comer helado antes de un examen hace que saques un 10. ¡Comprobado!", "Promete algo imposible y no dice quién lo ha comprobado.", ["exagera", "sinfuente"]),
      P("Un amigo de un amigo", "@amigo_de_amigo", "bulo", "Me ha dicho el primo de un amigo que van a cerrar todas las playas para siempre.", "La fuente no se puede comprobar.", ["sinfuente", "exagera"]),
      P("PremiosGratis", "@premios_gratis", "bulo", "¡Felicidades! Has ganado una consola. Comparte este mensaje con 20 personas para recibirla.", "Pide compartirlo a cambio de un premio falso.", ["cadena", "exagera"]),
      P("MisterioTotal", "@misterio_total", "bulo", "¡¡OJO!! El volcán va a lanzar caramelos gigantes este fin de semana. ¡Pásalo!", "Es imposible y usa mayúsculas para llamar la atención.", ["exagera", "alarma", "cadena"]),
      P("Laura", "@laura_lee", "opinion", "Creo que «El faro encantado» es el mejor libro que he leído este año.", "«Creo que» y «el mejor» indican opinión.", ["opinion"]),
      P("Tomás", "@tomas_bici", "opinion", "Me parece que ir en bici al colegio es mucho más divertido que en coche.", "«Me parece» indica opinión.", ["opinion"]),
      P("Guacimara", "@guaci_cocina", "opinion", "Para mí, el bienmesabe es el postre más rico de Canarias.", "«Para mí» indica opinión.", ["opinion"]),
      P("Héctor", "@hector_musica", "opinion", "Opino que deberían poner más música en el recreo.", "«Opino que» indica opinión.", ["opinion"]),
      P("Sara", "@sara_dibujos", "opinion", "Los dibujos animados de antes eran más bonitos que los de ahora.", "Es lo que piensa Sara; otra persona puede pensar distinto.", ["opinion"])
    ],
    boletines: [
      BOL("Buenas tardes desde Radio Onda Volcán. Primera noticia: este domingo se celebra un mercadillo de juguetes usados. Los niños y niñas podrán cambiar un juguete que ya no usen por otro. Será en el sitio con una fuente grande que está delante del Ayuntamiento. Empieza a las diez y termina a la una. Segunda noticia: la biblioteca busca voluntarios para leer cuentos en el hospital. ¡Hasta mañana!",
        "plaza", ["mercado", "parque"], "El mercadillo es «en el sitio con una fuente grande delante del Ayuntamiento».", "¡La Plaza Mayor tiene una gran fuente delante del Ayuntamiento!", [
          Q("¿Qué se puede hacer en el mercadillo?", "Cambiar un juguete por otro", ["Comprar fruta", "Vender ropa nueva", "Ver una película"], "Se cambia un juguete que ya no se usa por otro."),
          Q("¿Dónde es el mercadillo?", "En la Plaza Mayor", ["En el mercado", "En el colegio", "En la playa"], "En el sitio con una fuente grande delante del Ayuntamiento."),
          Q("¿Cuánto tiempo dura el mercadillo?", "Tres horas", ["Una hora", "Todo el día", "Dos días"], "De diez a una: tres horas.", "Cuenta desde las diez hasta la una."),
          Q("¿Qué busca la biblioteca?", "Voluntarios para leer cuentos en el hospital", ["Libros viejos", "Juguetes", "Un nuevo bibliotecario"], "Es la segunda noticia."),
          Q("¿Por qué crees que se organiza un mercadillo de cambio?", "Para reutilizar juguetes en vez de tirarlos", ["Para ganar mucho dinero", "Porque los juguetes nuevos están prohibidos", "Para limpiar la plaza"], "Cambiar juguetes es una forma de reutilizar."),
          Q("¿Cuántas noticias da el boletín?", "Dos", ["Una", "Tres", "Cuatro"], "Primera: el mercadillo. Segunda: los voluntarios.")
        ]),
      BOL("Radio Onda Volcán, buenas tardes. Esta noche, la banda de música del colegio da su primer concierto. Será en el edificio que tiene escenario, butacas rojas y un gran telón que se abre al empezar la función. El concierto empieza a las ocho y las entradas cuestan un euro. El dinero servirá para comprar instrumentos nuevos. Y ahora, el tiempo: mañana tendremos sol por la mañana y lluvia por la tarde.",
        "teatro", ["cine", "colegio"], "Busca el edificio con escenario, butacas y un telón que se abre.", "¡El teatro tiene escenario y telón!", [
          Q("¿Quién da el concierto?", "La banda de música del colegio", ["Una cantante famosa", "La orquesta de la radio", "Los profesores"], "Es la banda de música del colegio."),
          Q("¿Dónde es el concierto?", "En el Teatro de la Luna", ["En el cine", "En el colegio", "En la plaza"], "Tiene escenario, butacas rojas y telón: es el teatro."),
          Q("¿Cuánto cuesta la entrada?", "Un euro", ["Es gratis", "Cinco euros", "No lo dice"], "Las entradas cuestan un euro."),
          Q("¿Para qué servirá el dinero?", "Para comprar instrumentos nuevos", ["Para arreglar el teatro", "Para un viaje", "Para pagar a la banda"], "Servirá para comprar instrumentos."),
          Q("¿Qué tiempo hará mañana por la tarde?", "Lloverá", ["Hará sol", "Nevará", "Hará mucho viento"], "Sol por la mañana y lluvia por la tarde.", "Escucha la última parte del boletín."),
          Q("¿Qué palabra indica que es el primer concierto de la banda?", "«primer»", ["«esta noche»", "«entradas»", "«nuevos»"], "«Su primer concierto»: nunca habían tocado antes.")
        ])
    ]
  };

  // ================================= 4.º =================================
  B3[4] = {
    posts: [
      P("Cabildo Insular", "@cabildo_isla", "fiable", "Desde el 1 de abril, las guaguas serán gratis para menores de 14 años. Más información en la web del Cabildo.", "Fuente oficial, fecha y dónde comprobarlo.", ["fuente", "datos"], true),
      P("Agencia de Meteorología", "@meteo_canarias", "fiable", "Aviso amarillo por calor el viernes: hasta 34 °C en el sur. Bebe agua y evita el sol en las horas centrales.", "Organismo oficial y datos concretos.", ["fuente", "datos"], true),
      P("Biblioteca Municipal", "@biblio_pp", "fiable", "Este mes se prestaron 1.250 libros. El más pedido fue «La isla que se escondía».", "Lo dice la biblioteca y da cifras.", ["fuente", "datos"], true),
      P("Centro de Salud", "@centrosalud_pp", "fiable", "La campaña de vacunación escolar será del 10 al 14 de noviembre en cada colegio. Las familias recibirán una carta.", "Fuente sanitaria con fechas.", ["fuente", "datos"], true),
      P("El Eco", "@diario_eco", "fiable", "La alcaldesa ha confirmado en rueda de prensa que el nuevo parque abrirá en junio.", "Dice quién lo ha confirmado y dónde.", ["fuente", "datos"], true),
      P("VerdadesOcultas", "@verdades_ocultas", "bulo", "Los científicos lo esconden: el agua del grifo te vuelve invisible si bebes diez vasos. ¡Compártelo antes de que lo borren!", "Promete algo imposible y pide compartirlo con prisa.", ["exagera", "cadena", "alarma"]),
      P("Info Rápida", "@info_rapida", "bulo", "¡ÚLTIMA HORA! Cierran todos los colegios de Canarias durante un año. ¡Reenvía!", "Usa mayúsculas, exagera y no da fuente.", ["alarma", "sinfuente", "exagera", "cadena"]),
      P("TrucosGenios", "@trucos_genios", "bulo", "Si duermes con un libro debajo de la almohada, te lo aprendes entero sin leerlo.", "Es imposible y no dice quién lo ha comprobado.", ["exagera", "sinfuente"]),
      P("Mensaje reenviado", "@reenviado", "bulo", "Me lo pasó mi vecina: la Policía regalará bicis a quien comparta esta foto. ¡Hazlo ya!", "La fuente no es comprobable y pide compartir.", ["sinfuente", "cadena", "exagera"]),
      P("SuperOferta", "@super_oferta_x", "bulo", "¡¡ATENCIÓN!! Si no reenvías esto en 5 minutos, tu móvil se romperá.", "Quiere asustar para que lo reenvíes.", ["alarma", "cadena"]),
      P("Mario", "@mario_juegos", "opinion", "En mi opinión, los videojuegos de aventuras son mucho mejores que los de deportes.", "«En mi opinión» y la comparación indican opinión.", ["opinion"]),
      P("Lucía", "@lucia_escribe", "opinion", "Creo que todos los colegios deberían tener un huerto.", "«Creo que» y «deberían» indican opinión.", ["opinion"]),
      P("Abuelo Fermín", "@abuelo_fermin", "opinion", "Antes las fiestas del barrio eran mucho más alegres.", "Es lo que siente el abuelo; no se puede comprobar.", ["opinion"]),
      P("Cristina", "@cris_natura", "opinion", "Me parece que el Teide es el paisaje más impresionante de España.", "«Me parece» indica opinión.", ["opinion"]),
      P("Adrián", "@adrian_lector", "opinion", "Para mí, los libros siempre son mejores que las películas.", "«Para mí» indica opinión.", ["opinion"])
    ],
    boletines: [
      BOL("Buenas tardes, Puerto Palabra. Les habla Yurena Martín. Con motivo de la Semana de la Movilidad, este sábado se ofrece un taller gratuito para aprender a arreglar bicicletas. Lo darán los mecánicos del local donde normalmente se arreglan y se pintan motos. Habrá que llevar la bici y un casco. El taller empieza a las diez y las plazas son limitadas: solo veinte. Para apuntarse, hay que llamar antes del viernes. ¡Pedaleen con nosotros!",
        "taller", ["fabrica", "estacion"], "El taller lo dan «en el local donde se arreglan y se pintan motos».", "¡En el Taller de Tuneo se arreglan y pintan motos!", [
          Q("¿Con qué motivo se organiza el taller?", "La Semana de la Movilidad", ["Las fiestas del barrio", "El Día del Libro", "El carnaval"], "Es por la Semana de la Movilidad."),
          Q("¿Qué se aprende en el taller?", "A arreglar bicicletas", ["A conducir motos", "A pintar cuadros", "A montar en monopatín"], "Se aprende a arreglar bicis."),
          Q("¿Qué hay que llevar?", "La bici y un casco", ["Dinero", "Una moto", "Herramientas"], "Hay que llevar la bici y un casco."),
          Q("¿Por qué conviene llamar pronto?", "Porque solo hay veinte plazas", ["Porque el taller es caro", "Porque cierra a las diez", "Porque llueve"], "Las plazas son limitadas.", "Escucha qué dice sobre las plazas."),
          Q("¿Hasta cuándo se puede uno apuntar?", "Hasta el viernes", ["Hasta el sábado", "Hasta el domingo", "No lo dice"], "Hay que llamar antes del viernes."),
          Q("¿Qué quiere decir «plazas limitadas»?", "Que solo puede ir un número de personas", ["Que el taller es en una plaza", "Que es gratis", "Que dura poco tiempo"], "Limitadas = hay un número máximo.")
        ]),
      BOL("Radio Onda Volcán, el boletín de las seis. Mañana se celebra la final del concurso de ortografía de los colegios de la isla. Será en la escuela donde se enseñan las reglas de las tildes. Los finalistas tendrán que escribir sin errores palabras muy difíciles, como «murciélago» o «exhausto». El ganador o la ganadora recibirá un diccionario y una visita a la redacción de El Eco. El público puede entrar gratis, pero debe guardar silencio durante las pruebas.",
        "academia", ["colegio", "biblioteca"], "La final es en la escuela donde se enseñan las reglas de las tildes.", "¡En la Academia de las Tildes se enseñan las reglas de acentuación!", [
          Q("¿Qué se celebra mañana?", "La final de un concurso de ortografía", ["Una carrera", "Un concierto", "Una feria del libro"], "Es la final del concurso de ortografía."),
          Q("¿Dónde se celebra?", "En la Academia de las Tildes", ["En el colegio", "En la biblioteca", "En El Eco"], "En la escuela donde se enseñan las reglas de las tildes."),
          Q("¿Qué tienen que hacer los finalistas?", "Escribir sin errores palabras difíciles", ["Leer en voz alta", "Inventar un cuento", "Contestar preguntas de historia"], "Escribir palabras difíciles sin errores."),
          Q("¿Qué premio recibirá quien gane?", "Un diccionario y una visita a El Eco", ["Una bicicleta", "Dinero", "Un viaje"], "Un diccionario y una visita a la redacción."),
          Q("¿Qué norma debe cumplir el público?", "Guardar silencio durante las pruebas", ["Pagar la entrada", "Llevar un diccionario", "Llegar una hora antes"], "Puede entrar gratis, pero en silencio."),
          Q("¿Por qué se ponen «murciélago» y «exhausto» como ejemplo?", "Porque son palabras difíciles de escribir", ["Porque son nombres de animales", "Porque son muy cortas", "Porque riman"], "Son ejemplos de palabras difíciles.")
        ])
    ]
  };

  // ================================= 5.º =================================
  B3[5] = {
    posts: [
      P("Gobierno de Canarias", "@gobcanarias", "fiable", "Desde el lunes, las matrículas de los campamentos de verano se hacen en la web oficial. Plazo: hasta el 30 de mayo.", "Fuente oficial, plazo y lugar para comprobarlo.", ["fuente", "datos"], true),
      P("Instituto de Astrofísica", "@iac_ciencia", "fiable", "El eclipse parcial de sol del día 12 se verá en Canarias entre las 19:10 y las 19:55. Nunca mires el sol sin gafas homologadas.", "Organismo científico con datos precisos.", ["fuente", "datos"], true),
      P("Policía Local", "@policialocal_pp", "fiable", "Por la carrera popular, el domingo de 8:00 a 12:00 estará cortada la avenida del Puerto. Consulta los desvíos en nuestra web.", "Fuente oficial, horario y dónde ampliar.", ["fuente", "datos"], true),
      P("El Eco", "@diario_eco", "fiable", "Según los datos del Ayuntamiento, el reciclaje de vidrio ha aumentado un 18 % este año en Puerto Palabra.", "Cita de dónde salen los datos.", ["fuente", "datos"], true),
      P("Museo del Mar", "@museodelmar", "fiable", "El museo recibió ayer la donación de un ancla del siglo XIX. Se podrá ver a partir del día 3 en la sala principal.", "Lo dice el museo, con fecha y lugar.", ["fuente", "datos"], true),
      P("SaludNatural100", "@salud_natural100", "bulo", "Los médicos no quieren que lo sepas: comer tres plátanos al día evita TODAS las enfermedades. ¡Compártelo!", "Exagera, no cita ninguna fuente fiable y pide compartir.", ["exagera", "sinfuente", "cadena"]),
      P("Noticias24h", "@noticias_24h_ya", "bulo", "¡¡ALERTA!! Un meteorito caerá mañana en el Atlántico y provocará olas gigantes. Avisa a tu familia YA.", "Busca el miedo y no cita a ningún organismo.", ["alarma", "sinfuente", "cadena"]),
      P("Cuenta sin nombre", "@user8392", "bulo", "Este vídeo es de ayer: un tiburón nadando por la calle del mercado.", "No es de ayer ni de aquí: es un vídeo antiguo de otro lugar.", ["fecha", "sinfuente", "exagera"]),
      P("Sorteos Oficiales", "@sorteos_0ficiales", "bulo", "Hemos elegido tu número: has ganado un móvil. Solo tienes que enviar tus datos y compartir este mensaje.", "Pide datos personales y compartir: es un engaño. Fíjate: «0ficiales» lleva un cero.", ["exagera", "cadena"]),
      P("Mensaje en cadena", "@cadena_ok", "bulo", "Dicen que mañana las redes sociales cobrarán 5 euros por mensaje. Reenvía esto para que no te cobren.", "«Dicen» no es una fuente y pide reenviarlo.", ["sinfuente", "cadena", "alarma"]),
      P("Rayco", "@rayco_opina", "opinion", "Considero que los deberes de fin de semana no sirven para nada.", "«Considero» indica opinión; otros pueden pensar distinto.", ["opinion"]),
      P("Marta", "@marta_cine", "opinion", "La última película de animación es, sin duda, la mejor del año.", "«La mejor» es una valoración personal.", ["opinion"]),
      P("Club de Lectura", "@clublectura_pp", "opinion", "A nuestro juicio, la poesía debería leerse más en voz alta.", "«A nuestro juicio» indica opinión, aunque lo diga un club.", ["opinion"]),
      P("Iván", "@ivan_deportes", "opinion", "Creo que la lucha canaria debería enseñarse en todos los colegios.", "«Creo que» y «debería» indican opinión.", ["opinion"]),
      P("Ruth", "@ruth_viajes", "opinion", "Para mí, La Palma es la isla más verde y más bonita de Canarias.", "«Para mí» indica opinión.", ["opinion"])
    ],
    boletines: [
      BOL("Buenas tardes, Puerto Palabra. Les habla Yurena Martín. Comienza la gran recogida solidaria de alimentos. Este año, la empresa que fabrica productos en la ciudad ha prestado su nave: el edificio de grandes máquinas donde cada día salen cajas y cajas de productos nuevos. Se pueden llevar alimentos no perecederos, es decir, los que no se estropean pronto: legumbres, arroz, leche o conservas. La recogida será del lunes al jueves, de cinco a ocho de la tarde. Lo recogido se repartirá entre las familias que lo necesitan. Cada kilo cuenta.",
        "fabrica", ["almacen", "mercado"], "La recogida es en «el edificio de grandes máquinas donde salen productos nuevos».", "¡En la Fábrica de Palabras hay grandes máquinas y salen productos nuevos!", [
          Q("¿Cuál es el propósito de la recogida?", "Ayudar a las familias que lo necesitan", ["Vender alimentos más baratos", "Vaciar la fábrica", "Hacer un concurso de cocina"], "Lo recogido se repartirá entre familias que lo necesitan."),
          Q("¿Qué significa «alimentos no perecederos»?", "Que no se estropean pronto", ["Que son muy caros", "Que son frescos", "Que vienen de otra isla"], "La locutora lo explica: «es decir, los que no se estropean pronto»."),
          Q("¿Cuál de estos alimentos se podría llevar?", "Un paquete de lentejas", ["Pescado fresco", "Una tarta de nata", "Fresas"], "Las lentejas son legumbres secas: no se estropean pronto.", "Piensa en qué alimentos aguantan muchos días sin nevera."),
          Q("¿Cuántos días dura la recogida?", "Cuatro días", ["Un día", "Una semana entera", "Dos días"], "Del lunes al jueves: cuatro días."),
          Q("¿Qué quiere transmitir la frase final «Cada kilo cuenta»?", "Que cualquier ayuda, aunque sea pequeña, es importante", ["Que hay que pesar a la gente", "Que solo se aceptan paquetes de un kilo", "Que la recogida es una competición"], "Anima a participar aunque se lleve poco."),
          Q("¿Por qué crees que la empresa ha prestado su nave?", "Porque es un espacio grande para guardar mucha comida", ["Porque está junto al mar", "Porque allí se cocina", "Porque la radio está dentro"], "Una nave grande permite almacenar lo recogido.")
        ]),
      BOL("Radio Onda Volcán, buenas tardes. Arranca el concurso «Mi primer anuncio», para alumnos y alumnas de quinto y sexto. Hay que grabar un anuncio de radio de un minuto sobre un comercio del barrio. Las grabaciones se entregan en el edificio donde se escriben las noticias del diario de la ciudad, antes del día 20. Y ahora, una pausa publicitaria: ¡Zapatillas Rayo, las únicas que te hacen ganar todas las carreras! Seguimos: el jurado valorará la originalidad y que el mensaje sea claro y respetuoso.",
        "periodico", ["imprenta", "biblioteca"], "Se entrega en «el edificio donde se escriben las noticias del diario».", "¡En la Redacción de El Eco se escriben las noticias del periódico!", [
          Q("¿Quién puede participar en el concurso?", "Alumnado de quinto y sexto", ["Cualquier persona adulta", "Solo los comercios", "Los locutores de la radio"], "Es para alumnos y alumnas de quinto y sexto."),
          Q("¿Qué hay que hacer?", "Grabar un anuncio de radio de un minuto", ["Escribir una noticia", "Hacer un dibujo", "Cantar una canción"], "Un anuncio de radio de un minuto sobre un comercio del barrio."),
          Q("¿Dónde se entregan las grabaciones?", "En la Redacción de El Eco", ["En la Imprenta", "En la biblioteca", "En la radio"], "Donde se escriben las noticias del diario."),
          Q("¿Por qué no es fiable lo que dice el anuncio de las zapatillas?", "Promete algo exagerado que no se puede asegurar", ["Porque las zapatillas son caras", "Porque lo dice la radio", "Porque es muy largo"], "Ninguna zapatilla te hace ganar todas las carreras.", "¿Puede algo hacerte ganar siempre?"),
          Q("¿Qué valorará el jurado?", "La originalidad y un mensaje claro y respetuoso", ["Que el anuncio sea muy largo", "Que salgan muchas personas", "Que el comercio sea grande"], "Originalidad y mensaje claro y respetuoso."),
          Q("¿Qué frase marca el paso de la información a la publicidad?", "«Y ahora, una pausa publicitaria»", ["«Arranca el concurso»", "«Seguimos»", "«antes del día 20»"], "Esa frase anuncia que viene publicidad.")
        ])
    ]
  };

  // ================================= 6.º =================================
  B3[6] = {
    posts: [
      P("Consejería de Educación", "@educacion_canarias", "fiable", "El curso comenzará el 10 de septiembre en todos los centros de Primaria. El calendario completo está publicado en el Boletín Oficial de Canarias.", "Fuente oficial que remite a un documento comprobable.", ["fuente", "datos"], true),
      P("Agencia de Meteorología", "@meteo_canarias", "fiable", "Aviso naranja por viento en las cumbres el sábado: rachas de hasta 90 km/h. Se recomienda no hacer senderismo.", "Organismo oficial con datos concretos.", ["fuente", "datos"], true),
      P("El Eco", "@diario_eco", "fiable", "Según un estudio de la Universidad de La Laguna, el 64 % del alumnado canario lee al menos una vez por semana fuera del colegio.", "Cita la fuente del estudio y el dato.", ["fuente", "datos"], true),
      P("Cabildo Insular", "@cabildo_isla", "fiable", "El sendero del barranco permanecerá cerrado del 3 al 17 de febrero por obras de seguridad. Alternativas en la web del Cabildo.", "Fuente oficial, fechas y motivo.", ["fuente", "datos"], true),
      P("Red de Bibliotecas", "@bibliotecas_canarias", "fiable", "El préstamo de libros electrónicos creció un 30 % el último año, según el informe anual de la Red de Bibliotecas.", "Dato con fuente identificada.", ["fuente", "datos"], true),
      P("La Verdad Oculta", "@la_verdad_oculta", "bulo", "Un estudio secreto demuestra que leer en pantallas borra la memoria. Los gobiernos lo ocultan. ¡Difúndelo!", "Un «estudio secreto» no se puede comprobar; usa teorías de ocultación y pide difundir.", ["sinfuente", "exagera", "cadena"]),
      P("ÚltimaHoraCanarias", "@ultimahora_cnrs", "bulo", "¡¡ATENCIÓN!! El Teide entrará en erupción el martes a las 15:00. Huid de la isla.", "Nadie puede predecir una erupción con esa exactitud; busca el pánico.", ["alarma", "sinfuente", "exagera"]),
      P("Foto viral", "@foto_viral_x", "bulo", "Mira esta foto de la nevada de hoy en la playa de Las Canteras.", "La foto es antigua y de otro lugar: no indica cuándo ni dónde se tomó.", ["fecha", "sinfuente"]),
      P("Remedios Caseros", "@remedios_casa", "bulo", "Un vaso de agua con sal por la mañana te hace crecer cinco centímetros en un mes. ¡Funciona!", "Promete un resultado imposible sin ninguna prueba.", ["exagera", "sinfuente"]),
      P("Aviso importante", "@aviso_importante1", "bulo", "Mañana cambiarán todos los números de teléfono de Canarias. Reenvía este mensaje a tus contactos o perderás la línea.", "Usa el miedo para que lo reenvíes y no cita ninguna fuente.", ["cadena", "alarma", "sinfuente"]),
      P("Alejandro", "@alejandro_debate", "opinion", "Considero que el móvil no debería estar permitido en los recreos.", "«Considero» y «no debería» expresan una opinión.", ["opinion"]),
      P("Revista Joven", "@revista_joven", "opinion", "Sin duda, la novela gráfica es el género más interesante para los lectores jóvenes.", "«Sin duda… el más interesante» es una valoración, aunque lo diga una revista.", ["opinion"]),
      P("Yaiza", "@yaiza_eco", "opinion", "Creo que las bolsas de plástico deberían prohibirse en todos los comercios.", "«Creo que» y «deberían» indican opinión.", ["opinion"]),
      P("Profe Javier", "@profe_javier", "opinion", "A mi parecer, los debates en clase enseñan más que los exámenes.", "«A mi parecer» indica opinión.", ["opinion"]),
      P("Nira", "@nira_musica", "opinion", "Me parece que el timple suena más alegre que la guitarra.", "«Me parece» indica opinión.", ["opinion"])
    ],
    boletines: [
      BOL("Buenas tardes, Puerto Palabra. Les habla Yurena Martín. ¿Debería prohibirse el móvil en los colegios? Esta tarde, alumnado de sexto de tres colegios debatirá sobre esta pregunta. El debate será en la sala oscura con pantalla gigante, que hoy no proyectará películas. Un grupo defenderá que el móvil distrae y aleja a los compañeros en el recreo; el otro, que bien usado sirve para aprender. Según una encuesta del colegio La Laja, siete de cada diez familias están preocupadas por el uso del móvil. En mi opinión, escuchar a los jóvenes es lo más importante. El debate empieza a las seis.",
        "cine", ["teatro", "colegio"], "El debate es en «la sala oscura con pantalla gigante, que hoy no proyectará películas».", "¡En el Cine Atlántico se proyectan películas en una pantalla gigante!", [
          Q("¿Cuál es el tema del debate?", "Si debería prohibirse el móvil en los colegios", ["Qué película es la mejor", "Cómo se usa una pantalla gigante", "Las notas de sexto"], "Lo plantea al principio como una pregunta."),
          Q("¿Qué postura defiende el segundo grupo?", "Que el móvil bien usado sirve para aprender", ["Que el móvil distrae en el recreo", "Que hay que prohibir los debates", "Que el cine es mejor que el móvil"], "El otro grupo defiende su uso para aprender."),
          Q("¿Cuál de estas frases del boletín es una opinión?", "«Escuchar a los jóvenes es lo más importante»", ["«El debate empieza a las seis»", "«Siete de cada diez familias están preocupadas»", "«Alumnado de tres colegios debatirá»"], "La locutora lo introduce con «En mi opinión».", "Busca la frase que empieza con una expresión de opinión."),
          Q("¿De dónde sale el dato de las familias preocupadas?", "De una encuesta del colegio La Laja", ["De la locutora", "De un estudio europeo", "No se dice"], "«Según una encuesta del colegio La Laja»."),
          Q("¿Por qué la locutora empieza con una pregunta?", "Para captar la atención y presentar el tema", ["Porque no sabe la respuesta", "Para que llamen a la radio", "Porque es un concurso"], "Una pregunta inicial atrae la atención y presenta el tema."),
          Q("¿Qué tipo de texto es, sobre todo, este boletín?", "Informativo, con una opinión de la locutora", ["Un anuncio publicitario", "Un cuento", "Un poema"], "Informa de un evento e incluye una opinión marcada.")
        ]),
      BOL("Radio Onda Volcán, el boletín de las siete. La cofradía de pescadores anuncia que, durante dos meses, no se podrá pescar la vieja para que la especie se recupere: es lo que se llama una veda. Para explicarlo, este sábado organizan una degustación de pescado de temporada en los puestos junto al puerto donde la gente compra fruta, verdura y pescado. «Si cuidamos el mar hoy, mañana seguiremos teniendo pescado», ha declarado el patrón mayor, Domingo Rodríguez. Según el informe de la cofradía, las capturas de vieja han bajado un 25 % en cinco años.",
        "mercado", ["muelle", "museo"], "La degustación es «en los puestos donde la gente compra fruta, verdura y pescado».", "¡En el Mercado del Puerto se compra fruta, verdura y pescado!", [
          Q("¿Qué es una veda, según el boletín?", "Un tiempo en el que no se puede pescar una especie para que se recupere", ["Un tipo de barco de pesca", "Una fiesta de pescadores", "Un pescado de temporada"], "La locutora lo explica justo después de la palabra."),
          Q("¿Cuánto durará la veda de la vieja?", "Dos meses", ["Cinco años", "Un sábado", "Para siempre"], "Durante dos meses."),
          Q("¿Cuál es la causa de la veda?", "Que las capturas de vieja han bajado mucho", ["Que la vieja está muy cara", "Que los pescadores están de vacaciones", "Que el mar está contaminado"], "Las capturas han bajado un 25 % en cinco años.", "Busca el dato del final."),
          Q("¿Quién es Domingo Rodríguez?", "El patrón mayor de la cofradía", ["El locutor", "Un vendedor del mercado", "El alcalde"], "Es el patrón mayor de la cofradía."),
          Q("¿Qué quiere decir la frase de Domingo Rodríguez?", "Que cuidar el mar ahora garantiza pescado en el futuro", ["Que hoy no hay pescado", "Que hay que pescar más rápido", "Que el mar es peligroso"], "Relaciona el cuidado de hoy con el futuro."),
          Q("¿Qué parte del boletín es una cita textual?", "«Si cuidamos el mar hoy, mañana seguiremos teniendo pescado»", ["«durante dos meses»", "«las capturas han bajado un 25 %»", "«este sábado organizan una degustación»"], "Va entre comillas y se atribuye a quien la dijo.")
        ])
    ]
  };

  /** Mezcla el tercer banco con el contenido de cada curso (sin duplicar). */
  function mezclar3() {
    const C = PP.CONTENIDO || {};
    const dedup = (dst, src, clave) => { const vistos = new Set(dst.map(clave)); src.forEach((x) => { const k = clave(x); if (!vistos.has(k)) { vistos.add(k); dst.push(x); } }); };
    Object.keys(B3).forEach((n) => {
      const b = B3[n], c = C[n]; if (!c) return;
      if (c.chismografo && c.chismografo.posts) dedup(c.chismografo.posts, b.posts || [], (x) => x.texto);
      if (c.radio) {
        c.radio.alternativas = c.radio.alternativas || [];
        const base = c.radio;
        dedup(c.radio.alternativas, (b.boletines || []).map((x) => Object.assign({ emisora: base.emisora, locutor: base.locutor }, x)), (x) => x.texto);
      }
    });
  }
  PP.BANCO3 = B3;
  mezclar3();
})();
