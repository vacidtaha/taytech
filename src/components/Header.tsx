"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { labelKey: "nav.urunler", href: "#", hasDropdown: true, dropdownType: "products" as const },
  { labelKey: "nav.cozumler", href: "/cozumler", hasDropdown: false, dropdownType: null },
  { labelKey: "nav.dokuman", href: "/dokuman-merkezi", hasDropdown: false, dropdownType: null },
  { labelKey: "nav.haberler", href: "/haberler", hasDropdown: false, dropdownType: null },
  { labelKey: "nav.bilgi", href: "#", hasDropdown: true, dropdownType: "bilgi-merkezi" as const },
  { labelKey: "nav.kurumsal", href: "/kurumsal", hasDropdown: false, dropdownType: null },
  { labelKey: "nav.iletisim", href: "/iletisim", hasDropdown: false, dropdownType: null },
];

const bilgiMerkeziItems = [
  { labelKey: "mega.bilgi.video", href: "/bilgi-merkezi/video-arsivi" },
  { labelKey: "mega.bilgi.dokuman", href: "/dokuman-merkezi" },
  { labelKey: "mega.bilgi.sss", href: "/bilgi-merkezi/sikca-sorulan-sorular" },
  { labelKey: "mega.bilgi.destek", href: "/iletisim" },
  { labelKey: "mega.bilgi.akademi", href: "/bilgi-merkezi/taytech-akademi" },
];

const products = [
  { labelKey: "mega.prod.akilli", matchKey: "akilli", href: "/urunler/akilli-kontrol-panolari" },
  { labelKey: "mega.prod.isi", matchKey: "isi-istasyonu", href: "/urunler/isi-istasyonu" },
  { labelKey: "mega.prod.elektronik", matchKey: "elektronik", href: "/urunler/elektronik" },
  { labelKey: "mega.prod.cloud", matchKey: "cloud", href: "/urunler/taytech-cloud" },
  { labelKey: "mega.prod.manyetik", matchKey: "manyetik-filtre", href: "/urunler/manyetik-filtre" },
  { labelKey: "mega.prod.sivilar", matchKey: "sivilar", href: "/urunler/temizleyici-sivilar" },
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
  { labelKey: "mega.prod.koruyucu", key: "koruyucu", href: "/urunler/temizleyici-sivilar/koruyucu",
    items: [
      { id: "ks1", label: "TP100+", href: "/urunler/temizleyici-sivilar/koruyucu?urun=tp100" },
      { id: "ks2", label: "TP120+", href: "/urunler/temizleyici-sivilar/koruyucu?urun=tp120" },
      { id: "ks3", label: "TP130+", href: "/urunler/temizleyici-sivilar/koruyucu?urun=tp130" },
    ]
  },
  { labelKey: "mega.prod.temizleyici", key: "temizleyici", href: "/urunler/temizleyici-sivilar/temizleyici",
    items: [
      { id: "ts1", label: "TC200+", href: "/urunler/temizleyici-sivilar/temizleyici?urun=tc200" },
      { id: "ts2", label: "TC210+", href: "/urunler/temizleyici-sivilar/temizleyici?urun=tc210" },
      { id: "ts3", label: "TC220+", href: "/urunler/temizleyici-sivilar/temizleyici?urun=tc220" },
    ]
  },
];

