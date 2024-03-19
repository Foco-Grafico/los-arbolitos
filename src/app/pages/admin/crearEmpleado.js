import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import SwitchSlider from '../../components/switch-slider'
import { Cancelar } from '../../../../assets/cancelar'
import Aceptar from '../../../../assets/aceptar'
import RoleSelector from '../../components/admin/roleSelector'
import { useState } from 'react'
import VerPass from '../../../../assets/verPass'
import { routerStore } from '../../../../stores/router'
import CreateUser from '../../func/createUser'
import { selectedAccountStore } from '../../../../stores/account'
import updateUsers from '../../func/updateUser'

export default function CreateEmployee () {
  const nav = routerStore(state => state.nav)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState(null)
  const [salary, setSalary] = useState('')
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState(true)
  const selectedAccount = selectedAccountStore(state => state.selectedAccount)

  console.log(role?.id, name, lastName, username, password, phone, salary, active)
  console.log(selectedAccount)

  const handleCreateUser = () => {
    CreateUser(role?.id, name, lastName, phone, username, password, salary)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    console.log('Usuario creado')
  }

  const handleUpdateUser = () => {
    updateUsers({
      active,
      id: selectedAccount?.id,
      lastname: lastName,
      name,
      password,
      phone,
      username,
      role: role?.id
    })
      .then(res => res.json())
      .then(data => console.log(JSON.stringify(data)))
      .catch(err => console.log(err))
    ToastAndroid.show('Usuario actualizado', ToastAndroid.SHORT)
    nav('empleados')
  }

  return (
    <View style={styles.main}>
      <HeaderAdmin>CREAR EMPLEADO</HeaderAdmin>
      <View style={styles.container}>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 150 }}>
            <Text style={styles.text}>NOMBRE</Text>
            <Text style={styles.text}>APELLIDO</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput style={{ borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} onChangeText={setName} placeholder={selectedAccount?.name} />
            <TextInput style={{ borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} onChangeText={setLastName} placeholder={selectedAccount?.lastname} />
          </View>
        </View>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 150 }}>
            <Text style={styles.text}>USUARIO</Text>
            <Text style={styles.text}>CONTRASEÑA</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput style={{ borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '40%', height: 50, paddingLeft: 10 }} onChangeText={setUsername} placeholder={selectedAccount?.username} />
            <View style={{ borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '40%', height: 50, paddingLeft: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
              <TextInput style={{ flex: 1 }} onChangeText={setPassword} secureTextEntry={visible} placeholder={selectedAccount?.password} />
              <VerPass style={{ width: 35, height: 35 }} onPress={() => setVisible(!visible)} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10, width: '80%' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.text}>TELÉFONO</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TextInput style={{ borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '100%', height: 50, paddingLeft: 10 }} onChangeText={setPhone} placeholder={selectedAccount?.phone} />
          </View>
        </View>
        <View style={{ flexDirection: 'columm', justifyContent: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 150 }}>
            <Text style={styles.text}>PUESTO</Text>
            <Text style={styles.text}>SALARIO</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <RoleSelector onChange={setRole} />
            <TextInput style={{ borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: '30%', height: 50, paddingLeft: 10 }} onChangeText={setSalary} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text>DESHABILITAR / HABILITAR</Text>
          <SwitchSlider onPress={setActive} />
        </View>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { nav('empleados') }}>
            <Cancelar style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { selectedAccount ? handleUpdateUser() : handleCreateUser() }}>
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
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  }
})
