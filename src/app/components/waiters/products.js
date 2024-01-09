import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import EditProducts from './edit-product-modal/edit-products'
import useGetCategories from '../../hooks/useGetCategories'
import { useEffect, useState } from 'react'
import useWaiterGetProductsInCategory from '../../hooks/getProductsinCategory'
import { tableStore } from '../../../../stores/waiter'
import { SendCommandModal } from './send-command-modal'
import { SendToCashModal } from './send-to-cash-modal'
import { DishList } from './dish-list'

export const Products = ({ isVisibleSendCommand, sendToCash, editProductController }) => {
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
        <DishList editProductController={editProductController} dishes={dishes} />
      </View>
      <Footer
        onPressInCat={(category) => {
          setCategory(category?.id)
        }}
      />
      <EditProducts editProductController={editProductController} />
      <SendCommandModal visibleController={isVisibleSendCommand} orderId={order.id} />
      <SendToCashModal visibleController={sendToCash} orderId={order.id} />
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
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 20
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
      </ScrollView>
    </View>
  )
}
