import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Arşivi",
  description: "Taytech ürün tanıtım videoları, kurulum rehberleri ve teknik eğitim içerikleri.",
  alternates: { canonical: "/bilgi-merkezi/video-arsivi" },
  openGraph: {
    title: "Video Arşivi | Taytech",
    description: "Taytech ürün tanıtım videoları, kurulum rehberleri ve teknik eğitim içerikleri.",
    url: "https://taytech.com.tr/bilgi-merkezi/video-arsivi",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
