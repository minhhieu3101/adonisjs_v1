
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import { ProductStatus } from '../../types/enum.js'
import Picture from './picture.js'
import ModelUtil from './model_util.js'
import OrderProduct from './order_product.js'

export default class Product extends ModelUtil {

  @column({columnName: 'product_name'})
  declare name: string
  
  @column()
  declare description: string

  @column()
  declare price: number

  @column({columnName: 'quantity_in_stock'})
  declare quantityInStock: number

  @column()
  declare status: ProductStatus

  @column({columnName: 'category_id'})
  declare categoryId: string

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => OrderProduct , {
    foreignKey: 'productId'
  })
  declare order_product: HasMany<typeof OrderProduct>

  @hasMany(() => Picture , {
    foreignKey: 'productId'
  })
  declare picture: HasMany<typeof Picture>
}