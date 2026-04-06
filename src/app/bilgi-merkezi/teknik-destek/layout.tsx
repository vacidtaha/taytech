import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknik Destek",
  description: "Taytech teknik destek hizmetleri. Devreye alma, bakım, arıza tespit ve uzaktan destek çözümleri.",
  alternates: { canonical: "/bilgi-merkezi/teknik-destek" },
  openGraph: {
    title: "Teknik Destek | Taytech",
    description: "Taytech teknik destek hizmetleri. Devreye alma, bakım, arıza tespit ve uzaktan destek çözümleri.",
    url: "https://taytech.com.tr/bilgi-merkezi/teknik-destek",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
