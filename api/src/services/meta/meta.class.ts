// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Meta, MetaData, MetaPatch, MetaQuery } from './meta.schema'

export type { Meta, MetaData, MetaPatch, MetaQuery }

export interface MetaParams extends KnexAdapterParams<MetaQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MetaService<ServiceParams extends Params = MetaParams> extends KnexService<
  Meta,
  MetaData,
  MetaParams,
  MetaPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'meta'
  }
}
