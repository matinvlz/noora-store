"use client";

import nextDynamic from "next/dynamic";

const StudioClient = nextDynamic(() => import("@/components/StudioClient"), {
  ssr: false,
});

export default function StudioPageClient() {
  return <StudioClient />;
}
