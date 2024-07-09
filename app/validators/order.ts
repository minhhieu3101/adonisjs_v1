import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    product_data: vine.array(
      vine.object({
        id: vine.string().trim(),
        quantity: vine.number(),
      })
    ),
    address: vine.string().trim().nullable()
  })
)
