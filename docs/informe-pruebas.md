# Informe de pruebas · Puerto Palabra

Fecha: 19/11/2026. Entorno: Google Chrome (sin interfaz gráfica) controlado con Playwright en Linux, con resoluciones de 1280×760, 1366×768, 1180×820 (táctil), 820×1180 (tableta en vertical) y 1920×1080 (pizarra digital).

## Resumen

| Aspecto | Estado | Cómo se comprobó |
|---|---|---|
| Sintaxis JS (20 archivos) | Ejecutado ✔ | `node --check` en todos los archivos |
| Integridad de contenidos (6 cursos) | Ejecutado ✔ | Script que verifica que cada misión tiene sus datos, los destinos existen en el mapa, las respuestas correctas están en rango, las piezas del taller forman la palabra y las marcas del corrector son válidas. Se detectaron y corrigieron 2 errores («panería» y una marca mal formada) |
| Carga e inicio | Ejecutado ✔ | Pantalla de inicio, perfil, cinemática, bienvenida |
| 15 misiones × 6 cursos (90 recorridos) | Ejecutado ✔ | Arnés `pruebas/autoplay.js`: pulsa los botones reales de cada escena, conduce hasta destinos y fichas, hace las fotos con la tecla ESPACIO. Las 90 misiones terminan con su pantalla de resultado |
| Errores de consola | Ejecutado ✔ | 0 errores en los 6 recorridos completos tras las correcciones |
| Controles de teclado | Ejecutado ✔ | Conducción con flechas (modo sencillo y clásico), ESPACIO/ENTER, P/ESC (móvil y pausa), números en las opciones, flechas y ESPACIO en la autopista |
| Controles táctiles | Ejecutado (emulado) ✔ | Joystick con eventos de puntero táctil; los mandos aparecen automáticamente en dispositivos táctiles. **No probado en una tableta física** |
| Reglas y puntuación | Ejecutado ✔ | Estrellas según los aciertos al primer intento; puntos; desbloqueo de vehículos; logros; restauración del color por barrio |
| Victoria, fin y reinicio | Ejecutado ✔ | Misión final bloqueada hasta completar las demás (antes, 10) y seguida del final de la aventura; persecución y portada; repetición de misiones |
| Casos límite | Ejecutado ✔ | Doble clic (un solo registro); salir de una misión desde una escena y desde un paso del mundo; abrir y cerrar el móvil; modo sin límite de tiempo en la autopista |
| Guardado y recarga | Ejecutado ✔ | Tras recargar se conservan el perfil, las misiones y el historial (localStorage) |
| Informe y exportaciones | Ejecutado ✔ | Informe con 15 criterios; CSV de resumen (16 filas), CSV de registro y JSON válidos; impresión a PDF revisada visualmente |
| Adaptación a pantallas | Ejecutado ✔ | Capturas revisadas en 5 resoluciones; interfaz ampliada en pantallas grandes |
| Tamaño de texto y contraste | Ejecutado ✔ | Texto «muy grande» (22,4 px de base); alto contraste aplicado |
| Rendimiento | Parcial | ~60 fps medidos en Chrome sin GPU. **No medido en tabletas ni pizarras reales** |
| Audio y voz | No verificable aquí | El navegador de pruebas no reproduce sonido ni tiene voces en español. El juego detecta esa situación y muestra los textos (comprobado). Hay que escuchar la música, los efectos y la narración en un equipo real |
| Publicación en GitHub Pages | No verificado | Las rutas son relativas y el juego funciona abriendo el archivo directamente (probado con `file://`). No se ha publicado en un repositorio |
| Validador estático de la skill | Ejecutado | 0 errores. Sus 4 avisos son falsos positivos porque el JS y el CSS están en archivos externos |

## Ampliación: modos de juego, código de partida, radio y menú (19/11/2026)

Ejecutado en Chrome (Playwright, modo sin pantalla):

