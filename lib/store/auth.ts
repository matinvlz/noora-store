"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (
    name: string,
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  logout: () => void;
}

// Lightweight client-side mock auth. Validates input shape and persists a
// session to localStorage — swap for NextAuth/Clerk by replacing these
// actions; the rest of the UI consumes `user` and is provider-agnostic.
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
          return { ok: false, error: "ایمیل معتبر نیست." };
        if (password.length < 6)
          return { ok: false, error: "رمز عبور باید حداقل ۶ کاراکتر باشد." };
        set({ user: { name: email.split("@")[0], email } });
        return { ok: true };
      },
      register: (name, email, password) => {
        if (name.trim().length < 2)
          return { ok: false, error: "نام را کامل وارد کنید." };
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
          return { ok: false, error: "ایمیل معتبر نیست." };
        if (password.length < 6)
          return { ok: false, error: "رمز عبور باید حداقل ۶ کاراکتر باشد." };
        set({ user: { name: name.trim(), email } });
        return { ok: true };
      },
      logout: () => set({ user: null }),
    }),
    { name: "noora-auth" }
  )
);
