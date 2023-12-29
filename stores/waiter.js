import { create } from 'zustand'

export const tableStore = create((set) => ({
  table: {},
  order: {
    id: 0,
    dishes: [],
    pretty_list: []
  },

  setTable: (table) => {
    set({
      order: table?.order ?? {},
      table: {
        ...table,
        order: undefined
      }
    })
  }
}))

export const modalStore = create((set) => ({
  show: '',
  data: null,
  setShow: (show, data) => set({ show, data })
}))

// export const waiterStore = create((set) => ({
//   selectedCategory: 1,
//   search: '',
//   setSelectedCategory: (category) => set({ selectedCategory: category }),
//   setSearch: (search) => set({ search })
// }))

// export const orderStore = create((set, get) => ({
//   selectedPostionTable: 0,
//   table: {
//     order: {
//       dishes: []
//     }
//   },
//   selectedProducts: [],
//   isDishSelected: false,

//   setSelectedPostionTable: (position) => set({ selectedPostionTable: position }),
//   setTable: (table) => set({ table }),
//   selectProduct: (productName, isModified) => {
//     const { table } = get()

//     set({
//       selectedProducts: table.order.dishes.filter(dish => dish.name === productName && dish.modified === isModified),
//       isDishSelected: true
//     })
//   },
//   setIsDishSelected: (isDishSelected) => {
//     set({ isDishSelected, selectedProducts: [] })
//   },
//   incrementSupplyQuantity: (supplyIndex, productIndex) => {
//     const { selectedProducts } = get()

//     // if (!Array.isArray(selectedProducts)) {
//     //   const newSelectedProducts = { ...selectedProducts }
//     //   newSelectedProducts.supplies[supplyIndex].quantity++

//     //   set({ selectedProducts: newSelectedProducts })

//     //   return
//     // }

//     const newSelectedProducts = [...selectedProducts]
//     newSelectedProducts[productIndex].supplies[supplyIndex].quantity++
//     set({ selectedProducts: newSelectedProducts })
//   },
//   decrementSupplyQuantity: (supplyIndex, productIndex) => {
//     const { selectedProducts } = get()

//     // if (!Array.isArray(selectedProducts)) {
//     //   const newSelectedProducts = { ...selectedProducts }
//     //   newSelectedProducts.supplies[supplyIndex].quantity--

//     //   if (newSelectedProducts.supplies[supplyIndex].quantity === 0) {
//     //     newSelectedProducts.supplies.splice(supplyIndex, 1)
//     //   }

//     //   set({ selectedProducts: newSelectedProducts })

//     //   return
//     // }

//     const newSelectedProducts = [...selectedProducts]
//     newSelectedProducts[productIndex].supplies[supplyIndex].quantity--

//     if (newSelectedProducts[productIndex].supplies[supplyIndex].quantity === 0) {
//       newSelectedProducts[productIndex].supplies.splice(supplyIndex, 1)
//     }

//     set({ selectedProducts: newSelectedProducts })
//   },
//   addSupplyToProduct: (supply, productIndex) => {
//     const { selectedProducts } = get()

//     // if (!Array.isArray(selectedProducts)) {
//     //   const supplyIndex = selectedProducts.findIndex(s => s.id === supply.id)

//     //   if (supplyIndex !== -1) {
//     //     // selectedProducts[supplyIndex].supplies[0].quantity++
//     //     // set({ selectedProducts })
//     //     return
//     //   }

//     //   selectedProducts?.supplies.push(supply)

//     //   return
//     // }

//     const newSelectedProducts = [...selectedProducts]

//     const supplyIndex = newSelectedProducts[productIndex].supplies.findIndex(s => s.id === supply.id)

//     if (supplyIndex !== -1) {
//       // newSelectedProducts[productIndex].supplies[supplyIndex].quantity++
//       // set({ selectedProducts: newSelectedProducts })
//       return
//     }

//     newSelectedProducts[productIndex].supplies.push(supply)
//     set({ selectedProducts: newSelectedProducts })
//   },
//   editPriority: (priority, productIndex) => {
//     const { selectedProducts } = get()
//     const newSelectedProducts = [...selectedProducts]

//     newSelectedProducts[productIndex].priority = priority

//     set({ selectedProducts: newSelectedProducts })
//   }
// }))
