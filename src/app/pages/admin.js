import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { routerStore } from '../../../stores/router'
import Footer from '../components/admin/footer'

export default function Admin () {
  const nav = routerStore(state => state.nav)

  const sections = [
    {
      id: 1,
      name: 'REPORTE DE VENTAS',
      route: 'reporteVentas'
    },
    {
      id: 2,
      name: 'REPORTE DE VENTA DE PRODUCTOS',
      route: 'reporteVentaProductos'
    },
    {
      id: 3,
      name: 'RENDIMIENTO DE MESERO',
      route: 'rendimientoMesero'
    },
    {
      id: 4,
      name: 'EMPLEADOS',
      route: 'empleados'
    },
    {
      id: 5,
      name: 'INSUMOS',
      route: 'insumos'
    },
    {
      id: 6,
      name: 'PRODUCTOS',
      route: 'categoriaProductos'
    },
    {
      id: 7,
      name: 'ACTUALIZAR STOCK',
      route: 'actualizarStock'
    },
    {
      id: 8,
      name: 'ALMACENES',
      route: 'almacenes'
    }
  ]

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>PANEL ADMINISTRATIVO</Text>
      </View>
      <FlatList
        data={sections}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center', columnGap: 20, paddingHorizontal: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.product} onPress={() => nav(item?.route)}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  product: {
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20

  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: '#462f27',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})
