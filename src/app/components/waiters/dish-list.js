import { FlatList, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'

import SignoMas from '../../../../assets/signodemas'

import Editar from '../../../../assets/editar'
import addDishToOrder from '../../../lib/api-call/order/add-dish-to-order'
import { modalStore, tableStore } from '../../../../stores/waiter'
import { Image } from 'expo-image'
import { v4 } from '../../../lib/uuid'
import { togglePriority } from '../../../lib/api-call/order/toggle'

export function DishList ({ dishes, editProductController, resetSearch }) {
  const order = tableStore(state => state.order)
  const status = tableStore(state => state.status)
  const setStatus = tableStore(state => state.setStatus)
  const setShow = modalStore(state => state.setShow)

  const addProduct = async (item) => {
    resetSearch()

    const dish = { ...item }
    const dishesInOrder = [...order.dishes]
    const prettyDishesInOrder = [...order.pretty_list]

    const newIndex = dishesInOrder.length
    const lastPrettyIndex = prettyDishesInOrder.length

    const prettyIndex = prettyDishesInOrder.findIndex(dish => dish.name === item.name && dish.status.id === 1)

    const isExistInPrettyList = prettyIndex !== -1

    if (isExistInPrettyList && prettyDishesInOrder[prettyIndex].status.id === 1) {
      prettyDishesInOrder[prettyIndex].quantity++
      prettyDishesInOrder[prettyIndex].created_at.push(new Date().toISOString())
    } else {
      prettyDishesInOrder.push({
        ids: [],
        quantity: 1,
        name: item.name,
        key: v4(),
        status: {
          id: 1,
          name: 'pending'
        },
        created_at: [new Date().toISOString()]
      })
    }

    dishesInOrder.push({
      ...dish,
      status: {
        id: 1,
        name: 'pending'
      },
      priority: false,
      modified: false,
      supplies: dish.supplies.map(supply => ({
        id: supply?.id,
        name: supply?.name,
        extra_cost: 0,
        quantity: supply?.quantity,
        key: supply?.key
      })),
      total: dish.price,
      key: v4()
    })

    tableStore.setState({
      order: {
        ...order,
        dishes: dishesInOrder,
        pretty_list: prettyDishesInOrder
      }
    })

    if (status.id !== 1) {
      await togglePriority(order.id, true)

      setStatus(1)
      tableStore.setState(state => ({
        order: {
          ...state.order,
          priority: true
        },
        alwaysPriority: true
      }))
    }

    return new Promise((resolve) => {
      addDishToOrder({
        dishId: item?.id,
        supplies: item?.supplies.map(supply => ({
          id: supply?.id,
          quantity: supply?.quantity
        })),
        orderId: order?.id
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(json => {
          const { id } = json.data

          const product = {
            ...dishesInOrder[newIndex],
            id
          }

          dishesInOrder[newIndex] = product

          if (isExistInPrettyList) {
            prettyDishesInOrder[prettyIndex].ids.push(id)
          } else {
            prettyDishesInOrder[lastPrettyIndex].ids.push(id)
          }

          tableStore.setState({
            order: {
              ...order,
              dishes: dishesInOrder,
              pretty_list: prettyDishesInOrder
            }
          })

          resolve({
            ...dishesInOrder[newIndex],
            index: newIndex
          })
        })
    })
  }

  return (
    <FlatList
      numColumns={2}
      data={dishes}
      contentContainerStyle={{
        paddingHorizontal: 40,
        gap: 10
      }}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: '#ff8b00',
            borderRadius: 9
          }}
        >
          <Image
            source={item.picture}
            style={{
              width: 110,
              height: 110
            }}
          />
          {/* <View
            style={{
              width: 110,
              height: 110,
              borderWidth: 1,
              borderColor: '#000'
            }}
          /> */}
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 7,
              flex: 1
            }}
          >
            <View
              style={{
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                {item?.name}
              </Text>
              {/* <Text>
                {item?.description}
              </Text> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                marginTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (order.status.id >= 5) {
                    ToastAndroid.show('No se puede editar un pedido que ya está pagado', ToastAndroid.SHORT)
                    return
                  }

                  addProduct(item)
                    .then(product => {
                      setShow('editDish', {
                        items: [product],
                        orderId: order?.id
                      })
                      editProductController?.setData?.({
                        items: [product],
                        orderId: order?.id
                      })
                      editProductController?.setVisible?.(true)
                    })
                }}
              >
                <Editar fill='#FFF' style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (order.status.id >= 5) {
                    ToastAndroid.show('No se puede editar un pedido que ya está pagado', ToastAndroid.SHORT)
                    return
                  }

                  addProduct(item)
                }}
              >
                <SignoMas fill='#FFF' style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )
}
