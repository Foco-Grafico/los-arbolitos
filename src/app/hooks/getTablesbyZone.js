import { useEffect, useState } from 'react'
import { accountStore } from '../../../stores/account'
import GetTablesbyZone from '../func/get-tablesby-zone'
// import { orderStore } from '../../../stores/waiter'
import { socket } from '../../services/socket'
import { tableStore } from '../../../stores/waiter'

export default function useWaiterGetTablesinZone () {
  const account = accountStore(state => state.account)
  const [tables, setTables] = useState([])
  const setProductsStatus = tableStore(state => state.setProductsStatus)
  const getOrderId = tableStore(state => state.getOrderId)
  const setStatus = tableStore(state => state.setStatus)
  // const tableSelected = orderStore((state) => state.selectedPostionTable)
  // const setTable = orderStore((state) => state.setTable)

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
        // setTable(res.data[tableSelected])
        setTables(() => {
          return res.data.map((table) => ({
            ...table,
            finalized: false
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

      if (data.status.id === 3) {
        setTables(prev => {
          const copyPrev = [...prev]
          const tableIndex = copyPrev.findIndex((table) => table.order.id === data.order_id)

          const table = copyPrev[tableIndex]
          const newTable = {
            ...table,
            finalized: true
          }

          copyPrev[tableIndex] = newTable

          return copyPrev
        })
      }

      if (orderId !== Number(data.order_id)) return

      setStatus(data.status.id)
    })
  }, [])

  // useEffect(() => {
  //   setTable(tables[tableSelected])
  // }, [tableSelected])

  // useEffect(() => {
  //   socket.on(SOCKETS.new_order_dish, (data) => {
  //     setTables(prev => {
  //       const copyPrev = [...prev]
  //       const tableIndex = copyPrev.findIndex((table) => table.order.id === data.order_id)

  //       const table = copyPrev[tableIndex]
  //       const newTable = {
  //         ...table,
  //         order: {
  //           ...table.order,
  //           dishes: data.dishes,
  //           total: data.total
  //         }
  //       }

  //       copyPrev[tableIndex] = newTable

  //       setTable(copyPrev[tableIndex])

  //       return copyPrev
  //     })
  //   })

  //   socket.on(SOCKETS.update_priority, ({ id, priority }) => {
  //     console.log(id, priority)

  //     setTables(prev => {
  //       const copyPrev = [...prev]
  //       const tableIndex = copyPrev.findIndex((table) => table.order.id === id)

  //       const table = copyPrev[tableIndex]
  //       const newTable = {
  //         ...table,
  //         order: {
  //           ...table.order,
  //           priority
  //         }
  //       }

  //       copyPrev[tableIndex] = newTable

  //       return copyPrev
  //     })
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])

  return {
    tables
  }
}
