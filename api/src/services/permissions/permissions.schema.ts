// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const permissionsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    nameI18nKey: Type.String(),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'Permissions', additionalProperties: false }
)
export type Permissions = Static<typeof permissionsSchema>
export const permissionsValidator = getValidator(permissionsSchema, dataValidator)
export const permissionsResolver = resolve<Permissions, HookContext>({})

export const permissionsExternalResolver = resolve<Permissions, HookContext>({})

// Schema for creating new entries
export const permissionsDataSchema = Type.Pick(permissionsSchema, ['nameI18nKey'], {
  $id: 'PermissionsData'
})
export type PermissionsData = Static<typeof permissionsDataSchema>
export const permissionsDataValidator = getValidator(permissionsDataSchema, dataValidator)
export const permissionsDataResolver = resolve<Permissions, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const permissionsPatchSchema = Type.Partial(permissionsSchema, {
  $id: 'PermissionsPatch'
})
export type PermissionsPatch = Static<typeof permissionsPatchSchema>
export const permissionsPatchValidator = getValidator(permissionsPatchSchema, dataValidator)
export const permissionsPatchResolver = resolve<Permissions, HookContext>({
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const permissionsQueryProperties = Type.Pick(permissionsSchema, ['id', 'nameI18nKey'])
export const permissionsQuerySchema = Type.Intersect(
  [
    querySyntax(permissionsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PermissionsQuery = Static<typeof permissionsQuerySchema>
export const permissionsQueryValidator = getValidator(permissionsQuerySchema, queryValidator)
export const permissionsQueryResolver = resolve<PermissionsQuery, HookContext>({})
