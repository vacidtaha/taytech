import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";
import * as XLSX from "xlsx";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

function readXlsxTable(filepath: string): string[][] {
  const wb = XLSX.readFile(filepath);
  const raw: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false });
  const rows = raw.map(r => r.map(c => String(c ?? "").trim()));
  const headerIdx = rows.findIndex(r => r.some(c => c.includes("Sipariş") || c.includes("Order")));
  if (headerIdx < 0) return [];
  const colCount = rows[headerIdx].length;
  const result: string[][] = [rows[headerIdx]];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[0] || row.every(c => !c)) continue;
    result.push(row.slice(0, colCount));
  }
  return result;
}

const TR_BASE = "/Users/tahavacid/Desktop/TR Web Sitesi/Isı Ağları/Isı İstasyonları (HIU)";
const EN_BASE = "/Users/tahavacid/Desktop/EN Web Sitesi/Heat Network/Heat Interface Units";

interface ProductDef {
  slug: string;
  parentSlug: string;
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  prefix: string;
  images: string[];
  docs: { nameTr: string; nameEn: string; url: string; urlEn?: string; type: string }[];
  appImage?: string;
  xlsxTr?: string;
  xlsxEn?: string;
}

const hiuDescTr = (series: string, type: string, extra: string = "") => {
  const base = type === "indirect"
    ? `${series} ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. ${series} ısı istasyonları kullanım sıcak suyu önceliğine sahiptir.`
    : type === "thermo"
    ? `${series} ısı istasyonlarında kontrol sıcaklığa bağlı, yani termostatik olarak yapılır. Kullanım sıcak suyu hazırlama işlemi ile ısıtma işlemi aynı anda gerçekleşir. Termostatik Vana sayesinde ısı kaybı olasılığı azalır. Kompakt tasarımı sayesinde montaj pratik ve kolaydır.`
    : `${series} ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli çalışabilir.`;
  return `${base} Eşanjörler ve borular AISI 316 kalite paslanmaz çelikten imal edilmiştir.${extra}

TEKNİK ÖZELLİKLER
Eşanjör Malzeme: AISI 316 Paslanmaz Çelik | Maks. Çalışma Basıncı: 10 Bar
Maks. Çalışma Sıcaklığı: 90°C | Bağlantı: Dişli / Flanşlı`;
};

const hiuDescEn = (series: string, type: string, extra: string = "") => {
  const base = type === "indirect"
    ? `${series} heat interface units provide both hydraulic and thermostatic control. The cold exchanger principle eliminates limescale buildup. ${series} units prioritize domestic hot water production.`
    : type === "thermo"
    ? `${series} heat interface units use temperature-based thermostatic control. Domestic hot water preparation and heating operate simultaneously. The thermostatic valve reduces heat loss. Compact design enables easy installation.`
    : `${series} heat interface units provide both hydraulic and thermostatic control. Low return water temperature enables efficient operation with condensing boilers.`;
  return `${base} Heat exchangers and pipes are manufactured from AISI 316 stainless steel.${extra}

TECHNICAL SPECIFICATIONS
Exchanger Material: AISI 316 Stainless Steel | Max. Working Pressure: 10 Bar
Max. Working Temperature: 90°C | Connection: Threaded / Flanged`;
};

const ufhExtraTr = "\n\nYerden ısıtma hattı sıcaklığını stabil tutmak için karışım devresi içerir. Zon vanası sayesinde daire içinde giden debi miktarı ayarlanabilir.";
const ufhExtraEn = "\n\nIncludes a mixing circuit to maintain stable underfloor heating temperature. Zone valve allows adjustment of flow rate within the dwelling.";
const indirectExtraTr = "\n\nIndirect serisi, yüksek katlı binalarda basınç kırıcı görevi görerek kat aralarındaki mekanik odaların kaldırılmasına olanak sağlar. Isıtma ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır.";
const indirectExtraEn = "\n\nThe Indirect series acts as a pressure breaker in high-rise buildings, enabling removal of intermediate mechanical rooms. Heating operates as a closed system through a separate exchanger circuit.";

