import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const UPLOADS = path.join(process.cwd(), "public", "uploads");

function convertToWebp(filePath: string): string | null {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;

  const webpPath = filePath.replace(/\.(png|jpg|jpeg|JPG)$/i, ".webp");
  if (fs.existsSync(webpPath)) return webpPath;

  try {
    execSync(`cwebp -q 82 "${filePath}" -o "${webpPath}"`, { stdio: "pipe" });
    const oldSize = fs.statSync(filePath).size;
    const newSize = fs.statSync(webpPath).size;
    const saved = ((1 - newSize / oldSize) * 100).toFixed(1);
    console.log(`  ✓ ${path.basename(filePath)} → ${path.basename(webpPath)} (${saved}% smaller)`);
    fs.unlinkSync(filePath);
    return webpPath;
  } catch (e) {
    console.error(`  ✗ Failed: ${path.basename(filePath)}`);
    return null;
  }
}

async function main() {
  console.log("=== WEBP DÖNÜŞÜM BAŞLADI ===\n");

  const files = fs.readdirSync(UPLOADS);
  const imageFiles = files.filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
  console.log(`${imageFiles.length} resim dosyası bulundu\n`);

  const mapping: Record<string, string> = {};

  for (const file of imageFiles) {
    const fullPath = path.join(UPLOADS, file);
    const result = convertToWebp(fullPath);
    if (result) {
      const oldUrl = `/uploads/${file}`;
      const newUrl = `/uploads/${path.basename(result)}`;
      mapping[oldUrl] = newUrl;
    }
  }

  console.log(`\n=== VERİTABANI GÜNCELLENİYOR ===\n`);

  const products = await prisma.product.findMany();
  for (const p of products) {
    const updates: Record<string, string | null> = {};
    if (p.image && mapping[p.image]) updates.image = mapping[p.image];
    if (p.applicationImage && mapping[p.applicationImage]) updates.applicationImage = mapping[p.applicationImage];
    if (Object.keys(updates).length > 0) {
      await prisma.product.update({ where: { id: p.id }, data: updates });
      console.log(`  Product ${p.id} (${p.nameTr}): image refs updated`);
    }
  }

  const images = await prisma.productImage.findMany();
  for (const img of images) {
    if (mapping[img.url]) {
      await prisma.productImage.update({ where: { id: img.id }, data: { url: mapping[img.url] } });
      console.log(`  ProductImage ${img.id}: ${img.url} → ${mapping[img.url]}`);
    }
  }

  const docs = await prisma.productDocument.findMany();
  for (const doc of docs) {
    if (mapping[doc.url]) {
      await prisma.productDocument.update({ where: { id: doc.id }, data: { url: mapping[doc.url] } });
      console.log(`  ProductDocument ${doc.id}: updated`);
    }
  }

  console.log("\n=== MAPPING (for code references) ===\n");
  for (const [old, newUrl] of Object.entries(mapping)) {
    console.log(`${old} → ${newUrl}`);
  }

  const newTotal = execSync(`du -sh "${UPLOADS}"`).toString().trim();
  console.log(`\n=== TAMAMLANDI === Yeni boyut: ${newTotal}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
