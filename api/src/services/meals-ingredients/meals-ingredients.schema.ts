// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const mealsIngredientsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    mealId: Type.String({ format: 'uuid' }),
    ingredientId: Type.String({ format: 'uuid' }),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'MealsIngredients', additionalProperties: false }
)
export type MealsIngredients = Static<typeof mealsIngredientsSchema>
export const mealsIngredientsValidator = getValidator(mealsIngredientsSchema, dataValidator)
export const mealsIngredientsResolver = resolve<MealsIngredients, HookContext>({})

export const mealsIngredientsExternalResolver = resolve<MealsIngredients, HookContext>({})

// Schema for creating new entries
export const mealsIngredientsDataSchema = Type.Pick(mealsIngredientsSchema, ['mealId', 'ingredientId'], {
  $id: 'MealsIngredientsData'
})
export type MealsIngredientsData = Static<typeof mealsIngredientsDataSchema>
export const mealsIngredientsDataValidator = getValidator(mealsIngredientsDataSchema, dataValidator)
export const mealsIngredientsDataResolver = resolve<MealsIngredients, HookContext>({
  createdAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for updating existing entries
export const mealsIngredientsPatchSchema = Type.Partial(mealsIngredientsSchema, {
  $id: 'MealsIngredientsPatch'
})
export type MealsIngredientsPatch = Static<typeof mealsIngredientsPatchSchema>
export const mealsIngredientsPatchValidator = getValidator(mealsIngredientsPatchSchema, dataValidator)
export const mealsIngredientsPatchResolver = resolve<MealsIngredients, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for allowed query properties
export const mealsIngredientsQueryProperties = Type.Pick(mealsIngredientsSchema, ['id', 'mealId', 'ingredientId'])
export const mealsIngredientsQuerySchema = Type.Intersect(
  [
    querySyntax(mealsIngredientsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MealsIngredientsQuery = Static<typeof mealsIngredientsQuerySchema>
export const mealsIngredientsQueryValidator = getValidator(mealsIngredientsQuerySchema, queryValidator)
export const mealsIngredientsQueryResolver = resolve<MealsIngredientsQuery, HookContext>({})
