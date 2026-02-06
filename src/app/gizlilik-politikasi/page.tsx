"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function GizlilikPolitikasi() {
  const { t } = useLanguage();

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

          {/* 4. Çerezler */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s4.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s4.p1")}</p>
          </section>

          {/* 5. Verilerin Paylaşımı */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("privacy.s5.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("privacy.s5.p1")}</p>
          </section>

          {/* 6. Veri Güvenliği */}
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

