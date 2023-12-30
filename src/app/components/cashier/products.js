import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CashierProducts () {
  const [selected, setSelected] = useState(1)

  const ordenes = [
    {
      id: 1,
      mesa: 1,
      productos: [
        { id: 1, name: 'tacos', price: 20, quantity: 2 },
        { id: 2, name: 'perico', price: 20, quantity: 2 },
        { id: 3, name: 'carne', price: 20, quantity: 2 },
        { id: 4, name: 'machaca', price: 20, quantity: 2 }
      ]
    },
    {
      id: 2,
      mesa: 2,
      productos: [
        { id: 1, name: 'tacos', price: 20, quantity: 2 },
        { id: 2, name: 'churros', price: 20, quantity: 2 },
        { id: 3, name: 'coca', price: 20, quantity: 2 },
        { id: 4, name: 'machaca', price: 20, quantity: 2 }
      ]
    },
    {
      id: 3,
      mesa: 3,
      productos: [
        { id: 1, name: 'tacos', price: 20, quantity: 2 },
        { id: 2, name: 'churros', price: 20, quantity: 2 },
        { id: 3, name: 'carne', price: 20, quantity: 2 },
        { id: 4, name: 'meta', price: 20, quantity: 2 }
      ]
    },
    {
      id: 4,
      mesa: 4,
      productos: [
        { id: 1, name: 'tacos', price: 20, quantity: 2 },
        { id: 2, name: 'churros', price: 20, quantity: 2 },
        { id: 3, name: 'carne', price: 20, quantity: 2 },
        { id: 4, name: 'piedra', price: 20, quantity: 2 }
      ]
    },
    {
      id: 5,
      mesa: 5,
      productos: [
        { id: 1, name: 'tacos', price: 20, quantity: 2 },
        { id: 2, name: 'churros', price: 20, quantity: 2 },
        { id: 3, name: 'carne', price: 20, quantity: 2 },
        { id: 4, name: 'piedras', price: 20, quantity: 2 }
      ]
    }
  ]

  return (
    <View style={styles.products}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textProduct}>CANT.</Text>
        <Text style={styles.textProduct}>PLATILLO</Text>
        <Text style={styles.textProduct}>COSTO</Text>
      </View>
      <View>
        {ordenes[selected].productos.map((producto) => {
          return (
            <View key={producto.id} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={styles.textProduct}>{producto.quantity}</Text>
              <Text style={styles.textProduct}>{producto.name}</Text>
              <Text style={styles.textProduct}>${producto.price}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  products: {
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 50,
    height: '60%'
  },
  textProduct: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  }
})
