import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import parseDuration from 'parse-duration'
import { JwtAccessTokenProvider, JwtSecret } from '#providers/jwt_access_token_provider'
import { ModelStatus, RoleEnum } from '../../types/enum.js'
import ModelUtil from './model_util.js'
import Order from './order.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(ModelUtil, AuthFinder) {

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
  declare role: RoleEnum

  @column()
  declare otp: number

  @column()
  declare status: ModelStatus

  @hasMany(() => Order , {
    foreignKey: 'userId'
  })
  declare order: HasMany<typeof Order>

  static accessTokens = JwtAccessTokenProvider.forModel(User, {
    expiresInMillis: parseDuration('1 day')!,
    key: new JwtSecret('BjBZ-s9JFJTBwUsOo1Ml-fzkCqja_byX'),
    primaryKey: 'id',
    algorithm: 'HS256',
    audience: 'https://client.example.com',
    issuer: 'https://server.example.com',
  })
}