import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/legacy/", "/api/"],
      },
    ],
    sitemap: "https://01-transfert-aeroport.fr/sitemap.xml",
    host: "https://01-transfert-aeroport.fr",
  };
}
