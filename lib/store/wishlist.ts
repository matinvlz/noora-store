"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistState {
  items: Product[];
  isOpen: boolean;
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((p) => p._id === product._id);
          return {
            items: exists
              ? state.items.filter((p) => p._id !== product._id)
              : [...state.items, product],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((p) => p._id !== productId),
        })),
      has: (productId) => get().items.some((p) => p._id === productId),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: "noora-wishlist" }
  )
);
