import { useEffect } from 'react'
import { Route } from './src/app/components/route'
import Home from './src/app/home'
import Login from './src/app/pages/login'
import { Waiter } from './src/app/pages/waiter'
import Cashier from './src/app/pages/cashier'
import Kitchen from './src/app/pages/kitchen'
import { SetScreenOrientation } from './src/lib/orientation'
import { LogBox, View } from 'react-native'
import { routes } from './src/lib/data'
import { StatusBar } from 'expo-status-bar'
import Admin from './src/app/pages/admin'

LogBox.ignoreLogs(['new NativeEventEmitter', 'Aborted'])

export default function App () {
  useEffect(() => {
    SetScreenOrientation()
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <StatusBar hidden />
      <Route name='home'>
        <Home />
      </Route>
      <Route name='login'>
        <Login />
      </Route>
      <Route name={routes[2]}>
        <Waiter />
      </Route>
      <Route name={routes[4]}>
        <Cashier />
      </Route>
      <Route name={routes[3]}>
        <Kitchen />
      </Route>
      <Route name='panel'>
        <Admin />
      </Route>

    </View>
  )
}
