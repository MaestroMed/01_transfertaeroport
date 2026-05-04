import type { MetadataRoute } from "next";

const BASE = "https://01-transfert-aeroport.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    // Phase 2 ajoutera : /aeroport/cdg, /aeroport/beauvais, /zone/*, /transfert/[commune], /blog/*
  ];
}
