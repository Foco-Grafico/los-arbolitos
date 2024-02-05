import { StyleSheet, Switch, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native'
import { DishListInOrder } from './dish-list-in-order'
import { tableStore } from '../../../../stores/waiter'
// import SwitchSlider from '../switch-slider'
// import DishListInOrder from './dish-list-in-order'
// import { orderStore } from '../../../../stores/waiter'
import { togglePriority } from '../../../lib/api-call/order/toggle'
import { useState } from 'react'
import { MasterModeModal } from './MasterModeModal'
import { IconEdit } from '../../../../assets/edit'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})

export default function OrderSection ({ editProductController, setShowSendCommand, setVisibleSendToCash, setTables, setData, setVisible }) {
  const status = tableStore(state => state.status)
  const order = tableStore(state => state.order)
  const setTable = tableStore(state => state.setTable)
  const table = tableStore(state => state.table)
  const alwaysPriority = tableStore(state => state.alwaysPriority)
  const [viewPriorityModal, setViewPriorityModal] = useState(false)
  const [masterMode, setMasterMode] = useState(false)
  const [cantadito, setCantadito] = useState(false)

  console.log(JSON.stringify(order?.pretty_list))

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
      <Modal
        statusBarTranslucent
        visible={cantadito}
        transparent
        animationType='fade'
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 20
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              elevation: 10,
              gap: 20,
              width: '40%'
            }}
          >
            <ScrollView
              style={{
                maxHeight: '80%'
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 10
                }}
              >
                Hora de orden: <Text style={{ color: '#005943' }}>{dateFormatter.format(new Date(order?.timestamp ?? null))}</Text>
              </Text>
              {order?.pretty_list?.map(dish => {
                if (dish == null) return null

                return (
                  <View
                    style={{
                      flexDirection: 'column',
                      gap: 5
                    }}
                    key={dish?.key}
                  >

                    <Text
                      style={{
                        fontWeight: 'bold'
                      }}
                    >
                      {dish?.quantity} {dish?.name}
                    </Text>

                    {dish?.ids?.map((id, index) => {
                      const isComment = dish.comments && dish?.comments[index] != null
                      const isModified = dish?.name.endsWith('(M)')
                      const isLast = dish?.ids?.length - 1 === index

                      return (
                        <View
                          style={{
                            flexDirection: 'column',
                            gap: 5,
                            marginLeft: 10
                          }}
                          key={id}
                        >
                          <Text>
                            Hora de adición: <Text style={{ color: '#005943' }}>{dateFormatter.format(new Date(dish?.created_at[index]))}</Text>
                          </Text>
                          {isComment && (
                            <>
                              <Text
                                style={{
                                  fontWeight: 'bold'
                                }}
                              >
                                <Text
                                  style={{
                                    color: '#005943'
                                  }}
                                >Observaciones
                                </Text>: {dish?.comments && dish?.comments[index]}
                              </Text>
                              {isModified && dish?.supplies_modified[id]?.map(supply => {
                                return (
                                  <Text
                                    style={{
                                      marginLeft: 15,
                                      fontSize: 14
                                    }}
                                    key={supply.key}
                                  >
                                    - {supply.quantity} {supply.name}
                                  </Text>
                                )
                              })}
                            </>
                          )}
                          {!isLast && (
                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#000',
                                width: '100%'
                              }}
                            />
                          )}
                        </View>
                      )
                    })}
                  </View>
                )
              })}
            </ScrollView>

            <TouchableOpacity
              style={{
                backgroundColor: '#005943',
                borderRadius: 10,
                fontSize: 20,
                elevation: 10,
                textAlign: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10
              }}
              onPress={() => {
                setCantadito(false)
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#fff'
                }}
              >
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
            gap: 10,
            justifyContent: 'space-between'
          }}
        >
          <Text style={bold}>
            CANT
          </Text>
          <Text style={bold}>
            PLATILLO
          </Text>
          <TouchableOpacity
            onPress={() => {
              editProductController.setVisible(false)
              editProductController.setData({})

              setMasterMode(true)
            }}
            style={{
              borderRadius: 5,
              fontSize: 20,
              elevation: 10,
              alignSelf: 'flex-end',
              textAlign: 'center',
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: status?.bgColor
            }}
          >
            <IconEdit stroke={status?.color} />
          </TouchableOpacity>
        </View>

        <DishListInOrder setData={setData} setVisible={setVisible} />
      </View>

      <TouchableOpacity
        onPress={() => {
          setCantadito(true)
          editProductController.setVisible(false)
          editProductController.setData({})
        }}
        style={{
          backgroundColor: '#005943',
          borderRadius: 5,
          fontSize: 20,
          textAlign: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10
        }}
      >
        <Text style={{
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center'
        }}
        >
          DESCRIPCION DE ORDEN
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          gap: 2,
          marginBottom: 35
        }}
      >
        <TouchableOpacity
          onPress={() => {
            status.click?.({
              setShowSendCommand,
              setVisibleSendToCash,
              dishes: order?.dishes,
              editProductController,
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
            elevation: 10,
            textAlign: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: status?.bgColor
          }}
        >
          <Text
            style={{
              ...buttonText,
              color: status?.color,
              fontSize: 18
            }}
          >
            {status?.label}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            editProductController.setVisible(false)
            editProductController.setData({})

            setMasterMode(true)
          }}
          style={{
            borderRadius: 5,
            fontSize: 20,
            elevation: 10,
            textAlign: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: status?.bgColor
          }}
        >
          <IconEdit stroke={status?.color} />
        </TouchableOpacity> */}
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
                editProductController.setVisible(false)
                editProductController.setData({})

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
