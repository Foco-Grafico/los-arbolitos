import { create } from 'zustand'

export const dishList = create((set) => ({
  pretty: [],
  reset: () => set({
    pretty: []
  })
}))

export const basicInfo = create((set) => ({
  status: null,
  reset: () => set({
    status: null
  })
}))
