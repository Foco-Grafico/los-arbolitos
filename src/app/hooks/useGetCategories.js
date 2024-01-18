import GetCategories from '../func/get-categories'
import { useEffect, useState } from 'react'

export default function useGetCategories () {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const editLocalCatName = (name, index) => {
    setCategories((prev) => {
      const newCategories = [...prev]
      newCategories[index].name = name
      return newCategories
    })
  }

  const newCategory = (name) => {
    setCategories((prev) => {
      const newCategories = [...prev]
      newCategories.push({
        name,
        id: prev.length + 1
      })
      return newCategories
    })
  }

  useEffect(() => {
    GetCategories()
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Error al obtener las categorias')
      })
      .then(res => setCategories(res.data))
      .catch((err) => {
        console.error(err)
        setError('Error al obtener las categorias')
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    categories,
    loading,
    error,
    editLocalCatName,
    newCategory
  }
}
