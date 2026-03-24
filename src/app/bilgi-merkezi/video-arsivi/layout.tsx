import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Arşivi",
  description: "Taytech ürün tanıtım videoları, kurulum rehberleri ve teknik eğitim içerikleri.",
  alternates: { canonical: "/bilgi-merkezi/video-arsivi" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
