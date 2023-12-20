import { useEffect } from 'react'
import { Route } from './src/app/components/route'
import Home from './src/app/home'
import Login from './src/app/pages/login'
import ShowProducts from './src/app/pages/show-products-for-order'
import Cashier from './src/app/pages/cashier'
import { SetScreenOrientation } from './src/lib/orientation'
import { LogBox, View } from 'react-native'
import Constants from 'expo-constants'

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
        flex: 1,
        paddingTop: Constants.statusBarHeight
      }}
    >
      <Route name='home'>
        <Home />
      </Route>
      <Route name='login'>
        <Login />
      </Route>
      <Route name='show-products'>
        <ShowProducts />
      </Route>
      <Route name='cashier'>
        <Cashier />
      </Route>

    </View>
  )
}
