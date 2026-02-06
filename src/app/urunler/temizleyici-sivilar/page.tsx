"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const kategoriler = [
  { id: 1, baslikKey: "mega.prod.koruyucu", resim: "/koruyucu-sivilar.png", link: "/urunler/temizleyici-sivilar/koruyucu" },
  { id: 2, baslikKey: "mega.prod.temizleyici", resim: "/temizleyici-sivilar.png", link: "/urunler/temizleyici-sivilar/temizleyici" },
];

export default function TemizleyiciSivilar() {
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
          <h1 style={{ fontSize: "28px", fontWeight: 500, color: "#86868b", textAlign: "center" }}>{t("urunler.sivilar.title")}</h1>
        </section>
        <section className="bg-[#f5f5f7]" style={{ padding: "0 20px" }}>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#86868b", marginBottom: "20px" }}>{t("urunler.kategoriler")}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {kategoriler.map((kategori) => (
              <Link key={kategori.id} href={kategori.link} className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg" style={{ height: "240px" }}>
                <div style={{ height: "70%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
                  <Image src={kategori.resim} alt={t(kategori.baslikKey)} width={140} height={140} className="object-contain max-h-full" />
                </div>
                <div style={{ height: "30%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 500, color: "#1d1d1f", textAlign: "center" }}>{t(kategori.baslikKey)}</h3>
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
        <h1 className="text-[#86868b] text-5xl font-medium text-center">{t("urunler.sivilar.title")}</h1>
      </section>
      <section className="bg-[#f5f5f7]">
        <div className="flex justify-center">
          <div style={{ width: "920px" }}>
            <p className="text-[#86868b] text-2xl font-semibold" style={{ marginBottom: "30px" }}>{t("urunler.kategoriler")}</p>
            <div className="flex justify-center gap-[20px]">
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
