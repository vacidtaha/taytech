import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const TR_BASE = "/Users/tahavacid/Desktop/TR Web Sitesi/Motor Kontrol Panoları/Elektronik Kontrol Paneli/Smart Serisi";
const EN_BASE = "/Users/tahavacid/Desktop/EN Web Sitesi/Motor Control Panels/Electronic Control Panels/Smart Series";

async function readDocx(fp: string): Promise<string> {
  try { return (await mammoth.extractRawText({ path: fp })).value; } catch { return ""; }
}

function readXlsx(fp: string): string[][] {
  const wb = XLSX.readFile(fp);
  const raw: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false });
  return raw.map(r => r.map(c => String(c ?? "").trim())).filter(r => r.some(c => c));
}

function parseDescription(raw: string): { descTr: string } {
  const lines = raw.split("\n").map(l => l.trim()).filter(l => l);
  const title = lines[0] || "";
  const intro = lines.find(l => l.length > 50 && !l.startsWith("3G") && !l.startsWith("Kolay")) || "";
  const features = lines.filter(l =>
    (l.startsWith("3G") || l.startsWith("Kolay") || l.startsWith("Şamandıra") || l.startsWith("Farklı") ||
     l.startsWith("Suya") || l.startsWith("Metal")) && l.length > 10
  );
  const techSpecs = lines.filter(l =>
    (l.startsWith("Metal") || l.startsWith("Kilitleme") || l.startsWith("Güç") || l.startsWith("Motor") ||
     l.startsWith("Koruma") || l.startsWith("Faz") || l.startsWith("Kuru") || l.startsWith("Başlatma") ||
     l.startsWith("Haftalık") || l.startsWith("Yetki")) && l.length > 5
  );

  const desc = `${intro}

ÖZELLİKLER
${features.map(f => "• " + f).join("\n")}

TEKNİK ÖZELLİKLER
Metal / IP 54 / Su Geçirmez Kasa | Kilitleme mekanizmalı ana kesici
Güç: 1~230V veya 3~400V ±%15, 50/60Hz | Motor/Hata LED göstergesi
Motor aşırı akım, faz kaybı/sırası ve kuru çalışma koruması | Motor koruma sigortaları
3G/Wi-Fi modül ile uzaktan izleme | LCD ekran üzerinden kolay ayar`;

  return { descTr: desc };
}

interface SmartProduct {
  slug: string;
  folderTr: string;
  folderEn: string;
  nameTr: string;
  nameEn: string;
  descTrOverride?: string;
  descEnOverride?: string;
}

