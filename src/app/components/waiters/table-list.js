import useWaiterGetTablesinZone from '../../hooks/getTablesbyZone'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { orderStore } from '../../../../stores/waiter'

export default function TableList () {
  const { tables } = useWaiterGetTablesinZone()
  const setTableSelected = orderStore((state) => state.setSelectedPostionTable)
  const tableSelected = orderStore((state) => state.selectedPostionTable)

  return (
    <View style={styles.aside}>
      <ScrollView contentContainerStyle={{ gap: 20, padding: 5 }}>
        {tables.map((table, i) => {
          return (
            <TouchableOpacity onPress={() => { setTableSelected(i) }} style={tableSelected === i ? styles.selectedCircle : styles.circle} key={table.key}>
              <Text style={styles.text}>
                {table.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
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
