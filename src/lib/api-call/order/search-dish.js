import { API_URL } from '../data'

export const searchDish = async (search) => {
  return fetch(`${API_URL}/dishes/search?dish_name=${search}`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      throw new Error('Error al obtener los productos')
    })
    .then(res => {
      return res.data.map(dish => ({
        ...dish,
        picture: dish.picture.startsWith('http') ? dish.picture : `${API_URL}/${dish.picture}`
      }))
    })
    .catch(() => {
      return []
    })
}
