// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { OrdersMeals, OrdersMealsData, OrdersMealsPatch, OrdersMealsQuery } from './orders-meals.schema'

export type { OrdersMeals, OrdersMealsData, OrdersMealsPatch, OrdersMealsQuery }

export interface OrdersMealsParams extends KnexAdapterParams<OrdersMealsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class OrdersMealsService<ServiceParams extends Params = OrdersMealsParams> extends KnexService<
  OrdersMeals,
  OrdersMealsData,
  OrdersMealsParams,
  OrdersMealsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'orders-meals'
  }
}
