import { useEffect, useState } from 'react'
import getOrdersInCashier from '../func/get-orders-in-cashier'
import { socket } from '../../services/socket'

export default function useGetOrdersInCashier () {
  const [data, setData] = useState([])

  useEffect(() => {
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
        setData(res.data.map(order => ({
          ...order,
          requested: false
        })))
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    socket.on('new_cash_order', order => {
      setData(prev => [...prev, {
        ...order,
        requested: false
      }])
    })

    return () => {
      socket.off('new_cash_order')
    }
  }, [])

  return {
    data, setData
  }
}
