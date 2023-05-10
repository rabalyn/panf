// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Configs, ConfigsData, ConfigsPatch, ConfigsQuery } from './configs.schema'

export type { Configs, ConfigsData, ConfigsPatch, ConfigsQuery }

export interface ConfigsParams extends KnexAdapterParams<ConfigsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ConfigsService<ServiceParams extends Params = ConfigsParams> extends KnexService<
  Configs,
  ConfigsData,
  ConfigsParams,
  ConfigsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'configs'
  }
}
