// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const userSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    name: Type.String(),
    displayName: Type.String(),
    password: Type.Optional(Type.String()),
    permissions: Type.Array(Type.String(), { minItems: 1 }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'User', additionalProperties: false }
)
export type User = Static<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext>({
  permissions: virtual(async (user, context) => {
    const userPermissions = await context.app.service('user-permissions').find({
      paginate: false,
      query: {
        userId: user.id,
        $select: ['permissionId']
      }
    })

    const userPermissionIds = userPermissions.map(x => x.permissionId)

    const permissions = await context.app.service('permissions').find({
      paginate: false,
      query: {
        id: { $in: userPermissionIds },
        $select: ['nameI18nKey']
      }
    })

    if (permissions.length > 0) {
      return permissions.map(x => x.nameI18nKey)
    } else {
      return ['user']
    }
  })
})

export const userExternalResolver = resolve<User, HookContext>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const userDataSchema = Type.Pick(userSchema, ['name', 'password'], {
  $id: 'UserData'
})
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext>({
  id: async () => v4(),
  password: passwordHash({ strategy: 'local' }),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' }),
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['id', 'name'])
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
})
