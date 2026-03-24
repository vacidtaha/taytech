import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categoryId = searchParams.get("categoryId");

  const products = await prisma.product.findMany({
    where: categoryId ? { categoryId: Number(categoryId) } : undefined,
    orderBy: [{ sortOrder: "asc" }, { nameTr: "asc" }],
    include: {
      category: true,
      _count: { select: { variants: true } },
    },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { variants, ...productData } = body;

  const product = await prisma.product.create({
    data: {
      ...productData,
      variants: variants?.length
        ? {
            create: variants.map((v: Record<string, unknown>, i: number) => ({
              ...v,
              sortOrder: i,
              featuresTr: JSON.stringify(v.featuresTr || []),
              featuresEn: JSON.stringify(v.featuresEn || []),
              techSpecsTr: JSON.stringify(v.techSpecsTr || []),
              techSpecsEn: JSON.stringify(v.techSpecsEn || []),
            })),
          }
        : undefined,
    },
    include: { variants: true, category: true },
  });
  return NextResponse.json(product, { status: 201 });
}
