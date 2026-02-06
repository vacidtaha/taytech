"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function GizlilikPolitikasi() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ===== MOBİL =====
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white pt-12">
        <div style={{ padding: "60px 24px 0" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Taytech</p>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.15, marginBottom: "12px" }}>{t("privacy.title")}</h1>
          <p style={{ fontSize: "15px", color: "#86868b", fontWeight: 450, lineHeight: 1.6 }}>{t("privacy.subtitle")}</p>
        </div>

        <div style={{ margin: "32px 24px", height: "1px", background: "#e5e5e5" }} />

        <div style={{ padding: "0 24px 60px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {[1,2,3,4,5,6,7,8].map(n => (
              <section key={n}>
                <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1d1d1f", marginBottom: "12px" }}>{t(`privacy.s${n}.title`)}</h2>
                <p style={{ fontSize: "15px", color: "#424245", lineHeight: 1.8, marginBottom: n === 2 || n === 3 || n === 7 ? "10px" : "0" }}>{t(`privacy.s${n}.p1`)}</p>
                {(n === 2 || n === 3 || n === 7) && (
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[1,2,3,4,5].map(li => (
                      <li key={li} style={{ fontSize: "14px", color: "#6e6e73", lineHeight: 1.7 }}>{t(`privacy.s${n}.li${li}`)}</li>
                    ))}
                  </ul>
                )}
                {n === 8 && (
                  <div style={{ marginTop: "14px", padding: "20px", background: "#f5f5f7", borderRadius: "12px" }}>
                    <p style={{ fontSize: "14px", color: "#1d1d1f", fontWeight: 500 }}>Taytech Otomasyon ve Bilişim A.Ş.</p>
                    <p style={{ fontSize: "13px", color: "#6e6e73", marginTop: "4px" }}>info@taytech.com.tr</p>
                    <p style={{ fontSize: "13px", color: "#6e6e73", marginTop: "2px" }}>(0262) 502 51 49</p>
                  </div>
                )}
              </section>
            ))}
            <div style={{ paddingTop: "20px", borderTop: "1px solid #e5e5e5" }}>
              <p style={{ fontSize: "13px", color: "#86868b" }}>{t("privacy.lastUpdate")}</p>
            </div>
          </div>
        </div>

        <Footer theme="light" />
      </div>
    );
  }

  // ===== MASAÜSTÜ (hiç değişmedi) =====
  return (
    <div className="min-h-screen bg-white pt-12">
      {/* Header */}
      <div style={{ padding: "140px 200px 0" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Taytech</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.1, marginBottom: "16px" }}>{t("privacy.title")}</h1>
        <p style={{ fontSize: "20px", color: "#86868b", fontWeight: 450, maxWidth: "600px", lineHeight: 1.6 }}>
          {t("privacy.subtitle")}
        </p>
      </div>

      <div style={{ margin: "50px 200px", height: "1px", background: "#e5e5e5" }} />

      {/* İçerik */}
      <div style={{ padding: "0 200px 100px", maxWidth: "1200px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

          {/* 1. Giriş */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s1.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s1.p1")}</p>
          </section>

          {/* 2. Toplanan Veriler */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s2.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8, marginBottom: "12px" }}>{t("privacy.s2.p1")}</p>
            <ul style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s2.li1")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s2.li2")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s2.li3")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s2.li4")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s2.li5")}</li>
            </ul>
          </section>

          {/* 3. Verilerin Kullanımı */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s3.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8, marginBottom: "12px" }}>{t("privacy.s3.p1")}</p>
            <ul style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s3.li1")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s3.li2")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s3.li3")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s3.li4")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s3.li5")}</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s4.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s4.p1")}</p>
          </section>

          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s5.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s5.p1")}</p>
          </section>

          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s6.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s6.p1")}</p>
          </section>

          {/* 7. Haklarınız */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s7.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8, marginBottom: "12px" }}>{t("privacy.s7.p1")}</p>
            <ul style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s7.li1")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s7.li2")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s7.li3")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s7.li4")}</li>
              <li style={{ fontSize: "16px", color: "#6e6e73", lineHeight: 1.7 }}>{t("privacy.s7.li5")}</li>
            </ul>
          </section>

          {/* 8. İletişim */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s8.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s8.p1")}</p>
            <div style={{ marginTop: "16px", padding: "24px", background: "#f5f5f7", borderRadius: "12px" }}>
              <p style={{ fontSize: "16px", color: "#1d1d1f", fontWeight: 500 }}>Taytech Otomasyon ve Bilişim A.Ş.</p>
              <p style={{ fontSize: "15px", color: "#6e6e73", marginTop: "4px" }}>info@taytech.com.tr</p>
              <p style={{ fontSize: "15px", color: "#6e6e73", marginTop: "2px" }}>(0262) 502 51 49</p>
            </div>
          </section>

          {/* Son güncelleme */}
          <div style={{ paddingTop: "24px", borderTop: "1px solid #e5e5e5" }}>
            <p style={{ fontSize: "14px", color: "#86868b" }}>{t("privacy.lastUpdate")}</p>
          </div>

        </div>
      </div>

      <Footer theme="light" />
    </div>
  );
}
