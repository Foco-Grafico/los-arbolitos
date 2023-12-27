import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import SwitchSlider from '../switch-slider'
import DishListInOrder from './dish-list-in-order'
import { orderStore } from '../../../../stores/waiter'

export default function OrderSection ({ setEnviarCuenta, setEnviarComanda }) {
  const table = orderStore(state => state.table)

  const toggleEnviarComanda = (id) => () => {
    setEnviarComanda(prev => ({
      show: !prev.show,
      orderId: id
    }))
  }

  const toggleEnviarCuenta = () => {
    setEnviarCuenta(prev => !prev)
  }

  return (
    <View style={styles.order}>
      <TouchableOpacity style={styles.buttons} onPress={toggleEnviarCuenta}>
        <Text style={styles.text2}>
          SOLICITAR CUENTA
        </Text>
      </TouchableOpacity>

      <View style={{ justifyContent: 'flex-start', height: '70%', alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, gap: 15 }}>
        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Text style={styles.title}>
            CANT.
          </Text>
          <Text style={styles.title}>
            PRODUCTO
          </Text>
        </View>
        <DishListInOrder />
      </View>

      <TouchableOpacity style={styles.buttons} onPress={toggleEnviarComanda(table?.order?.id)}>
        <Text style={styles.text2}>
          ENVIAR COMANDA
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <SwitchSlider />
        <Text style={{ color: 'white' }}>COMANDA PRIORITARIA</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  order: {
    backgroundColor: '#b89c98',
    width: 300,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
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
  text2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  }
})
