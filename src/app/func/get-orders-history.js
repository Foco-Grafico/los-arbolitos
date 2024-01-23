import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getOrdersHistory () {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(APIENDPOINTS.getOrdersHistory, options)
}
