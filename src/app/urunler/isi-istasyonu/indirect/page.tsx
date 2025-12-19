"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const urunler = [
  { id: 1, label: "Indirect HydroHexa", key: "indirect-hydrohexa" },
  { id: 2, label: "Indirect ThermoHexa", key: "indirect-thermohexa" },
  { id: 3, label: "Smart Hexa", key: "smart-hexa" },
];

// Ürün verileri
const urunVerileri: Record<string, {
  baslik: string;
  aciklama: string;
  ozellikler?: string[];
  resim: string;
  belgeler: { isim: string; link: string }[];
  akisDiyagrami?: string;
  teknikOzelliklerResim?: string;
  urunBilesenleriResim?: string;
}> = {
  "indirect-hydrohexa": {
    baslik: "Indirect HydroHexa",
    aciklama: "HydroHexa ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için, eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. HydroHexa ısı istasyonları kullanım sıcak suyu önceliğine sahiptir. HydroHexa'nın düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli bir şekilde çalışabilir. HydroHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. HydroHexa, kazan dönüş hattında bulunan fark basınç vanası ve ısıtma dönüş hattında bulunan zon vanası sayesinde daire içerisinde eksiksiz balanslama yapılabilir. Indirect serisi HydroHexa, yüksek katlı binalarda basınç kırıcı görevi görerek, kat aralarında bulunan mekanik odaların kaldırılmasına ve bu alanların ticari olarak kullanılmasına olanak sağlar. Isıtma, ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır. Daire ısıtmasını kontrol etmek için, opsiyonel olarak dış hava kompanzasyon kontrolü de eklenebilir.",
    resim: "/indirect-hydrohexa.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/indirect-hydrohexa-datasheet.pdf" }
    ],
    akisDiyagrami: "/indirect-hydrohexa-akis.png",
    teknikOzelliklerResim: "/indirect-hydrohexa-teknik.png",
    urunBilesenleriResim: "/indirect-hydrohexa-bilesenler.png"
  },
  "indirect-thermohexa": {
    baslik: "Indirect ThermoHexa",
    aciklama: "ThermoHexa ısı istasyonlarında kontrol sıcaklığa bağlı, yani termostatik olarak yapılır. Kullanım sıcak suyu hazırlama işlemi ile ısıtma işlemi aynı anda gerçekleşir. ThermoHexa içerisinde bulunan ve sıcaklığa bağlı çok hızlı tepki gösteren Termostatik Vana sayesinde, ısı kaybı olasılığı azalır. Kompak tasarımı sayesinde, cihazı monte etmek pratik ve kolaydır. ThermoHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. Indirect serisi ThermoHexa, yüksek katlı binalarda basınç kırıcı görevi görerek, kat aralarında bulunan mekanik odaların kaldırılmasına ve bu alanların ticari olarak kullanılmasına olanak sağlar. Isıtma, ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır. Daire ısıtmasını kontrol etmek için, opsiyonel olarak dış hava kompanzasyon kontrolü de eklenebilir.",
    resim: "/indirect-thermohexa.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/indirect-thermohexa-datasheet.pdf" }
    ],
    akisDiyagrami: "/indirect-thermohexa-akis.png",
    teknikOzelliklerResim: "/indirect-thermohexa-teknik.png",
    urunBilesenleriResim: "/indirect-thermohexa-bilesenler.png"
  },
  "smart-hexa": {
    baslik: "Smart Hexa",
    aciklama: "SmartHexa ısı istasyonlarında kontrol hem hidrolik hem de termostatik olarak yapılır. Sistem soğuk eşanjör mantığı ile çalıştığı için, eşanjör içerisinde kireçlenme olasılığı ortadan kaybolur. SmartHexa ısı istasyonları kullanım sıcak suyu önceliğine sahiptir. SmartHexa, ısı istasyonu üzerinden sıcaklık, basınç ve akış değerlerini ölçümler. Bu sayede enerji kazanımı ısı istasyonunda gerçekleşmiş olur. Ayrıca, SmartHexa tarafından ölçümlenen bu veriler, son kullanıcıya GSM veya Ethernet yolu ile aktarılabilir. SmartHexa'nın düşük dönüş suyu özelliği sayesinde yoğuşmalı kazanlarla verimli bir şekilde çalışabilir. SmartHexa içerisinde bulunan eşanjörler ve borular, AISI 316 kalite paslanmaz çelikten imal edilmiştir, bu sayede alüminyum radyatörlerle bile kullanımına olanak sağlanmıştır. Indirect serisi SmartHexa, yüksek katlı binalarda basınç kırıcı görevi görerek, kat aralarında bulunan mekanik odaların kaldırılmasına ve bu alanların ticari olarak kullanılmasına olanak sağlar. Isıtma, ayrı bir eşanjör devresi ile kapalı sistem olarak çalıştırılır. Daire ısıtmasını kontrol etmek için, opsiyonel olarak dış hava kompanzasyon kontrolü de eklenebilir.",
    resim: "/smart-hexa.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/smart-hexa-datasheet.pdf" }
    ],
    akisDiyagrami: "/smart-hexa-akis.png",
    teknikOzelliklerResim: "/smart-hexa-teknik.png",
    urunBilesenleriResim: "/smart-hexa-bilesenler.png"
  }
};

export default function IndirectIsiIstasyonu() {
  const searchParams = useSearchParams();
  const urunParam = searchParams.get("urun");
  const [activeUrun, setActiveUrun] = useState(urunler[0].key);
  const [activeTab, setActiveTab] = useState("akis-diyagrami");

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
      <div style={{ paddingTop: "80px", marginLeft: "150px" }}>
        <Link 
          href="/urunler/isi-istasyonu"
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg font-medium">Kategoriler</span>
        </Link>
      </div>

      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          Indirect
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
                {aktifUrunVerisi.ozellikler && aktifUrunVerisi.ozellikler.length > 0 && (
                  <div className="mb-14">
                    <h3 className="text-xl font-semibold text-[#86868b] mb-6">Özellikler</h3>
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
                    <h3 className="text-xl font-semibold text-[#86868b] mb-6">Belgeler</h3>
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
                          {belge.isim}
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
                className="inline-flex bg-[#e8e8ed] p-1 gap-1"
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
                    Akış Diyagramı
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
                    Teknik Özellikler
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
                    Ürün Bileşenleri
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
                      alt="Akış Diyagramı"
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
                      alt="Ürün Bileşenleri"
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
              Bu ürünün detayları yakında eklenecektir.
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
