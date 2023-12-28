import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { API_URL } from '../../../lib/api-call/data'
import { useState } from 'react'
import useKitchenGetOrders from '../../hooks/getOrdersInKitchen'
import { kitchenStore } from '../../../../stores/kitchen'
import Estrella from '../../../../assets/estrella'

export default function OrderList () {
  const { orders } = useKitchenGetOrders()

  const setDish = kitchenStore(state => state.setSelectedDish)
  const isTablet = useState(false)

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {orders?.map((order) => (
          <View key={order.key} style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              {order?.dishes?.map((dish, i) => (
                <TouchableOpacity
                  key={i} style={{ flexDirection: 'column', flex: 1, position: 'relative' }}
                  onPress={() => {
                    setDish(dish)
                  }}
                >
                  <Image
                    source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish.picture}`} style={{
                      width: isTablet ? 100 : 60,
                      height: isTablet ? 100 : 60
                    }}
                  />
                  {dish.priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: 0 }} />}
                  <Text style={styles.text}>{dish.name}</Text>
                  <Text style={styles.text}>{dish?.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 30
  },
  text: {
    color: 'black',
    fontSize: 10,
    marginRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    width: 2,
    height: '60%',
    alignSelf: 'center',
    backgroundColor: '#000'
  },
  img: {
    width: 100,
    height: 100
  }
})
