"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/store/wishlist";
import { useCart } from "@/lib/store/cart";
import { formatToman } from "@/lib/utils";

export default function WishlistSheet() {
  const isOpen = useWishlist((s) => s.isOpen);
  const setOpen = useWishlist((s) => s.setOpen);
  const items = useWishlist((s) => s.items);
  const remove = useWishlist((s) => s.remove);
  const addToCart = useCart((s) => s.add);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-full p-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart size={18} className="text-coral" />
            علاقه‌مندی‌ها
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lightgray">
              <Heart className="text-body/60" />
            </div>
            <p className="font-bold text-navy">لیست علاقه‌مندی‌ها خالی است</p>
            <p className="text-sm text-body">
              روی آیکن قلب هر محصول بزن تا اینجا ذخیره شود.
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            <AnimatePresence initial={false}>
              {items.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-3 rounded-card border border-hairline bg-surface p-3"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-lightgray">
                    <Image
                      src={product.image.asset.url}
                      alt={product.image.alt || product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-body">
                          {product.brand.name}
                        </p>
                        <h4 className="text-sm font-bold text-navy">
                          {product.name}
                        </h4>
                        <p className="mt-1 text-sm font-extrabold text-navy">
                          {formatToman(product.price)}
                          <span className="mr-1 text-[10px] font-normal text-body">
                            تومان
                          </span>
                        </p>
                      </div>
                      <button
                        aria-label="حذف"
                        onClick={() => remove(product._id)}
                        className="rounded-full p-1 text-body/60 transition-colors hover:bg-lightgray hover:text-coral"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 w-full"
                      disabled={product.stock <= 0}
                      onClick={() => {
                        addToCart(product);
                        remove(product._id);
                      }}
                    >
                      <ShoppingCart size={14} />
                      {product.stock > 0 ? "افزودن به سبد" : "ناموجود"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
