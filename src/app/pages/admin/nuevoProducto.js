import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import SwitchSlider from '../../components/switch-slider'
import { Cancelar } from '../../../../assets/cancelar'
import Aceptar from '../../../../assets/aceptar'
import { routerStore } from '../../../../stores/router'
import { useState } from 'react'
import SignoMas from '../../../../assets/signodemas'
import { Counter } from '../../components/waiters/edit-product-modal/components/counter'
import ProductCategorySelector from '../../components/admin/productCategorySelect'

export default function NuevoProducto () {
  const nav = routerStore(state => state.nav)
  const [category, setCategory] = useState()
  const [sellValue, setSellValue] = useState()
  const [sellCost, setSellCost] = useState()
  const [prepTime, setPrepTime] = useState()
  const [name, setName] = useState()

  const handleCreateProduct = () => {
    console.log(category, sellValue, name, sellCost, prepTime)
  }

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        NUEVO PRODUCTO
      </HeaderAdmin>
      <View style={styles.container}>
        <Text style={styles.text}>
          NOMBRE DEL PRODUCTO
        </Text>
        <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingHorizontal: 10 }} onChangeText={setName} />

        <Text style={styles.text}>
          CATEGORÍA
        </Text>
        <ProductCategorySelector category={setCategory} />

        <Text style={styles.text}>
          COSTO DE VENTA
        </Text>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 50, paddingHorizontal: 10 }} placeholder='$' placeholderTextColor='#000' onChangeText={setSellCost} keyboardType='numeric' />
        </View>

        <Text style={styles.text}>
          TIEMPO DE PREPARACIÓN (MINUTOS)
        </Text>
        <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingHorizontal: 10 }} keyboardType='numeric' onChangeText={setPrepTime} />
        <Text style={styles.text}>
          INGREDIENTES
        </Text>
        <View style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 250, flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
            <Text style={{ fontSize: 18 }}>INGREDIENTE 1</Text>
            <Counter />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, flex: 1, width: '100%', height: 25 }}>
            <TextInput style={{ borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, flex: 1 }} placeholderTextColor='#e5e5e5' />
            <SignoMas style={{ width: 25, height: 25 }} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', alignSelf: 'flex-end', paddingRight: 60, height: 40 }}>
          <Text>DESHABILITAR / HABILITAR</Text>
          <SwitchSlider />
        </View>
        <View style={{ flexDirection: 'row', gap: 40, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => nav('insumosList')}>
            <Cancelar style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateProduct}>
            <Aceptar style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
