import { Text, TouchableOpacity, View } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import { Cancelar } from '../../../../assets/cancelar'
import { sendTokitchen } from '../../../lib/api-call/order/move-order'
import { tableStore } from '../../../../stores/waiter'
import { accountStore } from '../../../../stores/account'

export const SendCommandModal = ({ orderId, visibleController }) => {
  const setStatus = tableStore(state => state.setStatus)
  const account = accountStore(state => state.account)

  if (visibleController.isVisible) {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#377c6a90',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            height: 'auto',
            padding: 30,
            borderRadius: 10,
            alignItems: 'center',
            gap: 20
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            ¿SEGURO QUE DESEAS ENVIAR LA COMANDA A LA COCINA?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                visibleController.setVisible(false)
              }}
            >
              <Cancelar style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                visibleController.setVisible(false)
                sendTokitchen(orderId, account?.id, account?.currentName)
                  .then(() => {
                    setStatus(2)
                  })
              }}
            >
              <Aceptar fill='#005942' style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
