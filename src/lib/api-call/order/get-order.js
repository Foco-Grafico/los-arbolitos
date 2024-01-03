import { API_URL } from '../data'

export const getOrder = (orderId) => {
  return fetch(`${API_URL}/orders?order_id=${orderId}`)
    .then(res => res.json())
}
