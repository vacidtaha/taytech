import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [docs, topCategories] = await Promise.all([
    prisma.productDocument.findMany({
      include: {
        product: {
          include: {
            category: {
              include: {
                parent: {
                  include: {
                    parent: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const documents = docs.map((doc) => {
    const cat = doc.product.category;
    const parentCat = cat.parent;
    const grandParentCat = parentCat?.parent;
    const topCategory = grandParentCat ?? parentCat ?? cat;

    return {
      id: doc.id,
      nameTr: doc.nameTr,
      nameEn: doc.nameEn,
      url: doc.url,
      urlEn: doc.urlEn,
      type: doc.type,
      productNameTr: doc.product.nameTr,
      productNameEn: doc.product.nameEn,
      productSlug: doc.product.slug,
      categoryNameTr: cat.nameTr,
      categoryNameEn: cat.nameEn,
      topCategoryNameTr: topCategory.nameTr,
      topCategoryNameEn: topCategory.nameEn,
    };
  });

  const allCategories = topCategories.map((c) => ({
    nameTr: c.nameTr,
    nameEn: c.nameEn,
  }));

  return NextResponse.json({ documents, allCategories });
}
