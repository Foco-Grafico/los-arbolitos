import { View } from 'react-native'
// import Footer from '../components/footer'
// import { useState } from 'react'
import { tableStore } from '../../../stores/waiter'
// import EditProducts from '../components/waiters/edit-products'
import { TableList } from '../components/waiters/table-list'
// import { useState } from 'react'
import OrderSection from '../components/waiters/order-section'
import { Products } from '../components/waiters/products'
import { useState } from 'react'
import { getOrder } from '../../lib/api-call/order/get-order'
import useWaiterGetTablesinZone from '../hooks/getTablesbyZone'
// import DishList from '../components/waiters/dish-list'
// import { sendToCashier, sendTokitchen } from '../../lib/api-call/order/move-order'

export function Waiter ({ leader = false }) {
  const { tables, setTables } = useWaiterGetTablesinZone(leader)

  const table = tableStore(state => state.table)
  const setTable = tableStore(state => state.setTable)

  const [visibleSendCommand, setVisibleSendCommand] = useState(false)
  const [visibleSendToCash, setVisibleSendToCash] = useState(false)
  const [visibleEditProduct, setVisibleEditProduct] = useState(false)
  const [dataEditProduct, setDataEditProduct] = useState({})
  const [blockButton, setBlockButton] = useState(false)

  return (
    <View style={{
      flexDirection: 'row',
      flex: 1
    }}
    >
      <TableList
        data={tables}
        onPressItem={(table, abortController) => {
          try {
            abortController.current.abort('Previous request cancelled')
            abortController.current = new AbortController()
          } catch {
          }

          console.log('table', table)

          getOrder(table.current_order, {
            signal: abortController.current.signal
          })
            .then(order => {
              console.log('order', JSON.stringify(order))

              setTable({ ...table, order })
            })
        }}
        hasSelected={table?.id != null}
      />

      <OrderSection
        setData={setDataEditProduct}
        editProductController={{
          isVisible: visibleEditProduct,
          setVisible: setVisibleEditProduct,
          data: dataEditProduct,
          setData: setDataEditProduct
        }}
        blockButton={blockButton}
        setVisible={setVisibleEditProduct} setTables={setTables} setVisibleSendToCash={setVisibleSendToCash} setShowSendCommand={setVisibleSendCommand}
      />

      <Products
        editProductController={{
          isVisible: visibleEditProduct,
          setVisible: setVisibleEditProduct,
          data: dataEditProduct,
          setData: setDataEditProduct
        }}
        isVisibleSendCommand={{
          isVisible: visibleSendCommand,
          setVisible: setVisibleSendCommand
        }}
        sendToCash={{
          isVisible: visibleSendToCash,
          setVisible: setVisibleSendToCash
        }}
        setBlockButton={setBlockButton}
      />
    </View>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: '100%'
//   },
//   circle: {
//     borderRadius: 100,
//     backgroundColor: '#fe8c00',
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//     height: 40
//   },
//   selectedCircle: {
//     borderRadius: 100,
//     backgroundColor: '#fff',
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//     height: 40
//   },
//   aside: {
//     backgroundColor: '#005943',
//     width: 70,
//     height: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     gap: 20
//   },
//   text: {
//     color: '#000',
//     fontSize: 12,
//     fontWeight: 'bold'
//   },
//   title: {
//     color: '#000',
//     fontSize: 14,
//     fontWeight: 'bold'
//   },
//   text2: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   order: {
//     backgroundColor: '#b89c98',
//     width: 300,
//     height: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     gap: 20
//   },
//   productList: {
//     backgroundColor: '#fff',
//     height: '100%',
//     width: 630,
//     flexDirection: 'column',
//     textAlign: 'center',
//     gap: 10,
//     position: 'relative'
//   },
//   products: {
//     flexDirection: 'row',
//     width: 330,
//     height: 100,
//     gap: 10
//   },
//   buscador: {
//     borderWidth: 1,
//     width: 250,
//     height: 40,
//     borderRadius: 10,
//     color: '#000',
//     paddingHorizontal: 10
//   },
//   img: {
//     width: 100,
//     height: 100
//   },
//   buttons: {
//     backgroundColor: '#005943',
//     borderRadius: 10,
//     fontSize: 20,
//     color: '#000000',
//     shadowRadius: 5,
//     shadowOpacity: 1,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 10,
//     textAlign: 'center',
//     justifyContent: 'center',
//     width: 200,
//     height: 40
//   },
//   modal: {
//     backgroundColor: '#377c6a90',
//     flexDirection: 'column',
//     textAlign: 'center',
//     gap: 10,
//     height: '100%',
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20
//   },
//   modalText: {
//     color: '#000',
//     fontSize: 12,
//     fontWeight: 'bold'
//   },
//   modalForm: {
//     backgroundColor: '#fff',
//     width: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     gap: 20
//   },
//   modalEditProduct: {
//     backgroundColor: '#fff',
//     width: 540,
//     height: 400,
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     gap: 20
//   }
// })
