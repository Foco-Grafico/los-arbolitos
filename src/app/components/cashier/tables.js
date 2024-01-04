import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { v4 } from '../../../lib/uuid'
import { useState } from 'react'

export default function CashierTables ({ onPressTable = (table) => {} }) {
  const [selected, setSelected] = useState()
  const tables = [
    {
      id: 1,
      status: 'ocupada',
      name: 'M-1',
      order: {
        id: 1,
        mesa: 'M-1',
        productos: [
          { id: 1, name: 'tacos', price: 20, quantity: 2 },
          { id: 2, name: 'perico', price: 20, quantity: 2 },
          { id: 3, name: 'carne', price: 20, quantity: 2 },
          { id: 4, name: 'machaca', price: 20, quantity: 2 }
        ]
      },
      key: v4()
    },
    {
      id: 2,
      status: 'ocupada',
      name: 'M-2',
      order: {
        id: 1,
        mesa: 'M-1',
        productos: [
          { id: 1, name: 'tacos', price: 20, quantity: 2 },
          { id: 2, name: 'perico', price: 20, quantity: 2 },
          { id: 4, name: 'machaca', price: 20, quantity: 2 }
        ]
      },
      key: v4()
    },
    {
      id: 3,
      status: 'ocupada',
      name: 'M-3',
      order: {
        id: 1,
        mesa: 'M-1',
        productos: [
          { id: 1, name: 'tacos', price: 20, quantity: 2 },
          { id: 2, name: 'perico', price: 20, quantity: 2 },
          { id: 3, name: 'carne', price: 20, quantity: 2 },
          { id: 4, name: 'machaca', price: 20, quantity: 2 }
        ]
      },
      key: v4()
    },
    {
      id: 4,
      status: 'ocupada',
      name: 'M-4',
      order: {
        id: 1,
        mesa: 'M-1',
        productos: [
          { id: 1, name: 'tacos', price: 20, quantity: 2 },
          { id: 2, name: 'perico', price: 20, quantity: 2 },
          { id: 3, name: 'carne', price: 20, quantity: 2 },
          { id: 4, name: 'machaca', price: 20, quantity: 2 }
        ]
      },
      key: v4()
    },
    {
      id: 5,
      status: 'ocupada',
      name: 'M-5',
      order: {
        id: 1,
        mesa: 'M-1',
        productos: [
          { id: 1, name: 'tacos', price: 20, quantity: 2 },
          { id: 2, name: 'perico', price: 20, quantity: 2 },
          { id: 3, name: 'carne', price: 20, quantity: 2 },
          { id: 4, name: 'machaca', price: 20, quantity: 2 }
        ]
      },
      key: v4()
    }
  ]
  console.log(selected)
  return (
    <View style={styles.aside}>
      <ScrollView contentContainerStyle={{ height: '90%', gap: 20, paddingVertical: 15 }}>
        {tables?.map((table) => {
          return (
            <TouchableOpacity
              style={selected === table.id ? styles.selectedCircle : styles.circle}
              key={table?.key}
              onPress={() => {
                onPressTable(table)
                setSelected(table.id)
              }}
            >
              <Text style={selected === table.id ? styles.selectedText : styles.text}>{table.name}</Text>
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
  selectedCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedText: {
    color: '#005943',
    fontWeight: 'bold',
    fontSize: 20
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
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
