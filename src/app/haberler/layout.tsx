import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haberler",
  description: "Taytech'ten son haberler, sektör gelişmeleri, yeni ürünler ve fuarlar. Endüstriyel otomasyon ve ısı sistemleri alanındaki güncel gelişmeler.",
  alternates: { canonical: "/haberler" },
  openGraph: {
    title: "Haberler | Taytech",
    description: "Taytech haberler, duyurular ve sektörel gelişmeler.",
    url: "https://taytech.com.tr/haberler",
  },
};

export default function HaberlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
