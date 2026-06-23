import Link from "next/link";
import { Home, Search, Smartphone } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <div className="relative w-full max-w-xl overflow-hidden rounded-card bg-gradient-to-br from-navy via-charcoal to-navy p-10 text-center text-white sm:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />

        <div className="relative">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Smartphone size={28} className="text-teal" />
          </span>

          <p className="mt-6 bg-gradient-to-l from-coral to-teal bg-clip-text text-7xl font-black text-transparent sm:text-8xl">
            ۴۰۴
          </p>
          <h1 className="mt-2 text-2xl font-extrabold">صفحه پیدا نشد</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/70">
            انگار این صفحه مثل یک گوشی نایاب از دسترس خارج شده! بیا به فروشگاه
            برگردیم و گوشی موردعلاقه‌ات را پیدا کنیم.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
            >
              <Home size={16} />
              بازگشت به خانه
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-pill border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              <Search size={16} />
              مشاهده گوشی‌ها
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
