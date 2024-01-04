import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DishListInOrder } from './dish-list-in-order'
import { tableStore } from '../../../../stores/waiter'
// import SwitchSlider from '../switch-slider'
// import DishListInOrder from './dish-list-in-order'
// import { orderStore } from '../../../../stores/waiter'
// import { togglePriority } from '../../../lib/api-call/order/toggle'
// import { useEffect, useState } from 'react'

export default function OrderSection ({ setShowSendCommand }) {
  const status = tableStore(state => state.status)
  console.log('status', status)
  // const allFinished = tableStore(state => state.allFinished)

  return (
    <View style={{
      width: 'auto',
      borderWidth: 1,
      alignItems: 'center',
      backgroundColor: '#b89c98',
      paddingVertical: 20,
      gap: 10,
      paddingHorizontal: 15
    }}
    >
      {/* <TouchableOpacity
        style={sendButton}
        onPress={() => {
          if (!allFinished) {
            ToastAndroid.show('Peticion invalida, aun hay productos en cola', ToastAndroid.SHORT)
          }
          // toggleEnviarCuenta(table?.order?.id)
        }}
      >
        <Text style={buttonText}>
          SOLICITAR CUENTA
        </Text>
      </TouchableOpacity> */}

      <View
        style={{
          flex: 1,
          width: '100%'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 10
          }}
        >
          <Text style={bold}>
            CANT
          </Text>
          <Text style={bold}>
            PLATILLO
          </Text>
        </View>

        <DishListInOrder />
      </View>

      <View>
        {/* {status == null
          ? (
            <TouchableOpacity
              onPress={() => {
                setShowSendCommand?.(true)
              }}
              style={sendButton}
            >
              <Text style={buttonText}>
                ENVIAR COMANDA
              </Text>
            </TouchableOpacity>
            )
          : (
            )} */}
        <TouchableOpacity
          onPress={() => {
            status.click?.({ setShowSendCommand })
          }}
          style={{ ...sendButton, backgroundColor: status.bgColor }}
        >
          <Text style={{ ...buttonText, color: status.color }}>
            {status.label}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const { bold, buttonText, sendButton } = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sendButton: {
    backgroundColor: '#005943',
    borderRadius: 10,
    fontSize: 20,
    elevation: 10,
    textAlign: 'center',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10
  }
})
