// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { v4 } from 'uuid'

// Main data model schema
export const ingredientsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    nameI18nKey: Type.String(),
    priceInCents: Type.Integer({ minimum: 0 }),

    createdAt: Type.Optional(Type.Integer({ minimum: 1 })),
    updatedAt: Type.Optional(Type.Integer({ minimum: 1 }))
  },
  { $id: 'Ingredients', additionalProperties: false }
)
export type Ingredients = Static<typeof ingredientsSchema>
export const ingredientsValidator = getValidator(ingredientsSchema, dataValidator)
export const ingredientsResolver = resolve<Ingredients, HookContext>({})

export const ingredientsExternalResolver = resolve<Ingredients, HookContext>({})

// Schema for creating new entries
export const ingredientsDataSchema = Type.Pick(ingredientsSchema, ['nameI18nKey'], {
  $id: 'IngredientsData'
})
export type IngredientsData = Static<typeof ingredientsDataSchema>
export const ingredientsDataValidator = getValidator(ingredientsDataSchema, dataValidator)
export const ingredientsDataResolver = resolve<Ingredients, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const ingredientsPatchSchema = Type.Partial(ingredientsSchema, {
  $id: 'IngredientsPatch'
})
export type IngredientsPatch = Static<typeof ingredientsPatchSchema>
export const ingredientsPatchValidator = getValidator(ingredientsPatchSchema, dataValidator)
export const ingredientsPatchResolver = resolve<Ingredients, HookContext>({
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const ingredientsQueryProperties = Type.Pick(ingredientsSchema, ['id', 'nameI18nKey'])
export const ingredientsQuerySchema = Type.Intersect(
  [
    querySyntax(ingredientsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type IngredientsQuery = Static<typeof ingredientsQuerySchema>
export const ingredientsQueryValidator = getValidator(ingredientsQuerySchema, queryValidator)
export const ingredientsQueryResolver = resolve<IngredientsQuery, HookContext>({})
