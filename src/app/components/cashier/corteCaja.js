import { FlatList, Text, View } from 'react-native'
import useGetReconciliation from '../../hooks/useGetReconciliation'
import HeaderAdmin from '../admin/header'
import Footer from '../admin/footer'

export default function CorteDeCaja () {
  const { reconciliation } = useGetReconciliation()
  console.log(JSON.stringify(reconciliation.data))
  console.log('')
  return (
    <View style={{ flex: 1 }}>
      <HeaderAdmin>
        <Text>Corte de caja</Text>
      </HeaderAdmin>
      <FlatList
        data={reconciliation?.data}
        contentContainerStyle={{ flex: 1 }}
        renderItem={({ item }) =>
          <View key={item.key}>
            <Text>{item?.user?.name}  {item?.table?.name}</Text>
            <Text>'Productos'</Text>
            {item?.dishes?.map(product => {
              return (
                <Text key={product?.id}>
                  Nombre: {product?.name} Precio: {product?.total}
                </Text>
              )
            })}
            <Text>Total: {item?.total}</Text>
          </View>}
      />
      <Footer />
    </View>

  )
}
