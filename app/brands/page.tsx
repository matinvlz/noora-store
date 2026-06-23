import type { Metadata } from "next";
import BrandShowcase from "@/components/BrandShowcase";
import { getBrands, getProducts } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "برندها | نورا",
  description: "خرید گوشی بر اساس برند: اپل، سامسونگ، شیائومی و بیشتر.",
};

export const revalidate = 3600;

export default async function BrandsPage() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);

  return (
    <main>
      <header className="container-page pt-10">
        <p className="eyebrow">برندها</p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-navy sm:text-4xl">
          خرید بر اساس برند
        </h1>
      </header>
      <BrandShowcase brands={brands} products={products} />
    </main>
  );
}
