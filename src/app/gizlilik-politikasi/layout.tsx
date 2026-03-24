import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Taytech Otomasyon ve Bilişim A.Ş. gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgilendirme.",
  alternates: { canonical: "/gizlilik-politikasi" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
