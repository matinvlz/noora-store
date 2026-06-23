"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartLine[];
  isOpen: boolean;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find(
            (l) => l.product._id === product._id
          );
          const max = Math.max(product.stock, 0) || Infinity;
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((l) =>
                l.product._id === product._id
                  ? { ...l, qty: Math.min(l.qty + qty, max) }
                  : l
              ),
            };
          }
          return {
            isOpen: true,
            items: [...state.items, { product, qty: Math.min(qty, max) }],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((l) => l.product._id !== productId),
        })),
      setQty: (productId, qty) =>
        set((state) => ({
          items: state.items.flatMap((l) => {
            if (l.product._id !== productId) return [l];
            if (qty <= 0) return [];
            const max = Math.max(l.product.stock, 0) || Infinity;
            return [{ ...l, qty: Math.min(qty, max) }];
          }),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: "noora-cart" }
  )
);

// Derived selectors — call with the hook, e.g. useCart(selectCount)
export const selectCount = (s: CartState) =>
  s.items.reduce((sum, l) => sum + l.qty, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, l) => sum + l.product.price * l.qty, 0);
