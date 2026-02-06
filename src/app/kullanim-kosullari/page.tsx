"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function KullanimKosullari() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-12">
      {/* Header */}
      <div style={{ padding: "140px 200px 0" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Taytech</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.1, marginBottom: "16px" }}>{t("terms.title")}</h1>
        <p style={{ fontSize: "20px", color: "#86868b", fontWeight: 450, maxWidth: "600px", lineHeight: 1.6 }}>
          {t("terms.subtitle")}
        </p>
      </div>

      <div style={{ margin: "50px 200px", height: "1px", background: "#e5e5e5" }} />

      {/* İçerik */}
      <div style={{ padding: "0 200px 100px", maxWidth: "1200px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

          {/* 1. Genel */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s1.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s1.p1")}</p>
          </section>

          {/* 2. Hizmetlerin Kullanımı */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s2.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s2.p1")}</p>
          </section>

          {/* 3. Fikri Mülkiyet */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s3.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s3.p1")}</p>
          </section>

          {/* 4. Ürün ve Hizmet Bilgileri */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s4.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s4.p1")}</p>
          </section>

          {/* 5. Sorumluluk Sınırlaması */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s5.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s5.p1")}</p>
          </section>

          {/* 6. Garanti ve İade */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s6.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s6.p1")}</p>
          </section>

          {/* 7. Gizlilik */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s7.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>
              {t("terms.s7.p1")}{" "}
              <Link href="/gizlilik-politikasi" style={{ color: "#dc2626", textDecoration: "underline" }}>
                {t("privacy.title")}
              </Link>
            </p>
          </section>

          {/* 8. Değişiklikler */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s8.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s8.p1")}</p>
          </section>

          {/* 9. Uygulanacak Hukuk */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s9.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s9.p1")}</p>
          </section>

          {/* 10. İletişim */}
          <section>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1d1d1f", marginBottom: "16px" }}>{t("terms.s10.title")}</h2>
            <p style={{ fontSize: "17px", color: "#424245", lineHeight: 1.8 }}>{t("terms.s10.p1")}</p>
            <div style={{ marginTop: "16px", padding: "24px", background: "#f5f5f7", borderRadius: "12px" }}>
              <p style={{ fontSize: "16px", color: "#1d1d1f", fontWeight: 500 }}>Taytech Otomasyon ve Bilişim A.Ş.</p>
              <p style={{ fontSize: "15px", color: "#6e6e73", marginTop: "4px" }}>info@taytech.com.tr</p>
              <p style={{ fontSize: "15px", color: "#6e6e73", marginTop: "2px" }}>(0262) 502 51 49</p>
            </div>
          </section>

          {/* Son güncelleme */}
          <div style={{ paddingTop: "24px", borderTop: "1px solid #e5e5e5" }}>
            <p style={{ fontSize: "14px", color: "#86868b" }}>{t("terms.lastUpdate")}</p>
          </div>

        </div>
      </div>

      <Footer theme="light" />
    </div>
  );
}

