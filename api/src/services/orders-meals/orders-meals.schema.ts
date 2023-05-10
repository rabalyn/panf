// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ordersMealsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    orderId: Type.String({ format: 'uuid' }),
    mealId: Type.String({ format: 'uuid' }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'OrdersMeals', additionalProperties: false }
)
export type OrdersMeals = Static<typeof ordersMealsSchema>
export const ordersMealsValidator = getValidator(ordersMealsSchema, dataValidator)
export const ordersMealsResolver = resolve<OrdersMeals, HookContext>({})

export const ordersMealsExternalResolver = resolve<OrdersMeals, HookContext>({})

// Schema for creating new entries
export const ordersMealsDataSchema = Type.Pick(ordersMealsSchema, ['orderId', 'mealId'], {
  $id: 'OrdersMealsData'
})
export type OrdersMealsData = Static<typeof ordersMealsDataSchema>
export const ordersMealsDataValidator = getValidator(ordersMealsDataSchema, dataValidator)
export const ordersMealsDataResolver = resolve<OrdersMeals, HookContext>({
  createdAt:async () => {
    return new Date().valueOf()
  }
})

// Schema for updating existing entries
export const ordersMealsPatchSchema = Type.Partial(ordersMealsSchema, {
  $id: 'OrdersMealsPatch'
})
export type OrdersMealsPatch = Static<typeof ordersMealsPatchSchema>
export const ordersMealsPatchValidator = getValidator(ordersMealsPatchSchema, dataValidator)
export const ordersMealsPatchResolver = resolve<OrdersMeals, HookContext>({
  updatedAt:async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const ordersMealsQueryProperties = Type.Pick(ordersMealsSchema, ['id', 'orderId', 'mealId'])
export const ordersMealsQuerySchema = Type.Intersect(
  [
    querySyntax(ordersMealsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OrdersMealsQuery = Static<typeof ordersMealsQuerySchema>
export const ordersMealsQueryValidator = getValidator(ordersMealsQuerySchema, queryValidator)
export const ordersMealsQueryResolver = resolve<OrdersMealsQuery, HookContext>({})
