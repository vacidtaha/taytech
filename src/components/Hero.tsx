"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // İlk aşama: 0-100vh arası animasyon
          const animationProgress = Math.min(scrollY / windowHeight, 1);
          
          // İkinci aşama: 100vh sonrası hero yukarı kayacak
          const slideProgress = scrollY > windowHeight ? scrollY - windowHeight : 0;

          // Hero pozisyonu
          if (heroRef.current) {
            if (scrollY <= windowHeight) {
              // Animasyon aşaması - fixed
              heroRef.current.style.position = 'fixed';
              heroRef.current.style.top = '0';
            } else {
              // Animasyon bitti - sticky gibi davran, yukarı kay
              heroRef.current.style.position = 'fixed';
              heroRef.current.style.top = `-${slideProgress}px`;
            }
          }

          // Image scale ve border-radius (sadece animasyon aşamasında)
          if (imageRef.current) {
            const scale = 1.1 - animationProgress * 0.2;
            const borderRadius = animationProgress * 48; // 0'dan 48px'e (5xl)
            imageRef.current.style.transform = `scale(${scale})`;
            imageRef.current.style.borderRadius = `${borderRadius}px`;
          }

          // Text 1 (TayTech)
          if (text1Ref.current) {
            const opacity = Math.max(0, 1 - animationProgress * 2);
            text1Ref.current.style.opacity = String(opacity);
            text1Ref.current.style.transform = `translateY(${animationProgress * -50}px)`;
          }

          // Text 2 (Herkes için teknoloji)
          if (text2Ref.current) {
            const opacity = Math.max(0, animationProgress * 2 - 0.5);
            text2Ref.current.style.opacity = String(opacity);
            text2Ref.current.style.transform = `translateY(${(1 - animationProgress) * 50}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll alanı - animasyon için boşluk + hero kayması için */}
      <div style={{ height: '200vh' }} />
      
      {/* Sticky Hero */}
      <section 
        ref={heroRef}
        className="fixed left-0 right-0 w-full bg-[#f5f5f7] overflow-hidden will-change-transform"
        style={{ zIndex: 5, top: '48px', height: 'calc(100vh - 48px)' }}
      >
        {/* Background Image */}
        <div 
          ref={imageRef}
          className="absolute inset-0 will-change-transform overflow-hidden"
          style={{ transform: 'scale(1.1)', borderRadius: '0px' }}
        >
          <Image
            src="/hero1.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay kaldırıldı - fotoğraf orijinal renklerde */}
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* TayTech yazısı */}
          <h1 
            ref={text1Ref}
            className="text-7xl md:text-9xl font-bold text-white tracking-tight absolute will-change-transform"
            style={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            TayTech
          </h1>
          {/* Herkes için teknoloji yazısı */}
          <h1 
            ref={text2Ref}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight absolute will-change-transform"
            style={{ opacity: 0, transform: 'translateY(50px)' }}
          >
            Herkes için Yüksek Teknoloji.
          </h1>
        </div>
      </section>
    </>
  );
}
