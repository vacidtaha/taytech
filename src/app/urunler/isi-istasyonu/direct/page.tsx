"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "ThermoHexa", key: "thermohexa" },
  { id: 2, label: "ThermoHexa-UFH", key: "thermohexa-ufh" },
  { id: 3, label: "HydroHexa", key: "hydrohexa" },
  { id: 4, label: "HydroHexa UFH", key: "hydrohexa-ufh" },
];

function DirectIsiIstasyonuInner() {
  const { t } = useLanguage();

  // Ürün verileri
  const urunVerileri: Record<string, {
    baslik: string;
    aciklama: string;
    ozellikler?: string[];
    resim: string;
    belgeler: { isimKey: string; link: string }[];
    akisDiyagrami?: string;
    teknikOzelliklerResim?: string;
    urunBilesenleriResim?: string;
  }> = {
    "thermohexa": {
      baslik: "ThermoHexa",
      aciklama: t("prod.isi.d.thermohexa.desc"),
      resim: "/thermohexa.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/thermohexa-datasheet.pdf" }
      ],
      akisDiyagrami: "/thermohexa-akis.png",
      teknikOzelliklerResim: "/thermohexa-teknik.png",
      urunBilesenleriResim: "/thermohexa-bilesenler.png"
    },
    "thermohexa-ufh": {
      baslik: "ThermoHexa-UFH",
      aciklama: t("prod.isi.d.thermohexa-ufh.desc"),
      resim: "/thermohexa-ufh.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/thermohexa-ufh-datasheet.pdf" }
      ],
      akisDiyagrami: "/thermohexa-ufh-akis.png",
      teknikOzelliklerResim: "/thermohexa-ufh-teknik.png",
      urunBilesenleriResim: "/thermohexa-ufh-bilesenler.png"
    },
    "hydrohexa": {
      baslik: "HydroHexa",
      aciklama: t("prod.isi.d.hydrohexa.desc"),
      resim: "/hydrohexa.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/hydrohexa-datasheet.pdf" }
      ],
      akisDiyagrami: "/hydrohexa-akis.png",
      teknikOzelliklerResim: "/hydrohexa-teknik.png",
      urunBilesenleriResim: "/hydrohexa-bilesenler.png"
    },
    "hydrohexa-ufh": {
      baslik: "HydroHexa UFH",
      aciklama: t("prod.isi.d.hydrohexa-ufh.desc"),
      resim: "/hydrohexa-ufh.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/hydrohexa-ufh-datasheet.pdf" }
      ],
      akisDiyagrami: "/hydrohexa-ufh-akis.png",
      teknikOzelliklerResim: "/hydrohexa-ufh-teknik.png",
      urunBilesenleriResim: "/hydrohexa-ufh-bilesenler.png"
    }
  };
  const searchParams = useSearchParams();
  const urunParam = searchParams.get("urun");
  const [activeUrun, setActiveUrun] = useState(urunler[0].key);
  const [activeTab, setActiveTab] = useState("akis-diyagrami");
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
  const hasAkisDiyagrami = !!aktifUrunVerisi.akisDiyagrami;
  const hasTeknikOzellikler = !!aktifUrunVerisi.teknikOzelliklerResim;
  const hasUrunBilesenleri = !!aktifUrunVerisi.urunBilesenleriResim;

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: isMobile ? "32px" : "80px", marginLeft: isMobile ? "20px" : "150px" }}>
        <Link 
          href="/urunler/isi-istasyonu"
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
          {t("prod.isi.direct.title")}
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
                {aktifUrunVerisi.ozellikler && aktifUrunVerisi.ozellikler.length > 0 && (
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
          {(hasAkisDiyagrami || hasTeknikOzellikler || hasUrunBilesenleri) && (
            <div className="flex flex-col items-center" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
              {/* Tab Butonları */}
              <div 
                className={`${isMobile ? "flex overflow-x-auto" : "inline-flex"} bg-[#e8e8ed] p-1 gap-1`}
                style={{ borderRadius: '12px' }}
              >
                {hasAkisDiyagrami && (
                  <button
                    onClick={() => setActiveTab("akis-diyagrami")}
                    style={{ 
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      backgroundColor: activeTab === "akis-diyagrami" ? 'white' : 'transparent',
                      color: activeTab === "akis-diyagrami" ? '#1d1d1f' : '#6e6e73',
                      boxShadow: activeTab === "akis-diyagrami" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== "akis-diyagrami") {
                        e.currentTarget.style.color = '#1d1d1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "akis-diyagrami") {
                        e.currentTarget.style.color = '#6e6e73';
                      }
                    }}
                  >
                    {t("prod.flowDiagram")}
                  </button>
                )}
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
                {hasUrunBilesenleri && (
                  <button
                    onClick={() => setActiveTab("urun-bilesenleri")}
                    style={{ 
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      backgroundColor: activeTab === "urun-bilesenleri" ? 'white' : 'transparent',
                      color: activeTab === "urun-bilesenleri" ? '#1d1d1f' : '#6e6e73',
                      boxShadow: activeTab === "urun-bilesenleri" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== "urun-bilesenleri") {
                        e.currentTarget.style.color = '#1d1d1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== "urun-bilesenleri") {
                        e.currentTarget.style.color = '#6e6e73';
                      }
                    }}
                  >
                    {t("prod.components")}
                  </button>
                )}
              </div>

              {/* Tab İçerikleri */}
              <div className="w-full" style={{ maxWidth: "1100px", marginTop: "40px", padding: "0 24px" }}>
                {/* Akış Diyagramı İçeriği */}
                {activeTab === "akis-diyagrami" && hasAkisDiyagrami && (
                  <div className="p-8 flex justify-center">
                    <Image
                      src={aktifUrunVerisi.akisDiyagrami!}
                      alt={t("prod.flowDiagram")}
                      width={900}
                      height={600}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Teknik Özellikler İçeriği */}
                {activeTab === "teknik-ozellikler" && hasTeknikOzellikler && (
                  <div className="p-8 flex justify-center">
                    <Image
                      src={aktifUrunVerisi.teknikOzelliklerResim!}
                      alt="Teknik Özellikler"
                      width={900}
                      height={600}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Ürün Bileşenleri İçeriği */}
                {activeTab === "urun-bilesenleri" && hasUrunBilesenleri && (
                  <div className="p-8 flex justify-center">
                    <Image
                      src={aktifUrunVerisi.urunBilesenleriResim!}
                      alt={t("prod.components")}
                      width={900}
                      height={600}
                      className="object-contain"
                    />
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

export default function DirectIsiIstasyonu() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <DirectIsiIstasyonuInner />
    </Suspense>
  );
}
