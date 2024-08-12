import { useCallback, useEffect, useState } from 'react'
import getOrdersInCashier from '../func/get-orders-in-cashier'
import { socket } from '../../services/socket'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useGetOrdersInCashier () {
  const [data, setData] = useState([])

  const reloadOrders = useCallback(() => {
    getOrdersInCashier()
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        if (res.status === 404) {
          return { data: [] }
        }

        throw new Error('Error al obtener las ordenes')
      })
      .then(res => {
        const orders = res.data.map(order => ({
          ...order,
          requested: false
        }))

        AsyncStorage.setItem('local-orders', JSON.stringify(orders))
            .then(() => console.log('Orders saved'))
            .catch(err => console.error(err))

        setData(orders)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    reloadOrders()
  }, [])

  useEffect(() => {
    socket.on('new_cash_order', order => {


      setData(prev => {
        const newOrder = {
          ...order,
          requested: false
        }

        const newArray = [...prev, newOrder]

        AsyncStorage.setItem('local-orders', JSON.stringify(newArray))

        return newArray
      })
    })

    return () => {
      socket.off('new_cash_order')
    }
  }, [])

  return {
    data,
    setData,
    reloadOrders
  }
}
