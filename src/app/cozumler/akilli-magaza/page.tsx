"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliMagazaPage() {
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
          Akıllı Mağaza.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Mağazanızı verinin gücüyle keşfedin.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Fiziksel mağazacılıkta yeni bir dönem. TT-Cloud platformu; sensörler, kameralar ve 
          akıllı donanımlarla mağazanızın her köşesini ölçülebilir kılar. Tüketici davranışlarından 
          personel performansına kadar her detayı anlık olarak görün.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Görünmeyeni görün.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Müşterilerinizin mağaza içindeki yolculuğunu analiz edin. 
            Akıllı tabelalar ve sensörlerle hangi ürünlerin ilgi gördüğünü, 
            hangi noktaların daha verimli olduğunu keşfedin. 
            Kararlarınızı tahminlere değil, gerçek verilere dayandırın.
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
            Operasyonel kusursuzluk.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Sadece müşterileri değil, operasyonunuzun kalbini de izleyin. 
            Bireysel şube performanslarını ve personel verimliliğini tek bir ekrandan takip edin. 
            TT-Cloud, en karmaşık donanımlardan gelen bilgileri işleyerek 
            mağazanızı yaşayan ve öğrenen bir ekosisteme dönüştürür.
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
            Geleceğin perakende deneyimi.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Tüketici alışkanlıklarına anında uyum sağlayın. 
            Personel gücünüzü ve mağaza yerleşiminizi veriye göre optimize ederek 
            hem müşteri memnuniyetini hem de karlılığınızı artırın.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


