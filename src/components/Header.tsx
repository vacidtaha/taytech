"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const navItems = [
  { label: "Ürünler", href: "#", hasDropdown: true },
  { label: "Çözümler", href: "/cozumler", hasDropdown: false },
  { label: "Haberler", href: "/haberler", hasDropdown: false },
  { label: "Kurumsal", href: "/kurumsal", hasDropdown: false },
  { label: "İletişim", href: "/iletisim", hasDropdown: false },
];

const products = [
  { label: "Akıllı Kontrol Panoları", href: "/urunler/akilli-kontrol-panolari" },
  { label: "Isı İstasyonu Uygulamaları", href: "/urunler/isi-istasyonu" },
  { label: "Elektronik", href: "/urunler/elektronik" },
  { label: "Taytech Cloud", href: "/urunler/taytech-cloud" },
  { label: "IRONTRAP® Manyetik Filtre", href: "/urunler/manyetik-filtre" },
  { label: "IRONTRAP® Koruyucu ve Temizleyici Sıvılar", href: "/urunler/temizleyici-sivilar" },
];

const languages = [
  { code: "TR", label: "Türkçe" },
  { code: "EN", label: "English" },
];

const cloudItems = [
  { id: "c1", label: "Dataloger", href: "/urunler/taytech-cloud?urun=dataloger" },
  { id: "c2", label: "Dataloger Gateway", href: "/urunler/taytech-cloud?urun=dataloger-gateway" },
  { id: "c3", label: "GSM Modem", href: "/urunler/taytech-cloud?urun=gsm-modem" },
  { id: "c4", label: "RF Repater", href: "/urunler/taytech-cloud?urun=rf-repater" },
  { id: "c5", label: "M-Bus Converter", href: "/urunler/taytech-cloud?urun=m-bus-converter" },
];

const sivilarCategories = [
  { 
    label: "Koruyucu Sıvılar", 
    key: "koruyucu",
    href: "/urunler/temizleyici-sivilar/koruyucu",
    items: [
      { id: "ks1", label: "TP100+", href: "/urunler/temizleyici-sivilar/koruyucu?urun=tp100" },
      { id: "ks2", label: "TP120+", href: "/urunler/temizleyici-sivilar/koruyucu?urun=tp120" },
      { id: "ks3", label: "TP130+", href: "/urunler/temizleyici-sivilar/koruyucu?urun=tp130" },
    ]
  },
  { 
    label: "Temizleyici Sıvılar", 
    key: "temizleyici",
    href: "/urunler/temizleyici-sivilar/temizleyici",
    items: [
      { id: "ts1", label: "TC200+", href: "/urunler/temizleyici-sivilar/temizleyici?urun=tc200" },
      { id: "ts2", label: "TC210+", href: "/urunler/temizleyici-sivilar/temizleyici?urun=tc210" },
      { id: "ts3", label: "TC220+", href: "/urunler/temizleyici-sivilar/temizleyici?urun=tc220" },
    ]
  },
];

