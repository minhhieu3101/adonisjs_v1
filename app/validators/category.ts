import vine from "@vinejs/vine";

export const createCategoryValidator = vine.compile(
    vine.object({
      name: vine.string().trim(),
      decription: vine.string().trim().nullable(),
    })
  )