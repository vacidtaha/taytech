import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameTr: "asc" }],
    include: {
      _count: { select: { products: true, children: true } },
    },
  });

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameTr: "asc" }],
    select: {
      id: true,
      slug: true,
      nameTr: true,
      nameEn: true,
      image: true,
      isActive: true,
      categoryId: true,
      _count: { select: { variants: true } },
    },
  });

  return NextResponse.json({ categories, products });
}
