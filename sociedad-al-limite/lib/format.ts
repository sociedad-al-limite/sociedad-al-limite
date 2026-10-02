const fDate = new Intl.DateTimeFormat("es-DO", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Santo_Domingo" });
const fTime = new Intl.DateTimeFormat("es-DO", { hour: "numeric", minute: "2-digit", timeZone: "America/Santo_Domingo" });
const fNum = new Intl.NumberFormat("es-DO");

export const fmtDate = (iso: string) => fDate.format(new Date(iso)).replace(/\./g, "");
export const fmtTime = (iso: string) => fTime.format(new Date(iso));
export const fmtNum = (n: number) => fNum.format(n);

export function ago(iso: string): string {
  const h = (Date.now() - new Date(iso).getTime()) / 3600e3;
  if (h < 1) return "Hace minutos";
  if (h < 24) return `Hace ${Math.round(h)} h`;
  const d = Math.round(h / 24);
  return d === 1 ? "Ayer" : `Hace ${d} días`;
}

export const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export const hoursAgo = (h: number) => {
  const d = new Date(Date.now() - h * 3600e3);
  d.setMinutes(Math.floor(d.getMinutes() / 5) * 5, 0, 0);
  return d.toISOString();
};
