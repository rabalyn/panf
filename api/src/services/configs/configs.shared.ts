// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Configs, ConfigsData, ConfigsPatch, ConfigsQuery, ConfigsService } from './configs.class'

export type { Configs, ConfigsData, ConfigsPatch, ConfigsQuery }

export type ConfigsClientService = Pick<ConfigsService<Params<ConfigsQuery>>, (typeof configsMethods)[number]>

export const configsPath = 'configs'

export const configsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const configsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(configsPath, connection.service(configsPath), {
    methods: configsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [configsPath]: ConfigsClientService
  }
}
