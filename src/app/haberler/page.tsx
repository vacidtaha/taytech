"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const haberler = [
  { id: 1, titleKey: "news.1", date: "16 Ekim 2023", image: "/akıllıbina.jpg", size: "large" },
  { id: 2, titleKey: "news.2", date: "12 Ekim 2023", image: "/akıllısehir.jpg", size: "normal" },
  { id: 3, titleKey: "news.3", date: "8 Kasım 2023", image: "/konferans.jpg", size: "wide" },
  { id: 4, titleKey: "news.4", date: "5 Kasım 2023", image: "/yenilik.jpg", size: "normal" },
  { id: 5, titleKey: "news.5", date: "1 Kasım 2023", image: "/tesis.jpeg", size: "normal" },
  { id: 6, titleKey: "news.6", date: "25 Ekim 2023", image: "/taytechcloudfoto.avif", size: "normal" },
  { id: 7, titleKey: "news.7", date: "20 Ekim 2023", image: "/akıllıenerji.avif", size: "large" },
  { id: 8, titleKey: "news.8", date: "15 Ekim 2023", image: "/akıllıtarım.jpg", size: "wide" },
];

export default function HaberlerPage() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ===== MOBİL: Responsive haberler sayfası =====
  if (isMobile) {
    return (
      <div className="bg-[#f5f5f7] min-h-screen pt-12">
        {/* Hero Bölümü - Mobile */}
        <div style={{ padding: '40px 20px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>{t("haberler.title")}</h1>
          </div>
          <p style={{ color: '#86868b', fontSize: '16px' }}>{t("haberler.subtitle")}</p>
        </div>

        {/* Haber Kartları - Mobile (tek sütun) */}
        <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {haberler.map((haber) => (
            <div
              key={haber.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                height: haber.size === 'large' ? '320px' : '220px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              className="group"
            >
              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)',
                  zIndex: 1
                }}
              />
              {/* Image */}
              <Image
                src={haber.image}
                alt={t(haber.titleKey)}
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  zIndex: 3
                }}
              >
                <h3 style={{
                  fontSize: haber.size === 'large' ? '20px' : '16px',
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: 1.3
                }}>
                  {t(haber.titleKey)}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '8px' }}>{haber.date}</p>
              </div>
            </div>
          ))}

          {/* Placeholder Kartlar - Mobile */}
          {[1, 2].map((i) => (
            <div
              key={`placeholder-${i}`}
              style={{
                borderRadius: '16px',
                border: '2px dashed rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                height: '160px'
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

  // ===== MASAÜSTÜ: Orijinal haberler sayfası (hiç değişmedi) =====
  return (
    <div className="bg-[#f5f5f7] min-h-screen pt-12">
      {/* Hero Bölümü */}
      <div style={{ padding: '80px 100px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <h1 className="text-5xl font-bold text-[#1d1d1f]">{t("haberler.title")}</h1>
        </div>
        <p className="text-[#86868b] text-xl">{t("haberler.subtitle")}</p>
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
              alt={t(haber.titleKey)}
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
                {t(haber.titleKey)}
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
