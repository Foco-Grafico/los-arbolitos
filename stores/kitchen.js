import { create } from 'zustand'

export const kitchenStore = create((set) => ({
  selectedDish: {},
  setSelectedDish: (selectedDish) => set({ selectedDish })
}))
