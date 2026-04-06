import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const dbPath = path.resolve(__dirname, "../dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const EN_BASE = "/Users/tahavacid/Desktop/EN Web Sitesi";
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");

interface ImageMapping {
  slug: string;
  enFolder: string;
  mainImage?: string; // filename containing "Front" or "Ön"
  appImage?: string;  // filename containing "Uygulama"
}

const mappings: ImageMapping[] = [
  // Smart Series
  { slug: "smart-wastewater", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Wastewater" },
  { slug: "smart-exclusive", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Exclusive" },
  { slug: "smart-box", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Box" },
  { slug: "smart-booster", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Booster" },
  { slug: "smart-bore-hole", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Bore Hole" },
  { slug: "smart-grinder", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Grinder" },
  // Electro Mechanical
  { slug: "em-direct-start", enFolder: "Motor Control Panels/Electro Mechanic Panels/Direct Start" },
  { slug: "em-star-delta-start", enFolder: "Motor Control Panels/Electro Mechanic Panels/Star & Delta Start" },
  // Magnetic Filters
  { slug: "ironinox", enFolder: "Heat Network/Magnetic Filters/IronInox" },
  { slug: "irontrap", enFolder: "Heat Network/Magnetic Filters/IronTrap" },
  // SmartHexa
  { slug: "direct-smarthexa-dhw", enFolder: "Heat Network/Heat Interface Units/SmartHexa Series/Direct SmartHexa/Direct SmartHexa DHW" },
  { slug: "indirect-smarthexa", enFolder: "Heat Network/Heat Interface Units/SmartHexa Series/Indirect SmartHexa/Indirect SmartHexa DHW-SH" },
  // ThermoHexa
  { slug: "indirect-thermohexa", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Indirect ThermoHexa/Indirect ThermoHexa DHW-SH" },
  { slug: "direct-thermohexa-dhw", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa DHW" },
  { slug: "direct-thermohexa-rh", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa RH" },
  { slug: "direct-thermohexa-ufh", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa UFH" },
  // HydroHexa
  { slug: "indirect-hydrohexa", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Indirect HydroHexa/Indirect HydroHexa DHW-SH" },
  { slug: "direct-hydrohexa-dhw", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa DHW" },
  { slug: "direct-hydrohexa-rh", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa RH" },
  { slug: "direct-hydrohexa-ufh", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa UFH" },
];

function isImage(f: string) {
  return /\.(png|jpg|jpeg|webp)$/i.test(f);
}

function isMain(f: string) {
  const lower = f.toLowerCase();
  return lower.includes("front") || lower.includes("ön");
}

function isApp(f: string) {
  const lower = f.toLowerCase();
  return lower.includes("uygulama");
}

function copyAndConvert(src: string, slug: string, suffix: string): string {
  const enDir = path.join(UPLOADS_DIR, "en");
  if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });

  const ext = path.extname(src);
  const baseName = `${slug}-${suffix}`;
  const webpName = `${baseName}.webp`;
  const webpPath = path.join(enDir, webpName);
  const dbUrl = `/uploads/en/${webpName}`;

  if (fs.existsSync(webpPath)) return dbUrl;

  try {
    execSync(`cwebp -q 82 "${src}" -o "${webpPath}"`, { stdio: "pipe" });
    console.log(`  ✓ Converted: ${webpName}`);
  } catch {
    const fallbackName = `${baseName}${ext.toLowerCase()}`;
    const fallbackPath = path.join(enDir, fallbackName);
    fs.copyFileSync(src, fallbackPath);
    console.log(`  ⚠ Copied as-is: ${fallbackName}`);
    return `/uploads/en/${fallbackName}`;
  }

  return dbUrl;
}

async function main() {
  console.log("=== EN Image Import ===\n");

  for (const m of mappings) {
    const folderPath = path.join(EN_BASE, m.enFolder);
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠ Folder not found: ${m.enFolder}`);
      continue;
    }

    const product = await prisma.product.findUnique({ where: { slug: m.slug } });
    if (!product) {
      console.log(`⚠ Product not found: ${m.slug}`);
      continue;
    }

    console.log(`\n📦 ${product.nameTr} (${m.slug})`);

    const files = fs.readdirSync(folderPath).filter(isImage);
    if (files.length === 0) {
      console.log("  No images found");
      continue;
    }

    const mainFiles = files.filter(isMain);
    const appFiles = files.filter(isApp);
    const galleryFiles = files.filter((f) => !isMain(f) && !isApp(f));

    // Main image (Front/Ön)
    let imageEn: string | null = null;
    if (mainFiles.length > 0) {
      const src = path.join(folderPath, mainFiles[0]);
      imageEn = copyAndConvert(src, m.slug, "en-front");
      console.log(`  Main EN: ${mainFiles[0]}`);
    }

    // Application image
    let applicationImageEn: string | null = null;
    if (appFiles.length > 0) {
      const src = path.join(folderPath, appFiles[0]);
      applicationImageEn = copyAndConvert(src, m.slug, "en-app");
      console.log(`  App EN: ${appFiles[0]}`);
    }

    // Update product
    await prisma.product.update({
      where: { id: product.id },
      data: {
        ...(imageEn ? { imageEn } : {}),
        ...(applicationImageEn ? { applicationImageEn } : {}),
      },
    });

    // Gallery images - update existing ProductImage records with urlEn
    const existingImages = await prisma.productImage.findMany({
      where: { productId: product.id },
      orderBy: { sortOrder: "asc" },
    });

    for (let i = 0; i < galleryFiles.length; i++) {
      const src = path.join(folderPath, galleryFiles[i]);
      const url = copyAndConvert(src, m.slug, `en-gallery-${i + 1}`);

      if (i < existingImages.length) {
        await prisma.productImage.update({
          where: { id: existingImages[i].id },
          data: { urlEn: url },
        });
        console.log(`  Gallery ${i + 1} (update): ${galleryFiles[i]}`);
      } else {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: existingImages.length > 0 ? existingImages[0].url : (product.image ?? ""),
            urlEn: url,
            sortOrder: (existingImages.length + i) * 10,
          },
        });
        console.log(`  Gallery ${i + 1} (new): ${galleryFiles[i]}`);
      }
    }

    console.log(`  ✅ Done (main=${imageEn ? "yes" : "no"}, app=${applicationImageEn ? "yes" : "no"}, gallery=${galleryFiles.length})`);
  }

  console.log("\n=== Import Complete ===");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