const elektronikCategories = [
  { labelKey: "mega.prod.smartEnd", key: "smart-endustriyel", href: "/urunler/elektronik/smart-endustriyel",
    items: [
      { id: "se1", labelKey: "mega.prod.grinder", href: "/urunler/elektronik/smart-endustriyel?urun=grinder" },
      { id: "se2", labelKey: "mega.prod.hidrofor", href: "/urunler/elektronik/smart-endustriyel?urun=hidrofor" },
      { id: "se3", labelKey: "mega.prod.atikSu", href: "/urunler/elektronik/smart-endustriyel?urun=atik-su" },
      { id: "se4", labelKey: "mega.prod.derinKuyu", href: "/urunler/elektronik/smart-endustriyel?urun=derin-kuyu" },
    ]
  },
  { labelKey: "mega.prod.isiKontrol", key: "isi-istasyonu-kontrolorleri", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri",
    items: [
      { id: "isk1", labelKey: "ESS-86", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=ess-86" },
      { id: "isk2", labelKey: "CHS18", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=chs18" },
      { id: "isk3", labelKey: "DE10", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de10" },
      { id: "isk4", labelKey: "DE15", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de15" },
      { id: "isk5", labelKey: "DE20", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de20" },
      { id: "isk6", labelKey: "DE25", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de25" },
      { id: "isk7", labelKey: "DE30", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri?urun=de30" },
    ]
  },
  { labelKey: "mega.prod.yerden", key: "yerden-isitma", href: "/urunler/elektronik/yerden-isitma",
    items: [
      { id: "yi1", labelKey: "mega.prod.tboxYerden", href: "/urunler/elektronik/yerden-isitma?urun=t-box" },
    ]
  },
];

const kontrolPanolariCategories = [
  { labelKey: "mega.prod.elektronikPano", key: "elektronik", href: "/urunler/akilli-kontrol-panolari/elektronik",
    items: [
      { id: "e1", label: "Direct Start", href: "/urunler/akilli-kontrol-panolari/elektronik/direct-start" },
      { id: "e2", labelKey: "mega.prod.invertor", href: "/urunler/akilli-kontrol-panolari/elektronik/invertor" },
      { id: "e3", labelKey: "mega.prod.softStarter", href: "/urunler/akilli-kontrol-panolari/elektronik/soft-starter" },
      { id: "e4", labelKey: "mega.prod.yildizUcgen", href: "/urunler/akilli-kontrol-panolari/elektronik/yildiz-ucgen" },
    ]
  },
  { labelKey: "mega.prod.elektromekanikPano", key: "elektromekanik", href: "/urunler/akilli-kontrol-panolari/elektromekanik",
    items: [
      { id: "em1", labelKey: "mega.prod.dogrudan", href: "/urunler/akilli-kontrol-panolari/elektromekanik/dogrudan-yol-verme" },
      { id: "em2", labelKey: "mega.prod.yildizUcgenEM", href: "/urunler/akilli-kontrol-panolari/elektromekanik/yildiz-ucgen" },
    ]
  },
  { labelKey: "mega.prod.yanginPano", key: "yangin", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri",
    items: [
      { id: "y1", labelKey: "mega.prod.jokey", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/jokey" },
      { id: "y2", labelKey: "mega.prod.elektrikli", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/elektrikli" },
      { id: "y3", labelKey: "mega.prod.dizel", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri/dizel" },
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
  const { locale, setLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Drill-down mobil menü: "main" | "products" | "bilgi" | "akilli" | "isi" | "elektronik" | "cloud" | "sivilar" | sub detaylar
  const [mobileScreen, setMobileScreen] = useState<string>("main");
  const [mobileSubScreen, setMobileSubScreen] = useState<string | null>(null);
  const currentLang = locale;
  const setCurrentLang = (code: string) => setLocale(code as "TR" | "EN");
  const [isProductsOpen, setIsProductsOpenInternal] = useState(false);
  const [isBilgiMerkeziOpen, setIsBilgiMerkeziOpenInternal] = useState(false);
  
  // Wrapper function to call callback when menu state changes
  const setIsProductsOpen = (value: boolean) => {
    setIsProductsOpenInternal(value);
    onMenuOpenChange?.(value || isBilgiMerkeziOpen);
  };
  
  const setIsBilgiMerkeziOpen = (value: boolean) => {
    setIsBilgiMerkeziOpenInternal(value);
    onMenuOpenChange?.(value || isProductsOpen);
  };
  
  // Otomatik theme belirleme - ana sayfa ve ürün sayfalarında light
  const lightPages = ["/urunler/akilli-kontrol-panolari", "/urunler/isi-istasyonu", "/urunler/elektronik", "/urunler/taytech-cloud", "/urunler/manyetik-filtre", "/urunler/temizleyici-sivilar", "/iletisim", "/kurumsal", "/cozumler", "/haberler", "/bilgi-merkezi", "/dokuman-merkezi"];
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
  // Bilgi Merkezi hover state
  const [hoveredBilgiMerkeziItem, setHoveredBilgiMerkeziItem] = useState<string | null>(null);
  // Menüyü kapat fonksiyonu
  const closeMenu = () => {
    setIsProductsOpen(false);
    setIsBilgiMerkeziOpen(false);
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
    setHoveredBilgiMerkeziItem(null);
  };

  const currentLangLabel = languages.find(l => l.code === currentLang)?.label || "Türkçe";

  return (
    <>
      {/* Blur Backdrop - Sayfa içeriğini blurlar */}
      <AnimatePresence>
        {(isProductsOpen || isBilgiMerkeziOpen) && (
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
            ? ((isProductsOpen || isBilgiMerkeziOpen) ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/70 backdrop-blur-md")
            : "bg-white"
        )}>
          <div className="h-full px-5 md:px-8 flex items-center justify-between relative">
            {/* Mobile: Left spacer for centering logo */}
            <div className="w-10 md:hidden"></div>
            {/* Desktop: Left Spacer */}
            <div className="hidden md:block w-[120px]"></div>

            {/* Center - Logo + Navigation */}
            <div className="flex items-center gap-20 md:relative absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0">
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
              <nav className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <div
                    key={item.labelKey}
                    className={cn(
                      "relative",
                      item.hasDropdown && "pb-4 -mb-4"
                    )}
                    onMouseEnter={() => {
                      if (item.dropdownType === "products") {
                        setIsBilgiMerkeziOpen(false);
                        setHoveredBilgiMerkeziItem(null);
                        setIsProductsOpen(true);
                      } else if (item.dropdownType === "bilgi-merkezi") {
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
                        setIsBilgiMerkeziOpen(true);
                      }
                    }}
                  >
                    {item.hasDropdown ? (
                      <span
                        className={cn(
                          "text-[15px] font-[450] transition-colors duration-75 cursor-pointer",
                          isDark 
                            ? "text-[#cacacc] hover:text-[#dc2626]" 
                            : "text-black hover:text-[#dc2626]"
                        )}
                      >
                        {t(item.labelKey)}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "text-[15px] font-[450] transition-colors duration-75",
                          isDark 
                            ? "text-[#cacacc] hover:text-[#dc2626]" 
                            : "text-black hover:text-[#dc2626]"
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Side - Language Toggle */}
            <div className="hidden md:flex items-center gap-1" style={{ marginRight: '100px' }}>
              {languages.map((lang, i) => (
                <span key={lang.code} className="flex items-center">
                  <button
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      "text-[13px] font-[450] py-1 px-1.5 transition-colors",
                      currentLang === lang.code
                        ? (isDark ? "text-white" : "text-[#1d1d1f]")
                        : (isDark ? "text-[#cacacc]/40 hover:text-white" : "text-gray-400 hover:text-[#1d1d1f]")
                    )}
                  >
                    {lang.code}
                  </button>
                  {i < languages.length - 1 && (
                    <span className={cn("text-[11px] mx-0.5", isDark ? "text-[#cacacc]/30" : "text-gray-300")}>|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileMenuOpen) { setMobileScreen("main"); setMobileSubScreen(null); }
              }}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label="Menüyü Aç"
            >
              <span className={cn(
                "block w-[18px] h-[1.5px] rounded-full transition-all duration-300 origin-center",
                isDark ? "bg-white" : "bg-[#1d1d1f]",
                isMobileMenuOpen && "rotate-45 translate-y-[6.5px]"
              )} />
              <span className={cn(
                "block w-[18px] h-[1.5px] rounded-full transition-all duration-300",
                isDark ? "bg-white" : "bg-[#1d1d1f]",
                isMobileMenuOpen && "opacity-0 scale-0"
              )} />
              <span className={cn(
                "block w-[18px] h-[1.5px] rounded-full transition-all duration-300 origin-center",
                isDark ? "bg-white" : "bg-[#1d1d1f]",
                isMobileMenuOpen && "-rotate-45 -translate-y-[6.5px]"
              )} />
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
                    {t("mega.urunlerimiz")}
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
                          
                          if (product.matchKey === "isi-istasyonu") {
                            setHoveredProduct("isi-istasyonu");
                          } else if (product.matchKey === "akilli") {
                            setHoveredProduct("kontrol-panolari");
                          } else if (product.matchKey === "elektronik") {
                            setHoveredProduct("elektronik");
                          } else if (product.matchKey === "cloud") {
                            setHoveredProduct("cloud");
                          } else if (product.matchKey === "sivilar") {
                            setHoveredProduct("sivilar");
                          } else if (product.matchKey === "manyetik-filtre") {
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
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            // Seçili olan kırmızı
                            hoveredProduct && (
                              (product.matchKey === "isi-istasyonu" && hoveredProduct === "isi-istasyonu") ||
                              (product.matchKey === "akilli" && hoveredProduct === "kontrol-panolari") ||
                              (product.matchKey === "elektronik" && hoveredProduct === "elektronik") ||
                              (product.matchKey === "cloud" && hoveredProduct === "cloud") ||
                              (product.matchKey === "sivilar" && hoveredProduct === "sivilar") ||
                              (product.matchKey === "manyetik-filtre" && hoveredProduct === "manyetik-filtre")
                            ) && "!text-[#dc2626]",
                            // Seçili olmayan soluk
                            hoveredProduct && (
                              (product.matchKey === "isi-istasyonu" && hoveredProduct !== "isi-istasyonu") ||
                              (product.matchKey === "akilli" && hoveredProduct !== "kontrol-panolari") ||
                              (product.matchKey === "elektronik" && hoveredProduct !== "elektronik") ||
                              (product.matchKey === "cloud" && hoveredProduct !== "cloud") ||
                              (product.matchKey === "sivilar" && hoveredProduct !== "sivilar") ||
                              (product.matchKey === "manyetik-filtre" && hoveredProduct !== "manyetik-filtre")
                            ) && "opacity-40"
                          )}
                        >
                          {t(product.labelKey)}
                          {(product.matchKey === "isi-istasyonu" || product.matchKey === "akilli" || product.matchKey === "elektronik" || product.matchKey === "cloud" || product.matchKey === "sivilar") && (
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
                      {t("mega.kategori")}
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
                              ? (hoveredSivilarCategory === category.key ? "text-[#dc2626]" : "text-white/90 hover:text-[#dc2626]")
                              : (hoveredSivilarCategory === category.key ? "text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]"),
                            hoveredSivilarCategory && hoveredSivilarCategory !== category.key && "opacity-40"
                          )}>
                            {t(category.labelKey)}
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
                      {t("mega.urunler")}
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
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            hoveredSivilarItem && hoveredSivilarItem === item.id && "!text-[#dc2626]",
                            hoveredSivilarItem && hoveredSivilarItem !== item.id && "opacity-40"
                          )}
                        >
                          {t("labelKey" in item ? (item as { labelKey: string }).labelKey : ("label" in item ? (item as { label: string }).label : ""))}
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
                      {t("mega.urunler")}
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
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            hoveredCloudItem && hoveredCloudItem === item.id && "!text-[#dc2626]",
                            hoveredCloudItem && hoveredCloudItem !== item.id && "opacity-40"
                          )}
                        >
                          {t("labelKey" in item ? (item as { labelKey: string }).labelKey : ("label" in item ? (item as { label: string }).label : ""))}
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
                      {t("mega.kategori")}
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
                              ? (hoveredElektronikCategory === category.key ? "text-[#dc2626]" : "text-white/90 hover:text-[#dc2626]")
                              : (hoveredElektronikCategory === category.key ? "text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]"),
                            hoveredElektronikCategory && hoveredElektronikCategory !== category.key && "opacity-40"
                          )}>
                            {t(category.labelKey)}
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
                      {t("mega.urunler")}
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
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            hoveredElektronikItem && hoveredElektronikItem === item.id && "!text-[#dc2626]",
                            hoveredElektronikItem && hoveredElektronikItem !== item.id && "opacity-40"
                          )}
                        >
                          {t("labelKey" in item ? (item as { labelKey: string }).labelKey : ("label" in item ? (item as { label: string }).label : ""))}
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
                      {t("mega.kategori")}
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
                              ? (hoveredPanoCategory === category.key ? "text-[#dc2626]" : "text-white/90 hover:text-[#dc2626]")
                              : (hoveredPanoCategory === category.key ? "text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]"),
                            hoveredPanoCategory && hoveredPanoCategory !== category.key && "opacity-40"
                          )}>
                            {t(category.labelKey)}
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
                      {t("mega.urunler")}
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
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            hoveredPanoItem && hoveredPanoItem === item.id && "!text-[#dc2626]",
                            hoveredPanoItem && hoveredPanoItem !== item.id && "opacity-40"
                          )}
                        >
                          {t("labelKey" in item ? (item as { labelKey: string }).labelKey : ("label" in item ? (item as { label: string }).label : ""))}
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
                      {t("mega.kategori")}
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
                            ? (hoveredSubCategory === "direct" ? "text-[#dc2626]" : "text-white/90 hover:text-[#dc2626]")
                            : (hoveredSubCategory === "direct" ? "text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]"),
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
                            ? (hoveredSubCategory === "indirect" ? "text-[#dc2626]" : "text-white/90 hover:text-[#dc2626]")
                            : (hoveredSubCategory === "indirect" ? "text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]"),
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
                      {t("mega.urunler")}
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
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            hoveredIsiItem && hoveredIsiItem === item.id && "!text-[#dc2626]",
                            hoveredIsiItem && hoveredIsiItem !== item.id && "opacity-40"
                          )}
                        >
                          {t("labelKey" in item ? (item as { labelKey: string }).labelKey : ("label" in item ? (item as { label: string }).label : ""))}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bilgi Merkezi Mega Menu */}
        <AnimatePresence>
          {isBilgiMerkeziOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn("hidden md:block w-full overflow-hidden origin-top", isDark ? "bg-[#1a1a1a]" : "bg-white")}
              style={{ height: "42vh", willChange: "transform, opacity" }}
              onMouseLeave={() => {
                setIsBilgiMerkeziOpen(false);
                setHoveredBilgiMerkeziItem(null);
              }}
            >
              <div 
                className="h-full flex gap-24 items-center" 
                style={{ paddingLeft: 'calc(50% - 408px)' }}
              >
                {/* Sol Kolon - Başlık ve Açıklama */}
                <div className="flex flex-col min-w-[320px] max-w-[360px]">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    className={cn("text-[12px] font-medium mb-20 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}
                  >
                    {t("mega.bilgiMerkezi")}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
                  >
                    <h2 className="text-4xl font-bold mb-5 text-[#dc2626]">
                      {t("mega.bilgiMerkezi")}
                    </h2>
                    <p className={cn(
                      "text-lg leading-relaxed",
                      isDark ? "text-white/60" : "text-[#86868b]"
                    )}>
                      {t("mega.bilgiDesc")}
                    </p>
                  </motion.div>
                </div>

                {/* Sağ Kolon - Bağlantılar */}
                <div className="flex flex-col min-w-[280px]">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    className={cn("text-[12px] font-medium mb-20 tracking-wider", isDark ? "text-white/60" : "text-gray-400")}
                  >
                    {t("mega.kesfet")}
                  </motion.h3>
                  <div className="flex flex-col gap-4">
                    {bilgiMerkeziItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ duration: 1.2, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                        onMouseEnter={() => setHoveredBilgiMerkeziItem(item.href)}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            "text-xl font-medium transition-all duration-200 flex items-center gap-2",
                            isDark ? "text-white/90 hover:text-[#dc2626]" : "text-gray-700 hover:text-[#dc2626]",
                            hoveredBilgiMerkeziItem && hoveredBilgiMerkeziItem === item.href && "!text-[#dc2626]",
                            hoveredBilgiMerkeziItem && hoveredBilgiMerkeziItem !== item.href && "opacity-40"
                          )}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== MOBILE DRILL-DOWN MENU ========== */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed inset-0 top-12 z-50 bg-white overflow-hidden"
            >
              <div className="h-full overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>

                  {/* ====== SCREEN: MAIN ====== */}
                  {mobileScreen === "main" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      {navItems.map((item) => (
                        item.hasDropdown ? (
                          <button
                            key={item.labelKey}
                            onClick={() => setMobileScreen(item.dropdownType === "products" ? "products" : "bilgi")}
                            className="py-[18px]"
                          >
                            <span className="text-[26px] font-medium text-[#1d1d1f]">{t(item.labelKey)}</span>
                          </button>
                        ) : (
                          <Link
                            key={item.labelKey}
                            href={item.href}
                            onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                            className="py-[18px]"
                          >
                            <span className="text-[26px] font-medium text-[#1d1d1f]">{t(item.labelKey)}</span>
                          </Link>
                        )
                      ))}

                      {/* Dil Seçimi — İletişim'in altında */}
                      <div className="flex items-center gap-3 mt-10">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setCurrentLang(lang.code)}
                            className={cn(
                              "text-[15px] font-semibold w-11 h-11 rounded-full flex items-center justify-center transition-all",
                              currentLang === lang.code
                                ? "bg-[#1d1d1f] text-white"
                                : "bg-[#f5f5f7] text-[#86868b]"
                            )}
                          >
                            {lang.code}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ====== SCREEN: PRODUCTS ====== */}
                  {mobileScreen === "products" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => { setMobileScreen("main"); setMobileSubScreen(null); }} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("nav.urunler")}</span>
                      </button>

                      {products.map((product) => {
                        const hasChildren = ["akilli", "isi-istasyonu", "elektronik", "cloud", "sivilar"].includes(product.matchKey);
                        return hasChildren ? (
                          <button
                            key={product.href}
                            onClick={() => { setMobileScreen("sub-" + product.matchKey); setMobileSubScreen(null); }}
                            className="py-[14px]"
                          >
                            <span className="text-[24px] font-medium text-[#1d1d1f]">{t(product.labelKey)}</span>
                          </button>
                        ) : (
                          <Link
                            key={product.href}
                            href={product.href}
                            onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                            className="py-[14px]"
                          >
                            <span className="text-[24px] font-medium text-[#1d1d1f]">{t(product.labelKey)}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* ====== SCREEN: BILGI MERKEZI ====== */}
                  {mobileScreen === "bilgi" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => setMobileScreen("main")} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("nav.bilgi")}</span>
                      </button>
                      {bilgiMerkeziItems.map((bItem) => (
                        <Link key={bItem.href} href={bItem.href}
                          onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                          className="py-[14px]"
                        >
                          <span className="text-[24px] font-medium text-[#1d1d1f]">{t(bItem.labelKey)}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}

                  {/* ====== SCREEN: AKILLI KONTROL PANOLARI ====== */}
                  {mobileScreen === "sub-akilli" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => setMobileScreen("products")} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("mega.prod.akilli")}</span>
                      </button>
                      <div className="space-y-10 text-center">
                        {kontrolPanolariCategories.map((cat) => (
                          <div key={cat.key}>
                            <Link href={cat.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                              className="block text-[15px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-4">{t(cat.labelKey)}</Link>
                            <div className="space-y-3.5">
                              {cat.items.map((sub) => (
                                <Link key={sub.id} href={sub.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                                  className="block text-[20px] font-medium text-[#86868b]">
                                  {"labelKey" in sub ? t((sub as {labelKey:string}).labelKey) : ("label" in sub ? (sub as {label:string}).label : "")}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ====== SCREEN: ISI ISTASYONU ====== */}
                  {mobileScreen === "sub-isi-istasyonu" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => setMobileScreen("products")} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("mega.prod.isi")}</span>
                      </button>
                      <div className="space-y-10 text-center">
                        {Object.entries(isiIstasyonuSubCategories).map(([key, cat]) => (
                          <div key={key}>
                            <Link href={cat.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                              className="block text-[15px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-4">{cat.label}</Link>
                            <div className="space-y-3.5">
                              {cat.items.map((sub) => (
                                <Link key={sub.id} href={sub.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                                  className="block text-[20px] font-medium text-[#86868b]">{sub.label}</Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ====== SCREEN: ELEKTRONIK ====== */}
                  {mobileScreen === "sub-elektronik" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => setMobileScreen("products")} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("mega.prod.elektronik")}</span>
                      </button>
                      <div className="space-y-10 text-center">
                        {elektronikCategories.map((cat) => (
                          <div key={cat.key}>
                            <Link href={cat.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                              className="block text-[15px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-4">{t(cat.labelKey)}</Link>
                            <div className="space-y-3.5">
                              {cat.items.map((sub) => (
                                <Link key={sub.id} href={sub.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                                  className="block text-[20px] font-medium text-[#86868b]">
                                  {"labelKey" in sub ? t((sub as {labelKey:string}).labelKey) : ("label" in sub ? (sub as {label:string}).label : "")}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ====== SCREEN: CLOUD ====== */}
                  {mobileScreen === "sub-cloud" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => setMobileScreen("products")} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("mega.prod.cloud")}</span>
                      </button>
                      {cloudItems.map((sub) => (
                        <Link key={sub.id} href={sub.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                          className="py-[14px]"
                        >
                          <span className="text-[24px] font-medium text-[#1d1d1f]">{sub.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}

                  {/* ====== SCREEN: SIVILAR ====== */}
                  {mobileScreen === "sub-sivilar" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                      className="flex flex-col items-center justify-center min-h-full py-16 px-8"
                    >
                      <button onClick={() => setMobileScreen("products")} className="flex items-center gap-1.5 mb-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L4.5 7L9 11.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[14px] font-medium text-[#dc2626]">{t("mega.prod.sivilar")}</span>
                      </button>
                      <div className="space-y-10 text-center">
                        {sivilarCategories.map((cat) => (
                          <div key={cat.key}>
                            <Link href={cat.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                              className="block text-[15px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-4">{t(cat.labelKey)}</Link>
                            <div className="space-y-3.5">
                              {cat.items.map((sub) => (
                                <Link key={sub.id} href={sub.href} onClick={() => { setIsMobileMenuOpen(false); setMobileScreen("main"); }}
                                  className="block text-[20px] font-medium text-[#86868b]">{sub.label}</Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
