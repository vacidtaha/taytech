import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const SRC = path.join(
  process.env.HOME!,
  "Desktop",
  "TR Web Sitesi",
  "Motor Kontrol Panoları",
  "Elektronik Kontrol Paneli",
  "Smart Serisi"
);
const UPLOADS = path.join(process.cwd(), "public", "uploads");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src: string, destName: string): string {
  const ts = Date.now();
  const ext = path.extname(destName);
  const base = path.basename(destName, ext).replace(/\s+/g, "-");
  const finalName = `${base}-${ts}${ext}`;
  const dest = path.join(UPLOADS, finalName);
  fs.copyFileSync(src, dest);
  return `/uploads/${finalName}`;
}

async function extractDocxText(filePath: string): Promise<string> {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value
    .replace(/\r\n/g, "\n")
    .replace(/[\uF000-\uF0FF]/g, "•")
    .replace(/•+/g, "•")
    .replace(/•\s*/g, "• ")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/ {2,}/g, " ")
    .trim();
}

function parseXlsx(filePath: string): { name: string; data: string[][] }[] {
  const wb = XLSX.readFile(filePath);
  const variants: { name: string; data: string[][] }[] = [];
  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
    const filtered = rows.filter((r) => r.some((c) => c !== ""));
    if (filtered.length >= 2) {
      variants.push({ name: sheetName, data: filtered });
    }
  }
  return variants;
}

const smartProducts = [
  { folder: "Smart Booster", slug: "smart-booster", nameTr: "Smart Booster", nameEn: "Smart Booster" },
  { folder: "Smart Bore Hole", slug: "smart-bore-hole", nameTr: "Smart Bore Hole", nameEn: "Smart Bore Hole" },
  { folder: "Smart Box", slug: "smart-box", nameTr: "Smart Box", nameEn: "Smart Box" },
  { folder: "Smart Exclusive", slug: "smart-exclusive", nameTr: "Smart Exclusive", nameEn: "Smart Exclusive" },
  { folder: "Smart Grinder", slug: "smart-grinder", nameTr: "Smart Grinder", nameEn: "Smart Grinder" },
  { folder: "Smart Wastewater", slug: "smart-wastewater", nameTr: "Smart Wastewater", nameEn: "Smart Wastewater" },
];

async function main() {
  ensureDir(UPLOADS);

  // 1. Delete old products from Electronic Control Panels (cat ID: 20)
  const oldProducts = await prisma.product.findMany({ where: { categoryId: 20 } });
  for (const op of oldProducts) {
    await prisma.product.delete({ where: { id: op.id } });
    console.log(`Silindi: ${op.nameTr} (ID:${op.id})`);
  }

  // 2. Update category name to "Smart Serisi"
  await prisma.category.update({
    where: { id: 20 },
    data: { nameTr: "Smart Serisi", nameEn: "Smart Series", slug: "smart-serisi" },
  });
  console.log("Kategori güncellendi: Smart Serisi / Smart Series");

  // 3. Create new products and import data
  for (let idx = 0; idx < smartProducts.length; idx++) {
    const sp = smartProducts[idx];
    const srcDir = path.join(SRC, sp.folder);
    const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith("."));

    console.log(`\n--- ${sp.folder} ---`);

    const renderFiles = files.filter(
      (f) => /render|front|left|right/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f) && !/uygulama/i.test(f)
    );
    const appPhotos = files.filter(
      (f) => /uygulama/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f)
    );
    const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));
    const xlsxFiles = files.filter((f) => /\.xlsx?$/i.test(f) && !/~\$/.test(f));
    const docxFiles = files.filter((f) => /\.docx$/i.test(f) && !/~\$/.test(f));

    // Primary image
    let primaryImage: string | null = null;
    if (renderFiles.length > 0) {
      primaryImage = copyFile(path.join(srcDir, renderFiles[0]), renderFiles[0]);
      console.log(`  Ana foto: ${renderFiles[0]}`);
    }

    // Additional images
    const additionalImages: string[] = [];
    for (let i = 1; i < renderFiles.length; i++) {
      additionalImages.push(copyFile(path.join(srcDir, renderFiles[i]), renderFiles[i]));
      console.log(`  Ek foto: ${renderFiles[i]}`);
    }

    // Application image
    let applicationImage: string | null = null;
    if (appPhotos.length > 0) {
      applicationImage = copyFile(path.join(srcDir, appPhotos[0]), appPhotos[0]);
      console.log(`  Uygulama foto: ${appPhotos[0]}`);
    }

    // Description
    let descriptionTr = "";
    if (docxFiles.length > 0) {
      descriptionTr = await extractDocxText(path.join(srcDir, docxFiles[0]));
      console.log(`  Açıklama: ${descriptionTr.length} karakter`);
    }

    // Spec table
    let specTableData: string | null = null;
    if (xlsxFiles.length > 0) {
      const variants = parseXlsx(path.join(srcDir, xlsxFiles[0]));
      if (variants.length > 0) {
        specTableData = JSON.stringify(variants);
        console.log(`  Varyant: ${variants.length} sayfa, ${variants.reduce((a, v) => a + v.data.length, 0)} satır`);
      }
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        slug: sp.slug,
        categoryId: 20,
        nameTr: sp.nameTr,
        nameEn: sp.nameEn,
        descriptionTr,
        image: primaryImage,
        applicationImage,
        specTableData,
        sortOrder: idx,
        isActive: true,
      },
    });
    console.log(`  Ürün oluşturuldu: ID ${product.id}`);

    // Additional images
    for (let i = 0; i < additionalImages.length; i++) {
      await prisma.productImage.create({
        data: { productId: product.id, url: additionalImages[i], sortOrder: i + 1 },
      });
    }
    if (additionalImages.length > 0) console.log(`  ${additionalImages.length} ek foto eklendi`);

    // Documents
    let docOrder = 0;
    for (const pdf of pdfFiles) {
      const lower = pdf.toLowerCase();
      let type = "teknik";
      let nameTr = "Katalog";
      let nameEn = "Catalog";

      if (/katalog|catalog/i.test(lower)) {
        type = "teknik"; nameTr = "Katalog"; nameEn = "Catalog";
      } else if (/ce|conformity|uygunluk|declaration/i.test(lower)) {
        type = "sertifika"; nameTr = "Sertifika"; nameEn = "Certificate";
      } else if (/kılavuz|kilavuz|manual/i.test(lower)) {
        type = "kilavuz"; nameTr = "Kullanım Kılavuzu"; nameEn = "User Manual";
      } else if (/akış|flow/i.test(lower)) {
        type = "teknik"; nameTr = "Akış Şeması"; nameEn = "Flow Diagram";
      } else {
        continue;
      }

      const url = copyFile(path.join(srcDir, pdf), pdf);
      await prisma.productDocument.create({
        data: { productId: product.id, nameTr, nameEn, url, type, sortOrder: docOrder++ },
      });
      console.log(`  Döküman: ${nameTr} (${pdf})`);
    }

    console.log(`  TAMAM`);
  }

  console.log("\n=== SMART SERİSİ İMPORT TAMAMLANDI ===");
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
