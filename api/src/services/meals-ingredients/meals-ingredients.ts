// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  mealsIngredientsDataValidator,
  mealsIngredientsPatchValidator,
  mealsIngredientsQueryValidator,
  mealsIngredientsResolver,
  mealsIngredientsExternalResolver,
  mealsIngredientsDataResolver,
  mealsIngredientsPatchResolver,
  mealsIngredientsQueryResolver
} from './meals-ingredients.schema'

import type { Application } from '../../declarations'
import { MealsIngredientsService, getOptions } from './meals-ingredients.class'
import { mealsIngredientsPath, mealsIngredientsMethods } from './meals-ingredients.shared'

export * from './meals-ingredients.class'
export * from './meals-ingredients.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const mealsIngredients = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mealsIngredientsPath, new MealsIngredientsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mealsIngredientsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mealsIngredientsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(mealsIngredientsExternalResolver),
        schemaHooks.resolveResult(mealsIngredientsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(mealsIngredientsQueryValidator),
        schemaHooks.resolveQuery(mealsIngredientsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(mealsIngredientsDataValidator),
        schemaHooks.resolveData(mealsIngredientsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(mealsIngredientsPatchValidator),
        schemaHooks.resolveData(mealsIngredientsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [mealsIngredientsPath]: MealsIngredientsService
  }
}
