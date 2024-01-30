import { useEffect, useState } from 'react'
import getSuppliesTypes from '../func/get-supplies-types'

export default function useGetSuppliesTypes () {
  const [types, setTypes] = useState([])

  useEffect(() => {
    getSuppliesTypes()
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return []
        }
        throw new Error('Error al obtener los tipos de insumos')
      })
      .then(res => setTypes(res.data))
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return {
    types, setTypes
  }
}
