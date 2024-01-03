import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { API_URL } from '../../../lib/api-call/data'
import { kitchenStore } from '../../../../stores/kitchen'
import Estrella from '../../../../assets/estrella'
import { useDeviceType, types } from '../../hooks/device'

export default function OrderList ({ orders }) {
  const configNewInfo = kitchenStore(state => state.configNewInfo)
  const type = useDeviceType()

  return (
    <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 20 }}>
      <View style={styles.container}>
        {orders?.map((order, i) => (
          <View key={order.key} style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              {order?.pretty_list?.map((dish) => (
                <TouchableOpacity
                  key={dish.key} style={{ flexDirection: 'column', flex: 1, position: 'relative' }}
                  onPress={() => {
                    configNewInfo({
                      mesero: {
                        id: order?.user?.id,
                        name: order?.user?.name,
                        lastName: order?.user?.lastname
                      },
                      orderId: order?.id,
                      dish,
                      orderIndex: i,
                      table: order?.table_id
                    })
                  }}
                >
                  <Image
                    source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish.picture}`} style={{
                      width: type === types.TABLET ? 100 : 60,
                      height: type === types.TABLET ? 100 : 60
                    }}
                  />
                  {order.priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: -10, top: -10 }} condition={false} />}
                  {dish.priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: -10, top: -10 }} condition />}
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
    justifyContent: 'center',
    gap: 10,
    flex: 1
  },
  text: {
    color: 'black',
    fontSize: 10,
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
