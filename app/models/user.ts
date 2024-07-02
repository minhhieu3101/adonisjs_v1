import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { randomUUID } from 'crypto'
import Role from './role.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {

  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column({columnName: 'full_name'})
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare address: string | null

  @column({columnName: 'phone_number'})
  declare phoneNumber: string | null

  @column.date()
  declare dob: DateTime | null
  
  @column()
  declare is_activated: boolean

  @hasOne(() => Role)
  declare profile: HasOne<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = randomUUID()
  }

  static accessTokens = DbAccessTokensProvider.forModel(User,{
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'jwt',
    tokenSecretLength: 40,
  })
}