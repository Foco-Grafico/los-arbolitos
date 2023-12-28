import getOrdersInKitchen from '../func/get-orders-in-kitchen'
import { useEffect, useState } from 'react'

export default function useKitchenGetOrders () {
  const [orders, setOrders] = useState()

  useEffect(() => {
    getOrdersInKitchen()
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        if (res.status === 404) {
          return { data: [] }
        }

        throw new Error('Error al obtener los productos')
      })
      .then(res => {
        setOrders(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    orders
  }
}
