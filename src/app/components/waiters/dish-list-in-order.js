import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { orderStore } from '../../../../stores/waiter'

import SignoMenos from '../../../../assets/signodemenos'
import { removeDishFromOrder } from '../../func/remove-dish-from-order'
import { useEffect, useState } from 'react'

export default function DishListInOrder () {
  const table = orderStore((state) => state.table)
  const selectProduct = orderStore((state) => state.selectProduct)
  const isDishSelected = orderStore((state) => state.isDishSelected)
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    setDishes(() => {
      if (!table?.order?.dishes) return []

      const groupDishes = table?.order?.dishes.reduce((acc, dish) => {
        const isModified = dish.modified === 1

        const objName = isModified ? `${dish.name}M` : dish.name
        if (acc[objName]) {
          acc[objName].quantity += 1
          acc[objName].ids.push(dish.id)
        } else {
          acc[objName] = { ...dish, isModified, originalName: dish.name, name: `${isModified ? `${dish.name} (M)` : dish.name}`, quantity: 1, ids: [dish.id] }
        }
        return acc
      }, {})

      return Object.values(groupDishes)
    })
  }, [table])

  const handleRemoveItem = (dishId, i) => () => {
    removeDishFromOrder({ orderId: table?.order?.id, orderDishId: dishId })

    setDishes(prev => {
      const copyPrev = [...prev]

      const dish = copyPrev[i]
      const newDish = {
        ...dish,
        quantity: dish.quantity - 1
      }

      if (newDish.quantity === 0) {
        copyPrev.splice(i, 1)
      } else {
        copyPrev[i] = newDish
      }

      return copyPrev
    })
  }

  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, flexDirection: 'column', gap: 10 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 35, gap: 5 }}>
        {dishes.map((dish, i) => {
          return (
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '90%' }} key={dish.key}>
              <TouchableOpacity
                style={{ gap: 20, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '95%' }}
                onPress={() => selectProduct(dish.originalName, dish.isModified)}
                disabled={isDishSelected}
              >
                <Text style={styles.text2}>
                  {dish?.quantity}
                </Text>
                <Text style={styles.text2}>
                  {dish?.name}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={{ width: 24, height: 24 }} onPress={handleRemoveItem(dish.id, i)} disabled={isDishSelected}
                >
                  <SignoMenos fill='#005942' style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  text2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
