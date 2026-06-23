import type { Brand } from "@/types";
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";

interface BrandsBarProps {
  brands: Brand[];
}

export default function BrandsBar({ brands }: BrandsBarProps) {
  return (
    <section className="container-page pb-14 text-center">
      <h2 className="text-2xl font-bold text-navy">خرید بر اساس برند</h2>
      <p className="mt-1.5 text-sm text-body">
        معتبرترین برندهای دنیای موبایل، یک‌جا در نورا
      </p>

      <AnimatedSection
        stagger
        className="mt-7 flex flex-wrap items-center justify-center gap-3"
      >
        {brands.map((brand) => (
          <AnimatedItem key={brand._id}>
            <button className="rounded-pill border border-hairline bg-surface px-5 py-2.5 text-sm font-medium text-navy shadow-soft transition-all hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-card-hover">
              {brand.name}
            </button>
          </AnimatedItem>
        ))}
      </AnimatedSection>
    </section>
  );
}