- Gran Reto completo (8 retos) en 1.º y 3.º; Repaso del criterio 9.1 en 1.º y 3.º; informe con el modo indicado; 0 errores de consola.
- Aventura libre: 15 misiones completas en 4.º y pruebas de límites (misión final bloqueada, doble clic, abandono, pausa, modo tranquilo).
- Código de partida: generación, copia, recuperación en un navegador sin datos, rechazo de códigos vacíos, incompletos o con un carácter cambiado, aceptación en minúsculas y con espacios, y recuperación idéntica (el código regenerado coincide).
- Botón de menú del juego: diálogo, pausa, Esc, volver y salir; pestaña *Partida* del móvil.
- Radio: ocho emisoras recorridas con la tecla R; cada una cambia de pista y de cartel.

No verificado: que el audio de las emisoras suene bien en altavoces reales (solo se comprobó que las pistas se programan sin errores), la copia al portapapeles fuera de Chrome y el uso en tableta o pizarra digital reales.

## Ampliación: Sílabas y tildes, La cinta clasificadora y El guion secreto (19/11/2026)

Ejecutado en Chrome (Playwright, modo sin pantalla):

- Las tres misiones completas en los seis cursos, acertando y con un 40 % de errores deliberados (1.º, 3.º y 5.º). Sin errores de consola.
- Aventura libre completa con 18 misiones en 2.º y 5.º; Gran Reto y Repaso del criterio 9.1 en 5.º (incluyen las nuevas misiones).
- Caja que se escapa de la cinta (registra «no clasificó a tiempo» y vuelve a salir); modo tranquilo (la caja se detiene a mitad de la cinta); salir a mitad de la actividad.
- Informe: desglose por tipo de reto y columna `tipo_de_reto` en el CSV. Los códigos de partida generados antes de la ampliación se siguen cargando.
- Revisión visual de las tres escenas en capturas a 1180×820.

No verificado: rendimiento de la animación de la cinta en tabletas o pizarras digitales reales y lectura en voz alta de las sílabas con voces reales.

## Errores encontrados y corregidos durante las pruebas

1. **Autopista bloqueada al terminar**: un conflicto de nombres hacía que la misión no se cerrara. Corregido.
2. **Moto atascada contra el bordillo**: al girar parada, la moto rozaba la acera y perdía velocidad en cada fotograma. Ahora se separa suavemente de los bordes y solo frena ante un choque real.
3. **Coches que bloqueaban el paso**: el choque frenaba en seco. Ahora el empuje es suave y lateral, para poder esquivar.
4. **Joystick sin aparecer en pantallas táctiles** hasta el primer toque. Ahora se detecta el tacto al cargar.
5. **Estilo de los avisos de logro** chocaba con el de la lista de logros. Corregido.
6. **Contenidos**:
   - una palabra mal formada en el taller de 5.º;
   - un ítem con una explicación de acentuación imprecisa en 4.º («cómics» no es esdrújula);
   - un ítem de rima confuso en 4.º, que se ha eliminado.

- Con el código de jugador por defecto («anónimo») el progreso se guardaba bajo otro nombre al volver a jugar (se perdían las letras con tilde). Corregido.
- Con los controles clásicos la moto arrancaba mirando a una pared. Ahora arranca orientada a la calle despejada.

- El diálogo de «salir al menú» compartía nombre de clase CSS con las conversaciones de las misiones y las deformaba. Corregido (renombrado).
- Los avisos flotantes podían quedar encima del informe. Ahora se limpian al abrirlo.

## Retirada de actividades no evaluables (19/11/2026)

Se eliminaron del juego la escritura libre (titular de O3, versos de L2, recomendación de L3, portada de F), la grabación de voz (O3), la elección libre de lectura sin respuesta correcta (L3) y el apartado «Producciones guardadas» del informe y del CSV.

