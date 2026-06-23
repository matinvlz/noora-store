"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  name: string;
  mobile: string;
}

interface OtpResult {
  ok: boolean;
  error?: string;
  /** Returned only in this client-side mock so the UI can show a demo hint. */
  code?: string;
}

interface AuthState {
  user: AuthUser | null;
  pendingMobile: string | null;
  pendingCode: string | null;
  pendingName: string | null;
  requestOtp: (mobile: string, name?: string) => OtpResult;
  verifyOtp: (code: string) => { ok: boolean; error?: string };
  resetOtp: () => void;
  logout: () => void;
}

const MOBILE_RE = /^09\d{9}$/;

// Client-side mock OTP auth. `requestOtp` generates a 4-digit code and returns
// it so the UI can surface a demo hint; swap requestOtp/verifyOtp for a real
// SMS provider (Kavenegar, Twilio, …) without touching the consuming UI.
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      pendingMobile: null,
      pendingCode: null,
      pendingName: null,
      requestOtp: (mobile, name) => {
        const m = mobile.trim();
        if (!MOBILE_RE.test(m))
          return { ok: false, error: "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)." };
        // const code = String(Math.floor(1000 + Math.random() * 9000));
        const code = "1234";
        set({ pendingMobile: m, pendingCode: code, pendingName: name ?? null });
        return { ok: true, code };
      },
      verifyOtp: (code) => {
        const { pendingCode, pendingMobile, pendingName } = get();
        if (!pendingCode || !pendingMobile)
          return { ok: false, error: "ابتدا شماره موبایل را وارد کنید." };
        if (code.trim() !== pendingCode)
          return { ok: false, error: "کد تأیید نادرست است." };
        set({
          user: {
            name: pendingName?.trim() || pendingMobile,
            mobile: pendingMobile,
          },
          pendingMobile: null,
          pendingCode: null,
          pendingName: null,
        });
        return { ok: true };
      },
      resetOtp: () =>
        set({ pendingMobile: null, pendingCode: null, pendingName: null }),
      logout: () => set({ user: null }),
    }),
    {
      name: "noora-auth",
      // Only persist the authenticated user; pending OTP state stays in memory.
      partialize: (s) => ({ user: s.user }),
    }
  )
);
