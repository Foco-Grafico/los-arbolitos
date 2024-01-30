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
            ? order.dishes.filter(dish => dish.category === 1)
            : order.dishes.filter(dish => dish.category !== 1),
        pending_list:
          bar
            ? order.pending_list.filter(dish => dish.type === 1)
            : order.pending_list.filter(dish => dish.type !== 1)
      }

      // if (newOrder.pending_list.length === 0) {
      //   return
      // }

      // const playSound = () => {
      //   if (bar === true && newOrder.pending_list[0].type === 1) {
      //     play()
      //   }

      //   if (bar === false && newOrder.pending_list[0].type !== 1) {
      //     play()
      //   }
      // }

      // playSound()

      const isAllValuesInArray = (arr1, arr2) => {
        return arr1.every((value) => arr2.includes(value))
      }

      setOrders(prev => {
        const copyOrders = [...prev]

        const isExistOrder = copyOrders.some(o => o.id === newOrder.id)

        if (newOrder.dishes.length === 0 && isExistOrder) {
          return copyOrders.filter(o => o.id !== newOrder.id)
        }

        if (isExistOrder) {
          console.log('isExistOrder', isExistOrder)
          const index = copyOrders.findIndex(o => o.id === newOrder.id)

          const newIds = newOrder.pending_list.flatMap(dish => dish.ids)
          const oldIds = copyOrders[index].pending_list.flatMap(dish => dish.ids)

          const isExistDish = isAllValuesInArray(newIds, oldIds)

          // const isExistDish = copyOrders[index].pending_list.reduce((acc, curr) => {
          //   if (acc === false) {
          //     return false
          //   }

          //   let exist = true

          //   newIds.forEach(id => {
          //     if (!curr.ids.includes(id) && exist === true) {
          //       exist = false
          //     }
          //   })

          //   return exist
          // }, true)

          // console.log('isExistDish', isExistDish)

          if (!isExistDish) play()

          copyOrders[index] = newOrder

          return copyOrders
        }

        play()

        if (copyOrders.length === 0) {
          copyOrders.push(newOrder)
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
          return copyOrders
        }

        if (order.priority) {
          const lastOrderPriority = copyOrders.reduce((acc, curr, index) => {
            if (curr.priority) {
              return index
            }

            return acc
          }, -1)

          if (lastOrderPriority === -1 || lastOrderPriority <= 1) {
            const position = copyOrders.length >= 2 ? 2 : 1

            copyOrders.splice(position, 0, newOrder)
          } else {
            copyOrders.splice(lastOrderPriority + 1, 0, newOrder)
          }

          return copyOrders
        }

        copyOrders.push(newOrder)

        return copyOrders
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
