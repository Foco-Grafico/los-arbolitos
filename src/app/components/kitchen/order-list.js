import { StyleSheet, Text, TouchableOpacity, ScrollView, View, ToastAndroid } from 'react-native'
import { Image } from 'expo-image'
import { API_URL } from '../../../lib/api-call/data'
import { kitchenStore } from '../../../../stores/kitchen'
import Estrella from '../../../../assets/estrella'
import { useDeviceType, types } from '../../hooks/device'
import { Fragment } from 'react'
import { v4 } from '../../../lib/uuid'
import { markAsPreparation } from '../../../lib/api-call/kitchen/mark-as-preparation'

export default function OrderList ({ orders = [], bar = false }) {
  const configNewInfo = kitchenStore(state => state.configNewInfo)
  const type = useDeviceType()
  const pretty = bar
    ? orders?.map((order, i) => order?.pretty_list?.map((dish) => ({ ...dish, orderIndex: i })).filter((dish) => dish?.type === 5))
    : orders?.map((order, i) => order?.pretty_list?.map((dish) => ({ ...dish, orderIndex: i })).filter((dish) => dish?.type !== 5))

  console.log('pretty', JSON.stringify(pretty))

  return (
    <ScrollView
      horizontal
      style={{
        flex: 1
      }}
      contentContainerStyle={{
        gap: 10,
        alignItems: 'center'
      }}
    >
      {pretty?.map((arrayDish, i) => (
        <Fragment key={v4()}>
          {i !== 0 && <View style={styles.separator} />}
          {arrayDish?.map((dish) => (
            <Fragment key={dish.key}>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  position: 'relative',
                  alignItems: 'center'
                }}
                onPress={() => {
                  console.log('dish.orderIndex', dish.orderIndex)
                  if (dish.orderIndex > 0) {
                    ToastAndroid.show('No puedes seleccionar productos de otra orden', ToastAndroid.SHORT)
                    return
                  }

                  markAsPreparation(orders[dish.orderIndex]?.id, dish.ids)

                  configNewInfo({
                    mesero: {
                      id: orders[dish.orderIndex]?.user?.id,
                      name: orders[dish.orderIndex]?.user?.name,
                      lastName: orders[dish.orderIndex]?.user?.lastname
                    },
                    orderId: orders[dish.orderIndex]?.id,
                    dish,
                    orderIndex: dish.orderIndex,
                    table: orders[dish.orderIndex]?.table_id
                  })
                }}
              >
                <Image
                  source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish.picture}`} style={{
                    width: type === types.TABLET ? 120 : 60,
                    height: type === types.TABLET ? 120 : 60
                  }}
                />
                {orders[dish.orderIndex].priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: -10, top: -10 }} condition={false} />}
                {dish.priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: -10, top: -10 }} condition />}
                <Text style={styles.text}>{dish.name}</Text>
                <Text style={styles.text}>{dish?.description}</Text>
              </TouchableOpacity>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 10
  },
  text: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    width: 2,
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#000'
  },
  img: {
    width: 100,
    height: 100
  }
})
