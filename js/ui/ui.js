/* Puerto Palabra · Interfaz general: pantallas, HUD, móvil del juego, ajustes y avisos. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, $ = (s) => document.querySelector(s);
  const UI = {};

  // ---------------- Pantallas ----------------
  UI.mostrar = function (id) {
    document.querySelectorAll(".pantalla").forEach((p) => { const on = p.id === id; p.hidden = !on; p.setAttribute("aria-hidden", String(!on)); });
    const pan = document.getElementById(id);
    if (pan) setTimeout(() => { const f = pan.querySelector("[data-foco], button, input"); if (f) f.focus({ preventScroll: true }); }, 50);
  };

  // ---------------- Avisos (toasts) ----------------
  UI.toast = function (html, tipo, ms) {
    const c = $("#toasts");
    const t = el("div", { class: "toast " + (tipo || "info"), role: "status", html });
    c.appendChild(t);
    while (c.children.length > 3) c.firstChild.remove();
    setTimeout(() => t.classList.add("sale"), (ms || 3200));
    setTimeout(() => t.remove(), (ms || 3200) + 500);
  };

  // ---------------- Ajustes ----------------
  UI.aplicarAjustes = function () {
    const a = PP.ajustes, r = document.documentElement;
    r.style.setProperty("--escala-texto", a.tamTexto);
    document.body.classList.toggle("alto-contraste", !!a.altoContraste);
    document.body.classList.toggle("reducir-movimiento", !!a.reducirMovimiento);
    PP.Audio.aplicarVolumen();
    const bm = $("#btn-silencio"); if (bm) { bm.setAttribute("aria-pressed", String(a.silencio)); bm.innerHTML = U.icon("speaker") + (a.silencio ? '<span class="tachado"></span>' : ""); }
  };

  UI.panelAjustes = function (cont) {
    const a = PP.ajustes;
    cont.innerHTML = "";
    const fila = (etq, control) => el("label", { class: "ajuste" }, [el("span", { text: etq }), control]);
    const rango = (k, min, max, paso) => { const i = el("input", { type: "range", min, max, step: paso, value: a[k] }); i.addEventListener("input", () => { a[k] = Number(i.value); UI.aplicarAjustes(); PP.Store.guardar(); }); i.addEventListener("change", () => PP.Audio.sfx("clic")); return i; };
    const casilla = (k) => { const i = el("input", { type: "checkbox" }); i.checked = !!a[k]; i.addEventListener("change", () => { a[k] = i.checked; UI.aplicarAjustes(); PP.Store.guardar(); PP.Audio.sfx("clic"); }); return i; };
    const selector = (k, ops) => { const s = el("select", {}, ops.map(([v, t]) => el("option", { value: v, text: t }))); s.value = String(a[k]); s.addEventListener("change", () => { a[k] = isNaN(Number(s.value)) ? s.value : Number(s.value); UI.aplicarAjustes(); PP.Store.guardar(); }); return s; };
    cont.append(
      el("h3", { text: "Sonido" }),
      fila("Música", rango("volMusica", 0, 1, 0.05)),
      fila("Efectos y voz", rango("volEfectos", 0, 1, 0.05)),
      fila("Silenciar todo", casilla("silencio")),
      fila("Narración en voz alta", casilla("narracion")),
      fila("Velocidad de la voz", selector("velocidadVoz", [["0.8", "Lenta"], ["1", "Normal"], ["1.15", "Rápida"]])),
      fila("Subtítulos en la radio", casilla("subtitulosRadio")),
      el("h3", { text: "Lectura y vista" }),
      fila("Tamaño del texto", selector("tamTexto", [["1", "Normal"], ["1.2", "Grande"], ["1.4", "Muy grande"]])),
      fila("Alto contraste", casilla("altoContraste")),
      fila("Reducir movimiento y efectos", casilla("reducirMovimiento")),
      el("h3", { text: "Juego" }),
      fila("Sin límite de tiempo (modo tranquilo)", casilla("sinTiempo")),
      fila("Ayudas progresivas (pistas)", casilla("ayudasProgresivas")),
      fila("Conducción", selector("control", [["sencillo", "Sencilla: la flecha indica hacia dónde ir"], ["clasico", "Clásica: girar y acelerar"]]))
    );
    if (!PP.Voz.hayEspanol) cont.appendChild(el("p", { class: "nota", text: "Aviso: este dispositivo no tiene una voz en español instalada; los textos siempre aparecen escritos." }));
    if (!PP.Store.disponible()) cont.appendChild(el("p", { class: "nota", text: "Aviso: el navegador no permite guardar datos (modo privado). El progreso se perderá al cerrar." }));
  };

  // ---------------- HUD ----------------
  UI.actualizarHUD = function () {
    const J = PP.juego; if (!J || !J.curso) return;
    $("#hud-puntos").textContent = J.sesionPuntos();
    $("#hud-curso").textContent = J.curso + ".º · " + (J.alias || "");
    const pr = PP.Store.progreso();
    const est = Object.values(pr.misiones).reduce((a, m) => a + (m.estrellas || 0), 0);
    $("#hud-estrellas").textContent = est;
    const barras = $("#hud-barrios"); barras.innerHTML = "";
    Object.keys(PP.BARRIOS).forEach((b) => {
      const v = PP.Mundo.restauracion[b] || 0;
      barras.appendChild(el("div", { class: "hud-barrio", title: PP.BARRIOS[b].nombre + ": " + Math.round(v * 100) + "% recuperado", "aria-label": PP.BARRIOS[b].nombre + " " + Math.round(v * 100) + " por ciento recuperado" }, [
        el("span", { text: PP.BARRIOS[b].bloque }), el("div", { class: "b" }, [el("i", { style: { width: Math.round(v * 100) + "%", background: PP.BARRIOS[b].color } })])
      ]));
    });
  };

  UI.objetivo = function (o) {
    const box = $("#objetivo");
    if (!o) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false; box.innerHTML = "";
    box.appendChild(el("div", { class: "obj-cab", html: (o.icono ? U.icon(o.icono) : "") + "<b>" + U.esc(o.titulo || "") + "</b>" }));
    if (o.texto) box.appendChild(el("p", { class: "obj-txt", html: o.texto }));
    if (o.progreso) box.appendChild(el("p", { class: "obj-prog", text: o.progreso }));
    if (o.botones && o.botones.length) {
      const f = el("div", { class: "obj-btns" });
      o.botones.forEach((b) => f.appendChild(el("button", { class: "btn " + (b.clase || "btn-sec") + " btn-peq", type: "button", html: (b.icono ? U.icon(b.icono) : "") + U.esc(b.t), onclick: () => { PP.Audio.sfx("clic"); b.f(); } })));
      box.appendChild(f);
    }
  };
  UI.progresoObjetivo = function (txt) { const p = document.querySelector("#objetivo .obj-prog"); if (p) p.textContent = txt; };

  UI.aviso = function (m) {
    const a = $("#aviso-cerca"), b = $("#btn-accion");
    if (m) {
      a.hidden = false; a.innerHTML = '<span class="mini-rombo" style="background:' + m.color + '"></span><div><b>' + U.esc(m.titulo) + "</b><small>" + (m.bloqueada ? "Completa " + m.requiere + " misiones para desbloquearla" : (PP.Input.tactil ? "Toca el botón ▶" : "Pulsa ESPACIO o ENTER") + " para empezar") + "</small></div>";
      b.classList.add("listo"); b.innerHTML = U.icon(m.bloqueada ? "lock" : "play"); b.setAttribute("aria-label", "Empezar misión " + m.titulo);
    } else {
      a.hidden = true; b.classList.remove("listo");
      const enPers = !!PP.Mundo.borron;
      b.innerHTML = U.icon(enPers ? "camera" : "radio"); b.setAttribute("aria-label", enPers ? "Hacer foto" : "Tocar el claxon");
    }
  };

  // Ticker de la radio
  const TICKER = [
    "Estás escuchando Radio Onda Volcán, la radio de Puerto Palabra.",
    "Consejo del día: antes de compartir un mensaje, pregúntate quién lo dice y cómo lo sabe.",
    "En Canarias decimos guagua, papa y millo. ¡Otra forma de decir las cosas, igual de correcta!",
    "La biblioteca municipal abre por la tarde. ¿Ya sabes cuál será tu próxima lectura?",
    "Busca las palabras doradas escondidas por la ciudad: son monedas con una Ñ.",
    "Aviso de tráfico: circulación tranquila en el Paseo Marítimo.",
    "El Borrón ha sido visto cerca de la Fábrica de Palabras. ¡Atención, reporteros!",
    "Recuerda: escribir es reescribir. Revisa siempre tus textos antes de publicarlos."
  ];
  let tickerI = 0;
  UI.ticker = function (txt) {
    const t = $("#ticker-txt"); if (!t) return;
    t.textContent = txt || TICKER[tickerI++ % TICKER.length];
    t.classList.remove("corre"); void t.offsetWidth; t.classList.add("corre");
  };

  // ---------------- Móvil del juego (menú de pausa) ----------------
  UI.abrirMovil = function (pestana) {
    const J = PP.juego; J.pausar(true);
    const m = $("#movil"); m.hidden = false;
    const tabs = [["misiones", "Misiones", "trophy"], ["mapa", "Mapa", "map"], ["coleccion", "Colección", "star"], ["ajustes", "Ajustes", "gear"], ["informe", "Informe", "doc"]];
    const nav = $("#movil-tabs"); nav.innerHTML = "";
    tabs.forEach(([id, t, ic]) => nav.appendChild(el("button", { class: "tab" + (id === (pestana || "misiones") ? " activa" : ""), type: "button", role: "tab", "aria-selected": String(id === (pestana || "misiones")), html: U.icon(ic) + "<span>" + t + "</span>", onclick: () => { PP.Audio.sfx("clic"); UI.abrirMovil(id); } })));
    const c = $("#movil-cuerpo"); c.innerHTML = "";
    const p = pestana || "misiones";
    if (p === "misiones") pintarMisiones(c);
    else if (p === "mapa") { const cv = el("canvas", { class: "mapa-grande", width: 720, height: 560, "aria-label": "Mapa de Puerto Palabra" }); c.appendChild(cv); PP.Mundo.dibujarMapaGrande(cv); c.appendChild(el("p", { class: "nota", text: "Los rombos de colores son misiones. El punto rosa eres tú." })); }
    else if (p === "coleccion") pintarColeccion(c);
    else if (p === "ajustes") { const d = el("div", { class: "ajustes" }); c.appendChild(d); UI.panelAjustes(d); }
    else if (p === "informe") {
      c.append(el("p", { text: "El informe muestra qué has trabajado y cómo vas en cada criterio de Lengua. Tu docente puede imprimirlo o descargarlo." }),
        el("button", { class: "btn btn-primario", type: "button", html: U.icon("doc") + " Ver informe de esta sesión", onclick: () => { UI.cerrarMovil(false); PP.UI.informe(); } }));
    }
    $("#movil-cerrar").focus();
  };
  UI.cerrarMovil = function (reanudar) { $("#movil").hidden = true; if (reanudar !== false) PP.juego.pausar(false); };

  function pintarMisiones(c) {
    const pr = PP.Store.progreso(), J = PP.juego;
    const hechas = Object.keys(pr.misiones).length;
    Object.keys(PP.BARRIOS).forEach((b) => {
      const B = PP.BARRIOS[b];
      const grupo = el("section", { class: "grupo-mis" }, [el("h3", { html: '<span class="punto" style="background:' + B.color + '"></span>' + U.esc(B.nombre) + " <small>Bloque " + B.bloque + ": " + U.esc(PP.CURRICULO.bloques[B.bloque].nombre) + "</small>" })]);
      PP.MISIONES.filter((m) => m.barrio === b).forEach((m) => {
        const st = pr.misiones[m.id], bloq = m.requiere && hechas < m.requiere;
        const lugar = PP.Ciudad.lugares[m.lugar];
        grupo.appendChild(el("div", { class: "fila-mis" + (st ? " hecha" : "") }, [
          el("div", { class: "fm-info", html: "<b>" + U.esc(m.titulo) + "</b><small>" + U.esc(lugar ? lugar.nombre : "") + " · Criterios " + m.criterios.join(", ") + "</small>" }),
          el("div", { class: "fm-est", "aria-label": (st ? st.estrellas : 0) + " estrellas", html: [1, 2, 3].map((k) => '<span class="' + (st && st.estrellas >= k ? "on" : "") + '">★</span>').join("") }),
          bloq ? el("span", { class: "fm-bloq", html: U.icon("lock") + " " + hechas + "/" + m.requiere })
            : el("div", { class: "fm-btns" }, [
              el("button", { class: "btn btn-sec btn-peq", type: "button", html: U.icon("gps") + "GPS", onclick: () => { UI.cerrarMovil(); J.gpsA(lugar); } }),
              el("button", { class: "btn btn-primario btn-peq", type: "button", html: U.icon("play") + "Guagua", title: "Viajar en guagua hasta la misión", onclick: () => { UI.cerrarMovil(); PP.Mundo.colocarJugador(m.lugar); UI.toast("¡Has llegado en guagua a " + U.esc(lugar.nombre) + "!", "info"); } })
            ])
        ]));
      });
      c.appendChild(grupo);
    });
  }

  function pintarColeccion(c) {
    const pr = PP.Store.progreso(), J = PP.juego;
    c.appendChild(el("h3", { text: "Palabras doradas (" + pr.doradas.length + "/" + PP.PALABRAS_DORADAS.length + ")" }));
    const g = el("div", { class: "rejilla-doradas" });
    PP.PALABRAS_DORADAS.forEach((p, i) => g.appendChild(el("div", { class: "dorada" + (pr.doradas.includes(i) ? " on" : ""), html: pr.doradas.includes(i) ? "<b>" + U.esc(p.p) + "</b><small>" + U.esc(p.d) + "</small>" : "<b>?</b><small>Búscala por la ciudad</small>" })));
    c.appendChild(g);
    c.appendChild(el("h3", { text: "Vehículos" }));
    const v = el("div", { class: "rejilla-veh" });
    J.VEHICULOS.forEach((ve) => {
      const libre = J.prestigio() >= ve.coste;
      const cv = el("canvas", { width: 120, height: 70 });
      const b = el("button", { class: "veh" + (pr.vehiculo === ve.id ? " sel" : ""), type: "button", disabled: !libre, "aria-label": ve.nombre + (libre ? "" : ", bloqueado") }, [cv, el("span", { html: U.esc(ve.nombre) + (libre ? "" : "<small>" + U.icon("lock") + ve.coste + " pts</small>") })]);
      const g2 = cv.getContext("2d"); PP.Dibujo.vehiculo(g2, ve.id, pr.color, 60, 35, 0, ve.id === "guagua" ? 1 : 1.6, { casco: "#ffd23f" });
      b.addEventListener("click", () => { pr.vehiculo = ve.id; PP.Store.guardar(); PP.Audio.sfx("desbloqueo"); pintarCol(); });
      v.appendChild(b);
    });
    c.appendChild(v);
    const cols = el("div", { class: "colores" }, ["#ff4f7b", "#3a86ff", "#06d6a0", "#ffbe0b", "#8338ec", "#f8f9fa", "#fb5607"].map((col) => el("button", { class: "color" + (pr.color === col ? " sel" : ""), type: "button", style: { background: col }, "aria-label": "Color " + col, onclick: () => { pr.color = col; PP.Store.guardar(); pintarCol(); } })));
    c.appendChild(cols);
    c.appendChild(el("h3", { text: "Logros (" + pr.logros.length + "/" + J.LOGROS.length + ")" }));
    c.appendChild(el("div", { class: "rejilla-logros" }, J.LOGROS.map((l) => el("div", { class: "logro" + (pr.logros.includes(l.id) ? " on" : ""), html: U.icon("trophy") + "<b>" + U.esc(l.t) + "</b><small>" + U.esc(l.d) + "</small>" }))));
    function pintarCol() { c.innerHTML = ""; pintarColeccion(c); }
  }

  PP.UI = UI;
})();
