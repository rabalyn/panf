import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    nameI18nKey: 'superuser',
    createdAt: new Date().valueOf()
  }
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('permissions').del()
  // Inserts seed entries
  return await knex('permissions').insert(seeds)
}
