import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  return (
    <section className="py-16">
      <div className="container-page">
        <p className="eyebrow">داغ‌ترین‌های هفته</p>
        <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
          پرفروش‌ترین‌ها
        </h2>

        <AnimatedSection
          stagger
          className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3"
        >
          {products.map((product) => (
            <AnimatedItem key={product._id}>
              <ProductCard product={product} />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
