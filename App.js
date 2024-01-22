import { useEffect, useState } from 'react'
import { Route, ORIENTATIONS } from './src/app/components/route'
import Login from './src/app/pages/login'
import Cashier from './src/app/pages/cashier'
import Admin from './src/app/pages/admin'
import Kitchen from './src/app/pages/kitchen'
import CreateEmployee from './src/app/pages/admin/crearEmpleado'
import CorteDeCaja from './src/app/components/cashier/corteCaja'
import Almacenes from './src/app/pages/admin/almacenes'
import ReporteVentas from './src/app/pages/admin/reporteVentaProductos'
import CategoriaProductos from './src/app/pages/admin/categoriaProductos'
import ProductosList from './src/app/pages/admin/productos'
import ActualizarStock from './src/app/pages/admin/actualizarStock'
import AlmacenInv from './src/app/pages/admin/menuAlmacen'
import { LogBox, Text, View, Modal, ToastAndroid, Platform } from 'react-native'
import { Waiter } from './src/app/pages/waiter'
import { routes } from './src/lib/data'
import { StatusBar } from 'expo-status-bar'
import Empleados from './src/app/pages/admin/empleados'
import NetInfo from '@react-native-community/netinfo'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'

LogBox.ignoreLogs(['new NativeEventEmitter', 'Aborted'])

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export default function App () {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    registerForPushNotificationsAsync()
      .catch(err => console.log(err))

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
      <Route name={routes[4]} orientation={ORIENTATIONS.PORTRAIT}>
        <Cashier />
      </Route>
      <Route name={routes[3]}>
        <Kitchen />
      </Route>
      <Route name={routes[1]} orientation={ORIENTATIONS.PORTRAIT}>
        <Admin />
      </Route>
      <Route name={routes['5']}>
        <Kitchen bar />
      </Route>
      <Route name='empleados' orientation={ORIENTATIONS.PORTRAIT}>
        <Empleados />
      </Route>
      <Route name='createEmployee' orientation={ORIENTATIONS.PORTRAIT}>
        <CreateEmployee />
      </Route>
      <Route name='corteCaja' orientation={ORIENTATIONS.PORTRAIT}>
        <CorteDeCaja />
      </Route>
      <Route name='almacenes' orientation={ORIENTATIONS.PORTRAIT}>
        <Almacenes />
      </Route>
      <Route name='reporteVentas' orientation={ORIENTATIONS.PORTRAIT}>
        <ReporteVentas />
      </Route>
      <Route name='categoriaProductos' orientation={ORIENTATIONS.PORTRAIT}>
        <CategoriaProductos />
      </Route>
      <Route name='productos' orientation={ORIENTATIONS.PORTRAIT}>
        <ProductosList />
      </Route>
      <Route name='actualizarStock' orientation={ORIENTATIONS.PORTRAIT}>
        <ActualizarStock />
      </Route>
      <Route name='menuAlmacen' orientation={ORIENTATIONS.PORTRAIT}>
        <AlmacenInv />
      </Route>

    </View>
  )
}

async function registerForPushNotificationsAsync () {
  let token

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      globalThis.alert('Failed to get push token for push notification!')
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId
    })
    console.log(token)
  } else {
    globalThis.alert('Must use physical device for Push Notifications')
  }

  return token.data
}
