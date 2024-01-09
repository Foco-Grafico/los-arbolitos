import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { kitchenStore } from '../../../../stores/kitchen'
import { Cerrar } from '../../../../assets/cerrar'
import { routerStore } from '../../../../stores/router'

export default function NavBarKitchen () {
  const mesero = kitchenStore(state => state.mesero)
  const table = kitchenStore(state => state.table)
  const nav = routerStore(state => state.nav)

  return (
    <View style={styles.bar}>
      {mesero.name != null && <Text style={styles.text}>MESERO: {mesero?.name.toUpperCase()} {mesero?.lastName.toUpperCase()}</Text>}
      <View style={styles.barright}>
        <Text style={styles.text}>ORDEN DE LA MESA</Text>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{table}</Text>
        </View>
      </View>
      <TouchableHighlight
        onPress={() => {
          nav('login')
        }}
      >
        <Cerrar fill='#fff' style={{ width: 20, height: 20 }} />
      </TouchableHighlight>
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
    paddingVertical: 5,
    paddingHorizontal: 10
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
    justifyContent: 'center',
    gap: 10,
    flex: 1
  }
})
