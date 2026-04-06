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
    select: { slug: true },
  });

  const slugs = products
    .filter((p) => p.slug)
    .map((p) => p.slug);

  return NextResponse.json(slugs, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
