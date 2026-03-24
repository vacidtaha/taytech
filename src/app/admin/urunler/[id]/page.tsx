"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";

interface ProductDoc {
  id: number;
  nameTr: string;
  nameEn: string;
  url: string;
  urlEn: string | null;
  type: string;
}

interface ProductImage {
  id: number;
  url: string;
  sortOrder: number;
}

interface Product {
  id: number;
  slug: string;
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  categoryId: number;
  isActive: boolean;
  image: string | null;
  applicationImage: string | null;
  specTableData: string | null;
  images: ProductImage[];
  category: { id: number; nameTr: string; nameEn: string };
  documents: ProductDoc[];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  interface DocSlot { nameTr: string; nameEn: string; url: string; urlEn: string; type: string; uploading: boolean; uploadingEn: boolean }
  const emptySlot: DocSlot = { nameTr: "", nameEn: "", url: "", urlEn: "", type: "", uploading: false, uploadingEn: false };
  const [docSlots, setDocSlots] = useState<DocSlot[]>([{ ...emptySlot }]);

  useEffect(() => {
    fetch(`/api/admin/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => { setProduct(data); setLoading(false); });
  }, [params.id]);

  const update = useCallback((field: string, value: unknown) => {
    setProduct((prev) => prev ? { ...prev, [field]: value } : null);
    setSaved(false);
  }, []);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUpload: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) onUpload(data.url);
  };

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameTr: product.nameTr,
        nameEn: product.nameEn,
        descriptionTr: product.descriptionTr,
        descriptionEn: product.descriptionEn,
        slug: product.slug,
        categoryId: product.categoryId,
        isActive: product.isActive,
        image: product.image,
        applicationImage: product.applicationImage,
        specTableData: product.specTableData,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/urunler");
    }, 600);
  };

  const updateSlot = (idx: number, field: keyof DocSlot, value: string | boolean) => {
    setDocSlots((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const handleSlotFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file || !product) return;
    updateSlot(idx, "uploading", true);
    const fd = new FormData();
    fd.append("file", file);
    const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();
    if (!uploadData.url) { updateSlot(idx, "uploading", false); return; }

    const slot = docSlots[idx];
    const fileName = file.name.replace(/\.[^.]+$/, "");
    const nameTr = slot.nameTr || fileName;
    const nameEn = slot.nameEn || fileName;

    const docRes = await fetch(`/api/admin/products/${product.id}/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameTr, nameEn, url: uploadData.url, urlEn: slot.urlEn || null, type: slot.type }),
    });
    const newDoc = await docRes.json();
    setProduct((prev) => prev ? { ...prev, documents: [...prev.documents, newDoc] } : null);
    setDocSlots((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length === 0 ? [{ ...emptySlot }] : next;
    });
  };

  const handleSlotEnFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateSlot(idx, "uploadingEn", true);
    const fd = new FormData();
    fd.append("file", file);
    const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();
    updateSlot(idx, "uploadingEn", false);
    if (uploadData.url) updateSlot(idx, "urlEn", uploadData.url);
  };

  const handleExistingDocEnUpload = async (e: React.ChangeEvent<HTMLInputElement>, docId: number) => {
    const file = e.target.files?.[0];
    if (!file || !product) return;
    const fd = new FormData();
    fd.append("file", file);
    const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();
    if (!uploadData.url) return;
    await fetch(`/api/admin/products/${product.id}/documents`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docId, urlEn: uploadData.url }),
    });
    setProduct((prev) => prev ? {
      ...prev,
      documents: prev.documents.map((d) => d.id === docId ? { ...d, urlEn: uploadData.url } : d),
    } : null);
  };

  const handleSaveAllDocs = async () => {
    if (!product) return;
    for (const slot of docSlots) {
      if (!slot.nameTr || !slot.url) continue;
      const res = await fetch(`/api/admin/products/${product.id}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameTr: slot.nameTr, nameEn: slot.nameEn, url: slot.url, type: slot.type }),
      });
      const doc = await res.json();
      setProduct((prev) => prev ? { ...prev, documents: [...prev.documents, doc] } : null);
    }
    setDocSlots([{ ...emptySlot }]);
  };

  const handleDeleteDoc = async (docId: number) => {
    if (!product) return;
    await fetch(`/api/admin/products/${product.id}/documents?docId=${docId}`, { method: "DELETE" });
    setProduct((prev) => prev ? { ...prev, documents: prev.documents.filter((d) => d.id !== docId) } : null);
  };

  // Spec tables (multiple variants)
  interface SpecVariant { name: string; data: string[][]; dataEn?: string[][] }
  const [newVariantName, setNewVariantName] = useState("");

  const parseSpecTables = (): SpecVariant[] => {
    if (!product?.specTableData) return [];
    try {
      const parsed = JSON.parse(product.specTableData);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0]) && typeof parsed[0][0] === "string") {
        return [{ name: "Teknik Veriler", data: parsed }];
      }
      return parsed as SpecVariant[];
    } catch { return []; }
  };
  const specTables = parseSpecTables();

  const saveSpecTables = (tables: SpecVariant[]) => {
    update("specTableData", tables.length > 0 ? JSON.stringify(tables) : null);
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
        saveSpecTables(next);
      }
    };
    if (isCSV) reader.readAsText(file, "UTF-8");
    else reader.readAsArrayBuffer(file);
    e.target.value = "";
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
        saveSpecTables(next);
      }
    };
    if (isCSV) reader.readAsText(file, "UTF-8");
    else reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const addSpecVariant = () => {
    if (!newVariantName.trim()) return;
    saveSpecTables([...specTables, { name: newVariantName.trim(), data: [] }]);
    setNewVariantName("");
  };

  const removeSpecVariant = (idx: number) => {
    saveSpecTables(specTables.filter((_, i) => i !== idx));
  };

  const renameSpecVariant = (idx: number, name: string) => {
    const next = [...specTables];
    next[idx] = { ...next[idx], name };
    saveSpecTables(next);
  };

  const updateSpecCell = (vi: number, row: number, col: number, value: string) => {
    const next = [...specTables];
    next[vi] = { ...next[vi], data: next[vi].data.map((r, ri) => ri === row ? r.map((c, ci) => ci === col ? value : c) : [...r]) };
    saveSpecTables(next);
  };

  const addSpecRow = (vi: number) => {
    const next = [...specTables];
    const cols = next[vi].data[0]?.length || 2;
    next[vi] = { ...next[vi], data: [...next[vi].data, Array(cols).fill("")] };
    saveSpecTables(next);
  };

  const addSpecColumn = (vi: number) => {
    const next = [...specTables];
    next[vi] = { ...next[vi], data: next[vi].data.map(r => [...r, ""]) };
    saveSpecTables(next);
  };

  const removeSpecRow = (vi: number, ri: number) => {
    const next = [...specTables];
    const newData = next[vi].data.filter((_, i) => i !== ri);
    if (newData.length < 2) { removeSpecVariant(vi); return; }
    next[vi] = { ...next[vi], data: newData };
    saveSpecTables(next);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#e5e5ea] border-t-[#0071e3] rounded-full animate-spin mx-auto mb-3" />
          <span className="text-[14px] text-[#86868b]">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[15px] font-medium text-[#1d1d1f] mb-2">Ürün bulunamadı</p>
          <Link href="/admin/urunler" className="text-[13px] text-[#0071e3] hover:underline">
            Ürünlere dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="h-12 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/urunler" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">
              ← Ürünler
            </Link>
            <span className="text-[#d2d2d7]">/</span>
            <span className="text-[13px] text-[#86868b]">{product.category.nameTr}</span>
            <span className="text-[#d2d2d7]">/</span>
            <span className="text-[13px] font-semibold text-[#1d1d1f]">{product.nameTr}</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`h-8 px-5 rounded-lg text-[13px] font-medium transition-all disabled:opacity-50 ${
              saved
                ? "bg-[#34c759] text-white"
                : "bg-[#0071e3] text-white hover:bg-[#0077ed]"
            }`}
          >
            {saving ? "Kaydediliyor..." : saved ? "Kaydedildi" : "Kaydet"}
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Ürün Görselleri</h3>

              {/* Ana görsel */}
              <div className="aspect-square rounded-xl bg-[#f5f5f7] flex items-center justify-center overflow-hidden mb-3">
                {product.image ? (
                  <img src={product.image} alt="" className="w-full h-full object-contain p-4" />
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Ana Görsel
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => update("image", url))} />
                </label>
                {product.image && (
                  <button onClick={() => update("image", null)} className="h-9 px-3 rounded-lg border border-[#d2d2d7] text-[13px] text-[#ff3b30] hover:border-[#ff3b30] transition-colors">
                    Kaldır
                  </button>
                )}
              </div>

              {/* Ek görseller */}
              <div className="border-t border-[#e5e5ea] pt-4">
                <p className="text-[12px] font-medium text-[#86868b] mb-3">Ek Görseller ({product.images?.length || 0}/5)</p>
                {product.images && product.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {product.images.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-lg bg-[#f5f5f7] overflow-hidden">
                        <img src={img.url} alt="" className="w-full h-full object-contain p-2" />
                        <button
                          onClick={async () => {
                            await fetch(`/api/admin/products/${product.id}/images`, {
                              method: "DELETE",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ imageId: img.id }),
                            });
                            setProduct((prev) => prev ? { ...prev, images: prev.images.filter((i) => i.id !== img.id) } : prev);
                          }}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#ff3b30] text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {(!product.images || product.images.length < 5) && (
                  <label className="w-full h-9 rounded-lg border border-dashed border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-[#0071e3] hover:text-[#0071e3] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Görsel Ekle
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append("file", file);
                      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
                      const uploadData = await uploadRes.json();
                      if (uploadData.url) {
                        const imgRes = await fetch(`/api/admin/products/${product.id}/images`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ url: uploadData.url }),
                        });
                        const newImg = await imgRes.json();
                        setProduct((prev) => prev ? { ...prev, images: [...(prev.images || []), newImg] } : prev);
                      }
                    }} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Temel Bilgiler */}
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Temel Bilgiler</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ürün Adı (TR)" value={product.nameTr} onChange={(v) => update("nameTr", v)} />
                <Field label="Ürün Adı (EN)" value={product.nameEn} onChange={(v) => update("nameEn", v)} />
                <Field label="Slug (URL)" value={product.slug} onChange={(v) => update("slug", v)} />
                <div>
                  <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">Kategori</label>
                  <div className="h-10 px-3 rounded-lg bg-[#f5f5f7] border border-[#e5e5ea] flex items-center text-[14px] text-[#86868b]">
                    {product.category.nameTr}
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Açıklama</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">Türkçe</label>
                  <textarea
                    value={product.descriptionTr}
                    onChange={(e) => update("descriptionTr", e.target.value)}
                    rows={5}
                    placeholder="Ürün hakkında Türkçe açıklama yazın..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">English</label>
                  <textarea
                    value={product.descriptionEn}
                    onChange={(e) => update("descriptionEn", e.target.value)}
                    rows={5}
                    placeholder="Write product description in English..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Teknik Dökümanlar */}
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-semibold text-[#1d1d1f]">Teknik Dökümanlar</h3>
                <span className="text-[12px] text-[#86868b]">{product.documents.length} / 3</span>
              </div>

              {product.documents.length > 0 && (
                <div className="space-y-2 mb-5">
                  {product.documents.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg bg-[#f5f5f7] group">
                      <div className="flex items-center gap-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.5" className="shrink-0">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#1d1d1f] truncate">{doc.nameTr}</p>
                          <p className="text-[11px] text-[#acacb0]">{doc.nameEn} · {doc.type}</p>
                        </div>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-[12px] text-[#0071e3] hover:underline shrink-0">TR</a>
                        {doc.urlEn && <a href={doc.urlEn} target="_blank" rel="noreferrer" className="text-[12px] text-[#0071e3] hover:underline shrink-0">EN</a>}
                        <button onClick={() => handleDeleteDoc(doc.id)} className="text-[12px] text-[#acacb0] hover:text-[#ff3b30] transition-colors shrink-0">Sil</button>
                      </div>
                      {!doc.urlEn && (
                        <label className="mt-2 flex h-7 rounded-md border border-dashed border-[#d2d2d7] text-[11px] text-[#86868b] items-center justify-center gap-1 cursor-pointer hover:border-[#0071e3] hover:text-[#0071e3] transition-colors">
                          + EN dosyası ekle
                          <input type="file" className="hidden" onChange={(e) => handleExistingDocEnUpload(e, doc.id)} />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {(() => {
                const remaining = 3 - product.documents.length;
                if (remaining <= 0) return (
                  <div className="text-center py-4 rounded-lg bg-[#f5f5f7] text-[13px] text-[#acacb0]">
                    Maksimum doküman sayısına ulaşıldı (3/3)
                  </div>
                );

                const maxSlots = remaining;
                const visibleSlots = docSlots.slice(0, maxSlots);

                return (
                  <div className="space-y-3">
                    {visibleSlots.map((slot, idx) => (
                      <div key={idx} className="border border-dashed border-[#d2d2d7] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[12px] font-medium text-[#86868b]">
                            {product.documents.length + idx + 1}. Doküman
                          </p>
                          {idx > 0 && (
                            <button
                              onClick={() => setDocSlots((prev) => prev.filter((_, i) => i !== idx))}
                              className="text-[11px] text-[#acacb0] hover:text-[#ff3b30] transition-colors"
                            >
                              Kaldır
                            </button>
                          )}
                        </div>
                        {/* Tür seçimi - 4 buton */}
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {([
                            { key: "teknik", tr: "Katalog", en: "Catalog" },
                            { key: "kilavuz", tr: "Kullanım Kılavuzu", en: "User Manual" },
                            { key: "sertifika", tr: "Sertifika", en: "Certificate" },
                            { key: "cad", tr: "CAD Çizimi", en: "CAD Drawing" },
                          ] as const).map((opt) => (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => {
                                setDocSlots((prev) => {
                                  const current = prev[idx];
                                  const prevType = ([
                                    { key: "teknik", tr: "Katalog", en: "Catalog" },
                                    { key: "kilavuz", tr: "Kullanım Kılavuzu", en: "User Manual" },
                                    { key: "sertifika", tr: "Sertifika", en: "Certificate" },
                                    { key: "cad", tr: "CAD Çizimi", en: "CAD Drawing" },
                                  ] as const).find((o) => o.key === current.type);
                                  const wasAuto = !current.nameTr || current.nameTr === prevType?.tr;
                                  const wasAutoEn = !current.nameEn || current.nameEn === prevType?.en;
                                  return prev.map((s, i) => i === idx ? {
                                    ...s,
                                    type: opt.key,
                                    nameTr: wasAuto ? opt.tr : s.nameTr,
                                    nameEn: wasAutoEn ? opt.en : s.nameEn,
                                  } : s);
                                });
                              }}
                              className={`h-9 rounded-lg text-[12px] font-medium transition-all ${
                                slot.type === opt.key
                                  ? "bg-[#0071e3] text-white"
                                  : "bg-[#f5f5f7] text-[#86868b] hover:bg-[#e8e8ed]"
                              }`}
                            >
                              {opt.tr}
                            </button>
                          ))}
                        </div>
                        {slot.type && (
                          <>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <Field label="Doküman Adı (TR)" value={slot.nameTr} onChange={(v) => updateSlot(idx, "nameTr", v)} placeholder="Teknik Katalog" />
                              <Field label="Doküman Adı (EN)" value={slot.nameEn} onChange={(v) => updateSlot(idx, "nameEn", v)} placeholder="Technical Catalog" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">TR Dosyası</label>
                                <label className={`flex h-10 rounded-lg border text-[13px] items-center justify-center gap-2 cursor-pointer transition-colors ${slot.uploading ? "border-[#0071e3] text-[#0071e3] bg-[#0071e3]/5" : "border-[#d2d2d7] text-[#86868b] hover:border-[#acacb0]"}`}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                  </svg>
                                  {slot.uploading ? "Kaydediliyor..." : "TR Dosya Seç"}
                                  <input type="file" className="hidden" onChange={(e) => handleSlotFileUpload(e, idx)} />
                                </label>
                              </div>
                              <div>
                                <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">EN Dosyası <span className="text-[#acacb0]">(opsiyonel)</span></label>
                                <label className={`flex h-10 rounded-lg border text-[13px] items-center justify-center gap-2 cursor-pointer transition-colors ${slot.uploadingEn ? "border-[#0071e3] text-[#0071e3] bg-[#0071e3]/5" : slot.urlEn ? "border-[#34c759] text-[#34c759] bg-[#34c759]/5" : "border-[#d2d2d7] text-[#86868b] hover:border-[#acacb0]"}`}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                  </svg>
                                  {slot.uploadingEn ? "Yükleniyor..." : slot.urlEn ? "EN Yüklendi ✓" : "EN Dosya Seç"}
                                  <input type="file" className="hidden" onChange={(e) => handleSlotEnFileUpload(e, idx)} />
                                </label>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {visibleSlots.length < maxSlots && (
                      <button
                        onClick={() => setDocSlots((prev) => [...prev, { ...emptySlot }])}
                        className="w-full h-10 rounded-xl border border-dashed border-[#d2d2d7] text-[13px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors"
                      >
                        + {product.documents.length + visibleSlots.length + 1}. Dokümanı Ekle
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Uygulama Fotoğrafı */}
            <div className="bg-white rounded-xl border border-[#e5e5ea] p-5">
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Uygulama Fotoğrafı</h3>
              <div className="aspect-[16/9] rounded-xl bg-[#f5f5f7] flex items-center justify-center overflow-hidden mb-3">
                {product.applicationImage ? (
                  <img src={product.applicationImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#acacb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-[12px] text-[#acacb0]">Uygulama görseli yok</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <label className="flex-1 h-9 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-[#acacb0] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Yükle
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => update("applicationImage", url))} />
                </label>
                {product.applicationImage && (
                  <button onClick={() => update("applicationImage", null)} className="h-9 px-3 rounded-lg border border-[#d2d2d7] text-[13px] text-[#ff3b30] hover:border-[#ff3b30] transition-colors">
                    Kaldır
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ürün Varyantları (Teknik Veri Tabloları) */}
        <div className="mt-6 bg-white rounded-xl border border-[#e5e5ea] p-5">
          <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-4">Ürün Varyantları</h3>

          {specTables.length > 0 && (
            <div className="space-y-6 mb-5">
              {specTables.map((variant, vi) => (
                <div key={vi} className="border border-[#e5e5ea] rounded-xl overflow-hidden">
                  {/* Varyant başlık */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#f5f5f7]">
                    <input
                      value={variant.name}
                      onChange={(e) => renameSpecVariant(vi, e.target.value)}
                      className="flex-1 bg-transparent text-[14px] font-semibold text-[#1d1d1f] outline-none"
                      placeholder="Varyant adı"
                    />
                    <button
                      onClick={() => removeSpecVariant(vi)}
                      className="text-[11px] text-[#acacb0] hover:text-[#ff3b30] transition-colors"
                    >
                      Kaldır
                    </button>
                  </div>

                  {variant.data.length === 0 ? (
                    <div className="p-6 text-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#acacb0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      <p className="text-[13px] text-[#86868b] mb-4">Tablo verisini dosyadan yükleyin veya elle oluşturun</p>
                      <div className="flex items-center justify-center gap-3">
                        <label className="inline-flex h-9 px-5 rounded-lg bg-[#0071e3] text-white text-[13px] font-medium items-center gap-2 cursor-pointer hover:bg-[#0077ed] transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          Dosya Yükle (.xlsx, .csv)
                          <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e) => handleSpecFileUpload(e, vi)} />
                        </label>
                        <button
                          onClick={() => {
                            const next = [...specTables];
                            next[vi] = { ...next[vi], data: [["Parametre", "Değer"], ["", ""]] };
                            saveSpecTables(next);
                          }}
                          className="h-9 px-5 rounded-lg border border-[#d2d2d7] text-[13px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors"
                        >
                          Elle Oluştur
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Tablo */}
                      <div className="overflow-x-auto max-w-full">
                        <table className="min-w-max text-[13px] w-full">
                          <thead>
                            <tr className="bg-[#fafafa]">
                              {variant.data[0]?.map((_: string, ci: number) => (
                                <th key={ci} className="px-3 py-2.5 text-left font-semibold text-[#1d1d1f] border-b border-[#e5e5ea]">
                                  <input
                                    value={variant.data[0][ci] ?? ""}
                                    onChange={(e) => updateSpecCell(vi, 0, ci, e.target.value)}
                                    className="w-full bg-transparent outline-none font-semibold"
                                    placeholder={`Başlık ${ci + 1}`}
                                  />
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
                                    <input
                                      value={cell}
                                      onChange={(e) => updateSpecCell(vi, ri + 1, ci, e.target.value)}
                                      className="w-full bg-transparent outline-none text-[#424245]"
                                      placeholder="—"
                                    />
                                  </td>
                                ))}
                                <td className="px-1 py-2">
                                  <button
                                    onClick={() => removeSpecRow(vi, ri + 1)}
                                    className="w-6 h-6 rounded flex items-center justify-center text-[#acacb0] hover:text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-all text-[11px]"
                                  >
                                    ✕
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Tablo kontrolleri */}
                      <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#f0f0f0]">
                        <button onClick={() => addSpecRow(vi)} className="h-7 px-3 rounded-md border border-dashed border-[#d2d2d7] text-[11px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors">
                          + Satır
                        </button>
                        <button onClick={() => addSpecColumn(vi)} className="h-7 px-3 rounded-md border border-dashed border-[#d2d2d7] text-[11px] text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-colors">
                          + Sütun
                        </button>
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

          {/* Yeni varyant ekleme */}
          <div className="border-2 border-dashed border-[#d2d2d7] rounded-xl p-5">
            <p className="text-[12px] font-medium text-[#86868b] mb-3">Yeni Varyant Ekle</p>
            <div className="flex gap-2">
              <input
                value={newVariantName}
                onChange={(e) => setNewVariantName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSpecVariant()}
                placeholder="Varyant adı (ör: Exclusive D Serisi)"
                className="flex-1 h-9 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[13px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow"
              />
              <button
                onClick={addSpecVariant}
                disabled={!newVariantName.trim()}
                className="h-9 px-5 rounded-lg bg-[#0071e3] text-white text-[13px] font-medium hover:bg-[#0077ed] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ekle
              </button>
            </div>
            {specTables.length > 0 && (
              <p className="text-[11px] text-[#acacb0] mt-2">Varyant ekledikten sonra tablosuna dosya yükleyebilir veya elle düzenleyebilirsiniz.</p>
            )}
          </div>
        </div>

        {/* Danger zone */}
        <div className="mt-10 pt-8 border-t border-[#e5e5ea]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-[#ff3b30]">Tehlikeli Bölge</p>
              <p className="text-[13px] text-[#86868b]">Bu ürünü kalıcı olarak silmek için</p>
            </div>
            <button
              onClick={async () => {
                if (!confirm("Bu ürünü kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
                await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
                router.push("/admin/urunler");
              }}
              className="h-8 px-4 rounded-lg border border-[#ff3b30]/30 text-[13px] text-[#ff3b30] font-medium hover:bg-[#ff3b30] hover:text-white transition-all"
            >
              Ürünü Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-[#86868b] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-lg border border-[#d2d2d7] bg-white text-[14px] text-[#1d1d1f] placeholder-[#acacb0] outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 transition-shadow"
      />
    </div>
  );
}
