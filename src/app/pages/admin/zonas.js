import { View, Text } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import useWaiterGetTablesinZone from '../../hooks/getTablesbyZone'
import useGetUsers from '../../hooks/getUsers'

export default function Zones () {
  const { tables } = useWaiterGetTablesinZone()
  const { users } = useGetUsers()

  console.log(users, tables[users[0].id])

  return (
    <View style={{ flex: 1 }}>
      <HeaderAdmin>
        <Text>Zonas</Text>
      </HeaderAdmin>
      <View style={{ flex: 1 }}>
        <Text>Zonas</Text>
        {tables?.map(table => (
          <Text key={table.id}>{table.name}</Text>
        ))}

      </View>
      <Footer />
    </View>
  )
}
