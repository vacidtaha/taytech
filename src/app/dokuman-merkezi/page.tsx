"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DocItem {
  id: number;
  nameTr: string;
  nameEn: string;
  url: string;
  type: string;
  productNameTr: string;
  productNameEn: string;
  productSlug: string;
  categoryNameTr: string;
  categoryNameEn: string;
  topCategoryNameTr: string;
  topCategoryNameEn: string;
}

const typeLabels: Record<string, { tr: string; en: string }> = {
  teknik: { tr: "Katalog", en: "Catalog" },
  kilavuz: { tr: "Kullanım Kılavuzu", en: "User Manual" },
  sertifika: { tr: "Sertifika", en: "Certificate" },
  cad: { tr: "CAD Çizimi", en: "CAD Drawing" },
  genel: { tr: "Genel Katalog", en: "General Catalog" },
};

function DocIcon({ type }: { type: string }) {
  if (type === "genel") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="4" width="24" height="36" rx="2" stroke="#dc2626" strokeWidth="2" />
        <rect x="12" y="8" width="24" height="36" rx="2" stroke="#dc2626" strokeWidth="2" fill="white" />
        <rect x="16" y="12" width="24" height="36" rx="2" stroke="#dc2626" strokeWidth="2" fill="white" />
        <line x1="22" y1="22" x2="34" y2="22" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="22" y1="28" x2="32" y2="28" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
        <line x1="22" y1="34" x2="30" y2="34" stroke="#dc2626" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
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

export default function DokumanMerkeziPage() {
  const { locale } = useLanguage();
  const isEn = locale === "EN";
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [allCats, setAllCats] = useState<{ nameTr: string; nameEn: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selCategories, setSelCategories] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<string[]>([]);
  const [selProducts, setSelProducts] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ category: true, type: true });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/documents")
      .then((r) => r.json())
      .then((data: { documents: DocItem[]; allCategories: { nameTr: string; nameEn: string }[] }) => {
        const genelKatalog: DocItem = {
          id: -1,
          nameTr: "Taytech Genel Katalog",
          nameEn: "Taytech General Catalog",
          url: "/katalog.pdf",
          type: "genel",
          productNameTr: "Taytech",
          productNameEn: "Taytech",
          productSlug: "",
          categoryNameTr: "Genel",
          categoryNameEn: "General",
          topCategoryNameTr: "Genel",
          topCategoryNameEn: "General",
        };
        setDocs([genelKatalog, ...data.documents]);
        setAllCats([{ nameTr: "Genel", nameEn: "General" }, ...data.allCategories]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleArr = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const categories = useMemo(() => {
    return allCats.map(c => isEn ? c.nameEn : c.nameTr);
  }, [allCats, isEn]);

  const typeKeys = ["teknik", "kilavuz", "sertifika", "cad", "genel"];

  const availableProducts = useMemo(() => {
    if (selCategories.length === 0) return [];
    const prods = new Set<string>();
    docs.forEach(d => {
      const cat = isEn ? d.topCategoryNameEn : d.topCategoryNameTr;
      if (selCategories.includes(cat)) {
        prods.add(isEn ? d.productNameEn : d.productNameTr);
      }
    });
    return [...prods].sort();
  }, [docs, selCategories, isEn]);

  const filtered = useMemo(() => {
    return docs.filter(d => {
      const q = search.toLowerCase();
      const name = isEn ? d.nameEn : d.nameTr;
      const prodName = isEn ? d.productNameEn : d.productNameTr;
      const catName = isEn ? d.topCategoryNameEn : d.topCategoryNameTr;
      const matchSearch = !q || name.toLowerCase().includes(q) || prodName.toLowerCase().includes(q) || catName.toLowerCase().includes(q);
      const matchCat = selCategories.length === 0 || selCategories.includes(catName);
      const matchType = selTypes.length === 0 || selTypes.includes(d.type);
      const matchProduct = selProducts.length === 0 || selProducts.includes(prodName);
      return matchSearch && matchCat && matchType && matchProduct;
    });
  }, [docs, search, selCategories, selTypes, selProducts, isEn]);

  const clearAll = () => { setSearch(""); setSelCategories([]); setSelTypes([]); setSelProducts([]); };
  const activeCount = selCategories.length + selTypes.length + selProducts.length;

  const tl = (type: string) => typeLabels[type]?.[isEn ? "en" : "tr"] ?? type;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 24, height: 24, border: "2px solid #e5e5e5", borderTopColor: "#dc2626", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "48px" }}>
        <div style={{ background: "#dc2626", padding: "60px 0 40px" }}>
          <div style={{ padding: "0 20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>Taytech</p>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: "10px" }}>
              {isEn ? "Document Center" : "Doküman Merkezi"}
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", fontWeight: 450 }}>
              {isEn ? "Access datasheets, user manuals and technical documents." : "Teknik veri sayfaları, kullanım kılavuzları ve teknik dokümanlara ulaşın."}
            </p>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #e5e5e5" }}>
          <div style={{ padding: "0 20px" }}>
            <div style={{ position: "relative", padding: "16px 0" }}>
              <Search size={16} style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", color: "#86868b" }} />
              <input type="text" placeholder={isEn ? "Search documents..." : "Doküman ara..."} value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "6px 28px 6px 28px", background: "transparent", border: "none", color: "#1d1d1f", fontSize: "16px", outline: "none", fontFamily: "inherit" }} />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#86868b" }}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0" }}>
          <p style={{ fontSize: "13px", color: "#86868b" }}>{filtered.length} {isEn ? "document(s)" : "doküman"}</p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {activeCount > 0 && (
              <button onClick={clearAll} style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>
                {isEn ? "Clear" : "Temizle"}
              </button>
            )}
            <button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", fontSize: "13px", fontWeight: 600,
                color: mobileFiltersOpen ? "white" : "#1d1d1f", background: mobileFiltersOpen ? "#dc2626" : "#f5f5f7",
                border: "none", borderRadius: "980px", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
              {isEn ? "Filter" : "Filtre"}
              {activeCount > 0 && (
                <span style={{ background: mobileFiltersOpen ? "white" : "#dc2626", color: mobileFiltersOpen ? "#dc2626" : "white",
                  fontSize: "11px", fontWeight: 700, width: "18px", height: "18px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>{activeCount}</span>
              )}
            </button>
          </div>
        </div>

        {mobileFiltersOpen && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e5e5", background: "#fafafa" }}>
            <FilterSection title={isEn ? "Category" : "Kategori"} isOpen={openSections.category !== false} onToggle={() => toggleSection("category")}>
              {categories.map(cat => (
                <FilterCheckbox key={cat} label={cat} count={docs.filter(d => (isEn ? d.topCategoryNameEn : d.topCategoryNameTr) === cat).length}
                  checked={selCategories.includes(cat)} onChange={() => { const next = toggleArr(selCategories, cat); setSelCategories(next); if (!next.includes(cat)) setSelProducts([]); }} />
              ))}
            </FilterSection>
            {selCategories.length > 0 && availableProducts.length > 0 && (
              <FilterSection title={isEn ? "Product" : "Ürün"} isOpen={openSections.product !== false} onToggle={() => toggleSection("product")}>
                {availableProducts.map(prod => (
                  <FilterCheckbox key={prod} label={prod}
                    count={docs.filter(d => (isEn ? d.productNameEn : d.productNameTr) === prod && selCategories.includes(isEn ? d.topCategoryNameEn : d.topCategoryNameTr)).length}
                    checked={selProducts.includes(prod)} onChange={() => setSelProducts(toggleArr(selProducts, prod))} />
                ))}
              </FilterSection>
            )}
            <FilterSection title={isEn ? "Document Type" : "Doküman Tipi"} isOpen={openSections.type !== false} onToggle={() => toggleSection("type")}>
              {typeKeys.map(tk => (
                <FilterCheckbox key={tk} label={tl(tk)} count={docs.filter(d => d.type === tk).length}
                  checked={selTypes.includes(tk)} onChange={() => setSelTypes(toggleArr(selTypes, tk))} />
              ))}
            </FilterSection>
            <button onClick={() => setMobileFiltersOpen(false)}
              style={{ width: "100%", padding: "12px", marginTop: "8px", fontSize: "14px", fontWeight: 600, color: "white",
                background: "#dc2626", border: "none", borderRadius: "10px", cursor: "pointer" }}>
              {filtered.length} {isEn ? "document(s)" : "doküman"}
            </button>
          </div>
        )}

        <div style={{ padding: "20px 20px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {filtered.map((doc) => (
              <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "#f5f5f7", border: "1px solid #e5e5e5", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e5e5e5" }}>
                    <div style={{ transform: "scale(0.7)" }}><DocIcon type={doc.type} /></div>
                  </div>
                  <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#dc2626", marginBottom: "6px" }}>{tl(doc.type)}</p>
                    <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f", lineHeight: 1.3, marginBottom: "4px" }}>{isEn ? doc.nameEn : doc.nameTr}</h3>
                    <p style={{ fontSize: "11px", color: "#86868b", marginBottom: "auto" }}>{isEn ? doc.productNameEn : doc.productNameTr}</p>
                    <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "10px", fontWeight: 500, color: "#86868b" }}>{isEn ? doc.topCategoryNameEn : doc.topCategoryNameTr}</span>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase" }}>{isEn ? "Download" : "İndir"}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ border: "1px solid #e5e5e5", padding: "60px 20px", textAlign: "center" }}>
              <p style={{ fontSize: "28px", marginBottom: "10px" }}>—</p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1d1d1f", marginBottom: "6px" }}>{isEn ? "No documents found" : "Doküman bulunamadı"}</h3>
              <p style={{ color: "#86868b", fontSize: "13px", marginBottom: "14px" }}>{isEn ? "Try adjusting your filters." : "Filtre ayarlarını değiştirmeyi deneyin."}</p>
              <button onClick={clearAll} style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>{isEn ? "Clear filters" : "Filtreleri temizle"}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "48px" }}>
      {/* Hero */}
      <div style={{ background: "#dc2626", padding: "120px 0 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}>Taytech</p>
          <h1 style={{ fontSize: "52px", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "12px" }}>
            {isEn ? "Document Center" : "Doküman Merkezi"}
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", fontWeight: 450, maxWidth: "500px" }}>
            {isEn ? "Access datasheets, user manuals and technical documents for all our products." : "Tüm ürünlerimize ait teknik veri sayfaları, kullanım kılavuzları ve teknik dokümanlara ulaşın."}
          </p>
        </div>
      </div>

      {/* Arama */}
      <div style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <div style={{ position: "relative", padding: "20px 0" }}>
            <Search size={18} style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", color: "#86868b" }} />
            <input type="text" placeholder={isEn ? "Search documents..." : "Doküman ara..."} value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "8px 32px 8px 32px", background: "transparent", border: "none", color: "#1d1d1f", fontSize: "16px", outline: "none", fontFamily: "inherit" }} />
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
              <p style={{ fontSize: "14px", color: "#86868b" }}>{filtered.length} {isEn ? "document(s)" : "doküman"}</p>
              {activeCount > 0 && (
                <button onClick={clearAll} style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {activeCount} {isEn ? "active filter(s)" : "aktif filtre"}
                </button>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {filtered.map((doc) => (
                <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: "#f5f5f7", border: "1px solid #e5e5e5", transition: "all 0.2s ease", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                    className="group-hover:!bg-[#dc2626] group-hover:!border-[#dc2626]">
                    <div style={{ height: "140px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e5e5e5", transition: "all 0.2s" }}
                      className="group-hover:!border-white/20">
                      <div style={{ transition: "all 0.2s" }} className="group-hover:!brightness-0 group-hover:!invert">
                        <DocIcon type={doc.type} />
                      </div>
                    </div>
                    <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#dc2626", marginBottom: "10px", transition: "color 0.2s" }} className="group-hover:!text-white/70">
                        {tl(doc.type)}
                      </p>
                      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1d1d1f", lineHeight: 1.3, marginBottom: "6px", transition: "color 0.2s" }} className="group-hover:!text-white">
                        {isEn ? doc.nameEn : doc.nameTr}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#86868b", marginBottom: "auto", transition: "color 0.2s" }} className="group-hover:!text-white/60">
                        {isEn ? doc.productNameEn : doc.productNameTr}
                      </p>
                      <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }} className="group-hover:!border-white/20">
                        <span style={{ fontSize: "11px", fontWeight: 500, color: "#86868b", transition: "color 0.2s" }} className="group-hover:!text-white/50">{isEn ? doc.topCategoryNameEn : doc.topCategoryNameTr}</span>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.2s" }} className="group-hover:!text-white">{isEn ? "Download" : "İndir"}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ border: "1px solid #e5e5e5", padding: "80px 40px", textAlign: "center" }}>
                <p style={{ fontSize: "32px", marginBottom: "12px" }}>—</p>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1d1d1f", marginBottom: "6px" }}>{isEn ? "No documents found" : "Doküman bulunamadı"}</h3>
                <p style={{ color: "#86868b", fontSize: "14px", marginBottom: "16px" }}>{isEn ? "Try adjusting your filters." : "Filtre ayarlarını değiştirmeyi deneyin."}</p>
                <button onClick={clearAll} style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}>{isEn ? "Clear filters" : "Filtreleri temizle"}</button>
              </div>
            )}
          </div>

          {/* Sağ - Filtreler */}
          <div style={{ width: "240px", flexShrink: 0 }}>
            <div className="sticky" style={{ top: "80px" }}>
              <FilterSection title={isEn ? "Category" : "Kategori"} isOpen={openSections.category !== false} onToggle={() => toggleSection("category")}>
                {categories.map(cat => (
                  <FilterCheckbox key={cat} label={cat} count={docs.filter(d => (isEn ? d.topCategoryNameEn : d.topCategoryNameTr) === cat).length}
                    checked={selCategories.includes(cat)}
                    onChange={() => {
                      const next = toggleArr(selCategories, cat);
                      setSelCategories(next);
                      if (!next.includes(cat)) setSelProducts([]);
                    }} />
                ))}
              </FilterSection>

              {selCategories.length > 0 && availableProducts.length > 0 && (
                <FilterSection title={isEn ? "Product" : "Ürün"} isOpen={openSections.product !== false} onToggle={() => toggleSection("product")}>
                  {availableProducts.map(prod => (
                    <FilterCheckbox key={prod} label={prod}
                      count={docs.filter(d => (isEn ? d.productNameEn : d.productNameTr) === prod && selCategories.includes(isEn ? d.topCategoryNameEn : d.topCategoryNameTr)).length}
                      checked={selProducts.includes(prod)}
                      onChange={() => setSelProducts(toggleArr(selProducts, prod))} />
                  ))}
                </FilterSection>
              )}

              <FilterSection title={isEn ? "Document Type" : "Doküman Tipi"} isOpen={openSections.type !== false} onToggle={() => toggleSection("type")}>
                {typeKeys.map(tk => (
                  <FilterCheckbox key={tk} label={tl(tk)} count={docs.filter(d => d.type === tk).length}
                    checked={selTypes.includes(tk)} onChange={() => setSelTypes(toggleArr(selTypes, tk))} />
                ))}
              </FilterSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <button onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 0", background: "none", border: "none", borderBottom: "2px solid #dc2626",
          cursor: "pointer", marginBottom: isOpen ? "8px" : "0" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#1d1d1f", textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</span>
        <ChevronDown size={14} style={{ color: "#86868b", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {isOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "16px" }}>{children}</div>
      )}
    </div>
  );
}

function FilterCheckbox({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0",
        background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
      <span style={{ width: "16px", height: "16px", border: checked ? "none" : "1.5px solid #c4c4c4",
        background: checked ? "#dc2626" : "transparent", display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: "13px", fontWeight: checked ? 600 : 400, color: checked ? "#dc2626" : "#424245", flex: 1, transition: "color 0.15s" }}>{label}</span>
      <span style={{ fontSize: "11px", color: "#86868b" }}>{count}</span>
    </button>
  );
}
