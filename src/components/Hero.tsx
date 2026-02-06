"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Mobilde scroll animasyonu yok

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const animationProgress = Math.min(scrollY / windowHeight, 1);
          const slideProgress = scrollY > windowHeight ? scrollY - windowHeight : 0;

          if (heroRef.current) {
            if (scrollY <= windowHeight) {
              heroRef.current.style.position = 'fixed';
              heroRef.current.style.top = '48px';
            } else {
              heroRef.current.style.position = 'fixed';
              heroRef.current.style.top = `${48 - slideProgress}px`;
            }
          }

          if (imageRef.current) {
            imageRef.current.style.transform = 'scale(0.9)';
            imageRef.current.style.borderRadius = '48px';
          }

          if (overlayRef.current) {
            overlayRef.current.style.opacity = String(Math.min(animationProgress * 1.5, 1));
          }

          if (text1Ref.current) {
            const r = Math.round(255 - animationProgress * (255 - 220));
            const g = Math.round(255 - animationProgress * (255 - 38));
            const b = Math.round(255 - animationProgress * (255 - 38));
            text1Ref.current.style.color = `rgb(${r}, ${g}, ${b})`;
          }

          if (text2Ref.current) {
            const opacity = Math.max(0, animationProgress * 2 - 0.5);
            text2Ref.current.style.opacity = String(opacity);
            text2Ref.current.style.transform = `translateY(${(1 - animationProgress) * 30}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // ===== MOBİL: Statik hero, scroll yok =====
  if (isMobile) {
    return (
      <section className="relative w-full bg-[#f5f5f7] overflow-hidden" style={{ height: '45vh' }}>
        <div className="absolute inset-2 overflow-hidden rounded-2xl">
          <Image
            src="/taytechdiscekim.png"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl font-bold tracking-tight text-white">
            {t("hero.title")}
          </h1>
          <h2 className="text-lg font-bold tracking-tight text-white mt-2">
            {t("hero.subtitle")}
          </h2>
        </div>
      </section>
    );
  }

  // ===== MASAÜSTÜ: Scroll animasyonlu hero (aynen korundu) =====
  return (
    <>
      <div style={{ height: '200vh' }} />
      
      <section 
        ref={heroRef}
        className="fixed left-0 right-0 w-full bg-[#f5f5f7] overflow-hidden will-change-transform"
        style={{ zIndex: 5, top: '48px', height: 'calc(100vh - 48px)' }}
      >
        <div 
          ref={imageRef}
          className="absolute inset-0 will-change-transform overflow-hidden"
          style={{ transform: 'scale(0.9)', borderRadius: '48px' }}
        >
          <Image
            src="/taytechdiscekim.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div 
          ref={overlayRef}
          className="absolute inset-0"
          style={{ backgroundColor: '#f5f5f7', opacity: 0, zIndex: 5 }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <h1 
            ref={text1Ref}
            className="text-9xl font-bold tracking-tight will-change-auto"
            style={{ color: 'white' }}
          >
            {t("hero.title")}
          </h1>
          <h2 
            ref={text2Ref}
            className="text-5xl font-bold tracking-tight will-change-transform"
            style={{ opacity: 0, transform: 'translateY(30px)', color: '#dc2626', marginTop: '16px' }}
          >
            {t("hero.subtitle")}
          </h2>
        </div>
      </section>
    </>
  );
}
