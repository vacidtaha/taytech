"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "Smart Exclusive S", key: "smart-exclusive-s" },
];

function YildizUcgenYolVermeInner() {
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
    "smart-exclusive-s": {
      baslik: "Smart Exclusive S",
      aciklama: t("prod.yildizUcgen.smart-exclusive-s.desc"),
      ozellikler: [
        t("prod.yildizUcgen.smart-exclusive-s.feat1"),
        t("prod.yildizUcgen.smart-exclusive-s.feat2"),
        t("prod.yildizUcgen.smart-exclusive-s.feat3")
      ],
      resim: "/smart-exclusive-s.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-exclusive-s-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-exclusive-s-kullanim.pdf" }
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
        "Ayarlanabilir haftalık test",
        "MODBus Bağlantısı",
        "Selonoid valve çıkışı"
      ],
      uygulamaAlanlariResim: "/smart-exclusive-s-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Smart Exclusive S 1 Teknik Veriler",
          basliklar: ["Model", "COD", "Güç (kW)", "HP", "Akım Aralığı (A)", "Kutu Ölçüleri (HxLxW)", "Malzeme"],
          satirlar: [
            ["Exclusive S 1 - 7.5 / Tri", "16001", "7.5", "10", "0-15.8", "400x300x175", "ABS"],
            ["Exclusive S 1 - 11 / Tri", "16002", "11", "15", "0-25", "400x300x175", "ABS"],
            ["Exclusive S 1 - 15 / Tri", "16003", "15", "20", "0-31.9", "600x400x200", "Metal"],
            ["Exclusive S 1 - 18.5 / Tri", "16004", "18.5", "25", "0-37.1", "600x400x200", "Metal"],
            ["Exclusive S 1 - 22 / Tri", "16005", "22", "30", "0-42.7", "600x400x200", "Metal"],
            ["Exclusive S 1 - 30 / Tri", "16006", "30", "40", "0-57.6", "600x400x200", "Metal"],
            ["Exclusive S 1 - 37 / Tri", "16007", "37", "50", "0-70.2", "600x400x200", "Metal"],
            ["Exclusive S 1 - 45 / Tri", "16008", "45", "60", "0-83.5", "700x500x200", "Metal"],
            ["Exclusive S 1 - 55 / Tri", "16009", "55", "75", "0-100.9", "700x500x200", "Metal"],
            ["Exclusive S 1 - 75 / Tri", "16010", "75", "100", "0-140.7", "700x500x200", "Metal"],
            ["Exclusive S 1 - 90 / Tri", "16011", "90", "125", "0-165.1", "800x600x290", "Metal"],
            ["Exclusive S 1 - 110 / Tri", "16012", "110", "150", "0-201.9", "800x600x290", "Metal"],
            ["Exclusive S 1 - 132 / Tri", "16013", "132", "180", "0-242.2", "1000x700x320", "Metal"],
            ["Exclusive S 1 - 160 / Tri", "16014", "160", "220", "0-290.6", "1000x700x320", "Metal"],
            ["Exclusive S 1 - 185 / Tri", "16015", "185", "250", "0-332.4", "1200x800x340", "Metal"],
            ["Exclusive S 1 - 200 / Tri", "16016", "200", "270", "0-355.4", "1200x800x340", "Metal"],
            ["Exclusive S 1 - 250 / Tri", "16017", "250", "340", "0-444.3", "1200x800x340", "Metal"],
            ["Exclusive S 1 - 315 / Tri", "16018", "315", "430", "0-553.6", "1300x900x360", "Metal"],
            ["Exclusive S 1 - 355 / Tri", "16019", "355", "485", "0-623.9", "1300x900x360", "Metal"],
            ["Exclusive S 1 - 400 / Tri", "16020", "400", "544", "0-703", "1300x900x360", "Metal"]
          ]
        },
        {
          baslik: "Smart Exclusive S 2 Teknik Veriler",
          basliklar: ["Model", "COD", "Güç (kW)", "HP", "Akım Aralığı (A)", "Kutu Ölçüleri (HxLxW)", "Malzeme"],
          satirlar: [
            ["Exclusive S 2 - 7.5 / Tri", "16201", "7.5", "10", "0-15.8", "600x400x200", "Metal"],
            ["Exclusive S 2 - 11 / Tri", "16202", "11", "15", "0-25", "600x400x200", "Metal"],
            ["Exclusive S 2 - 15 / Tri", "16203", "15", "20", "0-31.9", "600x400x200", "Metal"],
            ["Exclusive S 2 - 18.5 / Tri", "16204", "18.5", "25", "0-37.1", "600x400x200", "Metal"],
            ["Exclusive S 2 - 22 / Tri", "16205", "22", "30", "0-42.7", "700x500x260", "Metal"],
            ["Exclusive S 2 - 30 / Tri", "16206", "30", "40", "0-57.6", "700x500x260", "Metal"],
            ["Exclusive S 2 - 37 / Tri", "16207", "37", "50", "0-70.2", "800x600x290", "Metal"],
            ["Exclusive S 2 - 45 / Tri", "16208", "45", "60", "0-83.5", "1000x700x320", "Metal"],
            ["Exclusive S 2 - 55 / Tri", "16209", "55", "75", "0-100.9", "1000x700x320", "Metal"],
            ["Exclusive S 2 - 75 / Tri", "16210", "75", "100", "0-140.7", "1200x800x340", "Metal"],
            ["Exclusive S 2 - 90 / Tri", "16211", "90", "125", "0-165.1", "1400x800x340", "Metal"],
            ["Exclusive S 2 - 110 / Tri", "16212", "110", "150", "0-201.9", "1400x800x340", "Metal"],
            ["Exclusive S 2 - 132 / Tri", "16213", "132", "180", "0-242.2", "1800x950x360", "Metal"],
            ["Exclusive S 2 - 160 / Tri", "16214", "160", "220", "0-290.6", "1800x950x360", "Metal"],
            ["Exclusive S 2 - 185 / Tri", "16215", "185", "250", "0-332.4", "2000x1000x420", "Metal"],
            ["Exclusive S 2 - 200 / Tri", "16216", "200", "270", "0-355.4", "2000x1000x420", "Metal"],
            ["Exclusive S 2 - 250 / Tri", "16217", "250", "340", "0-444.3", "2000x1000x420", "Metal"],
            ["Exclusive S 2 - 315 / Tri", "16218", "315", "430", "0-553.6", "2100x1600x500", "Metal"],
            ["Exclusive S 2 - 355 / Tri", "16219", "355", "485", "0-623.9", "2100x1600x500", "Metal"],
            ["Exclusive S 2 - 400 / Tri", "16220", "400", "544", "0-703", "2100x1600x500", "Metal"]
          ]
        },
        {
          baslik: "Smart Exclusive S 3 Teknik Veriler",
          basliklar: ["Model", "COD", "Güç (kW)", "HP", "Akım Aralığı (A)", "Kutu Ölçüleri (HxLxW)", "Malzeme"],
          satirlar: [
            ["Exclusive S 3 - 7.5 / Tri", "16301", "7.5", "10", "0-15.8", "700x500x260", "Metal"],
            ["Exclusive S 3 - 11 / Tri", "16302", "11", "15", "0-25", "700x500x260", "Metal"],
            ["Exclusive S 3 - 15 / Tri", "16303", "15", "20", "0-31.9", "800x600x290", "Metal"],
            ["Exclusive S 3 - 18.5 / Tri", "16304", "18.5", "25", "0-37.1", "1000x700x320", "Metal"],
            ["Exclusive S 3 - 22 / Tri", "16305", "22", "30", "0-42.7", "1000x700x320", "Metal"],
            ["Exclusive S 3 - 30 / Tri", "16306", "30", "40", "0-57.6", "1200x800x340", "Metal"],
            ["Exclusive S 3 - 37 / Tri", "16307", "37", "50", "0-70.2", "1400x800x340", "Metal"],
            ["Exclusive S 3 - 45 / Tri", "16308", "45", "60", "0-83.5", "1400x800x340", "Metal"],
            ["Exclusive S 3 - 55 / Tri", "16309", "55", "75", "0-100.9", "1800x950x360", "Metal"],
            ["Exclusive S 3 - 75 / Tri", "16310", "75", "100", "0-140.7", "1800x950x360", "Metal"],
            ["Exclusive S 3 - 90 / Tri", "16311", "90", "125", "0-165.1", "2000x1200x420", "Metal"],
            ["Exclusive S 3 - 110 / Tri", "16312", "110", "150", "0-201.9", "2000x1200x420", "Metal"],
            ["Exclusive S 3 - 132 / Tri", "16313", "132", "180", "0-242.2", "2000x1200x420", "Metal"],
            ["Exclusive S 3 - 160 / Tri", "16314", "160", "220", "0-290.6", "2000x1600x500", "Metal"],
            ["Exclusive S 3 - 185 / Tri", "16315", "185", "250", "0-332.4", "2000x1600x500", "Metal"],
            ["Exclusive S 3 - 200 / Tri", "16316", "200", "270", "0-355.4", "2000x1600x500", "Metal"],
            ["Exclusive S 3 - 250 / Tri", "16317", "250", "340", "0-444.3", "2000x1600x500", "Metal"],
            ["Exclusive S 3 - 315 / Tri", "16318", "315", "430", "0-553.6", "2200x1600x550", "Metal"],
            ["Exclusive S 3 - 355 / Tri", "16319", "355", "485", "0-623.9", "2200x1600x550", "Metal"],
            ["Exclusive S 3 - 400 / Tri", "16320", "400", "544", "0-703", "2200x1600x550", "Metal"]
          ]
        },
        {
          baslik: "Smart Exclusive S 4 Teknik Veriler",
          basliklar: ["Model", "COD", "Güç (kW)", "HP", "Akım Aralığı (A)", "Kutu Ölçüleri (HxLxW)", "Malzeme"],
          satirlar: [
            ["Exclusive S 4 - 7.5 / Tri", "16401", "7.5", "10", "0-15.8", "800x600x290", "Metal"],
            ["Exclusive S 4 - 11 / Tri", "16402", "11", "15", "0-25", "800x600x290", "Metal"],
            ["Exclusive S 4 - 15 / Tri", "16403", "15", "20", "0-31.9", "800x600x290", "Metal"],
            ["Exclusive S 4 - 18.5 / Tri", "16404", "18.5", "25", "0-37.1", "1000x700x320", "Metal"],
            ["Exclusive S 4 - 22 / Tri", "16405", "22", "30", "0-42.7", "1000x700x320", "Metal"],
            ["Exclusive S 4 - 30 / Tri", "16406", "30", "40", "0-57.6", "1200x800x340", "Metal"],
            ["Exclusive S 4 - 37 / Tri", "16407", "37", "50", "0-70.2", "1400x800x340", "Metal"],
            ["Exclusive S 4 - 45 / Tri", "16408", "45", "60", "0-83.5", "1400x800x340", "Metal"],
            ["Exclusive S 4 - 55 / Tri", "16409", "55", "75", "0-100.9", "1800x950x360", "Metal"],
            ["Exclusive S 4 - 75 / Tri", "16410", "75", "100", "0-140.7", "1800x950x360", "Metal"],
            ["Exclusive S 4 - 90 / Tri", "16411", "90", "125", "0-165.1", "2000x1600x500", "Metal"],
            ["Exclusive S 4 - 110 / Tri", "16412", "110", "150", "0-201.9", "2000x1600x500", "Metal"],
            ["Exclusive S 4 - 132 / Tri", "16413", "132", "180", "0-242.2", "2000x1600x500", "Metal"],
            ["Exclusive S 4 - 160 / Tri", "16414", "160", "220", "0-290.6", "2200x1600x550", "Metal"],
            ["Exclusive S 4 - 185 / Tri", "16415", "185", "250", "0-332.4", "2200x1600x550", "Metal"],
            ["Exclusive S 4 - 200 / Tri", "16416", "200", "270", "0-355.4", "2200x1600x550", "Metal"],
            ["Exclusive S 4 - 250 / Tri", "16417", "250", "340", "0-444.3", "2200x1600x550", "Metal"],
            ["Exclusive S 4 - 315 / Tri", "16418", "315", "430", "0-553.6", "2400x1800x600", "Metal"],
            ["Exclusive S 4 - 355 / Tri", "16419", "355", "485", "0-623.9", "2400x1800x600", "Metal"],
            ["Exclusive S 4 - 400 / Tri", "16420", "400", "544", "0-703", "2400x1800x600", "Metal"]
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
          {t("prod.akilli.yildizUcgen.title")}
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

export default function YildizUcgenYolVerme() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <YildizUcgenYolVermeInner />
    </Suspense>
  );
}
