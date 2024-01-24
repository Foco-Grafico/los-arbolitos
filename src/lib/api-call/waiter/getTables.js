import { APIENDPOINTS } from '../data'

export function getTables (waiterId) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${APIENDPOINTS.getTablesbyZone(waiterId)}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      if (res.status === 404) {
        return { data: [] }
      }

      throw new Error('Error al obtener las mesas')
    })
    .then(res => {
      return res.data.map((table, index) => ({
        ...table,
        finalized: false,
        tableIndex: index
      }))
    })
}
