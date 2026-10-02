"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/config";
import { ago } from "@/lib/format";
import type { SaulReply } from "@/lib/types";
import { Lion } from "./Lion";
import { Icon, P } from "./ui";

/* =============================================================
   Saul — El León de Sociedad al Límite.
   Habla con /api/saul (servidor). La clave de IA nunca llega aquí.
   ============================================================= */

type Msg = { from: "user" | "bot"; text: string; reply?: SaulReply };

const QUICK: [string, string][] = [
  ["🔥 ¿Qué está pasando hoy?", "¿Qué está pasando hoy?"],
  ["📰 Noticias más importantes", "Noticias más importantes"],
  ["📍 Noticias de mi comunidad", "Noticias de mi comunidad"],
  ["🎥 Últimos videos", "¿Cuál fue el último video publicado?"],
  ["🔴 ¿Qué está pasando en vivo?", "¿Hay alguna transmisión en vivo?"],
  ["🔎 Buscar una noticia", "__buscar"]
];
const LABEL: Record<string, string> = { noticia: "Noticia", opinion: "Opinión", denuncia: "Denuncia ciudadana", declaracion: "Declaración", entrevista: "Entrevista" };
const CHIP: Record<string, string> = { opinion: "op", denuncia: "den", declaracion: "dec" };

export default function Saul() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [quick, setQuick] = useState(QUICK);
  const searchMode = useRef(false);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setCompact(true), 7000);
    const s = () => scrollY > 300 && setCompact(true);
    addEventListener("scroll", s, { passive: true });
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => { clearTimeout(t); removeEventListener("scroll", s); removeEventListener("keydown", k); };
  }, []);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);

  async function ask(text: string) {
    if (text === "__menu") return setQuick(QUICK);
    if (text === "__buscar") {
      searchMode.current = true;
      setMsgs((m) => [...m, { from: "user", text: "🔎 Buscar una noticia" }, { from: "bot", text: "🔎 Dime el tema, la persona o el lugar que quieres buscar." }]);
      return;
    }
    const q = searchMode.current ? `buscar ${text}` : text;
    searchMode.current = false;
    setMsgs((m) => [...m, { from: "user", text }]);
    setBusy(true);
    try {
      const history = msgs.slice(-6).map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));
      const r = await fetch("/api/saul", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: q, history }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setMsgs((m) => [...m, { from: "bot", text: data.text, reply: data }]);
      if (/comunidad/i.test(text) && !data.articles?.length) setQuick([["📍 Consuelo", "¿Qué pasó en Consuelo?"], ["📍 San Pedro de Macorís", "Noticias de San Pedro de Macorís"], ["⬅ Volver al menú", "__menu"]]);
      else setQuick(QUICK);
    } catch (e) {
      setMsgs((m) => [...m, { from: "bot", text: (e as Error).message || "No pude revisar las noticias en este momento. Inténtalo de nuevo." }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      <div className={`saul-fab ${open ? "hide" : ""} ${compact ? "compact" : ""}`}>
        <div className="saul-pill" aria-hidden="true">Pregúntale a Saul<small>El León de Sociedad al Límite</small></div>
        <button className="saul-btn" onClick={() => setOpen(true)} aria-label="Abrir a Saul, el asistente de noticias"><Lion /></button>
      </div>

      <section className={`saul ${open ? "open" : ""}`} role="dialog" aria-label="Saul, asistente de noticias" aria-hidden={!open}>
        <div className="saul-h">
          <div className="av"><Lion /></div>
          <div><b>SAUL</b><small><i /> El León de Sociedad al Límite</small></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wm" src="/logo-sm.webp" alt="" />
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Cerrar a Saul"><Icon d={P.x} w={2.2} /></button>
        </div>

        <div className="saul-log" ref={log} aria-live="polite">
          <Bot><p>🦁 Hola, soy <b>Saul</b>, el León de Sociedad al Límite.<br />¿Quieres saber qué está pasando?</p></Bot>
          {msgs.map((m, i) => m.from === "user"
            ? <div key={i} className="msg user">{m.text}</div>
            : <Bot key={i}><p>{m.text}</p>{m.reply && <Cards r={m.reply} close={() => matchMedia("(max-width: 760px)").matches && setOpen(false)} />}</Bot>)}
          {busy && <div className="msg bot"><span className="mav"><Lion /></span><div className="bub typing">🦁 Saul está revisando las noticias… <span className="dots"><i /><i /><i /></span></div></div>}
        </div>

        <div className="quick">{quick.map(([l, v]) => <button key={l} type="button" onClick={() => ask(v)} disabled={busy}>{l}</button>)}</div>
        <form className="saul-in" autoComplete="off" onSubmit={(e) => { e.preventDefault(); const v = input.trim(); if (!v || busy) return; setInput(""); ask(v); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pregúntale a Saul…" aria-label="Escribe tu pregunta" maxLength={500} />
          <button aria-label="Enviar" disabled={busy}><Icon d={P.arrow} w={2.2} /></button>
        </form>
        <div className="saul-note">Saul solo responde con publicaciones de Sociedad al Límite.</div>
      </section>
    </>
  );
}

function Bot({ children }: { children: React.ReactNode }) {
  return <div className="msg bot"><span className="mav"><Lion /></span><div className="bub">{children}</div></div>;
}

function Cards({ r, close }: { r: SaulReply; close: () => void }) {
  return (
    <>
      {r.articles.map((a) => (
        <Link key={a.slug} className="sitem" href={`/noticias/${a.slug}`} onClick={close}>
          <span className="lb"><span className={`chip ${CHIP[a.type] ?? ""}`}>{LABEL[a.type]}</span><span className="chip ghost">{CATEGORIES[a.category].name}</span><span style={{ fontSize: 11.5, color: "var(--dim)" }}>{ago(a.publishedAt)}</span></span>
          <strong>{a.title}</strong>
          <span>{a.type === "denuncia" ? "Según la publicación de Sociedad al Límite, " + a.summary.charAt(0).toLowerCase() + a.summary.slice(1) : a.summary}</span>
          {a.unconfirmed && <em>⚠ Información no confirmada de forma independiente.</em>}
          {a.type === "declaracion" && <em>Es una declaración, no un hecho verificado.</em>}
        </Link>
      ))}
      {r.videos?.map((v) => (
        <a key={v.id} className="sitem" href={v.url} target="_blank" rel="noopener"><span className="lb"><span className="chip">Video</span>{v.duration && <span style={{ fontSize: 11.5, color: "var(--dim)" }}>{v.duration}</span>}</span><strong>{v.title}</strong><span>▶ Ver en YouTube</span></a>
      ))}
      {r.live?.isLive && <Link className="sitem" href="/en-vivo" onClick={close}><span className="lb"><span className="chip dev"><i /> En vivo</span></span><strong>{r.live.title}</strong><span>Ver la transmisión</span></Link>}
      {(r.articles.length > 0 || (r.videos?.length ?? 0) > 0) && <div className="src">Fuente: publicaciones de Sociedad al Límite</div>}
    </>
  );
}
