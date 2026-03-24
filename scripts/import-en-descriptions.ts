import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import mammoth from "mammoth";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const EN_BASE = path.join(process.env.HOME!, "Desktop", "EN Web Sitesi");

interface Mapping {
  slug: string;
  docxPath: string;
}

const mappings: Mapping[] = [
  { slug: "irontrap", docxPath: "Heat Network/Magnetic Filters/IronTrap/IronTrap Açıklamalar_EN.docx" },
  { slug: "ironinox", docxPath: "Heat Network/Magnetic Filters/IronInox/IronInox Açıklamalar_EN.docx" },
  { slug: "em-direct-start", docxPath: "Motor Control Panels/Electro Mechanic Panels/Direct Start/Direct Start Açıklamalar.docx" },
  { slug: "em-star-delta-start", docxPath: "Motor Control Panels/Electro Mechanic Panels/Star & Delta Start/Star & Delta Start Açıklamalar.docx" },
  { slug: "smart-booster", docxPath: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Booster/Smart Booster Açıklamalar.docx" },
  { slug: "smart-bore-hole", docxPath: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Bore Hole/Smart Bore Hole Açıklamalar.docx" },
  { slug: "smart-box", docxPath: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Box/Smart Box Açıklamalar.docx" },
  { slug: "smart-exclusive", docxPath: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Exclusive/Smart Exclusive Açıklamalar.docx" },
  { slug: "smart-grinder", docxPath: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Grinder/Smart Grinder Açıklamalar.docx" },
  { slug: "smart-wastewater", docxPath: "Motor Control Panels/Electronic Control Panels/Smart Series/Smart Wastewater/Smart Waste Water Açıklamalar.docx" },
];

function cleanText(raw: string): string {
  return raw
    .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  console.log("=== EN AÇIKLAMA İMPORT ===\n");

  for (const m of mappings) {
    const fullPath = path.join(EN_BASE, m.docxPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠ Dosya yok: ${m.docxPath}`);
      continue;
    }

    const result = await mammoth.extractRawText({ path: fullPath });
    const text = cleanText(result.value);

    if (!text || text.length < 10) {
      console.log(`⚠ Boş metin: ${m.slug}`);
      continue;
    }

    await prisma.product.update({
      where: { slug: m.slug },
      data: { descriptionEn: text },
    });

    console.log(`✓ ${m.slug}: ${text.length} karakter`);
    console.log(`  "${text.substring(0, 80)}..."\n`);
  }

  console.log("=== TAMAMLANDI ===");
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
