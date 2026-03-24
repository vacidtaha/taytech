import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameTr: "asc" }],
    include: { children: true, _count: { select: { products: true } } },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const category = await prisma.category.create({ data: body });
  return NextResponse.json(category, { status: 201 });
}
