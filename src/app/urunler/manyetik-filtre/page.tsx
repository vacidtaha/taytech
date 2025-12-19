"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const resimler = [
  "/manyetik-filtre-1.png",
  "/manyetik-filtre-2.png",
  "/manyetik-filtre-3.png",
];

export default function ManyetikFiltre() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("teknik-ozellikler");

  const ozellikler = [
    "Geleneksel yöntemlere göre %65 daha iyi performans gösterir",
    "Sistem verimliliğinin geri kazanılmasında %35 daha iyi performans gösterir",
    "Bakım maliyetlerini azaltır",
    "Güçlü Neodyum mıknatıslar kolay çıkartılır ve takılır",
    "Kolay kurulum ile sade işletmeyi sağlar",
    "Basınçlı kaplar yönetmeliğine uygun üretilmiştir"
  ];

  const teknikOzellikler = [
    "Maksimum Çalışma Basıncı: 10 BAR",
    "Maksimum Çalışma Sıcaklığı: 100°C",
    "GÖVDE - Malzeme: TS EN 10219",
    "GÖVDE - Drenaj: 1\"",
    "GÖVDE - Vakum Vanası: 1/2\"",
    "GÖVDE - Hava Prüjör: Otomatik hava atma prujör 1/2\"",
    "MAGNET - Malzeme: Yüksek performans",
    "SEPERATÖR FİLTRE - Malzeme: 304 Paslanmaz Çelik",
    "SEPERATÖR FİLTRE - Gözenek Büyüklüğü: 1000 mikron",
    "BAĞLANTI FLANŞI - Malzeme: TS EN 1092-1",
    "BAĞLANTI FLANŞI - Basınç Sınıfı: PN16"
  ];

  const kullanimAvantajlari = [
    "Tüm Isıtma-Soğutma Sistemleri ile Uyumludur",
    "Erken Arıza ve Yüksek Bakım Maliyetini Azaltır",
    "Sistem Ekipmanlarının Kullanım Ömrünü Uzatır",
    "Sistem Veriminin Geri Kazanılmasına Yardımcı Olur",
    "Yüksek Performanslı Manyetik Çubuklar En Küçük Manyetik Parçacıkları Bile Yakalar",
    "Kurulumu ve Bakımı Kolaydır",
    "Vakum Vanası Sayesinde Hızlı Temizleme Olanağı Sağlar"
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
      <div style={{ paddingTop: "80px", marginLeft: "150px" }}>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg font-medium">Ana Sayfa</span>
        </Link>
      </div>

      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          IRONTRAP® Manyetik Filtre
        </h1>
      </section>

      {/* Ürün İçeriği */}
      <section className="bg-white">
        <div className="grid grid-cols-2" style={{ padding: "80px 0" }}>
          {/* Sol Grid - Ürün Görseli Slider */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative" style={{ width: "450px", height: "450px" }}>
              <Image
                src={resimler[activeImage]}
                alt={`IRONTRAP Manyetik Filtre ${activeImage + 1}`}
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
            <div className="max-w-lg">
              {/* Ürün Başlığı */}
              <h2 className="text-4xl font-semibold text-[#1d1d1f] mb-10">
                IRONTRAP® Manyetik Filtre
              </h2>
              
              {/* Açıklama */}
              <p className="text-[#6e6e73] text-lg leading-relaxed mb-14">
                Korozyona ve manyetite karşı koruma sağlayan IronTrap manyetik filtreler otomatik hava atma prüjörüne entegre olarak tasarlanmıştır. Hava bir katalizördür, bu sebeple ısıtma soğutma sistemlerinde korozyon gelişmesine sebep olur. Devreye alma ve boşaltma esnasında sisteme gelen hava otomatik hava atma prujörü ile sistem dışına atılır. Sistem çalışır durumdayken IronTrap manyetik filtresi üzerinden geçen akışkanın içerisindeki havayı otomatik hava atma purjörü üzerinden dışarıya atar.
              </p>

              {/* Özellikler */}
              <div className="mb-14">
                <h3 className="text-xl font-semibold text-[#86868b] mb-6">Özellikler</h3>
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
                <h3 className="text-xl font-semibold text-[#86868b] mb-6">Belgeler</h3>
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
                    Teknik Veri Sayfası
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
            className="inline-flex bg-[#e8e8ed] p-1 gap-1"
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
              Teknik Özellikler
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
              Kullanım Avantajları
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
