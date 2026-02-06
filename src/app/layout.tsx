import type { Metadata } from "next";
import { neueHaasDisplay } from "@/fonts";
import { Header, QuickContact } from "@/components";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "TayTech | Teknolojik Isı Sistemleri",
  description: "Yenilikçi teknolojik ürünler ve ısı sistemleri çözümleri",
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
