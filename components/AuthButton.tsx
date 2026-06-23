"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, UserCircle } from "lucide-react";

import { useAuth } from "@/lib/store/auth";
import { useHydrated } from "@/lib/use-hydrated";

export default function AuthButton() {
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const [open, setOpen] = useState(false);

  // Before hydration (or logged out) render a link to login to keep SSR/client
  // markup stable and avoid a hydration mismatch.
  if (!hydrated || !user) {
    return (
      <Link
        href="/auth/login"
        aria-label="ورود به حساب"
        className="flex items-center gap-1.5 rounded-pill px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-lightgray"
      >
        <User size={20} />
        <span className="hidden sm:inline">ورود</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        aria-label="حساب کاربری"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white transition-transform hover:scale-105"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-12 z-50 w-52 overflow-hidden rounded-card border border-hairline bg-surface p-1.5 shadow-card-hover"
            >
              <div className="border-b border-hairline px-3 py-2 text-right">
                <p className="truncate text-sm font-bold text-navy">
                  {user.name}
                </p>
                <p className="truncate text-xs text-body">{user.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-navy transition-colors hover:bg-lightgray"
              >
                <UserCircle size={16} />
                پروفایل من
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-coral transition-colors hover:bg-coral/10"
              >
                <LogOut size={16} />
                خروج از حساب
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
