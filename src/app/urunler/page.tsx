import { prisma } from "@/lib/db";
import { ProductsLanding } from "./ProductsLanding";

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
