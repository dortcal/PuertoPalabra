# Puerto Palabra · Reporteros contra el Borrón

Videojuego educativo de **Lengua Castellana y Literatura** para **1.º a 6.º de Educación Primaria**, con referencia curricular en el **Decreto 211/2022 de Canarias**. Forma parte de GAME LAB EDU.

La Banda del Borrón está borrando las palabras de Puerto Palabra, una ciudad canaria ficticia, y la ciudad pierde sus colores. El alumno o alumna es reportero de *El Eco*: recorre la ciudad en moto (vista cenital, mundo abierto), entra en misiones, devuelve el color a los cuatro barrios y, al final, persigue y fotografía al Borrón para la portada.

La estética de «ciudad abierta» se inspira en los juegos de mundo abierto, pero el contenido es apto para Primaria: no hay violencia ni delitos.

## Cómo jugar

- **En línea:** abre la dirección de GitHub Pages del repositorio (ver «Publicar»).
- **Sin conexión:** descarga la carpeta y abre `index.html` con un doble clic. No hace falta servidor ni instalación.
- **Controles:**
  - Ordenador: flechas o WASD para conducir, ESPACIO o ENTER para entrar en misiones y hacer fotos, P o ESC para el móvil (pausa), M para el mapa, G para el GPS, números 1-4 para responder.
  - Tableta y pizarra digital: joystick en pantalla, botón ▶ o cámara y botón GPS. Si pulsas el GPS dos veces, la moto conduce sola.

## Estructura

```
index.html              Pantallas y capas de interfaz
css/estilos.css         Dirección de arte, adaptación de pantalla, impresión del informe
js/core/                Utilidades, guardado local, audio (Web Audio), voz (Web Speech), controles
js/world/               Ciudad (generación y dibujo por trozos), mundo abierto (vehículo, tráfico, GPS)
js/juegos/              Escenas de misión (diálogo, radio, cazabulos, taller, corrector…) y autopista
js/eval/                Registro de evidencias, informe docente, exportación CSV/JSON, historial
js/ui/                  HUD, móvil del juego, ajustes y retratos SVG de los personajes
js/data/curriculo.js    Criterios oficiales (texto literal por ciclo)
js/data/misiones.js     Plantilla de 15 misiones (común a todos los cursos)
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
  - las producciones escritas y orales que debe valorar el docente.
- Exportaciones: impresión o PDF, CSV de resumen, CSV de registro detallado y JSON. La «Zona docente» guarda un historial local por código anónimo y compara cada sesión con la anterior.
- Detalle completo en `docs/matriz-trazabilidad.md`.

## Privacidad

No se piden nombres. El alumnado puede escribir un **código anónimo** (por ejemplo, 5B-07). Todo se guarda en el `localStorage` del navegador del dispositivo y no se envía nada a ningún servidor. Las grabaciones de voz opcionales solo existen mientras la pestaña está abierta. Si el navegador está en modo privado, el progreso no se conserva y el juego lo avisa.

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
- MediaRecorder para la grabación opcional.
- Todos los gráficos (ciudad, vehículos, personajes en SVG), la música, los textos, los personajes y las historias son **originales** de este proyecto.
- Las leyendas canarias son versiones adaptadas de la tradición oral.
- Los títulos de libros reales que aparecen en el club de lectura se citan solo como referencia bibliográfica.
- Licencia recomendada para compartir: CC BY-NC-SA 4.0 para contenidos y MIT para el código (ajústala a las normas de tu centro).

## Limitaciones conocidas

- La interacción y la producción oral (3.1 y 3.2), la identidad lectora (7.1 y 7.2) y la gestión real de conflictos (10.1) solo se observan parcialmente en un juego. El informe lo indica y propone extensiones de aula.
- La calidad de la voz depende del sistema operativo. En Windows y Android suele haber voces en español; en algunos Linux, no.
- Los niveles del informe son orientativos y no sustituyen las rúbricas oficiales de evaluación de Canarias.
