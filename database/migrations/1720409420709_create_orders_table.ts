import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique()
      table.integer('total_price').notNullable()
      table.string('address').notNullable()
      table.string('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('updated_at')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}