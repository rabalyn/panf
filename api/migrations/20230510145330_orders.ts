// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id')

    table.boolean('isActive')
    table.boolean('isPublic')
    table.integer('orderdate')
    table.integer('pickuptime')
    table.string('collector')
    table.string('caller')

    table.integer('createdAt')
    table.integer('updatedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders')
}
