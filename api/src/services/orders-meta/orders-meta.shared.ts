// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  OrdersMeta,
  OrdersMetaData,
  OrdersMetaPatch,
  OrdersMetaQuery,
  OrdersMetaService
} from './orders-meta.class'

export type { OrdersMeta, OrdersMetaData, OrdersMetaPatch, OrdersMetaQuery }

export type OrdersMetaClientService = Pick<
  OrdersMetaService<Params<OrdersMetaQuery>>,
  (typeof ordersMetaMethods)[number]
>

export const ordersMetaPath = 'orders-meta'

export const ordersMetaMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ordersMetaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ordersMetaPath, connection.service(ordersMetaPath), {
    methods: ordersMetaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ordersMetaPath]: OrdersMetaClientService
  }
}
