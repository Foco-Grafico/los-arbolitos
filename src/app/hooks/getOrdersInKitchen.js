import { kitchenStore } from '../../../stores/kitchen'
import { markAsPreparation } from '../../lib/api-call/kitchen/mark-as-preparation'
import { socket } from '../../services/socket'
import getOrdersInKitchen from '../func/get-orders-in-kitchen'
import { useEffect, useState } from 'react'
import { useHorribleSound } from './play-sounds'

export default function useKitchenGetOrders (bar = false) {
  const [orders, setOrders] = useState([])
  const configNewInfo = kitchenStore(state => state.configNewInfo)
  const { play } = useHorribleSound()

  useEffect(() => {
    getOrdersInKitchen(bar)
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
          dish: res.data[0]?.pending_list[0],
          orderIndex: 0,
          table: res.data[0]?.table_id
        })
        markAsPreparation(res.data[0]?.id, res.data[0]?.pending_list[0].ids)
      })
      .catch(err => {
        console.error(err)
      })
  }, [bar])

  useEffect(() => {
    socket.on('new_kitchen_order', order => {
      const newOrder = {
        ...order,
        dishes:
          bar
            ? order.dishes.filter(dish => dish.category === 1 || dish.category === 10)
            : order.dishes.filter(dish => dish.category !== 1 || dish.category !== 10),
        pending_list:
          bar
            ? order.pending_list.filter(dish => dish.type === 1 || dish.type === 10)
            : order.pending_list.filter(dish => dish.type !== 1 || dish.type !== 10)
      }

      if (newOrder.pending_list.length === 0) {
        return
      }

      const playSound = () => {
        if (bar === true && (newOrder.pending_list[0].type === 1 || newOrder.pending_list[0].type === 10)) {
          play()
        }

        if (bar === false && (newOrder.pending_list[0].type !== 1 || newOrder.pending_list[0].type !== 10)) {
          play()
        }
      }

      setOrders(prev => {
        const copyOrder = [...prev]

        const isExistOrder = copyOrder.find(o => o.id === newOrder.id)

        if (isExistOrder) {
          const index = copyOrder.findIndex(o => o.id === newOrder.id)

          const newIds = newOrder.pending_list.flatMap(dish => dish.ids)

          const isExistDish = copyOrder[index].pending_list.reduce((acc, curr) => {
            if (acc === false) {
              return false
            }

            let exist = true

            newIds.forEach(id => {
              if (!curr.ids.includes(id) && exist === true) {
                exist = false
              }
            })

            return exist
          }, true)

          if (!isExistDish) playSound()

          copyOrder[index] = newOrder

          return copyOrder
        }

        playSound()

        if (copyOrder.length === 0) {
          copyOrder.push(newOrder)
          configNewInfo({
            mesero: {
              id: newOrder?.user?.id,
              name: newOrder?.user?.name,
              lastName: newOrder?.user?.lastname
            },
            orderId: newOrder?.id,
            dish: newOrder?.pending_list[0],
            orderIndex: 0,
            table: newOrder?.table_id
          })
          markAsPreparation(newOrder?.id, newOrder?.pending_list[0].ids)
          return copyOrder
        }

        if (order.priority) {
          const lastOrderPriority = copyOrder.reduce((acc, curr, index) => {
            if (curr.priority) {
              return index
            }

            return acc
          }, -1)

          if (lastOrderPriority === -1) {
            copyOrder.splice(1, 0, newOrder)
          } else {
            copyOrder.splice(lastOrderPriority + 1, 0, newOrder)
          }

          return copyOrder
        }

        copyOrder.push(newOrder)

        return copyOrder
      })
    })

    return () => {
      socket.off('new_kitchen_order')
    }
  }, [])

  return {
    orders, setOrders
  }
}
