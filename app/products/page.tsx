import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "گوشی‌ها | نورا",
  description: "همه گوشی‌های موبایل نورا با فیلتر دسته‌بندی.",
};

export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <header className="container-page pt-10">
        <p className="eyebrow">فروشگاه نورا</p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-navy sm:text-4xl">
          همه گوشی‌ها
        </h1>
        <p className="mt-2 max-w-md text-sm text-body">
          از پرچم‌دارها تا گزینه‌های اقتصادی؛ با ضمانت اصالت نورا.
        </p>
      </header>
      <ProductGrid products={products} />
    </main>
  );
}
