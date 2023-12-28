import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import useWaiterGetProductsInCategory from '../../hooks/getProductsinCategory'
import SignoMas from '../../../../assets/signodemas'

import Editar from '../../../../assets/editar'
import { API_URL } from '../../../lib/api-call/data'
import addDishToOrder from '../../../lib/api-call/order/add-dish-to-order'
import { orderStore } from '../../../../stores/waiter'
import { Image } from 'expo-image'
import { useDeviceType, types } from '../../hooks/device'

export default function DishList () {
  const { dishes } = useWaiterGetProductsInCategory()
  const table = orderStore((state) => state.table)
  const deviceType = useDeviceType()
  const isTablet = deviceType === types.TABLET

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 15
    }}
    >
      <FlatList
        contentContainerStyle={{ gap: 15 }}
        data={dishes}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            flexDirection: 'row',
            gap: 10,
            padding: 1
          }}
          >
            <TouchableOpacity>
              <Image
                source={item.picture.startsWith('http') ? item.picture : `${API_URL}/${item.picture}`} style={{
                  width: isTablet ? 100 : 60,
                  height: isTablet ? 100 : 60
                }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', gap: 5, width: 130, height: 100, justifyContent: 'space-between' }}>
              <Text style={styles.text}>
                {item.name}
              </Text>
              <Text style={styles.text}>
                {item.description}
              </Text>
              <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => {
                      // orderStore.setState({
                      //   selectedProducts: item,
                      //   isDishSelected: true
                      // })
                    }}
                  >
                    <Editar fill='#005942' style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    addDishToOrder({
                      dishId: item.id,
                      orderId: table.order.id,
                      supplies: item.supplies
                    })
                  }}
                  >
                    <SignoMas fill='#005942' style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 5
  },
  circle: {
    borderRadius: 100,
    backgroundColor: '#fe8c00',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  selectedCircle: {
    borderRadius: 100,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  aside: {
    backgroundColor: '#005943',
    width: 70,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  text: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold'
  },
  title: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  text2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  order: {
    backgroundColor: '#b89c98',
    width: 300,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  productList: {
    backgroundColor: '#fff',
    height: '100%',
    width: 630,
    flexDirection: 'column',
    textAlign: 'center',
    gap: 10,
    position: 'relative'
  },
  products: {
    flexDirection: 'row',
    width: 330,
    height: 100,
    gap: 10
  },
  buscador: {
    borderWidth: 1,
    width: 250,
    height: 40,
    borderRadius: 10,
    color: '#000',
    paddingHorizontal: 10
  },
  img: {
    width: 100,
    height: 100
  },
  buttons: {
    backgroundColor: '#005943',
    borderRadius: 10,
    fontSize: 20,
    color: '#000000',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    textAlign: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40
  },
  modal: {
    backgroundColor: '#377c6a90',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 10,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold'
  },
  modalForm: {
    backgroundColor: '#fff',
    width: 540,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  modalEditProduct: {
    backgroundColor: '#fff',
    width: 540,
    height: 400,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  }
})
