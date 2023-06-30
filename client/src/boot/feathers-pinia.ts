// boot/feathers-pinia
import { api } from '../feathers-client'
import { pinia } from '../modules/pinia'

// @ts-expect-error ignore missing typing
export default ({ app }) => {
  app.use(api)
  app.use(pinia)
}
