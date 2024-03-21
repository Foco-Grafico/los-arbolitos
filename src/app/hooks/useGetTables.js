import { useEffect, useState } from 'react'
import getTables from '../func/get-tables'

export default function useGetTables () {
  const [tables, setTables] = useState([])

  useEffect(() => {
    getTables()
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
        return setTables(res.data)
      })

      .catch(err => {
        console.error(err)
      })
  }, [])
  return { tables, setTables }
}
