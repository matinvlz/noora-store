"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import type { Brand, Product } from "@/types";

import ProductCard from "./ProductCard";
import { cn, formatToman } from "@/lib/utils";

interface BrandShowcaseProps {
  brands: Brand[];
  products: Product[];
}

const ALL = "__all__";

export default function BrandShowcase({ brands, products }: BrandShowcaseProps) {
  const [active, setActive] = useState<string>(ALL);

  // Only show brands that actually have products, keeping the filter honest.
  const activeBrands = useMemo(() => {
    const withProducts = new Set(products.map((p) => p.brand.slug));
    return brands.filter((b) => withProducts.has(b.slug));
  }, [brands, products]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.brand.slug] = (map[p.brand.slug] ?? 0) + 1;
    return map;
  }, [products]);

  const filtered = useMemo(
    () =>
      active === ALL
        ? products
        : products.filter((p) => p.brand.slug === active),
    [products, active]
  );

  return (
    <section id="brands" className="container-page py-16">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Smartphone size={15} />
            خرید بر اساس برند
          </p>
          <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
            معتبرترین برندهای موبایل
          </h2>
        </div>
      </div>

      {/* Brand chips */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        <BrandChip
          active={active === ALL}
          onClick={() => setActive(ALL)}
          label="همه"
          count={products.length}
        />
        {activeBrands.map((brand) => (
          <BrandChip
            key={brand._id}
            active={active === brand.slug}
            onClick={() => setActive(brand.slug)}
            label={brand.name}
            count={counts[brand.slug]}
          />
        ))}
      </div>

      {/* Filtered grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-body">
          فعلاً محصولی برای این برند موجود نیست.
        </p>
      )}
    </section>
  );
}

function BrandChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 rounded-pill border px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5",
        active
          ? "border-navy bg-navy text-white shadow-card"
          : "border-hairline bg-surface text-navy shadow-soft hover:border-teal/40 hover:shadow-card-hover"
      )}
    >
      {label}
      {count != null && (
        <span
          className={cn(
            "rounded-full px-1.5 text-[11px] font-bold tabular-nums",
            active ? "bg-white/20 text-white" : "bg-lightgray text-body"
          )}
        >
          {formatToman(count)}
        </span>
      )}
    </button>
  );
}
