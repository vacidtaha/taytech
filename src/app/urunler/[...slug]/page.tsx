import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CategoryClient } from "./CategoryClient";
import { ProductClient } from "./ProductClient";
import { JsonLd } from "@/components/JsonLd";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const currentSlug = slug[slug.length - 1];
  const fullPath = `/urunler/${slug.join("/")}`;

  const category = await prisma.category.findUnique({
    where: { slug: currentSlug },
    select: { nameTr: true, nameEn: true },
  });

  if (category) {
    const title = category.nameTr;
    const desc = `${category.nameTr} - Taytech ürün kategorisi. Akıllı kontrol panoları, ısı istasyonları ve endüstriyel otomasyon çözümleri.`;
    return {
      title,
      description: desc,
      alternates: { canonical: fullPath },
      openGraph: {
        title: `${title} | Taytech`,
        description: desc,
        url: `https://taytech.com.tr${fullPath}`,
        type: "website",
      },
    };
  }

  const product = await prisma.product.findUnique({
    where: { slug: currentSlug },
    select: { nameTr: true, nameEn: true, descriptionTr: true, image: true, category: { select: { nameTr: true } } },
  });

  if (product) {
    const title = product.nameTr;
    const rawDesc = product.descriptionTr || "";
    const firstParagraph = rawDesc.split("\n").find((l) => l.trim().length > 30 && !l.startsWith("•") && !/^[A-ZÇĞİÖŞÜ\s]+$/.test(l.trim()));
    const desc = firstParagraph ? firstParagraph.trim().substring(0, 160) : `${product.nameTr} - ${product.category?.nameTr || "Taytech"} ürünü. Teknik özellikler, dokümanlar ve detaylı bilgi.`;

    return {
      title,
      description: desc,
      alternates: { canonical: fullPath },
      openGraph: {
        title: `${title} | Taytech`,
        description: desc,
        url: `https://taytech.com.tr${fullPath}`,
        type: "article",
        images: product.image ? [{ url: product.image, width: 800, height: 800, alt: product.nameTr }] : undefined,
      },
    };
  }

  return { title: "Ürün Bulunamadı" };
}

export default async function ProductOrCategoryPage({ params }: Props) {
  const { slug } = await params;
  const currentSlug = slug[slug.length - 1];
  const fullPath = `/urunler/${slug.join("/")}`;

  const category = await prisma.category.findUnique({
    where: { slug: currentSlug },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
        include: {
          children: { orderBy: { sortOrder: "asc" } },
        },
      },
      parent: true,
      products: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (category) {
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://taytech.com.tr" },
        { "@type": "ListItem", position: 2, name: "Ürünler", item: "https://taytech.com.tr/urunler" },
        ...slug.map((s, i) => ({
          "@type": "ListItem",
          position: i + 3,
          name: i === slug.length - 1 ? category.nameTr : s,
          item: `https://taytech.com.tr/urunler/${slug.slice(0, i + 1).join("/")}`,
        })),
      ],
    };

    return (
      <>
        <JsonLd data={breadcrumbLd} />
        <CategoryClient category={JSON.parse(JSON.stringify(category))} slug={slug} />
      </>
    );
  }

  const product = await prisma.product.findUnique({
    where: { slug: currentSlug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      documents: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (product) {
    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.nameTr,
      description: product.descriptionTr?.split("\n").find((l: string) => l.trim().length > 30 && !l.startsWith("•"))?.trim() || product.nameTr,
      image: product.image ? `https://taytech.com.tr${product.image}` : undefined,
      brand: { "@type": "Brand", name: "Taytech" },
      manufacturer: {
        "@type": "Organization",
        name: "Taytech Otomasyon ve Bilişim A.Ş.",
        url: "https://taytech.com.tr",
      },
      url: `https://taytech.com.tr${fullPath}`,
      category: product.category?.nameTr,
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://taytech.com.tr" },
        { "@type": "ListItem", position: 2, name: "Ürünler", item: "https://taytech.com.tr/urunler" },
        ...slug.map((s, i) => ({
          "@type": "ListItem",
          position: i + 3,
          name: i === slug.length - 1 ? product.nameTr : s,
          item: `https://taytech.com.tr/urunler/${slug.slice(0, i + 1).join("/")}`,
        })),
      ],
    };

    return (
      <>
        <JsonLd data={productLd} />
        <JsonLd data={breadcrumbLd} />
        <ProductClient product={JSON.parse(JSON.stringify(product))} slug={slug} />
      </>
    );
  }

  notFound();
}
