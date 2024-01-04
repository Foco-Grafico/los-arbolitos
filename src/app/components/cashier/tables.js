import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { v4 } from '../../../lib/uuid'
import { useState } from 'react'
import useGetOrdersInCashier from '../../hooks/getOrdersInCashier'

export default function CashierTables ({ onPressTable = (order) => {} }) {
  const [selected, setSelected] = useState()
  const { data } = useGetOrdersInCashier()

  return (
    <View style={styles.aside}>
      <ScrollView contentContainerStyle={{ height: '90%', gap: 20, paddingVertical: 15 }}>
        {data?.map((order) => {
          return (
            <TouchableOpacity
              style={selected === order.id ? styles.selectedCircle : styles.circle}
              key={order?.key}
              onPress={() => {
                onPressTable(order)
                setSelected(order.id)
              }}
            >
              <Text style={selected === order.id ? styles.selectedText : styles.text}>{order?.table?.name}</Text>
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
