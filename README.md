# Puerto Palabra · Reporteros contra el Borrón

Videojuego educativo de **Lengua Castellana y Literatura** para **1.º a 6.º de Educación Primaria**, con referencia curricular en el **Decreto 211/2022 de Canarias**. Forma parte de GAME LAB EDU.

La Banda del Borrón está borrando las palabras de Puerto Palabra, una ciudad canaria ficticia, y la ciudad pierde sus colores. El alumno o alumna es reportero de *El Eco*: recorre la ciudad en moto (vista cenital, mundo abierto), entra en misiones, devuelve el color a los cuatro barrios y, al final, persigue y fotografía al Borrón para la portada.

La estética de «ciudad abierta» se inspira en los juegos de mundo abierto, pero el contenido es apto para Primaria: no hay violencia ni delitos.

## Modos de juego

Al pulsar «Jugar» se cuenta primero una breve historia (quién es El Borrón y su banda y cuál es la misión del reportero; se puede saltar). Después, tras elegir curso y reportero/a, hay estos modos:

1. **Gran Reto:** diez retos que mezclan los cuatro bloques de Lengua (nueve misiones, al menos dos por bloque, y un minijuego), con racha y estrellas. No hay que conducir.
   **Evaluación por criterios:** el mínimo de misiones que cubre los 13 criterios del juego, más un minijuego.
2. **Solo minijuegos:** se eligen uno, varios o los seis minijuegos y se juegan seguidos.
3. **Repaso por temáticas:** se elige un bloque o un criterio de evaluación y se practican solo sus retos.
4. **Aventura libre:** la ciudad abierta con misiones, barrios que recuperan el color, radio y palabras doradas.

Los modos 1 y 2 reutilizan las pruebas de las misiones (mismas mecánicas y misma evaluación), sin los pasos que exigen conducir, y no cambian el progreso de la ciudad. Todos alimentan el mismo informe docente, que indica el modo usado.

## Misiones

18 misiones por curso en cuatro barrios. Las tres últimas incorporadas:

- **Sílabas y tildes** (Academia de las Tildes): sílabas en 1.er ciclo; sílaba tónica, agudas, llanas y esdrújulas y tilde en 2.º y 3.er ciclo; hiatos, sobresdrújulas y tilde diacrítica en 3.er ciclo.
- **La cinta clasificadora** (Almacén de Palabras): clases de palabras en su frase, con palabras de «doble cara» y racha.
- **El guion secreto** (Cine Atlántico): lectura de un texto original; cada respuesta abre una cifra de la caja fuerte. Preguntas literales, inferenciales y críticas.

## Minijuegos

Seis atracciones repartidas por la ciudad (círculos con el rótulo «MINIJUEGO»). Cada una integra una decisión de Lengua en la mecánica; **solo se evalúa esa decisión en el primer intento**. Fallar la fuerza, la puntería o un salto se repite sin penalización y no cuenta como error.

| Minijuego | Dónde | Mecánica | Decisión evaluada | Criterio |
|---|---|---|---|---|
| Golf del Malpaís | Museo del Mar | Vista trasera con perspectiva, swing con medidor de fuerza | Apuntar a la bandera con el significado o la forma canaria correcta | 1.1 |
| Penaltis contra el Borrón | Radio Onda Volcán | Elegir zona de la portería y chutar | Clasificar un mensaje como dato fiable, bulo u opinión | 6.1 |
| Saltarrimas | Teatro de la Luna | Plataformas de desplazamiento lateral (correr, saltar, esquivar) | Golpear el bloque con la palabra que completa la rima | 8.2 |
| Canastas de palabras | Colegio La Laja | Feria de canastas con medidor de fuerza | Lanzar la palabra a la canasta de su clase en la frase | 9.1 |
| Carrera de pistas | Plaza Mayor | Carrera por la ciudad contra la furgoneta del Borrón | Deducir de una pista escrita a qué lugar ir | 4.1 |
| Sílabas al viento | Almacén de Palabras | Búsqueda por el mapa (como Páginas al viento) | Recoger en orden las sílabas de una palabra, sin coger trozos que no son sílabas | 9.1 |

