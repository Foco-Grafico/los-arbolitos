import { useEffect, useState } from 'react'
import getSupplies from '../func/get-supplies'

export default function useGetSupplies ({ q }) {
  const [supplies, setSupplies] = useState([])
  const [view, setView] = useState(false)

  useEffect(() => {
    if (!view) {
      setSupplies([])
      return
    }

    getSupplies({ query: q })
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
        setSupplies(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [q, view])

  return {
    supplies,
    setView
  }
}
