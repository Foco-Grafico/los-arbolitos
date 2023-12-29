import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DishListInOrder } from './dish-list-in-order'
// import SwitchSlider from '../switch-slider'
// import DishListInOrder from './dish-list-in-order'
// import { orderStore } from '../../../../stores/waiter'
// import { togglePriority } from '../../../lib/api-call/order/toggle'
// import { useEffect, useState } from 'react'

export default function OrderSection () {
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
      <TouchableOpacity
        style={sendButton}
        onPress={() => {
          // toggleEnviarCuenta(table?.order?.id)
        }}
      >
        <Text style={buttonText}>
          SOLICITAR CUENTA
        </Text>
      </TouchableOpacity>

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
        <TouchableOpacity style={sendButton}>
          <Text style={buttonText}>
            ENVIAR COMANDA
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
