import { useEffect, useState } from 'react'
import { Modal, Text, ToastAndroid, View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

export const LowConnectionModal = () => {
  const [isConnected, setIsConnected] = useState(true)
  const { details, isInternetReachable, isConnected: isConnectedCurr } = NetInfo.useNetInfo()

  useEffect(() => {
    const isAcceptableConnection = isConnectedCurr && details

    if (!isInternetReachable) {
      ToastAndroid.show('La conexion a internet es deficiente', ToastAndroid.SHORT)
    }

    setIsConnected(isAcceptableConnection)
  }, [isConnectedCurr, details])

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
