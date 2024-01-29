import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import Editar from '../../../../assets/editar'
import SignoMas from '../../../../assets/signodemas'
import { useState } from 'react'
import { supplyCatStore } from '../../../../stores/admin'
import useGetSupplies from '../../hooks/getSupplies'

const formatName = (name) => {
  const canFormat = name.toLowerCase().startsWith('de') || name.toLowerCase().startsWith('del') || name.toLowerCase().startsWith('la') || name.toLowerCase().startsWith('el') || name.toLowerCase().startsWith('los') || name.toLowerCase().startsWith('las') || name.toLowerCase().startsWith('para')

  if (canFormat) {
    return name.split(' ').splice(1).join(' ').toUpperCase()
  }

  return name.toUpperCase()
}

export default function InsumosList () {
  const selectedCategory = supplyCatStore(state => state.selectedSupplyCategory)
  const [updateModal, setUpdateModal] = useState(false)
  const [updateProductName, setUpdateProductName] = useState('')
  const [createModal, setCreateModal] = useState(false)
  const [newProductName, setNewProductName] = useState('')

  const { supplies } = useGetSupplies({
    all: true,
    q: selectedCategory.name
  })

  console.log(supplies)
  return (
    <View style={styles.main}>
      <HeaderAdmin>
        <Text>PRODUCTOS DE {formatName(selectedCategory?.name)}</Text>
      </HeaderAdmin>
      <FlatList
        numColumns={2}
        data={supplies}
        keyExtractor={(supply) => supply.id.toString()}
        contentContainerStyle={{ alignItems: 'center', gap: 20 }}
        renderItem={({ supply, index }) => (
          <View
            key={supply.key} style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}
          >
            <TouchableOpacity style={styles.container}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>{supply?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', right: 7, top: 50 }}
              onPress={() => {
                // setInfo({
                //   name: item?.name,
                //   id: item?.id,
                //   index
                // })
                setUpdateModal(true)
              }}
            >
              <Editar style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View>
        <TouchableOpacity
          style={{ alignItems: 'flex-end', paddingHorizontal: 20, padding: 20 }}
          onPress={() => { setCreateModal(true) }}
        >
          <SignoMas style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
      <Modal
        statusBarTranslucent
        transparent
        animationType='fade'
        visible={createModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 20
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              elevation: 10,
              gap: 20,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20
              }}
            >
              ¿Deseas crear el producto?
            </Text>
            <TextInput style={{ width: 250, borderWidth: 1, paddingHorizontal: 10 }} autoFocus onChangeText={setNewProductName} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setCreateModal(false)
                  // Aqui se crea el producto
                }}
                style={{
                  backgroundColor: '#005943',
                  borderRadius: 10,
                  fontSize: 20,
                  elevation: 10,
                  textAlign: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Aceptar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCreateModal(false)
                }}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 10,
                  fontSize: 20,
                  elevation: 10,
                  textAlign: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        statusBarTranslucent
        transparent
        animationType='fade'
        visible={updateModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 20
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              elevation: 10,
              gap: 20,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20
              }}
            >
              ¿Deseas modificar el producto?
            </Text>
            <TextInput style={{ width: 250, borderWidth: 1, paddingHorizontal: 10 }} autoFocus onChangeText={setUpdateProductName} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setUpdateModal(false)
                  // Aqui se actualiza el producto
                }}
                style={{
                  backgroundColor: '#005943',
                  borderRadius: 10,
                  fontSize: 20,
                  elevation: 10,
                  textAlign: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Aceptar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setUpdateModal(false)
                }}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 10,
                  fontSize: 20,
                  elevation: 10,
                  textAlign: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'

  },
  container: {
    height: 90,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
