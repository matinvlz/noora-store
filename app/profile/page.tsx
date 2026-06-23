"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  LogOut,
  Package,
  ShieldCheck,
  ChevronLeft,
  MapPin,
  Headphones,
} from "lucide-react";

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
    { icon: ShoppingCart, label: "سبد خرید", value: cartCount, onClick: openCart },
    { icon: Heart, label: "علاقه‌مندی‌ها", value: wishCount, onClick: openWishlist },
    { icon: Package, label: "سفارش‌ها", value: 0 },
  ];

  const menu = [
    { icon: Package, label: "سفارش‌های من", desc: "پیگیری و تاریخچه خرید", href: "/orders" },
    { icon: MapPin, label: "آدرس‌ها", desc: "مدیریت نشانی‌های ارسال", href: "/profile" },
    { icon: ShieldCheck, label: "ضمانت‌نامه‌ها", desc: "گارانتی کالاهای خریداری‌شده", href: "/warranty" },
    { icon: Headphones, label: "پشتیبانی", desc: "تماس با تیم نورا", href: "/contact" },
  ];

  return (
    <main className="container-page py-8 sm:py-10">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-navy via-charcoal to-navy p-7 text-white shadow-card sm:p-8">
        <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-teal/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-8 h-48 w-48 rounded-full bg-coral/15 blur-3xl" />

        <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-right">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 text-3xl font-extrabold ring-1 ring-white/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="sm:flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-teal/20 px-3 py-1 text-[11px] font-bold text-teal">
              <ShieldCheck size={13} />
              حساب تأیید‌شده
            </span>
            <h1 className="mt-2 text-2xl font-extrabold">{user.name}</h1>
            <p dir="ltr" className="mt-1 text-sm text-white/60 sm:text-right">
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
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ icon: Icon, label, value, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex flex-col items-center gap-2 rounded-card border border-hairline bg-surface p-4 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card-hover sm:flex-row sm:gap-4 sm:p-5 sm:text-right"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
              <Icon size={20} />
            </span>
            <div>
              <p className="text-xl font-extrabold text-navy sm:text-2xl">
                {formatToman(value)}
              </p>
              <p className="text-xs text-body sm:text-sm">{label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Account menu */}
      <div className="mt-6 overflow-hidden rounded-card border border-hairline bg-surface shadow-soft">
        {menu.map(({ icon: Icon, label, desc, href }, i) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-4 p-4 transition-colors hover:bg-lightgray ${
              i !== menu.length - 1 ? "border-b border-hairline" : ""
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lightgray text-navy">
              <Icon size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-navy">{label}</p>
              <p className="text-xs text-body">{desc}</p>
            </div>
            <ChevronLeft size={18} className="text-body/50" />
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-6 flex items-center justify-center gap-1.5 rounded-card bg-navy py-3.5 text-sm font-bold text-white transition-colors hover:bg-charcoal"
      >
        ادامه خرید
        <ChevronLeft size={16} />
      </Link>
    </main>
  );
}
