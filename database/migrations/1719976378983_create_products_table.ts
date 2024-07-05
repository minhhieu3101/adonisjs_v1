import { BaseSchema } from '@adonisjs/lucid/schema'
import { Status } from '../../types/enum.js'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique()
      table.string('product_name').notNullable()
      table.string('description').nullable()
      table.integer('price').notNullable()
      table.integer('quantity_in_stock').notNullable()
      table.string('status').notNullable().defaultTo(Status.available)
      table.string('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}