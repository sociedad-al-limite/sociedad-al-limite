"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ArticleForm({ categories }: { categories: { slug: string; name: string }[] }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  return (
    <form className="form" onSubmit={async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const list = (k: string) => String(fd.get(k) || "").split(",").map((s) => s.trim()).filter(Boolean);
      const body = {
        title: fd.get("title"), subtitle: fd.get("subtitle"), summary: fd.get("summary"), body: fd.get("body"),
        category: fd.get("category"), type: fd.get("type"), verification: fd.get("verification"), status: fd.get("status"),
        coverUrl: fd.get("coverUrl") || null, youtubeId: fd.get("youtubeId") || null, priority: Number(fd.get("priority")),
        featured: fd.get("featured") === "on", developing: fd.get("developing") === "on", breaking: fd.get("breaking") === "on",
        places: list("places"), tags: list("tags")
      };
      const r = await fetch("/api/admin/articles", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      setMsg(r.ok ? "Guardado." : `Error: ${(await r.json()).error}`);
      if (r.ok) { (e.target as HTMLFormElement).reset(); router.refresh(); }
    }}>
      <div className="panel-title">Nueva noticia</div>
      <div className="fld"><label htmlFor="t">Titular</label><input id="t" name="title" required /></div>
      <div className="fld"><label htmlFor="st">Subtítulo</label><input id="st" name="subtitle" /></div>
      <div className="fld"><label htmlFor="su">Resumen</label><textarea id="su" name="summary" required style={{ minHeight: 80 }} /></div>
      <div className="fld"><label htmlFor="b">Texto completo (párrafos separados por una línea en blanco; citas: &gt; texto — fuente)</label><textarea id="b" name="body" required style={{ minHeight: 220 }} /></div>
      <div className="f2">
        <div className="fld"><label htmlFor="c">Sección</label><select id="c" name="category">{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
        <div className="fld"><label htmlFor="ty">Tipo</label><select id="ty" name="type"><option value="NOTICIA">Noticia</option><option value="OPINION">Opinión</option><option value="DENUNCIA">Denuncia ciudadana</option><option value="DECLARACION">Declaración</option><option value="ENTREVISTA">Entrevista</option></select></div>
        <div className="fld"><label htmlFor="v">Verificación</label><select id="v" name="verification"><option value="CONFIRMADO">Confirmado</option><option value="NO_CONFIRMADO">No confirmado</option></select></div>
        <div className="fld"><label htmlFor="s">Estado</label><select id="s" name="status"><option value="BORRADOR">Borrador</option><option value="PUBLICADO">Publicar ahora</option></select></div>
        <div className="fld"><label htmlFor="p">Prioridad</label><select id="p" name="priority"><option value="1">Normal</option><option value="2">Importante</option><option value="3">Principal</option></select></div>
        <div className="fld"><label htmlFor="y">ID de video de YouTube</label><input id="y" name="youtubeId" placeholder="dQw4w9WgXcQ" /></div>
        <div className="fld"><label htmlFor="pl">Lugares (separados por coma)</label><input id="pl" name="places" placeholder="Consuelo, San Pedro de Macorís" /></div>
        <div className="fld"><label htmlFor="tg">Etiquetas</label><input id="tg" name="tags" /></div>
      </div>
      <div className="fld"><label htmlFor="cv">URL de imagen principal</label><input id="cv" name="coverUrl" placeholder="https://…" /></div>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <label className="toggle"><input type="checkbox" name="featured" /> Noticia del momento</label>
        <label className="toggle"><input type="checkbox" name="developing" /> En desarrollo</label>
        <label className="toggle"><input type="checkbox" name="breaking" /> Última hora (envía notificación)</label>
      </div>
      <button className="btn btn-red" type="submit">Guardar</button>
      {msg && <p className="sec-sub">{msg}</p>}
    </form>
  );
}
