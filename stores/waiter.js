import { create } from 'zustand'

export const waiterStore = create((set) => ({
  selectedCategory: 1,
  search: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearch: (search) => set({ search })
}))
