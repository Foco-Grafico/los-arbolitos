import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { DishListInOrder } from './dish-list-in-order'
import { tableStore } from '../../../../stores/waiter'
// import SwitchSlider from '../switch-slider'
// import DishListInOrder from './dish-list-in-order'
// import { orderStore } from '../../../../stores/waiter'
import { togglePriority } from '../../../lib/api-call/order/toggle'
// import { useEffect, useState } from 'react'

export default function OrderSection ({ setShowSendCommand, setVisibleSendToCash, setTables }) {
  const status = tableStore(state => state.status)
  const order = tableStore(state => state.order)
  const setTable = tableStore(state => state.setTable)
  const table = tableStore(state => state.table)
  const alwaysPriority = tableStore(state => state.alwaysPriority)

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
        <TouchableOpacity
          onPress={() => {
            status.click?.({
              setShowSendCommand,
              setVisibleSendToCash,
              orderId: order?.id,
              cb: order => {
                setTable({
                  ...table,
                  order
                })
                setTables(prev => {
                  const copyPrev = [...prev]

                  copyPrev[table.tableIndex] = {
                    ...copyPrev[table.tableIndex],
                    current_order: order.id
                  }

                  return copyPrev
                })
              }
            })
          }}
          style={{ ...sendButton, backgroundColor: status?.bgColor }}
        >
          <Text style={{ ...buttonText, color: status?.color }}>
            {status?.label}
          </Text>
        </TouchableOpacity>
      </View>
      {
        status.id === 1 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              COMANDA PRIORITARIA
            </Text>
            <Switch
              value={order?.priority}
              onValueChange={(priority) => {
                if (alwaysPriority) return

                togglePriority(order?.id, priority)
                tableStore.setState({ order: { ...order, priority } })
              }}
              trackColor={{ false: '#fff', true: '#005943' }}
              thumbColor={order?.priority ? '#fff' : '#005943'}
            />
          </View>
        )
      }
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
