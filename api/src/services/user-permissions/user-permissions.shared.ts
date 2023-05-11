// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  UserPermissions,
  UserPermissionsData,
  UserPermissionsPatch,
  UserPermissionsQuery,
  UserPermissionsService
} from './user-permissions.class'

export type { UserPermissions, UserPermissionsData, UserPermissionsPatch, UserPermissionsQuery }

export type UserPermissionsClientService = Pick<
  UserPermissionsService<Params<UserPermissionsQuery>>,
  (typeof userPermissionsMethods)[number]
>

export const userPermissionsPath = 'user-permissions'

export const userPermissionsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const userPermissionsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userPermissionsPath, connection.service(userPermissionsPath), {
    methods: userPermissionsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userPermissionsPath]: UserPermissionsClientService
  }
}
