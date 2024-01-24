import { APIENDPOINTS } from '../../lib/api-call/data'

export default function createSupply (boxId, minQuantity, quantity, body) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const options = {
    method: 'POST',
    headers,
    body: {
      name: '',
      sell_unit_measurement: 0,
      buy_unit_measurement: 0,
      sell_cost: 0,
      buy_cost: 0,
      type: 0,
      sell_x_buy_equivalent: 0,
      min_quantity: 0,
      max_quantity: 0
    }
  }

  return fetch(`${APIENDPOINTS.createSupply}?box_id=${boxId}&min_quantity=${minQuantity}&quantity=${quantity}`, options)
}
