import { StyleSheet, View } from 'react-native'
import NavBarKitchen from '../components/kitchen/navBar'
import ActualDish from '../components/kitchen/actual-dish'
import OrderList from '../components/kitchen/order-list'
import useKitchenGetOrders from '../hooks/getOrdersInKitchen'

export default function Kitchen ({ bar = false }) {
  const { orders, setOrders } = useKitchenGetOrders(bar)

  return (
    <View style={styles.container}>
      <NavBarKitchen />
      <View style={styles.middle}>
        <ActualDish setOrders={setOrders} />
        <OrderList bar={bar} orders={orders} />
      </View>
      <View style={styles.footer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    paddingHorizontal: 150,
    paddingVertical: 50,
    flex: 1,
    gap: 20
  }
})
