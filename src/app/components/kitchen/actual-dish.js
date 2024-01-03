import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import { kitchenStore } from '../../../../stores/kitchen'
import { API_URL } from '../../../lib/api-call/data'
import finishOrderInKitchen from '../../func/finish-order-in-kitchen'
// import useKitchenGetOrders from '../../hooks/getOrdersInKitchen'

export default function ActualDish ({ setOrders }) {
  const dish = kitchenStore(state => state.selectedDish)
  const orderIndex = kitchenStore(state => state.orderIndex)
  const setDish = kitchenStore(state => state.setSelectedDish)

  const handleFinish = () => {
    for (const id of dish?.ids) {
      finishOrderInKitchen(id)
    }

    // const dishId = dish.id
    // const nuevoArreglo = orders?.dishes?.filter((dish) => dish.id !== dishId)

    // setOrders({ ...orders, dishes: nuevoArreglo })

    setOrders(orders => {
      const copyOrders = [...orders]

      const newDishes = copyOrders[orderIndex].pretty_list.filter((dishInOrder) => dishInOrder.ids[0] !== dish.ids[0])

      if (newDishes.length === 0) {
        const newOrders = copyOrders.filter((order, i) => i !== orderIndex)

        if (newOrders.length === 0) {
          setDish({
            comments: []
          })
          return []
        }

        const newSelectedDish = newOrders[0]?.pretty_list[0]

        setDish(newSelectedDish)

        return newOrders
      }

      setDish(newDishes[0])

      copyOrders[orderIndex].pretty_list = newDishes

      // console.log('copyOrders', orderIndex, JSON.stringify(copyOrders[orderIndex]))

      return copyOrders
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 50 }}>
        <View style={styles.img}>
          {dish?.picture != null && <Image source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish?.picture}`} style={styles.img} />}
        </View>
        <View style={{ flexDirection: 'column', gap: 5, width: '50%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>{dish?.name}</Text>
            <Text> {dish?.description} </Text>
            <Text style={styles.text}>CANTIDAD ( {dish?.quantity} )</Text>
          </View>
          <View style={styles.observations}>
            <Text style={{ color: '#005943', fontWeight: 'black', fontSize: 12 }}>OBSERVACIONES</Text>
            {dish?.comments.map((comment) => (
              <Text style={styles.text} key={dish.key + comment}>{comment}</Text>
            ))}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={handleFinish}>
              <Aceptar style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15
  },
  text: {
    color: 'black',
    fontSize: 15,
    marginRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  observations: {
    borderWidth: 1,
    height: 100,
    padding: 10
  },
  img: {
    width: 200,
    height: 200
  }
})
