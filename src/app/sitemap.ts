import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://taytech.com.tr";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/urunler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/kurumsal`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/dokuman-merkezi`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/cozumler`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/cozumler/toplu-konutlar`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/hastaneler`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/ticari-tesisler`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/egitim-yapilari`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/spor-eglence-tesisleri`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/endustriyel-kazan-dairesi`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/bakim-huzur-evleri`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/saha-disi-uretim`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/cozumler/yeni-projeler`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/haberler`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/bilgi-merkezi/sikca-sorulan-sorular`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/bilgi-merkezi/teknik-destek`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/bilgi-merkezi/taytech-akademi`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/bilgi-merkezi/video-arsivi`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/gizlilik-politikasi`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/kullanim-kosullari`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/site-haritasi`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const allCategories = await prisma.category.findMany({
    select: { slug: true, parent: { select: { slug: true, parent: { select: { slug: true } } } } },
  });

  const categoryPages: MetadataRoute.Sitemap = allCategories.map((cat) => {
    const slugParts: string[] = [];
    if (cat.parent?.parent?.slug) slugParts.push(cat.parent.parent.slug);
    if (cat.parent?.slug) slugParts.push(cat.parent.slug);
    slugParts.push(cat.slug);

    return {
      url: `${baseUrl}/urunler/${slugParts.join("/")}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const allProducts = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      updatedAt: true,
      category: { select: { slug: true, parent: { select: { slug: true, parent: { select: { slug: true } } } } } },
    },
  });

  const productPages: MetadataRoute.Sitemap = allProducts.map((prod) => {
    const slugParts: string[] = [];
    if (prod.category?.parent?.parent?.slug) slugParts.push(prod.category.parent.parent.slug);
    if (prod.category?.parent?.slug) slugParts.push(prod.category.parent.slug);
    if (prod.category?.slug) slugParts.push(prod.category.slug);
    slugParts.push(prod.slug);

    return {
      url: `${baseUrl}/urunler/${slugParts.join("/")}`,
      lastModified: prod.updatedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [...staticPages, ...categoryPages, ...productPages];
}