Comprobado en Chrome automatizado:
- Las 18 misiones completadas en los cursos 1.º a 6.º, sin errores de consola.
- Gran Reto y Repaso por temáticas (bloque III) jugados hasta la pantalla final en 4.º.
- Informe, CSV de resumen y de registro, JSON y recarga con persistencia.
- Pruebas de límites (salir de misión, doble clic, modo tranquilo, pausa).
- Gran Reto de 10 retos y «Evaluación por criterios» (10-11 retos, cubre los 13 criterios) jugados hasta la pantalla final en 4.º con el autojugador de pruebas, 0 errores de consola; el informe indica el modo. Duración real con alumnado: sin medir.
- Los criterios 3.1 y 7.2 ya no figuran en el juego, el informe, el CSV ni el JSON (13 criterios).
- Variedad de actividades: los bancos de cada curso se mezclan al cargar y cada misión elige un subconjunto distinto sin repetir lo ya visto hasta agotar el banco. Verificado en Chrome: 6 cursos × 18 misiones, Gran Reto, Repaso y pruebas de límites sin errores de consola. En una ejecución puntual del Gran Reto el guion de prueba agotó su tiempo límite; repetido, llegó a la pantalla final (3 de 4 repeticiones completadas dentro del tiempo).

## Minijuegos (20/11/2026)

Ejecutado en Chrome (Playwright), con el autojugador de pruebas (`PP.MJ.auto` resuelve la decisión correcta) y un primer intento manual con teclado:

- Los 6 minijuegos jugados hasta el final en la Aventura libre en 1.º, 2.º (penaltis y canastas), 3.º y 6.º: 0 errores de consola; evidencias registradas con su criterio (1.1, 6.1, 8.2, 9.1, 4.1, 9.1) y solo un evento por ítem.
- Un primer intento manual erróneo (medidor de fuerza con ESPACIO) queda registrado como error y los siguientes no cuentan como primer intento.
- Tras terminar: insignia ✔ y estrellas en el marcador; el contador «Misiones: x / 18» no cambia (los minijuegos se guardan aparte).
- Gran Reto (10 retos, uno de ellos minijuego), Evaluación por criterios (10-12 con un minijuego) y Repaso del bloque III («3 retos + 1 minijuego») jugados hasta la pantalla final en 4.º.
- Botón Salir de cada minijuego en vertical 768×1024 con pantalla táctil: vuelve a la ciudad sin dejar la capa abierta. Mantener pulsado el botón táctil ▶ en Saltarrimas.
- Modo tranquilo: la primera pulsación de ESPACIO lanza sin medidor.
- Informe: los minijuegos aparecen como «(minijuego)» en «Trabajado en», el contador pasa a «x / 24 misiones y minijuegos» y el CSV incluye sus filas.
- Regresión: prueba completa de 2.º y 5.º (18 misiones) y pruebas de límites sin errores.
- Corregido durante las pruebas: los marcadores de misión «robaban» la pulsación de acción cuando una ficha caía junto a ellos (ahora no se activan durante una misión); error al dibujar el golf antes del primer hoyo; la bola de canastas no reaparecía tras fallar.

No verificado: jugabilidad y dificultad con alumnado real (tiempos, frustración con el medidor), rendimiento en tabletas o pizarras antiguas, sonido real y pantallas táctiles físicas (solo emuladas).

## Arte y animaciones de los minijuegos (20/11/2026)

- Nuevo módulo `js/juegos/minijuegos-arte.js` (dibujo vectorial original): reportero/a animado de perfil y de espaldas, palmeras, tabaibas, volcán, focos, balones con giro.
- Efectos comunes: presentación animada de cada minijuego, rótulos de celebración (¡GOOOL!, ¡CANASTA!, ¡HOYO EN UNO!, ¡RIMA!), puntos flotantes, sacudida de pantalla, confeti y estrellas, cuenta atrás en la Carrera de pistas. Con «reducir movimiento» se acortan o se quitan.
- Comprobado en Chrome con capturas en 2.º, 3.º y 4.º: golf (swing, estela, banderas ondeando), penaltis (gradas que celebran, red que se deforma, parada), canastas (feria con noria, red que se estira, aro que vibra), Saltarrimas (paralaje, polvo, aplastamiento de enemigos). Los 6 minijuegos completos en 5.º, Gran Reto, Repaso del bloque III y la prueba completa de 3.º sin errores de consola.
- No verificado: rendimiento en tabletas o pizarras antiguas (más dibujo por fotograma que antes).

