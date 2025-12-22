"use client";

import { useEffect, useState } from "react";
import MobileBlocker from "./MobileBlocker";

interface MobileCheckerProps {
  children: React.ReactNode;
}

export default function MobileChecker({ children }: MobileCheckerProps) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // Ekran genişliği kontrolü (1024px altı = tablet/mobil)
      const width = window.innerWidth;
      const isMobile = width < 1024;
      
      // User agent kontrolü (ek güvenlik için)
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Touch cihaz kontrolü
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Kombinasyon: Ekran küçükse VEYA mobil user agent varsa
      setIsMobileOrTablet(isMobile || (isMobileUA && width < 1280));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Mobil/tablet ise scroll'u engelle
  useEffect(() => {
    if (isMobileOrTablet) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOrTablet]);

  // İlk yüklemede null döner (SSR uyumluluğu için)
  if (isMobileOrTablet === null) {
    return null;
  }

  // Mobil veya tablet ise blocker göster
  if (isMobileOrTablet) {
    return <MobileBlocker />;
  }

  // Masaüstü ise normal içerik
  return <>{children}</>;
}



