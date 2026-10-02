import type { CategorySlug } from "./types";

/** Configuración pública del sitio. Solo valores NEXT_PUBLIC_ (nunca secretos). */
export const SITE = {
  name: "Sociedad al Límite",
  slogan: "Las cosas como son",
  title: "Sociedad al Límite | Las cosas como son",
  description:
    "Sociedad al Límite: noticias, entrevistas, análisis y actualidad de República Dominicana. Las cosas como son.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "redaccion@sociedadallimite.com",
  social: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/results?search_query=Sociedad+al+L%C3%ADmite",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/search/top?q=Sociedad%20al%20L%C3%ADmite",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/"
  }
} as const;

export const CATEGORIES: Record<CategorySlug, { name: string; desc: string }> = {
  nacional: { name: "Nacional", desc: "Lo que pasa en República Dominicana." },
  local: { name: "Locales", desc: "Noticias de Consuelo, San Pedro de Macorís y otras comunidades." },
  politica: { name: "Política", desc: "Noticias y acontecimientos políticos." },
  sociedad: { name: "Sociedad", desc: "Historias y acontecimientos sociales." },
  educacion: { name: "Educación", desc: "Noticias relacionadas con educación." },
  religion: { name: "Religión", desc: "Actualidad y debates religiosos." },
  entrevistas: { name: "Entrevistas", desc: "Entrevistas exclusivas de Sociedad al Límite." },
  opinion: { name: "Opinión", desc: "Análisis y comentarios." },
  denuncias: { name: "Denuncias", desc: "Situaciones comunitarias y denuncias ciudadanas." }
};

export const NAV: [string, string][] = [
  ["/", "Inicio"], ["/#ultimas", "Últimas Noticias"], ["/seccion/nacional", "Nacional"],
  ["/seccion/local", "Local"], ["/seccion/politica", "Política"], ["/seccion/sociedad", "Sociedad"],
  ["/seccion/educacion", "Educación"], ["/seccion/religion", "Religión"], ["/seccion/entrevistas", "Entrevistas"],
  ["/seccion/opinion", "Opinión"], ["/#videos", "Videos"], ["/en-vivo", "En Vivo"], ["/#contacto", "Contacto"]
];

export const PRIORITY_PLACES = ["Consuelo", "San Pedro de Macorís"];
