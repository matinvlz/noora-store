"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Lock,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";
import { useCart, selectSubtotal } from "@/lib/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { formatToman, imageUrl } from "@/lib/utils";

type Status = "form" | "processing" | "success";

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);

  const [status, setStatus] = useState<Status>("form");
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Guard: guests are bounced to login and returned here after OTP.
  useEffect(() => {
    if (hydrated && !user) router.replace("/auth/login?redirect=/checkout");
  }, [hydrated, user, router]);

  // Prefill from the signed-in profile.
  useEffect(() => {
    if (user)
      setForm((f) => ({
        ...f,
        fullName: f.fullName || user.name,
        mobile: f.mobile || user.mobile,
      }));
  }, [user]);

  if (!hydrated || !user) {
    return (
      <main className="container-page flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-body">در حال بارگذاری…</p>
      </main>
    );
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <main className="container-page grid min-h-[calc(100vh-4rem)] place-items-center py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-card border border-hairline bg-surface p-10 text-center shadow-card"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal"
          >
            <CheckCircle2 size={36} />
          </motion.span>
          <h1 className="mt-5 text-2xl font-extrabold text-navy">
            سفارش با موفقیت ثبت شد!
          </h1>
          <p className="mt-2 text-sm leading-7 text-body">
            پرداخت شما با موفقیت انجام شد و سفارش در حال آماده‌سازی است.
          </p>
          <p className="mt-4 rounded-pill bg-lightgray px-4 py-2 text-sm font-bold text-navy">
            کد پیگیری: <span dir="ltr">{orderId}</span>
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild variant="coral">
              <Link href="/products">ادامه خرید</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/profile">حساب کاربری</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  // ── Empty cart ────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="container-page grid min-h-[50vh] place-items-center py-10 text-center">
        <div>
          <ShoppingBag className="mx-auto text-body/40" size={40} />
          <p className="mt-4 font-bold text-navy">سبد خریدت خالی است</p>
          <Button asChild className="mt-4">
            <Link href="/products">مشاهده گوشی‌ها</Link>
          </Button>
        </div>
      </main>
    );
  }

  const shipping = 0;
  const total = subtotal + shipping;

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setStatus("processing");
    // Simulated payment gateway round-trip.
    setTimeout(() => {
      setOrderId("NRA-" + Date.now().toString().slice(-8));
      clear();
      setStatus("success");
    }, 1400);
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-extrabold text-navy">تکمیل خرید</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Shipping form */}
        <form onSubmit={pay} className="space-y-5 lg:col-span-2">
          <section className="rounded-card border border-hairline bg-surface p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
              <MapPin size={18} className="text-teal" />
              اطلاعات ارسال
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="نام و نام خانوادگی">
                <Input value={form.fullName} onChange={set("fullName")} required />
              </Field>
              <Field label="شماره تماس">
                <Input
                  value={form.mobile}
                  onChange={set("mobile")}
                  dir="ltr"
                  inputMode="numeric"
                  required
                />
              </Field>
              <Field label="شهر">
                <Input value={form.city} onChange={set("city")} required />
              </Field>
              <Field label="کد پستی">
                <Input
                  value={form.postalCode}
                  onChange={set("postalCode")}
                  dir="ltr"
                  inputMode="numeric"
                  required
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="نشانی کامل">
                  <Input value={form.address} onChange={set("address")} required />
                </Field>
              </div>
            </div>
          </section>

          <section className="flex items-center gap-3 rounded-card border border-hairline bg-surface p-6">
            <Truck size={18} className="text-teal" />
            <span className="text-sm text-body">
              ارسال رایگان و سریع به سراسر کشور
            </span>
            <span className="mr-auto text-sm font-bold text-teal">رایگان</span>
          </section>

          <Button
            type="submit"
            variant="coral"
            size="lg"
            className="w-full"
            disabled={status === "processing"}
          >
            {status === "processing" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                در حال پردازش پرداخت…
              </>
            ) : (
              <>
                <Lock size={16} />
                پرداخت {formatToman(total)} تومان
              </>
            )}
          </Button>
        </form>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-card border border-hairline bg-surface p-6">
            <h2 className="text-lg font-bold text-navy">خلاصه سفارش</h2>
            <ul className="mt-4 space-y-3">
              {items.map((line) => (
                <li key={line.product._id} className="flex items-center gap-3">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-lightgray">
                    <Image
                      src={imageUrl(line.product.image)}
                      alt={line.product.image.alt || line.product.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                    <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                      {formatToman(line.qty)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-navy">
                      {line.product.name}
                    </p>
                    <p className="text-[11px] text-body">
                      {line.product.brand.name}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-navy">
                    {formatToman(line.product.price * line.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-hairline pt-4 text-sm">
              <Row label="جمع کالاها" value={`${formatToman(subtotal)} تومان`} />
              <Row label="هزینه ارسال" value="رایگان" />
              <div className="flex items-center justify-between border-t border-hairline pt-3">
                <dt className="font-bold text-navy">مبلغ قابل پرداخت</dt>
                <dd className="text-lg font-extrabold text-navy">
                  {formatToman(total)}
                  <span className="mr-1 text-xs font-normal text-body">تومان</span>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-body">
      <dt>{label}</dt>
      <dd className="font-semibold text-navy">{value}</dd>
    </div>
  );
}
