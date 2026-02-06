"use client";

import { useState, useMemo } from "react";
import Footer from "@/components/Footer";
import { Search, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const allDocuments = [
  { name: "Smart Box", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-box-datasheet.pdf" },
  { name: "Smart Box", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-box-kullanim.pdf" },
  { name: "Smart Booster", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-booster-datasheet.pdf" },
  { name: "Smart Booster", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-booster-kullanim.pdf" },
  { name: "Smart Wastewater", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-wastewater-datasheet.pdf" },
  { name: "Smart Wastewater", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-wastewater-kullanim.pdf" },
  { name: "Smart Bore Hole", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-bore-hole-datasheet.pdf" },
  { name: "Smart Bore Hole", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-bore-hole-kullanim.pdf" },
  { name: "Smart Grinder", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-grinder-datasheet.pdf" },
  { name: "Smart Grinder", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-grinder-kullanim.pdf" },
  { name: "Smart Exclusive D", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-exclusive-d-datasheet.pdf" },
  { name: "Smart Exclusive D", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-exclusive-d-kullanim.pdf" },
  { name: "Smart Exclusive S", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-exclusive-s-datasheet.pdf" },
  { name: "Smart Exclusive S", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/smart-exclusive-s-kullanim.pdf" },
  { name: "FXA", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/fxa-datasheet.pdf" },
  { name: "FXA", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/fxa-kullanim.pdf" },
  { name: "Mini Speed", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/mini-speed-datasheet.pdf" },
  { name: "Mini Speed", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/mini-speed-kullanim.pdf" },
  { name: "FXS", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/fxs-datasheet.pdf" },
  { name: "FXS", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/fxs-kullanim.pdf" },
  { name: "PSTX", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/pstx-datasheet.pdf" },
  { name: "PSTX", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/pstx-kullanim.pdf" },
  { name: "PSE", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/pse-datasheet.pdf" },
  { name: "PSE", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektronik", link: "/pse-kullanim.pdf" },
  { name: "Start One", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektromekanik", link: "/start-one-datasheet.pdf" },
  { name: "Start One", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektromekanik", link: "/start-one-kullanim.pdf" },
  { name: "Direct Start EM", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektromekanik", link: "/direct-start-em-datasheet.pdf" },
  { name: "Direct Start EM", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektromekanik", link: "/direct-start-em-kullanim.pdf" },
  { name: "Star Delta Start", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Elektromekanik", link: "/star-delta-start-datasheet.pdf" },
  { name: "Star Delta Start", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Elektromekanik", link: "/star-delta-start-kullanim.pdf" },
  { name: "Smart Jockey EN", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/smart-jockey-en-datasheet.pdf" },
  { name: "Smart Jockey EN", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/smart-jockey-en-kullanim.pdf" },
  { name: "Jockey EN", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/jockey-en-datasheet.pdf" },
  { name: "Jockey EN", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/jockey-en-kullanim.pdf" },
  { name: "Direct EN", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/direct-en-datasheet.pdf" },
  { name: "Direct EN", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/direct-en-kullanim.pdf" },
  { name: "Star Delta EN", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/star-delta-en-datasheet.pdf" },
  { name: "Star Delta EN", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/star-delta-en-kullanim.pdf" },
  { name: "Dizel EN", type: "datasheet", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/dizel-en-datasheet.pdf" },
  { name: "Dizel EN", type: "kilavuz", category: "Akıllı Kontrol Panoları", sub: "Yangın Sistemleri", link: "/dizel-en-kullanim.pdf" },
  { name: "ThermoHexa", type: "datasheet", category: "Isı İstasyonu", sub: "Direct", link: "/thermohexa-datasheet.pdf" },
  { name: "ThermoHexa UVH", type: "datasheet", category: "Isı İstasyonu", sub: "Direct", link: "/thermohexa-ufh-datasheet.pdf" },
  { name: "HydroHexa", type: "datasheet", category: "Isı İstasyonu", sub: "Direct", link: "/hydrohexa-datasheet.pdf" },
  { name: "HydroHexa UVH", type: "datasheet", category: "Isı İstasyonu", sub: "Direct", link: "/hydrohexa-ufh-datasheet.pdf" },
  { name: "Indirect HydroHexa", type: "datasheet", category: "Isı İstasyonu", sub: "Indirect", link: "/indirect-hydrohexa-datasheet.pdf" },
  { name: "Indirect ThermoHexa", type: "datasheet", category: "Isı İstasyonu", sub: "Indirect", link: "/indirect-thermohexa-datasheet.pdf" },
  { name: "Smart Hexa", type: "datasheet", category: "Isı İstasyonu", sub: "Indirect", link: "/smart-hexa-datasheet.pdf" },
  { name: "Smart Grinder Kontrolör", type: "datasheet", category: "Elektronik", sub: "Smart Endüstriyel", link: "/smart-grinder-kontrolor-datasheet.pdf" },
  { name: "Smart Hidrofor Kontrolör", type: "datasheet", category: "Elektronik", sub: "Smart Endüstriyel", link: "/smart-hidrofor-kontrolor-datasheet.pdf" },
  { name: "Smart Atık Su Kontrolör", type: "datasheet", category: "Elektronik", sub: "Smart Endüstriyel", link: "/smart-atik-su-kontrolor-datasheet.pdf" },
  { name: "Smart Derin Kuyu Kontrolör", type: "datasheet", category: "Elektronik", sub: "Smart Endüstriyel", link: "/smart-derin-kuyu-kontrolor-datasheet.pdf" },
  { name: "ESS-86", type: "datasheet", category: "Elektronik", sub: "Isı İstasyonu Kontrolörleri", link: "/ess-86-datasheet.pdf" },
  { name: "CHS18", type: "datasheet", category: "Elektronik", sub: "Isı İstasyonu Kontrolörleri", link: "/chs18-datasheet.pdf" },
  { name: "DE10", type: "datasheet", category: "Elektronik", sub: "Isı İstasyonu Kontrolörleri", link: "/de10-datasheet.pdf" },
  { name: "DE15", type: "datasheet", category: "Elektronik", sub: "Isı İstasyonu Kontrolörleri", link: "/de15-datasheet.pdf" },
  { name: "DE25", type: "datasheet", category: "Elektronik", sub: "Isı İstasyonu Kontrolörleri", link: "/de25-datasheet.pdf" },
  { name: "DE30", type: "datasheet", category: "Elektronik", sub: "Isı İstasyonu Kontrolörleri", link: "/de30-datasheet.pdf" },
  { name: "T-Box", type: "datasheet", category: "Elektronik", sub: "Yerden Isıtma", link: "/t-box-datasheet.pdf" },
  { name: "Dataloger", type: "datasheet", category: "Taytech Cloud", sub: "Cloud", link: "/dataloger-datasheet.pdf" },
  { name: "Dataloger Gateway", type: "datasheet", category: "Taytech Cloud", sub: "Cloud", link: "/dataloger-gateway-datasheet.pdf" },
  { name: "GSM Modem", type: "datasheet", category: "Taytech Cloud", sub: "Cloud", link: "/gsm-modem-datasheet.pdf" },
  { name: "M-Bus Converter", type: "datasheet", category: "Taytech Cloud", sub: "Cloud", link: "/m-bus-converter-datasheet.pdf" },
  { name: "IRONTRAP® Manyetik Filtre", type: "datasheet", category: "Manyetik Filtre", sub: "Manyetik Filtre", link: "/manyetik-filtre-datasheet.pdf" },
  { name: "Taytech Genel Katalog", type: "katalog", category: "Genel", sub: "Genel", link: "/katalog.pdf" },
];

const typeLabelKeys: Record<string, string> = { datasheet: "dokuman.type.datasheet", kilavuz: "dokuman.type.kilavuz", katalog: "dokuman.type.katalog" };

const catLabelKeys: Record<string, string> = {
  "Akıllı Kontrol Panoları": "dokuman.cat.akilli",
  "Isı İstasyonu": "dokuman.cat.isi",
  "Elektronik": "dokuman.cat.elektronik",
  "Taytech Cloud": "dokuman.cat.cloud",
  "Manyetik Filtre": "dokuman.cat.manyetik",
  "Genel": "dokuman.cat.genel",
};

const subLabelKeys: Record<string, string> = {
  "Elektronik": "dokuman.sub.elektronik",
  "Elektromekanik": "dokuman.sub.elektromekanik",
  "Yangın Sistemleri": "dokuman.sub.yangin",
  "Direct": "dokuman.sub.direct",
  "Indirect": "dokuman.sub.indirect",
  "Smart Endüstriyel": "dokuman.sub.smart",
  "Isı İstasyonu Kontrolörleri": "dokuman.sub.isiKontrol",
  "Yerden Isıtma": "dokuman.sub.yerden",
  "Cloud": "dokuman.sub.cloud",
  "Manyetik Filtre": "dokuman.sub.manyetik",
  "Genel": "dokuman.sub.genel",
};

function DocIcon({ type }: { type: string }) {
  if (type === "datasheet") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="4" width="28" height="36" stroke="#dc2626" strokeWidth="2" />
        <path d="M14 4V0M26 4V0M14 40v4M26 40v4" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="12" y1="14" x2="28" y2="14" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="12" y1="20" x2="24" y2="20" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="25" x2="26" y2="25" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="30" x2="20" y2="30" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <rect x="32" y="16" width="12" height="16" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="38" cy="24" r="4" stroke="#dc2626" strokeWidth="1" />
        <line x1="38" y1="20" x2="38" y2="28" stroke="#dc2626" strokeWidth="0.5" />
        <line x1="34" y1="24" x2="42" y2="24" stroke="#dc2626" strokeWidth="0.5" />
      </svg>
    );
  }
  if (type === "kilavuz") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8C20 6 14 5 6 6v30c8-1 14 0 18 2 4-2 10-3 18-2V6c-8-1-14 0-18 2z" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
        <line x1="24" y1="8" x2="24" y2="38" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="11" y1="14" x2="20" y2="14" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="11" y1="19" x2="19" y2="19" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="11" y1="24" x2="18" y2="24" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="28" y1="14" x2="37" y2="14" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="28" y1="19" x2="36" y2="19" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="28" y1="24" x2="35" y2="24" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M4 12h16l4-4h20v32H4V12z" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
      <line x1="4" y1="18" x2="44" y2="18" stroke="#dc2626" strokeWidth="1.5" />
      <rect x="16" y="24" width="16" height="2" fill="#dc2626" opacity="0.3" />
      <rect x="18" y="30" width="12" height="2" fill="#dc2626" opacity="0.3" />
    </svg>
  );
}

const categories = [...new Set(allDocuments.map(d => d.category))];
const typeKeys = [...new Set(allDocuments.map(d => d.type))];

// Kategori → alt kategoriler haritası
const subsByCategory: Record<string, string[]> = {};
allDocuments.forEach(d => {
  if (!subsByCategory[d.category]) subsByCategory[d.category] = [];
  if (!subsByCategory[d.category].includes(d.sub)) subsByCategory[d.category].push(d.sub);
});

// Kategori → ürün isimleri haritası
const productsByCategory: Record<string, string[]> = {};
allDocuments.forEach(d => {
  if (!productsByCategory[d.category]) productsByCategory[d.category] = [];
  if (!productsByCategory[d.category].includes(d.name)) productsByCategory[d.category].push(d.name);
});

export default function DokumanMerkeziPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selCategories, setSelCategories] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<string[]>([]);
  const [selSubs, setSelSubs] = useState<string[]>([]);
  const [selProducts, setSelProducts] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ category: true, type: true });

  const toggleArr = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  // Seçili kategorilere göre alt kategori ve ürün listeleri
  const availableSubs = useMemo(() => {
    if (selCategories.length === 0) return [];
    const subs = new Set<string>();
    selCategories.forEach(cat => {
      (subsByCategory[cat] || []).forEach(s => subs.add(s));
    });
    return [...subs];
  }, [selCategories]);

  const availableProducts = useMemo(() => {
    if (selCategories.length === 0) return [];
    const prods = new Set<string>();
    allDocuments.forEach(d => {
      if (selCategories.includes(d.category)) {
        if (selSubs.length === 0 || selSubs.includes(d.sub)) {
          prods.add(d.name);
        }
      }
    });
    return [...prods].sort();
  }, [selCategories, selSubs]);

  const filtered = useMemo(() => {
    return allDocuments.filter(d => {
      const q = search.toLowerCase();
      const matchSearch = !q || d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q);
      const matchCat = selCategories.length === 0 || selCategories.includes(d.category);
      const matchType = selTypes.length === 0 || selTypes.includes(d.type);
      const matchSub = selSubs.length === 0 || selSubs.includes(d.sub);
      const matchProduct = selProducts.length === 0 || selProducts.includes(d.name);
      return matchSearch && matchCat && matchType && matchSub && matchProduct;
    });
  }, [search, selCategories, selTypes, selSubs, selProducts]);

  const clearAll = () => { setSearch(""); setSelCategories([]); setSelTypes([]); setSelSubs([]); setSelProducts([]); };
  const activeCount = selCategories.length + selTypes.length + selSubs.length + selProducts.length;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "48px" }}>
      {/* Hero */}
      <div style={{ background: "#dc2626", padding: "120px 0 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}>
            {t("dokuman.taytech")}
          </p>
          <h1 style={{ fontSize: "52px", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "12px" }}>
            {t("dokuman.title")}
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", fontWeight: 450, maxWidth: "500px" }}>
            {t("dokuman.desc")}
          </p>
        </div>
      </div>

      {/* Arama */}
      <div style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <div style={{ position: "relative", padding: "20px 0" }}>
            <Search size={18} style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", color: "#86868b" }} />
            <input
              type="text"
              placeholder={t("dokuman.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "8px 32px 8px 32px", background: "transparent", border: "none", color: "#1d1d1f", fontSize: "16px", outline: "none", fontFamily: "inherit" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#86868b" }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 80px 120px" }}>
        <div style={{ display: "flex", gap: "60px" }}>
          {/* Sol - Grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
              <p style={{ fontSize: "14px", color: "#86868b" }}>{filtered.length} {t("dokuman.showing")}</p>
              {activeCount > 0 && (
                <button onClick={clearAll} style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {activeCount} {t("dokuman.activeFilters")}
                </button>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {filtered.map((doc, i) => (
                <a key={`${doc.link}-${i}`} href={doc.link} target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{ background: "#f5f5f7", border: "1px solid #e5e5e5", transition: "all 0.2s ease", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                    className="group-hover:!bg-[#dc2626] group-hover:!border-[#dc2626]"
                  >
                    <div
                      style={{ height: "140px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e5e5e5", transition: "all 0.2s" }}
                      className="group-hover:!border-white/20"
                    >
                      <div style={{ transition: "all 0.2s" }} className="group-hover:!brightness-0 group-hover:!invert">
                        <DocIcon type={doc.type} />
                      </div>
                    </div>
                    <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#dc2626", marginBottom: "10px", transition: "color 0.2s" }} className="group-hover:!text-white/70">
                        {t(typeLabelKeys[doc.type])}
                      </p>
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1d1d1f", lineHeight: 1.3, marginBottom: "6px", transition: "color 0.2s" }} className="group-hover:!text-white">
                        {doc.name}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#86868b", marginBottom: "auto", transition: "color 0.2s" }} className="group-hover:!text-white/60">
                        {t(subLabelKeys[doc.sub] || doc.sub)}
                    </p>
                      <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }} className="group-hover:!border-white/20">
                        <span style={{ fontSize: "11px", fontWeight: 500, color: "#86868b", transition: "color 0.2s" }} className="group-hover:!text-white/50">{t(catLabelKeys[doc.category] || doc.category)}</span>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.2s" }} className="group-hover:!text-white">{t("dokuman.download")}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ border: "1px solid #e5e5e5", padding: "80px 40px", textAlign: "center" }}>
                <p style={{ fontSize: "32px", marginBottom: "12px" }}>—</p>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1d1d1f", marginBottom: "6px" }}>{t("dokuman.noResult")}</h3>
                <p style={{ color: "#86868b", fontSize: "14px", marginBottom: "16px" }}>{t("dokuman.noResultDesc")}</p>
                <button onClick={clearAll} style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>{t("dokuman.clearFilters")}</button>
              </div>
            )}
          </div>

          {/* Sağ - Filtreler */}
          <div style={{ width: "240px", flexShrink: 0 }}>
            <div className="sticky" style={{ top: "80px" }}>

              {/* Kategori */}
              <FilterSection title={t("dokuman.filter.kategori")} isOpen={openSections.category !== false} onToggle={() => toggleSection("category")}>
                {categories.map(cat => (
                  <FilterCheckbox
                    key={cat}
                    label={t(catLabelKeys[cat] || cat)}
                    count={allDocuments.filter(d => d.category === cat).length}
                    checked={selCategories.includes(cat)}
                    onChange={() => {
                      const next = toggleArr(selCategories, cat);
                      setSelCategories(next);
                      // Kaldırılan kategoriye ait sub ve ürün filtrelerini temizle
                      if (!next.includes(cat)) {
                        const removedSubs = subsByCategory[cat] || [];
                        setSelSubs(prev => prev.filter(s => !removedSubs.includes(s)));
                        const removedProds = productsByCategory[cat] || [];
                        setSelProducts(prev => prev.filter(p => !removedProds.includes(p)));
                      }
                    }}
                  />
                ))}
              </FilterSection>

              {/* Alt Kategori — sadece kategori seçiliyken */}
              {selCategories.length > 0 && availableSubs.length > 1 && (
                <FilterSection title={t("dokuman.filter.altKategori")} isOpen={openSections.sub !== false} onToggle={() => toggleSection("sub")}>
                  {availableSubs.map(sub => (
                    <FilterCheckbox
                      key={sub}
                      label={t(subLabelKeys[sub] || sub)}
                      count={allDocuments.filter(d => selCategories.includes(d.category) && d.sub === sub).length}
                      checked={selSubs.includes(sub)}
                      onChange={() => {
                        const next = toggleArr(selSubs, sub);
                        setSelSubs(next);
                        setSelProducts([]);
                      }}
                    />
                  ))}
                </FilterSection>
              )}

              {/* Ürün — sadece kategori seçiliyken */}
              {selCategories.length > 0 && availableProducts.length > 0 && (
                <FilterSection title={t("dokuman.filter.urun")} isOpen={openSections.product !== false} onToggle={() => toggleSection("product")}>
                  {availableProducts.map(prod => (
                    <FilterCheckbox
                      key={prod}
                      label={prod}
                      count={allDocuments.filter(d => d.name === prod && selCategories.includes(d.category) && (selSubs.length === 0 || selSubs.includes(d.sub))).length}
                      checked={selProducts.includes(prod)}
                      onChange={() => setSelProducts(toggleArr(selProducts, prod))}
                    />
                  ))}
                </FilterSection>
              )}

              {/* Doküman Tipi */}
              <FilterSection title={t("dokuman.filter.tip")} isOpen={openSections.type !== false} onToggle={() => toggleSection("type")}>
                {typeKeys.map(typeKey => (
                  <FilterCheckbox
                    key={typeKey}
                    label={t(typeLabelKeys[typeKey])}
                    count={allDocuments.filter(d => d.type === typeKey).length}
                    checked={selTypes.includes(typeKey)}
                    onChange={() => setSelTypes(toggleArr(selTypes, typeKey))}
                  />
                ))}
              </FilterSection>

            </div>
          </div>
        </div>
      </div>

      <Footer theme="white" />
    </div>
  );
}

/* ─── Filtre Bileşenleri ─── */

function FilterSection({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          background: "none",
          border: "none",
          borderBottom: "2px solid #dc2626",
          cursor: "pointer",
          marginBottom: isOpen ? "8px" : "0",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#1d1d1f", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {title}
        </span>
        <ChevronDown size={14} style={{ color: "#86868b", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {isOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "16px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function FilterCheckbox({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 0",
        background: "none",
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
      }}
    >
      {/* Checkbox */}
      <span
        style={{
          width: "16px",
          height: "16px",
          border: checked ? "none" : "1.5px solid #c4c4c4",
          background: checked ? "#dc2626" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: "13px", fontWeight: checked ? 600 : 400, color: checked ? "#dc2626" : "#424245", flex: 1, transition: "color 0.15s" }}>
        {label}
      </span>
      <span style={{ fontSize: "11px", color: "#86868b" }}>{count}</span>
    </button>
  );
}
