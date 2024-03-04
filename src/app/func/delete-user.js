import { APIENDPOINTS } from '../../lib/api-call/data'

export default function Deleteuser (userId) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'DELETE',
    headers
  }

  return fetch(`${APIENDPOINTS.createUser}${userId}`, options)
}
