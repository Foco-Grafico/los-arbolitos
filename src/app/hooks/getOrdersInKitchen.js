import { kitchenStore } from '../../../stores/kitchen'
import { markAsPreparation } from '../../lib/api-call/kitchen/mark-as-preparation'
import { socket } from '../../services/socket'
import getOrdersInKitchen from '../func/get-orders-in-kitchen'
import { useEffect, useState } from 'react'

export default function useKitchenGetOrders (bar = false) {
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
          dish: bar
            ? res.data[0]?.pretty_list.find(dish => dish.type === 5)
            : res.data[0]?.pretty_list.find(dish => dish.type !== 5),
          orderIndex: 0,
          table: res.data[0]?.table_id
        })
        markAsPreparation(res.data[0]?.id, res.data[0]?.pretty_list[0].ids)
      })
      .catch(err => {
        console.error(err)
      })
  }, [bar])

  useEffect(() => {
    socket.on('new_kitchen_order', order => {
      setOrders(prev => {
        const copyOrder = [...prev]

        if (order.priority) {
          const lastOrderPriority = prev.reverse().find(o => o.priority)

          if (lastOrderPriority == null) {
            copyOrder.splice(1, 0, order)

            return copyOrder
          }

          const index = prev.findIndex(o => o.id === lastOrderPriority.id)

          copyOrder.splice(index + 1, 0, order)

          return copyOrder
        }

        copyOrder.push(order)

        return copyOrder
      })
    })
  }, [])

  return {
    orders, setOrders
  }
}
