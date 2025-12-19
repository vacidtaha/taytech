"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const urunler = [
  { id: 1, label: "Dataloger", key: "dataloger" },
  { id: 2, label: "Dataloger Gateway", key: "dataloger-gateway" },
  { id: 3, label: "GSM Modem", key: "gsm-modem" },
  { id: 4, label: "M-Bus Converter", key: "m-bus-converter" },
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
  "dataloger": {
    baslik: "Dataloger",
    aciklama: "DS-YK Datalogger/Gateway M-Bus dönüştürücülerden sayaç verilerini toplayıp kaydederek kablolu/kablosuz ağ ya da GPRS modem üzerinden ilgili uzak servislere / bulut uygulamalarına aktarmak için kullanılan akıllı bir veri toplama cihazıdır.",
    ozellikler: [
      "Yüksek performanslı işlemcisi, geniş hafızası ve gömülü işletim sistemi sayesinde akıllı, hızlı ve esnek veri toplama/değerlendirme kabiliyetine sahiptir",
      "RS232, RS485 ve Ethernet ara yüzlü EN1434 uyumlu çeşitli marka/model M-Bus dönüştürücülerle bağlantı kurabilir",
      "Dahili Ethernet / WiFi bağlantısı ve harici GPRS bağlantı seçenekleri ile uzak veritabanına / buluta erişim imkanı sağlar",
      "DS-YK02 modeli tek dönüştürücü ile 8 M-Bus bloğundan okuma yapabilir",
      "Farklı montaj seçenekleri için bağlantı kiti seçenekleri mevcuttur"
    ],
    resim: "/dataloger.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/dataloger-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Ray montajlı ABS muhafaza",
      "Gömülü işletim sistemi ile çalışan 4 çekirdekli 64-bit işlemci",
      "32GB SD flash, 1GB DDR bellek",
      "Pil destekli dahili tarih/saat saklama özelliği",
      "2x16 karakter aydınlatmalı LCD, 3 x buton ve 1 LED ile kolay kullanıcı arayüzü",
      "Donanım üzerinden seçilebilir RS232 veya RS485 portu",
      "4 x USB 2.0 port",
      "Dahili 10/100 Mb destekli Ethernet bağlantısı",
      "802.11b/g/n destekli WiFi bağlantısı",
      "Opsiyonel DS-GM01 GPRS modem üzerinden uzak bağlantı seçeneği",
      "2 x kuru kontak dijital giriş",
      "2 x 5A röle çıkışı",
      "Opsiyonel 8 x 5A röle çıkışı (DS-YK02)",
      "9-36V D.C. Besleme gerilimi",
      "Ölçüler: 160x100x50mm"
    ],
    uygulamaAlanlariResim: "/dataloger-siparis-kodu.jpg"
  },
  "dataloger-gateway": {
    baslik: "Dataloger Gateway",
    aciklama: "DS-YK Datalogger/Gateway M-Bus dönüştürücülerden sayaç verilerini toplayıp kaydederek kablolu/kablosuz ağ ya da GPRS modem üzerinden ilgili uzak servislere / bulut uygulamalarına aktarmak için kullanılan akıllı bir veri toplama cihazıdır.",
    ozellikler: [
      "Yüksek performanslı işlemcisi, geniş hafızası ve gömülü işletim sistemi sayesinde akıllı, hızlı ve esnek veri toplama/değerlendirme kabiliyetine sahiptir",
      "RS232, RS485 ve Ethernet ara yüzlü EN1434 uyumlu çeşitli marka/model M-Bus dönüştürücülerle bağlantı kurabilir",
      "Dahili Ethernet / WiFi bağlantısı ve harici GPRS bağlantı seçenekleri ile uzak veritabanına / buluta erişim imkanı sağlar",
      "DS-YK02 modeli tek dönüştürücü ile 8 M-Bus bloğundan okuma yapabilir",
      "Farklı montaj seçenekleri için bağlantı kiti seçenekleri mevcuttur"
    ],
    resim: "/dataloger-gateway.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/dataloger-gateway-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Ray montajlı ABS muhafaza",
      "Gömülü işletim sistemi ile çalışan 4 çekirdekli 64-bit işlemci",
      "32GB SD flash, 1GB DDR bellek",
      "Pil destekli dahili tarih/saat saklama özelliği",
      "2x16 karakter aydınlatmalı LCD, 3 x buton ve 1 LED ile kolay kullanıcı arayüzü",
      "Donanım üzerinden seçilebilir RS232 veya RS485 portu",
      "4 x USB 2.0 port",
      "Dahili 10/100 Mb destekli Ethernet bağlantısı",
      "802.11b/g/n destekli WiFi bağlantısı",
      "Opsiyonel DS-GM01 GPRS modem üzerinden uzak bağlantı seçeneği",
      "2 x kuru kontak dijital giriş",
      "2 x 5A röle çıkışı",
      "Opsiyonel 8 x 5A röle çıkışı (DS-YK02)",
      "9-36V D.C. Besleme gerilimi",
      "Ölçüler: 160x100x50mm"
    ],
    uygulamaAlanlariResim: "/dataloger-gateway-siparis-kodu.jpg"
  },
  "gsm-modem": {
    baslik: "GSM Modem",
    aciklama: "DS-GM01, RS232 veya RS485 bağlantılı cihazların uzak sunuculara GPRS bağlantısı ile veri aktarması için kullanılan akıllı bir GPRS modemdir.",
    ozellikler: [
      "Dahili mikrodenetleyicisi ve RS232/RS485 bağlantısı sayesinde endüstriyel cihazlarla esnek bağlantı imkanı",
      "3 LED ile kolay anlaşılır çalışma bilgisi",
      "Opsiyonel M-Bus / Modbus protokol desteği"
    ],
    resim: "/gsm-modem.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/gsm-modem-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Ray montajlı ABS muhafaza",
      "Gömülü internet servis protokollerine sahip quad band GSM GPRS modem",
      "Harici anten seçenekleri için SMA anten portu",
      "SIM kart konnektörü",
      "Kolay diyagnostik için 3 x LED",
      "10-30V D.C. besleme gerilimi",
      "Harici cihaz bağlantıları için RS232 / RS485 portu"
    ]
  },
  "m-bus-converter": {
    baslik: "M-Bus Converter",
    aciklama: "Mbus hattında bağlı cihazlardan verilerin analiz edilmesi ve işlenmesi için verileri RS232 ve USB arayüzü üzerinden bilgisayar ortamına aktarılmasını sağlar.",
    ozellikler: [
      "Repeater özelliği ile 1 den fazla konverter üzerinden sayaçlara bağlanabilir",
      "250 Adet sayaca kadar iki farklı giriş noktası ile kolay sayaç bağlantı imkanı sunar",
      "RS232 haberleşmesi sayesinde bilgisayar ile veri aktarımı sağlar",
      "USB arayüzü ile direk bilgisayar bağlantısı imkanı sunar (Opsiyonlu)",
      "Akım koruması sayesinde herhangi bir kısa devre veya olası bir yüksek akımda korumaya geçer ve mbus hattının kapanmasını sağlar",
      "Panel üzerinde bulunan görsel indikatörler sayesinde kullanıcıyı bilgilendirir: Enerji var, RX, TX, USB, Aşırı Akım",
      "Esnek bağlantısı ile ray ve duvar montaj olarak bağlantı imkanı sunar",
      "Donanım üzerinde bulunan sesli indikatör sayesinde aşırı akım anında kullanıcıya sesli olarak uyarı verir",
      "Geniş çaplı bağlantı çapları sayesinde kolay montaj yapılmasını sağlar"
    ],
    resim: "/m-bus-converter.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/m-bus-converter-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Çalışma Voltajı: 24VDC",
      "Mbus Hat Voltajı: 36VDC",
      "32 Bit Mikroişlemci Tabanlı yüksek hızlı işlemci",
      "USB Portu (Opsiyonel)",
      "RS232 Haberleşme",
      "İletişim Hızı: 2400 Baud",
      "LED ile durum göstergesi",
      "250 Adet Sayaç Desteği",
      "Aşırı akım koruması >500mA",
      "Boyut(mm) 157,4 x 91 x 58,4",
      "Ray montaj ABS Plastik IP20 korumaya sahip kutu",
      "Çalışma Sıcaklığı -20°C ~ 50°C"
    ]
  }
};

export default function TaytechCloud() {
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
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          Taytech Cloud
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
                    Sipariş Kodu
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

                {/* Sipariş Kodu İçeriği */}
                {activeTab === "uygulama-alanlari" && hasUygulamaAlanlari && (
                  <div className="p-8 flex justify-center">
                    <Image
                      src={aktifUrunVerisi.uygulamaAlanlariResim!}
                      alt="Sipariş Kodu"
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
