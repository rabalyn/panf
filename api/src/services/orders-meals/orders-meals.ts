// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ordersMealsDataValidator,
  ordersMealsPatchValidator,
  ordersMealsQueryValidator,
  ordersMealsResolver,
  ordersMealsExternalResolver,
  ordersMealsDataResolver,
  ordersMealsPatchResolver,
  ordersMealsQueryResolver
} from './orders-meals.schema'

import type { Application } from '../../declarations'
import { OrdersMealsService, getOptions } from './orders-meals.class'
import { ordersMealsPath, ordersMealsMethods } from './orders-meals.shared'

export * from './orders-meals.class'
export * from './orders-meals.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ordersMeals = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ordersMealsPath, new OrdersMealsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ordersMealsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ordersMealsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ordersMealsExternalResolver),
        schemaHooks.resolveResult(ordersMealsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ordersMealsQueryValidator),
        schemaHooks.resolveQuery(ordersMealsQueryResolver)
      ],
      find: [
        (context) => {
          context.params.paginate = false
        }
      ],
      get: [],
      create: [
        schemaHooks.validateData(ordersMealsDataValidator),
        schemaHooks.resolveData(ordersMealsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ordersMealsPatchValidator),
        schemaHooks.resolveData(ordersMealsPatchResolver)
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
    [ordersMealsPath]: OrdersMealsService
  }
}
