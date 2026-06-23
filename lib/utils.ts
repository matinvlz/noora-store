import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Toman price with Persian digits and grouping. */
export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

/** Discount percentage from original→current price, rounded. */
export function discountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}
