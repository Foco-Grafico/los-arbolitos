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
          padding: 80
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
                      onChangeText={(text) => {

                      }}
                      placeholder='BUSCAR'
                      placeholderTextColor='#005943'
                    />

                    <SignoMas style={{ width: 24, height: 24 }} />
                  </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
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
                    id: supply.id,
                    quantity: supply.quantity
                  }))

                  return modifyDish(data.orderId, product.id, supplies, product.priority)
                })

                await Promise.all(promiseArray)

                editProducts(data.orderId)
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

  // const { isDishSelected, setIsDishSelected, selectedProducts, addSupplyToProduct, table, editPriority } = orderStore((state) => ({
  //   isDishSelected: state.isDishSelected,
  //   setIsDishSelected: state.setIsDishSelected,
  //   selectedProducts: state.selectedProducts,
  //   addSupplyToProduct: state.addSupplyToProduct,
  //   table: state.table,
  //   editPriority: state.editPriority
  // }))
  // const [query, setQuery] = useState(null)
  // const { supplies, setView } = useGetSupplies({ q: query })

  // console.log(selectedProducts)

  // const toggleModificarPlatillo = () => {
  //   setIsDishSelected(false)

  // if (!Array.isArray(selectedProducts)) {
  //   const supplies = selectedProducts.supplies.map(supply => ({
  //     id: supply.id,
  //     quantity: supply.quantity
  //   }))

  //   addDishToOrder({
  //     dishId: selectedProducts.id,
  //     orderId: table?.order?.id,
  //     supplies
  //   })

  //   return
  // }
  //   for (const product of selectedProducts) {
  //     const supplies = product.supplies.map(supply => ({
  //       id: supply.id,
  //       quantity: supply.quantity
  //     }))

  //     console.log(supplies)

  //     modifyDish(table?.order?.id, product.id, supplies, product.priority)
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   }
  // }

  // const debouncedSetQ = debounce(setQuery, 400)

  //   if (isDishSelected) {
  //     return (
  //       <View
  //         style={{
  //           position: 'absolute',
  //           width: '100%',
  //           height: '100%'
  //         }}
  //       >

  //         <View style={styles.modal}>
  //           <View style={styles.modalEditProduct}>
  //             <ScrollView
  //               onScroll={() => {
  //                 setView(false)
  //               }}
  //               contentContainerStyle={{ }}
  //             >
  //               {
  //                 selectedProducts.map((item, i) => (
  //                   <Product
  //                     setPriority={editPriority}
  //                     addSupplyToProduct={addSupplyToProduct}
  //                     suppliesSetView={setView} setQ={debouncedSetQ}
  //                     supplies={supplies}
  //                     key={item.key}
  //                     product={item}
  //                     index={i}
  //                   />
  //                 ))
  // }
  //             </ScrollView>
  //             <TouchableOpacity
  //               onPress={toggleModificarPlatillo}
  //             >
  //               <Aceptar style={{ width: 24, height: 24 }} />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     )
  //   }
  // }

  // const Product = ({ product, index, setQ, supplies, suppliesSetView, addSupplyToProduct, setPriority }) => {
  //   return (
  //     <View style={styles.modalObject}>
  //       <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
  //         <View style={{ flexDirection: 'row', gap: 5 }}>
  //           <Text style={{ backgroundColor: '#005943', color: '#fff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 2, fontWeight: 'bold', fontSize: 15 }}>
  //             {product.name}
  //           </Text>
  //           <Eliminar style={{ width: 24, height: 24 }} />
  //         </View>
  //         <View style={{ flexDirection: 'row', paddingHorizontal: 20, position: 'relative' }}>
  //           <TextInput
  //             onChangeText={(text) => {
  //               suppliesSetView(true)
  //               setQ(text)
  //             }}
  //             placeholder='BUSCAR'
  //             placeholderTextColor='#005943'
  //             style={styles.buscador}
  //           />
  //           {supplies.length > 0 && (
  //             <View style={{
  //               position: 'absolute',
  //               top: '105%',
  //               width: '100%',
  //               left: 20,
  //               maxHeight: 110,
  //               backgroundColor: '#8d89898a',
  //               borderRadius: 5,
  //               gap: 5,
  //               paddingVertical: 5,
  //               overflow: 'hidden'
  //             }}
  //             >
  //               {supplies.map((supply, i) => {
  //                 return (
  //                   <TouchableOpacity
  //                     onPress={() => {
  //                       const newSupply = {
  //                         extra_cost: 0,
  //                         id: supply.id,
  //                         key: `${supply.key + i}`,
  //                         name: supply.name,
  //                         quantity: 1
  //                       }

  //                       addSupplyToProduct(newSupply, index)
  //                       suppliesSetView(false)
  //                     }}
  //                     style={{ width: '100%', paddingHorizontal: 10 }} key={supply.key}
  //                   >
  //                     {supply != null
  //                       ? (
  //                         <Text style={{
  //                           fontSize: 15,
  //                           fontWeight: 'bold'
  //                         }}
  //                         >
  //                           {supply?.name}
  //                         </Text>
  //                         )
  //                       : null}
  //                   </TouchableOpacity>
  //                 )
  //               })}
  //               {supplies?.name}
  //             </View>
  //           )}
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
  //         {product.supplies.map((supply, i) => <Supply key={supply.key} supply={supply} productIndex={index} index={i} />)}
  //       </View>
  //       <View style={styles.textinput}>
  //         <TextInput style={styles.modalText} placeholderTextColor='#005943' placeholder='Observaciones' />
  //       </View>

  //       <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
  //         <Text style={styles.modalText}>
  //           PLATILLO PRIORITARIO
  //         </Text>
  //         <SwitchSlider
  //           defaultValue={product?.priority}
  //           onPress={(value) => {
  //             setPriority(value, index)
  //           }}
  //         />
  //       </View>
  //       <View style={{ backgroundColor: '#005943', width: '90%', height: 5, alignContent: 'center' }} />
  //     </View>
  //   )
  // }

  // const Supply = ({ supply, index, productIndex }) => {
  //   const { incrementSupplyQuantity, decrementSupplyQuantity } = orderStore((state) => ({
  //     incrementSupplyQuantity: state.incrementSupplyQuantity,
  //     decrementSupplyQuantity: state.decrementSupplyQuantity
  //   }))

  //   return (
  //     <View style={{ width: 250, marginBottom: 5, flexDirection: 'row', gap: 20 }}>
  //       <Text style={{ width: 100, color: '#005943', fontSize: 15, fontWeight: 'bold' }}>
  //         {supply?.name}
  //       </Text>
  //       <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             decrementSupplyQuantity(index, productIndex)
  //           }}
  //         >
  //           <SignoMenos style={{ width: 24, height: 24 }} />
  //         </TouchableOpacity>
  //         <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
  //           {supply?.quantity}
  //         </Text>
  //         <TouchableOpacity
  //           onPress={() => {
  //             incrementSupplyQuantity(index, productIndex)
  //           }}
  //         >
  //           <SignoMas style={{ width: 24, height: 24 }} />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   )
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

// const styles = StyleSheet.create({
//   modal: {
// backgroundColor: '#377c6a90',
// flexDirection: 'column',
// textAlign: 'center',
// gap: 10,
// height: '100%',
// width: '100%',
// justifyContent: 'center',
// alignItems: 'center',
// padding: 10
//   },
//   buscador: {
//     borderWidth: 1,
//     width: 250,
//     height: 40,
//     borderRadius: 10,
//     color: '#000',
//     paddingHorizontal: 10
//   },
//   modalForm: {
//     backgroundColor: '#fff',
//     width: 540,
//     height: 100,
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     gap: 20
//   },
//   modalText: {
//     color: '#005943',
//     fontSize: 15,
//     fontWeight: 'bold'
//   },
//   modalEditProduct: {
//     backgroundColor: '#fff',
//     width: '100%',
//     height: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     gap: 20
//   },
//   modalObject: {
//     flexDirection: 'column',
//     gap: 15,
//     width: 500,
//     alignItems: 'center',
//     paddingVertical: 20
//   },
//   observaciones: {
//     color: '#005943',
//     fontSize: 15,
//     fontWeight: 'bold'
//   },
//   textinput: {
//     borderRadius: 10,
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     width: 500,
//     height: 150
//   }
// })
