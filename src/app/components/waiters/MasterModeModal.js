import { useState } from 'react'
import { FlatList, Modal, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { tableStore } from '../../../../stores/waiter'
import { Cancelar } from '../../../../assets/cancelar'
import finishOrderInKitchen from '../../func/finish-order-in-kitchen'
import { sendToCashier } from '../../../lib/api-call/order/move-order'
import finishOrderInCashier from '../../func/finish-order-in.cashier'
import { useConfig } from '../../hooks/use-get-config'
import { cancelOrder } from '../../../lib/api-call/order/get-order'

export const MasterModeModal = ({ isActive, onClose }) => {
  const [section, setSection] = useState('main')
  const order = tableStore(state => state.order)
  const [selectedDish, setSelectedDish] = useState(null)
  const setStatus = tableStore((state) => state.setStatus)
  const [pass, setPass] = useState('')
  const config = useConfig()

  const forceQuit = () => {
    onClose?.()
    setSelectedDish(null)
    setSection('main')
    setPass('')
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
              forceQuit()
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
              <TextInput
                placeholder='Contraseña'
                secureTextEntry
                onChangeText={setPass}
                value={pass}
                style={{
                  width: 200,
                  borderRadius: 10,
                  fontSize: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#000',
                  marginBottom: 10
                }}
              />
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
                      if (pass === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                      if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                      if (pass !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)

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

                <TextInput
                  placeholder='Contraseña'
                  secureTextEntry
                  onChangeText={setPass}
                  value={pass}
                  style={{
                    width: 200,
                    borderRadius: 10,
                    fontSize: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#000'
                  }}
                />

                <Button
                  onPress={() => {
                    if (pass === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                    if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                    if (pass !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)

                    forceQuit()
                    finishOrderInCashier(order?.id, 0, true)
                  }}
                >
                  Liberar mesa
                </Button>

                <Button
                  onPress={() => {
                    if (pass === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                    if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                    if (pass !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)

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
                    if (pass === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                    if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                    if (pass !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)

                    forceQuit()

                    setStatus(1)
                  }}
                >
                  Enviar a cocina
                </Button>
                <Button
                  onPress={() => {
                    if (pass === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                    if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                    if (pass !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)

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
                    if (pass === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                    if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                    if (pass !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)

                    forceQuit()

                    cancelOrder(order?.id)
                      .then(res => {
                        ToastAndroid.show('Orden cancelada', ToastAndroid.SHORT)
                        setTimeout(() => {
                          setSection('main')
                        }, 3000)
                      })

                    setStatus(4) // ordern cancelada
                  }}
                >
                  Cancelar orden
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
