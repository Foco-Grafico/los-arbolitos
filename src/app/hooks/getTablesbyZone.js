import { useEffect, useState } from 'react'
import { accountStore } from '../../../stores/account'
import GetTablesbyZone from '../func/get-tablesby-zone'
// import { orderStore } from '../../../stores/waiter'
import { socket } from '../../services/socket'
import { tableStore } from '../../../stores/waiter'
import { getAllTables } from '../../lib/api-call/waiter'

export default function useWaiterGetTablesinZone (leader = false) {
  const account = accountStore(state => state.account)
  const [tables, setTables] = useState([])
  const setProductsStatus = tableStore(state => state.setProductsStatus)
  const getOrderId = tableStore(state => state.getOrderId)
  const setStatus = tableStore(state => state.setStatus)

  useEffect(() => {
    const func = leader ? getAllTables : GetTablesbyZone

    func(account.id)
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
        // setTable(res.data[tableSelected])
        setTables(() => {
          return res.data.map((table, index) => ({
            ...table,
            finalized: false,
            tableIndex: index
          }))
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    socket.on('product_status', data => {
      const orderId = getOrderId()

      if (orderId !== data.order_id) return
      setProductsStatus(data.product_ids, data.status)
    })

    socket.on('order_status', data => {
      const orderId = getOrderId()

      if (orderId !== Number(data?.order_id)) return

      setStatus(data?.status?.id)
    })

    return () => {
      socket.off('product_status')
      socket.off('order_status')
    }
  }, [])
  return {
    tables,
    setTables
  }
}
