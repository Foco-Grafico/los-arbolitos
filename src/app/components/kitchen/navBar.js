import { StyleSheet, Text, View } from 'react-native'
import { kitchenStore } from '../../../../stores/kitchen'

export default function NavBarKitchen () {
  const mesero = kitchenStore(state => state.mesero)
  const table = kitchenStore(state => state.table)

  return (
    <View style={styles.bar}>
      <Text style={styles.text}>MESERO: {mesero?.name.toUpperCase()} {mesero?.lastName.toUpperCase()}</Text>
      <View style={styles.barright}>
        <Text style={styles.text}>ORDEN DE LA MESA</Text>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{table}</Text>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#005942',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  circleText: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#005942',
    fontSize: 50
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  barright: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
