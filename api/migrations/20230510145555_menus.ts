// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('menus', (table) => {
    table.uuid('id')

    table.string('nameI18nKey')
    table.string('phone')
    table.string('email')
    table.string('street')
    table.string('zipcode')
    table.integer('createdAt')
    table.integer('updatedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('menus')
}
