// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Ingredients, IngredientsData, IngredientsPatch, IngredientsQuery } from './ingredients.schema'

export type { Ingredients, IngredientsData, IngredientsPatch, IngredientsQuery }

export interface IngredientsParams extends KnexAdapterParams<IngredientsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class IngredientsService<ServiceParams extends Params = IngredientsParams> extends KnexService<
  Ingredients,
  IngredientsData,
  IngredientsParams,
  IngredientsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'ingredients'
  }
}
