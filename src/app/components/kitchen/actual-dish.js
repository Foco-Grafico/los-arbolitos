import { Image } from 'expo-image'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import { kitchenStore } from '../../../../stores/kitchen'
import { API_URL } from '../../../lib/api-call/data'
import finishOrderInKitchen from '../../func/finish-order-in-kitchen'
import { v4 } from '../../../lib/uuid'
import { useDeviceType, types } from '../../hooks/device'
import { markAsPreparation } from '../../../lib/api-call/kitchen/mark-as-preparation'
// import useKitchenGetOrders from '../../hooks/getOrdersInKitchen'

export default function ActualDish ({ setOrders }) {
  const dish = kitchenStore(state => state.selectedDish)
  const orderIndex = kitchenStore(state => state.orderIndex)
  const setDish = kitchenStore(state => state.setSelectedDish)
  const type = useDeviceType()

  const handleFinish = () => {
    for (const id of dish?.ids) {
      finishOrderInKitchen(id)
    }

    // const dishId = dish.id
    // const nuevoArreglo = orders?.dishes?.filter((dish) => dish.id !== dishId)

    // setOrders({ ...orders, dishes: nuevoArreglo })

    setOrders(orders => {
      const copyOrders = [...orders]

      const newDishes = copyOrders[orderIndex].pretty_list.filter((dishInOrder) => dishInOrder.ids[0] !== dish.ids[0])

      if (newDishes.length === 0) {
        const newOrders = copyOrders.filter((order, i) => i !== orderIndex)

        if (newOrders.length === 0) {
          setDish({
            comments: []
          })
          return []
        }

        const newSelectedDish = newOrders[0]?.pretty_list[0]

        setDish(newSelectedDish)

        return newOrders
      }

      setDish(newDishes[0])

      copyOrders[orderIndex].pretty_list = newDishes

      // console.log('copyOrders', orderIndex, JSON.stringify(copyOrders[orderIndex]))

      markAsPreparation(copyOrders[orderIndex]?.id, copyOrders[orderIndex]?.pretty_list[0]?.ids)

      return copyOrders
    })
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        gap: 30
      }}
    >
      {dish?.picture != null && (
        <Image
          source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish?.picture}`}
          style={{
            width: type === types.TABLET ? 240 : 100,
            height: type === types.TABLET ? '100%' : 100
          }}
        />
      )}

      <View
        style={{
          gap: 15,
          flex: 1
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 20
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            {dish.name.toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 18
            }}
          >
            <Text
              style={{
                fontWeight: 'bold'
              }}
            >
              CANTIDAD
            </Text> ({dish.quantity})
          </Text>
        </View>

        <FlatList
          data={dish?.ids}
          keyExtractor={() => v4()}
          horizontal
          style={{
            flex: 1
          }}
          ItemSeparatorComponent={() => <View style={{ width: 1, borderRadius: 5, backgroundColor: '#000', marginHorizontal: 10 }} />}
          renderItem={({ item, index }) => (
            <View>
              <View>
                <Text
                  style={{ color: '#005943', fontWeight: 'bold', fontSize: 15 }}
                >
                  MODIFICACIONES
                </Text>
                {dish.supplies_modified[item].map((supply) => (
                  <View key={v4()}>
                    <Text>
                      {supply.name} {supply.quantity}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={{ color: '#005943', fontWeight: 'bold', fontSize: 15 }}>OBSERVACIONES</Text>
              <Text>{dish?.comments[index]}</Text>
            </View>
          )}
        />
        <View
          style={{
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity
            onPress={handleFinish}
          >
            <Aceptar style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <View style={{
    //   ...styles.container,
    //   borderWidth: 1,
    //   flex: 1
    // }}
    // >
    //   <View style={{
    //     flexDirection: 'row',
    //     flex: 1,
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     paddingHorizontal: 50,
    //     borderWidth: 1
    //   }}
    //   >
    //     <View style={{
    //       ...styles.img,
    //       borderWidth: 1
    //     }}
    //     >
    //       {dish?.picture != null && <Image source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish?.picture}`} style={styles.img} />}
    //     </View>
    //     <View style={{ flexDirection: 'column', gap: 5, borderWidth: 1 }}>
    //       <View style={{ flexDirection: 'row' }}>
    //         <Text style={styles.text}>{dish?.name}</Text>
    //         <Text> {dish?.description} </Text>
    //         <Text style={styles.text}>CANTIDAD ( {dish?.quantity} )</Text>
    //       </View>
    //       <View style={{ flexDirection: 'row', gap: 10, flex: 1, borderWidth: 1 }}>
    //         <FlatList
    //           data={dish?.ids}
    //           keyExtractor={() => v4()}
    //           horizontal
    //           style={{ flex: 1 }}
    //           ItemSeparatorComponent={() => <View style={{ width: 1, borderRadius: 5, backgroundColor: '#000', marginHorizontal: 10 }} />}
    //           renderItem={({ item, index }) => (
    //             <View>
    //               <Text style={{ color: '#005943', fontWeight: 'black', fontSize: 15 }}>OBSERVACIONES</Text>
    //             </View>
    //           )}
    //         />
    //       </View>
    //       {/* <View style={styles.observations}>
    //         <Text style={{ color: '#005943', fontWeight: 'black', fontSize: 12 }}>OBSERVACIONES</Text>
    //         {dish?.comments.map((comment) => (
    //           <Text style={styles.text} key={dish.key + comment}>{comment}</Text>
    //         ))}
    //       </View> */}
    //       <View style={{ alignItems: 'flex-end' }}>
    //         <TouchableOpacity onPress={handleFinish}>
    //           <Aceptar style={{ width: 24, height: 24 }} />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  )
}
