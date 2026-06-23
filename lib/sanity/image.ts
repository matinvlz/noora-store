import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Builds an optimized, cropped Sanity CDN image URL.
 * Usage: urlForImage(product.image).width(700).height(1050).url()
 */
export function urlForImage(source: SanityImage) {
  return builder.image(source.asset);
}
