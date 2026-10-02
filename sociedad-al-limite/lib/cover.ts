// Arte de portada generado (SVG) para contenido sin imagen.
// Se usa en la demo y como respaldo cuando una noticia no tiene foto.
/* eslint-disable */
export const CATS: Record<string, { name: string; desc: string; glyph: string }> = {
  nacional:   { name: "Nacional",    desc: "Lo que pasa en República Dominicana.", glyph: "M12 12v10M8 22h8M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M12 13.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" },
  local:      { name: "Locales",     desc: "Noticias de Consuelo, San Pedro de Macorís y otras comunidades.", glyph: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
  politica:   { name: "Política",    desc: "Noticias y acontecimientos políticos.", glyph: "M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10h20L12 3Z" },
  sociedad:   { name: "Sociedad",    desc: "Historias y acontecimientos sociales.", glyph: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 14.5c.6-.3 1.3-.5 2-.5 3.3 0 6 2.7 6 6" },
  educacion:  { name: "Educación",   desc: "Noticias relacionadas con educación.", glyph: "M2 9l10-5 10 5-10 5ZM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" },
  religion:   { name: "Religión",    desc: "Actualidad y debates religiosos.", glyph: "M12 2v4M10 4h4M7 22V11l5-4 5 4v11M4 22h16M10 22v-5a2 2 0 0 1 4 0v5" },
  entrevistas:{ name: "Entrevistas", desc: "Entrevistas exclusivas de Sociedad al Límite.", glyph: "M12 15a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4ZM5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" },
  opinion:    { name: "Opinión",     desc: "Análisis y comentarios.", glyph: "M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12ZM8 12h.01M12 12h.01M16 12h.01" },
  denuncias:  { name: "Denuncias",   desc: "Situaciones comunitarias y denuncias ciudadanas.", glyph: "M3 10.5v3a1 1 0 0 0 1 1h3l6 5V4.5l-6 5H4a1 1 0 0 0-1 1ZM17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" }
};

const GLYPH: Record<string,string> = {
  video: "M6 4l14 8-14 8Z",
  podcast: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-6h3ZM3 19a2 2 0 0 0 2 2h1v-6H3Z",
  camera: "M3 8a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
};

function rng(seed: number){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(s: string){ let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
const coverCache = new Map<string,string>();
export function cover(key: string, kind: string, w = 640, h = 360, opts: { portrait?: number } = {}): string {
  const ck = `${key}|${kind}|${w}|${h}|${opts.portrait||""}`;
  if (coverCache.has(ck)) return coverCache.get(ck)!;
  const r = rng(hash(ck));
  const glyph = (CATS[kind] && CATS[kind].glyph) || GLYPH[kind] || CATS.nacional.glyph;
  const label = ((CATS[kind] && CATS[kind].name) || kind).toUpperCase();
  const gx = (0.25 + r() * 0.6) * w, gy = (0.2 + r() * 0.6) * h;
  const hue = Math.round(r() * 14);
  let lines = "";
  const ang = -20 - r() * 25;
  for (let i = 0; i < 9; i++){ const y = r() * h * 1.6 - h * .3; const o = (.05 + r() * .22).toFixed(2); const sw = (.6 + r() * 2.4).toFixed(1); lines += `<line x1="-60" y1="${y.toFixed(0)}" x2="${w + 60}" y2="${y.toFixed(0)}" stroke="rgba(255,${60+hue*3},40,${o})" stroke-width="${sw}"/>`; }
  let dots = "";
  const cols = Math.ceil(w / 14), rows = Math.ceil(h / 14);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++){
    const px = x * 14 + 7, py = y * 14 + 7;
    const d = Math.hypot(px - gx, py - gy) / Math.max(w, h);
    const rad = Math.max(0, 3.2 - d * 7.5);
    if (rad > .25) dots += `<circle cx="${px}" cy="${py}" r="${rad.toFixed(2)}"/>`;
  }
  const gs = Math.min(w, h) * (opts.portrait ? .5 : .9) / 24;
  const gxp = opts.portrait ? w * .62 : w - gs * 24 * .85 - r() * w * .08;
  const gyp = opts.portrait ? h * .06 : (h - gs * 24) / 2 + (r() - .5) * h * .2;
  let figure = "";
  if (opts.portrait){
    const cx = w * .5, hy = h * .4, hr = w * .19;
    figure = `<g><ellipse cx="${cx}" cy="${h * 1.05}" rx="${w * .46}" ry="${h * .36}" fill="url(#mt)"/><rect x="${cx - hr*.45}" y="${hy + hr*.7}" width="${hr*.9}" height="${hr*.9}" fill="url(#mt)"/><circle cx="${cx}" cy="${hy}" r="${hr}" fill="url(#mt)"/><path d="M${cx + hr*.95} ${hy - hr*.3} A${hr} ${hr} 0 0 1 ${cx + hr*.2} ${hy + hr*.98}" stroke="#ff4027" stroke-width="3" fill="none" opacity=".85"/></g>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b0b0e"/><stop offset="1" stop-color="#1c0504"/></linearGradient>
<radialGradient id="gl" cx="${(gx / w).toFixed(2)}" cy="${(gy / h).toFixed(2)}" r=".65"><stop offset="0" stop-color="#ff3b22" stop-opacity=".75"/><stop offset=".35" stop-color="#a3140c" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5d63"/><stop offset=".5" stop-color="#26272b"/><stop offset="1" stop-color="#0d0d10"/></linearGradient>
<linearGradient id="ms" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#8f949b"/><stop offset="1" stop-color="#d9dce0"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/><rect width="${w}" height="${h}" fill="url(#gl)"/>
<g transform="rotate(${ang.toFixed(1)} ${w/2} ${h/2})">${lines}</g>
<g fill="rgba(255,90,60,.32)">${dots}</g>
${figure}
<g transform="translate(${gxp.toFixed(0)} ${gyp.toFixed(0)}) scale(${gs.toFixed(2)})" fill="none" stroke="url(#ms)" stroke-width="${(1.1).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" opacity="${opts.portrait ? .35 : .55}"><path d="${glyph}"/></g>
<text x="${w * .04}" y="${h * .93}" font-family="Saira Condensed,Arial Narrow,Impact,sans-serif" font-weight="900" font-size="${(h * .3).toFixed(0)}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1.5" letter-spacing="2">${label}</text>
</svg>`;
  const uri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  coverCache.set(ck, uri);
  return uri;
}
