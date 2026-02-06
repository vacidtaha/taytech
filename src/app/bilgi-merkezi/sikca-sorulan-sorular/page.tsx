"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// FAQ yapısı - anahtarlar çeviri dosyalarından çekilir
const faqStructure = [
  { catKey: "sss.cat.genel", keys: ["sss.g1", "sss.g2", "sss.g3", "sss.g4"] },
  { catKey: "sss.cat.urunler", keys: ["sss.u1", "sss.u2", "sss.u3", "sss.u4", "sss.u5", "sss.u6"] },
  { catKey: "sss.cat.teknik", keys: ["sss.t1", "sss.t2", "sss.t3", "sss.t4"] },
  { catKey: "sss.cat.cozumler", keys: ["sss.c1", "sss.c2", "sss.c3"] },
];

export default function SikcaSorulanSorular() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (id: string) => setOpenIndex(openIndex === id ? null : id);

  const faqs = faqStructure.map(section => ({
    category: t(section.catKey),
    catKey: section.catKey,
    questions: section.keys.map(key => ({ q: t(`${key}.q`), a: t(`${key}.a`), key })),
  }));

  const filteredFaqs = activeCategory
    ? faqs.filter(f => f.catKey === activeCategory)
    : faqs;

  return (
    <div className="min-h-screen bg-white pt-12">
      {/* Geri */}
      <div style={{ paddingTop: "80px", paddingLeft: "200px" }}>
        <Link href="/" className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#dc2626] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span className="text-lg font-medium">Ana Sayfa</span>
        </Link>
      </div>

      {/* Başlık */}
      <div style={{ padding: "80px 200px 0" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>{t("sss.bilgiMerkezi")}</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.1, marginBottom: "16px" }}>{t("sss.title")}</h1>
        <p style={{ fontSize: "20px", color: "#86868b", fontWeight: 450, maxWidth: "600px", lineHeight: 1.6 }}>
          {t("sss.desc")}
        </p>
      </div>

      {/* Ayraç */}
      <div style={{ margin: "50px 200px", height: "1px", background: "#e5e5e5" }} />

      {/* İçerik */}
      <div style={{ padding: "0 200px 100px" }}>
        <div style={{ display: "flex", gap: "60px" }}>
          {/* Sol - Sorular */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {filteredFaqs.map((section) => (
              <div key={section.category} style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #dc2626" }}>
                  {section.category}
                </h2>
                <div>
                  {section.questions.map((item, qi) => {
                    const id = `${section.category}-${qi}`;
                    const isOpen = openIndex === id;
                    return (
                      <div key={id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <button
                          onClick={() => toggle(id)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "20px 0",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "24px",
                          }}
                        >
                          <span style={{ fontSize: "17px", fontWeight: 500, color: isOpen ? "#dc2626" : "#1d1d1f", transition: "color 0.2s", lineHeight: 1.4 }}>
                            {item.q}
                          </span>
                          <span style={{
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "transform 0.3s",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <line x1="8" y1="2" x2="8" y2="14" stroke={isOpen ? "#dc2626" : "#86868b"} strokeWidth="1.5" />
                              <line x1="2" y1="8" x2="14" y2="8" stroke={isOpen ? "#dc2626" : "#86868b"} strokeWidth="1.5" />
                            </svg>
                          </span>
                        </button>
                        <div style={{
                          maxHeight: isOpen ? "500px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease, opacity 0.3s ease",
                          opacity: isOpen ? 1 : 0,
                        }}>
                          <p style={{ fontSize: "16px", color: "#424245", lineHeight: 1.8, paddingBottom: "24px", paddingRight: "52px" }}>
                            {item.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sağ - Kategori Filtre */}
          <div style={{ width: "220px", flexShrink: 0 }}>
            <div className="sticky" style={{ top: "80px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#1d1d1f", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px", paddingBottom: "12px", borderBottom: "2px solid #dc2626" }}>
                {t("sss.kategoriler")}
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    textAlign: "left",
                    padding: "10px 0",
                    fontSize: "14px",
                    fontWeight: !activeCategory ? 600 : 400,
                    color: !activeCategory ? "#dc2626" : "#424245",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    transition: "color 0.15s",
                  }}
                >
                  {t("sss.tumu")}
                </button>
                {faqs.map((section) => (
                  <button
                    key={section.catKey}
                    onClick={() => setActiveCategory(activeCategory === section.catKey ? null : section.catKey)}
                    style={{
                      textAlign: "left",
                      padding: "10px 0",
                      fontSize: "14px",
                      fontWeight: activeCategory === section.catKey ? 600 : 400,
                      color: activeCategory === section.catKey ? "#dc2626" : "#424245",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid #f0f0f0",
                      cursor: "pointer",
                      transition: "color 0.15s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{section.category}</span>
                    <span style={{ fontSize: "12px", color: activeCategory === section.catKey ? "#dc2626" : "#86868b" }}>{section.questions.length}</span>
                  </button>
                ))}
              </div>

              {/* İletişim CTA */}
              <div style={{ marginTop: "40px", padding: "24px", background: "#f5f5f7" }}>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#1d1d1f", marginBottom: "8px" }}>{t("sss.sorunuz")}</p>
                <p style={{ fontSize: "13px", color: "#86868b", lineHeight: 1.5, marginBottom: "16px" }}>{t("sss.sorunuzDesc")}</p>
                <Link
                  href="/iletisim"
                  style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#dc2626",
                    textDecoration: "none",
                  }}
                >
                  {t("sss.iletisim")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer theme="light" />
    </div>
  );
}
