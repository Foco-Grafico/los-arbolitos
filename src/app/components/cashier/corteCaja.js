import { Text, View } from 'react-native'
import useGetReconciliation from '../../hooks/useGetReconciliation'
import HeaderAdmin from '../admin/header'
import Footer from '../admin/footer'

export default function CorteDeCaja () {
  const { reconciliation } = useGetReconciliation()
  console.log(JSON.stringify(reconciliation))

  return (
    <View>
      <HeaderAdmin>
        <Text>Corte de caja</Text>
      </HeaderAdmin>
      <View style={{ flex: 1 }}>
        {reconciliation?.map((item, i) => {
          return (
            <View key={i}>
              <Text>{item?.name}</Text>
              <Text>{item?.total}</Text>
            </View>
          )
        })}
      </View>
      <Footer />
    </View>
  )
}
