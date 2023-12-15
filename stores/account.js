import { create } from 'zustand'

export const accountStore = create((set) => ({
  account: null,
  setAccount: (account) => set(() => ({ account }))
}))
