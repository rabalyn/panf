import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    isActive: true,
    isPublic: true,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    isActive: true,
    isPublic: false,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    isActive: false,
    isPublic: false,
    orderdate: new Date().valueOf(),
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    isActive: false,
    isPublic: true,
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
