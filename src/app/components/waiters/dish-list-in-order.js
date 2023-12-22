import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { orderStore } from '../../../../stores/waiter'

import SignoMenos from '../../../../assets/signodemenos'
import { removeDishFromOrder } from '../../func/remove-dish-from-order'

export default function DishListInOrder () {
  const table = orderStore((state) => state.table)
  const selectProduct = orderStore((state) => state.selectProduct)

  console.log(JSON.stringify(table?.order))

  const handleRemoveItem = (dishId) => () => {
    removeDishFromOrder({ orderId: table?.order?.id, orderDishId: dishId })
  }

  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, flexDirection: 'column', gap: 10 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 35, gap: 5 }}>
        {table?.order?.dishes.map((dish) => {
          return (
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '90%' }} key={dish.key}>
              <TouchableOpacity
                style={{ gap: 20, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '95%' }}
                onPress={() => selectProduct(dish.name)}
              >
                <Text style={styles.text2}>
                  {dish?.quantity}
                </Text>
                <Text style={styles.text2}>
                  {dish?.name}
                </Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity style={{ width: 24, height: 24 }} onPress={handleRemoveItem(dish.id)}>
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
