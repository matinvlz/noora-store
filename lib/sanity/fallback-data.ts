import type {
  SiteSettings,
  Brand,
  Product,
  Feature,
  Testimonial,
  BlogPost,
} from "@/types";

// Helper to build a minimal SanityImage-shaped object for static fallback
// assets living in /public instead of the Sanity CDN.
const img = (url: string, alt = "") => ({ asset: { _id: url, url }, alt });

// Rolling deal deadlines relative to now so the countdown timers always
// show live, future end dates regardless of when the demo is viewed.
const inHours = (h: number) => new Date(Date.now() + h * 3_600_000).toISOString();

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  _id: "site-settings",
  siteName: "نورا",
  heroTitle: "گوشی‌ای که عاشقش می‌شی",
  heroDescription:
    "کیفیت ساخت بی‌نظیر، دوربینی که لحظه‌هایت را زنده نگه می‌دارد و باتری‌ای که تا آخر روز همراهت است؛ همه با ضمانت اصالت نورا.",
  heroImage: img("/images/hero-phone.jpg", "گوشی‌ای که عاشقش می‌شی"),
  ratingValue: 4.9,
  ratingCount: 12000,
};

export const FALLBACK_BRANDS: Brand[] = [
  { _id: "b1", name: "سامسونگ", slug: "samsung" },
  { _id: "b2", name: "اپل", slug: "apple" },
  { _id: "b3", name: "شیائومی", slug: "xiaomi" },
  { _id: "b4", name: "گوگل", slug: "google" },
  { _id: "b5", name: "ناتینگ", slug: "nothing" },
  { _id: "b6", name: "سونی", slug: "sony" },
  { _id: "b7", name: "هواوی", slug: "huawei" },
];

const brandBySlug = (slug: string): Brand =>
  FALLBACK_BRANDS.find((b) => b.slug === slug) as Brand;

const BASE_PRODUCTS: Product[] = [
  {
    _id: "p1",
    name: "گلکسی S24 اولترا",
    slug: "galaxy-s24-ultra",
    brand: brandBySlug("samsung"),
    image: img("/images/products/galaxy-s24-ultra.jpg"),
    imageVariant: "studio",
    badge: "پرچم‌دار",
    category: ["all", "flagship"],
    rating: 4.9,
    price: 62_900_000,
    originalPrice: 68_000_000,
    stock: 8,
    dealEndsAt: inHours(36),
    isBestSeller: true,
    order: 1,
  },
  {
    _id: "p2",
    name: "آیفون ۱۵ پرو",
    slug: "iphone-15-pro",
    brand: brandBySlug("apple"),
    image: img("/images/products/iphone-15-pro.jpg"),
    imageVariant: "studio",
    badge: "پرچم‌دار",
    category: ["all", "flagship"],
    rating: 5,
    price: 84_500_000,
    stock: 5,
    isBestSeller: true,
    order: 2,
  },
  {
    _id: "p3",
    name: "ردمی نوت ۱۳",
    slug: "redmi-note-13",
    brand: brandBySlug("xiaomi"),
    image: img("/images/products/redmi-note-13.jpg"),
    imageVariant: "studio",
    badge: "میان‌رده",
    category: ["all", "midrange"],
    rating: 4.6,
    price: 14_900_000,
    originalPrice: 17_500_000,
    stock: 23,
    dealEndsAt: inHours(12),
    isBestSeller: true,
    order: 3,
  },
  {
    _id: "p4",
    name: "پیکسل ۸",
    slug: "pixel-8",
    brand: brandBySlug("google"),
    image: img("/images/products/pixel-8.jpg"),
    imageVariant: "gradient",
    badge: "5G",
    category: ["all", "5g"],
    rating: 4.8,
    price: 38_900_000,
    stock: 0,
    isBestSeller: true,
    order: 4,
  },
  {
    _id: "p5",
    name: "ناتینگ فون ۲",
    slug: "nothing-phone-2",
    brand: brandBySlug("nothing"),
    image: img("/images/products/nothing-phone-2.jpg"),
    imageVariant: "gradient",
    badge: "5G",
    category: ["all", "5g"],
    rating: 4.7,
    price: 29_900_000,
    originalPrice: 33_000_000,
    stock: 14,
    dealEndsAt: inHours(60),
    isBestSeller: true,
    order: 5,
  },
  {
    _id: "p6",
    name: "گلکسی A15",
    slug: "galaxy-a15",
    brand: brandBySlug("samsung"),
    image: img("/images/products/galaxy-a15.jpg"),
    imageVariant: "gradient",
    badge: "ارزان",
    category: ["all", "budget"],
    rating: 4.4,
    price: 9_900_000,
    originalPrice: 11_200_000,
    stock: 31,
    dealEndsAt: inHours(6),
    isBestSeller: true,
    order: 6,
  },
];