const products: SmartProduct[] = [
  { slug: "smart-booster", folderTr: "Smart Booster", folderEn: "Smart Booster",
    nameTr: "Smart Hidrofor", nameEn: "Smart Booster",
    descTrOverride: `Mikroişlemcili kontrol panoları, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Booster, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma gibi işlemleri pratik bir şekilde yapmanızı sağlar. Temiz su uygulamalarındaki basınçlandırma süreçlerini gerçekleştirir.

ÖZELLİKLER
• 3G / Wi-Fi modül sayesinde uzaktan sistemi işletme, verileri görüntüleme ve kontrol etme
• Kolay ve hızlı LCD ekran üzerinden ayar yapma
• Farklı tipteki bağlantılar ile motoru başlatma veya durdurma (basınç anahtarı, akış anahtarı vb.)

TEKNİK ÖZELLİKLER
Metal / IP 54 / Su Geçirmez | Kilitleme mekanizmalı ana kesici
Güç: 1~230V veya 3~400V ±%15, 50/60Hz | Motor/Hata LED
Motor aşırı akım, faz kaybı ve kuru çalışma koruması | Motor koruma sigortaları`,
    descEnOverride: `Microprocessor controlled panels for up to 2 pump single or three-phase systems. Smart Booster enables system management, parameter changes, event logging and more. Designed for pressurization processes in clean water applications.

FEATURES
• 3G / Wi-Fi module for remote operation, data viewing and system control
• Easy and quick settings via clear LCD screen with navigation buttons
• Various connection types to start/stop motor: pressure switch, flow switch etc.

TECHNICAL SPECIFICATIONS
Metal / IP 54 / Waterproof | Main switch with locking mechanism
Power: 1~230V or 3~400V ±15%, 50/60Hz | Motor/Fault LED
Motor overcurrent, phase loss and dry running protection | Motor protection fuses` },
  { slug: "smart-bore-hole", folderTr: "Smart Bore Hole", folderEn: "Smart Bore Hole",
    nameTr: "Smart Derin Kuyu", nameEn: "Smart Bore Hole",
    descTrOverride: `Mikroişlemcili kontrol panoları, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Bore Hole, pis su ve temiz su uygulamalarındaki doldurma ve boşaltma süreçlerini gerçekleştirir.

ÖZELLİKLER
• 3G / Wi-Fi modül sayesinde uzaktan sistemi işletme ve verileri görüntüleme
• LCD ekran üzerinden kolay ve hızlı ayar
• Şamandıra veya seviye elektrotlarından gelen bilgi ile sistemi açar, çalıştırır ve durdurur

TEKNİK ÖZELLİKLER
Suya dayanıklı IP 55 ABS kasa | Kilitleme mekanizmalı ana kesici
Güç: 1~230V veya 3~400V ±%15, 50/60Hz | Motor/Hata LED
Motor aşırı akım, faz kaybı ve kuru çalışma koruması | Motor koruma sigortaları`,
    descEnOverride: `Microprocessor controlled panels for up to 2 pump single or three-phase systems. Smart Bore Hole handles filling and emptying processes in waste and clean water applications.

FEATURES
• 3G / Wi-Fi module for remote operation and data viewing
• Easy and quick settings via clear LCD screen
• Starts, runs and stops system based on float switch or level electrode signals

TECHNICAL SPECIFICATIONS
IP 55 ABS waterproof enclosure | Main switch with locking mechanism
Power: 1~230V or 3~400V ±15%, 50/60Hz | Motor/Fault LED
Motor overcurrent, phase loss and dry running protection | Motor protection fuses` },
  { slug: "smart-box", folderTr: "Smart Box", folderEn: "Smart Box",
    nameTr: "Smart Box", nameEn: "Smart Box",
    descTrOverride: `Mikrokontrolörlü kontrol panoları, 1 fazlı pompaları kontrol etmek için tasarlanmıştır. Smart Box, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma gibi işlemleri pratik bir şekilde yapmanızı sağlar. Temiz su uygulamalarına yönelik boşaltma veya doldurma işlemlerini gerçekleştirir.

ÖZELLİKLER
• LCD ekran üzerinden kolay ve hızlı ayar
• Farklı tipteki bağlantılar ile motoru başlatma veya durdurma (basınç anahtarı, akış anahtarı vb.)
• Suya dayanıklı IP 55 ABS malzemeden üretilmiş özel dizayn kutu

TEKNİK ÖZELLİKLER
IP 55 ABS Su Geçirmez | Güç: 1~230V ±%15, 50/60Hz
Motor/Hata LED | Motor aşırı akım koruması | Motor koruma sigortaları`,
    descEnOverride: `Microcontroller based control panels designed for single-phase pump control. Smart Box enables system management, parameter changes and event logging. Handles emptying or filling processes for clean water applications.

FEATURES
• Easy and quick settings via clear LCD screen with navigation buttons
• Various connection types to start/stop motor: pressure switch, flow switch etc.
• Waterproof IP 55 ABS custom design enclosure

TECHNICAL SPECIFICATIONS
IP 55 ABS Waterproof | Power: 1~230V ±15%, 50/60Hz
Motor/Fault LED | Motor overcurrent protection | Motor protection fuses` },
  { slug: "smart-exclusive", folderTr: "Smart Exclusive", folderEn: "Smart Exclusive",
    nameTr: "Smart Exclusive", nameEn: "Smart Exclusive",
    descTrOverride: `Mikroişlemcili kontrol panoları, tek faz veya trifaz olarak 4 pompaya kadar sistemi kontrol eder. Smart Exclusive, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma gibi işlemleri pratik bir şekilde yapmanızı sağlar. Atık su ve temiz su uygulamaları için basınçlandırma, boşaltma, doldurma işlemlerinde kullanılır.

ÖZELLİKLER
• 3G / Wi-Fi modül sayesinde uzaktan sistemi işletme, verileri görüntüleme ve kontrol etme
• LCD ekran üzerinden kolay ve hızlı ayar
• Şamandıra, basınç sensörü/anahtarı veya seviye elektrodundan gelen bilgilerle sistemi yönetir

TEKNİK ÖZELLİKLER
Metal / IP 54 / Su Geçirmez | Kilitleme mekanizmalı ana kesici
Güç: 1~230V veya 3~400V ±%15, 50/60Hz | Motor/Hata LED
Motor aşırı akım, faz kaybı ve kuru çalışma koruması | Motor koruma sigortaları`,
    descEnOverride: `Microprocessor controlled panels for up to 4 pump single or three-phase systems. Smart Exclusive enables system management, parameter changes, event logging and more. For pressurization, emptying and filling in waste and clean water applications.

FEATURES
• 3G / Wi-Fi module for remote operation, data viewing and system control
• Easy and quick settings via clear LCD screen
• Manages system based on float switch, pressure sensor/switch or level electrode signals

TECHNICAL SPECIFICATIONS
Metal / IP 54 / Waterproof | Main switch with locking mechanism
Power: 1~230V or 3~400V ±15%, 50/60Hz | Motor/Fault LED
Motor overcurrent, phase loss and dry running protection | Motor protection fuses` },
  { slug: "smart-grinder", folderTr: "Smart Grinder", folderEn: "Smart Grinder",
    nameTr: "Smart Grinder", nameEn: "Smart Grinder",
    descTrOverride: `Mikroişlemcili kontrol panoları, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Grinder, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma gibi işlemleri pratik bir şekilde yapmanızı sağlar.

ÖZELLİKLER
• 3G / Wi-Fi modül sayesinde uzaktan sistemi işletme, verileri görüntüleme ve kontrol etme
• LCD ekran üzerinden kolay ve hızlı ayar
• Şamandıradan gelen bilgi ile sistemi açar, çalıştırır ve durdurur
• Suya dayanıklı IP 55 ABS malzemeden üretilmiş özel dizayn kutu

TEKNİK ÖZELLİKLER
IP 55 ABS Su Geçirmez | Kilitleme mekanizmalı ana kesici
Güç: 1~230V veya 3~400V ±%15, 50/60Hz | Motor/Hata LED
Motor aşırı akım, faz kaybı ve kuru çalışma koruması | Motor koruma sigortaları`,
    descEnOverride: `Microprocessor controlled panels for up to 2 pump single or three-phase systems. Smart Grinder enables system management, parameter changes, event logging and more.

FEATURES
• 3G / Wi-Fi module for remote operation, data viewing and system control
• Easy and quick settings via clear LCD screen
• Starts, runs and stops system based on float switch signals
• Waterproof IP 55 ABS custom design enclosure

TECHNICAL SPECIFICATIONS
IP 55 ABS Waterproof | Main switch with locking mechanism
Power: 1~230V or 3~400V ±15%, 50/60Hz | Motor/Fault LED
Motor overcurrent, phase loss and dry running protection | Motor protection fuses` },
  { slug: "smart-wastewater", folderTr: "Smart Wastewater", folderEn: "Smart Wastewater",
    nameTr: "Smart Atık Su", nameEn: "Smart Wastewater",
    descTrOverride: `Mikroişlemcili kontrol panoları, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Wastewater, atık su uygulamalarındaki doldurma ve boşaltma süreçlerini gerçekleştirir.

ÖZELLİKLER
• 3G / Wi-Fi modül sayesinde uzaktan sistemi işletme, verileri görüntüleme ve kontrol etme
• LCD ekran üzerinden kolay ve hızlı ayar
• Şamandıra veya seviye elektrotlarından gelen bilgi ile sistemi açar, çalıştırır ve durdurur

TEKNİK ÖZELLİKLER
IP 55 ABS Su Geçirmez | Kilitleme mekanizmalı ana kesici
Güç: 1~230V veya 3~400V ±%15, 50/60Hz | Motor/Hata LED
Motor aşırı akım, faz kaybı ve kuru çalışma koruması | Motor koruma sigortaları`,
    descEnOverride: `Microprocessor controlled panels for up to 2 pump single or three-phase systems. Smart Wastewater handles filling and emptying processes in waste water applications.

FEATURES
• 3G / Wi-Fi module for remote operation, data viewing and system control
• Easy and quick settings via clear LCD screen
• Starts, runs and stops system based on float switch or level electrode signals

TECHNICAL SPECIFICATIONS
IP 55 ABS Waterproof | Main switch with locking mechanism
Power: 1~230V or 3~400V ±15%, 50/60Hz | Motor/Fault LED
Motor overcurrent, phase loss and dry running protection | Motor protection fuses` },
];

