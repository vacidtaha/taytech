import type { Metadata } from "next";
import { neueHaasDisplay } from "@/fonts";
import { Header, QuickContact } from "@/components";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Taytech | Akıllı Kontrol Panoları & Isı Sistemleri",
    template: "%s | Taytech",
  },
  description: "Taytech, akıllı kontrol panoları, ısı istasyonları, elektronik kontrolörler, manyetik filtre ve Taytech Cloud ile endüstriyel otomasyon çözümleri sunan Türkiye merkezli üreticidir.",
  keywords: [
    "Taytech", "akıllı kontrol panoları", "ısı istasyonu", "elektronik kontrol", 
    "manyetik filtre", "IRONTRAP", "Taytech Cloud", "endüstriyel otomasyon",
    "pompa kontrol panosu", "hidrofor", "yangın panosu", "soft starter", "invertör",
    "ısı istasyonu kontrolörü", "HVAC", "bina otomasyonu", "Gebze", "Kocaeli"
  ],
  authors: [{ name: "Taytech Otomasyon ve Bilişim A.Ş." }],
  creator: "Taytech",
  publisher: "Taytech Otomasyon ve Bilişim A.Ş.",
  metadataBase: new URL("https://taytech.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://taytech.com.tr",
    siteName: "Taytech",
    title: "Taytech | Akıllı Kontrol Panoları & Isı Sistemleri",
    description: "Akıllı kontrol panoları, ısı istasyonları, elektronik kontrolörler ve endüstriyel otomasyon çözümleri. ISO 9001, ISO 14001, ISO 45001 sertifikalı Türk üretici.",
    images: [
      {
        url: "/taytechdiscekim.png",
        width: 1200,
        height: 630,
        alt: "Taytech - Akıllı Kontrol Panoları & Isı Sistemleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taytech | Akıllı Kontrol Panoları & Isı Sistemleri",
    description: "Akıllı kontrol panoları, ısı istasyonları, elektronik kontrolörler ve endüstriyel otomasyon çözümleri.",
    images: ["/taytechdiscekim.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${neueHaasDisplay.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <QuickContact />
        </LanguageProvider>
      </body>
    </html>
  );
}
