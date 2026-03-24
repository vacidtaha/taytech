import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const BASE = path.join(process.env.HOME!, "Desktop", "TR Web Sitesi", "Isı Ağları", "Isı İstasyonları (HIU)", "ThermoHexa Serisi");
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

function parseXlsx(filePath: string): { name: string; data: string[][] }[] {
  const wb = XLSX.readFile(filePath);
  let allData: string[][] = [];
  for (const sn of wb.SheetNames) {
    const rows: string[][] = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, defval: "", raw: false });
    allData = allData.concat(rows.filter((r) => r.some((c) => c !== "")));
  }
  if (allData.length >= 2) return [{ name: "Ürün Opsiyonları", data: allData }];
  return [];
}

const products = [
  {
    productId: 12,
    folder: "Direct ThermoHexa/Direct ThermoHexa DHW",
    descriptionTr: `ThermoHexa DHW

ThermoHexa sadece kullanım sıcak suyunu hazırlamak ve primer tarafta dengeleme yapmak için kullanılır. Enerji kayıplarının minimum olması için çok hızlı tepki veren termostatik vanaya sahiptir. Isı eşanjöründeki ısı kaybını en aza indirmek için EPP izolasyon uygulanmıştır. Kompakt tasarımı, kullanıcının montajı kolay ve pratik bir şekilde yapmasını sağlar. Eşanjör ve boruların malzemesi paslanmaz çeliktir ve HIU alüminyum radyatörlerle birlikte verimli bir şekilde çalışabilir.

Teknik Özellikler
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi`,
    descriptionEn: `ThermoHexa DHW

ThermoHexa is used solely for domestic hot water preparation and primary side balancing. It features a very fast-responding thermostatic valve to minimize energy losses. EPP insulation is applied to minimize heat loss in the heat exchanger. Its compact design allows the user to install it easily and practically. The exchanger and pipe material is stainless steel, and the HIU can operate efficiently with aluminium radiators.

Technical Specifications
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve`,
  },
  {
    productId: 13,
    folder: "Direct ThermoHexa/Direct ThermoHexa RH",
    descriptionTr: `Direct ThermoHexa RH

ThermoHexa ısı istasyonlarında kontrol sıcaklığa bağlı, yani termostatik olarak yapılır. Kullanım sıcak suyu hazırlama işlemi ile ısıtma işlemi aynı anda gerçekleşir. ThermoHexa içerisinde bulunan ve sıcaklığa bağlı çok hızlı tepki gösteren Termostatik Vana sayesinde, ısı kaybı olasılığı azalır. Kompakt tasarımı sayesinde, cihazı monte etmek pratik ve kolaydır. ThermoHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır.

Teknik Özellikler
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi`,
    descriptionEn: `Direct ThermoHexa RH

In ThermoHexa heat interface units, control is temperature-dependent, i.e. thermostatic. Domestic hot water preparation and heating processes occur simultaneously. Thanks to the very fast-responding Thermostatic Valve inside ThermoHexa, the possibility of heat loss is reduced. Its compact design makes the device practical and easy to install. The exchangers and pipes inside ThermoHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators.

Technical Specifications
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve`,
  },
  {
    productId: 14,
    folder: "Direct ThermoHexa/Direct ThermoHexa UFH",
    descriptionTr: `Direct ThermoHexa UFH

ThermoHexa ısı istasyonlarında kontrol sıcaklığa bağlı, yani termostatik olarak yapılır. Kullanım sıcak suyu hazırlama işlemi ile ısıtma işlemi aynı anda gerçekleşir. ThermoHexa içerisinde bulunan ve sıcaklığa bağlı çok hızlı tepki gösteren Termostatik Vana sayesinde, ısı kaybı olasılığı azalır. Kompakt tasarımı sayesinde, cihazı monte etmek pratik ve kolaydır. ThermoHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır.

ThermoHexa, yerden ısıtma hattı sıcaklığını stabil tutmak için, bir karışım devresi içerir. Isı istasyonu içerisinde bulunan zon vanası sayesinde, daire içinde giden debi miktarı ayarlanabilir. Zon vanası üzerine aktüatör kolay bir şekilde adapte edilebilir. Bu sayede oda termostatının kapalı olduğu durumlarda, aktüatör yerden ısıtma devresini kapatarak, enerji sarfiyatının önüne geçer.

Teknik Özellikler
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi
• Yerden ısıtma hattı için karışım devresi
• Elektrik bağlantıları için bağlantı kutusu (Opsiyonel)
• Yerden ısıtma devresi için sıcaklık kontrol vanası`,
    descriptionEn: `Direct ThermoHexa UFH

In ThermoHexa heat interface units, control is temperature-dependent, i.e. thermostatic. Domestic hot water preparation and heating processes occur simultaneously. Thanks to the very fast-responding Thermostatic Valve inside ThermoHexa, the possibility of heat loss is reduced. Its compact design makes the device practical and easy to install. The exchangers and pipes inside ThermoHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators.

ThermoHexa includes a mixing circuit to keep the underfloor heating line temperature stable. Thanks to the zone valve inside the heat interface unit, the flow rate going into the apartment can be adjusted. An actuator can be easily adapted onto the zone valve. This way, when the room thermostat is off, the actuator closes the underfloor heating circuit, preventing energy waste.

Technical Specifications
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve
• Mixing circuit for underfloor heating line
• Junction box for electrical connections (Optional)
• Temperature control valve for underfloor heating circuit`,
  },
  {
    productId: 11,
    folder: "Indirect ThermoHexa/Indirect ThermoHexa DHW-SH",
    descriptionTr: `Indirect ThermoHexa

ThermoHexa ısı istasyonlarında kontrol sıcaklığa bağlı, yani termostatik olarak yapılır. Kullanım sıcak suyu hazırlama işlemi ile ısıtma işlemi aynı anda gerçekleşir. ThermoHexa içerisinde bulunan ve sıcaklığa bağlı çok hızlı tepki gösteren Termostatik Vana sayesinde, ısı kaybı olasılığı azalır. Kompakt tasarımı sayesinde, cihazı monte etmek pratik ve kolaydır. ThermoHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır.

Indirect serisi ThermoHexa, yüksek katlı binalarda basınç kırıcı görevi görerek, kat aralarında bulunan mekanik odaların kaldırılmasına ve bu alanların ticari olarak kullanılmasına olanak sağlar. Isıtma, ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır. Daire ısıtmasını kontrol etmek için, opsiyonel olarak dış hava kompanzasyon kontrolü de eklenebilir.

Teknik Özellikler
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi`,
    descriptionEn: `Indirect ThermoHexa

In ThermoHexa heat interface units, control is temperature-dependent, i.e. thermostatic. Domestic hot water preparation and heating processes occur simultaneously. Thanks to the very fast-responding Thermostatic Valve inside ThermoHexa, the possibility of heat loss is reduced. Its compact design makes the device practical and easy to install. The exchangers and pipes inside ThermoHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators.

The Indirect series ThermoHexa acts as a pressure breaker in high-rise buildings, enabling the removal of mechanical rooms between floors and allowing these areas to be used commercially. Heating operates as a closed system with a separate exchanger circuit. Optionally, outdoor weather compensation control can be added to control apartment heating.

Technical Specifications
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve`,
  },
];

