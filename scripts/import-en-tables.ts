import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const EN_BASE = path.join(process.env.HOME!, "Desktop", "EN Web Sitesi");

interface SpecVariant { name: string; data: string[][]; dataEn?: string[][] }

function parseXlsx(filePath: string): string[][] {
  const wb = XLSX.readFile(filePath);
  const rows: string[][] = [];
  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const sheetRows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
    if (sheetRows.length > 0) rows.push(...sheetRows);
  }
  return rows;
}

interface Mapping {
  slug: string;
  enFolder: string;
}

const mappings: Mapping[] = [
  { slug: "direct-hydrohexa-dhw", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa DHW" },
  { slug: "direct-hydrohexa-rh", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa RH" },
  { slug: "direct-hydrohexa-ufh", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Direct HydroHexa/Direct HydroHexa UFH" },
  { slug: "indirect-hydrohexa", enFolder: "Heat Network/Heat Interface Units/HydroHexa Series/Indirect HydroHexa/Indirect HydroHexa DHW-SH" },
  { slug: "indirect-smarthexa", enFolder: "Heat Network/Heat Interface Units/SmartHexa Series/Indirect SmartHexa/Indirect SmartHexa DHW-SH" },
  { slug: "direct-thermohexa-dhw", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa DHW" },
  { slug: "direct-thermohexa-rh", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa RH" },
  { slug: "direct-thermohexa-ufh", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa UFH" },
  { slug: "indirect-thermohexa", enFolder: "Heat Network/Heat Interface Units/ThermoHexa Series/Indirect ThermoHexa/Indirect ThermoHexa DHW-SH" },
  { slug: "ironinox", enFolder: "Heat Network/Magnetic Filters/IronInox" },
  { slug: "irontrap", enFolder: "Heat Network/Magnetic Filters/IronTrap" },
  { slug: "em-direct-start", enFolder: "Motor Control Panels/Electro Mechanic Panels/Direct Start" },
  { slug: "em-star-delta-start", enFolder: "Motor Control Panels/Electro Mechanic Panels/Star & Delta Start" },
  { slug: "smart-booster", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Booster" },
  { slug: "smart-bore-hole", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Bore Hole" },
  { slug: "smart-box", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Box" },
  { slug: "smart-exclusive", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Exclusive" },
  { slug: "smart-grinder", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Grinder" },
  { slug: "smart-wastewater", enFolder: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Wastewater" },
];

async function main() {
  console.log("=== EN TEKNİK TABLO İMPORT ===\n");
  let updated = 0;

  for (const m of mappings) {
    const product = await prisma.product.findUnique({ where: { slug: m.slug } });
    if (!product || !product.specTableData) continue;

    const folderPath = path.join(EN_BASE, m.enFolder);
    if (!fs.existsSync(folderPath)) continue;

    const xlsxFiles = fs.readdirSync(folderPath).filter(f => /\.xlsx$/i.test(f));
    if (xlsxFiles.length === 0) continue;

    let tables: SpecVariant[];
    try {
      const parsed = JSON.parse(product.specTableData);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0]) && typeof parsed[0][0] === "string") {
        tables = [{ name: "Teknik Veriler", data: parsed }];
      } else {
        tables = parsed;
      }
    } catch { continue; }

    console.log(`📦 ${product.nameTr} - ${tables.length} varyant, ${xlsxFiles.length} EN xlsx`);

    // Collect all EN xlsx data
    const allEnData: { name: string; rows: string[][] }[] = [];
    for (const f of xlsxFiles) {
      const rows = parseXlsx(path.join(folderPath, f));
      if (rows.length > 0) {
        allEnData.push({ name: f, rows });
      }
    }

    if (tables.length === 1 && allEnData.length >= 1) {
      // Single variant - merge all EN xlsx data
      const combined: string[][] = [];
      for (const en of allEnData) {
        if (combined.length === 0) combined.push(...en.rows);
        else combined.push(...en.rows.slice(1)); // skip header of subsequent
      }
      tables[0].dataEn = combined;
      console.log(`  ✓ Single variant: ${combined.length} EN rows`);
    } else if (tables.length > 1) {
      // Multi-variant: try to match by similar file count or just assign in order
      // For Product Options files that have multiple sheets matching variants
      for (const en of allEnData) {
        const wb = XLSX.readFile(path.join(folderPath, en.name));
        if (wb.SheetNames.length >= tables.length) {
          // Multi-sheet XLSX matching variants
          for (let i = 0; i < tables.length && i < wb.SheetNames.length; i++) {
            const ws = wb.Sheets[wb.SheetNames[i]];
            const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
            if (rows.length > 0) {
              tables[i].dataEn = rows;
              console.log(`  ✓ Variant "${tables[i].name}" ← Sheet "${wb.SheetNames[i]}" (${rows.length} rows)`);
            }
          }
        } else {
          // Single sheet - assign to first variant without EN data
          const target = tables.find(t => !t.dataEn);
          if (target) {
            target.dataEn = en.rows;
            console.log(`  ✓ Variant "${target.name}" ← ${en.name} (${en.rows.length} rows)`);
          }
        }
      }
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { specTableData: JSON.stringify(tables) },
    });
    updated++;
  }

  console.log(`\n=== TAMAMLANDI === ${updated} ürün güncellendi`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
