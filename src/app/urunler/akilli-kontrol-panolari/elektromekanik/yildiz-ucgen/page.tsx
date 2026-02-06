"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "Star Delta Start", key: "star-delta-start" },
];

export default function YildizUcgenYolVerme() {
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
    "star-delta-start": {
      baslik: "Star Delta Start",
      aciklama: t("prod.yildizUcgenEM.star-delta-start.desc"),
      ozellikler: [
        t("prod.yildizUcgenEM.star-delta-start.feat1")
      ],
      resim: "/star-delta-start.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/star-delta-start-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/star-delta-start-kullanim.pdf" }
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
        "Yıldız Üçgen Kontaktörü AC3",
        "Haftalık ayarlanabilen test",
        "Selonoid valf çıkışı"
      ],
      uygulamaAlanlariResim: "/star-delta-start-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "Star Delta Start 1 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max (A)", "HxLxW (mm)", "Malzeme"],
          satirlar: [
            ["5.5", "23001", "3-400", "5.5", "7.5", "7.6-10", "15", "400x300x175", "ABS"],
            ["7.5", "23002", "3-400", "7.5", "10", "7.6-10", "17", "400x300x175", "ABS"],
            ["11", "23003", "3-400", "11", "15", "13-16", "24", "400x300x175", "ABS"],
            ["15", "23004", "3-400", "11", "15", "16-20", "31", "600x400x220", "Metal"],
            ["18.5", "23005", "4-400", "18.5", "25", "20-24", "38", "600x400x220", "Metal"],
            ["22", "23006", "5-400", "22", "30", "29-35", "50", "600x400x220", "Metal"],
            ["30", "23007", "6-400", "30", "40", "35-38", "60", "600x400x220", "Metal"],
            ["37", "23008", "7-400", "37", "50", "44-53", "75", "600x400x220", "Metal"],
            ["45", "23009", "8-400", "45", "60", "50-60", "100", "600x400x220", "Metal"],
            ["55", "23010", "9-400", "55", "75", "65-78", "124", "700x500x260", "Metal"],
            ["75", "23011", "10-400", "75", "100", "75-87", "135", "700x500x260", "Metal"],
            ["90", "23012", "11-400", "90", "125", "80-110", "155", "800x600x260", "Metal"],
            ["110", "23013", "12-400", "110", "150", "100-135", "200", "800x600x260", "Metal"],
            ["132", "23014", "13-400", "132", "180", "110-142", "241", "1000x700x320", "Metal"],
            ["160", "23015", "14-400", "160", "220", "150-200", "300", "1000x700x320", "Metal"],
            ["200", "23016", "15-400", "185", "250", "115-380", "410", "1200x800x320", "Metal"]
          ]
        },
        {
          baslik: "Star Delta Start 2 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max (A)", "HxLxW (mm)", "Malzeme"],
          satirlar: [
            ["5.5", "23201", "3-400", "5.5", "7.5", "7.6-10", "15", "600x400x220", "Metal"],
            ["7.5", "23202", "3-400", "7.5", "10", "7.6-10", "17", "600x400x220", "Metal"],
            ["11", "23203", "3-400", "11", "15", "13-16", "24", "600x400x220", "Metal"],
            ["15", "23204", "3-400", "11", "15", "16-20", "31", "600x400x220", "Metal"],
            ["18.5", "23205", "4-400", "18.5", "25", "20-24", "38", "700x500x260", "Metal"],
            ["22", "23206", "5-400", "22", "30", "29-35", "50", "700x500x260", "Metal"],
            ["30", "23207", "6-400", "30", "40", "35-38", "60", "800x600x260", "Metal"],
            ["37", "23208", "7-400", "37", "50", "44-53", "75", "800x600x260", "Metal"],
            ["45", "23209", "8-400", "45", "60", "50-60", "100", "1000x700x320", "Metal"],
            ["55", "23210", "9-400", "55", "75", "65-78", "124", "1000x700x320", "Metal"],
            ["75", "23211", "10-400", "75", "100", "75-87", "135", "1200x800x320", "Metal"],
            ["90", "23212", "11-400", "90", "125", "80-110", "155", "1200x800x320", "Metal"],
            ["110", "23213", "12-400", "110", "150", "100-135", "200", "1200x800x320", "Metal"],
            ["132", "23214", "13-400", "132", "180", "110-142", "241", "1600x900x400", "Metal"],
            ["160", "23215", "14-400", "160", "220", "150-200", "300", "1600x900x400", "Metal"],
            ["200", "23216", "15-400", "185", "250", "115-380", "410", "1800x1100x450", "Metal"]
          ]
        },
        {
          baslik: "Star Delta Start 3 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max (A)", "HxLxW (mm)", "Malzeme"],
          satirlar: [
            ["5.5", "23301", "3-400", "5.5", "7.5", "7.6-10", "15", "700x500x260", "Metal"],
            ["7.5", "23302", "3-400", "7.5", "10", "7.6-10", "17", "700x500x260", "Metal"],
            ["11", "23303", "3-400", "11", "15", "13-16", "24", "700x500x260", "Metal"],
            ["15", "23304", "3-400", "11", "15", "16-20", "31", "700x500x260", "Metal"],
            ["18.5", "23305", "4-400", "18.5", "25", "20-24", "38", "800x600x260", "Metal"],
            ["22", "23306", "5-400", "22", "30", "29-35", "50", "800x600x260", "Metal"],
            ["30", "23307", "6-400", "30", "40", "35-38", "60", "1000x700x320", "Metal"],
            ["37", "23308", "7-400", "37", "50", "44-53", "75", "1000x700x320", "Metal"],
            ["45", "23309", "8-400", "45", "60", "50-60", "100", "1200x800x320", "Metal"],
            ["55", "23310", "9-400", "55", "75", "65-78", "124", "1200x800x320", "Metal"],
            ["75", "23311", "10-400", "75", "100", "75-87", "135", "1600x900x400", "Metal"],
            ["90", "23312", "11-400", "90", "125", "80-110", "155", "1600x900x400", "Metal"],
            ["110", "23313", "12-400", "110", "150", "100-135", "200", "1800x1100x450", "Metal"],
            ["132", "23314", "13-400", "132", "180", "110-142", "241", "1800x1100x450", "Metal"],
            ["160", "23315", "14-400", "160", "220", "150-200", "300", "1800x1100x450", "Metal"],
            ["200", "23316", "15-400", "185", "250", "115-380", "410", "2100x1400x500", "Metal"]
          ]
        },
        {
          baslik: "Star Delta Start 4 Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max (A)", "HxLxW (mm)", "Malzeme"],
          satirlar: [
            ["5.5", "23401", "3-400", "5.5", "7.5", "7.6-10", "15", "800x600x260", "Metal"],
            ["7.5", "23402", "3-400", "7.5", "10", "7.6-10", "17", "800x600x260", "Metal"],
            ["11", "23403", "3-400", "11", "15", "13-16", "24", "800x600x260", "Metal"],
            ["15", "23404", "3-400", "11", "15", "16-20", "31", "800x600x260", "Metal"],
            ["18.5", "23405", "4-400", "18.5", "25", "20-24", "38", "1000x700x320", "Metal"],
            ["22", "23406", "5-400", "22", "30", "29-35", "50", "1000x700x320", "Metal"],
            ["30", "23407", "6-400", "30", "40", "35-38", "60", "1200x800x340", "Metal"],
            ["37", "23408", "7-400", "37", "50", "44-53", "75", "1200x800x340", "Metal"],
            ["45", "23409", "8-400", "45", "60", "50-60", "100", "1200x800x340", "Metal"],
            ["55", "23410", "9-400", "55", "75", "65-78", "124", "1750x940x450", "Metal"],
            ["75", "23411", "10-400", "75", "100", "75-87", "135", "1750x940x450", "Metal"],
            ["90", "23412", "11-400", "90", "125", "80-110", "155", "2100x1400x500", "Metal"],
            ["110", "23413", "12-400", "110", "150", "100-135", "200", "2100x1400x500", "Metal"],
            ["132", "23414", "13-400", "132", "180", "110-142", "241", "2100x1400x500", "Metal"],
            ["160", "23415", "14-400", "160", "220", "150-200", "300", "2100x1400x500", "Metal"],
            ["200", "23416", "15-400", "185", "250", "115-380", "410", "2100x1400x500", "Metal"]
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
          {t("prod.akilli.yildizUcgenEM.title")}
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