async function importProduct(p: typeof products[0]) {
  const srcDir = path.join(BASE, p.folder);
  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith(".") && !/~\$/.test(f));
  console.log(`\n--- ${p.folder} (ID: ${p.productId}) ---`);

  const renderFiles = files.filter((f) => /render/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f));
  const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));
  const xlsxFiles = files.filter((f) => /\.xlsx?$/i.test(f));
  const dwgFiles = files.filter((f) => /\.dwg$/i.test(f));

  const frontRender = renderFiles.find((f) => /ön|front/i.test(f));
  let primaryImage: string | null = null;
  if (frontRender) {
    primaryImage = copyFile(path.join(srcDir, frontRender), frontRender);
    console.log(`  Ana foto: ${frontRender}`);
  } else if (renderFiles.length > 0) {
    primaryImage = copyFile(path.join(srcDir, renderFiles[0]), renderFiles[0]);
    console.log(`  Ana foto: ${renderFiles[0]}`);
  }

  const additionalImages: string[] = [];
  for (const rf of renderFiles) {
    if (rf === (frontRender || renderFiles[0])) continue;
    additionalImages.push(copyFile(path.join(srcDir, rf), rf));
    console.log(`  Ek foto: ${rf}`);
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
    data: {
      image: primaryImage,
      specTableData,
      descriptionTr: p.descriptionTr,
      descriptionEn: p.descriptionEn,
    },
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
    } else if (/müşteri|çizim/i.test(lower) && !(/\.dwg$/i.test(lower))) {
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
  console.log("=== THERMOHEXA SERİSİ İMPORT ===");
  for (const p of products) await importProduct(p);
  console.log("\n=== TAMAMLANDI ===");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
