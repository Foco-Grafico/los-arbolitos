import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getOrdersHistory (page, limit) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${APIENDPOINTS.getOrdersHistory}?page=${page}&limit=${limit}`, options)
}
