// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ordersMealsExtrasDataValidator,
  ordersMealsExtrasPatchValidator,
  ordersMealsExtrasQueryValidator,
  ordersMealsExtrasResolver,
  ordersMealsExtrasExternalResolver,
  ordersMealsExtrasDataResolver,
  ordersMealsExtrasPatchResolver,
  ordersMealsExtrasQueryResolver
} from './orders-meals-extras.schema'

import type { Application } from '../../declarations'
import { OrdersMealsExtrasService, getOptions } from './orders-meals-extras.class'
import { ordersMealsExtrasPath, ordersMealsExtrasMethods } from './orders-meals-extras.shared'

export * from './orders-meals-extras.class'
export * from './orders-meals-extras.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ordersMealsExtras = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ordersMealsExtrasPath, new OrdersMealsExtrasService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ordersMealsExtrasMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ordersMealsExtrasPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ordersMealsExtrasExternalResolver),
        schemaHooks.resolveResult(ordersMealsExtrasResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ordersMealsExtrasQueryValidator),
        schemaHooks.resolveQuery(ordersMealsExtrasQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ordersMealsExtrasDataValidator),
        schemaHooks.resolveData(ordersMealsExtrasDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ordersMealsExtrasPatchValidator),
        schemaHooks.resolveData(ordersMealsExtrasPatchResolver)
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
    [ordersMealsExtrasPath]: OrdersMealsExtrasService
  }
}
