import { StyleSheet, View } from 'react-native'
import { routerStore } from '../../../../stores/router'
import { Cerrar } from '../../../../assets/cerrar'
import Regresar from '../../../../assets/regresar'
import { boxesStore } from '../../../../stores/admin'
import { accountStore } from '../../../../stores/account'
import { routes } from '../../../lib/data'

export default function Footer({ user = 'admin' }) {
  const nav = routerStore(state => state.nav)
  const setSelectedBox = boxesStore(state => state.setSelectedBox)
  const account = accountStore(state => state.account)
  
  return (
    <View style={styles.footer}>
      <Cerrar fill='white' style={{ width: 25, height: 25, margin: 10 }} onPress={() => nav('login')} />
      <Regresar
        fill='white' style={{ width: 25, height: 25, margin: 10 }} onPress={() => {
          nav(routes[account.type.id])
          setSelectedBox(0)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#462f27',
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
