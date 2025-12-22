"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliIsletmePage() {
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
          Akıllı İşletme.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Karar verme hızınızı teknolojiyle birleştirin.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Geleceğin işletmeleri sadece yönetilmez; öğrenir ve uyum sağlar. 
          Taytech Smart İşletme çözümleri, veriyi eyleme dönüştüren bir stratejidir. 
          Süreçlerinizi otomatikleştirin, büyümeye odaklanın ve olağanüstü deneyimler yaratın.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Veriden gelen zekâ.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Karmaşık veriler arasında kaybolmayın. Makine öğrenimi algoritmalarımızla, 
            operasyonel kararları makinelerin hassasiyeti ve hızıyla alın. 
            Değişen pazar koşullarına ve müşteri tercihlerine saniyeler içinde uyum sağlayın.
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
            Çevik ve koordine bir ekosistem.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Smart İşletme, tüm birimlerin ortak bir hedef için eş zamanlı çalıştığı çevrimiçi bir ağdır. 
            Verimlilik artık bir hedef değil, işletmenizin varsayılan çalışma biçimidir.
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
            Güçlü bir rekabet avantajı.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Hızın her şey olduğu bir dünyada, iş ortaklarınızla koordineli ve hızlı hareket edin. 
            Geleneksel modellerin ötesine geçerek, teknoloji tabanlı bir yapıyla 
            rakiplerinizin bir adım önünde yer alın.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


