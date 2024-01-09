// import { TouchableOpacity, View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
// import SwitchSlider from '../switch-slider'
// import { orderStore } from '../../../../stores/waiter'
import Eliminar from '../../../../assets/eliminar'
// import SignoMenos from '../../../../assets/signodemenos'
// import SignoMas from '../../../../assets/signodemas'
// // import useGetSupplies from '../../hooks/getSupplies'
// // import { useState } from 'react'
// import debounce from 'just-debounce-it'
import { modifyDish } from '../../../lib/api-call/order/modify-dish'

import { FlatList, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { modalStore, tableStore } from '../../../../stores/waiter'
import SignoMas from '../../../../assets/signodemas'
import SignoMenos from '../../../../assets/signodemenos'
import { v4 } from '../../../lib/uuid'
import { useState } from 'react'
import debounce from 'just-debounce-it'
import useGetSupplies from '../../hooks/getSupplies'

export default function EditProducts () {
  const {
    setShow,
    data,
    show
  } = modalStore(state => state)
  const editProducts = tableStore(state => state.editProducts)

  const adjustQuantity = (index, productIndex, type = '+') => {
    const items = [...data.items]
    const supplies = [...data.items[productIndex].supplies]

    const newSupply = {
      ...items[productIndex].supplies[index],
      quantity: type === '+' ? items[productIndex].supplies[index].quantity + 1 : items[productIndex].supplies[index].quantity - 1
    }

    if (newSupply.quantity <= 0) {
      items[productIndex].supplies.splice(index, 1)

      modalStore.setState({
        data: {
          ...data,
          items
        }
      })
      return
    }

    supplies[index] = newSupply

    const product = {
      ...items[productIndex],
      supplies
    }

    items[productIndex] = product

    modalStore.setState({
      data: {
        ...data,
        items
      }
    })
  }

  const setComment = debounce((comment, index) => {
    const items = [...data.items]
    if (comment === '' || comment === 'null' || comment === 'undefined') {
      comment = null
    }

    items[index].comment = comment

    modalStore.setState({
      data: {
        ...data,
        items
      }
    })
  }, 3000)

  if (show === 'editDish') {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#377c6a90',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 50
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            gap: 20,
            flex: 1,
            width: '100%'
          }}
        >
          <FlatList
            style={{
              width: '100%',
              flex: 1
            }}
            keyExtractor={() => v4()}
            contentContainerStyle={{
              gap: 20
            }}
            data={data.items}
            renderItem={({ item, index }) => (
              <View
                style={{
                  gap: 10
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#005943',
                        borderRadius: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 4
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>

                    <Eliminar style={{ width: 24, height: 24 }} />
                  </View>

                  <SearchBarSupply
                    onAddSupplyClick={(supply) => {
                      const items = [...data.items]

                      const supplyIndex = items[index].supplies.findIndex(s => s.id === supply.id)

                      if (supplyIndex !== -1) {
                        adjustQuantity(supplyIndex, index, '+')
                        return
                      }

                      const supplies = [...data.items[index].supplies]

                      const newSupply = {
                        ...supply,
                        quantity: 1
                      }

                      supplies.push(newSupply)

                      const product = {
                        ...items[index],
                        supplies
                      }

                      items[index] = product

                      modalStore.setState({
                        data: {
                          ...data,
                          items
                        }
                      })
                    }}
                  />

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', width: '70%' }}>
                  {item.supplies.map((supply, i) => <Supply adjust={adjustQuantity} key={v4()} supply={supply} productIndex={index} index={i} />)}
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 10
                  }}
                >
                  <Text>
                    Observaciones
                  </Text>

                  <TextInput
                    style={{
                      flexWrap: 'wrap'
                    }}
                    defaultValue={item.comment === 'null' || item.comment === 'undefined' ? '' : item.comment}
                    onChangeText={(text) => {
                      setComment(text, index)
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 15
                  }}
                >
                  <Text>
                    PLATILLO PRIORITARIO
                  </Text>
                  <View>
                    <Switch
                      trackColor={{ true: '#005942' }}
                      thumbColor='#005942'
                      value={item.priority}
                      onValueChange={() => {
                        modalStore.setState({
                          data: {
                            ...data,
                            items: [...data.items].map((product, i) => {
                              if (i === index) {
                                return {
                                  ...product,
                                  priority: !product.priority
                                }
                              }

                              return product
                            })
                          }
                        })
                      }}
                    />
                  </View>
                </View>

                <View style={{
                  backgroundColor: '#005943',
                  width: '100%',
                  height: 5,
                  alignContent: 'center'
                }}
                />
              </View>
            )}
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: '100%'
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                const newItems = [...data.items]

                const promiseArray = newItems.map((product) => {
                  const supplies = product.supplies.map(supply => ({
                    id: supply?.id,
                    quantity: supply?.quantity
                  }))

                  const comment = product.comment === '' || product.comment === 'null' || product.comment === 'undefined' ? null : product.comment

                  return modifyDish(data?.orderId, product?.id, supplies, product?.priority, comment)
                })

                await Promise.all(promiseArray)

                editProducts(data?.orderId)
                setShow('', null)
              }}
            >
              <Aceptar style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const SearchBarSupply = ({ onAddSupplyClick }) => {
  const [q, setQ] = useState('')
  const { supplies } = useGetSupplies({ q })

  const setQuery = debounce(setQ, 500)

  return (
    <View
      style={{
        position: 'relative'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            color: '#000',
            paddingHorizontal: 10,
            width: 200
          }}
          onChangeText={setQuery}
          placeholder='BUSCAR'
          placeholderTextColor='#005943'
        />
        {/* <SignoMas style={{ width: 24, height: 24 }} /> */}
      </View>
      {supplies.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: '105%',
            width: '100%',
            maxHeight: 110,
            borderRadius: 5,
            gap: 5,
            paddingVertical: 5,
            overflow: 'hidden',
            backgroundColor: '#8d89898a'
          }}
        >
          {supplies.map((supply) => (
            <TouchableOpacity
              key={supply.id}
              onPress={() => {
                onAddSupplyClick?.(supply)
              }}
              style={{
                width: '100%',
                paddingHorizontal: 10
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingHorizontal: 10
                }}
              >
                {supply.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const Supply = ({ supply, index, productIndex, adjust, onChangeCounter = () => {} }) => {
  const [quantity, setQuantity] = useState(supply?.quantity)

  return (
    <View style={{ width: 250, marginBottom: 5, flexDirection: 'row', gap: 20 }}>
      <Text style={{ width: 100, color: '#005943', fontSize: 15, fontWeight: 'bold' }}>
        {supply?.name}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setQuantity(prev => {
              onChangeCounter({
                quantity: prev - 1,
                supplyId: supply.id
              })

              return prev - 1
            })
            adjust(index, productIndex, '-')
          }}
        >
          <SignoMenos style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={() => {
            adjust(index, productIndex, '+')
          }}
        >
          <SignoMas style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
