/* Puerto Palabra · Registro de evidencias y valoración formativa.
   Principios: se valora el PRIMER intento de cada ítem (los reintentos se registran como aprendizaje);
   las ayudas reducen el peso del acierto; nunca se declara un criterio «dominado».
   Los niveles son orientativos y se refieren solo a lo observado dentro del juego. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U;
  const E = { sesion: null };

  const REC = {
    "1.1": { bajo: "Comparar en clase cómo se nombran objetos cotidianos en Canarias, la Península y América (guagua, autobús, camión…), y conversar sobre por qué ninguna variedad es «mejor» que otra.", alto: "Proponer una pequeña investigación sobre palabras de origen guanche, portugués o americano presentes en el español de Canarias." },
    "2.1": { bajo: "Practicar la escucha activa con audios breves: antes de escuchar, anticipar el tema; durante, anotar quién, qué, dónde y cuándo; después, contrastar con un compañero.", alto: "Escuchar noticias o pódcast infantiles reales y debatir si la información es completa, qué falta y qué opina cada interlocutor." },
    "3.1": { bajo: "Preparar exposiciones orales muy breves con guion visual (inicio, dos ideas, cierre) y ensayarlas en pareja.", alto: "Grabar una crónica o noticia radiofónica en grupo, cuidando entonación, pausas y vocabulario." },
    "3.2": { bajo: "Trabajar fórmulas de cortesía y turnos de palabra con juegos de rol (pedir información, entrevistar, agradecer).", alto: "Organizar entrevistas reales a personas del centro o del barrio, preparando preguntas abiertas y repreguntas." },
    "4.1": { bajo: "Releer buscando datos concretos (subrayar quién, dónde, cuándo) y comprobar las respuestas volviendo al texto.", alto: "Plantear preguntas inferenciales (¿por qué crees que…?, ¿qué pasará si…?) justificando con pistas del texto." },
    "4.2": { bajo: "Analizar carteles, horarios y avisos reales: qué información dan, para quién, y cómo se organiza (títulos, tablas, iconos).", alto: "Comparar dos textos sobre un mismo tema y valorar cuál es más claro, fiable o adecuado para un propósito." },
    "5.1": { bajo: "Escribir textos breves con modelo y lista de revisión (mayúscula inicial, punto final, orden de las ideas).", alto: "Planificar, redactar y revisar noticias completas (titular, entradilla y cuerpo) para un periódico escolar." },
    "6.1": { bajo: "Distinguir en clase hechos y opiniones con ejemplos cercanos y preguntar siempre «¿quién lo dice y cómo lo sabe?».", alto: "Contrastar una misma noticia en varias fuentes, comprobar la fecha y la autoría, y elaborar una guía antibulos para el centro." },
    "7.1": { bajo: "Visitar la biblioteca con pautas para elegir (portada, contracubierta, primeras líneas, género) y llevar un registro de gustos.", alto: "Crear itinerarios lectores personales y recomendar lecturas a otros cursos." },
    "7.2": { bajo: "Compartir lecturas con apoyos: «me gustó porque…», «el personaje que más…», «se lo recomiendo a…».", alto: "Organizar un club de lectura o reseñas en la radio o el blog escolar." },
    "8.1": { bajo: "Leer en voz alta leyendas y cuentos canarios, identificando personajes, lugar y orden de los hechos con apoyo visual.", alto: "Relacionar la leyenda con otras obras (canciones, pinturas, películas) y comparar versiones de una misma historia." },
    "8.2": { bajo: "Crear pareados y adivinanzas a partir de modelos, jugando con rimas y sonidos.", alto: "Escribir poemas o microrrelatos propios recreando un modelo y acompañarlos de ilustración o música." },
    "9.1": { bajo: "Manipular palabras (cambiar género y número, añadir prefijos o sufijos) y formular en voz alta la «regla» descubierta.", alto: "Buscar contraejemplos a las reglas y elaborar un fichero propio de generalizaciones ortográficas y gramaticales." },
    "9.2": { bajo: "Revisar textos en pareja con una lista de comprobación corta y el diccionario a mano.", alto: "Coevaluar textos de compañeros señalando fortalezas y una mejora concreta, usando la terminología adecuada." },
    "10.1": { bajo: "Practicar mensajes en primera persona («yo me siento… cuando…») y reformular expresiones que excluyen o hieren.", alto: "Mediar en conflictos simulados y debatir sobre el uso de un lenguaje inclusivo y respetuoso." }
  };
  // Criterios que necesitan observación en el aula para valorarse de forma completa
  const EXTENSION = {
    "3.1": "La producción oral solo se puede valorar escuchando al alumno o alumna. El juego permite grabar una crónica opcional para que el docente la escuche.",
    "3.2": "El juego simula la interacción eligiendo intervenciones; la interacción oral real debe observarse en el aula.",
    "7.1": "La identidad lectora se construye con lecturas completas a lo largo del tiempo; el juego solo observa estrategias de selección.",
    "7.2": "El juego recoge una recomendación escrita; compartir lecturas en comunidad requiere actividades presenciales.",
    "10.1": "El juego observa la elección de respuestas respetuosas; la gestión real de conflictos debe observarse en situaciones de aula.",
    "8.2": "Los textos creados se guardan para que el docente los valore; el juego no puntúa la calidad literaria.",
    "5.1": "Los textos escritos se guardan para la valoración docente; el juego solo comprueba aspectos formales básicos."
  };
  E.REC = REC; E.EXTENSION = EXTENSION;

  E.nueva = function (perfil) {
    E.sesion = {
      id: "S" + Date.now().toString(36).toUpperCase(),
      inicio: Date.now(), codigo: perfil.codigo || "anónimo", alias: perfil.alias || "", curso: perfil.curso, ciclo: Math.ceil(perfil.curso / 2),
      eventos: [], producciones: [], audios: [], misiones: {}, puntos: 0, fotos: 0, doradas: 0
    };
    return E.sesion;
  };

  /** Registra una evidencia. ev: {crit, ok(1|0.5|0), mecanica, mision, item, respuesta, correcta, ayuda, detalle} */
  E.registrar = function (ev) {
    if (!E.sesion) return;
    const s = E.sesion;
    const clave = (ev.mision || "") + "|" + (ev.item || "");
    const previos = s.eventos.filter((e) => e.clave === clave).length;
    const reg = Object.assign({ t: Date.now(), clave, intento: previos + 1, ayuda: false }, ev);
    reg.ok = typeof ev.ok === "boolean" ? (ev.ok ? 1 : 0) : (ev.ok || 0);
    s.eventos.push(reg);
    return reg;
  };
  /** Anota los modos de juego usados en la sesión (Aventura, Gran Reto, Repaso…) para el informe */
  E.marcarModo = function (nombre) { if (!E.sesion) return; E.sesion.modos = E.sesion.modos || []; if (!E.sesion.modos.includes(nombre)) E.sesion.modos.push(nombre); };
  E.produccion = function (p) { if (E.sesion) E.sesion.producciones.push(Object.assign({ t: Date.now() }, p)); };
  E.audio = function (a) { if (E.sesion) E.sesion.audios.push(Object.assign({ t: Date.now() }, a)); };
  E.misionCompletada = function (id, datos) { if (E.sesion) E.sesion.misiones[id] = Object.assign({ t: Date.now() }, datos); };

  E.valorMision = function (id) {
    const ev = (E.sesion ? E.sesion.eventos : []).filter((e) => e.mision === id && e.intento === 1);
    if (!ev.length) return { n: 0, pct: 1 };
    const sum = ev.reduce((a, e) => a + e.ok * (e.ayuda ? 0.75 : 1), 0);
    return { n: ev.length, pct: sum / ev.length };
  };

  E.resumenCriterio = function (code) {
    const s = E.sesion || { eventos: [], producciones: [], audios: [] };
    const ev = s.eventos.filter((e) => e.crit === code);
    const prim = ev.filter((e) => e.intento === 1);
    const prod = s.producciones.filter((p) => p.crit === code);
    const aud = s.audios.filter((a) => a.crit === code);
    const mecanicas = Array.from(new Set(prim.map((e) => e.mecanica)));
    const misiones = Array.from(new Set(ev.map((e) => e.mision).concat(prod.map((p) => p.mision)).concat(aud.map((a) => a.mision))));
    const n = prim.length;
    const pct = n ? prim.reduce((a, e) => a + e.ok * (e.ayuda ? 0.75 : 1), 0) / n : null;
    const ayudas = prim.filter((e) => e.ayuda).length;
    const reintentosOk = ev.filter((e) => e.intento > 1 && e.ok === 1).length;
    const errores = prim.filter((e) => e.ok < 1 && e.detalle).map((e) => e.detalle);
    let nivel = null;
    if (n >= 3) nivel = pct < 0.5 ? "En inicio" : pct < 0.7 ? "En desarrollo" : pct < 0.9 ? "Logrado en el juego" : "Destacado en el juego";
    let estado;
    if (!n && !prod.length && !aud.length) estado = misiones.length ? "Trabajado sin evidencias" : "No trabajado en esta sesión";
    else if (!n) estado = "Producción registrada: requiere valoración docente";
    else if (n < 4) estado = "Evidencia limitada";
    else if (n >= 8 && mecanicas.length >= 2) estado = "Evidencia consistente en el juego";
    else estado = "Evidencia parcial";
    const rec = REC[code] ? (pct !== null && pct >= 0.7 ? REC[code].alto : REC[code].bajo) : "";
    return { code, n, pct, nivel, estado, mecanicas, misiones, ayudas, reintentosOk, errores, producciones: prod, audios: aud, rec, extension: EXTENSION[code] || "" };
  };

  E.informe = function () {
    const s = E.sesion; if (!s) return null;
    const crits = PP.CURRICULO.orden.map((c) => E.resumenCriterio(c));
    const prim = s.eventos.filter((e) => e.intento === 1);
    const aciertos = prim.reduce((a, e) => a + e.ok, 0);
    return {
      juego: "Puerto Palabra", modos: (s.modos || []).slice(), area: "Lengua Castellana y Literatura", curso: s.curso, ciclo: s.ciclo, codigo: s.codigo, alias: s.alias,
      sesion: s.id, inicio: s.inicio, fin: Date.now(), duracionMs: Date.now() - s.inicio,
      puntos: s.puntos, misiones: s.misiones, nMisiones: Object.keys(s.misiones).length,
      intentos: s.eventos.length, itemsPrimerIntento: prim.length, pctAciertos: prim.length ? aciertos / prim.length : null,
      ayudas: prim.filter((e) => e.ayuda).length, criterios: crits, producciones: s.producciones, audios: s.audios.map((a) => ({ mision: a.mision, crit: a.crit, duracion: a.duracion })),
      fuente: PP.CURRICULO.fuente
    };
  };

  function csvCelda(v) { const t = v == null ? "" : String(v); return /[;"\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; }
  E.csvResumen = function () {
    const inf = E.informe(); if (!inf) return "";
    const filas = [["sesion", "codigo", "curso", "fecha", "criterio", "descripcion_corta", "bloque_en_juego", "evidencias_primer_intento", "porcentaje", "nivel_observado", "estado_evidencia", "ayudas", "misiones"]];
    const fecha = new Date(inf.inicio).toISOString().slice(0, 16).replace("T", " ");
    inf.criterios.forEach((c) => filas.push([inf.sesion, inf.codigo, inf.curso + "º", fecha, c.code, PP.CURRICULO.etiquetas[c.code], PP.CURRICULO.bloqueEnJuego[c.code], c.n, c.pct === null ? "" : Math.round(c.pct * 100), c.nivel || "No valorable", c.estado, c.ayudas, c.misiones.join(" ")]));
    return "﻿" + filas.map((f) => f.map(csvCelda).join(";")).join("\n");
  };
  E.csvRegistro = function () {
    const s = E.sesion; if (!s) return "";
    const filas = [["sesion", "codigo", "curso", "hora", "mision", "mecanica", "criterio", "item", "respuesta", "correcta", "resultado", "intento", "ayuda"]];
    s.eventos.forEach((e) => filas.push([s.id, s.codigo, s.curso + "º", new Date(e.t).toLocaleTimeString("es-ES"), e.mision, e.mecanica, e.crit, e.item, e.respuesta, e.correcta, e.ok, e.intento, e.ayuda ? "sí" : "no"]));
    s.producciones.forEach((p) => filas.push([s.id, s.codigo, s.curso + "º", new Date(p.t).toLocaleTimeString("es-ES"), p.mision, "produccion-" + p.tipo, p.crit, p.consigna || "", p.texto, "", "valoración docente", 1, "no"]));
    return "﻿" + filas.map((f) => f.map(csvCelda).join(";")).join("\n");
  };
  E.json = function () { return JSON.stringify(E.informe(), null, 2); };

  E.descargar = function (nombre, contenido, tipo) {
    try {
      const b = new Blob([contenido], { type: tipo || "text/plain;charset=utf-8" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = nombre;
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      return true;
    } catch (e) { return false; }
  };

  /** Guarda un resumen de la sesión en el historial local (para comparar intentos) */
  E.archivar = function () {
    const inf = E.informe(); if (!inf || !inf.itemsPrimerIntento) return;
    const h = PP.datos.historial;
    const resumen = { sesion: inf.sesion, fecha: inf.inicio, codigo: inf.codigo, curso: inf.curso, puntos: inf.puntos, misiones: inf.nMisiones, pct: inf.pctAciertos, criterios: {} };
    inf.criterios.forEach((c) => { if (c.n) resumen.criterios[c.code] = { n: c.n, pct: c.pct }; });
    const i = h.findIndex((x) => x.sesion === inf.sesion);
    if (i >= 0) h[i] = resumen; else h.push(resumen);
    while (h.length > 60) h.shift();
    PP.Store.guardar();
  };

  PP.Eval = E;
})();
