"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "Start One", key: "start-one" },
  { id: 2, label: "Direct Start", key: "direct-start" },
];

function DogrudanYolVermeInner() {
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
    teknikVerilerCoklu?: {
      baslik: string;
      basliklar: string[];
      satirlar: string[][];
    }[];
    teknikNot?: string;
  }> = {
    "start-one": {
      baslik: "Start One",
      aciklama: t("prod.dogrudanEM.start-one.desc"),
      ozellikler: [
        t("prod.dogrudanEM.start-one.feat1")
      ],
      resim: "/start-one.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/start-one-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/start-one-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Termoplastik (ABS) - Metal / IP 55",
        "Kilitleme mekanizmasına sahip ana kesici",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Motor çalışıyor bilgisi için yeşil LED / Hatalar için Kırmızı LED",
        "Başlatma komutu için giriş",
        "Ana ekranda, Voltaj, Amper, Alarmlar, Olaylar ve Tarih & Zaman gösterimi",
        "Korumalar ve Hatalar",
        "Motor Aşırı akım koruması",
        "Kuru çalışma koruması",
        "Motor koruması için sigorta"
      ],
      uygulamaAlanlariResim: "/start-one-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Start One Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V)", "Güç (kW)", "HP", "Akım Max (A)", "Kutu Ölçüleri (HxLxW)", "Malzeme"],
          satirlar: [
            ["Start One - 0.37", "21001", "3-400", "0.37", "0.5", "4", "250x200x160", "ABS"],
            ["Start One - 0.55", "21002", "3-400", "0.55", "0.75", "6", "250x200x160", "ABS"],
            ["Start One - 0.75", "21003", "3-400", "0.75", "1", "8", "250x200x160", "ABS"],
            ["Start One - 1.1", "21004", "3-400", "1.1", "1.5", "10", "250x200x160", "ABS"],
            ["Start One - 1.5", "21005", "3-400", "1.5", "2", "16", "250x200x160", "ABS"],
            ["Start One - 2.2", "21006", "3-400", "2.2", "3", "18", "250x200x160", "ABS"],
            ["Start One - 3", "21007", "3-400", "3", "4", "25", "250x200x160", "ABS"],
            ["Start One - 4", "21008", "3-400", "4", "5.5", "25", "250x200x160", "ABS"],
            ["Start One - 5.5", "21009", "3-400", "5.5", "7.5", "32", "250x200x160", "ABS"]
          ]
        }
      ]
    },
    "direct-start": {
      baslik: "Direct Start",
      aciklama: t("prod.dogrudanEM.direct-start.desc"),
      ozellikler: [
        t("prod.dogrudanEM.direct-start.feat1")
      ],
      resim: "/direct-start-em.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/direct-start-em-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/direct-start-em-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal / IP 55",
        "Kilitleme mekanizmasına sahip ana kesici",
        "Güç Beslemesi 1-50/60Hz 230V ±",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Motor çalışıyor bilgisi için yeşil LED / Hatalar için Kırmızı LED",
        "Başlatma komutu için giriş",
        "Korumalar ve Hatalar",
        "Motor Aşırı akım koruması",
        "Faz kaybı ve faz sırası için koruma",
        "Kuru çalışma koruması",
        "Motor koruma sigortaları",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Haftalık olarak ayarlanabilen test"
      ],
      teknikVerilerCoklu: [
        {
          baslik: "Direct Start 1 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V)", "Güç (kW)", "HP", "Akım Aralığı (A)", "Max (A)", "Ölçüler (HxLxW)", "Malzeme"],
          satirlar: [
            ["Direct Start 1 - 0.37 Mono", "22001", "1-230", "0.37", "0.5", "4.2-5.7", "5.7", "310x250x130", "ABS"],
            ["Direct Start 1 - 0.55 Mono", "22002", "1-230", "0.55", "0.75", "5.7-7.6", "7.6", "310x250x130", "ABS"],
            ["Direct Start 1 - 0.75 Mono", "22003", "1-230", "0.75", "1", "7.6-9", "9", "310x250x130", "ABS"],
            ["Direct Start 1 - 1.1 Mono", "22004", "1-230", "1.1", "1.5", "10-12", "12", "310x250x130", "ABS"],
            ["Direct Start 1 - 1.5 Mono", "22005", "1-230", "1.5", "2", "13-16", "16", "310x250x130", "ABS"],
            ["Direct Start 1 - 2.2 Mono", "22006", "1-230", "2.2", "3", "16-20", "20", "310x250x130", "ABS"],
            ["Direct Start 1 - 0.37", "22007", "3-400", "0.37", "0.5", "1.0-1.3", "1.3", "310x250x130", "ABS"],
            ["Direct Start 1 - 0.55", "22008", "3-400", "0.55", "0.75", "1.7-2.3", "2.3", "310x250x130", "ABS"],
            ["Direct Start 1 - 0.75", "22009", "3-400", "0.75", "1", "2.3-3.1", "3.1", "310x250x130", "ABS"],
            ["Direct Start 1 - 1.1", "22010", "3-400", "1.1", "1.5", "2.3-3.1", "3.1", "310x250x130", "ABS"],
            ["Direct Start 1 - 1.5", "22011", "3-400", "1.5", "2", "3.1-4.2", "4.2", "310x250x130", "ABS"],
            ["Direct Start 1 - 2.2", "22012", "3-400", "2.2", "3", "5.7-7.6", "7.6", "310x250x130", "ABS"],
            ["Direct Start 1 - 3", "22013", "3-400", "3", "4", "7.6-9", "9", "310x250x130", "ABS"],
            ["Direct Start 1 - 4", "22014", "3-400", "4", "5.5", "7.6-9", "9", "310x250x130", "ABS"],
            ["Direct Start 1 - 5.5", "22015", "3-400", "5.5", "7.5", "10-12", "12", "310x250x130", "ABS"],
            ["Direct Start 1 - 7.5", "22016", "3-400", "7.5", "10", "13-16", "16", "310x250x130", "ABS"],
            ["Direct Start 1 - 9.6", "22017", "3-400", "9.6", "12.5", "16-20", "20", "310x250x130", "ABS"],
            ["Direct Start 1 - 11", "22018", "3-400", "11", "15", "20-24", "24", "310x250x130", "ABS"],
            ["Direct Start 1 - 15", "22019", "3-400", "11", "15", "29-32", "32", "400x300x175", "ABS"],
            ["Direct Start 1 - 18.5", "22020", "3-400", "18.5", "25", "35-38", "38", "400x300x175", "ABS"],
            ["Direct Start 1 - 22", "22021", "3-400", "22", "30", "44-50", "50", "600x400x220", "Metal"],
            ["Direct Start 1 - 30", "22022", "3-400", "30", "40", "57-60", "60", "600x400x220", "Metal"],
            ["Direct Start 1 - 37", "22023", "3-400", "37", "50", "65-78", "78", "600x400x220", "Metal"]
          ]
        },
        {
          baslik: "Direct Start 2 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V)", "Güç (kW)", "HP", "Akım Aralığı (A)", "Max (A)", "Ölçüler (HxLxW)", "Malzeme"],
          satirlar: [
            ["Direct Start 2 - 0.37 Mono", "22201", "1-230", "0.37", "0.5", "4.2-5.7", "5.7", "400x300x175", "ABS"],
            ["Direct Start 2 - 0.55 Mono", "22202", "1-230", "0.55", "0.75", "5.7-7.6", "7.6", "400x300x175", "ABS"],
            ["Direct Start 2 - 0.75 Mono", "22203", "1-230", "0.75", "1", "7.6-9", "9", "400x300x175", "ABS"],
            ["Direct Start 2 - 1.1 Mono", "22204", "1-230", "1.1", "1.5", "10-12", "12", "400x300x175", "ABS"],
            ["Direct Start 2 - 1.5 Mono", "22205", "1-230", "1.5", "2", "13-16", "16", "400x300x175", "ABS"],
            ["Direct Start 2 - 2.2 Mono", "22206", "1-230", "2.2", "3", "16-20", "20", "400x300x175", "ABS"],
            ["Direct Start 2 - 0.37", "22207", "3-400", "0.37", "0.5", "1.0-1.3", "1.3", "400x300x175", "ABS"],
            ["Direct Start 2 - 0.55", "22208", "3-400", "0.55", "0.75", "1.7-2.3", "2.3", "400x300x175", "ABS"],
            ["Direct Start 2 - 0.75", "22209", "3-400", "0.75", "1", "2.3-3.1", "3.1", "400x300x175", "ABS"],
            ["Direct Start 2 - 1.1", "22210", "3-400", "1.1", "1.5", "2.3-3.1", "3.1", "400x300x175", "ABS"],
            ["Direct Start 2 - 1.5", "22211", "3-400", "1.5", "2", "3.1-4.2", "4.2", "400x300x175", "ABS"],
            ["Direct Start 2 - 2.2", "22212", "3-400", "2.2", "3", "5.7-7.6", "7.6", "400x300x175", "ABS"],
            ["Direct Start 2 - 3", "22213", "3-400", "3", "4", "7.6-9", "9", "400x300x175", "ABS"],
            ["Direct Start 2 - 4", "22214", "3-400", "4", "5.5", "7.6-9", "9", "400x300x175", "ABS"],
            ["Direct Start 2 - 5.5", "22215", "3-400", "5.5", "7.5", "10-12", "12", "400x300x175", "ABS"],
            ["Direct Start 2 - 7.5", "22216", "3-400", "7.5", "10", "13-16", "16", "400x300x175", "ABS"],
            ["Direct Start 2 - 9.6", "22217", "3-400", "9.6", "12.5", "16-20", "20", "400x300x175", "ABS"],
            ["Direct Start 2 - 11", "22218", "3-400", "11", "15", "20-24", "24", "400x300x175", "ABS"],
            ["Direct Start 2 - 15", "22219", "3-400", "11", "15", "29-32", "32", "400x300x175", "ABS"],
            ["Direct Start 2 - 18.5", "22220", "3-400", "18.5", "25", "35-38", "38", "400x300x175", "ABS"],
            ["Direct Start 2 - 22", "22221", "3-400", "22", "30", "44-50", "50", "600x400x220", "Metal"],
            ["Direct Start 2 - 30", "22222", "3-400", "30", "40", "57-60", "60", "600x400x220", "Metal"],
            ["Direct Start 2 - 37", "22223", "3-400", "37", "50", "65-78", "78", "600x400x220", "Metal"]
          ]
        },
        {
          baslik: "Direct Start 3 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V)", "Güç (kW)", "HP", "Akım Aralığı (A)", "Max (A)", "Ölçüler (HxLxW)", "Malzeme"],
          satirlar: [
            ["Direct Start 3 - 0.37 Mono", "22301", "1-230", "0.37", "0.5", "4.2-5.7", "5.7", "600x400x220", "Metal"],
            ["Direct Start 3 - 0.55 Mono", "22301", "1-230", "0.55", "0.75", "5.7-7.6", "7.6", "600x400x220", "Metal"],
            ["Direct Start 3 - 0.75 Mono", "22301", "1-230", "0.75", "1", "7.6-9", "9", "600x400x220", "Metal"],
            ["Direct Start 3 - 1.1 Mono", "22301", "1-230", "1.1", "1.5", "10-12", "12", "600x400x220", "Metal"],
            ["Direct Start 3 - 1.5 Mono", "22301", "1-230", "1.5", "2", "13-16", "16", "600x400x220", "Metal"],
            ["Direct Start 3 - 2.2 Mono", "22301", "1-230", "2.2", "3", "16-20", "20", "600x400x220", "Metal"],
            ["Direct Start 3 - 0.37", "22301", "3-400", "0.37", "0.5", "1.0-1.3", "1.3", "600x400x220", "Metal"],
            ["Direct Start 3 - 0.55", "22301", "3-400", "0.55", "0.75", "1.7-2.3", "2.3", "600x400x220", "Metal"],
            ["Direct Start 3 - 0.75", "22301", "3-400", "0.75", "1", "2.3-3.1", "3.1", "600x400x220", "Metal"],
            ["Direct Start 3 - 1.1", "22301", "3-400", "1.1", "1.5", "2.3-3.1", "3.1", "600x400x220", "Metal"],
            ["Direct Start 3 - 1.5", "22301", "3-400", "1.5", "2", "3.1-4.2", "4.2", "600x400x220", "Metal"],
            ["Direct Start 3 - 2.2", "22301", "3-400", "2.2", "3", "5.7-7.6", "7.6", "600x400x220", "Metal"],
            ["Direct Start 3 - 3", "22301", "3-400", "3", "4", "7.6-9", "9", "600x400x220", "Metal"],
            ["Direct Start 3 - 4", "22301", "3-400", "4", "5.5", "7.6-9", "9", "600x400x220", "Metal"],
            ["Direct Start 3 - 5.5", "22301", "3-400", "5.5", "7.5", "10-12", "12", "600x400x220", "Metal"],
            ["Direct Start 3 - 7.5", "22301", "3-400", "7.5", "10", "13-16", "16", "600x400x220", "Metal"],
            ["Direct Start 3 - 9.6", "22301", "3-400", "9.6", "12.5", "16-20", "20", "600x400x220", "Metal"],
            ["Direct Start 3 - 11", "22301", "3-400", "11", "15", "20-24", "24", "600x400x220", "Metal"],
            ["Direct Start 3 - 15", "22301", "3-400", "11", "15", "29-32", "32", "600x400x220", "Metal"],
            ["Direct Start 3 - 18.5", "22301", "3-400", "18.5", "25", "35-38", "38", "600x400x220", "Metal"],
            ["Direct Start 3 - 22", "22301", "3-400", "22", "30", "44-50", "50", "600x400x220", "Metal"],
            ["Direct Start 3 - 30", "22301", "3-400", "30", "40", "57-60", "60", "700x500x260", "Metal"],
            ["Direct Start 3 - 37", "22301", "3-400", "37", "50", "65-78", "78", "700x500x260", "Metal"]
          ]
        },
        {
          baslik: "Direct Start 4 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V)", "Güç (kW)", "HP", "Akım Aralığı (A)", "Max (A)", "Ölçüler (HxLxW)", "Malzeme"],
          satirlar: [
            ["Direct Start 4 - 0.37", "22401", "3-400", "0.37", "0.5", "1.0-1.3", "1.3", "700x500x260", "Metal"],
            ["Direct Start 4 - 0.55", "22402", "3-400", "0.55", "0.75", "1.7-2.3", "2.3", "700x500x260", "Metal"],
            ["Direct Start 4 - 0.75", "22403", "3-400", "0.75", "1", "2.3-3.1", "3.1", "700x500x260", "Metal"],
            ["Direct Start 4 - 1.1", "22404", "3-400", "1.1", "1.5", "2.3-3.1", "3.1", "700x500x260", "Metal"],
            ["Direct Start 4 - 1.5", "22405", "3-400", "1.5", "2", "3.1-4.2", "4.2", "700x500x260", "Metal"],
            ["Direct Start 4 - 2.2", "22406", "3-400", "2.2", "3", "5.7-7.6", "7.6", "700x500x260", "Metal"],
            ["Direct Start 4 - 3", "22407", "3-400", "3", "4", "7.6-9", "9", "700x500x260", "Metal"],
            ["Direct Start 4 - 4", "22408", "3-400", "4", "5.5", "7.6-9", "9", "700x500x260", "Metal"],
            ["Direct Start 4 - 5.5", "22409", "3-400", "5.5", "7.5", "10-12", "12", "700x500x260", "Metal"],
            ["Direct Start 4 - 7.5", "22410", "3-400", "7.5", "10", "13-16", "16", "700x500x260", "Metal"],
            ["Direct Start 4 - 9.6", "22411", "3-400", "9.6", "12.5", "16-20", "20", "700x500x260", "Metal"],
            ["Direct Start 4 - 11", "22412", "3-400", "11", "15", "20-24", "24", "700x500x260", "Metal"],
            ["Direct Start 4 - 15", "22413", "3-400", "11", "15", "29-32", "32", "700x500x260", "Metal"],
            ["Direct Start 4 - 18.5", "22414", "3-400", "18.5", "25", "35-38", "38", "700x500x260", "Metal"],
            ["Direct Start 4 - 22", "22415", "3-400", "22", "30", "44-50", "50", "700x500x260", "Metal"],
            ["Direct Start 4 - 30", "22416", "3-400", "30", "40", "57-60", "60", "800x600x260", "Metal"],
            ["Direct Start 4 - 37", "22417", "3-400", "37", "50", "65-78", "78", "800x600x260", "Metal"]
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
          href="/urunler/akilli-kontrol-panolari/elektromekanik"
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
          {t("prod.akilli.dogrudanEM.title")}
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
              <div className="w-full" style={{ maxWidth: "1100px", marginTop: "40px", padding: "0 24px" }}>
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

export default function DogrudanYolVerme() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <DogrudanYolVermeInner />
    </Suspense>
  );
}
