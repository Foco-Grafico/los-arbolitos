import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import useGetBoxList from '../../hooks/useGetBoxList'
import SignoMas from '../../../../assets/signodemas'
import { boxesStore } from '../../../../stores/admin'
import { routerStore } from '../../../../stores/router'
import { useState } from 'react'
import CreateBox from '../../func/create-box'

export default function Almacenes () {
  const nav = routerStore(state => state.nav)
  const { boxes } = useGetBoxList()
  const setSelectedBox = boxesStore(state => state.setSelectedBox)
  const [createModal, setCreateModal] = useState(false)
  const [newProductName, setNewProductName] = useState('')

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        ALMACENES
      </HeaderAdmin>
      <View style={styles.container}>
        {boxes?.map((box, index) => {
          return (
            <TouchableOpacity
              key={box?.id}
              style={styles.box}
              onPress={() => {
                nav('menuAlmacen')
                setSelectedBox({
                  id: box?.id,
                  name: box?.name,
                  index
                })
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                {box?.name}
              </Text>
            </TouchableOpacity>
          )
        })}
        <View />
      </View>
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 30, borderRadius: 10 }}>
        <TouchableOpacity style={{ borderRadius: 10, padding: 10 }} onPress={() => { setCreateModal(true) }}>
          <SignoMas style={{ width: 30, height: 30 }} />
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
              ¿DESEAS CREAR EL ALMACÉN?
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
                  CreateBox(newProductName)
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
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  },
  box: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    height: 50,
    width: 200,
    justifyContent: 'center',
    shadowColor: '#000'
  }
})
