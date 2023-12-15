import { create } from 'zustand'

export const routerStore = create((set, get) => ({
  current: 'login',
  props: {},
  nav: (page, props) => {
    set((state) => ({ current: page, props: { ...state.props, [page]: props } }))
  },
  getProps: () => {
    const state = get()

    return state.props[state.current]
  }
}))
