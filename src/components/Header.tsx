"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MenuItem {
  tr: string;
  en: string;
  href: string;
  children?: MenuItem[];
}

type Locale = "TR" | "EN";
function ml(item: MenuItem, locale: Locale) {
  return locale === "EN" ? item.en : item.tr;
}

const HN = "/urunler/heat-network";
const HIU = `${HN}/isi-istasyonlari`;
const ISE = "/urunler/isitma-sogutma-ekipmanlari";
const VYS = "/urunler/veri-yonetim-sistemleri";
const KS = "/urunler/kontrol-sistemleri";

function m(tr: string, en: string, href: string, children?: MenuItem[]): MenuItem {
  return children ? { tr, en, href, children } : { tr, en, href };
}

const menuTree: MenuItem[] = [
  m("Isı Şebekesi", "Heat Network", HN, [
    m("Isı İstasyonları (HIU)", "Heat Interface Units (HIU)", HIU, [
      m("SmartHexa Serisi", "SmartHexa Series", `${HIU}/smarthexa-series`, [
        m("Indirect SmartHexa", "Indirect SmartHexa", `${HIU}/smarthexa-series/indirect-smarthexa`),
        m("Direct SmartHexa - DHW", "Direct SmartHexa - DHW", `${HIU}/smarthexa-series/direct-smarthexa/direct-smarthexa-dhw`),
        m("Direct SmartHexa - RH", "Direct SmartHexa - RH", `${HIU}/smarthexa-series/direct-smarthexa/direct-smarthexa-rh`),
        m("Direct SmartHexa - UFH", "Direct SmartHexa - UFH", `${HIU}/smarthexa-series/direct-smarthexa/direct-smarthexa-ufh`),
      ]),
      m("Hydro-EM Serisi", "Hydro-EM Series", `${HIU}/hydro-em-series`, [
        m("Direct Hydro EM RH", "Direct Hydro EM RH", `${HIU}/hydro-em-series/direct-hydro-em-rh`),
        m("Direct Hydro EM UFH", "Direct Hydro EM UFH", `${HIU}/hydro-em-series/direct-hydro-em-ufh`),
      ]),
      m("HydroHexa Serisi", "HydroHexa Series", `${HIU}/hydrohexa-series`, [
        m("Indirect HydroHexa", "Indirect HydroHexa", `${HIU}/hydrohexa-series/indirect-hydrohexa`),
        m("Direct HydroHexa - DHW", "Direct HydroHexa - DHW", `${HIU}/hydrohexa-series/direct-hydrohexa/direct-hydrohexa-dhw`),
        m("Direct HydroHexa - RH", "Direct HydroHexa - RH", `${HIU}/hydrohexa-series/direct-hydrohexa/direct-hydrohexa-rh`),
        m("Direct HydroHexa - UFH", "Direct HydroHexa - UFH", `${HIU}/hydrohexa-series/direct-hydrohexa/direct-hydrohexa-ufh`),
      ]),
      m("ThermoHexa Serisi", "ThermoHexa Series", `${HIU}/thermohexa-series`, [
        m("Indirect ThermoHexa", "Indirect ThermoHexa", `${HIU}/thermohexa-series/indirect-thermohexa`),
        m("Direct ThermoHexa - DHW", "Direct ThermoHexa - DHW", `${HIU}/thermohexa-series/direct-thermohexa/direct-thermohexa-dhw`),
        m("Direct ThermoHexa - RH", "Direct ThermoHexa - RH", `${HIU}/thermohexa-series/direct-thermohexa/direct-thermohexa-rh`),
        m("Direct ThermoHexa - UFH", "Direct ThermoHexa - UFH", `${HIU}/thermohexa-series/direct-thermohexa/direct-thermohexa-ufh`),
      ]),
    ]),
    m("Endüstriyel Isı İstasyonları", "Industrial Heat Stations", `${HN}/endustriyel-isi-istasyonlari`, [
      m("Bölgesel Isıtma Alt İstasyonları", "District Heating Substations", `${HN}/endustriyel-isi-istasyonlari/district-heating-substations`),
      m("Bölgesel Soğutma Alt İstasyonları", "District Cooling Substations", `${HN}/endustriyel-isi-istasyonlari/district-cooling-substations`),
    ]),
    m("Sayaç İstasyonları", "Metering Stations", `${HN}/sayac-istasyonlari`, [
      m("Meter Tech - W1", "Meter Tech - W1", `${HN}/sayac-istasyonlari/meter-tech-w1`),
      m("Meter Tech - W2", "Meter Tech - W2", `${HN}/sayac-istasyonlari/meter-tech-w2`),
      m("Meter Tech - W3", "Meter Tech - W3", `${HN}/sayac-istasyonlari/meter-tech-w3`),
      m("Meter Tech - W4", "Meter Tech - W4", `${HN}/sayac-istasyonlari/meter-tech-w4`),
    ]),
    m("Veri Yönetim Sistemleri (BLES)", "Data Management Systems (BLES)", `${HN}/bles-heat-network`),
    m("Manyetik Filtreler (IRONTRAP)", "Magnetic Filters (IRONTRAP)", `${HN}/manyetik-filtreler`, [
      m("IronTrap", "IronTrap", `${HN}/manyetik-filtreler/irontrap`),
      m("IronInox", "IronInox", `${HN}/manyetik-filtreler/ironinox`),
    ]),
    m("Isı İstasyonu Aksesuarları", "HIU Accessories", `${HN}/isi-istasyonu-aksesuarlari`, [
      m("İlk Kurulum Kiti", "First Fix Rail Kit", `${HN}/isi-istasyonu-aksesuarlari/first-fix-rail-kit`),
      m("Bağlantı Kutuları", "Junction Boxes", `${HN}/isi-istasyonu-aksesuarlari/junction-boxes`),
      m("Re-Sirkülasyon Kitleri", "Re-Circulation Kits", `${HN}/isi-istasyonu-aksesuarlari/re-circulation-kits`),
      m("Fark Basınç Vanası", "Differential Pressure Valve", `${HN}/isi-istasyonu-aksesuarlari/differential-pressure-valve`),
      m("Termal By-Pass Vanası", "Thermal By-Pass Valve", `${HN}/isi-istasyonu-aksesuarlari/thermal-by-pass-valve`),
      m("Kabin", "Cabinet", `${HN}/isi-istasyonu-aksesuarlari/cabinet`),
    ]),
    m("Sayaçlar", "Meters", `${HN}/sayaclar`, [
      m("Isı Sayacı", "Heat Meter", `${HN}/sayaclar/heat-meter`),
      m("Soğutma Sayacı", "Cooling Meter", `${HN}/sayaclar/cooling-meter`),
      m("Su Sayacı", "Water Meter", `${HN}/sayaclar/water-meter`),
    ]),
  ]),
  m("Isıtma Soğutma Ekipmanları", "Heating & Cooling Equipment", ISE, [
    m("Termal Aktüatörler", "Thermal Actuators", `${ISE}/termal-aktuatorler`),
    m("Oda Termostatları", "Room Thermostats", `${ISE}/oda-termostatlari`),
    m("Karışım Vanaları", "Mixing Valves", `${ISE}/mixing-valves`),
    m("Kollektörler", "Manifolds", `${ISE}/manifolds`),
  ]),
  m("Veri Yönetim Sistemleri (BLES)", "Data Management Systems (BLES)", VYS, [
    m("Yazılım Platformları", "Software Platforms", `${VYS}/yazilim-platformlari`),
    m("Veri Yönetim Cihazları", "Data Management Devices", `${VYS}/veri-yonetim-cihazlari`, [
      m("M-Bus Converter", "M-Bus Converter", `${VYS}/veri-yonetim-cihazlari/m-bus-converter`),
      m("TTSmart Box", "TTSmart Box", `${VYS}/veri-yonetim-cihazlari/ttsmart-box`),
      m("Data Logger", "Data Logger", `${VYS}/veri-yonetim-cihazlari/data-logger`),
      m("Gateway", "Gateway", `${VYS}/veri-yonetim-cihazlari/gateway`),
    ]),
  ]),
  m("Kontrol Sistemleri", "Control Systems", KS, [
    m("Smart Serisi", "Smart Series", `${KS}/smart-serisi`, [
      m("Smart Booster", "Smart Booster", `${KS}/smart-serisi/smart-booster`),
      m("Smart Bore Hole", "Smart Bore Hole", `${KS}/smart-serisi/smart-bore-hole`),
      m("Smart Box", "Smart Box", `${KS}/smart-serisi/smart-box`),
      m("Smart Exclusive", "Smart Exclusive", `${KS}/smart-serisi/smart-exclusive`),
      m("Smart Grinder", "Smart Grinder", `${KS}/smart-serisi/smart-grinder`),
      m("Smart Wastewater", "Smart Wastewater", `${KS}/smart-serisi/smart-wastewater`),
    ]),
    m("Elektromekanik Panolar", "Electro Mechanical Panels", `${KS}/electro-mechanical-panels`, [
      m("Doğrudan Yol Verme", "Direct Start", `${KS}/electro-mechanical-panels/em-direct-start`),
      m("Yıldız Üçgen", "Star & Delta Start", `${KS}/electro-mechanical-panels/em-star-delta-start`),
    ]),
    m("Yangın Söndürme Sistem Kontrol Panoları", "Fire Fighting System Control Panels", `${KS}/fire-fighting-panels`, [
      m("NFPA / UL & FM Serisi", "NFPA / UL & FM Series", `${KS}/fire-fighting-panels/nfpa-ul-fm-series`, [
        m("Dizel Motor Tahrikli", "Diesel Engine Driven", `${KS}/fire-fighting-panels/nfpa-ul-fm-series/nfpa-diesel`),
        m("Elektrik Motor Tahrikli", "Electric Motor Driven", `${KS}/fire-fighting-panels/nfpa-ul-fm-series/nfpa-electric`),
        m("Jokey Serisi", "Jockey Series", `${KS}/fire-fighting-panels/nfpa-ul-fm-series/nfpa-jockey`),
      ]),
      m("EN Serisi", "EN Series", `${KS}/fire-fighting-panels/en-series`, [
        m("Dizel Serisi EN 12845", "Diesel Series EN 12845", `${KS}/fire-fighting-panels/en-series/diesel-en-12845`),
        m("Elektrik Serisi EN 12845", "Electric Series EN 12845", `${KS}/fire-fighting-panels/en-series/electric-en-12845`),
        m("Jokey Serisi", "Jockey Series", `${KS}/fire-fighting-panels/en-series/jockey-en-series`),
      ]),
    ]),
  ]),
];

