import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const BASE = path.join(process.env.HOME!, "Desktop", "TR Web Sitesi", "Isı Ağları", "Isı İstasyonları (HIU)", "HydroHexa Serisi");
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
      if (currentName && currentHeader && currentRows.length > 0)
        variants.push({ name: currentName, data: [currentHeader, ...currentRows] });
      currentName = firstCell; currentHeader = null; currentRows = [];
    } else if (isHeaderRow && !currentHeader) {
      currentHeader = row.map((c) => (c || "").replace(/\r\n/g, " ").trim());
    } else if (currentHeader) {
      currentRows.push(row.map((c) => (c || "").replace(/\r\n/g, " ").trim()));
    }
  }
  if (currentName && currentHeader && currentRows.length > 0)
    variants.push({ name: currentName, data: [currentHeader, ...currentRows] });
  return variants;
}

function parseXlsx(filePath: string): { name: string; data: string[][] }[] {
  const wb = XLSX.readFile(filePath);
  let allData: string[][] = [];
  for (const sn of wb.SheetNames) {
    const rows: string[][] = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, defval: "", raw: false });
    allData = allData.concat(rows.filter((r) => r.some((c) => c !== "")));
  }
  const variants = splitIntoVariants(allData);
  if (variants.length > 0) return variants;
  if (allData.length >= 2) return [{ name: "Ürün Opsiyonları", data: allData }];
  return [];
}

const products = [
  { productId: 8, folder: "Direct HydroHexa/Direct HydroHexa DHW" },
  { productId: 9, folder: "Direct HydroHexa/Direct HydroHexa RH" },
  { productId: 10, folder: "Direct HydroHexa/Direct HydroHexa UFH" },
  { productId: 7, folder: "Indirect HydroHexa /Indirect HydroHexa DHW-SH" },
];

async function importProduct(p: { productId: number; folder: string }) {
  const srcDir = path.join(BASE, p.folder);
  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith(".") && !/~\$/.test(f));
  console.log(`\n--- ${p.folder} (ID: ${p.productId}) ---`);

  const renderFiles = files.filter((f) => /render/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f));
  const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));
  const xlsxFiles = files.filter((f) => /\.xlsx?$/i.test(f));
  const dwgFiles = files.filter((f) => /\.dwg$/i.test(f));

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
    data: { image: primaryImage, specTableData },
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
    let type = "", nameTr = "", nameEn = "";

    if (/katalog|catalog/i.test(lower)) {
      type = "teknik"; nameTr = "Katalog"; nameEn = "Catalog";
    } else if (/ce|conformity|uygunluk|declaration/i.test(lower)) {
      type = "sertifika"; nameTr = "Sertifika"; nameEn = "Certificate";
    } else if (/kılavuz|kilavuz|manual|çalıştırma/i.test(lower)) {
      type = "kilavuz"; nameTr = "Kullanım Kılavuzu"; nameEn = "User Manual";
    } else if (/akış|flow|şema/i.test(lower)) {
      type = "teknik"; nameTr = "Akış Şeması"; nameEn = "Flow Diagram";
    } else if (/müşteri|çizim/i.test(lower)) {
      type = "cad"; nameTr = "CAD Çizimi (PDF)"; nameEn = "CAD Drawing (PDF)";
    } else continue;

    const url = copyFile(path.join(srcDir, pdf), pdf);
    await prisma.productDocument.create({
      data: { productId: p.productId, nameTr, nameEn, url, type, sortOrder: docOrder++ },
    });
    console.log(`  Döküman: ${nameTr} (${pdf})`);
  }

  for (const dwg of dwgFiles) {
    const url = copyFile(path.join(srcDir, dwg), dwg);
    await prisma.productDocument.create({
      data: { productId: p.productId, nameTr: "CAD Çizimi (DWG)", nameEn: "CAD Drawing (DWG)", url, type: "cad", sortOrder: docOrder++ },
    });
    console.log(`  DWG: ${dwg}`);
  }

  console.log(`  TAMAM`);
}

async function main() {
  ensureDir(UPLOADS);
  console.log("=== HYDROHEXA SERİSİ İMPORT ===");
  for (const p of products) await importProduct(p);
  console.log("\n=== TAMAMLANDI ===");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
