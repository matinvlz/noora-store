import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "نظر مشتری",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "متن نظر",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "نام مشتری",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "شغل/نقش مشتری",
      type: "string",
    }),
    defineField({
      name: "authorAvatar",
      title: "تصویر مشتری",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "امتیاز",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "order",
      title: "ترتیب نمایش",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "authorRole" },
  },
});
