import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const manyetikCat = await prisma.category.findUnique({ where: { slug: "manyetik-filtreler" } });
  if (!manyetikCat) throw new Error("manyetik-filtreler kategorisi bulunamadı");

  // Delete child categories (irontrap, ironinox) since they'll become products
  await prisma.category.deleteMany({ where: { parentId: manyetikCat.id } });
  console.log("irontrap/ironinox alt kategorileri silindi");

  // ── IronTrap ──
  const irontrap = await prisma.product.create({
    data: {
      slug: "irontrap",
      categoryId: manyetikCat.id,
      nameTr: "IRONTRAP® Manyetik Filtre",
      nameEn: "IRONTRAP® Magnetic Filter",
      descriptionTr: `Demir tozu ve manyetit sadece konut sistemlerinin sorunu değildir. Endüstriyel uygulamada sistemin temizlenmesi ve korunması için gerekli bir üründür. IronTrap ürünleri, ısıtma-soğutma sistemlerindeki tüm uygulamalarda kullanılabilir. IronTrap manyetik filtre ile koruyucu temizleyici sıvılar beraber kullanıldığında ısıtma-soğutma sistemleri tam bir korumaya kavuşur. Koruyucu sıvıların kullanımına ilaveten düzenli sistem takibi yapılırsa sürdürülebilir sistem koruması sağlanır.

KULLANIM AVANTAJLARI
• Tüm Isıtma – Soğutma Sistemleri ile uyumludur.
• Sistemin arıza verme riskini ve yüksek bakım maliyetini azaltır.
• Sistem Ekipmanlarının Ömrünü Uzatır.
• Hâlihazırda çalışan sistemlerde verimin geri kazanılmasına yardımcı olur.
• Yüksek performanslı manyetik çubuklara en küçük manyetik parçacıkları bile yakalar.
• Kurulumu ve bakımı kolaydır.
• Vakum vanası sayesinde hızlı temizleme imkânı sağlar.

TEKNİK ÖZELLİKLER
Maksimum Çalışma Basıncı: 10 Bar
Çalışma Sıcaklığı: 3°C – 100°C

GÖVDE
Malzeme: TS EN 10219
Drenaj: 1" Küresel Vana TSEN 13547
Vakum Vanası: 1/2" Küresel Vana TSEN 13547
Hava Purjörü: Otomatik Hava Atma Purjörü 1/2"

CONTA
Kapak Sızdırmazlık Contası: EPDM

MIKNATISLAR
Mıknatıs Yüzey Çekme Gücü: 9500 – 10500 gauss
Mıknatıs Taşıma Flanşı: AISI 304 Paslanmaz Çelik
Temizleme Kapağı: AISI 304 Paslanmaz Çelik
Malzeme: Yüksek Performanslı NdFeb
Kılıf: AISI 304 Paslanmaz Çelik

SEPERATÖR FİLTRE
Malzeme: AISI 304 Paslanmaz Çelik
Gözenek Büyüklüğü: 1000 Mikron

BAĞLANTI FLANŞI
Malzeme: TS EN 1092-1
Basınç Sınıfı: PN16`,
      descriptionEn: `Iron powder and magnetite are not just a problem for residential installations. This is the product for maintaining a clean system protection in industrial applications. IronTrap products can be used in various applications in heating and cooling systems. When using the IronTrap Magnetic Filter and protective cleaning fluids together, heating and cooling systems get complete protection. Long-term system protection is ensured if regular monitoring of the systems is maintained in addition to the use of protective fluids.

ADVANTAGES OF USE
• Compatible with all heating and cooling systems.
• Reduces abrupt failure and high maintenance costs.
• Extends the life of the equipment throughout the system.
• Helps to restore system efficiency.
• High performance magnetic sticks capture even the smallest magnetic particles.
• Easy to install and maintain.
• It provides a quick cleaning by its vacuum valve.

TECHNICAL SPECIFICATIONS
Maximum Running Pressure: 10 Bar
Running Temperature: 3°C – 100°C

BODY
Material: TS EN 10219
Drain: 1" Ball Valve TSEN 13547
Vacuum Valve: 1/2" Ball Valve TSEN 13547
Air Vent: Automatic Air Vent 1/2"

GASKET
Cover Gasket: EPDM

MAGNETS
Magnet Surface Pulling Force: 9500 – 10500 gauss
Magnet Carriage Flange: AISI 304 Stainless Steel
Cleaning Cover: AISI 304 Stainless Steel
Material: High Performance NdFeb
Sleeve: AISI 304 Stainless Steel

SEPARATOR FILTER
Material: AISI 304 Stainless Steel
Mesh Size: 1000 Micron

CONNECTION FLANGE
Material: TS EN 1092-1
Pressure Class: PN16`,
      image: "/uploads/irontrap-sol.jpg",
      sortOrder: 0,
      isActive: true,
    },
  });
  console.log(`IronTrap oluşturuldu (id=${irontrap.id})`);

  await prisma.productImage.createMany({
    data: [
      { productId: irontrap.id, url: "/uploads/irontrap-sol.jpg", sortOrder: 0 },
      { productId: irontrap.id, url: "/uploads/irontrap-on.jpg", sortOrder: 1 },
      { productId: irontrap.id, url: "/uploads/manyetik-uygulama-1.png", sortOrder: 2 },
      { productId: irontrap.id, url: "/uploads/manyetik-uygulama-2.png", sortOrder: 3 },
      { productId: irontrap.id, url: "/uploads/manyetik-uygulama-3.png", sortOrder: 4 },
    ],
  });

  await prisma.productDocument.createMany({
    data: [
      { productId: irontrap.id, nameTr: "Manyetik Filtre Kataloğu 2025", nameEn: "Magnetic Filter Catalogue 2025", url: "/uploads/manyetik-filtre-katalog-tr.pdf", urlEn: "/uploads/manyetik-filtre-katalog-en.pdf", type: "katalog", sortOrder: 0 },
      { productId: irontrap.id, nameTr: "IRONTRAP CE Uygunluk Belgesi", nameEn: "IRONTRAP Declaration of Conformity", url: "/uploads/irontrap-ce.pdf", type: "sertifika", sortOrder: 1 },
    ],
  });

  // ── IronInox ──
  const ironinox = await prisma.product.create({
    data: {
      slug: "ironinox",
      categoryId: manyetikCat.id,
      nameTr: "IRONINOX® Manyetik Filtre",
      nameEn: "IRONINOX® Magnetic Filter",
      descriptionTr: `Demir tozu ve manyetit sadece konut sistemlerinin sorunu değildir. Endüstriyel uygulamada sistemin temizlenmesi ve korunması için gerekli bir üründür. IronInox ürünleri, ısıtma-soğutma sistemlerindeki tüm uygulamalarda kullanılabilir. IronInox manyetik filtre ile koruyucu temizleyici sıvılar beraber kullanıldığında ısıtma-soğutma sistemleri tam bir korumaya kavuşur. Koruyucu sıvıların kullanımına ilaveten düzenli sistem takibi yapılırsa sürdürülebilir sistem koruması sağlanır.

KULLANIM AVANTAJLARI
• Tüm Isıtma – Soğutma Sistemleri ile uyumludur.
• Sistemin arıza verme riskini ve yüksek bakım maliyetini azaltır.
• Sistem Ekipmanlarının Ömrünü Uzatır.
• Hâlihazırda çalışan sistemlerde verimin geri kazanılmasına yardımcı olur.
• Yüksek performanslı manyetik çubuklara en küçük manyetik parçacıkları bile yakalar.
• Kurulumu ve bakımı kolaydır.
• Vakum vanası sayesinde hızlı temizleme imkânı sağlar.

TEKNİK ÖZELLİKLER
Maksimum Çalışma Basıncı: 10 Bar
Çalışma Sıcaklığı: 3°C – 100°C

GÖVDE
Malzeme: TS EN 10219 – Paslanmaz Çelik
Drenaj: 1" Küresel Vana TSEN 13547
Vakum Vanası: 1/2" Küresel Vana TSEN 13547
Hava Purjörü: Otomatik Hava Atma Purjörü 1/2"

CONTA
Kapak Sızdırmazlık Contası: EPDM

MIKNATISLAR
Mıknatıs Yüzey Çekme Gücü: 9500 – 10500 gauss
Mıknatıs Taşıma Flanşı: AISI 304 Paslanmaz Çelik
Temizleme Kapağı: AISI 304 Paslanmaz Çelik
Malzeme: Yüksek Performanslı NdFeb
Kılıf: AISI 304 Paslanmaz Çelik

SEPERATÖR FİLTRE
Malzeme: AISI 304 Paslanmaz Çelik
Gözenek Büyüklüğü: 1000 Mikron

BAĞLANTI FLANŞI
Malzeme: TS EN 1092-1
Basınç Sınıfı: PN16`,
      descriptionEn: `Iron powder and magnetite are not just a problem for residential installations. This is the product for maintaining a clean system protection in industrial applications. IronInox products can be used in various applications in heating and cooling systems. When using the IronInox Magnetic Filter and protective cleaning fluids together, heating and cooling systems get complete protection. Long-term system protection is ensured if regular monitoring of the systems is maintained in addition to the use of protective fluids.

ADVANTAGES OF USE
• Compatible with all heating and cooling systems.
• Reduces abrupt failure and high maintenance costs.
• Extends the life of the equipment throughout the system.
• Helps to restore system efficiency.
• High performance magnetic sticks capture even the smallest magnetic particles.
• Easy to install and maintain.
• It provides a quick cleaning by its vacuum valve.

TECHNICAL SPECIFICATIONS
Maximum Running Pressure: 10 Bar
Running Temperature: 3°C – 100°C

BODY
Material: TS EN 10219 – Stainless Steel
Drain: 1" Ball Valve TSEN 13547
Vacuum Valve: 1/2" Ball Valve TSEN 13547
Air Vent: Automatic Air Vent 1/2"

GASKET
Cover Gasket: EPDM

MAGNETS
Magnet Surface Pulling Force: 9500 – 10500 gauss
Magnet Carriage Flange: AISI 304 Stainless Steel
Cleaning Cover: AISI 304 Stainless Steel
Material: High Performance NdFeb
Sleeve: AISI 304 Stainless Steel

SEPARATOR FILTER
Material: AISI 304 Stainless Steel
Mesh Size: 1000 Micron

CONNECTION FLANGE
Material: TS EN 1092-1
Pressure Class: PN16`,
      image: "/uploads/ironinox-sol.png",
      sortOrder: 1,
      isActive: true,
    },
  });
  console.log(`IronInox oluşturuldu (id=${ironinox.id})`);

  await prisma.productImage.createMany({
    data: [
      { productId: ironinox.id, url: "/uploads/ironinox-sol.png", sortOrder: 0 },
      { productId: ironinox.id, url: "/uploads/manyetik-uygulama-1.png", sortOrder: 1 },
      { productId: ironinox.id, url: "/uploads/manyetik-uygulama-2.png", sortOrder: 2 },
      { productId: ironinox.id, url: "/uploads/manyetik-uygulama-3.png", sortOrder: 3 },
    ],
  });

  await prisma.productDocument.createMany({
    data: [
      { productId: ironinox.id, nameTr: "Manyetik Filtre Kataloğu 2025", nameEn: "Magnetic Filter Catalogue 2025", url: "/uploads/manyetik-filtre-katalog-tr.pdf", urlEn: "/uploads/manyetik-filtre-katalog-en.pdf", type: "katalog", sortOrder: 0 },
      { productId: ironinox.id, nameTr: "IRONINOX CE Uygunluk Belgesi", nameEn: "IRONINOX Declaration of Conformity", url: "/uploads/ironinox-ce.pdf", type: "sertifika", sortOrder: 1 },
    ],
  });

  console.log("\nManyetik filtre ürünleri başarıyla oluşturuldu!");
  console.log(`IronTrap: /urunler/heat-network/manyetik-filtreler/irontrap`);
  console.log(`IronInox: /urunler/heat-network/manyetik-filtreler/ironinox`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
