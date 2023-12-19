import { TextInput, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Image } from 'expo-image'
import Counters from '../components/counters'
import Footer from '../components/footer'

const tables = [
  { id: 1, name: 'M1', status: 'ocupada' },
  { id: 2, name: 'M2', status: 'ocupada' },
  { id: 3, name: 'M3', status: 'ocupada' },
  { id: 4, name: 'M4', status: 'ocupada' },
  { id: 5, name: 'M5', status: 'ocupada' },
  { id: 6, name: 'M6', status: 'ocupada' }
]

const products = [
  { id: 1, name: 'CHILAQUILES VERDES', status: 'ocupada', description: 'Chilaquiles verdes con pollo' },
  { id: 2, name: 'CHILAQUILES ROJOS', status: 'ocupada', description: 'Chilaquiles rojos con pollo' },
  { id: 3, name: 'MACHACA', status: 'ocupada', description: 'Machaca con huevo' },
  { id: 4, name: 'MENUDO', status: 'ocupada', description: 'Menudo con tortillas' },
  { id: 5, name: 'HUEVOS RANCHEROS', status: 'ocupada', description: 'Huevos rancheros con frijoles' },
  { id: 6, name: 'WAFFLES', status: 'ocupada', description: 'Waffles con miel' },
  { id: 7, name: 'HUEVOS CON JAMON', status: 'ocupada', description: 'Huevos con jamon' },
  { id: 8, name: 'HUEVOS CON CHORIZO', status: 'ocupada', description: 'Huevos con chorizo' },
  { id: 9, name: 'HUEVOS CON SALCHICHA', status: 'ocupada', description: 'Huevos con salchicha' },
  { id: 10, name: 'HUEVOS CON TOCINO', status: 'ocupada', description: 'Huevos con tocino' }
]

export default function ShowProducts () {
  return (
    <View style={styles.container}>
      <View style={styles.aside}>
        <ScrollView contentContainerStyle={{ gap: 20, padding: 5 }}>
          {tables.map((table) => {
            return (
              <TouchableOpacity style={styles.circle} key={table.name + 1}>
                <Text style={styles.text}>
                  {table.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.order}>
        <Text>Lista de productos</Text>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.text2}>
            SOLICITAR CUENTA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.text2}>
            ENVIAR COMANDA
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productList}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignSelf: 'flex-end' }}>
          <TextInput placeholder='BUSCAR' style={styles.buscador} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 5 }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 10, gap: 15 }}
            data={products}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.products}>
                <TouchableOpacity style={styles.img}>
                  <Image source={require('../../../assets/rest.jpg')} style={styles.img} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', gap: 5, width: 130, height: 100, justifyContent: 'space-between' }}>
                  <Text style={styles.text}>
                    {item.name}
                  </Text>
                  <Text style={styles.text}>
                    {item.description}
                  </Text>
                  <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                    <Counters />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <Footer />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%'
  },
  circle: {
    borderRadius: 100,
    backgroundColor: '#fe8c00',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40

  },
  aside: {
    backgroundColor: '#005943',
    width: 70,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  text: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold'
  },
  text2: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  order: {
    backgroundColor: '#b89c98',
    width: 300,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  productList: {
    backgroundColor: '#fff',
    height: '100%',
    width: 630,
    flexDirection: 'column',
    textAlign: 'center',
    gap: 10
  },
  products: {
    flexDirection: 'row',
    width: 330,
    height: 100,
    gap: 10
  },
  buscador: {
    borderWidth: 1,
    width: 250,
    height: 40,
    borderRadius: 10,
    color: '#000',
    paddingHorizontal: 10
  },
  img: {
    width: 100,
    height: 100
  },
  buttons: {
    backgroundColor: '#005943',
    borderRadius: 100,
    fontSize: 20,
    color: '#000000',
    borderWidth: 1,
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    textAlign: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40
  }
})
