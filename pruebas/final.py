"""Prueba del final de la aventura: juega todas las misiones (la última, F, con su aviso previo),
comprueba las detenciones de la banda, el epílogo, el resumen, la pantalla final y el informe.
Uso: CHROME=/usr/bin/google-chrome python3 pruebas/final.py [curso] [capturas]"""
import asyncio, pathlib, os, sys
from playwright.async_api import async_playwright
RAIZ = pathlib.Path(__file__).resolve().parent.parent; URL = (RAIZ / "index.html").as_uri()
CHROME = os.environ.get("CHROME"); SALIDA = pathlib.Path("/tmp/finalcap"); SALIDA.mkdir(exist_ok=True)
CURSO = int(sys.argv[1]) if len(sys.argv) > 1 else 4; SHOTS = len(sys.argv) > 2
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME) if CHROME else await p.chromium.launch()
        pg = await (await b.new_context(viewport={"width": 1280, "height": 760})).new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append("PAGEERROR " + str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto(URL); await pg.wait_for_timeout(800)
        await pg.add_script_tag(path=str(RAIZ / "pruebas" / "autoplay.js"))
        await pg.click("#btn-jugar"); await pg.click("#historia-saltar"); await pg.wait_for_timeout(200)
        await pg.click(f"#perfil-cursos .curso:nth-child({CURSO})"); await pg.fill("#perfil-codigo", f"F{CURSO}-01")
        await pg.click("#btn-perfil-ok"); await pg.wait_for_timeout(300); await pg.click(".modo-aventura"); await pg.wait_for_timeout(300)
        await pg.click("#intro-saltar"); await pg.wait_for_timeout(900); await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(300)
        orden = ["P1","P2","P3","O1","O2","O3","O4","L1","L2","L3","T1","T2","T3","T4","T5","T6","O5"]
        # 0) la misión final está bloqueada al principio
        bloq = await pg.evaluate("PP.Mundo.marcadores.find(m=>m.id==='F').bloqueada")
        print("F bloqueada al inicio:", bloq); assert bloq
        det = []
        for mid in orden:
            r = await pg.evaluate(f"autoMision('{mid}')")
            await pg.wait_for_timeout(250)
            if mid in ("P2","O2","L1","T2"): det.append(mid)
            caja = await pg.locator(".det-caja").count()
            assert caja == 0, "la detención debe poder cerrarse"
            print(mid, r[:40])
            if mid == "O5": pass
        det = await pg.evaluate("window.__dets || []"); print("Detenciones:", det); assert [d.split(":")[0] for d in det] == ["P2","O2","L1","T2"], det
        print("Detenciones:", det); 
        # F ya desbloqueada: 17 normales hechas
        bloq2 = await pg.evaluate("PP.Mundo.marcadores.find(m=>m.id==='F').bloqueada")
        print("F bloqueada tras 17 misiones:", bloq2); assert not bloq2
        # aviso previo: se llama a empezarMision vía marcador. Primero «Salir» (vuelve a la ciudad), luego jugamos.
        await pg.evaluate("PP.Mundo.colocarJugador('periodico'); PP.Mundo.cb.marcador(PP.Mundo.marcadores.find(m=>m.id==='F'))"); await pg.wait_for_timeout(700)
        t = await pg.inner_text("#escena")
        print("Aviso previo:", "última misión" in t.lower(), "| palabras doradas" in t.lower() or "doradas" in t.lower())
        assert "última misión" in t.lower() and "terminas" in t.lower() or "acabará" in t.lower()
        if SHOTS: await pg.screenshot(path=str(SALIDA / "aviso.png"))
        # el botón Salir del marco cierra y vuelve a la ciudad
        sal = pg.locator("#escena .esc-salir, #escena [data-salir], #escena .btn-salir")
        n = await sal.count(); print("botón salir encontrado:", n)
        if n: await sal.first.click(); await pg.wait_for_timeout(500); assert await pg.evaluate("PP.juego.modo") == "mundo", await pg.evaluate("PP.juego.modo")
        # juega la final completa con el autoplay
        r = await pg.evaluate("autoMision('F')"); print("F:", r[:60]); await pg.wait_for_timeout(500)
        await pg.wait_for_timeout(500)  # autoMision ya pulsa «Continuar» del resultado
        vis = await pg.evaluate("!document.querySelector('#pantalla-final').hidden"); print("Pantalla final visible:", vis); assert vis
        for k in range(1, 7):
            if SHOTS: await pg.screenshot(path=str(SALIDA / f"fin{k}.png"))
            sig = pg.locator("#final-sig")
            if await sig.is_visible(): await sig.click(); await pg.wait_for_timeout(450)
        txt = await pg.inner_text("#pantalla-final"); print("Resultados:", "Fin de la aventura" in txt, "Criterios" in txt, "CC BY-NC-ND" in txt)
        assert "Fin de la aventura" in txt and "CC BY-NC-ND" in txt
        # informe y vuelta
        await pg.click("#pantalla-final .fin-acciones .btn-primario"); await pg.wait_for_timeout(500)
        inf = await pg.evaluate("[!document.querySelector('#pantalla-informe').hidden, document.querySelector('#informe-cuerpo').innerText.includes('Diseñado por David OZC')]"); print("Informe:", inf); assert inf[0] and inf[1]
        await pg.click("#informe-cuerpo .btn-terc"); await pg.wait_for_timeout(400)
        assert await pg.evaluate("!document.querySelector('#pantalla-final').hidden"), "volver del informe debe regresar al final"
        lg = await pg.evaluate("PP.Store.progreso().logros.filter(l=>l==='final'||l==='banda')"); print("Logros:", lg); assert set(lg) == {"final", "banda"}
        # volver al menú de modos
        await pg.click("#pantalla-final .fin-acciones .btn-sec"); await pg.wait_for_timeout(500)
        print("Tras salir, modos visible:", await pg.evaluate("!document.querySelector('#pantalla-modos').hidden"))
        print("ERRORES:", errs[:10]); await b.close()
asyncio.run(main())
