import type { Metadata } from "next";
import { Flame } from "lucide-react";
import DealsGrid from "@/components/DealsGrid";
import { getDeals } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "تخفیف‌ها | نورا",
  description: "تخفیف‌های زمان‌دار و پیشنهادهای شگفت‌انگیز نورا.",
};

// Deals are time-sensitive — revalidate frequently so expired offers drop off.
export const revalidate = 300;

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <main className="container-page py-10">
      <header>
        <p className="eyebrow flex items-center gap-1.5">
          <Flame size={15} className="text-coral" />
          فرصت محدود
        </p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-navy sm:text-4xl">
          تخفیف‌ها و پیشنهادهای ویژه
        </h1>
        <p className="mt-2 max-w-md text-sm text-body">
          قبل از پایان شمارش معکوس، گوشی موردنظرت را با بهترین قیمت بردار.
        </p>
      </header>
      <DealsGrid deals={deals} />
    </main>
  );
}
