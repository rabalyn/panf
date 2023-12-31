// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders-meals', (table) => {
    table.uuid('id')

    table.uuid('orderId')
    table.uuid('mealId')
    table.string('name')
    table.uuid('mealExtraId')
    table.uuid('mealNextraId')

    table.integer('createdAt')
    table.integer('updatedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders-meals')
}
