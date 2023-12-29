import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import EditProducts from './edit-products'
import useGetCategories from '../../hooks/useGetCategories'
import { useEffect, useState } from 'react'
import useWaiterGetProductsInCategory from '../../hooks/getProductsinCategory'
import { Image } from 'expo-image'
import SignoMas from '../../../../assets/signodemas'
import Editar from '../../../../assets/editar'
import addDishToOrder from '../../../lib/api-call/order/add-dish-to-order'
import { tableStore } from '../../../../stores/waiter'
import { v4 } from '../../../lib/uuid'
import { SendCommandModal } from './send-command-modal'

export const Products = ({ isVisibleSendCommand }) => {
  const { dishes, setCategory, setSearch } = useWaiterGetProductsInCategory()
  const order = tableStore(state => state.order)

  return (
    <View
      style={{
        flex: 1,
        position: 'relative'
      }}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: 30,
          paddingHorizontal: 50,
          gap: 30
        }}
      >
        <View
          style={{
            alignItems: 'flex-end'
          }}
        >
          <TextInput
            onChangeText={setSearch}
            placeholder='BUSCAR'
            style={{
              borderWidth: 1,
              width: 250,
              height: 40,
              borderRadius: 10,
              color: '#000',
              paddingHorizontal: 10
            }}
          />
        </View>
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
                  <TouchableOpacity>
                    <Editar fill='#005942' style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
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
                        prettyDishesInOrder.push({
                          ids: [],
                          quantity: 1,
                          name: item.name,
                          key: v4()
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

                      addDishToOrder({
                        dishId: item.id,
                        supplies: item.supplies.map(supply => ({
                          id: supply.id,
                          quantity: supply.quantity
                        })),
                        orderId: order.id
                      })
                        .then(res => {
                          if (res.ok) {
                            return res.json()
                          }
                        })
                        .then(json => {
                          const { id } = json.data

                          dishesInOrder[newIndex].id = id

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
                        })
                    }}
                  >
                    <SignoMas fill='#005942' style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <Footer
        onPressInCat={(category) => {
          setCategory(category?.id)
        }}
      />
      <EditProducts />
      <SendCommandModal visibleController={isVisibleSendCommand} orderId={order.id} />
    </View>
  )
}

const Footer = ({ onPressInCat = () => {} }) => {
  const { categories } = useGetCategories()
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (categories.length > 0) {
      onPressInCat(categories[0])
    }
  }, [categories])

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#462f27'
      }}
    >
      {categories.map((category, i) => (
        <TouchableOpacity
          onPress={() => {
            setSelected(i)
            onPressInCat(category)
          }}
          key={category?.key}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: selected === i ? '#005942' : '#462f27'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {category?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
