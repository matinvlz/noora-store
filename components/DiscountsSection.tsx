"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import type { Product } from "@/types";

import Countdown from "./Countdown";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { cn, formatToman, discountPercent, imageUrl } from "@/lib/utils";

interface DiscountsSectionProps {
  deals: Product[];
}

/** Sleek angular discount badge — sharp top-left clip, no gradients. */
function DealBadge({ off }: { off: number }) {
  if (off <= 0) return null;
  return (
    <span
      className="absolute right-0 top-3 z-10 flex items-baseline gap-0.5 bg-coral px-2.5 py-1 text-white shadow-soft"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
    >
      <span className="text-[15px] font-extrabold leading-none">٪{formatToman(off)}</span>
      <span className="text-[10px] font-medium leading-none opacity-90">تخفیف</span>
    </span>
  );
}

function DealCard({ deal, index }: { deal: Product; index: number }) {
  const addToCart = useCart((s) => s.add);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const off = discountPercent(deal.price, deal.originalPrice);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-card border border-hairline bg-surface transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-lightgray">
        <DealBadge off={off} />
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          onClick={() => toggleWishlist(deal)}
          className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/80 text-navy backdrop-blur-sm transition-colors hover:bg-coral hover:text-white"
        >
          <Heart size={15} />
        </button>
        <Image
          src={imageUrl(deal.image)}
          alt={deal.image.alt || deal.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium tracking-wide text-body">{deal.brand.name}</p>
        <h3 className="mt-1 line-clamp-1 text-sm font-bold text-navy">{deal.name}</h3>

        <div className="mt-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-navy">
              {formatToman(deal.price)}
            </span>
            <span className="text-[11px] text-body">تومان</span>
          </div>
          {deal.originalPrice && (
            <span className="price-strike">{formatToman(deal.originalPrice)}</span>
          )}
        </div>

        {deal.dealEndsAt && (
          <div className="mt-3 border-t border-hairline pt-3">
            <Countdown endsAt={deal.dealEndsAt} compact className="justify-center" />
          </div>
        )}

        <Button
          variant="coral"
          onClick={() => addToCart(deal)}
          disabled={deal.stock <= 0}
          className="mt-3 w-full"
        >
          <ShoppingCart size={15} />
          {deal.stock > 0 ? "خرید با تخفیف" : "ناموجود"}
        </Button>
      </div>
    </motion.article>
  );
}

export default function DiscountsSection({ deals }: DiscountsSectionProps) {
  if (!deals.length) return null;

  return (
    <section id="deals" className="py-16">
      <div className="container-page">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-hairline pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              پیشنهاد شگفت‌انگیز
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              فرصت‌های ویژه خرید
            </h2>
          </div>
          <a
            href="/deals"
            className={cn(
              "group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-teal",
              "transition-colors hover:text-teal/80 sm:flex"
            )}
          >
            مشاهده همه
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          </a>
        </div>

        {/* Minimal uniform deal grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {deals.slice(0, 4).map((deal, i) => (
            <DealCard key={deal._id} deal={deal} index={i} />
          ))}
        </div>

        <a
          href="/deals"
          className="mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-teal/80 sm:hidden"
        >
          مشاهده همه تخفیف‌ها
          <ArrowLeft size={16} />
        </a>
      </div>
    </section>
  );
}
