// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const ordersMealsExtrasSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    ordersMealsId: Type.String({ format: 'uuid' }),
    ingredientId: Type.String({ format: 'uuid' }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'OrdersMealsExtras', additionalProperties: false }
)
export type OrdersMealsExtras = Static<typeof ordersMealsExtrasSchema>
export const ordersMealsExtrasValidator = getValidator(ordersMealsExtrasSchema, dataValidator)
export const ordersMealsExtrasResolver = resolve<OrdersMealsExtras, HookContext>({})

export const ordersMealsExtrasExternalResolver = resolve<OrdersMealsExtras, HookContext>({})

// Schema for creating new entries
export const ordersMealsExtrasDataSchema = Type.Pick(ordersMealsExtrasSchema, ['ordersMealsId', 'ingredientId'], {
  $id: 'OrdersMealsExtrasData'
})
export type OrdersMealsExtrasData = Static<typeof ordersMealsExtrasDataSchema>
export const ordersMealsExtrasDataValidator = getValidator(ordersMealsExtrasDataSchema, dataValidator)
export const ordersMealsExtrasDataResolver = resolve<OrdersMealsExtras, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const ordersMealsExtrasPatchSchema = Type.Partial(ordersMealsExtrasSchema, {
  $id: 'OrdersMealsExtrasPatch'
})
export type OrdersMealsExtrasPatch = Static<typeof ordersMealsExtrasPatchSchema>
export const ordersMealsExtrasPatchValidator = getValidator(ordersMealsExtrasPatchSchema, dataValidator)
export const ordersMealsExtrasPatchResolver = resolve<OrdersMealsExtras, HookContext>({
  updatedAt: async () => new Date().valueOf()
})

// Schema for allowed query properties
export const ordersMealsExtrasQueryProperties = Type.Pick(ordersMealsExtrasSchema, ['id', 'ordersMealsId', 'ingredientId'])
export const ordersMealsExtrasQuerySchema = Type.Intersect(
  [
    querySyntax(ordersMealsExtrasQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OrdersMealsExtrasQuery = Static<typeof ordersMealsExtrasQuerySchema>
export const ordersMealsExtrasQueryValidator = getValidator(ordersMealsExtrasQuerySchema, queryValidator)
export const ordersMealsExtrasQueryResolver = resolve<OrdersMealsExtrasQuery, HookContext>({})
