import { BaseSchema } from '@adonisjs/lucid/schema'
import { OrderStatus } from '../../types/enum.js'

export default class extends BaseSchema {
  protected tableName = 'order_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique()
      table.string('order_id').unsigned().references('orders.id').onDelete('CASCADE')
      table.string('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table.integer('price').notNullable()
      table.integer('quantity').notNullable().defaultTo(1)
      table.string('order_status').notNullable().defaultTo(OrderStatus.pending)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}