// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Meta, MetaData, MetaPatch, MetaQuery, MetaService } from './meta.class'

export type { Meta, MetaData, MetaPatch, MetaQuery }

export type MetaClientService = Pick<MetaService<Params<MetaQuery>>, (typeof metaMethods)[number]>

export const metaPath = 'meta'

export const metaMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const metaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(metaPath, connection.service(metaPath), {
    methods: metaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [metaPath]: MetaClientService
  }
}
