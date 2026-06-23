"use client";

import { Minus, Plus, ShoppingCart, Heart, Check, Zap } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { cn, formatToman } from "@/lib/utils";

export default function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addToCart = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wishlisted = useWishlist((s) =>
    s.items.some((p) => p._id === product._id)
  );
  const hydrated = useHydrated();
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div>
      {/* Stock status */}
      <div className="flex items-center gap-2 text-sm">
        {outOfStock ? (
          <span className="font-bold text-coral">ناموجود</span>
        ) : (
          <span className="flex items-center gap-1.5 font-bold text-teal">
            <Check size={16} /> موجود در انبار
            {lowStock && (
              <span className="text-coral">
                (تنها {formatToman(product.stock)} عدد باقی مانده)
              </span>
            )}
          </span>
        )}
      </div>

      {!outOfStock && (
        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm text-body">تعداد:</span>
          <div className="flex items-center gap-1 rounded-pill border border-hairline">
            <button
              aria-label="کاهش"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-lightgray"
            >
              <Minus size={15} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-navy">
              {formatToman(qty)}
            </span>
            <button
              aria-label="افزایش"
              disabled={qty >= product.stock}
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy transition-colors hover:bg-lightgray disabled:opacity-30"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          variant="coral"
          size="lg"
          disabled={outOfStock}
          onClick={() => addToCart(product, qty)}
        >
          <ShoppingCart size={18} />
          {outOfStock ? "ناموجود" : "افزودن به سبد"}
        </Button>
        {!outOfStock && (
          <Button
            size="lg"
            onClick={() => {
              addToCart(product, qty);
              openCart();
            }}
          >
            <Zap size={18} />
            خرید فوری
          </Button>
        )}
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={hydrated && wishlisted}
          onClick={() => toggleWishlist(product)}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-navy transition-colors hover:border-coral hover:text-coral",
            hydrated && wishlisted && "border-coral bg-coral/10 text-coral"
          )}
        >
          <Heart
            size={20}
            className={cn(hydrated && wishlisted && "fill-coral")}
          />
        </button>
      </div>
    </div>
  );
}
