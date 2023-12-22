import { create } from 'zustand'

export const waiterStore = create((set) => ({
  selectedCategory: 1,
  search: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearch: (search) => set({ search })
}))

export const orderStore = create((set, get) => ({
  selectedPostionTable: 0,
  table: {
    order: {
      dishes: []
    }
  },
  selectedProducts: [],
  isDishSelected: false,

  setSelectedPostionTable: (position) => set({ selectedPostionTable: position }),
  setTable: (table) => set({ table }),
  selectProduct: (productName) => {
    const { table } = get()
    console.log('table', 'me ejecute')

    set({
      selectedProducts: table.order.dishes.filter(dish => dish.name === productName),
      isDishSelected: true
    })
  },
  setIsDishSelected: (isDishSelected) => {
    set({ isDishSelected, selectedProducts: [] })
  }
}))
