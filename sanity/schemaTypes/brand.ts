import { defineField, defineType } from "sanity";

export default defineType({
  name: "brand",
  title: "برند",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "نام برند",
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
      name: "logo",
      title: "لوگو",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "ترتیب نمایش",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
