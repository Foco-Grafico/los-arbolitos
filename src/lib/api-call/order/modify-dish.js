import { z } from 'zod'
import { API_URL } from '../data'

const listSupplySchema = z.object({
  id: z.number({
    coerce: true
  }).int(),
  quantity: z.number({
    coerce: true
  }).int().positive()
})

const validateParams = z.object({
  orderId: z.number({
    coerce: true
  }).int(),
  dishId: z.number({
    coerce: true
  }).int(),
  listSupply: listSupplySchema.array(),
  priority: z.number({
    coerce: true
  }).int()
})

export const modifyDish = async (orderId, dishId, listSupply, priority) => {
  const safeParams = validateParams.safeParse({ orderId, dishId, listSupply, priority })

  if (!safeParams.success) {
    globalThis.alert(`Parámetros inválidos ${safeParams.error.message}`)
    return
  }

  const {
    orderId: safeOrderId,
    dishId: safeDishId,
    listSupply: safeListSupply,
    priority: safePriority
  } = safeParams.data

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const res = await fetch(`${API_URL}/orders/${safeOrderId}/dish/${safeDishId}?priority=${safePriority}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(safeListSupply)
  })

  if (!res.ok) {
    globalThis.alert('Error al modificar el platillo')

    const json = await res.json()

    console.log(json)
  }
}
