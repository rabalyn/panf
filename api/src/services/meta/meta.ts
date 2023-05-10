// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  metaDataValidator,
  metaPatchValidator,
  metaQueryValidator,
  metaResolver,
  metaExternalResolver,
  metaDataResolver,
  metaPatchResolver,
  metaQueryResolver
} from './meta.schema'

import type { Application } from '../../declarations'
import { MetaService, getOptions } from './meta.class'
import { metaPath, metaMethods } from './meta.shared'

export * from './meta.class'
export * from './meta.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const meta = (app: Application) => {
  // Register our service on the Feathers application
  app.use(metaPath, new MetaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: metaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(metaPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(metaExternalResolver), schemaHooks.resolveResult(metaResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(metaQueryValidator), schemaHooks.resolveQuery(metaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(metaDataValidator), schemaHooks.resolveData(metaDataResolver)],
      patch: [schemaHooks.validateData(metaPatchValidator), schemaHooks.resolveData(metaPatchResolver)],
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
    [metaPath]: MetaService
  }
}
