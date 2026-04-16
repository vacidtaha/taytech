import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

interface CategoryNode {
  slug: string;
  nameTr: string;
  nameEn: string;
  children?: CategoryNode[];
}

const categoryTree: CategoryNode[] = [
  {
    slug: "kontrol-panelleri",
    nameTr: "Kontrol Panelleri",
    nameEn: "Control Panels",
    children: [
      {
        slug: "elektronik-kontrol-panelleri",
        nameTr: "Elektronik Kontrol Panelleri",
        nameEn: "Electronic Control Panels",
        children: [
          { slug: "smart-direct-serisi", nameTr: "Smart Direct Serisi", nameEn: "Smart Direct Start Series" },
          { slug: "smart-yildiz-ucgen-serisi", nameTr: "Smart Yıldız/Üçgen Serisi", nameEn: "Smart Star / Delta Series" },
          { slug: "frekans-invertor-serisi", nameTr: "Frekans İnvertör Serisi", nameEn: "VFD Series" },
          { slug: "soft-starter-serisi", nameTr: "Soft Starter Serisi", nameEn: "Soft Start Series" },
        ],
      },
      {
        slug: "elektro-mekanik-paneller",
        nameTr: "Elektro Mekanik Paneller",
        nameEn: "Electro Mechanical Panels",
        children: [
          { slug: "direkt-baslatma", nameTr: "Direkt Başlatma", nameEn: "Direct Start" },
          { slug: "yildiz-ucgen-baslatma", nameTr: "Yıldız & Üçgen Başlatma", nameEn: "Star & Delta Start" },
        ],
      },
      {
        slug: "yangin-pompa-kontrol-panolari",
        nameTr: "Yangın Pompa Kontrol Panoları",
        nameEn: "Fire Fighting System Control Panels",
        children: [
          {
            slug: "nfpa-ul-fm-serisi",
            nameTr: "NFPA / UL & FM Serisi",
            nameEn: "NFPA / UL & FM Series",
            children: [
              { slug: "nfpa-dizel-motor-kontrol-panosu", nameTr: "Dizel Motor Kontrol Panosu", nameEn: "Diesel Engine Driven" },
              { slug: "nfpa-elektrik-motor-kontrol-panosu", nameTr: "Elektrik Motor Kontrol Panosu", nameEn: "Electric Motor Driven" },
              { slug: "nfpa-jokey-pompa-kontrol-panosu", nameTr: "Jokey Pompa Kontrol Panosu", nameEn: "Jockey Series" },
            ],
          },
          {
            slug: "en-serisi",
            nameTr: "EN Serisi",
            nameEn: "EN Series",
            children: [
              { slug: "dizel-serisi-en-12845", nameTr: "Dizel Serisi EN 12845", nameEn: "Diesel Series EN 12845" },
              { slug: "elektrik-serisi-en-12845", nameTr: "Elektrik Serisi EN 12845", nameEn: "Electric Series EN 12845" },
              { slug: "jokey-serisi", nameTr: "Jokey Serisi", nameEn: "Jockey Series" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "enerji-yonetim-platformu",
    nameTr: "Enerji Yönetim Platformu (BLES)",
    nameEn: "Building Management System (BLES)",
    children: [
      { slug: "yazilim-platformu", nameTr: "Yazılım Platformu", nameEn: "Software Platforms" },
      {
        slug: "veri-yonetim-cihazlari",
        nameTr: "Veri Yönetim Cihazları",
        nameEn: "Data Management Devices",
        children: [
          { slug: "m-bus-converter", nameTr: "M-Bus Converter", nameEn: "M-Bus Converter" },
          { slug: "ttsmart-box", nameTr: "TT Smart Box", nameEn: "TT Smart Box" },
          { slug: "data-logger", nameTr: "Data Logger", nameEn: "Data Logger" },
          { slug: "gateway", nameTr: "Gateway", nameEn: "Gateway" },
        ],
      },
    ],
  },
  {
    slug: "heat-network",
    nameTr: "Heat Network",
    nameEn: "Heat Network",
    children: [
      {
        slug: "isi-istasyonlari",
        nameTr: "Isı İstasyonları",
        nameEn: "Heat Interface Units",
        children: [
          {
            slug: "smarthexa-serisi",
            nameTr: "SmartHexa Serisi",
            nameEn: "SmartHexa Series",
            children: [
              {
                slug: "indirect-smarthexa",
                nameTr: "Indirect SmartHexa",
                nameEn: "Indirect SmartHexa",
                children: [
                  { slug: "indirect-smarthexa-dhw-sh", nameTr: "Indirect SmartHexa DHW-SH", nameEn: "Indirect SmartHexa DHW-SH" },
                  { slug: "indirect-smarthexa-sh", nameTr: "Indirect SmartHexa SH", nameEn: "Indirect SmartHexa SH" },
                ],
              },
              {
                slug: "direct-smarthexa",
                nameTr: "Direct SmartHexa",
                nameEn: "Direct SmartHexa",
                children: [
                  { slug: "direct-smarthexa-dhw", nameTr: "Direct SmartHexa - DHW", nameEn: "Direct SmartHexa - DHW" },
                  { slug: "direct-smarthexa-rh", nameTr: "Direct SmartHexa - RH", nameEn: "Direct SmartHexa - RH" },
                  { slug: "direct-smarthexa-ufh", nameTr: "Direct SmartHexa - UFH", nameEn: "Direct SmartHexa - UFH" },
                ],
              },
            ],
          },
          {
            slug: "hydrohexa-serisi",
            nameTr: "HydroHexa Serisi",
            nameEn: "HydroHexa Series",
            children: [
              {
                slug: "indirect-hydrohexa",
                nameTr: "Indirect HydroHexa",
                nameEn: "Indirect HydroHexa",
                children: [
                  { slug: "indirect-hydrohexa-dhw-sh", nameTr: "Indirect HydroHexa DHW-SH", nameEn: "Indirect HydroHexa DHW-SH" },
                ],
              },
              {
                slug: "direct-hydrohexa",
                nameTr: "Direct HydroHexa",
                nameEn: "Direct HydroHexa",
                children: [
                  { slug: "direct-hydrohexa-dhw", nameTr: "Direct HydroHexa - DHW", nameEn: "Direct HydroHexa - DHW" },
                  { slug: "direct-hydrohexa-rh", nameTr: "Direct HydroHexa - RH", nameEn: "Direct HydroHexa - RH" },
                  { slug: "direct-hydrohexa-ufh", nameTr: "Direct HydroHexa - UFH", nameEn: "Direct HydroHexa - UFH" },
                ],
              },
            ],
          },
          {
            slug: "thermohexa-serisi",
            nameTr: "ThermoHexa Serisi",
            nameEn: "ThermoHexa Series",
            children: [
              {
                slug: "indirect-thermohexa",
                nameTr: "Indirect ThermoHexa",
                nameEn: "Indirect ThermoHexa",
                children: [
                  { slug: "indirect-thermohexa-dhw-sh", nameTr: "Indirect ThermoHexa DHW-SH", nameEn: "Indirect ThermoHexa DHW-SH" },
                  { slug: "indirect-thermohexa-sh", nameTr: "Indirect ThermoHexa SH", nameEn: "Indirect ThermoHexa SH" },
                ],
              },
              {
                slug: "direct-thermohexa",
                nameTr: "Direct ThermoHexa",
                nameEn: "Direct ThermoHexa",
                children: [
                  { slug: "direct-thermohexa-dhw", nameTr: "Direct ThermoHexa - DHW", nameEn: "Direct ThermoHexa - DHW" },
                  { slug: "direct-thermohexa-rh", nameTr: "Direct ThermoHexa - RH", nameEn: "Direct ThermoHexa - RH" },
                  { slug: "direct-thermohexa-ufh", nameTr: "Direct ThermoHexa - UFH", nameEn: "Direct ThermoHexa - UFH" },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "bina-alti-istasyonlari",
        nameTr: "Bina Altı İstasyonları",
        nameEn: "Sub-Stations",
        children: [
          { slug: "bolgesel-isitma-istasyonlari", nameTr: "Bölgesel Isıtma İstasyonları", nameEn: "District Heating Substations" },
          { slug: "bolgesel-sogutma-istasyonlari", nameTr: "Bölgesel Soğutma İstasyonları", nameEn: "District Cooling Substations" },
        ],
      },
      {
        slug: "sayac-istasyonlari",
        nameTr: "Sayaç İstasyonları",
        nameEn: "Metering Stations",
        children: [
          { slug: "meter-tech-w1", nameTr: "Meter Tech - W1", nameEn: "Meter Tech - W1" },
          { slug: "meter-tech-w2", nameTr: "Meter Tech - W2", nameEn: "Meter Tech - W2" },
          { slug: "meter-tech-w3", nameTr: "Meter Tech - W3", nameEn: "Meter Tech - W3" },
          { slug: "meter-tech-w4", nameTr: "Meter Tech - W4", nameEn: "Meter Tech - W4" },
        ],
      },
      {
        slug: "manyetik-filtreler",
        nameTr: "Manyetik Filtreler",
        nameEn: "Magnetic Filters",
        children: [
          { slug: "irontrap", nameTr: "IronTrap", nameEn: "IronTrap" },
          { slug: "ironinox", nameTr: "IronInox", nameEn: "IronInox" },
        ],
      },
      {
        slug: "aksesuarlar",
        nameTr: "Aksesuarlar",
        nameEn: "Accessories",
        children: [
          { slug: "ilk-montaj-kiti", nameTr: "İlk Montaj Kiti", nameEn: "First Fix Rail Kit" },
          { slug: "baglanti-kutulari", nameTr: "Bağlantı Kutuları", nameEn: "Junction Boxes" },
          { slug: "re-sirkulasyon-kitleri", nameTr: "Re-Sirkülasyon Kitleri", nameEn: "Re-Circulation Kits" },
          { slug: "fark-basinc-vanasi", nameTr: "Fark Basınç Vanası", nameEn: "Differential Pressure Valve" },
          { slug: "termal-bypass-vanasi", nameTr: "Termal By-Pass Vanası", nameEn: "Thermal By-Pass Valve" },
          { slug: "kabin", nameTr: "Kabin", nameEn: "Cabinet" },
        ],
      },
      {
        slug: "sayaclar",
        nameTr: "Sayaçlar",
        nameEn: "Meters",
        children: [
          { slug: "isitma-kalorimetresi", nameTr: "Isıtma Kalorimetresi", nameEn: "Heat Meter" },
          { slug: "sogutma-kalorimetresi", nameTr: "Soğutma Kalorimetresi", nameEn: "Cooling Meter" },
          { slug: "su-sayaci", nameTr: "Su Sayacı", nameEn: "Water Meter" },
        ],
      },
      {
        slug: "on-odemeli-sayaclar",
        nameTr: "Ön Ödemeli Sayaçlar",
        nameEn: "Pre-paid Meters",
        children: [
          { slug: "on-odemeli-kalorimetre", nameTr: "Ön Ödemeli Kalorimetre", nameEn: "Pre-paid Heat Meter" },
          { slug: "on-odemeli-su-sayaci", nameTr: "Ön Ödemeli Su Sayacı", nameEn: "Pre-paid Water Meter" },
        ],
      },
    ],
  },
];

async function insertCategories(nodes: CategoryNode[], parentId: number | null, startOrder: number) {
  let order = startOrder;
  for (const node of nodes) {
    const cat = await prisma.category.create({
      data: {
        slug: node.slug,
        nameTr: node.nameTr,
        nameEn: node.nameEn,
        parentId,
        sortOrder: order++,
      },
    });
    console.log(`  + ${node.nameTr} (id=${cat.id})`);
    if (node.children) {
      await insertCategories(node.children, cat.id, 0);
    }
  }
}

async function main() {
  console.log("=== Veritabanı sıfırlanıyor ===\n");

  console.log("Dokümanlar siliniyor...");
  await prisma.document.deleteMany();

  console.log("Ürün dokümanları siliniyor...");
  await prisma.productDocument.deleteMany();

  console.log("Ürün görselleri siliniyor...");
  await prisma.productImage.deleteMany();

  console.log("Ürün varyantları siliniyor...");
  await prisma.productVariant.deleteMany();

  console.log("Ürünler siliniyor...");
  await prisma.product.deleteMany();

  console.log("Kategoriler siliniyor...");
  await prisma.category.deleteMany();

  console.log("\n=== Yeni kategori ağacı oluşturuluyor ===\n");
  await insertCategories(categoryTree, null, 0);

  const count = await prisma.category.count();
  console.log(`\nToplam ${count} kategori oluşturuldu.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
