import { useEffect, useState } from 'react'
import getSellReport from '../func/getSellReport'

export default function useGetSalesReport (initialDate = new Date(), finalDate = new Date()) {
  const [data, setData] = useState([])

  useEffect(() => {
    getSellReport(initialDate.toISOString().split('T')[0], finalDate.toISOString().split('T')[0])
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return {
            data: []
          }
        }
        throw new Error('Error al obtener las ventas')
      })
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    data, setData
  }
}
