import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    decription: vine.string().trim().nullable(),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().nullable(),
    decription: vine.string().trim().nullable(),
  })
)

