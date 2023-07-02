// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ordersMealsNextrasDataValidator,
  ordersMealsNextrasPatchValidator,
  ordersMealsNextrasQueryValidator,
  ordersMealsNextrasResolver,
  ordersMealsNextrasExternalResolver,
  ordersMealsNextrasDataResolver,
  ordersMealsNextrasPatchResolver,
  ordersMealsNextrasQueryResolver
} from './orders-meals-nextras.schema'

import type { Application } from '../../declarations'
import { OrdersMealsNextrasService, getOptions } from './orders-meals-nextras.class'
import { ordersMealsNextrasPath, ordersMealsNextrasMethods } from './orders-meals-nextras.shared'

export * from './orders-meals-nextras.class'
export * from './orders-meals-nextras.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ordersMealsNextras = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ordersMealsNextrasPath, new OrdersMealsNextrasService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ordersMealsNextrasMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ordersMealsNextrasPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ordersMealsNextrasExternalResolver),
        schemaHooks.resolveResult(ordersMealsNextrasResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ordersMealsNextrasQueryValidator),
        schemaHooks.resolveQuery(ordersMealsNextrasQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ordersMealsNextrasDataValidator),
        schemaHooks.resolveData(ordersMealsNextrasDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ordersMealsNextrasPatchValidator),
        schemaHooks.resolveData(ordersMealsNextrasPatchResolver)
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
    [ordersMealsNextrasPath]: OrdersMealsNextrasService
  }
}
