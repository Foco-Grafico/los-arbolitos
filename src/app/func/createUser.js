import { APIENDPOINTS } from '../../lib/api-call/data'

export default function CreateUser (formData) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers,
    body: formData
  }

  return fetch(APIENDPOINTS.createUser, options)
}
