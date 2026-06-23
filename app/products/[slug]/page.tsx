import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

import ProductGallery from "@/components/ProductGallery";
import ProductPurchase from "@/components/ProductPurchase";
import Countdown from "@/components/Countdown";
import { Badge } from "@/components/ui/badge";
import { getProduct, getProductSlugs } from "@/lib/sanity/data";
import { formatToman, discountPercent } from "@/lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "محصول یافت نشد | نورا" };
  return {
    title: `${product.name} | نورا`,
    description: product.description?.slice(0, 150),
  };
}

const TRUST = [
  { icon: ShieldCheck, label: "ضمانت اصالت کالا" },
  { icon: Truck, label: "ارسال رایگان و سریع" },
  { icon: RotateCcw, label: "۷ روز ضمانت بازگشت" },
];

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const off = discountPercent(product.price, product.originalPrice);
  const gallery =
    product.gallery && product.gallery.length
      ? product.gallery
      : [product.image];

  return (
    <main className="container-page py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-body">
        <Link href="/" className="transition-colors hover:text-navy">
          خانه
        </Link>
        <span>/</span>
        <Link href="/products" className="transition-colors hover:text-navy">
          گوشی‌ها
        </Link>
        <span>/</span>
        <span className="text-navy">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery
          images={gallery}
          name={product.name}
          gradient={product.imageVariant === "gradient"}
        />

        {/* Info */}
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/brands"
              className="text-sm font-semibold text-teal transition-colors hover:text-teal/80"
            >
              {product.brand.name}
            </Link>
            {product.badge && <Badge>{product.badge}</Badge>}
          </div>

          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-navy">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-1.5 text-sm text-body">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-navy">{product.rating}</span>
            <span>از ۵</span>
          </div>

          {/* Price block */}
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold text-navy">
              {formatToman(product.price)}
              <span className="mr-1.5 text-sm font-normal text-body">تومان</span>
            </span>
            {product.originalPrice && (
              <span className="text-base text-body/60 line-through">
                {formatToman(product.originalPrice)}
              </span>
            )}
            {off > 0 && <Badge variant="coral">٪{formatToman(off)}- تخفیف</Badge>}
          </div>

          {/* Countdown for active deals */}
          {product.dealEndsAt && new Date(product.dealEndsAt) > new Date() && (
            <div className="mt-5 rounded-card bg-navy/[0.03] p-4">
              <p className="mb-2 text-xs font-semibold text-coral">
                پایان فرصت این تخفیف:
              </p>
              <Countdown endsAt={product.dealEndsAt} />
            </div>
          )}

          {/* Purchase actions (client) */}
          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>

          {/* Trust badges */}
          <ul className="mt-7 grid grid-cols-1 gap-3 border-t border-hairline pt-6 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs text-body">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Icon size={16} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description + Specs */}
      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        {product.description && (
          <section className="lg:col-span-3">
            <h2 className="text-xl font-bold text-navy">معرفی محصول</h2>
            <p className="mt-4 text-sm leading-8 text-body">
              {product.description}
            </p>
          </section>
        )}

        {product.specs && product.specs.length > 0 && (
          <section className="lg:col-span-2">
            <h2 className="text-xl font-bold text-navy">مشخصات فنی</h2>
            <dl className="mt-4 overflow-hidden rounded-card border border-hairline">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between gap-4 px-4 py-3 text-sm ${
                    i % 2 === 0 ? "bg-surface" : "bg-lightgray/60"
                  }`}
                >
                  <dt className="text-body">{spec.label}</dt>
                  <dd className="text-left font-semibold text-navy">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>

      <Link
        href="/products"
        className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-teal/80"
      >
        <ArrowRight size={15} />
        بازگشت به همه گوشی‌ها
      </Link>
    </main>
  );
}
