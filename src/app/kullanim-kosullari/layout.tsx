import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "Taytech web sitesi kullanım koşulları ve şartları.",
  alternates: { canonical: "/kullanim-kosullari" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
