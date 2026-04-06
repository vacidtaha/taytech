import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

async function buildCategoryPath(categoryId: number): Promise<string[]> {
  const parts: string[] = [];
  let currentId: number | null = categoryId;

  while (currentId !== null) {
    const row: { slug: string; parentId: number | null } | null =
      await prisma.category.findUnique({
        where: { id: currentId },
        select: { slug: true, parentId: true },
      });
    if (!row) break;
    parts.unshift(row.slug);
    currentId = row.parentId;
  }

  return parts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://taytech.com.tr";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: "2026-04-06", changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/urunler`, lastModified: "2026-04-06", changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/kurumsal`, lastModified: "2026-03-15", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/iletisim`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/dokuman-merkezi`, lastModified: "2026-04-06", changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/cozumler`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/cozumler/toplu-konutlar`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/hastaneler`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/ticari-tesisler`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/egitim-yapilari`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/spor-eglence-tesisleri`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/endustriyel-kazan-dairesi`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/bakim-huzur-evleri`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/saha-disi-uretim`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/yeni-projeler`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/haberler`, lastModified: "2026-03-15", changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/bilgi-merkezi/sikca-sorulan-sorular`, lastModified: "2026-03-15", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/bilgi-merkezi/teknik-destek`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/bilgi-merkezi/taytech-akademi`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/bilgi-merkezi/video-arsivi`, lastModified: "2026-03-10", changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/gizlilik-politikasi`, lastModified: "2026-03-01", changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/kullanim-kosullari`, lastModified: "2026-03-01", changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/site-haritasi`, lastModified: "2026-04-06", changeFrequency: "monthly", priority: 0.3 },
  ];

  const allCategories = await prisma.category.findMany({
    select: { id: true, slug: true, parentId: true, updatedAt: true },
  });

  const categoryPages: MetadataRoute.Sitemap = [];
  for (const cat of allCategories) {
    const slugParts = await buildCategoryPath(cat.id);
    categoryPages.push({
      url: `${baseUrl}/urunler/${slugParts.join("/")}`,
      lastModified: cat.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const allProducts = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true, categoryId: true },
  });

  const productPages: MetadataRoute.Sitemap = [];
  for (const prod of allProducts) {
    const catParts = await buildCategoryPath(prod.categoryId);
    catParts.push(prod.slug);
    productPages.push({
      url: `${baseUrl}/urunler/${catParts.join("/")}`,
      lastModified: prod.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
