"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const urunler = [
  { id: 1, label: "ESS-86", key: "ess-86" },
  { id: 2, label: "CHS18", key: "chs18" },
  { id: 3, label: "DE10", key: "de10" },
  { id: 4, label: "DE15", key: "de15" },
  { id: 5, label: "DE20", key: "de20" },
  { id: 6, label: "DE25", key: "de25" },
  { id: 7, label: "DE30", key: "de30" },
];

// Ürün verileri
const urunVerileri: Record<string, {
  baslik: string;
  aciklama: string;
  ozellikler: string[];
  resim: string;
  belgeler: { isim: string; link: string }[];
  teknikOzellikler?: string[];
  uygulamaAlanlariResim?: string;
}> = {
  "ess-86": {
    baslik: "ESS-86",
    aciklama: "Kolay anlaşılır menüsü ile kullanıcının istediği sıcaklık ve zaman parametlerini set etmesini ve birden fazla parametrenin tek ekranda analiz edilmesine olanak sağlar. Yüksek hıza sahip işlemci frekansı ve yazılım algoritması sayesinde sensörlerden gelen bilgileri işler ve hızlı kontrol sağlar.",
    ozellikler: [
      "NTC Sıcaklık sensörü ile kullanım sıcak suyu hattındaki sıcaklığı kontrol eder",
      "Oda termostatı bağlantısı ile ısıtma ihtiyacını kontrol eder ve pompanın çalışmasını sağlar",
      "Akış sensörü ile ısı istasyonundan geçen debi miktarını kullanıcıya gösterir ve buna bilgilere göre işlem yapar",
      "4 farklı noktadan sıcaklık sensör bilgisini toplar",
      "4 farklı PWM çıkışı sayesinde vana ve pompa kontrolü sağlar",
      "Kuru kontak çıkışı sayesinde On/Off olarak pompa ve vana kontrolü sağlar",
      "Panel üzerinde bulunan Membran etiket sayesinde kullanıcıya basma hissiyatı verir",
      "128*64 grafik ekranı ile sensörlerden aldığı bilgileri ekranda kullanıcıya sunar",
      "IP65 Kutusu ve rakor bağlantıları sayesinde su geçirmezlik sağlar"
    ],
    resim: "/ess-86.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/ess-86-datasheet.pdf" }
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
    aciklama: "32 bit mikroişlemci sayesinde sensörlerden gelen bilgileri analiz ederek, kullanıcının ısıtma ve kullanım sıcak suyu ihtiyacını karşılar. Kontrol switchleri sayesinde sıcaklık ve zamanın kolayca set edilmesini sağlar.",
    ozellikler: [
      "Cam sigorta sayesinde pompanın sıkışması durumunda koruma sağlar",
      "NTC Sıcaklık sensörü ile kullanım sıcak suyu hattındaki sıcaklığı kontrol eder",
      "Oda termostatı bağlantısı ile ısıtma ihtiyacını kontrol eder ve pompanın çalışmasını sağlar",
      "Akış anahtarı veya akış sensörü opsiyonu ile sistemlere uyum sağlar",
      "Akış bilgisine göre ısıtma hattını kapatarak, sıcak suyun kullanım sıcak suyu hattına yönlenmesini sağlar",
      "Resirkülasyon hattını sıcaklık ve zamana bağlı olarak kontrolünü sağlar",
      "Donanım üzerinde bulunan DIP switchler sayesinde istenilen sıcaklık ve zaman değeri set edilir",
      "Normal de açık ve Normalde Kapalı kontak çıkışları sayesinde sistemde bulunan vana ve pompaların kontrolü sağlanır",
      "Panel üzerinde bulunan butonlar sayesinde ısıtma ve resirkülasyon hattının On/Off olarak kontrol edilmesine olanak tanır",
      "IP65 Kutusu ve rakor bağlantıları sayesinde su geçirmezlik sağlar"
    ],
    resim: "/chs18.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/chs18-datasheet.pdf" }
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
    aciklama: "DE10 Bağlantı kutusu, kullanıcı kontrollü olarak ısı istasyonlarında bulunan ısıtma hattını kontrol eder.",
    ozellikler: [
      "230VAC Pompalara çıkış verebilir",
      "İstasyonda bulunan pompanın uzaktan bölgesel olarak çalıştırılmasını sağlar",
      "Cam sigorta sayesinde pompaların sıkışması durumunda koruma sağlar",
      "Oda termostatı bağlantısı sayesinde bölgesel çalışmayı sağlar",
      "IP65 Kutusu ve rakor bağlantıları sayesinde su geçirmezlik sağlar"
    ],
    resim: "/de10.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/de10-datasheet.pdf" }
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
    aciklama: "DE15 Bağlantı kutusu, ısı istasyonlarında bulunan ısıtma hattını, kullanıcı kontrolünde ve birbirinden bağımsız iki bölgenin ısıtmasını kontrol eder.",
    ozellikler: [
      "230VAC Pompalara çıkış verebilir",
      "Cam sigorta sayesinde pompanın sıkışması durumunda koruma sağlar",
      "İki farklı oda termostatı bağlantısı sayesinde ihtiyaç olan bölgenin ısınması için kollektör hattında bulunan aktuatörün çalışmasını sağlar",
      "IP65 Kutusu ve rakor bağlantıları sayesinde su geçirmezlik sağlar"
    ],
    resim: "/de15.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/de15-datasheet.pdf" }
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
    aciklama: "DE20 Bağlantı kutusu, ısı istasyonlarında bulunan ısıtma hattını ve kullanım sıcak suyu hattını istasyon içerisinden geçen debi miktarına ve bölgesel ısıtma ihtiyacına bağlı olarak kontrol eder.",
    ozellikler: [
      "Cam sigorta sayesinde pompanın sıkışması durumunda koruma sağlar",
      "Pano üzerinde bulunan görsel indikatörler sayesinde ısıtma veya kullanım sıcak suyu hattının çalıştığını gösterir",
      "Sistemde ısıtma ve resirkülasyon hattını kontrol eden 230V AC NC/NO vanaların kontrolünü sağlar",
      "Kullanıcı konforunu ön plana çıkarmak amacı ile sistemde bulunan akış anahtarı sayesinde ısıtma hattını durdurur",
      "Panel içerisinde bulunan oda termostatı bağlantısı sayesinde ısıtma hattını kontrol eder",
      "IP65 Kutusu ve rakor bağlantıları sayesinde su geçirmezlik sağlar"
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
    aciklama: "DE25 Bağlantı kutusu, ısı istasyonlarında bulunan ısıtma hattını ve kullanım sıcak suyu hattını kullanıcı arayüzü ile NTC sıcaklık sensörü ve akış anahtarından aldığı bilgilere göre kontrol eder.",
    ozellikler: [
      "Cam sigorta sayesinde pompanın sıkışması durumunda koruma sağlar",
      "Bağlantı kutusu üzerinde bulunan kontrolör sayesinde resirkülasyon hattında istenilen sıcaklığın set edilmesini sağlar",
      "NTC Sıcaklık sensörü sayesinde bağlı olduğu hattın sıcaklık değerini ölçer",
      "Panel üzerinden ayarlanabilen süre ile resirkülasyon hattına bağlı olan pompa çalıştırılır ve süre dolduğunda durdurulur",
      "Kullanıcı konforunu ön plana çıkarmak amacı ile sistemde bulunan akış anahtarı sayesinde ısıtma hattını durdurur",
      "Panel içerisinde bulunan oda termostatı bağlantısı sayesinde ısıtma hattını kontrol eder"
    ],
    resim: "/de25.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/de25-datasheet.pdf" }
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
    aciklama: "7 Bölgeyi bağımsız olarak 230V oda termostatlarından gelen kontak bilgisine göre kontrol eder ve basınç şalteri sayesinde ısıtma hattının susuz çalışmaya karşı korunmasını sağlar.",
    ozellikler: [
      "Cam sigorta sayesinde pompanın sıkışması durumunda koruma sağlar",
      "Birbirinden bağımsız 7 bölge oda termostatı bağlantısı destekler",
      "Basınç şalteri bağlantısı sayesinde düşük basınçlarda pompanın susuz çalışmaya karşı korur",
      "7 bölgeden herhangi birinden gelen çalış komutuna göre pompanın çalışmasını sağlar",
      "4 kablolu, kontak çıkışı bulunan aktuatör bağlantısı",
      "IP65 Kutusu ve rakor bağlantıları sayesinde su geçirmezlik sağlar"
    ],
    resim: "/de30.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/de30-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "230V AC Çalışma Voltajı",
      "IP65 Contalı Muhafaza",
      "3A Cam Sigorta",
      "Ölçüler: 146 x 222 x 54mm"
    ]
  }
};

export default function IsiIstasyonuKontrolorleri() {
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
          <span className="text-lg font-medium">Kategoriler</span>
        </Link>
      </div>

      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          Isı İstasyonu Kontrolörleri
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
                    Teknik Özellikler
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
                    Uygulama Alanları
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
