"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function KurumsalPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("muhendislik");
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["muhendislik", "rakamlar", "standartlar", "surdurulebilirlik", "destek"];
      const scrollPosition = window.scrollY + 300;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Ana Header - Beyaz, scroll ile kaybolur */}
      <Header theme="light" isFixed={false} onMenuOpenChange={setIsMenuOpen} />
      
      {/* İkinci Header - Sticky (mega menü açıkken gizlenir) */}
      {!isMenuOpen && (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="h-12 px-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:block w-[180px]"></div>
            <span className="text-[21px] font-normal text-[#86868b]">Taytech</span>
            <span className="ml-6 text-[21px] font-semibold text-[#1d1d1f]">Kurumsal</span>
          </div>
          <nav className="hidden md:flex items-center gap-8" style={{ marginRight: '100px' }}>
            <a href="#muhendislik" className={`text-[13px] transition-colors ${activeSection === "muhendislik" ? "font-medium text-[#1d1d1f]" : "text-[#424245] hover:text-[#1d1d1f]"}`}>
              Her detayda mühendislik.
            </a>
            <a href="#rakamlar" className={`text-[13px] transition-colors ${activeSection === "rakamlar" ? "font-medium text-[#1d1d1f]" : "text-[#424245] hover:text-[#1d1d1f]"}`}>
              Rakamlarla üretim gücü.
            </a>
            <a href="#standartlar" className={`text-[13px] transition-colors ${activeSection === "standartlar" ? "font-medium text-[#1d1d1f]" : "text-[#424245] hover:text-[#1d1d1f]"}`}>
              Standartların ötesinde.
            </a>
            <a href="#surdurulebilirlik" className={`text-[13px] transition-colors ${activeSection === "surdurulebilirlik" ? "font-medium text-[#1d1d1f]" : "text-[#424245] hover:text-[#1d1d1f]"}`}>
              Sürdürülebilirlik ve Verimlilik.
            </a>
            <a href="#destek" className={`text-[13px] transition-colors ${activeSection === "destek" ? "font-medium text-[#1d1d1f]" : "text-[#424245] hover:text-[#1d1d1f]"}`}>
              Tam destek.
            </a>
          </nav>
        </div>
      </div>
      )}

      {/* Hero Section - Açık Gri */}
      <div id="muhendislik" className="w-full">
        <div className="w-full h-[550px] bg-[#f5f5f7] flex items-center justify-center">
          <div className="max-w-3xl text-center px-8">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-14">
              Her detayda mühendislik.
            </h2>
            <p className="text-xl md:text-2xl text-[#424245] leading-relaxed">
              40 yıllık sektörel birikim, Taytech'in temelini oluşturur. Tasarımdan üretime kadar tüm süreçleri kendi bünyemizde yönetiyor; elektronik kontrol ve veri yönetiminde uçtan uca çözümler sunuyoruz.
            </p>
          </div>
        </div>
      </div>
      
      {/* Boşluk */}
      <div className="h-[120px] bg-white"></div>
      
      {/* Beyaz Alan - Görsel */}
      <div className="bg-white pb-20 flex items-center justify-center">
        <Image
          src="/taytechdiscekim.png"
          alt="Taytech Dış Çekim"
          width={800}
          height={500}
          className="w-full max-w-4xl h-auto object-contain px-8 rounded-4xl"
        />
      </div>
      
      {/* Boşluk */}
      <div className="h-[120px] bg-white"></div>
      
      {/* Rakamlarla Üretim Gücü Bölümü - Sticky Sol, Scroll Sağ */}
      <div id="rakamlar" className="bg-white">
        <div className="grid grid-cols-2">
          {/* Sol Grid - Sticky Metin */}
          <div className="py-20 flex justify-center">
            <div className="sticky top-[30vh] h-fit max-w-md px-8 flex flex-col" style={{ gap: '80px' }}>
              {/* Rakamlarla üretim gücü */}
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">
                  Rakamlarla üretim gücü.
                </h2>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">
                  Büyük ölçekli düşünmek, güçlü bir altyapı gerektirir. Taytech olarak, tüm operasyonlarımızı Gebze Plastikçiler Organize Sanayi Bölgesi'ndeki modern tesislerimizde gerçekleştiriyoruz.
                </p>
              </div>
              
              {/* Uçtan Uca Entegrasyon */}
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">Uçtan Uca Entegrasyon</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">
                  Tasarımdan karta, montajdan son test aşamasına kadar her şey tek çatı altında. Bu, kalite kontrol süreçlerimizde sıfır hata hedeflememizi sağlar.
                </p>
              </div>
              
              {/* Modern Makine Parkuru */}
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">Modern Makine Parkuru</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">
                  Hassas mühendislik gerektiren her parça, en güncel teknolojik ekipmanlarla ve yalın yönetim prensipleriyle işlenir.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sağ Grid - Scroll ile Beliren Kartlar (Stacking Cards) */}
          <div className="flex flex-col items-center px-8" style={{ paddingTop: '70vh', paddingBottom: '300px' }}>
            {/* Kart 1 - 5.600 m² */}
            <div className="sticky top-[calc(50vh-266px)] z-10 mb-[-350px]">
              <div 
                className="bg-[#f7f7f9] rounded-3xl shadow-lg"
                style={{ width: '400px', height: '533px', padding: '48px 40px 40px 40px' }}
              >
                <span className="text-7xl font-semibold text-[#1d1d1f] leading-none block">5.600 m²</span>
                <p className="text-3xl text-black mt-6 font-semibold">Toplam Alan</p>
                <p className="text-lg text-[#86868b] mt-6 leading-relaxed font-medium">
                  Üretim ve yeniliğin birleştiği devasa bir ekosistem.
                </p>
              </div>
            </div>
            
            {/* Kart 2 - 4.750 m² */}
            <div className="sticky top-[calc(50vh-266px)] z-20 mb-[-350px]">
              <div 
                className="bg-[#f3f3f5] rounded-3xl shadow-lg"
                style={{ width: '400px', height: '533px', padding: '48px 40px 40px 40px' }}
              >
                <span className="text-7xl font-semibold text-[#1d1d1f] leading-none block">4.750 m²</span>
                <p className="text-3xl text-black mt-6 font-semibold">Üretim Parkuru</p>
                <p className="text-lg text-[#86868b] mt-6 leading-relaxed font-medium">
                  En son teknoloji makine hatları ve akıllı montaj istasyonlarıyla donatılmış, yüksek kapasiteli üretim merkezi.
                </p>
              </div>
            </div>
            
            {/* Kart 3 - 860 m² */}
            <div className="sticky top-[calc(50vh-266px)] z-30">
              <div 
                className="bg-[#f0f0f2] rounded-3xl shadow-lg"
                style={{ width: '400px', height: '533px', padding: '48px 40px 40px 40px' }}
              >
                <span className="text-7xl font-semibold text-[#1d1d1f] leading-none block">860 m²</span>
                <p className="text-3xl text-black mt-6 font-semibold">Ar-Ge Merkezi</p>
                <p className="text-lg text-[#86868b] mt-6 leading-relaxed font-medium">
                  Fikirlerin prototipe, prototiplerin standartları belirleyen teknolojilere dönüştüğü özel bir tasarım alanı.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boşluk */}
      <div className="h-[400px] bg-white"></div>
      
      {/* Standartların Ötesinde Bölümü - Sticky Sol, Scroll Sağ */}
      <div id="standartlar" className="bg-white">
        <div className="grid grid-cols-2">
          {/* Sol Grid - Sticky Metin */}
          <div className="py-20 flex justify-center">
            <div className="sticky top-[15vh] h-fit max-w-md px-8 flex flex-col" style={{ gap: '60px' }}>
              {/* Standartların ötesinde */}
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">
                  Standartların ötesinde.
                </h2>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">
                  Kalite, Taytech için bir sonuç değil; bir başlangıç noktasıdır. Tüm üretim ve yönetim süreçlerimizi, küresel endüstriyel standartların en güncel hallerine göre yapılandırdık.
                </p>
              </div>
              
              {/* ISO Sertifikaları */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#1d1d1f]">ISO 9001:2015</span>
                  <span className="text-lg text-[#86868b]">Kalite Yönetimi</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#1d1d1f]">ISO 14001:2015</span>
                  <span className="text-lg text-[#86868b]">Çevresel Sorumluluk</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#1d1d1f]">ISO 45001:2018</span>
                  <span className="text-lg text-[#86868b]">İş Sağlığı ve Güvenliği</span>
                </div>
              </div>
              
              {/* Mevzuat Uyumu */}
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">Mevzuat Uyumu</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">
                  Teknik, ulusal ve uluslararası mevzuatları anlık olarak takip ediyoruz. Ürünlerimizin ve hizmetlerimizin sadece bugünün değil, geleceğin regülasyonlarına da hazır olmasını sağlıyoruz.
                </p>
              </div>
              
              {/* Sürekli Denetim */}
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">Sürekli Denetim</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">
                  Yönetim sistemimiz, bağımsız denetçiler ve iç ekiplerimiz tarafından düzenli olarak test edilir. Bu, Taytech isminin her zaman "güvenilirlik" ile eş anlamlı kalmasını sağlar.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sağ Grid - Politika Belgesi */}
          <div className="flex flex-col items-center px-8" style={{ paddingTop: '70vh', paddingBottom: '300px' }}>
            <div className="sticky top-[5vh] z-10">
              <div 
                className="bg-white shadow-2xl relative"
                style={{ width: '650px', padding: '70px 60px', borderRadius: '4px' }}
              >
                {/* Kırmızı köşeler */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-red-600 rounded-tl"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-red-600 rounded-tr"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-red-600 rounded-bl"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-red-600 rounded-br"></div>
                
                {/* Logo */}
                <div className="flex justify-center mb-10 -mt-2">
                  <Image
                    src="/logo.png"
                    alt="Taytech Logo"
                    width={180}
                    height={60}
                    className="h-auto"
                  />
                </div>
                
                {/* Başlık */}
                <h3 className="text-center font-bold text-[#1d1d1f] mb-10" style={{ fontSize: '24px', lineHeight: '1.4' }}>
                  KALİTE, ÇEVRE, İŞ SAĞLIĞI ve GÜVENLİĞİ<br />
                  POLİTİKASI
                </h3>
                
                {/* İçerik */}
                <div className="text-[#424245] leading-relaxed" style={{ fontSize: '14px' }}>
                  <p className="mb-6">
                    Elektriğin Kontrol ve Dağıtımına Özgü Cihazlar, Isı İstasyonu ve Manyetik Filtre İmalat faaliyetlerini gerçekleştiren ve sektöründe öncü bir kuruluş olan TAY TECH'in 'Hizmette ve Üretimde Mükemmellik' en önemli ilkesidir.
                  </p>
                  
                  <p className="mb-6">
                    ISO 9001, ISO 14001, ISO 45001 standartları gerekliliklerine uygun olarak oluşturduğumuz entegre yönetim sistemini sürekli iyileştirmeyi, bu çerçevede tanımladığımız politikayı periyodik olarak gözden geçirmeyi ve geliştirmeyi taahhüt ederiz. Bu kapsamda;
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-3 mb-6">
                    <li>Deneyimli ve eğitimli kadromuz ile uygun fiyat ve ödeme şartlarında müşterilerimize en iyi hizmeti sunarak müşteri memnuniyetini sağlamayı,</li>
                    <li>Teknolojiyi yakından takip ederek en son üretim sistem ve donanımlarını bünyemize katarak sürekli gelişmeyi,</li>
                    <li>Her aşamada büyük bir özenle yürütülen çalışmalar sonucu üretilen ürünler için yüzde yüz kalite kontrolü gerçekleştirmeyi,</li>
                    <li>Müşterilerimiz, tedarikçilerimiz ve çalışanlarımız başta olmak üzere ilgili tarafların ihtiyaç ve beklentilerinin anlaşılmasını sağlayarak bu doğrultuda faaliyetlerimizi gerçekleştirmeyi,</li>
                    <li>Faaliyetlerimizi ve ürünlerimizi standart kalitede gerçekleştirmeyi,</li>
                    <li>Faaliyet kapsamımızdaki yasal ve diğer şartlara uymayı,</li>
                    <li>Faaliyetimizden kaynaklı tehlikeleri tespit ederek risk değerlendirme çalışmasını yapmayı ve gerekli düzeltici faaliyetleri uygulamayı,</li>
                    <li>İş sağlığı ve güvenliği kapsamındaki olayları ve meslek hastalıklarını önlemeyi,</li>
                    <li>Çevre amaçları ile uyumlu olarak faaliyetlerimizin ve ürünlerimizin çevre üzerindeki olumsuz etkilerini en aza indirmeyi mümkünse ortadan kaldırmayı,</li>
                    <li>Çevresel risk değerlendirme çalışmasını yapmayı ve gerekli düzeltici faaliyetleri uygulamayı,</li>
                    <li>Faaliyetlerimizi gerçekleştirirken kirliliği önlemeyi ve doğal kaynaklarımızı korumayı,</li>
                    <li>Atık yönetim planı kapsamında atıklarımızı ayrıştırarak geri kazanımını sağlamayı, geri kazanımı mümkün olmayan atıklarımızı uygun bir şekilde bertaraf ettirmeyi,</li>
                    <li>Faaliyetlerimizi kalite yönetim prensipleri doğrultusunda gerçekleştirerek sürekli iyileştirmeyi sağlamayı,</li>
                  </ul>
                  
                  <p className="mb-10 font-semibold text-[15px]">taahhüt ederiz.</p>
                  
                  {/* İmza */}
                  <div className="text-right mt-12">
                    <p className="text-[#86868b] text-base mb-1">Genel Müdür</p>
                    <p className="font-bold text-[#1d1d1f] text-xl">Tayfun Başaran</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boşluk */}
      <div className="h-[200px] bg-white"></div>
      
      {/* Sürdürülebilirlik ve Verimlilik Bölümü */}
      <div id="surdurulebilirlik" className="bg-white py-20">
        <div className="flex flex-col items-center">
          {/* Başlık */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4">
              Sürdürülebilirlik ve Verimlilik.
            </h2>
            <p className="text-2xl text-[#86868b] font-medium">Daimî olma yeteneği.</p>
          </div>
          
          {/* Açıklama */}
          <div className="max-w-3xl text-center px-8" style={{ marginBottom: '60px' }}>
            <p className="text-xl text-[#424245] leading-relaxed">
              Taytech için sürdürülebilirlik, sadece bir çevre politikası değil; kaynakların, teknolojinin ve kurumsal değişimin tam bir uyum içinde yönetilmesidir. Geleceğin ihtiyaçlarını bugünden koruyan dengeli bir üretim ekosistemi inşa ediyoruz.
            </p>
          </div>
          
          {/* 4x2 Grid - Şeker Tahtası Düzeni */}
          <div className="grid grid-cols-4 gap-4 max-w-6xl">
            {/* Satır 1 */}
            {/* Kutu 1 - İçerik */}
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              {/* Dünya İkonu */}
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Ekonomik Büyüme ve Çevre Dengesi</h3>
                <p className="text-sm text-[#424245] leading-relaxed">
                  Sosyal gelişimi ve ekonomik büyümeyi, çevre koruma prensipleriyle aynı potada eritiyoruz.
                </p>
              </div>
            </div>
            
            {/* Kutu 2 - Çevre Fotoğrafı */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/cevre1.jpeg" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            
            {/* Kutu 3 - İçerik */}
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              {/* Yaprak İkonu */}
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Yalın Yönetim Felsefesi</h3>
                <p className="text-sm text-[#424245] leading-relaxed">
                  Tüm süreçleri tanımlayarak ölçülebilir bir yapı kuruyoruz. Her iyileştirme, daha az kaynak tüketimi demektir.
                </p>
              </div>
            </div>
            
            {/* Kutu 4 - Çevre Fotoğrafı */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/cevre2.jpg" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            
            {/* Satır 2 */}
            {/* Kutu 5 - Çevre Fotoğrafı */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/cevre3.avif" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            
            {/* Kutu 6 - İçerik */}
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              {/* Su Damlası İkonu */}
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Kaynakların Etkin Kullanımı</h3>
                <p className="text-sm text-[#424245] leading-relaxed">
                  Tasarladığımız her çözümde enerji tasarrufunu standart hale getiriyoruz.
                </p>
              </div>
            </div>
            
            {/* Kutu 7 - Çevre Fotoğrafı */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/cevre4.jpg" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            
            {/* Kutu 8 - İçerik */}
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              {/* Ağaç/Fidanİkonu */}
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5">
                <path d="M12 22v-7"/>
                <path d="M9 22h6"/>
                <path d="M12 15a5 5 0 0 0 5-5c0-2-1-3-2-4l1-3-3 1-1-2-1 2-3-1 1 3c-1 1-2 2-2 4a5 5 0 0 0 5 5z"/>
              </svg>
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Geleceği Korumak</h3>
                <p className="text-sm text-[#424245] leading-relaxed">
                  Sürdürülebilirlik bizim için bir varış noktası değil, sürekli bir gelişim yolculuğudur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boşluk */}
      <div className="h-[200px] bg-white"></div>
      
      {/* Tam Destek Bölümü - Apple Tarzı Sıradışı Tasarım */}
      <div id="destek" className="bg-white py-32 overflow-hidden">
        <div className="flex flex-col items-center px-8">
          {/* Hero Başlık */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            {/* Destek Simgesi - Tokalaşma */}
            <div className="w-20 h-20 bg-[#0066cc] rounded-2xl flex items-center justify-center" style={{ marginBottom: '30px' }}>
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-[#0066cc] mb-4">
              Tam destek.
            </h2>
            <p className="text-2xl md:text-3xl text-[#0066cc]/70 font-semibold">Her adımda, her çözümde.</p>
          </div>
          
          {/* Ana Açıklama */}
          <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: '60px' }}>
            <p className="text-xl text-[#1d1d1f] leading-relaxed font-medium">
              Mühendislik deneyimimizi, ihtiyaç duyduğunuz her an yanınızda olacak bir danışmanlık hizmetine dönüştürüyoruz. Sadece ürün sunmuyor; projenizin ömür boyu verimli çalışmasını sağlayacak uzman desteğini garanti ediyoruz.
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-4 grid-rows-2 gap-4 w-full max-w-5xl" style={{ height: '600px' }}>
            {/* Büyük Kart - Sol (2x2) */}
            <div className="col-span-2 row-span-2 bg-[#0077b6] rounded-3xl flex flex-col justify-center relative overflow-hidden" style={{ padding: '48px' }}>
              <svg className="w-12 h-12 mb-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <h3 className="text-3xl font-bold text-white mb-4">Bütünsel Danışmanlık</h3>
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                Satış öncesi süreçten başlayarak, projenize en uygun teknolojik altyapıyı birlikte kurguluyoruz. Uzman ekibimizle ihtiyaçlarınızı analiz ediyor ve en verimli çözümü sunuyoruz.
              </p>
            </div>
            
            {/* Üst Sağ Kart 1 */}
            <div className="col-span-1 row-span-1 bg-[#0096c7] rounded-3xl flex flex-col justify-center relative overflow-hidden" style={{ padding: '28px' }}>
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Hızlı Çözüm</h3>
              <p className="text-sm text-white/90 font-medium">En kısa sürede teknik destek</p>
            </div>
            
            {/* Üst Sağ Kart 2 */}
            <div className="col-span-1 row-span-1 bg-[#00b4d8] rounded-3xl flex flex-col justify-center relative overflow-hidden" style={{ padding: '28px' }}>
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Satış Sonrası</h3>
              <p className="text-sm text-white/90 font-medium">Kurulumdan sonra da yanınızdayız</p>
            </div>
            
            {/* Alt Sağ Geniş Kart */}
            <div className="col-span-2 row-span-1 bg-[#48cae4] rounded-3xl flex items-center gap-6 relative overflow-hidden" style={{ padding: '32px' }}>
              <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Eğitimli Kadro, Modern Altyapı</h3>
                <p className="text-base text-white/90 font-medium">Son teknoloji ve makinelerle sürekli güncellenen ekibimiz, en karmaşık sistemlerde bile size yol gösterecek teknik donanıma sahiptir.</p>
              </div>
            </div>
          </div>
          
          {/* Alt Vurgu - Tam Genişlik Kart */}
          <div className="w-full max-w-5xl" style={{ marginTop: '16px' }}>
            <div className="bg-[#90e0ef] rounded-3xl flex items-center justify-center gap-6" style={{ height: '200px', padding: '32px 48px' }}>
              <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Rekabetçi Güç</h3>
                <p className="text-base text-white/90 font-medium">En iyi hizmeti, en doğru ödeme şartları ve rekabetçi fiyatlarla sunarak iş ortaklarımızın başarısını destekliyoruz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boş Alan */}
      <div className="h-[100px] bg-white"></div>
      
      <Footer theme="light" />
    </div>
  );
}


