import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import useGetCategories from '../../hooks/useGetCategories'
import { useState } from 'react'
import HeaderAdmin from '../../components/admin/header'
import Editar from '../../../../assets/editar'
import Footer from '../../components/admin/footer'
import SignoMas from '../../../../assets/signodemas'
import updateCategories from '../../func/update-categories'
import CreateCategory from '../../func/create-category'
import { routerStore } from '../../../../stores/router'
import { productCatStore } from '../../../../stores/waiter'

export default function CategoriaProductos () {
  const setSelectedCategory = productCatStore(state => state.setSelectedCategory)

  const [selectedInfo, setInfo] = useState({
    name: '',
    id: '',
    index: 0
  })

  const { categories, editLocalCatName, newCategory } = useGetCategories()
  const [modal, setModal] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCat, setNewCat] = useState('')
  const [modalCreate, setModalCreate] = useState(false)
  const nav = routerStore(state => state.nav)

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        <Text>Categoria de productos</Text>
      </HeaderAdmin>
      <FlatList
        numColumns={2}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: 'center', gap: 20 }}
        renderItem={({ item, index }) => (
          <View
            key={item.key} style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}
          >
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                nav('productos')
                setSelectedCategory({
                  name: item?.name,
                  id: item?.id,
                  index
                })
              }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>{item?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', right: 7, top: 50 }}
              onPress={() => {
                setInfo({
                  name: item?.name,
                  id: item?.id,
                  index
                })
                setModal(true)
              }}
            >
              <Editar style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={{ alignItems: 'flex-end', paddingHorizontal: 20 }}
        onPress={() => { setModalCreate(true) }}
      >
        <SignoMas style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
      <Modal
        statusBarTranslucent
        transparent
        animationType='fade'
        visible={modal}
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
              ¿Deseas actualizar la categoría?
            </Text>
            <TextInput style={{ width: 250, borderWidth: 1, paddingHorizontal: 10 }} autoFocus onChangeText={setNewCatName} placeholder={selectedInfo.name} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (newCatName === '') {
                    ToastAndroid.show('No se puede actualizar con un campo vacio', ToastAndroid.SHORT)
                    return
                  }
                  setModal(false)
                  editLocalCatName(newCatName, selectedInfo.index)

                  updateCategories(newCatName, selectedInfo.id)
                    .catch(() => {
                      ToastAndroid.show(`No se pudo actualizar la categoría ${selectedInfo.name}`, ToastAndroid.SHORT)
                      editLocalCatName(selectedInfo.name, selectedInfo.index)
                    })
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
                  setModal(false)
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
        visible={modalCreate}
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
              ¿Deseas crear la categoría?
            </Text>
            <TextInput style={{ width: 250, borderWidth: 1, paddingHorizontal: 10 }} autoFocus onChangeText={setNewCat} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (newCat === '') {
                    ToastAndroid.show('No se puede actualizar con un campo vacio', ToastAndroid.SHORT)
                    return
                  }
                  newCategory(newCat)
                  CreateCategory(newCat)
                  setModalCreate(false)
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
                  setModalCreate(false)
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
  container: {
    height: 90,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  main: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    gap: 10
  }
})
