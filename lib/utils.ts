import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Toman price with Persian digits and grouping. */
export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

/** Branded placeholder shown until a real photo is uploaded in the CMS. */
export const PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * Safe image URL resolver. Live Sanity documents may not have a photo
 * uploaded yet, so we fall back to a branded placeholder instead of
 * letting next/image throw on an undefined src.
 */
export function imageUrl(
  img?: { asset?: { url?: string | null } | null } | null
): string {
  return img?.asset?.url || PLACEHOLDER_IMAGE;
}

/** Discount percentage from original→current price, rounded. */
export function discountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}
