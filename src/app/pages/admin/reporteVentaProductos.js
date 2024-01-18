import { StyleSheet, Text, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'

export default function ReporteVentas () {
  return (
    <View style={styles.main}>
      <HeaderAdmin>
        REPORTE DE VENTAS
      </HeaderAdmin>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text>FECHA DE INICIO</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text>FECHA DE TÉRMINO</Text>
        </View>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  }
})
