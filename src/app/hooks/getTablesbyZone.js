import { useEffect, useState } from 'react'
import { accountStore } from '../../../stores/account'
import GetTablesbyZone from '../func/get-tablesby-zone'

export default function useWaiterGetTablesinZone () {
  const account = accountStore(state => state.account)
  const [tables, setTables] = useState([])

  useEffect(() => {
    GetTablesbyZone(account.id)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }

        if (res.status === 404) {
          return { data: [] }
        }

        throw new Error('Error al obtener las mesas')
      })
      .then(res => setTables(res.data))
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return {
    tables
  }
}
