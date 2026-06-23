import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "ثبت‌نام | نورا",
  description: "ساخت حساب کاربری جدید در فروشگاه نورا.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
