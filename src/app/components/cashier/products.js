import { Pressable, StyleSheet, Text, View } from 'react-native'
import { removeDishFromOrder } from '../../func/remove-dish-from-order'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default function CashierProducts ({ table, setSelectedTable }) {
  const handleDeleteProduct = (productId, productIndex) => {
    removeDishFromOrder({
      orderDishId: productId,
      orderId: table?.id
    })

    setSelectedTable(table => {
      const newTotal = table.total - (table.pretty_list[productIndex].price * table.pretty_list[productIndex].quantity) - Object.keys(table.pretty_list[productIndex].supplies_modified).reduce((acc, key) => {
        return acc + newTable.pretty_list[productIndex].supplies_modified[key].reduce((acc, supply) => {
          return acc + supply.extra_cost
        }, 0)
      }, 0)
      const newTable = { ...table, total: newTotal }

      newTable.pretty_list = newTable.pretty_list.filter((_, index) => index !== productIndex)
      return newTable
    })
  }

  return (
    <View style={styles.products}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textProduct}>CANT.</Text>
        <Text style={styles.textProduct}>PLATILLO</Text>
        <Text style={styles.textProduct}>COSTO</Text>
      </View>
      <View style={{ gap: 10 }}>
        {table?.pretty_list?.map((dish, index) => {
          return (
            <View key={dish?.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.textProduct}>{dish?.quantity}</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                <Text style={styles.textProduct}>{dish?.name}</Text>
                {Object.keys(dish?.supplies_modified).map(key => {
                  return dish?.supplies_modified[key].map(supply => {
                    return (
                      <View key={supply.key} style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textProduct}>({supply.quantity}) {supply.name}</Text>
                      </View>
                    )
                  })
                })}
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'flex-end', gap: 5 }}>

                <Text style={styles.textProduct}>
                  {priceFormatter.format(dish?.price * dish?.quantity)}
                </Text>

                {Object.keys(dish?.supplies_modified).map(key => {
                  return dish?.supplies_modified[key].map(supply => {
                    return (
                      <View key={supply.key} style={{ flexDirection: 'row', gap: 20 }}>
                        <Text style={styles.textProduct}>
                          {priceFormatter.format(supply.extra_cost)}
                        </Text>
                      </View>
                    )
                  })
                })}
              </View>
              <Pressable
                onPress={() => {
                  handleDeleteProduct(dish?.id, index)
                }}
              />
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  products: {
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    width: '95%',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical: 20
  },
  textProduct: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
})
