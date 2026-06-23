"use client";

import { useState } from "react";
import { MapPin, Check } from "lucide-react";

import ProfileShell from "@/components/ProfileShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Address {
  fullName: string;
  province: string;
  city: string;
  line: string;
  postalCode: string;
}

const INITIAL: Address = {
  fullName: "",
  province: "تهران",
  city: "تهران",
  line: "خیابان ولیعصر، کوچه نیلوفر، پلاک ۱۲، واحد ۳",
  postalCode: "",
};

export default function AddressesPage() {
  const [address, setAddress] = useState<Address>(INITIAL);
  const [saved, setSaved] = useState(false);

  const update =
    (key: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((a) => ({ ...a, [key]: e.target.value }));
      setSaved(false);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — persist to a real API in a later phase.
    setSaved(true);
  };

  return (
    <ProfileShell
      title="آدرس‌ها"
      description="نشانی ارسال سفارش‌های خود را مدیریت کنید"
      icon={MapPin}
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-card border border-hairline bg-surface p-5 shadow-soft sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-navy">
              نام و نام خانوادگی گیرنده
            </span>
            <Input
              value={address.fullName}
              onChange={update("fullName")}
              placeholder="مثلاً نگار احمدی"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-navy">
              کد پستی
            </span>
            <Input
              value={address.postalCode}
              onChange={update("postalCode")}
              placeholder="۱۰ رقم"
              inputMode="numeric"
              dir="ltr"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-navy">
              استان
            </span>
            <Input value={address.province} onChange={update("province")} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-navy">
              شهر
            </span>
            <Input value={address.city} onChange={update("city")} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-navy">
              نشانی کامل
            </span>
            <Input
              value={address.line}
              onChange={update("line")}
              placeholder="خیابان، کوچه، پلاک، واحد"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" variant="coral">
            ذخیره آدرس
          </Button>
          {saved && (
            <span className="flex items-center gap-1 text-sm font-semibold text-teal">
              <Check size={16} />
              آدرس ذخیره شد
            </span>
          )}
        </div>
      </form>
    </ProfileShell>
  );
}
