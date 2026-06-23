import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "مقاله بلاگ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "عنوان",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "خلاصه",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "دسته‌بندی",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "تصویر کاور",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "تاریخ انتشار",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "متن مقاله",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "category" },
  },
});
