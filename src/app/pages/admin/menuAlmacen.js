import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'
import Footer from '../../components/admin/footer'
import SignoMas from '../../../../assets/signodemas'

export default function AlmacenInv () {
  return (
    <View>
      <Header>
        <Text>ALMACEN DE INVENTARIOS</Text>
      </Header>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text>COCINA</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>BODEGA 1</Text>
        </TouchableOpacity>
        <View style={{ borderRadius: 20, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
          <SignoMas />
        </View>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }

})
