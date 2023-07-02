import type { Knex } from 'knex'
import { v4 } from 'uuid'
import { Meals } from '../src/client'

const seeds: Meals[] = [
  {
    id: v4(),
    nameI18nKey: 'margherita',
    type: 'pizza',
    priceInCents: 750,
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    nameI18nKey: 'salami',
    type: 'pizza',
    priceInCents: 850,
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    nameI18nKey: 'caesar',
    type: 'salad',
    priceInCents: 600,
    createdAt: new Date().valueOf()
  }
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('meals').del()
  // Inserts seed entries
  return await knex('meals').insert(seeds)
}
