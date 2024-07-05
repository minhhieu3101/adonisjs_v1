import { BaseSchema } from '@adonisjs/lucid/schema'
import { ModelStatus, RoleEnum } from '../../types/enum.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('phone_number').notNullable()
      table.string('address').notNullable()
      table.string('role').notNullable().defaultTo(RoleEnum.user)
      table.string('status').notNullable().defaultTo(ModelStatus.active)
      table.timestamp('dob').nullable
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}