export const API_URL = 'http://74.208.129.103:8001'

export const APIENDPOINTS = {
  getProducts: `${API_URL}/dishes`,
  getCategories: `${API_URL}/dishes/categories`,
  getGategoriesbyId: (id) => `${API_URL}/dishes/category/${id}`,
  setSupply: `${API_URL}/dishes/supply/`,
  getTablesbyZone: (waiterId) => `${API_URL}/zones/table/${waiterId}`,
  addDishToOrder: (dishId, orderId) => `${API_URL}/orders/${orderId}/dish/${dishId}`,
  getSupplies: `${API_URL}/supplies`,
  getOrdersKitchen: `${API_URL}/kitchen`,
  finishProductInOrder: (dishId) => `${API_URL}/kitchen/${dishId}/finish`,
  getUsers: `${API_URL}/users`,
  getOrders: `${API_URL}/cashier/orders`,
  finishOrder: `${API_URL}/cashier/paid-order`
}
