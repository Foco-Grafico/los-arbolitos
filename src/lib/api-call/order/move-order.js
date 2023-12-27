import { z } from 'zod'
import { API_URL } from '../data'

export const sendTokitchen = async (orderId) => {
  const safeOrderId = z.number({
    coerce: true
  }).safeParse(orderId)

  if (!safeOrderId.success) {
    throw new Error('El id de la orden debe ser un número')
  }

  const id = safeOrderId.data

  await fetch(`${API_URL}/orders/${id}/to/kitchen`, {
    method: 'PUT'
  })
}
