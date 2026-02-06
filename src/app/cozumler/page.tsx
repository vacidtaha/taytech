"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const cozumlerData = [
  { nameKey: "cozumler.ticari", descKey: "cozumler.ticariDesc", slug: "ticari-tesisler", image: "/akıllıbina.jpg" },
  { nameKey: "cozumler.toplu", descKey: "cozumler.topluDesc", slug: "toplu-konutlar", image: "/akıllısehir.jpg" },
  { nameKey: "cozumler.bakim", descKey: "cozumler.bakimDesc", slug: "bakim-huzur-evleri", image: "/bakimevi.jpg" },
  { nameKey: "cozumler.yeni", descKey: "cozumler.yeniDesc", slug: "yeni-projeler", image: "/konferans.jpg" },
  { nameKey: "cozumler.hastane", descKey: "cozumler.hastaneDesc", slug: "hastaneler", image: "/hastane.jpg" },
  { nameKey: "cozumler.kazan", descKey: "cozumler.kazanDesc", slug: "endustriyel-kazan-dairesi", image: "/kazan-dairesi.jpg" },
  { nameKey: "cozumler.spor", descKey: "cozumler.sporDesc", slug: "spor-eglence-tesisleri", image: "/spor-tesisi.jpg" },
  { nameKey: "cozumler.saha", descKey: "cozumler.sahaDesc", slug: "saha-disi-uretim", image: "/akıllıtasıma.jpg" },
  { nameKey: "cozumler.egitim", descKey: "cozumler.egitimDesc", slug: "egitim-yapilari", image: "/okul.jpg" },
];

export default function CozumlerPage() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#f5f5f7] pt-12">
      {/* Başlık */}
      <div style={{ paddingTop: '200px', paddingBottom: '20px', paddingLeft: '200px', paddingRight: '200px' }}>
        <h1 className="text-5xl md:text-6xl font-bold text-[#dc2626]" style={{ marginBottom: '24px' }}>
          {t("cozumler.title")}
        </h1>
        <p className="text-xl text-[#424245] leading-relaxed" style={{ maxWidth: '800px' }}>
          {t("cozumler.desc")}
        </p>
      </div>
      
      {/* Hero Görsel */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <div style={{ width: '1000px', height: '500px', borderRadius: '48px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
          <Image 
            src="/hero2.png"
            alt="Hero"
            width={800}
            height={400}
            style={{ objectFit: 'cover', transform: 'scale(1.2)', width: '100%', height: '100%' }}
          />
        </div>
      </div>
      
      {/* Çözümler Carousel */}
      <div style={{ marginTop: '120px', position: 'relative' }}>
        {/* Oklar */}
        <div style={{ paddingLeft: 'calc(50vw - 500px)', marginBottom: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 'calc(50vw - 500px)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                backgroundColor: canScrollLeft ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)', 
                border: `1px solid ${canScrollLeft ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                opacity: canScrollLeft ? 1 : 0.4
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                backgroundColor: canScrollRight ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)', 
                border: `1px solid ${canScrollRight ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                opacity: canScrollRight ? 1 : 0.4
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        
        {/* Kartlar */}
        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', gap: '20px', overflowX: 'auto', 
            paddingLeft: 'calc(50vw - 500px)', paddingRight: '100px', paddingBottom: '20px',
            scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}
          className="hide-scrollbar"
        >
          {cozumlerData.map((cozum, index) => (
            <Link 
              key={index}
              href={`/cozumler/${cozum.slug}`}
              style={{ 
                minWidth: '400px', aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.08)', textDecoration: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
              className="group"
            >
              {/* Üst - Fotoğraf */}
              <div style={{ height: '50%', position: 'relative', overflow: 'hidden' }}>
                <Image src={cozum.image} alt={t(cozum.nameKey)} fill style={{ objectFit: 'cover' }} />
              </div>
              {/* Alt - İçerik */}
              <div 
                style={{ flex: 1, backgroundColor: 'white', padding: '28px 32px 32px', transition: 'background-color 0.3s', display: 'flex', flexDirection: 'column' }}
                className="group-hover:bg-[#f5f5f7]"
              >
                <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3 group-hover:text-[#dc2626] transition-colors">{t(cozum.nameKey)}</h3>
                <p className="text-[#86868b] text-[15px] leading-relaxed mb-4" style={{ flex: 1 }}>{t(cozum.descKey)}</p>
                <p className="text-[#86868b] text-sm font-medium group-hover:text-[#dc2626] transition-colors">{t("cozumler.detay")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Boşluk */}
      <div style={{ height: '25vh' }}></div>
      
      <Footer theme="white" />
    </div>
  );
}
