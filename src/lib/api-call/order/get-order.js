import { API_URL } from '../data'

export const getOrder = (orderId, data) => {
  return fetch(`${API_URL}/orders?order_id=${orderId}`, {
    ...data
  })
    .then(res => res.json())
}
