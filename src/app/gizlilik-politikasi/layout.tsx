import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Taytech Enerji Teknolojileri San. ve Tic. A.Ş. gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgilendirme.",
  alternates: { canonical: "/gizlilik-politikasi" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gizlilik Politikası | Taytech",
    description: "Taytech Enerji Teknolojileri San. ve Tic. A.Ş. gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgilendirme.",
    url: "https://taytech.com.tr/gizlilik-politikasi",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
