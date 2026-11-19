/* Puerto Palabra · Actividades de la ampliación:
   - S.tildes: «Sílabas y tildes» (Academia de las Tildes) · criterio 9.1
   - S.clasificador: «La cinta clasificadora» (Almacén de Palabras) · criterio 9.1
   - S.guion: «El guion secreto» (Cine Atlántico) · criterios 4.1 y 4.2
   Todas registran el PRIMER intento de cada reto con un «subtipo» (p. ej. sílaba tónica, inferencial)
   para que el informe docente pueda desglosar dónde está la dificultad. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el, S = PP.Escenas;
  const promesa = (fn) => new Promise((res) => fn(res));
  const sinTilde = (t) => t.replace(/[áéíóú]/g, (c) => "aeiou"["áéíóú".indexOf(c)]).replace(/[ÁÉÍÓÚ]/g, (c) => "AEIOU"["ÁÉÍÓÚ".indexOf(c)]);
  const conTilde = (t) => /[áéíóúÁÉÍÓÚ]/.test(t);
  const CLASES = ["aguda", "llana", "esdrújula", "sobresdrújula"];
  const claseDe = (it) => CLASES[Math.min(3, it.s.length - 1 - it.t)];
  const REGLA = {
    aguda: "Es aguda: suena más fuerte la última sílaba. Las agudas llevan tilde si terminan en vocal, en -n o en -s.",
    llana: "Es llana: suena más fuerte la penúltima sílaba. Las llanas llevan tilde si NO terminan en vocal, -n o -s.",
    "esdrújula": "Es esdrújula: suena más fuerte la antepenúltima sílaba. Las esdrújulas llevan tilde siempre.",
    sobresdrújula: "Es sobresdrújula: suena fuerte una sílaba anterior a la antepenúltima. Llevan tilde siempre."
  };
  const HIATO = " Además, aquí hay un HIATO: la i o la u suenan fuertes junto a otra vocal y forman sílabas distintas. Por eso lleva tilde aunque la regla general no lo pida.";
  const POS = { aguda: "última", llana: "penúltima", "esdrújula": "antepenúltima", sobresdrújula: "anterior a la antepenúltima" };

  function cabecera(textoProg) {
    const prog = el("span", { class: "act-prog", text: textoProg });
    const racha = el("span", { class: "act-racha", "aria-live": "polite" });
    const caja = el("div", { class: "act-hud" }, [prog, racha]);
    return { caja, prog, racha, ponerRacha(n) { racha.innerHTML = n >= 2 ? U.icon("star") + " Racha x" + n : ""; racha.classList.toggle("on", n >= 2); if (n >= 2) { racha.classList.remove("pop"); void racha.offsetWidth; racha.classList.add("pop"); } } };
  }

  // ======================================================================
  // SÍLABAS Y TILDES
  // ======================================================================
  S.tildes = function (d, ctx) {
    return promesa((res) => {
      const c = S.ciclo(), silabas = d.modo === "silabas";
      const m = S.marco({ tema: "taller", mision: ctx.titulo, titulo: d.titulo || "Academia de las Tildes", icono: "hint", clase: "esc-tildes",
        consigna: silabas ? "El Borrón ha desordenado las sílabas. Cuenta las palmadas de cada palabra y vuelve a montarla." : "El Borrón ha borrado las tildes. Encuentra la sílaba que suena más fuerte, clasifica la palabra y decide si lleva tilde.",
        alSalir: () => { fin = true; m.cerrar(); res({ abandonada: true }); } });
      let fin = false;
      const lista = U.muestra(d.items.map((x, i) => Object.assign({ i }, x)), silabas ? 6 : 8, "til:" + ctx.id + ":" + (d.modo || "") + ":" + (PP.juego.curso || 0));
      const diac = c === 3 && d.diacriticas ? U.muestra(d.diacriticas.map((x, i) => Object.assign({ i }, x)), 3, "dia:" + ctx.id + ":" + (PP.juego.curso || 0)) : [];
      const total = lista.length + diac.length;
      const hud = cabecera("");
      const zona = el("div", { class: "tl-zona" });
      m.cuerpo.append(hud.caja, zona);
      let n = 0, racha = 0, mejor = 0;
      const reg = (it, sub, ok, resp, correcta, detalle) => PP.Eval.registrar({ crit: ctx.crit || "9.1", ok, mecanica: "tildes", subtipo: sub, mision: ctx.id, item: sub + "-" + (it.p || it.f), respuesta: resp, correcta, detalle: ok ? "" : detalle });
      const exito = (pts) => { racha++; mejor = Math.max(mejor, racha); hud.ponerRacha(racha); PP.juego.sumar(pts + Math.min(racha, 5) * 2); };
      const fallo = () => { racha = 0; hud.ponerRacha(0); };
      const decir = (t) => PP.Voz.decir(t, { forzar: true });

      function siguiente() {
        if (fin) return;
        m.limpiarFb(); m.pie.innerHTML = ""; zona.innerHTML = "";
        if (n < lista.length) { hud.prog.textContent = "Palabra " + (n + 1) + " de " + total; return silabas ? faseContar(lista[n]) : faseTonica(lista[n]); }
        if (n < total) { hud.prog.textContent = "Reto " + (n + 1) + " de " + total; return faseDiacritica(diac[n - lista.length]); }
        terminar();
      }
      function botonSeguir() { m.pie.innerHTML = ""; m.pie.appendChild(m.boton(n + 1 < total ? "Siguiente " + U.icon("play") : "Terminar " + U.icon("play"), () => { n++; siguiente(); })); }
      function oir(p) { return el("button", { class: "btn btn-terc btn-peq", type: "button", html: U.icon("speaker") + " Escuchar", onclick: () => decir(p) }); }

      // ---- 1.er ciclo: contar y ordenar sílabas ----
      function faseContar(it) {
        let primero = true, fallos = 0;
        zona.append(el("div", { class: "tl-palabra grande", "data-i": it.i, text: it.p }), el("p", { class: "tl-preg", text: "¿Cuántas palmadas tiene «" + it.p + "»?" }), oir(it.p));
        const ops = el("div", { class: "tl-palmas" });
        [1, 2, 3, 4].forEach((k) => ops.appendChild(el("button", { class: "btn btn-palma", type: "button", "data-k": k, "aria-label": k + (k === 1 ? " palmada" : " palmadas"), html: '<span class="manos" aria-hidden="true">' + '<i class="pm"></i>'.repeat(k) + "</span><b>" + k + "</b>", onclick: (e) => {
          const ok = k === it.s.length;
          if (primero) { primero = false; reg(it, "contar sílabas", ok, String(k), String(it.s.length), "Contó " + k + " sílabas en «" + it.p + "» (tiene " + it.s.length + ")"); }
          if (ok) { ops.querySelectorAll("button").forEach((b) => (b.disabled = true)); e.currentTarget.classList.add("correcta"); if (!fallos) exito(8); m.fb("¡Sí! " + it.s.join(" - ") + ": " + it.s.length + (it.s.length === 1 ? " palmada." : " palmadas."), "bien"); setTimeout(() => !fin && (it.s.length > 1 ? faseOrdenar(it) : botonSeguir()), 900); }
          else { fallos++; fallo(); e.currentTarget.classList.add("tiembla"); e.currentTarget.disabled = true; m.fb(fallos >= 2 ? "Da una palmada por sílaba: " + it.s.join(" - ") + "." : "Prueba otra vez: di la palabra despacio y da una palmada en cada golpe de voz.", "mal"); }
        } })));
        zona.appendChild(ops);
        if (c === 1) setTimeout(() => decir(it.p), 400);
      }
      function faseOrdenar(it) {
        zona.innerHTML = ""; m.limpiarFb();
        let pos = 0, fallo1 = false;
        const huecos = el("div", { class: "tl-huecos" }, it.s.map(() => el("span", { class: "tl-hueco" })));
        const fichas = el("div", { class: "tl-fichas" });
        zona.append(el("p", { class: "tl-preg", text: "Ahora monta la palabra: toca las sílabas en orden." }), huecos, fichas, oir(it.p));
        U.shuffle(it.s.map((s, k) => k)).forEach((k) => fichas.appendChild(el("button", { class: "btn tl-ficha", type: "button", "data-k": k, text: it.s[k], onclick: (e) => {
          const b = e.currentTarget, ok = it.s[k] === it.s[pos];
          if (!ok && !fallo1) { fallo1 = true; reg(it, "ordenar sílabas", false, it.s[k], it.s[pos], "Al montar «" + it.p + "» colocó «" + it.s[k] + "» en lugar de «" + it.s[pos] + "»"); }
          if (ok) { huecos.children[pos].textContent = it.s[k]; huecos.children[pos].classList.add("lleno"); b.disabled = true; b.classList.add("usada"); pos++; PP.Audio.sfx("tecla");
            if (pos === it.s.length) { if (!fallo1) { reg(it, "ordenar sílabas", true, it.p, it.p, ""); exito(8); } huecos.classList.add("brilla"); m.fb("¡«" + it.p + "» vuelve a estar entera!", "bien"); decir(it.p); botonSeguir(); } }
          else { fallo(); b.classList.add("tiembla"); setTimeout(() => b.classList.remove("tiembla"), 450); m.fb("Esa no va ahora. Escucha la palabra: ¿por qué sílaba empieza lo que falta?", "mal"); }
        } })));
      }

      // ---- 2.º y 3.er ciclo: sílaba tónica → clase → tilde ----
      function faseTonica(it) {
        let primero = true, fallos = 0;
        zona.append(el("p", { class: "tl-preg", html: "¿Qué sílaba suena <b>más fuerte</b>?" }));
        const fila = el("div", { class: "tl-silabas", "data-i": it.i });
        it.s.forEach((s, k) => fila.appendChild(el("button", { class: "btn tl-silaba", type: "button", "data-k": k, text: sinTilde(s), onclick: (e) => {
          const ok = k === it.t;
          if (primero) { primero = false; reg(it, "sílaba tónica", ok, sinTilde(s), sinTilde(it.s[it.t]), "En «" + it.p + "» señaló «" + sinTilde(s) + "» como sílaba tónica (es «" + sinTilde(it.s[it.t]) + "»)"); }
          if (ok) { fila.querySelectorAll("button").forEach((b) => (b.disabled = true)); e.currentTarget.classList.add("tonica"); if (!fallos) exito(6); else racha = 0; m.fb("¡Eso es! Suena fuerte «" + sinTilde(s) + "».", "bien"); setTimeout(() => !fin && faseClase(it, fila), 800); }
          else { const b = e.currentTarget; fallos++; fallo(); b.classList.add("tiembla"); setTimeout(() => b.classList.remove("tiembla"), 450); m.fb(fallos >= 2 ? "Pista: di la palabra como si llamaras a alguien de lejos: «" + it.s.map((x, j) => (j === it.t ? sinTilde(x).toUpperCase() : sinTilde(x))).join("-") + "»." : "Escúchala otra vez y fíjate en qué golpe de voz es más fuerte.", "mal"); decir(it.p); }
        } })));
        zona.append(fila, oir(it.p));
        setTimeout(() => decir(it.p), 350);
      }
      function faseClase(it, fila) {
        m.limpiarFb();
        const correcta = claseDe(it), opciones = d.sobres ? CLASES : CLASES.slice(0, 3);
        let primero = true, fallos = 0;
        const preg = el("p", { class: "tl-preg", text: "¿Qué tipo de palabra es según su sílaba fuerte?" });
        const ops = el("div", { class: "tl-clases" });
        opciones.forEach((cl) => ops.appendChild(el("button", { class: "btn tl-clase", type: "button", "data-c": cl, html: "<b>" + cl.charAt(0).toUpperCase() + cl.slice(1) + "</b><small>fuerte la " + POS[cl] + "</small>", onclick: (e) => {
          const ok = cl === correcta;
          if (primero) { primero = false; reg(it, "clasificación", ok, cl, correcta, "Clasificó «" + it.p + "» como " + cl + " (es " + correcta + ")"); }
          if (ok) { ops.querySelectorAll("button").forEach((b) => (b.disabled = true)); e.currentTarget.classList.add("correcta"); if (!fallos) exito(6); m.fb("¡Correcto! «" + sinTilde(it.p) + "» es " + correcta + ".", "bien"); setTimeout(() => !fin && faseTilde(it, fila), 800); }
          else { fallos++; fallo(); e.currentTarget.disabled = true; m.fb("Cuenta las sílabas desde el final: la última, la penúltima, la antepenúltima… ¿En cuál está la sílaba fuerte?", "mal"); }
        } })));
        zona.append(preg, ops);
      }
      function faseTilde(it, fila) {
        m.limpiarFb();
        const lleva = conTilde(it.p), cl = claseDe(it);
        let primero = true;
        const ops = el("div", { class: "tl-sino" });
        const final = sinTilde(it.p).slice(-1);
        const preg = el("p", { class: "tl-preg", html: "¿Lleva tilde? <small>(termina en «" + U.esc(final) + "»)</small>" });
        [["Sí, lleva tilde", true], ["No lleva tilde", false]].forEach(([t, v]) => ops.appendChild(el("button", { class: "btn tl-sn " + (v ? "si" : "no"), type: "button", "data-v": String(v), html: (v ? '<span class="tl-tilde">´</span>' : U.icon("cross")) + " " + t, onclick: (e) => {
          const ok = v === lleva;
          if (primero) { primero = false; reg(it, "regla de la tilde", ok, v ? "con tilde" : "sin tilde", lleva ? "con tilde" : "sin tilde", "Decidió que «" + it.p + "» " + (v ? "lleva" : "no lleva") + " tilde" + (it.hiato ? " (hiato)" : "")); }
          const txt = REGLA[cl] + (it.hiato ? HIATO : "");
          ops.querySelectorAll("button").forEach((b) => (b.disabled = true));
          if (ok) { e.currentTarget.classList.add("correcta"); exito(8); m.fb("¡Bien! " + txt, "bien"); }
          else { fallo(); e.currentTarget.classList.add("incorrecta"); m.fb("No. " + txt, "mal"); }
          // la palabra se muestra bien escrita, con la tilde «cayendo» en su sitio
          fila.innerHTML = ""; fila.classList.add("resuelta");
          it.s.forEach((s, k) => fila.appendChild(el("span", { class: "tl-silaba fija" + (k === it.t ? " tonica" : "") + (k === it.t && lleva ? " cae-tilde" : ""), text: s })));
          decir(it.p); botonSeguir();
        } })));
        zona.append(preg, ops);
      }
      function faseDiacritica(it) {
        let primero = true;
        zona.append(el("p", { class: "tl-preg", text: "Tilde diacrítica: ¿qué palabra completa la frase?" }));
        const frase = el("p", { class: "tl-frase", "data-i": it.i, html: U.esc(it.f).replace("___", '<span class="tl-blanco">___</span>') });
        const ops = el("div", { class: "tl-sino" });
        it.o.forEach((o, k) => ops.appendChild(el("button", { class: "btn tl-sn", type: "button", "data-k": k, text: o, onclick: (e) => {
          const ok = k === it.c;
          if (primero) { primero = false; reg(it, "tilde diacrítica", ok, o, it.o[it.c], "En «" + it.f + "» eligió «" + o + "» (es «" + it.o[it.c] + "»)"); }
          ops.querySelectorAll("button").forEach((b) => (b.disabled = true));
          frase.querySelector(".tl-blanco").textContent = it.o[it.c];
          if (ok) { e.currentTarget.classList.add("correcta"); exito(10); m.fb(it.fb, "bien"); } else { fallo(); e.currentTarget.classList.add("incorrecta"); m.fb("Era «" + it.o[it.c] + "». " + it.fb, "mal"); }
          botonSeguir();
        } })));
        zona.append(frase, ops);
      }
      function terminar() {
        zona.innerHTML = "";
        zona.appendChild(el("div", { class: "tl-final", html: '<span class="tl-tilde grande">´</span><h3>¡Academia en orden!</h3><p>Mejor racha: <b>' + mejor + "</b></p>" }));
        m.fb(silabas ? "Has devuelto todas las sílabas a su sitio." : "Has devuelto las tildes a la Academia. Recuerda: primero busca la sílaba fuerte, después mira cómo termina la palabra.", "bien");
        m.pie.innerHTML = ""; m.pie.appendChild(m.boton("¡Hecho! " + U.icon("play"), () => { fin = true; m.cerrar(); res({ hecho: true, mejorRacha: mejor }); }));
      }
      siguiente();
    });
  };

  // ======================================================================
  // LA CINTA CLASIFICADORA (clases de palabras en contexto)
  // ======================================================================
  S.clasificador = function (d, ctx) {
    return promesa((res) => {
      const c = S.ciclo(), tranquilo = !!PP.ajustes.sinTiempo, CAT = PP.CATEGORIAS;
      const cats = d.categorias;
      const m = S.marco({ tema: "taller", mision: ctx.titulo, titulo: "La cinta clasificadora", icono: "star", clase: "esc-cinta",
        consigna: "Llegan cajas con palabras. Lee la frase y lanza cada caja al contenedor de su clase de palabra" + (tranquilo ? "." : " antes de que se escape.") + " Puedes usar los números del teclado.",
        alSalir: () => { fin = true; m.cerrar(); res({ abandonada: true }); } });
      let fin = false;
      const lista = U.muestra(d.items.map((x, i) => Object.assign({ i }, x)), c === 1 ? 8 : 10, "cin:" + ctx.id + ":" + (PP.juego.curso || 0));
      const cola = lista.slice(), vistos = new Set();
      const hud = cabecera("");
      const pantalla = el("p", { class: "cn-frase", "aria-live": "polite" });
      const caja = el("div", { class: "cn-caja", "aria-hidden": "true" });
      const cinta = el("div", { class: "cn-cinta" }, [el("div", { class: "cn-rodillos" }), caja, el("div", { class: "cn-salida", text: "SALIDA" })]);
      const bins = el("div", { class: "cn-bins n" + cats.length, role: "group", "aria-label": "Contenedores" });
      cats.forEach((k, j) => {
        const b = el("button", { class: "btn cn-bin", type: "button", "data-cat": k, html: '<span class="cn-num">' + (j + 1) + "</span><b>" + CAT[k].n + "</b><small>" + CAT[k].d + "</small>" });
        b.style.setProperty("--c", CAT[k].color);
        b.addEventListener("click", () => elegir(k, b));
        bins.appendChild(b);
      });
      m.cuerpo.append(hud.caja, pantalla, cinta, bins);
      let actual = null, x = 0, vel = 0, t0 = 0, raf = 0, esperando = false, hechas = 0, racha = 0, mejor = 0, fallosItem = 0;
      const base = c === 1 ? 10 : c === 2 ? 8.5 : 7.5; // segundos para cruzar la cinta
      let factor = 1;
      const tecla = (e) => { if (fin) return; const n = parseInt(e.key, 10); if (n >= 1 && n <= cats.length) { e.preventDefault(); const b = bins.children[n - 1]; elegir(cats[n - 1], b); } };
      document.addEventListener("keydown", tecla);
      const limpiar = () => { cancelAnimationFrame(raf); document.removeEventListener("keydown", tecla); };

      function marcarFrase(it) {
        const re = new RegExp("(^|[^\\p{L}])(" + it.w + ")(?=[^\\p{L}]|$)", "u");
        return U.esc(it.f).replace(re, (all, a, w) => a + '<mark class="cn-marca">' + w + "</mark>");
      }
      function nueva() {
        if (fin) return;
        m.limpiarFb();
        actual = cola.shift();
        if (!actual) return terminar();
        fallosItem = 0; esperando = false;
        hud.prog.textContent = "Caja " + (hechas + 1) + " de " + lista.length;
        pantalla.innerHTML = marcarFrase(actual);
        caja.textContent = actual.w; caja.dataset.i = actual.i; caja.className = "cn-caja entra";
        x = 0; vel = 1 / (base * factor); t0 = performance.now();
        bins.querySelectorAll("button").forEach((b) => { b.disabled = false; b.classList.remove("correcta", "incorrecta"); });
        PP.Voz.decir(actual.f);
        cancelAnimationFrame(raf); raf = requestAnimationFrame(paso);
      }
      function paso(t) {
        if (fin || !m.raiz.isConnected) return;
        const dt = Math.min(0.05, (t - t0) / 1000); t0 = t;
        if (!esperando) {
          const limite = tranquilo ? 0.5 : 1;
          x = Math.min(limite, x + vel * dt);
          caja.style.left = (6 + x * 74) + "%";
          caja.classList.toggle("prisa", !tranquilo && x > 0.72);
          if (!tranquilo && x >= 1) return escapa();
        }
        raf = requestAnimationFrame(paso);
      }
      function escapa() {
        const it = actual;
        if (!vistos.has(it.i)) { vistos.add(it.i); registrar(it, null); }
        fallo(); PP.Audio.sfx("mal");
        m.fb("¡Se escapó «" + U.esc(it.w) + "»! Era <strong>" + CAT[it.c].n.toLowerCase() + "</strong>: " + U.esc(it.fb) + " Volverá a salir más tarde.", "mal");
        cola.push(it); esperando = true; caja.className = "cn-caja cae";
        setTimeout(nueva, 2600);
      }
      function registrar(it, elegida) {
        const ok = elegida === it.c;
        PP.Eval.registrar({ crit: ctx.crit || "9.1", ok, mecanica: "clasificador", subtipo: CAT[it.c].n.toLowerCase() + (it.doble ? " (doble cara)" : ""), mision: ctx.id, item: "cn-" + it.i + "-" + it.w, respuesta: elegida ? CAT[elegida].n : "(se escapó)", correcta: CAT[it.c].n,
          detalle: ok ? "" : elegida ? "Clasificó «" + it.w + "» (en «" + it.f + "») como " + CAT[elegida].n.toLowerCase() + "; es " + CAT[it.c].n.toLowerCase() : "No clasificó a tiempo «" + it.w + "» (" + CAT[it.c].n.toLowerCase() + ")" });
      }
      function fallo() { racha = 0; hud.ponerRacha(0); }
      function elegir(k, b) {
        if (!actual || esperando || fin) return;
        const it = actual, primero = !vistos.has(it.i);
        if (primero) { vistos.add(it.i); registrar(it, k); }
        if (k === it.c) {
          esperando = true; hechas++;
          if (primero && !fallosItem) { racha++; mejor = Math.max(mejor, racha); hud.ponerRacha(racha); factor = Math.max(0.6, factor * 0.95); } else fallo();
          PP.juego.sumar(10 + Math.min(racha, 8) * 3);
          b.classList.add("correcta"); caja.className = "cn-caja vuela"; caja.style.setProperty("--destino", b.offsetLeft + b.offsetWidth / 2 - caja.offsetLeft + "px");
          PP.Audio.sfx("recoger");
          m.fb("<strong>" + U.esc(it.w) + "</strong>: " + U.esc(it.fb) + (it.doble ? " <em>¡Palabra de doble cara!</em>" : ""), "bien");
          setTimeout(nueva, it.doble ? 2300 : 1500);
        } else {
          fallosItem++; fallo(); b.classList.add("incorrecta"); b.disabled = true;
          caja.classList.remove("rebota"); void caja.offsetWidth; caja.classList.add("rebota");
          m.fb("«" + U.esc(it.w) + "» no es " + CAT[k].n.toLowerCase() + " aquí. Pista: un " + CAT[it.c].n.toLowerCase() + " " + CAT[it.c].d + ". Fíjate en lo que hace la palabra en la frase.", "mal");
        }
      }
      function terminar() {
        limpiar();
        pantalla.textContent = "¡Almacén ordenado!"; caja.className = "cn-caja oculta";
        bins.querySelectorAll("button").forEach((b) => (b.disabled = true));
        m.fb("Has clasificado " + lista.length + " palabras. Mejor racha: <strong>" + mejor + "</strong>. Recuerda: la clase de una palabra depende de lo que hace en la frase.", "bien");
        m.pie.innerHTML = ""; m.pie.appendChild(m.boton("¡Hecho! " + U.icon("play"), () => { fin = true; m.cerrar(); res({ hecho: true, mejorRacha: mejor }); }));
      }
      const salirOrig = m.cerrar; m.cerrar = () => { fin = true; limpiar(); salirOrig(); };
      setTimeout(nueva, 500);
    });
  };

  // ======================================================================
  // EL GUION SECRETO (comprensión lectora con caja fuerte)
  // ======================================================================
  const NIVEL = { literal: "Literal", inferencial: "Inferencial", critica: "Crítica y valorativa" };
  S.guion = function (d, ctx) {
    return promesa((res) => {
      const c = S.ciclo();
      const qs = U.muestra(d.preguntas, c === 1 ? 4 : c === 2 ? 5 : 6, "gui:" + ctx.id + ":" + (PP.juego.curso || 0));
      const textoPlano = [d.titulo, d.entradilla].concat(d.parrafos).filter(Boolean).join(". ");
      const m = S.marco({ tema: "onda", mision: ctx.titulo, titulo: "El guion secreto", icono: "lock", clase: "esc-guion", leer: textoPlano,
        consigna: "El Borrón ha encerrado el guion de la película en una caja fuerte. Lee el texto: cada respuesta correcta te da una cifra de la combinación.",
        alSalir: () => { m.cerrar(); res({ abandonada: true }); } });
      const cifras = qs.map(() => Math.floor(Math.random() * 10));
      const papel = el("article", { class: "gn-papel", "aria-label": "Texto para leer" }, [
        el("p", { class: "gn-tipo", text: d.tipo || "Texto" }), el("h3", { text: d.titulo }), d.entradilla ? el("p", { class: "gn-entradilla", text: d.entradilla }) : null
      ].concat(d.parrafos.map((p, k) => el("p", { class: "gn-par", "data-par": k, html: '<span class="gn-num">' + (k + 1) + "</span>" + U.esc(p) }))));
      const ranuras = el("div", { class: "gn-ranuras", "aria-label": "Combinación de la caja fuerte" }, cifras.map(() => el("span", { class: "gn-cifra", text: "?" })));
      const caja = el("div", { class: "gn-caja" }, [el("div", { class: "gn-puerta" }, [el("div", { class: "gn-rueda" }), ranuras]), el("div", { class: "gn-interior", html: "<b>GUION</b><small>«" + U.esc(d.titulo) + "»</small>" })]);
      const tarjeta = el("div", { class: "gn-preg" });
      const lado = el("div", { class: "gn-lado" }, [caja, tarjeta]);
      m.cuerpo.appendChild(el("div", { class: "gn-rejilla" }, [papel, lado]));
      let i = 0, sinFallos = true;
      const resaltar = (k) => { papel.querySelectorAll(".gn-par").forEach((p) => p.classList.toggle("resalta", Number(p.dataset.par) === k)); const p = papel.querySelector('[data-par="' + k + '"]'); if (p) p.scrollIntoView({ block: "nearest", behavior: U.prefiereMenosMovimiento() ? "auto" : "smooth" }); };
      function mostrar() {
        m.limpiarFb(); m.pie.innerHTML = ""; tarjeta.innerHTML = ""; resaltar(-1);
        const q = qs[i]; if (!q) return abrir();
        let registrado = false, ayuda = false, fallos = 0;
        tarjeta.append(el("div", { class: "gn-cab" }, [el("span", { class: "gn-n", text: "Cifra " + (i + 1) + " de " + qs.length }), el("span", { class: "gn-nivel n-" + q.nivel, text: NIVEL[q.nivel] })]), el("p", { class: "gn-q", "data-q": i, text: q.p }));
        m.leerTexto = q.p + ". " + q.o.join(". ");
        if (c === 1) PP.Voz.decir(m.leerTexto);
        const ops = el("div", { class: "libreta-ops" });
        U.shuffle(q.o.map((o, k) => k)).forEach((k, pos) => ops.appendChild(el("button", { class: "btn btn-opcion", type: "button", "data-k": k, html: '<span class="tecla">' + (pos + 1) + "</span>" + U.esc(q.o[k]), onclick: (e) => {
          const ok = k === q.c;
          if (!registrado) { registrado = true; PP.Eval.registrar({ crit: q.crit || ctx.crit || "4.1", ok, mecanica: "caja-fuerte", subtipo: NIVEL[q.nivel].toLowerCase(), mision: ctx.id, item: "gn-" + i + "-" + q.p.slice(0, 40), respuesta: q.o[k], correcta: q.o[q.c], ayuda, detalle: ok ? "" : "(" + NIVEL[q.nivel] + ") «" + q.p + "»: respondió «" + q.o[k] + "»" }); }
          if (ok) {
            ops.querySelectorAll("button").forEach((b) => (b.disabled = true)); e.currentTarget.classList.add("correcta");
            const r = ranuras.children[i]; r.textContent = cifras[i]; r.classList.add("abierta"); PP.Audio.sfx("estrella");
            PP.juego.sumar(!fallos && !ayuda ? 15 : 5);
            m.fb(q.fb, "bien");
            m.pie.appendChild(m.boton(i + 1 < qs.length ? "Siguiente cifra " + U.icon("play") : "Abrir la caja fuerte " + U.icon("lock"), () => { i++; mostrar(); }));
          } else {
            fallos++; sinFallos = false; e.currentTarget.disabled = true; e.currentTarget.classList.add("tiembla");
            if (q.par != null) { resaltar(q.par); m.fb("Esa cifra no abre la caja. Vuelve a leer el párrafo " + (q.par + 1) + " (está resaltado) y piensa otra vez.", "mal"); }
            else m.fb("Esa cifra no abre la caja. Piensa en cómo está escrito el texto y para qué sirve.", "mal");
          }
        } })));
        tarjeta.appendChild(ops);
        if (PP.ajustes.ayudasProgresivas && q.par != null) tarjeta.appendChild(el("button", { class: "btn btn-terc btn-peq gn-pista", type: "button", html: U.icon("hint") + " Pista: ¿dónde lo dice?", onclick: (e) => { if (!registrado) ayuda = true; resaltar(q.par); e.currentTarget.disabled = true; m.fb("Busca en el párrafo " + (q.par + 1) + ".", "info"); } }));
      }
      function abrir() {
        tarjeta.innerHTML = ""; caja.classList.add("abre"); PP.Audio.sfx("desbloqueo");
        tarjeta.appendChild(el("p", { class: "gn-q", text: "Combinación: " + cifras.join(" ") }));
        m.fb("¡Clic! La caja fuerte se abre y recuperas el guion. " + (sinFallos ? "¡Y sin ningún error!" : ""), "bien");
        m.pie.innerHTML = ""; m.pie.appendChild(m.boton("¡Guion recuperado! " + U.icon("play"), () => { m.cerrar(); res({ hecho: true, sinFallos }); }));
      }
      mostrar();
    });
  };
})();
