import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    nameI18nKey: 'davinci',
    phone: '06151 1111111',
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    nameI18nKey: 'hobbit',
    phone: '06151 2222222',
    createdAt: new Date().valueOf()
  }
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('menus').del()
  // Inserts seed entries
  return await knex('menus').insert(seeds)
}