## Solo minijuegos, informe solo en PDF y más variedad (20/11/2026)

- **Modo «Solo minijuegos»** (menú de jugar): pantalla con los seis minijuegos para elegir uno, varios o todos. Ejecutado ✔ en Chrome: los seis seguidos (también Carrera de pistas y Sílabas al viento, conduciendo) en 4.º, y solo J5+J6 en 2.º con emulación táctil; pantalla final, informe y «Elegir otros minijuegos» correctos, 0 errores de consola. Vistas revisadas a 1280, 820 y 390 px de ancho.
- **Informe:** se eliminan los botones y las funciones de CSV de resumen, CSV de registro, copiar resumen y JSON. Queda «Descargar informe en PDF» (impresión del navegador) con un recuadro superior en blanco para nombre y curso/grupo; se fijan márgenes A4 de 12 mm (`@page`). PDF generado y revisado visualmente. La exportación del historial CSV de la «Zona docente» se mantiene aparte.
- **Imprenta sin borrones:** antes cada curso tenía un solo texto. Ahora hay 4 por curso (el original y 3 nuevos, `js/data/banco2.js`) y se elige uno distinto cada vez: comprobado que en 4 partidas seguidas salen 4 textos distintos (cursos 1 y 4). Tocar 1 o 2 palabras bien escritas ya no cuenta como error; solo se registra si se marcan 3 o más.
- **Más variedad:** «Operación Tilde» y «Sílabas al viento» pasan de 21-27 a 41-47 palabras por curso (sílabas y acentos validados con una comprobación automática de las reglas de acentuación) y «Rimas del teatro» de 8 a 12 versos por curso.
- No reproducido: la valoración de una Imprenta con 6 aciertos de 7. Con 6 aciertos a la primera y 1 sin detectar el cálculo da 86 % (2 estrellas); 1 estrella solo sale si varias correcciones se eligen mal a la primera (cuentan la mitad). Si vuelve a ocurrir, conviene anotar el curso y el texto.
- Sigue con contenido fijo (no rota entre partidas): los diálogos P1, P2 y O3, el boletín de radio, el cartel, la leyenda y la noticia final. Las preguntas asociadas sí rotan.

## Historia de presentación, más Chismógrafo y más Radio Volcán (20/11/2026)

- **Historia al pulsar «Jugar»** (`js/ui/historia.js`): 5 pantallas con arte original (la ciudad, El Borrón, la Banda del Borrón con un miembro por barrio —Sordina, Bulín, Revoltijo y Tachón—, Carmela y El Eco, y la misión del reportero). Se puede narrar (botón Escuchar), moverse con Anterior/Siguiente o con las flechas, y saltar con el botón o con Esc. Respeta «reducir movimiento». Comprobado en Chrome a 1280 y 390 px de ancho, sin errores de consola. Si ya se ha visto, la cinemática de la Aventura libre se reduce a su viñeta final.
- **Chismógrafo:** de 11-12 a 26-27 mensajes por curso (9-10 fiables, 9-10 bulos y 8 opiniones; `js/data/banco3.js`). Comprobado que en 3 partidas seguidas salen mensajes distintos. Además, las pistas falsas que se ofrecen ya no pueden coincidir con otra pista válida del mensaje.
- **Radio Onda Volcán:** de 1 a 3 boletines por curso, cada uno con su destino y de 5 a 6 preguntas (criterio 2.1, con las inferenciales y de intención en 3.º–6.º). Cada partida elige un boletín distinto y mantiene el mismo en los tres pasos de la misión; comprobado en 2.º y 5.º con 3 partidas seguidas (3 destinos distintos). Los destinos y distractores existen en el mapa de la ciudad.
- Pruebas automáticas adaptadas al paso nuevo de la historia; regresión en cursos 3 y 6, límites y «Solo minijuegos»: 0 errores.
- No verificado: la narración de la historia con voz (depende de que el dispositivo tenga voz en español) y la revisión pedagógica de los textos nuevos por un docente.

