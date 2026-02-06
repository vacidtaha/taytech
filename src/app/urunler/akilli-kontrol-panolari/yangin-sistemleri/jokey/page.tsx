"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "Smart Jockey EN Serisi", key: "smart-jockey-en" },
  { id: 2, label: "Jockey EN Serisi", key: "jockey-en" },
];

export default function JokeySerisi() {
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
    "smart-jockey-en": {
      baslik: "Smart Jockey EN Serisi",
      aciklama: t("prod.jokey.smart-jockey-en.desc"),
      ozellikler: [
        t("prod.jokey.smart-jockey-en.feat1"),
        t("prod.jokey.smart-jockey-en.feat2"),
        t("prod.jokey.smart-jockey-en.feat3")
      ],
      resim: "/smart-jockey-en.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/smart-jockey-en-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/smart-jockey-en-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal / IP 55",
        "Kilitleme mekanizmasına sahip ana kesici",
        "128 x 64 LCD Grafik Ekran",
        "Motor çalışıyor bilgisi için yeşil LED / Hatalar için Kırmızı LED",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Başlatma komutu için giriş",
        "Alarmlar ve sinyaller",
        "Motor Aşırıakım (Ayarlanabilir)",
        "Motor düşük akım (Ayarlanabilir)",
        "Faz kaybı hatası (Ayarlanabilir)",
        "Faz sırası hatası (Ayarlanabilir)",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlatma zamanı",
        "MODBus (RS485)",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
        "Haftalık otomatik test",
        "Bakım zamanı ve mesajların gösterimi",
        "Alarm çıkışları (NC-5A/250V)"
      ],
      teknikVerilerCoklu: [
        {
          baslik: "Smart Jockey EN Serisi Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max (A)", "HxLxW (mm)", "Malzeme"],
          satirlar: [
            ["Smart Jockey/EN-4", "25301", "3-400", "4", "5.5", "7.6-9", "9", "400x300x175", "Metal"],
            ["Smart Jockey/EN-5.5", "25302", "3-400", "5.5", "7.5", "10-12", "12", "400x300x175", "Metal"],
            ["Smart Jockey/EN-7.5", "25303", "3-400", "7.5", "10", "2.6-16", "16", "400x300x175", "Metal"],
            ["Smart Jockey/EN-11", "25304", "3-400", "11", "15", "16-25", "25", "400x300x175", "Metal"],
            ["Smart Jockey/EN-15", "25305", "3-400", "15", "20", "16-32", "32", "400x300x175", "Metal"]
          ]
        }
      ]
    },
    "jockey-en": {
      baslik: "Jockey EN Serisi",
      aciklama: t("prod.jokey.jockey-en.desc"),
      ozellikler: [
        t("prod.jokey.jockey-en.feat1"),
        t("prod.jokey.jockey-en.feat2")
      ],
      resim: "/jockey-en.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/jockey-en-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/jockey-en-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal / IP 55",
        "Kilitleme mekanizmasına sahip ana kesici",
        "Motor çalışıyor bilgisi için yeşil LED / Hatalar için Kırmızı LED",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Başlatma komutu için giriş",
        "Alarmlar ve Sinyaller",
        "Motor Aşırıakım (Ayarlanabilir)",
        "Motor düşük akım (Ayarlanabilir)",
        "Faz kaybı hatası (Ayarlanabilir)",
        "Faz sırası hatası (Ayarlanabilir)",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Motor başlatma zamanı",
        "Haftalık otomatik test",
        "Alarm çıkışları (NC-5A/250V)"
      ],
      teknikVerilerCoklu: [
        {
          baslik: "Jockey EN Serisi Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max (A)", "Ölçüler (HxLxW)", "Malzeme"],
          satirlar: [
            ["Jockey/EN - 0.55", "25401", "3-400", "0.55", "0.75", "1.7-2.3", "2.3", "400x300x175", "Metal"],
            ["Jockey/EN - 0.75", "25402", "3-400", "0.75", "1", "3.1-4.2", "4.2", "400x300x175", "Metal"],
            ["Jockey/EN - 1.1", "25403", "3-400", "1.1", "1.5", "3.1-4.2", "4.2", "400x300x175", "Metal"],
            ["Jockey/EN - 1.5", "25404", "3-400", "1.5", "2", "5.7-7.6", "7.6", "400x300x175", "Metal"],
            ["Jockey/EN - 2.2", "25405", "3-400", "2.2", "3", "7.6-9", "9", "400x300x175", "Metal"],
            ["Jockey/EN - 3", "25406", "3-400", "3", "4", "10-12", "12", "400x300x175", "Metal"],
            ["Jockey/EN - 4", "25407", "3-400", "4", "5.5", "10-12", "12", "400x300x175", "Metal"],
            ["Jockey/EN - 5.5", "25408", "3-400", "5.5", "7.5", "13-16", "16", "400x300x175", "Metal"],
            ["Jockey/EN - 7.5", "25409", "3-400", "7.5", "10", "16-20", "20", "400x300x175", "Metal"],
            ["Jockey/EN - 9.2", "25410", "3-400", "9.2", "12.5", "20-24", "24", "400x300x175", "Metal"],
            ["Jockey/EN - 11", "25411", "3-400", "11", "15", "29-32", "32", "400x300x175", "Metal"],
            ["Jockey/EN - 15", "25412", "3-400", "15", "20", "35-38", "38", "400x300x175", "Metal"]
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
          {t("prod.akilli.jokey.title")}
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

