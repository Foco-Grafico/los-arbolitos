import { APIENDPOINTS } from '../../lib/api-call/data'

export default function CreateBox (name) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers
  }

  return fetch(`${APIENDPOINTS.getBoxList}?name=${name}`, options)
}
