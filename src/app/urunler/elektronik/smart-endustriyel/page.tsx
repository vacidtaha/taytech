"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const urunler = [
  { id: 1, label: "Smart Grinder Kontrolörleri", key: "grinder" },
  { id: 2, label: "Smart Hidrofor Kontrolörleri", key: "hidrofor" },
  { id: 3, label: "Smart Atık Su Kontrolörleri", key: "atik-su" },
  { id: 4, label: "Smart Derin Kuyu Kontrolörleri", key: "derin-kuyu" },
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
  "grinder": {
    baslik: "Smart Grinder Kontrolörleri",
    aciklama: "Mikroişlemcili smart kontrolörler, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Grinder kontrolör, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma vb. gibi bir çok işlemi pratik bir şekilde yapmanızı sağlar.",
    ozellikler: [
      "Smart Grinder Panelleri suya dayanıklı IP 55 ABS malzemeden üretilmiş özel dizayn kutuya monte edilir",
      "3G / WI-FI modül sayesinde, uzak bir noktadan sistemi işletme, verileri görüntüleme ve sistemi kontrol etme sağlanır",
      "Kolay ve hızlı bir şekilde yönlendirme butonlarını kullanarak, net şekilde okunabilir LCD ekran üzerinden ayarların yapılması",
      "Şamandıra veya seviye elektrotlarından gelen bilgi ile, sistemi açar, çalıştırır ve durdurur"
    ],
    resim: "/smart-grinder-kontrolor.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/smart-grinder-kontrolor-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Güç Beslemesi 24VDC",
      "3 Faz kontrolü için bağlantı girişi",
      "128x64 LCD Grafik Ekran",
      "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
      "Başlatma bilgisi için komut girişi (Seviye Elektrodu veya Şamandıra)",
      "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
      "Oto-Manuel Durum bilgisi görüntüleme",
      "Korumalar ve Hatalar",
      "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
      "Faz kaybı ve Faz sırası hatası",
      "Min / Max Voltaj (Ayarlanabilir)",
      "Motor başlama zamanı",
      "Taşma uyarısı fonksiyonu",
      "Kuru çalışma koruması",
      "Pompa çalışma süre bilgisi",
      "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
      "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
      "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
      "MODBus Bağlantısı",
      "Ayarlanabilir motor geri yönlendirme özelliği"
    ]
  },
  "hidrofor": {
    baslik: "Smart Hidrofor Kontrolörleri",
    aciklama: "Mikroişlemcili smart kontrolörler, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Booster Kontrolör, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma vb. gibi bir çok işlemi pratik bir şekilde yapmanızı sağlar. (Temiz su uygulamalarında ki basınçlandırma süreçlerini gerçekleştirir)",
    ozellikler: [
      "3G / WI-FI modül sayesinde, uzak bir noktadan sistemi işletme, verileri görüntüleme ve sistemi kontrol etme sağlanır",
      "Kolay ve hızlı bir şekilde yönlendirme butonlarını kullanarak, net şekilde okunabilir LCD ekran üzerinden ayarların yapılması",
      "Farklı tipteki bağlantılar ile motoru başlatma veya durdurma; basınç anahtarı, akış anahtarı vb. gibi"
    ],
    resim: "/smart-hidrofor-kontrolor.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/smart-hidrofor-kontrolor-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Güç Beslemesi 24VDC",
      "3 Faz kontrolü için bağlantı girişi",
      "128x64 LCD Grafik Ekran",
      "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
      "Başlatma bilgisi için komut girişi (Basınç anahtarı veya sensör)",
      "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
      "Oto-Manuel Durum bilgisi görüntüleme",
      "Korumalar ve Hatalar",
      "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
      "Faz kaybı ve Faz sırası hatası",
      "Min / Max Voltaj (Ayarlanabilir)",
      "Motor başlama zamanı",
      "Kuru çalışma koruması",
      "Pompa çalışma süre bilgisi",
      "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
      "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
      "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
      "MODBus Bağlantısı"
    ]
  },
  "atik-su": {
    baslik: "Smart Atık Su Kontrolörleri",
    aciklama: "Mikroişlemcili smart kontrolörler, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Wastewater kontrolör, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma vb. gibi bir çok işlemi pratik bir şekilde yapmanızı sağlar. (Pis su uygulamalarında ki doldurma ve boşaltma süreçlerini gerçekleştirir)",
    ozellikler: [
      "3G / WI-FI modül sayesinde, uzak bir noktadan sistemi işletme, verileri görüntüleme ve sistemi kontrol etme sağlanır",
      "Kolay ve hızlı bir şekilde yönlendirme butonlarını kullanarak, net şekilde okunabilir LCD ekran üzerinden ayarların yapılması",
      "Şamandıra veya seviye elektrotlarından gelen bilgi ile, sistemi açar, çalıştırır ve durdurur"
    ],
    resim: "/smart-atik-su-kontrolor.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/smart-atik-su-kontrolor-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Güç Beslemesi 24VDC",
      "3 Faz kontrolü için bağlantı girişi",
      "128x64 LCD Grafik Ekran",
      "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
      "Başlatma bilgisi için komut girişi (Seviye Elektrodu veya Şamandıra)",
      "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
      "Oto-Manuel Durum bilgisi görüntüleme",
      "Korumalar ve Hatalar",
      "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
      "Faz kaybı ve Faz sırası hatası",
      "Min / Max Voltaj (Ayarlanabilir)",
      "Motor başlama zamanı",
      "Taşma uyarısı fonksiyonu",
      "Kuru çalışma koruması",
      "Pompa gövdesi su kaçağı uyarısı",
      "Pompa çalışma süre bilgisi",
      "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
      "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
      "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
      "MODBus Bağlantısı"
    ]
  },
  "derin-kuyu": {
    baslik: "Smart Derin Kuyu Kontrolörleri",
    aciklama: "Mikroişlemcili smart kontrolör, tek faz veya trifaz olarak 2 pompaya kadar sistemi kontrol eder. Smart Bore Hole kontrolör, sisteminizi yönetmeyi, parametreleri değiştirmeyi, olayları ve mesajları kayıt altına alma vb. gibi bir çok işlemi pratik bir şekilde yapmanızı sağlar. (Pis su ve temiz su uygulamalarında ki doldurma ve boşaltma süreçlerini gerçekleştirir)",
    ozellikler: [
      "3G / WI-FI modül sayesinde, uzak bir noktadan sistemi işletme, verileri görüntüleme ve sistemi kontrol etme sağlanır",
      "Kolay ve hızlı bir şekilde yönlendirme butonlarını kullanarak, net şekilde okunabilir LCD ekran üzerinden ayarların yapılması",
      "Şamandıra veya seviye elektrotlarından gelen bilgi ile, sistemi açar, çalıştırır ve durdurur"
    ],
    resim: "/smart-derin-kuyu-kontrolor.jpg",
    belgeler: [
      { isim: "Teknik Veri Sayfası", link: "/smart-derin-kuyu-kontrolor-datasheet.pdf" }
    ],
    teknikOzellikler: [
      "Güç Beslemesi 24VDC",
      "3 Faz kontrolü için bağlantı girişi",
      "128x64 LCD Grafik Ekran",
      "Motor Çalışıyor sinyali için yeşil renkli LED / Hatalar için kırmızı renkli LED",
      "Başlatma bilgisi için komut girişi (Seviye Elektrodu)",
      "Ana Sayfada Voltaj, Amper, Alarmlar, Basınç, Olaylar ve Tarih & Zaman bilgileri",
      "Oto-Manuel Durum bilgisi görüntüleme",
      "Korumalar ve Hatalar",
      "Motor Aşırı Akım / Düşük Akım (Ayarlanabilir)",
      "Faz kaybı ve Faz sırası hatası",
      "Min / Max Voltaj (Ayarlanabilir)",
      "Motor başlama zamanı",
      "Taşma uyarısı fonksiyonu",
      "Kuru çalışma koruması (Elektrot ile)",
      "Pompa çalışma süre bilgisi",
      "Bakım zamanı ayarlanabilme ve görüntülenebilme özelliği",
      "Yetkilendirilmemiş Kişilerin Ulaşmasını Engellemek için Şifre Korumalı Ekran",
      "Hataların, mesajların, olayların ve alarmların tarih ve zaman bilgileri ile birlikte dışarıya aktarılabilmesi için USB girişi. (Son 500 Durum)",
      "MODBus Bağlantısı"
    ]
  }
};

export default function SmartEndustriyel() {
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
          Smart Endüstriyel Kontrolörler
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
