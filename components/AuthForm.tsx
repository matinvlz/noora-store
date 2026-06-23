"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ShieldCheck, Truck, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";

const PERKS = [
  { icon: ShieldCheck, label: "ضمانت اصالت و گارانتی معتبر" },
  { icon: Truck, label: "ارسال رایگان و پیگیری سفارش" },
  { icon: Sparkles, label: "پیشنهادهای ویژه اعضای نورا" },
];

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const register = useAuth((s) => s.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isRegister = mode === "register";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = isRegister
      ? register(name, email, password)
      : login(email, password);
    if (result.ok) router.push("/profile");
    else setError(result.error ?? "خطایی رخ داد.");
  }

  return (
    <main className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-2">
      {/* Brand panel */}
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative hidden overflow-hidden rounded-card bg-gradient-to-br from-navy via-charcoal to-navy p-10 text-white lg:block"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
        <div className="relative">
          <p className="text-2xl font-extrabold">نورا</p>
          <h2 className="mt-8 text-3xl font-extrabold leading-snug">
            {isRegister
              ? "به خانواده نورا بپیوند"
              : "دوباره خوش آمدی 👋"}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/70">
            فروشگاه تخصصی موبایل با ضمانت اصالت، ارسال رایگان و پشتیبانی ۲۴ ساعته.
          </p>
          <ul className="mt-8 space-y-4">
            {PERKS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <Icon size={16} className="text-teal" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </motion.aside>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-sm"
      >
        <h1 className="text-2xl font-extrabold text-navy">
          {isRegister ? "ساخت حساب کاربری" : "ورود به حساب"}
        </h1>
        <p className="mt-1.5 text-sm text-body">
          {isRegister
            ? "اطلاعاتت را وارد کن تا حسابت ساخته شود."
            : "ایمیل و رمز عبورت را وارد کن."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isRegister && (
            <Field icon={User} label="نام و نام خانوادگی">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً نگار احمدی"
                className="ps-10"
                required
              />
            </Field>
          )}
          <Field icon={Mail} label="ایمیل">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="ps-10"
              dir="ltr"
              required
            />
          </Field>
          <Field icon={Lock} label="رمز عبور">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="حداقل ۶ کاراکتر"
              className="ps-10"
              dir="ltr"
              required
            />
          </Field>

          {error && (
            <p className="rounded-pill bg-coral/10 px-4 py-2 text-center text-sm font-semibold text-coral">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            {isRegister ? "ثبت‌نام" : "ورود"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          {isRegister ? "قبلاً ثبت‌نام کرده‌ای؟ " : "حساب کاربری نداری؟ "}
          <Link
            href={isRegister ? "/auth/login" : "/auth/register"}
            className="font-bold text-teal transition-colors hover:text-teal/80"
          >
            {isRegister ? "وارد شو" : "ثبت‌نام کن"}
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </span>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-body/50"
        />
        {children}
      </div>
    </label>
  );
}
