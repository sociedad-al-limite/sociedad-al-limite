"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/config";
import { cover } from "@/lib/cover";
import type { Article, LiveStatus } from "@/lib/types";
import { Icon, P, RowCard, SocialIcon, SOCIAL_META } from "./ui";

/* ---------- avisos (toasts) ---------- */
export function toast(title: string, text: string) {
  window.dispatchEvent(new CustomEvent("sal:toast", { detail: { title, text } }));
}
export function Toasts() {
  const [list, setList] = useState<{ id: number; title: string; text: string }[]>([]);
  useEffect(() => {
    const on = (e: Event) => {
      const id = Date.now() + Math.random();
      setList((l) => [...l, { id, ...(e as CustomEvent).detail }]);
      setTimeout(() => setList((l) => l.filter((x) => x.id !== id)), 4500);
    };
    window.addEventListener("sal:toast", on);
    return () => window.removeEventListener("sal:toast", on);
  }, []);
  return <div className="toasts" aria-live="polite">{list.map((t) => <div className="toast" key={t.id}><b>{t.title}</b>{t.text}</div>)}</div>;
}

/* ---------- estado EN VIVO (consulta /api/youtube/live cada 2 min) ---------- */
export function useLive() {
  const [live, setLive] = useState<LiveStatus | null>(null);
  useEffect(() => {
    let stop = false;
    const load = () => fetch("/api/youtube/live").then((r) => r.json()).then((d) => !stop && setLive(d)).catch(() => {});
    load();
    const t = setInterval(load, 120_000);
    return () => { stop = true; clearInterval(t); };
  }, []);
  return live;
}
function LiveButton({ live, className = "" }: { live: LiveStatus | null; className?: string }) {
  // Si hay transmisión, el botón lleva directo al Live; si no, a la página En Vivo.
  const on = !!live?.isLive;
  return (
    <Link className={`live-btn ${on ? "on" : ""} ${className}`} href="/en-vivo" aria-label={on ? "Estamos en vivo: ver transmisión" : "En vivo"}>
      <i /><span>EN VIVO</span>
    </Link>
  );
}

/* ---------- encabezado + menú móvil ---------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const live = useLive();
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <header className="hdr" id="top">
        <div className="wrap hdr-top">
          <Link className="brand" href="/" aria-label="Sociedad al Límite, inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-sm.webp" alt="Sociedad al Límite" width={99} height={68} />
            <span className="brand-tag">Las cosas<span>como son</span></span>
          </Link>
          <div className="hdr-actions">
            <Link className="icon-btn" href="/buscar" aria-label="Buscar"><Icon d={P.search} w={2.2} /></Link>
            <AlertButton iconOnly />
            <LiveButton live={live} />
            <button className="icon-btn burger" onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open} aria-controls="drawer"><Icon d={P.menu} w={2.2} /></button>
          </div>
        </div>
        <nav className="nav" aria-label="Secciones"><div className="wrap"><ul>
          {NAV.map(([h, l]) => <li key={h}><Link href={h} className={(path === h ? "active " : "") + (h === "/en-vivo" ? "nav-live" : "")}>{l}</Link></li>)}
        </ul></div></nav>
      </header>
      <div className={`drawer ${open ? "open" : ""}`} id="drawer" aria-hidden={!open}>
        <div className="drawer-bg" onClick={() => setOpen(false)} />
        <div className="drawer-panel" role="dialog" aria-label="Menú">
          <div className="drawer-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-sm.webp" alt="Sociedad al Límite" />
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Cerrar menú"><Icon d={P.x} w={2.2} /></button>
          </div>
          <nav aria-label="Secciones">{NAV.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)}>{l}</Link>)}</nav>
          <LiveButton live={live} />
          <div className="drawer-social"><SocialMini /></div>
        </div>
      </div>
    </>
  );
}
export function SocialMini() {
  return <>{(Object.keys(SITE.social) as (keyof typeof SITE.social)[]).map((k) => <a key={k} className="soc-mini" href={SITE.social[k]} target="_blank" rel="noopener" aria-label={SOCIAL_META[k].name}>{SocialIcon[k]}</a>)}</>;
}

/* ---------- buscador ---------- */
export function SearchBox({ initial = "", id = "q" }: { initial?: string; id?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  return (
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); router.push(`/buscar?q=${encodeURIComponent(q.trim())}`); }}>
      <Icon d={P.search} w={2.4} />
      <label className="sr" htmlFor={id}>Buscar noticias, personas, lugares, temas, entrevistas y videos</label>
      <input id={id} value={q} onChange={(e) => setQ(e.target.value)} placeholder="¿Qué estás buscando?" autoComplete="off" enterKeyHint="search" />
      <button className="btn btn-red" type="submit"><Icon d={P.search} w={2.6} /><span className="bl">Buscar</span></button>
    </form>
  );
}

