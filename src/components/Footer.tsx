"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  theme?: "dark" | "light" | "white";
}

export default function Footer({ theme = "dark" }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isLight = theme === "light" || theme === "white";
  const isWhite = theme === "white";

  const footerLinks = {
    urunler: [
      { 
        name: "Akıllı Kontrol Panoları", 
        categories: [
          { name: "Elektronik Kontrol Panoları", href: "/urunler/akilli-kontrol-panolari/elektronik" },
          { name: "Elektromekanik Kontrol Panoları", href: "/urunler/akilli-kontrol-panolari/elektromekanik" },
          { name: "Yangın Sistemleri", href: "/urunler/akilli-kontrol-panolari/yangin-sistemleri" },
        ]
      },
      { 
        name: "Isı İstasyonu Uygulamaları", 
        categories: [
          { name: "Direct", href: "/urunler/isi-istasyonu/direct" },
          { name: "Indirect", href: "/urunler/isi-istasyonu/indirect" },
        ]
      },
      { 
        name: "Elektronik", 
        categories: [
          { name: "Smart Endüstriyel Kontrolörler", href: "/urunler/elektronik/smart-endustriyel" },
          { name: "Isı İstasyonu Kontrolörleri", href: "/urunler/elektronik/isi-istasyonu-kontrolorleri" },
          { name: "Yerden Isıtma Kontrolörleri", href: "/urunler/elektronik/yerden-isitma" },
        ]
      },
      { 
        name: "Taytech Cloud", 
        categories: [
          { name: "Dataloger", href: "/urunler/taytech-cloud?urun=dataloger" },
          { name: "GSM Modem", href: "/urunler/taytech-cloud?urun=gsm-modem" },
          { name: "M-Bus Converter", href: "/urunler/taytech-cloud?urun=m-bus-converter" },
        ]
      },
      { 
        name: "IRONTRAP® Manyetik Filtre", 
        categories: [
          { name: "IRONTRAP® Manyetik Filtre", href: "/urunler/manyetik-filtre" },
        ]
      },
      { 
        name: "IRONTRAP® Sıvılar", 
        categories: [
          { name: "Koruyucu Sıvılar", href: "/urunler/temizleyici-sivilar/koruyucu" },
          { name: "Temizleyici Sıvılar", href: "/urunler/temizleyici-sivilar/temizleyici" },
        ]
      },
    ],
    cozumler: [
      { name: "Akıllı Bina", href: "/cozumler/akilli-bina" },
      { name: "Akıllı Şehir", href: "/cozumler/akilli-sehir" },
      { name: "Akıllı Tarım", href: "/cozumler/akilli-tarim" },
      { name: "Akıllı Enerji", href: "/cozumler/akilli-enerji" },
      { name: "Akıllı Mağaza", href: "/cozumler/akilli-magaza" },
      { name: "Akıllı Taşıma", href: "/cozumler/akilli-tasima" },
      { name: "Akıllı Güvenlik", href: "/cozumler/akilli-guvenlik" },
      { name: "Akıllı İşletme", href: "/cozumler/akilli-isletme" },
    ],
    kurumsal: [
      { name: "Hakkımızda", href: "/kurumsal" },
      { name: "Haberler", href: "/haberler" },
      { name: "İletişim", href: "/iletisim" },
    ],
  };

  const colors = {
    bg: isWhite ? '#ffffff' : (isLight ? '#f5f5f7' : '#1a1a1a'),
    heading: isLight ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
    link: isLight ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
    linkHover: isLight ? '#000000' : '#ffffff',
    border: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    separator: isLight ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
    logoFilter: isLight ? 'none' : 'brightness(0) invert(1)',
  };

  return (
    <footer style={{ backgroundColor: colors.bg }}>
      {/* Main Footer Content */}
      <div style={{ 
        paddingLeft: '300px', 
        paddingRight: '300px', 
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>
        {/* Links and Logo Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Links Column */}
          <div>
            {/* Ürünler */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '24px 60px'
              }}>
                {footerLinks.urunler.map((urun) => (
                  <div key={urun.name}>
                    <h5 style={{ 
                      fontSize: '14px', 
                      fontWeight: 400, 
                      color: colors.heading,
                      marginBottom: '10px'
                    }}>
                      {urun.name}
                    </h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {urun.categories.map((cat) => (
                        <li key={cat.name} style={{ marginBottom: '6px' }}>
                          <Link 
                            href={cat.href}
                            style={{ 
                              fontSize: '14px', 
                              fontWeight: 400, 
                              color: colors.link,
                              textDecoration: 'none'
                            }}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Çözümler */}
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: 400, 
                color: colors.heading,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Çözümler
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px 40px'
              }}>
                {footerLinks.cozumler.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: 400, 
                      color: colors.link,
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = colors.linkHover}
                    onMouseOut={(e) => e.currentTarget.style.color = colors.link}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Kurumsal */}
            <div>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: 400, 
                color: colors.heading,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Kurumsal
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.kurumsal.map((link) => (
                  <li key={link.name} style={{ marginBottom: '12px' }}>
                    <Link 
                      href={link.href}
                      style={{ 
                        fontSize: '14px', 
                        fontWeight: 400, 
                        color: colors.link,
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = colors.linkHover}
                      onMouseOut={(e) => e.currentTarget.style.color = colors.link}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Big Logo on Right - vertically centered */}
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Image
              src="/logo.png"
              alt="TayTech Logo"
              width={450}
              height={140}
              style={{ 
                filter: colors.logoFilter,
                opacity: 1
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        borderTop: `1px solid ${colors.border}`,
        paddingLeft: '300px',
        paddingRight: '300px',
        paddingTop: '24px',
        paddingBottom: '24px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ 
              fontSize: '15px', 
              fontWeight: 400, 
              color: colors.heading
            }}>
              © {currentYear} Taytech Otomasyon ve Bilişim A.Ş. Tüm hakları saklıdır.
            </span>
            <span style={{ color: colors.separator, fontSize: '15px' }}>|</span>
            <Link 
              href="#"
              style={{ 
                fontSize: '15px', 
                fontWeight: 400, 
                color: colors.heading,
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              Gizlilik Politikası
            </Link>
            <span style={{ color: colors.separator, fontSize: '15px' }}>|</span>
            <Link 
              href="#"
              style={{ 
                fontSize: '15px', 
                fontWeight: 400, 
                color: colors.heading,
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              Kullanım Koşulları
            </Link>
            <span style={{ color: colors.separator, fontSize: '15px' }}>|</span>
            <Link 
              href="#"
              style={{ 
                fontSize: '15px', 
                fontWeight: 400, 
                color: colors.heading,
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              Site Haritası
            </Link>
          </div>
          
          {/* Sosyal Medya */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link 
              href="https://www.linkedin.com/company/taytech" 
              target="_blank"
              style={{ color: colors.heading, transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.instagram.com/taytechotomasyon" 
              target="_blank"
              style={{ color: colors.heading, transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.facebook.com/taytechotomasyon" 
              target="_blank"
              style={{ color: colors.heading, transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link 
              href="https://twitter.com/taytechotomasyon" 
              target="_blank"
              style={{ color: colors.heading, transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = colors.link}
              onMouseOut={(e) => e.currentTarget.style.color = colors.heading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
