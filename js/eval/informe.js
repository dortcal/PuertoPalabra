/* Puerto Palabra · Informe para el profesorado y zona docente (historial local). */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);

  function nivelHTML(c) {
    if (!c.nivel) return '<span class="nivel n0">No valorable<small>' + (c.n ? "pocas evidencias" : "sin evidencias") + "</small></span>";
    const n = { "En inicio": 1, "En desarrollo": 2, "Logrado en el juego": 3, "Destacado en el juego": 4 }[c.nivel];
    return '<span class="nivel n' + n + '"><span class="pips" aria-hidden="true">' + [1, 2, 3, 4].map((k) => "<i class='" + (k <= n ? "on" : "") + "'></i>").join("") + "</span>" + U.esc(c.nivel) + "</span>";
  }

  PP.UI.informe = function () {
    const J = PP.juego; if (J) J.pausar(true);
    const inf = PP.Eval.informe();
    const cont = $("#informe-cuerpo"); cont.innerHTML = "";
    PP.UI.mostrar("pantalla-informe");
    if (!inf) { cont.appendChild(el("p", { text: "Todavía no hay una sesión de juego. Empieza a jugar para generar evidencias." })); return; }
    PP.Eval.archivar();
    const fecha = new Date(inf.inicio);
    const cab = el("section", { class: "inf-cab" }, [
      el("div", { class: "inf-logo", html: '<span class="logo-mini">PUERTO<b>PALABRA</b></span>' }),
      el("div", { class: "inf-datos", html:
        "<h2>Informe de la sesión</h2><p><b>Área:</b> " + U.esc(inf.area) + " · <b>Curso:</b> " + inf.curso + ".º de Primaria (" + inf.ciclo + ".º ciclo)</p>" +
        "<p><b>Código del alumno/a:</b> " + U.esc(inf.codigo) + (inf.alias ? " · <b>Reportero/a:</b> " + U.esc(inf.alias) : "") + "</p>" +
        "<p><b>Fecha:</b> " + fecha.toLocaleDateString("es-ES") + " " + fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) + " · <b>Tiempo de juego:</b> " + U.fmtTiempo(inf.duracionMs) + " · <b>Sesión:</b> " + inf.sesion + "</p>" })
    ]);
    const kpi = (v, t) => el("div", { class: "kpi" }, [el("b", { text: v }), el("span", { text: t })]);
    const kpis = el("section", { class: "inf-kpis" }, [
      kpi(inf.puntos, "puntos de prestigio"), kpi(inf.nMisiones + " / " + PP.MISIONES.length, "misiones superadas"),
      kpi(inf.pctAciertos === null ? "—" : Math.round(inf.pctAciertos * 100) + " %", "aciertos al primer intento"),
      kpi(inf.itemsPrimerIntento, "retos respondidos"), kpi(inf.intentos, "intentos totales"), kpi(inf.ayudas, "pistas usadas")
    ]);
    const aviso = el("section", { class: "inf-aviso", html:
      "<b>Cómo leer este informe.</b> Los niveles son <b>orientativos</b> y solo describen lo observado dentro del juego en esta sesión (se valora el primer intento de cada reto; las pistas reducen el peso del acierto). " +
      "No equivalen a la calificación ni sustituyen las rúbricas oficiales de Canarias, que deben aplicarse con otras evidencias del aula. Ningún criterio se da por dominado a partir del juego. " +
      (PP.Voz.hayEspanol ? "" : "<br><b>Atención:</b> este dispositivo no tenía una voz en español; la comprensión oral (2.1) se ha observado con el texto escrito como apoyo. ") + "Estado de la evidencia: <i>limitada</i> (menos de 4 retos), <i>parcial</i> (4 o más retos de un solo tipo) o <i>consistente en el juego</i> (8 o más retos en al menos dos mecánicas distintas)." });

    // Tabla de criterios
    const tabla = el("table", { class: "inf-tabla" });
    tabla.innerHTML = "<caption>Criterios de evaluación de Lengua Castellana y Literatura (Decreto 211/2022, " + inf.ciclo + ".º ciclo)</caption><thead><tr><th scope='col'>Criterio</th><th scope='col'>Bloque</th><th scope='col'>Evidencias</th><th scope='col'>Acierto</th><th scope='col'>Nivel observado</th><th scope='col'>Estado de la evidencia</th></tr></thead>";
    const tb = el("tbody"); tabla.appendChild(tb);
    inf.criterios.forEach((c) => {
      const tr = el("tr", { class: c.n || c.producciones.length || c.audios.length ? "" : "vacio" });
      tr.innerHTML = "<th scope='row'><b>" + c.code + "</b> " + U.esc(PP.CURRICULO.etiquetas[c.code]) + "</th><td>" + PP.CURRICULO.bloqueEnJuego[c.code] + "</td><td>" + c.n + (c.producciones.length ? " + " + c.producciones.length + " prod." : "") + (c.audios.length ? " + audio" : "") + "</td><td>" + (c.pct === null ? "—" : Math.round(c.pct * 100) + " %") + "</td><td>" + nivelHTML(c) + "</td><td>" + U.esc(c.estado) + "</td>";
      tb.appendChild(tr);
      const det = el("tr", { class: "detalle" }); const td = el("td", { colspan: 6 });
      const partes = [];
      partes.push("<details><summary>Texto oficial del criterio " + c.code + "</summary><p class='literal'>" + U.esc(PP.CURRICULO.criterios[inf.ciclo][c.code]) + "</p></details>");
      if (c.misiones.length) partes.push("<p><b>Trabajado en:</b> " + c.misiones.map((id) => { const m = PP.MISIONES.find((x) => x.id === id); return m ? U.esc(m.titulo) : id; }).join(", ") + (c.mecanicas.length ? " · <b>Mecánicas:</b> " + c.mecanicas.join(", ") : "") + "</p>");
      if (c.errores.length) partes.push("<p><b>Errores detectados:</b></p><ul>" + c.errores.slice(0, 6).map((e) => "<li>" + U.esc(e) + "</li>").join("") + (c.errores.length > 6 ? "<li>… y " + (c.errores.length - 6) + " más (ver registro CSV)</li>" : "") + "</ul>");
      if (c.reintentosOk) partes.push("<p><b>Aprendizaje durante el juego:</b> corrigió " + c.reintentosOk + " respuesta(s) tras la retroalimentación.</p>");
      if (c.n || c.producciones.length) partes.push("<p><b>Recomendación:</b> " + U.esc(c.rec) + "</p>");
      if (c.extension) partes.push("<p class='ext'><b>Limitación del juego:</b> " + U.esc(c.extension) + "</p>");
      td.innerHTML = partes.join(""); det.appendChild(td); tb.appendChild(det);
    });

    // Habilidades y recomendaciones
    const fuertes = inf.criterios.filter((c) => c.nivel && c.pct >= 0.7 && c.n >= 4);
    const mejorar = inf.criterios.filter((c) => c.nivel && c.pct < 0.7);
    const resumen = el("section", { class: "inf-resumen" }, [
      el("div", {}, [el("h3", { text: "Habilidades demostradas en el juego" }), fuertes.length ? el("ul", {}, fuertes.map((c) => el("li", { html: "<b>" + c.code + "</b> " + U.esc(PP.CURRICULO.etiquetas[c.code]) + " (" + Math.round(c.pct * 100) + " %, " + c.n + " retos)" }))) : el("p", { text: "Aún no hay suficientes evidencias con buen resultado (se necesitan al menos 4 retos por criterio)." })]),
      el("div", {}, [el("h3", { text: "Recomendaciones de mejora" }), mejorar.length ? el("ul", {}, mejorar.map((c) => el("li", { html: "<b>" + c.code + "</b> " + U.esc(c.rec) }))) : el("p", { text: "No se detectan dificultades destacables en los criterios con evidencias. Conviene ampliar la observación al resto de criterios." })])
    ]);

    // Producciones
    const prod = el("section", { class: "inf-prod" }, [el("h3", { text: "Producciones guardadas (para valoración docente)" })]);
    if (!inf.producciones.length && !PP.Eval.sesion.audios.length) prod.appendChild(el("p", { text: "No hay producciones en esta sesión." }));
    inf.producciones.forEach((p) => {
      const mis = PP.MISIONES.find((m) => m.id === p.mision);
      prod.appendChild(el("div", { class: "prod" }, [el("p", { class: "prod-cab", html: "<b>" + U.esc(mis ? mis.titulo : p.mision) + "</b> · criterio " + p.crit + " · " + U.esc(p.tipo) }), el("p", { class: "prod-consigna", text: p.consigna || "" }), el("blockquote", { text: p.texto || "(vacío)" }),
        p.comprobaciones ? el("p", { class: "prod-checks", html: p.comprobaciones.map((c) => (c.ok ? "✔ " : "✘ ") + U.esc(c.txt)).join(" · ") }) : null]));
    });
    PP.Eval.sesion.audios.forEach((a) => { if (!a.url) return; prod.appendChild(el("div", { class: "prod" }, [el("p", { class: "prod-cab", html: "<b>Crónica oral</b> · criterio " + a.crit + " · " + a.duracion + " s" }), el("audio", { controls: true, src: a.url })])); });
    if (PP.Eval.sesion.audios.length) prod.appendChild(el("p", { class: "nota", text: "Las grabaciones solo se conservan mientras esta pestaña esté abierta; no se envían a ningún servidor." }));

    const btns = el("div", { class: "inf-btns no-imprimir" }, [
      el("button", { class: "btn btn-primario", type: "button", html: U.icon("print") + " Imprimir / PDF", onclick: () => window.print() }),
      el("button", { class: "btn btn-sec", type: "button", html: U.icon("download") + " Resumen CSV", onclick: () => PP.Eval.descargar("puerto-palabra_" + inf.codigo + "_" + inf.sesion + "_resumen.csv", PP.Eval.csvResumen(), "text/csv;charset=utf-8") }),
      el("button", { class: "btn btn-sec", type: "button", html: U.icon("download") + " Registro CSV", onclick: () => PP.Eval.descargar("puerto-palabra_" + inf.codigo + "_" + inf.sesion + "_registro.csv", PP.Eval.csvRegistro(), "text/csv;charset=utf-8") }),
      el("button", { class: "btn btn-sec", type: "button", html: U.icon("doc") + " Copiar resumen", title: "Copia el resumen (CSV) para pegarlo en una hoja de cálculo", onclick: (e) => { const b = e.currentTarget; try { navigator.clipboard.writeText(PP.Eval.csvResumen().replace(/^\ufeff/, "")).then(() => { b.innerHTML = U.icon("check") + " Copiado"; }, () => { b.textContent = "No se pudo copiar"; }); } catch (err) { b.textContent = "No se pudo copiar"; } } }),
      el("button", { class: "btn btn-sec", type: "button", html: U.icon("download") + " JSON", onclick: () => PP.Eval.descargar("puerto-palabra_" + inf.codigo + "_" + inf.sesion + ".json", PP.Eval.json(), "application/json") }),
      el("button", { class: "btn btn-terc", type: "button", html: U.icon("back") + " Volver al juego", onclick: () => { if (PP.juego.curso) PP.juego.volverAlMundo(); else PP.UI.mostrar("pantalla-inicio"); } })
    ]);
    const pie = el("p", { class: "inf-fuente", text: "Referente curricular: " + inf.fuente + " Los textos de los criterios se reproducen literalmente; las descripciones cortas son paráfrasis del juego." });
    cont.append(btns, cab, kpis, aviso, resumen, tabla, prod, pie);
    cont.scrollTop = 0;
  };

  // ---------------- Zona docente ----------------
  PP.UI.zonaDocente = function () {
    PP.UI.mostrar("pantalla-docente");
    const c = $("#docente-cuerpo"); c.innerHTML = "";
    const h = PP.datos.historial.slice().reverse();
    c.appendChild(el("p", { html: "Aquí se guardan, <b>solo en este navegador</b>, los resúmenes de las sesiones jugadas en este dispositivo. No se envía nada a ningún servidor. Se identifican por el código anónimo que se escribe al empezar." }));
    const filtro = el("input", { type: "search", placeholder: "Filtrar por código (p. ej. 5B-07)", "aria-label": "Filtrar por código" });
    c.appendChild(filtro);
    const tabla = el("table", { class: "inf-tabla hist" }); c.appendChild(tabla);
    const pintar = () => {
      const f = U.norm(filtro.value);
      const filas = h.filter((x) => !f || U.norm(x.codigo).includes(f));
      tabla.innerHTML = "<thead><tr><th>Fecha</th><th>Código</th><th>Curso</th><th>Misiones</th><th>Aciertos</th><th>Puntos</th><th>Criterios con evidencias (acierto)</th><th>Evolución</th></tr></thead>";
      const tb = el("tbody"); tabla.appendChild(tb);
      if (!filas.length) { tb.appendChild(el("tr", {}, [el("td", { colspan: 8, text: "No hay sesiones guardadas todavía." })])); return; }
      filas.forEach((x) => {
        const anterior = PP.datos.historial.filter((y) => y.codigo === x.codigo && y.curso === x.curso && y.fecha < x.fecha).pop();
        const evol = anterior && anterior.pct !== null && x.pct !== null ? Math.round((x.pct - anterior.pct) * 100) : null;
        tb.appendChild(el("tr", { html: "<td>" + new Date(x.fecha).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }) + "</td><td>" + U.esc(x.codigo) + "</td><td>" + x.curso + ".º</td><td>" + x.misiones + "</td><td>" + (x.pct === null ? "—" : Math.round(x.pct * 100) + " %") + "</td><td>" + x.puntos + "</td><td class='peq'>" + Object.keys(x.criterios).map((k) => k + " (" + Math.round(x.criterios[k].pct * 100) + "%)").join(", ") + "</td><td>" + (evol === null ? "—" : (evol >= 0 ? "▲ +" : "▼ ") + evol + " pts") + "</td>" }));
      });
    };
    filtro.addEventListener("input", pintar); pintar();
    const exp = () => {
      const filas = [["fecha", "codigo", "curso", "misiones", "aciertos_pct", "puntos"].concat(PP.CURRICULO.orden.map((k) => "crit_" + k + "_pct"))];
      PP.datos.historial.forEach((x) => filas.push([new Date(x.fecha).toISOString(), x.codigo, x.curso, x.misiones, x.pct === null ? "" : Math.round(x.pct * 100), x.puntos].concat(PP.CURRICULO.orden.map((k) => x.criterios[k] ? Math.round(x.criterios[k].pct * 100) : ""))));
      PP.Eval.descargar("puerto-palabra_historial.csv", "﻿" + filas.map((f) => f.join(";")).join("\n"), "text/csv;charset=utf-8");
    };
    let confirmar = false;
    const borrar = el("button", { class: "btn btn-terc", type: "button", text: "Borrar todos los datos de este dispositivo" });
    borrar.addEventListener("click", () => {
      if (!confirmar) { confirmar = true; borrar.textContent = "¿Seguro? Pulsa otra vez para borrar"; borrar.classList.add("peligro"); return; }
      PP.Store.borrarTodo(); PP.UI.toast("Datos borrados.", "info"); PP.UI.zonaDocente();
    });
    c.appendChild(el("div", { class: "inf-btns" }, [
      el("button", { class: "btn btn-sec", type: "button", html: U.icon("download") + " Exportar historial (CSV)", onclick: exp }),
      PP.Eval.sesion ? el("button", { class: "btn btn-sec", type: "button", html: U.icon("doc") + " Informe de la sesión actual", onclick: () => PP.UI.informe() }) : null,
      borrar
    ]));
    c.appendChild(el("h3", { text: "Qué evalúa cada barrio" }));
    const t2 = el("table", { class: "inf-tabla" });
    t2.innerHTML = "<thead><tr><th>Barrio (bloque de saberes)</th><th>Misión</th><th>Criterios</th><th>Acción observable</th></tr></thead>";
    const tb2 = el("tbody");
    const ACC = { P1: "Elige respuestas adecuadas ante distintas variedades y relaciona palabras equivalentes", P2: "Elige intervenciones que desactivan un conflicto y rechazan prejuicios", P3: "Recoge solo las palabras que cumplen la condición pedida", O1: "Conduce al lugar mencionado en un boletín oral y responde preguntas", O2: "Clasifica mensajes (dato, bulo, opinión) e identifica la pista", O3: "Elige preguntas adecuadas en una entrevista y escribe un titular", O4: "Lee un texto multimodal, infiere el destino y responde", L1: "Ordena las partes de una leyenda y responde sobre sus elementos", L2: "Completa rimas y escribe versos propios", L3: "Recomienda libros según los gustos del lector y escribe una recomendación", T1: "Forma palabras por composición, derivación o sílabas", T2: "Detecta y corrige errores en un texto", T3: "Recoge palabras de una categoría gramatical", T4: "Elige la forma correcta en contexto (ortografía, concordancia…)", F: "Ordena una noticia y escribe la portada" };
    PP.MISIONES.forEach((m) => tb2.appendChild(el("tr", { html: "<td>" + U.esc(PP.BARRIOS[m.barrio].nombre) + " (" + PP.BARRIOS[m.barrio].bloque + ")</td><td>" + U.esc(m.titulo) + "</td><td>" + m.criterios.join(", ") + "</td><td>" + U.esc(ACC[m.id] || "") + "</td>" })));
    t2.appendChild(tb2); c.appendChild(t2);
  };
})();

// Al imprimir, se despliegan los textos oficiales de los criterios
window.addEventListener("beforeprint", () => document.querySelectorAll("#pantalla-informe details").forEach((d) => { d.dataset.abierto = d.open ? "1" : ""; d.open = true; }));
window.addEventListener("afterprint", () => document.querySelectorAll("#pantalla-informe details").forEach((d) => { d.open = d.dataset.abierto === "1"; }));
