import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "ورود | نورا",
  description: "ورود به حساب کاربری فروشگاه نورا با کد یک‌بارمصرف.",
};

export default function LoginPage() {
  return (
    <Suspense>
      <AuthForm mode="login" />
    </Suspense>
  );
}
