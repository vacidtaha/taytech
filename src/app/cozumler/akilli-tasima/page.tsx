"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliTasimaPage() {
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
          Akıllı Taşıma.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Şehrin ritmini teknolojiyle belirleyin.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Akıllı Ulaşım Sistemleri (ITS), modern şehirlerin damarlarıdır. Taytech olarak, 
          Nesnelerin İnterneti (IoT) ve büyük veri analitiğini kullanarak ulaşımı sadece 
          bir yerden bir yere gitmek değil; hızlı, güvenli ve akıllı bir deneyim haline getiriyoruz.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Tam zamanında. Her zaman.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Bağlantılı ulaşım ağlarımız sayesinde, araçlar ve cihazlar birbiriyle anlık olarak konuşur. 
            Trafiği aktif olarak yöneten bu zekâ, toplu taşıma sistemlerinin programlarına 
            saniyelerle uyum sağlamasını sağlar. Gecikmelere yer yok.
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
            Gerçek zamanlı bilgi, kesintisiz hareket.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Şehrin trafiğini ve ulaşım koşullarını görünür kılıyoruz. Vatandaşların güncel bilgilere 
            anlık erişimini sağlayarak, belirsizliği ortadan kaldırıyor ve şehir içi mobiliteyi 
            en verimli seviyeye taşıyoruz.
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
            Akıllı altyapı, sürdürülebilir gelecek.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Ulaşım altyapısını veriye dayalı arayüzlerle güçlendiriyoruz. 
            Büyük veri analitiği ile trafiği sadece izlemiyor, yönetiyoruz. 
            Bu, daha az karbon ayak izi ve daha akıcı bir şehir hayatı demek.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


