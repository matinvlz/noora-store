import Hero from "@/components/Hero";
import BrandShowcase from "@/components/BrandShowcase";
import DiscountsSection from "@/components/DiscountsSection";
import ProductGrid from "@/components/ProductGrid";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import {
  getSiteSettings,
  getBrands,
  getProducts,
  getBestSellers,
  getDeals,
  getFeatures,
  getTestimonials,
  getBlogPosts,
} from "@/lib/sanity/data";

// Revalidate every hour — adjust or switch to on-demand revalidation via
// a Sanity webhook once the project is wired to a live dataset.
export const revalidate = 3600;

export default async function HomePage() {
  const [
    settings,
    brands,
    products,
    bestSellers,
    deals,
    features,
    testimonials,
    posts,
  ] = await Promise.all([
    getSiteSettings(),
    getBrands(),
    getProducts(),
    getBestSellers(),
    getDeals(),
    getFeatures(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <main>
      <Hero settings={settings} />
        <BrandShowcase brands={brands} products={products} />
        <DiscountsSection deals={deals} />
        <ProductGrid products={products} />
        <BestSellers products={bestSellers} />
        <WhyUs features={features} />
        <Testimonials testimonials={testimonials} />
      <BlogSection posts={posts} />
    </main>
  );
}
