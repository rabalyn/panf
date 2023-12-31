// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const ordersUsersSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    orderId: Type.String({ format: 'uuid' }),
    userId: Type.String({ format: 'uuid' }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'OrdersUsers', additionalProperties: false }
)
export type OrdersUsers = Static<typeof ordersUsersSchema>
export const ordersUsersValidator = getValidator(ordersUsersSchema, dataValidator)
export const ordersUsersResolver = resolve<OrdersUsers, HookContext>({})

export const ordersUsersExternalResolver = resolve<OrdersUsers, HookContext>({})

// Schema for creating new entries
export const ordersUsersDataSchema = Type.Pick(ordersUsersSchema, ['orderId', 'userId'], {
  $id: 'OrdersUsersData'
})
export type OrdersUsersData = Static<typeof ordersUsersDataSchema>
export const ordersUsersDataValidator = getValidator(ordersUsersDataSchema, dataValidator)
export const ordersUsersDataResolver = resolve<OrdersUsers, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const ordersUsersPatchSchema = Type.Partial(ordersUsersSchema, {
  $id: 'OrdersUsersPatch'
})
export type OrdersUsersPatch = Static<typeof ordersUsersPatchSchema>
export const ordersUsersPatchValidator = getValidator(ordersUsersPatchSchema, dataValidator)
export const ordersUsersPatchResolver = resolve<OrdersUsers, HookContext>({
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const ordersUsersQueryProperties = Type.Pick(ordersUsersSchema, ['id', 'orderId', 'userId'])
export const ordersUsersQuerySchema = Type.Intersect(
  [
    querySyntax(ordersUsersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OrdersUsersQuery = Static<typeof ordersUsersQuerySchema>
export const ordersUsersQueryValidator = getValidator(ordersUsersQuerySchema, queryValidator)
export const ordersUsersQueryResolver = resolve<OrdersUsersQuery, HookContext>({})
