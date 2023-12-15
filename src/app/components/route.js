import { routerStore } from '../../../stores/router'

export const Route = ({ children, name }) => {
  const current = routerStore((state) => state.current)

  if (current !== name) return

  return children
}
