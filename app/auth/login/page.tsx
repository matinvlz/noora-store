import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "ورود | نورا",
  description: "ورود به حساب کاربری فروشگاه نورا.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
