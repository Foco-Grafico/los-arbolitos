import { StyleSheet, Text, View } from 'react-native'
import { kitchenStore } from '../../../../stores/kitchen'

export default function NavBarKitchen () {
  const mesero = kitchenStore(state => state.mesero)
  const table = kitchenStore(state => state.table)

  return (
    <View style={styles.bar}>
      {mesero.name != null && <Text style={styles.text}>MESERO: {mesero?.name.toUpperCase()} {mesero?.lastName.toUpperCase()}</Text>}
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
    paddingVertical: 5
  },
  circle: {
    width: 40,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  circleText: {
    color: '#005942',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  barright: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  }
})
