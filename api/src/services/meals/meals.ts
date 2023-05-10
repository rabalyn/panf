// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  mealsDataValidator,
  mealsPatchValidator,
  mealsQueryValidator,
  mealsResolver,
  mealsExternalResolver,
  mealsDataResolver,
  mealsPatchResolver,
  mealsQueryResolver
} from './meals.schema'

import type { Application } from '../../declarations'
import { MealsService, getOptions } from './meals.class'
import { mealsPath, mealsMethods } from './meals.shared'

export * from './meals.class'
export * from './meals.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const meals = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mealsPath, new MealsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mealsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mealsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(mealsExternalResolver), schemaHooks.resolveResult(mealsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(mealsQueryValidator), schemaHooks.resolveQuery(mealsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(mealsDataValidator), schemaHooks.resolveData(mealsDataResolver)],
      patch: [schemaHooks.validateData(mealsPatchValidator), schemaHooks.resolveData(mealsPatchResolver)],
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
    [mealsPath]: MealsService
  }
}
