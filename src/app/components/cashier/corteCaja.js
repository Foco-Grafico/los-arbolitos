import { FlatList, Text, View } from 'react-native'
import useGetReconciliation from '../../hooks/useGetReconciliation'
import HeaderAdmin from '../admin/header'
import Footer from '../admin/footer'

export default function CorteDeCaja () {
  const { reconciliation } = useGetReconciliation()
  console.log(JSON.stringify(reconciliation.data))

  return (
    <View style={{ flex: 1 }}>
      <HeaderAdmin>
        <Text>Corte de caja</Text>
      </HeaderAdmin>
      <View style={{ flex: 1, paddingVertical: 40 }}>
        <FlatList
          data={reconciliation?.data}
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
            </View>}
        />
        <Text>Total: {reconciliation?.total}</Text>
      </View>
      <Footer />
    </View>

  )
}
