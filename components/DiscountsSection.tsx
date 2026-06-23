"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, ShoppingCart, Heart, Zap } from "lucide-react";
import type { Product } from "@/types";

import Countdown from "./Countdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { cn, formatToman, discountPercent } from "@/lib/utils";

interface DiscountsSectionProps {
  deals: Product[];
}

export default function DiscountsSection({ deals }: DiscountsSectionProps) {
  const addToCart = useCart((s) => s.add);
  const toggleWishlist = useWishlist((s) => s.toggle);

  if (!deals.length) return null;

  const [featured, ...rest] = deals;
  const featuredOff = discountPercent(featured.price, featured.originalPrice);

  return (
    <section id="deals" className="py-16">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-1.5">
              <Flame size={15} className="text-coral" />
              پیشنهاد شگفت‌انگیز
            </p>
            <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
              تخفیف‌ها و فرصت‌های ویژه
            </h2>
          </div>
          <a
            href="/deals"
            className="text-sm font-semibold text-teal transition-colors hover:text-teal/80"
          >
            همه تخفیف‌ها ←
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Featured deal — asymmetric hero card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-card bg-gradient-to-br from-navy via-charcoal to-navy p-6 text-white shadow-card lg:col-span-2 lg:p-8"
          >
            {/* glow */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-coral/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />

            <div className="relative grid items-center gap-6 sm:grid-cols-2">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] overflow-hidden rounded-2xl">
                <Image
                  src={featured.image.asset.url}
                  alt={featured.image.alt || featured.name}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
                {featuredOff > 0 && (
                  <span className="absolute right-3 top-3 rounded-pill bg-coral px-3 py-1.5 text-sm font-extrabold">
                    ٪{formatToman(featuredOff)}- تخفیف
                  </span>
                )}
              </div>

              <div className="text-right">
                <p className="text-sm text-white/70">{featured.brand.name}</p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight">
                  {featured.name}
                </h3>

                <div className="mt-3 flex items-baseline justify-end gap-2">
                  {featured.originalPrice && (
                    <span className="text-sm text-white/50 line-through">
                      {formatToman(featured.originalPrice)}
                    </span>
                  )}
                  <span className="text-2xl font-extrabold text-coral">
                    {formatToman(featured.price)}
                  </span>
                  <span className="text-xs text-white/70">تومان</span>
                </div>

                <p className="mt-4 text-xs text-white/70">پایان فرصت تا:</p>
                <Countdown endsAt={featured.dealEndsAt!} className="mt-2 justify-end" />

                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <Button
                    variant="coral"
                    onClick={() => addToCart(featured)}
                    disabled={featured.stock <= 0}
                  >
                    <ShoppingCart size={16} />
                    {featured.stock > 0 ? "خرید با تخفیف" : "ناموجود"}
                  </Button>
                  <button
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    onClick={() => toggleWishlist(featured)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Side column — compact deal rows */}
          <div className="flex flex-col gap-4">
            {rest.slice(0, 3).map((deal) => {
              const off = discountPercent(deal.price, deal.originalPrice);
              return (
                <motion.article
                  key={deal._id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex gap-3 rounded-card bg-surface p-3 shadow-soft transition-shadow hover:shadow-card-hover"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-lightgray">
                    <Image
                      src={deal.image.asset.url}
                      alt={deal.image.alt || deal.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {off > 0 && (
                      <Badge
                        variant="coral"
                        className="absolute right-1 top-1 px-1.5"
                      >
                        ٪{formatToman(off)}-
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <p className="text-[11px] text-body">{deal.brand.name}</p>
                    <h4 className="text-sm font-bold text-navy">{deal.name}</h4>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-sm font-extrabold text-navy">
                        {formatToman(deal.price)}
                      </span>
                      {deal.originalPrice && (
                        <span className="price-strike">
                          {formatToman(deal.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
                      <Countdown endsAt={deal.dealEndsAt!} compact />
                      <button
                        aria-label="افزودن به سبد"
                        onClick={() => addToCart(deal)}
                        disabled={deal.stock <= 0}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-charcoal",
                          deal.stock <= 0 && "opacity-40"
                        )}
                      >
                        <Zap size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
