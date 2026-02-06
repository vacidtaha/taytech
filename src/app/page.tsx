"use client";

import { Hero } from "@/components";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Building2, 
  Home as HomeIcon, 
  Heart, 
  Hammer, 
  Hospital, 
  Flame, 
  Dumbbell, 
  Factory, 
  GraduationCap
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-12 overflow-x-hidden">
      <Hero />
      
      {/* Content Area */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "13px" }}>
        {/* Ürün Grid */}
        <div className="mx-[8px] md:mx-[13px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[8px] lg:gap-[13px]">
            <Link href="/urunler/akilli-kontrol-panolari" className="group bg-white aspect-[5/4] lg:aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-[15px] lg:text-3xl font-medium text-center absolute top-[14%] lg:top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.akilli")}</h3>
              <Image src="/akilli-kontrol.png" alt={t("home.akilli")} width={280} height={210} className="absolute top-[36%] lg:top-[40%] object-contain max-w-[40%] lg:max-w-none" />
            </Link>
            <Link href="/urunler/isi-istasyonu" className="group bg-white aspect-[5/4] lg:aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-[15px] lg:text-3xl font-medium text-center absolute top-[14%] lg:top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.isi")}</h3>
              <Image src="/isikontrol-hazir.png" alt={t("home.isi")} width={350} height={260} className="absolute top-[36%] lg:top-[40%] object-contain max-w-[45%] lg:max-w-none" />
            </Link>
            <Link href="/urunler/manyetik-filtre" className="group bg-white aspect-[5/4] lg:aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-[15px] lg:text-3xl font-medium text-center absolute top-[14%] lg:top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.manyetik")}</h3>
              <Image src="/manyetik-filtre.png" alt={t("home.manyetik")} width={280} height={210} className="absolute top-[36%] lg:top-[40%] object-contain max-w-[40%] lg:max-w-none" />
            </Link>
            <Link href="/urunler/elektronik" className="group bg-white aspect-[5/4] lg:aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-[15px] lg:text-3xl font-medium text-center absolute top-[14%] lg:top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.elektronik")}</h3>
              <Image src="/elektronik.png" alt={t("home.elektronik")} width={350} height={260} className="absolute top-[36%] lg:top-[40%] object-contain max-w-[45%] lg:max-w-none" />
            </Link>
            <Link href="/urunler/taytech-cloud" className="group bg-white aspect-[5/4] lg:aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-[15px] lg:text-3xl font-medium text-center absolute top-[14%] lg:top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.cloud")}</h3>
              <Image src="/cloud.png" alt={t("home.cloud")} width={350} height={260} className="absolute top-[36%] lg:top-[40%] object-contain max-w-[45%] lg:max-w-none" />
            </Link>
            <Link href="/urunler/temizleyici-sivilar" className="group bg-white aspect-[5/4] lg:aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-[15px] lg:text-3xl font-medium text-center absolute top-[14%] lg:top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.sivilar")}</h3>
              <Image src="/temizleyici.png" alt={t("home.sivilar")} width={180} height={135} className="absolute top-[36%] lg:top-[40%] object-contain max-w-[30%] lg:max-w-none" />
            </Link>
          </div>
        </div>
      </section>

      {/* Doküman Merkezi Bölümü */}
      <div className="mx-[8px] lg:mx-[13px]" style={{ background: "#dc2626" }}>
        <div style={{ padding: "32px 28px" }} className="lg:!px-[100px] lg:!pt-[80px] lg:!pb-[50px]">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>{t("home.dokuman.taytech")}</p>
              <h2 className="text-[26px] lg:text-[48px] font-bold text-white leading-tight mb-3">{t("home.dokuman.title")}</h2>
              <p className="text-[14px] lg:text-[18px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 450 }}>{t("home.dokuman.desc")}</p>
            </div>
            <Link href="/dokuman-merkezi" className="self-start lg:self-auto hover:!bg-white hover:!text-[#dc2626] hover:!border-white" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 600, color: "white", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.3)", padding: "10px 22px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {t("home.dokuman.btn")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
        <div style={{ padding: "0 28px 32px" }} className="lg:!px-[100px] lg:!pb-[80px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <a href="/smart-box-datasheet.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5] h-[70px] md:h-[120px]">
                  <svg className="w-7 h-7 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none"><rect x="6" y="4" width="28" height="36" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" style={{ transition: "all 0.2s" }} /><line x1="12" y1="14" x2="28" y2="14" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><line x1="12" y1="20" x2="24" y2="20" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="12" y1="25" x2="26" y2="25" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><rect x="32" y="16" width="12" height="16" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" strokeDasharray="3 2" style={{ transition: "all 0.2s" }} /><circle cx="38" cy="24" r="4" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "12px 12px 14px" }}>
                  <p style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color 0.2s" }} className="text-[9px] md:text-[11px] mb-1 md:mb-2 text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.datasheet")}</p>
                  <h4 style={{ fontWeight: 600, marginBottom: "2px", transition: "color 0.2s" }} className="text-[12px] md:text-[15px] text-white group-hover:!text-[#1d1d1f]">Smart Box</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub1")}</p>
                </div>
              </div>
            </a>
            <a href="/thermohexa-datasheet.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5] h-[70px] md:h-[120px]">
                  <svg className="w-7 h-7 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none"><rect x="6" y="4" width="28" height="36" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" style={{ transition: "all 0.2s" }} /><line x1="12" y1="14" x2="28" y2="14" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><line x1="12" y1="20" x2="24" y2="20" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="12" y1="25" x2="26" y2="25" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><rect x="32" y="16" width="12" height="16" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" strokeDasharray="3 2" style={{ transition: "all 0.2s" }} /><circle cx="38" cy="24" r="4" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "12px 12px 14px" }}>
                  <p style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color 0.2s" }} className="text-[9px] md:text-[11px] mb-1 md:mb-2 text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.datasheet")}</p>
                  <h4 style={{ fontWeight: 600, marginBottom: "2px", transition: "color 0.2s" }} className="text-[12px] md:text-[15px] text-white group-hover:!text-[#1d1d1f]">ThermoHexa</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub2")}</p>
                </div>
              </div>
            </a>
            <a href="/fxa-kullanim.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5] h-[70px] md:h-[120px]">
                  <svg className="w-7 h-7 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none"><path d="M24 8C20 6 14 5 6 6v30c8-1 14 0 18 2 4-2 10-3 18-2V6c-8-1-14 0-18 2z" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" strokeLinejoin="round" style={{ transition: "all 0.2s" }} /><line x1="24" y1="8" x2="24" y2="38" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><line x1="11" y1="14" x2="20" y2="14" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="11" y1="19" x2="19" y2="19" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="28" y1="14" x2="37" y2="14" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="28" y1="19" x2="36" y2="19" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "12px 12px 14px" }}>
                  <p style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color 0.2s" }} className="text-[9px] md:text-[11px] mb-1 md:mb-2 text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.kilavuz")}</p>
                  <h4 style={{ fontWeight: 600, marginBottom: "2px", transition: "color 0.2s" }} className="text-[12px] md:text-[15px] text-white group-hover:!text-[#1d1d1f]">FXA</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub1")}</p>
                </div>
              </div>
            </a>
            <a href="/katalog.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5] h-[70px] md:h-[120px]">
                  <svg className="w-7 h-7 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none"><path d="M4 12h16l4-4h20v32H4V12z" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" strokeLinejoin="round" style={{ transition: "all 0.2s" }} /><line x1="4" y1="18" x2="44" y2="18" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><rect x="16" y="24" width="16" height="2" className="fill-white/20 group-hover:!fill-[#dc2626]/30" style={{ transition: "all 0.2s" }} /><rect x="18" y="30" width="12" height="2" className="fill-white/20 group-hover:!fill-[#dc2626]/30" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "12px 12px 14px" }}>
                  <p style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color 0.2s" }} className="text-[9px] md:text-[11px] mb-1 md:mb-2 text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.katalog")}</p>
                  <h4 style={{ fontWeight: 600, marginBottom: "2px", transition: "color 0.2s" }} className="text-white group-hover:!text-[#1d1d1f]">Taytech Genel Katalog</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub3")}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Çözümler Container */}
      <div className="w-full bg-white flex flex-col items-center relative overflow-hidden" style={{ marginTop: '13px' }}>
        {/* Arka plan yazıları — sadece masaüstü */}
        <span className="hidden lg:block absolute text-xl font-medium smart-text" style={{ top: '5%', left: '7%', color: '#dc2626' }}>{t("home.bg.ticari")}</span>
        <span className="hidden lg:block absolute text-xl font-medium smart-text" style={{ top: '15%', left: '5%', color: '#dc2626' }}>{t("home.bg.toplu")}</span>
        <span className="hidden lg:block absolute text-xl font-medium smart-text" style={{ top: '25%', left: '7%', color: '#dc2626' }}>{t("home.bg.hastane")}</span>
        <span className="hidden lg:block absolute text-xl font-medium smart-text" style={{ top: '5%', right: '7%', color: '#dc2626' }}>{t("home.bg.bakim")}</span>
        <span className="hidden lg:block absolute text-xl font-medium smart-text" style={{ top: '15%', right: '5%', color: '#dc2626' }}>{t("home.bg.yeni")}</span>
        <span className="hidden lg:block absolute text-xl font-medium smart-text" style={{ top: '25%', right: '7%', color: '#dc2626' }}>{t("home.bg.kazan")}</span>
        
        <div style={{ padding: "60px 28px 0" }} className="lg:!pt-[120px] lg:!px-0 w-full flex flex-col items-center">
          <h2 className="text-2xl lg:text-4xl text-center mb-3 z-10" style={{ fontWeight: 450, color: '#dc2626' }}>{t("home.cozumler.title")}</h2>
          <p className="text-sm lg:text-xl text-[#86868b] text-center z-10 px-4" style={{ marginBottom: '40px', fontWeight: 450 }}>{t("home.cozumler.desc")}</p>
        </div>
        
        <div className="flex flex-col items-center gap-6 lg:gap-10 z-10 px-6">
          <div className="flex justify-center gap-6 lg:gap-14 flex-wrap">
            <Building2 className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <HomeIcon className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <Heart className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <Hammer className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <Hospital className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
          </div>
          <div className="flex justify-center gap-6 lg:gap-14 flex-wrap">
            <Flame className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <Dumbbell className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <Factory className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
            <GraduationCap className="w-10 h-10 lg:w-[68px] lg:h-[68px]" strokeWidth={1.5} color="#dc2626" />
          </div>
          <Link href="/cozumler" className="mt-2 lg:mt-4 bg-[#dc2626] text-white text-sm lg:text-base font-medium transition-all duration-300 hover:bg-[#b91c1c]" style={{ padding: '10px 28px', borderRadius: '20px', textDecoration: 'none' }}>
            {t("home.cozumler.btn")}
          </Link>
        </div>

        <div style={{ width: "100%", marginTop: "50px" }} className="lg:!mt-[80px] px-2 lg:px-[13px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-0">
            <Link href="/cozumler/toplu-konutlar" className="group" style={{ textDecoration: "none" }}>
              <div>
                <div className="relative h-[200px] lg:h-[480px] overflow-hidden">
                  <Image src="/akıllısehir.jpg" alt={t("home.cozumler.toplu")} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="group-hover:!bg-[#dc2626]" style={{ padding: "20px 24px 24px", background: "white", transition: "background-color 0.3s" }}>
                  <p className="group-hover:!text-white/60" style={{ fontSize: "11px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", transition: "color 0.3s" }}>{t("home.cozumler.label")}</p>
                  <h3 className="group-hover:!text-white text-[20px] lg:text-[26px]" style={{ fontWeight: 700, color: "#1d1d1f", lineHeight: 1.2, marginBottom: "8px", transition: "color 0.3s" }}>{t("home.cozumler.toplu")}</h3>
                  <p className="group-hover:!text-white/70 text-[13px] lg:text-[15px]" style={{ color: "#86868b", lineHeight: 1.6, transition: "color 0.3s" }}>{t("home.cozumler.topluDesc")}</p>
                </div>
              </div>
            </Link>
            <Link href="/cozumler/endustriyel-kazan-dairesi" className="group" style={{ textDecoration: "none" }}>
              <div>
                <div className="relative h-[200px] lg:h-[480px] overflow-hidden">
                  <Image src="/kazan-dairesi.jpg" alt={t("home.cozumler.kazan")} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="group-hover:!bg-[#dc2626]" style={{ padding: "20px 24px 24px", background: "white", transition: "background-color 0.3s" }}>
                  <p className="group-hover:!text-white/60" style={{ fontSize: "11px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", transition: "color 0.3s" }}>{t("home.cozumler.label")}</p>
                  <h3 className="group-hover:!text-white text-[20px] lg:text-[26px]" style={{ fontWeight: 700, color: "#1d1d1f", lineHeight: 1.2, marginBottom: "8px", transition: "color 0.3s" }}>{t("home.cozumler.kazan")}</h3>
                  <p className="group-hover:!text-white/70 text-[13px] lg:text-[15px]" style={{ color: "#86868b", lineHeight: 1.6, transition: "color 0.3s" }}>{t("home.cozumler.kazanDesc")}</p>
                </div>
              </div>
            </Link>
            <Link href="/cozumler/egitim-yapilari" className="group" style={{ textDecoration: "none" }}>
              <div>
                <div className="relative h-[200px] lg:h-[480px] overflow-hidden">
                  <Image src="/okul.jpg" alt={t("home.cozumler.egitim")} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="group-hover:!bg-[#dc2626]" style={{ padding: "20px 24px 24px", background: "white", transition: "background-color 0.3s" }}>
                  <p className="group-hover:!text-white/60" style={{ fontSize: "11px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", transition: "color 0.3s" }}>{t("home.cozumler.label")}</p>
                  <h3 className="group-hover:!text-white text-[20px] lg:text-[26px]" style={{ fontWeight: 700, color: "#1d1d1f", lineHeight: 1.2, marginBottom: "8px", transition: "color 0.3s" }}>{t("home.cozumler.egitim")}</h3>
                  <p className="group-hover:!text-white/70 text-[13px] lg:text-[15px]" style={{ color: "#86868b", lineHeight: 1.6, transition: "color 0.3s" }}>{t("home.cozumler.egitimDesc")}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Standartların Ötesinde */}
      <div className="w-full bg-white grid grid-cols-1 lg:grid-cols-2" style={{ marginTop: '13px' }}>
        {/* Sol: Simge kutusu */}
        <div className="flex items-center justify-center pt-20 pb-4 lg:py-0 lg:h-[650px]">
          <div className="w-44 h-44 lg:w-80 lg:h-80 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at center, #ff6b6b 0%, #dc2626 50%, #991b1b 100%)' }}>
            <div className="grid grid-cols-2 gap-1">
              <Image src="/simge.png" alt="Simge" width={95} height={95} className="w-10 h-10 lg:w-[95px] lg:h-[95px]" style={{ filter: 'brightness(0) invert(1)' }} />
              <svg className="w-10 h-10 lg:w-20 lg:h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <svg className="w-10 h-10 lg:w-20 lg:h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              <svg className="w-10 h-10 lg:w-20 lg:h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </div>
        </div>
        {/* Sağ: İçerik */}
        <div className="relative lg:h-[650px]" style={{ padding: "48px 28px" }}>
          <div className="lg:absolute lg:top-1/2 lg:left-16 lg:right-16 lg:-translate-y-1/2 text-left">
            <h2 className="text-3xl lg:text-6xl font-bold mb-4 lg:mb-6" style={{ background: 'linear-gradient(to bottom right, #dc2626, #991b1b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t("home.standartlar.title")}
            </h2>
            <p className="text-sm lg:text-xl text-[#424245] mb-8 lg:mb-12">{t("home.standartlar.desc")}</p>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div>
                <span className="text-lg lg:text-2xl font-bold text-[#dc2626]">ISO 9001:2015</span>
                <p className="text-sm lg:text-base text-[#86868b] mt-1 lg:mt-2">{t("home.standartlar.iso1")}</p>
              </div>
              <div>
                <span className="text-lg lg:text-2xl font-bold text-[#dc2626]">ISO 14001:2015</span>
                <p className="text-sm lg:text-base text-[#86868b] mt-1 lg:mt-2">{t("home.standartlar.iso2")}</p>
              </div>
              <div>
                <span className="text-lg lg:text-2xl font-bold text-[#dc2626]">ISO 45001:2018</span>
                <p className="text-sm lg:text-base text-[#86868b] mt-1 lg:mt-2">{t("home.standartlar.iso3")}</p>
              </div>
            </div>
            <div className="mt-8 lg:mt-12">
              <Link href="/kurumsal" className="bg-[#dc2626] text-white text-sm font-medium transition-all duration-300 hover:bg-[#b91c1c] inline-block" style={{ padding: '10px 24px' }}>
                {t("home.standartlar.btn")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Haberler — sadece masaüstü */}
      <div className="hidden lg:block w-full bg-white" style={{ marginTop: '13px' }}>
        <div style={{ padding: '48px 28px 0' }} className="lg:!px-[100px] lg:!pt-[80px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 lg:mb-20 gap-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-[#dc2626]">{t("home.haberler.title")}</h2>
            <Link href="/haberler" className="hover:bg-[#1d1d1f] hover:text-white transition-all duration-300" style={{ backgroundColor: 'transparent', color: '#1d1d1f', fontSize: '13px', fontWeight: 500, padding: '10px 20px', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(0,0,0,0.2)' }}>
              {t("home.haberler.btn")}
            </Link>
          </div>
        </div>

        <div style={{ padding: '0 28px 48px' }} className="lg:!px-[100px] lg:!pb-[80px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] lg:auto-rows-[280px] gap-3 lg:gap-6">
          <div className="group lg:row-span-2 col-span-2 lg:col-span-1" style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)', zIndex: 1 }} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }} />
            <Image src="/akıllıbina.jpg" alt={t("news.1")} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 2 }}>
              <h3 className="text-2xl font-bold text-white leading-tight">{t("news.1")}</h3>
              <p className="text-white/60 text-sm mt-2">16 Ekim 2023</p>
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="group">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }} />
            <Image src="/akıllısehir.jpg" alt={t("news.2")} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">{t("news.2")}</h3>
            </div>
          </div>
          <div className="group col-span-2" style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%)', zIndex: 1 }} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }} />
            <Image src="/konferans.jpg" alt={t("news.3")} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '24px', right: '40%', zIndex: 2 }}>
              <h3 className="text-xl font-bold text-white leading-tight">{t("news.3")}</h3>
              <p className="text-white/60 text-sm mt-2">8 Kasım 2023</p>
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="group">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }} />
            <Image src="/yenilik.jpg" alt={t("news.4")} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">{t("news.4")}</h3>
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="group">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }} />
            <Image src="/tesis.jpeg" alt={t("news.5")} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">{t("news.5")}</h3>
            </div>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="group">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }} />
            <Image src="/taytechcloudfoto.avif" alt={t("news.6")} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 2 }}>
              <h3 className="text-base font-semibold text-white leading-tight">{t("news.6")}</h3>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      <div style={{ height: '13px', backgroundColor: '#f5f5f7' }} />
      <Footer theme="white" />
    </div>
  );
}
