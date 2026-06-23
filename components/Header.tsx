"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";

import CartSheet from "./CartSheet";
import WishlistSheet from "./WishlistSheet";
import AuthButton from "./AuthButton";
import { useCart, selectCount } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { formatToman } from "@/lib/utils";

const NAV_LINKS = [
  { label: "خانه", href: "/" },
  { label: "گوشی‌ها", href: "/products" },
  { label: "برندها", href: "/brands" },
  { label: "تخفیف‌ها", href: "/deals" },
  { label: "بلاگ", href: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const hydrated = useHydrated();
  const cartCount = useCart(selectCount);
  const openCart = useCart((s) => s.open);
  const wishlistCount = useWishlist((s) => s.items.length);
  const openWishlist = useWishlist((s) => s.open);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-navy">
          نورا
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search (desktop) */}
        <div className="hidden flex-1 max-w-xs items-center gap-2 rounded-pill bg-lightgray px-4 py-2 lg:flex">
          <Search size={16} className="text-body/60" />
          <input
            type="text"
            placeholder="جستجوی گوشی..."
            className="w-full bg-transparent text-sm text-navy placeholder:text-body/50 focus:outline-none"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <AuthButton />
          <button
            aria-label="علاقه‌مندی‌ها"
            onClick={openWishlist}
            className="relative rounded-full p-2 transition-colors hover:bg-lightgray"
          >
            <Heart size={20} className="text-navy" />
            {hydrated && wishlistCount > 0 && (
              <span className="absolute -top-0.5 -left-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white">
                {formatToman(wishlistCount)}
              </span>
            )}
          </button>
          <button
            aria-label="سبد خرید"
            onClick={openCart}
            className="relative rounded-full p-2 transition-colors hover:bg-lightgray"
          >
            <ShoppingCart size={20} className="text-navy" />
            {hydrated && cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -left-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white"
              >
                {formatToman(cartCount)}
              </motion.span>
            )}
          </button>
          <button
            aria-label="منو"
            className="rounded-full p-2 transition-colors hover:bg-lightgray lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={22} className="text-navy" />
            ) : (
              <Menu size={22} className="text-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-hairline bg-surface lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-lightgray"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <CartSheet />
      <WishlistSheet />
    </header>
  );
}
