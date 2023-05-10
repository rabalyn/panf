// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { OrdersMeta, OrdersMetaData, OrdersMetaPatch, OrdersMetaQuery } from './orders-meta.schema'

export type { OrdersMeta, OrdersMetaData, OrdersMetaPatch, OrdersMetaQuery }

export interface OrdersMetaParams extends KnexAdapterParams<OrdersMetaQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class OrdersMetaService<ServiceParams extends Params = OrdersMetaParams> extends KnexService<
  OrdersMeta,
  OrdersMetaData,
  OrdersMetaParams,
  OrdersMetaPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'orders-meta'
  }
}
