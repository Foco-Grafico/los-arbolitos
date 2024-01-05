import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getOrdersInKitchen (bar) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${APIENDPOINTS.getOrdersKitchen}?bar=${bar}`, options)
}
