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
  "Isı Ağları",
  "Manyetik Filtreler"
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
    const rows: string[][] = XLSX.utils.sheet_to_json(ws, {
      header: 1,
      defval: "",
      raw: false,
    });
    const filtered = rows.filter((r) => r.some((c) => c !== ""));
    if (filtered.length >= 2) {
      variants.push({ name: sheetName, data: filtered });
    }
  }
  return variants;
}

interface ProductImport {
  productId: number;
  slug: string;
  folder: string;
}

const products: ProductImport[] = [
  { productId: 22, slug: "ironinox", folder: "IronInox" },
  { productId: 21, slug: "irontrap", folder: "IronTrap" },
];

async function importProduct(p: ProductImport) {
  const srcDir = path.join(SRC, p.folder);
  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith("."));

  console.log(`\n--- ${p.folder} (ID: ${p.productId}) ---`);
  console.log(`  Dosyalar: ${files.join(", ")}`);

  const renderFiles = files.filter(
    (f) =>
      /render/i.test(f) &&
      /\.(png|jpg|jpeg)$/i.test(f) &&
      !/uygulama|örnek/i.test(f)
  );
  const appPhotos = files.filter(
    (f) => /uygulama|örnek/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f)
  );
  const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));
  const xlsxFiles = files.filter((f) => /\.xlsx?$/i.test(f));
  const docxFiles = files.filter((f) => /\.docx$/i.test(f));

  // 1. Primary image (first render)
  let primaryImage: string | null = null;
  if (renderFiles.length > 0) {
    primaryImage = copyFile(
      path.join(srcDir, renderFiles[0]),
      renderFiles[0]
    );
    console.log(`  Ana fotoğraf: ${renderFiles[0]} -> ${primaryImage}`);
  }

  // 2. Additional images (other renders)
  const additionalImages: string[] = [];
  for (let i = 1; i < renderFiles.length; i++) {
    const url = copyFile(path.join(srcDir, renderFiles[i]), renderFiles[i]);
    additionalImages.push(url);
    console.log(`  Ek fotoğraf: ${renderFiles[i]} -> ${url}`);
  }

  // 3. Application image (first app/example photo)
  let applicationImage: string | null = null;
  if (appPhotos.length > 0) {
    applicationImage = copyFile(
      path.join(srcDir, appPhotos[0]),
      appPhotos[0]
    );
    console.log(`  Uygulama fotoğrafı: ${appPhotos[0]} -> ${applicationImage}`);
  }

  // 4. Description from docx
  let descriptionTr = "";
  if (docxFiles.length > 0) {
    descriptionTr = await extractDocxText(path.join(srcDir, docxFiles[0]));
    console.log(
      `  Açıklama (TR): ${descriptionTr.substring(0, 80)}...`
    );
  }

  // 5. Spec table from xlsx
  let specTableData: string | null = null;
  if (xlsxFiles.length > 0) {
    const variants = parseXlsx(path.join(srcDir, xlsxFiles[0]));
    if (variants.length > 0) {
      specTableData = JSON.stringify(variants);
      console.log(
        `  Varyant tablosu: ${variants.length} sayfa, toplam ${variants.reduce((a, v) => a + v.data.length, 0)} satır`
      );
    }
  }

  // 6. Documents (PDFs)
  const docMappings: {
    file: string;
    type: string;
    nameTr: string;
    nameEn: string;
  }[] = [];
  for (const pdf of pdfFiles) {
    const lower = pdf.toLowerCase();
    if (/katalog|catalog/i.test(lower)) {
      docMappings.push({
        file: pdf,
        type: "teknik",
        nameTr: "Katalog",
        nameEn: "Catalog",
      });
    } else if (/ce|conformity|uygunluk|declaration/i.test(lower)) {
      docMappings.push({
        file: pdf,
        type: "sertifika",
        nameTr: "Sertifika",
        nameEn: "Certificate",
      });
    } else if (/kılavuz|kilavuz|manual/i.test(lower)) {
      docMappings.push({
        file: pdf,
        type: "kilavuz",
        nameTr: "Kullanım Kılavuzu",
        nameEn: "User Manual",
      });
    } else if (/akış|flow/i.test(lower)) {
      docMappings.push({
        file: pdf,
        type: "teknik",
        nameTr: "Akış Şeması",
        nameEn: "Flow Diagram",
      });
    } else if (/müşteri|çizim|dwg/i.test(lower)) {
      docMappings.push({
        file: pdf,
        type: "cad",
        nameTr: "CAD Çizimi",
        nameEn: "CAD Drawing",
      });
    }
  }

  // --- Database updates ---

  // Update product
  await prisma.product.update({
    where: { id: p.productId },
    data: {
      image: primaryImage,
      applicationImage,
      descriptionTr,
      specTableData,
    },
  });
  console.log(`  DB: Product güncellendi`);

  // Add additional images
  for (let i = 0; i < additionalImages.length; i++) {
    await prisma.productImage.create({
      data: {
        productId: p.productId,
        url: additionalImages[i],
        sortOrder: i + 1,
      },
    });
  }
  if (additionalImages.length > 0)
    console.log(`  DB: ${additionalImages.length} ek fotoğraf eklendi`);

  // Add documents
  for (let i = 0; i < docMappings.length; i++) {
    const doc = docMappings[i];
    const url = copyFile(path.join(srcDir, doc.file), doc.file);
    await prisma.productDocument.create({
      data: {
        productId: p.productId,
        nameTr: doc.nameTr,
        nameEn: doc.nameEn,
        url,
        type: doc.type,
        sortOrder: i,
      },
    });
    console.log(`  DB: Döküman eklendi: ${doc.nameTr} (${doc.type})`);
  }

  // Also copy DWG files
  const dwgFiles = files.filter((f) => /\.dwg$/i.test(f));
  for (const dwg of dwgFiles) {
    const url = copyFile(path.join(srcDir, dwg), dwg);
    await prisma.productDocument.create({
      data: {
        productId: p.productId,
        nameTr: "CAD Çizimi (DWG)",
        nameEn: "CAD Drawing (DWG)",
        url,
        type: "cad",
        sortOrder: docMappings.length,
      },
    });
    console.log(`  DB: DWG eklendi: ${dwg}`);
  }

  console.log(`  TAMAMLANDI`);
}

async function main() {
  ensureDir(UPLOADS);
  console.log("=== MANYETIK FİLTRELER İMPORT BAŞLIYOR ===");

  for (const p of products) {
    await importProduct(p);
  }

  console.log("\n=== TAMAMLANDI ===");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
