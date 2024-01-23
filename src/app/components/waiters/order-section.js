import { StyleSheet, Switch, Text, TouchableOpacity, View, Modal } from 'react-native'
import { DishListInOrder } from './dish-list-in-order'
import { tableStore } from '../../../../stores/waiter'
// import SwitchSlider from '../switch-slider'
// import DishListInOrder from './dish-list-in-order'
// import { orderStore } from '../../../../stores/waiter'
import { togglePriority } from '../../../lib/api-call/order/toggle'
import { useState } from 'react'
import { MasterModeModal } from './MasterModeModal'

export default function OrderSection ({ setShowSendCommand, setVisibleSendToCash, setTables, setData, setVisible }) {
  const status = tableStore(state => state.status)
  const order = tableStore(state => state.order)
  const setTable = tableStore(state => state.setTable)
  const table = tableStore(state => state.table)
  const alwaysPriority = tableStore(state => state.alwaysPriority)
  const [viewPriorityModal, setViewPriorityModal] = useState(false)
  const [masterMode, setMasterMode] = useState(false)

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
      <MasterModeModal
        onClose={() => {
          setMasterMode(false)
        }}
        isActive={masterMode}
      />
      <Modal
        statusBarTranslucent
        transparent
        animationType='fade'
        visible={viewPriorityModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              elevation: 10,
              gap: 20
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20
              }}
            >
              ¿Desea cambiar la prioridad de la comanda?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  togglePriority(order?.id, !order?.priority)
                  tableStore.setState({ order: { ...order, priority: !order?.priority } })
                  setViewPriorityModal(false)
                }}
                style={{
                  backgroundColor: '#005943',
                  borderRadius: 10,
                  fontSize: 20,
                  elevation: 10,
                  textAlign: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Aceptar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setViewPriorityModal(false)
                }}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 10,
                  fontSize: 20,
                  elevation: 10,
                  textAlign: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

        <DishListInOrder setData={setData} setVisible={setVisible} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 2
        }}
      >
        <TouchableOpacity
          onPress={() => {
            status.click?.({
              setShowSendCommand,
              setVisibleSendToCash,
              dishes: order?.dishes,
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
          style={{
            borderRadius: 5,
            fontSize: 20,
            elevation: 10,
            textAlign: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginBottom: 35,
            backgroundColor: status?.bgColor
          }}
        >
          <Text
            style={{
              ...buttonText,
              color: status?.color
            }}
          >
            {status?.label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMasterMode(true)
          }}
          style={{
            borderRadius: 5,
            fontSize: 20,
            elevation: 10,
            textAlign: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginBottom: 35,
            backgroundColor: status?.bgColor
          }}
        >
          <Text>
            +
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
              value={!alwaysPriority ? order?.priority : alwaysPriority}
              onValueChange={(priority) => {
                setViewPriorityModal(true)
                // togglePriority(order?.id, priority)
                // tableStore.setState({ order: { ...order, priority } })
              }}
              disabled={alwaysPriority}
              trackColor={{ false: '#fff', true: '#005943' }}
              thumbColor={order?.priority ? '#fff' : '#005943'}
            />
          </View>
        )
      }
    </View>
  )
}

const { bold, buttonText } = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
