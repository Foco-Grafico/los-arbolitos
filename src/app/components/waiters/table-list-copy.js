import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AlimentoPreparado } from '../../../../assets/alimento-preparado'
import { useTables } from '../../hooks/waiters/useTables'
import { useOrderController } from '../../hooks/waiters/useOrderController'

export const TableList = () => {
  const { selectedTable, setSelectedTable, tables } = useTables()
  const { setOrder } = useOrderController()

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
          gap: 10,
          height: '100%'
        }}
        renderItem={({ item: table, index: i }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedTable(i)
              setOrder(table)
            }}
            style={{
              borderRadius: 6,
              backgroundColor: selectedTable === i ? '#fff' : '#fe8c00',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              position: 'relative',
              overflow: 'visible'
            }}
            key={table.key}
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
      {/* <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          nav('login')
        }}
      >
        <Cerrar fill='#fff' style={{ width: 20, height: 20 }} />
      </TouchableOpacity> */}
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
