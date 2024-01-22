import { useEffect, useState } from 'react'
import { Modal, Text, ToastAndroid, View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

export const LowConnectionModal = () => {
  const [isConnected, setIsConnected] = useState(true)

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
  )
}
