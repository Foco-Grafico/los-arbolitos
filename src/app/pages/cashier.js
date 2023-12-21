import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function Cashier () {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      .catch((err) => {
        console.log(err)
      })

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const mesas = [
    { id: 1, status: 'ocupada', name: 'M-1' },
    { id: 2, status: 'ocupada', name: 'M-2' },
    { id: 3, status: 'ocupada', name: 'M-3' },
    { id: 4, status: 'ocupada', name: 'M-4' }
  ]

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>CAJA</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.aside}>
          <ScrollView contentContainerStyle={{ height: '90%', gap: 20, paddingVertical: 15 }}>
            {mesas.map((mesa) => {
              return (
                <TouchableOpacity style={styles.circle} key={mesa.id + 1} onPress={() => { setSelected(mesa.id) }}>
                  <Text style={{ fontSize: 16 }}>{mesa.name}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View style={{ height: '5%', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.buttons}>
              <Text style={{ color: '#fff' }}>CORTE DE CAJA</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '70%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <View style={styles.products}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16 }}>CANT.</Text>
              <Text style={{ fontSize: 16 }}>PLATILLO</Text>
              <Text style={{ fontSize: 16 }}>COSTO</Text>
            </View>
            <View>
              {ordenes[selected].productos.map((producto) => {
                return (
                  <View key={producto.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{producto.quantity}</Text>
                    <Text>{producto.name}</Text>
                    <Text>${producto.price}</Text>
                  </View>
                )
              })}
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <Text>DESCUENTO</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#005943' }}>$</Text>
              <TextInput style={{ width: 150, height: 30, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }} keyboardType='numeric' />
            </View>
            <Text>TOTAL</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#005943' }}>$</Text>
              <TextInput style={{ width: 150, height: 30, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }} keyboardType='numeric' />
            </View>
            <TouchableOpacity style={styles.buttons}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>IMPRIMIR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttons}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>CERRAR CUENTA</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>FOOT</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    height: '88%',
    flexDirection: 'row'

  },
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: '#462f27',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  aside: {
    backgroundColor: '#b89c98',
    width: '30%',
    alignItems: 'center',
    paddingVertical: 15
  },
  buttons: {
    height: 50,
    width: 150,
    borderWidth: 1,
    backgroundColor: '#005942',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#ff8b00',
    justifyContent: 'center',
    alignItems: 'center'
  },
  products: {
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 50,
    height: '60%'
  }
})
