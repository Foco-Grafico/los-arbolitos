import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { removeDishFromOrder } from '../../func/remove-dish-from-order'
import { Cancelar } from '../../../../assets/cancelar'
import { useState } from 'react'
import { useConfig } from '../../hooks/use-get-config'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default function CashierProducts ({ table, setSelectedTable, setData }) {
  const [modalInfo, setModalInfo] = useState({
    dish: {},
    index: 0
  })

  const [isListVisibleModal, setIsListVisibleModal] = useState(false)
  const [password, setPassword] = useState('')
  const config = useConfig()

  const [confirmDeleteModal, setIsConfirmDeleteModal] = useState({
    visible: false,
    dishId: 0
  })

  console.log('dish', JSON.stringify(modalInfo.dish))
  const handleDeleteProduct = (dish, index) => {
    setModalInfo({ dish, index })

    console.log('dish', JSON.stringify(dish))

    if (dish?.ids.length <= 1) {
      setIsListVisibleModal(false)
      setIsConfirmDeleteModal({
        visible: true,
        dishId: dish?.ids[0]
      })

      return
    }

    setIsListVisibleModal(true)
  }

  console.log('table', JSON.stringify(table))

  return (
    <>
      <Modal
        animationType='fade'
        transparent
        visible={isListVisibleModal}
        statusBarTranslucent
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Seleccione el producto que desea eliminar</Text>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, width: '100%', marginTop: 20 }}>

              {(table?.id != null && Array.isArray(modalInfo.dish?.ids)) && (
                <FlatList
                  data={table?.dishes.filter(dish => modalInfo.dish?.ids.includes(dish?.id))}
                  style={{
                    width: '100%'
                  }}
                  contentContainerStyle={{
                    gap: 5,
                    width: '50%',
                    alignSelf: 'center'
                  }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{

                        backgroundColor: '#8d89898a',
                        padding: 5,
                        borderRadius: 5
                      }}
                      onPress={() => {
                        setIsListVisibleModal(false)
                        setIsConfirmDeleteModal({
                          visible: true,
                          dishId: item?.id
                        })
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
              )}
            </View>

          </View>
        </View>
      </Modal>

      <Modal
        animationType='fade'
        transparent
        visible={confirmDeleteModal.visible}
        statusBarTranslucent
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, gap: 20, borderRadius: 10, width: '80%', justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>¿Desea eliminar el producto "{modalInfo.dish?.name}"?</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 }}>
              <Pressable
                onPress={() => {
                  if (password === '') return ToastAndroid.show('Ingrese la contraseña', ToastAndroid.SHORT)

                  if (config?.pass === null) return ToastAndroid.show('No hay contraseña configurada', ToastAndroid.SHORT)

                  if (password !== config?.pass) return ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT)
                  removeDishFromOrder({
                    orderDishId: confirmDeleteModal.dishId,
                    orderId: table?.id
                  })

                  setSelectedTable(table => {
                    const newTotal = table?.total - Number(modalInfo.dish?.total[confirmDeleteModal.dishId])
                    const newTable = { ...table, total: newTotal }

                    setData(data => {
                      const newData = data.map(table => {
                        if (table.id === newTable.id) {
                          return newTable
                        }

                        return table
                      })

                      return newData
                    })

                    const prettyEl = newTable?.pretty_list[modalInfo.index]

                    prettyEl.ids.splice(prettyEl?.ids.indexOf(confirmDeleteModal.dishId), 1)
                    prettyEl.quantity -= 1

                    if (prettyEl?.ids.length === 0) {
                      newTable?.pretty_list.splice(modalInfo.index, 1)
                    } else {
                      newTable.pretty_list[modalInfo.index] = prettyEl
                    }

                    return newTable
                  })

                  setIsConfirmDeleteModal({ visible: false, dishId: 0 })
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', borderWidth: 1, borderRadius: 10, padding: 5, width: 40, textAlign: 'center' }}>Sí</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsConfirmDeleteModal({ visible: false, dishId: 0 })
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', borderWidth: 1, borderRadius: 10, padding: 5, width: 40, textAlign: 'center' }}>No</Text>
              </Pressable>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
              <Text>CONTRASEÑA DE AUTORIZACIÓN</Text>
              <TextInput placeholder='Contraseña' required style={{ borderRadius: 1, borderWidth: 1, width: 200, height: 34, paddingHorizontal: 10 }} onChangeText={setPassword} secureTextEntry />
            </View>

          </View>
        </View>
      </Modal>

      <View style={styles.products}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.textProduct}>CANT.</Text>
          <Text style={styles.textProduct}>PLATILLO</Text>
          <Text style={styles.textProduct}>COSTO</Text>
          <Text />
        </View>
        <View style={{ gap: 10 }}>
          {table?.pretty_list?.map((dish, index) => {
            return (
              <View key={dish?.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.textProduct}>{dish?.quantity}</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                  <Text style={styles.textProduct}>{dish?.name}</Text>
                  {Object.keys(dish?.supplies_modified).map(key => {
                    return dish?.supplies_modified[key].map(supply => {
                      return (
                        <View key={supply.key} style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={styles.textProduct}>({supply.quantity}) {supply.name}</Text>
                        </View>
                      )
                    })
                  })}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'flex-end', gap: 5 }}>
                  <Text style={styles.textProduct}>
                    {priceFormatter.format(dish?.price * dish?.quantity)}
                  </Text>
                  {Object.keys(dish?.supplies_modified).map(key => {
                    return dish?.supplies_modified[key].map(supply => {
                      return (
                        <View key={supply.key} style={{ flexDirection: 'row', gap: 20 }}>
                          <Text style={styles.textProduct}>
                            {priceFormatter.format(supply.extra_cost)}
                          </Text>
                        </View>
                      )
                    })
                  })}
                </View>
                <Pressable
                  onPress={() => {
                    handleDeleteProduct(dish, index)
                  }}
                >
                  <Cancelar width={30} height={30} />
                </Pressable>
              </View>
            )
          })}
        </View>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  products: {
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    width: '95%',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical: 20
  },
  textProduct: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
})
