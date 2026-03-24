import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const descriptions: { id: number; tr: string; en: string }[] = [
  {
    id: 8,
    tr: `HydroHexa DHW

HydroHexa sadece kullanım sıcak suyu hazırlamak için kullanılır. Isı eşanjörü kendi kendine soğuk kalabildiği için kireçlenme birikimi olmadan uzun süre çalışabilir. HydroHexa, maksimum verim elde etmek için oransal hidrolik kontrolöre sahiptir ve sıcak su üretme önceliğine sahiptir. Primer tarafta düşük dönüş sıcaklıkları sağlar. Yoğuşmalı kazanlar ile kullanıma uygundur. Eşanjör ve boru malzemesi paslanmaz çeliktir ve HIU alüminyum radyatörlerle birlikte verimli bir şekilde çalışabilir.

Teknik Özellikler
• Kendinden tahrikli hidrolik ve termostatik kontrol
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi
• Sıcaklık kontrollü hazırda bekletme fonksiyonu`,
    en: `HydroHexa DHW

HydroHexa is used solely for domestic hot water preparation. Since the heat exchanger can remain cold by itself, it can operate for extended periods without limescale buildup. HydroHexa features a proportional hydraulic controller for maximum efficiency and has hot water production priority. It provides low return temperatures on the primary side. It is suitable for use with condensing boilers. The exchanger and pipe material is stainless steel, and the HIU can operate efficiently with aluminium radiators.

Technical Specifications
• Self-driven hydraulic and thermostatic control
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve
• Temperature-controlled standby function`,
  },
  {
    id: 9,
    tr: `Direct HydroHexa RH

HydroHexa ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için, eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. HydroHexa ısı istasyonları kullanım sıcak suyu önceliğine sahiptir. HydroHexa'nın düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli bir şekilde çalışabilir. HydroHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. HydroHexa, kazan dönüş hattında bulunan fark basınç vanası ve ısıtma dönüş hattında bulunan zon vanası sayesinde daire içerisinde eksiksiz balanslama yapılabilir.

Teknik Özellikler
• Kendinden tahrikli hidrolik ve termostatik kontrol
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi
• Sıcaklık kontrollü, hazırda bekletme fonksiyonu`,
    en: `Direct HydroHexa RH

In HydroHexa heat interface units, control is performed both hydraulically and thermostatically. Since the system operates with a cold exchanger principle, the possibility of limescale buildup within the exchanger is eliminated. HydroHexa heat interface units have domestic hot water priority. Thanks to HydroHexa's low return water feature, it can work efficiently with condensing boilers. The exchangers and pipes inside HydroHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators. HydroHexa provides complete balancing within apartments thanks to the differential pressure valve on the boiler return line and the zone valve on the heating return line.

Technical Specifications
• Self-driven hydraulic and thermostatic control
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve
• Temperature-controlled standby function`,
  },
  {
    id: 10,
    tr: `Direct HydroHexa UFH

HydroHexa ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için, eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. HydroHexa ısı istasyonları kullanım sıcak suyu önceliğine sahiptir. HydroHexa'nın düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli bir şekilde çalışabilir. HydroHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. HydroHexa, kazan dönüş hattında bulunan fark basınç vanası ve ısıtma dönüş hattında bulunan zon vanası sayesinde daire içerisinde eksiksiz balanslama yapılabilir.

HydroHexa, yerden ısıtma hattı sıcaklığını stabil tutmak için, bir karışım devresi içerir. Isı istasyonu içerisinde bulunan zon vanası sayesinde, daire içinde giden debi miktarı ayarlanabilir. Zon vanası üzerine aktüatör kolay bir şekilde adapte edilebilir. Bu sayede oda termostatının kapalı olduğu durumlarda, aktüatör yerden ısıtma devresini kapatarak, enerji sarfiyatının önüne geçer.

Teknik Özellikler
• Kendinden tahrikli hidrolik ve termostatik kontrol
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi
• Sıcaklık kontrollü, hazırda bekletme fonksiyonu`,
    en: `Direct HydroHexa UFH

In HydroHexa heat interface units, control is performed both hydraulically and thermostatically. Since the system operates with a cold exchanger principle, the possibility of limescale buildup within the exchanger is eliminated. HydroHexa heat interface units have domestic hot water priority. Thanks to HydroHexa's low return water feature, it can work efficiently with condensing boilers. The exchangers and pipes inside HydroHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators. HydroHexa provides complete balancing within apartments thanks to the differential pressure valve on the boiler return line and the zone valve on the heating return line.

HydroHexa includes a mixing circuit to keep the underfloor heating line temperature stable. Thanks to the zone valve inside the heat interface unit, the flow rate going into the apartment can be adjusted. An actuator can be easily adapted onto the zone valve. This way, when the room thermostat is off, the actuator closes the underfloor heating circuit, preventing energy waste.

Technical Specifications
• Self-driven hydraulic and thermostatic control
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve
• Temperature-controlled standby function`,
  },
  {
    id: 7,
    tr: `Indirect HydroHexa

HydroHexa ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için, eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. HydroHexa ısı istasyonları kullanım sıcak suyu önceliğine sahiptir. HydroHexa'nın düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli bir şekilde çalışabilir. HydroHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. HydroHexa, kazan dönüş hattında bulunan fark basınç vanası ve ısıtma dönüş hattında bulunan zon vanası sayesinde daire içerisinde eksiksiz balanslama yapılabilir.

Indirect serisi HydroHexa, yüksek katlı binalarda basınç kırıcı görevi görerek, kat aralarında bulunan mekanik odaların kaldırılmasına ve bu alanların ticari olarak kullanılmasına olanak sağlar. Isıtma, ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır. Daire ısıtmasını kontrol etmek için, opsiyonel olarak dış hava kompanzasyon kontrolü de eklenebilir.

Teknik Özellikler
• Kendinden tahrikli hidrolik ve termostatik kontrol
• Paslanmaz çelik borulama ve eşanjör
• Kullanım sıcak suyu kontrolü için anlık tepkiler
• Düşük kazan dönüş suyu sıcaklığı
• Dahili fark basınç vanası sayesinde yüksek vana otoritesi
• Sıcaklık kontrollü, hazırda bekletme fonksiyonu`,
    en: `Indirect HydroHexa

In HydroHexa heat interface units, control is performed both hydraulically and thermostatically. Since the system operates with a cold exchanger principle, the possibility of limescale buildup within the exchanger is eliminated. HydroHexa heat interface units have domestic hot water priority. Thanks to HydroHexa's low return water feature, it can work efficiently with condensing boilers. The exchangers and pipes inside HydroHexa are manufactured from AISI 316 grade stainless steel, enabling use even with aluminium radiators. HydroHexa provides complete balancing within apartments thanks to the differential pressure valve on the boiler return line and the zone valve on the heating return line.

The Indirect series HydroHexa acts as a pressure breaker in high-rise buildings, enabling the removal of mechanical rooms between floors and allowing these areas to be used commercially. Heating operates as a closed system with a separate exchanger circuit. Optionally, outdoor weather compensation control can be added to control apartment heating.

Technical Specifications
• Self-driven hydraulic and thermostatic control
• Stainless steel piping and heat exchanger
• Instant response for domestic hot water control
• Low boiler return water temperature
• High valve authority thanks to built-in differential pressure valve
• Temperature-controlled standby function`,
  },
];

async function main() {
  for (const d of descriptions) {
    await prisma.product.update({
      where: { id: d.id },
      data: { descriptionTr: d.tr, descriptionEn: d.en },
    });
    console.log(`Updated product ${d.id} with descriptions`);
  }
  console.log("Done!");
}

main().catch(console.error);
