"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Category {
  id: number;
  slug: string;
  nameTr: string;
  nameEn: string;
  children: { id: number; slug: string; nameTr: string; nameEn: string }[];
}

export function ProductsLanding({ categories }: { categories: Category[] }) {
  const { locale } = useLanguage();
  const isEn = locale === "EN";
  const n = (tr: string, en: string) => (isEn ? en : tr);

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            {isEn ? "Products" : "Ürünler"}
          </h1>
          <p className="text-[17px] text-[#86868b] max-w-xl mx-auto">
            {isEn
              ? "Discover the Taytech product family. All product groups from industrial solutions to smart control systems."
              : "Taytech ürün ailesini keşfedin. Endüstriyel çözümlerden akıllı kontrol sistemlerine kadar tüm ürün gruplarımız."}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/urunler/${cat.slug}`}
              className="group relative bg-white rounded-xl aspect-square flex flex-col items-center justify-center p-5 text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-4 group-hover:bg-[#fef2f2] transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b] group-hover:text-[#e30613] transition-colors duration-200">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h2 className="text-[14px] font-semibold text-[#1d1d1f] mb-1 group-hover:text-[#e30613] transition-colors duration-200">
                {n(cat.nameTr, cat.nameEn)}
              </h2>
              <p className="text-[11px] text-[#86868b]">
                {n(cat.nameEn, cat.nameTr)}
              </p>
              {cat.children.length > 0 && (
                <p className="text-[11px] text-[#acacb0] leading-relaxed max-w-[260px]">
                  {cat.children.map((child) => n(child.nameTr, child.nameEn)).join(" · ")}
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
      </div>
    </div>
  );
}
