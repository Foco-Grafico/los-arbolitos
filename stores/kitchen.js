import { create } from 'zustand'

export const kitchenStore = create((set) => ({
  mesero: {
    id: 0,
    name: '',
    lastName: ''
  },
  orderId: 0,
  selectedDish: {
    comments: [],
    name: ''
  },
  orderIndex: 0,
  table: 0,
  configNewInfo: ({ mesero, orderId, dish, orderIndex, table }) =>
    set(() => ({ mesero, orderId, selectedDish: dish, orderIndex, table })),
  setSelectedDish: (dish) => set(() => ({ selectedDish: dish }))
}))
