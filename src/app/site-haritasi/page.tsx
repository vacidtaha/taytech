"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const sitemap = [
  {
    titleKey: "nav.urunler",
    links: [
      { name: "Motor Kontrol Panoları", href: "/urunler/kontrol-panelleri", children: [
        { name: "Elektronik Kontrol Panelleri", href: "/urunler/kontrol-panelleri/elektronik-kontrol-panelleri", children: [
          { name: "Smart Serisi", href: "/urunler/kontrol-panelleri/elektronik-kontrol-panelleri/smart-serisi" },
          { name: "Frekans İnvertör Serisi", href: "/urunler/kontrol-panelleri/elektronik-kontrol-panelleri/frekans-invertor-serisi" },
          { name: "Soft Starter Serisi", href: "/urunler/kontrol-panelleri/elektronik-kontrol-panelleri/soft-starter-serisi" },
        ]},
        { name: "Elektro Mekanik Paneller", href: "/urunler/kontrol-panelleri/elektro-mekanik-paneller" },
        { name: "Yangın Pompa Kontrol Panoları", href: "/urunler/kontrol-panelleri/yangin-pompa-kontrol-panolari", children: [
          { name: "NFPA / UL & FM Serisi", href: "/urunler/kontrol-panelleri/yangin-pompa-kontrol-panolari/nfpa-ul-fm-serisi" },
          { name: "EN Serisi", href: "/urunler/kontrol-panelleri/yangin-pompa-kontrol-panolari/en-serisi" },
        ]},
      ]},
      { name: "Enerji Yönetim Platformu (BLES)", href: "/urunler/enerji-yonetim-platformu", children: [
        { name: "Yazılım Platformu", href: "/urunler/enerji-yonetim-platformu/yazilim-platformu" },
        { name: "Veri Yönetim Cihazları", href: "/urunler/enerji-yonetim-platformu/veri-yonetim-cihazlari" },
      ]},
      { name: "Isıtma Soğutma Ekipmanları", href: "/urunler/isitma-sogutma-ekipmanlari" },
      { name: "Isı Ağları (Heat Network)", href: "/urunler/heat-network", children: [
        { name: "Isı İstasyonları", href: "/urunler/heat-network/isi-istasyonlari", children: [
          { name: "SmartHexa Serisi", href: "/urunler/heat-network/isi-istasyonlari/smarthexa-serisi" },
          { name: "HydroHexa Serisi", href: "/urunler/heat-network/isi-istasyonlari/hydrohexa-serisi" },
          { name: "ThermoHexa Serisi", href: "/urunler/heat-network/isi-istasyonlari/thermohexa-serisi" },
          { name: "Hydro EM Serisi", href: "/urunler/heat-network/isi-istasyonlari/hydro-em-serisi" },
        ]},
        { name: "Endüstriyel Isı İstasyonları", href: "/urunler/heat-network/endustriyel-isi-istasyonlari" },
        { name: "Sayaç İstasyonları", href: "/urunler/heat-network/sayac-istasyonlari" },
        { name: "Manyetik Filtreler", href: "/urunler/heat-network/manyetik-filtreler" },
        { name: "Aksesuarlar", href: "/urunler/heat-network/aksesuarlar" },
        { name: "Sayaçlar", href: "/urunler/heat-network/sayaclar" },
        { name: "Ön Ödemeli Sayaçlar", href: "/urunler/heat-network/on-odemeli-sayaclar" },
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

    </div>
  );
}
