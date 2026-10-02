# Sociedad al Límite — sitio oficial

**Las cosas como son.** Medio digital de noticias, entrevistas, análisis y contenido audiovisual de República Dominicana, con prioridad en Consuelo y San Pedro de Macorís.

Este proyecto ya funciona sin ninguna clave: muestra **contenido de demostración** (claramente marcado) hasta que conectes la base de datos y las APIs. Cada integración se activa sola cuando agregas su variable de entorno.

---

## 1. Puesta en marcha (5 minutos)

```bash
npm install
cp .env.example .env.local     # rellena lo que tengas; lo vacío usa la demo
npm run dev                    # http://localhost:3000
```

Para publicar: sube la carpeta a GitHub e impórtala en **Vercel** (recomendado para Next.js). Copia las variables de `.env.example` en *Vercel → Settings → Environment Variables*.

## 2. Tecnología y por qué

| Pieza | Elección | Motivo |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Páginas renderizadas en el servidor (rápidas y bien posicionadas en Google), rutas de API para guardar las claves fuera del navegador, regeneración cada 5 min. |
| Estilos | **Tailwind CSS** + hoja de marca (`app/globals.css`) | Los tokens de marca (negro, rojos, plata) están en `tailwind.config.ts`; los componentes de identidad (tarjetas, Saul, hero) están en CSS para mantener el detalle visual del diseño. |
| Base de datos | **PostgreSQL + Prisma** | Esquema listo para noticias, entrevistas, podcast, galería, redes, notas de Saul, suscripciones push y estadísticas. Neon o Supabase tienen plan gratuito. |
| Tipografías | Saira Condensed, Libre Franklin, Source Serif 4 (auto-alojadas) | Sin peticiones a Google en cada visita. |

## 3. Dónde van las credenciales

Todas en `.env.local` / Vercel. **Ninguna clave secreta se envía al navegador**: solo las variables `NEXT_PUBLIC_*` (URLs públicas y la clave pública VAPID) llegan al frontend.

