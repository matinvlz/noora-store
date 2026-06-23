"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, ShoppingCart, LogOut, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";
import { useCart, selectCount } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { formatToman } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const cartCount = useCart(selectCount);
  const wishCount = useWishlist((s) => s.items.length);
  const openCart = useCart((s) => s.open);
  const openWishlist = useWishlist((s) => s.open);

  useEffect(() => {
    if (hydrated && !user) router.replace("/auth/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <main className="container-page flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-body">در حال بارگذاری…</p>
      </main>
    );
  }

  const stats = [
    {
      icon: ShoppingCart,
      label: "سبد خرید",
      value: cartCount,
      onClick: openCart,
    },
    {
      icon: Heart,
      label: "علاقه‌مندی‌ها",
      value: wishCount,
      onClick: openWishlist,
    },
    { icon: Package, label: "سفارش‌ها", value: 0 },
  ];

  return (
    <main className="container-page py-10">
      {/* Header card */}
      <div className="flex flex-col items-center gap-4 rounded-card bg-gradient-to-br from-navy via-charcoal to-navy p-8 text-center text-white sm:flex-row sm:text-right">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-extrabold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="sm:flex-1">
          <h1 className="text-2xl font-extrabold">{user.name}</h1>
          <p dir="ltr" className="mt-1 text-sm text-white/70 sm:text-right">
            {user.mobile}
          </p>
        </div>
        <Button
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <LogOut size={16} />
          خروج
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex items-center gap-4 rounded-card border border-hairline bg-surface p-5 text-right shadow-soft transition-shadow hover:shadow-card-hover"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
              <Icon size={20} />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-navy">
                {formatToman(value)}
              </p>
              <p className="text-sm text-body">{label}</p>
            </div>
          </button>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-8 inline-block text-sm font-semibold text-teal transition-colors hover:text-teal/80"
      >
        ادامه خرید ←
      </Link>
    </main>
  );
}
