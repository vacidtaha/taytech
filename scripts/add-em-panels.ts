import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

function readXlsx(filepath: string): string[][] {
  const wb = XLSX.readFile(filepath);
  const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false });
  return rows.map(r => r.map(c => String(c ?? "").trim()));
}

function buildSpecTables(rows: string[][]): { name: string; data: string[][] }[] {
  const tables: { name: string; data: string[][] }[] = [];
  let currentName = "";
  let currentRows: string[][] = [];

  for (const row of rows) {
    const firstCell = row[0] || "";
    const allEmpty = row.every(c => !c);
    if (allEmpty) {
      if (currentRows.length > 1) {
        tables.push({ name: currentName, data: currentRows });
      }
      currentRows = [];
      currentName = "";
      continue;
    }
    if (firstCell.includes("Pompa") || firstCell.includes("Pump")) {
      currentName = firstCell.replace(/\r?\n/g, " ").trim();
      continue;
    }
    const filtered = row.filter(c => c !== "");
    if (filtered.length < 3) continue;
    currentRows.push(row.filter((_, i) => i !== 1 || row[1] !== "").map(c => c.replace(/\r?\n/g, " ").trim()));
  }
  if (currentRows.length > 1) {
    tables.push({ name: currentName, data: currentRows });
  }
  return tables;
}

