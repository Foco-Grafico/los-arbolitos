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
  selectProduct: (productName, isModified) => {
    const { table } = get()

    set({
      selectedProducts: table.order.dishes.filter(dish => dish.name === productName && Boolean(dish.modified) === isModified),
      isDishSelected: true
    })
  },
  setIsDishSelected: (isDishSelected) => {
    set({ isDishSelected, selectedProducts: [] })
  },
  incrementSupplyQuantity: (supplyIndex, productIndex) => {
    const { selectedProducts } = get()
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts[productIndex].supplies[supplyIndex].quantity++
    set({ selectedProducts: newSelectedProducts })
  },
  decrementSupplyQuantity: (supplyIndex, productIndex) => {
    const { selectedProducts } = get()
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts[productIndex].supplies[supplyIndex].quantity--

    if (newSelectedProducts[productIndex].supplies[supplyIndex].quantity === 0) {
      newSelectedProducts[productIndex].supplies.splice(supplyIndex, 1)
    }

    set({ selectedProducts: newSelectedProducts })
  },
  addSupplyToProduct: (supply, productIndex) => {
    const { selectedProducts } = get()
    const newSelectedProducts = [...selectedProducts]

    const supplyIndex = newSelectedProducts[productIndex].supplies.findIndex(s => s.id === supply.id)

    if (supplyIndex !== -1) {
      // newSelectedProducts[productIndex].supplies[supplyIndex].quantity++
      // set({ selectedProducts: newSelectedProducts })
      return
    }

    newSelectedProducts[productIndex].supplies.push(supply)
    set({ selectedProducts: newSelectedProducts })
  }
}))
