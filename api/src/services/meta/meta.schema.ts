// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const metaSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Meta', additionalProperties: false }
)
export type Meta = Static<typeof metaSchema>
export const metaValidator = getValidator(metaSchema, dataValidator)
export const metaResolver = resolve<Meta, HookContext>({})

export const metaExternalResolver = resolve<Meta, HookContext>({})

// Schema for creating new entries
export const metaDataSchema = Type.Pick(metaSchema, ['text'], {
  $id: 'MetaData'
})
export type MetaData = Static<typeof metaDataSchema>
export const metaDataValidator = getValidator(metaDataSchema, dataValidator)
export const metaDataResolver = resolve<Meta, HookContext>({})

// Schema for updating existing entries
export const metaPatchSchema = Type.Partial(metaSchema, {
  $id: 'MetaPatch'
})
export type MetaPatch = Static<typeof metaPatchSchema>
export const metaPatchValidator = getValidator(metaPatchSchema, dataValidator)
export const metaPatchResolver = resolve<Meta, HookContext>({})

// Schema for allowed query properties
export const metaQueryProperties = Type.Pick(metaSchema, ['id', 'text'])
export const metaQuerySchema = Type.Intersect(
  [
    querySyntax(metaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MetaQuery = Static<typeof metaQuerySchema>
export const metaQueryValidator = getValidator(metaQuerySchema, queryValidator)
export const metaQueryResolver = resolve<MetaQuery, HookContext>({})
