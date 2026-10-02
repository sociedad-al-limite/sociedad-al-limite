import type { Metadata, Viewport } from "next";
import Link from "next/link";
// Tipografías auto-alojadas (sin peticiones a Google en cada visita).
import "@fontsource/saira-condensed/latin-600.css";
import "@fontsource/saira-condensed/latin-700.css";
import "@fontsource/saira-condensed/latin-800.css";
import "@fontsource/saira-condensed/latin-900.css";
import "@fontsource/libre-franklin/latin-400.css";
import "@fontsource/libre-franklin/latin-500.css";
import "@fontsource/libre-franklin/latin-600.css";
import "@fontsource/libre-franklin/latin-700.css";
import "@fontsource/source-serif-4/latin-400.css";
import "@fontsource/source-serif-4/latin-600.css";
import "./globals.css";
import { SITE } from "@/lib/config";
import { getAllArticles } from "@/lib/data/news";
import { fmtTime } from "@/lib/format";
import { LionDefs } from "@/components/Lion";
import { Header, Reveal, SocialMini, Toasts } from "@/components/client";
import Saul from "@/components/Saul";


export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | Sociedad al Límite" },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_DO", siteName: SITE.name, title: SITE.title, description: SITE.description, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name }] },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: ["/og-image.jpg"] },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { themeColor: "#070708", viewportFit: "cover", width: "device-width", initialScale: 1 };
export const revalidate = 300;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const latest = (await getAllArticles()).slice(0, 7);
  const isDemo = latest.some((a) => a.isDemo);
  const ticker = latest.map((a) => (
    <Link key={a.slug} href={`/noticias/${a.slug}`}><time>{fmtTime(a.publishedAt)}</time>{a.title}</Link>
  ));
  const orgLd = { "@context": "https://schema.org", "@type": "NewsMediaOrganization", name: SITE.name, slogan: SITE.slogan, url: SITE.url, logo: `${SITE.url}/logo.webp`, sameAs: Object.values(SITE.social) };

  return (
    <html lang="es-DO">
      <body>
        <LionDefs />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        {isDemo && <div className="demo-strip" role="note"><b>CONTENIDO DE DEMOSTRACIÓN</b> · <span className="long">Las noticias, videos y personas de esta página son ejemplos para probar el diseño. </span>No describen hechos reales.</div>}
        <div className="ticker" aria-label="Última hora">
          <div className="ticker-label"><span aria-hidden="true">⚡</span> ÚLTIMA HORA</div>
          <div className="ticker-track"><div className="ticker-run">{ticker}<span aria-hidden="true" style={{ display: "contents" }}>{ticker}</span></div></div>
        </div>
        <Header />
        <main id="main">{children}</main>
        <footer className="ftr">
          <div className="wrap ftr-in">
            <div className="ftr-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-sm.webp" alt="Sociedad al Límite" width={170} height={116} loading="lazy" />
              <b>SOCIEDAD AL LÍMITE</b><em>Las cosas como son</em>
              <div className="drawer-social" style={{ marginTop: 18 }}><SocialMini /></div>
            </div>
            <div><h4>Secciones</h4><ul><li><Link href="/">Inicio</Link></li><li><Link href="/buscar">Noticias</Link></li><li><Link href="/seccion/politica">Política</Link></li><li><Link href="/seccion/sociedad">Sociedad</Link></li><li><Link href="/seccion/local">Local</Link></li></ul></div>
            <div><h4>Multimedia</h4><ul><li><Link href="/seccion/entrevistas">Entrevistas</Link></li><li><Link href="/#videos">Videos</Link></li><li><Link href="/en-vivo">En Vivo</Link></li><li><Link href="/#podcast">Podcast</Link></li><li><Link href="/#galeria">Galería</Link></li></ul></div>
            <div><h4>El medio</h4><ul><li><Link href="/#contacto">Contacto</Link></li><li><Link href="/#contacto">Envía tu denuncia</Link></li><li><Link href="/privacidad">Política de privacidad</Link></li><li><Link href="/terminos">Términos y condiciones</Link></li></ul></div>
          </div>
          <div className="wrap ftr-bot">
            <span>© 2026 Sociedad al Límite. Todos los derechos reservados.</span>
            <nav><Link href="/privacidad">Privacidad</Link><Link href="/terminos">Términos</Link><a href="#top">Volver arriba ↑</a></nav>
          </div>
        </footer>
        <Saul />
        <Toasts />
        <Reveal />
      </body>
    </html>
  );
}
