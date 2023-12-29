import { useEffect, useRef, useState } from 'react'
import GetDishesCategories from '../func/get-dishes-category'
import { API_URL } from '../../lib/api-call/data'

export default function useWaiterGetProductsInCategory () {
  // const selectedCategory = waiterStore(state => state.selectedCategory)
  // const search = waiterStore(state => state.search)
  const [search, setSearch] = useState('')
  const [dishes, setDishes] = useState([])
  const [err, setErr] = useState(null)
  const [category, setCategory] = useState(null)
  const abortController = useRef(new AbortController())
  const [dishesF, setDishesF] = useState([])

  useEffect(() => {
    if (category == null) {
      return
    }

    try {
      abortController.current.abort('Previous request cancelled')
      abortController.current = new AbortController()
    } catch {
    }

    GetDishesCategories(category, {
      signal: abortController.current.signal
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }

        if (res.status === 404) {
          setErr('No se encontraron productos')
          return { data: [] }
        }

        throw new Error('Error al obtener los productos')
      })
      .then(res => {
        setDishes(res.data.map(dish => ({
          ...dish,
          picture: dish.picture.startsWith('http') ? dish.picture : `${API_URL}/${dish.picture}`
        })))
      })
      .catch((err) => {
        console.error(err)
      })
  }, [category])

  useEffect(() => {
    setDishesF(dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase())))
  }, [search, dishes])

  return {
    dishes: dishesF,
    setCategory,
    setSearch,
    err
  }
}
