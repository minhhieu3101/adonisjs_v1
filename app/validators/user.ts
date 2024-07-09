import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(0),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value, field) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(8),
    address: vine.string().trim().nullable(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(0).nullable(),
    address: vine.string().trim().nullable(),
  })
)

export const verifyUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(0),
    otp: vine.number().range([1000,9999]),
  })
)
