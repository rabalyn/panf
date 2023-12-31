// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

import { v4 } from 'uuid'

// Main data model schema
export const configsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    key: Type.String({ minLength: 1}),
    val: Type.String({ minLength: 1}),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'Configs', additionalProperties: false }
)
export type Configs = Static<typeof configsSchema>
export const configsValidator = getValidator(configsSchema, dataValidator)
export const configsResolver = resolve<Configs, HookContext>({})

export const configsExternalResolver = resolve<Configs, HookContext>({})

// Schema for creating new entries
export const configsDataSchema = Type.Pick(configsSchema, ['key', 'val'], {
  $id: 'ConfigsData'
})
export type ConfigsData = Static<typeof configsDataSchema>
export const configsDataValidator = getValidator(configsDataSchema, dataValidator)
export const configsDataResolver = resolve<Configs, HookContext>({
  id: async () => v4(),
  createdAt: async () => new Date().valueOf()
})

// Schema for updating existing entries
export const configsPatchSchema = Type.Partial(configsSchema, {
  $id: 'ConfigsPatch'
})
export type ConfigsPatch = Static<typeof configsPatchSchema>
export const configsPatchValidator = getValidator(configsPatchSchema, dataValidator)
export const configsPatchResolver = resolve<Configs, HookContext>({
  updatedAt: async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const configsQueryProperties = Type.Pick(configsSchema, ['id', 'key'])
export const configsQuerySchema = Type.Intersect(
  [
    querySyntax(configsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ConfigsQuery = Static<typeof configsQuerySchema>
export const configsQueryValidator = getValidator(configsQuerySchema, queryValidator)
export const configsQueryResolver = resolve<ConfigsQuery, HookContext>({})
