import { StyleSheet, Text, View } from 'react-native'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default function CashierProducts ({ table }) {
  console.log(JSON.stringify(table))
  return (
    <View style={styles.products}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textProduct}>CANT.</Text>
        <Text style={styles.textProduct}>PLATILLO</Text>
        <Text style={styles.textProduct}>COSTO</Text>
      </View>
      <View style={{ gap: 5 }}>
        {table?.pretty_list?.map((dish) => {
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
                <Text style={styles.textProduct}>{priceFormatter.format(dish?.price * dish?.quantity)}</Text>
                {Object.keys(dish?.supplies_modified).map(key => {
                  return dish?.supplies_modified[key].map(supply => {
                    return (
                      <View key={supply.key} style={{ flexDirection: 'row', gap: 20 }}>
                        <Text style={styles.textProduct}>{priceFormatter.format(supply.extra_cost)}</Text>
                      </View>
                    )
                  })
                })}
              </View>
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
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 50,
    height: '60%'
  },
  textProduct: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
})