/* ---------- compartir ---------- */
export function ShareButtons({ path, title }: { path: string; title: string }) {
  const url = `${SITE.url}${path}`;
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); toast("COPIADO", "El enlace está listo para pegar."); }
    catch { toast("COPIA MANUAL", url); }
  };
  return (
    <div className="share" aria-label="Compartir">
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener" aria-label="Compartir en Facebook">{SocialIcon.facebook}</a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener" aria-label="Compartir por WhatsApp">{SocialIcon.whatsapp}</a>
      <a href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`} target="_blank" rel="noopener" aria-label="Compartir en X">{SocialIcon.x}</a>
      <button type="button" onClick={copy} aria-label="Copiar enlace"><Icon d={P.copy} /></button>
    </div>
  );
}

/* ---------- alertas de última hora (Web Push) ---------- */
function urlB64(base64: string) {
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}
export function AlertButton({ iconOnly }: { iconOnly?: boolean }) {
  const enable = async () => {
    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return toast("NO DISPONIBLE", "Este navegador no admite notificaciones.");
    if (!key) return toast("PRÓXIMAMENTE", "Las alertas de última hora se activarán pronto.");
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return toast("ALERTAS DESACTIVADAS", "Puedes activarlas desde los ajustes del navegador.");
    const reg = await navigator.serviceWorker.register("/sw.js");
    const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64(key) });
    await fetch("/api/push/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(sub) });
    toast("ALERTAS ACTIVADAS", "Te avisaremos cuando haya noticias de última hora.");
  };
  return iconOnly
    ? <button className="icon-btn hide-sm" onClick={enable} aria-label="Alertas de última hora"><Icon d={P.bell} /><span className="dot" /></button>
    : <button className="btn btn-red btn-sm" onClick={enable} style={{ width: "100%" }}>Activar alertas</button>;
}

/* ---------- noticias locales con pestañas ---------- */
export function LocalTabs({ groups }: { groups: Record<string, Article[]> }) {
  const places = Object.keys(groups);
  const [place, setPlace] = useState(places[0]);
  const list = groups[place] ?? [];
  return (
    <>
      <div className="local-tabs" role="tablist" aria-label="Localidad" style={{ marginBottom: 20 }}>
        {places.map((p) => <button key={p} className="tab" role="tab" aria-selected={p === place} onClick={() => setPlace(p)}>{p}</button>)}
      </div>
      <div className="local-wrap">
        <div className="local-map">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover("map" + place, "local", 600, 520)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="lbl"><b>{place}</b><span>{list.length} publicaciones recientes</span></div>
        </div>
        <div className="rows">{list.slice(0, 4).map((a) => <RowCard key={a.slug} a={a} />)}</div>
      </div>
    </>
  );
}

/* ---------- YouTube ligero: no carga el reproductor hasta que el lector lo pide ---------- */
export function LiteYouTube({ id, title, live }: { id: string; title: string; live?: boolean }) {
  const [on, setOn] = useState(false);
  if (on) return <div className="lite-yt"><iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /></div>;
  return (
    <button className="lite-yt" onClick={() => setOn(true)} aria-label={`Reproducir: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault${live ? "_live" : ""}.jpg`} alt="" loading="lazy" />
      <span className="play"><Icon d={P.play} fill /></span>
    </button>
  );
}

/* ---------- caja de transmisión en vivo ---------- */
export function LiveBox({ full }: { full?: boolean }) {
  const live = useLive();
  if (live?.isLive && live.videoId) {
    return (
      <div className="live-box rv">
        <LiteYouTube id={live.videoId} title={live.title || "En vivo"} live />
        <div className="live-info">
          <span className="chip dev" style={{ alignSelf: "flex-start" }}><i /> EN VIVO</span>
          <h3>{live.title}</h3>
          {live.viewers != null && <div className="meta"><b>{live.viewers.toLocaleString("es-DO")} personas viendo</b></div>}
          <ShareButtons path="/en-vivo" title={live.title || "Sociedad al Límite en vivo"} />
        </div>
      </div>
    );
  }
  return (
    <div className="live-box rv">
      <div className="live-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover("off", "entrevistas", 960, 540)} alt="" style={{ opacity: 0.25 }} />
        <div className="off">
          <b>{full ? "No estamos transmitiendo en este momento" : "Actualmente no estamos en vivo"}</b>
          <span>{full ? "Suscríbete para recibir una notificación cuando salgamos en vivo." : "Cuando el canal transmita, el video aparecerá aquí automáticamente."}</span>
          <a className="btn btn-red btn-sm" href={SITE.social.youtube} target="_blank" rel="noopener">Suscríbete al canal</a>
        </div>
      </div>
      <div className="live-info"><h3>Transmisión en vivo</h3><div className="meta"><span>{live === null ? "Comprobando…" : "Sin transmisión activa"}</span></div></div>
    </div>
  );
}
export function LiveChat() {
  const live = useLive();
  const [host, setHost] = useState("");
  useEffect(() => setHost(location.hostname), []);
  return (
    <aside className="chat">
      <div className="chat-h">Chat en vivo <span className="chip ghost">YouTube</span></div>
      {live?.isLive && live.videoId && host
        ? <iframe src={`https://www.youtube.com/live_chat?v=${live.videoId}&embed_domain=${host}`} title="Chat en vivo" />
        : <div className="chat-b"><span>El chat estará disponible durante la próxima transmisión.</span><a className="btn btn-red btn-sm" href={SITE.social.youtube} target="_blank" rel="noopener">Suscríbete al canal</a></div>}
    </aside>
  );
}

