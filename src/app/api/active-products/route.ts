import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { image: { not: null } },
        { descriptionTr: { not: "" } },
      ],
    },
    select: { slug: true, categoryId: true },
  });

  const slugs = new Set<string>();
  products.forEach((p) => slugs.add(p.slug));

  const categoryIds = [...new Set(products.map((p) => p.categoryId))];
  const addParents = async (ids: number[]) => {
    const cats = await prisma.category.findMany({
      where: { id: { in: ids } },
      select: { slug: true, parentId: true },
    });
    const parentIds: number[] = [];
    for (const c of cats) {
      slugs.add(c.slug);
      if (c.parentId) parentIds.push(c.parentId);
    }
    if (parentIds.length > 0) await addParents(parentIds);
  };
  await addParents(categoryIds);

  return NextResponse.json([...slugs], {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
