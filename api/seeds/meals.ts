import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    nameI18nKey: 'margherita',
    priceInCents: '750',
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    nameI18nKey: 'salami',
    priceInCents: '850',
    createdAt: new Date().valueOf()
  }
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('meals').del()
  // Inserts seed entries
  return await knex('meals').insert(seeds)
}