const bilgiMerkeziItems: MenuItem[] = [
  m("SSS", "FAQ", "/bilgi-merkezi/sikca-sorulan-sorular"),
  m("Doküman Merkezi", "Document Center", "/dokuman-merkezi"),
  m("Teknik Destek", "Technical Support", "/iletisim"),
  m("Taytech Akademi", "Taytech Academy", "/bilgi-merkezi/taytech-akademi"),
  m("Video Arşivi", "Video Archive", "/bilgi-merkezi/video-arsivi"),
];

const navItems = [
  { tr: "Ürünler", en: "Products", hasDropdown: true },
  { tr: "Çözümler", en: "Solutions", href: "/cozumler" },
  { tr: "Doküman Merkezi", en: "Documents", href: "/dokuman-merkezi" },
  { tr: "Haberler", en: "News", href: "/haberler" },
  { tr: "Bilgi Merkezi", en: "Knowledge Base", hasDropdown: true },
  { tr: "Kurumsal", en: "Corporate", href: "/kurumsal" },
  { tr: "İletişim", en: "Contact", href: "/iletisim" },
];

const LIGHT_PATHS = ["/", "/urunler", "/iletisim", "/kurumsal", "/cozumler", "/haberler", "/bilgi-merkezi", "/dokuman-merkezi", "/gizlilik-politikasi", "/kullanim-kosullari", "/site-haritasi"];

