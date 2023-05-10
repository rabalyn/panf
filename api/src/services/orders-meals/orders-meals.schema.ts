// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ordersMealsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'OrdersMeals', additionalProperties: false }
)
export type OrdersMeals = Static<typeof ordersMealsSchema>
export const ordersMealsValidator = getValidator(ordersMealsSchema, dataValidator)
export const ordersMealsResolver = resolve<OrdersMeals, HookContext>({})

export const ordersMealsExternalResolver = resolve<OrdersMeals, HookContext>({})

// Schema for creating new entries
export const ordersMealsDataSchema = Type.Pick(ordersMealsSchema, ['text'], {
  $id: 'OrdersMealsData'
})
export type OrdersMealsData = Static<typeof ordersMealsDataSchema>
export const ordersMealsDataValidator = getValidator(ordersMealsDataSchema, dataValidator)
export const ordersMealsDataResolver = resolve<OrdersMeals, HookContext>({})

// Schema for updating existing entries
export const ordersMealsPatchSchema = Type.Partial(ordersMealsSchema, {
  $id: 'OrdersMealsPatch'
})
export type OrdersMealsPatch = Static<typeof ordersMealsPatchSchema>
export const ordersMealsPatchValidator = getValidator(ordersMealsPatchSchema, dataValidator)
export const ordersMealsPatchResolver = resolve<OrdersMeals, HookContext>({})

// Schema for allowed query properties
export const ordersMealsQueryProperties = Type.Pick(ordersMealsSchema, ['id', 'text'])
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
