// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const userPermissionsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    permissionId: Type.String({ format: 'uuid' }),
    userId: Type.String({ format: 'uuid' }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'UserPermissions', additionalProperties: false }
)
export type UserPermissions = Static<typeof userPermissionsSchema>
export const userPermissionsValidator = getValidator(userPermissionsSchema, dataValidator)
export const userPermissionsResolver = resolve<UserPermissions, HookContext>({})

export const userPermissionsExternalResolver = resolve<UserPermissions, HookContext>({})

// Schema for creating new entries
export const userPermissionsDataSchema = Type.Pick(userPermissionsSchema, ['permissionId', 'userId'], {
  $id: 'UserPermissionsData'
})
export type UserPermissionsData = Static<typeof userPermissionsDataSchema>
export const userPermissionsDataValidator = getValidator(userPermissionsDataSchema, dataValidator)
export const userPermissionsDataResolver = resolve<UserPermissions, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const userPermissionsPatchSchema = Type.Partial(userPermissionsSchema, {
  $id: 'UserPermissionsPatch'
})
export type UserPermissionsPatch = Static<typeof userPermissionsPatchSchema>
export const userPermissionsPatchValidator = getValidator(userPermissionsPatchSchema, dataValidator)
export const userPermissionsPatchResolver = resolve<UserPermissions, HookContext>({
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const userPermissionsQueryProperties = Type.Pick(userPermissionsSchema, ['id', 'permissionId', 'userId'])
export const userPermissionsQuerySchema = Type.Intersect(
  [
    querySyntax(userPermissionsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserPermissionsQuery = Static<typeof userPermissionsQuerySchema>
export const userPermissionsQueryValidator = getValidator(userPermissionsQuerySchema, queryValidator)
export const userPermissionsQueryResolver = resolve<UserPermissionsQuery, HookContext>({})
