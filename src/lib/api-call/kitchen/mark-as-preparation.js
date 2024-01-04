import { API_URL } from '../data'

export const markAsPreparation = async (orderId, productIds) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  await fetch(`${API_URL}/kitchen/${orderId}/dish/mark-as-preparation`, {
    method: 'POST',
    headers,
    body: JSON.stringify(productIds)
  })
}