| Integración | Variables | Dónde se usa |
|---|---|---|
| Redes oficiales | `NEXT_PUBLIC_YOUTUBE_URL`, `…_FACEBOOK_URL`, `…_INSTAGRAM_URL`, `…_TIKTOK_URL`, `…_WHATSAPP_URL` | `lib/config.ts` |
| Noticias | `DATABASE_URL` | `lib/data/news.ts` |
| YouTube (videos + en vivo) | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` | `lib/integrations/youtube.ts` |
| Facebook | `FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN` | `lib/integrations/facebook.ts` |
| IA de Saul | `ANTHROPIC_API_KEY`, `SAUL_MODEL` | `lib/saul/llm.ts` |
| Panel | `ADMIN_USER`, `ADMIN_PASSWORD` | `middleware.ts` |
| Alertas push | `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` | `lib/push.ts`, `public/sw.js` |

### Base de datos
```bash
# 1. Crea una base PostgreSQL (Neon/Supabase) y pega la URL en DATABASE_URL
npm run db:push     # crea las tablas
npm run db:seed     # crea las secciones (Política, Sociedad, Locales…)
```
En cuanto haya noticias publicadas desde el panel, el sitio deja de mostrar la demo.

### YouTube
1. Google Cloud Console → crea un proyecto → habilita **YouTube Data API v3** → crea una **API key** (restríngela a esa API).
2. El ID del canal empieza por `UC…` (YouTube Studio → Configuración → Canal → Configuración avanzada).
3. El botón **EN VIVO** y la sección *Transmisión en vivo* consultan `/api/youtube/live` cada 2 minutos. Cuando hay directo, el botón se enciende y la página `/en-vivo` muestra el video y el chat.
4. Los videos solo cargan el reproductor de YouTube cuando el lector toca *reproducir* (ahorra datos y acelera la página).

### Facebook
Crea una app en developers.facebook.com, obtén un **token de página de larga duración** con `pages_read_engagement` (requiere revisión de Meta). Sin token, la sección muestra el botón *Seguir en Facebook* y publicaciones de ejemplo.

## 4. Saul — El León de Sociedad al Límite

- **Sin `ANTHROPIC_API_KEY`**: Saul usa un motor de reglas (`lib/saul/rules.ts`) que entiende las preguntas frecuentes (hoy, lo más importante, Consuelo, San Pedro, secciones, videos, entrevistas, en vivo, búsqueda).
- **Con `ANTHROPIC_API_KEY`**: el servidor recupera las publicaciones relevantes del sitio y se las pasa a la IA con instrucciones estrictas (`lib/saul/llm.ts`):
  - responde **solo** con esas fuentes; si no hay información dice exactamente *“No tengo información confirmada sobre ese tema en las fuentes disponibles de Sociedad al Límite.”*;
  - distingue noticia, opinión, declaración, denuncia e información no confirmada;
  - atribuye las denuncias (“Según la publicación de Sociedad al Límite…”);
  - el servidor valida que cada noticia citada exista antes de mostrarla.
- Si la IA falla, responde el motor de reglas. Límite: 20 preguntas por minuto por visitante.
- El equipo puede darle contexto adicional (horarios del programa, correcciones) con el modelo `SaulNote` desde el panel.

## 5. Panel administrativo (`/admin`)

Protegido con usuario y contraseña (`ADMIN_USER` / `ADMIN_PASSWORD`). Ya permite crear noticias con sección, tipo, verificación, prioridad, lugares, etiquetas, imagen, video de YouTube y las marcas *Noticia del momento*, *En desarrollo* y *Última hora* (esta última envía la notificación push). La API (`/api/admin/articles`) incluye editar (PUT) y eliminar (DELETE).

Siguientes módulos previstos en el esquema: entrevistas, videos destacados, enlaces de redes, notas de Saul, galería, subida de imágenes (Vercel Blob o Cloudinary) y estadísticas (`DailyStat`). Para varios editores con roles, migrar la protección a Auth.js.

## 6. SEO incluido

Meta title y description, Open Graph, tarjetas de X, `NewsArticle` y `NewsMediaOrganization` en Schema.org, URLs amigables (`/noticias/titular-de-la-noticia`), canonical por página, `sitemap.xml`, `robots.txt` y manifiesto web. Las noticias de demostración se marcan `noindex` y no entran al sitemap.

## 7. Estructura

```
app/
  page.tsx                 Portada (hero, noticia del momento, últimas, secciones, locales, YouTube, entrevistas, podcast, Facebook, galería, redes, contacto)
  noticias/[slug]/         Página individual con compartir, fotos, video y relacionadas
  seccion/[cat]/           Política, Sociedad, Locales, Educación, Religión, Entrevistas, Opinión, Denuncias, Nacional
  buscar/                  Buscador (noticias, videos, entrevistas)
  en-vivo/                 Transmisión + chat de YouTube
  admin/                   Panel
  api/                     saul · search · youtube/{live,videos} · facebook/posts · push/subscribe · contact · admin/articles
components/                Header, Saul, tarjetas, reproductor ligero, galería…
lib/
  config.ts                Marca, secciones, menú, redes
  data/news.ts             Repositorio de noticias (BD o demo)
  data/demo.ts             Contenido de demostración
  integrations/            YouTube y Facebook
  saul/                    Motor de reglas + IA
  push.ts                  Notificaciones de última hora
prisma/schema.prisma       Modelo de datos
```

## 8. Antes del lanzamiento

- [ ] Reemplazar las URLs de redes y el correo en `.env`.
- [ ] Conectar la base de datos y publicar las primeras noticias reales (la demo desaparece sola).
- [ ] Revisar con un abogado las páginas de *Privacidad* y *Términos* (son borradores).
- [ ] Sustituir las imágenes ilustrativas por fotografías reales desde el panel.
- [ ] Registrar el dominio en Google Search Console y enviar el sitemap.