async function main() {
  const emCat = await prisma.category.findUnique({ where: { slug: "elektro-mekanik-paneller" } });
  if (!emCat) throw new Error("elektro-mekanik-paneller kategorisi bulunamadı");

  const directCat = await prisma.category.findUnique({ where: { slug: "direkt-baslatma" } });
  const starCat = await prisma.category.findUnique({ where: { slug: "yildiz-ucgen-baslatma" } });
  if (!directCat || !starCat) throw new Error("Alt kategoriler bulunamadı");

  // Delete child categories (they'll become products)
  await prisma.category.deleteMany({ where: { id: { in: [directCat.id, starCat.id] } } });
  console.log("direkt-baslatma ve yildiz-ucgen-baslatma alt kategorileri silindi (ürün olacaklar)");

  // Read xlsx tables
  const trBase = "/Users/tahavacid/Desktop/TR Web Sitesi/Motor Kontrol Panoları/Elektro Mekanik Panolar";
  const enBase = "/Users/tahavacid/Desktop/EN Web Sitesi/Motor Control Panels/Electro Mechanic Panels";

  const dsTr = buildSpecTables(readXlsx(path.join(trBase, "Doğrudan Yol Verme", "Ürün Opsiyonları - Direct Start.xlsx")));
  const dsEn = buildSpecTables(readXlsx(path.join(enBase, "Direct Start", "Product Options - Direct Start.xlsx")));
  const sdTr = buildSpecTables(readXlsx(path.join(trBase, "Yıldız Üçgen Başlatma", "Ürün Opsiyonları - Star & Delta.xlsx")));
  const sdEn = buildSpecTables(readXlsx(path.join(enBase, "Star & Delta Start", "Product Options - Star & Delta.xlsx")));

  // Merge TR/EN tables
  const dsSpec = dsTr.map((t, i) => ({ name: t.name, data: t.data, dataEn: dsEn[i]?.data }));
  const sdSpec = sdTr.map((t, i) => ({ name: t.name, data: t.data, dataEn: sdEn[i]?.data }));

  // ── Direct Start ──
  const ds = await prisma.product.create({
    data: {
      slug: "direkt-baslatma",
      categoryId: emCat.id,
      nameTr: "Direct Start",
      nameEn: "Direct Start",
      descriptionTr: `Doğrudan yol verme metoduna sahip, 1 veya 3 faz motorları 4 pompaya kadar aynı anda sürebilen kontrol paneli. Temiz su ve pis su uygulamalarındaki doldurma, boşaltma ve basınçlandırma işlemleri için tasarlanmıştır.

ÖZELLİKLER
• Şamandıra ve seviye elektrod bağlantısı ile motoru durdurma, çalıştırma ve başlatma
• Metal / IP 54 / Su Geçirmez kasa
• Kilitleme mekanizmasına sahip ana kesici
• Güç Beslemesi: 1~230V veya 3~400V ±%15, 50/60Hz
• Motor çalışıyor (yeşil LED) / Hata (kırmızı LED) göstergesi
• Motor aşırı akım, faz kaybı/sırası ve kuru çalışma koruması
• Motor koruma sigortaları
• Şifre korumalı ekran
• Haftalık ayarlanabilen test`,
      descriptionEn: `Controller for up to 4 pump single or three-phase motors with direct starter. Designed for pressurization, emptying and filling in waste and clean water applications.

FEATURES
• Different types of connections to start/stop motor: flow switch, level electrode, pressure switches/sensors
• Metal Enclosure / IP 54
• Main switch with locking mechanism
• Power supply: 1~230V or 3~400V ±15%, 50/60Hz
• Green LED for motor running / Red LED for failures
• Motor overcurrent, phase loss/sequence and dry running protection
• Motor protection fuses
• Adjustable weekly test run`,
      image: "/uploads/direct-start-front.png",
      applicationImage: "/uploads/direct-start-uygulama.png",
      specTableData: JSON.stringify(dsSpec),
      sortOrder: 0,
      isActive: true,
    },
  });
  console.log(`Direct Start oluşturuldu (id=${ds.id})`);

  await prisma.productImage.createMany({
    data: [
      { productId: ds.id, url: "/uploads/direct-start-front.png", sortOrder: 0 },
      { productId: ds.id, url: "/uploads/direct-start-left.png", sortOrder: 1 },
      { productId: ds.id, url: "/uploads/direct-start-right.png", sortOrder: 2 },
      { productId: ds.id, url: "/uploads/direct-start-front-metal.png", sortOrder: 3 },
      { productId: ds.id, url: "/uploads/direct-start-left-metal.png", sortOrder: 4 },
      { productId: ds.id, url: "/uploads/direct-start-right-metal.png", sortOrder: 5 },
    ],
  });

  await prisma.productDocument.createMany({
    data: [
      { productId: ds.id, nameTr: "Direct Start Katalog 2025", nameEn: "Direct Start Catalogue 2025", url: "/uploads/direct-start-katalog-tr.pdf", urlEn: "/uploads/direct-start-katalog-en.pdf", type: "teknik", sortOrder: 0 },
      { productId: ds.id, nameTr: "Direct Start CE Uygunluk Belgesi", nameEn: "Direct Start Declaration of Conformity", url: "/uploads/direct-start-ce.pdf", type: "sertifika", sortOrder: 1 },
    ],
  });

  // ── Star & Delta Start ──
  const sd = await prisma.product.create({
    data: {
      slug: "yildiz-ucgen-baslatma",
      categoryId: emCat.id,
      nameTr: "Star & Delta Start",
      nameEn: "Star & Delta Start",
      descriptionTr: `1 veya 3 fazlı motorlarda 4 pompaya kadar aynı anda kontrol edebilen yıldız üçgen yol vermeli kontrol paneli. Temiz su ve pis su uygulamalarındaki doldurma, boşaltma ve basınçlandırma işlemleri için tasarlanmıştır.

ÖZELLİKLER
• Şamandıra ve seviye elektrod bağlantısı ile motoru durdurma, çalıştırma ve başlatma
• Metal / IP 54 / Su Geçirmez kasa
• Kilitleme mekanizmasına sahip ana kesici
• Güç Beslemesi: 1~230V veya 3~400V ±%15, 50/60Hz
• Motor çalışıyor (yeşil LED) / Hata (kırmızı LED) göstergesi
• Motor aşırı akım, faz kaybı/sırası ve kuru çalışma koruması
• Motor koruma sigortaları
• Yıldız Üçgen Kontaktörü AC3
• Şifre korumalı ekran
• Haftalık ayarlanabilen test
• Selenoid valf çıkışı`,
      descriptionEn: `Controller for up to 4 pump single or three-phase motors with star-delta starter. Designed for pressurization, emptying and filling in waste and clean water applications.

FEATURES
• Different types of connections to start/stop motor: flow switch, level electrode, pressure switches/sensors
• Metal Enclosure / IP 54
• Main switch with locking mechanism
• Power supply: 3~400V ±15%, 50/60Hz
• Green LED for motor running / Red LED for failures
• Motor overcurrent, phase loss/sequence and dry running protection
• Motor protection fuses
• Star Delta Contactor AC3
• Adjustable weekly test run
• Solenoid valve output`,
      image: "/uploads/star-delta-front.png",
      applicationImage: "/uploads/star-delta-uygulama.png",
      specTableData: JSON.stringify(sdSpec),
      sortOrder: 1,
      isActive: true,
    },
  });
  console.log(`Star & Delta Start oluşturuldu (id=${sd.id})`);

  await prisma.productImage.createMany({
    data: [
      { productId: sd.id, url: "/uploads/star-delta-front.png", sortOrder: 0 },
      { productId: sd.id, url: "/uploads/star-delta-left.png", sortOrder: 1 },
      { productId: sd.id, url: "/uploads/star-delta-right.png", sortOrder: 2 },
    ],
  });

  await prisma.productDocument.createMany({
    data: [
      { productId: sd.id, nameTr: "Star & Delta Start Katalog 2025", nameEn: "Star & Delta Start Catalogue 2025", url: "/uploads/star-delta-katalog-tr.pdf", urlEn: "/uploads/star-delta-katalog-en.pdf", type: "teknik", sortOrder: 0 },
      { productId: sd.id, nameTr: "Star & Delta Start CE Uygunluk Belgesi", nameEn: "Star & Delta Start Declaration of Conformity", url: "/uploads/star-delta-ce.pdf", type: "sertifika", sortOrder: 1 },
    ],
  });

  console.log("\nElektro Mekanik Paneller ürünleri başarıyla oluşturuldu!");
  console.log(`Direct Start: /urunler/kontrol-panelleri/elektro-mekanik-paneller/direkt-baslatma`);
  console.log(`Star & Delta: /urunler/kontrol-panelleri/elektro-mekanik-paneller/yildiz-ucgen-baslatma`);
  console.log(`\nDirect Start tabloları: ${dsSpec.length} varyant`);
  console.log(`Star & Delta tabloları: ${sdSpec.length} varyant`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
