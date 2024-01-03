import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import { kitchenStore } from '../../../../stores/kitchen'
import { API_URL } from '../../../lib/api-call/data'
import finishOrderInKitchen from '../../func/finish-order-in-kitchen'
// import useKitchenGetOrders from '../../hooks/getOrdersInKitchen'

export default function ActualDish ({ setOrders }) {
  const dish = kitchenStore(state => state.selectedDish)
  const setDish = kitchenStore(state => state.setSelectedDish)

  console.log('dish', dish)

  const handleFinish = () => {
    finishOrderInKitchen(dish.id)

    // const dishId = dish.id
    // const nuevoArreglo = orders?.dishes?.filter((dish) => dish.id !== dishId)

    // setOrders({ ...orders, dishes: nuevoArreglo })

    setOrders(orders => {
      const copyOrders = [...orders]

      const newDishes = copyOrders[dish?.orderIndex].dishes.filter((dishInOrder) => dishInOrder.id !== dish.id)

      if (newDishes.length === 0) {
        const newOrders = copyOrders.filter((order, i) => i !== dish?.orderIndex)

        if (newOrders.length === 0) {
          setDish({})
          return []
        }

        const newSelectedDish = newOrders[0]?.dishes[0]

        setDish({
          ...newSelectedDish,
          orderIndex: 0
        })

        return newOrders
      }

      setDish({
        ...newDishes[0],
        orderIndex: dish?.orderIndex
      })

      copyOrders[dish?.orderIndex].dishes = newDishes

      console.log('copyOrders', dish?.orderIndex, JSON.stringify(copyOrders[dish?.orderIndex]))

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
            <Text style={styles.text}>{dish?.observations}</Text>
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