import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const kategoriler = [
  {
    id: 1,
    baslik: "Jokey Serisi",
    resim: "/jokey-serisi.png",
    link: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/jokey"
  },
  {
    id: 2,
    baslik: "Elektrikli",
    resim: "/elektrikli.png",
    link: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/elektrikli"
  },
  {
    id: 3,
    baslik: "Dizel",
    resim: "/dizel.png",
    link: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/dizel"
  }
];

export default function YanginSistemleriKontrolPanolari() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Geri Butonu */}
      <div style={{ paddingTop: "80px", marginLeft: "150px" }}>
        <Link 
          href="/urunler/akilli-kontrol-panolari"
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg font-medium">Kategoriler</span>
        </Link>
      </div>

      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          Yangın Sistemleri Kontrol Panoları
        </h1>
      </section>

      {/* Kategori Grid */}
      <section className="bg-[#f5f5f7]">
        <div className="flex justify-center">
          <div style={{ width: "1390px" }}>
            <p className="text-[#86868b] text-2xl font-semibold" style={{ marginBottom: "30px" }}>
              Kategoriler
            </p>
            <div className="flex gap-[20px]">
              {kategoriler.map((kategori) => (
                <Link 
                  key={kategori.id}
                  href={kategori.link} 
                  className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-lg group"
                  style={{ width: "450px", height: "600px" }}
                >
                  {/* Resim Alanı - %75 */}
                  <div className="h-[75%] flex items-center justify-center p-6">
                    <Image 
                      src={kategori.resim} 
                      alt={kategori.baslik} 
                      width={280}
                      height={280}
                      className="object-contain max-h-full"
                    />
                  </div>
                  {/* Yazı Alanı - %25 */}
                  <div className="h-[25%] flex items-center justify-center px-4 transition-colors duration-300 group-hover:bg-[#dc2626]">
                    <h3 className="text-[#1d1d1f] text-xl font-medium text-center transition-colors duration-300 group-hover:text-white">
                      {kategori.baslik}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alt boşluk */}
      <div style={{ height: "150px" }} />

      <Footer theme="white" />
    </div>
  );
}


