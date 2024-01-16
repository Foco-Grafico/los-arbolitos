import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import SwitchSlider from '../../components/switch-slider'
import { Cancelar } from '../../../../assets/cancelar'
import Aceptar from '../../../../assets/aceptar'
import RoleSelector from '../../components/admin/roleSelector'

export default function CreateEmployee () {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      .catch((err) => {
        console.log(err)
      })

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <View style={styles.main}>
      <HeaderAdmin>CREAR EMPLEADO</HeaderAdmin>
      <View style={styles.container}>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 150 }}>
            <Text>NOMBRE</Text>
            <Text>APELLIDO</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput style={{ borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} />
            <TextInput style={{ borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} />
          </View>
        </View>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 150 }}>
            <Text>USUARIO</Text>
            <Text>CONTRASEÑA</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput style={{ borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} />
            <TextInput style={{ borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} />
          </View>
        </View>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10, width: '80%' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text>TELÉFONO</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput style={{ borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '100%', height: 50, paddingLeft: 10 }} />
          </View>
        </View>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 150 }}>
            <Text>PUESTO</Text>
            <Text>SALARIO</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <RoleSelector />
            <TextInput style={{ borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '30%', height: 50, paddingLeft: 10 }} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text>DESHABILITAR / HABILITAR</Text>
          <SwitchSlider />
        </View>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
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
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20
  }
})
