import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const irontrapSpecTable = {
  headersTr: ["Bağlantı Çapı", "Mıknatıs Sayısı", "Çekim Gücü", "Sipariş Kodu"],
  headersEn: ["Connection", "Magnet Qty", "Gauss", "Order Code"],
  rows: [
    ["DN50", "2", "10000", "IRONTRAP TIM50_TM02"],
    ["DN50", "3", "10000", "IRONTRAP TIM50_TM03"],
    ["DN50", "5", "10000", "IRONTRAP TIM50_TM05"],
    ["DN65", "2", "10000", "IRONTRAP TIM65_TM02"],
    ["DN65", "3", "10000", "IRONTRAP TIM65_TM03"],
    ["DN65", "5", "10000", "IRONTRAP TIM65_TM05"],
    ["DN80", "2", "10000", "IRONTRAP TIM80_TM02"],
    ["DN80", "3", "10000", "IRONTRAP TIM80_TM03"],
    ["DN80", "6", "10000", "IRONTRAP TIM80_TM06"],
    ["DN100", "3", "10000", "IRONTRAP TIM100_TM03"],
    ["DN100", "5", "10000", "IRONTRAP TIM100_TM05"],
    ["DN100", "6", "10000", "IRONTRAP TIM100_TM06"],
    ["DN125", "3", "10000", "IRONTRAP TIM125_TM03"],
    ["DN125", "5", "10000", "IRONTRAP TIM125_TM05"],
    ["DN125", "6", "10000", "IRONTRAP TIM125_TM06"],
    ["DN150", "3", "10000", "IRONTRAP TIM150_TM03"],
    ["DN150", "6", "10000", "IRONTRAP TIM150_TM06"],
    ["DN150", "9", "10000", "IRONTRAP TIM150_TM09"],
    ["DN200", "3", "10000", "IRONTRAP TIM200_TM03"],
    ["DN200", "6", "10000", "IRONTRAP TIM200_TM06"],
    ["DN200", "9", "10000", "IRONTRAP TIM200_TM09"],
    ["DN250", "3", "10000", "IRONTRAP TIM250_TM03"],
    ["DN250", "6", "10000", "IRONTRAP TIM250_TM06"],
    ["DN250", "9", "10000", "IRONTRAP TIM250_TM09"],
    ["DN300", "6", "10000", "IRONTRAP TIM300_TM06"],
    ["DN300", "9", "10000", "IRONTRAP TIM300_TM09"],
    ["DN300", "12", "10000", "IRONTRAP TIM300_TM12"],
  ],
};

const ironinoxSpecTable = {
  headersTr: ["Bağlantı Çapı", "Mıknatıs Sayısı", "Çekim Gücü", "Sipariş Kodu"],
  headersEn: ["Connection", "Magnet Qty", "Gauss", "Order Code"],
  rows: [
    ["DN50", "2", "10000", "IRONINOX TIM50_TM02"],
    ["DN50", "3", "10000", "IRONINOX TIM50_TM03"],
    ["DN50", "5", "10000", "IRONINOX TIM50_TM05"],
    ["DN65", "2", "10000", "IRONINOX TIM65_TM02"],
    ["DN65", "3", "10000", "IRONINOX TIM65_TM03"],
    ["DN65", "5", "10000", "IRONINOX TIM65_TM05"],
    ["DN80", "2", "10000", "IRONINOX TIM80_TM02"],
    ["DN80", "3", "10000", "IRONINOX TIM80_TM03"],
    ["DN80", "6", "10000", "IRONINOX TIM80_TM06"],
    ["DN100", "3", "10000", "IRONINOX TIM100_TM03"],
    ["DN100", "5", "10000", "IRONINOX TIM100_TM05"],
    ["DN100", "6", "10000", "IRONINOX TIM100_TM06"],
    ["DN125", "3", "10000", "IRONINOX TIM125_TM03"],
    ["DN125", "5", "10000", "IRONINOX TIM125_TM05"],
    ["DN125", "6", "10000", "IRONINOX TIM125_TM06"],
    ["DN150", "3", "10000", "IRONINOX TIM150_TM03"],
    ["DN150", "6", "10000", "IRONINOX TIM150_TM06"],
    ["DN150", "9", "10000", "IRONINOX TIM150_TM09"],
    ["DN200", "3", "10000", "IRONINOX TIM200_TM03"],
    ["DN200", "6", "10000", "IRONINOX TIM200_TM06"],
    ["DN200", "9", "10000", "IRONINOX TIM200_TM09"],
    ["DN250", "3", "10000", "IRONINOX TIM250_TM03"],
    ["DN250", "6", "10000", "IRONINOX TIM250_TM06"],
    ["DN250", "9", "10000", "IRONINOX TIM250_TM09"],
    ["DN300", "6", "10000", "IRONINOX TIM300_TM06"],
    ["DN300", "9", "10000", "IRONINOX TIM300_TM09"],
    ["DN300", "12", "10000", "IRONINOX TIM300_TM12"],
  ],
};

