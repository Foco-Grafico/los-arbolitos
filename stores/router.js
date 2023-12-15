import { create } from 'zustand'

export const routerStore = create(() => ({
  current: 'login',
  nav: (page) => {
    routerStore.setState({ current: page })
  }
}))
