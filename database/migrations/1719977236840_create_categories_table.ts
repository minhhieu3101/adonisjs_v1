import { BaseSchema } from '@adonisjs/lucid/schema'
import { ModelStatus } from '../../types/enum.js'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique()
      table.string('category_name').notNullable()
      table.string('description').nullable()
      table.string('status').notNullable().defaultTo(ModelStatus.active)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}