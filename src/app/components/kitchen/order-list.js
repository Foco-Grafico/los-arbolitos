import { StyleSheet, Text, TouchableOpacity, ScrollView, View, ToastAndroid } from 'react-native'
// import { Image } from 'expo-image'
// import { API_URL } from '../../../lib/api-call/data'
import { kitchenStore } from '../../../../stores/kitchen'
import Estrella from '../../../../assets/estrella'
import { useDeviceType, types } from '../../hooks/device'
import { Fragment } from 'react'
import { v4 } from '../../../lib/uuid'
import { markAsPreparation } from '../../../lib/api-call/kitchen/mark-as-preparation'

export default function OrderList ({ orders = [] }) {
  const configNewInfo = kitchenStore(state => state.configNewInfo)
  const type = useDeviceType()
  const pretty = orders?.map((order, i) => order?.pretty_list.map((dish) => ({ ...dish, orderIndex: i })))

  // const pretty = bar
  //   ? orders?.filter(order => order?.pretty_list.length > 0)
  //     .map((order) => ({
  //       list: order?.pretty_list.filter((dish) => dish?.type === 1)
  //     }))
  //     .filter((order) => order?.list.length > 0)
  //     .map((order, i) => order?.list.map((dish) => ({ ...dish, orderIndex: i })))
  //   : orders?.filter(order => order?.pretty_list.length > 0)
  //     .map((order) => ({
  //       list: order?.pretty_list.filter((dish) => dish?.type !== 1)
  //     }))
  //     .filter((order) => order?.list.length > 0)
  //     .map((order, i) => order?.list.map((dish) => ({ ...dish, orderIndex: i })))

  return (
    <ScrollView
      horizontal
      style={{
        flex: 1
      }}
      contentContainerStyle={{
        gap: 10,
        alignItems: 'center',
        overflow: 'visible'
      }}
    >
      {pretty?.map((arrayDish, i) => (
        <Fragment key={v4()}>
          {i !== 0 && <View style={styles.separator} />}
          {arrayDish?.map((dish) => (
            <TouchableOpacity
              key={dish.key}
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {/* <Image
                  source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish.picture}`} style={{
                    width: type === types.TABLET ? 120 : 60,
                    height: type === types.TABLET ? 120 : 60
                  }}
                /> */}
                <View
                  style={{
                    width: type === types.TABLET ? 120 : 60,
                    height: type === types.TABLET ? 120 : 60,
                    borderWidth: 1,
                    borderColor: '#000'
                  }}
                />
                {orders[dish.orderIndex].priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: 0, top: 0 }} condition={false} />}
                {dish.priority && <Estrella style={{ width: 24, height: 24, position: 'absolute', right: 0, top: 0 }} condition />}
              </View>

              <Text style={{
                ...styles.text,
                fontSize: 16,
                width: type === types.TABLET ? 120 : 60,
                textAlign: 'center',
                flexWrap: 'wrap'
              }}
              >{dish.name}
              </Text>
              {/* <Text style={{
                ...styles.text,
                fontSize: 8,
                width: type === types.TABLET ? 120 : 60,
                textAlign: 'center',
                flexWrap: 'wrap'
              }}
              >{dish?.description}
              </Text> */}
            </TouchableOpacity>
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
