import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import SwitchSlider from '../../components/switch-slider'
import { Cancelar } from '../../../../assets/cancelar'
import Aceptar from '../../../../assets/aceptar'
import BuyUnitSelector from '../../components/admin/buyUnitSelector'
import SupplyCategorySelector from '../../components/admin/supplyCategorySelector'

export default function NuevoInsumo () {
  const handleChangeMinimo = (value) => {
    console.log(value)
  }

  const handleChangeActual = (value) => {
    console.log(value)
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
        <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingHorizontal: 10 }} />
        <Text style={styles.text}>
          CATEGORÍA
        </Text>
        <SupplyCategorySelector />
        <Text style={styles.text}>
          UNIDAD DE COMPRA
        </Text>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <BuyUnitSelector />
          <TextInput style={{ borderWidth: 1, width: '30%', borderBottomRightRadius: 10, borderTopRightRadius: 10, height: 50, paddingHorizontal: 10 }} placeholder='$' placeholderTextColor='#000' />
        </View>
        <Text style={styles.text}>
          UNIDAD DE VENTA
        </Text>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <BuyUnitSelector />
          <TextInput style={{ borderWidth: 1, width: '30%', borderBottomRightRadius: 10, borderTopRightRadius: 10, height: 50, paddingHorizontal: 10 }} placeholder='$' placeholderTextColor='#000' />
        </View>
        <Text style={styles.text}>
          ¿CUÁNTAS UNIDADES DE VENTA EQUIVALE A LA UNIDAD DE COMPRA?
        </Text>
        <TextInput style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingHorizontal: 10 }} />
        <Text style={styles.text}>
          STOCK (EN UNIDAD DE COMPRA)
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput style={{ borderWidth: 1, width: '40%', height: 40, paddingHorizontal: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} placeholder='MÍNIMO' placeholderTextColor='#000' onChangeText={handleChangeMinimo} />
          <TextInput style={{ borderWidth: 1, width: '40%', height: 40, paddingHorizontal: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10 }} placeholder='ACTUAL' placeholderTextColor='#000' onChangeText={handleChangeActual} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', alignSelf: 'flex-end', paddingRight: 60, height: 40 }}>
          <Text>DESHABILITAR / HABILITAR</Text>
          <SwitchSlider />
        </View>
        <View style={{ flexDirection: 'row', gap: 40, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity>
            <Cancelar style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity>
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
