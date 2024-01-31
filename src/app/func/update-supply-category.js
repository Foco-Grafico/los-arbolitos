import { APIENDPOINTS } from '../../lib/api-call/data'

export default function updateSupplyCategory (name, catId) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'PUT',
    headers
  }

  return fetch(`${APIENDPOINTS.createSupplyCategory}?name=${name}&id=${catId}`, options)
}