function has(item: MenuItem): boolean {
  return !!item.children && item.children.length > 0;
}

function getAt(path: number[]): MenuItem | null {
  let current: MenuItem[] = menuTree;
  let node: MenuItem | null = null;
  for (const idx of path) {
    if (!current[idx]) return null;
    node = current[idx];
    current = node.children ?? [];
  }
  return node;
}

interface HeaderProps {
  theme?: "dark" | "light";
  isFixed?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
}

function isLeafProduct(item: MenuItem): boolean {
  return !item.children && item.href.startsWith("/urunler/") && item.href.split("/").length > 3;
}

function getSlugFromHref(href: string): string {
  const parts = href.split("/");
  return parts[parts.length - 1];
}

export default function Header({ theme, isFixed = true, onMenuOpenChange }: HeaderProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoverPath, setHoverPath] = useState<number[]>([0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStack, setMobileStack] = useState<{ title: string; items: MenuItem[] }[]>([]);
  const megaRef = useRef<HTMLDivElement>(null);
  const [activeSlugs, setActiveSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/active-products")
      .then((r) => r.json())
      .then((slugs: string[]) => setActiveSlugs(new Set(slugs)))
      .catch(() => {});
  }, []);

  const resolvedTheme = theme ?? (LIGHT_PATHS.some((p) => pathname === p || (p !== "/" && pathname.startsWith(p))) ? "light" : "dark");
  const isDark = resolvedTheme === "dark";
  const isMenuOpen = activeMenu !== null || mobileOpen;

  useEffect(() => { onMenuOpenChange?.(isMenuOpen); }, [isMenuOpen, onMenuOpenChange]);
  useEffect(() => { setActiveMenu(null); setMobileOpen(false); setMobileStack([]); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  useEffect(() => {
    if (activeMenu === "Ürünler") setHoverPath([0]);
    else setHoverPath([]);
  }, [activeMenu]);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleMegaClose = useCallback(() => {
    closeTimer.current = setTimeout(() => { setActiveMenu(null); setHoverPath([]); }, 120);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const closeMega = useCallback(() => { cancelMegaClose(); setActiveMenu(null); setHoverPath([]); }, [cancelMegaClose]);
  const closeMobile = useCallback(() => { setMobileOpen(false); setMobileStack([]); }, []);

  const setLevel = useCallback((level: number, index: number) => {
    setHoverPath((prev) => {
      const next = prev.slice(0, level);
      next[level] = index;
      return next;
    });
  }, []);

  const l1Node = getAt(hoverPath.slice(0, 1));
  const l2Node = hoverPath.length >= 2 ? getAt(hoverPath.slice(0, 2)) : null;
  const l3Node = hoverPath.length >= 3 ? getAt(hoverPath.slice(0, 3)) : null;

  return (
    <>
      <header
        className={cn(
          "z-50 w-full transition-colors duration-300",
          isFixed ? "fixed top-0 left-0" : "relative",
          activeMenu ? "bg-white/95 backdrop-blur-xl" : isDark ? "bg-black/60 backdrop-blur-xl" : "bg-white/80 backdrop-blur-xl",
        )}
      >
        <nav className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 lg:px-6">
          <Link href="/" className="shrink-0" onClick={closeMega}>
            <Image
              src={locale === "EN" ? "/taytechuklogo.webp" : "/taytechlogo.webp"}
              alt="Taytech"
              width={90}
              height={28}
              priority
              className={cn("h-7 w-auto transition-all", activeMenu || !isDark ? "" : "brightness-0 invert")}
            />
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const label = locale === "EN" ? item.en : item.tr;
              const key = item.tr;
              return (
                <li key={key}>
                  {item.hasDropdown ? (
                    <button
                      onMouseEnter={() => { cancelMegaClose(); setActiveMenu(key); }}
                      onMouseLeave={scheduleMegaClose}
                      onClick={() => setActiveMenu((prev) => (prev === key ? null : key))}
                      className={cn(
                        "text-[15px] font-normal transition-colors duration-150",
                        activeMenu === key ? "text-[#e30613]" : activeMenu || !isDark ? "text-[#1d1d1f] hover:text-[#e30613]" : "text-white/90 hover:text-white",
                      )}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      onMouseEnter={closeMega}
                      className={cn(
                        "text-[15px] font-normal transition-colors duration-150",
                        activeMenu || !isDark ? "text-[#1d1d1f] hover:text-[#e30613]" : "text-white/90 hover:text-white",
                      )}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "TR" ? "EN" : "TR")}
              className={cn("text-[13px] font-medium transition-colors", activeMenu || !isDark ? "text-[#1d1d1f] hover:text-[#e30613]" : "text-white/90 hover:text-white")}
            >
              {locale === "TR" ? "EN" : "TR"}
            </button>
            <button
              onClick={() => { closeMega(); setMobileOpen((v) => !v); }}
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label="Menu"
            >
              <span className={cn("block h-[1.5px] w-[18px] origin-center transition-all duration-300", mobileOpen ? "translate-y-[3.25px] rotate-45" : "", activeMenu || mobileOpen || !isDark ? "bg-[#1d1d1f]" : "bg-white")} />
              <span className={cn("block h-[1.5px] w-[18px] origin-center transition-all duration-300", mobileOpen ? "-translate-y-[3.25px] -rotate-45" : "", activeMenu || mobileOpen || !isDark ? "bg-[#1d1d1f]" : "bg-white")} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── DESKTOP MEGA MENU: ÜRÜNLER ── */}
      <AnimatePresence>
        {activeMenu === "Ürünler" && (
          <>
            <motion.div
              key="mega-products"
              ref={megaRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-12 right-0 left-0 z-40 hidden bg-white/95 shadow-lg backdrop-blur-xl lg:block"
              onMouseEnter={cancelMegaClose}
              onMouseLeave={scheduleMegaClose}
            >
              <div className="mx-auto flex max-w-[1200px] min-h-[480px]">
                {/* Panel 1 — Ana kategoriler */}
                <div className="w-[240px] shrink-0 py-8">
                  {menuTree.map((l1, i) => (
                    <button
                      key={l1.tr}
                      onMouseEnter={() => setLevel(0, i)}
                      onClick={() => { closeMega(); window.location.href = l1.href; }}
                      className={cn(
                        "flex w-full items-center justify-between px-6 py-3.5 text-left text-[14px] font-medium transition-colors duration-150",
                        hoverPath[0] === i ? "text-[#e30613]" : "text-[#1d1d1f]",
                      )}
                    >
                      <span>{ml(l1, locale)}</span>
                      <ChevronRight className={cn("h-4 w-4 transition-colors duration-150", hoverPath[0] === i ? "text-[#e30613]" : "text-[#c4c4c4]")} />
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {l1Node && has(l1Node) && (
                    <motion.div
                      key={`p2-${hoverPath[0]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="w-[260px] shrink-0 py-8"
                    >
                      <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        {ml(l1Node, locale)}
                      </p>
                      {l1Node.children!.map((item, j) => {
                        const leaf = isLeafProduct(item);
                        const disabled = leaf && !activeSlugs.has(getSlugFromHref(item.href));
                        if (disabled) {
                          return (
                            <span
                              key={item.tr}
                              onMouseEnter={() => setLevel(1, j)}
                              className="flex w-full items-center justify-between px-6 py-3 text-left text-[13px] text-[#424245] cursor-default"
                            >
                              <span>{ml(item, locale)}</span>
                            </span>
                          );
                        }
                        return (
                          <Link
                            key={item.tr}
                            href={item.href}
                            onMouseEnter={() => setLevel(1, j)}
                            onClick={closeMega}
                            className={cn(
                              "flex w-full items-center justify-between px-6 py-3 text-left text-[13px] transition-colors duration-150",
                              hoverPath[1] === j && has(item) ? "text-[#e30613]" : "text-[#424245] hover:text-[#e30613]",
                            )}
                          >
                            <span>{ml(item, locale)}</span>
                            {has(item) && (
                              <ChevronRight className={cn("h-3.5 w-3.5 transition-colors duration-150", hoverPath[1] === j ? "text-[#e30613]" : "text-[#c4c4c4]")} />
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {l2Node && has(l2Node) && (
                    <motion.div
                      key={`p3-${hoverPath[0]}-${hoverPath[1]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="w-[260px] shrink-0 py-8"
                    >
                      <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        {ml(l2Node, locale)}
                      </p>
                      {l2Node.children!.map((item, k) => {
                        const leaf = isLeafProduct(item);
                        const disabled = leaf && !activeSlugs.has(getSlugFromHref(item.href));
                        if (disabled) {
                          return (
                            <span
                              key={item.tr}
                              onMouseEnter={() => setLevel(2, k)}
                              className="flex w-full items-center justify-between px-6 py-3 text-left text-[13px] text-[#424245] cursor-default"
                            >
                              <span>{ml(item, locale)}</span>
                            </span>
                          );
                        }
                        return (
                          <Link
                            key={item.tr}
                            href={item.href}
                            onMouseEnter={() => setLevel(2, k)}
                            onClick={closeMega}
                            className={cn(
                              "flex w-full items-center justify-between px-6 py-3 text-left text-[13px] transition-colors duration-150",
                              hoverPath[2] === k && has(item) ? "text-[#e30613]" : "text-[#424245] hover:text-[#e30613]",
                            )}
                          >
                            <span>{ml(item, locale)}</span>
                            {has(item) && (
                              <ChevronRight className={cn("h-3.5 w-3.5 transition-colors duration-150", hoverPath[2] === k ? "text-[#e30613]" : "text-[#c4c4c4]")} />
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {l3Node && has(l3Node) && (
                    <motion.div
                      key={`p4-${hoverPath[0]}-${hoverPath[1]}-${hoverPath[2]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex-1 py-8"
                    >
                      <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        {ml(l3Node, locale)}
                      </p>
                      {l3Node.children!.map((item) => {
                        const leaf = isLeafProduct(item);
                        const disabled = leaf && !activeSlugs.has(getSlugFromHref(item.href));
                        if (disabled) {
                          return (
                            <span
                              key={item.tr}
                              className="block px-6 py-3 text-[13px] text-[#424245] cursor-default"
                            >
                              {ml(item, locale)}
                            </span>
                          );
                        }
                        return (
                          <Link
                            key={item.tr}
                            href={item.href}
                            onClick={closeMega}
                            className="block px-6 py-3 text-[13px] text-[#424245] transition-colors duration-150 hover:text-[#e30613]"
                          >
                            {ml(item, locale)}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              key="overlay-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 hidden bg-black/20 lg:block"
              onClick={closeMega}
            />
          </>
        )}

        {activeMenu === "Bilgi Merkezi" && (
          <>
            <motion.div
              key="dropdown-bilgi"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-12 right-0 left-0 z-40 hidden bg-white/95 shadow-sm backdrop-blur-xl lg:block"
              onMouseEnter={cancelMegaClose}
              onMouseLeave={scheduleMegaClose}
            >
              <div className="mx-auto max-w-[1200px] px-6 py-6">
                <ul className="flex gap-8">
                  {bilgiMerkeziItems.map((item) => (
                    <li key={item.tr}>
                      <Link href={item.href} onClick={closeMega} className="text-[15px] text-[#424245] transition-colors duration-150 hover:text-[#e30613]">
                        {ml(item, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              key="overlay-bilgi"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 hidden bg-black/20 lg:block"
              onClick={closeMega}
            />
          </>
        )}
      </AnimatePresence>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white pt-12 lg:hidden"
          >
            <div className="px-6 py-6">
              <AnimatePresence mode="wait">
                {mobileStack.length === 0 ? (
                  <motion.ul
                    key="root"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-0"
                  >
                    {navItems.map((item) => {
                      const label = locale === "EN" ? item.en : item.tr;
                      return (
                        <li key={item.tr}>
                          {item.hasDropdown ? (
                            <button
                              onClick={() => {
                                if (item.tr === "Ürünler") {
                                  setMobileStack([{ title: locale === "EN" ? "Products" : "Ürünler", items: menuTree }]);
                                } else {
                                  setMobileStack([{ title: locale === "EN" ? "Knowledge Base" : "Bilgi Merkezi", items: bilgiMerkeziItems }]);
                                }
                              }}
                              className="flex w-full items-center justify-between py-3.5 text-[17px] font-semibold text-[#1d1d1f]"
                            >
                              {label}
                              <ChevronRight className="h-5 w-5 text-[#c4c4c4]" />
                            </button>
                          ) : (
                            <Link href={item.href!} onClick={closeMobile} className="block py-3.5 text-[17px] font-semibold text-[#1d1d1f]">
                              {label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </motion.ul>
                ) : (
                  <motion.div
                    key={`stack-${mobileStack.length}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.15 }}
                  >
                    <button
                      onClick={() => setMobileStack((s) => s.slice(0, -1))}
                      className="mb-3 flex items-center gap-1 text-[13px] text-[#e30613]"
                    >
                      <ChevronLeft className="h-4 w-4" /> {locale === "EN" ? "Back" : "Geri"}
                    </button>
                    <h2 className="mb-5 text-[22px] font-bold text-[#1d1d1f]">
                      {mobileStack[mobileStack.length - 1].title}
                    </h2>
                    <ul className="space-y-0">
                      {mobileStack[mobileStack.length - 1].items.map((item) => {
                        const leaf = isLeafProduct(item);
                        const disabled = leaf && !activeSlugs.has(getSlugFromHref(item.href));
                        return (
                          <li key={item.tr}>
                            {has(item) ? (
                              <button
                                onClick={() => setMobileStack((s) => [...s, { title: ml(item, locale), items: item.children! }])}
                                className="flex w-full items-center justify-between py-3.5 text-[15px] text-[#1d1d1f]"
                              >
                                {ml(item, locale)}
                                <ChevronRight className="h-4 w-4 text-[#c4c4c4]" />
                              </button>
                            ) : disabled ? (
                              <span className="block py-3.5 text-[15px] text-[#1d1d1f] cursor-default">
                                {ml(item, locale)}
                              </span>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={closeMobile}
                                className="block py-3.5 text-[15px] text-[#1d1d1f] transition-colors duration-150 hover:text-[#e30613]"
                              >
                                {ml(item, locale)}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
