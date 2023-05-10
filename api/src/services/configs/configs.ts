// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  configsDataValidator,
  configsPatchValidator,
  configsQueryValidator,
  configsResolver,
  configsExternalResolver,
  configsDataResolver,
  configsPatchResolver,
  configsQueryResolver
} from './configs.schema'

import type { Application } from '../../declarations'
import { ConfigsService, getOptions } from './configs.class'
import { configsPath, configsMethods } from './configs.shared'

export * from './configs.class'
export * from './configs.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const configs = (app: Application) => {
  // Register our service on the Feathers application
  app.use(configsPath, new ConfigsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: configsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(configsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(configsExternalResolver),
        schemaHooks.resolveResult(configsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(configsQueryValidator), schemaHooks.resolveQuery(configsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(configsDataValidator), schemaHooks.resolveData(configsDataResolver)],
      patch: [schemaHooks.validateData(configsPatchValidator), schemaHooks.resolveData(configsPatchResolver)],
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
    [configsPath]: ConfigsService
  }
}
