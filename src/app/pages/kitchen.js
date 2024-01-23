import { StyleSheet, View } from 'react-native'
import NavBarKitchen from '../components/kitchen/navBar'
import ActualDish from '../components/kitchen/actual-dish'
import OrderList from '../components/kitchen/order-list'
import useKitchenGetOrders from '../hooks/getOrdersInKitchen'
import ReportButton from '../components/kitchen/report-button'

export default function Kitchen ({ bar = false }) {
  const { orders, setOrders } = useKitchenGetOrders(bar)

  return (
    <View style={styles.container}>
      <NavBarKitchen />
      <View style={styles.middle}>
        <ActualDish bar={bar} setOrders={setOrders} />
        <OrderList bar={bar} orders={orders} />
      </View>
      <View style={styles.float}>
        <ReportButton />
      </View>
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
    height: '10%'
  },
  middle: {
    backgroundColor: '#fff',
    paddingHorizontal: 150,
    paddingVertical: 50,
    flex: 1,
    gap: 20
  },
  float: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})
