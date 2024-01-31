import { APIENDPOINTS } from '../../lib/api-call/data'

export default function CreateSupplyCategory (catName) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers
  }

  return fetch(`${APIENDPOINTS.createSupplyCategory}?name=${catName}`, options)
}
