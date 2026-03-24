import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doküman Merkezi",
  description: "Taytech ürünlerine ait kataloglar, kullanım kılavuzları, sertifikalar ve CAD çizimleri. Tüm teknik dokümanları indirin.",
  alternates: { canonical: "/dokuman-merkezi" },
  openGraph: {
    title: "Doküman Merkezi | Taytech",
    description: "Taytech ürün katalogları, teknik dokümanlar, kullanım kılavuzları, sertifikalar ve CAD çizimleri.",
    url: "https://taytech.com.tr/dokuman-merkezi",
  },
};

export default function DokumanMerkeziLayout({ children }: { children: React.ReactNode }) {
  return children;
}
