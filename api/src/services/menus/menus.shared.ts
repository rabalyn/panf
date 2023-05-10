// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Menus, MenusData, MenusPatch, MenusQuery, MenusService } from './menus.class'

export type { Menus, MenusData, MenusPatch, MenusQuery }

export type MenusClientService = Pick<MenusService<Params<MenusQuery>>, (typeof menusMethods)[number]>

export const menusPath = 'menus'

export const menusMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const menusClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(menusPath, connection.service(menusPath), {
    methods: menusMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [menusPath]: MenusClientService
  }
}
