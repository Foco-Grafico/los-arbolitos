import { StyleSheet, Text, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'

export default function NuevoInsumo () {
  return (
    <View style={styles.main}>
      <HeaderAdmin>
        NUEVO INSUMO
      </HeaderAdmin>
      <View style={styles.container}>
        <Text style={styles.text}>
          NOMBRE DEL INSUMO
        </Text>
        <View>
          <Text>
            oli
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          CATEGORÍA
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          UNIDAD DE COMPRA
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          UNIDAD DE VENTA
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          ¿CUÁNTAS UNIDADES DE VENTA EQUIVALE A LA UNIDAD DE COMPRA?
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          STOCK (EN UNIDAD DE COMPRA)
        </Text>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
