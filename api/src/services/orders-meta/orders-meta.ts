// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ordersMetaDataValidator,
  ordersMetaPatchValidator,
  ordersMetaQueryValidator,
  ordersMetaResolver,
  ordersMetaExternalResolver,
  ordersMetaDataResolver,
  ordersMetaPatchResolver,
  ordersMetaQueryResolver
} from './orders-meta.schema'

import type { Application } from '../../declarations'
import { OrdersMetaService, getOptions } from './orders-meta.class'
import { ordersMetaPath, ordersMetaMethods } from './orders-meta.shared'

export * from './orders-meta.class'
export * from './orders-meta.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ordersMeta = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ordersMetaPath, new OrdersMetaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ordersMetaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ordersMetaPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ordersMetaExternalResolver),
        schemaHooks.resolveResult(ordersMetaResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ordersMetaQueryValidator),
        schemaHooks.resolveQuery(ordersMetaQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ordersMetaDataValidator),
        schemaHooks.resolveData(ordersMetaDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ordersMetaPatchValidator),
        schemaHooks.resolveData(ordersMetaPatchResolver)
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
    [ordersMetaPath]: OrdersMetaService
  }
}
