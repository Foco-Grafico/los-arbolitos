import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useGetOrderHistory from '../../hooks/useGetOrderHistory'
import { useState } from 'react'
import { Counter } from '../waiters/edit-product-modal/components/counter'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export const ModalHistory = ({ setModal }) => {
  const [page, setPage] = useState(1)

  const { orders } = useGetOrderHistory(
    page,
    10
  )

  const [modalModified, setModalModified] = useState({
    visible: false,
    item: {}
  })

  return (
    <Modal
      statusBarTranslucent
      transparent
      animationType='fade'
      visible
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingHorizontal: 20,
          paddingVertical: 50

        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            elevation: 10,
            gap: 20,
            flex: 1
          }}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            {orders?.data?.map(item => {
              return (
                <View key={item.key} style={{ flexDirection: 'column', borderWidth: 1, width: '100%', gap: 20 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#462f27' }}>
                    <Text style={{ ...styles.text, color: '#fff' }}>Folio: {item?.folio}</Text>
                    <Text style={{ ...styles.text, color: '#fff' }}>Mesero: {item?.user?.name}</Text>
                    <Text style={{ ...styles.text, color: '#fff' }}>Mesa: {item?.table?.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ flexDirection: 'column', gap: 5, paddingHorizontal: 40 }}
                    onPress={() => {
                      setModalModified({
                        visible: true,
                        item: {
                          dishes: item?.dishes?.filter(dish => dish?.modified === true).map(dish => ({
                            name: dish?.name,
                            comment: dish?.comment,
                            supplies: dish?.supplies
                          }))
                        }
                      })
                    }}
                  >
                    {item?.dishes?.map(product => {
                      return (
                        <View key={product?.id} style={{ flexDirection: 'column', flex: 1 }}>
                          <View style={{ flexDirection: 'row', flex: 1 }}>
                            {product.modified === true
                              ? <Text style={{ ...styles.text, flex: 3 }}>{product?.name} (M)</Text>
                              : <Text style={{ ...styles.text, flex: 3 }}>{product?.name}</Text>}
                            <Text style={{ ...styles.text, flex: 1 }}>
                              Precio: {priceFormatter.format(product?.total)}
                            </Text>
                          </View>
                          {product.supplies?.map(supply => {
                            return (
                              <View key={supply?.id} style={{ flex: 1, flexDirection: 'row', gap: 2 }}>
                                <Text style={{ ...styles.text, flex: 3, marginLeft: 10 }}>- {supply?.name}</Text>
                                <Text style={{ ...styles.text, flex: 1 }}>
                                  Precio: {priceFormatter.format(supply?.extra_cost)}
                                </Text>
                              </View>
                            )
                          })}
                        </View>

                      )
                    })}
                  </TouchableOpacity>
                  <Text style={{ ...styles.text, textAlign: 'right' }}> Total:{priceFormatter.format(item?.total)} </Text>
                </View>
              )
            })}
          </ScrollView>
          <Counter
            block
            defaultValue={page} onChange={setPage}
          />
          <TouchableOpacity
            style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}
            onPress={() => { setModal(false) }}
          >
            <Text style={{ ...styles.text, fontSize: 20 }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        statusBarTranslucent
        transparent
        animationType='fade'
        visible={modalModified.visible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 20,
            paddingVertical: 50

          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              elevation: 10,
              gap: 20,
              flex: 1
            }}
          >
            <ScrollView style={{ height: 250, paddingHorizontal: 10 }}>
              {modalModified.item?.dishes?.map((dish) => {
                return (
                  <View key={dish?.name} style={{ flexDirection: 'column', gap: 20 }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ ...styles.text }}>{dish?.name}</Text>
                      <Text style={{ ...styles.text }}> Comentarios: {dish?.comment}</Text>
                    </View>
                    {dish?.supplies_modified !== 0 ? <Text style={{ ...styles.text }}>Extras :</Text> : null}
                    {dish?.supplies?.map((supply) => {
                      return (
                        <View key={supply?.id} style={{ flexDirection: 'column', gap: 2 }}>
                          <Text style={{ ...styles.text, marginLeft: 10 }}> -{supply?.name}</Text>
                        </View>
                      )
                    }
                    )}
                    <View style={{ width: '100%', borderWidth: 1, height: 2, backgroundColor: 'black' }} />
                  </View>

                )
              })}
            </ScrollView>
            <TouchableOpacity
              style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}
              onPress={() => {
                setModalModified({
                  visible: false,
                  item: {}
                })
              }}
            >
              <Text style={{ ...styles.text, fontSize: 20 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#462f27',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 100
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
