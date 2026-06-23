import { Shield, Truck, Headset, CreditCard, RotateCcw } from "lucide-react";
import type { Feature } from "@/types";
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";

interface WhyUsProps {
  features: Feature[];
}

const ICONS = {
  shield: Shield,
  truck: Truck,
  headset: Headset,
  "credit-card": CreditCard,
  "rotate-ccw": RotateCcw,
};

export default function WhyUs({ features }: WhyUsProps) {
  return (
    <section className="bg-beige py-16">
      <div className="container-page text-center">
        <p className="eyebrow">چرا نورا؟</p>
        <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
          خریدی مطمئن، تجربه‌ای دلنشین
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-body">
          ما فقط گوشی نمی‌فروشیم؛ آرامش خاطر و یک تجربه‌ی خرید انسانی را
          برایت می‌سازیم.
        </p>

        <AnimatedSection
          stagger
          className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {features.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <AnimatedItem key={feature._id}>
                <div className="flex h-full flex-col items-center gap-3 rounded-card bg-surface p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-sm font-bold text-navy">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-5 text-body">
                    {feature.description}
                  </p>
                </div>
              </AnimatedItem>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
