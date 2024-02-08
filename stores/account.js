import { create } from 'zustand'

export const accountStore = create((set) => ({
  account: null,
  setAccount: (account) => set(() => ({ account }))
}))

export const selectedAccountStore = create((set) => ({
  selectedAccount: null,
  setSelectedAccount: (selectedAccount) => set(() => ({ selectedAccount }))
}))
