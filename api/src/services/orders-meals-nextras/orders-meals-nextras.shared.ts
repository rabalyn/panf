// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  OrdersMealsNextras,
  OrdersMealsNextrasData,
  OrdersMealsNextrasPatch,
  OrdersMealsNextrasQuery,
  OrdersMealsNextrasService
} from './orders-meals-nextras.class'

export type { OrdersMealsNextras, OrdersMealsNextrasData, OrdersMealsNextrasPatch, OrdersMealsNextrasQuery }

export type OrdersMealsNextrasClientService = Pick<
  OrdersMealsNextrasService<Params<OrdersMealsNextrasQuery>>,
  (typeof ordersMealsNextrasMethods)[number]
>

export const ordersMealsNextrasPath = 'orders-meals-nextras'

export const ordersMealsNextrasMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ordersMealsNextrasClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ordersMealsNextrasPath, connection.service(ordersMealsNextrasPath), {
    methods: ordersMealsNextrasMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ordersMealsNextrasPath]: OrdersMealsNextrasClientService
  }
}
