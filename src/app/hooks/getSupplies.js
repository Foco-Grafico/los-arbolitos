import { useEffect, useState } from 'react'
import getSupplies from '../func/get-supplies'

export default function useGetSupplies ({ q, all = false }) {
  const [supplies, setSupplies] = useState([])

  useEffect(() => {
    if (q === '' && !all) {
      setSupplies([])
      return
    }

    getSupplies({ query: q })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        if (res.status === 404) {
          return []
        }

        throw new Error('Error al obtener los productos')
      })
      .then(res => setSupplies(res?.data ?? []))
      .catch((err) => {
        console.error(err)
      })
  }, [q])

  return {
    supplies, setSupplies
  }
}
