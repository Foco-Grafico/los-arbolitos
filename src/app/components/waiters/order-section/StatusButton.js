import { Text, TouchableOpacity } from 'react-native'
import { basicInfo, dishList } from '../../../../../stores/waiter/order-sec.store'

const OPTIONS = {
  1: {
    name: 'pending',
    title: 'Enviar a cocina'
  },
  2: {
    name: 'in-progress',
    title: 'En progreso'
  },
  6: {
    name: 'paid',
    title: 'Liberar mesa'
  }
}

export const StatusButton = () => {
  const status = basicInfo(state => state.status)
  const prettyList = dishList(state => state.pretty)

  if (status === null || prettyList.length === 0) return null

  return (
    <TouchableOpacity
      style={{
      }}
      onPress={() => {

      }}
    >
      <Text>
        {OPTIONS[status?.id]?.title}
      </Text>
    </TouchableOpacity>
  )
}
