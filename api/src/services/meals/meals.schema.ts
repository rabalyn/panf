// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const mealsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Meals', additionalProperties: false }
)
export type Meals = Static<typeof mealsSchema>
export const mealsValidator = getValidator(mealsSchema, dataValidator)
export const mealsResolver = resolve<Meals, HookContext>({})

export const mealsExternalResolver = resolve<Meals, HookContext>({})

// Schema for creating new entries
export const mealsDataSchema = Type.Pick(mealsSchema, ['text'], {
  $id: 'MealsData'
})
export type MealsData = Static<typeof mealsDataSchema>
export const mealsDataValidator = getValidator(mealsDataSchema, dataValidator)
export const mealsDataResolver = resolve<Meals, HookContext>({})

// Schema for updating existing entries
export const mealsPatchSchema = Type.Partial(mealsSchema, {
  $id: 'MealsPatch'
})
export type MealsPatch = Static<typeof mealsPatchSchema>
export const mealsPatchValidator = getValidator(mealsPatchSchema, dataValidator)
export const mealsPatchResolver = resolve<Meals, HookContext>({})

// Schema for allowed query properties
export const mealsQueryProperties = Type.Pick(mealsSchema, ['id', 'text'])
export const mealsQuerySchema = Type.Intersect(
  [
    querySyntax(mealsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MealsQuery = Static<typeof mealsQuerySchema>
export const mealsQueryValidator = getValidator(mealsQuerySchema, queryValidator)
export const mealsQueryResolver = resolve<MealsQuery, HookContext>({})
