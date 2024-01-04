import { FlatList, Text, View, TouchableOpacity } from 'react-native'

import SignoMas from '../../../../assets/signodemas'

import Editar from '../../../../assets/editar'
import addDishToOrder from '../../../lib/api-call/order/add-dish-to-order'
import { modalStore, tableStore } from '../../../../stores/waiter'
import { Image } from 'expo-image'
import { v4 } from '../../../lib/uuid'

export function DishList ({ dishes }) {
  const order = tableStore(state => state.order)
  const setShow = modalStore(state => state.setShow)

  const addProduct = (item) => {
    const dish = { ...item }
    console.log('dish', JSON.stringify(dish))
    const dishesInOrder = [...order.dishes]
    const prettyDishesInOrder = [...order.pretty_list]

    const newIndex = dishesInOrder.length
    const lastPrettyIndex = prettyDishesInOrder.length

    const prettyIndex = prettyDishesInOrder.findIndex(dish => dish.name === item.name)
    console.log('prettyIndex', prettyIndex)

    const isExistInPrettyList = prettyIndex !== -1

    if (isExistInPrettyList) {
      prettyDishesInOrder[prettyIndex].quantity++
    } else {
      console.log('32')

      prettyDishesInOrder.push({
        ids: [],
        quantity: 1,
        name: item.name,
        key: v4()
      })
    }

    console.log('42')

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

    console.log('63')

    tableStore.setState({
      order: {
        ...order,
        dishes: dishesInOrder,
        pretty_list: prettyDishesInOrder
      }
    })

    console.log('73')

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
            flexDirection: 'row'
          }}
        >
          <Image
            source={item.picture}
            style={{
              width: 110,
              height: 110
            }}
          />
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                {item?.name}
              </Text>
              <Text>
                {item?.description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  addProduct(item)
                    .then(product => {
                      console.log(product)

                      setShow('editDish', {
                        items: [product],
                        orderId: order?.id
                      })
                    })
                }}
              >
                <Editar fill='#005942' style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  addProduct(item)
                }}
              >
                <SignoMas fill='#005942' style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )
}
