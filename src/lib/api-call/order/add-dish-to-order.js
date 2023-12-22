import { APIENDPOINTS } from '../data'

export default function addDishToOrder ({ dishId, orderId, supplies }) {
  const headers = new Headers()
  headers.append('accept', 'application/json')
  headers.append('Content-Type', 'application/json')

  const suppliesFormatted = supplies.map((supply) => ({
    id: supply.id,
    quantity: supply.quantity
  }))

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(suppliesFormatted)
  }

  return fetch(APIENDPOINTS.addDishToOrder(dishId, orderId), options)
}
