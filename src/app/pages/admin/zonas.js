import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import useGetTables from '../../hooks/useGetTables'

export default function Zones () {
  const { tables } = useGetTables()

  const tablesByZone = tables.reduce((acc, table) => {
    if (!acc[table.zone_id]) {
      acc[table.zone_id] = []
    }
    acc[table.zone_id].push(table)
    return acc
  }, {})

  console.log(tablesByZone)

  return (
    <View style={{ flex: 1 }}>
      <HeaderAdmin>
        <Text>Zonas</Text>
      </HeaderAdmin>
      <ScrollView style={{ flex: 1, gap: 5, width: '100%', paddingHorizontal: 10 }}>
        <Text>Zonas</Text>
        {Object.entries(tablesByZone).map(([zoneId, tables]) => (
          <View key={zoneId} style={{ columnGap: 5, borderWidth: 1, gap: 5, padding: 5 }}>
            <Text>{`Zona ${zoneId}`}</Text>
            <FlatList
              data={tables}
              contentContainerStyle={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
              renderItem={({ item: table }) => (
                <TouchableOpacity key={table.id} style={{ borderRadius: 50, borderWidth: 1, backgroundColor: 'white', width: 80, height: 80, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Zona: {table.zone_id}</Text>
                  <Text>Mesa: {table.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={table => table.id}
              numColumns={3}
            />
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  )
}
