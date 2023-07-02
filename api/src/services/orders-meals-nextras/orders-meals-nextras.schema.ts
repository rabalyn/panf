// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const ordersMealsNextrasSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    ordersMealsId: Type.String({ format: 'uuid' }),
    ingredientId: Type.String({ format: 'uuid' }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'OrdersMealsNextras', additionalProperties: false }
)
export type OrdersMealsNextras = Static<typeof ordersMealsNextrasSchema>
export const ordersMealsNextrasValidator = getValidator(ordersMealsNextrasSchema, dataValidator)
export const ordersMealsNextrasResolver = resolve<OrdersMealsNextras, HookContext>({})

export const ordersMealsNextrasExternalResolver = resolve<OrdersMealsNextras, HookContext>({})

// Schema for creating new entries
export const ordersMealsNextrasDataSchema = Type.Pick(ordersMealsNextrasSchema, ['ordersMealsId', 'ingredientId'], {
  $id: 'OrdersMealsNextrasData'
})
export type OrdersMealsNextrasData = Static<typeof ordersMealsNextrasDataSchema>
export const ordersMealsNextrasDataValidator = getValidator(ordersMealsNextrasDataSchema, dataValidator)
export const ordersMealsNextrasDataResolver = resolve<OrdersMealsNextras, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const ordersMealsNextrasPatchSchema = Type.Partial(ordersMealsNextrasSchema, {
  $id: 'OrdersMealsNextrasPatch'
})
export type OrdersMealsNextrasPatch = Static<typeof ordersMealsNextrasPatchSchema>
export const ordersMealsNextrasPatchValidator = getValidator(ordersMealsNextrasPatchSchema, dataValidator)
export const ordersMealsNextrasPatchResolver = resolve<OrdersMealsNextras, HookContext>({
  updatedAt: async () => new Date().valueOf()
})

// Schema for allowed query properties
export const ordersMealsNextrasQueryProperties = Type.Pick(ordersMealsNextrasSchema, ['id', 'ordersMealsId', 'ingredientId'])
export const ordersMealsNextrasQuerySchema = Type.Intersect(
  [
    querySyntax(ordersMealsNextrasQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OrdersMealsNextrasQuery = Static<typeof ordersMealsNextrasQuerySchema>
export const ordersMealsNextrasQueryValidator = getValidator(ordersMealsNextrasQuerySchema, queryValidator)
export const ordersMealsNextrasQueryResolver = resolve<OrdersMealsNextrasQuery, HookContext>({})
