"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ShieldCheck, ArrowRight, RotateCw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store/auth";

type Step = "mobile" | "otp";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/profile";

  const user = useAuth((s) => s.user);
  const requestOtp = useAuth((s) => s.requestOtp);
  const verifyOtp = useAuth((s) => s.verifyOtp);

  const [step, setStep] = useState<Step>("mobile");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isRegister = mode === "register";

  // Already signed in → honour the redirect target immediately.
  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user, redirect, router]);

  function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const res = requestOtp(mobile, isRegister ? name : undefined);
    if (!res.ok) return setError(res.error ?? "خطا در ارسال کد.");
    setDemoCode(res.code ?? null);
    setCode("");
    setStep("otp");
  }

  function verify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = verifyOtp(code);
    if (res.ok) router.push(redirect);
    else setError(res.error ?? "کد نادرست است.");
  }

  return (
    <main className="container-page grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="w-full max-w-md overflow-hidden rounded-card border border-hairline bg-surface p-8 shadow-card sm:p-10"
      >
        {/* Brand mark */}
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
            <Smartphone size={24} />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-navy">
            {isRegister ? "ساخت حساب نورا" : "ورود به نورا"}
          </h1>
          <p className="mt-1.5 text-sm text-body">
            {step === "mobile"
              ? "شماره موبایلت را وارد کن تا کد تأیید برایت ارسال شود."
              : `کد تأیید پیامک‌شده به ${mobile} را وارد کن.`}
          </p>
        </div>

        <form
          onSubmit={step === "mobile" ? sendCode : verify}
          className="mt-8 space-y-4"
        >
          {/* Name (register only) */}
          {isRegister && step === "mobile" && (
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">
                نام و نام خانوادگی
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً نگار احمدی"
                required
              />
            </div>
          )}

          {/* Mobile */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy">
              شماره موبایل
            </label>
            <Input
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/[^\d]/g, "").slice(0, 11))
              }
              placeholder="09123456789"
              dir="ltr"
              inputMode="numeric"
              disabled={step === "otp"}
              required
              className="text-center tracking-widest"
            />
          </div>

          {/* OTP — animates in once a code is requested */}
          <AnimatePresence>
            {step === "otp" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <label className="mb-1.5 block text-sm font-semibold text-navy">
                  کد تأیید
                </label>
                <Input
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 4))
                  }
                  placeholder="• • • •"
                  dir="ltr"
                  inputMode="numeric"
                  autoFocus
                  required
                  className="text-center text-lg font-bold tracking-[0.5em]"
                />
                {demoCode && (
                  <p className="mt-2 flex items-center justify-center gap-1.5 rounded-pill bg-teal/10 px-3 py-1.5 text-center text-xs font-semibold text-teal">
                    <ShieldCheck size={13} />
                    کد دموی شما: {demoCode}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("mobile");
                      setError(null);
                    }}
                    className="text-body transition-colors hover:text-navy"
                  >
                    تغییر شماره
                  </button>
                  <button
                    type="button"
                    onClick={() => sendCode()}
                    className="flex items-center gap-1 text-teal transition-colors hover:text-teal/80"
                  >
                    <RotateCw size={12} />
                    ارسال مجدد کد
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="rounded-pill bg-coral/10 px-4 py-2 text-center text-sm font-semibold text-coral">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            {step === "mobile" ? "ارسال کد تأیید" : "تأیید و ورود"}
            {step === "mobile" && <ArrowRight size={16} />}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          {isRegister ? "حساب داری؟ " : "حساب نداری؟ "}
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
