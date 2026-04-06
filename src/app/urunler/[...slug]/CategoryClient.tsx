"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Category {
  id: number;
  slug: string;
  nameTr: string;
  nameEn: string;
  parent: { slug: string; nameTr: string; nameEn: string } | null;
  children: {
    id: number;
    slug: string;
    nameTr: string;
    nameEn: string;
    children: { id: number; slug: string; nameTr: string; nameEn: string }[];
  }[];
  products: {
    id: number;
    slug: string;
    nameTr: string;
    nameEn: string;
    image: string | null;
    imageEn: string | null;
    descriptionTr: string | null;
  }[];
}

export function CategoryClient({ category, slug }: { category: Category; slug: string[] }) {
  const { locale } = useLanguage();
  const isEn = locale === "EN";
  const n = (tr: string, en: string) => (isEn ? en : tr);

  const breadcrumbs = slug.map((s, i) => ({
    label: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: `/urunler/${slug.slice(0, i + 1).join("/")}`,
  }));

  const hasChildren = category.children.length > 0;
  const hasProducts = category.products.length > 0;

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <nav className="flex items-center gap-2 text-[13px] text-[#86868b] mb-10 flex-wrap">
          <Link href="/urunler" className="hover:text-[#1d1d1f] transition-colors">
            {isEn ? "Products" : "Ürünler"}
          </Link>
          {breadcrumbs.map((bc, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[#d2d2d7]">/</span>
              {i === breadcrumbs.length - 1 ? (
                <span className="text-[#1d1d1f] font-medium">{n(category.nameTr, category.nameEn)}</span>
              ) : (
                <Link href={bc.href} className="hover:text-[#1d1d1f] transition-colors">{bc.label}</Link>
              )}
            </span>
          ))}
        </nav>

        <div className="text-center mb-14">
          <h1 className="text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            {n(category.nameTr, category.nameEn)}
          </h1>
          <p className="text-[17px] text-[#86868b]">
            {n(category.nameEn, category.nameTr)}
          </p>
        </div>

        {hasChildren && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {category.children.map((child) => (
              <Link
                key={child.id}
                href={`/urunler/${slug.join("/")}/${child.slug}`}
                className="group relative bg-white rounded-xl aspect-square flex flex-col items-center justify-center p-5 text-center shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-4 group-hover:bg-[#fef2f2] transition-colors duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b] group-hover:text-[#e30613] transition-colors duration-200">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h3 className="text-[14px] font-semibold text-[#1d1d1f] mb-1 group-hover:text-[#e30613] transition-colors duration-200">
                  {n(child.nameTr, child.nameEn)}
                </h3>
                {child.children.length > 0 && (
                  <p className="text-[11px] text-[#acacb0] leading-relaxed">
                    {child.children.map((gc) => n(gc.nameTr, gc.nameEn)).join(" · ")}
                  </p>
                )}
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#e30613] transition-all duration-200">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b] group-hover:text-white transition-colors duration-200">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasProducts && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {category.products.map((product) => {
              const hasContent = !!(product.image || product.descriptionTr);
              if (!hasContent) {
                return (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-xl aspect-square flex flex-col items-center justify-center p-5 text-center shadow-sm cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b]">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#1d1d1f] mb-0.5">
                      {n(product.nameTr, product.nameEn)}
                    </h3>
                    <p className="text-[11px] text-[#86868b]">
                      {n(product.nameEn, product.nameTr)}
                    </p>
                  </div>
                );
              }
              return (
                <Link
                  key={product.id}
                  href={`/urunler/${slug.join("/")}/${product.slug}`}
                  className="group relative bg-white rounded-xl aspect-square flex flex-col items-center justify-center p-5 text-center shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {product.image ? (
                    <img src={(isEn && product.imageEn) ? product.imageEn : product.image} alt={n(product.nameTr, product.nameEn)} className="w-20 h-20 object-contain mb-4" />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-4 group-hover:bg-[#fef2f2] transition-colors duration-200">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b] group-hover:text-[#e30613] transition-colors duration-200">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                  <h3 className="text-[14px] font-semibold text-[#1d1d1f] mb-0.5 group-hover:text-[#e30613] transition-colors duration-200">
                    {n(product.nameTr, product.nameEn)}
                  </h3>
                  <p className="text-[11px] text-[#86868b]">
                    {n(product.nameEn, product.nameTr)}
                  </p>
                  <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#e30613] transition-all duration-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b] group-hover:text-white transition-colors duration-200">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!hasChildren && !hasProducts && (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#acacb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1">
              {isEn ? "Content is being prepared" : "İçerik hazırlanıyor"}
            </h3>
            <p className="text-[14px] text-[#86868b] max-w-sm mx-auto">
              {isEn ? "Products for this section will be added soon via the admin panel." : "Bu bölüme ait içerikler yakında admin panelden eklenecektir."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
