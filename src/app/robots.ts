import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://taytech.com.tr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      "https://taytech.com/sitemap.xml",
    ],
    host: baseUrl,
  };
}
