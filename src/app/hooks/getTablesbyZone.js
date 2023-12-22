import { useEffect, useState } from 'react'
import { accountStore } from '../../../stores/account'
import GetTablesbyZone from '../func/get-tablesby-zone'
import { orderStore } from '../../../stores/waiter'
import { SOCKETS, socket } from '../../services/socket'

export default function useWaiterGetTablesinZone () {
  const account = accountStore(state => state.account)
  const [tables, setTables] = useState([])
  const tableSelected = orderStore((state) => state.selectedPostionTable)
  const setTable = orderStore((state) => state.setTable)

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
      .then(res => {
        setTable(res.data[tableSelected])
        setTables(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    setTable(tables[tableSelected])
  }, [tableSelected])

  useEffect(() => {
    socket.on(SOCKETS.new_order_dish, (data) => {
      setTables(prev => {
        const copyPrev = [...prev]
        const tableIndex = copyPrev.findIndex((table) => table.order.id === data.order_id)

        const table = copyPrev[tableIndex]
        const newTable = {
          ...table,
          order: {
            ...table.order,
            dishes: data.dishes,
            total: data.total
          }
        }

        copyPrev[tableIndex] = newTable

        setTable(copyPrev[tableIndex])

        return copyPrev
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    tables
  }
}
