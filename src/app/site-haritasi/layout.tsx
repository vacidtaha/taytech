import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Haritası",
  description: "Taytech web sitesi haritası. Tüm sayfalar, ürünler ve kategoriler.",
  alternates: { canonical: "/site-haritasi" },
  openGraph: {
    title: "Site Haritası | Taytech",
    description: "Taytech web sitesi haritası. Tüm sayfalar, ürünler ve kategoriler.",
    url: "https://taytech.com.tr/site-haritasi",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
