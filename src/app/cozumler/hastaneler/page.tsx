"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function Hastaneler() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white pt-12">
      <div style={{ paddingTop: "80px", paddingLeft: "200px" }}>
        <Link href="/cozumler" className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#dc2626] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span className="text-lg font-medium">{t("cozumler.nav")}</span>
        </Link>
      </div>
      <div style={{ padding: "80px 200px 0" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>{t("cozumler.nav")}</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.1, marginBottom: "24px" }}>{t("cozumler.hastane")}</h1>
        <p style={{ fontSize: "20px", color: "#86868b", fontWeight: 450, maxWidth: "640px", lineHeight: 1.6 }}>{t("cozumler.hastaneDesc")}</p>
      </div>
      <div style={{ margin: "60px 200px", height: "1px", background: "#e5e5e5" }} />
      <div style={{ padding: "0 200px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 600, color: "#1d1d1f", marginBottom: "24px", lineHeight: 1.2 }}>{t("cozumler.hastane.h2")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8, marginBottom: "24px" }}>{t("cozumler.hastane.p1")}</p>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("cozumler.hastane.p2")}</p>
          </div>
          <div>
            <h3 style={{ fontSize: "22px", fontWeight: 600, color: "#1d1d1f", marginBottom: "24px" }}>{t("cozumler.sunduguCozumler")}</h3>
          </div>
        </div>
      </div>
      <div style={{ height: "80px" }} />
      <Footer theme="light" />
    </div>
  );
}
