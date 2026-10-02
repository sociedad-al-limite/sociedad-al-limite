import { NextResponse, type NextRequest } from "next/server";

/* Protege el panel (/admin) y su API con usuario y contraseña
   definidos en ADMIN_USER y ADMIN_PASSWORD. Si no están definidos,
   el panel queda bloqueado. Para varios editores, migrar a Auth.js. */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER, pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return new NextResponse("Panel desactivado: configura ADMIN_USER y ADMIN_PASSWORD.", { status: 503 });
  const auth = req.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, p] = atob(encoded).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }
  return new NextResponse("Acceso restringido", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Sociedad al Limite - Panel"' } });
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
