import GetCategories from '../func/get-categories'
import { useReducer, useEffect } from 'react'

const reducer = (state, action) => {
  const { type, payload } = action

  const actions = {
    GET_CATEGORIES: () => ({
      ...state,
      categories: payload,
      loading: false
    }),
    ERROR: () => ({
      ...state,
      error: true,
      loading: false,
      categories: []
    })
  }

  return actions[type] ? actions[type]() : state
}

export default function useGetCategories () {
  const [{ categories, loading, error }, dispatch] = useReducer(reducer, {
    categories: [],
    loading: true,
    error: false
  })

  const setCategories = payload => {
    dispatch({ type: 'GET_CATEGORIES', payload })
  }

  const setError = () => {
    dispatch({ type: 'ERROR' })
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
  }, [])

  return {
    categories,
    loading,
    error
  }
}
