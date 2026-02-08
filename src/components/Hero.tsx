"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ===== MOBİL: Statik hero =====
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

  // ===== MASAÜSTÜ: Statik hero (scroll kaldırıldı) =====
  return (
    <section 
      className="relative w-full bg-[#f5f5f7] overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }}
    >

      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ transform: 'scale(0.9)', borderRadius: '48px', zIndex: 2 }}
      >
        <Image
          src="/taytechdiscekim.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-6" style={{ zIndex: 3 }}>
        <h1 
          className="text-9xl font-bold tracking-tight"
          style={{ color: 'white' }}
        >
          {t("hero.title")}
        </h1>
        <h2 
          className="text-5xl font-bold tracking-tight"
          style={{ color: 'white', marginTop: '16px' }}
        >
          {t("hero.subtitle")}
        </h2>
      </div>
    </section>
  );
}
