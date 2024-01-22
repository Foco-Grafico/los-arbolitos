import { StyleSheet, View } from 'react-native'
import { routerStore } from '../../../../stores/router'
import { Cerrar } from '../../../../assets/cerrar'
import Regresar from '../../../../assets/regresar'
import { boxesStore } from '../../../../stores/admin'

export default function Footer () {
  const nav = routerStore(state => state.nav)
  const setSelectedBox = boxesStore(state => state.setSelectedBox)
  return (
    <View style={styles.footer}>
      <Cerrar fill='white' style={{ width: 25, height: 25, margin: 10 }} onPress={() => nav('login')} />
      <Regresar
        fill='white' style={{ width: 25, height: 25, margin: 10 }} onPress={() => {
          nav('admin')
          setSelectedBox(0)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#462f27',
    height: '6%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
