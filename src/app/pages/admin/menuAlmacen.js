import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen'
import Footer from '../../components/admin/footer'

export default function AlmacenInv () {
  return (
    <View>
      <Header>
        <Text>AlMACEN DE INVENTARIOS</Text>
      </Header>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text>COCINA</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>BODEGA 1</Text>
        </TouchableOpacity>
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
