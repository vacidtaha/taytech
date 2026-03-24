import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { CategoryClient } from "./CategoryClient";
import { ProductClient } from "./ProductClient";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function ProductOrCategoryPage({ params }: Props) {
  const { slug } = await params;
  const currentSlug = slug[slug.length - 1];

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
    return <CategoryClient category={JSON.parse(JSON.stringify(category))} slug={slug} />;
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
    return <ProductClient product={JSON.parse(JSON.stringify(product))} slug={slug} />;
  }

  notFound();
}
