import { APIENDPOINTS } from '../../lib/api-call/data'

export default function finishOrderInCashier (orderId, discount, type, concept = '', extraPrice = 0) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers
  }

  return fetch(`${APIENDPOINTS.finishOrder}?order_id=${orderId}&discount=${discount}&type=${type}&comment=${concept}&extra_price=${extraPrice}`, options)
}
