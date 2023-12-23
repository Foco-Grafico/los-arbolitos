import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getSupplies ({ query = null }) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  if (!query) {
    return fetch(APIENDPOINTS.getSupplies, options)
  }

  return fetch(`${(APIENDPOINTS.getSupplies)}?q=${query}`, options)
}
