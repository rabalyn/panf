// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ordersMetaSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'OrdersMeta', additionalProperties: false }
)
export type OrdersMeta = Static<typeof ordersMetaSchema>
export const ordersMetaValidator = getValidator(ordersMetaSchema, dataValidator)
export const ordersMetaResolver = resolve<OrdersMeta, HookContext>({})

export const ordersMetaExternalResolver = resolve<OrdersMeta, HookContext>({})

// Schema for creating new entries
export const ordersMetaDataSchema = Type.Pick(ordersMetaSchema, ['text'], {
  $id: 'OrdersMetaData'
})
export type OrdersMetaData = Static<typeof ordersMetaDataSchema>
export const ordersMetaDataValidator = getValidator(ordersMetaDataSchema, dataValidator)
export const ordersMetaDataResolver = resolve<OrdersMeta, HookContext>({})

// Schema for updating existing entries
export const ordersMetaPatchSchema = Type.Partial(ordersMetaSchema, {
  $id: 'OrdersMetaPatch'
})
export type OrdersMetaPatch = Static<typeof ordersMetaPatchSchema>
export const ordersMetaPatchValidator = getValidator(ordersMetaPatchSchema, dataValidator)
export const ordersMetaPatchResolver = resolve<OrdersMeta, HookContext>({})

// Schema for allowed query properties
export const ordersMetaQueryProperties = Type.Pick(ordersMetaSchema, ['id', 'text'])
export const ordersMetaQuerySchema = Type.Intersect(
  [
    querySyntax(ordersMetaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OrdersMetaQuery = Static<typeof ordersMetaQuerySchema>
export const ordersMetaQueryValidator = getValidator(ordersMetaQuerySchema, queryValidator)
export const ordersMetaQueryResolver = resolve<OrdersMetaQuery, HookContext>({})
