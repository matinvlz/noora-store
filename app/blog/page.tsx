import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/sanity/data";
import { imageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "بلاگ | نورا",
  description: "تازه‌ترین اخبار، راهنماهای خرید و ترفندهای دنیای موبایل.",
};

export const revalidate = 3600;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const [lead, ...rest] = posts;

  return (
    <main className="container-page py-10">
      <header>
        <p className="eyebrow">بلاگ نورا</p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-navy sm:text-4xl">
          مجله موبایل
        </h1>
      </header>

      {/* Lead article — editorial, asymmetric */}
      {lead && (
        <Link
          href={`/blog/${lead.slug}`}
          className="group mt-8 grid overflow-hidden rounded-card bg-surface shadow-card transition-shadow hover:shadow-card-hover md:grid-cols-2"
        >
          <div className="relative aspect-[16/10] md:aspect-auto">
            <Image
              src={imageUrl(lead.coverImage)}
              alt={lead.coverImage.alt || lead.title}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-6 text-right sm:p-8">
            <span className="self-start rounded-pill bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
              {lead.category}
            </span>
            <h2 className="mt-3 text-2xl font-extrabold leading-snug text-navy">
              {lead.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-body">{lead.excerpt}</p>
            <p className="mt-4 text-xs text-body/70">
              {formatDate(lead.publishedAt)}
            </p>
          </div>
        </Link>
      )}

      {/* Rest — masonry-ish grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-card bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={imageUrl(post.coverImage)}
                alt={post.coverImage.alt || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-pill bg-navy/90 px-2.5 py-1 text-[11px] font-bold text-white">
                {post.category}
              </span>
            </div>
            <div className="p-5 text-right">
              <p className="text-xs text-body/70">
                {formatDate(post.publishedAt)}
              </p>
              <h3 className="mt-2 text-base font-bold leading-7 text-navy">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-body">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
