import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const BASE = path.join(
  process.env.HOME!,
  "Desktop",
  "TR Web Sitesi",
  "Isı Ağları",
  "Isı İstasyonları (HIU)",
  "SmartHexa Serisi ",
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

function parseXlsx(filePath: string): { name: string; data: string[][] }[] {
  const wb = XLSX.readFile(filePath);
  let allData: string[][] = [];
  for (const sn of wb.SheetNames) {
    const rows: string[][] = XLSX.utils.sheet_to_json(wb.Sheets[sn], {
      header: 1,
      defval: "",
      raw: false,
    });
    allData = allData.concat(rows.filter((r) => r.some((c) => c !== "")));
  }
  if (allData.length >= 2) return [{ name: "Ürün Opsiyonları", data: allData }];
  return [];
}

const PRODUCT_ID = 1; // Indirect SmartHexa
const FOLDER = "Indirect SmartHexa/Indirect SmartHexa DHW-SH";

const descriptionTr = `Indirect SmartHexa

SmartHexa ısı istasyonlarında kontrol elektronik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için, eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. SmartHexa ısı istasyonları kullanım sıcak suyu önceliğine sahiptir. SmartHexa'nın düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli bir şekilde çalışabilir. SmartHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. SmartHexa, kazan dönüş hattında bulunan fark basınç vanası ve ısıtma dönüş hattında bulunan zon vanası sayesinde daire içerisinde eksiksiz balanslama yapılabilir.

Indirect serisi SmartHexa, yüksek katlı binalarda basınç kırıcı görevi görerek, kat aralarında bulunan mekanik odaların kaldırılmasına ve bu alanların ticari olarak kullanılmasına olanak sağlar. Isıtma, ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır. Daire ısıtmasını kontrol etmek için, opsiyonel olarak dış hava kompanzasyon kontrolü de eklenebilir.

Teknik Özellikler
• Elektronik kontrol sistemi
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi
• Sıcaklık kontrollü, hazırda bekletme fonksiyonu
• Anti-lejyonella fonksiyonu`;

const descriptionEn = `Indirect SmartHexa

In SmartHexa heat interface units, control is performed electronically. Since the system operates with a cold exchanger principle, the possibility of limescale buildup within the exchanger is eliminated. SmartHexa heat interface units have domestic hot water priority. Thanks to SmartHexa's low return water feature, it can work efficiently with condensing boilers. The exchangers and pipes inside SmartHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators. SmartHexa provides complete balancing within apartments thanks to the differential pressure valve on the boiler return line and the zone valve on the heating return line.

The Indirect series SmartHexa acts as a pressure breaker in high-rise buildings, enabling the removal of mechanical rooms between floors and allowing these areas to be used commercially. Heating operates as a closed system with a separate exchanger circuit. Optionally, outdoor weather compensation control can be added to control apartment heating.

Technical Specifications
• Electronic control system
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve
• Temperature-controlled standby function
• Anti-legionella function`;

async function main() {
  ensureDir(UPLOADS);
  console.log("=== SMARTHEXA SERİSİ İMPORT ===\n");

  const srcDir = path.join(BASE, FOLDER);
  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith(".") && !/~\$/.test(f));
  console.log(`Kaynak: ${FOLDER}`);
  console.log(`Dosyalar: ${files.join(", ")}`);

  const renderFiles = files.filter((f) => /render/i.test(f) && /\.(png|jpg|jpeg)$/i.test(f));
  const pdfFiles = files.filter((f) => /\.pdf$/i.test(f));
  const xlsxFiles = files.filter((f) => /\.xlsx?$/i.test(f));

  // Front render as primary
  const frontRender = renderFiles.find((f) => /front|ön/i.test(f));
  let primaryImage: string | null = null;
  if (frontRender) {
    primaryImage = copyFile(path.join(srcDir, frontRender), frontRender);
    console.log(`Ana foto: ${frontRender}`);
  }

  const additionalImages: string[] = [];
  for (const rf of renderFiles) {
    if (rf === frontRender) continue;
    additionalImages.push(copyFile(path.join(srcDir, rf), rf));
    console.log(`Ek foto: ${rf}`);
  }

  let specTableData: string | null = null;
  if (xlsxFiles.length > 0) {
    const variants = parseXlsx(path.join(srcDir, xlsxFiles[0]));
    if (variants.length > 0) {
      specTableData = JSON.stringify(variants);
      console.log(`Varyant: ${variants.length} tablo, ${variants.reduce((a, v) => a + v.data.length, 0)} satır`);
    }
  }

  await prisma.product.update({
    where: { id: PRODUCT_ID },
    data: {
      image: primaryImage,
      specTableData,
      descriptionTr,
      descriptionEn,
    },
  });
  console.log(`DB: Product güncellendi (açıklama + fotoğraf + tablo)`);

  // Add additional images
  for (let i = 0; i < additionalImages.length; i++) {
    await prisma.productImage.create({
      data: { productId: PRODUCT_ID, url: additionalImages[i], sortOrder: i + 1 },
    });
  }
  if (additionalImages.length > 0) console.log(`${additionalImages.length} ek foto eklendi`);

  // Documents
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
      data: { productId: PRODUCT_ID, nameTr, nameEn, url, type, sortOrder: docOrder++ },
    });
    console.log(`Döküman: ${nameTr} (${pdf})`);
  }

  console.log(`\n=== TAMAMLANDI ===`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
