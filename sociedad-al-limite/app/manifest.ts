import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sociedad al Límite", short_name: "Al Límite", description: "Las cosas como son",
    start_url: "/", display: "standalone", background_color: "#070708", theme_color: "#e3261b", lang: "es-DO",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }]
  };
}
