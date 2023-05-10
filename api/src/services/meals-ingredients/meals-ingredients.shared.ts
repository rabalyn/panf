// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  MealsIngredients,
  MealsIngredientsData,
  MealsIngredientsPatch,
  MealsIngredientsQuery,
  MealsIngredientsService
} from './meals-ingredients.class'

export type { MealsIngredients, MealsIngredientsData, MealsIngredientsPatch, MealsIngredientsQuery }

export type MealsIngredientsClientService = Pick<
  MealsIngredientsService<Params<MealsIngredientsQuery>>,
  (typeof mealsIngredientsMethods)[number]
>

export const mealsIngredientsPath = 'meals-ingredients'

export const mealsIngredientsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const mealsIngredientsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(mealsIngredientsPath, connection.service(mealsIngredientsPath), {
    methods: mealsIngredientsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [mealsIngredientsPath]: MealsIngredientsClientService
  }
}
