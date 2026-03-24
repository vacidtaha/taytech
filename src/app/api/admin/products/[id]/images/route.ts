import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const maxSort = await prisma.productImage.findFirst({
    where: { productId: Number(id) },
    orderBy: { sortOrder: "desc" },
  });

  const image = await prisma.productImage.create({
    data: {
      productId: Number(id),
      url: body.url,
      sortOrder: (maxSort?.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(image);
}

export async function DELETE(request: NextRequest) {
  const { imageId } = await request.json();
  await prisma.productImage.delete({ where: { id: imageId } });
  return NextResponse.json({ success: true });
}
