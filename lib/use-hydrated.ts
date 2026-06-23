"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client. Use to
 * gate rendering of persisted Zustand state (cart/wishlist counts) so the
 * server-rendered markup matches the first client paint and React doesn't
 * throw a hydration mismatch.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
