import { ordersMealsNextras } from './orders-meals-nextras/orders-meals-nextras'
import { ordersMealsExtras } from './orders-meals-extras/orders-meals-extras'
import { userPermissions } from './user-permissions/user-permissions'
import { permissions } from './permissions/permissions'
import { mealsMenus } from './meals-menus/meals-menus'
import { configs } from './configs/configs'
import { menus } from './menus/menus'
import { mealsIngredients } from './meals-ingredients/meals-ingredients'
import { ingredients } from './ingredients/ingredients'
import { ordersMeals } from './orders-meals/orders-meals'
import { meals } from './meals/meals'
import { ordersUsers } from './orders-users/orders-users'
import { orders } from './orders/orders'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(ordersMealsNextras)
  app.configure(ordersMealsExtras)
  app.configure(userPermissions)
  app.configure(permissions)
  app.configure(mealsMenus)
  app.configure(configs)
  app.configure(menus)
  app.configure(mealsIngredients)
  app.configure(ingredients)
  app.configure(ordersMeals)
  app.configure(meals)
  app.configure(ordersUsers)
  app.configure(orders)
  app.configure(user)
  // All services will be registered here
}
