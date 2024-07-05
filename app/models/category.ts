
import { column, hasMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { ModelStatus } from '../../types/enum.js'
import ModelUtil from './model_util.js'

export default class Category extends ModelUtil {
  @column({columnName: 'category_name'})
  declare name: string
  
  @column()
  declare description: string
  
  @column()
  declare status: ModelStatus

  @hasMany(() => Product , {
    foreignKey: 'categoryId'
  })
  declare products: HasMany<typeof Product>
}