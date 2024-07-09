
import { belongsTo, column } from '@adonisjs/lucid/orm'
import ModelUtil from './model_util.js'
import Order from './order.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import { OrderStatus } from '../../types/enum.js'

export default class OrderProduct extends ModelUtil {
  @column({columnName: 'order_id'})
  declare orderId: string

  @column({columnName: 'product_id'})
  declare productId: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column({columnName: 'order_status'})
  declare orderStatus: OrderStatus

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}