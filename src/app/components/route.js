import { routerStore } from '../../../stores/router'
import { lockAsync, getOrientationLockAsync, OrientationLock } from 'expo-screen-orientation'

export const ORIENTATIONS = OrientationLock

export const Route = ({ children, name, orientation = ORIENTATIONS.LANDSCAPE }) => {
  const current = routerStore((state) => state.current)

  if (current !== name) return

  getOrientationLockAsync()
    .then(o => {
      const equal = o === orientation

      if (equal) return

      lockAsync(orientation)
        .catch((err) => {
          console.log(err)
        })
    })

  return children
}
