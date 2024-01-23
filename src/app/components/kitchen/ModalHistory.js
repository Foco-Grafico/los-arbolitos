import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useGetOrderHistory from '../../hooks/useGetOrderHistory'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export const ModalHistory = ({ setModal }) => {
  const { orders } = useGetOrderHistory()

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
                  <View style={{ flexDirection: 'column', gap: 5, paddingHorizontal: 40 }}>
                    {item?.dishes?.map(product => {
                      return (
                        <View key={product?.id} style={{ flexDirection: 'column', flex: 1 }}>
                          <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ ...styles.text, flex: 3 }}>
                              {product?.name}
                            </Text>
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
                    {/* {item?.pretty_list?.map(product => {
                        return (
                          <View key={product?.key} style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ ...styles.text, flex: 3 }}>
                              {product?.name}
                            </Text>
                            <Text style={{ ...styles.text, flex: 1 }}>
                              Precio: {product?.total}
                            </Text>
                          </View>
                        )
                      })} */}
                  </View>
                  <Text style={{ ...styles.text, textAlign: 'right' }}> Total:{priceFormatter.format(item?.total)} </Text>
                </View>
              )
            })}
          </ScrollView>
          <TouchableOpacity
            style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}
            onPress={() => { setModal(false) }}
          >
            <Text style={{ ...styles.text, fontSize: 20 }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>

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
