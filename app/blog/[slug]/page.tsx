import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";

import { getBlogPost, getAllBlogPosts } from "@/lib/sanity/data";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "مقاله یافت نشد | نورا" };
  return {
    title: `${post.title} | بلاگ نورا`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main className="container-page max-w-3xl py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-teal/80"
      >
        <ArrowRight size={15} />
        بازگشت به بلاگ
      </Link>

      <article className="mt-6">
        <span className="rounded-pill bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-body/70">
          {formatDate(post.publishedAt)}
        </p>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-card">
          <Image
            src={post.coverImage.asset.url}
            alt={post.coverImage.alt || post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose-noora mt-8 space-y-4 text-right text-base leading-8 text-body">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
