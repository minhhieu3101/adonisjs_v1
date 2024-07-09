
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ModelUtil from './model_util.js'
import OrderProduct from './order_product.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Order extends ModelUtil {
  @column({columnName: 'total_price'})
  declare totalPrice: number

  @column()
  declare address: string

  @column({columnName: 'user_id'})
  declare userId: string

  @hasMany(() => OrderProduct , {
    foreignKey: 'orderId'
  })
  declare order_product: HasMany<typeof OrderProduct>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}