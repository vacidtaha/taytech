"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "PsTx", key: "pstx" },
  { id: 2, label: "PsE", key: "pse" },
];

function SoftStarterYolVermeInner() {
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
    "pstx": {
      baslik: "PsTx",
      aciklama: t("prod.softStarter.pstx.desc"),
      ozellikler: [
        t("prod.softStarter.pstx.feat1"),
        t("prod.softStarter.pstx.feat2"),
        t("prod.softStarter.pstx.feat3")
      ],
      uygulamaAlanlari: [
        "Hidrofor Pompaları",
        "Endüstriyel Pompalar",
        "HVAC Sistemleri",
        "Atık Su Pompalar"
      ],
      resim: "/pstx.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/pstx-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/pstx-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal Kutu / IP 55",
        "Grafik ekran ve navigasyon tuşları, ayrılabilir ekran sayesinde kabin kapağına monte edilebilir",
        "Kilitleme mekanizmasına sahip yük kesici",
        "Otomatik / Manuel Anahtar",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Kuru çalışma koruması",
        "Termal ve Manyetik koruma",
        "Cos Fi Kontrolü",
        "Toprak Hatası",
        "BMS Sistemi hata kayıt için kuru kontak çıkışı",
        "Tork sınırlama ve kontrol",
        "MODBus (RS485)",
        "Acil Durum Modu",
        "17 Dil Seçeneği",
        "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
        "Kabin içi Havalandırma"
      ],
      uygulamaAlanlariResim: "/pstx-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "PsTx Soft Starter Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max Akım (A)", "H", "L", "W", "Malzeme"],
          satirlar: [
            ["PsTx - 15", "20301", "3-400", "15", "20", "9.0-30", "30", "600", "400", "260", "Metal"],
            ["PsTx - 18.5", "20302", "3-400", "18.5", "25", "11.1-37", "37", "600", "400", "260", "Metal"],
            ["PsTx - 22", "20303", "3-400", "22", "30", "13.5-45", "45", "600", "400", "260", "Metal"],
            ["PsTx - 30", "20304", "3-400", "30", "40", "18-60", "60", "700", "500", "260", "Metal"],
            ["PsTx - 37", "20305", "3-400", "37", "50", "21.6-72", "72", "700", "500", "260", "Metal"],
            ["PsTx - 45", "20306", "3-400", "45", "60", "22.5-85", "85", "700", "500", "260", "Metal"],
            ["PsTx - 55", "20307", "3-400", "55", "75", "31.8-106", "106", "700", "500", "260", "Metal"],
            ["PsTx - 75", "20308", "3-400", "75", "100", "42.9-143", "143", "700", "500", "260", "Metal"],
            ["PsTx - 90", "20309", "3-400", "90", "125", "51.3-171", "171", "700", "500", "260", "Metal"],
            ["PsTx - 110", "20310", "3-400", "110", "150", "63-210", "210", "1000", "700", "320", "Metal"],
            ["PsTx - 132", "20311", "3-400", "132", "180", "75-250", "250", "1000", "700", "320", "Metal"],
            ["PsTx - 160", "20312", "3-400", "160", "220", "90-300", "300", "1000", "700", "320", "Metal"],
            ["PsTx - 200", "20313", "3-400", "200", "270", "111-370", "370", "1000", "700", "320", "Metal"],
            ["PsTx - 250", "20314", "3-400", "250", "340", "141-470", "470", "1000", "700", "320", "Metal"],
            ["PsTx - 315", "20315", "3-400", "315", "430", "171-570", "570", "1000", "700", "320", "Metal"],
            ["PsTx - 400", "20316", "3-400", "355", "485", "216-720", "720", "1000", "700", "320", "Metal"]
          ]
        }
      ]
    },
    "pse": {
      baslik: "PsE",
      aciklama: t("prod.softStarter.pse.desc"),
      ozellikler: [
        t("prod.softStarter.pse.feat1"),
        t("prod.softStarter.pse.feat2")
      ],
      uygulamaAlanlari: [
        "Hidrofor Pompaları",
        "Endüstriyel Pompalar",
        "HVAC Sistemleri",
        "Atık Su Pompalar",
        "Sulama Pompaları"
      ],
      resim: "/pse.png",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/pse-datasheet.pdf" },
        { isimKey: "prod.userManual", link: "/pse-kullanim.pdf" }
      ],
      teknikOzellikler: [
        "Metal Kutu / IP 55",
        "Grafik ekran ve navigasyon tuşları",
        "Kilitleme mekanizmasına sahip yük kesici",
        "Analog çıkış",
        "Güç Beslemesi 3-50/60Hz 400V ±",
        "Korumalar ve Hatalar",
        "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
        "Faz kaybı ve Faz sırası hatası",
        "Min / Max Voltaj (Ayarlanabilir)",
        "Kuru çalışma koruması",
        "BMS için kuru kontak",
        "Tork Kontrol",
        "Olay kaydetme (İsteğe Bağlı)",
        "By-pass kontaktörü",
        "MODBus (İsteğe Bağlı)",
        "Kabin içi havalandırma"
      ],
      uygulamaAlanlariResim: "/pse-uygulama.png",
      teknikVerilerCoklu: [
        {
          baslik: "PsE Soft Starter Teknik Veriler",
          basliklar: ["Model", "COD", "Voltaj (V~)", "kW", "HP", "Akım Aralığı (A)", "Max Akım (A)", "H", "L", "W", "Malzeme"],
          satirlar: [
            ["PsE - 7.5", "20201", "3-400", "7.5", "10", "5.4-18", "16", "700", "500", "260", "Metal"],
            ["PsE - 11", "20202", "3-400", "11", "15", "7.5-25", "25", "700", "500", "260", "Metal"],
            ["PsE - 15", "20203", "3-400", "15", "20", "9-30", "30", "700", "500", "260", "Metal"],
            ["PsE - 18.5", "20204", "3-400", "18.5", "25", "11.1-37", "37", "700", "500", "260", "Metal"],
            ["PsE - 22", "20205", "3-400", "22", "30", "13.5-45", "45", "700", "500", "260", "Metal"],
            ["PsE - 30", "20206", "3-400", "30", "40", "18-60", "60", "1000", "700", "320", "Metal"],
            ["PsE - 37", "20207", "3-400", "37", "50", "21.6-72", "72", "1000", "700", "320", "Metal"],
            ["PsE - 45", "20208", "3-400", "45", "60", "25.5-85", "85", "1000", "700", "320", "Metal"],
            ["PsE - 55", "20209", "3-400", "55", "75", "31.8-106", "105", "1000", "700", "320", "Metal"],
            ["PsE - 75", "20210", "3-400", "75", "100", "42.9-143", "143", "1000", "700", "320", "Metal"],
            ["PsE - 90", "20211", "3-400", "90", "125", "51.3-171", "171", "1000", "700", "320", "Metal"],
            ["PsE - 110", "20212", "3-400", "110", "150", "63-210", "210", "1000", "700", "320", "Metal"],
            ["PsE - 132", "20213", "3-400", "132", "180", "75-250", "250", "1000", "700", "320", "Metal"],
            ["PsE - 160", "20214", "3-400", "160", "220", "90.6-302", "300", "1000", "700", "320", "Metal"],
            ["PsE - 200", "20215", "3-400", "185", "250", "111-370", "370", "1000", "700", "320", "Metal"]
          ]
        }
      ]
    }
  };
  const searchParams = useSearchParams();
  const urunParam = searchParams.get("urun");
  const [activeUrun, setActiveUrun] = useState(urunler[0].key);
  const [activeTab, setActiveTab] = useState("teknik-ozellikler");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      <div style={{ paddingTop: isMobile ? "32px" : "80px", marginLeft: isMobile ? "20px" : "150px" }}>
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
        <h1 className={`text-[#86868b] ${isMobile ? "text-2xl" : "text-5xl"} font-medium text-center`}>
          {t("prod.akilli.softStarter.title")}
        </h1>
      </section>

      {/* Ürün Menüsü */}
      <section className="bg-[#f5f5f7]" style={{ paddingBottom: "80px" }}>
        <div className="flex justify-center">
          <div 
            className={`${isMobile ? "flex overflow-x-auto" : "inline-flex"} bg-[#e8e8ed] p-1 gap-1`}
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
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"}`} style={{ padding: isMobile ? "32px 20px" : "80px 0" }}>
            {/* Sol Grid - Ürün Görseli */}
            <div className="flex items-center justify-center">
              {aktifUrunVerisi.resim && (
                <Image
                  src={aktifUrunVerisi.resim}
                  alt={aktifUrunVerisi.baslik}
                  width={isMobile ? 280 : 450}
                  height={isMobile ? 280 : 450}
                  className="object-contain"
                />
              )}
            </div>

            {/* Sağ Grid - Yazılar */}
            <div className="flex items-center justify-center">
              <div className={isMobile ? "w-full px-5" : "max-w-lg"}>
                {/* Ürün Başlığı */}
                <h2 className={`${isMobile ? "text-2xl" : "text-4xl"} font-semibold text-[#1d1d1f] mb-10`}>
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
                className={`${isMobile ? "flex overflow-x-auto" : "inline-flex"} bg-[#e8e8ed] p-1 gap-1`}
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

export default function SoftStarterYolVerme() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <SoftStarterYolVermeInner />
    </Suspense>
  );
}
