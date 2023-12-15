import { useEffect } from 'react'
import { Route } from './src/app/components/route'
import Home from './src/app/home'
import Login from './src/app/pages/login'
import { SetScreenOrientation } from './src/lib/orientation'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['new NativeEventEmitter'])

export default function App () {
  useEffect(() => {
    SetScreenOrientation()
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Route name='home'>
        <Home />
      </Route>
      <Route name='login'>
        <Login />
      </Route>
    </>
  )
}
