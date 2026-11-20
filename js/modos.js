/* Puerto Palabra · Modos de juego.
   Tras elegir curso y reportero/a hay tres modos:
     1. Gran Reto: 10 retos que mezclan los cuatro bloques de Lengua (sin conducir).
     1b. Evaluación por criterios: el mínimo de retos que cubre los 13 criterios del juego.
     2. Repaso por temáticas: se elige un bloque o un criterio y se practica solo eso.
     3. Aventura en la ciudad: el mundo abierto (ver main.js).
   Los retos reutilizan las pruebas de las misiones (mismas mecánicas, mismos contenidos y misma
   evaluación), pero sin los pasos que exigen conducir. No cambian el progreso de la ciudad. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);
  const Modos = {};
  const PASOS_DE_MUNDO = ["ir", "paginas", "persecucion"];
  const BLOQUES = ["I", "II", "III", "IV"];
  const COLOR = { I: "#ffb547", II: "#3fd0e0", III: "#c48cff", IV: "#ff7a45" };
  const bloqueDe = (m) => PP.BARRIOS[m.barrio].bloque;
  const pasosSinMundo = (m) => m.pasos.filter((p) => !PASOS_DE_MUNDO.includes(p.tipo));
  const retosDisponibles = () => PP.MISIONES.filter((m) => !m.final && pasosSinMundo(m).length);
  Modos.retosDisponibles = retosDisponibles;

  // ---------------- Selección de modo ----------------
  Modos.abrir = function () {
    const J = PP.juego, M = PP.Mundo;
    J.modo = "menu"; M.activo = false; M.modoAtraccion = true; M.limpiarObjetivos();
    PP.Audio.motor(0, false); PP.Audio.musica("menu");
    $("#modos-saludo").innerHTML = "Hola, <b>" + U.esc(J.alias) + "</b> · " + J.curso + ".º de Primaria. Elige cómo quieres jugar:";
    const r = $("#modos-rejilla"); r.innerHTML = "";
    const tarjeta = (clase, icono, titulo, texto, etiqueta, f) => el("button", { class: "modo-tarjeta " + clase, type: "button", onclick: () => { PP.Audio.sfx("inicio"); f(); }, html:
      '<span class="modo-ico">' + U.icon(icono) + '</span><span class="modo-tit">' + U.esc(titulo) + '</span><span class="modo-txt">' + U.esc(texto) + '</span><span class="modo-etq">' + U.esc(etiqueta) + "</span>" });
    r.append(
      tarjeta("modo-reto", "trophy", "Gran Reto", "Diez retos que mezclan los cuatro bloques de Lengua: lenguas, comunicación, literatura y reflexión sobre la lengua.", "Todos los bloques · sin conducir", () => Modos.empezarGranReto()),
      tarjeta("modo-eval", "doc", "Evaluación por criterios", "Un recorrido que cubre todos los criterios del juego, para obtener un informe completo. Se puede dejar a medias.", "Informe completo · sin conducir", () => Modos.empezarEvaluacion()),
      tarjeta("modo-tema", "book", "Repaso por temáticas", "Elige un bloque o un criterio concreto y practica solo eso hasta dominarlo.", "Tú eliges el tema", () => Modos.abrirTematica()),
      tarjeta("modo-aventura", "map", "Aventura libre", "Conduce por la ciudad abierta, entra en las misiones y devuelve el color a los cuatro barrios.", "Mundo abierto", () => PP.juego.iniciarAventura())
    );
    PP.UI.mostrar("pantalla-modos");
  };

  // ---------------- Repaso por temáticas ----------------
  Modos.abrirTematica = function () {
    const J = PP.juego, C = PP.CURRICULO;
    const cont = $("#tema-cuerpo"); cont.innerHTML = "";
    const detalle = el("div", { id: "tema-detalle", class: "tema-detalle", "aria-live": "polite" });
    const rej = el("div", { class: "bloques-rejilla", role: "group", "aria-label": "Bloques de contenidos" });
    const botones = {};
    BLOQUES.forEach((b) => {
      const n = retosDisponibles().filter((m) => bloqueDe(m) === b).length;
      const btn = el("button", { class: "bloque-tarjeta", type: "button", "aria-pressed": "false", html:
        "<small>Bloque " + b + "</small><b>" + U.esc(C.bloques[b].nombre) + "</b><span>" + n + (n === 1 ? " reto" : " retos") + "</span>" });
      btn.style.setProperty("--c", COLOR[b]);
      btn.addEventListener("click", () => { PP.Audio.sfx("clic"); Object.values(botones).forEach((x) => { x.classList.remove("sel"); x.setAttribute("aria-pressed", "false"); }); btn.classList.add("sel"); btn.setAttribute("aria-pressed", "true"); pintarDetalle(b); });
      botones[b] = btn; rej.appendChild(btn);
    });
    function pintarDetalle(b) {
      detalle.innerHTML = ""; detalle.style.setProperty("--c", COLOR[b]);
      const del = retosDisponibles().filter((m) => bloqueDe(m) === b);
      detalle.appendChild(el("h3", { text: "Bloque " + b + ": " + C.bloques[b].nombre }));
      detalle.appendChild(el("button", { class: "btn btn-primario btn-grande-tema", type: "button", html: U.icon("play") + " Todo el bloque · " + del.length + (del.length === 1 ? " reto" : " retos"), onclick: () => Modos.empezarTema({ bloque: b }) }));
      detalle.appendChild(el("p", { class: "nota", text: "O practica un solo criterio de evaluación:" }));
      const lista = el("div", { class: "criterios-lista" });
      C.orden.filter((c) => C.bloqueEnJuego[c] === b).forEach((c) => {
        const n = retosDisponibles().filter((m) => m.criterios.includes(c)).length;
        lista.appendChild(el("button", { class: "btn btn-sec criterio-btn", type: "button", disabled: !n, onclick: () => Modos.empezarTema({ criterio: c }), html:
          "<b>" + c + "</b><span>" + U.esc(C.etiquetas[c]) + "</span><small>" + (n ? n + (n === 1 ? " reto" : " retos") : "No se evalúa en el juego") + "</small>" }));
      });
      detalle.appendChild(lista);
    }
    cont.append(rej, detalle);
    PP.UI.mostrar("pantalla-tematica");
  };

  // ---------------- Secuencias de retos ----------------
  Modos.empezarGranReto = function () {
    const por = {}; BLOQUES.forEach((b) => { por[b] = U.shuffle(retosDisponibles().filter((m) => bloqueDe(m) === b)); });
    // Dos retos por bloque y dos más (de bloques distintos al azar) hasta completar 10.
    const cuota = {}; BLOQUES.forEach((b) => { cuota[b] = Math.min(2, por[b].length); });
    let extra = 2;
    U.shuffle(BLOQUES.slice()).forEach((b) => { if (extra > 0 && por[b].length > cuota[b]) { cuota[b]++; extra--; } });
    const orden = [];
    for (let k = 0; k < 3; k++) BLOQUES.forEach((b) => { if (k < cuota[b]) orden.push(por[b][k]); });
    jugar({ tipo: "reto", nombre: "Gran Reto", titulo: "Gran Reto", subtitulo: "Las cuatro ediciones de El Eco", retos: orden, repetir: Modos.empezarGranReto });
  };
  /** Cobertura mínima: elige, al azar entre las mejores, las misiones que cubren todos los criterios disponibles. */
  Modos.empezarEvaluacion = function () {
    const todos = PP.MISIONES.filter((m) => pasosSinMundo(m).length); // incluye la edición final (única con evidencias de 5.1)
    const faltan = new Set(); todos.forEach((m) => m.criterios.forEach((c) => faltan.add(c)));
    const elegidos = [];
    while (faltan.size) {
      const pts = todos.filter((m) => !elegidos.includes(m)).map((m) => ({ m, n: m.criterios.filter((c) => faltan.has(c)).length })).filter((x) => x.n);
      if (!pts.length) break;
      const top = Math.max.apply(null, pts.map((x) => x.n));
      const mejor = U.shuffle(pts.filter((x) => x.n === top))[0].m;
      elegidos.push(mejor); mejor.criterios.forEach((c) => faltan.delete(c));
    }
    const orden = elegidos.sort((a, b) => BLOQUES.indexOf(bloqueDe(a)) - BLOQUES.indexOf(bloqueDe(b)));
    jugar({ tipo: "reto", nombre: "Evaluación por criterios", titulo: "Evaluación por criterios", subtitulo: "Recorrido que cubre todos los criterios del juego", retos: orden, repetir: Modos.empezarEvaluacion });
  };
  Modos.empezarTema = function (sel) {
    const C = PP.CURRICULO;
    const retos = sel.criterio ? retosDisponibles().filter((m) => m.criterios.includes(sel.criterio)) : retosDisponibles().filter((m) => bloqueDe(m) === sel.bloque);
    const nombre = sel.criterio ? "Repaso del criterio " + sel.criterio : "Repaso del bloque " + sel.bloque;
    jugar({ tipo: "tema", nombre, titulo: nombre, subtitulo: sel.criterio ? C.etiquetas[sel.criterio] : C.bloques[sel.bloque].nombre, retos, repetir: () => Modos.empezarTema(sel), volverTema: true });
  };

  /** Muestra una tarjeta en #resultado y espera a que se pulse un botón. */
  function tarjeta(def) {
    return new Promise((res) => {
      const r = $("#resultado"); r.hidden = false; r.innerHTML = "";
      const cerrar = (v) => { r.hidden = true; r.innerHTML = ""; res(v); };
      const caja = el("div", { class: "res-caja reto-caja", role: "dialog", "aria-modal": "true", "aria-labelledby": "reto-tit" }, [
        def.cinta ? el("div", { class: "res-cinta", text: def.cinta }) : null,
        el("h2", { id: "reto-tit", text: def.titulo }),
        def.sub ? el("p", { class: "reto-sub", text: def.sub }) : null
      ].concat(def.cuerpo || [], [el("div", { class: "fila-centro" }, def.botones.map((b) => el("button", { class: "btn " + (b.clase || "btn-sec"), type: "button", html: (b.icono ? U.icon(b.icono) : "") + " " + U.esc(b.t), onclick: () => { PP.Audio.sfx("clic"); cerrar(b.valor); } })))]));
      r.appendChild(caja);
      setTimeout(() => { const b = caja.querySelector(".btn-primario") || caja.querySelector("button"); if (b) b.focus(); }, 40);
    });
  }

  function tira(retos, resultados, actual) {
    return el("ol", { class: "tira-retos", "aria-label": "Progreso de los retos" }, retos.map((m, i) => {
      const r = resultados[i], est = r ? r.estrellas : 0;
      const estado = r ? (r.saltado ? "saltado" : "hecho") : i === actual ? "actual" : "pendiente";
      const li = el("li", { class: "chip-reto " + estado, title: m.titulo, "aria-label": "Reto " + (i + 1) + ": " + m.titulo + ", " + estado, html: r ? (r.saltado ? "–" : est ? "★".repeat(est) : "✔") : String(i + 1) });
      li.style.setProperty("--c", COLOR[bloqueDe(m)]); return li;
    }));
  }

  async function jugar(def) {
    const J = PP.juego, M = PP.Mundo, E = PP.Eval, B = PP.BARRIOS;
    if (!def.retos.length) { PP.UI.toast("No hay retos disponibles para esta selección.", "info"); return Modos.abrir(); }
    J.tipoModo = def.tipo; E.marcarModo(def.nombre); J.modo = "reto"; M.activo = false; M.modoAtraccion = true;
    const resultados = [], puntos0 = J.sesionPuntos();
    let racha = 0, mejor = 0, salir = false;
    document.querySelectorAll(".pantalla").forEach((p) => { p.hidden = true; p.setAttribute("aria-hidden", "true"); });
    PP.Audio.musica("mision");
    for (let i = 0; i < def.retos.length && !salir; i++) {
      const mis = def.retos[i], b = B[mis.barrio], blq = bloqueDe(mis);
      // Presentación del reto
      const elegir = await tarjeta({
        cinta: def.titulo.toUpperCase() + " · RETO " + (i + 1) + " DE " + def.retos.length,
        titulo: mis.titulo, sub: "Bloque " + blq + ": " + PP.CURRICULO.bloques[blq].nombre,
        cuerpo: [tira(def.retos, resultados, i), el("p", { class: "res-txt", text: mis.resumen }),
          el("p", { class: "nota", text: "Practicarás: " + mis.criterios.map((c) => PP.CURRICULO.etiquetas[c]).join(" · ") + "." }),
          racha ? el("p", { class: "racha", html: U.icon("star") + " Racha: <b>" + racha + "</b> " + (racha === 1 ? "reto" : "retos") + " seguidos con 2 estrellas o más" }) : null],
        botones: [{ t: "Empezar reto", clase: "btn-primario", icono: "play", valor: "ir" }, { t: "Terminar e ir al informe", clase: "btn-terc", icono: "doc", valor: "fin" }]
      });
      if (elegir === "fin") { salir = true; break; }
      // Juego del reto
      const idx0 = E.sesion.eventos.length;
      const ctx = { id: mis.id, titulo: mis.titulo, tema: mis.barrio, crit: null, estado: {} };
      PP.Audio.sfx("inicio");
      const completo = await J.correrPasos(mis, ctx, pasosSinMundo(mis), true);
      const esc = $("#escena"); esc.hidden = true; esc.innerHTML = "";
      // Valoración del reto (solo lo ocurrido en esta ronda; primer intento de cada ítem)
      const nuevos = E.sesion.eventos.slice(idx0), vistos = new Set(), prim = nuevos.filter((e) => { if (vistos.has(e.clave)) return false; vistos.add(e.clave); return true; });
      const pct = prim.length ? prim.reduce((a, e) => a + e.ok * (e.ayuda ? 0.75 : 1), 0) / prim.length : 1;
      const estrellas = !completo ? 0 : !prim.length ? 0 : pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1;
      resultados[i] = { mision: mis.id, estrellas, pct, n: prim.length, saltado: !completo };
      if (completo) { E.misionCompletada(mis.id, { estrellas, pct, n: prim.length, modo: def.nombre }); J.sumar(30 + estrellas * 20); racha = estrellas >= 2 || !prim.length ? racha + 1 : 0; mejor = Math.max(mejor, racha); PP.Audio.sfx("victoria"); }
      else racha = 0;
      // Resultado del reto
      const ultimo = i === def.retos.length - 1;
      const sig = await tarjeta({
        cinta: completo ? "¡RETO CUMPLIDO!" : "RETO SALTADO",
        titulo: mis.titulo,
        cuerpo: [
          completo ? el("div", { class: "res-estrellas", "aria-label": estrellas + " de 3 estrellas", html: estrellas ? [1, 2, 3].map((k) => '<span class="est' + (k <= estrellas ? " on" : "") + '" style="animation-delay:' + (k * 0.2) + 's">★</span>').join("") : "" }) : null,
          el("p", { class: "res-txt", text: !completo ? "Has salido de este reto. Puedes repetirlo cuando quieras." : prim.length ? "Acertaste a la primera " + Math.round(pct * 100) + " % de los retos (" + prim.length + ")." : "¡Reto completado!" }),
          tira(def.retos, resultados, i + 1), racha >= 2 ? el("p", { class: "racha", html: U.icon("star") + " ¡Racha de <b>" + racha + "</b> retos!" }) : null],
        botones: [{ t: ultimo ? "Ver resultados" : "Siguiente reto", clase: "btn-primario", icono: "play", valor: "sig" }, { t: "Terminar e ir al informe", clase: "btn-terc", icono: "doc", valor: "fin" }]
      });
      if (sig === "fin") salir = true;
    }
    // Resumen final
    const hechos = resultados.filter((r) => r && !r.saltado);
    const total = hechos.reduce((a, r) => a + r.estrellas, 0);
    const kpi = (v, t) => el("div", { class: "kpi" }, [el("b", { text: v }), el("span", { text: t })]);
    const fin = await tarjeta({
      cinta: def.tipo === "reto" ? "EDICIÓN CERRADA" : "REPASO TERMINADO", titulo: def.titulo, sub: def.subtitulo,
      cuerpo: [tira(def.retos, resultados, -1),
        el("div", { class: "inf-kpis reto-kpis" }, [kpi(hechos.length + " / " + def.retos.length, "retos cumplidos"), kpi("★ " + total, "estrellas"), kpi(J.sesionPuntos() - puntos0, "puntos ganados"), kpi(mejor, "mejor racha")]),
        el("p", { class: "nota", text: "El informe para el profesorado recoge qué criterios se han trabajado y con qué evidencias. Los niveles son orientativos." })],
      botones: [{ t: "Ver informe docente", clase: "btn-primario", icono: "doc", valor: "informe" }, { t: "Repetir", clase: "btn-sec", icono: "redo", valor: "repetir" }, { t: "Elegir otro modo", clase: "btn-terc", icono: "back", valor: "modos" }]
    });
    if (fin === "informe") { J.modo = "menu"; PP.UI.informe(); }
    else if (fin === "repetir") def.repetir();
    else Modos.abrir();
  }

  PP.Modos = Modos;
})();
