import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const kategoriler = [
  {
    id: 1,
    baslik: "Smart Endüstriyel Kontrolörler",
    resim: "/smart-endustriyel.jpg",
    link: "/urunler/elektronik/smart-endustriyel"
  },
  {
    id: 2,
    baslik: "Isı İstasyonu Elektronik Kontrolörleri",
    resim: "/isi-istasyonu-kontrolorleri.jpg",
    link: "/urunler/elektronik/isi-istasyonu-kontrolorleri"
  },
  {
    id: 3,
    baslik: "Yerden Isıtma Kontrolörleri",
    resim: "/yerden-isitma.jpg",
    link: "/urunler/elektronik/yerden-isitma"
  }
];

export default function Elektronik() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      {/* Başlık */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "180px", paddingBottom: "60px" }}>
        <h1 className="text-[#86868b] text-5xl font-medium text-center">
          Elektronik
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