const descTr = (name: string, material: string) => `Demir tozu ve manyetit sadece konut sistemlerinin sorunu değildir. Endüstriyel uygulamada sistemin temizlenmesi ve korunması için gerekli bir üründür. ${name} ürünleri, ısıtma-soğutma sistemlerindeki tüm uygulamalarda kullanılabilir. ${name} manyetik filtre ile koruyucu temizleyici sıvılar beraber kullanıldığında ısıtma-soğutma sistemleri tam bir korumaya kavuşur.

KULLANIM AVANTAJLARI
• Tüm Isıtma – Soğutma Sistemleri ile uyumludur
• Sistemin arıza verme riskini ve yüksek bakım maliyetini azaltır
• Sistem ekipmanlarının ömrünü uzatır
• Çalışan sistemlerde verimin geri kazanılmasına yardımcı olur
• Yüksek performanslı manyetik çubuklar en küçük parçacıkları bile yakalar
• Kurulumu ve bakımı kolaydır
• Vakum vanası sayesinde hızlı temizleme imkânı sağlar

TEKNİK ÖZELLİKLER
Maks. Çalışma Basıncı: 10 Bar | Çalışma Sıcaklığı: 3°C – 100°C
Gövde: ${material} | Drenaj: 1" Küresel Vana | Vakum Vanası: 1/2" | Hava Purjörü: Otomatik 1/2"
Conta: EPDM | Mıknatıs: 9500–10500 Gauss, NdFeb | Kılıf: AISI 304
Seperatör Filtre: AISI 304, 1000 Mikron | Flanş: TS EN 1092-1, PN16`;

const descEn = (name: string, material: string) => `Iron powder and magnetite are not just a problem for residential installations. ${name} products can be used in various heating and cooling system applications. When using the ${name} Magnetic Filter with protective cleaning fluids together, heating and cooling systems get complete protection.

ADVANTAGES OF USE
• Compatible with all heating and cooling systems
• Reduces abrupt failure and high maintenance costs
• Extends the life of system equipment
• Helps restore system efficiency
• High performance magnetic sticks capture even the smallest particles
• Easy to install and maintain
• Vacuum valve provides quick cleaning

TECHNICAL SPECIFICATIONS
Max. Running Pressure: 10 Bar | Running Temperature: 3°C – 100°C
Body: ${material} | Drain: 1" Ball Valve | Vacuum Valve: 1/2" | Air Vent: Automatic 1/2"
Gasket: EPDM | Magnets: 9500–10500 Gauss, NdFeb | Sleeve: AISI 304
Separator Filter: AISI 304, 1000 Micron | Flange: TS EN 1092-1, PN16`;

async function main() {
  await prisma.product.update({
    where: { slug: "irontrap" },
    data: {
      descriptionTr: descTr("IronTrap", "TS EN 10219"),
      descriptionEn: descEn("IronTrap", "TS EN 10219"),
      specTableData: JSON.stringify(irontrapSpecTable),
    },
  });
  console.log("IronTrap güncellendi (kompakt açıklama + sipariş tablosu)");

  await prisma.product.update({
    where: { slug: "ironinox" },
    data: {
      descriptionTr: descTr("IronInox", "TS EN 10219 – Paslanmaz Çelik"),
      descriptionEn: descEn("IronInox", "TS EN 10219 – Stainless Steel"),
      specTableData: JSON.stringify(ironinoxSpecTable),
    },
  });
  console.log("IronInox güncellendi (kompakt açıklama + sipariş tablosu)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
