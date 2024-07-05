import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
    vine.object({
      name: vine.string().trim().minLength(0),
      description: vine.string().trim().nullable(),
      price: vine.number(),
      quantityInStock: vine.number(),
      categoryId: vine.string().uuid(),
      picture: vine.array(vine.file())
    })
  )