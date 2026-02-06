"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const resimler = [
  "/manyetik-filtre-1.png",
  "/manyetik-filtre-2.png",
  "/manyetik-filtre-3.png",
];

export default function ManyetikFiltre() {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("teknik-ozellikler");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ozellikler = [
    t("prod.manyetik.feat1"),
    t("prod.manyetik.feat2"),
    t("prod.manyetik.feat3"),
    t("prod.manyetik.feat4"),
    t("prod.manyetik.feat5"),
    t("prod.manyetik.feat6"),
  ];

  const teknikOzellikler = [
    t("prod.manyetik.tech1"),
    t("prod.manyetik.tech2"),
    t("prod.manyetik.tech3"),
    t("prod.manyetik.tech4"),
    t("prod.manyetik.tech5"),
    t("prod.manyetik.tech6"),
    t("prod.manyetik.tech7"),
    t("prod.manyetik.tech8"),
    t("prod.manyetik.tech9"),
    t("prod.manyetik.tech10"),
    t("prod.manyetik.tech11"),
  ];

  const kullanimAvantajlari = [
    t("prod.manyetik.adv1"),
    t("prod.manyetik.adv2"),
    t("prod.manyetik.adv3"),
    t("prod.manyetik.adv4"),
    t("prod.manyetik.adv5"),
    t("prod.manyetik.adv6"),
    t("prod.manyetik.adv7"),
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % resimler.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + resimler.length) % resimler.length);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: isMobile ? "32px" : "80px", marginLeft: isMobile ? "20px" : "150px" }}>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg font-medium">{t("prod.back.home")}</span>
        </Link>
      </div>

      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <h1 className={`text-[#86868b] ${isMobile ? "text-2xl" : "text-5xl"} font-medium text-center`}>
          {t("prod.manyetik.title")}
        </h1>
      </section>

      {/* Ürün İçeriği */}
      <section className="bg-white">
        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"}`} style={{ padding: isMobile ? "32px 20px" : "80px 0" }}>
          {/* Sol Grid - Ürün Görseli Slider */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative" style={{ width: isMobile ? "280px" : "450px", height: isMobile ? "280px" : "450px" }}>
              <Image
                src={resimler[activeImage]}
                alt={`IRONTRAP ${t("prod.manyetik.title")} ${activeImage + 1}`}
                fill
                className="object-contain"
              />
              
              {/* Sol Ok */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-14 h-14 bg-[#e8e8ed] rounded-full shadow-lg flex items-center justify-center hover:bg-[#d4d4d8] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              {/* Sağ Ok */}
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-14 h-14 bg-[#e8e8ed] rounded-full shadow-lg flex items-center justify-center hover:bg-[#d4d4d8] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            
            {/* Nokta İndikatörler */}
            <div className="flex gap-2 mt-6">
              {resimler.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    activeImage === index ? "bg-[#1d1d1f]" : "bg-[#d1d1d6]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sağ Grid - Yazılar */}
          <div className="flex items-center justify-center">
            <div className={isMobile ? "w-full px-5" : "max-w-lg"}>
              {/* Ürün Başlığı */}
              <h2 className={`${isMobile ? "text-2xl" : "text-4xl"} font-semibold text-[#1d1d1f] mb-10`}>
                {t("prod.manyetik.title")}
              </h2>
              
              {/* Açıklama */}
              <p className="text-[#6e6e73] text-lg leading-relaxed mb-14">
                {t("prod.manyetik.desc")}
              </p>

              {/* Özellikler */}
              <div className="mb-14">
                <h3 className="text-xl font-semibold text-[#86868b] mb-6">{t("prod.features")}</h3>
                <div className="space-y-5">
                  {ozellikler.map((ozellik, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="w-2 h-2 bg-[#86868b] rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-[#6e6e73]">{ozellik}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Belgeler */}
              <div>
                <h3 className="text-xl font-semibold text-[#86868b] mb-6">{t("prod.documents")}</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/manyetik-filtre-datasheet.pdf"
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
                    {t("prod.datasheet")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Tab Menü */}
        <div className="flex flex-col items-center" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
          {/* Tab Butonları */}
          <div 
            className={`${isMobile ? "flex overflow-x-auto" : "inline-flex"} bg-[#e8e8ed] p-1 gap-1`}
            style={{ borderRadius: '12px' }}
          >
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
            <button
              onClick={() => setActiveTab("kullanim-avantajlari")}
              style={{ 
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                backgroundColor: activeTab === "kullanim-avantajlari" ? 'white' : 'transparent',
                color: activeTab === "kullanim-avantajlari" ? '#1d1d1f' : '#6e6e73',
                boxShadow: activeTab === "kullanim-avantajlari" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== "kullanim-avantajlari") {
                  e.currentTarget.style.color = '#1d1d1f';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "kullanim-avantajlari") {
                  e.currentTarget.style.color = '#6e6e73';
                }
              }}
            >
              {t("prod.usageAdvantages")}
            </button>
          </div>

          {/* Tab İçerikleri */}
          <div className="w-full flex justify-center" style={{ marginTop: "40px", padding: "0 24px" }}>
            {/* Teknik Özellikler İçeriği */}
            {activeTab === "teknik-ozellikler" && (
              <div className="p-8" style={{ maxWidth: "900px" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {teknikOzellikler.map((ozellik, index) => (
                    <div key={index} className="flex items-start gap-3 py-2">
                      <span className="text-[#86868b] mt-0.5">•</span>
                      <span className="text-[#1d1d1f] text-base leading-relaxed">{ozellik}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kullanım Avantajları İçeriği */}
            {activeTab === "kullanim-avantajlari" && (
              <div className="p-8" style={{ maxWidth: "900px" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {kullanimAvantajlari.map((avantaj, index) => (
                    <div key={index} className="flex items-start gap-3 py-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#1d1d1f] text-base leading-relaxed">{avantaj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Alt boşluk - beyaz */}
      <div className="bg-white" style={{ height: "150px" }} />

      <Footer theme="white" />
    </div>
  );
}
