"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliGuvenlikPage() {
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
          Akıllı Güvenlik.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Siz orada olmasanız da, kontrol sizde.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Akıllı güvenlik sistemleri, sadece bir teknoloji değil; hayatınızı kolaylaştıran bir huzur standartıdır. 
          Taytech ile yaşam alanlarınız ve işletmeleriniz, en gelişmiş sensör teknolojileri ve 
          anlık uyarı sistemleriyle 7/24 koruma altına alınır.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Her köşede mutlak kontrol.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Giriş-çıkış kontrol sistemlerinden kapı ve pencere sensörlerine kadar her nokta artık dijital birer bekçidir. 
            Eviniz veya iş yeriniz, siz nerede olursanız olun akıllı telefonunuzdan yönetebileceğiniz 
            güvenli bir kaleye dönüşür.
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
            Beklenmeyene karşı hazırlıklı olun.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Hayatın risklerine karşı proaktif çözümler. 
            Hırsızlık, yangın, su baskını veya gaz kaçağı gibi kritik durumlarda saniyeler içinde uyarı alın. 
            Taytech sistemleri, sadece olay anında değil; tehlikeyi sezdiği anda devreye girer.
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
            İhtiyacınıza göre şekillenen koruma.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Güvenlik tek tip olamaz. Kamera sistemlerinden karmaşık kontrol mekanizmalarına kadar 
            tüm donanımları, sizin özel ihtiyaçlarınıza ve alanınızın yapısına göre özelleştiriyoruz. 
            Esnek, ölçeklenebilir ve her zaman uyanık.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


