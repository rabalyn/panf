// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Meals, MealsData, MealsPatch, MealsQuery } from './meals.schema'

export type { Meals, MealsData, MealsPatch, MealsQuery }

export interface MealsParams extends KnexAdapterParams<MealsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MealsService<ServiceParams extends Params = MealsParams> extends KnexService<
  Meals,
  MealsData,
  MealsParams,
  MealsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'meals'
  }
}
