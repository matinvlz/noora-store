"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product, ProductCategory } from "@/types";
import ProductCard from "./ProductCard";
import { AnimatedSection } from "./AnimatedSection";

interface ProductGridProps {
  products: Product[];
}

const TABS: { label: string; value: ProductCategory }[] = [
  { label: "همه", value: "all" },
  { label: "پرچم‌دار", value: "flagship" },
  { label: "میان‌رده", value: "midrange" },
  { label: "ارزان", value: "budget" },
  { label: "5G", value: "5g" },
];

export default function ProductGrid({ products }: ProductGridProps) {
  const [active, setActive] = useState<ProductCategory>("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => p.category.includes(active));
  }, [products, active]);

  return (
    <section id="products" className="bg-lightgray/60 py-16">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">منتخب نورا</p>
            <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
              گوشی‌های پرفروش
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-teal transition-colors hover:text-teal/80"
          >
            مشاهده همه ←
          </a>
        </div>

        {/* Filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={[
                "relative rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
                active === tab.value
                  ? "bg-navy text-white"
                  : "bg-surface text-body hover:text-navy",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3"
          >
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
