import { API_URL } from './data'

export const getAllTables = async () => {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${API_URL}/zones/table`, options)
}
