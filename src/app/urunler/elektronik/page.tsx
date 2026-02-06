"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const kategoriler = [
  { id: 1, baslikKey: "mega.prod.smartEnd", resim: "/smart-endustriyel.jpg", link: "/urunler/elektronik/smart-endustriyel" },
  { id: 2, baslikKey: "mega.prod.isiKontrol", resim: "/isi-istasyonu-kontrolorleri.jpg", link: "/urunler/elektronik/isi-istasyonu-kontrolorleri" },
  { id: 3, baslikKey: "mega.prod.yerden", resim: "/yerden-isitma.jpg", link: "/urunler/elektronik/yerden-isitma" },
];

export default function Elektronik() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] pt-12">
        <section className="bg-[#f5f5f7]" style={{ paddingTop: "80px", paddingBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 500, color: "#86868b", textAlign: "center" }}>{t("urunler.elektronik.title")}</h1>
        </section>
        <section className="bg-[#f5f5f7]" style={{ padding: "0 20px" }}>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#86868b", marginBottom: "20px" }}>{t("urunler.kategoriler")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {kategoriler.map((kategori) => (
              <Link key={kategori.id} href={kategori.link} className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg" style={{ height: "280px" }}>
                <div style={{ height: "70%", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                  <Image src={kategori.resim} alt={t(kategori.baslikKey)} width={180} height={180} className="object-contain max-h-full" />
                </div>
                <div style={{ height: "30%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#1d1d1f", textAlign: "center" }}>{t(kategori.baslikKey)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <div style={{ height: "60px" }} />
        <Footer theme="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "180px", paddingBottom: "60px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">{t("urunler.elektronik.title")}</h1>
      </section>
      <section className="bg-[#f5f5f7]">
        <div className="flex justify-center">
          <div style={{ width: "1390px" }}>
            <p className="text-[#86868b] text-2xl font-semibold" style={{ marginBottom: "30px" }}>{t("urunler.kategoriler")}</p>
            <div className="flex gap-[20px]">
              {kategoriler.map((kategori) => (
                <Link key={kategori.id} href={kategori.link} className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg group" style={{ width: "450px", height: "600px" }}>
                  <div className="h-[75%] flex items-center justify-center p-6">
                    <Image src={kategori.resim} alt={t(kategori.baslikKey)} width={280} height={280} className="object-contain max-h-full" />
                  </div>
                  <div className="h-[25%] flex items-center justify-center px-4 transition-colors duration-300 group-hover:bg-[#dc2626]">
                    <h3 className="text-[#1d1d1f] text-xl font-medium text-center transition-colors duration-300 group-hover:text-white">{t(kategori.baslikKey)}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: "150px" }} />
      <Footer theme="white" />
    </div>
  );
}
