import { useEffect, useState } from 'react'
import getReportXProduct from '../func/get-report-x-product'

export default function useGetReportXProduct (initialDate = new Date(), finalDate = new Date()) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    getReportXProduct(initialDate.toISOString().split('T')[0], finalDate.toISOString().split('T')[0])
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return {
            data: [],
            total: 0
          }
        }
        throw new Error('Error al obtener las ventas')
      })
      .then(res => {
        setData(res.data)
        setTotal(res.total)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [initialDate, finalDate])

  return {
    data,
    setData,
    loading,
    total
  }
}
