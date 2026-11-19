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
| Victoria, fin y reinicio | Ejecutado ✔ | Misión final bloqueada hasta 10 misiones; persecución y portada; repetición de misiones |
| Casos límite | Ejecutado ✔ | Doble clic (un solo registro); salir de una misión desde una escena y desde un paso del mundo; abrir y cerrar el móvil; modo sin límite de tiempo en la autopista |
| Guardado y recarga | Ejecutado ✔ | Tras recargar se conservan el perfil, las misiones y el historial (localStorage) |
| Informe y exportaciones | Ejecutado ✔ | Informe con 15 criterios; CSV de resumen (16 filas), CSV de registro y JSON válidos; impresión a PDF revisada visualmente |
| Adaptación a pantallas | Ejecutado ✔ | Capturas revisadas en 5 resoluciones; interfaz ampliada en pantallas grandes |
| Tamaño de texto y contraste | Ejecutado ✔ | Texto «muy grande» (22,4 px de base); alto contraste aplicado |
| Rendimiento | Parcial | ~60 fps medidos en Chrome sin GPU. **No medido en tabletas ni pizarras reales** |
| Audio y voz | No verificable aquí | El navegador de pruebas no reproduce sonido ni tiene voces en español. El juego detecta esa situación y muestra los textos (comprobado). Hay que escuchar la música, los efectos y la narración en un equipo real |
| Grabación de voz (3.1) | No verificado | Requiere micrófono y permiso del usuario. El camino «Saltar» sí está probado |
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

## Pendiente de comprobar en el aula

- Sonido, música y narración en los equipos del centro (Windows, iPad, Android, pizarra).
- Fluidez en tabletas de gama baja.
- Grabación de voz con el micrófono de la tableta.
- Prueba con alumnado real: tiempos, comprensión de las consignas en 1.º y dificultad de la conducción.
