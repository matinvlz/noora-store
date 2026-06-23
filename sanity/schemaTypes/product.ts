import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "محصول",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "نام محصول",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "برند",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "تصویر محصول",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "گالری تصاویر",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "توضیحات کامل",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "specs",
      title: "مشخصات فنی",
      type: "array",
      of: [
        defineField({
          name: "spec",
          title: "مشخصه",
          type: "object",
          fields: [
            defineField({ name: "label", title: "عنوان", type: "string" }),
            defineField({ name: "value", title: "مقدار", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "imageVariant",
      title: "سبک تصویر کارت",
      description:
        "studio = زمینه روشن استودیویی، gradient = زمینه گرادیان رنگی",
      type: "string",
      options: {
        list: [
          { title: "استودیویی (روشن)", value: "studio" },
          { title: "گرادیان رنگی", value: "gradient" },
        ],
      },
      initialValue: "studio",
    }),
    defineField({
      name: "badge",
      title: "برچسب",
      type: "string",
      options: {
        list: [
          { title: "پرچم‌دار", value: "پرچم‌دار" },
          { title: "میان‌رده", value: "میان‌رده" },
          { title: "ارزان", value: "ارزان" },
          { title: "5G", value: "5G" },
        ],
      },
    }),
    defineField({
      name: "category",
      title: "دسته‌بندی فیلتر",
      description: "برای نمایش در تب‌های فیلتر صفحه اصلی",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "همه", value: "all" },
          { title: "پرچم‌دار", value: "flagship" },
          { title: "میان‌رده", value: "midrange" },
          { title: "ارزان", value: "budget" },
          { title: "5G", value: "5g" },
        ],
      },
    }),
    defineField({
      name: "rating",
      title: "امتیاز",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "price",
      title: "قیمت فعلی (تومان)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "قیمت قبل از تخفیف (تومان)",
      description: "در صورت وجود، به‌صورت خط‌خورده نمایش داده می‌شود",
      type: "number",
    }),
    defineField({
      name: "stock",
      title: "موجودی انبار",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).integer(),
    }),
    defineField({
      name: "dealEndsAt",
      title: "پایان تخفیف (تایمر شمارش معکوس)",
      description:
        "در صورت تنظیم، محصول در بخش «تخفیف‌ها» با شمارش معکوس نمایش داده می‌شود",
      type: "datetime",
    }),
    defineField({
      name: "isBestSeller",
      title: "پرفروش‌ترین؟",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "ترتیب نمایش",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", media: "image", subtitle: "brand.name" },
  },
});
