import { TextInput, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Image } from 'expo-image'
import Footer from '../components/footer'
import { useState } from 'react'
import useWaiterGetProductsInCategory from '../hooks/getProductsinCategory'
import { API_URL } from '../../lib/api-call/data'
import { waiterStore } from '../../../stores/waiter'
import SignoMenos from '../../../assets/signodemenos'
import SwitchSlider from '../components/switch-slider'
import useWaiterGetTablesinZone from '../hooks/getTablesbyZone'
import Editar from '../../../assets/editar'
import SignoMas from '../../../assets/signodemas'
import addDishToOrder from '../func/add-dish-to-order'

export default function ShowProducts () {
  const [tableSelected, setTableSelected] = useState(null)
  const [enviarCuenta, setEnviarCuenta] = useState(false)
  const [enviarComanda, setEnviarComanda] = useState(false)
  const setSearch = waiterStore(state => state.setSearch)
  const { dishes } = useWaiterGetProductsInCategory()
  const { tables } = useWaiterGetTablesinZone()

  const addItem = (item) => {
    const orderId = tables[tableSelected].order.id
    const dishId = item.id

    const supplies = item.supplies.map((supply) => ({
      id: supply.id,
      quantity: supply.quantity
    }))

    addDishToOrder({
      dishId,
      orderId,
      supplies
    })
  }

  const toggleEnviarComanda = () => {
    setEnviarComanda(!enviarComanda)
  }

  const toggleEnviarCuenta = () => {
    setEnviarCuenta(!enviarCuenta)
  }

  return (
    <View style={styles.container}>
      <View style={styles.aside}>
        <ScrollView contentContainerStyle={{ gap: 20, padding: 5 }}>
          {tables.map((table, i) => {
            return (
              <TouchableOpacity onPress={() => { setTableSelected(i) }} style={tableSelected === i ? styles.selectedCircle : styles.circle} key={table.key}>
                <Text style={styles.text}>
                  {table.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <View style={styles.order}>
        <TouchableOpacity style={styles.buttons} onPress={toggleEnviarCuenta}>
          <Text style={styles.text2}>
            SOLICITAR CUENTA
          </Text>
        </TouchableOpacity>

        <View style={{ justifyContent: 'flex-start', height: '70%', alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, gap: 15 }}>
          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={styles.title}>
              CANT.
            </Text>
            <Text style={styles.title}>
              PRODUCTO
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, flexDirection: 'column', gap: 10 }}>
            {tableSelected != null && tables[tableSelected].order.dishes.map((dish) => {
              return (
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '100%' }} key={dish.key}>
                  <TouchableOpacity style={{ gap: 20, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', width: '95%' }}>
                    <Text style={styles.text2}>
                      {dish?.quantity}
                    </Text>
                    <Text style={styles.text2}>
                      {dish?.name}
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity style={{ width: 24, height: 24 }}>
                      <SignoMenos fill='#005942' style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </View>

        </View>

        <TouchableOpacity style={styles.buttons} onPress={toggleEnviarComanda}>
          <Text style={styles.text2}>
            ENVIAR COMANDA
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <SwitchSlider />
          <Text style={{ color: 'white' }}>COMANDA PRIORITARIA</Text>
        </View>
      </View>

      <View style={styles.productList}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignSelf: 'flex-end' }}>
          <TextInput placeholder='BUSCAR' style={styles.buscador} onChangeText={setSearch} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 5 }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 10, gap: 15 }}
            data={dishes}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.products}>
                <TouchableOpacity style={styles.img}>
                  <Image source={item.picture.startsWith('http') ? item.picture : `${API_URL}/${item.picture}`} style={styles.img} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', gap: 5, width: 130, height: 100, justifyContent: 'space-between' }}>
                  <Text style={styles.text}>
                    {item.name}
                  </Text>
                  <Text style={styles.text}>
                    {item.description}
                  </Text>
                  <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                      <TouchableOpacity>
                        <Editar fill='#005942' style={{ width: 24, height: 24 }} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => addItem(item)}>
                        <SignoMas fill='#005942' style={{ width: 24, height: 24 }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />

        </View>
        <Footer />
        {enviarCuenta && (
          <View
            animationType='slide'
            transparent
            style={{
              display: enviarCuenta ? 'flex' : 'none',
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modalForm}>
                <Text style={styles.modalText}>
                  ESTAS SEGURO QUE DESEAS ENVIAR LA CUENTA A CAJA?
                </Text>
                <TouchableOpacity
                  onPress={toggleEnviarCuenta}
                >
                  <Text>
                    SI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {enviarComanda && (
          <View
            animationType='slide'
            transparent
            style={{
              display: enviarComanda ? 'flex' : 'none',
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modalForm}>
                <Text style={styles.modalText}>
                  ESTAS SEGURO QUE DESEAS ENVIAR LA COMANDA A COCINA?
                </Text>
                <TouchableOpacity
                  onPress={toggleEnviarComanda}
                >
                  <Text>
                    SI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
  selectedCircle: {
    borderRadius: 100,
    backgroundColor: '#fff',
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
  title: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  text2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
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
    gap: 10,
    position: 'relative'
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
    borderRadius: 10,
    fontSize: 20,
    color: '#000000',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    textAlign: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40
  },
  modal: {
    backgroundColor: '#377c6a90',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 10,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold'
  },
  modalForm: {
    backgroundColor: '#fff',
    width: 540,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  }
})
