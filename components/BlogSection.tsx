import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { imageUrl } from "@/lib/utils";
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";

interface BlogSectionProps {
  posts: BlogPost[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="bg-lightgray/60 py-16">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">بلاگ نورا</p>
            <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
              جدیدترین مقاله‌ها و راهنماها
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-teal transition-colors hover:text-teal/80"
          >
            همه مقاله‌ها ←
          </Link>
        </div>

        <AnimatedSection
          stagger
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <AnimatedItem key={post._id}>
              <article className="group h-full overflow-hidden rounded-card bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-card-hover">
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
                  <p className="mt-2 text-sm leading-6 text-body">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-block text-sm font-semibold text-teal transition-colors hover:text-teal/80"
                  >
                    ادامه مطلب ←
                  </Link>
                </div>
              </article>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
