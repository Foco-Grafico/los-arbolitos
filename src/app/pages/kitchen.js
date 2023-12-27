import { StyleSheet, View } from 'react-native'
import NavBarKitchen from '../components/kitchen/navBar'
import ActualDish from '../components/kitchen/actual-dish'
import OrderList from '../components/kitchen/order-list'

export default function Kitchen () {
  return (
    <View style={styles.container}>
      <NavBarKitchen />
      <View style={styles.container}>
        <ActualDish dish={{
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema'
        }}
        />
      </View>
      <OrderList />
      <View style={styles.footer} />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bar: {
    backgroundColor: '#005942',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  circleText: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#005942',
    fontSize: 50
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  barright: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  footer: {
    backgroundColor: '#462f27',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10
  }
})
