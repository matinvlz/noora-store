import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16">
      <div className="container-page text-center">
        <p className="eyebrow">نظر مشتری‌ها</p>
        <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
          هزاران لبخند رضایت
        </h2>

        <AnimatedSection
          stagger
          className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <AnimatedItem key={t._id}>
              <div className="flex h-full flex-col gap-4 rounded-card bg-surface p-6 text-right shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex justify-end gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-body/20"
                      }
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-7 text-body">
                  «{t.quote}»
                </p>
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-navy">
                      {t.authorName}
                    </p>
                    <p className="text-xs text-body/70">{t.authorRole}</p>
                  </div>
                  {t.authorAvatar && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-lightgray">
                      <Image
                        src={t.authorAvatar.asset.url}
                        alt={t.authorName}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
