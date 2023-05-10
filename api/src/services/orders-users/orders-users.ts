// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ordersUsersDataValidator,
  ordersUsersPatchValidator,
  ordersUsersQueryValidator,
  ordersUsersResolver,
  ordersUsersExternalResolver,
  ordersUsersDataResolver,
  ordersUsersPatchResolver,
  ordersUsersQueryResolver
} from './orders-users.schema'

import type { Application } from '../../declarations'
import { OrdersUsersService, getOptions } from './orders-users.class'
import { ordersUsersPath, ordersUsersMethods } from './orders-users.shared'

export * from './orders-users.class'
export * from './orders-users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ordersUsers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ordersUsersPath, new OrdersUsersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ordersUsersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ordersUsersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(ordersUsersExternalResolver),
        schemaHooks.resolveResult(ordersUsersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ordersUsersQueryValidator),
        schemaHooks.resolveQuery(ordersUsersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ordersUsersDataValidator),
        schemaHooks.resolveData(ordersUsersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ordersUsersPatchValidator),
        schemaHooks.resolveData(ordersUsersPatchResolver)
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
    [ordersUsersPath]: OrdersUsersService
  }
}
