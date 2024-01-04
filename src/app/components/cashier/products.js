import { StyleSheet, Text, View } from 'react-native'

export default function CashierProducts ({ table }) {
  return (
    <View style={styles.products}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.textProduct}>CANT.</Text>
        <Text style={styles.textProduct}>PLATILLO</Text>
        <Text style={styles.textProduct}>COSTO</Text>
      </View>
      <View>
        {table?.order?.productos?.map((producto) => {
          return (
            <View key={producto?.id} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={styles.textProduct}>{producto.quantity}</Text>
              <Text style={styles.textProduct}>{producto.name}</Text>
              <Text style={styles.textProduct}>${producto.price}</Text>
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
    fontSize: 20
  }
})
