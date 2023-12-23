import { useEffect, useRef, useState } from 'react'
import { waiterStore } from '../../../stores/waiter'
import GetDishesCategories from '../func/get-dishes-category'

export default function useWaiterGetProductsInCategory (id) {
  const selectedCategory = waiterStore(state => state.selectedCategory)
  const search = waiterStore(state => state.search)
  const [dishes, setDishes] = useState([])
  const [err, setErr] = useState(null)
  const abortController = useRef(new AbortController())
  const [dishesF, setDishesF] = useState([])

  useEffect(() => {
    try {
      abortController.current.abort('Previous request cancelled')
      abortController.current = new AbortController()
    } catch {
    }

    GetDishesCategories(selectedCategory, {
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
        setDishes(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [selectedCategory])

  useEffect(() => {
    setDishesF(dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase())))
  }, [search, dishes])

  return {
    dishes: dishesF,
    err
  }
}
