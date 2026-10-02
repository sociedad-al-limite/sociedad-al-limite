import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Política de privacidad", alternates: { canonical: "/privacidad" } };

// BORRADOR: debe ser revisado por un profesional legal antes de publicarse.
export default function Page() {
  return (
    <>
      <div className="page-hero"><div className="wrap"><nav className="crumbs"><Link href="/">Inicio</Link><span>›</span><span>Política de privacidad</span></nav><h1 style={{ marginTop: 14 }}>Política de privacidad</h1></div></div>
      <section className="sec wrap"><div className="art art-body" style={{ padding: 0 }}>
        <p>Este texto es un borrador y debe ser revisado por un profesional legal antes de publicarse.</p>
        <p>Sociedad al Límite recopila únicamente los datos que el visitante envía de forma voluntaria (por ejemplo, en el formulario de contacto) y los utiliza para responder su mensaje.</p>
        <p>Las notificaciones de última hora solo se envían si el visitante da su permiso en el navegador, y pueden desactivarse en cualquier momento.</p>
      </div></section>
    </>
  );
}
