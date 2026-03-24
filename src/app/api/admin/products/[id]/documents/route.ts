import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const doc = await prisma.productDocument.create({
    data: {
      productId: Number(id),
      nameTr: body.nameTr,
      nameEn: body.nameEn,
      url: body.url,
      type: body.type || "datasheet",
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(doc, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const docId = searchParams.get("docId");
  if (!docId) {
    return NextResponse.json({ error: "docId required" }, { status: 400 });
  }

  await prisma.productDocument.delete({ where: { id: Number(docId) } });
  return NextResponse.json({ success: true });
}
