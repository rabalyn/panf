// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  MealsMenus,
  MealsMenusData,
  MealsMenusPatch,
  MealsMenusQuery,
  MealsMenusService
} from './meals-menus.class'

export type { MealsMenus, MealsMenusData, MealsMenusPatch, MealsMenusQuery }

export type MealsMenusClientService = Pick<
  MealsMenusService<Params<MealsMenusQuery>>,
  (typeof mealsMenusMethods)[number]
>

export const mealsMenusPath = 'meals-menus'

export const mealsMenusMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const mealsMenusClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(mealsMenusPath, connection.service(mealsMenusPath), {
    methods: mealsMenusMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [mealsMenusPath]: MealsMenusClientService
  }
}
