"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "Direct EN Serisi", key: "direct-en" },
  { id: 2, label: "Star Delta EN", key: "star-delta-en" },
];

function ElektrikliInner() {
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
    "direct-en": {
      baslik: "Direct EN Serisi",
      aciklama: t("prod.elektrikli.direct-en.desc"),
      ozellikler: [
        t("prod.elektrikli.direct-en.feat1"),
        t("prod.elektrikli.direct-en.feat2"),
        t("prod.elektrikli.direct-en.feat3")
      ],
      resim: "/direct-en.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/direct-en-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/direct-en-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal / IP 55",
        "Kilitleme mekanizmasına sahip ana kesici",
        "Otomatik / Manuel / Off Modu",
        "128 x 64 LCD Grafik Ekran",
        "Motor çalışıyor bilgisi için yeşil LED / Hatalar için Kırmızı LED",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Başlatma komutu için giriş",
        "Lambaların testi için tuş",
        "Manuel Testte pompaları başlatmak ve durdurmak için buton",
        "Alarmlar ve sinyaller",
        "Motor Aşırıakım (Ayarlanabilir)",
        "Motor düşük akım (Ayarlanabilir)",
        "Faz kaybı hatası (Ayarlanabilir)",
        "Faz sırası hatası (Ayarlanabilir)",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlatma zamanı",
        "AC Güç var bilgisi",
        "Pompa çalışması sebebi bilgisi",
        "Pompa Başlatma Hatası",
        "Pompa Çalışıyor bilgisi",
        "MODBus (RS485)",
        "Hat Kontaktörü AC3",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "Haftalık otomatik test",
        "Bakım zamanı ve mesajların gösterimi",
        "Selonoid valf çıkışı",
        "Alarm çıkışları (NC-5A/250V)"
      ],
      teknikVerilerCoklu: [
        {
          baslik: "Direct EN Serisi Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Max Akım (A)", "Kutu Ölçüleri (HxLxW)", "Malzeme"],
          satirlar: [
            ["Direct-EN/4", "25001", "3-400", "4", "5.5", "9", "600x400x200", "Metal"],
            ["Direct-EN/5.5", "25002", "3-400", "5.5", "7.5", "12", "600x400x200", "Metal"],
            ["Direct-EN/7.5", "25003", "3-400", "7.5", "11", "16", "600x400x200", "Metal"],
            ["Direct-EN/9.2", "25004", "4-400", "9.2", "12.5", "20", "600x400x200", "Metal"],
            ["Direct-EN/11", "25005", "3-400", "11", "15", "25", "600x400x200", "Metal"],
            ["Direct-EN/15", "25006", "3-400", "15", "20", "32", "600x400x200", "Metal"],
            ["Direct-EN/18.5", "25007", "3-400", "18.5", "25", "40", "600x400x200", "Metal"],
            ["Direct-EN/22", "25008", "3-400", "22", "30", "50", "600x400x200", "Metal"]
          ]
        }
      ]
    },
    "star-delta-en": {
      baslik: "Star Delta EN",
      aciklama: t("prod.elektrikli.star-delta-en.desc"),
      ozellikler: [
        t("prod.elektrikli.star-delta-en.feat1"),
        t("prod.elektrikli.star-delta-en.feat2"),
        t("prod.elektrikli.star-delta-en.feat3")
      ],
      resim: "/star-delta-en.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/star-delta-en-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/star-delta-en-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal / IP 55",
        "Kilitleme mekanizmasına sahip ana kesici",
        "Otomatik / Manuel / Off Modu",
        "128 x 64 LCD Grafik Ekran",
        "Motor çalışıyor bilgisi için yeşil LED / Hatalar için Kırmızı LED",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Başlatma komutu için giriş",
        "Lambaların testi için tuş",
        "Manuel Testte pompaları başlatmak ve durdurmak için buton",
        "Alarmlar ve sinyaller",
        "Motor Aşırıakım (Ayarlanabilir)",
        "Motor düşük akım (Ayarlanabilir)",
        "Faz kaybı hatası (Ayarlanabilir)",
        "Faz sırası hatası (Ayarlanabilir)",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlatma zamanı",
        "AC Güç var bilgisi",
        "Pompa çalışması sebebi bilgisi",
        "Pompa Başlatma Hatası",
        "Pompa Çalışıyor bilgisi",
        "MODBus (RS485)",
        "Yıldız / Üçgen Kontaktörü AC3",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "Haftalık otomatik test",
        "Bakım zamanı ve mesajların gösterimi",
        "Selonoid valf çıkışı"
      ],
      teknikVerilerCoklu: [
        {
          baslik: "Star Delta EN Serisi Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Max (A)", "H x L x W", "Malzeme"],
          satirlar: [
            ["Stardelta-EN/5.5", "25101", "3-400", "5.5", "7.5", "15", "600x400x200", "Metal"],
            ["Stardelta-EN/7.5", "25102", "3-400", "7.5", "10", "17", "600x400x200", "Metal"],
            ["Stardelta-EN/11", "25103", "3-400", "11", "15", "24", "600x400x200", "Metal"],
            ["Stardelta-EN/15", "25104", "3-400", "11", "15", "31", "600x400x200", "Metal"],
            ["Stardelta-EN/18.5", "25105", "3-400", "18.5", "25", "38", "600x400x200", "Metal"],
            ["Stardelta-EN/22", "25106", "3-400", "22", "30", "50", "600x400x200", "Metal"],
            ["Stardelta-EN/30", "25107", "3-400", "30", "40", "60", "700x500x240", "Metal"],
            ["Stardelta-EN/37", "25108", "3-400", "37", "50", "75", "700x500x240", "Metal"],
            ["Stardelta-EN/45", "25109", "3-400", "45", "60", "100", "700x500x240", "Metal"],
            ["Stardelta-EN/55", "25110", "3-400", "55", "75", "124", "700x500x240", "Metal"],
            ["Stardelta-EN/75", "25111", "3-400", "75", "100", "135", "800x600x260", "Metal"],
            ["Stardelta-EN/90", "25112", "3-400", "90", "125", "155", "800x600x260", "Metal"],
            ["Stardelta-EN/110", "25113", "3-400", "110", "150", "200", "800x600x260", "Metal"],
            ["Stardelta-EN/132", "25114", "3-400", "132", "180", "241", "1000x700x320", "Metal"],
            ["Stardelta-EN/160", "25115", "3-400", "160", "220", "300", "1200x800x340", "Metal"],
            ["Stardelta-EN/200", "25116", "3-400", "185", "250", "410", "1300x900x380", "Metal"]
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
          href="/urunler/akilli-kontrol-panolari/yangin-sistemleri"
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
          {t("prod.akilli.elektrikli.title")}
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

export default function Elektrikli() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <ElektrikliInner />
    </Suspense>
  );
}
