"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliEnerjiPage() {
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
          Akıllı Enerji.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Daha az kaynak, daha fazla güç.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Geleceğin enerji sistemleri sadece temiz değil, aynı zamanda zekidir. 
          Taytech Smart Enerji çözümleri; rüzgar, güneş ve biyokütle gibi düşük karbonlu kaynakları 
          en yüksek verimle yöneterek atıkları azaltır, maliyetleri düşürür ve dünyamızı korur.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            İzlenebilir. Kontrol edilebilir. Güvenli.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Şebekenin ilk aşamasından son noktasına kadar her şey kontrolünüz altında. 
            Uzaktan izleme ve yönetim altyapımızla, enerji akışını saniyeler içinde optimize ediyoruz. 
            Bu sadece bir izleme sistemi değil; enerjiyi en karlı ve güvenli şekilde kullanma stratejisidir.
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
            Sürdürülebilirlik, sosyal konforla buluşuyor.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            İnsanların sosyal ihtiyaçlarını karşılarken doğaya olan sorumluluğumuzu unutmuyoruz. 
            Akıllı enerji sistemlerimizle, çevreye duyarlı bir yapı kurarken tüketicilere 
            ekonomik ve kesintisiz bir enerji tedarik sistemi sağlıyoruz.
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
            Minimum tüketim, maksimum gelecek.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Daha az kapasiteyle daha büyük işler başarın. 
            Akıllı teknolojilerimiz, ön maliyetleri optimize ederek enerji tüketimini minimize eder. 
            Taytech ile enerji artık kontrolsüz bir gider değil, yönetilebilir bir değerdir.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


