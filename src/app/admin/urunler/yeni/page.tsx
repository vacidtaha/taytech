"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Category {
  id: number;
  nameTr: string;
  slug: string;
}

interface VariantForm {
  slug: string;
  label: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  image: string;
  featuresTr: string[];
  featuresEn: string[];
  techSpecsTr: string[];
  techSpecsEn: string[];
}

const emptyVariant: VariantForm = {
  slug: "",
  label: "",
  titleTr: "",
  titleEn: "",
  descriptionTr: "",
  descriptionEn: "",
  image: "",
  featuresTr: [],
  featuresEn: [],
  techSpecsTr: [],
  techSpecsEn: [],
};

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [nameTr, setNameTr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [variants, setVariants] = useState<VariantForm[]>([{ ...emptyVariant }]);
  const [activeVariant, setActiveVariant] = useState(0);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  const updateVariant = (index: number, field: keyof VariantForm, value: unknown) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { ...emptyVariant }]);
    setActiveVariant(variants.length);
  };

  const removeVariant = (index: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
    setActiveVariant(Math.max(0, activeVariant - 1));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setter(data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameTr,
          nameEn,
          slug,
          categoryId: Number(categoryId),
          image: image || null,
          variants: variants.map((v) => ({
            ...v,
            image: v.image || null,
          })),
        }),
      });

      if (res.ok) {
        router.push("/admin/urunler");
      } else {
        const data = await res.json();
        setError(data.error || "Kaydedilemedi");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  };

  const v = variants[activeVariant];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="h-12 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/urunler" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">
              ← Ürünler
            </Link>
            <span className="text-[#d2d2d7]">/</span>
            <span className="text-[13px] font-semibold text-[#1d1d1f]">Yeni Ürün</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="h-8 px-5 rounded-lg bg-[#0071e3] text-white text-[13px] font-medium hover:bg-[#0077ed] transition-colors disabled:opacity-50"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </nav>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-[#ff3b30]/5 border border-[#ff3b30]/10 text-[13px] text-[#ff3b30]">
            {error}
          </div>
        )}

        {/* Ürün Bilgileri */}
        <section className="bg-white rounded-xl border border-[#e5e5ea] p-6 mb-5">
          <h2 className="text-[15px] font-semibold text-[#1d1d1f] mb-5">Ürün Bilgileri</h2>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Ürün Adı (TR)" value={nameTr} onChange={setNameTr} required />
            <InputField label="Ürün Adı (EN)" value={nameEn} onChange={setNameEn} required />
            <InputField label="Slug (URL)" value={slug} onChange={setSlug} placeholder="ornek-urun" required />
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">Kategori</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow"
              >
                <option value="">Seçin</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nameTr}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">Ürün Görseli</label>
            <div className="flex items-center gap-3">
              {image && <img src={image} alt="" className="w-14 h-14 rounded-lg object-cover bg-[#f5f5f7]" />}
              <label className="h-9 px-4 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center gap-2 cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                Yükle
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setImage)} />
              </label>
            </div>
          </div>
        </section>

        {/* Varyantlar */}
        <section className="bg-white rounded-xl border border-[#e5e5ea] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-semibold text-[#1d1d1f]">Varyantlar</h2>
            <button
              type="button"
              onClick={addVariant}
              className="text-[13px] text-[#0071e3] font-medium hover:underline"
            >
              + Varyant Ekle
            </button>
          </div>

          {/* Variant Tabs */}
          <div className="flex gap-1 mb-6 border-b border-[#e5e5ea] -mx-6 px-6">
            {variants.map((vr, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveVariant(i)}
                className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
                  i === activeVariant
                    ? "border-[#0071e3] text-[#0071e3]"
                    : "border-transparent text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                {vr.label || `Varyant ${i + 1}`}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Slug" value={v.slug} onChange={(val) => updateVariant(activeVariant, "slug", val)} placeholder="varyant-slug" required />
              <InputField label="Etiket" value={v.label} onChange={(val) => updateVariant(activeVariant, "label", val)} placeholder="Gösterilecek ad" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Başlık (TR)" value={v.titleTr} onChange={(val) => updateVariant(activeVariant, "titleTr", val)} required />
              <InputField label="Başlık (EN)" value={v.titleEn} onChange={(val) => updateVariant(activeVariant, "titleEn", val)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextAreaField label="Açıklama (TR)" value={v.descriptionTr} onChange={(val) => updateVariant(activeVariant, "descriptionTr", val)} />
              <TextAreaField label="Açıklama (EN)" value={v.descriptionEn} onChange={(val) => updateVariant(activeVariant, "descriptionEn", val)} />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">Varyant Görseli</label>
              <div className="flex items-center gap-3">
                {v.image && <img src={v.image} alt="" className="w-14 h-14 rounded-lg object-cover bg-[#f5f5f7]" />}
                <label className="h-9 px-4 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center gap-2 cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  Yükle
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => updateVariant(activeVariant, "image", url))} />
                </label>
              </div>
            </div>

            <ListField
              label="Özellikler (TR)"
              items={v.featuresTr}
              onChange={(items) => updateVariant(activeVariant, "featuresTr", items)}
            />
            <ListField
              label="Özellikler (EN)"
              items={v.featuresEn}
              onChange={(items) => updateVariant(activeVariant, "featuresEn", items)}
            />
            <ListField
              label="Teknik Özellikler (TR)"
              items={v.techSpecsTr}
              onChange={(items) => updateVariant(activeVariant, "techSpecsTr", items)}
            />
            <ListField
              label="Teknik Özellikler (EN)"
              items={v.techSpecsEn}
              onChange={(items) => updateVariant(activeVariant, "techSpecsEn", items)}
            />

            {variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(activeVariant)}
                className="text-[13px] text-[#ff3b30] hover:underline mt-2"
              >
                Bu varyantı sil
              </button>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}

function InputField({
  label, value, onChange, placeholder, required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full h-10 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow"
      />
    </div>
  );
}

function TextAreaField({
  label, value, onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2.5 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow resize-none"
      />
    </div>
  );
}

function ListField({
  label, items, onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    onChange([...items, input.trim()]);
    setInput("");
  };

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Ekle ve Enter'a bas"
          className="flex-1 h-9 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[13px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow"
        />
        <button
          type="button"
          onClick={add}
          className="h-9 px-3 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-[#acacb0] transition-colors"
        >
          Ekle
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f5f5f7] text-[12px] text-[#1d1d1f]"
            >
              {item}
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="text-[#acacb0] hover:text-[#ff3b30] transition-colors ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
