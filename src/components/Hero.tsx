"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    id: 1,
    image: "/taytechdiscekim.webp",
    titleKey: "hero.title",
    subtitleKey: "hero.subtitle",
  },
  {
    id: 2,
    image: "/2.hero.webp",
    titleKey: "hero.slide2.title",
    subtitleKey: "hero.slide2.subtitle",
    btnKey: "hero.slide2.btn",
    btnHref: "/urunler/kontrol-sistemleri/smart-serisi",
  },
  {
    id: 3,
    image: "/3.hero.webp",
    titleKey: "hero.slide3.title",
    subtitleKey: "hero.slide3.subtitle",
    btnKey: "hero.slide3.btn",
    btnHref: "/urunler/heat-network/manyetik-filtreler",
  },
  {
    id: 4,
    image: "/uploads/I-S-TR_U0A6-Render-Kabin-1774350985256.webp",
    titleKey: "hero.slide5.title",
    subtitleKey: "hero.slide5.subtitle",
    btnKey: "hero.slide5.btn",
    btnHref: "/urunler/heat-network/isi-istasyonlari",
  },
  {
    id: 5,
    image: "/hero2.webp",
    titleKey: "hero.slide4.title",
    subtitleKey: "hero.slide4.subtitle",
    btnKey: "hero.slide4.btn",
    btnHref: "/kurumsal",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [pos, setPos] = useState(slides.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = slides.length;
  // 3 kopya: [0,1,2, 0,1,2, 0,1,2] — ortadaki grup aktif
  const extSlides = [...slides, ...slides, ...slides];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sonsuz döngü: sınıra gelince transition kapat, ortaya zıpla
  useEffect(() => {
    if (!isTransitioning) return;
    const handler = () => {
      if (pos >= total * 2) {
        setIsTransitioning(false);
        setPos(total + (pos % total));
      } else if (pos < total) {
        setIsTransitioning(false);
        setPos(total + (pos % total));
      }
    };
    const el = trackRef.current;
    el?.addEventListener("transitionend", handler);
    return () => el?.removeEventListener("transitionend", handler);
  }, [pos, isTransitioning, total]);

  // Transition kapatıldıktan sonra tekrar aç
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    setPos((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setPos((prev) => prev - 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    const currentReal = pos % total;
    const diff = index - currentReal;
    setPos((prev) => prev + diff);
  }, [pos, total]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentReal = ((pos % total) + total) % total;

  // ===== MOBİL =====
  if (isMobile) {
    const cardW = 92;
    const gapW = 3;
    const unit = cardW + gapW;
    const centerOffset = (100 - cardW) / 2;

    return (
      <section className="relative w-full bg-[#f5f5f7] overflow-hidden" style={{ paddingTop: '72px', paddingBottom: '20px', minHeight: '45vh' }}>
        <div className="relative flex items-center overflow-hidden" style={{ height: '35vh' }}>
          <div
            ref={trackRef}
            className="flex items-center h-full"
            style={{
              transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
              transform: `translateX(calc(${centerOffset}vw - ${pos * unit}vw))`,
              gap: `${gapW}vw`,
            }}
          >
            {extSlides.map((slide, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden rounded-2xl h-full"
                style={{ width: `${cardW}vw` }}
              >
                <Image src={slide.image} alt={t(slide.titleKey)} fill sizes="100vw" className="object-cover brightness-[0.65]" style={slide.btnKey ? { transform: 'scale(1.15)' } : undefined} priority={Math.abs(i - pos) <= 1} />
                {slide.btnKey && slide.btnHref ? (
                  <Link href={slide.btnHref} className="absolute inset-0 z-10 flex items-center justify-center px-6">
                    <div className="text-center" style={{ maxWidth: '85%' }}>
                      <p className="text-2xl font-bold tracking-tight text-white" style={{ lineHeight: 1.2 }}>{t(slide.titleKey)}</p>
                      {t(slide.subtitleKey) && (
                        <p className="text-xs text-white/70 font-medium" style={{ marginTop: '6px', lineHeight: 1.4 }}>{t(slide.subtitleKey)}</p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
                    <p className="text-4xl font-bold tracking-tight text-white">{t(slide.titleKey)}</p>
                    {t(slide.subtitleKey) && <p className="text-sm font-bold tracking-tight text-white mt-1">{t(slide.subtitleKey)}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>
    );
  }

  // ===== MASAÜSTÜ =====
  const cardW = 80;
  const gapW = 1.5;
  const unit = cardW + gapW;
  const centerOffset = (100 - cardW) / 2;

  return (
    <section
      className="relative w-full bg-[#f5f5f7] overflow-hidden"
      style={{ height: 'calc(100vh - 160px)', marginTop: '48px' }}
    >
      <div className="relative flex items-center overflow-hidden" style={{ height: 'calc(100% - 70px)' }}>
        <div
          ref={trackRef}
          className="flex items-center h-[92%]"
          style={{
            transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
            transform: `translateX(calc(${centerOffset}vw - ${pos * unit}vw))`,
            gap: `${gapW}vw`,
          }}
        >
          {extSlides.map((slide, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden h-full cursor-pointer"
              style={{ width: `${cardW}vw`, borderRadius: '48px' }}
              onClick={() => {
                const clickedReal = i % total;
                goToSlide(clickedReal);
              }}
            >
              <Image src={slide.image} alt={t(slide.titleKey)} fill sizes="80vw" className="object-cover brightness-[0.65]" style={slide.btnKey ? { transform: 'scale(1.15)' } : undefined} priority={Math.abs(i - pos) <= 1} />
              <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
                {slide.btnKey ? (
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between" style={{ padding: '0 80px 70px' }}>
                    <div style={{ maxWidth: '55%' }}>
                      <p className="text-5xl font-bold tracking-tight text-white" style={{ lineHeight: 1.2 }}>{t(slide.titleKey)}</p>
                      {t(slide.subtitleKey) && (
                        <p className="text-lg text-white/70 font-medium" style={{ marginTop: '12px', lineHeight: 1.5 }}>{t(slide.subtitleKey)}</p>
                      )}
                    </div>
                    <Link
                      href={slide.btnHref || '#'}
                      style={{
                        backgroundColor: '#dc2626',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 600,
                        padding: '12px 32px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.2s',
                        marginBottom: '4px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t(slide.btnKey)}
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="text-9xl font-bold tracking-tight text-white">{t(slide.titleKey)}</p>
                    {t(slide.subtitleKey) && <p className="text-5xl font-bold tracking-tight text-white absolute" style={{ marginTop: '180px' }}>{t(slide.subtitleKey)}</p>}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot noktaları */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className="flex items-center justify-center"
            style={{ width: '44px', height: '44px' }}
          >
            <span
              className="rounded-full transition-all duration-300 block"
              style={{
                width: currentReal === i ? '32px' : '10px',
                height: '10px',
                backgroundColor: currentReal === i ? '#dc2626' : 'rgba(0,0,0,0.15)',
              }}
            />
          </button>
        ))}
      </div>
      {/* Ok butonları */}
      <div className="absolute bottom-4 right-[11%] flex gap-3">
        <button onClick={prevSlide} aria-label="Önceki slayt" className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={nextSlide} aria-label="Sonraki slayt" className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  );
}
