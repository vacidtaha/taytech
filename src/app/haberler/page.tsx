"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const haberler = [
  {
    id: 1,
    title: "Taytech, Mas Academy'nin Konuğu Oldu",
    date: "16 Ekim 2023",
    image: "/akıllıbina.jpg",
    size: "large" // 2 satır
  },
  {
    id: 2,
    title: "IRONTRAP® Manyetik Filtre Serisi Genişliyor",
    date: "12 Ekim 2023",
    image: "/akıllısehir.jpg",
    size: "normal"
  },
  {
    id: 3,
    title: "Yeni Nesil Smart Kontrol Panoları Tanıtıldı",
    date: "8 Kasım 2023",
    image: "/konferans.jpg",
    size: "wide" // 2 sütun
  },
  {
    id: 4,
    title: "Isı İstasyonu Uygulamalarında Yenilik",
    date: "5 Kasım 2023",
    image: "/yenilik.jpg",
    size: "normal"
  },
  {
    id: 5,
    title: "Gebze Tesislerinde Kapasite Artışı",
    date: "1 Kasım 2023",
    image: "/tesis.jpeg",
    size: "normal"
  },
  {
    id: 6,
    title: "Taytech Cloud Platformu Yayında",
    date: "25 Ekim 2023",
    image: "/taytechcloudfoto.avif",
    size: "normal"
  },
  {
    id: 7,
    title: "ISO 9001:2015 Sertifikası Yenilendi",
    date: "20 Ekim 2023",
    image: "/akıllıenerji.avif",
    size: "large"
  },
  {
    id: 8,
    title: "Akıllı Bina Projelerinde Yeni İşbirlikleri",
    date: "15 Ekim 2023",
    image: "/akıllıtarım.jpg",
    size: "wide"
  },
];

export default function HaberlerPage() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen pt-12">
      {/* Hero Bölümü */}
      <div style={{ padding: '80px 100px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <h1 className="text-5xl font-bold text-[#1d1d1f]">Bizden Haberler</h1>
          <span 
            style={{ 
              backgroundColor: '#1d1d1f', 
              color: 'white', 
              padding: '6px 12px', 
              borderRadius: '6px', 
              fontSize: '12px', 
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            BETA - Hazırlanıyor
          </span>
        </div>
        <p className="text-[#86868b] text-xl">Taytech'ten son gelişmeler ve duyurular</p>
      </div>

      {/* Masonry Grid */}
      <div 
        style={{ 
          padding: '0 100px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '280px',
          gap: '16px'
        }}
      >
        {haberler.map((haber) => (
          <div
            key={haber.id}
            style={{
              gridRow: haber.size === 'large' ? 'span 2' : 'span 1',
              gridColumn: haber.size === 'wide' ? 'span 2' : 'span 1',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            className="group"
          >
            {/* Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: haber.size === 'wide' 
                  ? 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%)'
                  : 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)',
                zIndex: 1
              }}
            />
            {/* Hover Overlay */}
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 2
              }}
            />
            {/* Image */}
            <Image
              src={haber.image}
              alt={haber.title}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Content */}
            <div
              style={{
                position: 'absolute',
                bottom: haber.size === 'wide' ? '50%' : '24px',
                transform: haber.size === 'wide' ? 'translateY(50%)' : 'none',
                left: '24px',
                right: haber.size === 'wide' ? '40%' : '24px',
                zIndex: 3
              }}
            >
              <h3 
                className={`font-bold text-white leading-tight ${
                  haber.size === 'large' ? 'text-2xl' : 
                  haber.size === 'wide' ? 'text-xl' : 'text-base'
                }`}
              >
                {haber.title}
              </h3>
              {(haber.size === 'large' || haber.size === 'wide') && (
                <p className="text-white/60 text-sm mt-2">{haber.date}</p>
              )}
            </div>
          </div>
        ))}

        {/* Placeholder Kartlar */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`placeholder-${i}`}
            style={{
              gridColumn: 'span 1',
              gridRow: 'span 1',
              borderRadius: '16px',
              border: '2px dashed rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0,0,0,0.05)',
                marginBottom: '12px'
              }}
            />
            <div
              style={{
                width: '80%',
                height: '12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(0,0,0,0.05)',
                marginBottom: '8px'
              }}
            />
            <div
              style={{
                width: '50%',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: 'rgba(0,0,0,0.03)'
              }}
            />
          </div>
        ))}
      </div>

      <Footer theme="white" />
    </div>
  );
}
