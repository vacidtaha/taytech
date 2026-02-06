"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "Smart Box", key: "smart-box" },
  { id: 2, label: "Smart Booster", key: "smart-booster" },
  { id: 3, label: "Smart Wastewater", key: "smart-wastewater" },
  { id: 4, label: "Smart Bore Hole", key: "smart-bore-hole" },
  { id: 5, label: "Smart Grinder", key: "smart-grinder" },
  { id: 6, label: "Smart Exclusive D", key: "smart-exclusive-d" },
];

export default function DirectStart() {
  const { t } = useLanguage();

  // Ürün verileri
  const urunVerileri: Record<string, {
    baslik: string;
    aciklama: string;
    ozellikler: string[];
    resim: string;
    belgeler: { isimKey: string; link: string }[];
    teknikOzellikler?: string[];
    uygulamaAlanlariResim?: string;
    teknikVeriler?: {
      basliklar: string[];
      satirlar: string[][];
    };
    teknikVerilerCoklu?: {
      baslik: string;
      basliklar: string[];
      satirlar: string[][];
    }[];
    teknikNot?: string;
  }> = {
    "smart-box": {
      baslik: "Smart Box",
      aciklama: t("prod.directStart.smart-box.desc"),
      ozellikler: [
        t("prod.directStart.smart-box.feat1"),
        t("prod.directStart.smart-box.feat2"),
        t("prod.directStart.smart-box.feat3")
      ],
      resim: "/smart-box.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-box-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-box-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Termoplastik (ABS) / IP 55",
        "Güç Beslemesi 1 Faz-50/60Hz 230V ±",
        "128 x 64 LCD Grafik Ekran",
        "Motor Çalışıyor için Yeşil LED / Hatalar için Kırmızı LED",
        "Başlatmak için NO bağlantısı",
        "Volt, Amper, Alarmlar, Olaylar ve Ana Sayfada Gün / Zaman Ekranı",
        "Korumalar ve Hatalar",
        "Motor Aşırı akım / Düşük Akım (Ayarlanabilir)",
        "Faz Yok ve Faz Sırası Hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Kuru Çalışma Koruması",
        "Pompa Çalışma Zamanı Gösterme",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Verileri dışarıya aktarmak için USB arayüzü. (Son 500 kayıt)",
        "MODBus Bağlantısı"
      ],
      uygulamaAlanlariResim: "/smart-box-uygulama.png",
      teknikVeriler: {
        basliklar: ["Smart Box", "COD", "VOLTAJ (V~)", "MAX GÜÇ (kW)", "MAX GÜÇ (HP)", "AKIM Aralığı (A)", "AKIM Max (A)", "KUTU D (mm)", "KUTU E (mm)", "KUTU G (mm)", "Malzeme", "AĞIRLIK (KG)"],
        satirlar: [
          ["SmartBox / 1 Faz", "10001", "1 - 230", "2.2", "3", "0-18", "18", "230", "130", "120", "ABS", "-"]
        ]
      }
    },
    "smart-booster": {
      baslik: "Smart Booster",
      aciklama: t("prod.directStart.smart-booster.desc"),
      ozellikler: [
        t("prod.directStart.smart-booster.feat1"),
        t("prod.directStart.smart-booster.feat2"),
        t("prod.directStart.smart-booster.feat3"),
        t("prod.directStart.smart-booster.feat4")
      ],
      resim: "/smart-booster.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-booster-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-booster-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Termoplastik (ABS) / IP 55",
        "Güç Beslemesi 1 Faz-50/60Hz 230V ±",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "128 x 64 LCD Grafik Ekran",
        "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
        "Başlatma bilgisi için komut girişi (Basınç anahtarı veya sensör)",
        "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
        "Oto-Manuel Durum bilgisi görüntüleme",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Kuru çalışma koruması",
        "Kilit mekanizmalı ana anahtar",
        "Motor koruma sigortaları",
        "Pompa çalışma süre bilgisi",
        "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "MODBus Bağlantısı"
      ],
      uygulamaAlanlariResim: "/smart-booster-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Smart Booster 1",
          basliklar: ["Model", "Voltaj (V~)", "Max Güç (kW / HP)", "Akım Aralığı (A)", "Ölçüler (H/L/W)", "Malzeme"],
          satirlar: [
            ["Mono", "1−230", "2.2 / 3", "0−18", "310×250×130 mm", "ABS"],
            ["4 / Tri", "3−400", "4 / 5.5", "0−8.6", "310×250×130 mm", "ABS"],
            ["5.5 / Tri", "3−400", "5.5 / 7.5", "0−11.6", "310×250×130 mm", "ABS"],
            ["7.5 / Tri", "3−400", "7.5 / 10", "0−15.8", "310×250×130 mm", "ABS"],
            ["11 / Tri", "3−400", "11 / 15", "0−25", "310×250×130 mm", "ABS"],
            ["15 / Tri", "3−400", "15 / 20", "0−32", "310×250×130 mm", "ABS"]
          ]
        },
        {
          baslik: "Smart Booster 2",
          basliklar: ["Model", "Voltaj (V~)", "Max Güç (kW / HP)", "Akım Aralığı (A)", "Ölçüler (H/L/W)", "Malzeme"],
          satirlar: [
            ["Mono", "1−230", "2.2 / 3", "0−18", "310×250×130 mm", "ABS"],
            ["4 / Tri", "3−400", "4 / 5.5", "0−8.6", "310×250×130 mm", "ABS"],
            ["5.5 / Tri", "3−400", "5.5 / 7.5", "0−11.6", "310×250×130 mm", "ABS"],
            ["7.5 / Tri", "3−400", "7.5 / 10", "0−15.8", "310×250×130 mm", "ABS"],
            ["11 / Tri", "3−400", "11 / 15", "0−25", "310×250×130 mm", "ABS"],
            ["15 / Tri", "3−400", "15 / 20", "0−32", "310×250×130 mm", "ABS"]
          ]
        }
      ],
      teknikNot: "*Talep üzerine 18.5 kW ve üzeri pompaların tasarımı gerçekleştirilebilir.\n\n**Projeye özel tasarımlar için lütfen bizimle iletişime geçin."
    },
    "smart-wastewater": {
      baslik: "Smart Wastewater",
      aciklama: t("prod.directStart.smart-wastewater.desc"),
      ozellikler: [
        t("prod.directStart.smart-wastewater.feat1"),
        t("prod.directStart.smart-wastewater.feat2"),
        t("prod.directStart.smart-wastewater.feat3"),
        t("prod.directStart.smart-wastewater.feat4")
      ],
      resim: "/smart-wastewater.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-wastewater-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-wastewater-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Termoplastik (ABS) / IP 55",
        "Güç Beslemesi 1 Faz-50/60Hz 230V ±",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "128 x 64 LCD Grafik Ekran",
        "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
        "Başlatma bilgisi için komut girişi (Seviye Elektrodu veya Şamandıra)",
        "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
        "Oto-Manuel Durum bilgisi görüntüleme",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Pompa gövdesi su kaçağı uyarısı",
        "Kilit mekanizmalı ana anahtar",
        "Motor koruma sigortaları",
        "Pompa çalışma süre bilgisi",
        "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)"
      ],
      uygulamaAlanlariResim: "/smart-wastewater-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Smart Wastewater 1",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["Mono", "1031", "1 - 230", "2.2 / 3", "0 - 18", "310x250x130", "ABS"],
            ["4 / Tri", "12001", "3 - 400", "4 / 5.5", "0 - 8.6", "310x250x130", "ABS"],
            ["5.5 / Tri", "12002", "3 - 400", "5.5 / 7.5", "0 - 11.6", "310x250x130", "ABS"],
            ["7.5 / Tri", "12003", "3 - 400", "7.5 / 10", "0 - 15.8", "310x250x130", "ABS"],
            ["11 / Tri", "12004", "3 - 400", "11 / 15", "0 - 25", "310x250x130", "ABS"],
            ["15 / Tri", "12005", "3 - 400", "15 / 20", "0 - 32", "310x250x130", "ABS"]
          ]
        },
        {
          baslik: "Smart Wastewater 2",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["Mono", "1041", "1 - 230", "2.2 / 3", "0 - 18", "310x250x130", "ABS"],
            ["4 / Tri", "12201", "3 - 400", "4 / 5.5", "0 - 8.6", "310x250x130", "ABS"],
            ["5.5 / Tri", "12202", "3 - 400", "5.5 / 7.5", "0 - 11.6", "310x250x130", "ABS"],
            ["7.5 / Tri", "12203", "3 - 400", "7.5 / 10", "0 - 15.8", "310x250x130", "ABS"],
            ["11 / Tri", "12204", "3 - 400", "11 / 15", "0 - 25", "310x250x130", "ABS"],
            ["15 / Tri", "12205", "3 - 400", "15 / 20", "0 - 32", "310x250x130", "ABS"]
          ]
        }
      ]
    },
    "smart-bore-hole": {
      baslik: "Smart Bore Hole",
      aciklama: t("prod.directStart.smart-bore-hole.desc"),
      ozellikler: [
        t("prod.directStart.smart-bore-hole.feat1"),
        t("prod.directStart.smart-bore-hole.feat2"),
        t("prod.directStart.smart-bore-hole.feat3"),
        t("prod.directStart.smart-bore-hole.feat4")
      ],
      resim: "/smart-bore-hole.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-bore-hole-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-bore-hole-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Termoplastik (ABS) / IP 55",
        "Güç Beslemesi 1 Faz-50/60Hz 230V ±",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "128 x 64 LCD Grafik Ekran",
        "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
        "Başlatma bilgisi için komut girişi (Seviye Elektrodu veya Şamandıra)",
        "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
        "Oto-Manuel Durum bilgisi görüntüleme",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Kilit mekanizmalı ana anahtar",
        "Motor koruma sigortaları",
        "Pompa çalışma süre bilgisi",
        "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "MODBus Bağlantısı"
      ],
      uygulamaAlanlariResim: "/smart-bore-hole-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Smart Bore Hole 1",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["Mono", "1051", "1−230", "2.2 / 3", "0−18", "310×250×130", "ABS"],
            ["4 / Tri", "13001", "3−400", "4 / 5.5", "0−8.6", "310×250×130", "ABS"],
            ["5.5 / Tri", "13002", "3−400", "5.5 / 7.5", "0−11.6", "310×250×130", "ABS"],
            ["7.5 / Tri", "13003", "3−400", "7.5 / 10", "0−15.8", "310×250×130", "ABS"],
            ["11 / Tri", "13004", "3−400", "11 / 15", "0−25", "310×250×130", "ABS"],
            ["15 / Tri", "13005", "3−400", "15 / 20", "0−32", "310×250×130", "ABS"]
          ]
        },
        {
          baslik: "Smart Bore Hole 2",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["Mono", "1061", "1−230", "2.2 / 3", "0−18", "310×250×130", "ABS"],
            ["4 / Tri", "13201", "3−400", "4 / 5.5", "0−8.6", "310×250×130", "ABS"],
            ["5.5 / Tri", "13202", "3−400", "5.5 / 7.5", "0−11.6", "310×250×130", "ABS"],
            ["7.5 / Tri", "13203", "3−400", "7.5 / 10", "0−15.8", "310×250×130", "ABS"],
            ["11 / Tri", "13204", "3−400", "11 / 15", "0−25", "310×250×130", "ABS"],
            ["15 / Tri", "13205", "3−400", "15 / 20", "0−32", "310×250×130", "ABS"]
          ]
        }
      ],
      teknikNot: "*Talep üzerine 18.5 kW ve üzeri pompaların tasarımı gerçekleştirilebilir.\n\n**Projeye özel tasarımlar için lütfen bizimle iletişime geçin."
    },
    "smart-grinder": {
      baslik: "Smart Grinder",
      aciklama: t("prod.directStart.smart-grinder.desc"),
      ozellikler: [
        t("prod.directStart.smart-grinder.feat1"),
        t("prod.directStart.smart-grinder.feat2"),
        t("prod.directStart.smart-grinder.feat3"),
        t("prod.directStart.smart-grinder.feat4")
      ],
      resim: "/smart-grinder.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-grinder-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-grinder-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Termoplastik (ABS) / IP 55",
        "Kilitleme mekanizmasına sahip Ana kesici",
        "Güç Beslemesi 1 Faz-50/60Hz 230V ±",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "128 x 64 LCD Grafik Ekran",
        "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
        "Başlatma bilgisi için komut girişi (Seviye Elektrodu veya Şamandıra)",
        "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
        "Oto-Manuel Durum bilgisi görüntüleme",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Motor koruma sigortaları",
        "Pompa çalışma süre bilgisi",
        "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "MODBus Bağlantısı",
        "Ayarlanabilir motor geri yönlendirme"
      ],
      teknikVerilerCoklu: [
        {
          baslik: "Smart Grinder 1",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["4 / Tri", "14001", "3−400", "4 / 5.5", "0−8.6", "310×250×130", "ABS"],
            ["5.5 / Tri", "14002", "3−400", "5.5 / 7.5", "0−11.6", "310×250×130", "ABS"],
            ["7.5 / Tri", "14003", "3−400", "7.5 / 10", "0−15.8", "310×250×130", "ABS"],
            ["11 / Tri", "14004", "3−400", "11 / 15", "0−25", "310×250×130", "ABS"],
            ["15 / Tri", "14005", "3−400", "15 / 20", "0−32", "310×250×130", "ABS"]
          ]
        },
        {
          baslik: "Smart Grinder 2",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["4 / Tri", "14201", "3−400", "4 / 5.5", "0−8.6", "310×250×130", "ABS"],
            ["5.5 / Tri", "14202", "3−400", "5.5 / 7.5", "0−11.6", "310×250×130", "ABS"],
            ["7.5 / Tri", "14203", "3−400", "7.5 / 10", "0−15.8", "310×250×130", "ABS"],
            ["11 / Tri", "14204", "3−400", "11 / 15", "0−25", "310×250×130", "ABS"],
            ["15 / Tri", "14205", "3−400", "15 / 20", "0−32", "310×250×130", "ABS"]
          ]
        }
      ],
      teknikNot: "*Talep üzerine 18.5 kW ve üzeri pompaların tasarımı gerçekleştirilebilir.\n\n**Projeye özel tasarımlar için lütfen bizimle iletişime geçin."
    },
    "smart-exclusive-d": {
      baslik: "Smart Exclusive D",
      aciklama: t("prod.directStart.smart-exclusive-d.desc"),
      ozellikler: [
        t("prod.directStart.smart-exclusive-d.feat1"),
        t("prod.directStart.smart-exclusive-d.feat2"),
        t("prod.directStart.smart-exclusive-d.feat3")
      ],
      resim: "/smart-exclusive-d.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-exclusive-d-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-exclusive-d-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal Kutu / IP 55",
        "Kilitleme mekanizmasına sahip Ana kesici",
        "Güç Beslemesi 1 Faz-50/60Hz 230V ±",
        "Güç Beslemesi 3 Faz-50/60Hz 400V ±",
        "128 x 64 LCD Grafik Ekran",
        "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
        "Başlatma bilgisi için komut girişi (Seviye Elektrodu veya Şamandıra)",
        "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
        "Oto-Manuel Durum bilgisi görüntüleme",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlama zamanı",
        "Taşma uyarısı fonksiyonu",
        "Kuru çalışma koruması",
        "Motor koruma sigortaları",
        "Pompa çalışma süre bilgisi",
        "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "MODBus Bağlantısı"
      ],
      uygulamaAlanlariResim: "/smart-exclusive-d-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Smart Exclusive D 3",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["Mono", "1071", "1−230", "2.2 / 3", "0−18", "600×400×200", "Metal"],
            ["4 / Tri", "15001", "3−400", "4 / 5.5", "0−8.6", "600×400×200", "Metal"],
            ["5.5 / Tri", "15002", "3−400", "5.5 / 7.5", "0−11.6", "600×400×200", "Metal"],
            ["7.5 / Tri", "15003", "3−400", "7.5 / 10", "0−15.8", "600×400×200", "Metal"],
            ["11 / Tri", "15004", "3−400", "11 / 15", "0−25", "600×400×200", "Metal"],
            ["15 / Tri", "15005", "3−400", "15 / 20", "0−32", "600×400×200", "Metal"]
          ]
        },
        {
          baslik: "Smart Exclusive D 4",
          basliklar: ["Model", "COD", "Voltaj (V~)", "Güç (kW/HP)", "Akım (A)", "Ölçüler (mm)", "Malzeme"],
          satirlar: [
            ["Mono", "1081", "1−230", "2.2 / 3", "0−18", "600×400×200", "Metal"],
            ["4 / Tri", "15201", "3−400", "4 / 5.5", "0−8.6", "600×400×200", "Metal"],
            ["5.5 / Tri", "15202", "3−400", "5.5 / 7.5", "0−11.6", "600×400×200", "Metal"],
            ["7.5 / Tri", "15203", "3−400", "7.5 / 10", "0−15.8", "600×400×200", "Metal"],
            ["11 / Tri", "15204", "3−400", "11 / 15", "0−25", "600×400×200", "Metal"],
            ["15 / Tri", "15205", "3−400", "15 / 20", "0−32", "600×400×200", "Metal"]
          ]
        }
      ],
      teknikNot: "*Talep üzerine 18.5 kW ve üzeri pompaların tasarımı gerçekleştirilebilir.\n\n**Projeye özel tasarımlar için lütfen bizimle iletişime geçin."
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
  const hasTeknikVeriler = !!aktifUrunVerisi.teknikVeriler || (aktifUrunVerisi.teknikVerilerCoklu && aktifUrunVerisi.teknikVerilerCoklu.length > 0);

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
          {t("prod.akilli.directStart.title")}
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

          {/* Alt Tab Menü - Ürün Menüsüyle Aynı Tasarım */}
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
                    {/* Tekli Tablo */}
                    {aktifUrunVerisi.teknikVeriler && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {aktifUrunVerisi.teknikVeriler.basliklar.map((baslik, index) => (
                          <div key={index} className="text-center">
                            <p className="text-[#86868b] text-sm mb-1">{baslik}</p>
                            <p className="text-[#1d1d1f] text-lg font-medium">
                              {aktifUrunVerisi.teknikVeriler!.satirlar[0]?.[index] || "-"}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

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