const elektronikCategories = [
  { 
    label: "Smart Endüstriyel Kontrolörler", 
    key: "smart-endustriyel",
    href: "/urunler/elektronik/smart-endustriyel",
    items: [
      { id: "se1", label: "Smart Grinder Kontrolörleri", href: "/urunler/elektronik/smart-endustriyel?urun=grinder" },
      { id: "se2", label: "Smart Hidrofor Kontrolörleri", href: "/urunler/elektronik/smart-endustriyel?urun=hidrofor" },
      { id: "se3", label: "Smart Atık Su Kontrolörleri", href: "/urunler/elektronik/smart-endustriyel?urun=atik-su" },
      { id: "se4", label: "Smart Derin Kuyu Kontrolörleri", href: "/urunler/elektronik/smart-endustriyel?urun=derin-kuyu" },
    ]
  },
  { 
    label: "Isı İstasyonu Elektronik Kontrolörleri", 
    key: "isi-istasyonu-kontrolorleri",
    href: "/urunler/elektronik/isi-istasyonu-kontrolorleri",
    items: [
      { id: "isk1", label: "ESS-86", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=ess-86" },
      { id: "isk2", label: "CHS18", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=chs18" },
      { id: "isk3", label: "DE10", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de10" },
      { id: "isk4", label: "DE15", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de15" },
      { id: "isk5", label: "DE20", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de20" },
      { id: "isk6", label: "DE25", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de25" },
      { id: "isk7", label: "DE30", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de30" },
    ]
  },
  { 
    label: "Yerden Isıtma Kontrolörleri", 
    key: "yerden-isitma",
    href: "/urunler/elektronik/yerden-isitma",
    items: [
      { id: "yi1", label: "T-Box Yerden Isıtma Kontrolörü", href: "/urunler/elektronik/yerden-isitma?urun=t-box" },
    ]
  },
];

const kontrolPanolariCategories = [
  { 
    label: "Elektronik Kontrol Panoları", 
    key: "elektronik",
    href: "/urunler/akilli-kontrol-panolari/elektronik",
    items: [
      { id: "e1", label: "Direct Start", href: "/urunler/akilli-kontrol-panolari/elektronik/direct-start" },
      { id: "e2", label: "İnvertör Yol Verme Panoları", href: "/urunler/akilli-kontrol-panolari/elektronik/invertor" },
      { id: "e3", label: "Soft Starter Yol Verme Panoları", href: "/urunler/akilli-kontrol-panolari/elektronik/soft-starter" },
      { id: "e4", label: "Yıldız / Üçgen Yol Verme Panoları", href: "/urunler/akilli-kontrol-panolari/elektronik/yildiz-ucgen" },
    ]
  },
  { 
    label: "Elektromekanik Kontrol Panoları", 
    key: "elektromekanik",
    href: "/urunler/akilli-kontrol-panolari/elektromekanik",
    items: [
      { id: "em1", label: "Doğrudan Yol Verme", href: "/urunler/akilli-kontrol-panolari/elektromekanik/dogrudan-yol-verme" },
      { id: "em2", label: "Yıldız / Üçgen Yol Verme", href: "/urunler/akilli-kontrol-panolari/elektromekanik/yildiz-ucgen" },
    ]
  },
  { 
    label: "Yangın Sistemleri Kontrol Panoları", 
    key: "yangin",
    href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri",
    items: [
      { id: "y1", label: "Jokey Serisi", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/jokey" },
      { id: "y2", label: "Elektrikli", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/elektrikli" },
      { id: "y3", label: "Dizel", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/dizel" },
    ]
  },
];

const isiIstasyonuSubCategories = {
  direct: {
    label: "Direct",
    href: "/urunler/isi-istasyonu/direct",
    items: [
      { id: "d1", label: "ThermoHexa", href: "/urunler/isi-istasyonu/direct?urun=thermohexa" },
      { id: "d2", label: "ThermoHexa-UVH", href: "/urunler/isi-istasyonu/direct?urun=thermohexa-uvh" },
      { id: "d3", label: "HydroHexa", href: "/urunler/isi-istasyonu/direct?urun=hydrohexa" },
      { id: "d4", label: "HydroHexa UVH", href: "/urunler/isi-istasyonu/direct?urun=hydrohexa-uvh" },
    ]
  },
  indirect: {
    label: "Indirect",
    href: "/urunler/isi-istasyonu/indirect",
    items: [
      { id: "i1", label: "Indirect HydroHexa", href: "/urunler/isi-istasyonu/indirect?urun=hydrohexa" },
      { id: "i2", label: "Indirect ThermoHexa", href: "/urunler/isi-istasyonu/indirect?urun=thermohexa" },
      { id: "i3", label: "Smart Hexa", href: "/urunler/isi-istasyonu/indirect?urun=smart-hexa" },
    ]
  }
};

interface HeaderProps {
  theme?: "dark" | "light";
  isFixed?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
}

export default function Header({ theme, isFixed = true, onMenuOpenChange }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TR");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpenInternal] = useState(false);
  
  // Wrapper function to call callback when menu state changes
  const setIsProductsOpen = (value: boolean) => {
    setIsProductsOpenInternal(value);
    onMenuOpenChange?.(value);
  };
  
  // Otomatik theme belirleme - ana sayfa ve ürün sayfalarında light
  const lightPages = ["/urunler/akilli-kontrol-panolari", "/urunler/isi-istasyonu", "/urunler/elektronik", "/urunler/taytech-cloud", "/urunler/manyetik-filtre", "/urunler/temizleyici-sivilar", "/iletisim", "/kurumsal", "/cozumler", "/haberler"];
  const isLightPage = pathname === "/" || lightPages.some(page => pathname?.startsWith(page));
  const autoTheme = isLightPage ? "light" : "dark";
  const isDark = (theme ?? autoTheme) === "dark";
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);
  const [hoveredPanoCategory, setHoveredPanoCategory] = useState<string | null>(null);
  const [hoveredElektronikCategory, setHoveredElektronikCategory] = useState<string | null>(null);
  const [hoveredSivilarCategory, setHoveredSivilarCategory] = useState<string | null>(null);
  // Alt ürünler için hover state'leri
  const [hoveredCloudItem, setHoveredCloudItem] = useState<string | null>(null);
  const [hoveredSivilarItem, setHoveredSivilarItem] = useState<string | null>(null);
  const [hoveredElektronikItem, setHoveredElektronikItem] = useState<string | null>(null);
  const [hoveredPanoItem, setHoveredPanoItem] = useState<string | null>(null);
  const [hoveredIsiItem, setHoveredIsiItem] = useState<string | null>(null);

  // Menüyü kapat fonksiyonu
  const closeMenu = () => {
    setIsProductsOpen(false);
    setHoveredProduct(null);
    setHoveredSubCategory(null);
    setHoveredPanoCategory(null);
    setHoveredElektronikCategory(null);
    setHoveredSivilarCategory(null);
    setHoveredCloudItem(null);
    setHoveredSivilarItem(null);
    setHoveredElektronikItem(null);
    setHoveredPanoItem(null);
    setHoveredIsiItem(null);
  };

  const currentLangLabel = languages.find(l => l.code === currentLang)?.label || "Türkçe";

  return (
    <>
      {/* Blur Backdrop - Sayfa içeriğini blurlar */}
      <AnimatePresence>
        {isProductsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut", delay: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut", delay: 0 } }}
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"
            style={{ top: "calc(48px + 42vh)" }}
          />
        )}
      </AnimatePresence>

      <header className={cn(isFixed ? "fixed top-0 left-0 right-0" : "relative", "z-50")}>
        {/* Main Header Bar */}
        <div className={cn(
          "h-12 transition-colors duration-200",
          isDark 
            ? (isProductsOpen ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/70 backdrop-blur-md")
            : (isProductsOpen ? "bg-white" : "bg-white/70 backdrop-blur-md")
        )}>
          <div className="h-full px-8 flex items-center justify-between">
            {/* Left Spacer */}
            <div className="hidden md:block w-[120px]"></div>

            {/* Center - Logo + Navigation */}
            <div className="flex items-center gap-20">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="TayTech Logo"
                  width={120}
                  height={28}
                  className="h-7 w-auto"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-20">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "relative",
                      item.hasDropdown && "pb-4 -mb-4"
                    )}
                    onMouseEnter={() => item.hasDropdown && setIsProductsOpen(true)}
                  >
                    {item.hasDropdown ? (
                      <span
                        className={cn(
                          "text-[15px] font-[450] transition-colors duration-75 cursor-pointer",
                          isDark 
                            ? "text-[#cacacc] hover:text-white" 
                            : "text-black hover:text-gray-600"
                        )}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "text-[15px] font-[450] transition-colors duration-75",
                          isDark 
                            ? "text-[#cacacc] hover:text-white" 
                            : "text-black hover:text-gray-600"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Side - Language Dropdown */}
            <div className="hidden md:flex items-center" style={{ marginRight: '100px' }}>
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={cn(
                    "flex items-center gap-1.5 text-[13px] font-[400] py-1 px-2 rounded transition-colors",
                    isDark 
                      ? "text-[#cacacc] hover:text-white" 
                      : "text-gray-500 hover:text-black"
                  )}
                >
                  <span>{currentLang.toUpperCase()}</span>
                  <svg 
                    width="10" 
                    height="10" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={cn("opacity-60 transition-transform", isLangOpen && "rotate-180")}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {isLangOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangOpen(false)}
                    />
                    <div
                      className={cn(
                        "absolute top-8 right-0 rounded-md py-1 min-w-[80px] z-50",
                        isDark 
                          ? "bg-[#333] shadow-lg" 
                          : "bg-white shadow-md border border-gray-100"
                      )}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setCurrentLang(lang.code); setIsLangOpen(false); }}
                          className={cn(
                            "block w-full px-3 py-1.5 text-[13px] text-left transition-colors",
                            isDark
                              ? (currentLang === lang.code 
                                  ? "text-white" 
                                  : "text-gray-400 hover:text-white hover:bg-white/10")
                              : (currentLang === lang.code 
                                  ? "text-black" 
                                  : "text-gray-500 hover:text-black hover:bg-gray-50")
                          )}
                        >
                          {lang.code.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Menüyü Aç"
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-white",
                  isMobileMenuOpen && "rotate-45 translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-white",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-white",
                  isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
                )}
              />
            </button>
          </div>
        </div>

        {/* Products Mega Menu */}
        <AnimatePresence>
          {isProductsOpen && (
            <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn("hidden md:block w-full overflow-hidden origin-top", isDark ? "bg-[#1a1a1a]" : "bg-white")}
            style={{ height: "42vh", willChange: "transform, opacity" }}
            onMouseLeave={() => {
              setIsProductsOpen(false);
              setHoveredProduct(null);
              setHoveredSubCategory(null);
              setHoveredPanoCategory(null);
              setHoveredElektronikCategory(null);
              setHoveredSivilarCategory(null);
              setHoveredCloudItem(null);
              setHoveredSivilarItem(null);
              setHoveredElektronikItem(null);
              setHoveredPanoItem(null);
              setHoveredIsiItem(null);
            }}
            >
              <div 
                className="h-full flex gap-24 items-center" 
                style={{ paddingLeft: 'calc(50% - 408px)' }}
              >
                {/* Sol Kolon - Ana Ürünler */}
                <div className="flex flex-col min-w-[280px]">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    className={cn("text-[12px] font-medium mb-20 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}
                  >
                    Ürünlerimiz
                  </motion.h3>
                  <div className="flex flex-col gap-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ duration: 1.2, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                        onMouseEnter={() => {
                          // Tüm alt menü hover state'lerini sıfırla
                          setHoveredSubCategory(null);
                          setHoveredPanoCategory(null);
                          setHoveredElektronikCategory(null);
                          setHoveredSivilarCategory(null);
                          setHoveredCloudItem(null);
                          setHoveredSivilarItem(null);
                          setHoveredElektronikItem(null);
                          setHoveredPanoItem(null);
                          setHoveredIsiItem(null);
                          
                          if (product.label === "Isı İstasyonu Uygulamaları") {
                            setHoveredProduct("isi-istasyonu");
                          } else if (product.label === "Akıllı Kontrol Panoları") {
                            setHoveredProduct("kontrol-panolari");
                          } else if (product.label === "Elektronik") {
                            setHoveredProduct("elektronik");
                          } else if (product.label === "Taytech Cloud") {
                            setHoveredProduct("cloud");
                          } else if (product.label === "IRONTRAP® Koruyucu ve Temizleyici Sıvılar") {
                            setHoveredProduct("sivilar");
                          } else if (product.label === "IRONTRAP® Manyetik Filtre") {
                            setHoveredProduct("manyetik-filtre");
                          } else {
                            setHoveredProduct(null);
                          }
                        }}
                      >
                        <Link
                          href={product.href}
                          onClick={closeMenu}
                          className={cn(
                            "text-xl font-medium transition-all duration-200 flex items-center gap-2",
                            isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-black",
                            hoveredProduct && (
                              (product.label === "Isı İstasyonu Uygulamaları" && hoveredProduct !== "isi-istasyonu") ||
                              (product.label === "Akıllı Kontrol Panoları" && hoveredProduct !== "kontrol-panolari") ||
                              (product.label === "Elektronik" && hoveredProduct !== "elektronik") ||
                              (product.label === "Taytech Cloud" && hoveredProduct !== "cloud") ||
                              (product.label === "IRONTRAP® Koruyucu ve Temizleyici Sıvılar" && hoveredProduct !== "sivilar") ||
                              (product.label === "IRONTRAP® Manyetik Filtre" && hoveredProduct !== "manyetik-filtre")
                            ) && "opacity-40"
                          )}
                        >
                          {product.label}
                          {(product.label === "Isı İstasyonu Uygulamaları" || product.label === "Akıllı Kontrol Panoları" || product.label === "Elektronik" || product.label === "Taytech Cloud" || product.label === "IRONTRAP® Koruyucu ve Temizleyici Sıvılar") && (
                            <ChevronRight size={16} className={cn(isDark ? "text-white/50" : "text-gray-400", "transition-opacity duration-200")} />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sıvılar Kategorileri */}
                {hoveredProduct === "sivilar" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[200px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Kategori
                    </h3>
                    <div className="flex flex-col gap-3">
                      {sivilarCategories.map((category) => (
                        <Link
                          key={category.key}
                          href={category.href}
                          onClick={closeMenu}
                          onMouseEnter={() => { setHoveredSivilarCategory(category.key); setHoveredSivilarItem(null); }}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <span className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark 
                              ? (hoveredSivilarCategory === category.key ? "text-white" : "text-white/90 hover:text-white")
                              : (hoveredSivilarCategory === category.key ? "text-black" : "text-gray-700 hover:text-black"),
                            hoveredSivilarCategory && hoveredSivilarCategory !== category.key && "opacity-40"
                          )}>
                            {category.label}
                          </span>
                          {category.items.length > 0 && (
                            <ChevronRight size={12} className={cn(isDark ? "text-white/50" : "text-gray-400", hoveredSivilarCategory && hoveredSivilarCategory !== category.key && "opacity-40")} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Sıvılar Alt Ürünleri */}
                {hoveredProduct === "sivilar" && hoveredSivilarCategory && (sivilarCategories.find(c => c.key === hoveredSivilarCategory)?.items?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[150px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Ürünler
                    </h3>
                    <div className="flex flex-col gap-3">
                      {sivilarCategories.find(c => c.key === hoveredSivilarCategory)?.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeMenu}
                          onMouseEnter={() => setHoveredSivilarItem(item.id)}
                          className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-black",
                            hoveredSivilarItem && hoveredSivilarItem !== item.id && "opacity-40"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Cloud Alt Menüsü */}
                {hoveredProduct === "cloud" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[200px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Ürünler
                    </h3>
                    <div className="flex flex-col gap-3">
                      {cloudItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeMenu}
                          onMouseEnter={() => setHoveredCloudItem(item.id)}
                          className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-black",
                            hoveredCloudItem && hoveredCloudItem !== item.id && "opacity-40"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Elektronik Kategorileri */}
                {hoveredProduct === "elektronik" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[280px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Kategori
                    </h3>
                    <div className="flex flex-col gap-3">
                      {elektronikCategories.map((category) => (
                        <Link
                          key={category.key}
                          href={category.href}
                          onClick={closeMenu}
                          onMouseEnter={() => { setHoveredElektronikCategory(category.key); setHoveredElektronikItem(null); }}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <span className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark 
                              ? (hoveredElektronikCategory === category.key ? "text-white" : "text-white/90 hover:text-white")
                              : (hoveredElektronikCategory === category.key ? "text-black" : "text-gray-700 hover:text-black"),
                            hoveredElektronikCategory && hoveredElektronikCategory !== category.key && "opacity-40"
                          )}>
                            {category.label}
                          </span>
                          {category.items.length > 0 && (
                            <ChevronRight size={12} className={cn(isDark ? "text-white/50" : "text-gray-400", hoveredElektronikCategory && hoveredElektronikCategory !== category.key && "opacity-40")} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Elektronik Alt Ürünleri */}
                {hoveredProduct === "elektronik" && hoveredElektronikCategory && (elektronikCategories.find(c => c.key === hoveredElektronikCategory)?.items?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[280px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Ürünler
                    </h3>
                    <div className="flex flex-col gap-3">
                      {elektronikCategories.find(c => c.key === hoveredElektronikCategory)?.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeMenu}
                          onMouseEnter={() => setHoveredElektronikItem(item.id)}
                          className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-black",
                            hoveredElektronikItem && hoveredElektronikItem !== item.id && "opacity-40"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Kontrol Panoları Kategorileri */}
                {hoveredProduct === "kontrol-panolari" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[280px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Kategori
                    </h3>
                    <div className="flex flex-col gap-3">
                      {kontrolPanolariCategories.map((category) => (
                        <Link
                          key={category.key}
                          href={category.href}
                          onClick={closeMenu}
                          onMouseEnter={() => { setHoveredPanoCategory(category.key); setHoveredPanoItem(null); }}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <span className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark 
                              ? (hoveredPanoCategory === category.key ? "text-white" : "text-white/90 hover:text-white")
                              : (hoveredPanoCategory === category.key ? "text-black" : "text-gray-700 hover:text-black"),
                            hoveredPanoCategory && hoveredPanoCategory !== category.key && "opacity-40"
                          )}>
                            {category.label}
                          </span>
                          {category.items.length > 0 && (
                            <ChevronRight size={12} className={cn(isDark ? "text-white/50" : "text-gray-400", hoveredPanoCategory && hoveredPanoCategory !== category.key && "opacity-40")} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Kontrol Panoları Alt Ürünleri */}
                {hoveredProduct === "kontrol-panolari" && hoveredPanoCategory && (kontrolPanolariCategories.find(c => c.key === hoveredPanoCategory)?.items?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[280px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Ürünler
                    </h3>
                    <div className="flex flex-col gap-3">
                      {kontrolPanolariCategories.find(c => c.key === hoveredPanoCategory)?.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeMenu}
                          onMouseEnter={() => setHoveredPanoItem(item.id)}
                          className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-black",
                            hoveredPanoItem && hoveredPanoItem !== item.id && "opacity-40"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Orta Kolon - Alt Kategoriler (Direct/Indirect) */}
                {hoveredProduct === "isi-istasyonu" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[120px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Kategori
                    </h3>
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/urunler/isi-istasyonu/direct"
                        onClick={closeMenu}
                        onMouseEnter={() => { setHoveredSubCategory("direct"); setHoveredIsiItem(null); }}
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <span className={cn(
                          "text-lg font-medium transition-all duration-200",
                          isDark 
                            ? (hoveredSubCategory === "direct" ? "text-white" : "text-white/90 hover:text-white")
                            : (hoveredSubCategory === "direct" ? "text-black" : "text-gray-700 hover:text-black"),
                          hoveredSubCategory && hoveredSubCategory !== "direct" && "opacity-40"
                        )}>
                          Direct
                        </span>
                        <ChevronRight size={12} className={cn(isDark ? "text-white/50" : "text-gray-400", hoveredSubCategory && hoveredSubCategory !== "direct" && "opacity-40")} />
                      </Link>
                      <Link
                        href="/urunler/isi-istasyonu/indirect"
                        onClick={closeMenu}
                        onMouseEnter={() => { setHoveredSubCategory("indirect"); setHoveredIsiItem(null); }}
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <span className={cn(
                          "text-lg font-medium transition-all duration-200",
                          isDark 
                            ? (hoveredSubCategory === "indirect" ? "text-white" : "text-white/90 hover:text-white")
                            : (hoveredSubCategory === "indirect" ? "text-black" : "text-gray-700 hover:text-black"),
                          hoveredSubCategory && hoveredSubCategory !== "indirect" && "opacity-40"
                        )}>
                          Indirect
                        </span>
                        <ChevronRight size={12} className={cn(isDark ? "text-white/50" : "text-gray-400", hoveredSubCategory && hoveredSubCategory !== "indirect" && "opacity-40")} />
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* Sağ Kolon - Ürünler (Direct/Indirect altındakiler) */}
                {(hoveredSubCategory === "direct" || hoveredSubCategory === "indirect") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col min-w-[180px]"
                  >
                    <h3 className={cn("text-[13px] font-medium mb-16 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}>
                      Ürünler
                    </h3>
                    <div className="flex flex-col gap-3">
                      {(hoveredSubCategory === "direct" 
                        ? isiIstasyonuSubCategories.direct.items 
                        : isiIstasyonuSubCategories.indirect.items
                      ).map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeMenu}
                          onMouseEnter={() => setHoveredIsiItem(item.id)}
                          className={cn(
                            "text-lg font-medium transition-all duration-200",
                            isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-black",
                            hoveredIsiItem && hoveredIsiItem !== item.id && "opacity-40"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-[#1a1a1a] border-t border-white/10 overflow-hidden"
            >
              <nav className="flex flex-col py-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.hasDropdown ? (
                      <span
                        onClick={() => setIsProductsOpen(true)}
                        className="block px-4 py-3 text-[15px] font-light text-white/90 hover:text-white hover:bg-white/5 transition-colors duration-75 cursor-pointer"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-[15px] font-light text-white/90 hover:text-white hover:bg-white/5 transition-colors duration-75"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