// Real per-model copy + spec sheets, keyed by product _id. Merged into the
// base products below so the detail page is fully populated without Sanity.
const PRODUCT_DETAILS: Record<
  string,
  { description: string; specs: { label: string; value: string }[] }
> = {
  p1: {
    description:
      "گلکسی S24 اولترا با نمایشگر داینامیک AMOLED ۲X، قاب تیتانیومی و قلم S Pen یکپارچه، تجربه‌ای بی‌نظیر از پرچم‌دار سامسونگ ارائه می‌دهد. دوربین ۲۰۰ مگاپیکسلی و پردازنده اسنپدراگون ۸ نسل ۳ آن را به انتخابی بی‌رقیب برای عکاسی و بازی تبدیل کرده است.",
    specs: [
      { label: "نمایشگر", value: "۶.۸ اینچ Dynamic AMOLED 2X، ۱۲۰ هرتز" },
      { label: "پردازنده", value: "Snapdragon 8 Gen 3" },
      { label: "حافظه", value: "۱۲ گیگابایت رم / ۲۵۶ گیگابایت" },
      { label: "دوربین اصلی", value: "۲۰۰ مگاپیکسل + ۵۰ + ۱۲ + ۱۰" },
      { label: "باتری", value: "۵۰۰۰ میلی‌آمپر، شارژ ۴۵ وات" },
    ],
  },
  p2: {
    description:
      "آیفون ۱۵ پرو با بدنه تیتانیومی سبک، تراشه قدرتمند A17 Pro و پورت USB-C، نسلی تازه از پرچم‌داران اپل است. سیستم دوربین حرفه‌ای و دکمه Action قابل تنظیم، آن را برای کاربران حرفه‌ای ایده‌آل می‌کند.",
    specs: [
      { label: "نمایشگر", value: "۶.۱ اینچ Super Retina XDR، ProMotion" },
      { label: "پردازنده", value: "Apple A17 Pro" },
      { label: "حافظه", value: "۸ گیگابایت رم / ۲۵۶ گیگابایت" },
      { label: "دوربین اصلی", value: "۴۸ مگاپیکسل + ۱۲ + ۱۲" },
      { label: "باتری", value: "تا ۲۳ ساعت پخش ویدیو" },
    ],
  },
  p3: {
    description:
      "ردمی نوت ۱۳ با نمایشگر AMOLED روشن، دوربین ۱۰۸ مگاپیکسلی و باتری پرظرفیت، بهترین انتخاب در رده میان‌رده است. طراحی باریک و شارژ سریع، ارزش خرید بالایی به آن می‌بخشد.",
    specs: [
      { label: "نمایشگر", value: "۶.۶۷ اینچ AMOLED، ۱۲۰ هرتز" },
      { label: "پردازنده", value: "Snapdragon 685" },
      { label: "حافظه", value: "۸ گیگابایت رم / ۱۲۸ گیگابایت" },
      { label: "دوربین اصلی", value: "۱۰۸ مگاپیکسل + ۸ + ۲" },
      { label: "باتری", value: "۵۰۰۰ میلی‌آمپر، شارژ ۳۳ وات" },
    ],
  },
  p4: {
    description:
      "پیکسل ۸ با تراشه Google Tensor G3 و هوش مصنوعی پیشرفته، تجربه‌ای خالص از اندروید به همراه بهترین کیفیت عکاسی محاسباتی ارائه می‌دهد. به‌روزرسانی ۷ ساله، خیال شما را از آینده گوشی راحت می‌کند.",
    specs: [
      { label: "نمایشگر", value: "۶.۲ اینچ Actua OLED، ۱۲۰ هرتز" },
      { label: "پردازنده", value: "Google Tensor G3" },
      { label: "حافظه", value: "۸ گیگابایت رم / ۱۲۸ گیگابایت" },
      { label: "دوربین اصلی", value: "۵۰ مگاپیکسل + ۱۲" },
      { label: "باتری", value: "۴۵۷۵ میلی‌آمپر، شارژ ۲۷ وات" },
    ],
  },
  p5: {
    description:
      "ناتینگ فون ۲ با طراحی شفاف منحصربه‌فرد و رابط نوری Glyph، تجربه‌ای متفاوت و چشم‌نواز خلق می‌کند. عملکرد روان و نرم‌افزار تمیز Nothing OS، آن را به گوشی محبوب علاقه‌مندان به طراحی تبدیل کرده است.",
    specs: [
      { label: "نمایشگر", value: "۶.۷ اینچ LTPO OLED، ۱۲۰ هرتز" },
      { label: "پردازنده", value: "Snapdragon 8+ Gen 1" },
      { label: "حافظه", value: "۱۲ گیگابایت رم / ۲۵۶ گیگابایت" },
      { label: "دوربین اصلی", value: "۵۰ مگاپیکسل + ۵۰" },
      { label: "باتری", value: "۴۷۰۰ میلی‌آمپر، شارژ ۴۵ وات" },
    ],
  },
  p6: {
    description:
      "گلکسی A15 گزینه‌ای اقتصادی و مطمئن با نمایشگر Super AMOLED و باتری بادوام است. مناسب برای کاربران روزمره که کیفیت ساخت سامسونگ را با قیمتی مقرون‌به‌صرفه می‌خواهند.",
    specs: [
      { label: "نمایشگر", value: "۶.۵ اینچ Super AMOLED، ۹۰ هرتز" },
      { label: "پردازنده", value: "MediaTek Helio G99" },
      { label: "حافظه", value: "۶ گیگابایت رم / ۱۲۸ گیگابایت" },
      { label: "دوربین اصلی", value: "۵۰ مگاپیکسل + ۵ + ۲" },
      { label: "باتری", value: "۵۰۰۰ میلی‌آمپر، شارژ ۲۵ وات" },
    ],
  },
};

