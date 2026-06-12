"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  slug: string;
  nameTr: string;
  nameEn: string;
  parentId: number | null;
  sortOrder: number;
  _count: { products: number; children: number };
}

interface Product {
  id: number;
  slug: string;
  nameTr: string;
  nameEn: string;
  image: string | null;
  isActive: boolean;
  categoryId: number;
  _count: { variants: number };
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/api/admin/categories/tree")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data.categories);
        setProducts(data.products);
        const allIds = new Set<number>(data.categories.map((c: Category) => c.id));
        setExpanded(allIds);
      })
      .finally(() => setLoading(false));
  }, []);

  const rootCategories = useMemo(
    () => categories.filter((c) => c.parentId === null).sort((a, b) => a.sortOrder - b.sortOrder),
    [categories]
  );

  const childrenOf = useCallback(
    (parentId: number) => categories.filter((c) => c.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder),
    [categories]
  );

  const productsOf = useCallback(
    (catId: number) => products.filter((p) => p.categoryId === catId),
    [products]
  );

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const collapseAll = () => setExpanded(new Set());
  const expandAll = () => setExpanded(new Set(categories.map((c) => c.id)));

  const countAll = useCallback(
    (catId: number): number => {
      const walk = (id: number): number => {
        const direct = products.filter((p) => p.categoryId === id).length;
        const subs = categories.filter((c) => c.parentId === id);
        return direct + subs.reduce((s, sc) => s + walk(sc.id), 0);
      };
      return walk(catId);
    },
    [categories, products]
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="h-12 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">
              Dashboard
            </Link>
            <span className="text-[#d2d2d7]">/</span>
            <span className="text-[13px] font-semibold text-[#1d1d1f]">Ürünler</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={expandAll} className="h-7 px-3 rounded-md text-[12px] text-[#86868b] hover:text-[#1d1d1f] hover:bg-white border border-[#e5e5ea] transition-all">
              Tümünü Aç
            </button>
            <button onClick={collapseAll} className="h-7 px-3 rounded-md text-[12px] text-[#86868b] hover:text-[#1d1d1f] hover:bg-white border border-[#e5e5ea] transition-all">
              Tümünü Kapat
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-1">Ürün Yönetimi</h1>
          <p className="text-[14px] text-[#86868b]">{products.length} ürün · {categories.length} kategori</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#86868b] text-sm">Yükleniyor...</div>
        ) : (
          <div className="bg-white rounded-xl border border-[#e5e5ea] overflow-hidden">
            {rootCategories.map((root) => (
              <TreeCategory
                key={root.id}
                category={root}
                depth={0}
                expanded={expanded}
                toggle={toggle}
                childrenOf={childrenOf}
                productsOf={productsOf}
                countAll={countAll}
                onProductClick={(id) => router.push(`/admin/urunler/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TreeCategory({
  category,
  depth,
  expanded,
  toggle,
  childrenOf,
  productsOf,
  countAll,
  onProductClick,
}: {
  category: Category;
  depth: number;
  expanded: Set<number>;
  toggle: (id: number) => void;
  childrenOf: (id: number) => Category[];
  productsOf: (id: number) => Product[];
  countAll: (id: number) => number;
  onProductClick: (id: number) => void;
}) {
  const children = childrenOf(category.id);
  const prods = productsOf(category.id);
  const isOpen = expanded.has(category.id);
  const hasContent = children.length > 0 || prods.length > 0;
  const total = countAll(category.id);
  const pl = 16 + depth * 24;

  return (
    <div className={depth === 0 ? "border-b border-[#f0f0f0] last:border-0" : ""}>
      <button
        onClick={() => hasContent && toggle(category.id)}
        className="flex items-center gap-2.5 w-full text-left hover:bg-[#fafafa] transition-colors group"
        style={{ paddingLeft: pl, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}
      >
        {/* Chevron */}
        <span className={`shrink-0 w-4 h-4 flex items-center justify-center transition-transform duration-150 ${isOpen ? "rotate-90" : ""}`}>
          {hasContent ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={depth === 0 ? "#1d1d1f" : "#86868b"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          ) : (
            <span className="w-1 h-1 rounded-full bg-[#d2d2d7]" />
          )}
        </span>

        {/* Folder icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 ${isOpen ? "stroke-[#e30613]" : "stroke-[#86868b] group-hover:stroke-[#e30613]"} transition-colors`}
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>

        {/* Label */}
        <span className={`flex-1 text-[13px] truncate ${depth === 0 ? "font-semibold text-[#1d1d1f]" : "font-medium text-[#424245]"}`}>
          {category.nameTr}
        </span>

        {/* Count badge */}
        {total > 0 && (
          <span className="shrink-0 text-[11px] text-[#acacb0] tabular-nums">
            {total}
          </span>
        )}
      </button>

      {/* Children */}
      {isOpen && hasContent && (
        <div>
          {children.map((child) => (
            <TreeCategory
              key={child.id}
              category={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
              childrenOf={childrenOf}
              productsOf={productsOf}
              countAll={countAll}
              onProductClick={onProductClick}
            />
          ))}
          {prods.map((p) => (
            <TreeProduct key={p.id} product={p} depth={depth + 1} onClick={() => onProductClick(p.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeProduct({ product, depth, onClick }: { product: Product; depth: number; onClick: () => void }) {
  const pl = 16 + depth * 24;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full text-left hover:bg-[#fafafa] transition-colors group"
      style={{ paddingLeft: pl, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}
    >
      <span className="shrink-0 w-4 h-4" />

      {product.image ? (
        <img src={product.image} alt="" className="w-5 h-5 rounded object-cover bg-[#f5f5f7] shrink-0" />
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#acacb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:stroke-[#e30613] transition-colors">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      )}

      <span className="flex-1 text-[13px] text-[#424245] group-hover:text-[#e30613] transition-colors truncate">
        {product.nameTr}
      </span>

      <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] ${product.isActive ? "text-[#34c759]" : "text-[#acacb0]"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? "bg-[#34c759]" : "bg-[#acacb0]"}`} />
      </span>

      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d2d2d7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:stroke-[#e30613] transition-colors">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
