import asyncio, pathlib, os, sys, json
from playwright.async_api import async_playwright
RAIZ = pathlib.Path(__file__).resolve().parent.parent
URL = (RAIZ / "index.html").as_uri()
CHROME = os.environ.get("CHROME")  # opcional: ruta a Chrome/Chromium
SALIDA = pathlib.Path(__file__).resolve().parent / "capturas"; SALIDA.mkdir(exist_ok=True)
CURSOS = [int(x) for x in sys.argv[1].split(",")] if len(sys.argv)>1 else [5]
SHOTS = len(sys.argv)>2
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME) if CHROME else p.chromium.launch()
        for curso in CURSOS:
            ctx = await b.new_context(viewport={"width":1280,"height":760})
            pg = await ctx.new_page()
            errs=[]
            pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
            pg.on("console", lambda m: errs.append(m.type+": "+m.text) if m.type=="error" else None)
            await pg.goto(URL); await pg.wait_for_timeout(800)
            await pg.add_script_tag(path=str(RAIZ / "pruebas" / "autoplay.js"))
            await pg.click("#btn-jugar"); await pg.wait_for_timeout(200)
            await pg.click(f"#perfil-cursos .curso:nth-child({curso})"); await pg.fill("#perfil-codigo",f"T{curso}-01")
            await pg.click("#btn-perfil-ok"); await pg.wait_for_timeout(300); await pg.click(".modo-aventura"); await pg.wait_for_timeout(300)
            await pg.click("#intro-saltar"); await pg.wait_for_timeout(900)
            await pg.click("#escena .esc-pie .btn"); await pg.wait_for_timeout(300)
            res=[]
            for mid in ["P1","P2","P3","O1","O2","O3","O4","L1","L2","L3","T1","T2","T3","T4","T5","T6","O5","F"]:
                r = await pg.evaluate(f"autoMision('{mid}')")
                res.append(f"{mid}: {r}")
                if SHOTS and mid in ("P1","O2","T4"):
                    await pg.screenshot(path=str(SALIDA) + f"/c{curso}_{mid}.png")
            print(f"=== CURSO {curso} ===")
            print("\n".join(res))
            info = await pg.evaluate("(()=>{const i=PP.Eval.informe();return {n:i.itemsPrimerIntento,pct:i.pctAciertos,mis:i.nMisiones,crit:i.criterios.map(c=>c.code+':'+c.n+':'+(c.nivel||'-')+':'+c.estado),prod:i.producciones.length, rest:PP.Mundo.restauracion, logros:PP.Store.progreso().logros}})()")
            print(json.dumps(info, ensure_ascii=False, indent=0)[:2500])
            await pg.evaluate("PP.UI.informe()"); await pg.wait_for_timeout(400)
            if SHOTS: await pg.screenshot(path=str(SALIDA) + f"/c{curso}_informe.png", full_page=False)
            csv = await pg.evaluate("PP.Eval.csvResumen().split('\\n').length")
            csv2 = await pg.evaluate("PP.Eval.csvRegistro().split('\\n').length")
            js = await pg.evaluate("JSON.parse(PP.Eval.json()).criterios.length")
            print("CSV resumen filas", csv, "registro filas", csv2, "JSON criterios", js)
            # recarga: persistencia
            await pg.reload(); await pg.wait_for_timeout(700)
            per = await pg.evaluate("(()=>{const d=JSON.parse(localStorage.getItem('puertoPalabra.v1'));return {perfil:d.perfil, hist:d.historial.length, mis:Object.keys(d.progreso[d.perfil.codigo+'|'+d.perfil.curso].misiones).length}})()")
            print("Tras recargar:", per)
            print("ERRORES:", errs[:20])
            await ctx.close()
        await b.close()
asyncio.run(main())
