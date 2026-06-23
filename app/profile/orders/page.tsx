"use client";

import Link from "next/link";
import { Package, Truck, CheckCircle2 } from "lucide-react";

import ProfileShell from "@/components/ProfileShell";
import { Badge } from "@/components/ui/badge";
import { formatToman } from "@/lib/utils";

interface MockOrder {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "active" | "delivered";
  statusLabel: string;
}

// Mock order history — replace with a real orders API in a later phase.
const ORDERS: MockOrder[] = [
  {
    id: "NRA-100482",
    date: "۱۴۰۵/۰۳/۲۸",
    items: 1,
    total: 62_900_000,
    status: "active",
    statusLabel: "در حال ارسال",
  },
  {
    id: "NRA-100217",
    date: "۱۴۰۵/۰۲/۱۱",
    items: 2,
    total: 48_800_000,
    status: "delivered",
    statusLabel: "تحویل شده",
  },
];

export default function OrdersPage() {
  return (
    <ProfileShell
      title="سفارش‌های من"
      description="پیگیری و تاریخچه خریدهای شما"
      icon={Package}
    >
      {ORDERS.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-surface py-16 text-center shadow-soft">
          <Package size={40} className="text-body/40" />
          <p className="text-sm text-body">هنوز سفارشی ثبت نکرده‌اید.</p>
          <Link
            href="/products"
            className="rounded-pill bg-navy px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-charcoal"
          >
            شروع خرید
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {ORDERS.map((order) => (
            <article
              key={order.id}
              className="rounded-card border border-hairline bg-surface p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-sm font-bold text-navy"
                    dir="ltr"
                  >
                    {order.id}
                  </span>
                  <Badge variant={order.status === "active" ? "coral" : "default"}>
                    <span className="flex items-center gap-1">
                      {order.status === "active" ? (
                        <Truck size={12} />
                      ) : (
                        <CheckCircle2 size={12} />
                      )}
                      {order.statusLabel}
                    </span>
                  </Badge>
                </div>
                <span className="text-xs text-body">{order.date}</span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4 text-sm">
                <span className="text-body">{formatToman(order.items)} کالا</span>
                <span className="font-extrabold text-navy">
                  {formatToman(order.total)}{" "}
                  <span className="text-xs font-normal text-body">تومان</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </ProfileShell>
  );
}
