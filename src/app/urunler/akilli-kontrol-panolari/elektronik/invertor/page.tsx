"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "FxA Serisi", key: "fxa-serisi" },
  { id: 2, label: "Mini Speed", key: "mini-speed" },
  { id: 3, label: "FxS Serisi", key: "fxs-serisi" },
];

export default function InvertorYolVerme() {
  const { t } = useLanguage();

  // Ürün verileri
  const urunVerileri: Record<string, {
    baslik: string;
    aciklama: string;
    ozellikler: string[];
    uygulamaAlanlari?: string[];
    resim: string;
    belgeler: { isimKey: string; link: string }[];
    teknikOzellikler?: string[];
    uygulamaAlanlariResim?: string;
    teknikVerilerCoklu?: {
      baslik: string;
      basliklar: string[];
      satirlar: string[][];
    }[];
    teknikNot?: string;
  }> = {
    "fxa-serisi": {
      baslik: "FxA Serisi",
      aciklama: t("prod.invertor.fxa-serisi.desc"),
      ozellikler: [
        t("prod.invertor.fxa-serisi.feat1"),
        t("prod.invertor.fxa-serisi.feat2"),
        t("prod.invertor.fxa-serisi.feat3"),
        t("prod.invertor.fxa-serisi.feat4")
      ],
      uygulamaAlanlari: [
        "Hidrofor Pompaları",
        "Endüstriyel Pompalar",
        "HVAC Sistemleri",
        "Atık Su Pompalar",
        "Sulama Pompaları"
      ],
      resim: "/fxa.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/fxa-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/fxa-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal Kutu / IP 55",
        "Kilitleme mekanizmasına sahip yük kesici",
        "Otomatik / Manuel Anahtar",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Termal ve Manyetik Koruma",
        "BMS Sistemi için kuru kontak",
        "MODBus (RS485)",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "Haftalık olarak ayarlanabilen test",
        "P.I.D Regulasyonu",
        "Kabin içi Havalandırma"
      ],
      uygulamaAlanlariResim: "/fxa-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "FxA 1 & FxA 2 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (In/Out)", "Güç (kW/HP)", "Max Akım (A)", "Kutu Ölçüleri (mm)"],
          satirlar: [
            ["FxA 1 - 0.75", "17001", "3−400V", "0.75 / 1", "2.5", "600×400×260"],
            ["FxA 1 - 1.1", "17002", "3−400V", "1.1 / 1.5", "3.6", "600×400×260"],
            ["FxA 1 - 4", "17006", "3−400V", "4 / 5.5", "9.7", "600×400×260"],
            ["FxA 1 - 11", "17009", "3−400V", "11 / 15", "25.4", "700×500×260"],
            ["FxA 1 - 22", "17012", "3−400V", "22 / 30", "48.4", "700×500×260"],
            ["FxA 2 - 0.75", "17201", "3−400V", "0.75 / 1", "2.5", "700×500×260"],
            ["FxA 2 - 11", "17209", "3−400V", "11 / 15", "25.4", "700×500×260"],
            ["FxA 2 - 22", "17212", "3−400V", "22 / 30", "48.4", "800×600×260"]
          ]
        },
        {
          baslik: "FxA 3 & FxA 4 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (In/Out)", "Güç (kW/HP)", "Max Akım (A)", "Kutu Ölçüleri (mm)"],
          satirlar: [
            ["FxA 3 - 0.75", "17301", "3−400V", "0.75 / 1", "2.5", "800×600×260"],
            ["FxA 3 - 5.5", "17307", "3−400V", "5.5 / 7.5", "13.8", "1000×700×320"],
            ["FxA 3 - 22", "17312", "3−400V", "22 / 30", "48.4", "1300×900×340"],
            ["FxA 4 - 0.75", "17401", "3−400V", "0.75 / 1", "2.5", "800×600×260"],
            ["FxA 4 - 5.5", "17407", "3−400V", "5.5 / 7.5", "13.8", "1000×700×320"],
            ["FxA 4 - 22", "17412", "3−400V", "22 / 30", "48.4", "1300×900×340"]
          ]
        }
      ],
      teknikNot: "22 kW (30 HP) üzeri motorlar için Taytech, projenize özel tasarım ve üretim çözümleri sunmaya devam etmektedir."
    },
    "mini-speed": {
      baslik: "Mini Speed",
      aciklama: t("prod.invertor.mini-speed.desc"),
      ozellikler: [
        t("prod.invertor.mini-speed.feat1"),
        t("prod.invertor.mini-speed.feat2"),
        t("prod.invertor.mini-speed.feat3")
      ],
      uygulamaAlanlari: [
        "Endüstriyel Pompalar",
        "Atık Su Pompalar",
        "Hidrofor Pompaları",
        "HVAC Sistemleri",
        "Sulama Pompaları"
      ],
      resim: "/mini-speed.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/mini-speed-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/mini-speed-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "ABS Termoplastik Kutu / IP 55",
        "Kilitleme mekanizmasına sahip yük kesici",
        "Otomatik / Manuel Anahtar",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Termal ve Manyetik Koruma",
        "BMS Sistemi için kuru kontak",
        "MODBus (RS485)",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "Haftalık olarak ayarlanabilen test",
        "P.I.D Regulasyonu"
      ],
      uygulamaAlanlariResim: "/mini-speed-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Mini Speed Mono",
          basliklar: ["Model", "COD", "Voltaj (In/Out)", "Güç (kW/HP)", "Max Akım (A)"],
          satirlar: [
            ["Mini Speed 1 - 0.37 / Mono", "19001", "1-230 / 3-230", "0.37 / 0.5", "2.4"],
            ["Mini Speed 1 - 0.55 / Mono", "19002", "1-230 / 3-230", "0.55 / 0.75", "3.6"],
            ["Mini Speed 1 - 0.75 / Mono", "19003", "1-230 / 3-230", "0.75 / 1", "4.7"],
            ["Mini Speed 1 - 1.1 / Mono", "19004", "1-230 / 3-230", "1.1 / 1.5", "6.7"],
            ["Mini Speed 1 - 1.5 / Mono", "19005", "1-230 / 3-230", "1.5 / 2", "7.5"],
            ["Mini Speed 1 - 2.2 / Mono", "19006", "1-230 / 3-230", "2.2 / 3", "9.8"]
          ]
        },
        {
          baslik: "Mini Speed Tri-M",
          basliklar: ["Model", "COD", "Voltaj (In/Out)", "Güç (kW/HP)", "Max Akım (A)"],
          satirlar: [
            ["Mini Speed 1 - 0.37 / Tri-M", "19201", "3-230 / 3-230", "0.37 / 0.5", "2.6"],
            ["Mini Speed 1 - 0.55 / Tri-M", "19202", "3-230 / 3-230", "0.55 / 0.75", "3.9"],
            ["Mini Speed 1 - 0.75 / Tri-M", "19203", "3-230 / 3-230", "0.75 / 1", "5.2"],
            ["Mini Speed 1 - 1.1 / Tri-M", "19204", "3-230 / 3-230", "1.1 / 1.5", "7.4"],
            ["Mini Speed 1 - 1.5 / Tri-M", "19205", "3-230 / 3-230", "1.5 / 2", "8.3"],
            ["Mini Speed 1 - 2.2 / Tri-M", "19206", "3-230 / 3-230", "2.2 / 3", "10.8"],
            ["Mini Speed 1 - 3 / Tri-M", "19207", "3-230 / 3-230", "3 / 4", "14.6"],
            ["Mini Speed 1 - 4 / Tri-M", "19208", "3-230 / 3-230", "4 / 5.5", "19.4"]
          ]
        },
        {
          baslik: "Mini Speed Tri",
          basliklar: ["Model", "COD", "Voltaj (In/Out)", "Güç (kW/HP)", "Max Akım (A)"],
          satirlar: [
            ["Mini Speed 1 - 0.75 / Tri", "19301", "3-400 / 3-400", "0.75 / 1", "2.6"],
            ["Mini Speed 1 - 1.1 / Tri", "19302", "3-400 / 3-400", "1.1 / 1.5", "3.6"],
            ["Mini Speed 1 - 1.5 / Tri", "19303", "3-400 / 3-400", "1.5 / 2", "4.5"],
            ["Mini Speed 1 - 2.2 / Tri", "19304", "3-400 / 3-400", "2.2 / 3", "6.2"],
            ["Mini Speed 1 - 3 / Tri", "19305", "3-400 / 3-400", "3 / 4", "8"],
            ["Mini Speed 1 - 4 / Tri", "19306", "3-400 / 3-400", "4 / 5.5", "9.7"]
          ]
        }
      ]
    },
    "fxs-serisi": {
      baslik: "FxS Serisi",
      aciklama: t("prod.invertor.fxs-serisi.desc"),
      ozellikler: [
        t("prod.invertor.fxs-serisi.feat1"),
        t("prod.invertor.fxs-serisi.feat2"),
        t("prod.invertor.fxs-serisi.feat3"),
        t("prod.invertor.fxs-serisi.feat4")
      ],
      uygulamaAlanlari: [
        "Endüstriyel Pompalar",
        "Atık Su Pompalar",
        "Hidrofor Pompaları",
        "HVAC Sistemleri",
        "Sulama Pompaları"
      ],
      resim: "/fxs.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/fxs-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/fxs-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal Kutu / IP 55",
        "Kilitleme mekanizmasına sahip yük kesici",
        "Otomatik / Manuel Anahtar",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Termal ve Manyetik Koruma",
        "BMS Sistemi için kuru kontak",
        "MODBus (RS485)",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "Haftalık olarak ayarlanabilen test",
        "Standart MODBus bağlantısı. BACnet, LonWorks optional",
        "Uzaktan erişim için Webgate Uygulaması (İsteğe Bağlı)",
        "P.I.D Regülasyonu",
        "Kabin içi havalandırma"
      ],
      uygulamaAlanlariResim: "/fxs-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "FxS 1 Teknik Veriler",
          basliklar: ["Model", "COD", "V-IN", "V-OUT", "kW", "HP", "Max (A)", "H", "L", "W", "Malzeme"],
          satirlar: [
            ["FxS 1 - 0.75 / Tri", "18001", "3-400", "3-400", "0.75", "1", "2.1", "600", "400", "260", "Metal"],
            ["FxS 1 - 1.1 / Tri", "18002", "3-400", "3-400", "1.1", "1.5", "3.3", "600", "400", "260", "Metal"],
            ["FxS 1 - 1.5 / Tri", "18003", "3-400", "3-400", "1.5", "2", "4.1", "600", "400", "260", "Metal"],
            ["FxS 1 - 2.2 / Tri", "18004", "3-400", "3-400", "2.2", "3", "5.4", "600", "400", "260", "Metal"],
            ["FxS 1 - 3 / Tri", "18005", "3-400", "3-400", "3", "4", "6.9", "600", "400", "260", "Metal"],
            ["FxS 1 - 4 / Tri", "18006", "3-400", "3-400", "4", "5.5", "8.8", "600", "400", "260", "Metal"],
            ["FxS 1 - 5.5 / Tri", "18007", "3-400", "3-400", "5.5", "7.5", "11.9", "700", "500", "260", "Metal"],
            ["FxS 1 - 7.5 / Tri", "18008", "3-400", "3-400", "7.5", "10", "15.4", "700", "500", "260", "Metal"],
            ["FxS 1 - 11 / Tri", "18009", "3-400", "3-400", "11", "15", "23", "700", "500", "260", "Metal"],
            ["FxS 1 - 15 / Tri", "18010", "3-400", "3-400", "15", "20", "31", "700", "500", "260", "Metal"],
            ["FxS 1 - 18.5 / Tri", "18011", "3-400", "3-400", "18.5", "25", "38", "700", "500", "260", "Metal"],
            ["FxS 1 - 22 / Tri", "18012", "3-400", "3-400", "22", "30", "45", "700", "500", "260", "Metal"],
            ["FxS 1 - 30 / Tri", "18013", "3-400", "3-400", "30", "40", "59", "1000", "700", "320", "Metal"],
            ["FxS 1 - 37 / Tri", "18014", "3-400", "3-400", "37", "50", "72", "1000", "700", "320", "Metal"],
            ["FxS 1 - 45 / Tri", "18015", "3-400", "3-400", "45", "60", "87", "1200", "800", "340", "Metal"],
            ["FxS 1 - 55 / Tri", "18016", "3-400", "3-400", "55", "75", "125", "1200", "800", "340", "Metal"],
            ["FxS 1 - 75 / Tri", "18017", "3-400", "3-400", "75", "100", "157", "1600", "800", "550", "Metal"],
            ["FxS 1 - 90 / Tri", "18018", "3-400", "3-400", "90", "125", "180", "1600", "800", "550", "Metal"],
            ["FxS 1 - 110 / Tri", "18019", "3-400", "3-400", "110", "150", "205", "1600", "800", "550", "Metal"],
            ["FxS 1 - 132 / Tri", "18020", "3-400", "3-400", "132", "180", "246", "1800", "1300", "550", "Metal"],
            ["FxS 1 - 160 / Tri", "18021", "3-400", "3-400", "160", "220", "289", "1800", "1300", "550", "Metal"]
          ]
        },
        {
          baslik: "FxS 2 Teknik Veriler",
          basliklar: ["Model", "COD", "V-IN", "V-OUT", "kW", "HP", "Max (A)", "H", "L", "W", "Malzeme"],
          satirlar: [
            ["FxS 2 - 0.75 / Tri", "18201", "3-400", "3-400", "0.75", "1", "2.1", "700", "500", "260", "Metal"],
            ["FxS 2 - 1.1 / Tri", "18202", "3-400", "3-400", "1.1", "1.5", "3.3", "700", "500", "260", "Metal"],
            ["FxS 2 - 1.5 / Tri", "18203", "3-400", "3-400", "1.5", "2", "4.1", "700", "500", "260", "Metal"],
            ["FxS 2 - 2.2 / Tri", "18204", "3-400", "3-400", "2.2", "3", "5.4", "700", "500", "260", "Metal"],
            ["FxS 2 - 3 / Tri", "18205", "3-400", "3-400", "3", "4", "6.9", "700", "500", "260", "Metal"],
            ["FxS 2 - 4 / Tri", "18206", "3-400", "3-400", "4", "5.5", "8.8", "700", "500", "260", "Metal"],
            ["FxS 2 - 5.5 / Tri", "18207", "3-400", "3-400", "5.5", "7.5", "11.9", "700", "500", "260", "Metal"],
            ["FxS 2 - 7.5 / Tri", "18208", "3-400", "3-400", "7.5", "10", "15.4", "700", "500", "260", "Metal"],
            ["FxS 2 - 11 / Tri", "18209", "3-400", "3-400", "11", "15", "23", "700", "500", "260", "Metal"],
            ["FxS 2 - 15 / Tri", "18210", "3-400", "3-400", "15", "20", "31", "800", "600", "260", "Metal"],
            ["FxS 2 - 18.5 / Tri", "18211", "3-400", "3-400", "18.5", "25", "38", "800", "600", "260", "Metal"],
            ["FxS 2 - 22 / Tri", "18212", "3-400", "3-400", "22", "30", "45", "800", "600", "260", "Metal"],
            ["FxS 2 - 30 / Tri", "18213", "3-400", "3-400", "30", "40", "59", "1000", "700", "320", "Metal"],
            ["FxS 2 - 37 / Tri", "18214", "3-400", "3-400", "37", "50", "72", "1000", "700", "320", "Metal"],
            ["FxS 2 - 45 / Tri", "18215", "3-400", "3-400", "45", "60", "87", "1200", "800", "340", "Metal"],
            ["FxS 2 - 55 / Tri", "18216", "3-400", "3-400", "55", "75", "125", "1200", "800", "340", "Metal"],
            ["FxS 2 - 75 / Tri", "18217", "3-400", "3-400", "75", "100", "157", "1600", "800", "550", "Metal"],
            ["FxS 2 - 90 / Tri", "18218", "3-400", "3-400", "90", "125", "180", "1600", "800", "550", "Metal"],
            ["FxS 2 - 110 / Tri", "18219", "3-400", "3-400", "110", "150", "205", "1600", "800", "550", "Metal"],
            ["FxS 2 - 132 / Tri", "18220", "3-400", "3-400", "132", "180", "246", "1800", "1300", "550", "Metal"],
            ["FxS 2 - 160 / Tri", "18221", "3-400", "3-400", "160", "220", "289", "1800", "1300", "550", "Metal"]
          ]
        },
        {
          baslik: "FxS 3 Teknik Veriler",
          basliklar: ["Model", "COD", "V-IN", "V-OUT", "kW", "HP", "Max (A)", "H", "L", "W", "Malzeme"],
          satirlar: [
            ["FxS 3 - 0.75 / Tri", "18301", "3-400", "3-400", "0.75", "1", "2.1", "800", "600", "260", "Metal"],
            ["FxS 3 - 1.1 / Tri", "18302", "3-400", "3-400", "1.1", "1.5", "3.3", "800", "600", "260", "Metal"],
            ["FxS 3 - 1.5 / Tri", "18303", "3-400", "3-400", "1.5", "2", "4.1", "800", "600", "260", "Metal"],
            ["FxS 3 - 2.2 / Tri", "18304", "3-400", "3-400", "2.2", "3", "5.4", "800", "600", "260", "Metal"],
            ["FxS 3 - 3 / Tri", "18305", "3-400", "3-400", "3", "4", "6.9", "800", "600", "260", "Metal"],
            ["FxS 3 - 4 / Tri", "18306", "3-400", "3-400", "4", "5.5", "8.8", "800", "600", "260", "Metal"],
            ["FxS 3 - 5.5 / Tri", "18307", "3-400", "3-400", "5.5", "7.5", "11.9", "1000", "700", "320", "Metal"],
            ["FxS 3 - 7.5 / Tri", "18308", "3-400", "3-400", "7.5", "10", "15.4", "1000", "700", "320", "Metal"],
            ["FxS 3 - 11 / Tri", "18309", "3-400", "3-400", "11", "15", "23", "1000", "700", "320", "Metal"],
            ["FxS 3 - 15 / Tri", "18310", "3-400", "3-400", "15", "20", "31", "1200", "800", "340", "Metal"],
            ["FxS 3 - 18.5 / Tri", "18311", "3-400", "3-400", "18.5", "25", "38", "1200", "800", "340", "Metal"],
            ["FxS 3 - 22 / Tri", "18312", "3-400", "3-400", "22", "30", "45", "1200", "800", "340", "Metal"],
            ["FxS 3 - 30 / Tri", "18313", "3-400", "3-400", "30", "40", "59", "1300", "900", "340", "Metal"],
            ["FxS 3 - 37 / Tri", "18314", "3-400", "3-400", "37", "50", "72", "1300", "900", "340", "Metal"],
            ["FxS 3 - 45 / Tri", "18315", "3-400", "3-400", "45", "60", "87", "1300", "900", "340", "Metal"],
            ["FxS 3 - 55 / Tri", "18316", "3-400", "3-400", "55", "75", "125", "1300", "900", "340", "Metal"],
            ["FxS 3 - 75 / Tri", "18317", "3-400", "3-400", "75", "100", "157", "1600", "800", "550", "Metal"],
            ["FxS 3 - 90 / Tri", "18318", "3-400", "3-400", "90", "125", "180", "1600", "800", "550", "Metal"],
            ["FxS 3 - 110 / Tri", "18319", "3-400", "3-400", "110", "150", "205", "1600", "800", "550", "Metal"],
            ["FxS 3 - 132 / Tri", "18320", "3-400", "3-400", "132", "180", "246", "1800", "1300", "550", "Metal"],
            ["FxS 3 - 160 / Tri", "18321", "3-400", "3-400", "160", "220", "289", "1800", "1300", "550", "Metal"]
          ]
        },
        {
          baslik: "FxS 4 Teknik Veriler",
          basliklar: ["Model", "COD", "V-IN", "V-OUT", "kW", "HP", "Max (A)", "H", "L", "W", "Malzeme"],
          satirlar: [
            ["FxS 4 - 0.75 / Tri", "18401", "3-400", "3-400", "0.75", "1", "2.1", "800", "600", "260", "Metal"],
            ["FxS 4 - 1.1 / Tri", "18402", "3-400", "3-400", "1.1", "1.5", "3.3", "800", "600", "260", "Metal"],
            ["FxS 4 - 1.5 / Tri", "18403", "3-400", "3-400", "1.5", "2", "4.1", "800", "600", "260", "Metal"],
            ["FxS 4 - 2.2 / Tri", "18404", "3-400", "3-400", "2.2", "3", "5.4", "800", "600", "260", "Metal"],
            ["FxS 4 - 3 / Tri", "18405", "3-400", "3-400", "3", "4", "6.9", "800", "600", "260", "Metal"],
            ["FxS 4 - 4 / Tri", "18406", "3-400", "3-400", "4", "5.5", "8.8", "800", "600", "260", "Metal"],
            ["FxS 4 - 5.5 / Tri", "18407", "3-400", "3-400", "5.5", "7.5", "11.9", "1000", "700", "320", "Metal"],
            ["FxS 4 - 7.5 / Tri", "18408", "3-400", "3-400", "7.5", "10", "15.4", "1000", "700", "320", "Metal"],
            ["FxS 4 - 11 / Tri", "18409", "3-400", "3-400", "11", "15", "23", "1000", "700", "320", "Metal"],
            ["FxS 4 - 15 / Tri", "18410", "3-400", "3-400", "15", "20", "31", "1300", "900", "340", "Metal"],
            ["FxS 4 - 18.5 / Tri", "18411", "3-400", "3-400", "18.5", "25", "38", "1300", "900", "340", "Metal"],
            ["FxS 4 - 22 / Tri", "18412", "3-400", "3-400", "22", "30", "45", "1300", "900", "340", "Metal"],
            ["FxS 4 - 30 / Tri", "18413", "3-400", "3-400", "30", "40", "59", "1600", "800", "550", "Metal"],
            ["FxS 4 - 37 / Tri", "18414", "3-400", "3-400", "37", "50", "72", "1600", "800", "550", "Metal"],
            ["FxS 4 - 45 / Tri", "18415", "3-400", "3-400", "45", "60", "87", "1600", "800", "550", "Metal"],
            ["FxS 4 - 55 / Tri", "18416", "3-400", "3-400", "55", "75", "125", "1600", "800", "550", "Metal"],
            ["FxS 4 - 75 / Tri", "18417", "3-400", "3-400", "75", "100", "157", "1800", "1300", "550", "Metal"],
            ["FxS 4 - 90 / Tri", "18418", "3-400", "3-400", "90", "125", "180", "1800", "1300", "550", "Metal"],
            ["FxS 4 - 110 / Tri", "18419", "3-400", "3-400", "110", "150", "205", "1800", "1300", "550", "Metal"],
            ["FxS 4 - 132 / Tri", "18420", "3-400", "3-400", "132", "180", "246", "2000", "1600", "600", "Metal"],
            ["FxS 4 - 160 / Tri", "18421", "3-400", "3-400", "160", "220", "289", "2000", "1600", "600", "Metal"]
          ]
        }
      ]
    }
  };
  const searchParams = useSearchParams();
  const urunParam = searchParams.get("urun");
  const [activeUrun, setActiveUrun] = useState(urunler[0].key);
  const [activeTab, setActiveTab] = useState("teknik-ozellikler");

  useEffect(() => {
    if (urunParam && urunler.some(u => u.key === urunParam)) {
      setActiveUrun(urunParam);
    }
  }, [urunParam]);

  const aktifUrunVerisi = urunVerileri[activeUrun];
  
  // Tab içeriği varsa göster
  const hasTeknikOzellikler = aktifUrunVerisi.teknikOzellikler && aktifUrunVerisi.teknikOzellikler.length > 0;
  const hasUygulamaAlanlari = !!aktifUrunVerisi.uygulamaAlanlariResim;
  const hasTeknikVeriler = aktifUrunVerisi.teknikVerilerCoklu && aktifUrunVerisi.teknikVerilerCoklu.length > 0;

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: "80px", marginLeft: "150px" }}>
        <Link 
          href="/urunler/akilli-kontrol-panolari/elektronik"
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg font-medium">{t("prod.back.categories")}</span>
        </Link>
      </div>

      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          {t("prod.akilli.invertor.title")}
        </h1>
      </section>

      {/* Ürün Menüsü */}
      <section className="bg-[#f5f5f7]" style={{ paddingBottom: "80px" }}>
        <div className="flex justify-center">
          <div 
            className="inline-flex bg-[#e8e8ed] p-1 gap-1"
            style={{ borderRadius: '12px' }}
          >
            {urunler.map((urun) => (
              <button
                key={urun.id}
                onClick={() => setActiveUrun(urun.key)}
                style={{ 
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  backgroundColor: activeUrun === urun.key ? 'white' : 'transparent',
                  color: activeUrun === urun.key ? '#1d1d1f' : '#6e6e73',
                  boxShadow: activeUrun === urun.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeUrun !== urun.key) {
                    e.currentTarget.style.color = '#1d1d1f';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeUrun !== urun.key) {
                    e.currentTarget.style.color = '#6e6e73';
                  }
                }}
              >
                {urun.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ürün İçeriği */}
      <section className="bg-white">
        {aktifUrunVerisi.aciklama ? (
          <>
          <div className="grid grid-cols-2" style={{ padding: "80px 0" }}>
            {/* Sol Grid - Ürün Görseli */}
            <div className="flex items-center justify-center">
              {aktifUrunVerisi.resim && (
                <Image
                  src={aktifUrunVerisi.resim}
                  alt={aktifUrunVerisi.baslik}
                  width={450}
                  height={450}
                  className="object-contain"
                />
              )}
            </div>

            {/* Sağ Grid - Yazılar */}
            <div className="flex items-center justify-center">
              <div className="max-w-lg">
                {/* Ürün Başlığı */}
                <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-10">
                  {aktifUrunVerisi.baslik}
                </h2>
                
                {/* Açıklama */}
                <p className="text-[#6e6e73] text-lg leading-relaxed mb-14">
                  {aktifUrunVerisi.aciklama}
                </p>

                {/* Özellikler */}
                {aktifUrunVerisi.ozellikler.length > 0 && (
                  <div className="mb-14">
                    <h3 className="text-xl font-semibold text-[#86868b] mb-6">{t("prod.features")}</h3>
                    <div className="space-y-5">
                      {aktifUrunVerisi.ozellikler.map((ozellik, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <span className="w-2 h-2 bg-[#86868b] rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-[#6e6e73]">{ozellik}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Uygulama Alanları Listesi */}
                {aktifUrunVerisi.uygulamaAlanlari && aktifUrunVerisi.uygulamaAlanlari.length > 0 && (
                  <div className="mb-14">
                    <h3 className="text-xl font-semibold text-[#86868b] mb-6">{t("prod.smartSolutions")}</h3>
                    <div className="space-y-5">
                      {aktifUrunVerisi.uygulamaAlanlari.map((alan, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <span className="w-2 h-2 bg-[#86868b] rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-[#6e6e73]">{alan}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Belgeler */}
                {aktifUrunVerisi.belgeler.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#86868b] mb-6">{t("prod.documents")}</h3>
                    <div className="flex flex-wrap gap-4">
                      {aktifUrunVerisi.belgeler.map((belge, index) => (
                        <a
                          key={index}
                          href={belge.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 bg-[#e8e8ed] hover:bg-[#d4d4d8] rounded-xl text-[#6e6e73] hover:text-[#1d1d1f] font-medium transition-all duration-200"
                          style={{ padding: "14px 24px" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                          {t(belge.isimKey)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alt Tab Menü */}
          {(hasTeknikOzellikler || hasUygulamaAlanlari || hasTeknikVeriler) && (
            <div className="flex flex-col items-center" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
              {/* Tab Butonları */}
              <div 
                className="inline-flex bg-[#e8e8ed] p-1 gap-1"
                style={{ borderRadius: '12px' }}
              >
                {hasTeknikOzellikler && (
                  <button
                    onClick={() => setActiveTab("teknik-ozellikler")}
                    style={{ 
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      backgroundColor: activeTab === "teknik-ozellikler" ? 'white' : 'transparent',
                      color: activeTab === "teknik-ozellikler" ? '#1d1d1f' : '#6e6e73',
                      boxShadow: activeTab === "teknik-ozellikler" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== "teknik-ozellikler") {
                        e.currentTarget.style.color = '#1d1d1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "teknik-ozellikler") {
                        e.currentTarget.style.color = '#6e6e73';
                      }
                    }}
                  >
                    {t("prod.techSpecs")}
                  </button>
                )}
                {hasUygulamaAlanlari && (
                  <button
                    onClick={() => setActiveTab("uygulama-alanlari")}
                    style={{ 
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      backgroundColor: activeTab === "uygulama-alanlari" ? 'white' : 'transparent',
                      color: activeTab === "uygulama-alanlari" ? '#1d1d1f' : '#6e6e73',
                      boxShadow: activeTab === "uygulama-alanlari" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== "uygulama-alanlari") {
                        e.currentTarget.style.color = '#1d1d1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "uygulama-alanlari") {
                        e.currentTarget.style.color = '#6e6e73';
                      }
                    }}
                  >
                    {t("prod.appAreas")}
                  </button>
                )}
                {hasTeknikVeriler && (
                  <button
                    onClick={() => setActiveTab("teknik-veriler")}
                    style={{ 
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      backgroundColor: activeTab === "teknik-veriler" ? 'white' : 'transparent',
                      color: activeTab === "teknik-veriler" ? '#1d1d1f' : '#6e6e73',
                      boxShadow: activeTab === "teknik-veriler" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== "teknik-veriler") {
                        e.currentTarget.style.color = '#1d1d1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "teknik-veriler") {
                        e.currentTarget.style.color = '#6e6e73';
                      }
                    }}
                  >
                    {t("prod.techData")}
                  </button>
                )}
              </div>

              {/* Tab İçerikleri */}
              <div className="w-full" style={{ maxWidth: "980px", marginTop: "40px", padding: "0 24px" }}>
                {/* Teknik Özellikler İçeriği */}
                {activeTab === "teknik-ozellikler" && hasTeknikOzellikler && (
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {aktifUrunVerisi.teknikOzellikler!.map((ozellik, index) => (
                        <div key={index} className="flex items-start gap-3 py-2">
                          <span className="text-[#86868b] mt-0.5">•</span>
                          <span className="text-[#1d1d1f] text-base leading-relaxed">{ozellik}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Uygulama Alanları İçeriği */}
                {activeTab === "uygulama-alanlari" && hasUygulamaAlanlari && (
                  <div className="p-8 flex justify-center">
                    <Image
                      src={aktifUrunVerisi.uygulamaAlanlariResim!}
                      alt="Uygulama Alanları"
                      width={800}
                      height={500}
                      className="object-contain rounded-xl"
                    />
                  </div>
                )}

                {/* Teknik Veriler İçeriği */}
                {activeTab === "teknik-veriler" && hasTeknikVeriler && (
                  <div className="space-y-10">
                    {/* Çoklu Tablolar */}
                    {aktifUrunVerisi.teknikVerilerCoklu && aktifUrunVerisi.teknikVerilerCoklu.map((tablo, tabloIndex) => (
                      <div key={tabloIndex} className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#1d1d1f] text-center">{tablo.baslik}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b-2 border-[#1d1d1f]">
                                {tablo.basliklar.map((baslik, index) => (
                                  <th key={index} className="text-[#1d1d1f] text-sm font-semibold px-4 py-3 text-left">
                                    {baslik}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tablo.satirlar.map((satir, satirIndex) => (
                                <tr key={satirIndex} className="border-b border-[#e8e8ed]">
                                  {satir.map((hucre, hucreIndex) => (
                                    <td key={hucreIndex} className="text-[#6e6e73] text-sm px-4 py-3">
                                      {hucreIndex === 0 ? <span className="font-medium text-[#1d1d1f]">{hucre}</span> : hucre}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Not */}
                    {aktifUrunVerisi.teknikNot && (
                      <div className="text-center pt-4">
                        <p className="text-[#86868b] text-sm whitespace-pre-line">{aktifUrunVerisi.teknikNot}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          </>
        ) : (
          <div className="flex flex-col items-center py-20 bg-white">
            <div className="text-8xl mb-8">🚧</div>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-4">
              {aktifUrunVerisi.baslik}
            </h2>
            <p className="text-[#6e6e73] text-xl">
              {t("prod.comingSoon")}
            </p>
        </div>
        )}
      </section>

      {/* Alt boşluk - beyaz */}
      <div className="bg-white" style={{ height: "150px" }} />

      <Footer theme="white" />
    </div>
  );
}

