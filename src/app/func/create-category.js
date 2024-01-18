import { APIENDPOINTS } from '../../lib/api-call/data'

export default function CreateCategory (cat) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers
  }

  return fetch(`${APIENDPOINTS.updateCategories}?category=${cat}`, options)
}
