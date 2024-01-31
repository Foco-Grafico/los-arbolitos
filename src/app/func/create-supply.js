import { APIENDPOINTS } from '../../lib/api-call/data'

export default function createSupply (boxId, minQuantity, quantity, name, sellUnitM, buyUnitM, sellCost, buyCost, type, sellXBuyEquivalent, minQuantityStock, maxQuantityStock) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      sell_unit_measurement: sellUnitM,
      buy_unit_measurement: buyUnitM,
      sell_cost: sellCost,
      buy_cost: buyCost,
      type,
      sell_x_buy_equivalent: sellXBuyEquivalent,
      min_quantity: minQuantityStock,
      max_quantity: maxQuantityStock
    })
  }

  return fetch(`${APIENDPOINTS.createSupply}?box_id=${boxId}&min_quantity=${minQuantity}&quantity=${quantity}`, options)
}
