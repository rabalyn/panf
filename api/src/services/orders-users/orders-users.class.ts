// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { OrdersUsers, OrdersUsersData, OrdersUsersPatch, OrdersUsersQuery } from './orders-users.schema'

export type { OrdersUsers, OrdersUsersData, OrdersUsersPatch, OrdersUsersQuery }

export interface OrdersUsersParams extends KnexAdapterParams<OrdersUsersQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class OrdersUsersService<ServiceParams extends Params = OrdersUsersParams> extends KnexService<
  OrdersUsers,
  OrdersUsersData,
  OrdersUsersParams,
  OrdersUsersPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'orders-users'
  }
}
