import { useEffect, useState } from 'react'
import getOrdersHistory from '../func/get-orders-history'

export default function useGetOrderHistory () {
  const [orders, setOrders] = useState({})

  useEffect(() => {
    getOrdersHistory()
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Error al obtener las Ordenes')
      })
      .then(res => setOrders(res))
  }, [])

  return (
    { orders, setOrders }
  )
}
