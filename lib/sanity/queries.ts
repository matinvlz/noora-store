// GROQ queries — kept in one place so they're easy to audit and reuse
// across server components and any future API routes.

export const SITE_SETTINGS_QUERY = /* groq */ `
*[_type == "siteSettings"][0]{
  _id,
  siteName,
  heroTitle,
  heroDescription,
  ratingValue,
  ratingCount,
  heroImage{
    "asset": asset->{_id, url},
    alt
  }
}
`;

export const BRANDS_QUERY = /* groq */ `
*[_type == "brand"] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  logo{
    "asset": asset->{_id, url},
    alt
  }
}
`;

export const PRODUCTS_QUERY = /* groq */ `
*[_type == "product"] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  badge,
  category,
  rating,
  price,
  originalPrice,
  stock,
  dealEndsAt,
  isBestSeller,
  order,
  imageVariant,
  image{
    "asset": asset->{_id, url},
    alt
  },
  brand->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

export const BEST_SELLERS_QUERY = /* groq */ `
*[_type == "product" && isBestSeller == true] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  badge,
  category,
  rating,
  price,
  originalPrice,
  stock,
  imageVariant,
  image{
    "asset": asset->{_id, url},
    alt
  },
  brand->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

export const PRODUCT_BY_SLUG_QUERY = /* groq */ `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  badge,
  category,
  rating,
  price,
  originalPrice,
  stock,
  dealEndsAt,
  description,
  specs,
  imageVariant,
  image{
    "asset": asset->{_id, url},
    alt
  },
  gallery[]{
    "asset": asset->{_id, url},
    alt
  },
  brand->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

export const PRODUCT_SLUGS_QUERY = /* groq */ `
*[_type == "product" && defined(slug.current)].slug.current
`;

export const DEALS_QUERY = /* groq */ `
*[_type == "product" && defined(dealEndsAt) && dealEndsAt > now()] | order(dealEndsAt asc){
  _id,
  name,
  "slug": slug.current,
  badge,
  category,
  rating,
  price,
  originalPrice,
  stock,
  dealEndsAt,
  imageVariant,
  image{
    "asset": asset->{_id, url},
    alt
  },
  brand->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

export const FEATURES_QUERY = /* groq */ `
*[_type == "feature"] | order(order asc){
  _id,
  title,
  description,
  icon
}
`;

export const TESTIMONIALS_QUERY = /* groq */ `
*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  authorName,
  authorRole,
  rating,
  authorAvatar{
    "asset": asset->{_id, url},
    alt
  }
}
`;

const BLOG_POST_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  coverImage{
    "asset": asset->{_id, url},
    alt
  }
`;

export const BLOG_POSTS_QUERY = /* groq */ `
*[_type == "blogPost"] | order(publishedAt desc)[0...3]{${BLOG_POST_FIELDS}}
`;

export const ALL_BLOG_POSTS_QUERY = /* groq */ `
*[_type == "blogPost"] | order(publishedAt desc){${BLOG_POST_FIELDS}}
`;

export const BLOG_POST_BY_SLUG_QUERY = /* groq */ `
*[_type == "blogPost" && slug.current == $slug][0]{${BLOG_POST_FIELDS},
  body
}
`;

export const BLOG_SLUGS_QUERY = /* groq */ `
*[_type == "blogPost" && defined(slug.current)].slug.current
`;