- En la **Aventura libre** están los seis. Se guardan aparte de las misiones: no cambian el contador de 18 misiones, ni el desbloqueo de la edición final, ni el código de partida.
- En el **Gran Reto** y la **Evaluación por criterios** aparece **un** minijuego al azar en cada partida, y en el **Repaso por temáticas** aparece uno si hay alguno del bloque o del criterio elegido. En estos modos solo salen los cuatro que no requieren conducir (golf, penaltis, Saltarrimas y canastas).
- Modo tranquilo («sin límite de tiempo»): sin medidor de fuerza, enemigos lentos y una furgoneta rival más lenta.
- Controles: teclado (flechas, números, ESPACIO), ratón y botones táctiles grandes para tableta y pizarra digital.

## Guardar y retomar (código de partida)

En el juego, el botón de la casa (o el móvil → *Partida*) muestra un **código** del tipo `PP1-049G-0082-…`. Se puede copiar o descargar. Con él, desde *Continuar con código* en la pantalla de inicio, se recupera el curso, las misiones y estrellas, las palabras doradas, los logros, el vehículo y la posición. El código lleva un control de errores y no contiene datos personales. Recupera el **progreso**; las evidencias detalladas del informe docente se guardan solo en el dispositivo donde se jugó.

## Radio de la moto

En la aventura, la tecla **R** (o el botón de la radio) cambia de emisora: Radio Onda Volcán (música según el barrio), Alisio FM, Timple y Brisa, Roque Rock, Salsa del Atlántico, Radio Teide Clásica, Radio Palabra («¿Sabías que…?») o radio apagada. La música se genera en el navegador; no hay archivos de audio ni licencias de terceros.

## Cómo jugar

- **En línea:** abre la dirección de GitHub Pages del repositorio (ver «Publicar»).
- **Sin conexión:** descarga la carpeta y abre `index.html` con un doble clic. No hace falta servidor ni instalación.
- **Controles:**
  - Ordenador: flechas o WASD para conducir (↑ acelera, ↓ marcha atrás, ← → giran), ESPACIO o ENTER para entrar en misiones y hacer fotos, P o ESC para el móvil (pausa), M para el mapa, G para el GPS, números 1-4 para responder.
  - Tableta y pizarra digital: joystick en pantalla, botón ▶ o cámara y botón GPS. Si pulsas el GPS dos veces, la moto conduce sola.

## Estructura

```
index.html              Pantallas y capas de interfaz
css/estilos.css         Dirección de arte, adaptación de pantalla, impresión del informe
js/core/                Utilidades, guardado local, audio (Web Audio), voz (Web Speech), controles
js/world/               Ciudad (generación y dibujo por trozos), mundo abierto (vehículo, tráfico, GPS)
js/juegos/              minijuegos.js (golf, penaltis, canastas, Saltarrimas) y minijuegos-arte.js (personajes y fondos) · Escenas de misión (ampliacion.js: tildes, cinta clasificadora, guion secreto) (diálogo, radio, cazabulos, taller, corrector…) y autopista
js/eval/                Registro de evidencias, informe docente (PDF), historial
js/modos.js             Gran Reto, Evaluación por criterios, Solo minijuegos y Repaso por temáticas
js/ui/                  HUD, móvil del juego, ajustes y retratos SVG de los personajes
js/data/curriculo.js    Criterios oficiales (texto literal por ciclo)
js/data/misiones.js     Plantilla de 18 misiones (común a todos los cursos)
js/data/minijuegos.js   Definición de los 6 minijuegos y pistas de la Carrera de pistas
js/data/ampliacion.js   Contenidos de las misiones T5, T6 y O5 para cada curso
js/data/cursoN.js       Contenidos de cada curso (1.º a 6.º)
docs/                   Matriz de trazabilidad, guía docente e informe de pruebas
```

La lógica, la presentación y los contenidos están separados. Para cambiar textos o ítems de un curso solo hay que editar `js/data/cursoN.js`; el motor no cambia.

## Publicar en GitHub Pages

