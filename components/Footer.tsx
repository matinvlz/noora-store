import Link from "next/link";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const QUICK_LINKS = [
  { label: "خانه", href: "/" },
  { label: "محصولات و کالاها", href: "/products" },
  { label: "بازگشت کالا", href: "/returns" },
  { label: "تماس با ما", href: "/contact" },
];

const CUSTOMER_SERVICE = [
  { label: "راهنمای خرید", href: "/guide" },
  { label: "ضمانت و گارانتی", href: "/warranty" },
  { label: "وضعیت سفارش", href: "/orders" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy pt-14 pb-6 text-white">
      <div className="container-page grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold">نورا</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            خرید مطمئن گوشی موبایل با ضمانت اصالت کالا، ارسال سریع و رایگان و
            پشتیبانی همیشگی.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, MessageCircle, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-teal"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-bold text-white/90">دسترسی سریع</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-teal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer service */}
        <div>
          <h4 className="text-sm font-bold text-white/90">خدمات مشتری</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {CUSTOMER_SERVICE.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-teal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-bold text-white/90">خبرنامه نورا</h4>
          <p className="mt-4 text-sm leading-6 text-white/60">
            از تازه‌ترین تخفیف‌ها و گوشی‌های جدید زودتر باخبر شو.
          </p>
          <form className="mt-4 flex overflow-hidden rounded-pill bg-white/10">
            <input
              type="email"
              placeholder="ایمیل شما"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-teal px-5 text-sm font-bold text-white transition-colors hover:bg-teal/90"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>

      <div className="container-page mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row">
        <p>© ۱۴۰۵ نورا - تمامی حقوق محفوظ است</p>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-teal">
            قوانین
          </Link>
          <Link href="/privacy" className="hover:text-teal">
            حریم خصوصی
          </Link>
        </div>
      </div>
    </footer>
  );
}
