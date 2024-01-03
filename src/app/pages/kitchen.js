import { StyleSheet, View } from 'react-native'
import NavBarKitchen from '../components/kitchen/navBar'
import ActualDish from '../components/kitchen/actual-dish'
import OrderList from '../components/kitchen/order-list'
import useKitchenGetOrders from '../hooks/getOrdersInKitchen'

export default function Kitchen () {
  const { orders, setOrders } = useKitchenGetOrders()

  return (
    <View style={styles.container}>
      <NavBarKitchen />
      <View style={styles.middle}>
        <ActualDish setOrders={setOrders} />
        <OrderList orders={orders} />
      </View>
      <View style={styles.footer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'space-around',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    borderWidth: 1
  },
  footer: {
    backgroundColor: '#462f27',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '5%'
  },
  middle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '90%'
  }
})
