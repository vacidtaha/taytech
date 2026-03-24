import type { Metadata, Viewport } from "next";
import SiteShell from "@/components/SiteShell";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1d1f" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Taytech | Akıllı Kontrol Panoları & Isı İstasyonları",
    template: "%s | Taytech",
  },
  description: "Taytech, akıllı kontrol panoları, ısı istasyonları, manyetik filtre, elektronik kontrolörler ve Taytech Cloud ile endüstriyel otomasyon çözümleri sunan ISO sertifikalı Türk üreticisidir. Gebze, Kocaeli.",
  keywords: [
    "Taytech", "akıllı kontrol panoları", "ısı istasyonu", "elektronik kontrol",
    "manyetik filtre", "IronTrap", "IronInox", "SmartHexa", "HydroHexa", "ThermoHexa",
    "Taytech Cloud", "endüstriyel otomasyon", "pompa kontrol panosu", "hidrofor",
    "Smart Booster", "Smart Exclusive", "HVAC", "bina otomasyonu",
    "heat station", "magnetic filter", "control panel", "Gebze", "Kocaeli",
  ],
  authors: [{ name: "Taytech Otomasyon ve Bilişim A.Ş.", url: "https://taytech.com.tr" }],
  creator: "Taytech",
  publisher: "Taytech Otomasyon ve Bilişim A.Ş.",
  metadataBase: new URL("https://taytech.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: "https://taytech.com.tr",
    siteName: "Taytech",
    title: "Taytech | Akıllı Kontrol Panoları & Isı İstasyonları",
    description: "Akıllı kontrol panoları, ısı istasyonları, manyetik filtreler ve endüstriyel otomasyon çözümleri. ISO 9001, ISO 14001, ISO 45001 sertifikalı Türk üretici.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taytech - Akıllı Kontrol Panoları & Isı İstasyonları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taytech | Akıllı Kontrol Panoları & Isı İstasyonları",
    description: "Akıllı kontrol panoları, ısı istasyonları, manyetik filtreler ve endüstriyel otomasyon çözümleri.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  category: "technology",
  other: {
    "google-site-verification": "",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taytech Otomasyon ve Bilişim A.Ş.",
  alternateName: "Taytech",
  url: "https://taytech.com.tr",
  logo: "https://taytech.com.tr/logo.png",
  image: "https://taytech.com.tr/og-image.png",
  description: "Akıllı kontrol panoları, ısı istasyonları, manyetik filtreler ve endüstriyel otomasyon çözümleri üreten ISO sertifikalı Türk üretici.",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "İnönü Mahallesi Atatürk Bulvarı No:7 D:2",
    addressLocality: "Gebze",
    addressRegion: "Kocaeli",
    postalCode: "41400",
    addressCountry: "TR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-262-644-0561",
    contactType: "customer service",
    availableLanguage: ["Turkish", "English"],
  },
  sameAs: [
    "https://taytech.com",
    "https://taytech.com.tr",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Taytech",
  url: "https://taytech.com.tr",
  publisher: {
    "@type": "Organization",
    name: "Taytech Otomasyon ve Bilişim A.Ş.",
  },
  inLanguage: ["tr-TR", "en-US"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
