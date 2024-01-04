import { create } from 'zustand'

export const cashierStore = create((set) => ({
  selectedTable: {},
  setSelectedTable: (table) => set(() => ({ selectedTable: table }))
}))
