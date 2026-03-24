import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const EN_BASE = path.join(process.env.HOME!, "Desktop", "EN Web Sitesi");
const UPLOADS = path.join(process.cwd(), "public", "uploads");

function ensureDir(d: string) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }

function copyFile(src: string, destName: string): string {
  const ts = Date.now();
  const ext = path.extname(src);
  const safeName = destName.replace(/[^a-zA-Z0-9_-]/g, "-");
  const finalName = `${safeName}-EN-${ts}${ext}`;
  const dest = path.join(UPLOADS, finalName);
  fs.copyFileSync(src, dest);
  return `/uploads/${finalName}`;
}

function classifyDoc(filename: string): string | null {
  const lower = filename.toLowerCase();
  if (lower.includes("catalogue") || lower.includes("catalog")) return "teknik";
  if (lower.includes("instruction") || lower.includes("manual")) return "kilavuz";
  if (lower.includes("declaration") || lower.includes("conformity") || lower.includes("certificate")) return "sertifika";
  if (lower.includes("drawing") || lower.includes("cad")) return "cad";
  return null;
}

interface ProductMapping {
  productSlug: string;
  enFolder: string;
}

const mappings: ProductMapping[] = [
  // HydroHexa
  { productSlug: "direct-hydrohexa-dhw", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa DHW" },
  { productSlug: "direct-hydrohexa-rh", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa RH" },
  { productSlug: "direct-hydrohexa-ufh", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa UFH" },
  { productSlug: "indirect-hydrohexa", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Indirect HydroHexa/Indirect HydroHexa DHW-SH" },
  // SmartHexa
  { productSlug: "indirect-smarthexa", enFolder: "Heat Network/Heat Interface Units/SmartHexa Series/Indirect SmartHexa/Indirect SmartHexa DHW-SH" },
  // ThermoHexa
  { productSlug: "direct-thermohexa-dhw", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa DHW" },
  { productSlug: "direct-thermohexa-rh", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa RH" },
  { productSlug: "direct-thermohexa-ufh", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa UFH" },
  { productSlug: "indirect-thermohexa", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Indirect ThermoHexa/Indirect ThermoHexa DHW-SH" },
  // Magnetic Filters
  { productSlug: "ironinox", enFolder: "Heat Network/Magnetic Filters/IronInox" },
  { productSlug: "irontrap", enFolder: "Heat Network/Magnetic Filters/IronTrap" },
  // Electro Mechanic
  { productSlug: "direct-start", enFolder: "Motor Control Panels/Electro Mechanic Panels/Direct Start" },
  { productSlug: "star-delta-start", enFolder: "Motor Control Panels/Electro Mechanic Panels/Star & Delta Start" },
  // Smart Series
  { productSlug: "smart-booster", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Booster" },
  { productSlug: "smart-bore-hole", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Bore Hole" },
  { productSlug: "smart-box", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Box" },
  { productSlug: "smart-exclusive", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Exclusive" },
  { productSlug: "smart-grinder", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Grinder" },
  { productSlug: "smart-wastewater", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Wastewater" },
];

async function main() {
  ensureDir(UPLOADS);
  console.log("=== EN DÖKÜMAN İMPORT ===\n");

  let totalMatched = 0;
  let totalSkipped = 0;

  for (const mapping of mappings) {
    const product = await prisma.product.findUnique({
      where: { slug: mapping.productSlug },
      include: { documents: true },
    });

    if (!product) {
      console.log(`⚠ Product not found: ${mapping.productSlug}`);
      continue;
    }

    const enFolderPath = path.join(EN_BASE, mapping.enFolder);
    if (!fs.existsSync(enFolderPath)) {
      console.log(`⚠ EN folder not found: ${mapping.enFolder}`);
      continue;
    }

    const enFiles = fs.readdirSync(enFolderPath).filter(f => /\.(pdf|PDF)$/i.test(f));
    console.log(`\n📦 ${product.nameTr} (${product.slug}) - ${enFiles.length} EN dosya`);

    for (const enFile of enFiles) {
      const docType = classifyDoc(enFile);
      if (!docType) {
        console.log(`  ⏭ Atlandı (tür belirlenemedi): ${enFile}`);
        totalSkipped++;
        continue;
      }

      const matchingDocs = product.documents.filter(d => d.type === docType && !d.urlEn);

      if (matchingDocs.length === 0) {
        console.log(`  ⏭ Eşleşme yok (${docType}): ${enFile}`);
        totalSkipped++;
        continue;
      }

      const targetDoc = matchingDocs[0];
      const enUrl = copyFile(path.join(enFolderPath, enFile), enFile.replace(/\.[^.]+$/, ""));

      await prisma.productDocument.update({
        where: { id: targetDoc.id },
        data: { urlEn: enUrl },
      });

      console.log(`  ✓ ${docType}: ${enFile} → Doc #${targetDoc.id} (${targetDoc.nameTr})`);
      totalMatched++;

      // Remove from product.documents to avoid double-matching
      product.documents = product.documents.filter(d => d.id !== targetDoc.id);
    }
  }

  console.log(`\n=== TAMAMLANDI ===`);
  console.log(`  Eşleşen: ${totalMatched}`);
  console.log(`  Atlanan: ${totalSkipped}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
