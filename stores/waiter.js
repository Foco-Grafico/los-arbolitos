import { create } from 'zustand'
import { getOrder } from '../src/lib/api-call/order/get-order'
import { ToastAndroid } from 'react-native'

const ORDER_STATES = {
  1: {
    label: 'ENVIAR A COCINA',
    bgColor: '#005943', // Green color
    color: '#fff',
    next: 2,
    click: ({ setShowSendCommand }) => {
      setShowSendCommand?.(true)
    }
  },
  2: {
    label: 'ENVIADO A COCINA',
    bgColor: '#FFA500', // Orange color
    color: '#000',
    next: 3
  },
  3: {
    label: 'SOLICITAR CUENTA',
    bgColor: '#005943', // Green color
    color: '#fff',
    next: null,
    click: ({ setVisibleSendToCash }) => {
      if (typeof setVisibleSendToCash !== 'function') {
        ToastAndroid.show('No se pudo enviar a caja', ToastAndroid.SHORT)
        return
      }

      setVisibleSendToCash?.(true)
    }
  },
  4: {
    label: 'EN CAJA',
    bgColor: '#FFA500', // Orange color
    color: '#000',
    next: null
  }
}

export const tableStore = create((set, get) => ({
  table: {},
  order: {
    id: 0,
    dishes: [],
    pretty_list: []
  },
  status: ORDER_STATES[1],
  allFinished: false,

  setTable: (table) => {
    set({
      order: table?.order ?? {},
      table: {
        ...table,
        order: undefined
      },
      status: ORDER_STATES[table?.order?.status?.id] ?? null,
      allFinished: table?.order?.all_finished
    })
  },

  editProducts: async (orderId) => {
    getOrder(orderId)
      .then(order => {
        set({
          order
        })
      })
  },

  setStatus: status => set({
    status: ORDER_STATES[status] ?? null
  }),

  setProductsStatus: (productsIds, status) => {
    console.log('setProductsStatus', productsIds, status)
    const { order } = get()
    const newOrder = { ...order }

    const productsArr = newOrder.dishes.map(dish => ({
      ...dish,
      status: dish.status.id === 2
        ? {
            id: 1,
            name: 'EN ESPERA'
          }
        : dish.status
    }))

    for (const product of productsArr) {
      if (productsIds.includes(product.id)) {
        product.status = status
      }
    }

    const prettyArr = newOrder.pretty_list.map((product) => ({
      ...product,
      status: product.status.id === 2
        ? {
            id: 1,
            name: 'EN ESPERA'
          }
        : product.status
    }))

    for (const product of prettyArr) {
      const selectedProducts = product.ids.find(id => productsIds.includes(id))

      if (selectedProducts) {
        product.status = status
      }
    }

    newOrder.dishes = productsArr
    newOrder.pretty_list = prettyArr

    set({ order: newOrder })
  },

  getOrderId: () => get().order.id
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
