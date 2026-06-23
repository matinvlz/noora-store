"use client";

import { ShieldCheck, Clock } from "lucide-react";

import ProfileShell from "@/components/ProfileShell";
import { Badge } from "@/components/ui/badge";

interface Warranty {
  product: string;
  code: string;
  startDate: string;
  endDate: string;
  monthsLeft: number;
}

// Mock active warranties — replace with a real warranty lookup later.
const WARRANTIES: Warranty[] = [
  {
    product: "گلکسی S24 اولترا",
    code: "WRT-S24U-7741",
    startDate: "۱۴۰۵/۰۳/۲۸",
    endDate: "۱۴۰۷/۰۳/۲۸",
    monthsLeft: 23,
  },
  {
    product: "ردمی نوت ۱۳",
    code: "WRT-RN13-2298",
    startDate: "۱۴۰۵/۰۲/۱۱",
    endDate: "۱۴۰۶/۰۲/۱۱",
    monthsLeft: 11,
  },
];

export default function WarrantyPage() {
  return (
    <ProfileShell
      title="ضمانت‌نامه‌ها"
      description="گارانتی کالاهای خریداری‌شده شما"
      icon={ShieldCheck}
    >
      {WARRANTIES.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-surface py-16 text-center shadow-soft">
          <ShieldCheck size={40} className="text-body/40" />
          <p className="text-sm text-body">ضمانت‌نامه فعالی ندارید.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {WARRANTIES.map((w) => (
            <article
              key={w.code}
              className="rounded-card border border-hairline bg-surface p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-navy">{w.product}</h2>
                <Badge variant="default">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} />
                    فعال
                  </span>
                </Badge>
              </div>

              <p className="mt-1 font-mono text-xs text-body" dir="ltr">
                {w.code}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4 text-xs text-body">
                <span>
                  از {w.startDate} تا {w.endDate}
                </span>
                <span className="flex items-center gap-1 font-semibold text-teal">
                  <Clock size={13} />
                  {w.monthsLeft} ماه باقی‌مانده
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </ProfileShell>
  );
}
