import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import Tables from '../components/cashier/tables'
import Products from '../components/cashier/products'

export default function Cashier () {
  const [selectedTable, setSelectedTable] = useState({})

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>CAJA</Text>
      </View>
      <View style={styles.main}>
        <Tables
          onPressTable={(table) => {
            setSelectedTable(table)
          }}
        />
        <View style={{ width: '70%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Products table={selectedTable} />
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <Text style={styles.text}>DESCUENTO</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#005943' }}>$</Text>
              <TextInput style={{ width: 150, height: 30, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }} keyboardType='numeric' />
            </View>
            <Text style={styles.text}>TOTAL</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#005943' }}>$</Text>
              <Text style={{ width: 150, height: 30, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }} keyboardType='numeric' />
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
    flexDirection: 'row'

  },
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: '#462f27'
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

  text: {
    color: 'black',
    fontWeight: 'bold'
  },
  textProduct: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  }
})
