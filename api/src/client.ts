// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { configsClient } from './services/configs/configs.shared'
export type { Configs, ConfigsData, ConfigsQuery, ConfigsPatch } from './services/configs/configs.shared'

import { menusClient } from './services/menus/menus.shared'
export type { Menus, MenusData, MenusQuery, MenusPatch } from './services/menus/menus.shared'

import { mealsIngredientsClient } from './services/meals-ingredients/meals-ingredients.shared'
export type {
  MealsIngredients,
  MealsIngredientsData,
  MealsIngredientsQuery,
  MealsIngredientsPatch
} from './services/meals-ingredients/meals-ingredients.shared'

import { ingredientsClient } from './services/ingredients/ingredients.shared'
export type {
  Ingredients,
  IngredientsData,
  IngredientsQuery,
  IngredientsPatch
} from './services/ingredients/ingredients.shared'

import { ordersMealsClient } from './services/orders-meals/orders-meals.shared'
export type {
  OrdersMeals,
  OrdersMealsData,
  OrdersMealsQuery,
  OrdersMealsPatch
} from './services/orders-meals/orders-meals.shared'

import { mealsClient } from './services/meals/meals.shared'
export type { Meals, MealsData, MealsQuery, MealsPatch } from './services/meals/meals.shared'

import { ordersMetaClient } from './services/orders-meta/orders-meta.shared'
export type {
  OrdersMeta,
  OrdersMetaData,
  OrdersMetaQuery,
  OrdersMetaPatch
} from './services/orders-meta/orders-meta.shared'

import { metaClient } from './services/meta/meta.shared'
export type { Meta, MetaData, MetaQuery, MetaPatch } from './services/meta/meta.shared'

import { ordersUsersClient } from './services/orders-users/orders-users.shared'
export type {
  OrdersUsers,
  OrdersUsersData,
  OrdersUsersQuery,
  OrdersUsersPatch
} from './services/orders-users/orders-users.shared'

import { ordersClient } from './services/orders/orders.shared'
export type { Orders, OrdersData, OrdersQuery, OrdersPatch } from './services/orders/orders.shared'

import { ordersClient } from './services/order/order.shared'
export type { Orders, OrdersData, OrdersQuery, OrdersPatch } from './services/order/order.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(ordersClient)
  client.configure(ordersClient)
  client.configure(ordersUsersClient)
  client.configure(metaClient)
  client.configure(ordersMetaClient)
  client.configure(mealsClient)
  client.configure(ordersMealsClient)
  client.configure(ingredientsClient)
  client.configure(mealsIngredientsClient)
  client.configure(menusClient)
  client.configure(configsClient)
  return client
}
