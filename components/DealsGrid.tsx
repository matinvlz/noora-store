"use client";

import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import Countdown from "./Countdown";

interface DealsGridProps {
  deals: Product[];
}

export default function DealsGrid({ deals }: DealsGridProps) {
  if (!deals.length) {
    return (
      <p className="mt-10 text-center text-sm text-body">
        در حال حاضر تخفیف فعالی وجود ندارد.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {deals.map((deal) => (
        <div key={deal._id} className="flex flex-col gap-2">
          {deal.dealEndsAt && (
            <div className="flex items-center justify-center rounded-card bg-navy/[0.03] py-2">
              <Countdown endsAt={deal.dealEndsAt} compact />
            </div>
          )}
          <ProductCard product={deal} />
        </div>
      ))}
    </div>
  );
}
