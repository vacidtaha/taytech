"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const urunler = [
  { id: 1, label: "ESS-86", key: "ess-86" },
  { id: 2, label: "CHS18", key: "chs18" },
  { id: 3, label: "DE10", key: "de10" },
  { id: 4, label: "DE15", key: "de15" },
  { id: 5, label: "DE20", key: "de20" },
  { id: 6, label: "DE25", key: "de25" },
  { id: 7, label: "DE30", key: "de30" },
];

export default function IsiIstasyonuKontrolorleri() {
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
  }> = {
    "ess-86": {
      baslik: "ESS-86",
      aciklama: t("prod.isiKontrol.ess-86.desc"),
      ozellikler: [
        t("prod.isiKontrol.ess-86.feat1"),
        t("prod.isiKontrol.ess-86.feat2"),
        t("prod.isiKontrol.ess-86.feat3"),
        t("prod.isiKontrol.ess-86.feat4"),
        t("prod.isiKontrol.ess-86.feat5"),
        t("prod.isiKontrol.ess-86.feat6"),
        t("prod.isiKontrol.ess-86.feat7"),
        t("prod.isiKontrol.ess-86.feat8"),
        t("prod.isiKontrol.ess-86.feat9")
      ],
      resim: "/ess-86.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/ess-86-datasheet.pdf" }
      ],
      teknikOzellikler: [
        "Çalışma Voltajı: 24VDC",
        "32 Bit Mikroişlemci Tabanlı yüksek hızlı işlemci",
        "Gerçek zaman özelliği (RTC)",
        "512Kbit EEPROM Hafıza",
        "Mikro USB Portu (Opsiyonel)",
        "NTC Sensör Bağlantısı x4",
        "PT1000 Sensör Bağlantısı x3",
        "Haberleşmeye Uygun Genişleme Portu",
        "128*64 Arka aydınlatmaya sahip Grafik LCD",
        "Röle Çıkışları 2 x 230V 8A NC Kontak Çıkışı",
        "Boyut(mm) 110 x 110 x 70",
        "IP Koruması IP 65",
        "Çalışma Sıcaklığı -20°C ~ 85°C"
      ]
    },
    "chs18": {
      baslik: "CHS18 Controller",
      aciklama: t("prod.isiKontrol.chs18.desc"),
      ozellikler: [
        t("prod.isiKontrol.chs18.feat1"),
        t("prod.isiKontrol.chs18.feat2"),
        t("prod.isiKontrol.chs18.feat3"),
        t("prod.isiKontrol.chs18.feat4"),
        t("prod.isiKontrol.chs18.feat5"),
        t("prod.isiKontrol.chs18.feat6"),
        t("prod.isiKontrol.chs18.feat7"),
        t("prod.isiKontrol.chs18.feat8"),
        t("prod.isiKontrol.chs18.feat9"),
        t("prod.isiKontrol.chs18.feat10")
      ],
      resim: "/chs18.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/chs18-datasheet.pdf" }
      ],
      teknikOzellikler: [
        "Çalışma Voltajı 230V 50Hz",
        "Röle Çıkışları 2 x 230V 8A NC/NO Kontak Çıkışı",
        "Sıcaklık Hassasiyeti ± 1°C",
        "Akış Sensörü Hassasiyeti 1 lt/dk",
        "Boyut(mm) 110 x 110 x 70",
        "IP Koruması IP 65",
        "Çalışma Sıcaklığı -20°C ~ 85°C"
      ]
    },
    "de10": {
      baslik: "DE10",
      aciklama: t("prod.isiKontrol.de10.desc"),
      ozellikler: [
        t("prod.isiKontrol.de10.feat1"),
        t("prod.isiKontrol.de10.feat2"),
        t("prod.isiKontrol.de10.feat3"),
        t("prod.isiKontrol.de10.feat4"),
        t("prod.isiKontrol.de10.feat5")
      ],
      resim: "/de10.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/de10-datasheet.pdf" }
      ],
      teknikOzellikler: [
        "IP65 Contalı Muhafaza",
        "Kullanıcı Kontrolü İçin Toggle Buton",
        "Kolay Montaj Geçmeli Bağlantı Klemensi",
        "3A Cam Sigorta",
        "230V AC Besleme gerilimi",
        "Ölçüler: 160x100x50mm"
      ]
    },
    "de15": {
      baslik: "DE15",
      aciklama: t("prod.isiKontrol.de15.desc"),
      ozellikler: [
        t("prod.isiKontrol.de15.feat1"),
        t("prod.isiKontrol.de15.feat2"),
        t("prod.isiKontrol.de15.feat3"),
        t("prod.isiKontrol.de15.feat4")
      ],
      resim: "/de15.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/de15-datasheet.pdf" }
      ],
      teknikOzellikler: [
        "IP65 Contalı Muhafaza",
        "Kullanıcı Kontrolü İçin Toggle Buton",
        "3A Cam Sigorta",
        "230V AC Besleme gerilimi",
        "2x 230VAC 8A Röle",
        "Ölçüler: 115 x 65 x 55mm"
      ]
    },
    "de20": {
      baslik: "DE20",
      aciklama: t("prod.isiKontrol.de20.desc"),
      ozellikler: [
        t("prod.isiKontrol.de20.feat1"),
        t("prod.isiKontrol.de20.feat2"),
        t("prod.isiKontrol.de20.feat3"),
        t("prod.isiKontrol.de20.feat4"),
        t("prod.isiKontrol.de20.feat5"),
        t("prod.isiKontrol.de20.feat6")
      ],
      resim: "",
      belgeler: [],
      teknikOzellikler: [
        "IP65 Contalı Muhafaza",
        "3A Cam Sigorta",
        "230VAC Pompa Bağlantısı",
        "230VAC NC/NO Kontak Vana Bağlantısı",
        "230VAC Akış Anahtarı Bağlantısı",
        "230VAC Oda Termostatı Bağlantısı",
        "230V AC Besleme gerilimi",
        "2x 230VAC 8A Röle",
        "Ölçüler: 115 x 90 x 55mm"
      ]
    },
    "de25": {
      baslik: "DE25",
      aciklama: t("prod.isiKontrol.de25.desc"),
      ozellikler: [
        t("prod.isiKontrol.de25.feat1"),
        t("prod.isiKontrol.de25.feat2"),
        t("prod.isiKontrol.de25.feat3"),
        t("prod.isiKontrol.de25.feat4"),
        t("prod.isiKontrol.de25.feat5"),
        t("prod.isiKontrol.de25.feat6")
      ],
      resim: "/de25.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/de25-datasheet.pdf" }
      ],
      teknikOzellikler: [
        "IP65 Contalı Muhafaza",
        "3A Cam Sigorta",
        "2x 230VAC Pompa Bağlantısı",
        "230VAC Akış Anahtarı Bağlantısı",
        "230VAC Oda Termostatı Bağlantısı",
        "230V AC Besleme gerilimi",
        "2x 230VAC 8A Röle",
        "Sıcaklık Hassasiyeti ± 1°C",
        "Ölçüler: 120 x 120 x 90mm"
      ]
    },
    "de30": {
      baslik: "DE30",
      aciklama: t("prod.isiKontrol.de30.desc"),
      ozellikler: [
        t("prod.isiKontrol.de30.feat1"),
        t("prod.isiKontrol.de30.feat2"),
        t("prod.isiKontrol.de30.feat3"),
        t("prod.isiKontrol.de30.feat4"),
        t("prod.isiKontrol.de30.feat5"),
        t("prod.isiKontrol.de30.feat6")
      ],
      resim: "/de30.jpg",
      belgeler: [
        { isimKey: "prod.datasheet", link: "/de30-datasheet.pdf" }
      ],
      teknikOzellikler: [
        "230V AC Çalışma Voltajı",
        "IP65 Contalı Muhafaza",
        "3A Cam Sigorta",
        "Ölçüler: 146 x 222 x 54mm"
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

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: "80px", marginLeft: "150px" }}>
        <Link 
          href="/urunler/elektronik"
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
          {t("prod.isi.kontrolorleri.title")}
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
          {(hasTeknikOzellikler || hasUygulamaAlanlari) && (
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
