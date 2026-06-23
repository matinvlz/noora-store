import { createClient } from "@sanity/client";

// Falls back to a placeholder project ID when unset so the client can be
// constructed without throwing. lib/sanity/data.ts checks
// NEXT_PUBLIC_SANITY_PROJECT_ID itself and skips calling this client
// entirely until a real project ID is configured.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  // Use the CDN in production for fast, cached reads. Disable for
  // preview/draft contexts where you need the freshest data.
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});