export const FALLBACK_PRODUCTS: Product[] = BASE_PRODUCTS.map((p) => ({
  ...p,
  gallery: [p.image],
  ...PRODUCT_DETAILS[p._id],
}));

export const FALLBACK_FEATURES: Feature[] = [
  {
    _id: "f1",
    icon: "shield",
    title: "گارانتی اصالت",
    description: "تضمین اصل بودن کالا با کد رهگیری معتبر.",
  },
  {
    _id: "f2",
    icon: "truck",
    title: "ارسال رایگان",
    description: "ارسال سریع و رایگان به سراسر کشور.",
  },
  {
    _id: "f3",
    icon: "headset",
    title: "پشتیبانی ۲۴ ساعته",
    description: "همیشه و در هر ساعت کنارت هستیم.",
  },
  {
    _id: "f4",
    icon: "credit-card",
    title: "اقساط بدون بهره",
    description: "خرید آسان با پرداخت اقساطی بدون سود.",
  },
  {
    _id: "f5",
    icon: "rotate-ccw",
    title: "۷ روز ضمانت بازگشت",
    description: "اگر راضی نبودی، کالا را برگردان.",
  },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "t1",
    quote:
      "دوربین گوشی‌ای که از نورا گرفتم فوق‌العاده‌ست. ارسال هم خیلی سریع بود و بسته‌بندی بی‌نقص.",
    authorName: "رضا کریمی",
    authorRole: "عکاس",
    rating: 5,
    authorAvatar: img("/images/avatars/reza.jpg"),
  },
  {
    _id: "t2",
    quote:
      "پشتیبانی نورا واقعاً انسانی و صبور بود. با خیال راحت اقساطی خرید کردم.",
    authorName: "امیر تهرانی",
    authorRole: "توسعه‌دهنده",
    rating: 5,
    authorAvatar: img("/images/avatars/amir.jpg"),
  },
  {
    _id: "t3",
    quote:
      "قیمت‌ها منصفانه و ضمانت اصالت خیالم را راحت کرد. حتماً دوباره خرید می‌کنم.",
    authorName: "نگار احمدی",
    authorRole: "دانشجو",
    rating: 5,
    authorAvatar: img("/images/avatars/negar.jpg"),
  },
];

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    _id: "bp1",
    title: "چطور بهترین گوشی متناسب با بودجه‌ات را انتخاب کنی؟",
    slug: "choose-phone-by-budget",
    excerpt: "راهنمای ساده برای انتخاب گوشی بر اساس نیاز، دوربین و عمر باتری.",
    category: "راهنمای خرید",
    publishedAt: "2026-05-20",
    coverImage: img("/images/blog/buying-guide.jpg"),
  },
  {
    _id: "bp2",
    title: "۷ ترفند برای عکاسی حرفه‌ای با موبایل",
    slug: "mobile-photography-tips",
    excerpt: "با این نکته‌های ساده عکس‌هایت را در سطح حرفه‌ای ارتقا بده.",
    category: "عکاسی",
    publishedAt: "2026-05-12",
    coverImage: img("/images/blog/photography.jpg"),
  },
  {
    _id: "bp3",
    title: "باتری گوشی را چطور سالم‌تر نگه داریم؟",
    slug: "battery-health-tips",
    excerpt: "عادت‌های شارژ که عمر باتری گوشی شما را چند برابر می‌کند.",
    category: "نگهداری",
    publishedAt: "2026-05-03",
    coverImage: img("/images/blog/battery.jpg"),
  },
];
