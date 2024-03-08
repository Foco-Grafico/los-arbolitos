import { create } from 'zustand'

export const ordersStore = create(set => ({
  orders: {},

  updateOrders: (leader = false, accountId) => {
    // Template for the updateOrders function
  }
}))

export const selectedOrderStore = create(set => ({
  selectedOrder: {},

  setSelectedOrder: order => set({ selectedOrder: order })
}))