const products: ProductDef[] = [
  // SmartHexa Indirect DHW-SH
  { slug: "indirect-smarthexa-dhw-sh", parentSlug: "indirect-smarthexa", nameTr: "Indirect SmartHexa DHW-SH", nameEn: "Indirect SmartHexa DHW-SH",
    descTr: hiuDescTr("SmartHexa", "indirect", indirectExtraTr), descEn: hiuDescEn("SmartHexa", "indirect", indirectExtraEn),
    prefix: "i-sh-dhw-sh", images: ["front","left","right","kabin"].map(s => `/uploads/i-sh-dhw-sh-${s}.png`),
    docs: [{ nameTr: "Indirect SmartHexa Katalog", nameEn: "Indirect SmartHexa Catalogue", url: "/uploads/i-sh-dhw-sh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/i-sh-dhw-sh-ce.pdf", type: "sertifika" }],
    xlsxTr: `${TR_BASE}/SmartHexa Serisi /Indirect SmartHexa/Indirect SmartHexa DHW-SH/Ürün Opsiyonları - ISH.xlsx`,
    xlsxEn: `${EN_BASE}/SmartHexa Series/Indirect SmartHexa/Indirect SmartHexa DHW-SH/Product Options - ISH.xlsx` },
  // SmartHexa Indirect SH
  { slug: "indirect-smarthexa-sh", parentSlug: "indirect-smarthexa", nameTr: "Indirect SmartHexa SH", nameEn: "Indirect SmartHexa SH",
    descTr: hiuDescTr("SmartHexa", "indirect", indirectExtraTr), descEn: hiuDescEn("SmartHexa", "indirect", indirectExtraEn),
    prefix: "i-sh-sh", images: ["front","left","right","cab-front"].map(s => `/uploads/i-sh-sh-${s}.png`),
    docs: [{ nameTr: "Indirect SmartHexa SH Katalog", nameEn: "Indirect SmartHexa SH Catalogue", url: "/uploads/i-sh-sh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/i-sh-sh-ce.pdf", type: "sertifika" }],
    xlsxTr: `${TR_BASE}/SmartHexa Serisi /Indirect SmartHexa/Indirect SmartHexa SH/Ürün Opsiyonları - ISH_sh.xlsx`,
    xlsxEn: `${EN_BASE}/SmartHexa Series/Indirect SmartHexa/Indirect SmartHexa SH/Product Options - ISH_sh.xlsx` },
  // SmartHexa Direct DHW
  { slug: "direct-smarthexa-dhw", parentSlug: "direct-smarthexa", nameTr: "Direct SmartHexa - DHW", nameEn: "Direct SmartHexa - DHW",
    descTr: hiuDescTr("SmartHexa", "direct"), descEn: hiuDescEn("SmartHexa", "direct"),
    prefix: "d-sh-dhw", images: ["front","left","right"].map(s => `/uploads/d-sh-dhw-${s}.png`),
    docs: [{ nameTr: "SmartHexa DHW Katalog", nameEn: "SmartHexa DHW Catalogue", url: "/uploads/d-sh-dhw-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-sh-dhw-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-sh-dhw-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/SmartHexa Serisi /Direct SmartHexa/Direct SmartHexa DHW/Ürün Opsiyonları - ISH_dhw.xlsx`,
    xlsxEn: `${EN_BASE}/SmartHexa Series/Direct SmartHexa/Direct SmartHexa DHW/Product Options - ISH_dhw.xlsx` },
  // SmartHexa Direct RH
  { slug: "direct-smarthexa-rh", parentSlug: "direct-smarthexa", nameTr: "Direct SmartHexa - RH", nameEn: "Direct SmartHexa - RH",
    descTr: hiuDescTr("SmartHexa", "direct"), descEn: hiuDescEn("SmartHexa", "direct"),
    prefix: "d-sh-rh", images: ["front","left","right"].map(s => `/uploads/d-sh-rh-${s}.png`),
    docs: [{ nameTr: "SmartHexa RH Katalog", nameEn: "SmartHexa RH Catalogue", url: "/uploads/d-sh-rh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-sh-rh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-sh-rh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/SmartHexa Serisi /Direct SmartHexa/Direct SmartHexa RH/Ürün Opsiyonları - ISH_rh.xlsx`,
    xlsxEn: `${EN_BASE}/SmartHexa Series/Direct SmartHexa/Direct SmartHexa RH/Product Options - ISH_rh.xlsx` },
  // SmartHexa Direct UFH
  { slug: "direct-smarthexa-ufh", parentSlug: "direct-smarthexa", nameTr: "Direct SmartHexa - UFH", nameEn: "Direct SmartHexa - UFH",
    descTr: hiuDescTr("SmartHexa", "direct", ufhExtraTr), descEn: hiuDescEn("SmartHexa", "direct", ufhExtraEn),
    prefix: "d-sh-ufh", images: ["front","left","right"].map(s => `/uploads/d-sh-ufh-${s}.png`),
    docs: [{ nameTr: "SmartHexa UFH Katalog", nameEn: "SmartHexa UFH Catalogue", url: "/uploads/d-sh-ufh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-sh-ufh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-sh-ufh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/SmartHexa Serisi /Direct SmartHexa/Direct SmartHexa UFH/Ürün Opsiyonları - ISH_ufh.xlsx`,
    xlsxEn: `${EN_BASE}/SmartHexa Series/Direct SmartHexa/Direct SmartHexa UFH/Product Options - ISH_ufh.xlsx` },
  // HydroHexa Indirect DHW-SH
  { slug: "indirect-hydrohexa-dhw-sh", parentSlug: "indirect-hydrohexa", nameTr: "Indirect HydroHexa DHW-SH", nameEn: "Indirect HydroHexa DHW-SH",
    descTr: hiuDescTr("HydroHexa", "indirect", indirectExtraTr), descEn: hiuDescEn("HydroHexa", "indirect", indirectExtraEn),
    prefix: "i-hh-dhw-sh", images: ["front","left","right"].map(s => `/uploads/i-hh-dhw-sh-${s}.png`),
    docs: [{ nameTr: "Indirect HydroHexa Katalog", nameEn: "Indirect HydroHexa Catalogue", url: "/uploads/i-hh-dhw-sh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/i-hh-dhw-sh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/i-hh-dhw-sh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/HydroHexa Serisi/Indirect HydroHexa /Indirect HydroHexa DHW-SH/Ürün Opsiyonları - IHH.xlsx`,
    xlsxEn: `${EN_BASE}/HydroHexa Series/Indirect HydroHexa/Indirect HydroHexa DHW-SH/Product Options - IHH.xlsx` },
  // HydroHexa Direct DHW
  { slug: "direct-hydrohexa-dhw", parentSlug: "direct-hydrohexa", nameTr: "Direct HydroHexa - DHW", nameEn: "Direct HydroHexa - DHW",
    descTr: hiuDescTr("HydroHexa", "direct"), descEn: hiuDescEn("HydroHexa", "direct"),
    prefix: "d-hh-dhw", images: ["front","left","right"].map(s => `/uploads/d-hh-dhw-${s}.png`), appImage: "/uploads/d-hh-dhw-akis.pdf",
    docs: [{ nameTr: "Direct HydroHexa DHW Katalog", nameEn: "Direct HydroHexa DHW Catalogue", url: "/uploads/d-hh-dhw-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-hh-dhw-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-hh-dhw-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/HydroHexa Serisi/Direct HydroHexa/Direct HydroHexa DHW/Ürün Opsiyonları - DHH_dhw.xlsx`,
    xlsxEn: `${EN_BASE}/HydroHexa Series/Direct HydroHexa/Direct HydroHexa DHW/Product Options - DHH_dhw.xlsx` },
  // HydroHexa Direct RH
  { slug: "direct-hydrohexa-rh", parentSlug: "direct-hydrohexa", nameTr: "Direct HydroHexa - RH", nameEn: "Direct HydroHexa - RH",
    descTr: hiuDescTr("HydroHexa", "direct"), descEn: hiuDescEn("HydroHexa", "direct"),
    prefix: "d-hh-rh", images: ["front","left","right"].map(s => `/uploads/d-hh-rh-${s}.png`),
    docs: [{ nameTr: "Direct HydroHexa RH Katalog", nameEn: "Direct HydroHexa RH Catalogue", url: "/uploads/d-hh-rh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-hh-rh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-hh-rh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/HydroHexa Serisi/Direct HydroHexa/Direct HydroHexa RH/Ürün Opsiyonları - DHH_rh.xlsx`,
    xlsxEn: `${EN_BASE}/HydroHexa Series/Direct HydroHexa/Direct HydroHexa RH/Product Options - DHH_rh.xlsx` },
  // HydroHexa Direct UFH
  { slug: "direct-hydrohexa-ufh", parentSlug: "direct-hydrohexa", nameTr: "Direct HydroHexa - UFH", nameEn: "Direct HydroHexa - UFH",
    descTr: hiuDescTr("HydroHexa", "direct", ufhExtraTr), descEn: hiuDescEn("HydroHexa", "direct", ufhExtraEn),
    prefix: "d-hh-ufh", images: ["front","left","right"].map(s => `/uploads/d-hh-ufh-${s}.png`),
    docs: [{ nameTr: "Direct HydroHexa UFH Katalog", nameEn: "Direct HydroHexa UFH Catalogue", url: "/uploads/d-hh-ufh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-hh-ufh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-hh-ufh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/HydroHexa Serisi/Direct HydroHexa/Direct HydroHexa UFH/Ürün Opsiyonları - DHH_ufh.xlsx`,
    xlsxEn: `${EN_BASE}/HydroHexa Series/Direct HydroHexa/Direct HydroHexa UFH/Product Options - DHH_ufh.xlsx` },
  // ThermoHexa Indirect DHW-SH
  { slug: "indirect-thermohexa-dhw-sh", parentSlug: "indirect-thermohexa", nameTr: "Indirect ThermoHexa DHW-SH", nameEn: "Indirect ThermoHexa DHW-SH",
    descTr: hiuDescTr("ThermoHexa", "thermo", indirectExtraTr), descEn: hiuDescEn("ThermoHexa", "thermo", indirectExtraEn),
    prefix: "i-th-dhw-sh", images: ["front","left","right"].map(s => `/uploads/i-th-dhw-sh-${s}.png`),
    docs: [{ nameTr: "Indirect ThermoHexa Katalog", nameEn: "Indirect ThermoHexa Catalogue", url: "/uploads/i-th-dhw-sh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/i-th-dhw-sh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/i-th-dhw-sh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/ThermoHexa Serisi/Indirect ThermoHexa/Indirect ThermoHexa DHW-SH/Ürün Opsiyonları - ITH.xlsx`,
    xlsxEn: `${EN_BASE}/ThermoHexa Series/Indirect ThermoHexa/Indirect ThermoHexa DHW-SH/Product Options - ITH.xlsx` },
  // ThermoHexa Direct DHW
  { slug: "direct-thermohexa-dhw", parentSlug: "direct-thermohexa", nameTr: "Direct ThermoHexa - DHW", nameEn: "Direct ThermoHexa - DHW",
    descTr: hiuDescTr("ThermoHexa", "thermo"), descEn: hiuDescEn("ThermoHexa", "thermo"),
    prefix: "d-th-dhw", images: ["front","left","right"].map(s => `/uploads/d-th-dhw-${s}.png`),
    docs: [{ nameTr: "Direct ThermoHexa DHW Katalog", nameEn: "Direct ThermoHexa DHW Catalogue", url: "/uploads/d-th-dhw-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-th-dhw-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-th-dhw-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/ThermoHexa Serisi/Direct ThermoHexa/Direct ThermoHexa DHW/Ürün Opsiyonları - DTH_dhw.xlsx`,
    xlsxEn: `${EN_BASE}/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa DHW/Product Options - DTH_dhw.xlsx` },
  // ThermoHexa Direct RH
  { slug: "direct-thermohexa-rh", parentSlug: "direct-thermohexa", nameTr: "Direct ThermoHexa - RH", nameEn: "Direct ThermoHexa - RH",
    descTr: hiuDescTr("ThermoHexa", "thermo"), descEn: hiuDescEn("ThermoHexa", "thermo"),
    prefix: "d-th-rh", images: ["front","left","right"].map(s => `/uploads/d-th-rh-${s}.png`),
    docs: [{ nameTr: "Direct ThermoHexa RH Katalog", nameEn: "Direct ThermoHexa RH Catalogue", url: "/uploads/d-th-rh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-th-rh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-th-rh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/ThermoHexa Serisi/Direct ThermoHexa/Direct ThermoHexa RH/Ürün Opsiyonları - DTH_rh.xlsx`,
    xlsxEn: `${EN_BASE}/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa RH/Product Options - DTH_rh.xlsx` },
  // ThermoHexa Direct UFH
  { slug: "direct-thermohexa-ufh", parentSlug: "direct-thermohexa", nameTr: "Direct ThermoHexa - UFH", nameEn: "Direct ThermoHexa - UFH",
    descTr: hiuDescTr("ThermoHexa", "thermo", ufhExtraTr), descEn: hiuDescEn("ThermoHexa", "thermo", ufhExtraEn),
    prefix: "d-th-ufh", images: ["front","left","right"].map(s => `/uploads/d-th-ufh-${s}.png`),
    docs: [{ nameTr: "Direct ThermoHexa UFH Katalog", nameEn: "Direct ThermoHexa UFH Catalogue", url: "/uploads/d-th-ufh-katalog-tr.pdf", type: "teknik" },
           { nameTr: "CE Uygunluk Belgesi", nameEn: "Declaration of Conformity", url: "/uploads/d-th-ufh-ce.pdf", type: "sertifika" },
           { nameTr: "Kurulum ve Çalıştırma Kılavuzu", nameEn: "Installation Manual", url: "/uploads/d-th-ufh-kilavuz-tr.pdf", type: "kilavuz" }],
    xlsxTr: `${TR_BASE}/ThermoHexa Serisi/Direct ThermoHexa/Direct ThermoHexa UFH/Ürün Opsiyonları - DTH_ufh.xlsx`,
    xlsxEn: `${EN_BASE}/ThermoHexa Series/Direct ThermoHexa/Direct ThermoHexa UFH/Product Options - DTH_ufh.xlsx` },
];

async function main() {
  const leafSlugs = products.map(p => p.slug);
  const existingCats = await prisma.category.findMany({ where: { slug: { in: leafSlugs } } });
  if (existingCats.length > 0) {
    console.log(`Siliniyor: ${existingCats.map(c => c.slug).join(", ")}`);
    await prisma.category.deleteMany({ where: { id: { in: existingCats.map(c => c.id) } } });
  }

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const parentCat = await prisma.category.findUnique({ where: { slug: p.parentSlug } });
    if (!parentCat) { console.error(`Parent ${p.parentSlug} bulunamadı, atlaniyor: ${p.slug}`); continue; }

    let specTableData: string | null = null;
    if (p.xlsxTr) {
      try {
        const dataTr = readXlsxTable(p.xlsxTr);
        let dataEn: string[][] | undefined;
        if (p.xlsxEn) { try { dataEn = readXlsxTable(p.xlsxEn); } catch {} }
        if (dataTr.length > 1) {
          specTableData = JSON.stringify([{ name: "Sipariş Tablosu", data: dataTr, dataEn: dataEn && dataEn.length > 1 ? dataEn : undefined }]);
        }
      } catch {}
    }

    const product = await prisma.product.create({
      data: {
        slug: p.slug,
        categoryId: parentCat.id,
        nameTr: p.nameTr,
        nameEn: p.nameEn,
        descriptionTr: p.descTr,
        descriptionEn: p.descEn,
        image: p.images[0],
        applicationImage: p.appImage || null,
        specTableData,
        sortOrder: i,
        isActive: true,
      },
    });

    await prisma.productImage.createMany({
      data: p.images.map((url, idx) => ({ productId: product.id, url, sortOrder: idx })),
    });

    await prisma.productDocument.createMany({
      data: p.docs.map((d, idx) => ({
        productId: product.id, nameTr: d.nameTr, nameEn: d.nameEn,
        url: d.url, urlEn: d.urlEn || null, type: d.type, sortOrder: idx,
      })),
    });

    console.log(`✓ ${p.nameTr} (id=${product.id}, ${p.images.length} img, ${p.docs.length} doc${specTableData ? ', tablo var' : ''})`);
  }

  const total = await prisma.product.count();
  console.log(`\nToplam ${total} ürün veritabanında.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
