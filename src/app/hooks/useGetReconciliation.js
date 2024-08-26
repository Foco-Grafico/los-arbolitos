import { useEffect, useState } from 'react'
import getReconciliation from '../func/getReconciliation'

export default function useGetReconciliation() {
  const [reconciliation, setReconciliation] = useState({
    data: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReconciliation()
      .then(async res => {
        if (res.ok) {
          return await res.json()
        }


        if (res.status === 404) {
          return {
            data: []
          }
        }

        if (res.status === 400) {
          console.log('RECONCILATION RESPONSE', await res.json())

          globalThis.alert('Error: No se han cerrado todas las ordenes');
          return []
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
