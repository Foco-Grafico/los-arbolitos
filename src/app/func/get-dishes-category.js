import { APIENDPOINTS } from '../../lib/api-call/data'

export default function GetDishesCategories (id, data) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers,
    ...data
  }

  return fetch(`${APIENDPOINTS.getGategoriesbyId(id)}`, options)
}