async function main() {
  // 1. Update category names
  console.log("=== Kategori isim güncellemeleri ===");
  await prisma.category.update({ where: { slug: "kontrol-panelleri" }, data: { nameTr: "Motor Kontrol Panoları", nameEn: "Motor Control Panels" } });
  console.log("✓ kontrol-panelleri → Motor Kontrol Panoları");
  await prisma.category.update({ where: { slug: "heat-network" }, data: { nameTr: "Isı Ağları" } });
  console.log("✓ heat-network → Isı Ağları");

  // Rename bina-alti to endustriyel
  const binaAlti = await prisma.category.findUnique({ where: { slug: "bina-alti-istasyonlari" } });
  if (binaAlti) {
    await prisma.category.update({ where: { id: binaAlti.id }, data: { slug: "endustriyel-isi-istasyonlari", nameTr: "Endüstriyel Isı İstasyonları" } });
    console.log("✓ bina-alti-istasyonlari → endustriyel-isi-istasyonlari");
  }

  // 2. Delete old smart categories, create new one
  console.log("\n=== Smart Serisi kategori düzeltmesi ===");
  await prisma.category.deleteMany({ where: { slug: { in: ["smart-direct-serisi", "smart-yildiz-ucgen-serisi"] } } });

  const elektronik = await prisma.category.findUnique({ where: { slug: "elektronik-kontrol-panelleri" } });
  if (!elektronik) throw new Error("elektronik-kontrol-panelleri bulunamadı");

  const smartCat = await prisma.category.create({
    data: { slug: "smart-serisi", nameTr: "Smart Serisi", nameEn: "Smart Series", parentId: elektronik.id, sortOrder: 0 },
  });
  console.log("✓ Smart Serisi kategorisi oluşturuldu (id=" + smartCat.id + ")");

  // 3. Add Isıtma Soğutma Ekipmanları category tree
  console.log("\n=== Isıtma Soğutma Ekipmanları ekleniyor ===");
  const ise = await prisma.category.create({
    data: { slug: "isitma-sogutma-ekipmanlari", nameTr: "Isıtma Soğutma Ekipmanları", nameEn: "Heating & Cooling Equipment", sortOrder: 3 },
  });
  for (const [slug, tr, en] of [
    ["termal-aktuatorler", "Termal Aktüatörler", "Thermal Actuators"],
    ["oda-termostatlari", "Oda Termostatları", "Room Thermostats"],
    ["karisim-vanalari", "Karışım Vanaları", "Mixing Valves"],
    ["kollektorler", "Kollektörler", "Manifolds"],
  ] as const) {
    await prisma.category.create({ data: { slug, nameTr: tr, nameEn: en, parentId: ise.id, sortOrder: 0 } });
  }
  console.log("✓ Isıtma Soğutma Ekipmanları + 4 alt kategori oluşturuldu");

  // 4. Add Hydro EM Series categories
  console.log("\n=== Hydro EM Serisi ekleniyor ===");
  const hiuCat = await prisma.category.findUnique({ where: { slug: "isi-istasyonlari" } });
  if (hiuCat) {
    const hem = await prisma.category.create({
      data: { slug: "hydro-em-serisi", nameTr: "Hydro EM Serisi", nameEn: "Hydro EM Series", parentId: hiuCat.id, sortOrder: 4 },
    });
    const indHem = await prisma.category.create({
      data: { slug: "indirect-hydro-em", nameTr: "Indirect Hydro EM", nameEn: "Indirect Hydro EM", parentId: hem.id, sortOrder: 0 },
    });
    await prisma.category.create({ data: { slug: "indirect-hydro-em-dhw-sh", nameTr: "Indirect Hydro EM DHW-SH", nameEn: "Indirect Hydro EM DHW-SH", parentId: indHem.id, sortOrder: 0 } });
    const dirHem = await prisma.category.create({
      data: { slug: "direct-hydro-em", nameTr: "Direct Hydro EM", nameEn: "Direct Hydro EM", parentId: hem.id, sortOrder: 1 },
    });
    await prisma.category.create({ data: { slug: "direct-hydro-em-rh", nameTr: "Direct Hydro EM RH", nameEn: "Direct Hydro EM RH", parentId: dirHem.id, sortOrder: 0 } });
    await prisma.category.create({ data: { slug: "direct-hydro-em-ufh", nameTr: "Direct Hydro EM UFH", nameEn: "Direct Hydro EM UFH", parentId: dirHem.id, sortOrder: 1 } });
    console.log("✓ Hydro EM Serisi + alt kategorileri oluşturuldu");
  }

  // 5. Create 6 Smart products
  console.log("\n=== Smart Serisi ürünleri ===");
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const slug = p.slug;

    // Read xlsx for spec table
    let specTableData: string | null = null;
    try {
      const xlsxPath = path.join(TR_BASE, p.folderTr, `Ürün Opsiyonları - ${p.folderTr === "Smart Wastewater" ? "Smart Waste Water" : p.folderTr}.xlsx`);
      const xlsxEnPath = path.join(EN_BASE, p.folderEn, `Product Options - ${p.folderEn === "Smart Wastewater" ? "Smart Waste Water" : p.folderEn}.xlsx`);
      const dataTr = readXlsx(xlsxPath);
      let dataEn: string[][] | undefined;
      try { dataEn = readXlsx(xlsxEnPath); } catch {}
      if (dataTr.length > 1) {
        specTableData = JSON.stringify([{
          name: "Sipariş Tablosu",
          data: dataTr,
          dataEn: dataEn && dataEn.length > 1 ? dataEn : undefined,
        }]);
      }
    } catch {}

    const product = await prisma.product.create({
      data: {
        slug,
        categoryId: smartCat.id,
        nameTr: p.nameTr,
        nameEn: p.nameEn,
        descriptionTr: p.descTrOverride || "",
        descriptionEn: p.descEnOverride || "",
        image: `/uploads/${slug}-front.png`,
        applicationImage: `/uploads/${slug}-uygulama.png`,
        specTableData,
        sortOrder: i,
        isActive: true,
      },
    });

    await prisma.productImage.createMany({
      data: [
        { productId: product.id, url: `/uploads/${slug}-front.png`, sortOrder: 0 },
        { productId: product.id, url: `/uploads/${slug}-left.png`, sortOrder: 1 },
        { productId: product.id, url: `/uploads/${slug}-right.png`, sortOrder: 2 },
      ],
    });

    await prisma.productDocument.createMany({
      data: [
        { productId: product.id, nameTr: `${p.nameTr} Katalog 2025`, nameEn: `${p.nameEn} Catalogue 2025`, url: `/uploads/${slug}-katalog-tr.pdf`, urlEn: `/uploads/${slug}-katalog-en.pdf`, type: "teknik", sortOrder: 0 },
        { productId: product.id, nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: `/uploads/${slug}-ce.pdf`, urlEn: `/uploads/${slug}-ce.pdf`, type: "sertifika", sortOrder: 1 },
        { productId: product.id, nameTr: "Kullanım Kılavuzu", nameEn: "Instruction Manual", url: `/uploads/${slug}-kilavuz-tr.pdf`, urlEn: `/uploads/${slug}-kilavuz-en.pdf`, type: "kilavuz", sortOrder: 2 },
      ],
    });

    console.log(`✓ ${p.nameTr} (id=${product.id}, ${specTableData ? 'tablo var' : 'tablo yok'})`);
  }

  const total = await prisma.product.count();
  console.log(`\n🎯 Toplam ${total} ürün veritabanında.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
