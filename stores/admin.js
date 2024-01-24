import { create } from 'zustand'

export const boxesStore = create((set, get) => ({
  selectedBox: {
    id: 0,
    name: '',
    index: 0
  },
  setSelectedBox: (box) => set({ selectedBox: box }),
  getSelectedBox: () => get().selectedBox
}))

export const supplyCatStore = create((set, get) => ({
  selectedSupplyCategory: {
    name: '',
    id: 0,
    index: 0
  },
  setSelectedSupplyCategory: (category) => set({ selectedSupplyCategory: category }),
  getSelectedSupplyCategory: () => get().selectedSupplyCategory
}))
