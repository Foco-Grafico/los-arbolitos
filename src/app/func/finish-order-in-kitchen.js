import { APIENDPOINTS } from '../../lib/api-call/data'

export default function finishOrderInKitchen (dishId) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers
  }

  return fetch(APIENDPOINTS.finishProductInOrder(dishId), options)
}