1. Crea un repositorio y sube **todo el contenido de esta carpeta** (con `index.html` en la raíz).
2. En GitHub: *Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save*.
3. Espera uno o dos minutos y abre `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

Todas las rutas son relativas y no hay dependencias externas, así que funciona igual en local y en GitHub Pages.

## Evaluación e informe docente

- Cada respuesta se registra con su criterio de evaluación. Solo cuenta el primer intento, las pistas reducen el peso del acierto y los reintentos aparecen como aprendizaje.
- El informe (desde el móvil del juego o la «Zona docente») muestra:
  - por cada criterio: evidencias, porcentaje, nivel observado, estado de la evidencia, errores detectados, recomendación y texto oficial;
  - el desglose por tipo de reto y la limitación de cada criterio en el juego.
- **Solo se incluyen actividades que el programa puede evaluar automáticamente.** El juego no contiene escritura libre (titulares, versos, recomendaciones) ni grabaciones de voz: esas producciones deben trabajarse y valorarse en el aula.
- Exportación: el informe se descarga en PDF (cuadro de impresión → «Guardar como PDF») con un recuadro arriba para que el docente escriba el nombre del alumno y su curso. La «Zona docente» guarda un historial local por código anónimo y compara cada sesión con la anterior.
- Detalle completo en `docs/matriz-trazabilidad.md`.

## Privacidad

No se piden nombres. El alumnado puede escribir un **código anónimo** (por ejemplo, 5B-07). Todo se guarda en el `localStorage` del navegador del dispositivo y no se envía nada a ningún servidor. El juego no usa el micrófono ni pide permisos del navegador. Si el navegador está en modo privado, el progreso no se conserva y el juego lo avisa.

## Accesibilidad (DUA)

- Narración en voz alta (síntesis del navegador).
- Tamaño de texto configurable, alto contraste y modo de movimiento reducido (también respeta `prefers-reduced-motion`).
- Modo sin límite de tiempo y ayudas progresivas.
- Conducción sencilla o clásica, y conducción asistida con GPS.
- Subtítulos en la radio.
- Volumen de música y de efectos por separado, y botón de silencio.
- Controles de teclado, ratón y táctil, con objetivos de pulsación de 44 px o más.
- La información nunca depende solo del color: los aciertos y errores llevan icono y texto.

## Tecnologías y licencias

- HTML5, CSS3 y JavaScript sin bibliotecas ni frameworks.
- Canvas 2D para la ciudad y la autopista.
- Web Audio API: toda la música y los efectos se sintetizan en el navegador.
- Web Speech API para la narración. Si el dispositivo no tiene voz en español, el texto siempre se muestra.
- Todos los gráficos (ciudad, vehículos, personajes en SVG), la música, los textos, los personajes y las historias son **originales** de este proyecto.
- Las leyendas canarias son versiones adaptadas de la tradición oral.
- Los títulos de libros reales que aparecen en el club de lectura se citan solo como referencia bibliográfica.
- Licencia recomendada para compartir: CC BY-NC-SA 4.0 para contenidos y MIT para el código (ajústala a las normas de tu centro).

## Limitaciones conocidas

- **Criterios fuera del juego:** la producción oral (3.1) y compartir la experiencia lectora (7.2) no se pueden evaluar automáticamente, por lo que no aparecen en el juego ni en el informe y deben valorarse en el aula. La producción escrita (5.1) solo se observa a través de la ordenación de una noticia, y la creación literaria (8.2) a través del reconocimiento de rimas.
- La interacción oral (3.2), la identidad lectora (7.1) y la gestión real de conflictos (10.1) solo se observan parcialmente en un juego. El informe lo indica y propone extensiones de aula.
- La calidad de la voz depende del sistema operativo. En Windows y Android suele haber voces en español; en algunos Linux, no.
- Los niveles del informe son orientativos y no sustituyen las rúbricas oficiales de evaluación de Canarias.

## Variedad de actividades

Cada curso tiene bancos de actividades ampliados (`js/data/banco.js`) que se mezclan con el contenido base. En cada misión el juego elige un subconjunto distinto de preguntas, textos y perfiles y no repite lo ya visto hasta agotar el banco (memoria en el navegador, clave `puertoPalabra.vistos`). Los textos de lectura de las misiones (boletín de radio, cartel, leyenda, noticia) son fijos; varían las preguntas sobre ellos.
