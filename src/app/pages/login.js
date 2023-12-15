import { Image } from 'expo-image'
import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import Ok from '../../../assets/ok'
import No from '../../../assets/no'
import Logo from '../../../assets/logo.png'

export default function Login () {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

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
            onChangeText={setUser}
            value={user}
            textContentType='username'
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder='CONTRASEÑA'
            secureTextEntry
            onChangeText={setPassword}
            value={password}
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
