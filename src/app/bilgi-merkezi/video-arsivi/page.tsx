import Link from "next/link";
import Footer from "@/components/Footer";

const videos = [
  {
    title: "Taytech Akıllı Kontrol Panoları Tanıtım",
    description: "Elektronik ve elektromekanik kontrol panolarımızın detaylı tanıtımı ve çalışma prensipleri.",
    duration: "4:32",
  },
  {
    title: "Isı İstasyonu Kurulum Rehberi",
    description: "ThermoHexa ve HydroHexa ısı istasyonlarının adım adım kurulum süreci.",
    duration: "6:15",
  },
  {
    title: "IRONTRAP® Manyetik Filtre Uygulaması",
    description: "Manyetik filtrenin sisteme montajı, bakımı ve performans avantajları.",
    duration: "3:48",
  },
];

export default function VideoArsivi() {
  return (
    <div className="min-h-screen bg-white pt-12">
      {/* Geri */}
      <div style={{ paddingTop: "80px", paddingLeft: "200px" }}>
        <Link href="/" className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#dc2626] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span className="text-lg font-medium">Ana Sayfa</span>
        </Link>
      </div>

      {/* Başlık */}
      <div style={{ padding: "80px 200px 0" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>Bilgi Merkezi</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.1, marginBottom: "16px" }}>Video Arşivi</h1>
        <p style={{ fontSize: "20px", color: "#86868b", fontWeight: 450, maxWidth: "600px", lineHeight: 1.6 }}>
          Ürün tanıtımları, kurulum rehberleri ve teknik eğitim videoları.
        </p>
      </div>

      {/* Ayraç */}
      <div style={{ margin: "50px 200px", height: "1px", background: "#e5e5e5" }} />

      {/* Video Grid */}
      <div style={{ padding: "0 200px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {videos.map((video, i) => (
            <div key={i} style={{ cursor: "pointer" }} className="group">
              {/* Video Placeholder */}
              <div style={{ aspectRatio: "16/9", background: "#1d1d1f", position: "relative", overflow: "hidden", marginBottom: "20px" }}>
                {/* Çizgili desen */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
                  {Array.from({ length: 12 }).map((_, j) => (
                    <div key={j} style={{ position: "absolute", left: 0, right: 0, top: `${j * 8.33}%`, height: "1px", background: "white" }} />
                  ))}
                </div>

                {/* Play butonu */}
                <div 
                  className="group-hover:!bg-[#dc2626]"
                  style={{ 
                    position: "absolute", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)", 
                    width: "72px", 
                    height: "72px", 
                    border: "2px solid rgba(255,255,255,0.3)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    transition: "all 0.3s",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}>
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>

                {/* Süre */}
                <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.7)", padding: "4px 10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "white", fontVariantNumeric: "tabular-nums" }}>{video.duration}</span>
                </div>
              </div>

              {/* Bilgi */}
              <h3 className="group-hover:text-[#dc2626] transition-colors" style={{ fontSize: "18px", fontWeight: 600, color: "#1d1d1f", lineHeight: 1.3, marginBottom: "8px" }}>
                {video.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#86868b", lineHeight: 1.5 }}>
                {video.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer theme="light" />
    </div>
  );
}
