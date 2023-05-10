import { configs } from './configs/configs'
import { menus } from './menus/menus'
import { mealsIngredients } from './meals-ingredients/meals-ingredients'
import { ingredients } from './ingredients/ingredients'
import { ordersMeals } from './orders-meals/orders-meals'
import { meals } from './meals/meals'
import { ordersMeta } from './orders-meta/orders-meta'
import { meta } from './meta/meta'
import { ordersUsers } from './orders-users/orders-users'
import { orders } from './orders/orders'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(configs)
  app.configure(menus)
  app.configure(mealsIngredients)
  app.configure(ingredients)
  app.configure(ordersMeals)
  app.configure(meals)
  app.configure(ordersMeta)
  app.configure(meta)
  app.configure(ordersUsers)
  app.configure(orders)
  app.configure(user)
  // All services will be registered here
}
