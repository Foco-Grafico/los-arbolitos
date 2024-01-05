import { API_URL } from '../data'

export const liberateTable = async (orderId) => {
  return fetch(`${API_URL}/zones/table/${orderId}`, {
    method: 'PUT'
  })
    .then(res => res.json())
}
