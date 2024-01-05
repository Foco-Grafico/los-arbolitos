import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { v4 } from '../../../lib/uuid'
import { useEffect, useState } from 'react'

export default function CashierTables ({ onPressTable = (order) => {}, data }) {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (data?.length > 0) {
      onPressTable(data[0])
      return
    }
    onPressTable({})
  }, [data])

  return (
    <View style={styles.aside}>
      <ScrollView contentContainerStyle={{ height: '90%', gap: 20, paddingVertical: 15 }}>
        {data?.map((order, i) => {
          return (
            <View key={order?.key} style={{ position: 'relative' }}>
              <TouchableOpacity
                style={selected === i ? styles.selectedCircle : styles.circle} onPress={() => {
                  onPressTable(order)
                  setSelected(i)
                }}
              >
                <Text style={selected === i ? styles.selectedText : styles.text}>{order?.table?.name}</Text>
              </TouchableOpacity>
              {order.requested ? <View style={{ position: 'absolute', borderWidth: 1, width: 30, height: 30, borderRadius: 100, top: 0, right: 0, backgroundColor: 'red' }} /> : null}
            </View>
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
