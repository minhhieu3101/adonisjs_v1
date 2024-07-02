import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
      fullName: vine.string().trim().minLength(0),
      email: vine.string().email().normalizeEmail().unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .where('email', value)
          .first()
        return !user
      }),
      password: vine.string().trim().minLength(8),
      address: vine.string().trim().nullable(),
      phoneNumber: vine.string().trim().nullable(),
      // dob: vine.date().nullable()
    })
  )

  export const loginValidator = vine.compile(
    vine.object({
      email: vine.string().email().normalizeEmail(),
      password: vine.string().trim().minLength(8),
    })
  )