"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { 
  Building2, 
  Truck, 
  Building, 
  Shield, 
  Briefcase, 
  Store, 
  Zap, 
  Leaf 
} from "lucide-react";

const cozumler = [
  { name: "Akıllı Bina", icon: Building2, color: "#3b82f6", image: "/akıllıbina.jpg", slug: "akilli-bina" },
  { name: "Akıllı Şehir", icon: Building, color: "#06b6d4", image: "/akıllısehir.jpg", slug: "akilli-sehir" },
  { name: "Akıllı Tarım", icon: Leaf, color: "#22c55e", image: "/akıllıtarım.jpg", slug: "akilli-tarim" },
  { name: "Akıllı Enerji", icon: Zap, color: "#eab308", image: "/akıllıenerji.avif", slug: "akilli-enerji" },
  { name: "Akıllı Mağaza", icon: Store, color: "#10b981", image: "/akıllımagaza.avif", slug: "akilli-magaza" },
  { name: "Akıllı Taşıma", icon: Truck, color: "#8b5cf6", image: "/akıllıtasıma.jpg", slug: "akilli-tasima" },
  { name: "Akıllı Güvenlik", icon: Shield, color: "#ef4444", image: "/akıllıgüvenlik.jpg", slug: "akilli-guvenlik" },
  { name: "Akıllı İşletme", icon: Briefcase, color: "#f59e0b", image: "/akıllıişletme.jpg", slug: "akilli-isletme" },
];

export default function CozumlerPage() {
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
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#f5f5f7] pt-12">
      {/* Başlık */}
      <div style={{ paddingLeft: '400px', paddingTop: '200px', display: 'flex', alignItems: 'flex-end', gap: '300px' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-[#dc2626]">
          Çözümlerimiz
        </h1>
        <p className="text-2xl text-[#86868b] font-medium" style={{ lineHeight: '1.4' }}>
          Kontrol sistemleri endüstrisinde<br />en iyi çözümler
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
      
      {/* Akıllı Çözümler Carousel */}
      <div style={{ marginTop: '120px', position: 'relative' }}>
        {/* Oklar */}
        <div style={{ paddingLeft: 'calc(50vw - 500px)', marginBottom: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 'calc(50vw - 500px)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                backgroundColor: canScrollLeft ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)', 
                border: `1px solid ${canScrollLeft ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                opacity: canScrollLeft ? 1 : 0.4
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                backgroundColor: canScrollRight ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)', 
                border: `1px solid ${canScrollRight ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                opacity: canScrollRight ? 1 : 0.4
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Kartlar */}
        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', 
            gap: '20px', 
            overflowX: 'auto', 
            paddingLeft: 'calc(50vw - 500px)', 
            paddingRight: '100px',
            paddingBottom: '20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="hide-scrollbar"
        >
          {cozumler.map((cozum, index) => {
            const Icon = cozum.icon;
            return (
              <Link 
                key={index}
                href={`/cozumler/${cozum.slug}`}
                style={{ 
                  minWidth: '360px',
                  aspectRatio: '3/4',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(0,0,0,0.08)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}
                className="group"
              >
                {/* Üst Kısım - Fotoğraf %50 */}
                <div 
                  style={{ 
                    height: '50%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Image 
                    src={cozum.image}
                    alt={cozum.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                {/* Alt Kısım - İsim %50 */}
                <div 
                  style={{ 
                    height: '50%',
                    backgroundColor: 'white',
                    padding: '24px 32px',
                    transition: 'background-color 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  className="group-hover:bg-[#f5f5f7]"
                >
                  <h3 className="text-3xl font-semibold text-[#1d1d1f]">{cozum.name}</h3>
                  <p className="text-[#86868b] mt-3 text-lg group-hover:text-[#dc2626] transition-colors">Detayları keşfet →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Boşluk */}
      <div style={{ height: '25vh' }}></div>
      
      <Footer theme="white" />
    </div>
  );
}
