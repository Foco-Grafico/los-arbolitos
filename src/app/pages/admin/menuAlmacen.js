import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Footer from '../../components/admin/footer'
import { routerStore } from '../../../../stores/router'
import HeaderAdmin from '../../components/admin/header'

export default function AlmacenInv () {
  const nav = routerStore(state => state.nav)

  return (
    <View style={{ flex: 1 }}>
      <HeaderAdmin>
        <Text>ALMACEN DE INVENTARIOS</Text>
      </HeaderAdmin>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            nav('categoriaInsumos')
          }}
          style={styles.box}
        >
          <Text style={styles.boldText}>INSUMOS</Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity
          onPress={() => {
            nav('productos')
          }}
          style={styles.box}
        >
          <Text style={styles.boldText}>PRODUCTOS</Text>
        </TouchableOpacity>
        */}
        <TouchableOpacity
          onPress={() => {
            nav('actualizarStock')
          }}
          style={styles.box}

        >
          <Text style={styles.boldText}>ACTUALIZAR STOCK</Text>
        </TouchableOpacity>

      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    width: 250,
    height: 100
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16
  }

})
