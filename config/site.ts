export const siteConfig = {
  name: "Resource Index",
  description: "A comprehensive resource indexing platform",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    twitter: "",
    github: "",
  },
};

export type SiteConfig = typeof siteConfig;
