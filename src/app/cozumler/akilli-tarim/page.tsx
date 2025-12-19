"use client";

import Footer from "@/components/Footer";
import Link from "next/link";

export default function AkilliTarimPage() {
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
          Akıllı Tarım.
        </h1>
        
        {/* Alt Başlık */}
        <p style={{ 
          fontSize: '28px', 
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          marginBottom: '80px',
          lineHeight: '1.4'
        }}>
          Toprağın verimini veriyle artırın.
        </p>

        {/* Giriş Metni */}
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.8',
          marginBottom: '100px'
        }}>
          Geleceğin tarımı, sadece ekmek değil; akılcı yönetmektir. 
          Taytech Smart Tarım çözümleri, kaynak israfını önlemek ve ürün verimliliğini 
          en üst seviyeye çıkarmak için tasarlandı. Doğayı dinleyin, veriyi izleyin 
          ve üretiminizi geleceğe göre planlayın.
        </p>

        {/* Bölüm 1 */}
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '600', 
            color: 'white',
            marginBottom: '32px'
          }}>
            Daha az kaynak, daha yüksek verim.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Gübre ve ilaç gibi maliyetleri akıllı kontrol sistemleriyle optimize edin. 
            Kimyasal kullanımını sadece ihtiyaç duyulan noktaya odaklayarak 
            hem maliyetlerinizi düşürün hem de toprağınızı koruyun. 
            Taytech ile kaynakları israf etmeyin, yönetin.
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
            Veriden hasada kesintisiz bilgi.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Yüksek kaliteli ürünler, doğru kararlarla başlar. 
            Çevre bilgilerinden tarımsal kayıtlara kadar her detay artık dijital kontrolünüz altında. 
            Su ürünleri yetiştiriciliğinden toprak analizine kadar her aşamada 
            verimli bir bilgi akışı sağlayarak operasyonel riskleri ortadan kaldırın.
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
            Sürdürülebilir üretim, karlı gelecek.
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.8'
          }}>
            Akıllı bilgi sistemlerimizle üretim süreçlerinizi kusursuz bir şekilde planlayın. 
            Çevreye duyarlı, yüksek kaliteli ve planlı üretimle tarımı bir iş modeli olarak yeniden tanımlayın. 
            Taytech ile hasadınız her zaman daha bereketli.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

