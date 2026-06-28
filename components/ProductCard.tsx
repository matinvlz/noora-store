"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { cn, formatToman, discountPercent, imageUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const BADGE_STYLES: Record<string, string> = {
  "پرچم‌دار": "bg-coral text-white",
  "میان‌رده": "bg-teal text-white",
  ارزان: "bg-teal text-white",
  "5G": "bg-navy text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const isGradient = product.imageVariant === "gradient";
  const addToCart = useCart((s) => s.add);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wishlisted = useWishlist((s) => s.items.some((p) => p._id === product._id));
  const hydrated = useHydrated();

  const off = discountPercent(product.price, product.originalPrice);
  const outOfStock = product.stock <= 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-card bg-surface shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Image area */}
      <div
        className={cn(
          "relative aspect-[2/3] overflow-hidden",
          !isGradient && "bg-lightgray"
        )}
      >
        {isGradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-coral to-fuchsia-500" />
        )}

        <Image
          src={imageUrl(product.image)}
          alt={product.image.alt || product.name}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className={cn(
            "object-contain transition-transform duration-500 group-hover:scale-105",
            outOfStock && "grayscale"
          )}
        />

        {/* Full-card link to the detail page (sits under the action buttons) */}
        <Link
          href={`/products/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0 z-[1]"
        />

        {/* Badges (type + discount) */}
        <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
          {product.badge && (
            <span
              className={cn(
                "rounded-pill px-2.5 py-1 text-[11px] font-bold",
                BADGE_STYLES[product.badge] ?? "bg-navy text-white"
              )}
            >
              {product.badge}
            </span>
          )}
          {off > 0 && <Badge variant="coral">٪{formatToman(off)}-</Badge>}
        </div>

        {outOfStock && (
          <span className="absolute inset-x-0 bottom-0 bg-navy/80 py-1.5 text-center text-[11px] font-bold text-white">
            ناموجود
          </span>
        )}

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={hydrated && wishlisted}
          onClick={() => toggleWishlist(product)}
          className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-navy shadow-soft backdrop-blur transition-colors hover:text-coral"
        >
          <Heart
            size={15}
            className={cn(
              "transition-colors",
              hydrated && wishlisted && "fill-coral text-coral"
            )}
          />
        </motion.button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs text-body">{product.brand.name}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-bold text-navy transition-colors hover:text-teal">
            {product.name}
          </h3>
        </Link>

        <div className="mt-0.5 flex items-center gap-1 text-xs text-body">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {product.rating}
        </div>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-extrabold text-navy">
            {formatToman(product.price)}
          </span>
          {product.originalPrice && (
            <span className="price-strike">
              {formatToman(product.originalPrice)}
            </span>
          )}
          <span className="text-[11px] text-body/70">تومان</span>
        </div>

        <Button
          size="sm"
          className="mt-3 w-full"
          disabled={outOfStock}
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={14} />
          {outOfStock ? "ناموجود" : "افزودن به سبد"}
        </Button>
      </div>
    </motion.div>
  );
}
