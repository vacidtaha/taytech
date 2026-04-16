"use client";

import { usePathname } from "next/navigation";
import { Header, QuickContact } from "@/components";
import Footer from "@/components/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isKurumsal = pathname.startsWith("/kurumsal");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header isFixed={!isKurumsal} />
      <main>{children}</main>
      <QuickContact />
      <Footer />
    </>
  );
}
