// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  OrdersMealsExtras,
  OrdersMealsExtrasData,
  OrdersMealsExtrasPatch,
  OrdersMealsExtrasQuery
} from './orders-meals-extras.schema'

export type { OrdersMealsExtras, OrdersMealsExtrasData, OrdersMealsExtrasPatch, OrdersMealsExtrasQuery }

export interface OrdersMealsExtrasParams extends KnexAdapterParams<OrdersMealsExtrasQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class OrdersMealsExtrasService<
  ServiceParams extends Params = OrdersMealsExtrasParams
> extends KnexService<
  OrdersMealsExtras,
  OrdersMealsExtrasData,
  OrdersMealsExtrasParams,
  OrdersMealsExtrasPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'orders-meals-extras'
  }
}
