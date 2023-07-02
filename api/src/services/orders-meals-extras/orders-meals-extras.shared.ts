// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  OrdersMealsExtras,
  OrdersMealsExtrasData,
  OrdersMealsExtrasPatch,
  OrdersMealsExtrasQuery,
  OrdersMealsExtrasService
} from './orders-meals-extras.class'

export type { OrdersMealsExtras, OrdersMealsExtrasData, OrdersMealsExtrasPatch, OrdersMealsExtrasQuery }

export type OrdersMealsExtrasClientService = Pick<
  OrdersMealsExtrasService<Params<OrdersMealsExtrasQuery>>,
  (typeof ordersMealsExtrasMethods)[number]
>

export const ordersMealsExtrasPath = 'orders-meals-extras'

export const ordersMealsExtrasMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ordersMealsExtrasClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ordersMealsExtrasPath, connection.service(ordersMealsExtrasPath), {
    methods: ordersMealsExtrasMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ordersMealsExtrasPath]: OrdersMealsExtrasClientService
  }
}
