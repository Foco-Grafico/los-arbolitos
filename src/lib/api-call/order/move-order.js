import { z } from 'zod'
import { API_URL } from '../data'

export const sendTokitchen = async (orderId, waiterId, currentName = 'no name') => {
  const safeOrderId = z.number({
    coerce: true
  }).safeParse(orderId)

  if (!safeOrderId.success) {
    throw new Error('El id de la orden debe ser un número')
  }

  const id = safeOrderId.data

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  await fetch(`${API_URL}/orders/${id}/to/kitchen?waiter_name=${currentName}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      waiter_id: waiterId
    })
  })
}

export const sendToCashier = async (orderId) => {
  const safeOrderId = z.number({
    coerce: true
  }).safeParse(orderId)

  if (!safeOrderId.success) {
    throw new Error('El id de la orden debe ser un número')
  }

  const id = safeOrderId.data

  await fetch(`${API_URL}/orders/${id}/to/cash`, {
    method: 'PUT'
  })
}
