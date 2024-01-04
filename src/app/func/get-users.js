import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getUsers () {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(APIENDPOINTS.getUsers, options)
}
