import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Términos y condiciones", alternates: { canonical: "/terminos" } };

// BORRADOR: debe ser revisado por un profesional legal antes de publicarse.
export default function Page() {
  return (
    <>
      <div className="page-hero"><div className="wrap"><nav className="crumbs"><Link href="/">Inicio</Link><span>›</span><span>Términos y condiciones</span></nav><h1 style={{ marginTop: 14 }}>Términos y condiciones</h1></div></div>
      <section className="sec wrap"><div className="art art-body" style={{ padding: 0 }}>
        <p>Este texto es un borrador y debe ser revisado por un profesional legal antes de publicarse.</p>
        <p>El contenido publicado por Sociedad al Límite está protegido. Se permite compartir enlaces a las publicaciones citando la fuente.</p>
        <p>Las opiniones expresadas en columnas y entrevistas pertenecen a sus autores.</p>
      </div></section>
    </>
  );
}
