// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  UserPermissions,
  UserPermissionsData,
  UserPermissionsPatch,
  UserPermissionsQuery
} from './user-permissions.schema'

export type { UserPermissions, UserPermissionsData, UserPermissionsPatch, UserPermissionsQuery }

export interface UserPermissionsParams extends KnexAdapterParams<UserPermissionsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserPermissionsService<ServiceParams extends Params = UserPermissionsParams> extends KnexService<
  UserPermissions,
  UserPermissionsData,
  UserPermissionsParams,
  UserPermissionsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'user-permissions'
  }
}
