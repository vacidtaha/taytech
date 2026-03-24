import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknik Destek",
  description: "Taytech teknik destek hizmetleri. Devreye alma, bakım, arıza tespit ve uzaktan destek çözümleri.",
  alternates: { canonical: "/bilgi-merkezi/teknik-destek" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
