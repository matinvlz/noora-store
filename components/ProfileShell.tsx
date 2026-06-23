"use client";

import { useEffect, type ReactNode, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { useAuth } from "@/lib/store/auth";
import { useHydrated } from "@/lib/use-hydrated";

interface ProfileShellProps {
  title: string;
  description?: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  children: ReactNode;
}

/**
 * Shared shell for the /profile sub-pages: enforces the same auth guard as the
 * profile dashboard, and renders a consistent titled header with a back link.
 */
export default function ProfileShell({
  title,
  description,
  icon: Icon,
  children,
}: ProfileShellProps) {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);

  useEffect(() => {
    if (hydrated && !user) router.replace("/auth/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <main className="container-page flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-body">در حال بارگذاری…</p>
      </main>
    );
  }

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/profile"
        className="mb-5 inline-flex items-center gap-1 text-sm font-semibold text-body transition-colors hover:text-navy"
      >
        <ChevronRight size={18} />
        بازگشت به حساب کاربری
      </Link>

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
          <Icon size={20} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-navy sm:text-2xl">{title}</h1>
          {description && <p className="text-sm text-body">{description}</p>}
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </main>
  );
}
