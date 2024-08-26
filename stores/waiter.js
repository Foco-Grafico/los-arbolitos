import { create } from 'zustand'
import { getOrder } from '../src/lib/api-call/order/get-order'
import { ToastAndroid } from 'react-native'
import { liberateTable } from '../src/lib/api-call/order/liberate'

const ORDER_STATES = {
  1: {
    id: 1,
    label: 'ENVIAR A COCINA',
    bgColor: '#005943', // Green color
    color: '#fff',
    next: 2,
    click: ({ setShowSendCommand = {}, dishes, editProductController }) => {
      editProductController?.setVisible(false)
      editProductController?.setData({})

      if (typeof setShowSendCommand !== 'function') {
        ToastAndroid.show('No se pudo enviar a cocina', ToastAndroid.SHORT)
        return
      }

      if (dishes.length === 0) {
        ToastAndroid.show('No hay productos en la comanda', ToastAndroid.SHORT)
        return
      }

      setShowSendCommand?.(true)
    }
  },
  2: {
    id: 2,
    label: 'ENVIADO A COCINA',
    bgColor: '#FFA500', // Orange color
    color: '#000',
    next: 3
  },
  3: {
    id: 3,
    label: 'SOLICITAR CUENTA',
    bgColor: '#005943', // Green color
    color: '#fff',
    next: null,
    click: ({ setVisibleSendToCash, editProductController }) => {
      editProductController.setVisible(false)
      editProductController.setData({})

      if (typeof setVisibleSendToCash !== 'function') {
        ToastAndroid.show('No se pudo enviar a caja', ToastAndroid.SHORT)
        return
      }

      setVisibleSendToCash?.(true)
    }
  },
  4: {
    id: 4,
    label: 'CANCELADA',
    bgColor: '#FFA500', // Orange color
    color: '#000',
    next: null
  },
  5: {
    id: 5,
    label: 'EN CAJA',
    bgColor: '#FFA500', // Orange color
    color: '#000',
    next: null
  },
  6: {
    id: 6,
    label: 'LIBERAR MESA',
    bgColor: '#005943', // Green color
    color: '#fff',
    next: null,
    click: ({ orderId, cb, editProductController }) => {
      editProductController.setVisible(false)
      editProductController.setData({})

      liberateTable(orderId)
        .then(({ new_current_order: newCurrentOrder }) => {
          getOrder(newCurrentOrder)
            .then(order => {
              cb?.(order)
            })
        })
    }
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
  alwaysPriority: false,
  setDefault: () => {
    set({
      table: {},
      order: {
        id: 0,
        dishes: [],
        pretty_list: []
      },
      status: ORDER_STATES[1],
      allFinished: false,
      alwaysPriority: false
    })
  },
  setTable: (table) => {
    set({
      order: table?.order ?? {},
      table: {
        ...table,
        order: undefined
      },
      status: ORDER_STATES[table?.order?.status?.id] ?? ORDER_STATES[1],
      allFinished: table?.order?.all_finished,
      alwaysPriority: false
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
    const { order } = get()
    const newOrder = { ...order }

    const productsArr = [...newOrder.dishes]

    for (const product of productsArr) {
      if (productsIds.includes(product.id)) {
        product.status = status
      }
    }

    const prettyArr = [...newOrder.pretty_list]

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

  getOrderId: () => get().order.id,

  reloadOrder: () => {
    const { table } = get()

    getOrder(table.current_order)
      .then(order => {
        set({
          order
        })
      })
  }
}))

export const modalStore = create((set) => ({
  show: '',
  data: null,
  setShow: (show, data) => set({ show, data })
}))

export const productCatStore = create((set) => ({
  selectedCategory: {
    name: '',
    id: 0,
    index: 0
  },
  setSelectedCategory: (category) => set({ selectedCategory: category })
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
