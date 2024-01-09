import { Text, TouchableOpacity, StyleSheet, FlatList, View, ToastAndroid } from 'react-native'
import { modalStore, tableStore } from '../../../../stores/waiter'

import SignoMenos from '../../../../assets/signodemenos'
import { removeDishFromOrder } from '../../func/remove-dish-from-order'
import { Salero } from '../../../../assets/enpreparacion'
import Accept from '../../../../assets/aceptar'

export function DishListInOrder () {
  const order = tableStore(state => state.order)
  const setShow = modalStore(state => state.setShow)

  return (
    <FlatList
      data={order.pretty_list}
      contentContainerStyle={{
        gap: 5
      }}
      renderItem={({ item, index }) => item.quantity > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 25,
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            disabled={item?.status?.id !== 1}
            onPress={() => {
              const items = order.dishes.filter(dish => item?.ids.includes(dish?.id)).map(dish => ({
                ...dish,
                index: order.dishes.findIndex(d => d?.id === dish?.id)
              }))

              setShow('editDish', {
                items,
                orderId: order?.id
              })
            }}
            style={{
              flexDirection: 'row',
              gap: 30,
              marginLeft: 10
            }}
          >
            <Text style={{
              ...whiteText,
              ...bold
            }}
            >
              {item.quantity}
            </Text>
            <Text style={{
              ...whiteText,
              ...bold,
              width: 100,
              flexWrap: 'wrap',
              textAlign: 'left'
            }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
          {((!item.modified || (item.modified && item.quantity === 1)) && item.status?.id === 1) && (
            <TouchableOpacity
              onPress={() => {
                const idToDelete = item?.ids[0]
                const dishesToDelete = order.dishes.find(dish => idToDelete === dish?.id)

                const newDishes = order.dishes.filter(dish => dish?.id !== idToDelete)

                const allExceptFirst = [...item?.ids].slice(1)

                const newPrettyDishes = [...order.pretty_list]

                newPrettyDishes[index].quantity -= 1
                newPrettyDishes[index].ids = allExceptFirst

                const isEmpty = allExceptFirst.length === 0

                if (isEmpty) {
                  newPrettyDishes.splice(index, 1)
                }

                tableStore.setState({
                  order: {
                    ...order,
                    dishes: newDishes,
                    pretty_list: newPrettyDishes
                  }
                })

                const ifError = () => {
                  ToastAndroid.show('Error al eliminar platillo', ToastAndroid.SHORT)

                  if (isEmpty) {
                    newPrettyDishes.push(item)

                    tableStore.setState({
                      order: {
                        ...order,
                        dishes: [...newDishes, dishesToDelete],
                        pretty_list: newPrettyDishes
                      }
                    })
                    return
                  }

                  newPrettyDishes[index].quantity += 1
                  newPrettyDishes[index].ids.push(idToDelete)

                  tableStore.setState({
                    order: {
                      ...order,
                      dishes: [...newDishes, dishesToDelete],
                      pretty_list: newPrettyDishes
                    }
                  })
                }

                removeDishFromOrder({
                  orderId: order?.id,
                  orderDishId: idToDelete
                })
                  .then(res => {
                    if (res.ok) {
                      ToastAndroid.show('Se ha eliminado el producto de la orden', ToastAndroid.SHORT)
                      return
                    }
                    ifError()
                  })
                  .catch(() => {
                    ifError()
                  })
              }}
            >
              <SignoMenos fill='#005942' style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          )}
          {item.status?.id === 2 && (
            <Salero style={{ width: 24, height: 24 }} />
          )}

          {item.status?.id === 3 && (
            <Accept style={{ width: 24, height: 24 }} />
          )}
        </View>
      )}
    />
  )
  // const table = orderStore((state) => state.table)
  // const selectProduct = orderStore((state) => state.selectProduct)
  // const isDishSelected = orderStore((state) => state.isDishSelected)
  // const [dishes, setDishes] = useState([])

  // useEffect(() => {
  //   setDishes(() => {
  //     if (!table?.order?.dishes) return []

  //     const groupDishes = table?.order?.dishes.reduce((acc, dish) => {
  //       const isModified = dish.modified === 1

  //       const objName = isModified ? `${dish.name}M` : dish.name
  //       if (acc[objName]) {
  //         acc[objName].quantity += 1
  //         acc[objName].ids.push(dish.id)
  //       } else {
  //         acc[objName] = { ...dish, isModified, originalName: dish.name, name: `${isModified ? `${dish.name} (M)` : dish.name}`, quantity: 1, ids: [dish.id] }
  //       }
  //       return acc
  //     }, {})

  //     return Object.values(groupDishes)
  //   })
  // }, [table])

  // const handleRemoveItem = (dishId, i) => () => {
  //   removeDishFromOrder({ orderId: table?.order?.id, orderDishId: dishId })

  //   setDishes(prev => {
  //     const copyPrev = [...prev]

  //     const dish = copyPrev[i]
  //     const newDish = {
  //       ...dish,
  //       quantity: dish.quantity - 1
  //     }

  //     if (newDish.quantity === 0) {
  //       copyPrev.splice(i, 1)
  //     } else {
  //       copyPrev[i] = newDish
  //     }

  //     return copyPrev
  //   })
  // }

  // return (
  //   <ScrollView
  //     style={{ width: '100%' }}
  //     contentContainerStyle={{
  //       flex: 1
  //     }}
  //   >
  //     {dishes.map((dish, i) => (
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10 }} key={dish.key}>
  //         <TouchableOpacity
  //           style={{ gap: 36, flexDirection: 'row' }}
  //           onPress={() => selectProduct(dish.originalName, dish.isModified)}
  //           disabled={isDishSelected}
  //         >
  //           <Text style={styles.text2}>
  //             {dish?.quantity}
  //           </Text>
  //           <Text style={styles.text2}>
  //             {dish?.name}
  //           </Text>
  //         </TouchableOpacity>
  //         <View>
  //           <TouchableOpacity
  //             style={{ width: 24, height: 24 }} onPress={handleRemoveItem(dish.id, i)} disabled={isDishSelected}
  //           >
  //             <SignoMenos fill='#005942' style={{ width: 24, height: 24 }} />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     ))}
  //   </ScrollView>
  //   // <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, flexDirection: 'column', gap: 10 }}>
  //   //   <ScrollView contentContainerStyle={{ paddingBottom: 35, gap: 5 }}>
  //   //     {dishes.map((dish, i) => {
  //   //       return (
  //   //         <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '90%' }} key={dish.key}>
  //   //           <TouchableOpacity
  //   //             style={{ gap: 20, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '95%' }}
  //   //             onPress={() => selectProduct(dish.originalName, dish.isModified)}
  //   //             disabled={isDishSelected}
  //   //           >
  //   //             <Text style={styles.text2}>
  //   //               {dish?.quantity}
  //   //             </Text>
  //   //             <Text style={styles.text2}>
  //   //               {dish?.name}
  //   //             </Text>
  //   //           </TouchableOpacity>
  //   //           <View>
  //   //             <TouchableOpacity
  //   //               style={{ width: 24, height: 24 }} onPress={handleRemoveItem(dish.id, i)} disabled={isDishSelected}
  //   //             >
  //   //               <SignoMenos fill='#005942' style={{ width: 24, height: 24 }} />
  //   //             </TouchableOpacity>
  //   //           </View>
  //   //         </View>
  //   //       )
  //   //     })}
  //   //   </ScrollView>
  //   // </View>
  // )
}

const { bold, whiteText } = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  whiteText: {
    color: 'white'
  }
})
