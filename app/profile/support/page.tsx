"use client";

import { useState } from "react";
import { Headphones, Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";

import ProfileShell from "@/components/ProfileShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CHANNELS = [
  { icon: Phone, label: "تماس تلفنی", value: "۰۲۱-۹۱۰۰۸۸۰۰" },
  { icon: Mail, label: "ایمیل", value: "support@noora.example" },
  { icon: MessageCircle, label: "پشتیبانی آنلاین", value: "هر روز ۹ تا ۲۱" },
];

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock ticket creation — wire to a real helpdesk in a later phase.
    const id = `TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubject("");
    setMessage("");
  };

  return (
    <ProfileShell
      title="پشتیبانی"
      description="ثبت تیکت یا تماس با تیم نورا"
      icon={Headphones}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CHANNELS.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-card border border-hairline bg-surface p-4 shadow-soft"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-xs text-body">{label}</p>
              <p className="text-sm font-bold text-navy" dir="ltr">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-card border border-hairline bg-surface p-5 shadow-soft sm:p-6"
      >
        <h2 className="text-sm font-bold text-navy">ثبت تیکت جدید</h2>

        {ticketId && (
          <div className="mt-4 flex items-center gap-2 rounded-card bg-teal/10 p-3 text-sm font-semibold text-teal">
            <CheckCircle2 size={18} />
            تیکت شما با شماره
            <span className="font-mono" dir="ltr">
              {ticketId}
            </span>
            ثبت شد. به‌زودی پاسخ می‌دهیم.
          </div>
        )}

        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">موضوع</span>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="مثلاً پیگیری سفارش"
            required
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">پیام</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="توضیح کامل درخواست خود را بنویسید…"
            required
            rows={4}
            className="flex w-full rounded-card border border-hairline bg-surface px-3 py-2 text-sm text-navy placeholder:text-body/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          />
        </label>

        <Button type="submit" variant="coral" className="mt-5">
          ارسال تیکت
        </Button>
      </form>
    </ProfileShell>
  );
}
