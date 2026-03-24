import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Haritası",
  description: "Taytech web sitesi haritası. Tüm sayfalar, ürünler ve kategoriler.",
  alternates: { canonical: "/site-haritasi" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
