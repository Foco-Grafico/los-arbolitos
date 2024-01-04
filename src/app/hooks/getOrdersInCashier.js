import { useEffect, useState } from 'react'
import getOrdersInCashier from '../func/get-orders-in-cashier'

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
        setData(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    data, setData
  }
}
