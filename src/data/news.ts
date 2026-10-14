// Single source for news articles. The home slider, /news and /news/[slug]
// all read from here, so every listed article has a generated page.
export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  date?: string;
}

export const NEWS: NewsArticle[] = [
  {
    slug: "nhai-corridor-mapping",
    title: "Rishika Infra completes 10,000km NHAI corridor mapping",
    excerpt: "Aerial LiDAR and photogrammetry survey of national highway corridors for planning and right-of-way records.",
    img: "https://images.unsplash.com/photo-1545042746-ec9e5a59b359?q=80&w=1200&auto=format&fit=crop",
    date: "FEB 2026",
  },
  {
    slug: "thermal-drones-solar",
    title: "The power of Radiometric Thermal Drones in Solar Inspections",
    excerpt: "How string-level thermography finds defective cells, bypassed diodes and hotspots before they cost energy yield.",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    date: "MAR 2026",
  },
  {
    slug: "dgca-surveyxk-fleet",
    title: "DGCA approves new Type-Certified SURVEYXK fleet operations",
    excerpt: "Our type-certified SURVEYXK platforms are cleared for commercial inspection and survey operations.",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "grid-modernization",
    title: "Affordability vs Modernization in the Indian Power Grid",
    excerpt: "Why drone-based inspection helps utilities modernise transmission assets without inflating maintenance budgets.",
    img: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "ai-defect-detection",
    title: "Automated defect detection using localized spatial ETL",
    excerpt: "Turning raw inspection imagery into geo-tagged, prioritised defect reports.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop",
  },
];
