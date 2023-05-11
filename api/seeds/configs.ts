import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    key: 'isMaintenancemode',
    val: 'false',
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    key: 'isMotd',
    val: 'false',
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    key: 'motdMessage',
    val: '',
    createdAt: new Date().valueOf()
  }
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('configs').del()
  // Inserts seed entries
  return await knex('configs').insert(seeds)
}
