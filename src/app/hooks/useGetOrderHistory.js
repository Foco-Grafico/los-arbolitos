import { useEffect, useState } from 'react'
import getOrdersHistory from '../func/get-orders-history'

export default function useGetOrderHistory (
  page = 1,
  limit = 10
) {
  const [orders, setOrders] = useState({})

  useEffect(() => {
    getOrdersHistory(page, limit)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Error al obtener las Ordenes')
      })
      .then(res => setOrders(res))
  }, [page, limit])

  return (
    { orders, setOrders }
  )
}
