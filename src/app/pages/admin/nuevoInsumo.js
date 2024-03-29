import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import SwitchSlider from '../../components/switch-slider'
import { Cancelar } from '../../../../assets/cancelar'
import Aceptar from '../../../../assets/aceptar'
import BuyUnitSelector from '../../components/admin/buyUnitSelector'
import SupplyCategorySelector from '../../components/admin/supplyCategorySelector'
import { useState } from 'react'
import SellUnitSelector from '../../components/admin/sellUnitSelector'
import { routerStore } from '../../../../stores/router'
import { supplyCatStore } from '../../../../stores/admin'
import createSupply from '../../func/create-supply'

export default function NuevoInsumo () {
  const nav = routerStore(state => state.nav)
  const [name, setName] = useState()
  const selectedCategory = supplyCatStore(state => state.selectedSupplyCategory)
  const [category, setCategory] = useState(selectedCategory)
  const [buyUnit, setBuyUnit] = useState()
  const [sellUnit, setSellUnit] = useState()
  const [sellXBuy, setSellXBuy] = useState()
  const [buyValue, setBuyValue] = useState()
  const [sellValue, setSellValue] = useState()
  const [minQuantity, setMinQuantity] = useState()
  const [actualQuantity, setActualQuantity] = useState()

  // console.log(name, category.id, buyUnit, sellUnit, sellXBuy, buyValue.id, sellValue.id, minQuantity, actualQuantity)

  const reset = () => {
    setName('')
    setBuyUnit('')
    setSellUnit('')
    setSellXBuy('')
    setMinQuantity('')
    setActualQuantity('')
  }

  const handleCreateSupply = () => {
    createSupply(1, minQuantity, actualQuantity,
      name,
      sellValue?.id,
      buyValue?.id,
      sellUnit,
      buyUnit,
      category?.id,
      sellXBuy,
      minQuantity,
      actualQuantity
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    ToastAndroid.show('Insumo creado', ToastAndroid.SHORT)
    reset()
  }

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        NUEVO INSUMO
      </HeaderAdmin>
      <View style={styles.container}>

        <Text style={styles.text}>
          NOMBRE DEL INSUMO
        </Text>
        <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingHorizontal: 10 }} onChangeText={setName} value={name} />

        <Text style={styles.text}>
          CATEGORÍA
        </Text>
        <SupplyCategorySelector category={setCategory} />

        <Text style={styles.text}>
          UNIDAD DE COMPRA
        </Text>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <BuyUnitSelector onChange={setBuyValue} />
          <TextInput style={{ borderWidth: 1, width: '30%', borderBottomRightRadius: 10, borderTopRightRadius: 10, height: 50, paddingHorizontal: 10 }} placeholder='$' placeholderTextColor='#000' onChangeText={setBuyUnit} keyboardType='numeric' value={buyUnit} />
        </View>

        <Text style={styles.text}>
          UNIDAD DE VENTA
        </Text>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <SellUnitSelector onChange={setSellValue} />
          <TextInput style={{ borderWidth: 1, width: '30%', borderBottomRightRadius: 10, borderTopRightRadius: 10, height: 50, paddingHorizontal: 10 }} placeholder='$' placeholderTextColor='#000' onChangeText={setSellUnit} keyboardType='numeric' value={sellUnit} />
        </View>

        <Text style={styles.text}>
          ¿CUÁNTAS UNIDADES DE VENTA EQUIVALE A LA UNIDAD DE COMPRA?
        </Text>
        <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingHorizontal: 10 }} keyboardType='numeric' onChangeText={setSellXBuy} value={sellXBuy} />

        <Text style={styles.text}>
          STOCK (EN UNIDAD DE COMPRA)
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput style={{ borderWidth: 1, width: '40%', height: 40, paddingHorizontal: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} placeholder='MÍNIMO' placeholderTextColor='#000' onChangeText={setMinQuantity} keyboardType='numeric' value={minQuantity} />
          <TextInput style={{ borderWidth: 1, width: '40%', height: 40, paddingHorizontal: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} placeholder='ACTUAL' placeholderTextColor='#000' onChangeText={setActualQuantity} keyboardType='numeric' value={actualQuantity} />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', alignSelf: 'flex-end', paddingRight: 60, height: 40 }}>
          <Text>DESHABILITAR / HABILITAR</Text>
          <SwitchSlider />
        </View>
        <View style={{ flexDirection: 'row', gap: 40, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => nav('insumosList')}>
            <Cancelar style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateSupply}>
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
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    marginTop: 30
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center'
  }
})
