import { APIENDPOINTS } from '../../lib/api-call/data'

export default function CreateUser (type, name, lastName, phone, username, password, salary) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      last_name: lastName,
      username,
      password,
      phone,
      salary
    })
  }

  return fetch(`${APIENDPOINTS.createUser}?type=${type}`, options)
}
