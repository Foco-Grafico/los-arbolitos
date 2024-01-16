import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getUserRoles () {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(APIENDPOINTS.getUserRole, options)
}
