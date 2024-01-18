export const API_URL = 'https://ed76-74-208-129-103.ngrok-free.app'
// export const API_URL = 'http://192.168.0.20:3001'

export const APIENDPOINTS = {
  getProducts: `${API_URL}/dishes`,
  getCategories: `${API_URL}/dishes/categories`,
  updateCategories: `${API_URL}/dishes/category`,
  getGategoriesbyId: (id) => `${API_URL}/dishes/category/${id}`,
  setSupply: `${API_URL}/dishes/supply/`,
  getTablesbyZone: (waiterId) => `${API_URL}/zones/table/${waiterId}`,
  addDishToOrder: (dishId, orderId) => `${API_URL}/orders/${orderId}/dish/${dishId}`,
  getSupplies: `${API_URL}/supplies`,
  getOrdersKitchen: `${API_URL}/kitchen`,
  finishProductInOrder: (dishId) => `${API_URL}/kitchen/${dishId}/finish`,
  getUsers: `${API_URL}/users`,
  createUser: `${API_URL}/users`,
  getUserRole: `${API_URL}/users/types`,
  getOrders: `${API_URL}/cashier/orders`,
  finishOrder: `${API_URL}/cashier/paid-order`,
  getReconciliation: `${API_URL}/reports/reconciliation`,
  getBoxList: `${API_URL}/boxes`
}
