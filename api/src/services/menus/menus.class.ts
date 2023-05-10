// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Menus, MenusData, MenusPatch, MenusQuery } from './menus.schema'

export type { Menus, MenusData, MenusPatch, MenusQuery }

export interface MenusParams extends KnexAdapterParams<MenusQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MenusService<ServiceParams extends Params = MenusParams> extends KnexService<
  Menus,
  MenusData,
  MenusParams,
  MenusPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'menus'
  }
}
