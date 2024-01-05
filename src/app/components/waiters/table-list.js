import useWaiterGetTablesinZone from '../../hooks/getTablesbyZone'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { AlimentoPreparado } from '../../../../assets/alimento-preparado'

export function TableList ({ onPressItem = () => {} }) {
  const { tables } = useWaiterGetTablesinZone()
  const [tableSelected, setTableSelected] = useState(0)

  console.log('tables', tables[0])

  useEffect(() => {
    if (tables.length === 0) {
      return
    }
    onPressItem(tables[0])
  }, [tables])

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
              onPressItem(table)
              setTableSelected(i)
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
