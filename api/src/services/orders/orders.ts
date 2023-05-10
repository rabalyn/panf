// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ordersDataValidator,
  ordersPatchValidator,
  ordersQueryValidator,
  ordersResolver,
  ordersExternalResolver,
  ordersDataResolver,
  ordersPatchResolver,
  ordersQueryResolver
} from './orders.schema'

import type { Application } from '../../declarations'
import { OrdersService, getOptions } from './orders.class'
import { ordersPath, ordersMethods } from './orders.shared'

export * from './orders.class'
export * from './orders.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const orders = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ordersPath, new OrdersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ordersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ordersPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(ordersExternalResolver), schemaHooks.resolveResult(ordersResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(ordersQueryValidator), schemaHooks.resolveQuery(ordersQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(ordersDataValidator), schemaHooks.resolveData(ordersDataResolver)],
      patch: [schemaHooks.validateData(ordersPatchValidator), schemaHooks.resolveData(ordersPatchResolver)],
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
    [ordersPath]: OrdersService
  }
}
