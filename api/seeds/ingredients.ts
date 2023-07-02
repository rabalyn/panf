import { Ingredients } from './../src/services/ingredients/ingredients.schema';
import { Knex } from "knex"
import { v4 } from 'uuid'

const seeds: Ingredients[] = [
  {
    id: v4(),
    nameI18nKey: 'salami',
    priceInCents: 100,
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    nameI18nKey: 'cheese',
    priceInCents: 100,
    createdAt: new Date().valueOf()
  },
  {
    id: v4(),
    nameI18nKey: 'onion',
    priceInCents: 100,
    createdAt: new Date().valueOf()
  }
]


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('ingredients').del()

    // Inserts seed entries
    await knex('ingredients').insert(seeds)
};
