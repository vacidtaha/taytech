import { Hero } from "@/components";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Briefcase, 
  Truck, 
  Store, 
  Building, 
  Zap, 
  Leaf, 
  Landmark, 
  Shield 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      <Hero />
      
      {/* Content Area */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "13px" }}>
        {/* Ürün Grid */}
        <div style={{ marginLeft: "13px", marginRight: "13px" }}>
          <div className="grid grid-cols-2 gap-[13px]">
            <Link href="/urunler/akilli-kontrol-panolari" className="bg-white aspect-[4/3] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0">Akıllı Kontrol Panoları</h3>
              <Image 
                src="/akilli-kontrol.png" 
                alt="Akıllı Kontrol Panoları" 
                width={280}
                height={210}
                className="absolute top-[40%] object-contain"
              />
            </Link>
            <Link href="/urunler/isi-istasyonu" className="bg-white aspect-[4/3] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0">Isı İstasyonu Uygulamaları</h3>
              <Image 
                src="/isikontrol-hazir.png" 
                alt="Isı İstasyonu" 
                width={350}
                height={260}
                className="absolute top-[40%] object-contain"
              />
            </Link>
            <Link href="/urunler/manyetik-filtre" className="bg-white aspect-[4/3] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0">IRONTRAP® Manyetik Filtre</h3>
              <Image 
                src="/manyetik-filtre.png" 
                alt="IRONTRAP Manyetik Filtre" 
                width={280}
                height={210}
                className="absolute top-[40%] object-contain"
              />
            </Link>
            <Link href="/urunler/elektronik" className="bg-white aspect-[4/3] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0">Elektronik</h3>
              <Image 
                src="/elektronik.png" 
                alt="Elektronik" 
                width={350}
                height={260}
                className="absolute top-[40%] object-contain"
              />
            </Link>
            <Link href="/urunler/taytech-cloud" className="bg-white aspect-[4/3] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0">Taytech Cloud</h3>
              <Image 
                src="/cloud.png" 
                alt="Taytech Cloud" 
                width={350}
                height={260}
                className="absolute top-[40%] object-contain"
              />
            </Link>
            <Link href="/urunler/temizleyici-sivilar" className="bg-white aspect-[4/3] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0">IRONTRAP® Koruyucu ve Temizleyici Sıvılar</h3>
              <Image 
                src="/temizleyici.png" 
                alt="IRONTRAP Koruyucu ve Temizleyici Sıvılar" 
                width={180}
                height={135}
                className="absolute top-[40%] object-contain"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 13px Boşluk */}
      <div style={{ height: '13px', backgroundColor: '#f5f5f7' }}></div>

      {/* Standartların Ötesinde */}
      <div className="w-full h-[650px] bg-white grid grid-cols-2">
        {/* Sol Taraf - Gradyan Kutu */}
        <div className="flex items-center justify-center">
          <div className="w-80 h-80 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at center, #ff6b6b 0%, #dc2626 50%, #991b1b 100%)' }}>
            {/* 2x2 Grid - Ortada */}
            <div className="grid grid-cols-2 gap-1">
              {/* Sol Üst - Ana Simge */}
        <Image
                src="/simge.png"
                alt="Simge"
                width={95}
                height={95}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              
              {/* Sağ Üst - Kalkan */}
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              
              {/* Sol Alt - Tik */}
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              
              {/* Sağ Alt - Dünya */}
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Sağ Taraf - İçerik */}
        <div className="relative h-full px-16">
          {/* Orta - Ana İçerik */}
          <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 text-left">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to bottom right, #dc2626, #991b1b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Standartların ötesinde.
            </h2>
            <p className="text-xl text-[#424245] mb-12">
              Kalite, Taytech için bir sonuç değil; bir başlangıç noktasıdır. Tüm üretim ve yönetim süreçlerimizi, küresel endüstriyel standartların en güncel hallerine göre yapılandırdık.
            </p>
            
            {/* ISO Badges */}
            <div className="flex gap-10">
              <div>
                <span className="text-2xl font-bold text-[#dc2626]">ISO 9001:2015</span>
                <p className="text-base text-[#86868b] mt-2">Kalite Yönetimi</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#dc2626]">ISO 14001:2015</span>
                <p className="text-base text-[#86868b] mt-2">Çevresel Sorumluluk</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#dc2626]">ISO 45001:2018</span>
                <p className="text-base text-[#86868b] mt-2">İş Sağlığı ve Güvenliği</p>
              </div>
            </div>
          </div>
          
          {/* Alt - Buton */}
          <div className="absolute left-16" style={{ bottom: '160px' }}>
            <Link 
              href="/kurumsal"
              className="bg-[#dc2626] text-white text-sm font-medium transition-all duration-300 hover:bg-[#b91c1c] w-fit inline-block"
              style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '10px', paddingBottom: '10px', borderRadius: '0px' }}
            >
              Kurumsalı oku
            </Link>
          </div>
        </div>
      </div>

      {/* Çözümler Container */}
      <div className="w-full h-[520px] bg-[#f5f5f7] flex flex-col items-center justify-center relative overflow-hidden" style={{ marginTop: '13px' }}>
        {/* Sol Taraf - 4 Yazı */}
        <span className="absolute text-xl font-medium smart-text smart-text-1" style={{ top: '15%', left: '8%', color: '#dc2626' }}>Akıllı Bina</span>
        <span className="absolute text-xl font-medium smart-text smart-text-2" style={{ top: '35%', left: '6%', color: '#dc2626' }}>Akıllı Taşıma</span>
        <span className="absolute text-xl font-medium smart-text smart-text-3" style={{ top: '55%', left: '8%', color: '#dc2626' }}>Akıllı Şehir</span>
        <span className="absolute text-xl font-medium smart-text smart-text-4" style={{ top: '75%', left: '6%', color: '#dc2626' }}>Akıllı Güvenlik</span>
        
        {/* Sağ Taraf - 4 Yazı */}
        <span className="absolute text-xl font-medium smart-text smart-text-5" style={{ top: '15%', right: '8%', color: '#dc2626' }}>Akıllı İşletme</span>
        <span className="absolute text-xl font-medium smart-text smart-text-6" style={{ top: '35%', right: '6%', color: '#dc2626' }}>Akıllı Mağaza</span>
        <span className="absolute text-xl font-medium smart-text smart-text-7" style={{ top: '55%', right: '8%', color: '#dc2626' }}>Akıllı Enerji</span>
        <span className="absolute text-xl font-medium smart-text smart-text-8" style={{ top: '75%', right: '6%', color: '#dc2626' }}>Akıllı Tarım</span>
        
        <h2 className="text-3xl md:text-4xl text-center mb-4 z-10" style={{ fontWeight: 450, color: '#dc2626' }}>
          Sunduğumuz Çözümleri Keşfet
        </h2>
        <p className="text-lg md:text-xl text-[#86868b] text-center z-10" style={{ marginBottom: '60px', fontWeight: 450 }}>
          Kontrol sistemleri endüstrisinde en iyi çözümler
        </p>
        
        {/* Smart Çözümler - 5-4 Düzeni */}
        <div className="flex flex-col items-center gap-10 z-10">
          {/* İlk Satır - 5 simge */}
          <div className="flex justify-center gap-14">
            <Building2 size={68} strokeWidth={1.5} color="#dc2626" />
            <Briefcase size={68} strokeWidth={1.5} color="#dc2626" />
            <Truck size={68} strokeWidth={1.5} color="#dc2626" />
            <Store size={68} strokeWidth={1.5} color="#dc2626" />
            <Building size={68} strokeWidth={1.5} color="#dc2626" />
          </div>
          
          {/* İkinci Satır - 4 simge */}
          <div className="flex justify-center gap-14">
            <Zap size={68} strokeWidth={1.5} color="#dc2626" />
            <Leaf size={68} strokeWidth={1.5} color="#dc2626" />
            <Landmark size={68} strokeWidth={1.5} color="#dc2626" />
            <Shield size={68} strokeWidth={1.5} color="#dc2626" />
          </div>
          
          {/* Çözümlerimiz Butonu */}
          <Link 
            href="/cozumler"
            className="mt-4 bg-[#dc2626] text-white text-base font-medium transition-all duration-300 hover:bg-[#b91c1c]"
            style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '12px', paddingBottom: '12px', borderRadius: '20px', textDecoration: 'none' }}
          >
            Çözümlerimiz
          </Link>
        </div>
      </div>

      {/* Haberler - Pinterest Tarzı */}
      <div className="w-full bg-white" style={{ marginTop: '13px', padding: '80px 100px' }}>
        {/* Başlık */}
        <div className="flex items-center justify-between mb-20">
          <div>
            <h2 className="text-4xl font-bold text-[#1d1d1f] mb-2 flex items-center gap-4">
              Bizden Haberler
              <span style={{
                backgroundColor: '#1d1d1f',
                color: 'white',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '4px'
              }}>BETA - Hazırlanıyor</span>
            </h2>
          </div>
          <Link 
            href="/haberler"
            className="hover:bg-[#1d1d1f] hover:text-white transition-all duration-300"
            style={{
              backgroundColor: 'transparent',
              color: '#1d1d1f',
              fontSize: '14px',
              fontWeight: 500,
              padding: '12px 24px',
              borderRadius: '0px',
              textDecoration: 'none',
              display: 'inline-block',
              border: '1px solid rgba(0,0,0,0.2)',
              marginTop: '-20px'
            }}
          >
            Tüm Haberler →
          </Link>
        </div>

        {/* Pinterest Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 280px)',
          gap: '24px'
        }}>
          {/* Büyük Kart - Sol Üst (2 satır kaplıyor) */}
          <div 
            style={{ 
              gridRow: 'span 2',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
            className="group"
          >
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)',
                zIndex: 1
              }} 
            />
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }} 
            />
            <Image 
              src="/akıllıbina.jpg"
              alt="Haber 1"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 2 }}>
              <h3 className="text-2xl font-bold text-white leading-tight">Taytech, Mas Academy&apos;nin Konuğu Oldu</h3>
              <p className="text-white/60 text-sm mt-2">16 Ekim 2023</p>
            </div>
          </div>

          {/* Orta Üst Kart */}
          <div 
            style={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
            className="group"
          >
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)',
                zIndex: 1
              }} 
            />
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }} 
            />
            <Image 
              src="/akıllısehir.jpg"
              alt="Haber 2"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">IRONTRAP® Manyetik Filtre Serisi Genişliyor</h3>
            </div>
          </div>

          {/* Sağ Üst Geniş Kart (2 sütun) */}
          <div 
            style={{ 
              gridColumn: 'span 2',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
            className="group"
          >
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%)',
                zIndex: 1
              }} 
            />
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }} 
            />
            <Image 
              src="/konferans.jpg"
              alt="Kontrol Panoları"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '24px', right: '40%', zIndex: 2 }}>
              <h3 className="text-xl font-bold text-white leading-tight">Yeni Nesil Smart Kontrol Panoları Tanıtıldı</h3>
              <p className="text-white/60 text-sm mt-2">8 Kasım 2023</p>
            </div>
          </div>

          {/* Alt Orta Kart */}
          <div 
            style={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
            className="group"
          >
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)',
                zIndex: 1
              }} 
            />
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }} 
            />
            <Image 
              src="/yenilik.jpg"
              alt="Yenilik"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">Isı İstasyonu Uygulamalarında Yenilik</h3>
            </div>
          </div>

          {/* Alt Sağ Kart 1 */}
          <div 
            style={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
            className="group"
          >
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)',
                zIndex: 1
              }} 
            />
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }} 
            />
            <Image 
              src="/tesis.jpeg"
              alt="Gebze Tesisleri"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">Gebze Tesislerinde Kapasite Artışı</h3>
            </div>
          </div>

          {/* Alt Sağ Kart 2 */}
          <div 
            style={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}
            className="group"
          >
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)',
                zIndex: 1
              }} 
            />
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }} 
            />
            <Image
              src="/taytechcloudfoto.avif"
              alt="Taytech Cloud"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">Taytech Cloud Platformu Yayında</h3>
            </div>
          </div>
        </div>
      </div>
      
      <Footer theme="white" />
    </div>
  );
}
