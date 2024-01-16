import { useEffect, useState } from 'react'
import getBoxList from '../func/getBoxList'

export default function useGetBoxList () {
  const [boxes, setBoxes] = useState([])

  useEffect(() => {
    getBoxList()
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return { data: [] }
        }
        throw new Error('Error al obtener la lista de cajas')
      })
      .then(res => {
        setBoxes(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    boxes
  }
}
