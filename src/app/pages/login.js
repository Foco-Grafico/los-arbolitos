import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { routerStore } from '../../../stores/router'
import { loginDebounce } from '../../lib/api-call/auth'
import { accountStore } from '../../../stores/account'
import Logo from '../../../assets/logo.png'
import Ok from '../../../assets/ok'
import No from '../../../assets/no'
import { Image } from 'expo-image'
import { UserModel } from '../../models/user'

export default function Login () {
  const nav = routerStore(state => state.nav)
  const setAccount = accountStore(state => state.setAccount)
  const [authParams, setAuthParams] = useState({
    user: '',
    pass: ''
  })
  const [status, setStatus] = useState({
    type: 'nulo',
    message: ''
  })

  useEffect(() => {
    if (authParams.user === '' && authParams.pass === '') {
      setStatus({
        type: 'nulo',
        message: ''
      })
      return
    }

    loginDebounce(authParams.user, authParams.pass, (user, err) => {
      if (err) {
        setStatus({
          type: 'error',
          message: err.message
        })
        return
      }

      setAccount(user)
      setStatus({
        type: 'success',
        message: 'Usuario encontrado'
      })

      setTimeout(() => {
        nav('home')
      }, 200)
    })
  }, [authParams])

  console.log(status)

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '35%',
          borderWidth: 1
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <Image source={Logo} style={styles.image} contentFit='cover' />
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder='USUARIO'
            onChangeText={(text) => setAuthParams(prev => ({ ...prev, user: text }))}
            textContentType='username'
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder='CONTRASEÑA'
            secureTextEntry
            onChangeText={(text) => setAuthParams(prev => ({ ...prev, pass: text }))}
            textContentType='password'
          />
        </View>

        <Text style={{ color: 'gray' }}>CARGANDO...</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Ok style={{
            width: '100%',
            height: '100%'
          }}
          />
          <No style={{
            width: '100%',
            height: '100%'
          }}
          />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    width: '70%',
    height: '35%',
    paddingVertical: 10

  },
  image2: {
    width: '100%',
    height: '100%',
    paddingVertical: 10

  },
  inputBox: {
    width: 350,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
    borderWidth: 1,
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    textAlign: 'center',
    justifyContent: 'center'
  }

})
