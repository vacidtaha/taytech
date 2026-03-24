import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

function cleanEnDescription(raw: string, trDesc: string): string {
  const trLines = trDesc.split("\n").map((l) => l.trim()).filter(Boolean);

  const trIsBullet = (line: string) =>
    line.startsWith("•") || line.startsWith("-");
  const trIsHeading = (line: string) =>
    !trIsBullet(line) && line.length <= 60 && !line.includes("\t") && !/\s{2,}:/.test(line);

  const trHeadings = new Set(
    trLines.filter((l) => trIsHeading(l)).map((l) => l.toLowerCase())
  );

  let lines = raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""));

  lines = lines.filter((l) => l.trim().length > 0);
  lines = lines.map((l) => l.replace(/\s{2,}/g, " ").trim());

  const result: string[] = [];
  let inTechFeatures = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const lower = line.toLowerCase();

    if (
      /teknik|özellik|technical|features|specifications/i.test(line) &&
      line.length <= 60 &&
      !line.includes(":")
    ) {
      inTechFeatures = true;
      result.push(line);
      continue;
    }

    if (i === 0) {
      result.push(line);
      continue;
    }

    if (
      !inTechFeatures &&
      trHeadings.has(lower) &&
      line.length <= 60
    ) {
      result.push(line);
      continue;
    }

    if (
      !inTechFeatures &&
      !line.includes(":") &&
      line.length <= 60 &&
      /^[A-ZÇĞİÖŞÜ]/.test(line) &&
      !line.endsWith(".") &&
      !line.endsWith(")")
    ) {
      const trIdx = trLines.findIndex(
        (t) => t.replace(/^•\s*/, "").toLowerCase() === lower
      );
      if (trIdx >= 0 && trIsBullet(trLines[trIdx])) {
        result.push("• " + line);
        continue;
      }
      result.push(line);
      continue;
    }

    if (inTechFeatures) {
      const cleaned = line.replace(/^[•\-\t ]+/, "").trim();
      if (cleaned) {
        result.push("• " + cleaned);
      }
      continue;
    }

    const matchIdx = findMatchingTrLine(line, trLines);
    if (matchIdx >= 0 && trIsBullet(trLines[matchIdx])) {
      const cleaned = line.replace(/^[•\-\t ]+/, "").trim();
      result.push("• " + cleaned);
      continue;
    }

    if (/^[A-ZÇĞİÖŞÜ]/.test(line) && line.length > 60) {
      result.push(line);
      continue;
    }

    result.push(line);
  }

  return result.join("\n");
}

function findMatchingTrLine(enLine: string, trLines: string[]): number {
  const enLower = enLine.toLowerCase().replace(/[•\-\t ]+/g, " ").trim();

  for (let i = 0; i < trLines.length; i++) {
    const trLower = trLines[i].replace(/^•\s*/, "").toLowerCase().trim();

    const enWords = enLower.split(/\s+/).filter(Boolean);
    const trWords = trLower.split(/\s+/).filter(Boolean);

    let common = 0;
    for (const w of enWords) {
      if (
        trWords.includes(w) ||
        (/^\d/.test(w) && trWords.some((tw) => tw.includes(w)))
      ) {
        common++;
      }
    }

    if (common >= 2 && common >= enWords.length * 0.3) {
      return i;
    }
  }
  return -1;
}

async function main() {
  console.log("=== EN AÇIKLAMA FORMATLAMA ===\n");

  const products = await prisma.product.findMany({
    where: {
      descriptionTr: { not: "" },
      descriptionEn: { not: "" },
    },
    select: {
      id: true,
      slug: true,
      descriptionTr: true,
      descriptionEn: true,
    },
  });

  const targetSlugs = [
    "em-direct-start",
    "em-star-delta-start",
    "smart-booster",
    "smart-bore-hole",
    "smart-box",
    "smart-exclusive",
    "smart-grinder",
    "smart-wastewater",
    "irontrap",
    "ironinox",
  ];

  for (const p of products) {
    if (!targetSlugs.includes(p.slug)) continue;
    if (!p.descriptionTr || !p.descriptionEn) continue;

    const cleaned = cleanEnDescription(p.descriptionEn, p.descriptionTr);

    await prisma.product.update({
      where: { id: p.id },
      data: { descriptionEn: cleaned },
    });

    console.log(`✓ ${p.slug}`);
    console.log(`  Önce: ${p.descriptionEn.split("\n").length} satır`);
    console.log(`  Sonra: ${cleaned.split("\n").length} satır`);
    console.log(`  İlk 3 satır:`);
    cleaned
      .split("\n")
      .slice(0, 3)
      .forEach((l) => console.log(`    ${l}`));
    console.log();
  }

  console.log("=== TAMAMLANDI ===");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
