import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import { kitchenStore } from '../../../../stores/kitchen'
import { API_URL } from '../../../lib/api-call/data'
import finishOrderInKitchen from '../../func/finish-order-in-kitchen'
import useKitchenGetOrders from '../../hooks/getOrdersInKitchen'

export default function ActualDish () {
  const dish = kitchenStore(state => state.selectedDish)
  const { orders, setOrders } = useKitchenGetOrders()

  const handleFinish = () => {
    finishOrderInKitchen(dish.id)

    const dishId = dish.id
    const nuevoArreglo = orders?.dishes?.filter((dish) => dish.id !== dishId)

    setOrders({ ...orders, dishes: nuevoArreglo })
  }

  console.log(dish)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 50 }}>
        <Image source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish?.picture}`} style={styles.img} />
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
