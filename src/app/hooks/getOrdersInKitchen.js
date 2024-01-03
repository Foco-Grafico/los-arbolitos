import { kitchenStore } from '../../../stores/kitchen'
import getOrdersInKitchen from '../func/get-orders-in-kitchen'
import { useEffect, useState } from 'react'

export default function useKitchenGetOrders () {
  const [orders, setOrders] = useState([])
  const configNewInfo = kitchenStore(state => state.configNewInfo)

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
        configNewInfo({
          mesero: {
            id: res.data[0]?.user?.id,
            name: res.data[0]?.user?.name,
            lastName: res.data[0]?.user?.lastname
          },
          orderId: res.data[0]?.id,
          dish: res.data[0]?.pretty_list[0],
          orderIndex: 0,
          table: res.data[0]?.table_id
        })
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    orders, setOrders
  }
}
