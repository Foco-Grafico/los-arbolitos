// import { Image } from 'expo-image'
import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'
import Aceptar from '../../../../assets/aceptar'

export default function ActualDish ({ dish }) {
  return (
    <View style={styles.product}>
      {/* <Image source={item.picture.startsWith('http') ? item.picture : `${API_URL}/${item.picture}`} style={styles.img} /> */}
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../../../../assets/splash.png')} style={styles.img} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.text}>{dish.name}</Text>
          <Text> {dish.description} </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Cantidad ({dish.quantity})</Text>
        </View>
      </View>
      <View style={styles.observations}>
        <Text style={{ color: '#005943', fontWeight: 'black', fontSize: 12 }}>OBSERVACIONES</Text>
        <Text style={styles.text}>{dish.observations}</Text>
      </View>
      <Aceptar style={{ width: 24, height: 24 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontSize: 15,
    marginRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  product: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 10,
    gap: 10,
    flex: 1
  },
  observations: {
    borderWidth: 1,
    width: '100%',
    height: 100,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  img: {
    width: 100,
    height: 100
  }
})
