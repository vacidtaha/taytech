import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { ProductsLanding } from "./ProductsLanding";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "Taytech ürün kataloğu: Isı istasyonları (SmartHexa, HydroHexa, ThermoHexa), manyetik filtreler (IronTrap, IronInox), akıllı kontrol panoları (Smart Serisi), elektro mekanik panolar ve veri yönetim sistemleri.",
  alternates: { canonical: "/urunler" },
  openGraph: {
    title: "Ürünler | Taytech",
    description: "Taytech endüstriyel otomasyon ürünleri: Isı istasyonları, manyetik filtreler, kontrol panoları ve veri yönetim sistemleri.",
    url: "https://taytech.com.tr/urunler",
  },
};

export default async function ProductsPage() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return <ProductsLanding categories={JSON.parse(JSON.stringify(categories))} />;
}
