import { useEffect, useState } from 'react'
import getSellReportByUser from '../func/get-sell-report-user'

export default function useGetSellReportByUser (initialDate = new Date(), finalDate = new Date()) {
  const [sells, setSells] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getSellReportByUser(initialDate.toISOString().split('T')[0], finalDate.toISOString().split('T')[0])
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
      .then(res => setSells(res.data))
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])
  return {
    sells,
    setSells,
    loading
  }
}
