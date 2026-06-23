import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "تنظیمات سایت",
  type: "document",
  // Intended to be a singleton — restrict creation to one document via
  // your Studio's structure builder.
  fields: [
    defineField({
      name: "siteName",
      title: "نام فروشگاه",
      type: "string",
      initialValue: "نورا",
    }),
    defineField({
      name: "heroTitle",
      title: "عنوان هیرو",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "توضیح هیرو",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "تصویر هیرو",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ratingValue",
      title: "امتیاز کلی فروشگاه",
      type: "number",
      initialValue: 4.9,
    }),
    defineField({
      name: "ratingCount",
      title: "تعداد نظرات",
      type: "number",
      initialValue: 12000,
    }),
  ],
});
