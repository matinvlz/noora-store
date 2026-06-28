"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Zap, Star, CheckCircle2 } from "lucide-react";
import type { SiteSettings } from "@/types";
import { imageUrl } from "@/lib/utils";

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  return (
    <section className="container-page grid grid-cols-1 items-center gap-10 pt-10 pb-16 lg:grid-cols-2 lg:pt-16">
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="relative order-1 mx-auto w-full max-w-sm lg:order-2"
      >
        {/* Ambient gradient glow behind the phone, matches design's soft blur */}
        <div className="absolute inset-8 -z-10 rounded-full bg-gradient-to-tr from-teal/25 via-coral/10 to-transparent blur-3xl" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-card">
          <Image
            src={imageUrl(settings.heroImage)}
            alt={settings.heroImage.alt || settings.heroTitle}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 480px"
            className="object-contain p-8"
          />
        </div>

        {/* Floating rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="absolute -left-4 top-6 flex items-center gap-2 rounded-2xl bg-surface px-3 py-2 shadow-card lg:-left-8"
        >
          <Star size={16} className="fill-amber-400 text-amber-400" />
          <div className="text-xs leading-tight">
            <p className="font-bold text-navy">
              {settings.ratingValue} از ۵
            </p>
            <p className="text-body/70">
              {Intl.NumberFormat("fa-IR").format(settings.ratingCount)} نظر
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Copy side */}
      <div className="order-2 text-center lg:order-1 lg:text-right">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow"
        >
          فروشگاه تخصصی موبایل
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-4xl font-extrabold leading-tight text-navy sm:text-5xl"
        >
          {settings.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-md text-base leading-7 text-body lg:mr-0"
        >
          {settings.heroDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-bold text-white shadow-soft transition-shadow hover:shadow-card-hover"
          >
            <Zap size={16} />
            خرید فوری
          </motion.a>

          <motion.a
            href="#products"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-pill bg-navy px-6 py-3 text-sm font-bold text-white shadow-soft transition-shadow hover:shadow-card-hover"
          >
            <Heart size={16} />
            مشاهده همه مدل‌ها
          </motion.a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-body lg:justify-start"
        >
          {[
            "ضمانت اصالت کالا",
            "ارسال رایگان",
            "۷ روز ضمانت بازگشت",
          ].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-teal" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
