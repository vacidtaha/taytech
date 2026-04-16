"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";

interface Category {
  id: number;
  nameTr: string;
  slug: string;
}

interface SpecVariant {
  name: string;
  data: string[][];
  dataEn?: string[][];
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [nameTr, setNameTr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [descriptionTr, setDescriptionTr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState("");
  const [imageEn, setImageEn] = useState("");
  const [applicationImage, setApplicationImage] = useState("");
  const [applicationImageEn, setApplicationImageEn] = useState("");
  const [specTables, setSpecTables] = useState<SpecVariant[]>([]);
  const [newVariantName, setNewVariantName] = useState("");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

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

  const handleSpecFileUpload = (e: React.ChangeEvent<HTMLInputElement>, variantIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isCSV = file.name.toLowerCase().endsWith(".csv");
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const wb = isCSV
        ? XLSX.read(data as string, { type: "string" })
        : XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
      if (rows.length > 0) {
        const next = [...specTables];
        next[variantIdx] = { ...next[variantIdx], data: rows };
        setSpecTables(next);
      }
    };
    if (isCSV) reader.readAsText(file, "UTF-8");
    else reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleSpecEnFileUpload = (e: React.ChangeEvent<HTMLInputElement>, variantIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isCSV = file.name.toLowerCase().endsWith(".csv");
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const wb = isCSV
        ? XLSX.read(data as string, { type: "string" })
        : XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
      if (rows.length > 0) {
        const next = [...specTables];
        next[variantIdx] = { ...next[variantIdx], dataEn: rows };
        setSpecTables(next);
      }
    };
    if (isCSV) reader.readAsText(file, "UTF-8");
    else reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const addSpecVariant = () => {
    if (!newVariantName.trim()) return;
    setSpecTables([...specTables, { name: newVariantName.trim(), data: [] }]);
    setNewVariantName("");
  };

  const removeSpecVariant = (idx: number) => {
    setSpecTables(specTables.filter((_, i) => i !== idx));
  };

  const updateSpecCell = (vi: number, row: number, col: number, value: string) => {
    const next = [...specTables];
    next[vi] = { ...next[vi], data: next[vi].data.map((r, ri) => ri === row ? r.map((c, ci) => ci === col ? value : c) : [...r]) };
    setSpecTables(next);
  };

  const addSpecRow = (vi: number) => {
    const next = [...specTables];
    const cols = next[vi].data[0]?.length || 2;
    next[vi] = { ...next[vi], data: [...next[vi].data, Array(cols).fill("")] };
    setSpecTables(next);
  };

  const addSpecColumn = (vi: number) => {
    const next = [...specTables];
    next[vi] = { ...next[vi], data: next[vi].data.map(r => [...r, ""]) };
    setSpecTables(next);
  };

  const removeSpecRow = (vi: number, ri: number) => {
    const next = [...specTables];
    const newData = next[vi].data.filter((_, i) => i !== ri);
    if (newData.length < 2) { removeSpecVariant(vi); return; }
    next[vi] = { ...next[vi], data: newData };
    setSpecTables(next);
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
          descriptionTr,
          descriptionEn,
          image: image || null,
          imageEn: imageEn || null,
          applicationImage: applicationImage || null,
          applicationImageEn: applicationImageEn || null,
          specTableData: specTables.length > 0 ? JSON.stringify(specTables) : null,
          variants: [],
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

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="h-12 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
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

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-[#ff3b30]/5 border border-[#ff3b30]/10 text-[13px] text-[#ff3b30]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol: Görseller */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Ürün Görselleri</h3>
              <div className="aspect-square rounded-xl bg-[#f5f5f7] flex items-center justify-center overflow-hidden mb-3">
                {image ? (
                  <img src={image} alt="" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="text-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#acacb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-[12px] text-[#acacb0]">Ana görsel yok</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mb-4">
                <label className="flex-1 h-9 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  TR Ana Görsel
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setImage)} />
                </label>
                {image && <button type="button" onClick={() => setImage("")} className="h-9 px-3 rounded-lg border border-[#d2d2d7] text-[13px] text-[#ff3b30]">✕</button>}
              </div>

              <div className="border-t border-[#e5e5ea] pt-4">
                <p className="text-[12px] font-medium text-[#86868b] mb-2">EN Ana Görsel</p>
                <div className="flex gap-2">
                  {imageEn && <img src={imageEn} alt="" className="w-14 h-14 rounded-lg object-contain bg-[#f5f5f7] p-1" />}
                  <label className="flex-1 h-9 rounded-lg border border-dashed border-[#d2d2d7] text-[12px] text-[#86868b] hover:border-[#0071e3] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer">
                    EN Görsel Yükle
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setImageEn)} />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Uygulama Fotoğrafı</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[12px] font-medium text-[#86868b] mb-2">TR</p>
                  <div className="aspect-[16/9] rounded-lg bg-[#f5f5f7] flex items-center justify-center overflow-hidden mb-2">
                    {applicationImage ? <img src={applicationImage} alt="" className="w-full h-full object-cover" /> : <p className="text-[11px] text-[#acacb0]">Yok</p>}
                  </div>
                  <label className="w-full h-8 rounded-lg border border-[#d2d2d7] text-[12px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center justify-center cursor-pointer">
                    Yükle
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setApplicationImage)} />
                  </label>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[#86868b] mb-2">EN</p>
                  <div className="aspect-[16/9] rounded-lg bg-[#f5f5f7] flex items-center justify-center overflow-hidden mb-2">
                    {applicationImageEn ? <img src={applicationImageEn} alt="" className="w-full h-full object-cover" /> : <p className="text-[11px] text-[#acacb0]">Yok</p>}
                  </div>
                  <label className="w-full h-8 rounded-lg border border-[#d2d2d7] text-[12px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center justify-center cursor-pointer">
                    Yükle
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setApplicationImageEn)} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: Bilgiler */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Temel Bilgiler</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ürün Adı (TR)" value={nameTr} onChange={setNameTr} required />
                <Field label="Ürün Adı (EN)" value={nameEn} onChange={setNameEn} required />
                <Field label="Slug (URL)" value={slug} onChange={setSlug} placeholder="ornek-urun" required />
                <div>
                  <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">Kategori</label>
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
            </div>

            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Açıklama</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">Türkçe</label>
                  <textarea value={descriptionTr} onChange={(e) => setDescriptionTr(e.target.value)} rows={6} placeholder="Ürün açıklaması..." className="w-full px-3 py-2.5 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow resize-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">English</label>
                  <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} rows={6} placeholder="Product description..." className="w-full px-3 py-2.5 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow resize-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ürün Varyantları / Teknik Tablo */}
        <div className="mt-6 bg-white rounded-xl border border-[#e5e5ea] p-5">
          <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Ürün Varyantları / Teknik Tablolar</h3>

          {specTables.length > 0 && (
            <div className="space-y-6 mb-5">
              {specTables.map((variant, vi) => (
                <div key={vi} className="border border-[#e5e5ea] rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#f5f5f7]">
                    <input value={variant.name} onChange={(e) => { const next = [...specTables]; next[vi] = { ...next[vi], name: e.target.value }; setSpecTables(next); }} className="flex-1 bg-transparent text-[14px] font-semibold text-[#1d1d1f] outline-none" placeholder="Varyant adı" />
                    <button type="button" onClick={() => removeSpecVariant(vi)} className="text-[11px] text-[#acacb0] hover:text-[#ff3b30] transition-colors">Kaldır</button>
                  </div>

                  {variant.data.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-[13px] text-[#86868b] mb-4">Tablo verisini dosyadan yükleyin veya elle oluşturun</p>
                      <div className="flex items-center justify-center gap-3">
                        <label className="inline-flex h-9 px-5 rounded-lg bg-[#0071e3] text-white text-[13px] font-medium items-center gap-2 cursor-pointer hover:bg-[#0077ed] transition-colors">
                          Dosya Yükle (.xlsx, .csv)
                          <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e) => handleSpecFileUpload(e, vi)} />
                        </label>
                        <button type="button" onClick={() => { const next = [...specTables]; next[vi] = { ...next[vi], data: [["Parametre", "Değer"], ["", ""]] }; setSpecTables(next); }} className="h-9 px-5 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors">
                          Elle Oluştur
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto max-w-full">
                        <table className="min-w-max text-[13px] w-full">
                          <thead>
                            <tr className="bg-[#fafafa]">
                              {variant.data[0]?.map((_: string, ci: number) => (
                                <th key={ci} className="px-3 py-2.5 text-left font-semibold text-[#1d1d1f] border-b border-[#e5e5ea]">
                                  <input value={variant.data[0][ci] ?? ""} onChange={(e) => updateSpecCell(vi, 0, ci, e.target.value)} className="w-full bg-transparent outline-none font-semibold" placeholder={`Başlık ${ci + 1}`} />
                                </th>
                              ))}
                              <th className="w-10 border-b border-[#e5e5ea]" />
                            </tr>
                          </thead>
                          <tbody>
                            {variant.data.slice(1).map((row: string[], ri: number) => (
                              <tr key={ri} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]">
                                {row.map((cell: string, ci: number) => (
                                  <td key={ci} className="px-3 py-2">
                                    <input value={cell} onChange={(e) => updateSpecCell(vi, ri + 1, ci, e.target.value)} className="w-full bg-transparent outline-none text-[#424245]" placeholder="—" />
                                  </td>
                                ))}
                                <td className="px-1 py-2">
                                  <button type="button" onClick={() => removeSpecRow(vi, ri + 1)} className="w-6 h-6 rounded flex items-center justify-center text-[#acacb0] hover:text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-all text-[11px]">✕</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#f0f0f0]">
                        <button type="button" onClick={() => addSpecRow(vi)} className="h-7 px-3 rounded-md border border-dashed border-[#d2d2d7] text-[11px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors">+ Satır</button>
                        <button type="button" onClick={() => addSpecColumn(vi)} className="h-7 px-3 rounded-md border border-dashed border-[#d2d2d7] text-[11px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors">+ Sütun</button>
                        <label className="h-7 px-3 rounded-md border border-[#d2d2d7] text-[11px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center gap-1 cursor-pointer">
                          TR Dosyadan Değiştir
                          <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e) => handleSpecFileUpload(e, vi)} />
                        </label>
                        <label className={`h-7 px-3 rounded-md border text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors ${variant.dataEn && variant.dataEn.length > 0 ? "border-[#34c759] text-[#34c759] bg-[#34c759]/5" : "border-[#d2d2d7] text-[#86868b] hover:border-[#acacb0]"}`}>
                          {variant.dataEn && variant.dataEn.length > 0 ? "EN Tablo ✓ (Değiştir)" : "EN Tablo Yükle"}
                          <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e) => handleSpecEnFileUpload(e, vi)} />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="border-2 border-dashed border-[#d2d2d7] rounded-xl p-5">
            <p className="text-[12px] font-medium text-[#86868b] mb-3">Yeni Varyant / Tablo Ekle</p>
            <div className="flex gap-2">
              <input value={newVariantName} onChange={(e) => setNewVariantName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecVariant())} placeholder="Varyant adı (ör: Sipariş Tablosu)" className="flex-1 h-9 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[13px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow" />
              <button type="button" onClick={addSpecVariant} disabled={!newVariantName.trim()} className="h-9 px-5 rounded-lg bg-[#0071e3] text-white text-[13px] font-medium hover:bg-[#0077ed] transition-colors disabled:opacity-40">Ekle</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full h-10 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow" />
    </div>
  );
}
