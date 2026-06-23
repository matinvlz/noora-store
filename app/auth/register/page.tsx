import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "ثبت‌نام | نورا",
  description: "ساخت حساب کاربری جدید در فروشگاه نورا با کد یک‌بارمصرف.",
};

export default function RegisterPage() {
  return (
    <Suspense>
      <AuthForm mode="register" />
    </Suspense>
  );
}
