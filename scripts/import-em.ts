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
  "Elektro Mekanik Panolar"
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
  fs.copyFileSync(src, path.join(UPLOADS, finalName));
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

function splitIntoVariants(data: string[][]): { name: string; data: string[][] }[] {
  const variants: { name: string; data: string[][] }[] = [];
  let currentName = "";
  let currentHeader: string[] | null = null;
  let currentRows: string[][] = [];

  for (const row of data) {
    const firstCell = (row[0] || "").trim().replace(/\r\n/g, " ");
    const hasVoltaj = row.some((c) => /VOLTAJ|MAX GÜÇ|KUTU ÖLÇ/i.test(c || ""));
    const isHeaderRow = row.some((c) => /^KOD$|^CODE$|^V-$/i.test((c || "").trim()));

    if (hasVoltaj && firstCell) {
      if (currentName && currentHeader && currentRows.length > 0) {
        variants.push({ name: currentName, data: [currentHeader, ...currentRows] });
      }
      currentName = firstCell;
      currentHeader = null;
      currentRows = [];
    } else if (isHeaderRow && !currentHeader) {
      currentHeader = row.map((c) => (c || "").replace(/\r\n/g, " ").trim());
    } else if (currentHeader) {
      currentRows.push(row.map((c) => (c || "").replace(/\r\n/g, " ").trim()));
    }
  }
  if (currentName && currentHeader && currentRows.length > 0) {
    variants.push({ name: currentName, data: [currentHeader, ...currentRows] });
  }
  return variants;
}

function parseXlsx(filePath: string): { name: string; data: string[][] }[] {
  const wb = XLSX.readFile(filePath);
  let allData: string[][] = [];
  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
    const filtered = rows.filter((r) => r.some((c) => c !== ""));
    allData = allData.concat(filtered);
  }
  const variants = splitIntoVariants(allData);
  if (variants.length > 0) return variants;
  const clean = allData.filter((r) => r.some((c) => c !== ""));
  if (clean.length >= 2) return [{ name: "Ürün Opsiyonları", data: clean }];
  return [];
}

const products = [
  { productId: 45, folder: "Doğrudan Yol Verme" },
  { productId: 46, folder: "Yıldız Üçgen Başlatma" },
];

async function importProduct(p: { productId: number; folder: string }) {
  const srcDir = path.join(SRC, p.folder);
  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith(".") && !/~\$/.test(f));

  console.log(`\n--- ${p.folder} (ID: ${p.productId}) ---`);

  const renderFiles = files.filter(
    (f) => /front|left|right|render/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f) && !/uygulama/i.test(f)
  );
  const appPhotos = files.filter(
    (f) => /uygulama/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f)
  );
  const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));
  const xlsxFiles = files.filter((f) => /\.xlsx?$/i.test(f));
  const docxFiles = files.filter((f) => /\.docx$/i.test(f));

  let primaryImage: string | null = null;
  if (renderFiles.length > 0) {
    primaryImage = copyFile(path.join(srcDir, renderFiles[0]), renderFiles[0]);
    console.log(`  Ana foto: ${renderFiles[0]}`);
  }

  const additionalImages: string[] = [];
  for (let i = 1; i < renderFiles.length; i++) {
    additionalImages.push(copyFile(path.join(srcDir, renderFiles[i]), renderFiles[i]));
    console.log(`  Ek foto: ${renderFiles[i]}`);
  }

  let applicationImage: string | null = null;
  if (appPhotos.length > 0) {
    applicationImage = copyFile(path.join(srcDir, appPhotos[0]), appPhotos[0]);
    console.log(`  Uygulama foto: ${appPhotos[0]}`);
  }

  let descriptionTr = "";
  if (docxFiles.length > 0) {
    descriptionTr = await extractDocxText(path.join(srcDir, docxFiles[0]));
    console.log(`  Açıklama: ${descriptionTr.length} karakter`);
  }

  let specTableData: string | null = null;
  if (xlsxFiles.length > 0) {
    const variants = parseXlsx(path.join(srcDir, xlsxFiles[0]));
    if (variants.length > 0) {
      specTableData = JSON.stringify(variants);
      console.log(`  Varyant: ${variants.length} tablo, ${variants.reduce((a, v) => a + v.data.length, 0)} satır`);
    }
  }

  await prisma.product.update({
    where: { id: p.productId },
    data: { image: primaryImage, applicationImage, descriptionTr, specTableData },
  });
  console.log(`  DB: Product güncellendi`);

  for (let i = 0; i < additionalImages.length; i++) {
    await prisma.productImage.create({
      data: { productId: p.productId, url: additionalImages[i], sortOrder: i + 1 },
    });
  }
  if (additionalImages.length > 0) console.log(`  ${additionalImages.length} ek foto eklendi`);

  let docOrder = 0;
  for (const pdf of pdfFiles) {
    const lower = pdf.toLowerCase();
    let type = "teknik", nameTr = "Katalog", nameEn = "Catalog";

    if (/katalog|catalog/i.test(lower)) {
      type = "teknik"; nameTr = "Katalog"; nameEn = "Catalog";
    } else if (/ce|conformity|uygunluk|declaration/i.test(lower)) {
      type = "sertifika"; nameTr = "Sertifika"; nameEn = "Certificate";
    } else if (/kılavuz|kilavuz|manual/i.test(lower)) {
      type = "kilavuz"; nameTr = "Kullanım Kılavuzu"; nameEn = "User Manual";
    } else continue;

    const url = copyFile(path.join(srcDir, pdf), pdf);
    await prisma.productDocument.create({
      data: { productId: p.productId, nameTr, nameEn, url, type, sortOrder: docOrder++ },
    });
    console.log(`  Döküman: ${nameTr} (${pdf})`);
  }

  console.log(`  TAMAM`);
}

async function main() {
  ensureDir(UPLOADS);
  console.log("=== ELEKTRO MEKANİK PANOLAR İMPORT ===");
  for (const p of products) await importProduct(p);
  console.log("\n=== TAMAMLANDI ===");
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
