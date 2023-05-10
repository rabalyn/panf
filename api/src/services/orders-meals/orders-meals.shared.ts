// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  OrdersMeals,
  OrdersMealsData,
  OrdersMealsPatch,
  OrdersMealsQuery,
  OrdersMealsService
} from './orders-meals.class'

export type { OrdersMeals, OrdersMealsData, OrdersMealsPatch, OrdersMealsQuery }

export type OrdersMealsClientService = Pick<
  OrdersMealsService<Params<OrdersMealsQuery>>,
  (typeof ordersMealsMethods)[number]
>

export const ordersMealsPath = 'orders-meals'

export const ordersMealsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ordersMealsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ordersMealsPath, connection.service(ordersMealsPath), {
    methods: ordersMealsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ordersMealsPath]: OrdersMealsClientService
  }
}
