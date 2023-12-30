import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CashierTables () {
  const mesas = [
    { id: 1, status: 'ocupada', name: 'M-1' },
    { id: 2, status: 'ocupada', name: 'M-2' },
    { id: 3, status: 'ocupada', name: 'M-3' },
    { id: 4, status: 'ocupada', name: 'M-4' }
  ]
  return (
    <View style={styles.aside}>
      <ScrollView contentContainerStyle={{ height: '90%', gap: 20, paddingVertical: 15 }}>
        {mesas.map((mesa) => {
          return (
            <TouchableOpacity style={styles.circle} key={mesa.id + 1} onPress={() => { setSelected(mesa.id) }}>
              <Text style={{ ...styles.text, fontSize: 24 }}>{mesa.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={{ height: '5%', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>CORTE DE CAJA</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  aside: {
    backgroundColor: '#b89c98',
    width: '30%',
    alignItems: 'center',
    paddingVertical: 15
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#ff8b00',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  },
  buttons: {
    width: 150,
    height: 30,
    backgroundColor: '#005943',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
