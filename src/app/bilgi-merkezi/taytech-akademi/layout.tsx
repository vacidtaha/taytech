import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taytech Akademi",
  description: "Taytech Akademi: Eğitim programları, sertifika kursları ve endüstriyel otomasyon alanında teknik bilgi kaynakları.",
  alternates: { canonical: "/bilgi-merkezi/taytech-akademi" },
  openGraph: {
    title: "Taytech Akademi | Taytech",
    description: "Eğitim programları, sertifika kursları ve endüstriyel otomasyon alanında teknik bilgi kaynakları.",
    url: "https://taytech.com.tr/bilgi-merkezi/taytech-akademi",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
