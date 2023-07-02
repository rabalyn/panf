// boot/feathers-pinia
import { api } from '../feathers-client'
import { pinia } from '../modules/pinia'

// @ts-expect-error just use app
export default ({ app }) => {
  app.use(api)
  app.use(pinia)
}
