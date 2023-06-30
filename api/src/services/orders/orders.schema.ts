// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ordersSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    isActive: Type.Boolean(),
    isPublic: Type.Boolean(),
    orderdate: Type.Integer({ minimum: 1 }),
    pickuptime: Type.Integer({ minimum: 1 }),
    collector: Type.String(),
    caller: Type.String(),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'Orders', additionalProperties: false }
)
export type Orders = Static<typeof ordersSchema>
export const ordersValidator = getValidator(ordersSchema, dataValidator)
export const ordersResolver = resolve<Orders, HookContext>({})

export const ordersExternalResolver = resolve<Orders, HookContext>({})

// Schema for creating new entries
export const ordersDataSchema = Type.Pick(ordersSchema, ['isActive', 'isPublic'], {
  $id: 'OrdersData'
})
export type OrdersData = Static<typeof ordersDataSchema>
export const ordersDataValidator = getValidator(ordersDataSchema, dataValidator)
export const ordersDataResolver = resolve<Orders, HookContext>({
  orderdate: async () => {
    return new Date().valueOf()
  },
  createdAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for updating existing entries
export const ordersPatchSchema = Type.Partial(ordersSchema, {
  $id: 'OrdersPatch'
})
export type OrdersPatch = Static<typeof ordersPatchSchema>
export const ordersPatchValidator = getValidator(ordersPatchSchema, dataValidator)
export const ordersPatchResolver = resolve<Orders, HookContext>({
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const ordersQueryProperties = Type.Pick(ordersSchema, ['id', 'isActive'])
export const ordersQuerySchema = Type.Intersect(
  [
    querySyntax(ordersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OrdersQuery = Static<typeof ordersQuerySchema>
export const ordersQueryValidator = getValidator(ordersQuerySchema, queryValidator)
export const ordersQueryResolver = resolve<OrdersQuery, HookContext>({})
