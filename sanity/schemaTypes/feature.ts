import { defineField, defineType } from "sanity";

export default defineType({
  name: "feature",
  title: "ویژگی (چرا نورا)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "عنوان",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "توضیح",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "آیکون",
      type: "string",
      options: {
        list: [
          { title: "گارانتی اصالت (shield)", value: "shield" },
          { title: "ارسال رایگان (truck)", value: "truck" },
          { title: "پشتیبانی (headset)", value: "headset" },
          { title: "اقساط (credit-card)", value: "credit-card" },
          { title: "بازگشت کالا (rotate-ccw)", value: "rotate-ccw" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "ترتیب نمایش",
      type: "number",
    }),
  ],
});
