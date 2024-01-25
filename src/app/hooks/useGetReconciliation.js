import { useEffect, useState } from 'react'
import getReconciliation from '../func/getReconciliation'

export default function useGetReconciliation () {
  const [reconciliation, setReconciliation] = useState({
    data: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReconciliation()
      .then(res => {
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
      .then(res => {
        setReconciliation(res)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    reconciliation,
    loading
  }
}
