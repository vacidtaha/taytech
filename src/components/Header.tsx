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

const KP = "/urunler/kontrol-panelleri";
const BLES = "/urunler/enerji-yonetim-platformu";
const HN = "/urunler/heat-network";
const HIU = `${HN}/isi-istasyonlari`;

function m(tr: string, en: string, href: string, children?: MenuItem[]): MenuItem {
  return children ? { tr, en, href, children } : { tr, en, href };
}

const menuTree: MenuItem[] = [
  m("Motor Kontrol Panoları", "Motor Control Panels", KP, [
    m("Elektronik Kontrol Panelleri", "Electronic Control Panels", `${KP}/elektronik-kontrol-panelleri`, [
      m("Smart Serisi", "Smart Series", `${KP}/elektronik-kontrol-panelleri/smart-serisi`),
      m("Frekans İnvertör Serisi", "VFD Series", `${KP}/elektronik-kontrol-panelleri/frekans-invertor-serisi`),
      m("Soft Starter Serisi", "Soft Start Series", `${KP}/elektronik-kontrol-panelleri/soft-starter-serisi`),
    ]),
    m("Elektro Mekanik Paneller", "Electro Mechanical Panels", `${KP}/elektro-mekanik-paneller`, [
      m("Direkt Başlatma", "Direct Start", `${KP}/elektro-mekanik-paneller/direkt-baslatma`),
      m("Yıldız & Üçgen Başlatma", "Star & Delta Start", `${KP}/elektro-mekanik-paneller/yildiz-ucgen-baslatma`),
    ]),
    m("Yangın Pompa Kontrol Panoları", "Fire Fighting System Control Panels", `${KP}/yangin-pompa-kontrol-panolari`, [
      m("NFPA / UL & FM Serisi", "NFPA / UL & FM Series", `${KP}/yangin-pompa-kontrol-panolari/nfpa-ul-fm-serisi`, [
        m("Dizel Motor Kontrol Panosu", "Diesel Engine Driven", `${KP}/yangin-pompa-kontrol-panolari/nfpa-ul-fm-serisi/nfpa-dizel-motor-kontrol-panosu`),
        m("Elektrik Motor Kontrol Panosu", "Electric Motor Driven", `${KP}/yangin-pompa-kontrol-panolari/nfpa-ul-fm-serisi/nfpa-elektrik-motor-kontrol-panosu`),
        m("Jokey Pompa Kontrol Panosu", "Jockey Series", `${KP}/yangin-pompa-kontrol-panolari/nfpa-ul-fm-serisi/nfpa-jokey-pompa-kontrol-panosu`),
      ]),
      m("EN Serisi", "EN Series", `${KP}/yangin-pompa-kontrol-panolari/en-serisi`, [
        m("Dizel Serisi EN 12845", "Diesel Series EN 12845", `${KP}/yangin-pompa-kontrol-panolari/en-serisi/dizel-serisi-en-12845`),
        m("Elektrik Serisi EN 12845", "Electric Series EN 12845", `${KP}/yangin-pompa-kontrol-panolari/en-serisi/elektrik-serisi-en-12845`),
        m("Jokey Serisi", "Jockey Series", `${KP}/yangin-pompa-kontrol-panolari/en-serisi/jokey-serisi`),
      ]),
    ]),
  ]),
  m("Enerji Yönetim Platformu (BLES)", "Building Management System (BLES)", BLES, [
    m("Yazılım Platformu", "Software Platforms", `${BLES}/yazilim-platformu`),
    m("Veri Yönetim Cihazları", "Data Management Devices", `${BLES}/veri-yonetim-cihazlari`, [
      m("M-Bus Converter", "M-Bus Converter", `${BLES}/veri-yonetim-cihazlari/m-bus-converter`),
      m("TT Smart Box", "TT Smart Box", `${BLES}/veri-yonetim-cihazlari/ttsmart-box`),
      m("Data Logger", "Data Logger", `${BLES}/veri-yonetim-cihazlari/data-logger`),
      m("Gateway", "Gateway", `${BLES}/veri-yonetim-cihazlari/gateway`),
    ]),
  ]),
  m("Isı Ağları", "Heat Network", HN, [
    m("Isı İstasyonları", "Heat Interface Units", HIU, [
      m("SmartHexa Serisi", "SmartHexa Series", `${HIU}/smarthexa-serisi`, [
        m("Indirect SmartHexa", "Indirect SmartHexa", `${HIU}/smarthexa-serisi/indirect-smarthexa`, [
          m("Indirect SmartHexa DHW-SH", "Indirect SmartHexa DHW-SH", `${HIU}/smarthexa-serisi/indirect-smarthexa/indirect-smarthexa-dhw-sh`),
          m("Indirect SmartHexa SH", "Indirect SmartHexa SH", `${HIU}/smarthexa-serisi/indirect-smarthexa/indirect-smarthexa-sh`),
        ]),
        m("Direct SmartHexa", "Direct SmartHexa", `${HIU}/smarthexa-serisi/direct-smarthexa`, [
          m("Direct SmartHexa - DHW", "Direct SmartHexa - DHW", `${HIU}/smarthexa-serisi/direct-smarthexa/direct-smarthexa-dhw`),
          m("Direct SmartHexa - RH", "Direct SmartHexa - RH", `${HIU}/smarthexa-serisi/direct-smarthexa/direct-smarthexa-rh`),
          m("Direct SmartHexa - UFH", "Direct SmartHexa - UFH", `${HIU}/smarthexa-serisi/direct-smarthexa/direct-smarthexa-ufh`),
        ]),
      ]),
      m("HydroHexa Serisi", "HydroHexa Series", `${HIU}/hydrohexa-serisi`, [
        m("Indirect HydroHexa", "Indirect HydroHexa", `${HIU}/hydrohexa-serisi/indirect-hydrohexa`, [
          m("Indirect HydroHexa DHW-SH", "Indirect HydroHexa DHW-SH", `${HIU}/hydrohexa-serisi/indirect-hydrohexa/indirect-hydrohexa-dhw-sh`),
        ]),
        m("Direct HydroHexa", "Direct HydroHexa", `${HIU}/hydrohexa-serisi/direct-hydrohexa`, [
          m("Direct HydroHexa - DHW", "Direct HydroHexa - DHW", `${HIU}/hydrohexa-serisi/direct-hydrohexa/direct-hydrohexa-dhw`),
          m("Direct HydroHexa - RH", "Direct HydroHexa - RH", `${HIU}/hydrohexa-serisi/direct-hydrohexa/direct-hydrohexa-rh`),
          m("Direct HydroHexa - UFH", "Direct HydroHexa - UFH", `${HIU}/hydrohexa-serisi/direct-hydrohexa/direct-hydrohexa-ufh`),
        ]),
      ]),
      m("ThermoHexa Serisi", "ThermoHexa Series", `${HIU}/thermohexa-serisi`, [
        m("Indirect ThermoHexa", "Indirect ThermoHexa", `${HIU}/thermohexa-serisi/indirect-thermohexa`, [
          m("Indirect ThermoHexa DHW-SH", "Indirect ThermoHexa DHW-SH", `${HIU}/thermohexa-serisi/indirect-thermohexa/indirect-thermohexa-dhw-sh`),
          m("Indirect ThermoHexa SH", "Indirect ThermoHexa SH", `${HIU}/thermohexa-serisi/indirect-thermohexa/indirect-thermohexa-sh`),
        ]),
        m("Direct ThermoHexa", "Direct ThermoHexa", `${HIU}/thermohexa-serisi/direct-thermohexa`, [
          m("Direct ThermoHexa - DHW", "Direct ThermoHexa - DHW", `${HIU}/thermohexa-serisi/direct-thermohexa/direct-thermohexa-dhw`),
          m("Direct ThermoHexa - RH", "Direct ThermoHexa - RH", `${HIU}/thermohexa-serisi/direct-thermohexa/direct-thermohexa-rh`),
          m("Direct ThermoHexa - UFH", "Direct ThermoHexa - UFH", `${HIU}/thermohexa-serisi/direct-thermohexa/direct-thermohexa-ufh`),
        ]),
      ]),
    ]),
    m("Hydro EM Serisi", "Hydro EM Series", `${HIU}/hydro-em-serisi`, [
      m("Indirect Hydro EM DHW-SH", "Indirect Hydro EM DHW-SH", `${HIU}/hydro-em-serisi/indirect-hydro-em-dhw-sh`),
      m("Direct Hydro EM", "Direct Hydro EM", `${HIU}/hydro-em-serisi/direct-hydro-em`, [
        m("Direct Hydro EM RH", "Direct Hydro EM RH", `${HIU}/hydro-em-serisi/direct-hydro-em/direct-hydro-em-rh`),
        m("Direct Hydro EM UFH", "Direct Hydro EM UFH", `${HIU}/hydro-em-serisi/direct-hydro-em/direct-hydro-em-ufh`),
      ]),
    ]),
    m("Endüstriyel Isı İstasyonları", "Sub-Stations", `${HN}/endustriyel-isi-istasyonlari`, [
      m("Bölgesel Isıtma İstasyonları", "District Heating Substations", `${HN}/endustriyel-isi-istasyonlari/bolgesel-isitma-istasyonlari`),
      m("Bölgesel Soğutma İstasyonları", "District Cooling Substations", `${HN}/endustriyel-isi-istasyonlari/bolgesel-sogutma-istasyonlari`),
    ]),
    m("Sayaç İstasyonları", "Metering Stations", `${HN}/sayac-istasyonlari`, [
      m("Meter Tech - W1", "Meter Tech - W1", `${HN}/sayac-istasyonlari/meter-tech-w1`),
      m("Meter Tech - W2", "Meter Tech - W2", `${HN}/sayac-istasyonlari/meter-tech-w2`),
      m("Meter Tech - W3", "Meter Tech - W3", `${HN}/sayac-istasyonlari/meter-tech-w3`),
      m("Meter Tech - W4", "Meter Tech - W4", `${HN}/sayac-istasyonlari/meter-tech-w4`),
    ]),
    m("Manyetik Filtreler", "Magnetic Filters", `${HN}/manyetik-filtreler`, [
      m("IronTrap", "IronTrap", `${HN}/manyetik-filtreler/irontrap`),
      m("IronInox", "IronInox", `${HN}/manyetik-filtreler/ironinox`),
    ]),
    m("Aksesuarlar", "Accessories", `${HN}/aksesuarlar`, [
      m("İlk Montaj Kiti", "First Fix Rail Kit", `${HN}/aksesuarlar/ilk-montaj-kiti`),
      m("Bağlantı Kutuları", "Junction Boxes", `${HN}/aksesuarlar/baglanti-kutulari`),
      m("Re-Sirkülasyon Kitleri", "Re-Circulation Kits", `${HN}/aksesuarlar/re-sirkulasyon-kitleri`),
      m("Fark Basınç Vanası", "Differential Pressure Valve", `${HN}/aksesuarlar/fark-basinc-vanasi`),
      m("Termal By-Pass Vanası", "Thermal By-Pass Valve", `${HN}/aksesuarlar/termal-bypass-vanasi`),
      m("Kabin", "Cabinet", `${HN}/aksesuarlar/kabin`),
    ]),
    m("Sayaçlar", "Meters", `${HN}/sayaclar`, [
      m("Isıtma Kalorimetresi", "Heat Meter", `${HN}/sayaclar/isitma-kalorimetresi`),
      m("Soğutma Kalorimetresi", "Cooling Meter", `${HN}/sayaclar/sogutma-kalorimetresi`),
      m("Su Sayacı", "Water Meter", `${HN}/sayaclar/su-sayaci`),
    ]),
    m("Ön Ödemeli Sayaçlar", "Pre-paid Meters", `${HN}/on-odemeli-sayaclar`, [
      m("Ön Ödemeli Kalorimetre", "Pre-paid Heat Meter", `${HN}/on-odemeli-sayaclar/on-odemeli-kalorimetre`),
      m("Ön Ödemeli Su Sayacı", "Pre-paid Water Meter", `${HN}/on-odemeli-sayaclar/on-odemeli-su-sayaci`),
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

  // Rota değişince menüleri kapat (render sırasında state senkronizasyonu)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileStack([]);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Aktif menü değişince hover yolunu sıfırla
  const [prevActiveMenu, setPrevActiveMenu] = useState(activeMenu);
  if (prevActiveMenu !== activeMenu) {
    setPrevActiveMenu(activeMenu);
    setHoverPath(activeMenu === "Ürünler" ? [0] : []);
  }

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
  const l4Node = hoverPath.length >= 4 ? getAt(hoverPath.slice(0, 4)) : null;

  return (
    <>
      <header
        className={cn(
          "z-50 w-full transition-colors duration-300",
          isFixed ? "fixed top-0 left-0" : "relative",
          activeMenu || mobileOpen ? "bg-white" : isDark ? "bg-black/60 backdrop-blur-xl" : isFixed ? "bg-white/80 backdrop-blur-xl" : "bg-white",
        )}
      >
        <nav className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 lg:px-6">
          <Link href="/" className="shrink-0 flex items-center gap-2" onClick={closeMega}>
            <Image
              src="/taytechlogo.webp"
              alt="Taytech TR"
              width={180}
              height={100}
              priority
              className={cn("h-[60px] w-auto transition-all", activeMenu || !isDark ? "" : "brightness-0 invert")}
            />
            <Image
              src="/taytechuklogo.webp"
              alt="Taytech UK"
              width={180}
              height={100}
              priority
              className={cn("h-[60px] w-auto transition-all mt-1", activeMenu || !isDark ? "" : "brightness-0 invert")}
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
                <div className="w-[200px] shrink-0 py-8">
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
                      className="w-[220px] shrink-0 py-8"
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
                      className="w-[220px] shrink-0 py-8"
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
                      className={cn(has(l3Node) && l3Node.children!.some(c => has(c)) ? "w-[200px] shrink-0" : "flex-1", "py-8")}
                    >
                      <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        {ml(l3Node, locale)}
                      </p>
                      {l3Node.children!.map((item, n) => {
                        const leaf = isLeafProduct(item);
                        const disabled = leaf && !activeSlugs.has(getSlugFromHref(item.href));
                        if (disabled) {
                          return (
                            <span
                              key={item.tr}
                              onMouseEnter={() => setLevel(3, n)}
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
                            onMouseEnter={() => setLevel(3, n)}
                            onClick={closeMega}
                            className={cn(
                              "flex w-full items-center justify-between px-6 py-3 text-left text-[13px] transition-colors duration-150",
                              hoverPath[3] === n && has(item) ? "text-[#e30613]" : "text-[#424245] hover:text-[#e30613]",
                            )}
                          >
                            <span>{ml(item, locale)}</span>
                            {has(item) && (
                              <ChevronRight className={cn("h-3.5 w-3.5 transition-colors duration-150", hoverPath[3] === n ? "text-[#e30613]" : "text-[#c4c4c4]")} />
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {l4Node && has(l4Node) && (
                    <motion.div
                      key={`p5-${hoverPath[0]}-${hoverPath[1]}-${hoverPath[2]}-${hoverPath[3]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex-1 py-8"
                    >
                      <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                        {ml(l4Node, locale)}
                      </p>
                      {l4Node.children!.map((item) => {
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
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-30 bg-black/30 lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              key="mobile-menu"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-12 left-0 right-0 z-40 max-h-[80vh] overflow-y-auto bg-white shadow-xl lg:hidden"
              style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
            >
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  {mobileStack.length === 0 ? (
                    <motion.ul
                      key="root"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-0"
                    >
                      {navItems.map((item, idx) => {
                        const label = locale === "EN" ? item.en : item.tr;
                        return (
                          <motion.li
                            key={item.tr}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.04 }}
                          >
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
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  ) : (
                    <motion.div
                      key={`stack-${mobileStack.length}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
                        {mobileStack[mobileStack.length - 1].items.map((item, idx) => {
                          const leaf = isLeafProduct(item);
                          const disabled = leaf && !activeSlugs.has(getSlugFromHref(item.href));
                          return (
                            <motion.li
                              key={item.tr}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.03 }}
                            >
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
                            </motion.li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
