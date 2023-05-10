// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const mealsMenusSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    text: Type.String(),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'MealsMenus', additionalProperties: false }
)
export type MealsMenus = Static<typeof mealsMenusSchema>
export const mealsMenusValidator = getValidator(mealsMenusSchema, dataValidator)
export const mealsMenusResolver = resolve<MealsMenus, HookContext>({})

export const mealsMenusExternalResolver = resolve<MealsMenus, HookContext>({})

// Schema for creating new entries
export const mealsMenusDataSchema = Type.Pick(mealsMenusSchema, ['text'], {
  $id: 'MealsMenusData'
})
export type MealsMenusData = Static<typeof mealsMenusDataSchema>
export const mealsMenusDataValidator = getValidator(mealsMenusDataSchema, dataValidator)
export const mealsMenusDataResolver = resolve<MealsMenus, HookContext>({
  createdAt:async () => {
    return new Date().valueOf()
  }
})

// Schema for updating existing entries
export const mealsMenusPatchSchema = Type.Partial(mealsMenusSchema, {
  $id: 'MealsMenusPatch'
})
export type MealsMenusPatch = Static<typeof mealsMenusPatchSchema>
export const mealsMenusPatchValidator = getValidator(mealsMenusPatchSchema, dataValidator)
export const mealsMenusPatchResolver = resolve<MealsMenus, HookContext>({
  updatedAt:async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const mealsMenusQueryProperties = Type.Pick(mealsMenusSchema, ['id', 'text'])
export const mealsMenusQuerySchema = Type.Intersect(
  [
    querySyntax(mealsMenusQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MealsMenusQuery = Static<typeof mealsMenusQuerySchema>
export const mealsMenusQueryValidator = getValidator(mealsMenusQuerySchema, queryValidator)
export const mealsMenusQueryResolver = resolve<MealsMenusQuery, HookContext>({})
