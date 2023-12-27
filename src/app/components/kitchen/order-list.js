import { ScrollView, StyleSheet, Text, View } from 'react-native'
import imagen from '../../../../assets/splash.png'
// import { Image } from 'expo-image'

export default function OrderList () {
  const orders = [
    {
      id: 1,
      table: 1,
      status: 'En proceso',
      products: [
        {
          id: 1,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }
        },
        {
          id: 2,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }

        },
        {
          id: 3,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }

        },
        {
          id: 4,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }

        },
        {
          id: 5,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }

        }
      ]
    },
    {
      id: 2,
      table: 2,
      status: 'En proceso',
      products: [
        {
          id: 1,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }
        },
        {
          id: 2,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }
        }
      ]
    },
    {
      id: 3,
      table: 3,
      status: 'En proceso',
      products: [
        {
          id: 1,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }
        },
        {
          id: 2,
          name: 'Hamburguesa',
          quantity: 1,
          status: 'En proceso',
          description: 'Sin crema',
          observations: 'Sin crema',
          img: { imagen }
        }
      ]
    }
  ]
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {orders.map((order) => (
          <View key={order.id} style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', borderWidth: 1 }}>
              {order?.products?.map((product, i) => (
                <View key={i} style={{ flexDirection: 'column', flex: 1 }}>
                  {/* <Image source={imagen} style={styles.img} /> */}
                  <View style={{ width: 100, height: 100, backgroundColor: '#005943' }} />
                  <Text style={styles.text}>{product.name}</Text>
                  <Text style={styles.text}>Cantidad ({product.quantity})</Text>
                  <Text style={styles.text}>{product.description}</Text>
                  <Text style={styles.text}>{product.observations}</Text>
                </View>
              ))}
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20
  },
  text: {
    color: 'black',
    fontSize: 10,
    marginRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    width: 2,
    height: '80%',
    backgroundColor: '#000'
  },
  img: {
    width: 100,
    height: 100
  }
})
