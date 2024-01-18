import { useEffect, useState } from 'react'
import { Route } from './src/app/components/route'
import Login from './src/app/pages/login'
import Cashier from './src/app/pages/cashier'
import Admin from './src/app/pages/admin'
import Kitchen from './src/app/pages/kitchen'
import CreateEmployee from './src/app/pages/admin/crearEmpleado'
import CorteDeCaja from './src/app/components/cashier/corteCaja'
import Almacenes from './src/app/pages/admin/almacenes'
import ReporteVentas from './src/app/pages/admin/reporteVentaProductos'
import CategoriaProductos from './src/app/pages/admin/categoriaProductos'
import { LogBox, Text, View, Modal, ToastAndroid } from 'react-native'
import { Waiter } from './src/app/pages/waiter'
import { routes } from './src/lib/data'
import { StatusBar } from 'expo-status-bar'
import Empleados from './src/app/pages/admin/empleados'
import NetInfo from '@react-native-community/netinfo'
import * as Notifications from 'expo-notifications'
import { routerStore } from './stores/router'
import * as ScreenOrientation from 'expo-screen-orientation'

LogBox.ignoreLogs(['new NativeEventEmitter', 'Aborted'])

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const orientations = {
  admin: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  categoriaProductos: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  empleados: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  createEmployee: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  corteCaja: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  almacenes: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  reporteVentas: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  },
  cashier: {
    orientation: ScreenOrientation.OrientationLock.PORTRAIT
  }

}

export default function App () {
  const [isConnected, setIsConnected] = useState(true)
  const currentPage = routerStore(state => state.current)

  useEffect(() => {
    ScreenOrientation.getOrientationLockAsync()
      .then(o => {
        const equal = o === orientations[currentPage]?.orientation

        if (orientations[currentPage] != null) {
          if (equal) return

          console.log('cambiando orientacion')

          ScreenOrientation.lockAsync(orientations[currentPage].orientation)
            .catch((err) => {
              console.log(err)
            })
          return
        }

        if (equal) return

        console.log('cambiando orientacion')

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      })
  }, [currentPage])

  useEffect(() => {
    const unsuscribe = NetInfo.addEventListener(state => {
      const isAcceptableConnection = state.isConnected && state.details

      if (!state.isInternetReachable) {
        ToastAndroid.show('La conexion a internet es deficiente', ToastAndroid.SHORT)
      }

      setIsConnected(isAcceptableConnection)
    })

    return () => unsuscribe()
  }, [])

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <StatusBar hidden />
      <Modal
        visible={!isConnected}
        animationType='fade'
        transparent
        statusBarTranslucent
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              backgroundColor: 'red',
              padding: 10
            }}
          >
            No hay conexión a internet
          </Text>
        </View>
      </Modal>
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
      <Route name={routes[1]}>
        <Admin />
      </Route>
      <Route name={routes['5']}>
        <Kitchen bar />
      </Route>
      <Route name='empleados'>
        <Empleados />
      </Route>
      <Route name='createEmployee'>
        <CreateEmployee />
      </Route>
      <Route name='corteCaja'>
        <CorteDeCaja />
      </Route>
      <Route name='almacenes'>
        <Almacenes />
      </Route>
      <Route name='reporteVentas'>
        <ReporteVentas />
      </Route>
      <Route name='categoriaProductos'>
        <CategoriaProductos />
      </Route>

    </View>
  )
}
