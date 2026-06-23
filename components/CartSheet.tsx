"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, selectCount, selectSubtotal } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { formatToman } from "@/lib/utils";

export default function CartSheet() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-full p-0 sm:max-w-md">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-teal" />
            سبد خرید
            {count > 0 && (
              <span className="rounded-pill bg-lightgray px-2 py-0.5 text-xs font-bold text-body">
                {formatToman(count)}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lightgray">
              <ShoppingBag className="text-body/60" />
            </div>
            <p className="font-bold text-navy">سبد خریدت خالی است</p>
            <p className="text-sm text-body">
              گوشی موردعلاقه‌ات را اضافه کن تا اینجا ببینی.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              ادامه خرید
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              <AnimatePresence initial={false}>
                {items.map((line) => (
                  <motion.div
                    key={line.product._id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 rounded-card border border-hairline bg-surface p-3"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-lightgray">
                      <Image
                        src={line.product.image.asset.url}
                        alt={line.product.image.alt || line.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] text-body">
                            {line.product.brand.name}
                          </p>
                          <h4 className="text-sm font-bold text-navy">
                            {line.product.name}
                          </h4>
                        </div>
                        <button
                          aria-label="حذف"
                          onClick={() => remove(line.product._id)}
                          className="rounded-full p-1 text-body/60 transition-colors hover:bg-lightgray hover:text-coral"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-pill border border-hairline">
                          <button
                            aria-label="کاهش"
                            onClick={() =>
                              setQty(line.product._id, line.qty - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-navy transition-colors hover:bg-lightgray"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-navy">
                            {formatToman(line.qty)}
                          </span>
                          <button
                            aria-label="افزایش"
                            disabled={line.qty >= line.product.stock}
                            onClick={() =>
                              setQty(line.product._id, line.qty + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-navy transition-colors hover:bg-lightgray disabled:opacity-30"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-navy">
                          {formatToman(line.product.price * line.qty)}
                          <span className="mr-1 text-[10px] font-normal text-body">
                            تومان
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={clear}
                className="mx-auto block text-xs text-body/70 underline-offset-4 transition-colors hover:text-coral hover:underline"
              >
                خالی کردن سبد
              </button>
            </div>

            <SheetFooter className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-body">جمع کل</span>
                <span className="text-lg font-extrabold text-navy">
                  {formatToman(subtotal)}
                  <span className="mr-1 text-xs font-normal text-body">
                    تومان
                  </span>
                </span>
              </div>
              <Button
                variant="coral"
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  // Intercept guests: send to login, then back to checkout.
                  router.push(
                    user ? "/checkout" : "/auth/login?redirect=/checkout"
                  );
                }}
              >
                تکمیل خرید
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
