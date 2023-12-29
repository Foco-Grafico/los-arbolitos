import { APIENDPOINTS } from '../data'

export default function addDishToOrder ({ dishId, orderId, supplies }) {
  const headers = new Headers()
  headers.append('accept', 'application/json')
  headers.append('Content-Type', 'application/json')

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(supplies)
  }

  return fetch(APIENDPOINTS.addDishToOrder(dishId, orderId), options)
}
