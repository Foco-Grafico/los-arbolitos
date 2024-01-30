import { useEffect, useState } from 'react'
import getMeasurementUnit from '../func/get-measurement-unit'

export default function useGetMeasurementUnit () {
  const [units, setUnits] = useState([])

  useEffect(() => {
    getMeasurementUnit()
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return []
        }
        throw new Error('Error al obtener las unidades de medida')
      })
      .then(res => setUnits(res.data))
      .catch((err) => {
        console.error(err)
      })
  }, [])
  return {
    units, setUnits
  }
}
