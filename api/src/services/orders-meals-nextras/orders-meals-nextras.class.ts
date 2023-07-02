// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  OrdersMealsNextras,
  OrdersMealsNextrasData,
  OrdersMealsNextrasPatch,
  OrdersMealsNextrasQuery
} from './orders-meals-nextras.schema'

export type { OrdersMealsNextras, OrdersMealsNextrasData, OrdersMealsNextrasPatch, OrdersMealsNextrasQuery }

export interface OrdersMealsNextrasParams extends KnexAdapterParams<OrdersMealsNextrasQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class OrdersMealsNextrasService<
  ServiceParams extends Params = OrdersMealsNextrasParams
> extends KnexService<
  OrdersMealsNextras,
  OrdersMealsNextrasData,
  OrdersMealsNextrasParams,
  OrdersMealsNextrasPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'orders-meals-nextras'
  }
}
