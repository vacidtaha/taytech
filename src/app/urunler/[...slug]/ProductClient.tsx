"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function DescriptionRenderer({ text }: { text: string }) {
  type Block = { type: "heading" | "paragraph" | "bullets" | "specs" | "speclist"; content: string[] };

  const isTechHeading = (l: string) =>
    /teknik|özellik|specifications|features/i.test(l);

  const blocks = useMemo(() => {
    const lines = text.split("\n");
    const result: Block[] = [];
    let i = 0;

    const isHeading = (l: string) => {
      if (!l || l.length > 50) return false;
      if (l.endsWith(")") || l.endsWith(".")) return false;
      const upper = l === l.toUpperCase() && /[A-ZÇĞİÖŞÜ]/.test(l) && l.length > 2;
      const title = /^[A-ZÇĞİÖŞÜ]/.test(l) && !l.includes("\t") && !/\s{2,}:/.test(l);
      return upper || title;
    };

    const isSpecLine = (l: string) =>
      (l.includes("\t") && l.includes(":")) ||
      /^.+\s{2,}:\s*.+/.test(l);

    const isBulletLine = (raw: string) =>
      raw.startsWith(" ") || raw.startsWith("\t") || raw.startsWith("•");

    const collectBullets = (): string[] => {
      const bullets: string[] = [];
      while (i < lines.length) {
        const nextRaw = lines[i];
        const nextTrimmed = nextRaw.trim();
        if (!nextTrimmed) { i++; continue; }
        if (isHeading(nextTrimmed) && !isBulletLine(nextRaw)) break;
        if (isSpecLine(nextTrimmed)) break;
        if (nextTrimmed.length > 200) break;
        if (isBulletLine(nextRaw)) {
          bullets.push(nextTrimmed.replace(/^[•\-]\s*/, ""));
          i++;
        } else break;
      }
      return bullets;
    };

    while (i < lines.length) {
      const raw = lines[i];
      const trimmed = raw.trim();
      if (!trimmed) { i++; continue; }

      // Key:value spec lines (with tabs or double-space before colon)
      if (isSpecLine(trimmed)) {
        const specs: string[] = [];
        while (i < lines.length) {
          const t = lines[i].trim();
          if (!t) { i++; continue; }
          if (isSpecLine(t)) { specs.push(t); i++; }
          else if (isHeading(t) && !isBulletLine(lines[i])) {
            specs.push(t);
            i++;
          } else break;
        }
        if (specs.length > 0) {
          result.push({ type: "specs", content: specs });
          continue;
        }
      }

      // Heading
      if (isHeading(trimmed) && !isBulletLine(raw)) {
        const headingText = trimmed;
        i++;

        const bullets = collectBullets();

        if (isTechHeading(headingText) && bullets.length > 0) {
          result.push({ type: "speclist", content: [headingText, ...bullets] });
        } else {
          result.push({ type: "heading", content: [headingText] });
          if (bullets.length > 0) {
            result.push({ type: "bullets", content: bullets });
          }
        }
        continue;
      }

      // Bullet lines (start with space, tab, or •)
      if (isBulletLine(raw)) {
        const bullets: string[] = [];
        while (i < lines.length) {
          const r = lines[i];
          const t = r.trim();
          if (!t) { i++; continue; }
          if (isBulletLine(r)) {
            bullets.push(t.replace(/^[•\-]\s*/, ""));
            i++;
          } else break;
        }
        if (bullets.length > 0) {
          result.push({ type: "bullets", content: bullets });
          continue;
        }
      }

      // Regular paragraph
      result.push({ type: "paragraph", content: [trimmed] });
      i++;
    }
    return result;
  }, [text]);

  return (
    <div className="mb-8 space-y-5">
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          return (
            <h3 key={idx} className="text-[15px] font-semibold text-[#1d1d1f] mt-6 first:mt-0">
              {block.content[0]}
            </h3>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={idx} className="text-[15px] text-[#424245] leading-[1.7]">
              {block.content[0]}
            </p>
          );
        }
        if (block.type === "bullets") {
          return (
            <ul key={idx} className="space-y-2 ml-1">
              {block.content.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#424245] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e30613] mt-[7px] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "speclist") {
          const [title, ...items] = block.content;
          return (
            <div key={idx} className="mt-6">
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-3">{title}</h3>
              <div className="rounded-xl border border-[#e30613]/20 overflow-hidden">
                <table className="w-full text-[13px]">
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} className="border-b border-[#e30613]/10 last:border-0">
                        <td className="px-4 py-2.5 text-[#424245]">
                          {item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
        if (block.type === "specs") {
          const parsed = block.content.map((line) => {
            const tabSplit = line.split(/\t+:\t*/);
            if (tabSplit.length >= 2)
              return { key: tabSplit[0].trim(), value: tabSplit.slice(1).join(":").trim() };
            const spaceSplit = line.split(/\s{2,}:\s*/);
            if (spaceSplit.length >= 2)
              return { key: spaceSplit[0].trim(), value: spaceSplit.slice(1).join(":").trim() };
            const ci = line.indexOf(":");
            if (ci > 0 && ci < line.length - 1)
              return { key: line.slice(0, ci).trim(), value: line.slice(ci + 1).trim() };
            return { key: line.trim(), value: "" };
          });
          return (
            <div key={idx} className="rounded-xl border border-[#e30613]/20 overflow-hidden">
              <table className="w-full text-[13px]">
                <tbody>
                  {parsed.map((row, i) => (
                    <tr key={i} className={`border-b border-[#e30613]/10 last:border-0 ${!row.value ? "bg-[#e30613]/5" : ""}`}>
                      <td className={`px-4 py-2.5 ${row.value ? "text-[#86868b] w-[45%]" : "font-semibold text-[#e30613]"}`}>
                        {row.key}
                      </td>
                      {row.value && (
                        <td className="px-4 py-2.5 text-[#1d1d1f] font-medium">{row.value}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

interface ProductDoc {
  id: number;
  nameTr: string;
  nameEn: string;
  url: string;
  urlEn: string | null;
  type: string;
}

interface ProductImg {
  id: number;
  url: string;
  urlEn: string | null;
  sortOrder: number;
}

interface Product {
  id: number;
  slug: string;
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  image: string | null;
  imageEn: string | null;
  applicationImage: string | null;
  applicationImageEn: string | null;
  specTableData: string | null;
  images?: ProductImg[];
  category: { slug: string; nameTr: string; nameEn: string };
  documents: ProductDoc[];
  variants: {
    id: number;
    slug: string;
    label: string;
    titleTr: string;
    titleEn: string;
    descriptionTr: string;
    descriptionEn: string;
    image: string | null;
  }[];
}

const typeLabels: Record<string, { tr: string; en: string }> = {
  teknik: { tr: "Katalog", en: "Catalog" },
  kilavuz: { tr: "Kullanım Kılavuzu", en: "User Manual" },
  sertifika: { tr: "Sertifika", en: "Certificate" },
  cad: { tr: "CAD Çizimi", en: "CAD Drawing" },
};

export function ProductClient({ product, slug }: { product: Product; slug: string[] }) {
  const { locale } = useLanguage();
  const isEn = locale === "EN";
  const n = (tr: string, en: string) => (isEn ? en : tr);

  const mainImg = (isEn && product.imageEn) ? product.imageEn : product.image;
  const appImg = (isEn && product.applicationImageEn) ? product.applicationImageEn : product.applicationImage;

  const allImages: string[] = [];
  if (mainImg) allImages.push(mainImg);
  if (product.images) {
    product.images.forEach((img) => {
      const url = (isEn && img.urlEn) ? img.urlEn : img.url;
      if (!allImages.includes(url)) allImages.push(url);
    });
  }

  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const breadcrumbs = slug.map((s, i) => ({
    label: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: `/urunler/${slug.slice(0, i + 1).join("/")}`,
  }));

  const description = isEn ? product.descriptionEn : product.descriptionTr;
  const hasDocs = product.documents.length > 0;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Sol: Breadcrumb + Galeri (sticky) */}
          <div className="lg:sticky lg:top-28">
            <nav className="flex items-center gap-2 text-[13px] text-[#86868b] mb-6 flex-wrap">
              <Link href="/urunler" className="hover:text-[#1d1d1f] transition-colors">
                {isEn ? "Products" : "Ürünler"}
              </Link>
              {breadcrumbs.map((bc, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[#d2d2d7]">/</span>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-[#1d1d1f] font-medium">{n(product.nameTr, product.nameEn)}</span>
                  ) : (
                    <Link href={bc.href} className="hover:text-[#1d1d1f] transition-colors">{bc.label}</Link>
                  )}
                </span>
              ))}
            </nav>
            <div
              ref={imgRef}
              className="bg-[#f5f5f7] rounded-2xl aspect-square flex items-center justify-center overflow-hidden cursor-zoom-in relative"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {allImages.length > 0 ? (
                <img
                  src={allImages[activeIdx]}
                  alt={n(product.nameTr, product.nameEn)}
                  className="w-full h-full object-contain p-8 transition-transform duration-300"
                  style={zoomed ? {
                    transform: "scale(2)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  } : undefined}
                  draggable={false}
                />
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/80 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#acacb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-[#acacb0]">{isEn ? "Product image coming soon" : "Ürün görseli eklenecek"}</p>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 mt-4 justify-center">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeIdx ? "border-[#e30613]" : "border-transparent hover:border-[#d2d2d7]"
                    } bg-[#f5f5f7]`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1.5" draggable={false} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Bilgiler */}
          <div>
            <p className="text-[13px] text-[#e30613] font-medium mb-2 uppercase tracking-wide">
              {n(product.category.nameTr, product.category.nameEn)}
            </p>
            <h1 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
              {n(product.nameTr, product.nameEn)}
            </h1>

            {description ? (
              <DescriptionRenderer text={description} />
            ) : (
              <p className="text-[15px] text-[#86868b] mb-8">
                {n(product.nameEn, product.nameTr)}
              </p>
            )}

            {hasDocs && (
              <div className="mb-8">
                <h3 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wide mb-3">
                  {isEn ? "Technical Documents" : "Teknik Dökümanlar"}
                </h3>
                <div className="space-y-2">
                  {product.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={(isEn && doc.urlEn) ? doc.urlEn : doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e30613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#1d1d1f] group-hover:text-[#e30613] transition-colors">
                          {n(doc.nameTr, doc.nameEn)}
                        </p>
                        <p className="text-[12px] text-[#86868b]">
                          {typeLabels[doc.type]?.[isEn ? "en" : "tr"] ?? doc.type}
                        </p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:stroke-[#e30613] transition-colors">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wide mb-3">
                  {isEn ? "Variants" : "Varyantlar"}
                </h3>
                <div className="space-y-2">
                  {product.variants.map((v) => (
                    <div key={v.id} className="bg-[#f5f5f7] rounded-xl p-4">
                      <p className="text-[14px] font-medium text-[#1d1d1f]">{n(v.titleTr, v.titleEn)}</p>
                      {(isEn ? v.descriptionEn : v.descriptionTr) && (
                        <p className="text-[13px] text-[#86868b] mt-1">{n(v.descriptionTr, v.descriptionEn)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!description && !hasDocs && product.variants.length === 0 && (
              <div className="border border-dashed border-[#d2d2d7] rounded-xl p-8 text-center">
                <p className="text-[14px] text-[#86868b]">
                  {isEn ? "Product details will be added soon." : "Ürün detayları yakında eklenecektir."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Uygulama Fotoğrafı */}
        {(product.applicationImage || product.applicationImageEn) && (
          <div className="mt-16">
            <h2 className="text-[13px] font-semibold text-[#86868b] uppercase tracking-wider mb-4 text-center">
              {isEn ? "Application" : "Uygulama"}
            </h2>
            <div className="rounded-2xl overflow-hidden bg-[#f5f5f7]">
              <img
                src={appImg || product.applicationImage || ""}
                alt={isEn ? "Application photo" : "Uygulama fotoğrafı"}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          </div>
        )}

        {/* Teknik Veri Tabloları (Varyantlar) */}
        {product.specTableData && (() => {
          let tables: { name: string; data: string[][]; dataEn?: string[][] }[];
          try {
            const parsed = JSON.parse(product.specTableData);
            if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0]) && typeof parsed[0][0] === "string") {
              tables = [{ name: isEn ? "Technical Specifications" : "Teknik Veriler", data: parsed }];
            } else {
              tables = parsed;
            }
          } catch { return null; }
          if (tables.length === 0) return null;

          return (
            <div className="mt-16 space-y-12">
              {tables.map((variant, vi) => {
                const tableData = (isEn && variant.dataEn && variant.dataEn.length > 1) ? variant.dataEn : variant.data;
                if (tableData.length < 2) return null;
                return (
                  <div key={vi}>
                    <h2 className="text-[13px] font-semibold text-[#86868b] uppercase tracking-wider mb-4 text-center">
                      {variant.name}
                    </h2>
                    <div className="overflow-x-auto rounded-2xl border border-[#e5e5ea]">
                      <table className="w-full text-[14px]">
                        <thead>
                          <tr className="bg-[#f5f5f7]">
                            {tableData[0].map((h, i) => (
                              <th key={i} className="px-5 py-3.5 text-left font-semibold text-[#1d1d1f] border-b border-[#e5e5ea] whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.slice(1).map((row, ri) => (
                            <tr key={ri} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                              {row.map((cell, ci) => (
                                <td key={ci} className={`px-5 py-3 whitespace-nowrap ${ci === 0 ? "font-medium text-[#1d1d1f]" : "text-[#424245]"}`}>
                                  {cell || "—"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* İletişim CTA */}
        <div className="mt-20 bg-[#e30613] rounded-2xl px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-[28px] font-semibold text-white tracking-tight mb-3">
              {isEn
                ? "Need a custom quote or technical support?"
                : "Size özel teklif veya teknik destek mi gerekiyor?"}
            </h2>
            <p className="text-[15px] text-white/80 leading-relaxed">
              {isEn
                ? "Our expert team is ready to assist you with pricing, technical specifications, and project-specific solutions. Get in touch with us today."
                : "Uzman ekibimiz fiyatlandırma, teknik özellikler ve projenize özel çözümler konusunda size yardımcı olmaya hazır. Hemen bizimle iletişime geçin."}
            </p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 h-12 px-8 rounded-xl bg-white text-[#e30613] text-[15px] font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
          >
            {isEn ? "Contact Us" : "İletişime Geçin"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
