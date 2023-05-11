import * as bcrypt from 'bcryptjs'
import type { Knex } from 'knex'
import { v4 } from 'uuid'

const seeds = [
  {
    id: v4(),
    name: 'nils',
    password: bcrypt.hashSync('nils', 10),
    createdAt: new Date().valueOf()
  }
]

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('users').del()
  // Inserts seed entries
  return await knex('users').insert(seeds)
}
