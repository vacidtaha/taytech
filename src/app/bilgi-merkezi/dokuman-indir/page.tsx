import Link from "next/link";
export default function DokumanIndir() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: "80px", marginLeft: "200px" }}>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg font-medium">Ana Sayfa</span>
        </Link>
      </div>

      {/* Başlık */}
      <section style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <h1 className="text-5xl font-semibold text-center text-[#1d1d1f]">
          Doküman İndir
        </h1>
        <p className="text-xl text-[#86868b] text-center mt-4 font-medium">
          Teknik veri sayfaları, kullanım kılavuzları ve kataloglar
        </p>
      </section>

      {/* İçerik */}
      <section className="flex justify-center" style={{ paddingBottom: "120px" }}>
        <div className="bg-white rounded-2xl shadow-sm text-center" style={{ padding: "80px 60px", maxWidth: "600px" }}>
          <div className="text-6xl mb-6">📄</div>
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-3">Yakında</h2>
          <p className="text-[#86868b] text-lg">
            Doküman indirme merkezi hazırlanıyor.
          </p>
        </div>
      </section>

    </div>
  );
}

