"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliSehirPage() {
  return (
    <div className="bg-black min-h-screen pt-12">
      {/* Geri Butonu */}
      <div style={{ position: 'fixed', top: '80px', left: '60px', zIndex: 10 }}>
        <Link 
          href="/cozumler"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          className="hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Çözümler
        </Link>
      </div>

      {/* Ana İçerik */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        textAlign: 'left',
        padding: '120px 20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Ana Başlık */}
        <h1 style={{ 
          fontSize: '72px', 
          fontWeight: '700', 
          color: 'white',
          marginBottom: '24px',
          letterSpacing: '-2px'
        }}>
          Akıllı Şehir.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Şehir hayatı, yeniden programlandı.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Akıllı şehir, sadece bir yerleşim yeri değil; yaşayan ve sizinle etkileşime giren bir ekosistemdir. 
          Taytech olarak, IoT ve büyük veri analitiğini şehrin her noktasına entegre ediyoruz. 
          Daha sürdürülebilir, daha güvenli ve daha akıcı bir şehir deneyimi için teknolojiyi sokağa indiriyoruz.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Senkronize bir yaşam.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Ulaşımdan enerjiye, güvenlikten atık yönetimine kadar tüm şehir hizmetlerini 
            tek bir merkezden, akıllı ağlarla yönetin. Kaynakların israf edilmediği, 
            her verinin daha verimli bir yaşam için işlendiği, tamamen senkronize bir şehir yapısı inşa edin.
          </p>
        </div>

        {/* Bölüm 2 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Veriye dayalı gelecek.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Şehrin nabzını anlık olarak tutun. Taytech altyapısı sayesinde trafik yoğunluğunu, 
            hava kalitesini ve enerji tüketimini gerçek zamanlı analiz ederek hızlı ve doğru kararlar alın. 
            Vatandaşların yaşam kalitesini artırırken, operasyonel maliyetleri minimuma indirin.
          </p>
        </div>

        {/* Bölüm 3 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Sürdürülebilir ve zeki altyapı.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Daha yeşil bir dünya için daha akıllı şehirler. Yenilenebilir enerji kaynaklarını 
            şehir şebekesine entegre ediyor, karbon ayak izini azaltan çözümler sunuyoruz. 
            Taytech ile şehirler sadece bugünü değil, yarınları da güvence altına alıyor.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


