export const API_URL = 'http://192.168.0.20:3001'

export const APIENDPOINTS = {
  getProducts: `${API_URL}/dishes`,
  getCategories: `${API_URL}/dishes/categories`,
  getGategoriesbyId: (id) => `${API_URL}/dishes/category/${id}`,
  setSupply: `${API_URL}/dishes/supply/`
}
