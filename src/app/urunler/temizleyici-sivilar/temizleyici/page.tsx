"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "TC200+", key: "tc200" },
  { id: 2, label: "TC210+", key: "tc210" },
  { id: 3, label: "TC220+", key: "tc220" },
];

function TemizleyiciSivilarDetayInner() {
  const { t } = useLanguage();

  // Ürün verileri
  const urunVerileri: Record<string, {
    baslik: string;
    aciklama: string;
    ozellikler: string[];
    resim: string;
    belgeler: { isimKey: string; link: string }[];
    teknikOzellikler?: string[];
    kullanimAvantajlari?: string[];
  }> = {
    "tc200": {
      baslik: "TC200+",
      aciklama: t("prod.temizleyici.tc200.desc"),
      ozellikler: [
        t("prod.temizleyici.tc200.feat1"),
        t("prod.temizleyici.tc200.feat2"),
        t("prod.temizleyici.tc200.feat3"),
        t("prod.temizleyici.tc200.feat4")
      ],
      resim: "/tc200-plus.png",
      belgeler: [],
      teknikOzellikler: [
        "Görünüm: Sıvı",
        "Renk: Berrak Sarı",
        "pH: 1,5",
        "Çevre Bilgileri:",
        "Tehlikesiz",
        "Toksik değil",
        "Biyolojik olarak parçalanır",
        "Drain edilir"
      ],
      kullanimAvantajlari: [
        "Güçlü temizleyici sıvı",
        "Isıtma ve soğutma her iki sistem için de uygundur",
        "Tüm IronTrap sıvılar ile uyumludur",
        "Sıcak hatta çalışması etkilidir",
        "Kirlenmeyi temizleyerek ısıl verimlilik artar"
      ]
    },
    "tc210": {
      baslik: "TC210+",
      aciklama: t("prod.temizleyici.tc210.desc"),
      ozellikler: [
        t("prod.temizleyici.tc210.feat1"),
        t("prod.temizleyici.tc210.feat2"),
        t("prod.temizleyici.tc210.feat3"),
        t("prod.temizleyici.tc210.feat4"),
        t("prod.temizleyici.tc210.feat5")
      ],
      resim: "/tc210-plus.png",
      belgeler: [],
      teknikOzellikler: [
        "Görünüm: Sıvı",
        "Renk: Bulanık Sarı",
        "pH: 7",
        "Çevre Bilgileri:",
        "Tehlikesiz",
        "Biyolojik olarak parçalanır",
        "Drain edilir"
      ],
      kullanimAvantajlari: [
        "Yüksek performanslı temizleyici sıvıdır",
        "Isıtma ve soğutmada her iki sistem için de uygulanır",
        "Tüm IronTrap sıvılar ile uyumludur",
        "Tüm sıcaklıklarda düşük köpüklenme sağlar",
        "Sıcaklık ile etki derecesi artar",
        "Hızlı tepkime sağlar",
        "Kirlenmeyi temizleyerek ısıl verim kaybını önler"
      ]
    },
    "tc220": {
      baslik: "TC220+",
      aciklama: t("prod.temizleyici.tc220.desc"),
      ozellikler: [
        t("prod.temizleyici.tc220.feat1"),
        t("prod.temizleyici.tc220.feat2"),
        t("prod.temizleyici.tc220.feat3"),
        t("prod.temizleyici.tc220.feat4"),
        t("prod.temizleyici.tc220.feat5")
      ],
      resim: "/tc220-plus.png",
      belgeler: [],
      teknikOzellikler: [
        "Görünüm: Granül",
        "Renk: Beyaz",
        "Çözünürlük: Suda Çözünür",
        "pH: 2,5",
        "Çevre Bilgileri:",
        "Tehlikesiz",
        "Drain edilir"
      ],
      kullanimAvantajlari: [
        "Kireç tortusunu hızla sistemden elimine eder",
        "Isıtma verimliliğini geri kazandırır"
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
  const hasKullanimAvantajlari = aktifUrunVerisi.kullanimAvantajlari && aktifUrunVerisi.kullanimAvantajlari.length > 0;

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: isMobile ? "32px" : "80px", marginLeft: isMobile ? "20px" : "150px" }}>
        <Link 
          href="/urunler/temizleyici-sivilar"
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
          {t("mega.prod.temizleyici")}
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
                  width={350}
                  height={350}
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
          {(hasTeknikOzellikler || hasKullanimAvantajlari) && (
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
                {hasKullanimAvantajlari && (
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
                )}
              </div>

              {/* Tab İçerikleri */}
              <div className="w-full flex justify-center" style={{ marginTop: "40px", padding: "0 24px" }}>
                {/* Teknik Özellikler İçeriği */}
                {activeTab === "teknik-ozellikler" && hasTeknikOzellikler && (
                  <div className="p-8" style={{ maxWidth: "900px" }}>
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

                {/* Kullanım Avantajları İçeriği */}
                {activeTab === "kullanim-avantajlari" && hasKullanimAvantajlari && (
                  <div className="p-8" style={{ maxWidth: "900px" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {aktifUrunVerisi.kullanimAvantajlari!.map((avantaj, index) => (
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

export default function TemizleyiciSivilarDetay() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <TemizleyiciSivilarDetayInner />
    </Suspense>
  );
}
