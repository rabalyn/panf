// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userPermissionsDataValidator,
  userPermissionsPatchValidator,
  userPermissionsQueryValidator,
  userPermissionsResolver,
  userPermissionsExternalResolver,
  userPermissionsDataResolver,
  userPermissionsPatchResolver,
  userPermissionsQueryResolver
} from './user-permissions.schema'

import type { Application } from '../../declarations'
import { UserPermissionsService, getOptions } from './user-permissions.class'
import { userPermissionsPath, userPermissionsMethods } from './user-permissions.shared'

export * from './user-permissions.class'
export * from './user-permissions.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userPermissions = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userPermissionsPath, new UserPermissionsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userPermissionsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userPermissionsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(userPermissionsExternalResolver),
        schemaHooks.resolveResult(userPermissionsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(userPermissionsQueryValidator),
        schemaHooks.resolveQuery(userPermissionsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userPermissionsDataValidator),
        schemaHooks.resolveData(userPermissionsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(userPermissionsPatchValidator),
        schemaHooks.resolveData(userPermissionsPatchResolver)
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
    [userPermissionsPath]: UserPermissionsService
  }
}
