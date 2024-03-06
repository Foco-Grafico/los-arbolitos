import { create } from 'zustand'

export const ordersStore = create(set => ({
  orders: {},

  updateOrders: (leader = false, accountId) => {
    // Template for the updateOrders function
  }
}))
