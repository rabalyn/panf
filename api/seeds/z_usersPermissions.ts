import type { Knex } from 'knex'
import { v4 } from 'uuid'

export const seed = async function (knex: Knex): Promise<number[]> {
  // Deletes ALL existing entries
  await knex('user-permissions').del()
  const users = (await knex('users').where({ name: 'nils' }))
  const permissions = (await knex('permissions').where({ nameI18nKey: 'superuser' }))

  const seeds = [
    {
      id: v4(),
      userId: users[0].id,
      permissionId: permissions[0].id,
      createdAt: new Date().valueOf()
    }
  ]
  // Inserts seed entries
  return await knex('user-permissions').insert(seeds)
}
