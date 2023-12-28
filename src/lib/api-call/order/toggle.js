import { z } from 'zod'
import { API_URL } from '../data'

const toggleProps = z.object({
  orderId: z.number().int().positive(),
  priority: z.boolean()
})

export const togglePriority = async (orderId, priority) => {
  const safeToggleProps = toggleProps.safeParse({
    orderId,
    priority
  })

  if (!safeToggleProps.success) {
    console.error(safeToggleProps.error)
    globalThis.alert('Error al cambiar la prioridad de la orden')
    return
  }

  const { orderId: id, priority: isPriority } = safeToggleProps.data

  await fetch(`${API_URL}/orders/${id}/toggle/priority?priority=${isPriority}`, {
    method: 'PUT'
  })
}
