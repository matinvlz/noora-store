"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Use "stagger" on a parent wrapping AnimatedItem children */
  stagger?: boolean;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/**
 * Wraps a section/block so it fades + slides up the first time it
 * scrolls into view. Pass `stagger` to make it a stagger container for
 * nested <AnimatedItem /> children instead of animating itself.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger ? staggerParent : fadeUp}
      transition={!stagger ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside a `stagger` AnimatedSection. */
export function AnimatedItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
