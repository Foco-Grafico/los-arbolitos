import { APIENDPOINTS } from '../../lib/api-call/data'

export default function updateCategories (name, catId) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const options = {
    method: 'PUT',
    headers
  }

  return fetch(`${APIENDPOINTS.updateCategories}?name=${name}&id=${catId}`, options)
}
