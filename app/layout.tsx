import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Vazirmatn is the closest open Google Font match to the rounded Persian
// geometric sans used in the Framer source design. Swap this import if
// you have a licensed copy of the exact original typeface.
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noora-store.example.com"),
  title: "نورا | فروشگاه موبایل",
  description:
    "نورا، فروشگاه آنلاین گوشی‌های موبایل با ضمانت اصالت، ارسال رایگان و پشتیبانی ۲۴ ساعته.",
  openGraph: {
    title: "نورا | فروشگاه موبایل",
    description:
      "نورا، فروشگاه آنلاین گوشی‌های موبایل با ضمانت اصالت، ارسال رایگان و پشتیبانی ۲۴ ساعته.",
    type: "website",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "نورا | فروشگاه موبایل",
    description:
      "نورا، فروشگاه آنلاین گوشی‌های موبایل با ضمانت اصالت، ارسال رایگان و پشتیبانی ۲۴ ساعته.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
