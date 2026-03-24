import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "..", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

function cat(slug: string, nameTr: string, nameEn: string, parentId: number | null, sortOrder: number) {
  return prisma.category.create({ data: { slug, nameTr, nameEn, parentId, sortOrder } });
}

function prod(slug: string, nameTr: string, nameEn: string, categoryId: number, sortOrder: number, isActive = true) {
  return prisma.product.create({ data: { slug, nameTr, nameEn, categoryId, sortOrder, isActive } });
}

async function main() {
  // ══════════════════════════════════════
  // CATEGORIES (iç düğümler)
  // ══════════════════════════════════════

  // ── 1. HEAT NETWORK ──
  const heatNetwork = await cat("heat-network", "Heat Network", "Heat Network", null, 1);

  // 1.1 Isı İstasyonları (HIU)
  const hiu = await cat("isi-istasyonlari", "Isı İstasyonları (HIU)", "Heat Interface Units (HIU)", heatNetwork.id, 1);
  const smarthexa = await cat("smarthexa-series", "SmartHexa Series", "SmartHexa Series", hiu.id, 1);
  const directSmartHexa = await cat("direct-smarthexa", "Direct SmartHexa", "Direct SmartHexa", smarthexa.id, 2);
  const hydroEM = await cat("hydro-em-series", "Hydro-EM Series", "Hydro-EM Series", hiu.id, 2);
  const hydroHexa = await cat("hydrohexa-series", "HydroHexa Series", "HydroHexa Series", hiu.id, 3);
  const directHydroHexa = await cat("direct-hydrohexa", "Direct HydroHexa", "Direct HydroHexa", hydroHexa.id, 2);
  const thermoHexa = await cat("thermohexa-series", "ThermoHexa Series", "ThermoHexa Series", hiu.id, 4);
  const directThermoHexa = await cat("direct-thermohexa", "Direct ThermoHexa", "Direct ThermoHexa", thermoHexa.id, 2);

  // 1.2 Endüstriyel Isı İstasyonları
  const endustriyel = await cat("endustriyel-isi-istasyonlari", "Endüstriyel Isı İstasyonları", "Industrial Heat Stations", heatNetwork.id, 2);

  // 1.3 Sayaç İstasyonları
  const sayacIst = await cat("sayac-istasyonlari", "Sayaç İstasyonları", "Metering Stations", heatNetwork.id, 3);

  // 1.4 Veri Yönetim (BLES) under Heat Network
  const blesHN = await cat("bles-heat-network", "Veri Yönetim Sistemleri (BLES)", "Data Management Systems (BLES)", heatNetwork.id, 4);

  // 1.5 Manyetik Filtreler (IRONTRAP)
  const manyetik = await cat("manyetik-filtreler", "Manyetik Filtreler (IRONTRAP)", "Magnetic Filters (IRONTRAP)", heatNetwork.id, 5);

  // 1.6 Isı İstasyonu Aksesuarları
  const aksesuar = await cat("isi-istasyonu-aksesuarlari", "Isı İstasyonu Aksesuarları", "HIU Accessories", heatNetwork.id, 6);

  // 1.7 Sayaçlar
  const sayaclar = await cat("sayaclar", "Sayaçlar", "Meters", heatNetwork.id, 7);

  // ── 2. ISITMA SOĞUTMA EKİPMANLARI ──
  const isitmaSogutma = await cat("isitma-sogutma-ekipmanlari", "Isıtma Soğutma Ekipmanları", "Heating & Cooling Equipment", null, 2);

  // ── 3. VERİ YÖNETİM SİSTEMLERİ (BLES) ──
  const bles = await cat("veri-yonetim-sistemleri", "Veri Yönetim Sistemleri (BLES)", "Data Management Systems (BLES)", null, 3);
  const veriCihaz = await cat("veri-yonetim-cihazlari", "Veri Yönetim Cihazları", "Data Management Devices", bles.id, 2);

  // ── 4. KONTROL SİSTEMLERİ ──
  const kontrol = await cat("kontrol-sistemleri", "Kontrol Sistemleri", "Control Systems", null, 4);
  const elektronik = await cat("electronic-control-panels", "Electronic Control Panels", "Electronic Control Panels", kontrol.id, 1);
  const elektromekanik = await cat("electro-mechanical-panels", "Electro Mechanical Panels", "Electro Mechanical Panels", kontrol.id, 2);
  const fire = await cat("fire-fighting-panels", "Fire Fighting System Control Panels", "Fire Fighting System Control Panels", kontrol.id, 3);
  const nfpa = await cat("nfpa-ul-fm-series", "NFPA / UL & FM Series", "NFPA / UL & FM Series", fire.id, 1);
  const en = await cat("en-series", "EN Series", "EN Series", fire.id, 2);

  const catCount = await prisma.category.count();
  console.log(`${catCount} kategori oluşturuldu.`);

  // ══════════════════════════════════════
  // PRODUCTS (yaprak düğümler)
  // ══════════════════════════════════════

  // -- SmartHexa Series --
  await prod("indirect-smarthexa", "Indirect SmartHexa", "Indirect SmartHexa", smarthexa.id, 1);
  // -- Direct SmartHexa --
  await prod("direct-smarthexa-dhw", "Direct SmartHexa - DHW", "Direct SmartHexa - DHW", directSmartHexa.id, 1);
  await prod("direct-smarthexa-rh", "Direct SmartHexa - RH", "Direct SmartHexa - RH", directSmartHexa.id, 2);
  await prod("direct-smarthexa-ufh", "Direct SmartHexa - UFH", "Direct SmartHexa - UFH", directSmartHexa.id, 3);

  // -- Hydro-EM Series --
  await prod("direct-hydro-em-rh", "Direct Hydro EM RH", "Direct Hydro EM RH", hydroEM.id, 1);
  await prod("direct-hydro-em-ufh", "Direct Hydro EM UFH", "Direct Hydro EM UFH", hydroEM.id, 2);

  // -- HydroHexa Series --
  await prod("indirect-hydrohexa", "Indirect HydroHexa", "Indirect HydroHexa", hydroHexa.id, 1);
  // -- Direct HydroHexa --
  await prod("direct-hydrohexa-dhw", "Direct HydroHexa - DHW", "Direct HydroHexa - DHW", directHydroHexa.id, 1);
  await prod("direct-hydrohexa-rh", "Direct HydroHexa - RH", "Direct HydroHexa - RH", directHydroHexa.id, 2);
  await prod("direct-hydrohexa-ufh", "Direct HydroHexa - UFH", "Direct HydroHexa - UFH", directHydroHexa.id, 3);

  // -- ThermoHexa Series --
  await prod("indirect-thermohexa", "Indirect ThermoHexa", "Indirect ThermoHexa", thermoHexa.id, 1);
  // -- Direct ThermoHexa --
  await prod("direct-thermohexa-dhw", "Direct ThermoHexa - DHW", "Direct ThermoHexa - DHW", directThermoHexa.id, 1);
  await prod("direct-thermohexa-rh", "Direct ThermoHexa - RH", "Direct ThermoHexa - RH", directThermoHexa.id, 2);
  await prod("direct-thermohexa-ufh", "Direct ThermoHexa - UFH", "Direct ThermoHexa - UFH", directThermoHexa.id, 3);

  // -- Endüstriyel Isı İstasyonları --
  await prod("district-heating-substations", "District Heating Substations", "District Heating Substations", endustriyel.id, 1);
  await prod("district-cooling-substations", "District Cooling Substations", "District Cooling Substations", endustriyel.id, 2);

  // -- Sayaç İstasyonları --
  await prod("meter-tech-w1", "Meter Tech - W1", "Meter Tech - W1", sayacIst.id, 1);
  await prod("meter-tech-w2", "Meter Tech - W2", "Meter Tech - W2", sayacIst.id, 2);
  await prod("meter-tech-w3", "Meter Tech - W3", "Meter Tech - W3", sayacIst.id, 3);
  await prod("meter-tech-w4", "Meter Tech - W4", "Meter Tech - W4", sayacIst.id, 4);

  // -- Manyetik Filtreler --
  await prod("irontrap", "IronTrap", "IronTrap", manyetik.id, 1);
  await prod("ironinox", "IronInox", "IronInox", manyetik.id, 2);

  // -- Isı İstasyonu Aksesuarları --
  await prod("first-fix-rail-kit", "First Fix Rail Kit", "First Fix Rail Kit", aksesuar.id, 1);
  await prod("junction-boxes", "Junction Boxes", "Junction Boxes", aksesuar.id, 2);
  await prod("re-circulation-kits", "Re-Circulation Kits", "Re-Circulation Kits", aksesuar.id, 3);
  await prod("differential-pressure-valve", "Differential Pressure Valve", "Differential Pressure Valve", aksesuar.id, 4);
  await prod("thermal-by-pass-valve", "Thermal By-Pass Valve", "Thermal By-Pass Valve", aksesuar.id, 5);
  await prod("cabinet", "Cabinet", "Cabinet", aksesuar.id, 6);

  // -- Sayaçlar --
  await prod("heat-meter", "Heat Meter", "Heat Meter", sayaclar.id, 1);
  await prod("cooling-meter", "Cooling Meter", "Cooling Meter", sayaclar.id, 2);
  await prod("water-meter", "Water Meter", "Water Meter", sayaclar.id, 3);

  // -- Isıtma Soğutma Ekipmanları --
  await prod("termal-aktuatorler", "Termal Aktüatörler", "Thermal Actuators", isitmaSogutma.id, 1);
  await prod("oda-termostatlari", "Oda Termostatları", "Room Thermostats", isitmaSogutma.id, 2);
  await prod("mixing-valves", "Mixing Valves", "Mixing Valves", isitmaSogutma.id, 3);
  await prod("manifolds", "Manifolds", "Manifolds", isitmaSogutma.id, 4);

  // -- Veri Yönetim Sistemleri (BLES) --
  await prod("yazilim-platformlari", "Yazılım Platformları", "Software Platforms", bles.id, 1);
  // -- Veri Yönetim Cihazları --
  await prod("m-bus-converter", "M-Bus Converter", "M-Bus Converter", veriCihaz.id, 1);
  await prod("ttsmart-box", "TTSmart Box", "TTSmart Box", veriCihaz.id, 2);
  await prod("data-logger", "Data Logger", "Data Logger", veriCihaz.id, 3);
  await prod("gateway", "Gateway", "Gateway", veriCihaz.id, 4);

  // -- Electronic Control Panels --
  await prod("smart-direct-start-series", "Smart Direct Start Series", "Smart Direct Start Series", elektronik.id, 1);
  await prod("smart-star-delta-series", "Smart Star / Delta Series", "Smart Star / Delta Series", elektronik.id, 2);
  await prod("vfd-series", "VFD Series", "VFD Series", elektronik.id, 3);
  await prod("soft-start-series", "Soft Start Series", "Soft Start Series", elektronik.id, 4);

  // -- Electro Mechanical Panels --
  await prod("em-direct-start", "Direct Start", "Direct Start", elektromekanik.id, 1);
  await prod("em-star-delta-start", "Star & Delta Start", "Star & Delta Start", elektromekanik.id, 2);

  // -- NFPA / UL & FM Series (sitede gizli) --
  await prod("nfpa-diesel", "Diesel Engine Driven", "Diesel Engine Driven", nfpa.id, 1);
  await prod("nfpa-electric", "Electric Motor Driven", "Electric Motor Driven", nfpa.id, 2);
  await prod("nfpa-jockey", "Jockey Series", "Jockey Series", nfpa.id, 3);

  // -- EN Series --
  await prod("diesel-en-12845", "Diesel Series EN 12845", "Diesel Series EN 12845", en.id, 1);
  await prod("electric-en-12845", "Electric Series EN 12845", "Electric Series EN 12845", en.id, 2);
  await prod("jockey-en-series", "Jockey Series", "Jockey Series", en.id, 3);

  const prodCount = await prisma.product.count();
  console.log(`${prodCount} ürün oluşturuldu.`);
  console.log("Seed tamamlandı.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
