// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const menusSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),

    nameI18nKey: Type.String(),
    phone: Type.String(),
    email: Type.String({ format: 'email' }),
    street: Type.String(),
    zipcode: Type.String(),

    createdAt: Type.Integer({ minimum: 1 }),
    updatedAt: Type.Integer({ minimum: 1 })
  },
  { $id: 'Menus', additionalProperties: false }
)
export type Menus = Static<typeof menusSchema>
export const menusValidator = getValidator(menusSchema, dataValidator)
export const menusResolver = resolve<Menus, HookContext>({})

export const menusExternalResolver = resolve<Menus, HookContext>({})

// Schema for creating new entries
export const menusDataSchema = Type.Pick(menusSchema, ['nameI18nKey'], {
  $id: 'MenusData'
})
export type MenusData = Static<typeof menusDataSchema>
export const menusDataValidator = getValidator(menusDataSchema, dataValidator)
export const menusDataResolver = resolve<Menus, HookContext>({
  createdAt:async () => {
    return new Date().valueOf()
  }
})

// Schema for updating existing entries
export const menusPatchSchema = Type.Partial(menusSchema, {
  $id: 'MenusPatch'
})
export type MenusPatch = Static<typeof menusPatchSchema>
export const menusPatchValidator = getValidator(menusPatchSchema, dataValidator)
export const menusPatchResolver = resolve<Menus, HookContext>({
  updatedAt:async () => {
    return new Date().valueOf()
  }
})

// Schema for allowed query properties
export const menusQueryProperties = Type.Pick(menusSchema, ['id', 'nameI18nKey'])
export const menusQuerySchema = Type.Intersect(
  [
    querySyntax(menusQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MenusQuery = Static<typeof menusQuerySchema>
export const menusQueryValidator = getValidator(menusQuerySchema, queryValidator)
export const menusQueryResolver = resolve<MenusQuery, HookContext>({})
