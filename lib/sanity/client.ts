import { createClient } from "@sanity/client";

// Falls back to a placeholder project ID when unset so the client can be
// constructed without throwing. lib/sanity/data.ts checks
// NEXT_PUBLIC_SANITY_PROJECT_ID itself and skips calling this client
// entirely until a real project ID is configured.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  // Always read through the CDN: it serves cached, public, edge-distributed
  // reads and sidesteps the stricter rate/network restrictions of the
  // uncached live API. A read token (when set) is still honored by the CDN.
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});
