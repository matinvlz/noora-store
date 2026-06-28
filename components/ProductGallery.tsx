"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityImage } from "@/types";
import { cn, imageUrl } from "@/lib/utils";

interface ProductGalleryProps {
  images: SanityImage[];
  name: string;
  gradient?: boolean;
}

export default function ProductGallery({
  images,
  name,
  gradient = false,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const shots = images.length ? images : [];
  const current = shots[active];

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-lightgray shadow-card">
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-coral to-fuchsia-500" />
        )}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={imageUrl(current)}
                alt={current.alt || name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {shots.length > 1 && (
        <div className="mt-4 flex gap-3">
          {shots.map((shot, i) => (
            <button
              key={shot.asset._id + i}
              onClick={() => setActive(i)}
              aria-label={`تصویر ${i + 1}`}
              className={cn(
                "relative h-20 w-16 overflow-hidden rounded-xl border-2 transition-colors",
                active === i ? "border-teal" : "border-transparent"
              )}
            >
              <Image
                src={imageUrl(shot)}
                alt={shot.alt || name}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
