// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  OrdersUsers,
  OrdersUsersData,
  OrdersUsersPatch,
  OrdersUsersQuery,
  OrdersUsersService
} from './orders-users.class'

export type { OrdersUsers, OrdersUsersData, OrdersUsersPatch, OrdersUsersQuery }

export type OrdersUsersClientService = Pick<
  OrdersUsersService<Params<OrdersUsersQuery>>,
  (typeof ordersUsersMethods)[number]
>

export const ordersUsersPath = 'orders-users'

export const ordersUsersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ordersUsersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ordersUsersPath, connection.service(ordersUsersPath), {
    methods: ordersUsersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ordersUsersPath]: OrdersUsersClientService
  }
}
