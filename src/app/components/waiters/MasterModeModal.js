import { useState } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { tableStore } from '../../../../stores/waiter'
import { Cancelar } from '../../../../assets/cancelar'
import { markAsPreparation } from '../../../lib/api-call/kitchen/mark-as-preparation'
import finishOrderInKitchen from '../../func/finish-order-in-kitchen'
import { sendToCashier } from '../../../lib/api-call/order/move-order'
import finishOrderInCashier from '../../func/finish-order-in.cashier'

export const MasterModeModal = ({ isActive, onClose }) => {
  const [section, setSection] = useState('main')
  const order = tableStore(state => state.order)
  const [selectedDish, setSelectedDish] = useState(null)
  const setStatus = tableStore((state) => state.setStatus)

  const forceQuit = () => {
    onClose?.()
    setSelectedDish(null)
    setSection('main')
  }

  return (
    <Modal
      visible={isActive}
      animationType='slide'
      transparent
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 20
        }}
      >
        <View
          style={{
            padding: 10
          }}
        >
          <Cancelar
            style={{
              width: 34,
              height: 34
            }}
            onPress={() => {
              if (section === 'products') return setSection('main')
              if (section === 'dish') return setSection('products')
              if (section === 'status') return setSection('main')
              onClose?.()
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          {section === 'main' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}
              >
                Opciones
              </Text>

              <View
                style={{
                  gap: 5
                }}
              >
                <Button
                  onPress={() => {
                    setSection('products')
                  }}
                >
                  Cambiar status de producto
                </Button>
                <Button
                  onPress={() => {
                    setSection('status')
                  }}
                >
                  Cambiar status de orden completa
                </Button>
                <Button
                  onPress={onClose}
                >
                  Salir
                </Button>
              </View>
            </>
          )}

          {section === 'products' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}
              >
                Productos
              </Text>
              <FlatList
                data={order?.dishes}
                style={{
                  maxHeight: 450,
                  paddingHorizontal: 10
                }}
                contentContainerStyle={{
                  gap: 5
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#8d89898a',
                      padding: 5,
                      borderRadius: 5
                    }}
                    onPress={() => {
                      setSelectedDish(item)
                      setSection('dish')
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        padding: 5
                      }}
                    >
                      <Text
                        style={{
                          color: '#005943',
                          fontSize: 15,
                          fontWeight: 'bold'
                        }}
                      >
                        {item?.name?.toUpperCase()}
                      </Text>
                    </View>

                    <View
                      style={{
                        padding: 5
                      }}
                    >
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 'bold'
                        }}
                      >
                        Observaciones:
                      </Text>
                      {(item?.comment !== 'undefined' && item?.comment !== 'null' && item?.comment !== '' && item?.comment != null) && (
                        <Text
                          style={{
                            color: '#005943',
                            fontSize: 13,
                            fontWeight: 'bold'
                          }}
                        >
                          {item?.comment}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 'bold'
                        }}
                      >
                        Extras:
                      </Text>
                      {item?.supplies?.map((supply) => (
                        <Text
                          key={supply?.key}
                          style={{
                            color: '#005943',
                            fontSize: 13,
                            fontWeight: 'bold'
                          }}
                        >
                          {supply?.name} x {supply?.quantity}
                        </Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {(section === 'dish' && selectedDish != null) && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}
              >
                {selectedDish?.name} - {selectedDish?.comment}
              </Text>
              <View
                style={{
                  gap: 5
                }}
              >
                <Button
                  onPress={() => {
                    forceQuit()

                    markAsPreparation(order?.id, [selectedDish?.id])
                    setStatus(2)
                  }}
                >
                  Marcar como en proceso
                </Button>
                <Button
                  onPress={() => {
                    forceQuit()

                    finishOrderInKitchen(selectedDish?.id)
                  }}
                >
                  Marcar como finalizado
                </Button>
              </View>
            </>
          )}

          {section === 'status' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}
              >
                Status
              </Text>
              <View
                style={{
                  gap: 30
                }}
              >
                <Button
                  onPress={() => {
                    forceQuit()

                    for (const dish of order?.dishes) {
                      if (dish.status.id === 3) continue
                      finishOrderInKitchen(dish?.id)
                    }

                    setStatus(3)
                  }}
                >
                  Finalizar
                </Button>
                <Button
                  onPress={() => {
                    forceQuit()

                    for (const dish of order?.dishes) {
                      if (dish.status.id === 3) continue

                      finishOrderInKitchen(dish?.id)
                        .finally(() => {
                          setStatus(5)
                        })
                    }

                    setTimeout(() => {
                      sendToCashier(order?.id)
                      setStatus(5)
                    }, 3000)
                  }}
                >
                  Solicitar cuenta
                </Button>
                <Button
                  onPress={() => {
                    forceQuit()

                    finishOrderInCashier(order?.id, 0)
                  }}
                >
                  Liberar mesa
                </Button>
              </View>
            </>
          )}
        </View>

      </View>

    </Modal>
  )
}

const Button = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#005943',
        borderRadius: 10,
        fontSize: 20,
        elevation: 10,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          textAlign: 'center'
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
