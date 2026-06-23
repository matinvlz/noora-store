"use client";

import nextDynamic from "next/dynamic";

// The Sanity Studio is browser-only; load it with ssr:false so its React
// context providers are never evaluated during server page-collection.
const StudioClient = nextDynamic(() => import("@/components/StudioClient"), {
  ssr: false,
});

export default function StudioPage() {
  return <StudioClient />;
}
