import { APIENDPOINTS } from '../../lib/api-call/data'

export default function updateUsers ({ id, name, lastname, username, password, phone, role, active }) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('accept', 'application/json')
  console.log(id, name, lastname, username, password, phone, role, active)
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      id,
      name,
      last_name: lastname,
      phone,
      username,
      user_type_id: role,
      user_status_id: active,
      password
    })
  }

  return fetch(`${APIENDPOINTS.createUser}`, options)
}
