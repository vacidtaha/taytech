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
    <div className="min-h-screen bg-[#f5f5f7] pt-12">
      <Hero />
      
      {/* Content Area */}
      <section className="bg-[#f5f5f7]" style={{ paddingTop: "13px" }}>
        {/* Ürün Grid */}
        <div style={{ marginLeft: "13px", marginRight: "13px" }}>
          <div className="grid grid-cols-3 gap-[13px]">
            <Link href="/urunler/akilli-kontrol-panolari" className="group bg-white aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.akilli")}</h3>
              <Image src="/akilli-kontrol.png" alt={t("home.akilli")} width={280} height={210} className="absolute top-[40%] object-contain" />
            </Link>
            <Link href="/urunler/isi-istasyonu" className="group bg-white aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.isi")}</h3>
              <Image src="/isikontrol-hazir.png" alt={t("home.isi")} width={350} height={260} className="absolute top-[40%] object-contain" />
            </Link>
            <Link href="/urunler/manyetik-filtre" className="group bg-white aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.manyetik")}</h3>
              <Image src="/manyetik-filtre.png" alt={t("home.manyetik")} width={280} height={210} className="absolute top-[40%] object-contain" />
            </Link>
            <Link href="/urunler/elektronik" className="group bg-white aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.elektronik")}</h3>
              <Image src="/elektronik.png" alt={t("home.elektronik")} width={350} height={260} className="absolute top-[40%] object-contain" />
            </Link>
            <Link href="/urunler/taytech-cloud" className="group bg-white aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.cloud")}</h3>
              <Image src="/cloud.png" alt={t("home.cloud")} width={350} height={260} className="absolute top-[40%] object-contain" />
            </Link>
            <Link href="/urunler/temizleyici-sivilar" className="group bg-white aspect-[5/6] rounded-[2px] px-6 relative flex flex-col items-center transition-all duration-300 hover:bg-[#f0f0f2] shadow-sm">
              <h3 className="text-[#1d1d1f] text-3xl font-medium text-center absolute top-[18%] left-0 right-0 transition-colors duration-300 group-hover:text-[#dc2626]">{t("home.sivilar")}</h3>
              <Image src="/temizleyici.png" alt={t("home.sivilar")} width={180} height={135} className="absolute top-[40%] object-contain" />
            </Link>
          </div>
        </div>
      </section>

      {/* Doküman Merkezi Bölümü */}
      <div style={{ margin: "13px 13px 13px", background: "#dc2626" }}>
        <div style={{ padding: "80px 100px 50px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}>{t("home.dokuman.taytech")}</p>
              <h2 style={{ fontSize: "48px", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "14px" }}>{t("home.dokuman.title")}</h2>
              <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.65)", fontWeight: 450, maxWidth: "480px", lineHeight: 1.5 }}>{t("home.dokuman.desc")}</p>
            </div>
            <Link href="/dokuman-merkezi" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: 600, color: "white", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.3)", padding: "12px 28px", transition: "all 0.2s" }} className="hover:!bg-white hover:!text-[#dc2626] hover:!border-white">
              {t("home.dokuman.btn")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
        <div style={{ padding: "0 100px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            <a href="/smart-box-datasheet.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="6" y="4" width="28" height="36" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" style={{ transition: "all 0.2s" }} /><line x1="12" y1="14" x2="28" y2="14" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><line x1="12" y1="20" x2="24" y2="20" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="12" y1="25" x2="26" y2="25" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><rect x="32" y="16" width="12" height="16" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" strokeDasharray="3 2" style={{ transition: "all 0.2s" }} /><circle cx="38" cy="24" r="4" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "18px 20px 20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.datasheet")}</p>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", transition: "color 0.2s" }} className="text-white group-hover:!text-[#1d1d1f]">Smart Box</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub1")}</p>
                </div>
              </div>
            </a>
            <a href="/thermohexa-datasheet.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="6" y="4" width="28" height="36" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" style={{ transition: "all 0.2s" }} /><line x1="12" y1="14" x2="28" y2="14" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><line x1="12" y1="20" x2="24" y2="20" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="12" y1="25" x2="26" y2="25" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><rect x="32" y="16" width="12" height="16" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" strokeDasharray="3 2" style={{ transition: "all 0.2s" }} /><circle cx="38" cy="24" r="4" className="stroke-white/30 group-hover:!stroke-[#dc2626]" strokeWidth="1" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "18px 20px 20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.datasheet")}</p>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", transition: "color 0.2s" }} className="text-white group-hover:!text-[#1d1d1f]">ThermoHexa</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub2")}</p>
                </div>
              </div>
            </a>
            <a href="/fxa-kullanim.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><path d="M24 8C20 6 14 5 6 6v30c8-1 14 0 18 2 4-2 10-3 18-2V6c-8-1-14 0-18 2z" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" strokeLinejoin="round" style={{ transition: "all 0.2s" }} /><line x1="24" y1="8" x2="24" y2="38" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><line x1="11" y1="14" x2="20" y2="14" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="11" y1="19" x2="19" y2="19" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="28" y1="14" x2="37" y2="14" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /><line x1="28" y1="19" x2="36" y2="19" className="stroke-white/30 group-hover:!stroke-[#dc2626]/50" strokeWidth="1" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "18px 20px 20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.kilavuz")}</p>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", transition: "color 0.2s" }} className="text-white group-hover:!text-[#1d1d1f]">FXA</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub1")}</p>
                </div>
              </div>
            </a>
            <a href="/katalog.pdf" target="_blank" rel="noopener noreferrer" className="group" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }} className="group-hover:!bg-white">
                <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", transition: "border-color 0.2s" }} className="group-hover:!border-[#e5e5e5]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><path d="M4 12h16l4-4h20v32H4V12z" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="2" strokeLinejoin="round" style={{ transition: "all 0.2s" }} /><line x1="4" y1="18" x2="44" y2="18" className="stroke-white/50 group-hover:!stroke-[#dc2626]" strokeWidth="1.5" style={{ transition: "all 0.2s" }} /><rect x="16" y="24" width="16" height="2" className="fill-white/20 group-hover:!fill-[#dc2626]/30" style={{ transition: "all 0.2s" }} /><rect x="18" y="30" width="12" height="2" className="fill-white/20 group-hover:!fill-[#dc2626]/30" style={{ transition: "all 0.2s" }} /></svg>
                </div>
                <div style={{ padding: "18px 20px 20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#dc2626]">{t("home.dokuman.katalog")}</p>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", transition: "color 0.2s" }} className="text-white group-hover:!text-[#1d1d1f]">Taytech Genel Katalog</h4>
                  <p style={{ fontSize: "12px", transition: "color 0.2s" }} className="text-white/40 group-hover:!text-[#86868b]">{t("home.dokuman.sub3")}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Çözümler Container */}
      <div className="w-full bg-white flex flex-col items-center relative overflow-hidden" style={{ marginTop: '13px', padding: '120px 0 0' }}>
        <span className="absolute text-xl font-medium smart-text" style={{ top: '5%', left: '7%', color: '#dc2626' }}>{t("home.bg.ticari")}</span>
        <span className="absolute text-xl font-medium smart-text" style={{ top: '15%', left: '5%', color: '#dc2626' }}>{t("home.bg.toplu")}</span>
        <span className="absolute text-xl font-medium smart-text" style={{ top: '25%', left: '7%', color: '#dc2626' }}>{t("home.bg.hastane")}</span>
        <span className="absolute text-xl font-medium smart-text" style={{ top: '5%', right: '7%', color: '#dc2626' }}>{t("home.bg.bakim")}</span>
        <span className="absolute text-xl font-medium smart-text" style={{ top: '15%', right: '5%', color: '#dc2626' }}>{t("home.bg.yeni")}</span>
        <span className="absolute text-xl font-medium smart-text" style={{ top: '25%', right: '7%', color: '#dc2626' }}>{t("home.bg.kazan")}</span>
        
        <h2 className="text-3xl md:text-4xl text-center mb-4 z-10" style={{ fontWeight: 450, color: '#dc2626' }}>{t("home.cozumler.title")}</h2>
        <p className="text-lg md:text-xl text-[#86868b] text-center z-10" style={{ marginBottom: '80px', fontWeight: 450 }}>{t("home.cozumler.desc")}</p>
        
        <div className="flex flex-col items-center gap-10 z-10">
          <div className="flex justify-center gap-14">
            <Building2 size={68} strokeWidth={1.5} color="#dc2626" />
            <HomeIcon size={68} strokeWidth={1.5} color="#dc2626" />
            <Heart size={68} strokeWidth={1.5} color="#dc2626" />
            <Hammer size={68} strokeWidth={1.5} color="#dc2626" />
            <Hospital size={68} strokeWidth={1.5} color="#dc2626" />
          </div>
          <div className="flex justify-center gap-14">
            <Flame size={68} strokeWidth={1.5} color="#dc2626" />
            <Dumbbell size={68} strokeWidth={1.5} color="#dc2626" />
            <Factory size={68} strokeWidth={1.5} color="#dc2626" />
            <GraduationCap size={68} strokeWidth={1.5} color="#dc2626" />
          </div>
          <Link href="/cozumler" className="mt-4 bg-[#dc2626] text-white text-base font-medium transition-all duration-300 hover:bg-[#b91c1c]" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '12px', paddingBottom: '12px', borderRadius: '20px', textDecoration: 'none' }}>
            {t("home.cozumler.btn")}
          </Link>
        </div>

        <div style={{ width: "100%", marginTop: "80px", padding: "0 13px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
            <Link href="/cozumler/toplu-konutlar" className="group" style={{ textDecoration: "none" }}>
              <div>
                <div style={{ position: "relative", height: "480px", overflow: "hidden" }}>
                  <Image src="/akıllısehir.jpg" alt={t("home.cozumler.toplu")} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="group-hover:!bg-[#dc2626]" style={{ padding: "28px 32px 36px", background: "white", transition: "background-color 0.3s" }}>
                  <p className="group-hover:!text-white/60" style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px", transition: "color 0.3s" }}>{t("home.cozumler.label")}</p>
                  <h3 className="group-hover:!text-white" style={{ fontSize: "26px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.2, marginBottom: "10px", transition: "color 0.3s" }}>{t("home.cozumler.toplu")}</h3>
                  <p className="group-hover:!text-white/70" style={{ fontSize: "15px", color: "#86868b", lineHeight: 1.6, transition: "color 0.3s" }}>{t("home.cozumler.topluDesc")}</p>
                </div>
              </div>
            </Link>
            <Link href="/cozumler/endustriyel-kazan-dairesi" className="group" style={{ textDecoration: "none" }}>
              <div>
                <div style={{ position: "relative", height: "480px", overflow: "hidden" }}>
                  <Image src="/kazan-dairesi.jpg" alt={t("home.cozumler.kazan")} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="group-hover:!bg-[#dc2626]" style={{ padding: "28px 32px 36px", background: "white", transition: "background-color 0.3s" }}>
                  <p className="group-hover:!text-white/60" style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px", transition: "color 0.3s" }}>{t("home.cozumler.label")}</p>
                  <h3 className="group-hover:!text-white" style={{ fontSize: "26px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.2, marginBottom: "10px", transition: "color 0.3s" }}>{t("home.cozumler.kazan")}</h3>
                  <p className="group-hover:!text-white/70" style={{ fontSize: "15px", color: "#86868b", lineHeight: 1.6, transition: "color 0.3s" }}>{t("home.cozumler.kazanDesc")}</p>
                </div>
              </div>
            </Link>
            <Link href="/cozumler/egitim-yapilari" className="group" style={{ textDecoration: "none" }}>
              <div>
                <div style={{ position: "relative", height: "480px", overflow: "hidden" }}>
                  <Image src="/okul.jpg" alt={t("home.cozumler.egitim")} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="group-hover:!bg-[#dc2626]" style={{ padding: "28px 32px 36px", background: "white", transition: "background-color 0.3s" }}>
                  <p className="group-hover:!text-white/60" style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px", transition: "color 0.3s" }}>{t("home.cozumler.label")}</p>
                  <h3 className="group-hover:!text-white" style={{ fontSize: "26px", fontWeight: 700, color: "#1d1d1f", lineHeight: 1.2, marginBottom: "10px", transition: "color 0.3s" }}>{t("home.cozumler.egitim")}</h3>
                  <p className="group-hover:!text-white/70" style={{ fontSize: "15px", color: "#86868b", lineHeight: 1.6, transition: "color 0.3s" }}>{t("home.cozumler.egitimDesc")}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Standartların Ötesinde */}
      <div className="w-full h-[650px] bg-white grid grid-cols-2" style={{ marginTop: '13px' }}>
        <div className="flex items-center justify-center">
          <div className="w-80 h-80 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at center, #ff6b6b 0%, #dc2626 50%, #991b1b 100%)' }}>
            <div className="grid grid-cols-2 gap-1">
              <Image src="/simge.png" alt="Simge" width={95} height={95} style={{ filter: 'brightness(0) invert(1)' }} />
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </div>
        </div>
        <div className="relative h-full px-16">
          <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 text-left">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ background: 'linear-gradient(to bottom right, #dc2626, #991b1b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t("home.standartlar.title")}
            </h2>
            <p className="text-xl text-[#424245] mb-12">{t("home.standartlar.desc")}</p>
            <div className="flex gap-10">
              <div>
                <span className="text-2xl font-bold text-[#dc2626]">ISO 9001:2015</span>
                <p className="text-base text-[#86868b] mt-2">{t("home.standartlar.iso1")}</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#dc2626]">ISO 14001:2015</span>
                <p className="text-base text-[#86868b] mt-2">{t("home.standartlar.iso2")}</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#dc2626]">ISO 45001:2018</span>
                <p className="text-base text-[#86868b] mt-2">{t("home.standartlar.iso3")}</p>
              </div>
            </div>
          </div>
          <div className="absolute left-16" style={{ bottom: '160px' }}>
            <Link href="/kurumsal" className="bg-[#dc2626] text-white text-sm font-medium transition-all duration-300 hover:bg-[#b91c1c] w-fit inline-block" style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '10px', paddingBottom: '10px', borderRadius: '0px' }}>
              {t("home.standartlar.btn")}
            </Link>
          </div>
        </div>
      </div>

      {/* Haberler */}
      <div className="w-full bg-white" style={{ marginTop: '13px', padding: '80px 100px' }}>
        <div className="flex items-center justify-between mb-20">
          <div>
            <h2 className="text-4xl font-bold text-[#dc2626] mb-2">{t("home.haberler.title")}</h2>
          </div>
          <Link href="/haberler" className="hover:bg-[#1d1d1f] hover:text-white transition-all duration-300" style={{ backgroundColor: 'transparent', color: '#1d1d1f', fontSize: '14px', fontWeight: 500, padding: '12px 24px', borderRadius: '0px', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(0,0,0,0.2)', marginTop: '-20px' }}>
            {t("home.haberler.btn")}
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 280px)', gap: '24px' }}>
          <div style={{ gridRow: 'span 2', borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="group">
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
          <div style={{ gridColumn: 'span 2', borderRadius: '16px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="group">
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
      
      <div style={{ height: '13px', backgroundColor: '#f5f5f7' }} />
      <Footer theme="white" />
    </div>
  );
}
