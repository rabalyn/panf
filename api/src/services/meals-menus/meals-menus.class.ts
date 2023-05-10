// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { MealsMenus, MealsMenusData, MealsMenusPatch, MealsMenusQuery } from './meals-menus.schema'

export type { MealsMenus, MealsMenusData, MealsMenusPatch, MealsMenusQuery }

export interface MealsMenusParams extends KnexAdapterParams<MealsMenusQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MealsMenusService<ServiceParams extends Params = MealsMenusParams> extends KnexService<
  MealsMenus,
  MealsMenusData,
  MealsMenusParams,
  MealsMenusPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'meals-menus'
  }
}
