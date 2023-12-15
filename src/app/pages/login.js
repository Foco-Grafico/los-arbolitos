import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { routerStore } from '../../../stores/router'
import { loginDebounce } from '../../lib/api-call/auth'
import { accountStore } from '../../../stores/account'

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
    })
  }, [authParams])

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '35%',
          borderWidth: 1
        }}
      >
        <Text>Imagen</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <TextInput
          style={styles.input}
          placeholder='Usuario'
          onChangeText={(text) => setAuthParams(prev => ({ ...prev, user: text }))}
          textContentType='nickname'
        />
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          secureTextEntry
          onChangeText={(text) => setAuthParams(prev => ({ ...prev, pass: text }))}
          textContentType='password'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5
  }
})
