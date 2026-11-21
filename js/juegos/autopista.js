/* Puerto Palabra · «Autopista del Borrón»: carrera arcade de carriles.
   Cada pórtico plantea una frase; el carril correcto da turbo para alcanzar la furgoneta.
   Modo tranquilo (ajuste «sin límite de tiempo»): la moto se detiene ante cada pórtico hasta elegir.
   Antes de arrancar se explica el contexto (alcanzar la furgoneta) y, con cada pórtico nuevo, hay un tiempo de
   lectura a cámara lenta; los carriles de cada respuesta se muestran también bajo la frase. */
window.PP = window.PP || {};
(function () {
  "use strict";
  const U = PP.U, el = U.el;

  PP.Autopista = { jugar };

  function jugar(itemsTodos, ctx) {
    return new Promise((resolver) => {
      const ciclo = PP.juego.ciclo || 2;
      const items = U.muestra(itemsTodos, ciclo === 1 ? 6 : 8, "auto:" + ctx.id + ":" + (PP.juego.curso || 0));
      const tranquilo = !!PP.ajustes.sinTiempo;
      const raiz = el("div", { class: "autopista", role: "application", "aria-label": "Autopista del Borrón" });
      const cv = el("canvas", { class: "ap-canvas" });
      const hud = el("div", { class: "ap-hud" });
      const enunciado = el("div", { class: "ap-enunciado", "aria-live": "polite" });
      const medidor = el("div", { class: "ap-medidor", html: '<span>Distancia a la furgoneta</span><div class="barra"><i></i></div>' });
      const marcador = el("div", { class: "ap-marcador", text: "0 / " + items.length });
      const explic = el("div", { class: "ap-explica", "aria-live": "assertive" });
      const bIzq = el("button", { class: "ap-btn izq", type: "button", "aria-label": "Carril izquierdo", html: U.icon("back") });
      const bDer = el("button", { class: "ap-btn der", type: "button", "aria-label": "Carril derecho", html: '<span style="display:inline-block;transform:scaleX(-1)">' + U.icon("back") + "</span>" });
      const bSalir = el("button", { class: "btn-icono ap-salir", type: "button", "aria-label": "Salir", html: U.icon("exit") });
      const bOk = el("button", { class: "btn btn-primario ap-ok", type: "button", hidden: true, html: "Este carril " + U.icon("play") });
      const carrilesTxt = el("div", { class: "ap-carriles", "aria-live": "polite" });
      const lectura = el("div", { class: "ap-lectura" }, [el("i")]);
      hud.append(el("div", { class: "ap-arriba" }, [medidor, marcador, bSalir]), enunciado, carrilesTxt, lectura, explic);
      raiz.append(cv, hud, bIzq, bDer, bOk);
      document.body.appendChild(raiz);
      PP.Audio.musica("persecucion");
      const g = cv.getContext("2d");
      let W = 0, H = 0, dpr = 1;
      const ajustar = () => { dpr = Math.min(2, window.devicePixelRatio || 1); W = raiz.clientWidth; H = raiz.clientHeight; cv.width = W * dpr; cv.height = H * dpr; };
      ajustar(); window.addEventListener("resize", ajustar);

      const N = 3;
      // Tiempo de lectura (segundos a cámara lenta) al aparecer cada pórtico
      const LECTURA = ciclo === 1 ? 7 : ciclo === 2 ? 6 : 5;
      const st = { listo: false, lectura: 0, carril: 1, xVis: 1, scroll: 0, vel: ciclo === 1 ? 135 : ciclo === 2 ? 165 : 195, distancia: 55, idx: -1, portico: null, aciertos: 0, fin: false, t: 0, flash: 0, esperando: false, turbo: 0, lento: 0, decor: [], parts: [], pausaHasta: 0 };
      for (let k = 0; k < 14; k++) st.decor.push({ y: k * 140, lado: k % 2, tipo: U.pick(["palmera", "roca", "cartel", "palmera"]) });

      const anchoCarretera = () => Math.min(600, W * 0.78);
      const xCarril = (c) => { const ac = anchoCarretera(), x0 = (W - ac) / 2; return x0 + ac * (c + 0.5) / N; };
      const yJugador = () => H - Math.max(120, H * 0.2);

      function siguiente() {
        st.idx++;
        if (st.idx >= items.length) { terminar(); return; }
        const it = items[st.idx];
        const n = it.o.length;
        const carriles = n >= 3 ? [0, 1, 2] : U.shuffle([0, 1, 2]).slice(0, 2).sort();
        const orden = U.shuffle(it.o.map((o, k) => k));
        const paneles = carriles.map((c, k) => ({ c, op: orden[k], txt: it.o[orden[k]] }));
        st.portico = { y: -160, it, paneles, resuelto: false };
        st.lectura = LECTURA; st.lecturaTot = LECTURA;
        pintarCarriles();
        enunciado.innerHTML = '<small>Pórtico ' + (st.idx + 1) + " de " + items.length + "</small>" + U.esc(it.p).replace("___", '<span class="hueco">___</span>');
        PP.Voz.decir(it.p + (ciclo <= 2 ? ". Opciones: " + it.o.join(", o ") : ""));
      }

      const NOMBRE_CARRIL = ["⬅ Izquierda", "⬆ Centro", "Derecha ➡"];
      /** Muestra, bajo la frase, qué respuesta hay en cada carril y cuál es el carril actual */
      function pintarCarriles() {
        const p = st.portico;
        if (!p || p.resuelto) { carrilesTxt.innerHTML = ""; return; }
        carrilesTxt.innerHTML = [0, 1, 2].map((c) => { const panel = p.paneles.find((x) => x.c === c);
          return '<span class="' + (c === st.carril ? "actual" : "") + (panel ? "" : " vacio") + '"><small>' + NOMBRE_CARRIL[c] + "</small><b>" + (panel ? U.esc(panel.txt) : "cerrado") + "</b></span>"; }).join("");
      }
      function resolverPortico(p) {
        p.resuelto = true;
        const panel = p.paneles.find((x) => x.c === st.carril);
        const ok = !!panel && panel.op === p.it.c;
        PP.Eval.registrar({ crit: p.it.crit || ctx.crit, ok, mecanica: "autopista", mision: ctx.id, item: "ap-" + p.it.p.slice(0, 40), respuesta: panel ? panel.txt : "(carril vacío)", correcta: p.it.o[p.it.c], detalle: ok ? "" : "«" + p.it.p + "»: eligió «" + (panel ? panel.txt : "carril vacío") + "» (correcto: «" + p.it.o[p.it.c] + "»)" });
        if (ok) {
          st.aciertos++; st.distancia = Math.max(0, st.distancia - (ciclo === 1 ? 14 : 11)); st.turbo = 1.4; PP.Audio.sfx("turbo"); PP.Audio.sfx("bien"); PP.juego.sumar(15);
          explic.className = "ap-explica bien visible"; explic.innerHTML = U.icon("check", "fb-ico") + "<div><b>" + U.esc(p.it.o[p.it.c]) + "</b>. " + U.esc(p.it.fb || "¡Turbo!") + "</div>";
          for (let k = 0; k < 24; k++) st.parts.push({ x: xCarril(st.carril), y: yJugador(), vx: U.rand(-200, 200), vy: U.rand(-300, -60), v: 0, c: U.pick(["#ffe066", "#ffffff", "#3bceac"]) });
        } else {
          st.distancia = Math.min(100, st.distancia + 8); st.lento = 1.6; PP.Audio.sfx("mal"); PP.Audio.sfx("frenazo");
          explic.className = "ap-explica mal visible"; explic.innerHTML = U.icon("cross", "fb-ico") + "<div>Era <b>" + U.esc(p.it.o[p.it.c]) + "</b>. " + U.esc(p.it.fb || "") + "</div>";
          st.pausaHasta = st.t + (ciclo === 1 ? 3.2 : 2.6);
        }
        PP.Voz.decir(explic.textContent);
        carrilesTxt.innerHTML = ""; lectura.classList.remove("visible");
        marcador.textContent = st.aciertos + " / " + items.length;
        medidor.querySelector("i").style.width = (100 - st.distancia) + "%";
      }

      function terminar() {
        st.fin = true; enunciado.innerHTML = "";
        const alcanza = st.distancia <= 30 || st.aciertos >= Math.ceil(items.length * 0.75);
        st.finalAlcanza = alcanza; st.finT = st.t;
        if (alcanza) { setTimeout(() => { st.flash = 1; PP.Audio.sfx("foto"); }, 1300); }
        setTimeout(() => {
          explic.className = "ap-explica visible " + (alcanza ? "bien" : "info");
          explic.innerHTML = (alcanza ? U.icon("camera", "fb-ico") + "<div><b>¡Foto conseguida!</b> Has alcanzado la furgoneta del Borrón con " + st.aciertos + " aciertos de " + items.length + ".</div>" : U.icon("hint", "fb-ico") + "<div><b>¡Casi!</b> La furgoneta se ha escapado, pero has recuperado " + st.aciertos + " palabras. Repasa las explicaciones y vuelve a intentarlo.</div>");
          PP.Voz.decir(explic.textContent);
          const b = el("button", { class: "btn btn-primario ap-fin", type: "button", html: "Continuar " + U.icon("play") });
          b.addEventListener("click", () => cerrar({ hecho: true, alcanza, aciertos: st.aciertos }));
          hud.appendChild(b); b.focus();
        }, alcanza ? 2300 : 900);
      }

      let vivo = true, ultimo = 0;
      function cerrar(r) { vivo = false; window.removeEventListener("keydown", teclas); window.removeEventListener("resize", ajustar); PP.Voz.callar(); raiz.remove(); resolver(r); }
      function mover(d) { if (st.fin || !st.listo) return; const n = U.clamp(st.carril + d, 0, N - 1); if (n !== st.carril) { st.carril = n; PP.Audio.sfx("whoosh"); pintarCarriles(); } }
      function confirmar() {
        if (!st.listo) return arrancar(); if (st.esperando && st.portico) { st.esperando = false; bOk.hidden = true; st.portico.confirmado = true; } }
      function teclas(e) {
        if (e.code === "ArrowLeft" || e.code === "KeyA") { mover(-1); e.preventDefault(); }
        else if (e.code === "ArrowRight" || e.code === "KeyD") { mover(1); e.preventDefault(); }
        else if (e.code === "Space" || e.code === "Enter") { confirmar(); e.preventDefault(); }
        else if (e.code === "Escape") cerrar({ abandonada: true });
      }
      window.addEventListener("keydown", teclas);
      bIzq.addEventListener("pointerdown", (e) => { e.preventDefault(); mover(-1); });
      bDer.addEventListener("pointerdown", (e) => { e.preventDefault(); mover(1); });
      bOk.addEventListener("click", confirmar);
      bSalir.addEventListener("click", () => cerrar({ abandonada: true }));
      cv.addEventListener("pointerdown", (e) => {
        // tocar directamente un carril
        const r = cv.getBoundingClientRect(), x = e.clientX - r.left; const ac = anchoCarretera(), x0 = (W - ac) / 2;
        const c = Math.floor((x - x0) / (ac / N));
        if (!st.listo) return;
        if (c >= 0 && c < N) { if (c === st.carril && st.esperando) confirmar(); else { st.carril = c; PP.Audio.sfx("whoosh"); pintarCarriles(); } }
      });

      // ----- Pantalla de contexto antes de arrancar -----
      const intro = el("div", { class: "ap-intro", role: "dialog", "aria-modal": "true", "aria-labelledby": "ap-intro-tit" }, [
        el("div", { class: "ap-intro-caja" }, [
          el("div", { class: "ap-intro-cara", html: PP.retrato(PP.BORRON, "feliz") }),
          el("h2", { id: "ap-intro-tit", text: "¡La furgoneta del Borrón se escapa!" }),
          el("p", { text: "El Borrón huye por la autopista con un saco lleno de palabras robadas. Tienes que alcanzar su furgoneta morada y hacerle una foto para El Eco." }),
          el("ol", { class: "ap-intro-pasos" }, [
            el("li", { html: "<b>Lee la frase</b> de arriba: le falta una palabra." }),
            el("li", { html: "Cada <b>carril</b> lleva a una respuesta: la verás en el cartel del pórtico y también debajo de la frase." }),
            el("li", { html: "<b>Cámbiate al carril</b> de la respuesta correcta " + (PP.Input.tactil ? "con las flechas de los lados o tocando el carril" : "con <kbd>←</kbd> <kbd>→</kbd> o tocando el carril") + " antes de pasar por debajo del pórtico." }),
            el("li", { html: "Si aciertas, ¡<b>turbo</b>! Te acercas a la furgoneta. Si fallas, frenas un poco y verás la explicación." })
          ]),
          el("p", { class: "ap-intro-nota", text: tranquilo ? "Modo tranquilo: la moto se para delante de cada pórtico hasta que confirmes el carril." : "Cuando aparece un pórtico, todo va a cámara lenta unos segundos para que puedas leer y pensar." })
        ])
      ]);
      const bArrancar = el("button", { class: "btn btn-primario btn-grande", type: "button", html: "¡Arrancar la moto! " + U.icon("play") });
      intro.firstChild.appendChild(bArrancar);
      raiz.appendChild(intro);
      function arrancar() { if (st.listo) return; st.listo = true; intro.remove(); PP.Audio.sfx("inicio"); siguiente(); }
      bArrancar.addEventListener("click", arrancar);
      setTimeout(() => bArrancar.focus(), 50);
      PP.Voz.decir("¡La furgoneta del Borrón se escapa! Lee la frase y cámbiate al carril de la respuesta correcta para conseguir turbo y alcanzarla.");

      PP.Autopista._debug = { st, items, xCarril, arrancar };
      requestAnimationFrame(bucle);

      function bucle(ts) {
        if (!vivo) return;
        requestAnimationFrame(bucle);
        const dt = Math.min(0.05, (ts - (ultimo || ts)) / 1000); ultimo = ts; st.t += dt;
        // velocidad
        let v = st.vel * (st.turbo > 0 ? 1.6 : 1) * (st.lento > 0 ? 0.55 : 1);
        st.turbo -= dt; st.lento -= dt;
        if (!st.listo) v = 40; // pantalla de contexto: la moto rueda despacio de fondo
        const p = st.portico;
        // tiempo de lectura: cámara lenta mientras el pórtico se acerca
        if (p && !p.resuelto && st.lectura > 0 && !tranquilo) {
          st.lectura -= dt; v *= 0.22;
          lectura.classList.add("visible"); lectura.firstChild.style.width = Math.max(0, st.lectura / st.lecturaTot * 100) + "%";
        } else lectura.classList.remove("visible");
        if (p && !p.resuelto && tranquilo && !p.confirmado && p.y > yJugador() - 260) {
          if (!st.esperando) { st.esperando = true; bOk.hidden = false; }
          v = 0;
        }
        if (st.fin) v = st.vel * 1.2;
        st.scroll += v * dt;
        if (p) {
          p.y += v * dt;
          if (!p.resuelto && p.y >= yJugador() - 30) resolverPortico(p);
          if (p.resuelto && p.y > H + 200 && st.t >= st.pausaHasta && !st.fin) { st.portico = null; explic.className = "ap-explica"; siguiente(); }
        }
        for (const d of st.decor) { d.y += v * dt; if (d.y > H + 100) { d.y -= 14 * 140; d.tipo = U.pick(["palmera", "roca", "cartel", "palmera"]); } }
        st.xVis += (st.carril - st.xVis) * Math.min(1, dt * 12);
        st.parts.forEach((q) => { q.v += dt; q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 500 * dt; });
        st.parts = st.parts.filter((q) => q.v < 1);
        dibujar(v);
      }

      function dibujar(v) {
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        const ac = anchoCarretera(), x0 = (W - ac) / 2;
        // fondo: mar a la derecha y roca volcánica a la izquierda
        const gr = g.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, "#5b3d2e"); gr.addColorStop(x0 / W, "#7a5340"); gr.addColorStop((x0 + ac) / W, "#2f8fb8"); gr.addColorStop(1, "#1b5e86");
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        g.fillStyle = "rgba(255,255,255,0.25)";
        for (let k = 0; k < 12; k++) { const y = ((st.scroll * 0.6 + k * 90) % (H + 90)) - 45; g.fillRect(x0 + ac + 30 + (k * 53) % Math.max(10, W - x0 - ac - 60), y, 26, 3); }
        // arcén y carretera
        g.fillStyle = "#e9e1cf"; g.fillRect(x0 - 14, 0, ac + 28, H);
        g.fillStyle = "#33363f"; g.fillRect(x0, 0, ac, H);
        g.fillStyle = "#f2d16b";
        for (let c = 1; c < N; c++) { const x = x0 + ac * c / N - 3; for (let y = (st.scroll % 60) - 60; y < H; y += 60) g.fillRect(x, y, 6, 32); }
        g.fillStyle = "#c0392b"; for (let y = (st.scroll % 40) - 40; y < H; y += 40) { g.fillRect(x0 - 14, y, 8, 20); g.fillRect(x0 + ac + 6, y, 8, 20); }
        // decoración lateral
        for (const d of st.decor) {
          const x = d.lado ? x0 + ac + 60 + (d.y * 7 % 80) : x0 - 70 - (d.y * 5 % 60);
          if (d.tipo === "palmera") { g.strokeStyle = "#2f7d3a"; g.lineWidth = 6; for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; g.beginPath(); g.moveTo(x, d.y); g.lineTo(x + Math.cos(a) * 26, d.y + Math.sin(a) * 26); g.stroke(); } g.fillStyle = "#8b5a2b"; g.beginPath(); g.arc(x, d.y, 5, 0, 7); g.fill(); }
          else if (d.tipo === "roca") { g.fillStyle = "#3d2a22"; g.beginPath(); g.ellipse(x, d.y, 26, 16, 0.3, 0, 7); g.fill(); }
          else { g.fillStyle = "#1f6f3f"; g.fillRect(x - 30, d.y - 14, 60, 28); g.fillStyle = "#fff"; g.font = "bold 10px sans-serif"; g.textAlign = "center"; g.fillText("PUERTO PALABRA", x, d.y + 4); }
        }
        // furgoneta (más cerca cuanto menor es la distancia)
        const yVan = 70 + (100 - st.distancia) / 100 * (yJugador() - 300);
        if (!st.fin || st.finalAlcanza || st.t - st.finT < 1) {
          const yv = st.fin && !st.finalAlcanza ? yVan - (st.t - st.finT) * 400 : st.fin ? Math.min(yJugador() - 110, yVan + (st.t - st.finT) * 120) : yVan;
          PP.Dibujo.vehiculo(g, "coche", "#3d2b63", W / 2 + Math.sin(st.t * 1.3) * ac * 0.25, yv, -Math.PI / 2, 1.7, { borron: true, largo: 1.3 });
        }
        // pórtico
        const p = st.portico;
        if (p) {
          g.fillStyle = "#555"; g.fillRect(x0 - 20, p.y - 6, 10, 70); g.fillRect(x0 + ac + 10, p.y - 6, 10, 70);
          g.fillStyle = "#6b6f7a"; g.fillRect(x0 - 20, p.y - 10, ac + 40, 10);
          g.font = "800 " + Math.round(Math.min(26, ac / N / 5.2)) + "px 'Trebuchet MS', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
          for (let c = 0; c < N; c++) {
            const panel = p.paneles.find((x) => x.c === c), px = x0 + ac * c / N + 6, pw = ac / N - 12;
            if (!panel) { g.fillStyle = "#ff7a00"; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(px + pw * (k + 0.5) / 3, p.y + 6); g.lineTo(px + pw * (k + 0.5) / 3 - 10, p.y + 34); g.lineTo(px + pw * (k + 0.5) / 3 + 10, p.y + 34); g.fill(); } continue; }
            let col = "#f7f7f2";
            if (p.resuelto) col = panel.op === p.it.c ? "#7ee2a8" : (c === st.carril ? "#ff9b9b" : "#cfcfcf");
            g.fillStyle = "#0d5c3a"; PP.Dibujo.redondeado(g, px, p.y, pw, 48, 8); g.fill();
            g.fillStyle = col; PP.Dibujo.redondeado(g, px + 4, p.y + 4, pw - 8, 40, 6); g.fill();
            g.fillStyle = "#14213d"; g.fillText(panel.txt, px + pw / 2, p.y + 25, pw - 14);
            if (!p.resuelto && c === st.carril) { g.strokeStyle = "#ffe066"; g.lineWidth = 4; PP.Dibujo.redondeado(g, px - 2, p.y - 2, pw + 4, 52, 9); g.stroke(); }
          }
        }
        // jugador
        const xj = x0 + ac * (st.xVis + 0.5) / N, yj = yJugador();
        if (st.turbo > 0) { g.fillStyle = "rgba(255,180,60,0.7)"; g.beginPath(); g.moveTo(xj - 8, yj + 20); g.lineTo(xj + 8, yj + 20); g.lineTo(xj, yj + 50 + Math.random() * 20); g.fill(); }
        const pr = PP.Store.progreso();
        PP.Dibujo.vehiculo(g, pr.vehiculo === "guagua" ? "moto" : pr.vehiculo, pr.color, xj, yj, -Math.PI / 2, 1.6, { casco: "#ffd23f" });
        // líneas de velocidad
        if (!U.prefiereMenosMovimiento() && v > 200) { g.strokeStyle = "rgba(255,255,255,0.25)"; g.lineWidth = 2; for (let k = 0; k < 8; k++) { const x = (k * 137 + st.t * 50) % W, y = (k * 211 + st.scroll * 2) % H; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 40); g.stroke(); } }
        st.parts.forEach((q) => { g.globalAlpha = 1 - q.v; g.fillStyle = q.c; g.fillRect(q.x, q.y, 4, 4); }); g.globalAlpha = 1;
        if (st.flash > 0) { g.fillStyle = "rgba(255,255,255," + st.flash + ")"; g.fillRect(0, 0, W, H); st.flash -= 0.04; }
        if (st.esperando) { g.fillStyle = "rgba(0,0,0,0.35)"; PP.Dibujo.redondeado(g, W / 2 - 170, yJugador() + 40, 340, 34, 10); g.fill(); g.fillStyle = "#fff"; g.font = "700 15px sans-serif"; g.textAlign = "center"; g.fillText("Elige carril y pulsa ESPACIO o «Este carril»", W / 2, yJugador() + 58); }
      }
    });
  }
})();
