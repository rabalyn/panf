// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Meals, MealsData, MealsPatch, MealsQuery, MealsService } from './meals.class'

export type { Meals, MealsData, MealsPatch, MealsQuery }

export type MealsClientService = Pick<MealsService<Params<MealsQuery>>, (typeof mealsMethods)[number]>

export const mealsPath = 'meals'

export const mealsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const mealsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(mealsPath, connection.service(mealsPath), {
    methods: mealsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [mealsPath]: MealsClientService
  }
}
