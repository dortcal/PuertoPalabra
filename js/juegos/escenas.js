/* Puerto Palabra · Escenas de misión (interfaz DOM accesible).
   Cada escena devuelve una promesa que se resuelve al terminar: {hecho:true} o {abandonada:true}.
   Todas las respuestas pasan por PP.Eval.registrar con su criterio de evaluación. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el;
  const S = {};

  function ciclo() { return PP.juego && PP.juego.ciclo || 2; }
  function hablar(t) { PP.Voz.decir(t); }

  /** Marco común de todas las escenas */
  function marco(op) {
    const raiz = document.getElementById("escena");
    raiz.innerHTML = ""; raiz.className = "escena tema-" + (op.tema || "onda") + (op.clase ? " " + op.clase : "");
    raiz.hidden = false; raiz.setAttribute("aria-hidden", "false");
    const titulo = el("h2", { id: "esc-titulo", class: "esc-titulo", text: op.titulo || "" });
    const btnLeer = el("button", { class: "btn-icono", type: "button", "aria-label": "Leer en voz alta", title: "Leer en voz alta", html: U.icon("speaker") });
    const btnSalir = el("button", { class: "btn-icono btn-salir", type: "button", "aria-label": "Salir de la misión", title: "Salir de la misión", html: U.icon("exit") });
    const cab = el("header", { class: "esc-cabecera" }, [
      el("div", { class: "esc-mision", html: U.icon(op.icono || "doc") + "<span>" + U.esc(op.mision || "") + "</span>" }),
      titulo, el("div", { class: "esc-acciones" }, [btnLeer, btnSalir])
    ]);
    const consigna = el("p", { class: "esc-consigna", html: op.consigna || "" });
    const cuerpo = el("div", { class: "esc-cuerpo" });
    const fbBox = el("div", { class: "esc-fb", role: "status", "aria-live": "polite" });
    const pie = el("div", { class: "esc-pie" });
    const caja = el("div", { class: "esc-caja", role: "dialog", "aria-modal": "true", "aria-labelledby": "esc-titulo" }, [cab, op.consigna ? consigna : null, cuerpo, fbBox, pie]);
    raiz.appendChild(caja);
    const m = {
      raiz, caja, cuerpo, pie, fbBox, consigna,
      leerTexto: op.leer || ((op.titulo || "") + ". " + (op.consigna || "")),
      fb(texto, tipo) {
        fbBox.className = "esc-fb visible " + (tipo || "info");
        fbBox.innerHTML = (tipo === "bien" ? U.icon("check", "fb-ico") : tipo === "mal" ? U.icon("cross", "fb-ico") : U.icon("hint", "fb-ico")) + "<div>" + texto + "</div>";
        if (tipo === "bien") PP.Audio.sfx("bien"); else if (tipo === "mal") PP.Audio.sfx("mal");
        hablar(fbBox.textContent);
      },
      limpiarFb() { fbBox.className = "esc-fb"; fbBox.innerHTML = ""; },
      boton(txt, fn, clase) { const b = el("button", { class: "btn " + (clase || "btn-primario"), type: "button", html: txt }); b.addEventListener("click", () => { PP.Audio.sfx("clic"); fn(b); }); return b; },
      cerrar() { PP.Voz.callar(); raiz.hidden = true; raiz.setAttribute("aria-hidden", "true"); raiz.innerHTML = ""; }
    };
    btnLeer.addEventListener("click", () => PP.Voz.decir(m.leerTexto, { forzar: true }));
    btnSalir.addEventListener("click", () => { if (op.alSalir) op.alSalir(); });
    if (ciclo() === 1 || op.leerAlAbrir) setTimeout(() => hablar(m.leerTexto), 250);
    setTimeout(() => { const f = caja.querySelector(".esc-cuerpo button, .esc-cuerpo textarea, .esc-pie button"); if (f) f.focus({ preventScroll: true }); }, 60);
    return m;
  }

  function promesa(fn) { return new Promise((res) => fn(res)); }
  function salida(m, res) { return () => { m.cerrar(); res({ abandonada: true }); }; }

  // ======================= AVISO =======================
  S.aviso = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: ctx.tema, mision: ctx.titulo, titulo: d.titulo, consigna: d.texto, icono: d.icono || "help", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      if (d.retrato) m.cuerpo.appendChild(el("div", { class: "aviso-retrato", html: PP.retrato(d.retrato, d.animo || "normal") }));
      if (d.lista) m.cuerpo.appendChild(el("ul", { class: "aviso-lista" }, d.lista.map((t) => el("li", { html: t }))));
      m.pie.appendChild(m.boton((d.boton || "¡Vamos!") + " " + U.icon("play"), () => { m.cerrar(); res({ hecho: true }); }));
    });
  };

  // ======================= DIÁLOGO =======================
  S.dialogo = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: ctx.tema, mision: ctx.titulo, titulo: d.titulo || "Conversación", consigna: d.consigna || "Elige la mejor respuesta en cada momento.", icono: "help", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const escena = el("div", { class: "dialogo" });
      const retr = el("div", { class: "dlg-retrato" }), nombre = el("div", { class: "dlg-nombre" });
      const bocadillo = el("div", { class: "dlg-bocadillo" }), opciones = el("div", { class: "dlg-opciones" });
      const yo = el("div", { class: "dlg-yo", html: PP.retrato(PP.juego.avatar, "normal") + "<span>Tú</span>" });
      escena.append(el("div", { class: "dlg-npc" }, [retr, nombre]), el("div", { class: "dlg-centro" }, [bocadillo, opciones]), yo);
      m.cuerpo.appendChild(escena);
      let i = 0;
      const mostrar = () => {
        m.limpiarFb(); m.pie.innerHTML = ""; opciones.innerHTML = "";
        const n = d.nodos[i]; if (!n) { m.cerrar(); return res({ hecho: true }); }
        const npc = d.npcs[n.quien] || d.npcs[Object.keys(d.npcs)[0]];
        retr.innerHTML = PP.retrato(npc, n.animo || "normal");
        nombre.innerHTML = "<strong>" + U.esc(npc.nombre) + "</strong>" + (npc.rol ? "<small>" + U.esc(npc.rol) + "</small>" : "");
        bocadillo.innerHTML = (n.narra ? '<em class="narra">' + U.esc(n.narra) + "</em>" : "") + "<p>" + U.esc(n.habla || "") + "</p>";
        bocadillo.classList.remove("entra"); void bocadillo.offsetWidth; bocadillo.classList.add("entra");
        m.leerTexto = (n.narra ? n.narra + ". " : "") + npc.nombre + " dice: " + (n.habla || "") + (n.opciones ? ". Opciones: " + n.opciones.map((o, k) => (k + 1) + ", " + o.t).join(". ") : "");
        hablar((n.narra ? n.narra + ". " : "") + (n.habla || ""));
        if (!n.opciones) { m.pie.appendChild(m.boton("Continuar " + U.icon("play"), () => { i++; mostrar(); })); return; }
        let fallos = 0;
        const ops = d.barajar === false ? n.opciones : U.shuffle(n.opciones);
        ops.forEach((o, k) => {
          const b = el("button", { class: "btn btn-opcion", type: "button", html: '<span class="tecla">' + (k + 1) + "</span>" + U.esc(o.t) });
          b.addEventListener("click", () => {
            PP.Audio.sfx("clic");
            const ok = o.ok === true ? 1 : o.ok === 0.5 ? 0.5 : 0;
            PP.Eval.registrar({ crit: o.crit || n.crit || ctx.crit, ok, mecanica: "dialogo", mision: ctx.id, item: (d.id || "dlg") + "-" + i, respuesta: o.t, correcta: (n.opciones.find((x) => x.ok === true) || {}).t, detalle: ok < 1 ? "Diálogo: eligió «" + o.t + "»" : "" });
            retr.innerHTML = PP.retrato(npc, o.animo || (ok === 1 ? "feliz" : ok ? "normal" : "triste"));
            if (ok === 1 || ok === 0.5) {
              opciones.querySelectorAll("button").forEach((x) => x.disabled = true); b.classList.add(ok === 1 ? "correcta" : "regular");
              m.fb(o.fb || (ok === 1 ? "¡Muy bien dicho!" : "Se entiende, pero podría decirse mejor."), ok === 1 ? "bien" : "info");
              if (ok === 1) PP.juego.sumar(10);
              m.pie.innerHTML = ""; m.pie.appendChild(m.boton("Continuar " + U.icon("play"), () => { i++; mostrar(); }));
            } else {
              fallos++; b.disabled = true; b.classList.add("incorrecta");
              m.fb((o.fb || "Esa respuesta no ayuda. Prueba otra.") + (fallos >= 2 && PP.ajustes.ayudasProgresivas ? " <strong>Pista:</strong> busca la respuesta más respetuosa y útil." : ""), "mal");
            }
          });
          opciones.appendChild(b);
        });
      };
      mostrar();
    });
  };

  // ======================= PAREJAS =======================
  S.parejas = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: ctx.tema, mision: ctx.titulo, titulo: d.titulo || "Une las parejas", consigna: d.consigna, icono: "map", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const pares = U.muestra(d.pares, ciclo() === 1 ? 4 : 6, "par:" + ctx.id + ":" + (PP.juego.curso || 0));
      const wrap = el("div", { class: "parejas" });
      const colA = el("div", { class: "col" }, [el("h3", { text: d.izq || "Palabra" })]), colB = el("div", { class: "col" }, [el("h3", { text: d.der || "Equivale a" })]);
      wrap.append(colA, colB); m.cuerpo.appendChild(wrap);
      let sel = null, hechas = 0; const intentos = {};
      const bA = pares.map((p, k) => { const b = el("button", { class: "btn carta", type: "button", "data-k": k, html: U.esc(p[0]) }); colA.appendChild(b); return b; });
      U.shuffle(pares.map((p, k) => k)).forEach((k) => {
        const b = el("button", { class: "btn carta", type: "button", "data-k": k, html: U.esc(pares[k][1]) }); colB.appendChild(b);
        b.addEventListener("click", () => {
          if (sel === null) { m.fb("Primero toca una palabra de la columna izquierda.", "info"); return; }
          const ok = Number(b.dataset.k) === sel;
          intentos[sel] = (intentos[sel] || 0) + 1;
          if (intentos[sel] === 1) PP.Eval.registrar({ crit: ctx.crit, ok, mecanica: "parejas", mision: ctx.id, item: "par-" + pares[sel][0], respuesta: pares[sel][0] + " = " + pares[Number(b.dataset.k)][1], correcta: pares[sel][0] + " = " + pares[sel][1], detalle: ok ? "" : "Relacionó «" + pares[sel][0] + "» con «" + pares[Number(b.dataset.k)][1] + "»" });
          if (ok) {
            bA[sel].classList.add("unida"); b.classList.add("unida"); bA[sel].disabled = b.disabled = true;
            bA[sel].innerHTML += U.icon("check", "mini"); b.innerHTML += U.icon("check", "mini");
            m.fb(pares[sel][2] || "¡Correcto!", "bien"); hechas++; sel = null; bA.forEach((x) => x.classList.remove("sel"));
            PP.juego.sumar(10);
            if (hechas === pares.length) { m.pie.innerHTML = ""; m.pie.appendChild(m.boton("¡Hecho! " + U.icon("play"), () => { m.cerrar(); res({ hecho: true }); })); }
          } else { b.classList.add("tiembla"); setTimeout(() => b.classList.remove("tiembla"), 500); m.fb("No es su pareja. " + (intentos[sel] >= 2 && pares[sel][3] ? "<strong>Pista:</strong> " + pares[sel][3] : "Piensa en qué significa «" + U.esc(pares[sel][0]) + "»."), "mal"); }
        });
      });
      bA.forEach((b, k) => b.addEventListener("click", () => { PP.Audio.sfx("clic"); sel = k; bA.forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); PP.Voz.decir(pares[k][0]); }));
    });
  };

  // ======================= CAZA (versión sin conducir, para los modos de reto) =======================
  S.caza = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: ctx.tema, mision: ctx.titulo, titulo: "¡A la caza!", consigna: U.esc(d.instruccion) + (d.explica ? " <small>" + U.esc(d.explica) + "</small>" : ""), icono: "gps", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const objetivo = Math.min(d.objetivo || 5, d.buenas.length), kz = "caza:" + ctx.id + ":" + d.instruccion.slice(0, 14) + ":" + (PP.juego.curso || 0);
      const buenas = U.muestra(d.buenas, objetivo + 2, kz + "b"), malas = U.muestra(d.malas, objetivo + 2, kz + "m").map((x) => { const [t, por] = x.split("|"); return { t, por }; });
      const items = U.shuffle(buenas.map((t) => ({ t, ok: true })).concat(malas.map((x) => ({ t: x.t, por: x.por, ok: false }))));
      const marcador = el("p", { class: "caza-marcador", "aria-live": "polite" });
      const arena = el("div", { class: "caza-arena", role: "group", "aria-label": "Palabras: toca las que cumplen la condición" });
      m.cuerpo.append(marcador, arena);
      let cogidas = 0;
      const prog = () => { marcador.innerHTML = U.icon("star") + " Recogidas: <b>" + cogidas + " / " + objetivo + "</b>"; };
      prog();
      items.forEach((it, k) => {
        const b = el("button", { class: "burbuja", type: "button", text: it.t, style: { animationDelay: (-(k * 0.43) % 3).toFixed(2) + "s" } });
        b.addEventListener("click", () => {
          PP.Eval.registrar({ crit: ctx.crit, ok: it.ok, mecanica: "caza", mision: ctx.id, item: "caza-" + it.t, respuesta: it.t, correcta: it.ok ? it.t : "(no recoger)", detalle: it.ok ? "" : "Eligió «" + it.t + "», que no cumplía la condición" });
          b.disabled = true;
          if (it.ok) {
            b.classList.add("ok"); cogidas++; prog(); PP.Audio.sfx("recoger"); PP.juego.sumar(12);
            m.fb("<strong>" + U.esc(it.t) + "</strong> " + U.esc(d.fbBien || "¡Sí!"), "bien");
            if (cogidas >= objetivo) { arena.querySelectorAll(".burbuja:not(.ok)").forEach((x) => { x.disabled = true; }); m.pie.innerHTML = ""; m.pie.appendChild(m.boton("¡Hecho! " + U.icon("play"), () => { m.cerrar(); res({ hecho: true }); })); }
          } else {
            b.classList.add("mal"); m.fb("<strong>" + U.esc(it.t) + "</strong>: " + U.esc(it.por || "esta palabra no cumple la condición."), "mal");
          }
        });
        arena.appendChild(b);
      });
    });
  };

  // ======================= RADIO =======================
  S.radio = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: "onda", mision: ctx.titulo, titulo: d.emisora || "Radio Onda Volcán", consigna: "Escucha el boletín con atención. Después tendrás que ir al lugar del que habla la noticia.", icono: "radio", leer: "Pulsa el botón de reproducir para escuchar el boletín.", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const sinVoz = !PP.Voz.disponible || !PP.Voz.hayEspanol;
      const radio = el("div", { class: "radio" }, [
        el("div", { class: "radio-dial", html: '<span>88</span><span>92</span><span>96</span><span class="on">98.4</span><span>104</span><i class="aguja"></i>' }),
        el("div", { class: "radio-eq", html: "<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>" }),
        el("div", { class: "radio-locutor", html: PP.retrato(d.retrato || { nombre: "Locutora", piel: "morena", pelo: "#2b1d14", peinado: "mono", ropa: "#7b2cbf", fondo: "#e0c3fc", pendientes: true }, "feliz") + "<span>" + U.esc(d.locutor || "Locución") + "</span>" })
      ]);
      const subt = el("div", { class: "radio-subtitulos", hidden: !(PP.ajustes.subtitulosRadio || sinVoz) }, [el("p", { text: d.texto })]);
      const play = el("button", { class: "btn btn-grande btn-play", type: "button", html: U.icon("play") + " Escuchar boletín" });
      const tSub = el("button", { class: "btn btn-sec", type: "button", "aria-pressed": String(!subt.hidden), html: "Subtítulos" });
      m.cuerpo.append(radio, el("div", { class: "fila-centro" }, [play, tSub]), subt);
      let escuchas = 0;
      const seguir = m.boton("Ya he escuchado " + U.icon("play"), () => {
        PP.Voz.callar(); ctx.estado.escuchas = escuchas; ctx.estado.subtitulos = !subt.hidden || sinVoz;
        m.cerrar(); res({ hecho: true });
      });
      seguir.disabled = !sinVoz; m.pie.appendChild(seguir);
      if (sinVoz) m.fb("Este dispositivo no tiene voz en español: lee el boletín en los subtítulos.", "info");
      play.addEventListener("click", () => {
        PP.Audio.sfx("radio"); escuchas++; radio.classList.add("sonando");
        const ok = PP.Voz.decir(d.texto, { forzar: true, alTerminar: () => { radio.classList.remove("sonando"); seguir.disabled = false; } });
        if (!ok) { subt.hidden = false; seguir.disabled = false; radio.classList.remove("sonando"); }
        play.innerHTML = U.icon("redo") + " Volver a escuchar";
        setTimeout(() => { seguir.disabled = false; }, 4000);
      });
      tSub.addEventListener("click", () => { subt.hidden = !subt.hidden; tSub.setAttribute("aria-pressed", String(!subt.hidden)); ctx.estado.subtitulos = true; });
    });
  };

  // ======================= CARTEL (texto multimodal) =======================
  S.cartelHTML = function (d) {
    let h = '<div class="cartel cartel-' + (d.formato || "cartel") + '">';
    if (d.etiqueta) h += '<div class="cartel-etq">' + U.esc(d.etiqueta) + "</div>";
    h += "<h3>" + U.esc(d.titulo) + "</h3>";
    if (d.subtitulo) h += '<p class="sub">' + U.esc(d.subtitulo) + "</p>";
    if (d.lineas) h += "<ul>" + d.lineas.map((l) => "<li>" + U.esc(l) + "</li>").join("") + "</ul>";
    if (d.tabla) h += '<table><thead><tr>' + d.tabla.cab.map((c) => "<th>" + U.esc(c) + "</th>").join("") + "</tr></thead><tbody>" + d.tabla.filas.map((f) => "<tr>" + f.map((c) => "<td>" + U.esc(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table>";
    if (d.parrafos) h += d.parrafos.map((p) => "<p>" + U.esc(p) + "</p>").join("");
    if (d.pie) h += '<p class="pie">' + U.esc(d.pie) + "</p>";
    if (d.firma) h += '<p class="firma">' + U.esc(d.firma) + "</p>";
    return h + "</div>";
  };
  S.textoCartel = (d) => [d.titulo, d.subtitulo].concat(d.lineas || [], d.parrafos || [], d.tabla ? [d.tabla.cab.join(", ")].concat(d.tabla.filas.map((f) => f.join(", "))) : [], [d.pie, d.firma]).filter(Boolean).join(". ");
  S.cartel = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: "onda", mision: ctx.titulo, titulo: "Un texto con pistas", consigna: d.consigna || "Lee el texto con atención: te dirá adónde tienes que ir.", icono: "doc", leer: S.textoCartel(d), alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      m.cuerpo.appendChild(el("div", { html: S.cartelHTML(d) }));
      m.pie.appendChild(m.boton("Ya lo he leído " + U.icon("play"), () => { m.cerrar(); res({ hecho: true }); }));
    });
  };

  // ======================= PREGUNTAS (libreta de reportero) =======================
  S.preguntas = function (lista, ctx) {
    return promesa((res) => {
      const m = marco({ tema: ctx.tema, mision: ctx.titulo, titulo: "Libreta de reportero", consigna: "Responde a las preguntas. Puedes pedir una pista si la necesitas.", icono: "doc", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const qs = U.muestra(lista, ciclo() === 1 ? 3 : 4, "q:" + ctx.id + ":" + (ctx.mecanica || "") + ":" + (PP.juego.curso || 0));
      let i = 0;
      const libreta = el("div", { class: "libreta" }); m.cuerpo.appendChild(libreta);
      const mostrar = () => {
        m.limpiarFb(); m.pie.innerHTML = ""; libreta.innerHTML = "";
        const q = qs[i]; if (!q) { m.cerrar(); return res({ hecho: true }); }
        let ayuda = !!ctx.apoyoInicial, fallos = 0, registrado = false;
        libreta.appendChild(el("div", { class: "libreta-num", text: "Pregunta " + (i + 1) + " de " + qs.length }));
        libreta.appendChild(el("p", { class: "libreta-q", html: U.esc(q.p) }));
        m.leerTexto = q.p + ". " + q.o.map((o, k) => (k + 1) + ", " + o).join(". ");
        if (ciclo() === 1) hablar(m.leerTexto);
        const ops = el("div", { class: "libreta-ops" });
        const orden = U.shuffle(q.o.map((o, k) => k));
        orden.forEach((k, pos) => {
          const b = el("button", { class: "btn btn-opcion", type: "button", html: '<span class="tecla">' + String.fromCharCode(65 + pos) + "</span>" + U.esc(q.o[k]) });
          b.addEventListener("click", () => {
            PP.Audio.sfx("clic");
            const ok = k === q.c;
            if (!registrado) { registrado = true; PP.Eval.registrar({ crit: q.crit || ctx.crit, ok, mecanica: ctx.mecanica || "preguntas", mision: ctx.id, item: "q" + i + "-" + q.p.slice(0, 40), respuesta: q.o[k], correcta: q.o[q.c], ayuda, detalle: ok ? "" : "«" + q.p + "»: respondió «" + q.o[k] + "»" }); }
            if (ok) {
              ops.querySelectorAll("button").forEach((x) => x.disabled = true); b.classList.add("correcta");
              m.fb(q.fb || "¡Exacto!", "bien"); PP.juego.sumar(registrado && fallos === 0 && !ayuda ? 15 : 5);
              m.pie.innerHTML = ""; m.pie.appendChild(m.boton(i + 1 < qs.length ? "Siguiente " + U.icon("play") : "Terminar " + U.icon("play"), () => { i++; mostrar(); }));
            } else {
              fallos++; b.disabled = true; b.classList.add("incorrecta");
              m.fb((q.fbMal || "No es esa. Vuelve a pensarlo.") + (q.pista && fallos >= 1 && PP.ajustes.ayudasProgresivas ? " <strong>Pista:</strong> " + U.esc(q.pista) : ""), "mal");
            }
          });
          ops.appendChild(b);
        });
        libreta.appendChild(ops);
        if (q.pista || ctx.textoApoyo) {
          const bp = m.boton(U.icon("hint") + " Pista", () => {
            ayuda = true; bp.disabled = true;
            m.fb(q.pista ? U.esc(q.pista) : "Vuelve a leer el texto: " + U.esc(ctx.textoApoyo).slice(0, 400), "info");
          }, "btn-sec"); m.pie.appendChild(bp);
        }
        if (ctx.repetir) m.pie.appendChild(m.boton(U.icon("speaker") + " " + (ctx.repetirTxt || "Volver a escuchar"), () => { ayuda = true; ctx.repetir(); }, "btn-sec"));
      };
      mostrar();
    });
  };

  // ======================= CHISMÓGRAFO (bulos) =======================
  const PISTAS = {
    fuente: "Cita una fuente que se puede comprobar",
    sinfuente: "No dice quién lo cuenta ni de dónde sale",
    alarma: "Usa mayúsculas, prisas o miedo",
    opinion: "Usa palabras de opinión (creo, me parece, el mejor…)",
    cadena: "Pide reenviarlo a todo el mundo",
    exagera: "Promete algo imposible o exagerado",
    fecha: "Es antiguo o no tiene fecha",
    datos: "Da datos concretos (fecha, lugar, hora)"
  };
  S.chismografo = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: "onda", mision: ctx.titulo, titulo: "Chismógrafo", consigna: d.consigna || "Lee cada mensaje y decide: ¿es un dato fiable, un bulo o una opinión?", icono: "phone", clase: "esc-movil", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      // Mezcla equilibrada de mensajes: fiables, bulos y opiniones, distintos en cada partida
      const cuota = ciclo() === 1 ? { fiable: 2, bulo: 2, opinion: 1 } : { fiable: 2, bulo: 2, opinion: 2 };
      const posts = U.shuffle([].concat(...Object.keys(cuota).map((t) => U.muestra(d.posts.filter((x) => x.tipo === t), cuota[t], "chis:" + ctx.id + ":" + t + ":" + (PP.juego.curso || 0)))));
      const tel = el("div", { class: "telefono" }); m.cuerpo.appendChild(tel);
      const etiquetas = ciclo() === 1 ? { fiable: "Es verdad (lo dice quien lo sabe)", bulo: "Es un bulo (inventado)", opinion: "Es lo que alguien piensa" } : { fiable: "Dato fiable", bulo: "Bulo", opinion: "Opinión" };
      let i = 0;
      const mostrar = () => {
        m.limpiarFb(); m.pie.innerHTML = ""; tel.innerHTML = "";
        const p = posts[i]; if (!p) { m.cerrar(); return res({ hecho: true }); }
        const post = el("article", { class: "post" }, [
          el("div", { class: "post-cab", html: '<div class="post-av" style="background:' + (p.color || "#7b6cf6") + '">' + U.esc(p.autor[0]) + '</div><div><strong>' + U.esc(p.autor) + (p.verificado ? ' <span class="verif" title="Cuenta oficial">✔ oficial</span>' : "") + "</strong><small>" + U.esc(p.usuario || "") + " · " + U.esc(p.hace || "hoy") + "</small></div>" }),
          el("p", { class: "post-txt", text: p.texto }),
          p.imagen ? el("div", { class: "post-img", text: p.imagen }) : null,
          el("div", { class: "post-pie", html: "♥ " + (p.megusta || Math.floor(Math.random() * 900)) + " · Compartido " + (p.compartido || Math.floor(Math.random() * 300)) + " veces" })
        ]);
        tel.append(el("div", { class: "tel-barra", html: "<span>" + (i + 1) + "/" + posts.length + "</span><b>Chismógrafo</b><span>📶</span>" }), post);
        m.leerTexto = p.autor + " publica: " + p.texto;
        hablar(m.leerTexto);
        const ops = el("div", { class: "post-ops" }); tel.appendChild(ops);
        let registrado = false;
        Object.keys(etiquetas).forEach((k) => {
          const b = el("button", { class: "btn btn-clasif clasif-" + k, type: "button", text: etiquetas[k] });
          b.addEventListener("click", () => {
            PP.Audio.sfx("clic");
            const ok = k === p.tipo;
            if (!registrado) { registrado = true; PP.Eval.registrar({ crit: "6.1", ok, mecanica: "chismografo", mision: ctx.id, item: "post-" + i + "-" + p.texto.slice(0, 30), respuesta: k, correcta: p.tipo, detalle: ok ? "" : "Clasificó como «" + etiquetas[k] + "» un mensaje que era «" + etiquetas[p.tipo] + "»" }); }
            if (!ok) { b.disabled = true; b.classList.add("incorrecta"); m.fb(p.fbMal || "Mmm… vuelve a mirarlo. ¿Quién lo dice? ¿Cómo lo sabe?", "mal"); return; }
            ops.querySelectorAll("button").forEach((x) => x.disabled = true); b.classList.add("correcta");
            PP.juego.sumar(15);
            if (ciclo() >= 2 && p.pistas && p.pistas.length) {
              m.fb("¡Bien visto! Ahora dime: ¿qué pista te lo indica?", "bien");
              const chips = el("div", { class: "chips" });
              const opcionesPista = U.shuffle(Array.from(new Set(p.pistas.slice(0, 1).concat(U.shuffle(Object.keys(PISTAS).filter((x) => !p.pistas.includes(x))).slice(0, 3)))));
              let reg2 = false;
              opcionesPista.forEach((pk) => {
                const c = el("button", { class: "btn chip", type: "button", text: PISTAS[pk] });
                c.addEventListener("click", () => {
                  const ok2 = p.pistas.includes(pk);
                  if (!reg2) { reg2 = true; PP.Eval.registrar({ crit: "4.2", ok: ok2, mecanica: "chismografo-pista", mision: ctx.id, item: "pista-" + i, respuesta: PISTAS[pk], correcta: PISTAS[p.pistas[0]], detalle: ok2 ? "" : "No identificó la pista: «" + PISTAS[p.pistas[0]] + "»" }); }
                  if (ok2) { chips.querySelectorAll("button").forEach((x) => x.disabled = true); c.classList.add("correcta"); m.fb(p.fb || "¡Eso es!", "bien"); PP.juego.sumar(10); m.pie.innerHTML = ""; m.pie.appendChild(m.boton("Siguiente mensaje " + U.icon("play"), () => { i++; mostrar(); })); }
                  else { c.disabled = true; c.classList.add("incorrecta"); m.fb("Esa pista no aparece en este mensaje. Fíjate en cómo está escrito y en quién lo firma.", "mal"); }
                });
                chips.appendChild(c);
              });
              tel.appendChild(chips);
            } else {
              m.fb(p.fb || "¡Bien visto!", "bien");
              m.pie.appendChild(m.boton("Siguiente mensaje " + U.icon("play"), () => { i++; mostrar(); }));
            }
          });
          ops.appendChild(b);
        });
      };
      mostrar();
    });
  };

  // ======================= ORDENAR =======================
  S.ordenar = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: ctx.tema, mision: ctx.titulo, titulo: d.titulo || "Ordena", consigna: d.consigna || "Ordena las piezas. Usa las flechas o arrastra.", icono: "doc", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const n = d.piezas.length;
      let orden = U.shuffle(d.piezas.map((p, k) => k));
      let tries = 0; while (orden.every((v, k) => v === k) && tries++ < 10) orden = U.shuffle(orden);
      const lista = el("ol", { class: "ordenar" }); m.cuerpo.appendChild(lista);
      let bloqueadas = new Set(), intento = 0;
      const pintar = () => {
        lista.innerHTML = "";
        orden.forEach((k, pos) => {
          const pz = d.piezas[k];
          const li = el("li", { class: "pieza" + (bloqueadas.has(pos) ? " fija" : ""), "data-pos": pos }, [
            el("span", { class: "pieza-num", text: String(pos + 1) }),
            el("div", { class: "pieza-txt", html: (pz.etiqueta && d.mostrarEtiquetas ? '<b class="etq">' + U.esc(pz.etiqueta) + "</b>" : "") + U.esc(pz.t || pz) }),
            el("div", { class: "pieza-btns" }, [
              el("button", { class: "btn-icono", type: "button", "aria-label": "Subir", disabled: pos === 0 || bloqueadas.has(pos) || bloqueadas.has(pos - 1), html: U.icon("up"), onclick: () => mover(pos, -1) }),
              el("button", { class: "btn-icono", type: "button", "aria-label": "Bajar", disabled: pos === n - 1 || bloqueadas.has(pos) || bloqueadas.has(pos + 1), html: U.icon("down"), onclick: () => mover(pos, 1) })
            ])
          ]);
          arrastrable(li, pos);
          lista.appendChild(li);
        });
      };
      const mover = (pos, dir) => { const np = pos + dir; if (np < 0 || np >= n) return; [orden[pos], orden[np]] = [orden[np], orden[pos]]; PP.Audio.sfx("whoosh"); pintar(); const b = lista.children[np] && lista.children[np].querySelector("button:not([disabled])"); if (b) b.focus(); };
      function arrastrable(li, pos) {
        if (bloqueadas.has(pos)) return;
        li.addEventListener("pointerdown", (e) => {
          if (e.target.closest("button")) return;
          const y0 = e.clientY; try { li.setPointerCapture(e.pointerId); } catch (err) {} li.classList.add("arrastrando");
          const alto = li.offsetHeight + 8;
          const mv = (ev) => { li.style.transform = "translateY(" + (ev.clientY - y0) + "px)"; };
          const up = (ev) => {
            li.removeEventListener("pointermove", mv); li.removeEventListener("pointerup", up); li.removeEventListener("pointercancel", up);
            li.classList.remove("arrastrando"); li.style.transform = "";
            let np = U.clamp(pos + Math.round((ev.clientY - y0) / alto), 0, n - 1);
            if (np !== pos && !bloqueadas.has(np)) { const v = orden.splice(pos, 1)[0]; orden.splice(np, 0, v); PP.Audio.sfx("whoosh"); }
            pintar();
          };
          li.addEventListener("pointermove", mv); li.addEventListener("pointerup", up); li.addEventListener("pointercancel", up);
        });
      }
      pintar();
      const comprobar = m.boton(U.icon("check") + " Comprobar", () => {
        intento++;
        const bien = orden.filter((v, k) => v === k).length;
        if (intento === 1) {
          const ok = bien === n ? 1 : bien >= Math.ceil(n / 2) ? 0.5 : 0;
          PP.Eval.registrar({ crit: ctx.crit, ok, mecanica: "ordenar", mision: ctx.id, item: "orden-" + (d.id || d.titulo), respuesta: orden.map((x) => x + 1).join("-"), correcta: d.piezas.map((x, k) => k + 1).join("-"), detalle: ok < 1 ? "Ordenó correctamente " + bien + " de " + n + " partes (" + (d.titulo || "") + ")" : "" });
        }
        Array.from(lista.children).forEach((li, k) => { li.classList.toggle("bien", orden[k] === k); li.classList.toggle("mal", orden[k] !== k); if (orden[k] === k) bloqueadas.add(k); });
        if (bien === n) {
          m.fb(d.fb || "¡Orden perfecto! Ahora el texto tiene sentido.", "bien"); PP.juego.sumar(intento === 1 ? 40 : 15);
          m.pie.innerHTML = ""; m.pie.appendChild(m.boton("Continuar " + U.icon("play"), () => { m.cerrar(); res({ hecho: true, orden: true }); }));
        } else {
          m.fb("Hay " + bien + " de " + n + " en su sitio (se quedan fijas). " + (d.pista || "Busca palabras que indiquen orden: primero, después, al final…"), "mal");
          setTimeout(pintar, 900);
        }
      });
      m.pie.appendChild(comprobar);
    });
  };

  // ======================= LECTURA =======================
  S.lectura = function (d, ctx) {
    return promesa((res) => {
      const texto = d.piezas.map((p) => p.t || p).join("\n\n");
      const m = marco({ tema: "literario", mision: ctx.titulo, titulo: d.titulo, consigna: "Lee la historia completa (o escúchala). Después responderás unas preguntas.", icono: "book", leer: d.titulo + ". " + texto, alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const libro = el("div", { class: "libro" }, [el("h3", { text: d.titulo })].concat(d.piezas.map((p) => el("p", { text: p.t || p }))).concat(d.fuente ? [el("p", { class: "fuente", text: d.fuente })] : []));
      m.cuerpo.appendChild(libro);
      m.pie.appendChild(m.boton(U.icon("speaker") + " Escuchar", () => PP.Voz.decir(d.titulo + ". " + texto, { forzar: true }), "btn-sec"));
      m.pie.appendChild(m.boton("A las preguntas " + U.icon("play"), () => { m.cerrar(); res({ hecho: true }); }));
    });
  };

  // ======================= CORRECTOR =======================
  S.corrector = function (d, ctx) {
    // Cada vez se elige un texto distinto (el original y sus alternativas), sin repetir hasta agotarlos
    if (d.alternativas && d.alternativas.length) d = U.muestra([d].concat(d.alternativas), 1, "corr:" + (PP.juego.curso || 0))[0];
    return promesa((res) => {
      const m = marco({ tema: "taller", mision: ctx.titulo, titulo: d.titulo || "Corrige antes de imprimir", consigna: d.consigna || "Toca las palabras que tengan errores y elige cómo se escriben bien.", icono: "doc", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      // Formato: texto normal con marcas {mal|bien|explicación}
      const partes = []; const re = /\{([^|}]+)\|([^|}]+)\|([^}]*)\}/g; let last = 0, mm;
      while ((mm = re.exec(d.texto))) { if (mm.index > last) partes.push({ t: d.texto.slice(last, mm.index) }); partes.push({ err: true, mal: mm[1], bien: mm[2], exp: mm[3] }); last = re.lastIndex; }
      if (last < d.texto.length) partes.push({ t: d.texto.slice(last) });
      const errores = partes.filter((p) => p.err);
      const hoja = el("div", { class: "periodico" }, [el("div", { class: "per-cab", html: "<b>EL ECO</b><span>Diario de Puerto Palabra</span>" }), el("h3", { text: d.titular || "" })]);
      const parr = el("p", { class: "per-texto" }); hoja.appendChild(parr); m.cuerpo.appendChild(hoja);
      const cont = el("div", { class: "contador", text: "Errores corregidos: 0 de " + errores.length }); m.cuerpo.prepend(cont);
      let corregidos = 0, falsos = 0;
      const pop = el("div", { class: "popover", hidden: true }); m.cuerpo.appendChild(pop);
      const fin = () => {
        errores.forEach((e, k) => { if (!e.hecho) { PP.Eval.registrar({ crit: ctx.crit, ok: 0, mecanica: "corrector", mision: ctx.id, item: "err-" + k + "-" + e.bien, respuesta: "(no detectado)", correcta: e.bien, detalle: "No detectó el error «" + e.mal + "» (→ «" + e.bien + "»)" }); e.span.classList.add("revelado"); e.span.textContent = e.bien; } });
        // Tocar una o dos palabras bien escritas es explorar el texto y no se penaliza; solo cuenta como evidencia si se marcan muchas.
        if (falsos >= 3) PP.Eval.registrar({ crit: ctx.crit, ok: falsos > 4 ? 0 : 0.5, mecanica: "corrector", mision: ctx.id, item: "falsos-positivos", respuesta: falsos + " palabras correctas marcadas", correcta: "0", detalle: "Marcó " + falsos + " palabras correctas como errores" });
        m.pie.innerHTML = ""; m.pie.appendChild(m.boton("Imprimir periódico " + U.icon("print"), () => { m.cerrar(); res({ hecho: true }); }));
        m.fb(corregidos === errores.length ? "¡Página impecable! Ya se puede imprimir." : "Se imprimirá con las correcciones que faltaban (en verde). ¡Fíjate en ellas para la próxima!", corregidos === errores.length ? "bien" : "info");
      };
      partes.forEach((p, idx) => {
        if (p.err) {
          const s = el("button", { class: "palabra", type: "button", text: p.mal }); p.span = s; p.intentos = 0;
          s.addEventListener("click", () => {
            if (p.hecho) return; PP.Audio.sfx("clic");
            pop.innerHTML = ""; pop.hidden = false;
            pop.appendChild(el("p", { html: "¿Cómo se escribe correctamente?" }));
            const ops = U.shuffle([p.bien, p.mal].concat(p.alt ? [p.alt] : []));
            ops.forEach((o) => pop.appendChild(m.boton(U.esc(o), () => {
              p.intentos++;
              const ok = o === p.bien;
              if (p.intentos === 1) PP.Eval.registrar({ crit: ctx.crit, ok: ok ? 1 : 0.5, mecanica: "corrector", mision: ctx.id, item: "err-" + idx + "-" + p.bien, respuesta: o, correcta: p.bien, detalle: ok ? "" : "Detectó «" + p.mal + "» pero dudó al corregirlo" });
              if (ok) { p.hecho = true; s.textContent = p.bien; s.classList.add("corregida"); s.disabled = true; corregidos++; cont.textContent = "Errores corregidos: " + corregidos + " de " + errores.length; pop.hidden = true; m.fb(p.exp || "¡Corregido!", "bien"); PP.juego.sumar(15); if (corregidos === errores.length) fin(); }
              else m.fb("Esa forma no es la correcta. " + (p.exp ? "<strong>Pista:</strong> " + U.esc(p.exp) : ""), "mal");
            }, "btn-sec")));
            pop.appendChild(m.boton("Cancelar", () => { pop.hidden = true; }, "btn-terc"));
          });
          parr.appendChild(s);
        } else {
          p.t.split(/(\s+)/).forEach((w) => {
            if (!w.trim()) { parr.appendChild(document.createTextNode(w)); return; }
            const s = el("button", { class: "palabra", type: "button", text: w });
            s.addEventListener("click", () => { falsos++; s.classList.add("bien-escrita"); s.disabled = true; PP.Audio.sfx("mal"); m.fb("«" + U.esc(w.replace(/[.,;:¡!¿?]/g, "")) + "» está bien escrita. Sigue buscando.", "info"); });
            parr.appendChild(s);
          });
        }
      });
      m.pie.appendChild(m.boton("He terminado de revisar", () => fin(), "btn-sec"));
    });
  };

  // ======================= TALLER DE PALABRAS =======================
  S.taller = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: "taller", mision: ctx.titulo, titulo: "Taller de tuneo", consigna: d.consigna || "Monta la palabra que corresponde a la definición tocando las piezas en orden.", icono: "gear", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const items = U.muestra(d.items, ciclo() === 1 ? 5 : 6, "taller:" + ctx.id + ":" + (PP.juego.curso || 0));
      let i = 0;
      const zona = el("div", { class: "taller" }); m.cuerpo.appendChild(zona);
      const mostrar = () => {
        m.limpiarFb(); m.pie.innerHTML = ""; zona.innerHTML = "";
        const it = items[i]; if (!it) { m.cerrar(); return res({ hecho: true }); }
        let montaje = [], intento = 0;
        const def = el("p", { class: "taller-def", html: "<small>Pieza " + (i + 1) + " de " + items.length + "</small>" + U.esc(it.def) });
        const placa = el("div", { class: "matricula", "aria-live": "polite" });
        const piezas = el("div", { class: "taller-piezas" });
        const pintarPlaca = () => { placa.innerHTML = montaje.length ? montaje.map((p) => "<span>" + U.esc(p.replace(/^-|-$/g, "")) + "</span>").join("") : "<em>monta aquí la palabra</em>"; };
        U.shuffle(it.piezas).forEach((p) => {
          const b = el("button", { class: "btn pieza-taller", type: "button", text: p });
          b.addEventListener("click", () => { PP.Audio.sfx("tecla"); montaje.push(p); b.disabled = true; pintarPlaca(); });
          piezas.appendChild(b);
        });
        zona.append(el("div", { class: "elevador", html: '<div class="coche-taller"></div>' }), def, placa, piezas);
        pintarPlaca(); m.leerTexto = it.def; if (ciclo() === 1) hablar(it.def);
        m.pie.appendChild(m.boton(U.icon("redo") + " Desmontar", () => { montaje = []; piezas.querySelectorAll("button").forEach((x) => x.disabled = false); pintarPlaca(); }, "btn-sec"));
        m.pie.appendChild(m.boton(U.icon("gear") + " Montar", () => {
          if (!montaje.length) return;
          intento++;
          const ok = montaje.join("|") === it.sol.join("|");
          if (intento === 1) PP.Eval.registrar({ crit: ctx.crit, ok, mecanica: "taller", mision: ctx.id, item: "taller-" + it.res, respuesta: montaje.join("+"), correcta: it.sol.join("+"), detalle: ok ? "" : "Para «" + it.def + "» montó «" + montaje.join("+") + "»" });
          if (ok) {
            placa.classList.add("lista"); m.fb("<strong>" + U.esc(it.res) + "</strong>. " + (it.fb || "¡Pieza perfecta!"), "bien"); PP.juego.sumar(intento === 1 ? 20 : 8);
            m.pie.innerHTML = ""; m.pie.appendChild(m.boton("Siguiente " + U.icon("play"), () => { i++; mostrar(); }));
          } else {
            placa.classList.add("tiembla"); setTimeout(() => placa.classList.remove("tiembla"), 500);
            m.fb((it.pista && intento >= 1 ? "<strong>Pista:</strong> " + U.esc(it.pista) : "No encaja. Piensa en qué parte aporta el significado.") , "mal");
            montaje = []; piezas.querySelectorAll("button").forEach((x) => x.disabled = false); pintarPlaca();
          }
        }));
      };
      mostrar();
    });
  };

  // ======================= RIMAS =======================
  S.rimas = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: "literario", mision: ctx.titulo, titulo: "Rimas perdidas", consigna: d.consigna || "Completa cada verso con la palabra que rima y tiene sentido.", icono: "book", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const items = U.muestra(d.items, ciclo() === 1 ? 3 : 4, "rimas:" + ctx.id + ":" + (PP.juego.curso || 0));
      let i = 0;
      const pergamino = el("div", { class: "pergamino" });
      m.cuerpo.append(el("div", { class: "poeta", html: PP.retrato(d.poeta || { nombre: "Poeta", piel: "clara", pelo: "#7a7a7a", peinado: "mono", ropa: "#5b3a7a", fondo: "#efe0ff", gafas: true, edad: "mayor" }, "feliz") + "<span>" + U.esc((d.poeta && d.poeta.nombre) || "La poeta") + "</span>" }), pergamino);
      const mostrar = () => {
        m.limpiarFb(); m.pie.innerHTML = ""; pergamino.innerHTML = "";
        const it = items[i]; if (!it) { m.cerrar(); return res({ hecho: true }); }
        pergamino.appendChild(el("p", { class: "verso", text: it.v1 }));
        const v2 = el("p", { class: "verso", html: U.esc(it.v2).replace("___", '<span class="hueco">_____</span>') }); pergamino.appendChild(v2);
        m.leerTexto = it.v1 + ". " + it.v2 + ". Opciones: " + it.o.join(", ");
        const ops = el("div", { class: "fila-centro" }); pergamino.appendChild(ops);
        let reg = false;
        U.shuffle(it.o.map((o, k) => k)).forEach((k) => {
          const b = el("button", { class: "btn btn-opcion", type: "button", text: it.o[k] });
          b.addEventListener("click", () => {
            const ok = k === it.c;
            if (!reg) { reg = true; PP.Eval.registrar({ crit: ctx.crit, ok, mecanica: "rimas", mision: ctx.id, item: "rima-" + i, respuesta: it.o[k], correcta: it.o[it.c], detalle: ok ? "" : "Rima: eligió «" + it.o[k] + "» en lugar de «" + it.o[it.c] + "»" }); }
            if (ok) { v2.querySelector(".hueco").textContent = it.o[k]; v2.classList.add("brilla"); ops.querySelectorAll("button").forEach((x) => x.disabled = true); m.fb(it.fb || "¡Suena genial!", "bien"); PP.juego.sumar(15); PP.Voz.decir(it.v1 + ". " + it.v2.replace("___", it.o[k])); m.pie.appendChild(m.boton("Siguiente verso " + U.icon("play"), () => { i++; mostrar(); })); }
            else { b.disabled = true; b.classList.add("incorrecta"); m.fb(it.fbMal || "No rima o no tiene sentido. Lee el verso en voz alta y escucha cómo termina.", "mal"); }
          });
          ops.appendChild(b);
        });
      };
      mostrar();
    });
  };

  // ======================= BIBLIOTECA / CLUB DE LECTURA =======================
  S.biblioteca = function (d, ctx) {
    return promesa((res) => {
      const m = marco({ tema: "literario", mision: ctx.titulo, titulo: "Club de lectura", consigna: d.consigna || "Toca un libro para leer su contracubierta y recomiéndalo a quien encaje mejor.", icono: "book", alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const estante = el("div", { class: "estante" }), ficha = el("div", { class: "contracubierta", hidden: true }), lector = el("div", { class: "lector" });
      m.cuerpo.append(lector, estante, ficha);
      const perfiles = U.muestra(d.perfiles, 3, "perf:" + ctx.id + ":" + (PP.juego.curso || 0));
      let i = 0, libroSel = null;
      d.libros.forEach((l, k) => {
        const b = el("button", { class: "lomo", type: "button", style: { background: l.color || U.pick(["#e76f51", "#2a9d8f", "#e9c46a", "#264653", "#8338ec", "#ef476f"]), height: (120 + (k * 37) % 50) + "px" }, "aria-label": "Libro: " + l.titulo, html: "<span>" + U.esc(l.titulo) + "</span>" });
        b.addEventListener("click", () => {
          PP.Audio.sfx("pagina"); libroSel = k; estante.querySelectorAll(".lomo").forEach((x) => x.classList.remove("sel")); b.classList.add("sel");
          ficha.hidden = false; ficha.innerHTML = "<h3>" + U.esc(l.titulo) + "</h3><p class='autor'>" + U.esc(l.autor) + " · <em>" + U.esc(l.genero) + "</em></p><p>" + U.esc(l.sinopsis) + "</p>";
          m.leerTexto = l.titulo + ". " + l.genero + ". " + l.sinopsis; hablar(m.leerTexto);
          const p = perfiles[i];
          ficha.appendChild(m.boton("Recomendar a " + U.esc(p.nombre) + " " + U.icon("play"), () => recomendar(k)));
        });
        estante.appendChild(b);
      });
      let reg = false;
      const pintarLector = () => {
        m.limpiarFb(); ficha.hidden = true; reg = false;
        const p = perfiles[i];
        lector.innerHTML = PP.retrato(p.retrato || {}, "normal") + '<div class="lector-txt"><strong>' + U.esc(p.nombre) + "</strong><p>«" + U.esc(p.pide) + "»</p></div>";
        m.leerTexto = p.nombre + " dice: " + p.pide; hablar(m.leerTexto);
      };
      const recomendar = (k) => {
        const p = perfiles[i]; const ok = p.ok.includes(k);
        if (!reg) { reg = true; PP.Eval.registrar({ crit: ctx.crit, ok, mecanica: "biblioteca", mision: ctx.id, item: "perfil-" + i, respuesta: d.libros[k].titulo, correcta: d.libros[p.ok[0]].titulo, detalle: ok ? "" : "Recomendó «" + d.libros[k].titulo + "» a quien buscaba: " + p.pide }); }
        if (ok) { lector.innerHTML = PP.retrato(p.retrato || {}, "feliz") + '<div class="lector-txt"><strong>' + U.esc(p.nombre) + "</strong><p>«¡Gracias! Tiene muy buena pinta.»</p></div>"; m.fb(p.fb || "¡Buena recomendación! Has leído la contracubierta y has pensado en sus gustos.", "bien"); PP.juego.sumar(20); ficha.hidden = true; m.pie.innerHTML = ""; const ultimo = i + 1 >= perfiles.length; m.pie.appendChild(m.boton((ultimo ? "Terminar" : "Siguiente lector") + " " + U.icon("play"), () => { m.pie.innerHTML = ""; i++; if (ultimo) { m.cerrar(); res({ hecho: true }); } else pintarLector(); })); }
        else m.fb("Mmm… " + (p.fbMal || "ese libro no encaja con lo que busca. Lee bien la contracubierta y fíjate en el género.") , "mal");
      };
      pintarLector();
    });
  };

  S.marco = marco; S.ciclo = ciclo;
  PP.Escenas = S;
})();
