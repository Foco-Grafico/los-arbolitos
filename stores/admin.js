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
