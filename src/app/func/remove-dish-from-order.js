import { APIENDPOINTS } from '../../lib/api-call/data'

export const removeDishFromOrder = ({ orderId, orderDishId }) => {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'DELETE',
    headers
  }

  return fetch(`${APIENDPOINTS.addDishToOrder(orderDishId, orderId)}`, options)
}
