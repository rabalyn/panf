import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    isActive: 1,
    isPublic: 1,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    isActive: 1,
    isPublic: 0,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    isActive: 0,
    isPublic: 0,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    isActive: 0,
    isPublic: 1,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('orders').del()
  // Inserts seed entries
  return await knex('orders').insert(seeds)
}
