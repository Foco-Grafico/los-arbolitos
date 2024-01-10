import { Text, View, TouchableOpacity, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { AlimentoPreparado } from '../../../../assets/alimento-preparado'
import { socket } from '../../../services/socket'
import { Cerrar } from '../../../../assets/cerrar'
import { routerStore } from '../../../../stores/router'
import { useHorribleSound } from '../../hooks/play-sounds'

export function TableList ({ onPressItem = () => {}, data = [], hasSelected = false }) {
  const [tableSelected, setTableSelected] = useState(0)
  const [tables, setTables] = useState([])
  const abortController = useRef(new AbortController())
  const nav = routerStore(state => state.nav)

  const { play } = useHorribleSound()

  useEffect(() => {
    setTables(data)
  }, [data])

  useEffect(() => {
    socket.on('order_status', ({ table, order_id: orderId, status }) => {
      if (status?.id !== 3) return
      play()

      ToastAndroid.show('La orden ha sido finalizada', ToastAndroid.SHORT)

      setTables(prev => {
        const copyPrev = [...prev]
        const tableIndex = copyPrev.findIndex((t) => t.id === table.id)

        const newTable = {
          ...copyPrev[tableIndex],
          finalized: true,
          current_order: orderId
        }

        copyPrev[tableIndex] = newTable

        return copyPrev
      })
    })
  }, [])

  useEffect(() => {
    if (tables.length === 0) {
      return
    }
    if (hasSelected) {
      return
    }
    onPressItem(tables[0], abortController)
  }, [tables, hasSelected])

  return (
    <View style={{
      backgroundColor: '#005943',
      paddingVertical: 10,
      paddingHorizontal: 8,
      height: '100%'
    }}
    >
      <FlatList
        data={tables}
        contentContainerStyle={{
          gap: 15,
          height: '100%'
        }}
        renderItem={({ item: table, index: i }) => (
          <TouchableOpacity
            onPress={() => {
              onPressItem(table, abortController)
              setTableSelected(i)
              setTables(prev => {
                const copyPrev = [...prev]
                const tableIndex = copyPrev.findIndex((t) => t.id === table.id)

                const newTable = {
                  ...copyPrev[tableIndex],
                  finalized: false
                }

                copyPrev[tableIndex] = newTable

                return copyPrev
              })
            }} style={{
              borderRadius: 100,
              backgroundColor: tableSelected === i ? '#fff' : '#fe8c00',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              position: 'relative',
              overflow: 'visible'
            }} key={table.key}
          >
            <Text style={styles.text}>
              {table.name}
            </Text>
            {table?.finalized && (
              <AlimentoPreparado style={{
                position: 'absolute',
                top: '150%',
                right: '50%',
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: 'red'
              }}
              />
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          nav('login')
        }}
      >
        <Cerrar fill='#fff' style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      {/* <ScrollView contentContainerStyle={{ gap: 20 }}>
        {tables.map((table, i) => {
          return (
            <TouchableOpacity onPress={() => { setTableSelected(i) }} style={tableSelected === i ? styles.selectedCircle : styles.circle} key={table.key}>
              <Text style={styles.text}>
                {table.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  aside: {
    backgroundColor: '#005943',
    width: 70,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  text: {
    color: '#000',
    fontSize: 14
  },
  circle: {
    borderRadius: 100,
    backgroundColor: '#fe8c00',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  selectedCircle: {
    borderRadius: 100,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  }
})