## Rimas con poetas, Autopista con contexto, más bancos, piloto y tráfico (20/11/2026)

- **Rimas perdidas:** además de Olga sale uno de 5 poetas con personalidad propia, frases de ánimo y de pista distintas (`PP.POETAS`, `js/data/banco4.js`). Se elige con rotación por curso para que no se repita. Banco de 12 a 16 versos por curso.
- **Club de lectura:** estantería de 8 libros (los de los 3 perfiles de la partida más otros al azar), lomos, contracubiertas y texto del lector más grandes, y más perfiles y libros por curso.
- **Autopista del Borrón:** pantalla de contexto antes de arrancar (persigues la furgoneta del Borrón; cómo se elige el carril), nombre del carril visible y resaltado, velocidad menor y fase de lectura con cámara lenta (sin ella en modo tranquilo). Banco de 32 a 37 retos por curso.
- **La cinta clasificadora:** banco de 35 a 38 palabras por curso.
- **Modo aventura, tráfico:** temporizadores antibloqueo (un coche que espera a otro, o al jugador, más de 2,5-3 s se aparta o avanza con pitido). Medido con simulación: 0 atascos en 6 y 20 minutos de simulación y con la moto aparcada 2 minutos.
- **Modo aventura, «llévame a la misión»:** nuevo piloto automático (seguimiento de ruta con curvas y velocidad según la curva). Medido en 12 destinos: 12/12 alcanzados y 0 choques fuertes (antes 11/12 y 47 choques).
- **Pruebas:** completo.py en los cursos 1 a 6, limites.py (incluye pantalla de contexto de la autopista y arranque con Enter), «Solo minijuegos», Gran Reto y Repaso por bloque: 0 errores de consola.
- No verificado: dificultad real de la autopista y de la conducción con alumnado, rendimiento en tabletas o pizarras, y revisión pedagógica de los textos nuevos.

## Créditos, caída de la banda y final de la aventura (21/11/2026)

- **Portada:** «Diseñado por David OZC», insignias CC BY-NC-ND (dibujos SVG propios, sin conexión) y «© David 2026 · Uso gratuito en centros educativos». Comprobado con capturas a 1280×760, 768×1024 y 390×800 (sin solapes con el menú). Se repite en la pantalla final y al pie del informe.
- **Banda por zonas:** detención de Sordina (P2), Bulín (O2), Revoltijo (L1) y Tachón (T2) la primera vez que se completa cada misión; no se repite al rejugar. Estado visible en el móvil.
- **Final:** la «Edición especial» queda bloqueada hasta completar las otras 17 (antes, 10); aviso previo con «Salir»; epílogo, resumen y resultados; botón «Ver informe docente» y vuelta a la pantalla final; salir al menú de modos o al inicio.
- `pruebas/final.py` (cursos 2, 4 y 5): juega toda la aventura con el autoplay y comprueba bloqueo inicial, las 4 detenciones en orden, desbloqueo, aviso y botón «Salir», pantalla final, informe con créditos, logros y salida: 0 errores de consola. Regresión (`completo.py` cursos 1, 3 y 6, `limites.py`, «Solo minijuegos», Gran Reto y Repaso): 0 errores.
- No verificado: la narración del final con voz real, y el aspecto en tabletas o pizarras. Limitación conocida: el código de partida no guarda los minijuegos, por lo que tras cargar un código el resumen final puede mostrar menos minijuegos de los jugados.
- Las insignias CC son dibujos propios; si se quieren los archivos gráficos oficiales de Creative Commons, se pueden sustituir en `js/ui/creditos.js`.

## Pendiente de comprobar en el aula

- Sonido, música y narración en los equipos del centro (Windows, iPad, Android, pizarra).
- Fluidez en tabletas de gama baja.
- Prueba con alumnado real: tiempos, comprensión de las consignas en 1.º y dificultad de la conducción.