/* ---------- galería con visor ---------- */
export function Gallery({ items }: { items: { src: string; caption: string }[] }) {
  const [i, setI] = useState<number | null>(null);
  return (
    <>
      <div className="gal">
        {items.map((g, k) => (
          <button key={k} className="rv" onClick={() => setI(k)} aria-label={`Ampliar: ${g.caption}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt="" loading="lazy" /><figcaption>{g.caption}</figcaption>
          </button>
        ))}
      </div>
      {i !== null && (
        <div className="lightbox" role="dialog" aria-label={items[i].caption} onClick={(e) => e.target === e.currentTarget && setI(null)}>
          <button className="icon-btn x" onClick={() => setI(null)} aria-label="Cerrar" autoFocus><Icon d={P.x} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <figure><img src={items[i].src} alt="" /><figcaption>{items[i].caption}</figcaption></figure>
        </div>
      )}
    </>
  );
}

/* ---------- formulario de contacto ---------- */
export function ContactForm() {
  const [sending, setSending] = useState(false);
  return (
    <form className="form" noValidate onSubmit={async (e) => {
      e.preventDefault();
      const f = e.currentTarget; const fd = new FormData(f);
      const data = Object.fromEntries(fd) as Record<string, string>;
      if (!data.name?.trim() || !data.contact?.trim() || !data.message?.trim()) return toast("FALTA INFORMACIÓN", "Completa nombre, contacto y mensaje.");
      setSending(true);
      const r = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
      setSending(false);
      if (r?.ok) { f.reset(); toast("MENSAJE ENVIADO", "La redacción lo revisará. Gracias por escribirnos."); }
      else toast("NO SE PUDO ENVIAR", "Revisa tu conexión e inténtalo de nuevo.");
    }}>
      <div className="f2">
        <div className="fld"><label htmlFor="cName">Nombre</label><input id="cName" name="name" required autoComplete="name" /></div>
        <div className="fld"><label htmlFor="cContact">Teléfono o correo</label><input id="cContact" name="contact" required autoComplete="email" /></div>
      </div>
      <div className="fld"><label htmlFor="cKind">Tipo de mensaje</label><select id="cKind" name="kind"><option>Denuncia comunitaria</option><option>Sugerencia de historia</option><option>Publicidad</option><option>Otro</option></select></div>
      <div className="fld"><label htmlFor="cMsg">Mensaje</label><textarea id="cMsg" name="message" required placeholder="Cuéntanos qué pasó, dónde y cuándo." /></div>
      <button className="btn btn-red" type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar mensaje"} <Icon d={P.arrow} w={2.4} /></button>
    </form>
  );
}

/* ---------- aparición progresiva (respeta el estado visible por defecto) ---------- */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".rv:not(.in)").forEach((el) => { if (el.getBoundingClientRect().top > innerHeight) io.observe(el); });
    return () => io.disconnect();
  }, [path]);
  return null;
}

/* ---------- efecto del hero: líneas y partículas rojas ---------- */
export function HeroFx() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d")!; const dpr = Math.min(2, devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, visible = true;
    const resize = () => { w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const R = Math.random;
    const streaks = Array.from({ length: 14 }, () => ({ y: R(), x: R(), len: 0.08 + R() * 0.25, sp: 0.0006 + R() * 0.0016, a: 0.08 + R() * 0.25 }));
    const parts = Array.from({ length: 36 }, () => ({ x: R(), y: R(), r: 0.5 + R() * 1.6, sp: 0.00015 + R() * 0.0005, a: 0.2 + R() * 0.6 }));
    const tick = () => {
      raf = requestAnimationFrame(tick); if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const s of streaks) {
        s.x += s.sp; if (s.x > 1.3) { s.x = -0.3; s.y = R(); }
        const x = s.x * w, y = s.y * h, l = s.len * w; const g = ctx.createLinearGradient(x - l, y, x, y);
        g.addColorStop(0, "rgba(255,50,30,0)"); g.addColorStop(1, `rgba(255,70,40,${s.a})`);
        ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - l, y); ctx.lineTo(x, y); ctx.stroke();
      }
      for (const p of parts) { p.y -= p.sp; if (p.y < -0.05) { p.y = 1.05; p.x = R(); } ctx.fillStyle = `rgba(255,80,50,${p.a})`; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, 7); ctx.fill(); }
    };
    tick();
    const ob = new IntersectionObserver((e) => (visible = e[0].isIntersecting)); ob.observe(c);
    addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); ob.disconnect(); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}

/* ---------- podcast ---------- */
export function PodcastList({ eps }: { eps: { ep: number; title: string; meta: string; audio?: string | null }[] }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const toggle = (e: (typeof eps)[number]) => {
    if (playing === e.ep) { audio.current?.pause(); setPlaying(null); return; }
    audio.current?.pause();
    if (e.audio) { audio.current = new Audio(e.audio); audio.current.play(); } else toast("PODCAST", "Este episodio estará disponible pronto.");
    setPlaying(e.ep);
  };
  return (
    <div className="pods">
      {eps.map((e) => (
        <div key={e.ep} className={`pod rv ${playing === e.ep ? "playing" : ""}`}>
          <button className="pb" onClick={() => toggle(e)} aria-label={`${playing === e.ep ? "Pausar" : "Reproducir"} episodio ${e.ep}`}><Icon d={P.play} fill /></button>
          <div style={{ minWidth: 0 }}><span className="pod-ep">EPISODIO {e.ep}</span><h3>{e.title}</h3><small>{e.meta}</small></div>
          <div className="eq" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
      ))}
    </div>
  );
}
