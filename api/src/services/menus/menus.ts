// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  menusDataValidator,
  menusPatchValidator,
  menusQueryValidator,
  menusResolver,
  menusExternalResolver,
  menusDataResolver,
  menusPatchResolver,
  menusQueryResolver
} from './menus.schema'

import type { Application } from '../../declarations'
import { MenusService, getOptions } from './menus.class'
import { menusPath, menusMethods } from './menus.shared'

export * from './menus.class'
export * from './menus.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const menus = (app: Application) => {
  // Register our service on the Feathers application
  app.use(menusPath, new MenusService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: menusMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(menusPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(menusExternalResolver), schemaHooks.resolveResult(menusResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(menusQueryValidator), schemaHooks.resolveQuery(menusQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(menusDataValidator), schemaHooks.resolveData(menusDataResolver)],
      patch: [schemaHooks.validateData(menusPatchValidator), schemaHooks.resolveData(menusPatchResolver)],
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
    [menusPath]: MenusService
  }
}
