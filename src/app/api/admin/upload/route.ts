import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".csv",
]);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Dosya gerekli" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Dosya boyutu 25 MB'ı aşamaz" },
      { status: 413 }
    );
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: `Desteklenmeyen dosya türü: ${ext || "uzantısız"}` },
      { status: 415 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", name);

  await writeFile(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${name}` });
}
