import { APIENDPOINTS } from '../../lib/api-call/data'

export default function CreateProductCategory (cat) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'POST',
    headers
  }

  return fetch(`${APIENDPOINTS.createProductCategory}?category=${cat}`, options)
}
