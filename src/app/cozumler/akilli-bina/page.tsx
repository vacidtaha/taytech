"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliBinaPage() {
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
          Akıllı Binalar.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Konforunuzdan ödün vermeden, enerjinizi yönetin.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Bir binanın sadece yüksek performanslı olması yetmez; aynı zamanda zeki olması gerekir. 
          Taytech Akıllı Bina sistemleri, enerji verimliliğini en üst düzeye çıkarırken 
          yaşam alanlarınızdaki konforu bir standart haline getirir.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Performans ve tasarruf. Tam bir uyum içinde.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            En karmaşık sistemleri, en düşük güç tüketimiyle çalıştırıyoruz. 
            Aydınlatma, ısıtma, klima ve havalandırma gibi yüksek enerji tüketen tüm bileşenler, 
            ihtiyaç duyulduğu an otomatik olarak devreye girer. Sonuç: Maksimum performans, minimum enerji.
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
            Konforun yeni tanımı.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            İyi bir akıllı bina sistemi, varlığını hissettirmeden çalışandır. 
            Taytech teknolojisi, kullanıcı alışkanlıklarını ve bina ihtiyaçlarını analiz ederek 
            iç mekan konforunu optimize eder. Siz sadece anın tadını çıkarırken, 
            sistem arka planda en ekonomik senaryoyu sizin yerinize saniyeler içinde kurgular.
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
            Yaşam döngüsü boyu ekonomi.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Bir binanın gerçek değeri, ömrü boyunca sunduğu sürdürülebilirliktir. 
            Beklentilerin ötesinde donanım ve akıllı yazılım entegrasyonuyla; 
            işletme maliyetlerinizi düşürüyor, binalarınızı geleceğin dünyasına hazırlıyoruz.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

