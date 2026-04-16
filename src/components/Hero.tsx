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
    btnHref: "/urunler/kontrol-panelleri/elektronik-kontrol-panelleri",
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
    image: "/3.hero.webp",
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

  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    if (touchDelta.current < -50) nextSlide();
    else if (touchDelta.current > 50) prevSlide();
    touchDelta.current = 0;
  }, [nextSlide, prevSlide]);

  // ===== MOBİL =====
  if (isMobile) {
    const cardW = 82;
    const gapW = 3;
    const unit = cardW + gapW;
    const centerOffset = (100 - cardW) / 2;

    return (
      <section className="relative w-full bg-[#f5f5f7] overflow-hidden" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <div
          className="relative flex items-center overflow-hidden"
          style={{ height: '38vh' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
                <Image src={slide.image} alt={t(slide.titleKey)} fill sizes="100vw" className="object-cover" style={slide.btnKey ? { transform: 'scale(1.15)' } : undefined} priority={Math.abs(i - pos) <= 1} />
                {slide.id !== 1 && <div className="absolute inset-0 z-[1]" style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', maskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 45%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 45%)' }} />}
                {slide.btnKey && slide.btnHref ? (
                  <Link href={slide.btnHref} className="absolute inset-0 z-10 flex items-end px-5 pb-5" style={{ transform: 'translateZ(0)' }}>
                    <div className="text-left">
                      <p className="text-xl font-bold tracking-tight text-white" style={{ lineHeight: 1.2 }}>{t(slide.titleKey)}</p>
                      {t(slide.subtitleKey) && (
                        <p className="text-[11px] text-white/70 font-medium" style={{ marginTop: '4px', lineHeight: 1.4 }}>{t(slide.subtitleKey)}</p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4" style={{ transform: 'translateZ(0)' }}>
                    <p className="text-5xl font-bold tracking-tight text-white">{t(slide.titleKey)}</p>
                    {t(slide.subtitleKey) && <p className="text-base font-bold tracking-tight text-white/80 mt-2">{t(slide.subtitleKey)}</p>}
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
              <Image src={slide.image} alt={t(slide.titleKey)} fill sizes="80vw" className="object-cover" style={slide.btnKey ? { transform: 'scale(1.15)' } : undefined} priority={Math.abs(i - pos) <= 1} />
              {slide.id !== 1 && <div className="absolute inset-0 z-[1]" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', maskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 40%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 40%)' }} />}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-6" style={{ transform: 'translateZ(0)' }}>
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
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 600,
                        padding: '12px 32px',
                        borderRadius: '8px',
                        border: '1.5px solid rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s',
                        marginBottom: '4px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; e.currentTarget.style.borderColor = '#dc2626'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#dc2626'; }}
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
