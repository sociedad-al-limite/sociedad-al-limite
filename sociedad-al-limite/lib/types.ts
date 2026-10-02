export type CategorySlug =
  | "nacional" | "local" | "politica" | "sociedad" | "educacion"
  | "religion" | "entrevistas" | "opinion" | "denuncias";

export type ContentType = "noticia" | "opinion" | "denuncia" | "declaracion" | "entrevista";

export type BodyBlock = string | { quote: string; cite: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  body: BodyBlock[];
  category: CategorySlug;
  type: ContentType;
  unconfirmed: boolean;   // denuncias o versiones no verificadas
  featured: boolean;
  developing: boolean;
  priority: number;       // 1 normal · 2 importante · 3 principal
  places: string[];
  tags: string[];
  author: string;
  coverUrl: string | null;
  youtubeId: string | null;
  views: number;
  publishedAt: string;    // ISO
  isDemo: boolean;
}

export interface Video {
  id: string;             // ID de YouTube
  title: string;
  thumbnail: string | null;
  publishedAt: string;
  duration: string | null;   // "12:48"
  views: number | null;
  url: string;
  isDemo: boolean;
}

export interface LiveStatus {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  startedAt: string | null;
  viewers: number | null;
  url: string;
}

export interface FacebookPost {
  id: string;
  text: string;
  createdAt: string;
  url: string;
  image: string | null;
  isDemo: boolean;
}

export interface Interview {
  id: string;
  name: string;
  role: string;
  topic: string;
  publishedAt: string;
  articleSlug: string | null;
  youtubeId: string | null;
  isDemo: boolean;
}

/** Respuesta de Saul: texto + publicaciones citadas (siempre de fuentes propias). */
export interface SaulReply {
  text: string;
  articles: Pick<Article, "slug" | "title" | "summary" | "type" | "unconfirmed" | "category" | "publishedAt">[];
  videos?: Pick<Video, "id" | "title" | "url" | "duration">[];
  live?: LiveStatus;
  source: "llm" | "reglas";
}
