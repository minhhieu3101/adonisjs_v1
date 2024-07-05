
import {belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ModelUtil from './model_util.js'

export default class Picture extends ModelUtil {
  @column()
  declare url: string

  @column({columnName: 'product_id'})
  declare productId: string

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}