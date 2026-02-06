"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const sitemap = [
  {
    titleKey: "nav.urunler",
    links: [
      { nameKey: "mega.prod.akilli", href: "/urunler/akilli-kontrol-panolari", children: [
        { nameKey: "mega.prod.elektronikPano", href: "/urunler/akilli-kontrol-panolari/elektronik", children: [
          { name: "Direct Start", href: "/urunler/akilli-kontrol-panolari/elektronik/direct-start" },
          { nameKey: "mega.prod.invertor", href: "/urunler/akilli-kontrol-panolari/elektronik/invertor" },
          { nameKey: "mega.prod.softStarter", href: "/urunler/akilli-kontrol-panolari/elektronik/soft-starter" },
          { nameKey: "mega.prod.yildizUcgen", href: "/urunler/akilli-kontrol-panolari/elektronik/yildiz-ucgen" },
        ]},
        { nameKey: "mega.prod.elektromekanikPano", href: "/urunler/akilli-kontrol-panolari/elektromekanik", children: [
          { nameKey: "mega.prod.dogrudan", href: "/urunler/akilli-kontrol-panolari/elektromekanik/dogrudan-yol-verme" },
          { nameKey: "mega.prod.yildizUcgenEM", href: "/urunler/akilli-kontrol-panolari/elektromekanik/yildiz-ucgen" },
        ]},
        { nameKey: "mega.prod.yanginPano", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri", children: [
          { nameKey: "mega.prod.jokey", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/jokey" },
          { nameKey: "mega.prod.elektrikli", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/elektrikli" },
          { nameKey: "mega.prod.dizel", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/dizel" },
        ]},
      ]},
      { nameKey: "mega.prod.isi", href: "/urunler/isi-istasyonu", children: [
        { name: "Direct", href: "/urunler/isi-istasyonu/direct" },
        { name: "Indirect", href: "/urunler/isi-istasyonu/indirect" },
      ]},
      { nameKey: "mega.prod.elektronik", href: "/urunler/elektronik", children: [
        { nameKey: "mega.prod.smartEnd", href: "/urunler/elektronik/smart-endustriyel" },
        { nameKey: "mega.prod.isiKontrol", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri" },
        { nameKey: "mega.prod.yerden", href: "/urunler/elektronik/yerden-isitma" },
      ]},
      { nameKey: "mega.prod.cloud", href: "/urunler/taytech-cloud" },
      { nameKey: "mega.prod.manyetik", href: "/urunler/manyetik-filtre" },
      { nameKey: "mega.prod.sivilar", href: "/urunler/temizleyici-sivilar", children: [
        { nameKey: "mega.prod.koruyucu", href: "/urunler/temizleyici-sivilar/koruyucu" },
        { nameKey: "mega.prod.temizleyici", href: "/urunler/temizleyici-sivilar/temizleyici" },
      ]},
    ]
  },
  {
    titleKey: "nav.cozumler",
    links: [
      { nameKey: "cozumler.ticari", href: "/cozumler/ticari-tesisler" },
      { nameKey: "cozumler.toplu", href: "/cozumler/toplu-konutlar" },
      { nameKey: "cozumler.bakim", href: "/cozumler/bakim-huzur-evleri" },
      { nameKey: "cozumler.yeni", href: "/cozumler/yeni-projeler" },
      { nameKey: "cozumler.hastane", href: "/cozumler/hastaneler" },
      { nameKey: "cozumler.kazan", href: "/cozumler/endustriyel-kazan-dairesi" },
      { nameKey: "cozumler.spor", href: "/cozumler/spor-eglence-tesisleri" },
      { nameKey: "cozumler.saha", href: "/cozumler/saha-disi-uretim" },
      { nameKey: "cozumler.egitim", href: "/cozumler/egitim-yapilari" },
    ]
  },
  { titleKey: "nav.dokuman", links: [{ nameKey: "dokuman.title", href: "/dokuman-merkezi" }] },
  { titleKey: "nav.haberler", links: [{ nameKey: "haberler.title", href: "/haberler" }] },
  {
    titleKey: "nav.bilgi",
    links: [
      { nameKey: "mega.bilgi.video", href: "/bilgi-merkezi/video-arsivi" },
      { nameKey: "mega.bilgi.sss", href: "/bilgi-merkezi/sikca-sorulan-sorular" },
      { nameKey: "mega.bilgi.akademi", href: "/bilgi-merkezi/taytech-akademi" },
    ]
  },
  { titleKey: "nav.kurumsal", links: [{ nameKey: "footer.hakkimizda", href: "/kurumsal" }] },
  { titleKey: "nav.iletisim", links: [{ nameKey: "footer.iletisim", href: "/iletisim" }] },
];

type SitemapItem = { name?: string; nameKey?: string; href: string; children?: SitemapItem[] };

export default function SiteHaritasi() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const label = (item: SitemapItem) => item.nameKey ? t(item.nameKey) : item.name || "";

  const renderItems = (items: SitemapItem[], depth: number = 0) => (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: depth === 0 ? (isMobile ? "12px" : "16px") : (isMobile ? "6px" : "8px"), marginLeft: depth > 0 ? `${depth * (isMobile ? 16 : 24)}px` : "0" }}>
          <Link
            href={item.href}
            style={{
              fontSize: depth === 0 ? (isMobile ? "14px" : "16px") : (isMobile ? "13px" : "14px"),
              fontWeight: depth === 0 ? 500 : 400,
              color: "#424245",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            className="hover:!text-[#dc2626]"
          >
            {depth > 0 && <span style={{ color: "#d2d2d7", marginRight: "8px" }}>—</span>}
            {label(item)}
          </Link>
          {item.children && renderItems(item.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

  // ===== MOBİL =====
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white pt-12">
        <div style={{ padding: "60px 24px 0" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Taytech</p>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.15, marginBottom: "12px" }}>{t("footer.sitemap")}</h1>
        </div>

        <div style={{ margin: "32px 24px", height: "1px", background: "#e5e5e5" }} />

        <div style={{ padding: "0 24px 60px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {sitemap.map((section, i) => (
              <div key={i} style={{ marginBottom: "36px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", paddingBottom: "10px", borderBottom: "2px solid #dc2626" }}>
                  {t(section.titleKey)}
                </h2>
                {renderItems(section.links)}
              </div>
            ))}
          </div>
        </div>

        <Footer theme="light" />
      </div>
    );
  }

  // ===== MASAÜSTÜ (hiç değişmedi) =====
  return (
    <div className="min-h-screen bg-white pt-12">
      <div style={{ padding: "140px 200px 0" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Taytech</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.1, marginBottom: "16px" }}>{t("footer.sitemap")}</h1>
        <p style={{ fontSize: "20px", color: "#86868b", fontWeight: 450, maxWidth: "500px", lineHeight: 1.6 }}>
          {t("footer.sitemap")}
        </p>
      </div>

      <div style={{ margin: "50px 200px", height: "1px", background: "#e5e5e5" }} />

      <div style={{ padding: "0 200px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
          {sitemap.map((section, i) => (
            <div key={i} style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #dc2626" }}>
                {t(section.titleKey)}
              </h2>
              {renderItems(section.links)}
            </div>
          ))}
        </div>
      </div>

      <Footer theme="light" />
    </div>
  );
}
