"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function KurumsalPage() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("muhendislik");
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["muhendislik", "rakamlar", "standartlar", "surdurulebilirlik", "destek"];
      const scrollPosition = window.scrollY + 300;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const maddeler = Array.from({ length: 13 }, (_, i) => t(`corp.standartlar.madde${i + 1}`));

  return (
    <div className="min-h-screen bg-white">
      <Header theme="light" isFixed={false} onMenuOpenChange={setIsMenuOpen} />
      
      {/* İkinci Header */}
      {!isMenuOpen && (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="h-12 px-8 flex items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block w-[180px]"></div>
              <span className="text-[21px] font-normal text-[#dc2626]">{t("corp.nav.taytech")}</span>
              <span className="ml-6 text-[21px] font-semibold text-[#dc2626]">{t("corp.nav.kurumsal")}</span>
            </div>
            <nav className="hidden md:flex items-center gap-8" style={{ marginRight: '100px' }}>
              {[
                { id: "muhendislik", key: "corp.nav.muhendislik" },
                { id: "rakamlar", key: "corp.nav.rakamlar" },
                { id: "standartlar", key: "corp.nav.standartlar" },
                { id: "surdurulebilirlik", key: "corp.nav.surdurulebilirlik" },
                { id: "destek", key: "corp.nav.destek" },
              ].map((item) => (
                <a key={item.id} href={`#${item.id}`} className={`text-[13px] transition-colors ${activeSection === item.id ? "font-medium text-[#dc2626]" : "text-[#424245] hover:text-[#dc2626]"}`}>
                  {t(item.key)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <div id="muhendislik" className="w-full">
        <div className="w-full h-[550px] bg-[#f5f5f7] flex items-center justify-center">
          <div className="max-w-3xl text-center px-8">
            <h2 className="text-4xl md:text-5xl font-semibold mb-14" style={{ background: 'linear-gradient(to bottom right, #dc2626, #991b1b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t("corp.hero.title")}
            </h2>
            <p className="text-xl md:text-2xl text-[#424245] leading-relaxed">{t("corp.hero.desc")}</p>
          </div>
        </div>
      </div>
      
      <div className="h-[120px] bg-white"></div>
      
      <div className="bg-white pb-20 flex items-center justify-center">
        <Image src="/taytechdiscekim.png" alt="Taytech" width={800} height={500} className="w-full max-w-4xl h-auto object-contain px-8 rounded-4xl" />
      </div>
      
      <div className="h-[120px] bg-white"></div>
      
      {/* Rakamlar */}
      <div id="rakamlar" className="bg-white">
        <div className="grid grid-cols-2">
          <div className="py-20 flex justify-center">
            <div className="sticky top-[30vh] h-fit max-w-md px-8 flex flex-col" style={{ gap: '80px' }}>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#dc2626] mb-6">{t("corp.rakamlar.title")}</h2>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">{t("corp.rakamlar.desc")}</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#dc2626] mb-6">{t("corp.rakamlar.entegrasyon")}</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">{t("corp.rakamlar.entegrasyonDesc")}</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#dc2626] mb-6">{t("corp.rakamlar.makine")}</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">{t("corp.rakamlar.makineDesc")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center px-8" style={{ paddingTop: '70vh', paddingBottom: '300px' }}>
            {[
              { val: "5.600 m²", label: "corp.rakamlar.alan", desc: "corp.rakamlar.alanDesc", bg: "#f7f7f9", z: 10 },
              { val: "4.750 m²", label: "corp.rakamlar.uretim", desc: "corp.rakamlar.uretimDesc", bg: "#f3f3f5", z: 20 },
              { val: "860 m²", label: "corp.rakamlar.arge", desc: "corp.rakamlar.argeDesc", bg: "#f0f0f2", z: 30 },
            ].map((card, i) => (
              <div key={i} className={`sticky top-[calc(50vh-266px)] z-${card.z} ${i < 2 ? 'mb-[-350px]' : ''}`}>
                <div className="rounded-3xl shadow-lg" style={{ width: '400px', height: '533px', padding: '48px 40px 40px 40px', backgroundColor: card.bg }}>
                  <span className="text-7xl font-semibold text-[#dc2626] leading-none block">{card.val}</span>
                  <p className="text-3xl text-[#dc2626] mt-6 font-semibold">{t(card.label)}</p>
                  <p className="text-lg text-[#86868b] mt-6 leading-relaxed font-medium">{t(card.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-[400px] bg-white"></div>
      
      {/* Standartlar */}
      <div id="standartlar" className="bg-white">
        <div className="grid grid-cols-2">
          <div className="py-20 flex justify-center">
            <div className="sticky top-[15vh] h-fit max-w-md px-8 flex flex-col" style={{ gap: '60px' }}>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#dc2626] mb-6">{t("corp.standartlar.title")}</h2>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">{t("corp.standartlar.desc")}</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#dc2626]">ISO 9001:2015</span>
                  <span className="text-lg text-[#86868b]">{t("corp.standartlar.iso1")}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#dc2626]">ISO 14001:2015</span>
                  <span className="text-lg text-[#86868b]">{t("corp.standartlar.iso2")}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-[#dc2626]">ISO 45001:2018</span>
                  <span className="text-lg text-[#86868b]">{t("corp.standartlar.iso3")}</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#dc2626] mb-6">{t("corp.standartlar.mevzuat")}</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">{t("corp.standartlar.mevzuatDesc")}</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-[#dc2626] mb-6">{t("corp.standartlar.denetim")}</h3>
                <p className="text-xl font-medium text-[#424245] leading-relaxed">{t("corp.standartlar.denetimDesc")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center px-8" style={{ paddingTop: '70vh', paddingBottom: '300px' }}>
            <div className="sticky top-[5vh] z-10">
              <div className="bg-white shadow-2xl relative" style={{ width: '650px', padding: '70px 60px', borderRadius: '4px' }}>
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-red-600 rounded-tl"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-red-600 rounded-tr"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-red-600 rounded-bl"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-red-600 rounded-br"></div>
                <div className="flex justify-center mb-10 -mt-2">
                  <Image src="/logo.png" alt="Taytech Logo" width={180} height={60} className="h-auto" />
                </div>
                <h3 className="text-center font-bold text-[#dc2626] mb-10" style={{ fontSize: '24px', lineHeight: '1.4' }}>
                  {t("corp.standartlar.politikaBaslik")}
                </h3>
                <div className="text-[#424245] leading-relaxed" style={{ fontSize: '14px' }}>
                  <p className="mb-6">{t("corp.standartlar.politika1")}</p>
                  <p className="mb-6">{t("corp.standartlar.politika2")}</p>
                  <ul className="list-disc pl-6 space-y-3 mb-6">
                    {maddeler.map((madde, i) => (<li key={i}>{madde}</li>))}
                  </ul>
                  <p className="mb-10 font-semibold text-[15px]">{t("corp.standartlar.taahhut")}</p>
                  <div className="text-right mt-12">
                    <p className="text-[#86868b] text-base mb-1">{t("corp.standartlar.imza")}</p>
                    <p className="font-bold text-[#1d1d1f] text-xl">{t("corp.standartlar.imzaAd")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[200px] bg-white"></div>
      
      {/* Sürdürülebilirlik */}
      <div id="surdurulebilirlik" className="bg-white py-20">
        <div className="flex flex-col items-center">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4">{t("corp.surdurulebilirlik.title")}</h2>
            <p className="text-2xl text-[#86868b] font-medium">{t("corp.surdurulebilirlik.subtitle")}</p>
          </div>
          <div className="max-w-3xl text-center px-8" style={{ marginBottom: '60px' }}>
            <p className="text-xl text-[#424245] leading-relaxed">{t("corp.surdurulebilirlik.desc")}</p>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-6xl">
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div><h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t("corp.surdurulebilirlik.ekonomi")}</h3><p className="text-sm text-[#424245] leading-relaxed">{t("corp.surdurulebilirlik.ekonomiDesc")}</p></div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden"><Image src="/cevre1.jpeg" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" /></div>
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              <div><h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t("corp.surdurulebilirlik.yalin")}</h3><p className="text-sm text-[#424245] leading-relaxed">{t("corp.surdurulebilirlik.yalinDesc")}</p></div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden"><Image src="/cevre2.jpg" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" /></div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden"><Image src="/cevre3.avif" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" /></div>
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              <div><h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t("corp.surdurulebilirlik.kaynak")}</h3><p className="text-sm text-[#424245] leading-relaxed">{t("corp.surdurulebilirlik.kaynakDesc")}</p></div>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden"><Image src="/cevre4.jpg" alt="Çevre" width={400} height={300} className="w-full h-full object-cover" /></div>
            <div className="aspect-[4/3] bg-[#f5f5f7] rounded-2xl flex flex-col" style={{ padding: '24px 28px' }}>
              <svg className="w-8 h-8 mb-auto" viewBox="0 0 24 24" fill="none" stroke="rgb(98,214,105)" strokeWidth="1.5"><path d="M12 22v-7"/><path d="M9 22h6"/><path d="M12 15a5 5 0 0 0 5-5c0-2-1-3-2-4l1-3-3 1-1-2-1 2-3-1 1 3c-1 1-2 2-2 4a5 5 0 0 0 5 5z"/></svg>
              <div><h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t("corp.surdurulebilirlik.gelecek")}</h3><p className="text-sm text-[#424245] leading-relaxed">{t("corp.surdurulebilirlik.gelecekDesc")}</p></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[200px] bg-white"></div>
      
      {/* Tam Destek */}
      <div id="destek" className="bg-white py-32 overflow-hidden">
        <div className="flex flex-col items-center px-8">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className="w-20 h-20 bg-[#0066cc] rounded-2xl flex items-center justify-center" style={{ marginBottom: '30px' }}>
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-[#0066cc] mb-4">{t("corp.destek.title")}</h2>
            <p className="text-2xl md:text-3xl text-[#0066cc]/70 font-semibold">{t("corp.destek.subtitle")}</p>
          </div>
          <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: '60px' }}>
            <p className="text-xl text-[#1d1d1f] leading-relaxed font-medium">{t("corp.destek.desc")}</p>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-4 w-full max-w-5xl" style={{ height: '600px' }}>
            <div className="col-span-2 row-span-2 bg-[#0077b6] rounded-3xl flex flex-col justify-center relative overflow-hidden" style={{ padding: '48px' }}>
              <svg className="w-12 h-12 mb-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <h3 className="text-3xl font-bold text-white mb-4">{t("corp.destek.danismanlik")}</h3>
              <p className="text-lg text-white/90 leading-relaxed font-medium">{t("corp.destek.danismanlikDesc")}</p>
            </div>
            <div className="col-span-1 row-span-1 bg-[#0096c7] rounded-3xl flex flex-col justify-center relative overflow-hidden" style={{ padding: '28px' }}>
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <h3 className="text-xl font-bold text-white mb-2">{t("corp.destek.hizli")}</h3>
              <p className="text-sm text-white/90 font-medium">{t("corp.destek.hizliDesc")}</p>
            </div>
            <div className="col-span-1 row-span-1 bg-[#00b4d8] rounded-3xl flex flex-col justify-center relative overflow-hidden" style={{ padding: '28px' }}>
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <h3 className="text-xl font-bold text-white mb-2">{t("corp.destek.satisSonrasi")}</h3>
              <p className="text-sm text-white/90 font-medium">{t("corp.destek.satisSonrasiDesc")}</p>
            </div>
            <div className="col-span-2 row-span-1 bg-[#48cae4] rounded-3xl flex items-center gap-6 relative overflow-hidden" style={{ padding: '32px' }}>
              <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t("corp.destek.kadro")}</h3>
                <p className="text-base text-white/90 font-medium">{t("corp.destek.kadroDesc")}</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-5xl" style={{ marginTop: '16px' }}>
            <div className="bg-[#90e0ef] rounded-3xl flex items-center justify-center gap-6" style={{ height: '200px', padding: '32px 48px' }}>
              <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t("corp.destek.rekabet")}</h3>
                <p className="text-base text-white/90 font-medium">{t("corp.destek.rekabetDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[100px] bg-white"></div>
      <Footer theme="light" />
    </div>
  );
}
