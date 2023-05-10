// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  mealsMenusDataValidator,
  mealsMenusPatchValidator,
  mealsMenusQueryValidator,
  mealsMenusResolver,
  mealsMenusExternalResolver,
  mealsMenusDataResolver,
  mealsMenusPatchResolver,
  mealsMenusQueryResolver
} from './meals-menus.schema'

import type { Application } from '../../declarations'
import { MealsMenusService, getOptions } from './meals-menus.class'
import { mealsMenusPath, mealsMenusMethods } from './meals-menus.shared'

export * from './meals-menus.class'
export * from './meals-menus.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const mealsMenus = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mealsMenusPath, new MealsMenusService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mealsMenusMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mealsMenusPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(mealsMenusExternalResolver),
        schemaHooks.resolveResult(mealsMenusResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(mealsMenusQueryValidator),
        schemaHooks.resolveQuery(mealsMenusQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(mealsMenusDataValidator),
        schemaHooks.resolveData(mealsMenusDataResolver)
      ],
      patch: [
        schemaHooks.validateData(mealsMenusPatchValidator),
        schemaHooks.resolveData(mealsMenusPatchResolver)
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
    [mealsMenusPath]: MealsMenusService
  }
}
